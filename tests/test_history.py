"""The change history: the Changes view and the change_history tool, read from the
audit log."""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any
from unittest.mock import patch

from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.llm_agent import history
from custom_components.llm_agent.tools import build_tools
from custom_components.llm_agent.tools.household import member_tools

from .conftest import entry_options
from .test_agent import ScriptedProvider, _run, reply_text, reply_tool
from .test_household import _token
from .test_init import _setup


def _write_log(path: Path, records: list[dict[str, Any]], extra: str = "") -> None:
    path.write_text("".join(json.dumps(r) + "\n" for r in records) + extra, encoding="utf-8")


def _rec(t: float, tool: str = "call_service", **kw: Any) -> dict[str, Any]:
    return {"time": t, "tool": tool, "risk": "write", "decision": "auto", "ok": True, **kw}


def test_reads_newest_first_across_rotation_and_skips_bad_lines(tmp_path: Path) -> None:
    """A crash mid-append leaves a torn line; it must not hide the rest of the history,
    and the rotated file must continue the list instead of being forgotten."""
    _write_log(tmp_path / "audit.1.jsonl", [_rec(1), _rec(2)])
    _write_log(
        tmp_path / "audit.jsonl",
        [_rec(3), _rec(4, risk="read"), _rec(5)],
        extra='not json\n{"time": 6, "tool": "x", "ri',
    )
    page = history.read_page(tmp_path, history.Filters(), 10)
    # 4 was a failed read: logged, but nothing changed
    assert [r["time"] for r in page["changes"]] == [5, 3, 2, 1]
    assert page["cursor"] is None


def test_a_file_seen_twice_during_rotation_is_listed_once(tmp_path: Path) -> None:
    """Rotation between opening the two files makes both names one file; listing it
    twice would show every change twice."""
    _write_log(tmp_path / "audit.jsonl", [_rec(1), _rec(2)])
    os.link(tmp_path / "audit.jsonl", tmp_path / "audit.1.jsonl")
    page = history.read_page(tmp_path, history.Filters(), 10)
    assert [r["time"] for r in page["changes"]] == [2, 1]


def test_pages_cover_every_record_once_even_with_equal_times(tmp_path: Path) -> None:
    """A cursor on time alone would drop or repeat records sharing a timestamp at a page
    boundary."""
    times = [1, 2, 2, 2, 2, 2, 3, 4]
    _write_log(tmp_path / "audit.jsonl", [_rec(t, args=str(i)) for i, t in enumerate(times)])
    seen: list[str] = []
    cursor = None
    for _ in range(10):
        page = history.read_page(tmp_path, history.Filters(), 2, cursor)
        seen += [r["args"] for r in page["changes"]]
        cursor = page["cursor"]
        if cursor is None:
            break
    assert seen == [str(i) for i in reversed(range(len(times)))]


def test_reading_stops_at_since_and_blocks_join_long_logs(tmp_path: Path, monkeypatch) -> None:
    """Lines cut by a block boundary must come back whole."""
    monkeypatch.setattr(history, "BLOCK", 37)
    _write_log(tmp_path / "audit.jsonl", [_rec(t, args="x" * t) for t in range(1, 60)])
    page = history.read_page(tmp_path, history.Filters(since=50, until=55), 100)
    assert [(r["time"], r["args"]) for r in page["changes"]] == [
        (t, "x" * t) for t in range(55, 49, -1)
    ]


def test_approval_words_come_from_the_record() -> None:
    assert history.approval({"decision": "approved"}) == "asked"
    assert history.approval({"decision": "auto"}) == "auto"
    assert history.approval({"decision": "auto", "rule": "light.*"}) == "rule"
    assert history.approval({"decision": "reviewer_approved"}) == "reviewer"
    assert history.approval({"decision": "reviewer_denied"}) == "denied"
    assert history.approval({"tool": "undo"}) is None  # an undo clicked in the panel


def _write_file_chat(name: str) -> list[list[Any]]:
    return [
        reply_tool("c1", "write_file", {"path": name, "content": "hello\n"}),
        reply_text("Written."),
    ]


async def test_changes_view_lists_a_change_and_undoes_it(
    hass: HomeAssistant, hass_ws_client, hass_admin_user, tmp_path: Path
) -> None:
    """The full path: a chat change is logged with its snapshot, the Changes view shows
    it with its chat and person and an Undo, and Undo goes through the existing undo."""
    hass.config.config_dir = str(tmp_path)
    entry = await _setup(hass, approval_mode="autopilot")
    agent = entry.runtime_data
    client = await hass_ws_client(hass)
    provider = ScriptedProvider(_write_file_chat("porch.txt"))
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await client.send_json_auto_id({"type": "llm_agent/chat", "text": "write it"})
        conv_id = (await client.receive_json())["result"]["conversation_id"]
        while (await client.receive_json())["event"]["type"] != "done":
            pass
    await agent.store.rename(conv_id, "Porch light")

    await client.send_json_auto_id({"type": "llm_agent/changes"})
    page = (await client.receive_json())["result"]
    row = page["changes"][0]
    assert row["tool"] == "write_file" and "porch.txt" in row["args"]
    assert row["chat_title"] == "Porch light" and row["conversation_id"] == conv_id
    assert row["user_name"] == hass_admin_user.name
    assert row["approval"] == "auto" and row["ok"] is True
    assert row["undo"] == "available" and row["snapshot_id"]
    assert {"id": conv_id, "title": "Porch light"} in page["chats"]

    await client.send_json_auto_id(
        {"type": "llm_agent/undo", "snapshot_id": row["snapshot_id"], "conversation_id": conv_id}
    )
    assert (await client.receive_json())["success"]
    assert not (tmp_path / "porch.txt").exists()

    await client.send_json_auto_id({"type": "llm_agent/changes", "text": "porch"})
    rows = (await client.receive_json())["result"]["changes"]
    # the undo itself is listed, linked to the same chat; the change can't be undone twice
    assert [r["tool"] for r in rows] == ["undo", "write_file"]
    assert rows[0]["conversation_id"] == conv_id
    assert rows[1]["undo"] == "undone"


async def test_household_members_cannot_list_changes(
    hass: HomeAssistant, hass_ws_client, hass_read_only_user
) -> None:
    await _setup(hass, household_chat=True)
    member = await hass_ws_client(hass, access_token=await _token(hass, hass_read_only_user))
    await member.send_json_auto_id({"type": "llm_agent/changes"})
    assert (await member.receive_json())["error"]["code"] == "unauthorized"
    # and their chats never get the tool that reads the same log
    assert "change_history" not in {t.name for t in member_tools()}
    assert "change_history" in {t.name for t in build_tools(entry_options())}


async def test_tool_answers_what_a_chat_changed_even_in_read_only_mode(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    """Read-only mode refuses changes; asking what was changed must still work."""
    hass.config.config_dir = str(tmp_path)
    root = tmp_path / ".llm_agent"
    root.mkdir()
    agent_entry = await _setup(hass)
    store = agent_entry.runtime_data.store
    porch = await store.create("p1", "m", "")
    await store.rename(porch["id"], "Porch light")
    other = await store.create("p1", "m", "")
    await store.rename(other["id"], "Kitchen")
    _write_log(
        root / "audit.jsonl",
        [
            _rec(1_700_000_000, conversation=porch["id"], args='{"entity_id": "light.porch"}'),
            _rec(1_700_000_100, conversation=other["id"], args='{"entity_id": "light.kitchen"}'),
            _rec(
                1_700_000_200,
                decision="denied",
                ok=False,
                detail="rule: deny lock.*",
                conversation=porch["id"],
                args='{"entity_id": "lock.front"}',
            ),
        ],
    )
    provider = ScriptedProvider(
        [reply_tool("c1", "change_history", {"chat": "porch"}), reply_text("Two things.")]
    )
    conv, _ = await _run(
        hass, provider, "what did the porch chat change?", approval_mode="read_only"
    )
    tool = next(m for m in conv["messages"] if m["role"] == "tool")
    assert not tool.get("is_error")
    data = json.loads(tool["content"]) if tool["content"].startswith("{") else tool["content"]
    text = json.dumps(data)
    assert "Read-only" not in text
    assert "light.porch" in text and "lock.front" in text and "light.kitchen" not in text
    assert '"approval": "denied"' in text and '"chat": "Porch light"' in text


async def test_a_change_a_rule_allowed_is_shown_as_rule_not_auto(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    """Without the rule in the record, an allow rule's change would read as if the
    approval mode let it through."""
    hass.config.config_dir = str(tmp_path)
    async_mock_service(hass, "light", "turn_on")
    hass.states.async_set("light.porch", "off")
    call = {"domain": "light", "service": "turn_on", "target": {"entity_id": "light.porch"}}
    provider = ScriptedProvider([reply_tool("c1", "call_service", call), reply_text("On.")])
    await _run(hass, provider, "porch on", approval_mode="ask_all", approval_rules="allow light.*")
    rows = history.read_page(tmp_path / ".llm_agent", history.Filters(), 10)["changes"]
    assert [(r["tool"], r["approval"]) for r in rows] == [("call_service", "rule")]
