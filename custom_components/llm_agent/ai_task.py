"""AI Task entities, so automations can call ai_task.generate_data and generate_image.

One entity per configured provider, like the Assist entities in conversation.py. HA core's
AI integrations make one per "ai_task_data" config subentry, but this integration has a
single config entry that keeps its providers in options, so the provider is the thing an
automation picks.

An AI Task is pure generation: the model is offered no Home Assistant tools and nothing
asks for approval. A caller that passes an llm_api (possible from Python, not from the
action) still gets no tools.

The shape follows HA core 2026.10: homeassistant/components/anthropic/ai_task.py and
openai_conversation/ai_task.py for the entity, google_generative_ai_conversation/ai_task.py
for adding the image reply to the chat log.
"""

from __future__ import annotations

import base64
import json
import logging
from pathlib import Path
import re
from typing import Any

from homeassistant.components import ai_task, conversation
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import llm
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.device_registry import DeviceEntryType
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
import probatio

from .const import DOMAIN, NAME
from .providers import ProviderConfig, ProviderError, make_provider
from .providers.base import Done, Provider, TextDelta, Usage, image_model_for

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES = 0
MAX_TOKENS = 4096
# Provider limits on one inline picture are around 20 MB (Anthropic is lower); a bigger
# file is refused here with a clear message instead of an HTTP 413 from the provider.
MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024

JSON_PROMPT = (
    "Reply with only a JSON object that matches this JSON Schema. No markdown, no code "
    "fence, no words before or after it."
)
REPAIR_PROMPT = (
    "That reply could not be used: {problem}. Reply again with only the corrected JSON object."
)
_FENCE = re.compile(r"^```(?:json)?\s*(.*?)\s*```$", re.S | re.I)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    agent = entry.runtime_data
    async_add_entities(LLMAgentTaskEntity(entry, p) for p in agent.providers())


class LLMAgentTaskEntity(ai_task.AITaskEntity):
    _attr_has_entity_name = True

    def __init__(self, entry: ConfigEntry, provider: ProviderConfig) -> None:
        self.provider_config = provider
        # The same id as the provider's Assist entity is fine: unique ids are per domain.
        self._attr_unique_id = f"{entry.entry_id}_{provider.id}"
        self._attr_name = f"{provider.name} ({provider.default_model})"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": NAME,
            "manufacturer": "ITninja04",
            "entry_type": DeviceEntryType.SERVICE,
        }
        # Every adapter sends pictures with a prompt, so attachments are always on. Image
        # generation is advertised only where an adapter implements it, so the action's
        # entity picker never offers a provider that would fail.
        features = (
            ai_task.AITaskEntityFeature.GENERATE_DATA
            | ai_task.AITaskEntityFeature.SUPPORT_ATTACHMENTS
        )
        if image_model_for(provider):
            features |= ai_task.AITaskEntityFeature.GENERATE_IMAGE
        self._attr_supported_features = features

    def _provider(self) -> Provider:
        return make_provider(async_get_clientsession(self.hass), self.provider_config)

    async def _async_generate_data(
        self,
        task: ai_task.GenDataTask,
        chat_log: conversation.ChatLog,
    ) -> ai_task.GenDataTaskResult:
        system, user = await self._prompt(chat_log)
        provider = self._provider()
        data: Any
        try:
            if task.structure is None:
                text = await self._complete(provider, system, [user], None)
                data = text
            else:
                data, text = await self._structured(provider, system, user, task.structure)
        except ProviderError as err:
            raise HomeAssistantError(str(err)) from err
        chat_log.async_add_assistant_content_without_tools(
            conversation.AssistantContent(agent_id=self.entity_id, content=text)
        )
        return ai_task.GenDataTaskResult(conversation_id=chat_log.conversation_id, data=data)

    async def _async_generate_image(
        self,
        task: ai_task.GenImageTask,
        chat_log: conversation.ChatLog,
    ) -> ai_task.GenImageTaskResult:
        _system, user = await self._prompt(chat_log)
        try:
            image = await self._provider().generate_image(
                prompt=user["content"], images=user["images"]
            )
        except ProviderError as err:
            raise HomeAssistantError(str(err)) from err
        # The image adapters report no token counts, so this counts the call without a
        # price rather than guessing one.
        await self._count(image.model, None)
        chat_log.async_add_assistant_content_without_tools(
            conversation.AssistantContent(agent_id=self.entity_id, content=image.text)
        )
        return ai_task.GenImageTaskResult(
            image_data=image.data,
            conversation_id=chat_log.conversation_id,
            mime_type=image.mime_type,
            model=image.model,
            revised_prompt=image.revised_prompt,
        )

    async def _count(self, model: str, usage: Usage | None) -> None:
        """Add this call to the Usage view's record. Not to the daily cap: see
        Agent.count_task."""
        agent = self.hass.data.get(DOMAIN)
        if agent is not None:
            await agent.count_task(self.provider_config, model, usage)

    async def _prompt(self, chat_log: conversation.ChatLog) -> tuple[str, dict[str, Any]]:
        """The system prompt HA built for the task, and the task as a neutral user message."""
        system = next(
            (c.content for c in chat_log.content if isinstance(c, conversation.SystemContent)),
            "",
        )
        user = chat_log.content[-1]
        if not isinstance(user, conversation.UserContent):
            raise HomeAssistantError("The AI Task chat log did not end with the task.")
        images = await self.hass.async_add_executor_job(_read_images, user.attachments or [])
        return system, {"role": "user", "content": user.content, "images": images}

    async def _complete(
        self,
        provider: Provider,
        system: str,
        messages: list[dict[str, Any]],
        schema: dict[str, Any] | None,
    ) -> str:
        parts: list[str] = []
        stop: str | None = None
        usage = Usage()
        model = self.provider_config.default_model
        async for event in provider.stream(
            model=model,
            system=system,
            messages=messages,
            tools=[],
            max_tokens=MAX_TOKENS,
            output_schema=schema,
        ):
            if isinstance(event, TextDelta):
                parts.append(event.text)
            elif isinstance(event, Usage):
                usage = event
            elif isinstance(event, Done):
                stop = event.stop_reason
        # Counted before the checks below: a refused or cut off reply is still billed.
        await self._count(model, usage)
        text = "".join(parts)
        name = self.provider_config.name
        if stop == "refusal":
            raise ProviderError(f"{name}: the model refused the task. {text[:300]}".rstrip())
        # Anthropic, Gemini and ChatGPT say max_tokens; Chat Completions says length.
        if stop in ("max_tokens", "length"):
            raise ProviderError(
                f"{name}: the reply was cut off at {MAX_TOKENS} tokens. Ask for a shorter answer."
            )
        return text

    async def _structured(
        self,
        provider: Provider,
        system: str,
        user: dict[str, Any],
        structure: probatio.Schema,
    ) -> tuple[Any, str]:
        """Ask for JSON matching the structure, check it, and repair once if it doesn't.

        The schema goes both in the provider's native structured output field and in the
        prompt. The prompt copy is what works for a model behind a compatible endpoint
        (OpenRouter, Ollama) that ignores the native field; the check after is what
        catches a model that ignores both."""
        schema = probatio.to_openapi(
            structure, custom_serializer=llm.selector_serializer, openapi_version="3.1.0"
        )
        system = f"{system}\n\n{JSON_PROMPT}\n{json.dumps(schema)}"
        messages = [user]
        native: dict[str, Any] | None = schema
        try:
            text = await self._complete(provider, system, messages, native)
        except ProviderError as err:
            if err.status != 400:
                raise
            # Older models and some compatible servers reject the structured output field
            # outright. The prompt still carries the schema, so ask again without it.
            _LOGGER.debug("%s refused the output schema: %s", self.provider_config.name, err)
            native = None
            text = await self._complete(provider, system, messages, native)
        try:
            return parse_structured(text, structure), text
        except ValueError as err:
            problem = str(err)
        _LOGGER.debug(
            "%s reply needs repair (%s): %.500s", self.provider_config.name, problem, text
        )
        messages = [
            user,
            {"role": "assistant", "content": text, "tool_calls": []},
            {"role": "user", "content": REPAIR_PROMPT.format(problem=problem)},
        ]
        text = await self._complete(provider, system, messages, native)
        try:
            return parse_structured(text, structure), text
        except ValueError as err:
            raise HomeAssistantError(
                f"{self.provider_config.name} did not return data matching the structure, "
                f"after one retry: {err}. The reply began: {text[:200]!r}"
            ) from err


def parse_structured(text: str, structure: probatio.Schema) -> Any:
    """The reply as data checked against the structure, or ValueError saying what is wrong.

    The checked value is returned, so a number field comes back as a number even when the
    model wrote it as a string."""
    body = text.strip()
    if match := _FENCE.match(body):
        body = match.group(1)  # some models fence JSON even when told not to
    if not body:
        raise ValueError("the reply was empty")
    try:
        data = json.loads(body)
    except ValueError as err:
        raise ValueError(f"it was not valid JSON ({err})") from err
    if not isinstance(data, dict):
        raise ValueError(f"it was JSON but not an object (got {type(data).__name__})")
    try:
        return structure(data)
    except probatio.Invalid as err:
        raise ValueError(f"it did not match the structure ({err})") from err


def _read_images(attachments: list[conversation.Attachment]) -> list[dict[str, str]]:
    """Attachments as base64 pictures. Runs in the executor: it reads files."""
    images: list[dict[str, str]] = []
    for item in attachments:
        mime = item.mime_type or ""
        if not mime.startswith("image/"):
            # PDFs and other files would need a different content block per provider;
            # refuse them by name rather than send something the model can't read.
            raise HomeAssistantError(
                f"Only pictures can be attached to an LLM Agent AI Task. "
                f"{item.media_content_id} is {mime or 'an unknown type'}."
            )
        path = Path(item.path)
        if path.stat().st_size > MAX_ATTACHMENT_BYTES:
            raise HomeAssistantError(
                f"{item.media_content_id} is larger than "
                f"{MAX_ATTACHMENT_BYTES // (1024 * 1024)} MB, too big to send."
            )
        images.append(
            {"media_type": mime, "data": base64.b64encode(path.read_bytes()).decode("ascii")}
        )
    return images
