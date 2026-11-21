"""The turn log: what each chat turn did, kept for tuning the system prompt.

A chat holds the conversation, but not the numbers needed to judge the prompt (how many
tool calls a turn took, which ones repeated, where the tool budget ran out, what it
cost), and deleting a chat loses it. So every turn also leaves one flat record here, in
its own .storage file that chat deletion never touches. The format is documented in
docs/TURN_LOG.md for whoever reads the export.

Nothing here leaves Home Assistant: the only way out is an admin's export from the
panel. The log can be switched off per install, and it is bounded two ways, by age and
by size, so it can not grow without limit on a small SD card.
"""

from __future__ import annotations

from collections.abc import Callable
import hashlib
import json
import time
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN

VERSION = 1
# The record layout. Bumped when a field changes meaning, so a reader of an old export
# can tell; adding a field does not bump it.
RECORD_VERSION = 1
# Tool arguments are kept for tuning, but one huge argument (a whole dashboard) would
# crowd out hundreds of turns, so each string in them is cut to this.
MAX_ARG_CHARS = 2000
MAX_ERROR_CHARS = 500
MAX_DECISIONS = 50


def prompt_hash(text: str) -> str:
    """A short, stable id for a prompt text, to group turns by prompt version."""
    return hashlib.sha256(text.encode()).hexdigest()[:12]


def _short(value: Any) -> Any:
    if isinstance(value, str) and len(value) > MAX_ARG_CHARS:
        return value[:MAX_ARG_CHARS] + f"...(cut, {len(value)} chars)"
    if isinstance(value, dict):
        return {str(k): _short(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_short(v) for v in value]
    return value


def short_args(args: dict[str, Any]) -> dict[str, Any]:
    """Tool arguments as stored: JSON safe, each long string cut."""
    return _short(json.loads(json.dumps(args, default=str)))


class TurnLog:
    """Turn records, oldest first, trimmed by age and total size on every add."""

    def __init__(
        self,
        hass: HomeAssistant,
        delay_save: Callable[[str, Store[dict[str, Any]], Callable[[], Any]], None],
    ) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, VERSION, f"{DOMAIN}.turns")
        self._delay_save = delay_save
        self.records: list[dict[str, Any]] = []
        # serialized size of each record, kept beside it so trimming never re-encodes
        self._sizes: list[int] = []
        self.enabled = True
        self.max_days = 30
        self.max_bytes = 20 * 1024 * 1024

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.records = [r for r in data.get("records", []) if isinstance(r, dict)]
        self._sizes = [len(json.dumps(r, separators=(",", ":"))) for r in self.records]
        self.trim()

    def _changed(self) -> None:
        self._delay_save("turns", self._store, lambda: {"records": self.records})

    def add(self, record: dict[str, Any], now: float | None = None) -> bool:
        """Keep one record. Returns False when the log is off (nothing is kept)."""
        if not self.enabled:
            self.trim()  # switched off, what is kept still ages out
            return False
        self.records.append(record)
        self._sizes.append(len(json.dumps(record, separators=(",", ":"), default=str)))
        self.trim(now)
        self._changed()
        return True

    def trim(self, now: float | None = None) -> None:
        """Drop records past the age limit, then the oldest until under the size cap.
        The newest record always stays, even if it alone is over the cap."""
        cutoff = (now if now is not None else time.time()) - self.max_days * 86400
        drop = 0
        while drop < len(self.records) - 1 and self.records[drop].get("ts", 0) < cutoff:
            drop += 1
        total = sum(self._sizes[drop:])
        while drop < len(self.records) - 1 and total > self.max_bytes:
            total -= self._sizes[drop]
            drop += 1
        if drop:
            del self.records[:drop]
            del self._sizes[:drop]
            self._changed()

    def size(self) -> int:
        return sum(self._sizes)

    def jsonl(self) -> str:
        """Every record, one JSON object per line, oldest first."""
        return "".join(json.dumps(r, ensure_ascii=False, default=str) + "\n" for r in self.records)
