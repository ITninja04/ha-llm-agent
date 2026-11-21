// The dev preview page: the Lit Notes view and the Solid 2.0 port of it side by side,
// on the same Home Assistant and the same notes, so the two can be compared by using
// them. A change saved in one shows in the other on its next load.
//
// Home Assistant hands a custom panel its state by setting `hass` as a property on
// every state change, many times a minute. The element below is the thin shell that
// turns that property into a Solid signal. Solid then decides what to update; the
// shell itself never renders.
import { render } from "@solidjs/web";
import { createSignal } from "solid-js";
import { loadLanguage } from "../i18n";
import { styles } from "../styles";
import type { Hass } from "../types";
import { Notes, notesCss } from "./notes";

const pageCss = `:host{display:flex;flex-direction:column}
header{display:flex;align-items:center;gap:8px;height:56px;padding:0 12px;border-bottom:1px solid var(--line);background:var(--surface);font-size:20px}
.cols{flex:1;min-height:0;display:flex;flex-wrap:wrap;overflow-y:auto}
section{flex:1 1 380px;min-width:0;display:flex;flex-direction:column;border-inline-end:1px solid var(--line)}
h2{margin:0;padding:10px 20px;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--line)}
llm-agent-notes{height:auto}`;

interface PanelInfo {
  config?: { lit_url?: string };
}

class LlmAgentSolidPreview extends HTMLElement {
  #hass = createSignal<Hass>();
  #dispose?: () => void;
  // HA's own sidebar toggle, so the page works on a phone the way every panel does
  #menu = document.createElement("ha-menu-button") as HTMLElement & { hass?: Hass; narrow?: boolean };
  // the Lit view, created only once the panel bundle that defines it has loaded
  #lit?: HTMLElement & { hass?: Hass };

  panel?: PanelInfo;

  set hass(hass: Hass) {
    this.#hass[1](() => hass);
    this.#menu.hass = hass;
    if (this.#lit) this.#lit.hass = hass;
  }

  set narrow(narrow: boolean) {
    this.#menu.narrow = narrow;
  }

  async connectedCallback(): Promise<void> {
    if (this.#dispose) return;
    const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(notesCss + "\n" + pageCss);
    root.adoptedStyleSheets = [styles.styleSheet!, sheet];
    await loadLanguage(this.#hass[0]()?.locale?.language);

    const litCol = document.createElement("div");
    litCol.style.display = "contents";
    const url = this.panel?.config?.lit_url;
    if (url) {
      // The panel bundle defines <llm-agent-notes>; the browser usually has it cached.
      await import(/* @vite-ignore */ url);
      this.#lit = document.createElement("llm-agent-notes");
      this.#lit.hass = this.#hass[0]();
      litCol.append(this.#lit);
    }

    if (!this.isConnected || this.#dispose) return; // left, or connected twice, while loading
    const hass = this.#hass[0];
    this.#dispose = render(
      () => (
        <>
          <header>
            {this.#menu}
            <span>Notes preview: Lit and Solid 2.0</span>
          </header>
          <div class="cols">
            <section>
              <h2>Lit (shipping)</h2>
              {litCol}
            </section>
            <section>
              <h2>Solid 2.0</h2>
              <Notes hass={hass} />
            </section>
          </div>
        </>
      ),
      root,
    );
  }

  disconnectedCallback(): void {
    this.#dispose?.();
    this.#dispose = undefined;
    this.#lit = undefined;
  }
}

customElements.define("llm-agent-solid-preview", LlmAgentSolidPreview);
