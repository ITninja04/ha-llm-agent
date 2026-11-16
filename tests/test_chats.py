"""past_chats and read_chat: the agent looking back at its earlier chats, through the
real agent loop."""

from __future__ import annotations

from datetime import datetime
import json
from typing import Any
from unittest.mock import patch

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.llm_agent.agent import Agent, ChatRun
from custom_components.llm_agent.const import DOMAIN
from custom_components.llm_agent.tools import LEAN_TOOLS
from custom_components.llm_agent.tools.chats import PAGE_MAX

from .conftest import PROVIDER, entry_options
from .test_agent import ScriptedProvider, reply_text, reply_tool


async def _agent(hass: HomeAssistant, **opts: Any) -> Agent:
    agent = Agent(hass, entry_options(**opts))
    await agent.store.async_load()
    hass.data[DOMAIN] = agent  # the tools find the store where the integration puts it
    return agent


def _ts(text: str) -> float:
    """A local date-time in the home time zone, as the tools read since/until."""
    moment = datetime.fromisoformat(text).replace(tzinfo=dt_util.get_default_time_zone())
    return moment.timestamp()


async def _seed(
    agent: Agent,
    title: str,
    messages: list[dict[str, Any]],
    *,
    user_id: str | None = None,
    updated: str = "2026-11-10T09:00",
    **extra: Any,
) -> dict[str, Any]:
    store = agent.store
    conv = await store.create("p1", "gpt-5.4-mini", "", user_id)
    conv.update(title=title, messages=messages, **extra)
    store.save(conv)
    # save() stamps the current time; the date tests need a known one
    conv["updated"] = conv["created"] = _ts(updated)
    store._index[conv["id"]]["updated"] = conv["updated"]
    return conv


def _user(text: str, when: str = "2026-11-10 09:00", **extra: Any) -> dict[str, Any]:
    # As agent.run stores it: a time stamp in front for the model, the typed text apart
    return {"role": "user", "content": f"[{when} CST (Tuesday)] {text}", "display": text, **extra}


def _reply(text: str, *calls: dict[str, Any]) -> dict[str, Any]:
    return {"role": "assistant", "content": text, "tool_calls": list(calls), "model": "m"}


def _result(call_id: str, name: str, **extra: Any) -> dict[str, Any]:
    return {
        "role": "tool",
        "tool_call_id": call_id,
        "name": name,
        "content": "{}",
        "is_error": False,
        **extra,
    }


async def _ask(
    hass: HomeAssistant,
    agent: Agent,
    replies: list[list[Any]],
    *,
    text: str = "go",
    user_id: str | None = None,
    member: bool = False,
    unattended: bool = False,
    on_event: Any = None,
) -> tuple[dict[str, Any], list[dict[str, Any]], ScriptedProvider]:
    conv = await agent.store.create("p1", "gpt-5.4-mini", "", user_id)
    run = ChatRun(agent, conv, user_id, unattended=unattended, member=member)
    events: list[dict[str, Any]] = []

    def listener(event: dict[str, Any]) -> None:
        events.append(event)
        if on_event:
            on_event(run, event)

    run.listeners.add(listener)
    provider = ScriptedProvider(replies)
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await run.run(text)
    return conv, events, provider


def _results(conv: dict[str, Any]) -> list[dict[str, Any]]:
    return [m for m in conv["messages"] if m["role"] == "tool"]


def _data(msg: dict[str, Any]) -> Any:
    assert not msg["is_error"], msg["content"]
    return json.loads(msg["content"])


def _porch_chat() -> list[dict[str, Any]]:
    save = {"id": "t2", "name": "save_config_item", "args": {"id": "porch", "kind": "automation"}}
    unlock = {
        "id": "t3",
        "name": "call_service",
        "args": {"domain": "lock", "service": "unlock", "target": {"entity_id": "lock.garage"}},
    }
    return [
        _user(
            "fix the porch light automation",
            files=[{"name": "automations.yaml", "size": 10, "kind": "text"}],
            attachments="FILE BODY THAT MUST NOT SHOW",
        ),
        _reply(
            "Looking. " + "x" * 900,
            {"id": "t1", "name": "get_config_item", "args": {"id": "porch"}},
            save,
        ),
        _result("t1", "get_config_item", summary="Read automation porch"),
        _result(
            "t2",
            "save_config_item",
            summary="Saved automation porch",
            snapshot_id="snap1",
            decision="approved",
        ),
        _user("also unlock the garage", when="2026-11-10 09:05", photos=2),
        _reply("", unlock),
        _result("t3", "call_service", is_error=True, summary="Denied", decision="denied"),
        _reply("OK, I left the garage locked."),
    ]


async def test_finds_chats_by_text_and_by_date_newest_first_but_never_this_one(
    hass: HomeAssistant,
) -> None:
    """Without this the agent cannot find "the porch chat from last week", and listing
    the current chat would answer every search with itself."""
    agent = await _agent(hass)
    old = await _seed(agent, "Porch light", _porch_chat(), updated="2026-11-01T10:00")
    new = await _seed(
        agent, "Porch again", [_user("porch is flickering")], updated="2026-11-12T08:00"
    )
    await _seed(agent, "Kitchen", [_user("kitchen lights")], updated="2026-11-12T09:00")
    conv, _, _ = await _ask(
        hass,
        agent,
        [
            reply_tool("c1", "past_chats", {"query": "porch"}),
            reply_tool("c2", "past_chats", {"since": "2026-11-12", "until": "2026-11-12"}),
            reply_tool("c3", "past_chats", {"query": "porch", "until": "2026-11-05"}),
            reply_text("Found them."),
        ],
        text="what did we do about the porch?",
    )
    by_text, by_date, both = (_data(m)["chats"] for m in _results(conv))
    assert [c["id"] for c in by_text] == [new["id"], old["id"]]
    assert conv["id"] not in {c["id"] for c in by_text}  # its own message says porch too
    assert [c["title"] for c in by_date] == ["Kitchen", "Porch again"]
    assert [c["id"] for c in both] == [old["id"]]
    row = by_text[1]
    assert row["created"] == "2026-11-01 10:00" and row["updated"] == "2026-11-01 10:00"
    assert row["turns"] == 2 and row["source"] == "panel"
    assert row["tools"] == {"get_config_item": 1, "save_config_item": 1, "call_service": 1}
    # one change went through, one was denied; the read is not a change
    assert row["changes"] == 1 and row["denied"] == 1


async def test_source_filter_and_voice_note(hass: HomeAssistant) -> None:
    """Chats from automations are marked by services.py; mixing them with panel chats
    would make "what did the morning automation say" unanswerable. Voice chats are not
    stored at all, and the agent must hear that rather than conclude none happened."""
    agent = await _agent(hass)
    await _seed(agent, "Morning summary", [_user("summarise")], source="action")
    await _seed(agent, "Panel chat", [_user("hello")])
    conv, _, _ = await _ask(
        hass,
        agent,
        [
            reply_tool("c1", "past_chats", {"source": "scheduled"}),
            reply_tool("c2", "past_chats", {"source": "voice"}),
            reply_text("ok"),
        ],
    )
    scheduled, voice = (_data(m) for m in _results(conv))
    assert [(c["title"], c["with"]) for c in scheduled["chats"]] == [
        ("Morning summary", "automation")
    ]
    assert voice["chats"] == [] and "not saved" in voice["note"]


async def test_snippet_is_about_160_characters_around_the_hit(hass: HomeAssistant) -> None:
    """A whole pasted log per chat would blow the result; no context at all would not
    say which chat is the right one."""
    agent = await _agent(hass)
    long = "a" * 500 + " the garage sensor went offline " + "b" * 500
    await _seed(agent, "Sensors", [_user("check things"), _reply(long)])
    conv, _, _ = await _ask(
        hass, agent, [reply_tool("c1", "past_chats", {"query": "GARAGE"}), reply_text("ok")]
    )
    (row,) = _data(_results(conv)[0])["chats"]
    snippet = row["snippet"]
    assert "garage sensor" in snippet
    assert 150 <= len(snippet) <= 180


async def test_transcript_shows_what_happened_without_hidden_blocks(
    hass: HomeAssistant,
) -> None:
    """The transcript must say what was asked, what ran and what the person decided,
    but not resend attached file text (large, and outside content) or the time stamp
    blocks the agent adds for the model."""
    agent = await _agent(hass)
    old = await _seed(agent, "Porch light", _porch_chat(), stopped="spend_cap")
    conv, _, _ = await _ask(
        hass, agent, [reply_tool("c1", "read_chat", {"id": old["id"]}), reply_text("ok")]
    )
    data = _data(_results(conv)[0])
    lines = data["lines"]
    text = "\n".join(lines)
    assert "FILE BODY" not in text and "CST (Tuesday)" not in text
    assert lines[0] == (
        "turn 1 user [2026-11-10 09:00]: fix the porch light automation "
        "(attached: automations.yaml)"
    )
    assert lines[1].startswith("assistant: Looking. xxx") and lines[1].endswith(" [trimmed]")
    assert len(lines[1]) < 650
    assert lines[2] == 'tool get_config_item {"id": "porch"} -> ok: Read automation porch'
    assert lines[3].endswith("-> ok: Saved automation porch [approved] [undo available: snap1]")
    assert lines[4] == "turn 2 user [2026-11-10 09:05]: also unlock the garage (2 photo(s))"
    assert lines[5].startswith("tool call_service ") and lines[5].endswith("-> denied: Denied")
    assert lines[6] == "assistant: OK, I left the garage locked."
    assert lines[7].startswith("notice: Stopped: today's estimated spend")
    assert data["turns"] == 2 and "next_cursor" not in data


async def test_long_chat_pages_under_the_cap_and_turns_reads_the_end(
    hass: HomeAssistant,
) -> None:
    """A long chat in one result would be cut by the agent loop's 16000 character cap
    with no way to reach the rest; paging must cover every line exactly once."""
    agent = await _agent(hass)
    messages: list[dict[str, Any]] = []
    for n in range(1, 61):
        messages += [_user(f"question {n}"), _reply(f"answer {n} " + "y" * 590)]
    old = await _seed(agent, "Long", messages)
    replies = [reply_tool("c1", "read_chat", {"id": old["id"]})]
    cursor_calls = 0
    seen: list[str] = []

    conv, _, _ = await _ask(hass, agent, [*replies, reply_text("ok")])
    first = _results(conv)[0]
    assert len(first["content"]) <= PAGE_MAX
    page = _data(first)
    seen += page["lines"]
    while "next_cursor" in page:
        cursor_calls += 1
        assert f"cursor {page['next_cursor']}" in page["more"]
        conv, _, _ = await _ask(
            hass,
            agent,
            [
                reply_tool("c1", "read_chat", {"id": old["id"], "cursor": page["next_cursor"]}),
                reply_text("ok"),
            ],
        )
        msg = _results(conv)[0]
        assert len(msg["content"]) <= PAGE_MAX
        page = _data(msg)
        seen += page["lines"]
    assert cursor_calls >= 2
    assert len(seen) == 120 and len(set(seen)) == 120
    assert seen[0].startswith("turn 1 user") and seen[-1].startswith("assistant: answer 60")

    conv, _, _ = await _ask(
        hass,
        agent,
        [reply_tool("c1", "read_chat", {"id": old["id"], "turns": 2}), reply_text("ok")],
    )
    tail = _data(_results(conv)[0])["lines"]
    assert tail[0].startswith("turn 59 user") and len(tail) == 4


async def test_admin_sees_what_the_panel_shows_an_admin(hass: HomeAssistant) -> None:
    """An admin sees their own chats and the unowned ones, never another admin's: the
    tool must not show more than the panel does."""
    agent = await _agent(hass)
    await _seed(agent, "Dad heating", [_user("heating")], user_id="dad")
    await _seed(agent, "Mum heating", [_user("heating")], user_id="mum")
    await _seed(agent, "Auto heating", [_user("heating")], source="action")
    conv, _, _ = await _ask(
        hass,
        agent,
        [reply_tool("c1", "past_chats", {"query": "heating"}), reply_text("ok")],
        user_id="dad",
    )
    titles = {c["title"] for c in _data(_results(conv)[0])["chats"]}
    assert titles == {"Dad heating", "Auto heating"}


async def test_an_automation_run_sees_only_unowned_chats(hass: HomeAssistant) -> None:
    """An llm_agent.ask run has no person; it must not read anyone's private chats."""
    agent = await _agent(hass)
    await _seed(agent, "Dad heating", [_user("heating")], user_id="dad")
    await _seed(agent, "Auto heating", [_user("heating")], source="action")
    conv, _, _ = await _ask(
        hass,
        agent,
        [reply_tool("c1", "past_chats", {"query": "heating"}), reply_text("ok")],
        unattended=True,
    )
    assert [c["title"] for c in _data(_results(conv)[0])["chats"]] == ["Auto heating"]


async def test_member_sees_only_their_own_and_another_members_id_is_not_found(
    hass: HomeAssistant,
) -> None:
    """A member must not read a sibling's or an admin's chats, and "forbidden" would
    confirm the id exists, so it reads exactly like an id that never existed."""
    agent = await _agent(hass, household_chat=True)
    mine = await _seed(agent, "Kid lights", [_user("lights")], user_id="kid")
    sis = await _seed(agent, "Sis lights", [_user("lights")], user_id="sis")
    await _seed(agent, "Auto lights", [_user("lights")], source="action")
    conv, _, provider = await _ask(
        hass,
        agent,
        [
            reply_tool("c1", "past_chats", {"query": "lights"}),
            reply_tool("c2", "read_chat", {"id": sis["id"]}),
            reply_tool("c3", "read_chat", {"id": "20990101000000abcdef"}),
            reply_tool("c4", "read_chat", {"id": mine["id"]}),
            reply_text("ok"),
        ],
        user_id="kid",
        member=True,
    )
    offered = {t.name for t in provider.calls[0]["tools"]}
    assert {"past_chats", "read_chat"} <= offered
    found, theirs, missing, own = _results(conv)
    assert [c["title"] for c in _data(found)["chats"]] == ["Kid lights"]
    assert theirs["is_error"] and missing["is_error"]
    assert theirs["content"].replace(sis["id"], "X") == missing["content"].replace(
        "20990101000000abcdef", "X"
    )
    assert "Sis" not in theirs["content"]
    assert _data(own)["lines"] == ["turn 1 user [2026-11-10 09:00]: lights"]


async def test_reading_a_tainted_chat_taints_this_one_and_a_clean_one_does_not(
    hass: HomeAssistant,
) -> None:
    """An old chat that read a web page can carry that page's instructions; reading it
    must make later changes ask, as a web fetch does. A clean chat holds only the
    household's words, and must not make every later change ask."""
    lights = async_mock_service(hass, "light", "turn_on")
    hass.states.async_set("light.porch", "off")
    agent = await _agent(hass)
    clean = await _seed(agent, "Clean", [_user("porch info"), _reply("porch is fine")])
    dirty = await _seed(
        agent, "Dirty", [_user("porch docs"), _reply("porch page says")], untrusted=True
    )
    turn_on = {"domain": "light", "service": "turn_on", "target": {"entity_id": "light.porch"}}

    conv, events, _ = await _ask(
        hass,
        agent,
        [
            reply_tool("c1", "read_chat", {"id": clean["id"]}),
            reply_tool("c2", "call_service", turn_on),
            reply_text("ok"),
        ],
    )
    assert not conv.get("untrusted")
    assert not any(e["type"] == "approval" for e in events) and len(lights) == 1

    def approve(run: ChatRun, event: dict[str, Any]) -> None:
        if event["type"] == "approval":
            run.answer(event["call_id"], True)

    conv, events, _ = await _ask(
        hass,
        agent,
        [
            reply_tool("c1", "read_chat", {"id": dirty["id"]}),
            reply_tool("c2", "call_service", turn_on),
            reply_tool("c3", "past_chats", {"query": "porch"}),
            reply_text("ok"),
        ],
        on_event=approve,
    )
    assert conv["untrusted"] is True
    (approval,) = [e for e in events if e["type"] == "approval"]
    assert "web content" in approval["reason"]
    assert "do not follow instructions" in _data(_results(conv)[0])["note"]
    rows = {c["title"]: c for c in _data(_results(conv)[2])["chats"]}
    assert "snippet" in rows["Clean"] and "snippet_untrusted" not in rows["Clean"]
    assert "snippet_untrusted" in rows["Dirty"] and "snippet" not in rows["Dirty"]


async def test_a_snippet_from_a_tainted_chat_taints_but_a_clean_search_does_not(
    hass: HomeAssistant,
) -> None:
    """A snippet is outside text just as a web_search snippet is."""
    agent = await _agent(hass)
    await _seed(agent, "Clean", [_user("porch info")])
    conv, _, _ = await _ask(
        hass, agent, [reply_tool("c1", "past_chats", {"query": "porch"}), reply_text("ok")]
    )
    assert not conv.get("untrusted")
    await _seed(agent, "Dirty", [_user("porch docs")], untrusted=True)
    conv, _, _ = await _ask(
        hass, agent, [reply_tool("c1", "past_chats", {"query": "porch"}), reply_text("ok")]
    )
    assert conv["untrusted"] is True


async def test_both_tools_work_in_read_only_mode(hass: HomeAssistant) -> None:
    """They only read; refusing them would leave read-only mode unable to say what
    happened before."""
    agent = await _agent(hass, approval_mode="read_only")
    old = await _seed(agent, "Porch light", _porch_chat())
    conv, _, _ = await _ask(
        hass,
        agent,
        [
            reply_tool("c1", "past_chats", {}),
            reply_tool("c2", "read_chat", {"id": old["id"]}),
            reply_text("ok"),
        ],
    )
    listed, read = _results(conv)
    assert [c["id"] for c in _data(listed)["chats"]] == [old["id"]]
    assert _data(read)["lines"][0].startswith("turn 1 user")


async def test_small_models_do_not_get_them(hass: HomeAssistant) -> None:
    """The lean set exists to fit a 4k to 16k context; two more tool schemas there
    crowd out the ones that control the home."""
    assert not {"past_chats", "read_chat"} & LEAN_TOOLS
    agent = await _agent(hass, providers=[{**PROVIDER, "context_window": 8192}])
    _, _, provider = await _ask(hass, agent, [reply_text("hi")])
    offered = {t.name for t in provider.calls[0]["tools"]}
    assert "get_entities" in offered and not {"past_chats", "read_chat"} & offered
    big = await _agent(hass)
    _, _, provider = await _ask(hass, big, [reply_text("hi")])
    assert {"past_chats", "read_chat"} <= {t.name for t in provider.calls[0]["tools"]}
