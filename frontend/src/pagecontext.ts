// What the person is looking at in Home Assistant, for the floating chat.
//
// "Turn these off" on a dashboard, or "why does this not fire" in the automation editor,
// means nothing to the model unless it knows the page. This file reads the page and
// returns a small structured description that the chat sends with the message.
//
// How: the route comes from location, and the facts from Home Assistant's own frontend
// state (`hass`: states, entity, device and area registries, panels) and its WebSocket
// API (`lovelace/config`, `config_entries/get`). Scraping the screen is the last resort,
// used only where no structured source exists: the open more-info dialog, the editors'
// unsaved state, the template editor's text, and the visible text of pages this file
// does not know. Those reads use element and property names taken from Home Assistant's
// frontend build (2026.10.2, read from the hass_frontend package): `ha-more-info-dialog`
// with `_entityId` and `_open`, `ha-automation-editor` and `ha-script-editor` with
// `config` and `dirty`, `ha-scene-editor` with `_config`, `tools-template` with
// `_template`, `ha-panel-lovelace` with `lovelace.config`. Every one of them is read
// defensively: a renamed property makes that fact disappear, never the whole page.
//
// What is not true, so nobody relies on it:
// - States are what the browser had when the page was read. They can be stale by the
//   time the model acts, and the model is told to verify with tools.
// - Generated dashboards (strategy dashboards, and HA's own Overview, Lights, Security,
//   Climate and Maintenance panels) have no saved cards. Their entities are read from
//   the generated config hui-root holds and from the cards actually drawn. A card that
//   renders before the read is missed; one drawn nowhere is never listed.
// - Home Assistant has no "sensitive" marker on elements (none in the 2026.10.2 build),
//   so the page text walk cannot honour one. It never reads form field values at all,
//   which keeps passwords and typed secrets out, and it skips the chat itself.
// - The selection is read through shadow roots with `getSelection()` on each root,
//   which only Chromium has. In Firefox and Safari a selection inside a card is often
//   not readable and is left out.

import type { Hass } from "./types";

export interface PageContext {
  path: string; // location.pathname + location.search
  title: string; // what the page calls itself (dashboard view title, "Automation: Porch light", ...)
  kind: string; // "dashboard" | "automation" | "script" | "scene" | "device" | "entity" | "integration" | "area" | "history" | "logbook" | "developer-tools" | "settings" | "other"
  summary: string; // one short line for the chip in the composer, for example "Living room dashboard"
  details: Record<string, unknown>; // structured facts, JSON at most 8 KB
  text?: string; // visible page text as a fallback, at most 3000 characters
}

// The limits from the brief the chat and the server agree on. The server refuses a
// page over 16 KB whole, so the total is kept under it here with room to spare.
const MAX_DETAILS = 8 * 1024;
const MAX_TOTAL = 15 * 1024;
const MAX_TEXT = 3000;
const MAX_SELECTION = 1000;
const MAX_TEMPLATE = 2000;
const MAX_VIEW_ENTITIES = 80;
const MAX_DEVICE_ENTITIES = 40;
const MAX_AREA_ITEMS = 40;
const MAX_ATTRIBUTES = 30;
const MAX_ATTRIBUTE_CHARS = 300;
// Home Assistant's own narrow breakpoint (home-assistant-main switches the sidebar here).
const NARROW = "(max-width: 870px)";
// Attributes left out: entity_picture on cameras and media players carries a signed
// token in its URL, and access_token is one outright.
const SECRET_ATTRIBUTES = new Set(["entity_picture", "access_token"]);
// Elements whose text is never page content. llm-agent-* is this chat, docked or
// floating, whatever the floating window calls its element.
const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "TEMPLATE",
  "NOSCRIPT",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "OPTION",
  "SVG",
  "HA-ICON",
  "HA-SVG-ICON",
  "HA-PASSWORD-FIELD",
]);

interface StateObj {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

interface PageHass {
  connection: Hass["connection"];
  states?: Record<string, StateObj>;
  entities?: Record<
    string,
    { entity_id: string; name?: string | null; device_id?: string | null; area_id?: string | null; platform?: string; hidden?: boolean }
  >;
  devices?: Record<
    string,
    {
      id: string;
      name?: string | null;
      name_by_user?: string | null;
      manufacturer?: string | null;
      model?: string | null;
      area_id?: string | null;
    }
  >;
  areas?: Record<string, { area_id: string; name: string }>;
  panels?: Record<string, { component_name: string; title?: string | null; url_path: string }>;
  localize?: (key: string) => string;
}

type Json = Record<string, unknown>;

// ---- the public functions ------------------------------------------------------------

/** Read the page the person is on. Never throws: anything unreadable is left out. */
export async function collectPageContext(hass: Hass): Promise<PageContext> {
  watchSelection();
  const h = hass as unknown as PageHass;
  const path = location.pathname + location.search;
  let page: Omit<PageContext, "path">;
  try {
    page = await describe(h);
  } catch {
    page = other();
  }
  const open = moreInfoEntity();
  if (open && h.states?.[open]) {
    const entity = entityFacts(h, open);
    page = {
      kind: "entity",
      title: `Entity: ${entity.name}`,
      summary: String(entity.name),
      // what is behind the dialog, so "this" can still mean the page
      details: { entity, behind: { kind: page.kind, title: page.title, ...page.details } },
    };
  }
  page.details.narrow = window.matchMedia?.(NARROW).matches ?? false;
  const selection = currentSelection();
  if (selection) page.details.selection = selection;
  return fit({ path, ...page });
}

/** The text the person last selected on the page (not in the chat), at most 1000
 * characters. Remembered, because clicking into the chat box clears the page's live
 * selection before the message is sent. */
export function currentSelection(): string {
  return remembered;
}

// ---- which page this is ----------------------------------------------------------------

async function describe(h: PageHass): Promise<Omit<PageContext, "path">> {
  const parts = location.pathname.split("/").filter(Boolean).map(decodeURIComponent);
  const query = new URLSearchParams(location.search);
  const [first = "", second = "", third = "", fourth = ""] = parts;

  if (first === "config") {
    if (["automation", "script", "scene"].includes(second) && fourth)
      return editor(h, second as "automation" | "script" | "scene", third, fourth);
    if (second === "devices" && third === "device" && fourth) return device(h, fourth);
    if (second === "areas" && third === "area" && fourth) return area(h, fourth);
    if (second === "integrations" && third === "integration" && fourth)
      return integration(h, fourth);
    if (second === "tools" || second === "developer-tools") return tools(third);
    return settings(parts);
  }
  // Developer tools moved under /config/tools; the old address still redirects there.
  if (first === "developer-tools") return tools(second);
  if (first === "history" || first === "logbook") return timeline(h, first, query);
  const panel = h.panels?.[first];
  if (panel?.component_name === "lovelace" || GENERATED_PANELS.has(panel?.component_name ?? ""))
    return dashboard(h, first, second, panel?.component_name === "lovelace");
  return other();
}

function other(): Omit<PageContext, "path"> {
  const title = pageTitle();
  return { kind: "other", title, summary: title, details: {}, text: pageText() };
}

function settings(parts: string[]): Omit<PageContext, "path"> {
  const title = pageTitle();
  return {
    kind: "settings",
    title,
    summary: title,
    details: { section: parts.slice(1).join("/") || "config" },
    text: pageText(),
  };
}

// ---- dashboards ------------------------------------------------------------------------

// Home Assistant's own generated dashboards, which are panels of their own rather than
// lovelace dashboards: "home" is the Overview people land on (2026.10.2 registers all five
// in frontend/__init__.py, and ha-panel-home builds its view with the "home" strategy).
// They have no saved config to fetch; their cards exist only once rendered.
const GENERATED_PANELS = new Set(["home", "light", "security", "climate", "maintenance"]);

async function dashboard(
  h: PageHass,
  urlPath: string,
  viewKey: string,
  saved: boolean,
): Promise<Omit<PageContext, "path">> {
  const panel = h.panels?.[urlPath];
  // The default dashboard's panel has no title of its own; the sidebar shows "Overview".
  const dashTitle =
    (panel?.title && (h.localize?.(`panel.${panel.title}`) || panel.title)) ||
    h.localize?.("panel.states") ||
    "Overview";
  let config: Json | undefined;
  let generated = !saved;
  if (saved) {
    try {
      config = await h.connection.sendMessagePromise<Json>({
        type: "lovelace/config",
        url_path: urlPath === "lovelace" ? null : urlPath,
      });
    } catch {
      // config_not_found: the default dashboard nobody has taken over, which is generated
      generated = true;
    }
  }
  if (config?.strategy) generated = true;
  // A generated dashboard's cards exist only in the config the dashboard element made.
  const shown = generated ? (renderedConfig() ?? undefined) : config;
  const views = Array.isArray(shown?.views) ? (shown.views as Json[]) : [];
  const index = views.findIndex((v) => v.path !== undefined && String(v.path) === viewKey);
  const at = index >= 0 ? index : /^\d+$/.test(viewKey) ? Number(viewKey) : 0;
  let view = views[at];
  if (view?.strategy && !view.cards && !view.sections) {
    // a generated view inside a saved dashboard: its cards exist only once rendered
    const rendered = renderedConfig()?.views;
    if (Array.isArray(rendered) && rendered[at]) view = { ...rendered[at], strategy: view.strategy };
  }
  const viewTitle = view ? String(view.title ?? view.path ?? `View ${at + 1}`) : "";
  const details: Json = {
    dashboard: { url_path: urlPath === "lovelace" ? null : urlPath, title: dashTitle },
  };
  if (view) details.view = { path: view.path ?? null, index: at, title: viewTitle };
  if (generated) details.generated = true;
  let ids: string[] = [];
  if (view?.strategy) details.view_generated = true;
  if (view) {
    ids = entityIds(h, view);
  }
  // A generated view's config can still be a strategy that hui-view resolves only as it
  // draws (the home Overview is: its favorites are not in the config hui-root holds), so
  // what is on screen is read from the cards themselves.
  if (generated || view?.strategy || !ids.length) {
    ids = [...new Set([...ids, ...entityIds(h, { cards: renderedCards() })])];
  }
  if (ids.length) {
    details.entities = ids.slice(0, MAX_VIEW_ENTITIES).map((id) => brief(h, id));
    if (ids.length > MAX_VIEW_ENTITIES) details.entities_total = ids.length;
  } else if (generated) {
    details.note = "Generated dashboard; its cards could not be read, so no entities are listed.";
  }
  // A built-in generated panel opens on its first view, which the sidebar names by the
  // panel alone: the Overview's first view is "overview" (seen in the e2e run, 2026.10.2),
  // and "Overview, overview" on the chip says nothing more.
  const sameName = viewTitle.toLowerCase() === dashTitle.toLowerCase();
  const first = !saved && at === 0;
  const name = viewTitle && !sameName && !first ? `${dashTitle}, ${viewTitle}` : dashTitle;
  return { kind: "dashboard", title: `Dashboard ${name}`, summary: name, details };
}

/** The config the open dashboard renders: for a strategy dashboard, the generated one.
 * hui-root holds it for lovelace dashboards and for the built-in generated panels alike
 * (ha-panel-home passes its generated config to hui-root as `lovelace`). */
function renderedConfig(): Json | null {
  for (const tag of ["hui-root", "ha-panel-lovelace"]) {
    const el = deepFind(tag) as (Element & { lovelace?: { config?: Json } }) | null;
    const config = el?.lovelace?.config;
    if (config && typeof config === "object") return config;
  }
  return null;
}

/** The configs of the cards and badges drawn on the open view, through shadow roots:
 * hui-card and hui-heading-badge keep theirs in `config`, the card elements themselves
 * (hui-tile-card and the rest) in `_config` (property names from the 2026.10.2 build).
 * A card hidden by a visibility condition is skipped with everything inside it, and
 * other views are not in the page at all (hui-root draws only the open one). */
function renderedCards(): Json[] {
  const root = deepFind("hui-root");
  if (!root) return [];
  const out: Json[] = [];
  const queue: (Element | ShadowRoot)[] = [root];
  let visited = 0;
  while (queue.length && visited++ < 20000) {
    const node = queue.shift()!;
    if (node instanceof Element && /^HUI-.*(CARD|BADGE)$/.test(node.tagName)) {
      const el = node as Element & { config?: unknown; _config?: unknown };
      const config = el.config ?? el._config;
      // hui-card hides a card with the hidden attribute; a box test would also drop
      // wrappers drawn with display: contents, which have no box of their own
      const shown = !node.hasAttribute("hidden") && getComputedStyle(node).display !== "none";
      if (shown && config && typeof config === "object") out.push(config as Json);
      if (!shown) continue;
    }
    const sr = node instanceof Element ? node.shadowRoot : null;
    if (sr) queue.push(sr);
    for (const child of node.children) queue.push(child);
  }
  return out;
}

/** Every entity a view shows, in order, once each: cards, stacks, grids, sections,
 * badges, entity rows, picture elements and custom cards, by walking every object for
 * `entity`, `entities` and `entity_id` keys. Only ids Home Assistant has a state for
 * count, so a template or a typo is not reported as an entity. */
function entityIds(h: PageHass, view: Json): string[] {
  const found = new Set<string>();
  const add = (v: unknown) => {
    if (typeof v === "string" && h.states?.[v]) found.add(v);
  };
  const walk = (node: unknown, depth: number) => {
    if (depth > 25 || node === null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const item of node) walk(item, depth + 1);
      return;
    }
    for (const [key, value] of Object.entries(node as Json)) {
      if (key === "entity" || key === "entity_id") {
        if (Array.isArray(value)) value.forEach(add);
        else add(value);
      } else if (key === "entities" && Array.isArray(value)) {
        for (const e of value) typeof e === "string" ? add(e) : walk(e, depth + 1);
        continue;
      }
      walk(value, depth + 1);
    }
  };
  walk(view, 0);
  return [...found];
}

// ---- editors ---------------------------------------------------------------------------

const EDITOR_TAGS = {
  automation: "ha-automation-editor",
  script: "ha-script-editor",
  scene: "ha-scene-editor",
} as const;

function editor(
  h: PageHass,
  kind: "automation" | "script" | "scene",
  mode: string,
  id: string,
): Omit<PageContext, "path"> {
  const el = deepFind(EDITOR_TAGS[kind]) as
    | (Element & { config?: Json; _config?: Json; dirty?: boolean; _dirty?: boolean })
    | null;
  const config = el?.config ?? el?._config;
  const isNew = id === "new";
  // The saved one's entity says its alias when the editor's config is not readable.
  const entity = isNew
    ? undefined
    : Object.values(h.states ?? {}).find(
        (s) =>
          s.entity_id.startsWith(`${kind}.`) &&
          (String(s.attributes.id ?? "") === id || s.entity_id === `${kind}.${id}`),
      );
  const alias = String(
    config?.alias ?? entity?.attributes.friendly_name ?? (isNew ? "New " + kind : id),
  );
  const details: Json = { id: isNew ? null : id, alias, new: isNew };
  if (entity) details.entity_id = entity.entity_id;
  if (mode !== "edit") details.view = mode; // trace, for example
  const dirty = el?.dirty ?? el?._dirty;
  if (typeof dirty === "boolean") details.unsaved_changes = dirty;
  const label = kind[0].toUpperCase() + kind.slice(1);
  return { kind, title: `${label}: ${alias}`, summary: alias, details };
}

// ---- registries --------------------------------------------------------------------------

function device(h: PageHass, id: string): Omit<PageContext, "path"> {
  const d = h.devices?.[id];
  const name = d?.name_by_user || d?.name || id;
  const ids = Object.values(h.entities ?? {})
    .filter((e) => e.device_id === id)
    .map((e) => e.entity_id);
  const details: Json = {
    device: {
      id,
      name,
      manufacturer: d?.manufacturer ?? null,
      model: d?.model ?? null,
      area: d?.area_id ? (h.areas?.[d.area_id]?.name ?? d.area_id) : null,
    },
    entities: ids.slice(0, MAX_DEVICE_ENTITIES).map((e) => brief(h, e)),
  };
  if (ids.length > MAX_DEVICE_ENTITIES) details.entities_total = ids.length;
  return { kind: "device", title: `Device: ${name}`, summary: name, details };
}

function area(h: PageHass, id: string): Omit<PageContext, "path"> {
  const name = h.areas?.[id]?.name ?? id;
  const devices = Object.values(h.devices ?? {}).filter((d) => d.area_id === id);
  const inArea = new Set(devices.map((d) => d.id));
  // An entity is in the area by its own setting, or through its device when it has none.
  const ids = Object.values(h.entities ?? {})
    .filter((e) => e.area_id === id || (!e.area_id && e.device_id && inArea.has(e.device_id)))
    .map((e) => e.entity_id);
  const details: Json = {
    area: { id, name },
    devices: devices
      .slice(0, MAX_AREA_ITEMS)
      .map((d) => ({ id: d.id, name: d.name_by_user || d.name || d.id })),
    entities: ids.slice(0, MAX_AREA_ITEMS).map((e) => brief(h, e)),
  };
  if (devices.length > MAX_AREA_ITEMS) details.devices_total = devices.length;
  if (ids.length > MAX_AREA_ITEMS) details.entities_total = ids.length;
  return { kind: "area", title: `Area: ${name}`, summary: name, details };
}

async function integration(h: PageHass, domain: string): Promise<Omit<PageContext, "path">> {
  const details: Json = { domain };
  try {
    // admin only; a household member gets the domain alone
    const entries = await h.connection.sendMessagePromise<
      { entry_id: string; title: string; state: string }[]
    >({ type: "config_entries/get", domain });
    details.entries = entries.map((e) => ({ title: e.title, state: e.state }));
  } catch {
    /* left out */
  }
  return { kind: "integration", title: `Integration: ${domain}`, summary: domain, details };
}

function timeline(
  h: PageHass,
  kind: "history" | "logbook",
  query: URLSearchParams,
): Omit<PageContext, "path"> {
  const ids = (query.get("entity_id") ?? "").split(",").filter(Boolean);
  const details: Json = {
    entity_ids: ids,
    start: query.get("start_date"),
    end: query.get("end_date"),
  };
  const names = ids.map((id) => String(h.states?.[id]?.attributes.friendly_name ?? id));
  const label = kind === "history" ? "History" : "Logbook";
  const summary = names.length ? `${label}: ${names.slice(0, 3).join(", ")}` : label;
  return { kind, title: summary, summary, details };
}

function tools(tab: string): Omit<PageContext, "path"> {
  const name = tab || "yaml";
  const details: Json = { tab: name };
  if (name === "template") {
    const el = deepFind("tools-template") as (Element & { _template?: unknown }) | null;
    let text = typeof el?._template === "string" ? el._template : undefined;
    if (text === undefined) {
      // where the editor keeps it between visits, read when the element is not
      try {
        text = localStorage.getItem("panel-dev-template-template") ?? undefined;
      } catch {
        /* storage blocked */
      }
    }
    if (text !== undefined) {
      details.template = text.slice(0, MAX_TEMPLATE);
      if (text.length > MAX_TEMPLATE) details.template_length = text.length;
    }
  }
  const title = `Developer tools: ${name}`;
  return { kind: "developer-tools", title, summary: title, details };
}

// ---- entities --------------------------------------------------------------------------

function friendly(h: PageHass, id: string): string {
  const s = h.states?.[id];
  return String(s?.attributes.friendly_name ?? h.entities?.[id]?.name ?? id);
}

/** An entity in a list: enough to act on without a search. */
function brief(h: PageHass, id: string): Json {
  const s = h.states?.[id];
  const out: Json = { entity_id: id, name: friendly(h, id), state: s?.state ?? null };
  const unit = s?.attributes.unit_of_measurement;
  if (unit) out.unit = unit;
  return out;
}

/** The entity of an open more-info dialog, with its attributes. */
function entityFacts(h: PageHass, id: string): Json {
  const s = h.states![id];
  const attributes: Json = {};
  let count = 0;
  for (const [key, value] of Object.entries(s.attributes)) {
    if (SECRET_ATTRIBUTES.has(key) || key === "friendly_name") continue;
    if (++count > MAX_ATTRIBUTES) break;
    const raw = JSON.stringify(value) ?? "";
    attributes[key] =
      raw.length > MAX_ATTRIBUTE_CHARS ? `${raw.slice(0, MAX_ATTRIBUTE_CHARS)} (cut)` : value;
  }
  const total = Object.keys(s.attributes).length;
  const out: Json = { entity_id: id, name: friendly(h, id), state: s.state, attributes };
  if (count > MAX_ATTRIBUTES) out.attributes_total = total;
  return out;
}

function moreInfoEntity(): string | null {
  const el = deepFind("ha-more-info-dialog") as
    | (Element & { _entityId?: unknown; _open?: unknown })
    | null;
  if (!el || el._open === false) return null;
  return typeof el._entityId === "string" && el._entityId ? el._entityId : null;
}

// ---- reading the screen ----------------------------------------------------------------

/** The first element matching `selector`, searching through shadow roots from
 * home-assistant down. Breadth first, so the outer panel is found before anything
 * nested in a card. */
function deepFind(selector: string): Element | null {
  const start = document.querySelector("home-assistant");
  if (!start) return document.querySelector(selector);
  const queue: (Element | ShadowRoot)[] = [start];
  let visited = 0;
  while (queue.length && visited++ < 20000) {
    const node = queue.shift()!;
    if (node instanceof Element && node.matches(selector)) return node;
    const root = node instanceof Element ? node.shadowRoot : null;
    if (root) queue.push(root);
    for (const child of node.children) {
      if (!child.tagName.startsWith("LLM-AGENT")) queue.push(child);
    }
  }
  return null;
}

function pageTitle(): string {
  // "Settings - Home Assistant" style titles: the part before the product name
  // HA joins them with an en dash ("Overview \u2013 Home Assistant")
  const t = document.title.replace(/\s*[-|\u2013\u2014]\s*Home Assistant\s*$/i, "").trim();
  return t || location.pathname;
}

/** The visible text of the current panel, through shadow roots and slots, at most
 * MAX_TEXT characters. */
function pageText(): string | undefined {
  const root = deepFind("partial-panel-resolver");
  if (!root) return undefined;
  const pieces: string[] = [];
  let length = 0;
  const visit = (node: Node) => {
    if (length >= MAX_TEXT) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? "").replace(/\s+/g, " ").trim();
      if (text) {
        pieces.push(text);
        length += text.length + 1;
      }
      return;
    }
    if (!(node instanceof Element)) {
      if (node instanceof ShadowRoot || node instanceof DocumentFragment)
        node.childNodes.forEach(visit);
      return;
    }
    const tag = node.tagName;
    if (SKIP_TAGS.has(tag) || tag.startsWith("LLM-AGENT")) return;
    if (node.getAttribute("aria-hidden") === "true") return;
    if (
      typeof node.checkVisibility === "function" &&
      !node.checkVisibility({ checkVisibilityCSS: true } as CheckVisibilityOptions)
    )
      return;
    if (tag === "SLOT") {
      (node as HTMLSlotElement).assignedNodes({ flatten: true }).forEach(visit);
      return;
    }
    // A shadow root renders instead of the light children; those that show come
    // back through its slots.
    if (node.shadowRoot) visit(node.shadowRoot);
    else node.childNodes.forEach(visit);
  };
  visit(root);
  const text = pieces.join("\n").slice(0, MAX_TEXT);
  return text || undefined;
}

// ---- the selection ---------------------------------------------------------------------

let remembered = "";
let watching = false;

function insideChat(): boolean {
  let el: Element | null = document.activeElement;
  while (el) {
    if (el.tagName.startsWith("LLM-AGENT")) return true;
    el = el.shadowRoot?.activeElement ?? null;
  }
  return false;
}

/** Selected text on the page, through shadow roots where the browser can. */
function liveSelection(): string {
  const plain = document.getSelection()?.toString().trim() ?? "";
  if (plain) return plain;
  // Chromium only: each shadow root reports its own selection.
  const start = document.querySelector("home-assistant");
  if (!start) return "";
  const stack: Element[] = [start];
  let visited = 0;
  while (stack.length && visited++ < 20000) {
    const el = stack.pop()!;
    if (el.tagName.startsWith("LLM-AGENT")) continue;
    const root = el.shadowRoot as (ShadowRoot & { getSelection?: () => Selection | null }) | null;
    if (root) {
      const text = root.getSelection?.()?.toString().trim();
      if (text) return text;
      stack.push(...root.children);
    }
    stack.push(...el.children);
  }
  return "";
}

function watchSelection(): void {
  if (watching) return;
  watching = true;
  document.addEventListener("selectionchange", () => {
    // Typing or clicking in the chat moves the selection there; the page's selection
    // is what the person meant, so keep it.
    if (insideChat()) return;
    remembered = liveSelection().slice(0, MAX_SELECTION);
  });
  remembered = liveSelection().slice(0, MAX_SELECTION);
}

// ---- size --------------------------------------------------------------------------------

const encoder = new TextEncoder();
const bytes = (v: unknown) => encoder.encode(JSON.stringify(v)).length;

/** The longest list in the details (to two levels deep), with the object holding it. */
function longestList(details: Json): { owner: Json; key: string } | null {
  let best: { owner: Json; key: string; size: number } | null = null;
  const consider = (owner: Json, depth: number) => {
    for (const [key, value] of Object.entries(owner)) {
      if (Array.isArray(value) && value.length > 1) {
        const size = bytes(value);
        if (!best || size > best.size) best = { owner, key, size };
      } else if (depth < 2 && value && typeof value === "object" && !Array.isArray(value)) {
        consider(value as Json, depth + 1);
      }
    }
  };
  consider(details, 0);
  return best;
}

/** Keep the details under 8 KB and the whole page under the server's limit: halve the
 * longest list until it fits, saying how many there were; then cut the page text. */
function fit(page: PageContext): PageContext {
  const details = page.details;
  for (let i = 0; i < 40 && bytes(details) > MAX_DETAILS; i++) {
    const list = longestList(details);
    if (!list) break;
    const items = list.owner[list.key] as unknown[];
    const totalKey = `${list.key}_total`;
    if (list.owner[totalKey] === undefined) list.owner[totalKey] = items.length;
    list.owner[list.key] = items.slice(0, Math.floor(items.length / 2));
    list.owner[`${list.key}_trimmed`] = true;
  }
  if (bytes(details) > MAX_DETAILS) {
    // nothing left to halve: one huge value (a template, an attribute). Say so plainly.
    page.details = {
      trimmed: true,
      note: "The page details were too large to send.",
      narrow: details.narrow,
      selection: details.selection,
    };
  }
  while (page.text && bytes(page) > MAX_TOTAL) {
    page.text = page.text.slice(0, Math.floor(page.text.length * 0.75));
  }
  if (bytes(page) > MAX_TOTAL) delete page.text;
  return page;
}
