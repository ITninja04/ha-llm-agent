"""What did the agent change? Reads the audit log back for the Changes view and the
change_history tool.

The audit log (snapshots.Snapshots.audit) is append-only JSON lines in time order, in
audit.jsonl, rotated once to audit.1.jsonl past the size limit. People ask about recent
changes, so the reader starts at the end of the newest file and stops as soon as a page
is full or the records get older than the range asked for. Reading the whole log forward
and sorting would be simpler, but a 2 MB log (times two with the rotated file) parsed on
every page turn costs far more than the handful of lines a page needs.

What the log does not record, and so cannot be shown: the chat's title at the time
(titles are looked up now, so a deleted chat shows no title), the user's name (looked up
now), tool calls that only read (never logged when they succeed), and, for records
written before snapshot_id was added, which undo snapshot belongs to the change.
"""

from __future__ import annotations

from collections.abc import Iterator
from dataclasses import dataclass
import json
import os
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant

from .const import DOMAIN

BLOCK = 64 * 1024
MAX_PAGE = 200


@dataclass(slots=True)
class Filters:
    """Which records to return. Empty fields match everything."""

    since: float | None = None
    until: float | None = None
    conversations: frozenset[str] | None = None  # None = any chat; empty = none match
    users: frozenset[str] | None = None
    tool: str = ""
    target: str = ""  # text in the call's arguments, e.g. light.porch or "light."
    text: str = ""  # anywhere: tool, arguments, result, chat title, user name
    titles: dict[str, str] | None = None
    names: dict[str, str] | None = None

    def match(self, rec: dict[str, Any]) -> bool:
        if self.conversations is not None and rec.get("conversation") not in self.conversations:
            return False
        if self.users is not None and rec.get("user") not in self.users:
            return False
        tool = str(rec.get("tool") or "")
        if self.tool and self.tool.lower() not in tool.lower():
            return False
        args = str(rec.get("args") or "")
        if self.target and self.target.lower() not in args.lower():
            return False
        if self.text:
            hay = " ".join(
                (
                    tool,
                    args,
                    str(rec.get("detail") or ""),
                    (self.titles or {}).get(str(rec.get("conversation")), ""),
                    (self.names or {}).get(str(rec.get("user")), ""),
                )
            ).lower()
            if self.text.lower() not in hay:
                return False
        return True


def _lines_backwards(fh: Any) -> Iterator[bytes]:
    """The file's lines, last first, reading fixed blocks from the end."""
    fh.seek(0, os.SEEK_END)
    pos = fh.tell()
    tail = b""
    while pos > 0:
        step = min(BLOCK, pos)
        pos -= step
        fh.seek(pos)
        chunk = fh.read(step) + tail
        lines = chunk.split(b"\n")
        tail = lines.pop(0)  # may be the end of a line that starts in the previous block
        for line in reversed(lines):
            if line.strip():
                yield line
    if tail.strip():
        yield tail


def _open_logs(root: Path) -> list[Any]:
    """The current and the rotated log, newest first, opened before reading either.

    Rotation is an os.replace of audit.jsonl onto audit.1.jsonl. An open handle keeps
    reading the file it opened, so if rotation lands between the two opens, both handles
    point at the same file; reading it twice would list every change twice, so the
    second handle is dropped (the old rotated file is gone by then anyway).
    """
    handles: list[Any] = []
    seen: set[tuple[int, int]] = set()
    for name in ("audit.jsonl", "audit.1.jsonl"):
        try:
            fh = (root / name).open("rb")
        except OSError:
            continue
        st = os.fstat(fh.fileno())
        key = (st.st_dev, st.st_ino)
        if key in seen:
            fh.close()
            continue
        seen.add(key)
        handles.append(fh)
    return handles


def _records(root: Path) -> Iterator[dict[str, Any]]:
    """Every record that parses, newest first. A torn or corrupt line is skipped, so
    one bad write (a crash mid-append) never hides the rest of the history."""
    handles = _open_logs(root)
    try:
        for fh in handles:
            for line in _lines_backwards(fh):
                try:
                    rec = json.loads(line)
                except ValueError:
                    continue
                if isinstance(rec, dict) and isinstance(rec.get("time"), int | float):
                    yield rec
    finally:
        for fh in handles:
            fh.close()


def is_change(rec: dict[str, Any]) -> bool:
    """A failed or refused read is logged too, but it changed nothing."""
    return rec.get("risk") != "read"


def approval(rec: dict[str, Any]) -> str | None:
    """How the change was let through: asked (a person approved), auto, rule, reviewer,
    or denied. None for records with no decision, such as an undo clicked in the panel."""
    decision = rec.get("decision")
    if decision in ("denied", "reviewer_denied"):
        return "denied"
    if decision == "approved":
        return "asked"
    if decision == "reviewer_approved":
        return "reviewer"
    if decision == "auto":
        # Records written before the rule field existed log a rule's allow as plain auto.
        return "rule" if rec.get("rule") else "auto"
    return None


def parse_cursor(cursor: str | None) -> tuple[float, int] | None:
    """A page cursor is "<time>:<skip>": records older than time, plus how many records
    with exactly that time the earlier pages already showed. Times come from
    time.time(), so equal times are rare but possible within one turn."""
    if not cursor:
        return None
    try:
        when, _, skip = cursor.partition(":")
        return float(when), int(skip or 0)
    except ValueError:
        return None


def read_page(
    root: Path,
    filters: Filters,
    limit: int,
    cursor: str | None = None,
    snapshots: Path | None = None,
) -> dict[str, Any]:
    """One page of changes, newest first, and the cursor for the next page (None when
    there is no more). Runs in the executor: it does file I/O."""
    limit = max(1, min(limit, MAX_PAGE))
    start = first = parse_cursor(cursor)
    out: list[dict[str, Any]] = []
    more: str | None = None
    for rec in _records(root):
        when = float(rec["time"])
        if filters.until is not None and when > filters.until:
            continue
        if filters.since is not None and when < filters.since:
            break  # the log is in time order: everything after this is older still
        if start is not None and when > start[0]:
            continue
        if not is_change(rec) or not filters.match(rec):
            continue
        if start is not None and when == start[0] and start[1] > 0:
            start = (start[0], start[1] - 1)  # shown on the page before
            continue
        if len(out) == limit:
            last = float(out[-1]["time"])
            same = sum(1 for r in out if float(r["time"]) == last)
            if first is not None and last == first[0]:
                same += first[1]  # a run of equal times can span more than two pages
            more = f"{last!r}:{same}"
            break
        out.append(rec)
    return {"changes": [_row(r, snapshots) for r in out], "cursor": more}


def _undo_state(snap_id: Any, snapshots: Path | None) -> str | None:
    """available, undone, gone (pruned by the snapshot limits) or None (nothing to undo).
    Uses the same snapshot files and undone marker as llm_agent/undo, so the button here
    and the one in the chat can never disagree."""
    if not isinstance(snap_id, str) or snapshots is None:
        return None
    if not snap_id or "/" in snap_id or ".." in snap_id:
        return None
    try:
        snap = json.loads((snapshots / f"{snap_id}.json").read_text(encoding="utf-8"))
    except OSError, ValueError:
        return "gone"
    return "undone" if snap.get("undone") else "available"


def _row(rec: dict[str, Any], snapshots: Path | None) -> dict[str, Any]:
    snap_id = rec.get("snapshot_id")
    ok = bool(rec.get("ok"))
    return {
        "time": float(rec["time"]),
        "conversation_id": rec.get("conversation"),
        "user_id": rec.get("user"),
        "tool": rec.get("tool") or "",
        "args": rec.get("args") or "",
        "risk": rec.get("risk"),
        "approval": approval(rec),
        "ok": ok,
        "detail": rec.get("detail") or "",
        "reviewer": rec.get("reviewer"),
        "snapshot_id": snap_id if isinstance(snap_id, str) else None,
        # a failed call saved no snapshot worth restoring
        "undo": _undo_state(snap_id, snapshots) if ok else None,
    }


async def user_names(hass: HomeAssistant) -> dict[str, str]:
    """People, not the Supervisor and other accounts Home Assistant makes for itself."""
    users = await hass.auth.async_get_users()
    return {u.id: u.name or "" for u in users if not u.system_generated}


def chat_titles(hass: HomeAssistant) -> dict[str, str]:
    agent = hass.data.get(DOMAIN)
    if agent is None:
        return {}
    return {c["id"]: c.get("title", "") for c in agent.store.list()}


def matching(table: dict[str, str], text: str) -> frozenset[str]:
    """Keys whose value contains text, or the key itself when text is an exact id."""
    needle = text.strip().lower()
    return frozenset(k for k, v in table.items() if k == text or needle in v.lower())


async def query(
    hass: HomeAssistant,
    filters: Filters,
    limit: int,
    cursor: str | None = None,
) -> dict[str, Any]:
    """A page with chat titles and user names filled in, as they are now."""
    agent = hass.data.get(DOMAIN)
    if agent is None:
        return {"changes": [], "cursor": None}
    titles = filters.titles if filters.titles is not None else chat_titles(hass)
    names = filters.names if filters.names is not None else await user_names(hass)
    filters.titles, filters.names = titles, names
    page = await hass.async_add_executor_job(
        read_page, agent.snapshots.root, filters, limit, cursor, agent.snapshots.dir
    )
    for row in page["changes"]:
        row["chat_title"] = titles.get(str(row["conversation_id"]))
        row["user_name"] = names.get(str(row["user_id"]))
    return page
