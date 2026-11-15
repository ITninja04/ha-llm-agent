"""Integration reference pages (Music Assistant, WLED, Alexa Media Player, Frigate, camera
snapshots): the pages tell a model exact service names and fields, so a page that names an
action or field the integration does not have sends the model into a failing call.

Core pages are checked against the services.yaml of the Home Assistant under test, so a
Home Assistant upgrade that renames a field fails here. The two custom integrations are not
installed, so their expected actions are pinned below at the release the pages were written
from; bump the pin together with the page."""

from __future__ import annotations

import importlib.util
from pathlib import Path
import re

from homeassistant.core import HomeAssistant
import pytest
import yaml

from custom_components.llm_agent.tools import ToolError
from custom_components.llm_agent.tools.config_items import _validate
from custom_components.llm_agent.tools.reference import ORDER, _read_pages, summary

from .test_tools import _ctx, _tool

PAGES = _read_pages()
MINE = ("music-assistant", "wled", "alexa-media-player", "frigate", "camera-snapshots")
START = [{"trigger": "homeassistant", "event": "start"}]

# From services.yaml and the registration code of each release.
ALEXA_MEDIA_5_21_0 = {
    "force_logout": {"email"},
    "restore_volume": {"entity_id"},
    "get_history_records": {"entity_id", "entries"},
    "update_last_called": {"email"},
    "enable_network_discovery": {"email"},
    "amazon_kids_enable": {"entity_id", "child"},
    "amazon_kids_disable": {"entity_id"},
    "create_alarm": {"entity_id", "time", "days", "alarm_type", "music_provider", "music_entity"},
    "list_alarms": {"entity_id"},
    "enable_alarm": {"entity_id", "alarm_id"},
    "disable_alarm": {"entity_id", "alarm_id"},
    "delete_alarm": {"entity_id", "alarm_id"},
    "skip_next_alarm": {"entity_id", "alarm_id"},
    "repeat_last_message": {"entity_id"},
}
FRIGATE_5_15_6 = {
    "export_recording": {"playback_factor", "start_time", "end_time", "name"},
    "favorite_event": {"event_id", "favorite"},
    "ptz": {"action", "argument"},
    "create_event": {"label", "sub_label", "duration", "include_recording"},
    "end_event": {"event_id"},
    "review_summarize": {"config_entry_id", "start_time", "end_time"},
}


def _fields(spec: dict | None) -> set[str]:
    """Field names of one services.yaml entry. Sections (pagination, search_options) hold
    their own `fields`, but the data keys are flat."""
    found: set[str] = set()
    for name, field in ((spec or {}).get("fields") or {}).items():
        if isinstance(field, dict) and "fields" in field:
            found |= _fields(field)
        else:
            found.add(name)
    return found


def _core_services(domain: str) -> dict[str, set[str]]:
    spec = importlib.util.find_spec(f"homeassistant.components.{domain}")
    assert spec is not None and spec.submodule_search_locations, domain
    path = Path(next(iter(spec.submodule_search_locations))) / "services.yaml"
    if not path.exists():
        return {}
    return {name: _fields(body) for name, body in yaml.safe_load(path.read_text()).items()}


def _pinned(domain: str) -> dict[str, set[str]]:
    return {
        "music_assistant": _core_services("music_assistant"),
        "camera": _core_services("camera"),
        "image": _core_services("image"),
        "alexa_media": ALEXA_MEDIA_5_21_0,
        "frigate": FRIGATE_5_15_6,
    }[domain]


def _blocks(page: str) -> list[str]:
    return re.findall(r"```yaml\n(.*?)```", PAGES[page], re.S)


def _steps(node) -> list[dict]:
    """Every action step in an example, however deeply it is nested."""
    out: list[dict] = []
    if isinstance(node, dict):
        if isinstance(node.get("action"), str):
            out.append(node)
        for value in node.values():
            out += _steps(value)
    elif isinstance(node, list):
        for value in node:
            out += _steps(value)
    return out


def test_pages_are_indexed_ascii_and_have_a_title_and_summary() -> None:
    for name in MINE:
        text = PAGES[name]
        assert name in ORDER, name
        assert text.startswith("# ") and summary(text), name
        assert text.isascii(), f"{name} has non-ASCII characters"
        assert "—" not in text and "..." not in text, name


async def test_each_page_loads_through_read_reference(hass: HomeAssistant) -> None:
    tool = _tool("read_reference")
    for name in MINE:
        out = await tool.run(_ctx(hass), {"page": name})
        assert out.data == PAGES[name]
    with pytest.raises(ToolError):
        await tool.run(_ctx(hass), {"page": "frigate-docs"})


@pytest.mark.parametrize("page", MINE)
async def test_examples_are_valid_automations(hass: HomeAssistant, page: str) -> None:
    blocks = _blocks(page)
    assert len(blocks) >= 2, page
    for block in blocks:
        config = yaml.safe_load(block)
        if "triggers" not in config:
            config = {"triggers": START, **config}
        await _validate(_ctx(hass), "automation", "example", config)


@pytest.mark.parametrize(
    ("page", "domains"),
    [
        ("music-assistant", ("music_assistant",)),
        ("camera-snapshots", ("camera", "image")),
        ("alexa-media-player", ("alexa_media",)),
        ("frigate", ("frigate",)),
    ],
)
def test_examples_only_use_actions_and_fields_the_integration_has(
    page: str, domains: tuple[str, ...]
) -> None:
    used = 0
    for block in _blocks(page):
        for step in _steps(yaml.safe_load(block)):
            domain, _, service = step["action"].partition(".")
            if domain not in domains:
                continue
            known = _pinned(domain)
            assert service in known, f"{step['action']} is not an action of {domain}"
            data = set(step.get("data") or {})
            # entity_id in data is how the alexa_media schemas take their device
            assert data <= known[service], (step["action"], data - known[service])
            used += 1
    assert used >= 2, page


@pytest.mark.parametrize(
    ("page", "domains"),
    [
        ("music-assistant", ("music_assistant",)),
        ("camera-snapshots", ("camera", "image")),
        ("alexa-media-player", ("alexa_media",)),
        ("frigate", ("frigate",)),
    ],
)
def test_page_names_every_action_and_field(page: str, domains: tuple[str, ...]) -> None:
    # No fields and nothing to teach; the page lists them in one row without naming each.
    skip = {"camera": {"turn_on", "turn_off"}}
    text = PAGES[page]
    for domain in domains:
        for service, fields in _pinned(domain).items():
            if service in skip.get(domain, set()):
                continue
            assert service in text, f"{domain}.{service} missing from {page}"
            for field in fields:
                assert f"`{field}`" in text, f"{domain}.{service}: {field} not named in {page}"


def test_wled_has_no_actions_of_its_own() -> None:
    # The page tells the model not to look for wled.* actions.
    assert _core_services("wled") == {}
    assert "no actions of its own" in PAGES["wled"]
