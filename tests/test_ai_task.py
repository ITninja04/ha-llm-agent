"""AI Task entities: ai_task.generate_data and generate_image through HA's own actions.

Every test goes through the ai_task action as an automation would call it, so the
structure, attachment and feature checks are HA core's, not a copy of them.
"""

from __future__ import annotations

import base64
import json
from pathlib import Path
from typing import Any
from unittest.mock import patch

from homeassistant.components import ai_task
from homeassistant.components.ai_task import AITaskEntityFeature
from homeassistant.components.automation.config import async_validate_config_item
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
import pytest
import yaml

from custom_components.llm_agent.providers import ProviderConfig, ProviderError, make_provider
from custom_components.llm_agent.providers.base import Done, TextDelta, image_model_for

from .conftest import PROVIDER, FakeResponse, FakeSession, sse
from .test_agent import ScriptedProvider, reply_text
from .test_init import _setup

PATCH = "custom_components.llm_agent.ai_task.make_provider"
SESSION = "custom_components.llm_agent.ai_task.async_get_clientsession"
ANTHROPIC = {**PROVIDER, "id": "p2", "type": "anthropic", "name": "Claude", "default_model": "c"}
OLLAMA = {**PROVIDER, "id": "p3", "type": "ollama", "name": "Local", "default_model": "llama"}
PNG = b"\x89PNG\r\n\x1a\nfake"

# The structure an automation would write in YAML, as HA's action schema receives it.
STRUCTURE = {
    "name": {"selector": {"text": None}, "required": True, "description": "Who"},
    "count": {"selector": {"number": {"min": 0, "max": 10}}},
    "open": {"selector": {"boolean": {}}},
}


@pytest.fixture
async def entities(hass: HomeAssistant, tmp_path: Path) -> dict[str, str]:
    """provider type -> AI Task entity id. A media folder lets attachments resolve."""
    hass.config.media_dirs = {"local": str(tmp_path)}
    await _setup(hass, providers=[dict(PROVIDER), ANTHROPIC, OLLAMA])
    out: dict[str, str] = {}
    for entity_id in hass.states.async_entity_ids("ai_task"):
        name = hass.states.get(entity_id).attributes["friendly_name"]
        kind = "openai" if "Test" in name else "anthropic" if "Claude" in name else "ollama"
        out[kind] = entity_id
    return out


async def _data(hass: HomeAssistant, entity_id: str, **fields: Any) -> dict[str, Any]:
    return await hass.services.async_call(
        ai_task.DOMAIN,
        "generate_data",
        {"task_name": "t", "entity_id": entity_id, "instructions": "Do it", **fields},
        blocking=True,
        return_response=True,
    )


def _features(hass: HomeAssistant, entity_id: str) -> AITaskEntityFeature:
    return AITaskEntityFeature(hass.states.get(entity_id).attributes["supported_features"])


async def test_one_entity_per_provider_and_images_only_where_built(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    # The action's entity picker filters on these flags; a provider advertising images it
    # can't make would be offered and then fail.
    assert set(entities) == {"openai", "anthropic", "ollama"}
    for entity_id in entities.values():
        assert AITaskEntityFeature.GENERATE_DATA in _features(hass, entity_id)
        assert AITaskEntityFeature.SUPPORT_ATTACHMENTS in _features(hass, entity_id)
    assert AITaskEntityFeature.GENERATE_IMAGE in _features(hass, entities["openai"])
    assert AITaskEntityFeature.GENERATE_IMAGE not in _features(hass, entities["anthropic"])
    assert AITaskEntityFeature.GENERATE_IMAGE not in _features(hass, entities["ollama"])


def test_image_model_per_provider_type() -> None:
    def conf(kind: str, model: str = "m") -> ProviderConfig:
        return ProviderConfig("p", kind, "x", "k", "http://stub.invalid", model)

    assert image_model_for(conf("openai")) == "gpt-image-2.5-flare"
    assert image_model_for(conf("openai", "gpt-image-1")) == "gpt-image-1"
    assert image_model_for(conf("gemini", "gemini-3-flash-image")) == "gemini-3-flash-image"
    assert image_model_for(conf("openrouter")) == "google/gemini-2.5-flash-image"
    for kind in ("anthropic", "ollama", "chatgpt"):
        assert image_model_for(conf(kind)) is None


async def test_plain_text_runs_with_no_tools(hass: HomeAssistant, entities: dict[str, str]) -> None:
    provider = ScriptedProvider([reply_text("The garage is open.")])
    with patch(PATCH, return_value=provider):
        result = await _data(hass, entities["openai"])
    assert result["data"] == "The garage is open."
    assert result["conversation_id"]
    # Pure generation: no Home Assistant tools offered, no native schema asked for.
    assert provider.calls[0]["tools"] == []
    assert provider.calls[0]["output_schema"] is None
    assert provider.calls[0]["messages"][0]["content"] == "Do it"


async def test_structure_returns_typed_fields(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    provider = ScriptedProvider([reply_text('{"name": "Ann", "count": "3", "open": true}')])
    with patch(PATCH, return_value=provider):
        result = await _data(hass, entities["anthropic"], structure=STRUCTURE)
    # "3" came back as text; the structure says number, so the automation gets a number.
    assert result["data"] == {"name": "Ann", "count": 3.0, "open": True}
    schema = provider.calls[0]["output_schema"]
    assert schema["required"] == ["name"]
    assert schema["properties"]["count"]["type"] == "number"
    # The schema is in the prompt too, for models that ignore the native field.
    assert json.dumps(schema) in provider.calls[0]["system"]


async def test_bad_json_is_repaired_once(hass: HomeAssistant, entities: dict[str, str]) -> None:
    provider = ScriptedProvider(
        [
            reply_text('Sure! {"name": "Ann"}'),
            reply_text('```json\n{"name": "Ann", "count": 2}\n```'),
        ]
    )
    with patch(PATCH, return_value=provider):
        result = await _data(hass, entities["ollama"], structure=STRUCTURE)
    assert result["data"] == {"name": "Ann", "count": 2.0}
    repair = provider.calls[1]["messages"]
    assert repair[1] == {"role": "assistant", "content": 'Sure! {"name": "Ann"}', "tool_calls": []}
    assert "not valid JSON" in repair[2]["content"]


async def test_wrong_shape_twice_is_a_clear_error(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    provider = ScriptedProvider([reply_text('{"count": 1}'), reply_text('{"count": 1}')])
    with patch(PATCH, return_value=provider), pytest.raises(HomeAssistantError) as err:
        await _data(hass, entities["openai"], structure=STRUCTURE)
    # Says what was wrong and what came back, so the automation trace explains itself.
    assert "did not return data matching the structure" in str(err.value)
    assert "name" in str(err.value) and '{"count": 1}' in str(err.value)
    assert len(provider.calls) == 2  # exactly one retry


async def test_rejected_native_schema_falls_back_to_the_prompt(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    class RefusesSchema(ScriptedProvider):
        async def stream(self, **kwargs: Any):
            if kwargs["output_schema"] is not None:
                self.calls.append(kwargs)
                raise ProviderError("x: (HTTP 400: response_format not supported)", 400)
            async for event in super().stream(**kwargs):
                yield event

    provider = RefusesSchema([reply_text('{"name": "Bo"}')])
    with patch(PATCH, return_value=provider):
        result = await _data(hass, entities["ollama"], structure=STRUCTURE)
    assert result["data"] == {"name": "Bo"}
    assert [c["output_schema"] is None for c in provider.calls] == [False, True]


async def test_provider_errors_and_cut_off_replies_raise(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    class Failing:
        async def stream(self, **_kw: Any):
            raise ProviderError("Test: the API key was rejected.", 401)
            yield  # pragma: no cover

    with patch(PATCH, return_value=Failing()), pytest.raises(HomeAssistantError, match="API key"):
        await _data(hass, entities["openai"])

    # Chat Completions reports a token cut-off as "length"; half a JSON object must not
    # be repaired into a confident wrong answer.
    cut = ScriptedProvider([[TextDelta('{"name": "A'), Done("length")]])
    with patch(PATCH, return_value=cut), pytest.raises(HomeAssistantError, match="cut off"):
        await _data(hass, entities["openai"], structure=STRUCTURE)


async def test_picture_attachment_reaches_the_model(
    hass: HomeAssistant, entities: dict[str, str], tmp_path: Path
) -> None:
    (tmp_path / "porch.png").write_bytes(PNG)
    provider = ScriptedProvider([reply_text("A cat.")])
    with patch(PATCH, return_value=provider):
        result = await _data(
            hass,
            entities["anthropic"],
            attachments=[
                {
                    "media_content_id": "media-source://media_source/local/porch.png",
                    "media_content_type": "image/png",
                }
            ],
        )
    assert result["data"] == "A cat."
    images = provider.calls[0]["messages"][0]["images"]
    assert images == [{"media_type": "image/png", "data": base64.b64encode(PNG).decode()}]


async def test_non_picture_attachment_is_refused_by_name(
    hass: HomeAssistant, entities: dict[str, str], tmp_path: Path
) -> None:
    (tmp_path / "notes.txt").write_text("hi")
    provider = ScriptedProvider([reply_text("unused")])
    with patch(PATCH, return_value=provider), pytest.raises(HomeAssistantError) as err:
        await _data(
            hass,
            entities["openai"],
            attachments=[
                {
                    "media_content_id": "media-source://media_source/local/notes.txt",
                    "media_content_type": "text/plain",
                }
            ],
        )
    assert "Only pictures" in str(err.value) and "notes.txt" in str(err.value)
    assert provider.calls == []  # nothing was sent


async def test_openai_generate_image_saves_the_picture(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    body = json.dumps(
        {
            "data": [{"b64_json": base64.b64encode(PNG).decode(), "revised_prompt": "A dog"}],
            "output_format": "png",
        }
    )
    session = FakeSession([FakeResponse(200, [], body=body)])
    with patch(SESSION, return_value=session):
        result = await hass.services.async_call(
            ai_task.DOMAIN,
            "generate_image",
            {"task_name": "dog", "entity_id": entities["openai"], "instructions": "a dog"},
            blocking=True,
            return_response=True,
        )
    request = session.requests[0]
    assert request["url"] == "http://stub.invalid/v1/images/generations"
    assert request["json"] == {"model": "gpt-image-2.5-flare", "prompt": "a dog", "n": 1}
    assert result["mime_type"] == "image/png"
    assert result["model"] == "gpt-image-2.5-flare"
    assert result["revised_prompt"] == "A dog"
    assert result["media_source_id"].startswith("media-source://ai_task/image/")


async def test_generate_image_is_refused_where_not_advertised(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    with pytest.raises(HomeAssistantError, match="does not support generating images"):
        await hass.services.async_call(
            ai_task.DOMAIN,
            "generate_image",
            {"task_name": "x", "entity_id": entities["anthropic"], "instructions": "a dog"},
            blocking=True,
            return_response=True,
        )


# Adapter request bodies: each provider's native structured output field.

SCHEMA = {
    "type": "object",
    "properties": {"count": {"type": "number", "minimum": 0, "description": "How many"}},
    "required": ["count"],
}


def _conf(kind: str, **kw: Any) -> ProviderConfig:
    return ProviderConfig("p", kind, "x", "key", "http://stub.invalid", "m", **kw)


async def _drain(provider: Any) -> None:
    async for _ in provider.stream(
        model="m",
        system="s",
        messages=[{"role": "user", "content": "hi"}],
        tools=[],
        output_schema=SCHEMA,
    ):
        pass


async def test_anthropic_sends_output_config_without_unsupported_limits() -> None:
    events = [
        {"type": "message_start", "message": {"usage": {}}},
        {"type": "message_delta", "delta": {"stop_reason": "end_turn"}, "usage": {}},
    ]
    session = FakeSession([FakeResponse(200, sse(events))])
    await _drain(make_provider(session, _conf("anthropic")))
    fmt = session.requests[0]["json"]["output_config"]["format"]
    assert fmt["type"] == "json_schema"
    count = fmt["schema"]["properties"]["count"]
    # Anthropic rejects "minimum"; the limit moves into the description it reads instead.
    assert "minimum" not in count and count["description"] == "How many (minimum: 0)"
    assert fmt["schema"]["additionalProperties"] is False


async def test_openai_compat_sends_response_format() -> None:
    chunks = [{"choices": [{"delta": {"content": "{}"}, "finish_reason": "stop"}]}, "[DONE]"]
    session = FakeSession([FakeResponse(200, sse(chunks))])
    await _drain(make_provider(session, _conf("openrouter")))
    rf = session.requests[0]["json"]["response_format"]
    assert rf == {
        "type": "json_schema",
        "json_schema": {"name": "result", "schema": SCHEMA, "strict": False},
    }


async def test_gemini_sends_response_json_schema() -> None:
    chunks = [{"candidates": [{"content": {"parts": [{"text": "{}"}]}, "finishReason": "STOP"}]}]
    session = FakeSession([FakeResponse(200, sse(chunks))])
    await _drain(make_provider(session, _conf("gemini")))
    config = session.requests[0]["json"]["generationConfig"]
    assert config["responseMimeType"] == "application/json"
    assert config["responseJsonSchema"] == SCHEMA


async def test_chatgpt_sends_text_format() -> None:
    async def auth() -> tuple[str, str]:
        return "t", "a"

    events = [{"type": "response.completed", "response": {"usage": {}}}]
    session = FakeSession([FakeResponse(200, sse(events))])
    await _drain(make_provider(session, _conf("chatgpt", auth=auth)))
    fmt = session.requests[0]["json"]["text"]["format"]
    assert fmt["type"] == "json_schema" and fmt["schema"] == SCHEMA


async def test_gemini_image_reply_is_decoded() -> None:
    body = json.dumps(
        {
            "candidates": [
                {
                    "content": {
                        "parts": [
                            {"text": "Here you go."},
                            {
                                "inlineData": {
                                    "mimeType": "image/png",
                                    "data": base64.b64encode(PNG).decode(),
                                }
                            },
                        ]
                    }
                }
            ]
        }
    )
    session = FakeSession([FakeResponse(200, [], body=body)])
    image = await make_provider(session, _conf("gemini")).generate_image(
        prompt="a dog", images=[{"media_type": "image/jpeg", "data": "AAAA"}]
    )
    assert (image.data, image.mime_type, image.text) == (PNG, "image/png", "Here you go.")
    request = session.requests[0]
    assert request["url"].endswith("/v1beta/models/gemini-2.5-flash-image:generateContent")
    parts = request["json"]["contents"][0]["parts"]
    assert parts[0] == {"inlineData": {"mimeType": "image/jpeg", "data": "AAAA"}}
    assert request["json"]["generationConfig"]["responseModalities"] == ["TEXT", "IMAGE"]


async def test_openrouter_image_reply_is_decoded() -> None:
    url = "data:image/webp;base64," + base64.b64encode(PNG).decode()
    body = json.dumps(
        {"choices": [{"message": {"content": "", "images": [{"image_url": {"url": url}}]}}]}
    )
    session = FakeSession([FakeResponse(200, [], body=body)])
    image = await make_provider(session, _conf("openrouter")).generate_image(
        prompt="a dog", images=[]
    )
    assert (image.data, image.mime_type) == (PNG, "image/webp")
    assert session.requests[0]["json"]["modalities"] == ["image", "text"]
    assert session.requests[0]["json"]["model"] == "google/gemini-2.5-flash-image"


async def test_image_reply_without_a_picture_is_an_error() -> None:
    body = json.dumps({"choices": [{"message": {"content": "I can only write text."}}]})
    session = FakeSession([FakeResponse(200, [], body=body)])
    with pytest.raises(ProviderError, match="no picture"):
        await make_provider(session, _conf("openrouter")).generate_image(prompt="x", images=[])


async def test_readme_example_passes_ha_validation(
    hass: HomeAssistant, entities: dict[str, str]
) -> None:
    """The README's AI Task example is valid YAML for HA, so a copy-paste works."""
    readme = (Path(__file__).parent.parent / "README.md").read_text()
    block = readme.split("<!-- ai-task-example:", 1)[1].split("```yaml\n", 1)[1]
    config = yaml.safe_load(block.split("```", 1)[0])
    validated = await async_validate_config_item(hass, "readme", {"alias": "x", **config})
    assert validated is not None and validated.validation_error is None
    step = config["actions"][0]
    assert step["action"] == "ai_task.generate_data"
    # The action's own schema (what HA runs on the data when it is called), including
    # the structure and attachments checks.
    schema = hass.services.async_services_internal()[ai_task.DOMAIN]["generate_data"].schema
    data = schema(step["data"])
    assert data["structure"]({"package": True, "people": 2}) == {"package": True, "people": 2.0}
    # The example names the entity id this integration really creates for that provider.
    assert step["data"]["entity_id"].startswith("ai_task.llm_agent_")
