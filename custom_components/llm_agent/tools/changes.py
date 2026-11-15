"""change_history: lets the household ask in chat what the agent changed, across every
chat, from the same audit log the panel's Changes view reads.

Only admins' chats get this tool (it is not in household.member_tools): the log holds
every user's changes, and a member must not see what others asked for. It only reads,
so it runs in every approval mode, read-only included.
"""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from homeassistant.util import dt as dt_util

from .. import history
from . import Tool, ToolContext, ToolError, ToolOutput, num_arg, obj

DEFAULT_LIMIT = 20
MAX_LIMIT = 50


def _when(value: Any, key: str, end: bool = False) -> float | None:
    """A date or date-time in the home's time zone, as a timestamp. A bare date means the
    whole day: its start for since, its end for until."""
    if value in (None, ""):
        return None
    text = str(value).strip()
    moment: datetime | None = dt_util.parse_datetime(text)
    if moment is None and (day := dt_util.parse_date(text)) is not None:
        moment = datetime.combine(day, datetime.min.time())
        if end:
            moment += timedelta(days=1)
    if moment is None:
        raise ToolError(f"{key} must be a date (2026-11-14) or date and time, got {text!r}")
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=dt_util.get_default_time_zone())
    return moment.timestamp()


def _line(row: dict[str, Any]) -> dict[str, Any]:
    """Compact: one short dict per change, empty fields left out, so a full page of 50
    stays a few thousand tokens."""
    local = dt_util.as_local(dt_util.utc_from_timestamp(row["time"]))
    out = {
        "time": local.strftime("%Y-%m-%d %H:%M"),
        "chat": row.get("chat_title") or (row["conversation_id"] and "(deleted chat)"),
        "user": row.get("user_name"),
        "tool": row["tool"],
        "target": row["args"][:200],
        "approval": row["approval"],
        "ok": row["ok"],
        "result": row["detail"][:160],
        "undo": row["undo"],
        "snapshot_id": row["snapshot_id"] if row["undo"] == "available" else None,
    }
    return {k: v for k, v in out.items() if v not in (None, "")}


class ChangeHistoryTool(Tool):
    def __init__(self) -> None:
        super().__init__(
            "change_history",
            "What this agent changed, across all chats, newest first: time (home time "
            "zone), chat, who asked, tool, target, approval (asked = a person approved, "
            "auto, rule, reviewer, denied), result, and undo state. Calls that only read "
            "are not recorded. Filters: since/until (date or date-time), chat (title text), "
            "user (name), target (entity id or domain text, e.g. light.porch or 'light.'), "
            "tool. Pass the returned cursor to get the next page. To undo, use the undo "
            "tool with the snapshot_id.",
            obj(
                {
                    "since": {"type": "string"},
                    "until": {"type": "string"},
                    "chat": {"type": "string"},
                    "user": {"type": "string"},
                    "target": {"type": "string"},
                    "tool": {"type": "string"},
                    "limit": {"type": "integer"},
                    "cursor": {"type": "string"},
                }
            ),
        )

    async def run(self, ctx: ToolContext, args: dict[str, Any]) -> ToolOutput:
        hass = ctx.hass
        titles = history.chat_titles(hass)
        names = await history.user_names(hass)
        chat = str(args.get("chat") or "").strip()
        user = str(args.get("user") or "").strip()
        filters = history.Filters(
            since=_when(args.get("since"), "since"),
            until=_when(args.get("until"), "until", end=True),
            conversations=history.matching(titles, chat) if chat else None,
            users=history.matching(names, user) if user else None,
            tool=str(args.get("tool") or "").strip(),
            target=str(args.get("target") or "").strip(),
            titles=titles,
            names=names,
        )
        limit = num_arg(args, "limit", DEFAULT_LIMIT, 1, MAX_LIMIT)
        page = await history.query(hass, filters, limit, args.get("cursor") or None)
        rows = [_line(r) for r in page["changes"]]
        data: dict[str, Any] = {"changes": rows, "time_zone": str(dt_util.get_default_time_zone())}
        if page["cursor"]:
            data["cursor"] = page["cursor"]
        if chat and not filters.conversations:
            data["note"] = f"No chat title contains {chat!r}."
        elif user and not filters.users:
            data["note"] = f"No user is named like {user!r}."
        return ToolOutput(
            data, f"{len(rows)} changes" + (", more available" if page["cursor"] else "")
        )


TOOLS: list[Tool] = [ChangeHistoryTool()]
