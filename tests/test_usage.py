"""The Usage view's data: the per-day record by provider and model, and provider balances.

The record is what the chart and the breakdown are drawn from, so these tests read it
back the way the view does (through llm_agent/usage) rather than poking at counters.
"""

from __future__ import annotations

from datetime import date, timedelta
import json
from typing import Any
from unittest.mock import patch

from homeassistant.components import ai_task
from homeassistant.core import HomeAssistant

from custom_components.llm_agent.agent import Agent, ChatRun, _today
from custom_components.llm_agent.balance import CACHE_SECONDS, Balances
from custom_components.llm_agent.providers import ProviderConfig
from custom_components.llm_agent.store import USAGE_DAYS, ConversationStore

from .conftest import PROVIDER, entry_options
from .test_agent import ScriptedProvider, reply_text
from .test_init import _setup


async def test_usage_accumulates_per_day_provider_model_and_kind(hass: HomeAssistant) -> None:
    store = ConversationStore(hass)
    await store.async_load()
    store.usage.add("2026-11-10", "p1", "openai", "m", "chat", 100, 10, 5, 0, 0.25)
    store.usage.add("2026-11-10", "p1", "openai", "m", "chat", 50, 5, 0, 2, 0.5)
    store.usage.add("2026-11-10", "p1", "openai", "m", "task", 7, 1, 0, 0, None)
    rows = {r["kind"]: r for r in store.usage.rows("2026-11-10", "2026-11-10")}
    # two chat calls fold into one row; a row per kind keeps AI Task apart
    assert rows["chat"] | {"day": None} == {
        "day": None,
        "provider_id": "p1",
        "provider_type": "openai",
        "model": "m",
        "kind": "chat",
        "input": 150,
        "output": 15,
        "cache_read": 5,
        "cache_write": 2,
        "calls": 2,
        "unpriced": 0,
        "cost": 0.75,
    }
    # a call with no known price is counted as unpriced, not as free
    assert rows["task"]["calls"] == 1 and rows["task"]["unpriced"] == 1
    assert rows["task"]["cost"] == 0
    assert store.usage.since == "2026-11-10"


async def test_usage_keeps_400_calendar_days(hass: HomeAssistant) -> None:
    store = ConversationStore(hass)
    await store.async_load()
    today = date(2026, 11, 15)
    oldest_kept = today - timedelta(days=USAGE_DAYS - 1)
    for day in (oldest_kept - timedelta(days=1), oldest_kept):
        store.usage.add(day.isoformat(), "p1", "openai", "m", "chat", 1, 1, 0, 0, 0.1)
    store.usage.add(today.isoformat(), "p1", "openai", "m", "chat", 1, 1, 0, 0, 0.1)
    assert sorted(store.usage.days) == [oldest_kept.isoformat(), today.isoformat()]


async def test_usage_survives_a_reload(hass: HomeAssistant) -> None:
    store = ConversationStore(hass)
    await store.async_load()
    store.usage.add("2026-11-10", "p1", "openai", "m", "chat", 1, 2, 0, 0, 0.5)
    await store.flush()
    again = ConversationStore(hass)
    await again.async_load()
    assert again.usage.rows("2026-11-10", "2026-11-10")[0]["cost"] == 0.5
    assert again.usage.since == "2026-11-10"


async def test_chat_calls_are_recorded_with_their_cost(hass: HomeAssistant) -> None:
    agent = Agent(hass, entry_options())
    await agent.store.async_load()
    conv = await agent.store.create("p1", "gpt-5.4-mini", "ctx")
    with patch(
        "custom_components.llm_agent.agent.make_provider",
        return_value=ScriptedProvider([reply_text("Hi")]),
    ):
        await ChatRun(agent, conv, None).run("hello")
    [row] = agent.store.usage.rows(_today(), _today())
    assert row["kind"] == "chat" and row["calls"] == 1 and row["model"] == "gpt-5.4-mini"
    assert row["input"] == 100 and row["output"] == 10
    # the same estimate the chat footer and the daily cap use
    assert row["cost"] == conv["usage"]["cost"] == agent.store.spent(_today()) > 0


async def test_ai_task_is_recorded_as_task_and_not_counted_toward_the_cap(
    hass: HomeAssistant, hass_ws_client
) -> None:
    entry = await _setup(hass, daily_spend_cap=5.0)
    agent = entry.runtime_data
    entity_id = hass.states.async_entity_ids("ai_task")[0]
    with patch(
        "custom_components.llm_agent.ai_task.make_provider",
        return_value=ScriptedProvider([reply_text("ok")]),
    ):
        await hass.services.async_call(
            ai_task.DOMAIN,
            "generate_data",
            {"task_name": "t", "entity_id": entity_id, "instructions": "Do it"},
            blocking=True,
            return_response=True,
        )
    # The daily cap's own counter is untouched: AI Tasks never counted toward it.
    assert agent.store.spent(_today()) == 0

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "llm_agent/usage", "days": 7})
    view = (await client.receive_json())["result"]
    task = [r for r in view["breakdown"] if r["kind"] == "task"]
    assert len(task) == 1 and task[0]["calls"] == 1 and task[0]["input"] == 100
    assert task[0]["provider_name"] == PROVIDER["name"]
    assert task[0]["cost"] > 0
    # ...but it is spend, so the totals and the chart include it
    assert view["totals"]["today"] == task[0]["cost"]
    assert view["series"][-1] == {"day": _today(), "cost": task[0]["cost"]}
    assert len(view["series"]) == 7
    assert view["cap"] == 5.0 and view["cap_used"] == 0
    assert view["since"] == _today()


async def test_members_cannot_read_usage(hass: HomeAssistant, hass_ws_client, hass_admin_user):
    await _setup(hass)
    hass_admin_user.groups = []
    client = await hass_ws_client(hass)
    for kind in ("llm_agent/usage", "llm_agent/balance"):
        await client.send_json_auto_id({"type": kind})
        assert (await client.receive_json())["error"]["code"] == "unauthorized"


class _Reply:
    def __init__(self, status: int, body: Any) -> None:
        self.status = status
        self._body = body

    async def json(self, content_type: Any = None) -> Any:
        return self._body

    async def __aenter__(self) -> _Reply:
        return self

    async def __aexit__(self, *exc: object) -> None:
        return None


class _Session:
    def __init__(self, replies: list[_Reply]) -> None:
        self.replies = replies
        self.requests: list[dict[str, Any]] = []

    def get(self, url: str, **kwargs: Any) -> _Reply:
        self.requests.append({"url": url, **kwargs})
        return self.replies.pop(0)


def _conf(kind: str, base: str = "https://openrouter.ai/api/v1") -> ProviderConfig:
    return ProviderConfig("p-" + kind, kind, kind.title(), "sk-or-key", base, "m")


# The shape GET /api/v1/key documents, trimmed to the fields read.
KEY_REPLY = {
    "data": {
        "label": "sk-or-v1-au7...890",
        "limit": 100,
        "limit_remaining": 74.5,
        "limit_reset": "monthly",
        "usage": 25.5,
        "usage_monthly": 12.25,
        "is_free_tier": False,
    }
}


async def test_openrouter_balance_is_read_with_the_normal_key_and_cached() -> None:
    now = [1000.0]
    session = _Session([_Reply(200, KEY_REPLY), _Reply(200, KEY_REPLY)])
    balances = Balances(lambda: session, clock=lambda: now[0])
    [got] = await balances.get([_conf("openrouter")])
    assert session.requests[0]["url"] == "https://openrouter.ai/api/v1/key"
    assert session.requests[0]["headers"] == {"Authorization": "Bearer sk-or-key"}
    assert got["status"] == "ok" and got["remaining"] == 74.5 and got["limit"] == 100
    assert got["reset"] == "monthly" and got["usage_monthly"] == 12.25
    assert got["billing_url"] == "https://openrouter.ai/settings/credits"

    now[0] += CACHE_SECONDS - 1  # reopening the view within five minutes asks nothing
    assert (await balances.get([_conf("openrouter")]))[0]["remaining"] == 74.5
    assert len(session.requests) == 1
    now[0] += 2
    await balances.get([_conf("openrouter")])
    assert len(session.requests) == 2


async def test_openrouter_key_without_a_limit_has_no_remaining() -> None:
    reply = {"data": {**KEY_REPLY["data"], "limit": None, "limit_remaining": None}}
    balances = Balances(lambda: _Session([_Reply(200, reply)]))
    [got] = await balances.get([_conf("openrouter")])
    assert got["status"] == "ok" and got["remaining"] is None and got["usage"] == 25.5


async def test_failed_balance_is_not_cached() -> None:
    session = _Session([_Reply(401, {"error": "no"}), _Reply(200, KEY_REPLY)])
    balances = Balances(lambda: session)
    [got] = await balances.get([_conf("openrouter")])
    assert got["status"] == "error" and "401" in got["error"]
    assert (await balances.get([_conf("openrouter")]))[0]["status"] == "ok"


async def test_providers_without_a_balance_api_are_never_called() -> None:
    session = _Session([])
    balances = Balances(lambda: session)
    got = {
        b["type"]: b
        for b in await balances.get(
            [_conf(k) for k in ("anthropic", "openai", "gemini", "chatgpt", "ollama")]
        )
    }
    assert not session.requests
    assert got["ollama"]["status"] == "local" and got["ollama"]["billing_url"] is None
    for kind in ("anthropic", "openai", "gemini", "chatgpt"):
        assert got[kind]["status"] == "no_api"
        assert got[kind]["billing_url"].startswith("https://")
    assert json.dumps(got)  # sent over the websocket as is
