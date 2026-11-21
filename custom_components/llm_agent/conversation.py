"""Assist (voice and text) agents: one per configured provider.

Assist runs with Home Assistant's built-in Assist LLM API, so voice can control exposed
devices and answer questions, but cannot edit configuration. Full admin tools are only
available in the LLM Agent panel.
"""

from __future__ import annotations

from collections.abc import AsyncIterator
import json
import logging
from typing import Any, Literal

from homeassistant.components import conversation
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import MATCH_ALL
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import llm
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.device_registry import DeviceEntryType
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
import probatio

from .const import CONF_MAX_REPLY_TOKENS, DOMAIN, NAME, RANGES, setting
from .providers import ProviderConfig, ProviderError, make_provider
from .providers.base import Done, TextDelta, ToolCall, ToolSpec, Usage

_LOGGER = logging.getLogger(__name__)

MAX_ITERATIONS = 10
# Spoken when a reasoning model spends its whole reply length thinking twice. Raised as an
# error so Assist says it, instead of answering with silence.
THINKING_LIMIT = (
    "The model used its whole reply length on thinking and gave no answer. Raise Maximum "
    "reply length in the LLM Agent settings, under Cost and limits."
)
VOICE_PROMPT = (
    "You are a voice assistant for Home Assistant. Answer briefly in plain sentences "
    "without markdown; replies may be spoken aloud."
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    agent = entry.runtime_data
    async_add_entities(LLMAgentConversationEntity(entry, p) for p in agent.providers())


class LLMAgentConversationEntity(
    conversation.ConversationEntity, conversation.AbstractConversationAgent
):
    _attr_supports_streaming = True
    _attr_has_entity_name = True
    _attr_supported_features = conversation.ConversationEntityFeature.CONTROL

    def __init__(self, entry: ConfigEntry, provider: ProviderConfig) -> None:
        self.entry = entry
        self.provider_config = provider
        self._attr_unique_id = f"{entry.entry_id}_{provider.id}"
        self._attr_name = f"{provider.name} ({provider.default_model})"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": NAME,
            "manufacturer": "ITninja04",
            "entry_type": DeviceEntryType.SERVICE,
        }

    @property
    def supported_languages(self) -> list[str] | Literal["*"]:
        return MATCH_ALL

    async def _async_handle_message(
        self,
        user_input: conversation.ConversationInput,
        chat_log: conversation.ChatLog,
    ) -> conversation.ConversationResult:
        try:
            await chat_log.async_provide_llm_data(
                user_input.as_llm_context(DOMAIN),
                llm.LLM_API_ASSIST,
                VOICE_PROMPT,
                user_input.extra_system_prompt,
            )
        except conversation.ConverseError as err:
            return err.as_conversation_result()

        provider = make_provider(async_get_clientsession(self.hass), self.provider_config)
        api = chat_log.llm_api
        specs = [_tool_spec(t, api.custom_serializer) for t in api.tools] if api else []
        # The same budget and the same one retry as a panel chat. A fixed 2048 used to be
        # sent here, and on reasoning models (deepseek-flash via OpenRouter, measured
        # 2026-11-20 in the panel at 16,000) thinking counts against it, so a voice reply
        # could stop with nothing to say and no sign why. The voice prompt is what keeps
        # spoken answers short. The limit only stops runaway thinking.
        budget = setting(self.entry.runtime_data.options, CONF_MAX_REPLY_TOKENS)
        ceiling = int(RANGES[CONF_MAX_REPLY_TOKENS][1])
        raised = False
        model = self.provider_config.default_model
        for _ in range(MAX_ITERATIONS):
            system, messages = _chat_log_to_messages(chat_log)
            stream = provider.stream(
                model=model,
                system=system,
                messages=messages,
                tools=specs,
                max_tokens=budget,
            )
            seen = _Seen()
            try:
                async for _content in chat_log.async_add_delta_content_stream(
                    self.entity_id, _to_deltas(stream, self.provider_config.type, seen)
                ):
                    pass
            except ProviderError as err:
                raise HomeAssistantError(str(err)) from err
            if seen.stop in ("max_tokens", "length") and not seen.calls:
                _LOGGER.warning(
                    "Voice reply from %s/%s stopped at the length limit of %d tokens: "
                    "out=%d, of which thinking=%d, visible characters=%d",
                    self.provider_config.type,
                    model,
                    budget,
                    seen.usage.output_tokens,
                    seen.usage.reasoning_tokens,
                    seen.chars,
                )
                if not seen.text.strip():
                    if raised or budget >= ceiling:
                        raise HomeAssistantError(THINKING_LIMIT)
                    # Drop the empty reply so the retry starts from the same history.
                    last = chat_log.content[-1] if chat_log.content else None
                    if isinstance(last, conversation.AssistantContent) and not last.content:
                        chat_log.content.pop()
                    raised, budget = True, min(budget * 2, ceiling)
                    continue
            if not chat_log.unresponded_tool_results:
                break
        return conversation.async_get_result_from_chat_log(user_input, chat_log)


def _tool_spec(tool: llm.Tool, serializer: Any) -> ToolSpec:
    schema = probatio.to_openapi(
        tool.parameters, custom_serializer=serializer, openapi_version="3.1.0"
    )
    schema = {k: v for k, v in schema.items() if k not in {"oneOf", "anyOf", "allOf", "not"}}
    schema.setdefault("type", "object")
    schema.setdefault("properties", {})
    return ToolSpec(tool.name, tool.description or tool.name, schema)


class _Seen:
    """What one streamed reply held, for deciding whether it stopped at the length
    limit with nothing to say."""

    def __init__(self) -> None:
        self.text = ""
        self.calls = 0
        self.stop: str | None = None
        self.usage = Usage()

    @property
    def chars(self) -> int:
        return len(self.text)


async def _to_deltas(
    stream: AsyncIterator[Any], provider_type: str, seen: _Seen | None = None
) -> AsyncIterator[dict[str, Any]]:
    seen = seen or _Seen()
    yield {"role": "assistant"}
    calls: list[llm.ToolInput] = []
    async for event in stream:
        if isinstance(event, TextDelta):
            seen.text += event.text
            yield {"content": event.text}
        elif isinstance(event, ToolCall):
            calls.append(llm.ToolInput(tool_name=event.name, tool_args=event.args, id=event.id))
        elif isinstance(event, Usage):
            seen.usage = event
        elif isinstance(event, Done):
            seen.stop = event.stop_reason
            if event.raw:
                yield {"native": event.raw}
    seen.calls = len(calls)
    if calls:
        yield {"tool_calls": calls}


def _chat_log_to_messages(
    chat_log: conversation.ChatLog,
) -> tuple[str, list[dict[str, Any]]]:
    system = ""
    messages: list[dict[str, Any]] = []
    for content in chat_log.content:
        if isinstance(content, conversation.SystemContent):
            system = content.content
        elif isinstance(content, conversation.UserContent):
            messages.append({"role": "user", "content": content.content})
        elif isinstance(content, conversation.AssistantContent):
            msg: dict[str, Any] = {
                "role": "assistant",
                "content": content.content or "",
                "tool_calls": [
                    {"id": c.id, "name": c.tool_name, "args": c.tool_args}
                    for c in content.tool_calls or []
                ],
            }
            if (
                isinstance(content.native, dict)
                and {"anthropic", "gemini", "chatgpt"} & content.native.keys()
            ):
                msg["raw"] = content.native
            messages.append(msg)
        elif isinstance(content, conversation.ToolResultContent):
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": content.tool_call_id,
                    "name": content.tool_name,
                    "content": json.dumps(content.result.data, default=str)[:16000],
                    "is_error": content.result.error,
                }
            )
    return system, messages
