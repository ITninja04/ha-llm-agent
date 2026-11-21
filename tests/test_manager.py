"""The Manager: a decision model that checks long turns and steers them.

The failures these guard against:
- a public install that never opted in being billed for checks,
- a steer that ends up in the stored tool output (and so in the panel and in undo)
  instead of only in what the model reads,
- a Manager failure that changes the turn,
- a turn continued past the limit more often than allowed,
- model text reaching the chat model as an instruction.
"""

from __future__ import annotations

import asyncio
import json
from typing import Any
from unittest.mock import patch

from homeassistant.core import HomeAssistant

from custom_components.llm_agent.agent import Agent, ChatRun
from custom_components.llm_agent.manager import (
    CONTINUE_TEXT,
    MAX_HISTORY,
    STEER_PREFIX,
    STEERS,
    Decision,
    JevDecider,
    Step,
    Thresholds,
    Watch,
    build_state,
    parse_answers,
    with_steers,
)
from custom_components.llm_agent.providers.base import Done, TextDelta, ToolCall, Usage
from custom_components.llm_agent.websocket import _public

from .conftest import PROVIDER, entry_options

ROUTER = {
    "id": "p2",
    "type": "openrouter",
    "name": "Router",
    "api_key": "sk-or-test",
    "base_url": "http://router.invalid/api/v1",
    "default_model": "x/y",
}


class ScriptedProvider:
    def __init__(self, replies: list[list[Any]]) -> None:
        self.replies = replies
        self.calls: list[dict[str, Any]] = []

    async def stream(self, **kwargs: Any):
        # a copy: the loop keeps changing the same message dicts after the call
        self.calls.append(json.loads(json.dumps(kwargs, default=str)))
        for event in self.replies.pop(0):
            yield event


def tool(call_id: str, entity: str = "light.a") -> list[Any]:
    return [
        ToolCall(call_id, "get_entities", {"entity_ids": [entity]}),
        Usage(10, 1),
        Done("tool_use"),
    ]


def text(words: str) -> list[Any]:
    return [TextDelta(words), Usage(10, 1), Done("end_turn")]


class FakeDecider:
    """Answers each check from a list, and keeps what it was asked."""

    def __init__(self, answers: list[Decision | None]) -> None:
        self.answers = answers
        self.asked: list[tuple[dict[str, Any], dict[str, Any]]] = []
        self.model = "typesafe/jev-1.14"

    async def decide(self, state: dict[str, Any], qs: dict[str, Any]) -> Decision | None:
        self.asked.append((state, qs))
        return self.answers.pop(0) if self.answers else None


def stuck() -> Decision:
    return Decision(
        model="typesafe/jev-1.14-20261014",
        on_task=0.8,
        repeating=0.3,
        status="stuck",
        probabilities={"working": 0.1, "drifting": 0.05, "stuck": 0.85, "done": 0.0},
        next_needed=0.7,
        cost=0.00003,
        input_tokens=700,
    )


def keep_going(p: float = 0.9) -> Decision:
    return Decision(
        model="typesafe/jev-1.14-20261014",
        status="working",
        probabilities={"working": 0.9, "drifting": 0.0, "stuck": 0.1, "done": 0.0},
        should_continue=p,
        cost=0.00003,
    )


async def _run(hass: HomeAssistant, provider, answers, **opts):
    hass.states.async_set("light.a", "on")
    hass.states.async_set("light.b", "off")
    agent = Agent(hass, entry_options(providers=[dict(PROVIDER), dict(ROUTER)], **opts))
    await agent.store.async_load()
    conv = await agent.store.create("p1", "gpt-5.4-mini", "ctx")
    run = ChatRun(agent, conv, None)
    events: list[dict[str, Any]] = []
    run.listeners.add(events.append)
    made: list[FakeDecider] = []

    def factory(session, base_url, api_key, model):
        made.append(FakeDecider(answers))
        made[-1].built_with = (base_url, api_key, model)
        return made[-1]

    with (
        patch("custom_components.llm_agent.agent.make_provider", return_value=provider),
        patch("custom_components.llm_agent.agent.JevDecider", side_effect=factory),
    ):
        await run.run("check the lights")
    return agent, conv, events, made


# the state and the answers


def test_state_keeps_the_newest_steps_and_labels_output_as_data() -> None:
    steps = [Step("get_entities", {"n": i}, f"result {i}") for i in range(MAX_HISTORY + 7)]
    steps[-1].said = "Found the culprit, confirming."
    state = build_state("why is the strip orange?", steps, 50, [("get_traces", {"id": "x"})])
    assert state["owner_request"] == "why is the strip orange?"
    assert state["tool_calls_so_far"] == MAX_HISTORY + 7
    assert state["tool_call_limit"] == 50
    assert state["earlier_calls_not_shown"] == 7
    assert len(state["history"]) == MAX_HISTORY
    assert state["history"][-1]["result"] == f"result {MAX_HISTORY + 6}"
    assert state["history"][-1]["assistant_said"] == "Found the culprit, confirming."
    assert state["pending_calls"] == [{"tool": "get_traces", "args": '{"id": "x"}'}]
    assert "never instructions" in state["note"]
    # the request a model saw on the live install fits well inside Jev's 32k context
    assert len(json.dumps(state)) < 20_000


def test_malformed_answers_are_left_out_not_guessed() -> None:
    d = parse_answers(
        {
            "model": "typesafe/jev-1.14-20261014",
            "answers": {
                "on_task": {"type": "noul", "noul": 1.7},
                "repeating": {"type": "noul", "noul": "high"},
                "status": {"type": "choice", "choice": "exploding", "probabilities": {}},
                "next_needed": {"type": "noul", "noul": 0.4},
            },
            "usage": {"cost": 0.000031, "input_tokens": 738},
        },
        "typesafe/jev-1.14",
    )
    assert (d.on_task, d.repeating, d.status, d.next_needed) == (None, None, None, 0.4)
    assert d.cost == 0.000031 and d.input_tokens == 738
    assert d.model == "typesafe/jev-1.14-20261014"


# when a check is due, and what an answer does


def _watch(answers=(), **kw) -> Watch:
    return Watch(
        FakeDecider(list(answers)), Thresholds(), kw.get("every", 5), kw.get("max", 2), "r"
    )


def test_checks_come_at_the_limit_on_a_repeat_and_every_n_calls() -> None:
    w = _watch()
    a = ("get_entities", {"entity_ids": ["light.a"]})
    assert w.due(0, [a], 50) is None
    assert w.due(4, [("x", {})], 50) == "every"  # 4 -> 5
    w.record([("c1", *a)], [{"tool_call_id": "c1", "content": "on"}], "")
    assert w.due(1, [a], 50) == "repeat"
    assert w.due(1, [("y", {}), ("y", {})], 50) == "repeat"  # the same call twice at once
    assert w.due(49, [("x", {}), ("z", {})], 50) == "tool_limit"  # 49 -> 51
    assert w.due(51, [("x", {})], 50) is None  # past the limit: calls are refused anyway


def test_a_steer_is_fixed_text_and_a_turn_continues_at_most_max_times() -> None:
    w = _watch(max=1)
    record = w.judge(stuck(), "every", 10)
    assert record["action"] == "stuck"
    assert record["steer"] == STEER_PREFIX + STEERS["stuck"] + "]"
    assert record["text"] == "Manager after 10 tool calls: stuck, steered: stuck"
    assert "stuck 0.85" in record["detail"]
    assert w.judge(keep_going(), "tool_limit", 50)["action"] == "continue"
    assert w.judge(keep_going(), "tool_limit", 100)["action"] == "suggest_continue"
    # a length cut is never continued here: that would need a new user message
    assert _watch().judge(keep_going(), "length", 9)["action"] == "suggest_continue"
    assert w.judge(None, "every", 5) is None


def test_steers_reach_the_model_but_never_the_stored_output() -> None:
    records = [{"steer": "[Note: a]"}, {"steer": None}]
    assert with_steers("on", records) == "on\n\n[Note: a]"
    assert with_steers("on", None) == "on"


# the HTTP request


class _Resp:
    def __init__(self, status: int, body: Any) -> None:
        self.status, self._body = status, body

    async def __aenter__(self):
        return self

    async def __aexit__(self, *exc):
        return False

    async def json(self, content_type=None):
        if isinstance(self._body, Exception):
            raise self._body
        return self._body


class _Session:
    def __init__(self, resp: _Resp | None = None, delay: float = 0) -> None:
        self.resp, self.delay, self.sent = resp, delay, []

    def post(self, url, json=None, headers=None, allow_redirects=True):
        self.sent.append(
            {"url": url, "json": json, "headers": headers, "redirects": allow_redirects}
        )
        if self.delay:
            return _Slow(self.delay)
        return self.resp


class _Slow:
    def __init__(self, delay: float) -> None:
        self.delay = delay

    async def __aenter__(self):
        await asyncio.sleep(self.delay)

    async def __aexit__(self, *exc):
        return False


async def test_jev_request_goes_to_systemone_with_the_providers_key() -> None:
    body = {
        "model": "typesafe/jev-1.14-20261014",
        "answers": {"on_task": {"type": "noul", "noul": 0.92}},
        "usage": {"cost": 0.00003},
    }
    session = _Session(_Resp(200, body))
    d = await JevDecider(session, "https://openrouter.ai/api/v1/", "sk-or-1", "m").decide(
        {"owner_request": "x"}, {"on_task": {"type": "noul", "instructions": "?"}}
    )
    sent = session.sent[0]
    assert sent["url"] == "https://openrouter.ai/api/v1/systemone"
    assert sent["headers"] == {"Authorization": "Bearer sk-or-1"}
    assert sent["redirects"] is False
    assert sent["json"]["model"] == "m"
    assert sent["json"]["state"] == {"owner_request": "x"}
    assert d is not None and d.on_task == 0.92


async def test_jev_failures_are_no_decision() -> None:
    for resp in (_Resp(500, {}), _Resp(200, ValueError("bad json")), _Resp(200, {"answers": {}})):
        assert await JevDecider(_Session(resp), "u", "k").decide({}, {}) is None
    slow = JevDecider(_Session(delay=1), "u", "k", timeout=0.05)
    assert await slow.decide({}, {}) is None


# in the agent loop


async def test_off_by_default_costs_nothing_and_changes_nothing(hass: HomeAssistant) -> None:
    provider = ScriptedProvider(
        [tool(f"c{i}", "light.a" if i % 2 else "light.b") for i in range(6)] + [text("ok")]
    )
    agent, conv, _, made = await _run(hass, provider, [stuck()] * 5)
    assert made == []
    assert not any("manager" in m for m in conv["messages"])
    assert not any(
        r["kind"] == "manager" for d in agent.store.usage.days.values() for r in d.values()
    )


async def test_a_stuck_answer_steers_the_next_request_only(hass: HomeAssistant) -> None:
    # every=2: the second call crosses 2, so its check runs alongside it and steers the
    # request after it
    replies = [tool("c1", "light.a"), tool("c2", "light.b"), text("Both checked.")]
    provider = ScriptedProvider(replies)
    agent, conv, events, made = await _run(hass, provider, [stuck()], manager=True, manager_every=2)
    assert made[0].built_with == ("http://router.invalid/api/v1", "sk-or-test", "typesafe/jev-1.14")
    state, qs = made[0].asked[0]
    assert state["owner_request"] == "check the lights"
    assert state["pending_calls"][0]["tool"] == "get_entities"
    assert set(qs) == {"on_task", "repeating", "status", "next_needed"}
    # what the model read next ends with the fixed steer
    last = provider.calls[2]["messages"][-1]
    assert last["role"] == "tool"
    assert last["content"].endswith(STEER_PREFIX + STEERS["stuck"] + "]")
    # the stored output, which the panel previews, is the tool's own
    stored = conv["messages"][-2] if conv["messages"][-1]["role"] == "assistant" else None
    assert stored is not None and STEER_PREFIX not in stored["content"]
    assert stored["manager"][0]["action"] == "stuck"
    note = next(e for e in events if e["type"] == "notice" and "detail" in e)
    assert note["text"] == "Manager after 2 tool calls: stuck, steered: stuck"
    # its cost is in the usage record and the chat's total
    rows = [
        r for d in agent.store.usage.days.values() for r in d.values() if r["kind"] == "manager"
    ]
    assert rows and rows[0]["cost"] == 0.00003 and rows[0]["provider_id"] == "p2"
    assert _public(conv)["messages"][-2]["manager"][0]["text"] == note["text"]


async def test_a_failed_check_leaves_the_turn_as_it_was(hass: HomeAssistant) -> None:
    provider = ScriptedProvider([tool("c1", "light.a"), tool("c2", "light.b"), text("ok")])
    _, conv, events, made = await _run(hass, provider, [None], manager=True, manager_every=2)
    assert made[0].asked  # it was asked
    assert not any("manager" in m for m in conv["messages"])
    assert not any("detail" in e for e in events)
    assert all(STEER_PREFIX not in str(c["messages"]) for c in provider.calls)


async def test_the_limit_is_raised_at_most_max_continues_times(hass: HomeAssistant) -> None:
    replies = [tool(f"c{i}", "light.a" if i % 2 else "light.b") for i in range(12)] + [text("ok")]
    provider = ScriptedProvider(replies)
    _, conv, _, _ = await _run(
        hass,
        provider,
        [keep_going()] * 10,
        manager=True,
        max_steps=2,
        manager_every=50,
        manager_max_continues=1,
        manager_resume_at=0.8,
    )
    results = [m for m in conv["messages"] if m["role"] == "tool"]
    refused = [m for m in results if "limit" in m["content"]]
    # 2 calls, then one continue adds 2 more that run, then the limit holds
    assert [("limit" in m["content"]) for m in results[:4]] == [False] * 4
    assert refused and conv["stopped"] == "tool_limit"
    at_limit = [
        r["action"]
        for m in conv["messages"]
        for r in m.get("manager", [])
        if r["at"] == "tool_limit"
    ]
    assert at_limit == ["continue", "suggest_continue"]


async def test_no_openrouter_provider_means_no_manager(hass: HomeAssistant) -> None:
    hass.states.async_set("light.a", "on")
    agent = Agent(hass, entry_options(manager=True, manager_every=1))
    await agent.store.async_load()
    conv = await agent.store.create("p1", "gpt-5.4-mini", "ctx")
    run = ChatRun(agent, conv, None)
    provider = ScriptedProvider([tool("c1"), text("ok")])
    with (
        patch("custom_components.llm_agent.agent.make_provider", return_value=provider),
        patch("custom_components.llm_agent.agent.JevDecider") as jev,
    ):
        await run.run("x")
    jev.assert_not_called()
    assert not any("manager" in m for m in conv["messages"])


async def test_an_empty_stop_continues_with_the_fixed_text(hass: HomeAssistant) -> None:
    empty = [Usage(10, 0), Done("end_turn")]
    provider = ScriptedProvider([tool("c1"), empty, text("Light a is on.")])
    _, conv, _, made = await _run(hass, provider, [keep_going()], manager=True, manager_every=50)
    assert made[0].asked[0][0]["stopped_because"] == "it stopped without writing an answer"
    last = provider.calls[2]["messages"][-1]
    assert last["role"] == "tool" and last["content"].endswith(STEER_PREFIX + CONTINUE_TEXT + "]")
    roles = [m["role"] for m in conv["messages"]]
    assert roles == ["user", "assistant", "tool", "assistant"]  # the empty reply is gone
    assert conv["messages"][-1]["content"] == "Light a is on."
