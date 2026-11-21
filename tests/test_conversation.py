"""The Assist conversation agent: device control through HA's own Assist tools."""

from __future__ import annotations

from unittest.mock import patch

from homeassistant.components import conversation
from homeassistant.components.homeassistant.exposed_entities import async_expose_entity
from homeassistant.core import Context, HomeAssistant
from homeassistant.helpers import intent
from homeassistant.setup import async_setup_component
import pytest

from custom_components.llm_agent.providers import ProviderError
from custom_components.llm_agent.providers.base import Done, TextDelta, Usage

from .test_agent import ScriptedProvider, reply_text, reply_tool
from .test_init import _setup

PATCH = "custom_components.llm_agent.conversation.make_provider"


@pytest.fixture
async def agent_id(hass: HomeAssistant) -> str:
    assert await async_setup_component(hass, "intent", {})  # provides the Assist tools
    assert await async_setup_component(
        hass, "input_boolean", {"input_boolean": {"lamp": {"name": "Lamp"}}}
    )
    await _setup(hass)
    async_expose_entity(hass, conversation.DOMAIN, "input_boolean.lamp", True)
    return hass.states.async_entity_ids("conversation")[-1]


async def test_assist_turns_on_an_exposed_device(hass: HomeAssistant, agent_id: str) -> None:
    provider = ScriptedProvider(
        [
            reply_tool("c1", "intent__HassTurnOn", {"name": "Lamp"}),
            reply_text("The lamp is on."),
        ]
    )
    with patch(PATCH, return_value=provider):
        result = await conversation.async_converse(
            hass, "turn on the lamp", None, Context(), agent_id=agent_id
        )
    assert result.response.speech["plain"]["speech"] == "The lamp is on."
    assert hass.states.get("input_boolean.lamp").state == "on"
    # Assist tools are offered, and the tool result goes back to the model.
    tool_names = {t.name for t in provider.calls[0]["tools"]}
    assert "intent__HassTurnOn" in tool_names and "write_file" not in tool_names
    second = provider.calls[1]["messages"]
    assert any(m["role"] == "tool" and m["tool_call_id"] == "c1" for m in second)


async def test_assist_reports_provider_errors(hass: HomeAssistant, agent_id: str) -> None:
    class Failing:
        async def stream(self, **_kw):
            raise ProviderError("Anthropic: the API key was rejected.")
            yield  # pragma: no cover

    with patch(PATCH, return_value=Failing()):
        result = await conversation.async_converse(
            hass, "hello", None, Context(), agent_id=agent_id
        )
    # HA speaks the error back to the user instead of failing silently.
    assert result.response.response_type == intent.IntentResponseType.ERROR
    assert "API key was rejected" in result.response.speech["plain"]["speech"]


async def test_assist_uses_the_reply_length_setting_and_retries_a_reply_spent_thinking(
    hass: HomeAssistant, agent_id: str
) -> None:
    # A fixed 2048 used to be sent, and a reasoning model could spend all of it thinking
    # and answer nothing at all, with no retry and no message.
    thought = [Usage(100, 16000, reasoning_tokens=16000), Done("length")]
    provider = ScriptedProvider([thought, reply_text("The lamp is off.")])
    with patch(PATCH, return_value=provider):
        result = await conversation.async_converse(
            hass, "is the lamp on", None, Context(), agent_id=agent_id
        )
    assert [c["max_tokens"] for c in provider.calls] == [16000, 32000]
    assert result.response.speech["plain"]["speech"] == "The lamp is off."
    # the retry is sent the same history, not an empty assistant turn
    assert provider.calls[1]["messages"] == provider.calls[0]["messages"]


async def test_assist_says_why_when_the_retry_is_spent_thinking_too(
    hass: HomeAssistant, agent_id: str
) -> None:
    thought = [Usage(100, 16000, reasoning_tokens=16000), Done("length")]
    provider = ScriptedProvider([list(thought), list(thought)])
    with patch(PATCH, return_value=provider):
        result = await conversation.async_converse(
            hass, "is the lamp on", None, Context(), agent_id=agent_id
        )
    assert len(provider.calls) == 2  # one retry, never a loop
    assert result.response.response_type == intent.IntentResponseType.ERROR
    assert "Maximum reply length" in result.response.speech["plain"]["speech"]


async def test_assist_keeps_a_reply_with_text_that_hit_the_limit(
    hass: HomeAssistant, agent_id: str
) -> None:
    cut = [TextDelta("The lamp is"), Usage(100, 16000), Done("length")]
    provider = ScriptedProvider([cut])
    with patch(PATCH, return_value=provider):
        result = await conversation.async_converse(
            hass, "is the lamp on", None, Context(), agent_id=agent_id
        )
    assert len(provider.calls) == 1
    assert result.response.speech["plain"]["speech"] == "The lamp is"
