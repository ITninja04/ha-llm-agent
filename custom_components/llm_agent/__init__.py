"""LLM Agent: an AI chat panel that can operate Home Assistant."""

from __future__ import annotations

import asyncio
from datetime import timedelta
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from . import websocket
from .agent import Agent
from .chatgpt_auth import get_auth
from .const import (
    CONF_AUTO_DELETE_DAYS,
    CONF_FLOAT_BUTTON,
    CONF_HOUSEHOLD,
    DEFAULT_OPTIONS,
    DOMAIN,
    FLOAT_LOADER,
    NAME,
    PANEL_ELEMENT,
    PANEL_URL,
    STATIC_URL,
    setting,
)
from .services import async_setup_services

PLATFORMS = [Platform.AI_TASK, Platform.CONVERSATION]
_REGISTERED = f"{DOMAIN}_registered"
# Set while a settings save reloads the entry, so the unload keeps the panel.
_KEEP_PANEL = f"{DOMAIN}_keep_panel"
# The floating button's loader URL as registered with the frontend, or absent.
_FLOAT_URL = f"{DOMAIN}_float_url"

type LLMAgentConfigEntry = ConfigEntry[Agent]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register actions once; they work while a config entry is loaded."""
    async_setup_services(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: LLMAgentConfigEntry) -> bool:
    options = {**DEFAULT_OPTIONS, **entry.options}
    agent = Agent(hass, options)
    await agent.store.async_load()
    entry.runtime_data = agent
    hass.data[DOMAIN] = agent

    integration = await async_get_integration(hass, DOMAIN)
    version = str(integration.version)
    hass.data[f"{DOMAIN}_version"] = version

    # Static files and WS commands cannot be unregistered, so register them once.
    if not hass.data.get(_REGISTERED):
        www = Path(__file__).parent / "www"
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(www), cache_headers=True)]
        )
        websocket.async_register(hass)
        hass.data[_REGISTERED] = True

    # the version query busts the browser cache after an update
    module_url = f"{STATIC_URL}/{PANEL_ELEMENT}.js?v={version}"
    # With household chat on, every user sees the panel; the WebSocket commands
    # decide what each one may do.
    require_admin = not setting(options, CONF_HOUSEHOLD)
    kept = hass.data.get(frontend.DATA_PANELS, {}).get(PANEL_URL)
    if kept is not None and kept.config:
        # Kept across a settings save (see _async_update_listener): update it in place,
        # which sends the browser one change and, when nothing changed, none it acts on.
        # panel_custom has no update option, so its config is reused with the new URL.
        custom = {
            **kept.config["_panel_custom"],
            "module_url": module_url,
            "handle_safe_area": True,
        }
        frontend.async_register_built_in_panel(
            hass,
            component_name="custom",
            sidebar_title=NAME,
            sidebar_icon="mdi:robot-outline",
            frontend_url_path=PANEL_URL,
            config={**kept.config, "_panel_custom": custom},
            require_admin=require_admin,
            update=True,
        )
    else:
        await panel_custom.async_register_panel(
            hass,
            frontend_url_path=PANEL_URL,
            webcomponent_name=PANEL_ELEMENT,
            sidebar_title=NAME,
            sidebar_icon="mdi:robot-outline",
            module_url=module_url,
            embed_iframe=False,
            require_admin=require_admin,
            # the panel pads itself by the safe-area insets (see panel.ts styles)
            handle_safe_area=True,
        )

    _sync_float_button(
        hass,
        f"{STATIC_URL}/{FLOAT_LOADER}.js?v={version}"
        if setting(options, CONF_FLOAT_BUTTON)
        else None,
    )

    async def _auto_delete(_now: object = None) -> None:
        days = setting(options, CONF_AUTO_DELETE_DAYS)
        if days:
            await agent.store.delete_older_than(days)

    await _auto_delete()
    entry.async_on_unload(async_track_time_interval(hass, _auto_delete, timedelta(hours=6)))

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def _async_update_listener(hass: HomeAssistant, entry: LLMAgentConfigEntry) -> None:
    """A settings save reloads the entry with the panel kept registered. Removing it,
    even for the moment the reload takes, makes the frontend drop the open panel and
    go to the default dashboard, so saving from inside the panel would throw the admin
    out of it. Other unloads (disable, remove, a reload from the integrations page)
    still remove the panel, so it never outlives an entry that is not coming back."""
    hass.data[_KEEP_PANEL] = True
    try:
        await hass.config_entries.async_reload(entry.entry_id)
    finally:
        hass.data.pop(_KEEP_PANEL, None)
        if entry.state is not ConfigEntryState.LOADED:  # the setup after it failed
            frontend.async_remove_panel(hass, PANEL_URL, warn_if_unknown=False)
            _sync_float_button(hass, None)


def _sync_float_button(hass: HomeAssistant, url: str | None) -> None:
    """Make the frontend's extra module list hold `url` (or none of ours).

    HA sends every open browser each add and remove, and the loader listens for its own
    URL, so turning the button off hides it on open pages without a reload. A settings
    save keeps the URL the way it keeps the panel (see _async_update_listener), so open
    pages are not sent a remove and an add of the same module for nothing. HA's remove
    takes an unknown URL without complaint but still notifies every browser, so only a
    URL this integration added is removed.
    """
    current = hass.data.get(_FLOAT_URL)
    if current == url:
        return
    if current is not None:
        frontend.remove_extra_js_url(hass, current)
        hass.data.pop(_FLOAT_URL, None)
    if url is not None:
        frontend.add_extra_js_url(hass, url)
        hass.data[_FLOAT_URL] = url


async def async_unload_entry(hass: HomeAssistant, entry: LLMAgentConfigEntry) -> bool:
    agent = entry.runtime_data
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if not unloaded:
        return False  # still loaded: keep the panel, phone and running turns
    agent.phone.close()
    tasks = [run.task for run in list(agent.runs.values()) if run.task]
    for task in tasks:
        task.cancel()
    if tasks:
        # let stopped turns save their last state before the new stores load
        await asyncio.wait(tasks, timeout=10)
    await agent.store.flush()
    if not hass.data.get(_KEEP_PANEL):
        frontend.async_remove_panel(hass, PANEL_URL, warn_if_unknown=False)
        _sync_float_button(hass, None)
    hass.data.pop(DOMAIN, None)
    return True


async def async_remove_entry(hass: HomeAssistant, entry: LLMAgentConfigEntry) -> None:
    """Removing the integration deletes stored ChatGPT sign-ins."""
    await get_auth(hass).clear()
