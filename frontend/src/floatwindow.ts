// The floating chat window: the real panel element in embedded mode, in a window that
// can be dragged, resized, minimized and closed, on top of whatever HA page is open.
// Loaded by float.ts on first open, so pages that never open the chat never fetch it.
// The page collector comes from the panel bundle's export, not a second copy in this
// file, so a page is described the same way wherever the chat runs.
// It keeps one panel element for the life of the page and only hides it, so closing
// and reopening, or moving between HA pages, never restarts a reply or loses a draft.
import type { PageContext } from "./pagecontext";
import { pickLanguage } from "./i18n";
import type { Hass } from "./types";

const KEY = "llm-agent-float";
// Phones get a sheet instead of a window (the brief's breakpoint, also HA's dialogs').
const PHONE = 600;
const MIN_W = 320;
const MIN_H = 360;
const MARGIN = 8;

type State = "open" | "min" | "closed";
interface Saved {
  x?: number;
  y?: number;
  w: number;
  h: number;
  state: State;
}

interface Panel extends HTMLElement {
  hass?: Hass;
  embedded: boolean;
  pageContext?: PageContext;
}

function load(): Saved {
  const base: Saved = { w: 420, h: 620, state: "closed" };
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    for (const k of ["x", "y", "w", "h"] as const)
      if (typeof s[k] === "number" && Number.isFinite(s[k])) base[k] = s[k];
    if (["open", "min", "closed"].includes(s.state)) base.state = s.state;
  } catch {
    // private window or blocked storage: start from the defaults every time
  }
  return base;
}

function save(s: Saved): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // as above: the window still works, it just forgets
  }
}

const CSS = `
  .win {
    --w-bg: var(--card-background-color, #fff);
    --w-text: var(--primary-text-color, #1f2328);
    --w-muted: var(--secondary-text-color, #656d76);
    --w-line: var(--divider-color, rgba(127,127,127,.2));
    --w-hover: color-mix(in srgb, var(--w-text) 8%, transparent);
    position: fixed; z-index: 5; display: flex; flex-direction: column;
    background: var(--w-bg); color: var(--w-text); border: 1px solid var(--w-line);
    border-radius: 14px; overflow: hidden; pointer-events: auto;
    box-shadow: 0 2px 8px rgba(0,0,0,.12), 0 18px 48px rgba(0,0,0,.24);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  /* the panel's own explicit themes, so the frame matches what is inside it */
  .win[data-theme="light"] { --w-bg: #ffffff; --w-text: #1f2328; --w-muted: #667080; --w-line: rgba(15,23,42,.09); color-scheme: light; }
  .win[data-theme="dark"] { --w-bg: #171a1f; --w-text: #e7e9ec; --w-muted: #949ba5; --w-line: rgba(255,255,255,.08); color-scheme: dark; }
  .bar {
    display: flex; align-items: center; gap: 2px; height: 40px; flex: none;
    padding: 0 4px 0 12px; border-bottom: 1px solid var(--w-line);
    cursor: grab; user-select: none; touch-action: none;
  }
  .win.dragging .bar { cursor: grabbing; }
  .bar .name { flex: 1; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; min-width: 0; }
  .bar .name ha-icon { --mdc-icon-size: 18px; color: var(--primary-color, #03a9f4); }
  .bar button {
    width: 32px; height: 32px; border: none; border-radius: 8px; background: none;
    color: var(--w-muted); cursor: pointer; display: grid; place-items: center; --mdc-icon-size: 18px;
  }
  .bar button:hover { background: var(--w-hover); color: var(--w-text); }
  .bar button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); }
  .body { flex: 1; min-height: 0; position: relative; }
  .body > llm-agent-panel { position: absolute; inset: 0; }
  .win.min { height: auto !important; }
  .win.min .body, .win.min .grip { display: none; }
  .grip {
    position: absolute; right: 0; bottom: 0; width: 18px; height: 18px; cursor: nwse-resize;
    touch-action: none; z-index: 4;
    background: linear-gradient(135deg, transparent 50%, var(--w-line) 50%, var(--w-line) 60%, transparent 60%, transparent 70%, var(--w-line) 70%, var(--w-line) 80%, transparent 80%);
  }
  .win.sheet {
    left: 0 !important; right: 0; top: auto !important; bottom: 0; width: auto !important;
    height: calc(100% - 56px - var(--safe-area-inset-top, 0px)) !important;
    border-radius: 16px 16px 0 0; border-bottom: none;
    padding-bottom: var(--safe-area-inset-bottom, 0px);
  }
  .win.sheet.min { height: auto !important; }
  .win.sheet .bar { cursor: default; }
  .win.sheet .grip { display: none; }
  [hidden] { display: none !important; }
`;

const ICON = {
  min: "mdi:window-minimize",
  restore: "mdi:window-restore",
  full: "mdi:open-in-new",
  close: "mdi:close",
};

export function createWindow(opts: {
  hass: () => Hass | undefined;
  onState: (state: State) => void;
}): { el: HTMLElement; show(state: "open" | "min"): void; hide(): void; navigated(): void } {
  const saved = load();
  const el = document.createElement("div");
  el.innerHTML = `<style>${CSS}</style>
    <div class="win" role="dialog" aria-label="LLM Agent" hidden>
      <div class="bar">
        <div class="name"><ha-icon icon="mdi:robot-outline"></ha-icon><span>LLM Agent</span></div>
        <button class="min"><ha-icon icon="${ICON.min}"></ha-icon></button>
        <button class="full"><ha-icon icon="${ICON.full}"></ha-icon></button>
        <button class="close"><ha-icon icon="${ICON.close}"></ha-icon></button>
      </div>
      <div class="body"></div>
      <div class="grip" role="separator"></div>
    </div>`;
  const win = el.querySelector<HTMLElement>(".win")!;
  const bar = el.querySelector<HTMLElement>(".bar")!;
  const body = el.querySelector<HTMLElement>(".body")!;
  const grip = el.querySelector<HTMLElement>(".grip")!;
  const btn = (c: string) => el.querySelector<HTMLButtonElement>(`.bar .${c}`)!;
  let panel: Panel | undefined;
  let state: State = "closed";
  let visible = false;
  let lastHass: Hass | undefined;
  let frame = 0;
  let ctxGen = 0;
  let ctxTimer = 0;
  let collect: ((hass: Hass) => Promise<PageContext>) | undefined;

  /** Titles and screen reader names; the minimize button's follows its state. */
  function label(): void {
    const min = btn("min");
    void labels(opts.hass(), (k, text) => {
      const b = k === "grip" ? grip : k === "min" || k === "restore" ? min : btn(k);
      if (b === min && k !== min.dataset.key) return;
      b.title = text;
      b.setAttribute("aria-label", text);
    });
  }

  const phone = () => innerWidth < PHONE;

  /** Keep the window on screen: a saved spot from a wider screen, or a shrunk viewport,
   * must never leave the title bar out of reach. */
  function place(): void {
    win.classList.toggle("sheet", phone());
    if (phone()) return;
    const w = Math.min(Math.max(saved.w, MIN_W), innerWidth - 2 * MARGIN);
    const h = Math.min(Math.max(saved.h, MIN_H), innerHeight - 2 * MARGIN);
    const x = saved.x ?? innerWidth - w - 24;
    const y = saved.y ?? innerHeight - h - 24;
    win.style.width = `${w}px`;
    win.style.height = `${h}px`;
    win.style.left = `${Math.min(Math.max(x, MARGIN), innerWidth - w - MARGIN)}px`;
    // the title bar stays on screen even when a minimized window was dragged low
    win.style.top = `${Math.min(Math.max(y, MARGIN), innerHeight - 40 - MARGIN)}px`;
  }

  function setState(next: State): void {
    state = next;
    saved.state = next;
    save(saved);
    opts.onState(next);
  }

  /** HA makes a new hass object on every state change; the panel needs each one (its @
   * list, its language). There is no event for it, so look once a frame while shown. */
  function tick(): void {
    const h = opts.hass();
    if (panel && h && h !== lastHass) {
      lastHass = h;
      panel.hass = h;
    }
    frame = visible ? requestAnimationFrame(tick) : 0;
  }

  /** What page the person is on, for the panel to offer with the next message. HA
   * draws the new page after the navigation event, so wait a moment before reading it. */
  function refreshContext(): void {
    clearTimeout(ctxTimer);
    ctxTimer = window.setTimeout(async () => {
      const h = opts.hass();
      if (!panel || !collect || !h || !visible) return;
      const gen = ++ctxGen;
      try {
        const ctx = await collect(h);
        if (gen === ctxGen && panel) panel.pageContext = ctx;
      } catch {
        // a page the collector cannot read keeps the last context rather than none
      }
    }, 300);
  }

  async function ensurePanel(): Promise<void> {
    if (panel) return;
    const here = new URL(import.meta.url);
    const mod = await import(/* @vite-ignore */ new URL(`llm-agent-panel.js${here.search}`, here).href);
    collect = mod.collectPageContext;
    if (panel) return;
    panel = document.createElement("llm-agent-panel") as Panel;
    panel.embedded = true;
    lastHass = opts.hass();
    if (lastHass) panel.hass = lastHass;
    body.append(panel);
    // the panel sets data-theme from its own settings; the frame follows it
    const mirror = () => {
      const t = panel?.getAttribute("data-theme");
      if (t) win.setAttribute("data-theme", t);
      else win.removeAttribute("data-theme");
    };
    new MutationObserver(mirror).observe(panel, { attributes: true, attributeFilter: ["data-theme"] });
    mirror();
  }

  function render(): void {
    win.hidden = !visible;
    win.classList.toggle("min", state === "min");
    const b = btn("min");
    b.querySelector("ha-icon")!.setAttribute("icon", state === "min" ? ICON.restore : ICON.min);
    b.dataset.key = state === "min" ? "restore" : "min";
    label();
    if (visible) place();
    if (visible && !frame) frame = requestAnimationFrame(tick);
  }

  btn("min").addEventListener("click", () => setState(state === "min" ? "open" : "min"));
  btn("close").addEventListener("click", () => setState("closed"));
  btn("full").addEventListener("click", () => {
    setState("closed");
    // the way HA's own links move between pages, so the app is not reloaded
    history.pushState(null, "", "/llm-agent");
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  });
  bar.addEventListener("dblclick", (e) => {
    if (!(e.target as Element).closest("button")) setState(state === "min" ? "open" : "min");
  });

  // Esc closes the window, unless something inside used it first (the panel's popovers,
  // the @ list and stopping a reply all mark the key used).
  win.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !e.defaultPrevented && !e.isComposing) {
      e.preventDefault();
      setState("closed");
    }
  });

  drag(bar, (dx, dy, start) => {
    if (phone()) return false;
    if (start) win.classList.add("dragging");
    const r = win.getBoundingClientRect();
    saved.x = r.left + dx;
    saved.y = r.top + dy;
    place();
    return true;
  }, () => {
    win.classList.remove("dragging");
    save(saved);
  });
  drag(grip, (dx, dy) => {
    const r = win.getBoundingClientRect();
    saved.w = Math.min(r.width + dx, innerWidth - r.left - MARGIN);
    saved.h = Math.min(r.height + dy, innerHeight - r.top - MARGIN);
    saved.x = r.left;
    saved.y = r.top;
    place();
    return true;
  }, () => save(saved));

  addEventListener("resize", () => visible && place());
  // a more-info dialog changes what the person is looking at; HA's events bubble out
  // of its shadow roots to the window, and capture sees them before any handler stops them
  addEventListener("hass-more-info", () => refreshContext(), true);
  addEventListener("dialog-closed", () => refreshContext(), true);

  return {
    el,
    show(next) {
      const opening = !visible;
      if (state !== next) {
        state = next;
        if (saved.state !== next) {
          saved.state = next;
          save(saved);
        }
      }
      visible = true;
      render();
      if (opening)
        void ensurePanel().then(refreshContext);
    },
    hide() {
      visible = false;
      render();
    },
    navigated: refreshContext,
  };
}

/** Pointer drag on `handle`. `move` gets the change since the last call and returns
 * false to refuse the drag (the phone sheet does not move). */
function drag(
  handle: HTMLElement,
  move: (dx: number, dy: number, start: boolean) => boolean,
  end: () => void,
): void {
  handle.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || (e.target as Element).closest("button")) return;
    let x = e.clientX;
    let y = e.clientY;
    let started = false;
    handle.setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - x;
      const dy = ev.clientY - y;
      if (!started && Math.abs(dx) + Math.abs(dy) < 3) return;
      if (!move(dx, dy, !started)) return stop();
      started = true;
      x = ev.clientX;
      y = ev.clientY;
    };
    const stop = () => {
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", stop);
      handle.removeEventListener("pointercancel", stop);
      if (started) end();
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", stop);
    handle.addEventListener("pointercancel", stop);
  });
}

/** The window's button labels from the panel's translation files (the same files the
 * panel fetches, so the browser has them cached once the panel is up). English is
 * fetched as well, as the fallback for a missing word, instead of being built in. */
const TABLES: Record<string, Promise<Record<string, string>>> = {};
async function labels(hass: Hass | undefined, set: (key: string, text: string) => void): Promise<void> {
  const here = new URL(import.meta.url);
  const get = (lang: string) =>
    (TABLES[lang] ??= fetch(new URL(`i18n/${lang}.json${here.search}`, here))
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({})));
  const [mine, en] = await Promise.all([get(pickLanguage(hass?.locale?.language)), get("en")]);
  const keys: Record<string, string> = {
    min: "float_minimize",
    restore: "float_restore",
    full: "float_full_panel",
    close: "close",
    grip: "float_resize",
  };
  for (const [k, key] of Object.entries(keys)) {
    const text = mine[key] ?? en[key];
    if (text) set(k, text);
  }
}
