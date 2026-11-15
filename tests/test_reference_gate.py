"""The reference page check: a call on an integration or kind of config that a reference page
covers is refused until that page was read in the chat.

The failure it prevents: models skipped the page the prompt asked for and called integration
actions from memory, with renamed or invented fields (a WLED or Music Assistant call shaped
like a generic one). A prompt rule alone did not stop that, so the agent loop refuses the call.
"""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.llm_agent.tools.reference import (
    INTEGRATION_PAGES,
    KIND_PAGES,
    NOTIFY_PAGES,
    SERVICE_PAGES,
    _read_pages,
    pages_for_service,
    pages_in_config,
)

from .conftest import PROVIDER
from .test_agent import ScriptedProvider, _run, reply_text, reply_tool
from .test_tools import _ctx, _tool


def _wled_strip(hass: HomeAssistant) -> str:
    entry = er.async_get(hass).async_get_or_create(
        "light", "wled", "strip-1", suggested_object_id="tv_strip"
    )
    hass.states.async_set(entry.entity_id, "off")
    return entry.entity_id


def _turn_on(entity_id: str) -> dict[str, Any]:
    return {"domain": "light", "service": "turn_on", "target": {"entity_id": entity_id}}


def test_every_required_page_exists() -> None:
    """A table entry naming a page that is not on disk would refuse a call forever, since
    read_reference could never satisfy it."""
    pages = set(_read_pages())
    for table in (INTEGRATION_PAGES, SERVICE_PAGES, NOTIFY_PAGES, KIND_PAGES):
        assert set(table.values()) <= pages, table
    assert {"dashboards", "helpers"} <= pages


async def test_a_generic_action_on_a_wled_light_needs_the_wled_page(hass: HomeAssistant) -> None:
    calls: list[ServiceCall] = async_mock_service(hass, "light", "turn_on")
    strip = _wled_strip(hass)
    provider = ScriptedProvider(
        [
            reply_tool("c1", "call_service", _turn_on(strip)),
            reply_tool("c2", "read_reference", {"page": "wled"}),
            reply_tool("c3", "call_service", _turn_on(strip)),
            reply_text("Done."),
        ]
    )
    conv, _ = await _run(hass, provider, "turn on the tv strip")
    tool_results = [m for m in conv["messages"] if m["role"] == "tool"]
    refused, read, ran = tool_results
    assert refused["is_error"] is True
    assert "read the reference page wled first" in refused["content"]
    assert read["is_error"] is False
    assert ran["is_error"] is False
    # only the call after the read reached Home Assistant
    assert len(calls) == 1
    assert conv["references_read"] == ["wled"]


async def test_a_light_from_an_integration_without_a_page_is_not_held_up(
    hass: HomeAssistant,
) -> None:
    calls: list[ServiceCall] = async_mock_service(hass, "light", "turn_on")
    hass.states.async_set("light.kitchen", "off")
    provider = ScriptedProvider(
        [reply_tool("c1", "call_service", _turn_on("light.kitchen")), reply_text("Done.")]
    )
    await _run(hass, provider, "kitchen on")
    assert len(calls) == 1


async def test_an_automation_needs_its_page_and_the_pages_of_what_it_calls(
    hass: HomeAssistant,
) -> None:
    strip = _wled_strip(hass)
    config = {
        "alias": "Movie lights",
        "triggers": [{"trigger": "homeassistant", "event": "start"}],
        "actions": [
            {"action": "light.turn_on", "target": {"entity_id": strip}},
            {"action": "music_assistant.play_media", "data": {"media_id": "x"}},
        ],
    }
    provider = ScriptedProvider(
        [
            reply_tool("c1", "save_config_item", {"kind": "automation", "config": config}),
            reply_text("ok"),
        ]
    )
    conv, _ = await _run(hass, provider, "make it")
    refused = conv["messages"][2]
    assert refused["is_error"] is True
    assert "automations, music-assistant, wled" in refused["content"]


async def test_small_models_without_read_reference_are_not_refused(hass: HomeAssistant) -> None:
    """The lean tool set has no read_reference, so the check would refuse forever."""
    calls: list[ServiceCall] = async_mock_service(hass, "light", "turn_on")
    strip = _wled_strip(hass)
    provider = ScriptedProvider(
        [reply_tool("c1", "call_service", _turn_on(strip)), reply_text("ok")]
    )
    await _run(hass, provider, "on", providers=[{**PROVIDER, "context_window": 8192}])
    assert len(calls) == 1


async def test_pages_by_action_name_and_target(hass: HomeAssistant) -> None:
    assert pages_for_service(hass, "notify", "alexa_media_kitchen", []) == {"alexa-media-player"}
    assert pages_for_service(hass, "camera", "snapshot", []) == {"camera-snapshots"}
    assert pages_for_service(hass, "camera", "turn_on", []) == set()
    assert pages_for_service(hass, "zwave_js", "set_config_parameter", []) == {"zwave-js"}
    # a device action in an automation names its integration in 'domain'
    device_action = {"device_id": "abc", "domain": "zha", "type": "issue_all_led_effect"}
    assert pages_in_config(hass, {"actions": [device_action]}) == {"zha"}


async def test_helpers_and_websocket_actions_need_their_pages(hass: HomeAssistant) -> None:
    ws = _tool("ha_websocket")
    ctx = _ctx(hass)
    create = {"command": "input_boolean/create", "payload": {}}
    assert ws.reference_pages(ctx, create) == {"helpers"}
    assert ws.reference_pages(ctx, {"command": "input_boolean/list"}) == set()
    service = {"command": "call_service", "payload": {"domain": "zha", "service": "permit"}}
    assert ws.reference_pages(ctx, service) == {"zha"}
    assert _tool("save_dashboard").reference_pages(ctx, {"config": {"views": []}}) == {"dashboards"}
