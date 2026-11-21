"""Provider-neutral types and the streaming interface shared by all adapters.

Messages use one small neutral shape so the agent loop never deals with
provider-specific formats:

    {"role": "user", "content": str}
    {"role": "assistant", "content": str, "tool_calls": [ToolCall-as-dict, ...]}
    {"role": "tool", "tool_call_id": str, "name": str, "content": str}
"""

from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator, Awaitable, Callable
from contextlib import asynccontextmanager
from dataclasses import dataclass, field
import json
import logging
import re
from typing import Any

import aiohttp

_LOGGER = logging.getLogger(__name__)


class ProviderError(Exception):
    """Raised when a provider returns an error or an unusable stream.

    `status` is the HTTP status when the provider rejected the request, so a caller can
    tell "this request shape was refused" (400) from a failure worth reporting as is.
    """

    def __init__(self, message: str, status: int | None = None) -> None:
        super().__init__(message)
        self.status = status


MAX_ERROR_BODY = 64 * 1024
_URL_SECRET = re.compile(
    r"([?&](?:key|token|api_key|apikey|access_token|auth|sig)=)[^&\s\"']+", re.I
)


def scrub(text: str, secrets: list[str] | tuple[str, ...] = ()) -> str:
    """The text with known secrets and credential-looking URL parameters masked, for
    anything shown to a person, written to the log or given to the model."""
    for secret in secrets:
        if secret and len(secret) >= 8:
            text = text.replace(secret, "***")
    return _URL_SECRET.sub(r"\1***", text)


@dataclass(slots=True)
class TextDelta:
    text: str


@dataclass(slots=True)
class ToolCall:
    id: str
    name: str
    args: dict[str, Any]

    def as_dict(self) -> dict[str, Any]:
        return {"id": self.id, "name": self.name, "args": self.args}


@dataclass(slots=True)
class Usage:
    input_tokens: int = 0
    output_tokens: int = 0
    cache_read_tokens: int = 0
    cache_write_tokens: int = 0
    # The part of output_tokens the model spent thinking, where the provider reports it
    # (OpenAI-compatible, Gemini, ChatGPT; Anthropic does not split it out). Already
    # counted in output_tokens. It is what tells "the reply budget went on thinking"
    # apart from "the answer was long" when a reply stops at the length limit.
    reasoning_tokens: int = 0


@dataclass(slots=True)
class Done:
    stop_reason: str | None = None
    # Provider-native assistant content to replay verbatim on the next request.
    raw: dict[str, Any] | None = None


StreamEvent = TextDelta | ToolCall | Usage | Done


@dataclass(slots=True)
class GeneratedImage:
    data: bytes
    mime_type: str
    model: str
    text: str = ""  # any words the model returned alongside the picture
    revised_prompt: str | None = None  # the prompt the provider rewrote and used, if any


@dataclass(slots=True)
class ToolSpec:
    name: str
    description: str
    parameters: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class ProviderConfig:
    id: str
    type: str
    name: str
    api_key: str | None
    base_url: str
    default_model: str
    timeout: float = 300.0  # seconds without data before giving up
    retries: int = 3
    context_window: int | None = None  # tokens, when the user set it for the provider
    # For sign-in providers: returns (access token, account id), refreshing as needed.
    auth: Callable[[], Awaitable[tuple[str, str]]] | None = field(default=None, repr=False)


def image_model_for(config: ProviderConfig) -> str | None:
    """The model that makes pictures for this provider, or None when it can't.

    A default model that is itself an image model is used as is (HA core's Gemini AI Task
    does the same with "-image" in the model name). Otherwise each provider gets the image
    model HA core recommends for it: OpenAI from openai_conversation/const.py, and the
    Gemini image model, which OpenRouter also serves, from
    google_generative_ai_conversation/const.py.

    None for the rest: Anthropic has no image generation API, Ollama's OpenAI-compatible
    endpoint has no images route, and the ChatGPT sign-in backend is undocumented, with no
    image request seen working on it."""
    model = config.default_model
    if config.type == "openai":
        return model if model.startswith(("gpt-image", "dall-e")) else OPENAI_IMAGE_MODEL
    if config.type == "openrouter":
        return model if "image" in model else OPENROUTER_IMAGE_MODEL
    if config.type == "gemini":
        return model if "-image" in model else GEMINI_IMAGE_MODEL
    return None


OPENAI_IMAGE_MODEL = "gpt-image-2.5-flare"
GEMINI_IMAGE_MODEL = "gemini-2.5-flash-image"
OPENROUTER_IMAGE_MODEL = "google/gemini-2.5-flash-image"


class Provider:
    """Base adapter. Subclasses implement `stream`."""

    def __init__(self, session: aiohttp.ClientSession, config: ProviderConfig) -> None:
        self._session = session
        self.config = config

    async def stream(
        self,
        *,
        model: str,
        system: str,
        messages: list[dict[str, Any]],
        tools: list[ToolSpec],
        max_tokens: int = 4096,
        output_schema: dict[str, Any] | None = None,
    ) -> AsyncIterator[StreamEvent]:
        """Stream one reply.

        `output_schema` is a JSON Schema for the reply text. Adapters send it in the
        provider's native structured output field; the caller still parses and checks the
        text, because not every model behind a compatible endpoint honours that field.
        """
        raise NotImplementedError
        yield  # pragma: no cover

    async def generate_image(self, *, prompt: str, images: list[dict[str, str]]) -> GeneratedImage:
        """Only adapters listed in `providers.image_model` implement this."""
        raise NotImplementedError


async def iter_sse(
    resp: aiohttp.ClientResponse,
) -> AsyncIterator[tuple[str | None, str]]:
    """Yield (event, data) pairs from a server-sent-events response.

    Reads line by line so memory stays flat no matter how long the reply is.
    """
    event: str | None = None
    data_lines: list[str] = []
    async for raw in resp.content:
        line = raw.decode("utf-8", "replace").rstrip("\r\n")
        if not line:
            if data_lines:
                yield event, "\n".join(data_lines)
            event, data_lines = None, []
            continue
        if line.startswith(":"):
            continue
        name, _, value = line.partition(":")
        value = value.removeprefix(" ")
        if name == "event":
            event = value
        elif name == "data":
            data_lines.append(value)
    if data_lines:
        yield event, "\n".join(data_lines)


# Statuses worth retrying: timeouts, conflicts, rate limits, server errors and overloads.
RETRY_STATUSES = frozenset({408, 409, 429, 500, 502, 503, 504, 529})
RETRY_DELAYS = (1.0, 3.0, 8.0, 15.0, 30.0, 30.0)
MAX_RETRY_AFTER = 30.0

_HINTS = {
    401: "the API key was rejected. Check it under Configure → Edit provider.",
    402: "the account is out of credit.",
    403: "the API key is not allowed to use this model or endpoint.",
    404: "the model or endpoint was not found. Check the model id and base URL.",
    413: "the request is too large for this model.",
    429: "rate limited. Try again shortly.",
    529: "the provider is overloaded. Try again shortly.",
}


def _retry_after(resp: aiohttp.ClientResponse, default: float) -> float:
    try:
        value = float(resp.headers.get("retry-after", ""))
    except ValueError:
        return default
    return max(0.0, min(value, MAX_RETRY_AFTER))


@asynccontextmanager
async def open_stream(
    session: aiohttp.ClientSession,
    url: str,
    body: dict[str, Any],
    headers: dict[str, str],
    provider: str,
    read_timeout: float = 300.0,
    retries: int = 3,
) -> AsyncIterator[aiohttp.ClientResponse]:
    """POST a streaming request, retrying transient failures before any output arrives.

    Once a response with a success status is handed to the caller there are no more
    retries, so streamed text is never duplicated.
    """
    delays = RETRY_DELAYS[: max(0, retries)]
    attempt = 0
    while True:
        try:
            resp = await session.post(
                url,
                json=body,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=None, sock_connect=30, sock_read=read_timeout),
                # a redirect would carry the key and the request to another address
                allow_redirects=False,
            )
        except (aiohttp.ClientConnectionError, TimeoutError) as err:
            if attempt >= len(delays):
                raise ProviderError(f"{provider} connection error: {err}") from err
            delay = delays[attempt]
            _LOGGER.debug("%s connection error (%s), retrying in %.0fs", provider, err, delay)
        else:
            if resp.status in RETRY_STATUSES and attempt < len(delays):
                delay = _retry_after(resp, delays[attempt])
                _LOGGER.debug("%s HTTP %s, retrying in %.0fs", provider, resp.status, delay)
                resp.release()
            else:
                try:
                    await raise_for_status(resp, provider)
                    yield resp
                finally:
                    resp.release()
                return
        attempt += 1
        await asyncio.sleep(delay)


async def raise_for_status(resp: aiohttp.ClientResponse, provider: str) -> None:
    if 300 <= resp.status < 400:
        raise ProviderError(
            f"{provider}: the address redirected (HTTP {resp.status}). Set the provider's "
            "exact API address in the integration settings."
        )
    if resp.status < 400:
        return
    try:
        raw = await resp.content.read(MAX_ERROR_BODY)  # only the start of an error page
        body = raw.decode(resp.charset or "utf-8", "replace")
    except aiohttp.ClientError, TimeoutError:
        body = ""
    detail = body[:500]
    try:
        parsed = json.loads(body)
        err = parsed.get("error", parsed)
        if isinstance(err, dict):
            detail = str(err.get("message") or err)[:500]
    except ValueError, AttributeError:
        pass
    hint = _HINTS.get(resp.status) or (
        "the provider had a server error. Try again shortly." if resp.status >= 500 else ""
    )
    prefix = f"{provider}: {hint} " if hint else f"{provider}: "
    raise ProviderError(f"{prefix}(HTTP {resp.status}: {detail})", resp.status)


async def post_json(
    session: aiohttp.ClientSession,
    url: str,
    body: dict[str, Any],
    headers: dict[str, str],
    provider: str,
    read_timeout: float = 300.0,
    retries: int = 3,
) -> dict[str, Any]:
    """A non-streaming request with the same retries and error messages as `open_stream`.

    Image endpoints answer with one JSON document rather than a stream."""
    try:
        async with open_stream(
            session, url, body, headers, provider, read_timeout, retries
        ) as resp:
            text = await resp.text()
    except aiohttp.ClientError as err:
        raise ProviderError(f"{provider} connection error: {err}") from err
    try:
        payload = json.loads(text)
    except ValueError as err:
        raise ProviderError(f"{provider}: the reply was not JSON.") from err
    if not isinstance(payload, dict):
        raise ProviderError(f"{provider}: the reply was not in the expected form.")
    return payload


def parse_args(raw: str) -> dict[str, Any]:
    if not raw.strip():
        return {}
    try:
        value = json.loads(raw)
    except ValueError:
        return {"_invalid_json": raw[:2000]}
    return value if isinstance(value, dict) else {"value": value}
