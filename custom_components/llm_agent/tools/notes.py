"""Home notes and the knowledge base: what the household wants the AI to know about this
home, kept apart from how the AI works.

Notes are short facts and rules, every enabled one in every admin chat. Knowledge entries
are longer; only an index of titles and summaries is in the chat, and read_knowledge
fetches a body when a question needs it, the way read_reference serves the built-in
pages. The AI never writes either directly: change_home_note and change_knowledge only
propose, and a person approves each one on a card that shows the one item before and
after.

Neither is the place to correct the AI's behaviour. A rule like "always answer in
French" in a note is followed unevenly and is invisible in the settings, so the tool
descriptions send such requests to the integration's Extra instructions setting.
"""

from __future__ import annotations

from typing import Any

from ..approval import Risk
from ..const import (
    DOMAIN,
    KNOWLEDGE_BODY_MAX,
    KNOWLEDGE_SUMMARY_MAX,
    KNOWLEDGE_TITLE_MAX,
    NOTE_MAX,
)
from ..store import HomeNotes, Refused, new_entry_id, new_note_id
from . import Preview, Tool, ToolContext, ToolError, ToolOutput, obj
from .util import diff_text

NOT_BEHAVIOUR = (
    "Only facts about this home, never instructions about how you should work: when the "
    "user wants to change how you behave, say that belongs in the integration's Extra "
    "instructions setting and do not call this. Never store secrets."
)
ACTIONS = ["add", "edit", "disable", "remove"]
TITLES = {"add": "Add", "edit": "Edit", "disable": "Disable", "remove": "Remove"}


def _home(ctx: ToolContext) -> HomeNotes:
    agent = ctx.hass.data.get(DOMAIN)
    if agent is None:
        raise ToolError("LLM Agent is not set up")
    return agent.store.home


class _Proposal(Tool):
    """A change to one note or entry that a person approves. Refused if that item changed
    between the card being shown and approved, so nobody approves something they did not
    see."""

    what = ""  # "home note" or "knowledge entry", for messages
    kind = ""  # snapshot kind

    def __init__(self, name: str, description: str, params: dict[str, Any]) -> None:
        super().__init__(name, description, params)
        # The item as each recent card showed it. Denied or abandoned cards never reach
        # run(), so only the latest few are kept.
        self._shown: dict[int, dict[str, Any] | None] = {}

    def _get(self, home: HomeNotes, item_id: str) -> dict[str, Any] | None:
        raise NotImplementedError

    def _text(self, item: dict[str, Any] | None) -> str:
        raise NotImplementedError

    def check_args(self, args: dict[str, Any]) -> dict[str, Any]:
        args = super().check_args(args)
        if args.get("action") not in ACTIONS:
            raise ToolError(f"action must be one of {', '.join(ACTIONS)}")
        if args["action"] != "add" and not isinstance(args.get("id"), str):
            raise ToolError(f"Give the id of the {self.what} to {args['action']}")
        return args

    def classify(self, ctx: ToolContext, args: dict[str, Any]) -> Risk:
        return Risk.risky("changes what the AI knows about this home in every chat")

    async def needs_person(self, ctx: ToolContext, args: dict[str, Any]) -> bool:
        # These steer every later chat, so a person always sees what is remembered.
        return True

    def _after(self, before: dict[str, Any] | None, args: dict[str, Any]) -> str:
        raise NotImplementedError

    async def preview(self, ctx: ToolContext, args: dict[str, Any]) -> Preview:
        home = _home(ctx)
        before = None if args["action"] == "add" else self._get(home, args["id"])
        if args["action"] != "add" and before is None:
            raise ToolError(f"There is no {self.what} {args['id']}")
        self._shown[id(args)] = before
        while len(self._shown) > 64:
            self._shown.pop(next(iter(self._shown)))
        old = self._text(before)
        new = "" if args["action"] in ("disable", "remove") else self._after(before, args)
        # Line-terminated, so an unchanged last line isn't shown as removed and re-added.
        return Preview(
            f"{TITLES[args['action']]} {self.what}",
            diff_text(old + "\n" if old else "", new + "\n" if new else "", self.what),
        )

    async def run(self, ctx: ToolContext, args: dict[str, Any]) -> ToolOutput:
        home = _home(ctx)
        changed = ToolError(
            f"This {self.what} changed while the suggestion waited for approval. Look at "
            "it again in your instructions next turn and propose the change again."
        )
        if id(args) not in self._shown:
            # no record of what the person was shown: don't guess it was today's version
            raise changed
        before = self._shown.pop(id(args))
        item_id = args.get("id") if args["action"] != "add" else self._new_id()
        if before is not None and self._get(home, item_id) != before:
            raise changed
        label = f"{TITLES[args['action']]} {self.what}"
        snap = await ctx.snapshots.save(self.kind, label, {"item_id": item_id, "item": before})
        if before is not None and self._get(home, item_id) != before:
            raise changed  # saved in the panel while the snapshot was written
        try:
            if args["action"] == "remove":
                self._remove(home, item_id)
                result: Any = {"ok": True, "removed": item_id}
            else:
                result = {"ok": True, self.what.split()[-1]: self._apply(ctx, home, args, item_id)}
        except Refused as err:
            raise ToolError(str(err)) from None
        return ToolOutput(result, label, snapshot_id=snap)

    def _new_id(self) -> str:
        raise NotImplementedError

    def _remove(self, home: HomeNotes, item_id: str) -> None:
        raise NotImplementedError

    def _apply(
        self, ctx: ToolContext, home: HomeNotes, args: dict[str, Any], item_id: str
    ) -> dict[str, Any]:
        raise NotImplementedError


class ChangeHomeNote(_Proposal):
    what = "home note"
    kind = "notes"

    def __init__(self) -> None:
        super().__init__(
            "change_home_note",
            "Propose adding, editing, disabling or removing one home note; a person "
            "approves it. Notes are short lasting facts and household rules about this "
            "home, such as which room is upstairs or a plug that must stay on. The "
            "enabled notes are in your instructions, each with its [id]. "
            f"{NOT_BEHAVIOUR} At most {NOTE_MAX} characters per note.",
            obj(
                {
                    "action": {"type": "string", "enum": ACTIONS},
                    "id": {"type": "string", "description": "The note's id, except for add"},
                    "text": {"type": "string", "description": "For add and edit"},
                },
                ["action"],
            ),
        )

    def check_args(self, args: dict[str, Any]) -> dict[str, Any]:
        args = super().check_args(args)
        if args["action"] in ("add", "edit"):
            text = args.get("text")
            if not isinstance(text, str) or not text.strip():
                raise ToolError("Give the note's text")
            if len(text.strip()) > NOTE_MAX:
                raise ToolError(f"A note is limited to {NOTE_MAX} characters; shorten it")
        return args

    def _get(self, home: HomeNotes, item_id: str) -> dict[str, Any] | None:
        return home.note(item_id)

    def _text(self, item: dict[str, Any] | None) -> str:
        return (item or {}).get("text", "")

    def _after(self, before: dict[str, Any] | None, args: dict[str, Any]) -> str:
        return " ".join(args["text"].split())

    def _new_id(self) -> str:
        return new_note_id()

    def _remove(self, home: HomeNotes, item_id: str) -> None:
        home.remove_note(item_id)

    def _apply(
        self, ctx: ToolContext, home: HomeNotes, args: dict[str, Any], item_id: str
    ) -> dict[str, Any]:
        if args["action"] == "disable":
            return home.save_note(item_id, enabled=False)
        if args["action"] == "edit":
            return home.save_note(item_id, args["text"])
        return home.save_note(None, args["text"], by="agent", user_id=ctx.user_id, new_id=item_id)


class ChangeKnowledge(_Proposal):
    what = "knowledge entry"
    kind = "knowledge"

    def __init__(self) -> None:
        super().__init__(
            "change_knowledge",
            "Propose adding, editing, disabling or removing one knowledge base entry; a "
            "person approves it. Entries are longer reference about this home (how the "
            "heating is zoned, what each breaker feeds), with a title, a one-line summary "
            "and a Markdown body. The index of enabled entries is in your instructions; "
            "read an entry with read_knowledge before editing it. For edit, give only the "
            f"fields that change. {NOT_BEHAVIOUR} Limits: title {KNOWLEDGE_TITLE_MAX}, "
            f"summary {KNOWLEDGE_SUMMARY_MAX}, body {KNOWLEDGE_BODY_MAX} characters.",
            obj(
                {
                    "action": {"type": "string", "enum": ACTIONS},
                    "id": {"type": "string", "description": "The entry's id, except for add"},
                    "title": {"type": "string"},
                    "summary": {"type": "string"},
                    "body": {"type": "string", "description": "Markdown"},
                },
                ["action"],
            ),
        )

    def check_args(self, args: dict[str, Any]) -> dict[str, Any]:
        args = super().check_args(args)
        for key in ("title", "summary", "body"):
            if key in args and not isinstance(args[key], str):
                raise ToolError(f"{key} must be text")
        if args["action"] == "add" and not all(
            str(args.get(k, "")).strip() for k in ("title", "summary", "body")
        ):
            raise ToolError("A new entry needs a title, a summary and a body")
        return args

    def _get(self, home: HomeNotes, item_id: str) -> dict[str, Any] | None:
        return home.entry(item_id)

    def _text(self, item: dict[str, Any] | None) -> str:
        if not item:
            return ""
        return f"# {item['title']}\n> {item['summary']}\n\n{item['body']}"

    def _after(self, before: dict[str, Any] | None, args: dict[str, Any]) -> str:
        merged = {
            k: " ".join(args[k].split()) if k != "body" and k in args else args.get(k)
            for k in ("title", "summary", "body")
        }
        return self._text(
            {k: v if v is not None else (before or {}).get(k, "") for k, v in merged.items()}
        )

    def _new_id(self) -> str:
        return new_entry_id()

    def _remove(self, home: HomeNotes, item_id: str) -> None:
        home.remove_entry(item_id)

    def _apply(
        self, ctx: ToolContext, home: HomeNotes, args: dict[str, Any], item_id: str
    ) -> dict[str, Any]:
        if args["action"] == "disable":
            entry = home.save_entry(item_id, enabled=False)
        else:
            entry = home.save_entry(
                None if args["action"] == "add" else item_id,
                args.get("title"),
                args.get("summary"),
                args.get("body"),
                by="agent",
                user_id=ctx.user_id,
                new_id=item_id,
            )
        return {k: v for k, v in entry.items() if k != "body"}  # the model just wrote it


class ReadKnowledge(Tool):
    def __init__(self) -> None:
        super().__init__(
            "read_knowledge",
            "Read one entry of this home's knowledge base by its id (see the index in "
            "your instructions). Read it when a question touches its title or summary.",
            obj({"id": {"type": "string"}}, ["id"]),
        )

    async def run(self, ctx: ToolContext, args: dict[str, Any]) -> ToolOutput:
        home = _home(ctx)
        entry = home.entry(str(args.get("id", "")).strip())
        if entry is None or not entry.get("enabled"):
            listed = ", ".join(k["id"] for k in home.knowledge if k.get("enabled")) or "none"
            raise ToolError(f"No knowledge entry {args.get('id')!r}. Entries: {listed}")
        return ToolOutput(
            f"# {entry['title']}\n\n{entry['body']}", summary=f"Read {entry['title']}"
        )


TOOLS: list[Tool] = [ChangeHomeNote(), ChangeKnowledge(), ReadKnowledge()]
