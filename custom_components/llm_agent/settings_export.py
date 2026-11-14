"""Move LLM Agent's settings to a fresh install.

Switching where the integration is downloaded from (say, from the upstream repository
to a fork) means deleting the integration, and deleting it throws away the config
entry: every provider, API key, approval rule and setting. Chats and home notes live
in their own storage files and survive on their own, so the config entry is the only
thing that needs carrying across.

The export is the config entry's options as JSON, API keys included, because a restore
that asks for every key again would defeat the point. Whoever holds the file holds
those keys. A ChatGPT sign-in is not in the options (it lives in its own store, which
removing the integration deletes), so a restored ChatGPT provider signs in again.

A restore keeps only keys this version knows, so a file from a newer version can't
plant settings that nothing reads, and it checks the providers, because the integration
refuses to start without a usable one.
"""

from __future__ import annotations

import json
from typing import Any

from homeassistant.util import dt as dt_util

from .const import APPROVAL_MODES, CONF_APPROVAL_MODE, CONF_PROVIDERS, DEFAULT_OPTIONS
from .providers.models import PROVIDER_NAMES

FORMAT = "llm_agent_settings"
VERSION = 1
KNOWN_KEYS = frozenset(DEFAULT_OPTIONS) | {CONF_PROVIDERS}
MAX_TEXT = 1_000_000  # far above any real export; stops a pasted log from being parsed


class BadExport(ValueError):
    """The text is not a usable LLM Agent export. The message says why, for the form."""


def export_text(options: dict[str, Any], version: str | None = None) -> str:
    """The options as an export file's text."""
    return json.dumps(
        {
            "format": FORMAT,
            "version": VERSION,
            "integration_version": version,
            "exported_at": dt_util.utcnow().isoformat(timespec="seconds"),
            "options": {k: v for k, v in options.items() if k in KNOWN_KEYS},
        },
        indent=2,
        ensure_ascii=False,
        default=str,
    )


def import_text(text: str) -> dict[str, Any]:
    """The options to create the entry with, from an export's text. Raises BadExport."""
    if len(text) > MAX_TEXT:
        raise BadExport("the text is far too long to be an export")
    try:
        data = json.loads(text)
    except ValueError:
        raise BadExport("the text is not JSON; paste the whole export") from None
    if not isinstance(data, dict) or data.get("format") != FORMAT:
        raise BadExport("this is not an LLM Agent settings export")
    if not isinstance(data.get("version"), int) or data["version"] > VERSION:
        raise BadExport("the export is from a newer LLM Agent; update this one first")
    raw = data.get("options")
    if not isinstance(raw, dict):
        raise BadExport("the export has no settings in it")
    options = {**DEFAULT_OPTIONS, **{k: v for k, v in raw.items() if k in KNOWN_KEYS}}
    providers = options.get(CONF_PROVIDERS)
    if not isinstance(providers, list) or not providers:
        raise BadExport("the export has no AI provider")
    for provider in providers:
        if not (
            isinstance(provider, dict)
            and isinstance(provider.get("id"), str)
            and provider.get("type") in PROVIDER_NAMES
            and isinstance(provider.get("base_url"), str)
        ):
            raise BadExport("a provider in the export is incomplete or of an unknown type")
    if options.get(CONF_APPROVAL_MODE) not in APPROVAL_MODES:
        # a mode this version doesn't have: start from the default instead
        options[CONF_APPROVAL_MODE] = DEFAULT_OPTIONS[CONF_APPROVAL_MODE]
    return options
