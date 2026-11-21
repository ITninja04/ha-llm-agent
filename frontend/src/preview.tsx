// Renders a proposed dashboard with Home Assistant's own cards, before it is saved.
// Only built-in cards that draw the home's entities are rendered. Anything that could
// load an address chosen by the proposal or run code (add-on cards, templates, pictures,
// markdown, maps, web pages, style overrides) is listed as not shown, so a proposal
// can't make the browser fetch or run anything before it is approved.
// The cards are Home Assistant's own elements and draw entity state, so unlike the
// panel's views this one hands them the whole hass on every change, as HA does.
import { For, Show, createEffect, createSignal } from "solid-js";
import { define, sheet, type Props } from "./element";
import { t } from "./i18n";

type Card = Record<string, unknown>;
interface View {
  title?: string;
  path?: string;
  cards?: Card[];
  sections?: { cards?: Card[] }[];
}
interface CardHelpers {
  createCardElement(config: Card): HTMLElement & { hass?: unknown };
}
declare global {
  interface Window {
    loadCardHelpers?: () => Promise<CardHelpers>;
  }
}

// Built-in cards that draw entities only. Stacks are checked card by card.
const SAFE_CARDS = new Set([
  "alarm-panel",
  "button",
  "calendar",
  "entities",
  "entity",
  "gauge",
  "glance",
  "heading",
  "history-graph",
  "humidifier",
  "light",
  "logbook",
  "sensor",
  "statistic",
  "statistics-graph",
  "thermostat",
  "tile",
  "todo-list",
]);
const STACKS = new Set(["horizontal-stack", "vertical-stack", "grid"]);
const SAFE_ROWS = new Set(["section", "divider"]);
// Text that could point somewhere or be evaluated: addresses, CSS url(), templates
// (Jinja and add-on JavaScript), HTML, add-on element names, and backslash escapes that
// could spell any of these in CSS.
const UNSAFE_TEXT = /\\|\/\/|url\s*\(|\{\{|\{%|\[\[\[|<|custom:|javascript:|data:/i;
const UNSAFE_KEYS = new Set(["card_mod", "style", "image", "image_entity", "camera_image"]);

function safeValue(value: unknown, depth = 0): boolean {
  if (depth > 20) return false;
  if (typeof value === "string") return !UNSAFE_TEXT.test(value);
  if (Array.isArray(value)) return value.every((v) => safeValue(v, depth + 1));
  if (value && typeof value === "object") {
    return Object.entries(value).every(
      ([k, v]) => !UNSAFE_KEYS.has(k) && !UNSAFE_TEXT.test(k) && safeValue(v, depth + 1),
    );
  }
  return true;
}

export function viewCards(view: View): Card[] {
  const cards = [...(view.cards ?? [])];
  for (const section of view.sections ?? []) cards.push(...(section.cards ?? []));
  return cards.filter((c) => c && typeof c === "object");
}

// Home Assistant defines loadCardHelpers once its dashboard code has loaded. When the
// panel is opened directly, that hasn't happened yet, so ask the frontend's own panel
// resolver to load the dashboard panel (nothing is shown or navigated).
async function cardHelpers(): Promise<CardHelpers | undefined> {
  if (!window.loadCardHelpers) {
    try {
      type Resolver = HTMLElement & {
        hass?: unknown;
        _updateRoutes?: () => void;
        routerOptions?: { routes?: Record<string, { load?: () => Promise<unknown> }> };
      };
      const resolver = document.createElement("partial-panel-resolver") as Resolver;
      resolver.hass = { panels: [{ url_path: "llm-preview", component_name: "lovelace" }] };
      resolver._updateRoutes?.();
      await resolver.routerOptions?.routes?.["llm-preview"]?.load?.();
    } catch {
      // fall through: the preview reports that it isn't available
    }
  }
  for (let i = 0; i < 50 && !window.loadCardHelpers; i++) {
    await new Promise((r) => setTimeout(r, 100));
  }
  return window.loadCardHelpers?.();
}

export function previewable(card: Card, depth = 0): boolean {
  if (!card || typeof card !== "object" || depth > 5) return false;
  const type = card.type;
  if (typeof type !== "string") return false;
  if (STACKS.has(type)) {
    const { cards, ...rest } = card;
    return (
      Array.isArray(cards) &&
      cards.every((c) => previewable(c as Card, depth + 1)) &&
      safeValue(rest)
    );
  }
  if (!SAFE_CARDS.has(type)) return false;
  const rows = card.entities;
  if (
    Array.isArray(rows) &&
    !rows.every(
      (r) =>
        typeof r === "string" ||
        (r && typeof r === "object" && (!("type" in r) || SAFE_ROWS.has(String(r.type)))),
    )
  ) {
    return false;
  }
  return safeValue(card);
}

const css = sheet(`
    :host {
      display: block;
      padding: 8px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 8px;
      pointer-events: none; /* a preview, not a remote control */
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;
    }
    .tabs button {
      font: inherit;
      border: 1px solid var(--divider-color);
      background: none;
      color: inherit;
      border-radius: 12px;
      padding: 2px 10px;
      cursor: pointer;
    }
    .tabs button.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color);
    }
    .note {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      margin: 6px 0;
    }
  `);

type CardEl = HTMLElement & { hass?: unknown };
interface Built {
  cards: CardEl[];
  skipped: number;
  error: string;
}

function DashboardPreview(props: Props<{ hass: unknown; config: { views?: View[] } }>) {
  const [view, setView] = createSignal(0);
  const [built, setBuilt] = createSignal<Built>({ cards: [], skipped: 0, error: "" });
  const views = (): View[] => {
    const c = props.config();
    return Array.isArray(c?.views) ? c!.views! : [];
  };
  let gen = 0;

  async function build(v: View | undefined): Promise<Built> {
    const out: Built = { cards: [], skipped: 0, error: "" };
    if (!v) return out;
    try {
      const helpers = await cardHelpers();
      if (!helpers) throw new Error("card helpers aren't available");
      for (const config of viewCards(v).slice(0, 40)) {
        if (!previewable(config)) {
          out.skipped++;
          continue;
        }
        const el = helpers.createCardElement(config);
        el.hass = props.hass();
        out.cards.push(el);
      }
    } catch (err) {
      out.error = t("preview_unavailable", { error: (err as Error).message });
    }
    return out;
  }

  // Rebuilt when the proposal or the chosen view changes; a slower older build must not
  // replace a newer one.
  createEffect(
    () => views()[view()],
    (v) => {
      const mine = ++gen;
      void build(v).then((b) => mine === gen && setBuilt(b));
    },
  );
  // every hass goes to every card, the way a dashboard feeds its cards
  createEffect(
    () => [props.hass(), built().cards] as const,
    ([hass, cards]) => {
      for (const card of cards) card.hass = hass;
    },
  );

  return (
    <Show when={views().length} fallback={<p class="note">{t("preview_no_views")}</p>}>
      <Show when={views().length > 1}>
        <div class="tabs">
          <For each={views()}>
            {(v, i) => (
              <button class={i() === view() ? "on" : ""} onClick={() => setView(i())}>
                {v.title || v.path || t("preview_view", { n: i() + 1 })}
              </button>
            )}
          </For>
        </div>
      </Show>
      <Show when={built().error}>
        <p class="note">{built().error}</p>
      </Show>
      <div class="grid" inert>
        {built().cards}
      </div>
      <Show when={built().skipped}>
        <p class="note">
          {built().skipped > 1 ? t("preview_skipped_n", { count: built().skipped }) : t("preview_skipped_one")}
        </p>
      </Show>
    </Show>
  );
}

define<{ hass: unknown; config: { views?: View[] } }>("llm-dashboard-preview", {
  props: ["hass", "config"],
  styles: () => [css],
  view: (p) => <DashboardPreview {...p} />,
});
