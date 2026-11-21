"""Conversation storage: a small index plus one HA Store file per conversation, and the
home notes and knowledge base in a Store file of their own.

Writes are debounced, so a streaming turn costs one disk write, not hundreds.
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path
import secrets
import time
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import (
    DOMAIN,
    KNOWLEDGE_BODY_MAX,
    KNOWLEDGE_COUNT_MAX,
    KNOWLEDGE_INDEX_MAX,
    KNOWLEDGE_SUMMARY_MAX,
    KNOWLEDGE_TITLE_MAX,
    MAX_CONVERSATIONS,
    NOTE_MAX,
    NOTES_COUNT_MAX,
    NOTES_MAX,
)

VERSION = 1
SAVE_DELAY = 2
CACHE_SIZE = 5
SPEND_DAYS = 31  # daily spend totals kept for the cap and the settings page
USAGE_DAYS = 400  # per-day usage by provider and model, for the Usage view
# What made a call, as the Usage view groups it. "task" is an AI Task action, which the
# daily cap does not count; "review" is the reviewer model judging a tool call.
USAGE_KINDS = ("chat", "review", "task")
_USAGE_SUMS = ("input", "output", "cache_read", "cache_write", "calls", "unpriced")


@dataclass(frozen=True, slots=True)
class Viewer:
    """Who is looking. Everyone sees their own chats. Admins also see chats without an
    owner: those from before 0.4 and those started by automations."""

    user_id: str
    is_admin: bool

    def sees(self, conv: dict[str, Any] | None) -> bool:
        if conv is None:
            return False
        owner = conv.get("user_id")
        return owner == self.user_id if owner else self.is_admin


class ConversationStore:
    def __init__(
        self, hass: HomeAssistant, busy: Callable[[str], bool] = lambda _id: False
    ) -> None:
        """`busy(conv_id)` tells the store a conversation is in use by a running turn; such
        conversations stay cached so everyone edits the same object."""
        self.hass = hass
        self._busy = busy
        self._index_store: Store[dict[str, Any]] = Store(hass, VERSION, f"{DOMAIN}.conversations")
        self._index: dict[str, dict[str, Any]] = {}
        self._cache: dict[str, dict[str, Any]] = {}
        self._stores: dict[str, Store[dict[str, Any]]] = {}
        # delayed saves not yet written, so a reload can write them first
        self._pending: dict[str, tuple[Store[dict[str, Any]], Callable[[], dict[str, Any]]]] = {}
        # estimated spend per local day, "YYYY-MM-DD" -> USD
        self._spend: dict[str, float] = {}
        # the same per user: user id -> {day -> USD}
        self._user_spend: dict[str, dict[str, float]] = {}
        # user id -> {"provider_id", "model"}: each admin's default for new chats
        self._prefs: dict[str, dict[str, str]] = {}
        # Home notes and knowledge base: facts about this home the household keeps
        self.home = HomeNotes(hass, self._delay_save)
        self.usage = UsageLog(hass, self._delay_save)
        self.cache_size = CACHE_SIZE
        self.max_chats = MAX_CONVERSATIONS

    async def async_load(self) -> None:
        data = await self._index_store.async_load() or {}
        self._index = data.get("conversations", {})
        self._spend = data.get("spend", {})
        self._user_spend = data.get("user_spend", {})
        self._prefs = data.get("prefs", {})
        # Before 0.10 the notes were one text in this file. They move to their own file
        # once; saving the index again drops the old key.
        if await self.home.async_load(data.get("notes")):
            self._save_index()
        await self.usage.async_load()

    def user_default(self, user_id: str) -> dict[str, str] | None:
        return self._prefs.get(user_id)

    def set_user_default(self, user_id: str, provider_id: str | None, model: str) -> None:
        if provider_id:
            self._prefs[user_id] = {"provider_id": provider_id, "model": model}
        else:
            self._prefs.pop(user_id, None)
        self._save_index()

    def add_spend(self, day: str, cost: float, user_id: str | None = None) -> None:
        if cost <= 0:
            return
        self._spend[day] = round(self._spend.get(day, 0.0) + cost, 6)
        for old in sorted(self._spend)[:-SPEND_DAYS]:
            self._spend.pop(old)
        if user_id:
            # Only today counts for a member's cap, so older days are dropped.
            self._user_spend[user_id] = {
                day: round(self._user_spend.get(user_id, {}).get(day, 0.0) + cost, 6)
            }
        self._save_index()

    def spent(self, day: str) -> float:
        return self._spend.get(day, 0.0)

    def spend_days(self) -> dict[str, float]:
        """The daily cap's record: chat and reviewer spend per local day, the last
        SPEND_DAYS days. Older than the usage log, so it covers the days before it."""
        return dict(self._spend)

    def chat_costs(self) -> tuple[float, int]:
        """Every saved chat's estimated cost added up, and how many chats. The same
        figure each chat shows under its composer. Deleted chats are gone from it."""
        costs = [c.get("cost") or 0.0 for c in self._index.values()]
        return round(sum(costs), 6), len(costs)

    def user_spent(self, user_id: str | None, day: str) -> float:
        return self._user_spend.get(user_id or "", {}).get(day, 0.0)

    def _conv_store(self, conv_id: str) -> Store[dict[str, Any]]:
        if conv_id not in self._stores:
            self._stores[conv_id] = Store(self.hass, VERSION, f"{DOMAIN}.conv.{conv_id}")
        return self._stores[conv_id]

    def _delay_save(self, key: str, store: Store[dict[str, Any]], data: Callable[[], Any]) -> None:
        entry: tuple[Store[dict[str, Any]], Callable[[], Any]]

        def written() -> Any:
            # HA calls this when it writes: from then on nothing is pending for this key
            if self._pending.get(key) is entry:
                del self._pending[key]
            return data()

        entry = (store, data)
        self._pending[key] = entry
        store.async_delay_save(written, SAVE_DELAY)

    async def flush(self) -> None:
        """Write every delayed save now (before a reload loads fresh stores)."""
        for key, entry in list(self._pending.items()):
            # skip a chat deleted (or saved again) while earlier ones were written
            if self._pending.get(key) is not entry:
                continue
            del self._pending[key]
            store, data = entry
            await store.async_save(data())

    def _save_index(self) -> None:
        self._delay_save(
            "",
            self._index_store,
            lambda: {
                "conversations": self._index,
                "spend": self._spend,
                "user_spend": self._user_spend,
                "prefs": self._prefs,
            },
        )

    def list(self, viewer: Viewer | None = None) -> list[dict[str, Any]]:
        """Newest first. With a viewer, only the chats that person may see."""
        chats = self._index.values()
        if viewer is not None:
            chats = [c for c in chats if viewer.sees(c)]
        return sorted(chats, key=lambda c: c.get("updated", 0), reverse=True)

    async def search(
        self,
        query: str,
        limit: int = 30,
        viewer: Viewer | None = None,
        keep: Callable[[dict[str, Any]], bool] | None = None,
        width: int = 60,
    ) -> list[dict[str, Any]]:
        """Chats whose title or messages contain `query` (case-insensitive), newest first,
        each with a short snippet of `width` characters either side of the hit. `keep`
        narrows the chats searched (the past_chats tool's dates and source) before any
        is read, so a narrow filter reads few files. Reads chats from disk one at a time
        without caching them, so memory stays flat."""
        needle = query.strip().lower()
        if not needle:
            return []
        found: list[dict[str, Any]] = []
        for summary in self.list(viewer):
            if len(found) >= limit:
                break
            if keep is not None and not keep(summary):
                continue
            conv = await self.peek(summary["id"])
            snippet = _snippet(summary.get("title", ""), needle, width)
            for msg in (conv or {}).get("messages", []):
                if snippet or msg.get("role") not in ("user", "assistant"):
                    continue
                text = str(msg.get("display") or msg.get("content") or "")
                snippet = _snippet(text, needle, width)
            if snippet:
                found.append({**summary, "snippet": snippet})
        return found

    async def peek(self, conv_id: str) -> dict[str, Any] | None:
        """A chat for reading only, without adding it to the cache. The past_chats and
        read_chat tools look through many old chats; going through get() would push the
        chats people have open out of memory. Do not change what this returns: when the
        chat is cached it is the shared object a running turn writes to."""
        if conv_id not in self._index:
            return None
        return self._cache.get(conv_id) or await self._conv_store(conv_id).async_load()

    async def get(self, conv_id: str) -> dict[str, Any] | None:
        if conv_id in self._cache:
            self._cache[conv_id] = self._cache.pop(conv_id)  # most recently used last
            return self._cache[conv_id]
        if conv_id not in self._index:
            return None
        data = await self._conv_store(conv_id).async_load()
        if data is None or conv_id not in self._index:  # deleted while it was read
            return None
        if conv_id in self._cache:  # loaded concurrently; keep the first object
            return self._cache[conv_id]
        self._cache[conv_id] = data
        self._evict(keep=conv_id)
        return data

    def _evict(self, keep: str = "") -> None:
        """Keep a few conversations in memory; the rest reload from disk on demand.
        `keep` is a chat about to start a turn: it must stay the one shared object."""
        excess = len(self._cache) - self.cache_size
        for old in list(self._cache):
            if excess <= 0:
                break
            if old != keep and not self._busy(old):
                self._cache.pop(old)
                excess -= 1

    async def create(
        self, provider_id: str, model: str, context: str, user_id: str | None = None
    ) -> dict[str, Any]:
        conv_id = time.strftime("%Y%m%d%H%M%S") + secrets.token_hex(3)
        now = time.time()
        conv = {
            "id": conv_id,
            "title": "New chat",
            "created": now,
            "updated": now,
            "provider_id": provider_id,
            "model": model,
            "context": context,
            **({"user_id": user_id} if user_id else {}),
            "messages": [],
            "usage": {
                "input": 0,
                "output": 0,
                "cache_read": 0,
                "cache_write": 0,
                "cost": 0.0,
            },
        }
        self._cache[conv_id] = conv
        self._evict(keep=conv_id)
        self._index[conv_id] = self._summary(conv)
        await self._prune(user_id)
        self.save(conv)
        return conv

    @staticmethod
    def _summary(conv: dict[str, Any]) -> dict[str, Any]:
        return {
            "id": conv["id"],
            "title": conv["title"],
            "updated": conv["updated"],
            "model": conv["model"],
            "provider_id": conv["provider_id"],
            "cost": conv["usage"].get("cost"),
            **({"source": conv["source"]} if conv.get("source") else {}),
            **({"user_id": conv["user_id"]} if conv.get("user_id") else {}),
        }

    def save(self, conv: dict[str, Any]) -> None:
        """Save soon. Pictures are never written, even when a save lands mid-turn."""
        if conv.get("deleted"):  # a cancelled turn finishing after delete must not revive it
            return
        conv["updated"] = time.time()
        self._index[conv["id"]] = self._summary(conv)
        self._delay_save(conv["id"], self._conv_store(conv["id"]), lambda: _without_images(conv))
        self._save_index()

    async def rename(self, conv_id: str, title: str) -> None:
        conv = await self.get(conv_id)
        if conv is not None:
            conv["title"] = title[:120]
            self.save(conv)

    async def delete(self, conv_id: str) -> None:
        self._index.pop(conv_id, None)
        if (conv := self._cache.pop(conv_id, None)) is not None:
            conv["deleted"] = True
        self._pending.pop(conv_id, None)
        await self._conv_store(conv_id).async_remove()
        self._stores.pop(conv_id, None)
        self._save_index()

    async def _prune(self, user_id: str | None) -> None:
        """Keep each owner's newest chats: one person's new chats only ever remove that
        person's oldest ones."""
        own = [c for c in self.list() if c.get("user_id") == user_id]
        for conv in own[self.max_chats :]:
            if not self._busy(conv["id"]):
                await self.delete(conv["id"])

    async def delete_older_than(self, days: float) -> int:
        """Delete chats not updated in `days` days (running chats are kept). Returns the count."""
        cutoff = time.time() - days * 86400
        old = [c["id"] for c in self.list() if c.get("updated", 0) < cutoff]
        removed = 0
        for conv_id in old:
            # recheck: it may have been used while earlier ones were deleted
            if self._index.get(conv_id, {}).get("updated", 0) >= cutoff:
                continue
            if not self._busy(conv_id):
                await self.delete(conv_id)
                removed += 1
        return removed

    async def disk_usage(self) -> dict[str, int]:
        """Number of saved chats and the bytes their files take."""
        storage = Path(self.hass.config.path(".storage"))

        def _size() -> int:
            total = 0
            for f in storage.glob(f"{DOMAIN}.conv.*"):
                try:  # a chat deleted meanwhile is simply not counted
                    total += f.stat().st_size
                except OSError:
                    continue
            return total

        return {"chats": len(self._index), "bytes": await self.hass.async_add_executor_job(_size)}


class UsageLog:
    """Tokens, calls and estimated cost per local day, provider, model and kind.

    It lives in its own Store file, not the chat index: the index is rewritten on every
    chat save, and this keeps 400 days. A day holds one row per provider, model and kind
    that was used, so a year is a few thousand small rows at most.

    Costs are estimates from the same price table as the daily cap, not the provider's
    bill. A call whose model has no known price adds its tokens and counts as unpriced
    rather than as free, so the view can say a total is incomplete.
    """

    def __init__(
        self,
        hass: HomeAssistant,
        delay_save: Callable[[str, Store[dict[str, Any]], Callable[[], Any]], None],
    ) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, VERSION, f"{DOMAIN}.usage")
        self._delay_save = delay_save
        # "YYYY-MM-DD" -> "provider_id|model|kind" -> row
        self.days: dict[str, dict[str, dict[str, Any]]] = {}
        # The first local day recorded. Nothing before it was tracked: there is no
        # history from releases before this one, and the view says so.
        self.since: str | None = None

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.days = data.get("days", {})
        self.since = data.get("since")

    def _changed(self) -> None:
        self._delay_save("usage", self._store, lambda: {"since": self.since, "days": self.days})

    def add(
        self,
        day: str,
        provider_id: str,
        provider_type: str,
        model: str,
        kind: str,
        input_tokens: int = 0,
        output_tokens: int = 0,
        cache_read: int = 0,
        cache_write: int = 0,
        cost: float | None = None,
    ) -> None:
        """Count one call. `cost` None means the model has no known price."""
        rows = self.days.setdefault(day, {})
        row = rows.setdefault(
            f"{provider_id}|{model}|{kind}",
            {
                "provider_id": provider_id,
                "provider_type": provider_type,
                "model": model,
                "kind": kind,
                **dict.fromkeys(_USAGE_SUMS, 0),
                "cost": 0.0,
            },
        )
        row["input"] += input_tokens
        row["output"] += output_tokens
        row["cache_read"] += cache_read
        row["cache_write"] += cache_write
        row["calls"] += 1
        if cost is None:
            row["unpriced"] += 1
        else:
            row["cost"] = round(row["cost"] + cost, 6)
        if self.since is None or day < self.since:
            self.since = day
        self._prune(day)
        self._changed()

    def _prune(self, today: str) -> None:
        """Drop days older than USAGE_DAYS, counted in calendar days from `today` so a
        quiet month does not stretch what is kept."""
        cutoff = (date.fromisoformat(today) - timedelta(days=USAGE_DAYS - 1)).isoformat()
        for old in [d for d in self.days if d < cutoff]:
            del self.days[old]

    def rows(self, first: str, last: str) -> list[dict[str, Any]]:
        """Every row from day `first` to `last` inclusive, each with its "day"."""
        return [
            {"day": day, **row}
            for day in sorted(self.days)
            if first <= day <= last
            for row in self.days[day].values()
        ]


class Refused(ValueError):
    """A note or knowledge change that breaks a limit. The message is shown to a person or
    the model as it is, so it says what to do instead."""


def _one_line(text: Any) -> str:
    # A note is one line of the prompt, so line breaks typed into it become spaces.
    return " ".join(str(text or "").split())


class HomeNotes:
    """Home notes (short facts and rules, all enabled ones in every admin chat) and the
    knowledge base (longer entries; only their titles and summaries go into a chat, and
    the model reads a body when it needs it).

    The limits are checked here and nowhere else, so the panel, the AI's approved
    suggestions and undo all refuse the same things with the same words. Both lists
    live in one Store file rather than the chat index, because the index is rewritten
    on every chat save and knowledge bodies can be long.
    """

    def __init__(
        self,
        hass: HomeAssistant,
        delay_save: Callable[[str, Store[dict[str, Any]], Callable[[], Any]], None],
    ) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, VERSION, f"{DOMAIN}.home_notes")
        self._delay_save = delay_save
        self.notes: list[dict[str, Any]] = []
        self.knowledge: list[dict[str, Any]] = []

    async def async_load(self, legacy: Any = None) -> bool:
        """Load, or turn the pre-0.10 notes text `legacy` into one note per non-empty
        line. True when that migration ran. A line longer than a note may be now is kept
        whole: nothing the household wrote is cut, and the old 2000 character cap on the
        whole text means the enabled total still fits."""
        data = await self._store.async_load()
        if data is not None:
            self.notes = [n for n in data.get("notes", []) if isinstance(n, dict) and n.get("id")]
            self.knowledge = [
                k for k in data.get("knowledge", []) if isinstance(k, dict) and k.get("id")
            ]
            return False
        if not isinstance(legacy, str) or not legacy.strip():
            return False
        self.notes = _lines_to_notes(legacy)
        # Written now, not delayed: the index drops the old text on its next save, and
        # that must not happen before the notes are safely in their new file.
        await self._store.async_save(self._data())
        return True

    def _data(self) -> dict[str, Any]:
        return {"notes": self.notes, "knowledge": self.knowledge}

    def _changed(self) -> None:
        self._delay_save("home_notes", self._store, self._data)

    # Notes

    def note(self, note_id: str) -> dict[str, Any] | None:
        return next((n for n in self.notes if n["id"] == note_id), None)

    def room(self, exclude: str | None = None) -> int:
        """Characters left for enabled notes, not counting note `exclude`."""
        used = sum(len(n["text"]) for n in self.notes if n.get("enabled") and n["id"] != exclude)
        return NOTES_MAX - used

    def notes_prompt(self) -> str:
        """The enabled notes, one line each with the id the AI's tool needs."""
        return "\n".join(f"- [{n['id']}] {n['text']}" for n in self.notes if n.get("enabled"))

    def save_note(
        self,
        note_id: str | None,
        text: str | None = None,
        enabled: bool | None = None,
        by: str = "person",
        user_id: str | None = None,
        new_id: str | None = None,
    ) -> dict[str, Any]:
        """Add a note (no id) or change one. Raises Refused. `new_id` names a new note,
        so an undo snapshot can be written before the note exists."""
        old, new_text, on = self._check_note(note_id, text, enabled)
        note = self._put(
            self.notes, old, {"text": new_text, "enabled": on}, by, user_id, new_id or new_note_id()
        )
        self._changed()
        return note

    def check_note(
        self, note_id: str | None, text: str | None = None, enabled: bool | None = None
    ) -> None:
        """Raise Refused if save_note would, without saving. The AI's suggestion card
        calls this before it is shown: checking only on apply had a person approve three
        cards in a row on 2026-11-18 that could never be saved, because 34 characters
        were left."""
        self._check_note(note_id, text, enabled)

    def _check_note(
        self, note_id: str | None, text: str | None, enabled: bool | None
    ) -> tuple[dict[str, Any] | None, str, bool]:
        old = self._find(self.notes, note_id, "note")
        if old is None and len(self.notes) >= NOTES_COUNT_MAX:
            raise Refused(
                f"There are already {NOTES_COUNT_MAX} notes. Remove one you no longer need."
            )
        new_text = old["text"] if old and text is None else _one_line(text)
        if text is not None or old is None:
            if not new_text:
                raise Refused("A note needs some text.")
            if len(new_text) > NOTE_MAX:
                raise Refused(
                    f"A note can be at most {NOTE_MAX} characters; this one has "
                    f"{len(new_text)}. Put longer text, history or steps in the knowledge "
                    "base instead, and keep a note to the one current fact."
                )
        on = (old.get("enabled", True) if old else True) if enabled is None else enabled
        if on and len(new_text) > (left := self.room(exclude=note_id)):
            raise Refused(self._no_room(max(left, 0), len(new_text), note_id))
        return old, new_text, on

    def _no_room(self, left: int, size: int, exclude: str | None) -> str:
        # The old message said "Shorten it", and the model did exactly that, three times
        # for one fact, and then gave up without storing it. So it names the two ways out
        # that keep the fact whole, with the ids the model needs to act on the second.
        longest = sorted(
            (n for n in self.notes if n.get("enabled") and n["id"] != exclude),
            key=lambda n: len(n["text"]),
            reverse=True,
        )[:3]
        names = ", ".join(f"{n['id']} ({len(n['text'])} characters)" for n in longest)
        return (
            f"Enabled notes can use {NOTES_MAX} characters in all and {left} are left; "
            f"this note has {size}. Do not cut it down to fit. Put it in the knowledge "
            "base instead, where longer reference, history and steps belong, or make room "
            "by editing or disabling an older note."
            + (f" Longest enabled notes: {names}." if names else "")
        )

    def remove_note(self, note_id: str) -> None:
        self._remove(self.notes, note_id, "note")

    def restore_note(self, note_id: str, note: dict[str, Any] | None) -> None:
        """Put a note back as it was (None: it did not exist), for undo. The room is
        checked again, since other notes may have been enabled since."""
        if note and note.get("enabled") and len(note["text"]) > self.room(exclude=note_id):
            raise Refused(
                "Putting this note back would go over the space for enabled notes. "
                "Disable or remove another note first."
            )
        self._restore(self.notes, note_id, note)

    def replace_notes_text(self, text: str) -> None:
        """Undo a change made before 0.10, when the notes were one text."""
        self.notes = _lines_to_notes(text)
        self._changed()

    # Knowledge base

    def entry(self, entry_id: str) -> dict[str, Any] | None:
        return next((k for k in self.knowledge if k["id"] == entry_id), None)

    @staticmethod
    def index_line(entry: dict[str, Any]) -> str:
        return f"- {entry['id']}: {entry['title']}: {entry['summary']}"

    def index_room(self, exclude: str | None = None) -> int:
        used = sum(
            len(self.index_line(k)) + 1
            for k in self.knowledge
            if k.get("enabled") and k["id"] != exclude
        )
        return KNOWLEDGE_INDEX_MAX - used

    def knowledge_index(self) -> str:
        return "\n".join(self.index_line(k) for k in self.knowledge if k.get("enabled"))

    def save_entry(
        self,
        entry_id: str | None,
        title: str | None = None,
        summary: str | None = None,
        body: str | None = None,
        enabled: bool | None = None,
        by: str = "person",
        user_id: str | None = None,
        new_id: str | None = None,
    ) -> dict[str, Any]:
        """Add an entry (no id) or change one. Raises Refused."""
        old = self._find(self.knowledge, entry_id, "knowledge entry")
        if old is None and len(self.knowledge) >= KNOWLEDGE_COUNT_MAX:
            raise Refused(
                f"There are already {KNOWLEDGE_COUNT_MAX} knowledge entries. Remove one "
                "you no longer need."
            )
        fields = {
            "title": _one_line(title) if title is not None else (old or {}).get("title", ""),
            "summary": _one_line(summary)
            if summary is not None
            else (old or {}).get("summary", ""),
            "body": str(body).strip() if body is not None else (old or {}).get("body", ""),
        }
        for key, limit in (
            ("title", KNOWLEDGE_TITLE_MAX),
            ("summary", KNOWLEDGE_SUMMARY_MAX),
            ("body", KNOWLEDGE_BODY_MAX),
        ):
            if not fields[key]:
                raise Refused(f"A knowledge entry needs a {key}.")
            if len(fields[key]) > limit:
                raise Refused(
                    f"A knowledge entry's {key} can be at most {limit} characters; this "
                    f"one has {len(fields[key])}."
                )
        fields["enabled"] = (
            (old.get("enabled", True) if old else True) if enabled is None else enabled
        )
        new_id = new_id or new_entry_id()
        probe = {"id": entry_id or new_id, **fields}
        if fields["enabled"] and len(self.index_line(probe)) + 1 > (
            left := self.index_room(exclude=entry_id)
        ):
            raise Refused(
                f"The titles and summaries of enabled entries can use {KNOWLEDGE_INDEX_MAX} "
                f"characters in all, and {max(left, 0)} are left. Shorten this title or "
                "summary, or disable or remove another entry."
            )
        entry = self._put(self.knowledge, old, fields, by, user_id, new_id)
        self._changed()
        return entry

    def remove_entry(self, entry_id: str) -> None:
        self._remove(self.knowledge, entry_id, "knowledge entry")

    def restore_entry(self, entry_id: str, entry: dict[str, Any] | None) -> None:
        if (
            entry
            and entry.get("enabled")
            and len(self.index_line(entry)) + 1 > self.index_room(exclude=entry_id)
        ):
            raise Refused(
                "Putting this entry back would go over the space for the knowledge index. "
                "Disable or remove another entry first."
            )
        self._restore(self.knowledge, entry_id, entry)

    # Shared

    @staticmethod
    def _find(items: list[dict[str, Any]], item_id: str | None, name: str) -> Any:
        if not item_id:
            return None
        found = next((i for i in items if i["id"] == item_id), None)
        if found is None:
            raise Refused(f"There is no {name} {item_id}; it may have been removed.")
        return found

    @staticmethod
    def _put(
        items: list[dict[str, Any]],
        old: dict[str, Any] | None,
        fields: dict[str, Any],
        by: str,
        user_id: str | None,
        new_id: str,
    ) -> dict[str, Any]:
        now = time.time()
        if old is not None:
            # A new dict, not an edit in place: a waiting approval keeps the copy it
            # showed and compares it with this one.
            new = {**old, **fields, "updated": now}
            items[items.index(old)] = new
            return new
        new = {
            "id": new_id,
            **fields,
            "created": now,
            "updated": now,
            "added_by": by,
            **({"user_id": user_id} if user_id else {}),
        }
        items.append(new)
        return new

    def _remove(self, items: list[dict[str, Any]], item_id: str, name: str) -> None:
        items.remove(self._find(items, item_id, name))
        self._changed()

    def _restore(
        self, items: list[dict[str, Any]], item_id: str, item: dict[str, Any] | None
    ) -> None:
        at = next((i for i, x in enumerate(items) if x["id"] == item_id), None)
        if item is None:
            if at is not None:
                items.pop(at)
        elif at is None:
            items.append(item)
        else:
            items[at] = item
        self._changed()


def new_note_id() -> str:
    return "n" + secrets.token_hex(4)


def new_entry_id() -> str:
    return "k" + secrets.token_hex(4)


def _lines_to_notes(text: str) -> list[dict[str, Any]]:
    now = time.time()
    return [
        {
            "id": new_note_id(),
            "text": _one_line(line),
            "enabled": True,
            "created": now,
            "updated": now,
        }
        for line in text.splitlines()
        if line.strip()
    ]


def _snippet(text: str, needle: str, width: int = 60) -> str:
    at = text.lower().find(needle)
    if at < 0:
        return ""
    start = max(0, at - width)
    end = min(len(text), at + len(needle) + width)
    return (
        ("…" if start else "")
        + " ".join(text[start:end].split())
        + ("…" if end < len(text) else "")
    )


def _without_images(conv: dict[str, Any]) -> dict[str, Any]:
    """The conversation as stored: photos, snapshots, PDFs and file text too large to keep
    are sent for one turn only, so a save that lands mid-turn must not write them."""
    if not any(_TURN_ONLY & m.keys() for m in conv["messages"]):
        return conv
    messages = [_stored(m) if _TURN_ONLY & m.keys() else m for m in conv["messages"]]
    return {**conv, "messages": messages}


_TURN_ONLY = {"images", "documents", "attachments_once"}


def _stored(m: dict[str, Any]) -> dict[str, Any]:
    drop = {"images", "documents"}
    if m.get("attachments_once"):
        drop |= {"attachments", "attachments_once"}
    return {k: v for k, v in m.items() if k not in drop}
