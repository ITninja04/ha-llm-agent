// Integration settings inside the panel. Before this, changing a setting meant leaving
// the chat for Settings > Devices & services > LLM Agent > Configure. This view drives
// that same options flow (the one the gear on the integration page opens) over Home
// Assistant's flow API, the REST calls HA's own dialog makes, so every check and every
// save stays HA's and the integration's. Nothing here validates or writes options.
// It renders only what config_flow.py uses: menus, forms with sections, and the text,
// password, url, number, boolean, select and object selectors plus plain strings. A
// step it cannot draw (the ChatGPT sign-in's progress step, a selector added later)
// is never half drawn: it says so in one line and offers the same step in HA instead.
// Admin only: the panel hides the entry from members, and HA refuses the flow API to
// anyone who is not an admin whatever this file does.
// Written compactly on purpose: the bundle keeps CSS and template whitespace, and CI
// enforces a gzipped budget for the panel.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { t } from "./i18n";
import { renderMarkdown } from "./markdown";
import { styles } from "./styles";
import type { Hass } from "./types";

type Api = Hass & {
  callApi<T>(method: "GET" | "POST" | "DELETE", path: string, data?: object): Promise<T>;
};
interface Field {
  name: string;
  type?: string;
  default?: unknown;
  description?: { suggested_value?: unknown };
  selector?: Record<string, Record<string, any>>;
  schema?: Field[];
  expanded?: boolean;
}
interface Step {
  type: string;
  flow_id: string;
  step_id?: string;
  data_schema?: Field[];
  errors?: Record<string, string> | null;
  description_placeholders?: Record<string, string> | null;
  menu_options?: string[] | Record<string, string>;
  reason?: string;
}
type Values = Record<string, any>;

const API = "config/config_entries/options/flow";
const KINDS = ["text", "number", "boolean", "select", "object"];
const C = "component.llm_agent.";

/** The integration's page in Home Assistant. Relative, so it works behind any host. */
export const HA_PAGE = "/config/integrations/integration/llm_agent";

/** Go to a Home Assistant page in this tab, the way HA's own links do: a full page
 * load would restart the app, and a new tab would leave the panel behind. */
export function openInHa(): void {
  history.pushState(null, "", HA_PAGE);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
}

const kind = (f: Field) => (f.type === "string" ? "text" : Object.keys(f.selector ?? {})[0]);
const cfg = (f: Field) => f.selector?.[kind(f)] ?? {};
/** Every field is one this file draws: a step with any other is handed to HA whole. */
const drawable = (fs: Field[]): boolean =>
  fs.every((f) =>
    f.type === "expandable"
      ? drawable(f.schema ?? [])
      : KINDS.includes(kind(f)) && !cfg(f).multiple,
  );
const initial = (fs: Field[]): Values =>
  Object.fromEntries(
    fs.map((f) => [
      f.name,
      f.type === "expandable" ? initial(f.schema ?? []) : f.description?.suggested_value ?? f.default,
    ]),
  );
const msg = (e: any): string => e?.body?.message ?? e?.message ?? e?.error ?? String(e);

class LlmAgentSettings extends LitElement {
  static styles = [
    styles,
    css`:host{position:absolute;inset:0;height:auto;z-index:20;display:flex;flex-direction:column;background:var(--bg);color:var(--text)}
.top{display:flex;align-items:center;gap:4px;height:60px;flex:none;padding:0 12px;border-bottom:1px solid var(--line)}
.top b{flex:1;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.body{flex:1;overflow-y:auto;padding:20px max(16px,calc((100% - 680px)/2)) 32px}
.body>*+*{margin-top:14px}
.d,.note{color:var(--muted);font-size:13px;line-height:1.5}.d p{margin:4px 0}.d :is(a,strong){color:var(--text)}
.menu{display:grid;gap:8px}.menu button{justify-content:space-between;padding:12px 14px;font-size:14px}
.f{display:flex;flex-direction:column;gap:6px}
.f>label,.r label{display:flex;align-items:center;gap:10px;font-size:14px}
.f :is(input:not([type=checkbox]):not([type=radio]),select,textarea){width:100%;box-sizing:border-box;font:inherit;font-size:14px}
textarea{min-height:5.5em;resize:vertical;color:var(--text);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:8px}
textarea.json{font:12px var(--mono)}
.u{display:flex;align-items:center;gap:8px}.u span{color:var(--muted);font-size:13px}
.r{display:flex;flex-direction:column;gap:6px;border:0;margin:0;padding:0}
details{border:1px solid var(--line);border-radius:12px;padding:0 14px;background:var(--surface)}
details[open]{padding-bottom:14px}details>*+*{margin-top:14px}
summary{cursor:pointer;padding:12px 0;font-weight:600;font-size:14px}
.err{color:var(--danger);font-size:13px}
.bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}`,
  ];

  @property({ attribute: false }) hass?: Api;
  /** Everything shown, in one state field: each decorated field costs bundle bytes.
   * `done` after a save: 0 nothing reloaded, 2 reloaded, 1 or 3 it did not come back. */
  @state() private s: {
    step?: Step;
    busy?: boolean;
    error?: string;
    stuck?: boolean;
    done?: number;
    saving?: boolean;
  } = {};
  private v: Values = {};
  /** Object selectors are edited as JSON text; the text is parsed when sent. */
  private raw: Record<string, string> = {};
  private words: Record<string, string> = {};
  private entry?: string;
  private unsub?: Promise<() => Promise<void>>;
  /** Where the entry is in the reload a save starts: 0 none seen, 1 down, 2 loaded
   * again, 3 failed to load. Read from config_entries/subscribe, opened before the
   * first submit, because the reload can finish before the save's own answer arrives. */
  private cycle = 0;

  connectedCallback(): void {
    super.connectedCallback();
    void this.begin();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    void this.unsub?.then((u) => u()).catch(() => undefined);
    this.unsub = undefined;
    this.drop();
  }

  /** End the flow on HA's side, as closing HA's dialog does: a sign-in step waiting in
   * the background stops instead of running out its 15 minutes. */
  private drop(): void {
    const st = this.s.step;
    if (st && ["form", "menu", "progress", "external"].includes(st.type))
      void this.hass?.callApi("DELETE", `${API}/${st.flow_id}`).catch(() => undefined);
  }

  private async begin(): Promise<void> {
    const h = this.hass;
    if (!h) return;
    this.s = { busy: true };
    try {
      let ready = () => {};
      const first = new Promise<void>((r) => (ready = r));
      this.unsub ??= h.connection.subscribeMessage<{ type: string | null; entry: any }[]>(
        (evs) => {
          for (const { type, entry: e } of evs) {
            if (e.domain !== "llm_agent") continue;
            if (!type) this.entry ??= e.entry_id;
            else if (e.entry_id === this.entry)
              this.cycle =
                e.state === "loaded"
                  ? this.cycle && 2
                  : /error|retry|failed/.test(e.state)
                    ? 3
                    : this.cycle || 1;
          }
          ready();
        },
        { type: "config_entries/subscribe" },
      );
      await this.unsub;
      if (!this.entry) await first;
      const lang = h.locale?.language ?? "en";
      const res = await Promise.all(
        ["options", "selector"].map((category) =>
          h.connection.sendMessagePromise<{ resources: Record<string, string> }>({
            type: "frontend/get_translations",
            language: lang,
            category,
            integration: ["llm_agent"],
          }),
        ),
      );
      this.words = Object.assign({}, ...res.map((r) => r?.resources));
      if (!this.entry) throw new Error(t("no_provider"));
      this.show(await h.callApi<Step>("POST", API, { handler: this.entry, show_advanced_options: false }));
    } catch (e) {
      this.s = { error: msg(e) };
    }
  }

  private show(step: Step): void {
    const fs = step.data_schema ?? [];
    // a menu's schema is HA's own next_step_id list, drawn as buttons, never as fields
    const stuck =
      !["form", "menu", "abort", "create_entry"].includes(step.type) ||
      (step.type === "form" && !drawable(fs));
    if (step.type === "form") {
      this.v = initial(fs);
      this.raw = {};
    }
    this.s = { step, stuck };
    if (stuck) this.drop();
  }

  /** A translation from the integration's strings, with the step's placeholders. */
  private tr(key: string, ph = this.s.step?.description_placeholders): string {
    const text = this.words[C + key] ?? "";
    return ph ? text.replace(/\{(\w+)\}/g, (m, k) => ph[k] ?? m) : text;
  }

  private async send(data: object): Promise<void> {
    const st = this.s.step!;
    this.s = { ...this.s, busy: true };
    this.cycle = 0;
    let next: Step;
    try {
      next = await this.hass!.callApi<Step>("POST", `${API}/${st.flow_id}`, data);
    } catch (e: any) {
      // HA's schema check answers 400 with the message for each field
      const errors = e?.body?.errors;
      this.s = errors
        ? { step: { ...st, errors }, busy: false }
        : { ...this.s, busy: false, error: msg(e) };
      return;
    }
    if (next.type !== "create_entry") return this.show(next);
    this.s = { step: next, saving: true };
    // A save that changed something reloads the entry (HA does that, through the
    // integration's update listener). One that changed nothing does not, so the wait
    // for it to start is short; the wait for it to finish is not.
    for (let i = 0; i < 600 && this.cycle < 2 && (this.cycle || i < 30); i++)
      await new Promise((r) => setTimeout(r, 100));
    this.s = { step: next, done: this.cycle };
    if (this.cycle === 2)
      this.dispatchEvent(new CustomEvent("reloaded", { bubbles: true, composed: true }));
  }

  private submit(ev: Event): void {
    ev.preventDefault();
    let bad = "";
    const pack = (fs: Field[], src: Values, sec = ""): Values => {
      const out: Values = {};
      for (const f of fs) {
        if (f.type === "expandable") {
          out[f.name] = pack(f.schema ?? [], src[f.name] ?? {}, f.name);
          continue;
        }
        let x = src[f.name];
        const r = this.raw[sec + "." + f.name];
        if (r !== undefined) {
          try {
            x = r.trim() ? JSON.parse(r) : undefined;
          } catch {
            bad = f.name;
          }
        }
        // HA's own form leaves out an emptied optional field rather than sending ""
        if (x !== undefined && x !== null && x !== "" && !Number.isNaN(x)) out[f.name] = x;
      }
      return out;
    };
    const data = pack(this.s.step?.data_schema ?? [], this.v);
    if (bad) {
      this.s = { ...this.s, step: { ...this.s.step!, errors: { [bad]: t("settings_bad_json") } } };
      return;
    }
    void this.send(data);
  }

  private close(): void {
    this.dispatchEvent(new CustomEvent("close"));
  }

  protected render(): TemplateResult {
    const { step, error, busy, stuck, done, saving } = this.s;
    const id = step?.step_id ?? "init";
    const title = (step?.type !== "create_entry" && this.tr(`options.step.${id}.title`)) || t("integration_settings");
    const desc = step?.type === "form" || step?.type === "menu" ? this.tr(`options.step.${id}.description`) : "";
    const reason = step?.type === "abort" ? this.tr(`options.abort.${step.reason}`) || step.reason : "";
    const ha = html`<button class="small" @click=${openInHa}>${t("open_in_ha")}</button>`;
    const again = html`<button class="small ghost" ?disabled=${busy} @click=${() => this.begin()}>${t("settings_menu")}</button>`;
    return html`<div class="top" @keydown=${(e: KeyboardEvent) => e.key === "Escape" && (e.preventDefault(), this.close())}>
<button class="icon" title=${t("close")} aria-label=${t("close")} @click=${this.close}><ha-icon icon="mdi:close"></ha-icon></button>
<b>${title}</b></div>
<div class="body" aria-busy=${!!busy || !!saving} @keydown=${(e: KeyboardEvent) => e.key === "Escape" && (e.preventDefault(), this.close())}>
${desc ? html`<div class="d">${unsafeHTML(renderMarkdown(desc))}</div>` : nothing}
${error
  ? html`<div class="err" role="alert">${t("settings_error", { error })}</div><div class="bar">${again}${ha}</div>`
  : !step
    ? html`<div class="note">${t("settings_loading")}</div>`
    : stuck
      ? html`<div class="note">${t("settings_unsupported")}</div><div class="bar">${again}${ha}</div>`
      : saving
        ? html`<div class="note" role="status">${t("settings_reloading")}</div>`
        : done !== undefined
          ? html`<div class="note" role="status">${t(done === 2 ? "settings_reloaded" : done ? "settings_reload_failed" : "settings_saved")}</div>
<div class="bar">${done === 1 || done === 3 ? ha : nothing}${again}<button class="small primary" @click=${this.close}>${t("settings_back")}</button></div>`
          : reason
            ? html`<div class="note">${reason}</div><div class="bar">${again}</div>`
            : step.type === "menu"
              ? this.menu(step)
              : this.form(step)}
</div>`;
  }

  private menu(step: Step): TemplateResult {
    const opts = step.menu_options ?? [];
    const list = Array.isArray(opts) ? opts.map((o) => [o, ""]) : Object.entries(opts);
    return html`<div class="menu">${list.map(
      ([o, label]) => html`<button ?disabled=${this.s.busy} @click=${() => this.send({ next_step_id: o })}>
${this.tr(`options.step.${step.step_id}.menu_options.${o}`) || label || o}<ha-icon icon="mdi:chevron-right"></ha-icon></button>`,
    )}</div>`;
  }

  private form(step: Step): TemplateResult {
    const errs = step.errors ?? {};
    const base = errs.base;
    return html`<form @submit=${this.submit} novalidate>
${base ? html`<div class="err" role="alert">${this.tr(`options.error.${base}`) || base}</div>` : nothing}
${(step.data_schema ?? []).map((f) =>
  f.type === "expandable"
    ? html`<details ?open=${f.expanded}><summary>${this.tr(`options.step.${step.step_id}.sections.${f.name}.name`) || f.name}</summary>
${this.tr(`options.step.${step.step_id}.sections.${f.name}.description`) ? html`<div class="d">${unsafeHTML(renderMarkdown(this.tr(`options.step.${step.step_id}.sections.${f.name}.description`)))}</div>` : nothing}
${(f.schema ?? []).map((g) => this.field(g, errs, f.name))}</details>`
    : this.field(f, errs),
)}
<div class="bar">${this.again()}<button class="small primary" type="submit" ?disabled=${this.s.busy}>${t("settings_submit")}</button></div>
</form>`;
  }

  private again(): TemplateResult {
    return html`<button class="small ghost" type="button" ?disabled=${this.s.busy} @click=${() => (this.drop(), this.begin())}>${t("settings_menu")}</button>`;
  }

  private field(f: Field, errs: Record<string, any>, sec = ""): TemplateResult {
    const at = `options.step.${this.s.step?.step_id}${sec ? `.sections.${sec}` : ""}`;
    const label = this.tr(`${at}.data.${f.name}`) || f.name;
    const desc = this.tr(`${at}.data_description.${f.name}`);
    const err = (sec && errs[sec]?.[f.name]) || errs[f.name];
    const src: Values = sec ? (this.v[sec] ??= {}) : this.v;
    const val = src[f.name];
    const set = (x: unknown) => {
      src[f.name] = x;
      this.requestUpdate();
    };
    const c = cfg(f);
    const k = kind(f);
    const id = `f-${sec}-${f.name}`;
    let input: TemplateResult;
    if (k === "boolean") {
      input = html`<label><input type="checkbox" .checked=${!!val} @change=${(e: Event) => set((e.target as HTMLInputElement).checked)}>${label}</label>`;
    } else {
      let box: TemplateResult;
      const on = (e: Event) => (e.target as HTMLInputElement).value;
      if (k === "number") {
        box = html`<span class="u"><input id=${id} type="number" min=${c.min ?? nothing} max=${c.max ?? nothing} step=${c.step ?? "any"} .value=${val == null ? "" : String(val)} @input=${(e: Event) => set(on(e) === "" ? undefined : Number(on(e)))}>${c.unit_of_measurement ? html`<span>${c.unit_of_measurement}</span>` : nothing}</span>`;
      } else if (k === "select") {
        const opts = (c.options ?? []).map((o: any) =>
          typeof o === "string" ? { value: o, label: o } : o,
        ) as { value: string; label: string }[];
        const name = (o: { value: string; label: string }) =>
          (c.translation_key && this.tr(`selector.${c.translation_key}.options.${o.value}`)) || o.label;
        box =
          c.mode === "list" && !c.custom_value
            ? html`<fieldset class="r" id=${id} aria-label=${label}>${opts.map(
                (o) => html`<label><input type="radio" name=${id} .checked=${val === o.value} @change=${() => set(o.value)}>${name(o)}</label>`,
              )}</fieldset>`
            : c.custom_value
              ? html`<input id=${id} list=${id + "l"} .value=${val ?? ""} @input=${(e: Event) => set(on(e))}><datalist id=${id + "l"}>${opts.map((o) => html`<option value=${o.value}>${name(o)}</option>`)}</datalist>`
              : html`<select id=${id} @change=${(e: Event) => set(on(e))}>${val == null ? html`<option selected></option>` : nothing}${opts.map((o) => html`<option value=${o.value} ?selected=${val === o.value}>${name(o)}</option>`)}</select>`;
      } else if (k === "object") {
        const key = sec + "." + f.name;
        this.raw[key] ??= val == null ? "" : JSON.stringify(val, null, 2);
        box = html`<textarea id=${id} class="json" spellcheck="false" .value=${this.raw[key]} @input=${(e: Event) => (this.raw[key] = on(e))}></textarea>`;
      } else if (c.multiline) {
        box = html`<textarea id=${id} .value=${val ?? ""} @input=${(e: Event) => set(on(e))}></textarea>`;
      } else {
        box = html`<input id=${id} type=${c.type ?? "text"} autocomplete=${c.type === "password" ? "new-password" : "off"} .value=${val ?? ""} @input=${(e: Event) => set(on(e))}>`;
      }
      input = html`<label for=${id}>${label}</label>${box}`;
    }
    return html`<div class="f">${input}
${desc ? html`<div class="d">${unsafeHTML(renderMarkdown(desc))}</div>` : nothing}
${err ? html`<div class="err">${this.tr(`options.error.${err}`) || err}</div>` : nothing}</div>`;
  }
}

customElements.define("llm-agent-settings", LlmAgentSettings);
