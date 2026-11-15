"""Home notes and the knowledge base: edited in the panel or proposed by the AI, and sent
to admin chats (notes in full, knowledge as an index only)."""

from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any
from unittest.mock import patch

from homeassistant.core import HomeAssistant
import pytest

from custom_components.llm_agent.approval import Level
from custom_components.llm_agent.const import (
    KNOWLEDGE_INDEX_MAX,
    NOTE_MAX,
    NOTES_MAX,
)
from custom_components.llm_agent.snapshots import Snapshots
from custom_components.llm_agent.store import ConversationStore, Refused
from custom_components.llm_agent.tools import ToolContext, ToolError, build_tools
from custom_components.llm_agent.tools.system import restore_snapshot

from .conftest import entry_options
from .test_agent import ScriptedProvider, reply_text
from .test_init import _setup


def _tool(name: str = "change_home_note"):
    return next(t for t in build_tools(entry_options()) if t.name == name)


async def _chat_system(hass: HomeAssistant, client) -> str:
    """The system prompt one admin chat turn sends."""
    provider = ScriptedProvider([reply_text("Hi.")])
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await client.send_json_auto_id({"type": "llm_agent/chat", "text": "hello"})
        assert (await client.receive_json())["success"]
        while (await client.receive_json())["event"]["type"] != "done":
            pass
    return provider.calls[0]["system"]


# Migration


async def test_the_old_notes_text_becomes_one_enabled_note_per_line(
    hass: HomeAssistant, hass_storage: dict[str, Any]
) -> None:
    long_line = "x" * (NOTE_MAX + 50)  # allowed before 0.10; must not be cut
    hass_storage["llm_agent.conversations"] = {
        "version": 1,
        "key": "llm_agent.conversations",
        "data": {
            "conversations": {},
            "notes": f"Office is upstairs.\n\n  Freezer stays on. \n{long_line}",
        },
    }
    store = ConversationStore(hass)
    await store.async_load()
    assert [(n["text"], n["enabled"]) for n in store.home.notes] == [
        ("Office is upstairs.", True),
        ("Freezer stays on.", True),
        (long_line, True),
    ]
    # The notes are written to their own file at once, and the index drops the old key.
    assert len(hass_storage["llm_agent.home_notes"]["data"]["notes"]) == 3
    await store.flush()
    assert "notes" not in hass_storage["llm_agent.conversations"]["data"]
    # A second load reads the new file and does not migrate again.
    again = ConversationStore(hass)
    await again.async_load()
    assert [n["id"] for n in again.home.notes] == [n["id"] for n in store.home.notes]


async def test_a_leftover_old_text_does_not_override_migrated_notes(
    hass: HomeAssistant, hass_storage: dict[str, Any]
) -> None:
    # The notes file was written but HA stopped before the index dropped the old text.
    hass_storage["llm_agent.conversations"] = {
        "version": 1,
        "key": "llm_agent.conversations",
        "data": {"conversations": {}, "notes": "Old text."},
    }
    hass_storage["llm_agent.home_notes"] = {
        "version": 1,
        "key": "llm_agent.home_notes",
        "data": {"notes": [{"id": "n1", "text": "Edited since.", "enabled": True}]},
    }
    store = ConversationStore(hass)
    await store.async_load()
    assert [n["text"] for n in store.home.notes] == ["Edited since."]


# Limits


async def test_notes_over_the_room_left_are_refused_with_the_room_left(
    hass: HomeAssistant,
) -> None:
    store = ConversationStore(hass)
    await store.async_load()
    home = store.home
    for _ in range(NOTES_MAX // NOTE_MAX):
        home.save_note(None, "y" * NOTE_MAX)
    left = NOTES_MAX - (NOTES_MAX // NOTE_MAX) * NOTE_MAX
    with pytest.raises(Refused, match=f"{left} are left"):
        home.save_note(None, "z" * (left + 1))
    # A disabled note takes no room, so it can be added, but not enabled while full.
    off = home.save_note(None, "z" * (left + 1), enabled=False)
    with pytest.raises(Refused, match="are left"):
        home.save_note(off["id"], enabled=True)
    with pytest.raises(Refused, match=f"at most {NOTE_MAX}"):
        home.save_note(None, "a" * (NOTE_MAX + 1), enabled=False)
    assert home.room() == left


async def test_the_knowledge_index_has_a_budget_and_bodies_have_a_limit(
    hass: HomeAssistant,
) -> None:
    store = ConversationStore(hass)
    await store.async_load()
    home = store.home
    with pytest.raises(Refused, match="body can be at most"):
        home.save_entry(None, "T", "S", "b" * 20001)
    added = 0
    with pytest.raises(Refused, match="are left"):
        for i in range(100):
            home.save_entry(None, f"Title {i}", "s" * 150, "body")
            added += 1
    assert 0 < added < 100
    assert len(home.knowledge_index()) <= KNOWLEDGE_INDEX_MAX


# The panel


async def test_the_panel_adds_toggles_edits_and_deletes_notes(
    hass: HomeAssistant, hass_ws_client
) -> None:
    entry = await _setup(hass)
    client = await hass_ws_client(hass)

    async def send(msg: dict[str, Any]) -> dict[str, Any]:
        await client.send_json_auto_id(msg)
        return await client.receive_json()

    save = {"type": "llm_agent/home_notes/save", "kind": "note"}
    res = (await send({**save, "text": " Office is\nupstairs. "}))["result"]
    note = res["notes"][0]
    assert note["text"] == "Office is upstairs." and note["enabled"] is True
    assert note["added_by"] == "person" and note["user_id"]
    assert res["room"] == NOTES_MAX - len("Office is upstairs.")
    off = await send({**save, "item_id": note["id"], "enabled": False, "base": note["updated"]})
    assert off["result"]["room"] == NOTES_MAX
    # A save from a copy older than the stored note is refused.
    stale = await send({**save, "item_id": note["id"], "text": "Mine.", "base": note["updated"]})
    assert stale["error"]["code"] == "changed"
    current = off["result"]["notes"][0]
    edited = await send(
        {**save, "item_id": note["id"], "text": "Office: upstairs.", "base": current["updated"]}
    )
    assert edited["result"]["notes"][0]["text"] == "Office: upstairs."
    too_long = await send({**save, "text": "x" * (NOTE_MAX + 1)})
    assert too_long["error"]["code"] == "refused" and str(NOTE_MAX) in too_long["error"]["message"]
    gone = await send(
        {"type": "llm_agent/home_notes/delete", "kind": "note", "item_id": note["id"]}
    )
    assert gone["result"]["notes"] == []
    assert entry.runtime_data.store.home.notes == []


async def test_only_enabled_items_reach_the_chat_and_knowledge_only_as_an_index(
    hass: HomeAssistant, hass_ws_client
) -> None:
    entry = await _setup(hass)
    home = entry.runtime_data.store.home
    kept = home.save_note(None, "Office is upstairs.")
    home.save_note(None, "The old router is in the loft.", enabled=False)
    boiler = home.save_entry(None, "Boiler", "Zones and timers", "Zone 2 is the BODY-MARKER.")
    home.save_entry(None, "Old alarm", "Removed in 2024", "gone", enabled=False)
    client = await hass_ws_client(hass)
    system = await _chat_system(hass, client)
    assert f"- [{kept['id']}] Office is upstairs." in system
    assert "loft" not in system
    assert f"- {boiler['id']}: Boiler: Zones and timers" in system
    assert "BODY-MARKER" not in system and "Old alarm" not in system
    # The rule that notes are not for correcting the AI is in the prompt itself.
    assert "Extra instructions setting" in system

    read = _tool("read_knowledge")
    ctx = ToolContext(hass, None, entry_options(), None)
    out = await read.run(ctx, {"id": boiler["id"]})
    assert "BODY-MARKER" in out.data
    disabled = home.knowledge[1]["id"]
    with pytest.raises(ToolError, match=boiler["id"]):
        await read.run(ctx, {"id": disabled})


def test_tool_descriptions_send_behaviour_changes_to_extra_instructions() -> None:
    for name in ("change_home_note", "change_knowledge"):
        assert "Extra instructions setting" in _tool(name).description


# The AI's suggestions


async def test_ai_note_changes_always_ask_show_one_note_and_can_be_undone(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    hass.config.config_dir = str(tmp_path)  # undo snapshots go here
    entry = await _setup(hass)
    home = entry.runtime_data.store.home
    office = home.save_note(None, "Office is upstairs.")
    home.save_note(None, "Bins go out on Tuesday.")
    ctx = ToolContext(hass, "u1", entry_options(approval_mode="autopilot"), Snapshots(hass))
    tool = _tool()

    args = tool.check_args({"action": "add", "text": "Never switch off the freezer plug."})
    assert tool.classify(ctx, args).level is Level.RISKY
    preview = await tool.preview(ctx, args)
    assert "+Never switch off the freezer plug." in preview.diff
    assert "Office" not in preview.diff and "Bins" not in preview.diff  # one note only
    added = await tool.run(ctx, args)
    note = added.data["note"]
    assert note["added_by"] == "agent" and note["user_id"] == "u1"

    args = tool.check_args({"action": "edit", "id": office["id"], "text": "Office: upstairs."})
    preview = await tool.preview(ctx, args)
    assert "-Office is upstairs." in preview.diff and "+Office: upstairs." in preview.diff
    edited = await tool.run(ctx, args)
    assert home.note(office["id"])["text"] == "Office: upstairs."

    args = tool.check_args({"action": "disable", "id": office["id"]})
    preview = await tool.preview(ctx, args)
    assert preview.summary == "Disable home note" and "-Office: upstairs." in preview.diff
    await tool.run(ctx, args)
    assert home.note(office["id"])["enabled"] is False

    args = tool.check_args({"action": "remove", "id": note["id"]})
    await tool.preview(ctx, args)
    removed = await tool.run(ctx, args)
    assert home.note(note["id"]) is None

    await restore_snapshot(ctx, removed.snapshot_id)
    assert home.note(note["id"])["text"] == "Never switch off the freezer plug."
    await restore_snapshot(ctx, edited.snapshot_id)
    assert home.note(office["id"])["text"] == "Office is upstairs."
    await restore_snapshot(ctx, added.snapshot_id)
    assert home.note(note["id"]) is None
    with pytest.raises(ToolError, match="limited"):
        tool.check_args({"action": "add", "text": "x" * (NOTE_MAX + 1)})


async def test_ai_knowledge_changes_ask_and_can_be_undone(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    hass.config.config_dir = str(tmp_path)
    entry = await _setup(hass)
    home = entry.runtime_data.store.home
    ctx = ToolContext(hass, None, entry_options(), Snapshots(hass))
    tool = _tool("change_knowledge")
    with pytest.raises(ToolError, match="title, a summary and a body"):
        tool.check_args({"action": "add", "title": "Boiler"})
    args = tool.check_args(
        {"action": "add", "title": "Boiler", "summary": "Zones", "body": "Zone 1 is down."}
    )
    preview = await tool.preview(ctx, args)
    assert "+# Boiler" in preview.diff and "+Zone 1 is down." in preview.diff
    out = await tool.run(ctx, args)
    entry_id = out.data["entry"]["id"]
    args = tool.check_args({"action": "edit", "id": entry_id, "body": "Zone 1 is the hall."})
    preview = await tool.preview(ctx, args)
    assert "-Zone 1 is down." in preview.diff and "+Zone 1 is the hall." in preview.diff
    assert "+# Boiler" not in preview.diff  # an unchanged title is not shown as changed
    edit = await tool.run(ctx, args)
    assert home.entry(entry_id)["title"] == "Boiler"
    await restore_snapshot(ctx, edit.snapshot_id)
    assert home.entry(entry_id)["body"] == "Zone 1 is down."


async def test_an_approved_change_over_a_newer_note_is_refused(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    hass.config.config_dir = str(tmp_path)
    entry = await _setup(hass)
    home = entry.runtime_data.store.home
    note = home.save_note(None, "A.")
    ctx = ToolContext(hass, None, entry_options(), Snapshots(hass))
    tool = _tool()
    args = tool.check_args({"action": "edit", "id": note["id"], "text": "B."})
    await tool.preview(ctx, args)
    home.save_note(note["id"], "C.")  # someone saved in the panel while the card waited
    with pytest.raises(ToolError, match="changed while"):
        await tool.run(ctx, args)
    assert home.note(note["id"])["text"] == "C."


async def test_a_panel_save_during_the_snapshot_write_is_kept(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    hass.config.config_dir = str(tmp_path)
    entry = await _setup(hass)
    home = entry.runtime_data.store.home
    note = home.save_note(None, "A.")
    snaps = Snapshots(hass)
    real_save = snaps.save

    async def save_while_panel_saves(*a, **k):
        home.save_note(note["id"], "C.")
        return await real_save(*a, **k)

    snaps.save = save_while_panel_saves
    ctx = ToolContext(hass, None, entry_options(), snaps)
    tool = _tool()
    args = tool.check_args({"action": "disable", "id": note["id"]})
    await tool.preview(ctx, args)
    with pytest.raises(ToolError, match="changed while"):
        await tool.run(ctx, args)
    assert home.note(note["id"]) == {**home.note(note["id"]), "text": "C.", "enabled": True}


async def test_an_approved_add_that_no_longer_fits_is_refused_with_the_room_left(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    hass.config.config_dir = str(tmp_path)
    entry = await _setup(hass)
    home = entry.runtime_data.store.home
    ctx = ToolContext(hass, None, entry_options(), Snapshots(hass))
    tool = _tool()
    args = tool.check_args({"action": "add", "text": "y" * NOTE_MAX})
    await tool.preview(ctx, args)
    for _ in range(NOTES_MAX // NOTE_MAX):  # the panel filled the room meanwhile
        home.save_note(None, "z" * NOTE_MAX)
    with pytest.raises(ToolError, match="are left"):
        await tool.run(ctx, args)


async def test_undo_of_a_change_from_before_the_note_list_still_works(
    hass: HomeAssistant, tmp_path: Path
) -> None:
    hass.config.config_dir = str(tmp_path)
    entry = await _setup(hass)
    snaps = Snapshots(hass)
    snap = await snaps.save("notes", "Update home notes", {"notes": "A.\nB."})
    await restore_snapshot(ToolContext(hass, None, entry_options(), snaps), snap)
    assert [n["text"] for n in entry.runtime_data.store.home.notes] == ["A.", "B."]


@pytest.mark.parametrize("mode", ["autopilot", "reviewer"])
async def test_only_a_person_approves_notes_knowledge_and_their_undo(
    hass: HomeAssistant, tmp_path: Path, mode: str
) -> None:
    from custom_components.llm_agent.agent import ChatRun

    from .test_agent import _run, reply_tool

    hass.config.config_dir = str(tmp_path)
    await _setup(hass)  # the tools read the set-up integration's store
    reviews: list = []

    async def no_reviewer(*a, **k):
        reviews.append(a)
        raise AssertionError("the reviewer must not be asked")

    def deny(run: ChatRun, event: dict) -> None:
        if event["type"] == "approval":
            asyncio.get_running_loop().call_soon(run.answer, event["call_id"], False, "")

    snaps = Snapshots(hass)
    snap = await snaps.save("knowledge", "Add knowledge entry", {"item_id": "k1", "item": None})
    provider = ScriptedProvider(
        [
            reply_tool("n1", "change_home_note", {"action": "add", "text": "Never mind."}),
            reply_tool(
                "k1",
                "change_knowledge",
                {"action": "add", "title": "T", "summary": "S", "body": "B"},
            ),
            reply_tool("u1", "undo", {"snapshot_id": snap}),
            reply_text("OK."),
        ]
    )
    with patch("custom_components.llm_agent.agent.ChatRun._review", no_reviewer):
        _, events = await _run(hass, provider, "remember", on_event=deny, approval_mode=mode)
    approvals = [e for e in events if e["type"] == "approval"]
    assert len(approvals) == 3
    assert all("only a person" in e["reason"] for e in approvals)
    assert not reviews


async def test_scheduled_runs_cannot_change_notes(hass: HomeAssistant, tmp_path: Path) -> None:
    from custom_components.llm_agent.agent import Agent, ChatRun

    from .test_agent import reply_tool

    hass.config.config_dir = str(tmp_path)
    agent = Agent(hass, entry_options(approval_mode="autopilot"))
    await agent.store.async_load()
    conv = await agent.store.create("p1", "gpt-5.4-mini", "")
    run = ChatRun(agent, conv, None, unattended=True)
    provider = ScriptedProvider(
        [reply_tool("n1", "change_home_note", {"action": "add", "text": "x"}), reply_text("No.")]
    )
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await run.run("remember x")
    assert agent.store.home.notes == []


def test_small_models_can_still_remember_and_read_knowledge() -> None:
    from custom_components.llm_agent.tools import LEAN_TOOLS

    assert {"change_home_note", "read_knowledge"} <= LEAN_TOOLS


async def test_abandoned_note_cards_are_not_kept_forever(hass: HomeAssistant) -> None:
    await _setup(hass)
    ctx = ToolContext(hass, None, entry_options(), None)
    tool = _tool()
    kept = [tool.check_args({"action": "add", "text": f"A {i}"}) for i in range(100)]
    for args in kept:
        await tool.preview(ctx, args)
    assert len(tool._shown) <= 64
