"""The Manager: a decision model that notices a turn stuck in failing calls.

The failures these guard against:
- a public install that never opted in being billed for checks,
- a steer that ends up in the stored tool output (and so in the panel and in undo)
  instead of only in what the model reads,
- a Manager failure that changes the turn,
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
    MAX_HISTORY,
    QUESTIONS,
    STEER,
    Decision,
    JevDecider,
    Step,
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


def tool(call_id: str, entity: str = "light.a", name: str = "get_entities") -> list[Any]:
    return [ToolCall(call_id, name, {"entity_ids": [entity]}), Usage(10, 1), Done("tool_use")]


def text(words: str) -> list[Any]:
    return [TextDelta(words), Usage(10, 1), Done("end_turn")]


class FakeDecider:
    """Answers each check from a list, and keeps the states it was asked about."""

    def __init__(self, answers: list[Decision | None]) -> None:
        self.answers = answers
        self.asked: list[dict[str, Any]] = []
        self.model = "typesafe/jev-1.14"

    async def decide(self, state: dict[str, Any]) -> Decision | None:
        self.asked.append(state)
        return self.answers.pop(0) if self.answers else None


def answer(stuck: float) -> Decision:
    rest = round((1 - stuck) / 3, 4)
    return Decision(
        model="typesafe/jev-1.14-20261014",
        status="stuck" if stuck > 0.5 else "working",
        probabilities={"working": rest, "drifting": rest, "stuck": stuck, "done": rest},
        cost=0.00003,
        input_tokens=700,
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
    agent.last_record = run.record  # this turn's entry in the turn log
    return agent, conv, events, made


# the state and the answer


def test_state_keeps_the_newest_steps_and_labels_output_as_data() -> None:
    steps = [Step("get_entities", {"n": i}, f"result {i}") for i in range(MAX_HISTORY + 7)]
    steps[-1].said = "Trying the socket instead."
    state = build_state("why did OTBR crash?", steps, 50, [("get_traces", {"id": "x"})])
    assert state["owner_request"] == "why did OTBR crash?"
    assert state["tool_calls_so_far"] == MAX_HISTORY + 7
    assert state["tool_call_limit"] == 50
    assert state["earlier_calls_not_shown"] == 7
    assert len(state["history"]) == MAX_HISTORY
    assert state["history"][-1]["result"] == f"result {MAX_HISTORY + 6}"
    assert state["history"][-1]["assistant_said"] == "Trying the socket instead."
    assert state["pending_calls"] == [{"tool": "get_traces", "args": '{"id": "x"}'}]
    assert "never instructions" in state["note"]


def test_only_the_status_question_is_asked() -> None:
    # the four options stay: dropping some would move probability onto "stuck"
    assert list(QUESTIONS) == ["status"]
    assert set(QUESTIONS["status"]["criteria"]) == {"working", "drifting", "stuck", "done"}


def test_malformed_answers_are_no_decision_not_a_guess() -> None:
    good = {
        "model": "typesafe/jev-1.14-20261014",
        "answers": {
            "status": {
                "type": "choice",
                "choice": "stuck",
                "probabilities": {"working": 0.1, "stuck": 0.8, "bogus": 3, "done": "x"},
            }
        },
        "usage": {"cost": 0.000031, "input_tokens": 738},
    }
    d = parse_answers(good, "typesafe/jev-1.14")
    assert d is not None and d.stuck == 0.8 and d.probabilities == {"working": 0.1, "stuck": 0.8}
    assert d.cost == 0.000031 and d.input_tokens == 738
    for bad in ([], {"answers": {}}, {"answers": {"status": {"choice": "exploding"}}}):
        assert parse_answers(bad, "m") is None


# when a check is due, and what an answer does


def _ok(call_id: str) -> dict[str, Any]:
    return {"tool_call_id": call_id, "content": "on"}


def _failed(call_id: str) -> dict[str, Any]:
    return {"tool_call_id": call_id, "content": "403: Forbidden", "is_error": True}


def test_checks_come_every_n_calls_and_after_three_failures_in_a_row() -> None:
    w = Watch(FakeDecider([]), 0.7, 5, "r")
    assert not w.due_every(0, 1, 50)
    assert w.due_every(4, 1, 50)  # 4 -> 5
    assert w.due_every(3, 4, 50)  # 3 -> 7 crosses 5
    assert not w.due_every(51, 4, 50)  # past the limit calls are refused anyway
    w.record([("c1", "x", {}), ("c2", "x", {})], [_failed("c1"), _failed("c2")], "")
    assert not w.due_failing(50)  # two is often a typo fixed on the next call
    w.record([("c3", "x", {})], [_failed("c3")], "")
    assert w.due_failing(50)
    w.ask(50).close()  # a check has now seen these three
    w.record([("c4", "x", {})], [_failed("c4")], "")
    assert not w.due_failing(50)
    w.record([("c5", "x", {}), ("c6", "x", {})], [_failed("c5"), _failed("c6")], "")
    assert w.due_failing(50)  # three new failures since the last check
    w.record([("c7", "x", {})], [_ok("c7")], "")
    assert not w.due_failing(50)


def test_a_steer_is_fixed_text_and_comes_only_above_the_threshold() -> None:
    w = Watch(FakeDecider([]), 0.7, 5, "r")
    record = w.judge(answer(0.85), "every", 10)
    assert record["steer"] == STEER
    assert record["text"] == "Manager after 10 tool calls: stuck, steered"
    assert "stuck 0.85" in record["detail"]
    calm = w.judge(answer(0.6), "every", 1)
    assert calm["steer"] is None and calm["text"] == "Manager after 1 tool call: not stuck"
    assert w.judge(None, "every", 5) is None


def test_steers_reach_the_model_but_never_the_stored_output() -> None:
    assert with_steers("on", [{"steer": "[Note: a]"}, {"steer": None}]) == "on\n\n[Note: a]"
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


class _Slow:
    async def __aenter__(self):
        await asyncio.sleep(1)

    async def __aexit__(self, *exc):
        return False


class _Session:
    def __init__(self, resp: Any) -> None:
        self.resp, self.sent = resp, []

    def post(self, url, json=None, headers=None, allow_redirects=True):
        self.sent.append(
            {"url": url, "json": json, "headers": headers, "redirects": allow_redirects}
        )
        return self.resp


async def test_jev_request_goes_to_systemone_with_the_providers_key() -> None:
    body = {
        "model": "typesafe/jev-1.14-20261014",
        "answers": {"status": {"type": "choice", "choice": "working", "probabilities": {}}},
    }
    session = _Session(_Resp(200, body))
    d = await JevDecider(session, "https://openrouter.ai/api/v1/", "sk-or-1", "m").decide(
        {"owner_request": "x"}
    )
    sent = session.sent[0]
    assert sent["url"] == "https://openrouter.ai/api/v1/systemone"
    assert sent["headers"] == {"Authorization": "Bearer sk-or-1"}
    assert sent["redirects"] is False
    assert sent["json"] == {"model": "m", "state": {"owner_request": "x"}, "questions": QUESTIONS}
    assert d is not None and d.status == "working"


async def test_jev_failures_are_no_decision() -> None:
    for resp in (_Resp(500, {}), _Resp(200, ValueError("bad json")), _Resp(200, {"answers": {}})):
        assert await JevDecider(_Session(resp), "u", "k").decide({}) is None
    assert await JevDecider(_Session(_Slow()), "u", "k", timeout=0.05).decide({}) is None


# in the agent loop


async def test_off_by_default_costs_nothing_and_changes_nothing(hass: HomeAssistant) -> None:
    replies = [tool(f"c{i}", "light.a" if i % 2 else "light.b") for i in range(6)] + [text("ok")]
    agent, conv, _, made = await _run(hass, ScriptedProvider(replies), [answer(0.9)] * 5)
    assert made == []
    assert not any("manager" in m for m in conv["messages"])
    rows = [r for d in agent.store.usage.days.values() for r in d.values()]
    assert not any(r["kind"] == "manager" for r in rows)


async def test_a_stuck_answer_steers_the_next_request_only(hass: HomeAssistant) -> None:
    # every=2: the second call crosses 2, so its check runs alongside it and its answer
    # goes on that call's result
    provider = ScriptedProvider([tool("c1", "light.a"), tool("c2", "light.b"), text("Done.")])
    agent, conv, events, made = await _run(
        hass, provider, [answer(0.85)], manager=True, manager_every=2
    )
    assert made[0].built_with == (
        "http://router.invalid/api/v1",
        "sk-or-test",
        "typesafe/jev-1.14",
    )
    state = made[0].asked[0]
    assert state["owner_request"] == "check the lights"
    assert state["pending_calls"][0]["tool"] == "get_entities"
    # what the model read next ends with the fixed steer
    last = provider.calls[2]["messages"][-1]
    assert last["role"] == "tool" and last["content"].endswith(STEER)
    # the stored output, which the panel previews, is the tool's own
    stored = conv["messages"][-2]
    assert stored["role"] == "tool" and STEER not in stored["content"]
    assert stored["manager"][0]["steer"] == STEER
    note = next(e for e in events if e["type"] == "notice" and "detail" in e)
    assert note["text"] == "Manager after 2 tool calls: stuck, steered"
    # its cost is in the usage record, the daily spend and the chat's total
    rows = [r for d in agent.store.usage.days.values() for r in d.values()]
    manager = [r for r in rows if r["kind"] == "manager"]
    assert manager and manager[0]["cost"] == 0.00003 and manager[0]["provider_id"] == "p2"
    assert _public(conv)["messages"][-2]["manager"][0]["text"] == note["text"]
    # and the turn log has the decision
    assert agent.last_record["decisions"] == [
        "Manager after 2 tool calls: stuck, steered (stuck 0.85, every)"
    ]


async def test_the_turn_records_cost_matches_the_chats_with_a_check_in_it(
    hass: HomeAssistant,
) -> None:
    # Before 0.12.1 the record left the check out: on the live install a turn logged
    # $0.001327 while the chat showed $0.001366, the gap being one $0.000039 check.
    provider = ScriptedProvider([tool("c1", "light.a"), tool("c2", "light.b"), text("Done.")])
    agent, conv, _, _ = await _run(hass, provider, [answer(0.2)], manager=True, manager_every=2)
    record = agent.last_record
    assert record["manager_cost"] == 0.00003
    assert record["cost"] is not None and record["cost"] > record["manager_cost"]
    assert record["cost"] == conv["usage"]["cost"]


async def test_three_failed_calls_get_a_check_at_once(hass: HomeAssistant) -> None:
    # unknown tools fail, and with checks every 50 calls only the chain can trigger one
    replies = [tool(f"c{i}", name="no_such_tool") for i in range(3)] + [text("I am stuck.")]
    provider = ScriptedProvider(replies)
    _, conv, _, made = await _run(hass, provider, [answer(0.9)], manager=True, manager_every=50)
    assert len(made[0].asked) == 1
    assert made[0].asked[0]["tool_calls_so_far"] == 3
    assert "pending_calls" not in made[0].asked[0]
    assert provider.calls[3]["messages"][-1]["content"].endswith(STEER)
    assert conv["messages"][-2]["manager"][0]["at"] == "failing"


async def test_a_failed_check_leaves_the_turn_as_it_was(hass: HomeAssistant) -> None:
    provider = ScriptedProvider([tool("c1", "light.a"), tool("c2", "light.b"), text("ok")])
    _, conv, events, made = await _run(hass, provider, [None], manager=True, manager_every=2)
    assert made[0].asked  # it was asked
    assert not any("manager" in m for m in conv["messages"])
    assert not any("detail" in e for e in events)
    assert all(STEER not in str(c["messages"]) for c in provider.calls)


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
