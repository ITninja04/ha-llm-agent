"""What is left to spend on each provider, for the Usage view.

Only OpenRouter lets the key the integration already holds read it. The other providers
either have no balance API or keep spend data behind an admin key, which this
integration does not ask for, so the view names their billing page instead. Checked
against each provider's documentation on 2026-11-15:

- OpenRouter: GET /api/v1/key works with the normal API key and returns that key's
  spending limit, what is left of it and its usage. GET /api/v1/credits returns the
  account balance but needs a management key, which cannot make completions, so it is
  not tried. https://openrouter.ai/docs/api/reference/limits
- Anthropic: the usage and cost reports need an Admin API key and report spend, not a
  balance. https://platform.claude.com/docs/en/api/usage-cost-api
- OpenAI: /v1/organization/usage and /v1/organization/costs need an admin key and report
  spend, not a balance.
  https://developers.openai.com/cookbook/examples/completions_usage_api
- Gemini: the balance is only shown on the AI Studio billing page; there is no API for it.
  https://aistudio.google.com/docs/billing
- ChatGPT: a subscription with no balance. Ollama: runs locally and costs nothing.

The balance is fetched when the view opens and kept for five minutes, so opening and
closing the view does not call the provider every time. Nothing polls.
"""

from __future__ import annotations

from collections.abc import Callable
import logging
import time
from typing import Any

import aiohttp

from .providers import ProviderConfig

_LOGGER = logging.getLogger(__name__)

CACHE_SECONDS = 300

BILLING_PAGES = {
    "openrouter": "https://openrouter.ai/settings/credits",
    "anthropic": "https://platform.claude.com/settings/billing",
    "openai": "https://platform.openai.com/settings/organization/billing/overview",
    "gemini": "https://aistudio.google.com/billing",
    "chatgpt": "https://chatgpt.com/#settings/Subscription",
}


class Balances:
    def __init__(
        self,
        session: Callable[[], aiohttp.ClientSession],
        clock: Callable[[], float] = time.monotonic,
    ) -> None:
        self._session = session
        self._clock = clock
        # provider id -> (fetched at, result); only answers that worked are kept, so a
        # failed fetch is tried again the next time the view opens
        self._cache: dict[str, tuple[float, dict[str, Any]]] = {}

    async def get(self, providers: list[ProviderConfig]) -> list[dict[str, Any]]:
        return [await self._one(p) for p in providers]

    async def _one(self, pconf: ProviderConfig) -> dict[str, Any]:
        base = {
            "provider_id": pconf.id,
            "name": pconf.name,
            "type": pconf.type,
            "billing_url": BILLING_PAGES.get(pconf.type),
        }
        if pconf.type == "ollama":
            return {**base, "status": "local"}
        if pconf.type != "openrouter":
            return {**base, "status": "no_api"}
        cached = self._cache.get(pconf.id)
        if cached and self._clock() - cached[0] < CACHE_SECONDS:
            return {**base, **cached[1]}
        try:
            found = await self._openrouter(pconf)
        except (aiohttp.ClientError, TimeoutError, ValueError) as err:
            _LOGGER.debug("Balance from %s failed: %s", pconf.name, err)
            return {**base, "status": "error", "error": str(err)}
        self._cache[pconf.id] = (self._clock(), found)
        return {**base, **found}

    async def _openrouter(self, pconf: ProviderConfig) -> dict[str, Any]:
        url = pconf.base_url.rstrip("/") + "/key"
        async with self._session().get(
            url,
            headers={"Authorization": f"Bearer {pconf.api_key or ''}"},
            timeout=aiohttp.ClientTimeout(total=10),
        ) as resp:
            if resp.status != 200:
                raise ValueError(f"HTTP {resp.status}")
            body = await resp.json(content_type=None)
        data = body.get("data") if isinstance(body, dict) else None
        if not isinstance(data, dict):
            raise ValueError("unexpected reply")

        def num(key: str) -> float | None:
            value = data.get(key)
            return float(value) if isinstance(value, int | float) else None

        # limit and limit_remaining are null when the key has no spending limit; then
        # only the key's own usage is known, not what is left on the account.
        return {
            "status": "ok",
            "limit": num("limit"),
            "remaining": num("limit_remaining"),
            "reset": data.get("limit_reset") if isinstance(data.get("limit_reset"), str) else None,
            "usage": num("usage"),
            "usage_monthly": num("usage_monthly"),
            "free_tier": bool(data.get("is_free_tier")),
        }
