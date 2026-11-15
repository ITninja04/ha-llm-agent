"""Built-in Home Assistant reference pages, for models that don't know HA's YAML shapes.

The pages live in ../reference/*.md. Each starts with '# Title' and a '> summary' line;
the summaries form a short index in the system prompt (cached with it), and the model
loads a page on demand with read_reference.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from . import Tool, ToolContext, ToolError, ToolOutput, obj

REFERENCE_DIR = Path(__file__).parent.parent / "reference"
# Index order: the page to read first comes first.
ORDER = (
    "automations",
    "triggers",
    "conditions",
    "actions",
    "targets",
    "templates",
    "scripts-scenes",
    "dashboards",
    "helpers",
    "blueprints",
    "packages",
    "scheduled-prompts",
)

_pages: dict[str, str] | None = None

# The pages a call must have read first, enforced in agent.py before the call runs. A
# prompt rule alone was not enough: models skipped the page and called integration actions
# from memory, with renamed or invented fields. Keyed by integration domain, which is both
# the domain of its own actions and the registry platform of its entities, so a plain
# light.turn_on on a WLED light needs the WLED page too.
#
# Not here, on purpose:
# - zigbee2mqtt: its entities and actions are plain MQTT, shared with every other MQTT
#   device, so there is nothing that marks a call as Zigbee2MQTT.
# - thread: Thread and OTBR have no actions and no entities.
# - templates: a template can appear in any field of any call; the prompt asks for the page.
INTEGRATION_PAGES = {
    "alexa_media": "alexa-media-player",
    "esphome": "esphome",
    "frigate": "frigate",
    "matter": "matter",
    "music_assistant": "music-assistant",
    "wled": "wled",
    "zha": "zha",
    "zwave_js": "zwave-js",
}
# Single actions of a shared domain that a page covers.
SERVICE_PAGES = {
    "camera.record": "camera-snapshots",
    "camera.snapshot": "camera-snapshots",
    "image.snapshot": "camera-snapshots",
}
# Alexa Media Player speaks through notify.alexa_media and notify.alexa_media_<echo>.
NOTIFY_PAGES = {"alexa_media": "alexa-media-player"}
# Config written through the config item tools, by kind.
KIND_PAGES = {"automation": "automations", "script": "scripts-scenes", "scene": "scripts-scenes"}
# Helpers are created and edited with ha_websocket <domain>/create and <domain>/update.
HELPER_DOMAINS = frozenset(
    {
        "counter",
        "input_boolean",
        "input_button",
        "input_datetime",
        "input_number",
        "input_select",
        "input_text",
        "schedule",
        "timer",
    }
)


def pages_for_service(
    hass: HomeAssistant, domain: str, service: str, entity_ids: list[str]
) -> set[str]:
    """The pages an action needs: by its own domain or name, and by the integration
    behind each entity it targets."""
    pages: set[str] = set()
    if page := INTEGRATION_PAGES.get(domain):
        pages.add(page)
    if page := SERVICE_PAGES.get(f"{domain}.{service}"):
        pages.add(page)
    if domain == "notify":
        pages.update(page for prefix, page in NOTIFY_PAGES.items() if service.startswith(prefix))
    registry = er.async_get(hass)
    for entity_id in entity_ids:
        entry = registry.async_get(entity_id)
        if entry is not None and (page := INTEGRATION_PAGES.get(entry.platform)):
            pages.add(page)
    return pages


def pages_in_config(hass: HomeAssistant, config: Any) -> set[str]:
    """The integration pages a piece of config needs: from each action it calls, each
    entity it names, and each device trigger, condition or action's integration."""
    pages: set[str] = set()
    entity_ids: list[str] = []

    def walk(node: Any) -> None:
        if isinstance(node, list):
            for item in node:
                walk(item)
            return
        if not isinstance(node, dict):
            return
        for key in ("action", "service"):
            value = node.get(key)
            if isinstance(value, str) and value.count(".") == 1:
                domain, service = value.strip().lower().split(".")
                pages.update(pages_for_service(hass, domain, service, []))
        ids = node.get("entity_id")
        if isinstance(ids, str):
            entity_ids.extend(i.strip().lower() for i in ids.split(","))
        elif isinstance(ids, list):
            entity_ids.extend(str(i).strip().lower() for i in ids)
        if "device_id" in node and (page := INTEGRATION_PAGES.get(str(node.get("domain", "")))):
            pages.add(page)
        for value in node.values():
            walk(value)

    walk(config)
    return pages | pages_for_service(hass, "", "", entity_ids)


def missing_text(missing: list[str]) -> str:
    """What the model is told when it skipped a page. It names the pages and the way back,
    so the next call is a corrected one, not the same arguments resent."""
    names = ", ".join(missing)
    return (
        f"Not run: read the reference page{'s' if len(missing) > 1 else ''} {names} first, "
        "with read_reference. This call uses an integration or kind of config that the page "
        "covers. Then check list_services for the actions and fields, rebuild the call from "
        "what you read, and make it again. Do not resend the same arguments unchanged."
    )


def _page_names() -> list[str]:
    """Every page on disk, ORDER first. The tool's enum must list pages that are not in ORDER
    too, or the model could not ask for them (a schema enum is checked before run())."""
    found = {p.stem for p in REFERENCE_DIR.glob("*.md")}
    return [name for name in (*ORDER, *sorted(found)) if name in found]


def _read_pages() -> dict[str, str]:
    return {
        name: (REFERENCE_DIR / f"{name}.md").read_text(encoding="utf-8") for name in _page_names()
    }


async def async_pages(hass: HomeAssistant) -> dict[str, str]:
    """Read the pages once (in the executor) and keep them; they are about 15 KB."""
    global _pages
    if _pages is None:
        _pages = await hass.async_add_executor_job(_read_pages)
    return _pages


def summary(text: str) -> str:
    for line in text.splitlines():
        if line.startswith("> "):
            return line[2:].strip()
    return ""


async def async_index(hass: HomeAssistant) -> str:
    pages = await async_pages(hass)
    lines = [f"- {name}: {summary(text)}" for name, text in pages.items()]
    return (
        "Reference pages (read with read_reference before acting on an integration listed "
        "here and before writing automations, scripts, scenes, dashboards, templates or "
        "helpers; they show the exact actions, fields and YAML shape):\n" + "\n".join(lines)
    )


class ReadReference(Tool):
    def __init__(self) -> None:
        super().__init__(
            "read_reference",
            "Read a built-in Home Assistant reference page (see the list in your "
            "instructions), with examples of the exact config shape.",
            obj({"page": {"type": "string", "enum": _page_names()}}, ["page"]),
        )

    async def run(self, ctx: ToolContext, args: dict[str, Any]) -> ToolOutput:
        pages = await async_pages(ctx.hass)
        name = page_name(args)
        if name not in pages:
            raise ToolError(f"No reference page {name!r}. Pages: {', '.join(pages)}")
        return ToolOutput(pages[name], summary=f"Read the {name} reference")


def page_name(args: dict[str, Any]) -> str:
    """The page a read_reference call names, as the tool reads it."""
    return str(args.get("page", "")).strip().lower().removesuffix(".md")


TOOLS: list[Tool] = [ReadReference()]
