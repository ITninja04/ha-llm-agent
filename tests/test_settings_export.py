"""Settings export and restore: carrying a config entry to a fresh install."""

from __future__ import annotations

import json
from unittest.mock import patch

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.llm_agent.const import DOMAIN
from custom_components.llm_agent.settings_export import BadExport, export_text, import_text

from .conftest import entry_options

SETUP = "custom_components.llm_agent.async_setup_entry"


def _suggested(result: dict, key: str) -> str:
    for field in result["data_schema"].schema:
        if str(field) == key:
            return field.description["suggested_value"]
    raise AssertionError(f"{key} not in the form")


async def test_export_then_restore_gives_back_the_same_settings(hass: HomeAssistant) -> None:
    """The whole point: delete the integration, add it again, paste, and every
    provider, key and setting is back. Asserting on the entry the restore creates,
    not on the text, catches a field that exports but never comes back."""
    original = entry_options(approval_mode="yolo", approval_rules="deny lock.*", max_chats=77)
    old = MockConfigEntry(domain=DOMAIN, data={"acknowledged_risks": True}, options=original)
    old.add_to_hass(hass)
    with patch(SETUP, return_value=True):
        result = await hass.config_entries.options.async_init(old.entry_id)
        assert "export" in result["menu_options"]
        result = await hass.config_entries.options.async_configure(
            result["flow_id"], {"next_step_id": "export"}
        )
        assert result["step_id"] == "export"
        text = _suggested(result, "settings")
        done = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert done["type"] is FlowResultType.ABORT and done["reason"] == "exported"
    assert dict(old.options) == original  # exporting changes nothing
    await hass.config_entries.async_remove(old.entry_id)

    with patch(SETUP, return_value=True):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {"type": "anthropic", "acknowledged_risks": True, "restore": text},
        )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["options"] == original
    assert result["options"]["providers"][0]["api_key"] == original["providers"][0]["api_key"]


async def test_restore_still_needs_the_risk_acknowledgement(hass: HomeAssistant) -> None:
    text = export_text(entry_options())
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"type": "anthropic", "acknowledged_risks": False, "restore": text}
    )
    assert result["errors"] == {"acknowledged_risks": "must_acknowledge"}


async def test_bad_restore_text_says_why_on_the_form(hass: HomeAssistant) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {"type": "anthropic", "acknowledged_risks": True, "restore": '{"hello": 1}'},
    )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"restore": "bad_export"}
    assert "not an LLM Agent settings export" in result["description_placeholders"]["why"]


def test_unknown_keys_are_dropped_and_unknown_modes_reset() -> None:
    data = json.loads(export_text(entry_options()))
    data["options"]["planted"] = "x"
    data["options"]["approval_mode"] = "mode_from_the_future"
    options = import_text(json.dumps(data))
    assert "planted" not in options
    assert options["approval_mode"] == "ask_risky"


@pytest.mark.parametrize(
    ("change", "why"),
    [
        ({"version": 99}, "newer"),
        ({"options": {"providers": []}}, "no AI provider"),
        ({"options": {"providers": [{"id": "p", "type": "nope", "base_url": ""}]}}, "unknown"),
        ({"options": None}, "no settings"),
    ],
)
def test_unusable_exports_are_refused(change: dict, why: str) -> None:
    data = json.loads(export_text(entry_options()))
    data.update(change)
    with pytest.raises(BadExport, match=why):
        import_text(json.dumps(data))


def test_not_json_is_refused() -> None:
    with pytest.raises(BadExport, match="not JSON"):
        import_text("providers: [claude]")
