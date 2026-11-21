"""Setup, panel registration and the admin-only WebSocket API."""

from __future__ import annotations

from pathlib import Path
from typing import Any
from unittest.mock import patch

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

import custom_components.llm_agent
from custom_components.llm_agent.const import (
    DOMAIN,
    PANEL_URL,
    PREVIEW_ELEMENT,
    PREVIEW_URL,
    STATIC_URL,
)
from custom_components.llm_agent.settings_export import export_text

from .conftest import entry_options
from .test_agent import ScriptedProvider, reply_text


async def _setup(hass: HomeAssistant, **opts: Any) -> MockConfigEntry:
    assert await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(
        domain=DOMAIN, data={"acknowledged_risks": True}, options=entry_options(**opts)
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_setup_registers_admin_panel_and_assist_agent(hass: HomeAssistant) -> None:
    entry = await _setup(hass)
    panels = hass.data["frontend_panels"]
    assert PANEL_URL in panels
    assert panels[PANEL_URL].require_admin is True
    assert hass.states.async_entity_ids("conversation")
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert PANEL_URL not in hass.data["frontend_panels"]


async def _save_settings(hass: HomeAssistant, entry: MockConfigEntry, **section: Any) -> None:
    flow = await hass.config_entries.options.async_init(entry.entry_id)
    flow = await hass.config_entries.options.async_configure(
        flow["flow_id"], {"next_step_id": "settings"}
    )
    flow = await hass.config_entries.options.async_configure(
        flow["flow_id"], {"approval_mode": "ask_risky", **section}
    )
    assert flow["type"] == "create_entry"
    await hass.async_block_till_done()


async def test_settings_save_keeps_the_panel_through_the_reload(hass: HomeAssistant) -> None:
    """The panel saves settings through the options flow, which reloads the entry. A
    reload that removed the panel for a moment sent the open browser to the default
    dashboard, so the panel must stay registered at every panels_updated event."""
    entry = await _setup(hass)
    before = entry.runtime_data
    seen: list[tuple[bool, bool | None]] = []

    def on_panels(_event: Any) -> None:
        panel = hass.data["frontend_panels"].get(PANEL_URL)
        seen.append((panel is not None, panel.require_admin if panel else None))

    hass.bus.async_listen("panels_updated", on_panels)
    await _save_settings(hass, entry, cost={"max_steps": 31})
    assert entry.runtime_data is not before  # it did reload
    assert entry.runtime_data.options["max_steps"] == 31
    assert seen and all(present for present, _ in seen)

    # household chat changes who may open the panel: updated in place, still no gap
    seen.clear()
    await _save_settings(hass, entry, household={"household_chat": True})
    assert seen and all(present for present, _ in seen)
    assert hass.data["frontend_panels"][PANEL_URL].require_admin is False
    module = hass.data["frontend_panels"][PANEL_URL].config["_panel_custom"]["module_url"]
    assert module.endswith(f"?v={hass.data[f'{DOMAIN}_version']}")


async def test_settings_save_removes_the_panel_when_the_reload_fails(
    hass: HomeAssistant,
) -> None:
    """A panel kept for an entry that did not come back would open onto a dead API."""
    entry = await _setup(hass)
    with patch("custom_components.llm_agent.Agent", side_effect=RuntimeError("setup broke")):
        await _save_settings(hass, entry, cost={"max_steps": 31})
    assert PANEL_URL not in hass.data["frontend_panels"]


async def test_solid_preview_page_exists_only_while_its_option_is_on(
    hass: HomeAssistant, hass_ws_client, hass_admin_user
) -> None:
    """The preview is a half-built page for one person to try. It must not appear for
    anyone running the integration who has not turned it on, must survive a settings
    save like the main panel, and must load a bundle that is really in www/."""
    entry = await _setup(hass)
    panels = hass.data["frontend_panels"]
    assert PREVIEW_URL not in panels  # off for every existing and new install
    assert "solid_preview" not in export_text(dict(entry.options))

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "llm_agent/solid_preview", "enabled": True})
    assert (await client.receive_json())["result"] == {"enabled": True}
    await hass.async_block_till_done()
    page = panels[PREVIEW_URL]
    assert page.require_admin is True
    custom = page.config["_panel_custom"]
    assert custom["name"] == PREVIEW_ELEMENT
    file = custom["module_url"].removeprefix(f"{STATIC_URL}/").split("?")[0]
    assert (Path(custom_components.llm_agent.__file__).parent / "www" / file).is_file()
    # the page loads the shipping panel bundle for the Lit view beside the Solid one
    assert page.config["lit_url"] == panels[PANEL_URL].config["_panel_custom"]["module_url"]

    # an ordinary settings save keeps it
    await _save_settings(hass, entry, cost={"max_steps": 31})
    assert PREVIEW_URL in panels

    await client.send_json_auto_id({"type": "llm_agent/solid_preview", "enabled": False})
    await client.receive_json()
    await hass.async_block_till_done()
    assert PREVIEW_URL not in panels

    hass_admin_user.groups = []
    await client.send_json_auto_id({"type": "llm_agent/solid_preview", "enabled": True})
    msg = await client.receive_json()
    assert msg["error"]["code"] == "unauthorized"


async def test_solid_preview_page_goes_with_the_entry(hass: HomeAssistant) -> None:
    entry = await _setup(hass, solid_preview=True)
    assert PREVIEW_URL in hass.data["frontend_panels"]
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert PREVIEW_URL not in hass.data["frontend_panels"]


async def test_ws_rejects_non_admin(hass: HomeAssistant, hass_ws_client, hass_admin_user) -> None:
    await _setup(hass)
    hass_admin_user.groups = []
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "llm_agent/conversations/list"})
    msg = await client.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "unauthorized"


async def test_ws_chat_streams_and_persists(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "llm_agent/info"})
    info = await client.receive_json()
    assert info["result"]["providers"][0]["id"] == "p1"

    provider = ScriptedProvider([reply_text("Hello there")])
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await client.send_json_auto_id({"type": "llm_agent/chat", "text": "hi"})
        result = await client.receive_json()
        assert result["success"]
        conv_id = result["result"]["conversation_id"]
        events = []
        while True:
            msg = await client.receive_json()
            events.append(msg["event"])
            if msg["event"]["type"] == "done":
                break
    assert "".join(e.get("text", "") for e in events if e["type"] == "delta") == "Hello there"
    # subscribers get the chat's id as the first event
    assert events[0] == {"type": "conversation", "conversation_id": conv_id, "title": "New chat"}
    await client.send_json_auto_id({"type": "llm_agent/chat", "text": " \n "})
    assert not (await client.receive_json())["success"]

    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/get", "conversation_id": conv_id}
    )
    conv = (await client.receive_json())["result"]
    assert [m["role"] for m in conv["messages"]] == ["user", "assistant"]
    assert conv["messages"][0]["content"] == "hi"
    assert "raw" not in conv["messages"][1]

    await client.send_json_auto_id({"type": "llm_agent/conversations/list"})
    assert (await client.receive_json())["result"][0]["id"] == conv_id


async def test_diagnostics_redact_keys_and_omit_content(hass: HomeAssistant) -> None:
    from custom_components.llm_agent.diagnostics import async_get_config_entry_diagnostics

    entry = await _setup(
        hass, extra_prompt="my alarm code is zebra-4471", search_api_key="brave-secret-77"
    )
    agent = entry.runtime_data
    await agent.snapshots.audit(
        {"tool": "call_service", "args": "secret args", "risk": "low", "ok": False, "detail": "x"}
    )
    diag = await async_get_config_entry_diagnostics(hass, entry)
    text = str(diag)
    assert "sk-" not in text and entry.options["providers"][0]["api_key"] not in text
    assert "zebra-4471" not in text and "secret args" not in text and "brave-secret-77" not in text
    assert diag["recent_actions"][-1] == {
        "time": diag["recent_actions"][-1]["time"],
        "tool": "call_service",
        "risk": "low",
        "ok": False,
    }


async def test_diagnostics_strip_credentials_from_provider_urls(hass: HomeAssistant) -> None:
    from custom_components.llm_agent.diagnostics import _redact_provider

    out = _redact_provider({"base_url": "http://bob:hunter2@proxy.lan:8080/v1", "api_key": "k"})
    assert out["base_url"] == "http://**REDACTED**@proxy.lan:8080/v1"
    assert "hunter2" not in str(out) and out["api_key"] != "k"
    assert _redact_provider({"base_url": "http://ollama:11434/v1"})["base_url"] == (
        "http://ollama:11434/v1"
    )


async def test_store_keeps_running_conversations_cached_and_deleted_ones_dead(
    hass: HomeAssistant,
) -> None:
    from custom_components.llm_agent.store import CACHE_SIZE, ConversationStore

    running: set[str] = set()
    store = ConversationStore(hass, busy=lambda cid: cid in running)
    await store.async_load()
    first = await store.create("p1", "m", "")
    running.add(first["id"])
    for _ in range(CACHE_SIZE + 3):
        await store.create("p1", "m", "")
    # still the same object, not a stale copy reloaded from disk
    assert await store.get(first["id"]) is first

    await store.delete(first["id"])
    first["messages"].append({"role": "user", "content": "late"})
    store.save(first)  # a cancelled run finishing after the delete
    assert await store.get(first["id"]) is None
    assert first["id"] not in [c["id"] for c in store.list()]


async def _chat_events(client) -> list[dict[str, Any]]:
    events = []
    while True:
        msg = await client.receive_json()
        events.append(msg["event"])
        if msg["event"]["type"] == "done":
            return events


async def test_ws_chat_sends_photos_for_that_turn_only(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    client = await hass_ws_client(hass)
    photo = {"media_type": "image/jpeg", "data": "/9j/4AAQ"}
    provider = ScriptedProvider([reply_text("A plug."), reply_text("Yes.")])
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await client.send_json_auto_id(
            {"type": "llm_agent/chat", "text": "what is this?", "images": [photo]}
        )
        result = await client.receive_json()
        assert result["success"]
        conv_id = result["result"]["conversation_id"]
        await _chat_events(client)
        await client.send_json_auto_id(
            {"type": "llm_agent/chat", "conversation_id": conv_id, "text": "is it smart?"}
        )
        assert (await client.receive_json())["success"]
        await _chat_events(client)
    assert provider.calls[0]["messages"][0]["images"] == [photo]
    later = provider.calls[1]["messages"][0]
    assert "images" not in later and "no longer attached" in later["content"]

    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/get", "conversation_id": conv_id}
    )
    first = (await client.receive_json())["result"]["messages"][0]
    assert first == {"role": "user", "content": "what is this?", "photos": 1}


async def test_ws_chat_refuses_bad_photos(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    client = await hass_ws_client(hass)
    good = {"media_type": "image/png", "data": "iVBORw0KGgo="}
    for images in (
        [{"media_type": "image/svg+xml", "data": "QUJD"}],
        [{"media_type": "image/png", "data": "not base64!"}],
        [{"media_type": "image/png", "data": "iVBORw0KGgo=", "url": "http://x"}],
        [{"media_type": "image/png", "data": "/9j/4AAQ"}],  # a JPEG claiming to be a PNG
        [{"media_type": "image/png", "data": ""}],
        [good] * 4,
    ):
        await client.send_json_auto_id({"type": "llm_agent/chat", "text": "hi", "images": images})
        result = await client.receive_json()
        assert not result["success"], images[0]["media_type"]


def test_photo_size_is_checked() -> None:
    import probatio as vol
    import pytest

    from custom_components.llm_agent.websocket import _photo

    with pytest.raises(vol.Invalid, match="too large"):
        _photo({"media_type": "image/png", "data": "A" * 5_000_000})


def test_photo_checks_the_picture_type() -> None:
    from custom_components.llm_agent.websocket import _photo

    assert _photo({"media_type": "image/webp", "data": "UklGRgAAAABXRUJQ"})["data"]
    assert _photo({"media_type": "image/gif", "data": "R0lGODlh"})["data"]


def test_saved_conversations_never_hold_pictures() -> None:
    from custom_components.llm_agent.store import _without_images

    conv = {"id": "c", "messages": [{"role": "user", "content": "x", "images": [1], "photos": 1}]}
    saved = _without_images(conv)
    assert saved["messages"][0] == {"role": "user", "content": "x", "photos": 1}
    assert conv["messages"][0]["images"] == [1]  # the running turn keeps them


async def test_ws_truncate_cuts_at_an_earlier_message_and_tells_the_model(
    hass: HomeAssistant, hass_ws_client
) -> None:
    """Editing an earlier message in the panel: the chat is cut there, a running reply
    can't be cut under it, and the next message tells the model what the dropped turns
    already did, so it does not switch the lamp on a second time."""
    entry = await _setup(hass)
    agent = entry.runtime_data
    conv = await agent.store.create("p1", "gpt-5.4-mini", "")
    conv["messages"] = [
        {"role": "user", "content": "first"},
        {"role": "assistant", "content": "ok"},
        {"role": "user", "content": "turn on the lamp"},
        {"role": "assistant", "content": "", "tool_calls": [{"id": "c1", "name": "x"}]},
        {
            "role": "tool",
            "tool_call_id": "c1",
            "name": "call_service",
            "content": "ok",
            "summary": "Called light.turn_on",
        },
        {"role": "assistant", "content": "Done"},
    ]
    conv["stopped"] = "length"
    client = await hass_ws_client(hass)

    agent.runs[conv["id"]] = object()  # a reply is running
    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/truncate", "conversation_id": conv["id"], "index": 1}
    )
    assert (await client.receive_json())["error"]["code"] == "busy"
    assert len(conv["messages"]) == 6
    agent.runs.pop(conv["id"])

    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/truncate", "conversation_id": conv["id"], "index": 5}
    )
    assert (await client.receive_json())["error"]["code"] == "not_found"

    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/truncate", "conversation_id": conv["id"], "index": 1}
    )
    assert (await client.receive_json())["success"]
    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/get", "conversation_id": conv["id"]}
    )
    got = (await client.receive_json())["result"]
    assert [m["content"] for m in got["messages"]] == ["first", "ok"]
    assert got["stopped"] is None  # the cut-off notice belonged to a dropped turn

    provider = ScriptedProvider([reply_text("Lamp is dimmed")])
    with patch("custom_components.llm_agent.agent.make_provider", return_value=provider):
        await client.send_json_auto_id(
            {"type": "llm_agent/chat", "conversation_id": conv["id"], "text": "dim the lamp"}
        )
        assert (await client.receive_json())["success"]
        while (await client.receive_json())["event"]["type"] != "done":
            pass
    sent = provider.calls[0]["messages"][-1]
    assert "Called light.turn_on" in str(sent) and "dim the lamp" in str(sent)
    assert "rewind_note" not in conv  # carried once, not on every later message
    # the panel shows what was typed, not the note
    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/get", "conversation_id": conv["id"]}
    )
    got = (await client.receive_json())["result"]
    assert [m["content"] for m in got["messages"] if m["role"] == "user"] == [
        "first",
        "dim the lamp",
    ]


async def test_ws_truncate_is_admin_only(
    hass: HomeAssistant, hass_ws_client, hass_admin_user
) -> None:
    entry = await _setup(hass)
    conv = await entry.runtime_data.store.create("p1", "gpt-5.4-mini", "")
    conv["messages"] = [{"role": "user", "content": "first"}]
    hass_admin_user.groups = []
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": "llm_agent/conversations/truncate", "conversation_id": conv["id"], "index": 0}
    )
    assert (await client.receive_json())["error"]["code"] == "unauthorized"
    assert conv["messages"] == [{"role": "user", "content": "first"}]


def _modules(hass: HomeAssistant) -> set[str]:
    """The extra modules HA writes into every page it serves (index.html)."""
    return set(hass.data["frontend_extra_module_url"].urls)


def _loader(hass: HomeAssistant) -> str:
    return f"/llm_agent_static/llm-agent-float.js?v={hass.data[f'{DOMAIN}_version']}"


async def test_float_button_loader_is_on_every_page_until_unload(hass: HomeAssistant) -> None:
    """Without the module in HA's list no page draws the chat button; left in after an
    unload, every page would load a button whose chat has no backend."""
    entry = await _setup(hass)
    assert _loader(hass) in _modules(hass)
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert not any("llm-agent-float" in url for url in _modules(hass))


async def test_float_button_option_off_registers_no_loader(hass: HomeAssistant) -> None:
    entry = await _setup(hass, float_button=False)
    assert not any("llm-agent-float" in url for url in _modules(hass))
    assert await hass.config_entries.async_unload(entry.entry_id)


async def test_float_button_follows_the_option_on_open_pages(
    hass: HomeAssistant, hass_ws_client
) -> None:
    """Open browsers learn of changes through frontend/subscribe_extra_js. A settings save
    that does not touch the option must send them nothing (a remove and an add would make
    every page load the module again), and turning it off must send the remove the loader
    hides itself on."""
    entry = await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "frontend/subscribe_extra_js"})
    assert (await client.receive_json())["success"]

    await _save_settings(hass, entry, cost={"max_steps": 31})
    await client.send_json_auto_id({"type": "ping"})
    assert (await client.receive_json())["type"] == "pong"  # no event came before it

    await _save_settings(hass, entry, household={"float_button": False})
    event = (await client.receive_json())["event"]
    assert event == {"change_type": "removed", "item": {"type": "module", "url": _loader(hass)}}
    assert not any("llm-agent-float" in url for url in _modules(hass))

    await _save_settings(hass, entry, household={"float_button": True})
    event = (await client.receive_json())["event"]
    assert event == {"change_type": "added", "item": {"type": "module", "url": _loader(hass)}}
    assert _loader(hass) in _modules(hass)
