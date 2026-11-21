"""Per-chat modes (Accept edits, Planning), the tool budget the model is told about,
repeated reads answered from the first result, and the turn log."""

from __future__ import annotations

import json
from typing import Any
from unittest.mock import patch

from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.llm_agent.agent import (
    PLANNING_PROMPT,
    REPEAT_NOTE,
    Agent,
    ChatRun,
    chat_mode,
    set_chat_mode,
)
from custom_components.llm_agent.approval import Level, Risk, is_setup, needs_approval
from custom_components.llm_agent.turnlog import MAX_ARG_CHARS, TurnLog

from .conftest import entry_options
from .test_agent import ScriptedProvider, reply_text, reply_tool
from .test_household import _token
from .test_init import _setup


async def _turn(
    hass: HomeAssistant,
    provider: ScriptedProvider,
    text: str = "go",
    mode: str | None = None,
    on_event=None,
    agent: Agent | None = None,
    **opts: Any,
) -> tuple[Agent, dict[str, Any], list[dict[str, Any]]]:
    if agent is None:
        agent = Agent(hass, entry_options(**opts))
        await agent.store.async_load()
    conv = await agent.store.create("p1", "gpt-5.4-mini", "ctx")
    if mode:
        set_chat_mode(conv, mode)
    run = ChatRun(agent, conv, None)
    events: list[dict[str, Any]] = []

    def listener(event: dict[str, Any]) -> None:
        events.append(event)
        if on_event:
            on_event(run, event)

    run.listeners.add(listener)
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await run.run(text)
    return agent, conv, events


def _tools(conv: dict[str, Any]) -> list[dict[str, Any]]:
    return [m for m in conv["messages"] if m["role"] == "tool"]


def _light_on(call_id: str = "c1") -> list[Any]:
    return reply_tool(
        call_id,
        "call_service",
        {"domain": "light", "service": "turn_on", "target": {"entity_id": "light.kitchen"}},
    )


# ---- Accept edits ---------------------------------------------------------------


def test_setup_is_a_fixed_list_and_call_service_is_never_on_it() -> None:
    assert is_setup("save_config_item", {"kind": "automation"})
    assert is_setup("update_registry", {"kind": "entity", "action": "update"})
    assert is_setup("ha_websocket", {"command": "input_boolean/create"})
    assert is_setup("ha_websocket", {"command": "config/entity_registry/update"})
    assert not is_setup("ha_websocket", {"command": "input_boolean/delete"})
    assert not is_setup("ha_websocket", {"command": "call_service"})
    assert not is_setup("call_service", {"domain": "automation", "service": "reload"})
    assert not is_setup("write_file", {"path": "configuration.yaml"})
    assert not is_setup("shell", {"command": "ls"})


def test_accept_edits_lets_setup_writes_through_and_asks_for_the_rest() -> None:
    write, risky = Risk.write(), Risk.risky("deletes automation x")
    assert not needs_approval("accept_edits", write, setup=True)
    assert needs_approval("accept_edits", write, setup=False)  # a lamp, a file
    assert needs_approval("accept_edits", risky, setup=True)  # deleting still asks
    assert not needs_approval("accept_edits", Risk.read())


async def test_accept_edits_runs_a_rename_and_asks_before_a_light(hass: HomeAssistant) -> None:
    lights = async_mock_service(hass, "light", "turn_on")
    hass.states.async_set("light.kitchen", "off")
    provider = ScriptedProvider(
        [
            reply_tool(
                "c1",
                "update_registry",
                {"kind": "area", "action": "create", "changes": {"name": "Den"}},
            ),
            _light_on("c2"),
            reply_text("Done."),
        ]
    )

    def deny(run: ChatRun, event: dict[str, Any]) -> None:
        if event["type"] == "approval":
            run.answer(event["call_id"], False)

    _, conv, events = await _turn(hass, provider, mode="accept_edits", on_event=deny)
    approvals = [e["call_id"] for e in events if e["type"] == "approval"]
    assert approvals == ["c2"]  # the area was made without asking; the light asked
    assert ar.async_get(hass).async_get_area_by_name("Den") is not None
    assert lights == []
    assert _tools(conv)[1]["content"].startswith("The user denied this action.")


async def test_accept_edits_still_obeys_a_deny_rule(hass: HomeAssistant) -> None:
    provider = ScriptedProvider(
        [
            reply_tool(
                "c1",
                "update_registry",
                {"kind": "area", "action": "create", "changes": {"name": "Den"}},
            ),
            reply_text("Can't."),
        ]
    )
    _, conv, events = await _turn(
        hass, provider, mode="accept_edits", approval_rules="deny update_registry"
    )
    assert not any(e["type"] == "approval" for e in events)
    assert "approval rules don't allow this" in _tools(conv)[0]["content"]
    assert ar.async_get(hass).async_get_area_by_name("Den") is None


async def test_accept_edits_still_asks_for_what_is_on_the_always_ask_list(
    hass: HomeAssistant,
) -> None:
    provider = ScriptedProvider(
        [
            reply_tool(
                "c1",
                "update_registry",
                {"kind": "area", "action": "create", "changes": {"name": "Den"}},
            ),
            reply_text("OK."),
        ]
    )

    def deny(run: ChatRun, event: dict[str, Any]) -> None:
        if event["type"] == "approval":
            run.answer(event["call_id"], False)

    _, _, events = await _turn(
        hass, provider, mode="accept_edits", on_event=deny, always_ask="update_registry"
    )
    [approval] = [e for e in events if e["type"] == "approval"]
    assert "update_registry is on your always-ask list" in approval["reason"]
    assert ar.async_get(hass).async_get_area_by_name("Den") is None


# ---- Planning -------------------------------------------------------------------


async def test_planning_reads_but_changes_nothing_and_asks_for_a_plan(hass: HomeAssistant) -> None:
    lights = async_mock_service(hass, "light", "turn_on")
    hass.states.async_set("light.kitchen", "off")
    provider = ScriptedProvider(
        [
            reply_tool("c1", "get_entities", {"entity_ids": ["light.kitchen"]}),
            _light_on("c2"),
            reply_text("1. call_service light.turn_on on light.kitchen"),
        ]
    )
    _, conv, events = await _turn(hass, provider, mode="planning")
    assert lights == []
    assert not any(e["type"] == "approval" for e in events)
    read, change = _tools(conv)
    assert "light.kitchen" in read["content"] and not read["is_error"]
    assert change["is_error"] and "Planning mode is on" in change["content"]
    assert PLANNING_PROMPT in provider.calls[0]["system"]


def test_planning_remembers_the_mode_to_go_back_to() -> None:
    conv: dict[str, Any] = {"mode": "autopilot"}
    set_chat_mode(conv, "planning")
    set_chat_mode(conv, "planning")  # picking it again keeps the first answer
    assert conv == {"mode": "planning", "mode_before_plan": "autopilot"}
    fresh: dict[str, Any] = {}
    set_chat_mode(fresh, "planning")
    assert fresh["mode_before_plan"] is None  # the panel then goes back to Auto


def test_members_and_unattended_runs_keep_todays_rules() -> None:
    opts = {"approval_mode": "ask_all"}
    assert chat_mode(opts, {"mode": "accept_edits"}) == "accept_edits"
    assert chat_mode(opts, {}) == "ask_all"  # a chat from before modes were per chat
    assert chat_mode(opts, {"mode": "bogus"}) == "ask_all"
    for skipping in ("autopilot", "reviewer", "yolo", "accept_edits"):
        assert chat_mode(opts, {"mode": skipping}, member=True) == "ask_risky"
    assert chat_mode(opts, {"mode": "yolo"}, unattended=True) == "ask_all"


# ---- Tool budget ----------------------------------------------------------------


async def test_the_model_is_told_its_budget_and_reminded_at_80_percent(
    hass: HomeAssistant,
) -> None:
    for i in range(5):
        hass.states.async_set(f"sensor.s{i}", str(i))
    replies = [
        reply_tool(f"c{i}", "get_entities", {"entity_ids": [f"sensor.s{i}"]}) for i in range(4)
    ]
    provider = ScriptedProvider([*replies, reply_text("Done.")])
    agent, conv, _ = await _turn(hass, provider, max_steps=5)
    assert "at most 5 tool calls for this message" in provider.calls[0]["system"]
    contents = [m["content"] for m in _tools(conv)]
    assert ["Tool budget: 4 of 5" in c for c in contents] == [False, False, False, True]
    # and the model saw it on its next request
    sent = provider.calls[4]["messages"][-1]["content"]
    assert "Tool budget: 4 of 5 tool calls used" in sent
    assert agent.store.turns.records[-1]["budget_reminder"] is True


# ---- Repeated calls -------------------------------------------------------------


async def test_an_unchanged_repeated_read_runs_and_returns_a_short_note(
    hass: HomeAssistant,
) -> None:
    hass.states.async_set("sensor.t", "20")
    same = {"entity_ids": ["sensor.t"]}
    provider = ScriptedProvider(
        [
            reply_tool("c1", "get_entities", same),
            reply_tool("c2", "get_entities", same),
            reply_text("20."),
        ]
    )
    calls = 0
    from custom_components.llm_agent.tools.states import GetEntities

    real = GetEntities.run

    async def counting(self, ctx, args):
        nonlocal calls
        calls += 1
        return await real(self, ctx, args)

    with patch.object(GetEntities, "run", counting):
        agent, conv, _ = await _turn(hass, provider)
    first, second = _tools(conv)
    assert calls == 2  # run both times: only an identical result is shortened
    assert "sensor.t" in first["content"]
    assert second["content"] == REPEAT_NOTE
    assert provider.calls[2]["messages"][-1]["content"] == REPEAT_NOTE  # what the model saw
    record = agent.store.turns.records[-1]
    assert record["repeats"] == 1
    assert [c["repeat"] for c in record["tool_calls"]] == [False, True]


async def test_a_repeated_read_whose_result_changed_returns_the_new_result(
    hass: HomeAssistant,
) -> None:
    """A garage door polled while it opens: the second read must say so, never the
    first read's "opening" again."""
    hass.states.async_set("cover.garage", "opening")
    look = {"entity_ids": ["cover.garage"]}
    provider = ScriptedProvider(
        [
            reply_tool("c1", "get_entities", look),
            reply_tool("c2", "get_entities", look),
            reply_text("Open."),
        ]
    )

    def door_finishes(run: ChatRun, event: dict[str, Any]) -> None:
        if event["type"] == "tool_result" and event["call_id"] == "c1":
            hass.states.async_set("cover.garage", "open")

    agent, conv, _ = await _turn(hass, provider, on_event=door_finishes)
    first, second = _tools(conv)
    assert '"opening"' in first["content"]
    assert '"open"' in second["content"] and REPEAT_NOTE not in second["content"]
    assert agent.store.turns.records[-1]["repeats"] == 0


async def test_a_repeated_action_is_never_deduplicated(hass: HomeAssistant) -> None:
    lights = async_mock_service(hass, "light", "turn_on")
    hass.states.async_set("light.kitchen", "off")
    provider = ScriptedProvider([_light_on("c1"), _light_on("c2"), reply_text("Done.")])
    await _turn(hass, provider, approval_mode="autopilot")
    assert len(lights) == 2


# ---- Checkpoint hook ------------------------------------------------------------


async def test_checkpoint_hook_sees_each_step_and_can_note_a_decision(hass: HomeAssistant) -> None:
    hass.states.async_set("sensor.t", "20")
    agent = Agent(hass, entry_options())
    await agent.store.async_load()
    seen: list[str] = []

    async def hook(run: ChatRun, point: dict[str, Any]) -> None:
        seen.append(point["kind"])
        if point["kind"] == "tools":
            run.decide(f"manager: fine at step {point['steps']}")

    def broken(run: ChatRun, point: dict[str, Any]) -> None:
        raise RuntimeError("a hook bug must not stop the turn")

    remove = agent.add_checkpoint_hook(hook)
    agent.add_checkpoint_hook(broken)
    provider = ScriptedProvider(
        [reply_tool("c1", "get_entities", {"entity_ids": ["sensor.t"]}), reply_text("20.")]
    )
    _, conv, _ = await _turn(hass, provider, agent=agent)
    assert seen == ["model", "tools", "model", "end"]
    assert agent.store.turns.records[-1]["decisions"] == ["manager: fine at step 1"]
    assert conv["messages"][-1]["content"] == "20."
    remove()
    assert agent.checkpoint_hooks == [broken]


# ---- Turn log -------------------------------------------------------------------


async def test_each_turn_leaves_a_record_that_outlives_the_chat(hass: HomeAssistant) -> None:
    hass.states.async_set("sensor.t", "20")
    provider = ScriptedProvider(
        [
            reply_tool("c1", "get_entities", {"entity_ids": ["sensor.t"]}),
            reply_tool("c2", "no_such_tool", {}),
            reply_text("20."),
        ]
    )
    agent, conv, _ = await _turn(hass, provider, mode="read_only")
    await agent.store.delete(conv["id"])
    [record] = agent.store.turns.records
    assert record["conversation_id"] == conv["id"]
    assert record["mode"] == "read_only" and record["model"] == "gpt-5.4-mini"
    assert record["provider"] == "openai" and record["who"] == "admin"
    assert record["model_calls"] == 3 and record["stop"] == "end_turn"
    assert record["tokens"]["input"] == 500 and record["tokens"]["output"] == 50
    assert record["cost"] is not None and record["cost"] > 0
    assert len(record["prompt_version"]) == 12 and len(record["system_hash"]) == 12
    ok, bad = record["tool_calls"]
    assert ok["name"] == "get_entities" and ok["ok"] and ok["result_chars"] > 0
    assert ok["args"] == {"entity_ids": ["sensor.t"]}
    assert bad["ok"] is False and bad["error"].startswith("Unknown tool no_such_tool")
    assert record["latency_ms"] >= 0 and record["steps"] == 2
    line = agent.store.turns.jsonl().splitlines()[0]
    assert json.loads(line)["conversation_id"] == conv["id"]


async def test_turn_log_off_keeps_nothing(hass: HomeAssistant) -> None:
    agent, _, _ = await _turn(hass, ScriptedProvider([reply_text("Hi")]), turn_log=False)
    assert agent.store.turns.records == []


def test_turn_log_trims_by_age_then_size_and_keeps_the_newest(hass: HomeAssistant) -> None:
    log = TurnLog(hass, lambda *args: None)
    log.max_days, log.max_bytes = 30, 300
    now = 1_000_000_000.0
    log.add({"ts": now - 31 * 86400, "n": 0}, now)
    assert [r["n"] for r in log.records] == [0]  # the newest stays even when too old
    for n in range(1, 6):
        log.add({"ts": now, "n": n, "pad": "x" * 80}, now)
    assert [r["n"] for r in log.records] == [4, 5]  # 0 by age, then the oldest by size
    assert log.size() <= 300
    log.add({"ts": now, "n": 6, "pad": "x" * 1000}, now)
    assert [r["n"] for r in log.records] == [6]


def test_long_arguments_are_cut_in_the_record() -> None:
    from custom_components.llm_agent.turnlog import short_args

    out = short_args({"config": {"views": ["y" * (MAX_ARG_CHARS + 500)]}, "n": 3})
    assert out["n"] == 3
    assert out["config"]["views"][0].endswith(f"...(cut, {MAX_ARG_CHARS + 500} chars)")
    assert len(out["config"]["views"][0]) < MAX_ARG_CHARS + 40


# ---- WebSocket ------------------------------------------------------------------


async def test_ws_mode_is_kept_per_chat_and_new_chats_start_in_the_settings_mode(
    hass: HomeAssistant, hass_ws_client
) -> None:
    entry = await _setup(hass, approval_mode="ask_all")
    agent = entry.runtime_data
    client = await hass_ws_client(hass)
    provider = ScriptedProvider([reply_text("Hi"), reply_text("Plan: 1. x")])
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await client.send_json_auto_id({"type": "llm_agent/chat", "text": "hi"})
        conv_id = (await client.receive_json())["result"]["conversation_id"]
        while (await client.receive_json())["event"]["type"] != "done":
            pass
        assert (await agent.store.get(conv_id))["mode"] == "ask_all"
        await client.send_json_auto_id(
            {
                "type": "llm_agent/chat",
                "conversation_id": conv_id,
                "text": "plan",
                "mode": "planning",
            }
        )
        await client.receive_json()
        while (await client.receive_json())["event"]["type"] != "done":
            pass
    assert PLANNING_PROMPT in provider.calls[1]["system"]
    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/get", "conversation_id": conv_id}
    )
    got = (await client.receive_json())["result"]
    assert got["mode"] == "planning" and got["mode_before_plan"] == "ask_all"
    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/mode", "conversation_id": conv_id, "mode": "yolo"}
    )
    assert (await client.receive_json())["result"]["mode"] == "yolo"
    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/mode", "conversation_id": conv_id, "mode": "nope"}
    )
    assert not (await client.receive_json())["success"]
    assert agent.store.turns.records[-1]["mode"] == "planning"


async def test_ws_members_cannot_pick_yolo_or_read_the_turn_log(
    hass: HomeAssistant, hass_ws_client, hass_read_only_user
) -> None:
    await _setup(hass, household_chat=True)
    member = await hass_ws_client(hass, access_token=await _token(hass, hass_read_only_user))
    await member.send_json_auto_id({"type": "llm_agent/chat", "text": "hi", "mode": "yolo"})
    assert (await member.receive_json())["error"]["code"] == "not_allowed"
    await member.send_json_auto_id({"type": "llm_agent/turn_log"})
    assert (await member.receive_json())["error"]["code"] == "unauthorized"
    await member.send_json_auto_id({"type": "llm_agent/info"})
    assert "turn_log" not in (await member.receive_json())["result"]


async def test_ws_admin_exports_the_turn_log_as_jsonl(hass: HomeAssistant, hass_ws_client) -> None:
    entry = await _setup(hass)
    entry.runtime_data.store.turns.add({"ts": 1e12, "conversation_id": "a"})
    entry.runtime_data.store.turns.add({"ts": 1e12, "conversation_id": "b"})
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "llm_agent/turn_log"})
    result = (await client.receive_json())["result"]
    assert result["count"] == 2 and result["enabled"] is True
    lines = [json.loads(x) for x in result["jsonl"].splitlines()]
    assert [x["conversation_id"] for x in lines] == ["a", "b"]
    await client.send_json_auto_id({"type": "llm_agent/info"})
    assert (await client.receive_json())["result"]["turn_log"]["count"] == 2


def test_risk_levels_unchanged_for_the_old_modes() -> None:
    """The new modes must not shift the six existing ones."""
    for mode, write_asks, risky_asks in (
        ("ask_all", True, True),
        ("ask_risky", False, True),
        ("reviewer", False, True),
        ("autopilot", False, False),
        ("yolo", False, False),
        ("read_only", True, True),
    ):
        assert needs_approval(mode, Risk(Level.WRITE)) is write_asks, mode
        assert needs_approval(mode, Risk.risky("x")) is risky_asks, mode
