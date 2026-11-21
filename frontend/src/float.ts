// The chat button on every Home Assistant page. HA loads this file on every page
// (frontend.add_extra_js_url in __init__.py), so it stays small: it draws one button and
// loads the window and the 100 kB panel (llm-agent-float-window.js) only on first open.
// Plain DOM, no framework: the panel's Solid runtime alone is about 15 kB gzipped, more
// than three times this whole file.
//
// Who sees it: whoever HA sends the llm-agent panel to (hass.panels), which is the
// sidebar rule (admins, and everyone while household chat is on), read from HA rather
// than copied, so the two cannot drift apart.

const TAG = "llm-agent-float";
const PANEL_PATH = "/llm-agent";
const KEY = "llm-agent-float";
// Distance from the corner, as HA keeps its own floating buttons.
const GAP = 16;

interface Hass {
  panels?: Record<string, unknown>;
  connection?: {
    subscribeMessage(cb: (msg: { change_type: string; item: { url: string } }) => void, m: object): Promise<unknown>;
  };
}

/** The window, from llm-agent-float-window.js. */
interface FloatWindow {
  el: HTMLElement;
  show(state: "open" | "min"): void;
  hide(): void;
  navigated(): void;
}

const hassNow = (): Hass | undefined =>
  (document.querySelector("home-assistant") as (Element & { hass?: Hass }) | null)?.hass;

/** The open state saved by the window: "open", "min" or "closed". */
function savedState(): string {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}").state ?? "closed";
  } catch {
    return "closed";
  }
}

// Things HA draws in the bottom right corner that the button must not cover: a page's
// floating action button ("Add integration") and the tab bar narrow config pages put at
// the bottom. Found by what is under the button, so a page HA adds later is covered too.
const BLOCKER = (el: Element): boolean =>
  el.localName === "ha-fab" ||
  el.getAttribute("slot") === "fab" ||
  el.id === "fab" ||
  el.id === "tabbar";

/** The element under a point, looking inside shadow roots (HA is shadow DOM all the way
 * down, and document.elementFromPoint stops at the first host). */
function deepAt(x: number, y: number): Element | null {
  let el = document.elementFromPoint(x, y);
  while (el?.shadowRoot) {
    const inner = el.shadowRoot.elementFromPoint(x, y);
    if (!inner || inner === el) break;
    el = inner;
  }
  return el;
}

/** The first blocker among `el` and its ancestors, crossing out of shadow roots. */
function blockerOf(el: Element | null): Element | null {
  while (el) {
    if (BLOCKER(el)) return el;
    el = el.parentElement ?? ((el.getRootNode() as ShadowRoot).host || null);
  }
  return null;
}

class LlmAgentFloat extends HTMLElement {
  #root = this.attachShadow({ mode: "open" });
  #button: HTMLButtonElement;
  #win?: FloatWindow;
  #loading = false;
  // the integration turned the button off while this page was open (see __init__.py)
  #removed = false;
  #subscribed?: Hass["connection"];
  #state = savedState();

  constructor() {
    super();
    this.#root.innerHTML = `<style>
      :host { position: fixed; z-index: 5; inset: auto 0 0 auto; pointer-events: none; }
      /* by class: the window is appended to this same shadow root, with buttons of its own */
      .fab {
        pointer-events: auto; position: fixed; width: 56px; height: 56px; border-radius: 50%;
        right: calc(${GAP}px + var(--safe-area-inset-right, 0px));
        bottom: calc(var(--lift, ${GAP}px) + var(--safe-area-inset-bottom, 0px));
        border: none; cursor: pointer; display: grid; place-items: center;
        background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff);
        box-shadow: 0 2px 6px rgba(0,0,0,.2), 0 8px 24px rgba(0,0,0,.18);
        --mdc-icon-size: 26px;
      }
      .fab:focus-visible { outline: 3px solid color-mix(in srgb, var(--primary-color, #03a9f4) 45%, transparent); outline-offset: 2px; }
      [hidden] { display: none !important; }
    </style><button class="fab" part="button" aria-label="LLM Agent" title="LLM Agent" hidden><ha-icon icon="mdi:robot-outline"></ha-icon></button>`;
    this.#button = this.#root.querySelector(".fab")!;
    this.#button.addEventListener("click", () => void this.open("open"));
  }

  connectedCallback(): void {
    const changed = (): void => {
      this.#update();
      this.#win?.navigated();
    };
    window.addEventListener("location-changed", changed);
    window.addEventListener("popstate", changed);
    window.addEventListener("resize", () => this.#lift());
    // HA swaps the hass object and the panel list without an event this file can hear
    // while the window is shut; once a second is cheap and nobody waits on it.
    setInterval(() => this.#update(), 1000);
    this.#update();
  }

  /** Open or minimize the window, loading it the first time. */
  async open(state: "open" | "min"): Promise<void> {
    this.#state = state;
    if (!this.#win) {
      if (this.#loading) return;
      this.#loading = true;
      try {
        // next to this file, with its ?v=<version> so an update is never served stale
        const here = new URL(import.meta.url);
        const mod = await import(/* @vite-ignore */ new URL(`llm-agent-float-window.js${here.search}`, here).href);
        this.#win = mod.createWindow({
          hass: hassNow,
          onState: (s: string) => {
            this.#state = s;
            this.#update();
          },
        }) as FloatWindow;
        this.#root.append(this.#win.el);
      } finally {
        this.#loading = false;
      }
    }
    this.#update();
  }

  #update(): void {
    const hass = hassNow();
    if (hass?.connection && this.#subscribed !== hass.connection) {
      this.#subscribed = hass.connection;
      // HA tells open pages when the integration adds or removes this file
      void hass.connection
        .subscribeMessage(
          (msg) => {
            if (!new URL(msg.item.url, location.href).pathname.endsWith(`/${TAG}.js`)) return;
            this.#removed = msg.change_type === "removed";
            this.#update();
          },
          { type: "frontend/subscribe_extra_js" },
        )
        .catch(() => undefined);
    }
    const path = location.pathname;
    const allowed = !!hass?.panels?.["llm-agent"] && !this.#removed;
    // on the panel itself the chat is already the whole page
    const here = allowed && path !== PANEL_PATH && !path.startsWith(`${PANEL_PATH}/`);
    const shut = this.#state !== "open" && this.#state !== "min";
    if (here && !shut && !this.#win && !this.#loading) void this.open(this.#state as "open" | "min");
    if (this.#win) {
      if (here && !shut) this.#win.show(this.#state as "open" | "min");
      else this.#win.hide();
    }
    const show = here && (shut || !this.#win);
    this.#button.hidden = !show;
    // pages draw their corner buttons late, so this runs on every tick, not once per page
    if (show) this.#lift();
  }

  /** Raise the button above whatever HA keeps in the corner on this page. */
  #lift(): void {
    if (this.#button.hidden) return;
    const b = this.#button;
    b.style.pointerEvents = "none"; // let the probe see what is under it
    let lift = GAP;
    for (let i = 0; i < 3; i++) {
      b.style.setProperty("--lift", `${lift}px`);
      const r = b.getBoundingClientRect();
      const under = blockerOf(deepAt(r.left + r.width / 2, r.top + r.height / 2));
      if (!under) break;
      lift = Math.max(lift, Math.round(innerHeight - under.getBoundingClientRect().top + GAP / 2));
    }
    b.style.removeProperty("pointer-events");
  }
}

// HA loads the file again after an update, under a new ?v=: one button per page.
if (!customElements.get(TAG)) {
  customElements.define(TAG, LlmAgentFloat);
  document.body.append(document.createElement(TAG));
}
