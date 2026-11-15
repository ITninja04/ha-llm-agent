"""Reference pages for Matter, Thread/OTBR, ESPHome, ZHA, Zigbee2MQTT and Z-Wave JS.

Models fail on exact service names and fields for these integrations. Each page was written
from the installed Home Assistant's own files, so these tests compare the page text with those
files and fail when HA adds, renames or drops an action and the page has gone stale.
They read services.yaml and the source as text because the radio libraries (zha,
zwave_js_server, matter_server) are not installed in the test environment."""

from __future__ import annotations

from pathlib import Path
import re
from typing import Any

import homeassistant.components as ha_components
from homeassistant.core import HomeAssistant
import pytest
import yaml

from custom_components.llm_agent.tools.config_items import _validate
from custom_components.llm_agent.tools.reference import _read_pages, summary

from .test_tools import _ctx, _tool

PAGES = _read_pages()
MINE = ("matter", "thread", "esphome", "zha", "zigbee2mqtt", "zwave-js")
COMPONENTS = Path(ha_components.__file__).parent

# Actions that are listed in services.yaml but that HA never registers. The ZHA page tells the
# model to use the WebSocket command instead, so the page must not list them as actions.
UNREGISTERED = {"zha": {"reconfigure_device"}}
# Registered by the sensor platform, so they sit in services.yaml but not in the services module.
TARGET_FIELDS = {"area_id", "device_id", "entity_id"}
# Documented under a different spelling on purpose.
DEPRECATED_FIELDS = {"ieee_address"}


def _reference_part(page: str) -> str:
    """Text before the first example. Examples and mistakes mention actions on purpose."""
    return PAGES[page].split("```yaml")[0]


def _services(domain: str) -> dict[str, dict[str, Any]]:
    raw = yaml.safe_load((COMPONENTS / domain / "services.yaml").read_text(encoding="utf-8"))
    return raw or {}


def _fields(spec: dict[str, Any]) -> dict[str, dict[str, Any]]:
    """Fields of a service, with the fields nested in collapsible sections flattened."""
    out: dict[str, dict[str, Any]] = {}
    for name, field in (spec.get("fields") or {}).items():
        if "fields" in field:
            out.update(_fields(field))
        else:
            out[name] = field
    return out


def _segments(page: str, domain: str) -> dict[str, str]:
    """Text of the page that follows each `domain.service` mention, up to the next one."""
    text = _reference_part(page)
    parts = re.split(rf"(?=`{re.escape(domain)}\.\w+`)", text)
    out: dict[str, str] = {}
    for part in parts:
        m = re.match(rf"`{re.escape(domain)}\.(\w+)`", part)
        if m:
            out[m.group(1)] = out.get(m.group(1), "") + part
    return out


def _yaml_blocks(page: str) -> list[Any]:
    return [yaml.safe_load(b) for b in re.findall(r"```yaml\n(.*?)```", PAGES[page], re.S)]


@pytest.mark.parametrize("page", MINE)
def test_page_has_title_summary_and_stays_short(page: str) -> None:
    text = PAGES[page]
    assert text.startswith("# "), page
    assert 0 < len(summary(text)) <= 100, "the summary is in every system prompt"
    assert text.isascii(), page
    # tests/test_settings.py proves the home summary is absent by looking for "Home:" in the
    # system prompt, and the index lives there, so "ESPHome:" in a summary reads as the summary.
    assert "Home:" not in summary(text), page
    assert "--" not in text and "..." not in text, page
    assert len(text) < 6000, "pages are loaded into context whole"


@pytest.mark.parametrize("page", MINE)
async def test_read_reference_serves_the_page(hass: HomeAssistant, page: str) -> None:
    tool = _tool("read_reference")
    # A page missing from the enum cannot be requested, even though it is on disk.
    assert page in tool.parameters["properties"]["page"]["enum"]
    out = await tool.run(_ctx(hass), {"page": page})
    assert out.data == PAGES[page]


@pytest.mark.parametrize(
    ("page", "domain"), [("matter", "matter"), ("zha", "zha"), ("zwave-js", "zwave_js")]
)
def test_page_lists_exactly_the_actions_home_assistant_ships(page: str, domain: str) -> None:
    shipped = set(_services(domain)) - UNREGISTERED.get(domain, set())
    assert set(_segments(page, domain)) == shipped
    for dropped in UNREGISTERED.get(domain, set()):
        # Still unregistered? If HA registers it, the page needs to list it.
        sources = "".join(p.read_text(encoding="utf-8") for p in (COMPONENTS / domain).glob("*.py"))
        assert f'"{dropped}"' not in sources and f'= "{dropped}"' not in sources


@pytest.mark.parametrize(
    ("page", "domain"), [("matter", "matter"), ("zha", "zha"), ("zwave-js", "zwave_js")]
)
def test_every_field_is_named_next_to_its_action(page: str, domain: str) -> None:
    segments = _segments(page, domain)
    for name, spec in _services(domain).items():
        if name in UNREGISTERED.get(domain, set()):
            continue
        for field in _fields(spec):
            if field in TARGET_FIELDS | DEPRECATED_FIELDS:
                continue
            assert f"`{field}`" in segments[name], f"{domain}.{name} field {field}"


@pytest.mark.parametrize(
    ("page", "domain"),
    [("matter", "matter"), ("zha", "zha"), ("zwave-js", "zwave_js"), ("zigbee2mqtt", "mqtt")],
)
def test_examples_use_real_actions_and_all_required_fields(page: str, domain: str) -> None:
    services = _services(domain)
    seen = 0
    for block in _yaml_blocks(page):
        for step in block["actions"]:
            if not step["action"].startswith(f"{domain}."):
                continue
            seen += 1
            spec = services[step["action"].split(".", 1)[1]]
            data = step.get("data") or {}
            fields = _fields(spec)
            assert set(data) <= set(fields), (step["action"], set(data) - set(fields))
            required = {
                k for k, v in fields.items() if v.get("required") and k not in TARGET_FIELDS
            }
            assert required <= set(data), (step["action"], required - set(data))
    assert seen, page


def test_zigbee2mqtt_payload_examples_are_strings_with_valid_json() -> None:
    # mqtt.publish rejects a mapping as payload, so the page must show quoted JSON.
    import json

    publishes = [
        s["data"]
        for b in _yaml_blocks("zigbee2mqtt")
        for s in b["actions"]
        if s["action"] == "mqtt.publish"
    ]
    assert publishes
    for data in publishes:
        assert isinstance(data["payload"], str)
        json.loads(data["payload"])


def test_mqtt_publish_fields_in_the_page_match_home_assistant() -> None:
    text = _reference_part("zigbee2mqtt")
    for field in _fields(_services("mqtt")["publish"]):
        assert f"`{field}`" in text, field


@pytest.mark.parametrize("page", ["matter", "zha", "zigbee2mqtt", "zwave-js", "esphome"])
async def test_examples_are_valid_automations(hass: HomeAssistant, page: str) -> None:
    start = [{"trigger": "homeassistant", "event": "start"}]
    for block in _yaml_blocks(page):
        config = {"triggers": start, **block}
        await _validate(_ctx(hass), "automation", "example", config)


@pytest.mark.parametrize(
    ("page", "folder"), [("matter", "matter"), ("thread", "thread"), ("zha", "zha")]
)
def test_websocket_commands_in_the_page_exist(page: str, folder: str) -> None:
    sources = "".join(p.read_text(encoding="utf-8") for p in (COMPONENTS / folder).glob("*.py"))
    if page == "thread":
        sources += "".join(
            p.read_text(encoding="utf-8") for p in (COMPONENTS / "otbr").glob("*.py")
        )
    commands = re.findall(r"`((?:matter|thread|otbr|zha)/[a-z_/]+)", PAGES[page])
    assert commands, page
    for command in commands:
        assert f'"{command}"' in sources, command


def test_thread_and_otbr_really_add_no_services() -> None:
    # The page tells the model not to look for thread.* or otbr.* actions.
    for domain in ("thread", "otbr"):
        assert not (COMPONENTS / domain / "services.yaml").exists()


def test_esphome_page_matches_how_home_assistant_names_device_actions() -> None:
    assert _services("esphome") == {}, "ESPHome gained fixed actions, the page says it has none"
    manager = (COMPONENTS / "esphome" / "manager.py").read_text(encoding="utf-8")
    assert "device_info.name.replace('-', '_')}_{service.name}" in manager
    text = PAGES["esphome"]
    assert "esphome.garage_node_start_fan" in text and "garage-node" in text
    # Every declared argument is registered as Required, there are no optional ones.
    assert re.search(r"Required\(arg\.name\)", manager)
    assert "DEFAULT_ALLOW_SERVICE_CALLS = True" in (COMPONENTS / "esphome" / "const.py").read_text(
        encoding="utf-8"
    )
    assert "(on by default)" in text
