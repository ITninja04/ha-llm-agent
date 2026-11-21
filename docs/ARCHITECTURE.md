# ha-llm-agent: architecture (draft for owner approval, 2026-10-20)

An AI-provider-agnostic Home Assistant custom integration (HACS) that adds an
admin-only sidebar chat. The agent can control devices and edit Home Assistant
itself (dashboards, automations, scripts, scenes, helpers, integrations, files,
restart, HACS, optional shell). Apache-2.0. Repo: github.com/ITninja04/ha-llm-agent.
Integration domain: `llm_agent`. Minimum HA: 2026.10.

## 1. Repo layout

```
custom_components/llm_agent/
  manifest.json        no pip requirements (uses HA's aiohttp session)
  __init__.py          setup: register panel, static path, WS commands, LLM provider entries
  config_flow.py       provider entry (provider, API key, base URL, default model) +
                       required "I understand the risks" checkbox; options flow
  const.py
  providers/           base.py (interface), anthropic.py, openai_compat.py
                       (OpenAI, OpenRouter, Ollama /v1), models.py (static model
                       list + static prices; free-text model allowed)
  agent.py             turn loop: provider stream -> tool calls -> approval -> results
  approval.py          risk classifier + approval modes
  tools/               states.py, services.py, registry.py, automations.py
                       (also scripts, scenes), dashboards.py, helpers.py,
                       integrations.py, files.py, system.py, hacs.py, shell.py
  snapshots.py         undo copies and full-backup hook
  store.py             conversations, audit log
  conversation.py      Assist conversation entity (voice)
  websocket.py         admin-only WS API for the panel
  www/agent-panel.js   built frontend (committed; HACS installs from the repo)
frontend/              SolidJS 2.0 + TypeScript source, Vite build
tests/                 pytest-homeassistant-custom-component, fake provider
.github/workflows/     CI (GitHub-hosted runners only)
LICENSE NOTICE README.md DISCLAIMER.md hacs.json
```

## 2. Providers

One small interface: `stream(messages, tools, model, options) -> async iterator`
of `TextDelta | ToolCall | Usage | Done`. Two adapters cover all four providers:
- **Anthropic** Messages API with SSE streaming and tool use.
- **OpenAI-compatible** Chat Completions with SSE streaming and tool calls.
  OpenAI, OpenRouter and Ollama (`/v1`) only differ by base URL and auth header.

Raw HTTP through HA's shared aiohttp session, with no SDK dependencies. That
avoids conflicts with the SDK versions HA core pins (anthropic, openai, ollama).
Each provider config entry stores its API key in HA's standard config-entry
storage. The key is never sent to the browser and is redacted from logs and
diagnostics.

Models: `models.py` holds a static default list per provider with input and
output prices per million tokens. The model picker offers these as suggestions
and accepts any typed model id. A model with no known price shows tokens only.
Prices can be overridden in options.

## 3. Agent loop (panel)

1. The user sends a message. The loop builds the prompt: a system prompt, a
   compact home summary (areas, domains, counts; full entity detail only through
   tools), the history and the tool schemas.
2. Provider deltas stream to the browser over a WS subscription.
3. For each tool call, the loop first checks the reference pages the call needs
   (`Tool.reference_pages`): an action on an integration with a page (WLED, Music
   Assistant and the others in `INTEGRATION_PAGES`, matched by the action's domain
   and by each target entity's registry platform), or a saved automation, script,
   scene, dashboard or helper. A page not read with `read_reference` in this chat
   refuses the call with the page name, before any approval. The prompt asked for
   this already, and models skipped it, so the check is in code. Compaction clears
   the record of read pages, since the pages left the history. Where `read_reference`
   is not offered (the lean tool set), there is no check.

   Then the risk classifier returns `safe` or `risky`. The
   approval mode decides whether to run it or pause:
   - **ask_all**: pause on every write.
   - **ask_risky** (default): pause on risky calls.
   - **autopilot**: never pause, except that shell still requires its own
     enable switch.
   - **yolo**: autopilot that also skips the ask-after-web-content rule.
     Deny and ask rules, members and unattended runs behave as in autopilot.

   A pause sends an approval card to the panel: a plain-language summary, the
   arguments, and a diff for YAML, dashboard and file edits. Approve or deny
   resumes the loop. Deny returns "user denied" to the model. The loop stops at
   a timeout (10 min) or when the user cancels.
4. Tool results go back to the model. The loop repeats until a final answer,
   with a step cap (default 25 tool calls per turn).
5. Usage totals are stored for each conversation: tokens and a $ estimate.
6. The Manager (`manager.py`, off by default) asks a decision model (Jev via
   OpenRouter's `/systemone`) whether the turn is stuck: every N tool calls, running
   alongside those calls since its answer only matters for the step after them, and
   after 3 failed calls in a row. When the stuck probability passes the threshold, a
   fixed sentence is stored on the last tool message (`manager` key) and appended to it
   only in `_provider_view`, so the stored output, the panel preview and undo never
   contain it. No answer in 3 s is no decision. Why only stuck: docs/MANAGER_EVAL.md.

The panel loop owns its own state rather than HA's ChatLog. ChatLog runs tool
calls automatically as they stream, which conflicts with pausing for approval.

## 4. Voice / Assist

`conversation.py` registers one conversation entity per provider entry. It uses
HA's standard ChatLog flow with HA's built-in **Assist** LLM API: exposed
entities, intents and scripts. Voice can therefore control devices and answer
questions, but cannot edit config. This matches the owner's decision and needs
no approval UI.

## 4a. AI Task

`ai_task.py` registers one AI Task entity per provider entry, for
`ai_task.generate_data` and `ai_task.generate_image`. It is pure generation: no tools, no
approvals. With a `structure`, the schema goes in the provider's native structured
output field (`output_schema` on `Provider.stream`) and in the prompt; the reply is
checked against the structure and sent back once for repair if it does not fit. Image
generation exists for OpenAI (Images API), Gemini (generateContent with an image model)
and OpenRouter (chat completions with the image modality); `image_model_for` in
`providers/base.py` decides which entities advertise it.

## 5. Tools (panel only)

| Group | Tools | Risky when |
|---|---|---|
| states | search entities, get state/attributes, history, logbook | never (read) |
| services | call any service | lock/unlock, alarm, garage/gate/door covers, `homeassistant.*`, delete-style services |
| registry | list/rename/assign areas, devices, entities; enable/disable | delete/remove |
| automations / scripts / scenes | list, get, create/update, delete, run, reload | delete; always snapshot before write |
| dashboards | list, get config, create, save config, delete | delete; snapshot before save |
| helpers | create/update/delete input_* and other helpers | delete |
| integrations | list entries, start/continue config flow, reload, remove | remove |
| files | list/read/write inside `/config` only | every write; snapshot first |
| system | check_config, reload domain, restart, read error log | restart (always runs check_config first and refuses if invalid) |
| hacs | search, install, update (only if HACS is installed) | install/update; full backup first |
| shell | run a command with a timeout, cwd `/config` | always; tool exists only when enabled in options (warning shown) |
| chats | `past_chats` (find earlier chats by text, date, source) and `read_chat` (condensed transcript, paged at about 12000 characters); `tools/chats.py` | never (read). Same visibility as the panel (`store.Viewer`), and an id the person may not see reads as not found. Reading a chat that read outside content taints this one. Not in the lean set; household members get them for their own chats |

Safety limits are settings (owner 2026-10-20: "idk if we want the limits so hard").
They default to on and apply in every approval mode, including autopilot:
- **Protect sensitive data** (on): file tools refuse paths outside `/config` and
  credential stores (`secrets.yaml`, `.storage/auth*`, `.storage/core.config_entries`,
  keys, databases); token-issuing WS commands are blocked.
- **Refuse restart when configuration is invalid** (on).
- **Back up before risky actions** (on): HACS installs and integration removal.
- **Allow shell commands** (off): turning it on needs a second confirmation step.
- **Tool calls per message** (25): after the limit the model is told to stop and summarize.

## 6. Undo and backups

- Before any write to YAML, dashboards or files, the previous content is copied to
  `/config/.llm_agent/snapshots/<timestamp>/`. The last 50 are kept. The panel shows
  an Undo button on each change card. The model can also undo through a tool.
- Before HACS installs and integration removals, the agent makes a full HA backup
  through the backup integration. This is configurable.
- An audit log (`/config/.llm_agent/audit.jsonl`, rotated) records every tool
  call: time, user, tool, risk, approval decision, result status. Secrets are
  never logged. Changes also record their undo `snapshot_id`, and a change an
  allow rule let through records the `rule`; older records lack both and show
  without Undo, and as auto.
- The panel's Changes view (admins only, `llm_agent/changes`) and the
  `change_history` tool read this log back from the end, newest first, across
  every chat. Undo there is the same `llm_agent/undo` as on a change card. Chat
  titles and user names are looked up when shown, so a deleted chat has no title.
  Successful read-only calls are never logged, so they never appear.

## 7. Security model

- The panel is registered `require_admin`. Every WS command also checks admin,
  because hiding the panel does not block access to the page by itself.
- API keys stay on the server. The frontend sees only provider names and models.
- Prompt injection (device names, file content or web data steering the model) is
  mitigated by approvals and the safety settings above, and is called out in the disclaimer.
- No telemetry. The only outbound calls go to the configured provider URLs.

## 7a. Efficiency (owner 2026-10-20: "efficient. Well made.")

People run HA on Raspberry Pis, so the integration does real work cheaply rather than
doing less:
- No polling anywhere. The panel streams over the existing HA WebSocket; nothing runs
  while no chat is active. No background tasks at idle.
- No Python requirements: raw aiohttp on HA's shared client session, so installs pull
  nothing and cannot conflict with core pins.
- Conversations: one small index plus one store file per conversation, debounced
  writes (one disk write per turn, not per token), at most 5 kept in memory.
- Streaming text re-renders at most ~12 times a second; finished messages cache their
  rendered markdown.
- History: compact tool results (capped at creation), recorder queries with
  minimal_response/no_attributes and downsampling.
- Token cost: stable cached system prompt and tools (Anthropic prompt caching), the
  home summary computed once per conversation, the time in the user message.
- The panel bundle (~40 kB gzipped) loads only when the panel is opened.

## 8. Frontend

SolidJS 2.0 + TypeScript, built by Vite into one minified ES module
(`www/llm-agent-panel.js`, about 100 kB gzipped, capped in CI). Each view is a custom
element (same tag names as when it was Lit) rendered by the small shell in
`element.tsx`, which turns the properties HA sets into signals and gives a view only
the parts of `hass` it reads, so a state change elsewhere in the house redraws nothing.
The floating chat button and window (`float.ts`, `floatwindow.ts`) are plain DOM on
purpose: the button loads on every HA page, and Solid in it would add its runtime to
each one. Small dependencies only: `solid-js` and `@solidjs/web`, `marked` and
`dompurify` for safe Markdown rendering, and `tiny-markdown-editor` (its `lib/` files only, which carry no
polyfills) so the chat box formats Markdown as it is typed. `composer.ts` wraps it to
read the caret inside Home Assistant's shadow roots, and falls back to a plain textarea
where the browser cannot.

Features:
- conversation list (new, rename, delete)
- streaming chat with a Stop button
- collapsible tool-call cards
- approval cards with diff and Undo
- model picker per conversation (suggestions plus free text)
- token and $ footer
- a settings link
- the integration's own settings (its options flow over HA's flow API, admins only),
  drawn in the panel, with a link to the integration's page in Home Assistant for
  any step the panel cannot draw. A save reloads the entry with the panel kept
  registered, so the admin stays in the panel.

Image attachments are deferred to 0.2.

## 9. Legal

- Apache-2.0 LICENSE and NOTICE. Apache-2.0 has the same warranty and
  liability disclaimers as MIT, and adds patent and contribution terms.
- DISCLAIMER.md and the README state:
  - use at your own risk
  - the AI can make mistakes and can control physical devices
  - not affiliated with or endorsed by Home Assistant or Nabu Casa
  - provider charges are the user's responsibility
- The config flow cannot finish until the admin ticks the risk acknowledgement.
- This is not legal advice. Get counsel if the project is ever sold.

## 10. CI (free, GitHub-hosted runners only; never the self-hosted runner)

- `ci.yml` on every push and PR:
  - ruff
  - pytest with pytest-homeassistant-custom-component pinned to the target HA
  - hassfest
  - HACS validate (brands check ignored until a brands PR lands)
  - frontend typecheck and build, failing if the committed `www/agent-panel.js` is stale
- `e2e.yml`: starts a real HA container in Actions, onboards it, installs the
  integration, points it at a stub OpenAI-compatible SSE server, and drives the
  panel with Playwright. It covers chat, a tool call, an approval and an undo.
- CodeQL default setup, Dependabot, and secret scanning (all free for public repos).
- `release.yml`: on a tag, attaches a zip and creates the GitHub release that HACS reads.

## 11. Delivery order (0.1.0)

1. Skeleton: manifest, config flow, providers, fake-provider tests, CI green.
2. Panel chat with streaming and history; read-only tools.
3. Service calls, approval modes and risk classifier.
4. Automations, scripts, scenes, dashboards and helpers, with snapshots and Undo.
5. Integrations, files, system (check_config and restart), HACS, shell.
6. Assist conversation entity.
7. e2e in Actions, README and disclaimer, release v0.1.0.
   Afterwards: HACS default-store submission (needs a home-assistant/brands PR).
