# The turn log

The turn log exists so the system prompt can be tuned from evidence. A chat shows what
was said, but not the numbers that tell whether the prompt works: how many tool calls a
turn took, which calls repeated, where the tool budget ran out, what the turn cost and
how long it took. Chats can also be deleted, and the evidence with them.

So every chat turn leaves one record in a file of its own, `.storage/llm_agent.turns`,
which deleting a chat never touches. The code is `custom_components/llm_agent/turnlog.py`
(storage and trimming) and `ChatRun.run` in `agent.py` (what goes into a record).

## What it is not

- It is not sent anywhere. The only way out is an admin pressing Download turn log in
  the panel's Usage view, which saves a file in that admin's browser.
- It is not the audit log. The audit log (`.llm_agent/audit.jsonl`) records every change
  and who allowed it. The turn log records every turn, including the ones that only
  read, and it is trimmed to a size, so it can not prove what happened a year ago.
- It is not the chat. It holds tool names and arguments, but neither the user's message
  nor the model's reply text, only their lengths.
- It is not complete under load. Records are written with the chat store's delayed save
  (about two seconds), so a power cut can lose the last turn or two.

## Settings

Under the integration's settings, section Debugging:

| Setting | Default | Range | What it does |
|---|---|---|---|
| Turn log (`turn_log`) | on | on / off | Off keeps nothing new. Records already kept stay until they age out. |
| Keep turn log for (`turn_log_days`) | 30 days | 1 to 365 | Older records are dropped at startup, on the next turn and when settings are saved. |
| Turn log size (`turn_log_mb`) | 20 MB | 1 to 200 | The oldest records are dropped past this size (JSON as stored). |

The newest record is always kept, even when it alone is older or larger than the limits.

## Getting it

- Panel: Usage view, Download turn log. Saves `llm-agent-turns-YYYY-MM-DD.jsonl`.
- WebSocket, admins only: `{"type": "llm_agent/turn_log"}` returns
  `{"enabled": bool, "count": int, "jsonl": str}`. Members get `unauthorized`, because
  the records hold tool arguments from every user's chats.
- `llm_agent/info` returns `turn_log: {enabled, count, bytes}` to admins only.

## Format

JSON Lines: one object per line, oldest first, UTF-8. Every key below is present in
every record of version 1 unless marked optional.

| Key | Type | Meaning |
|---|---|---|
| `v` | int | Record layout version, 1. Bumped only when a key changes meaning. New keys may appear without a bump; ignore keys you do not know. |
| `ts` | float | Turn start, Unix seconds (UTC). |
| `conversation_id` | str | The chat. May no longer exist. |
| `who` | str | `admin`, `member` (household chat) or `unattended` (the `llm_agent.ask` action). No user id is kept. |
| `provider` | str | Provider type: `openrouter`, `anthropic`, `openai`, `gemini`, `ollama`, `chatgpt`, ... |
| `provider_id` | str | The configured provider entry. |
| `model` | str | Model id as sent to the provider. |
| `mode` | str | The approval mode the turn ran in, after member and unattended rules: `ask_all`, `ask_risky`, `reviewer`, `autopilot`, `yolo`, `read_only`, `accept_edits`, `planning`. |
| `prompt_version` | str | First 12 hex characters of SHA-256 of the fixed system prompt (the admin or the member prompt). Changes only when a release changes that text. Group by this to compare prompt versions. |
| `system_hash` | str | The same hash of the whole system text sent this turn: fixed prompt plus reference index, home notes, knowledge index, home summary, language, mode lines, tool budget line and extra instructions. Differs between installs and as notes change. |
| `system_chars` | int | Length of that whole system text. |
| `message_chars` | int | Length of the user's message (without attached files or page details). |
| `max_steps` | int | The tool call budget for the turn (setting Maximum tool calls). |
| `steps` | int | Tool calls the model asked for in the turn, including refused ones. More than `max_steps` means the turn hit the limit. |
| `model_calls` | int | Requests sent to the model. A turn with N tool rounds has N+1. |
| `model_ms` | int | Milliseconds spent streaming model replies, summed. |
| `latency_ms` | int | Milliseconds from turn start to its end, including waits for approval. |
| `tool_calls` | list | One entry per tool call, in the order the model asked for them; see below. |
| `repeats` | int | Calls answered from an identical earlier read in the same turn instead of being run. |
| `budget_reminder` | bool | The 80 percent budget reminder was added to a tool result. |
| `tokens` | object | `input`, `output`, `cache_read`, `cache_write`, `reasoning`: summed over the turn's model calls. `input` excludes cached tokens, as the providers report it. |
| `cost` | float or null | Estimated USD for the turn, from the same prices as the daily cap. Null when any call in the turn had no known price; a partial sum would read as the whole cost. Reviewer calls are not included. |
| `stop` | str or null | How the turn ended: the provider's stop reason for a normal end (`end_turn`, `stop`, ...), or `tool_limit`, `cancelled`, `spend_cap`, `member_cap`, `length`, `thinking_limit`, `refusal`, `error`. |
| `error` | str or null | The provider or internal error message, cut to 500 characters. |
| `decisions` | list of str | Lines added by whatever decided something about the turn (`ChatRun.decide`, for example from a checkpoint hook). At most 50, each at most 500 characters. Empty when nothing did. |

### `tool_calls` entries

| Key | Type | Meaning |
|---|---|---|
| `name` | str | Tool name as the model called it. Unknown names are kept too. |
| `args` | object | Arguments after the tool's own repair (text sent for an object is parsed). Every string longer than 2000 characters is cut and ends in `...(cut, N chars)`. |
| `ok` | bool | False when the result was an error: refused, denied, invalid, failed. |
| `error` | str or null | The error result text, first 500 characters. |
| `ms` | int | Milliseconds from the call starting to its result, including any approval wait. Reads in one step run concurrently, so their times overlap. |
| `result_chars` | int | Length of the result as sent to the model (results are capped at 16000). |
| `decision` | str or null | For a change: `auto`, `approved`, `denied`, `reviewer_approved`, `reviewer_denied`. Null for reads. |
| `repeat` | bool | Answered from an identical earlier read in this turn; the tool did not run. |

### Example

```json
{"v": 1, "ts": 1795290000.123, "conversation_id": "20261121083000a1b2c3", "who": "admin", "provider": "openrouter", "provider_id": "2bffd796", "model": "~deepseek/deepseek-flash-latest", "mode": "ask_risky", "prompt_version": "3f9a0c1d2e4b", "system_hash": "7c1e9a03b5d2", "system_chars": 21840, "message_chars": 31, "max_steps": 50, "steps": 2, "model_calls": 3, "model_ms": 6120, "latency_ms": 6890, "tool_calls": [{"name": "search_entities", "args": {"query": "kitchen"}, "ok": true, "error": null, "ms": 12, "result_chars": 904, "decision": null, "repeat": false}, {"name": "call_service", "args": {"domain": "light", "service": "turn_on", "target": {"entity_id": "light.kitchen"}}, "ok": true, "error": null, "ms": 140, "result_chars": 61, "decision": "auto", "repeat": false}], "repeats": 0, "budget_reminder": false, "tokens": {"input": 9100, "output": 210, "cache_read": 30400, "cache_write": 0, "reasoning": 88}, "cost": 0.00412, "stop": "stop", "error": null, "decisions": []}
```

## Reading it

Things the records answer directly:

- Turns cut off by the budget: `steps > max_steps`, or `stop == "tool_limit"`.
- Loops: `repeats > 0`, or the same `name` and `args` several times in `tool_calls`.
- Wasted reads: high `result_chars` on calls followed by the same call with narrower args.
- Prompt changes: compare medians of `steps`, `cost` and `latency_ms` across `prompt_version`.
- Mode effects: `decision` counts per `mode`, and `planning` turns followed in the same
  `conversation_id` by a turn in another mode (a plan that was run).

## For other features

`Agent.add_checkpoint_hook(hook)` calls `hook(run, checkpoint)` at each checkpoint of
every turn, sync or async, and returns a function that removes the hook. A checkpoint is
a dict with `kind` (`model` after each model reply, `tools` after each step of tool
calls, `end` when the turn is over), `conversation_id`, `mode`, `steps`, `max_steps`, and
for `model` also `stop_reason`, `calls` (tool names) and `text_chars`; `end` carries the
finished `record`. A hook that raises is logged and skipped. It can not change the turn;
it can record what it decided with `run.decide(text)`, which lands in `decisions`.
