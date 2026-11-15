// The Notes view: home notes and the knowledge base, each a list of separate items the
// household can switch off, edit or delete. It takes the chat's place like the Changes
// view. Admin only; the server refuses everyone else, the panel only hides the button.
// Every change answers with the whole state, so the room left is always the server's
// number and never worked out here.
// Written compactly on purpose, like changes.ts: the bundle keeps CSS and template
// whitespace, and CI caps the gzipped panel.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { t } from "./i18n";
import { styles } from "./styles";
import type { Hass } from "./types";

interface Item {
  id: string;
  text?: string;
  title?: string;
  summary?: string;
  body?: string;
  enabled?: boolean;
  updated?: number;
  added_by?: string;
}

interface Data {
  notes: Item[];
  knowledge: Item[];
  room: number;
  note_max: number;
}

class LlmAgentNotes extends LitElement {
  static styles = [
    styles,
    css`:host{flex:1;min-height:0;height:auto;overflow-y:auto;background:none}
.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar [aria-selected=true]{background:var(--accent);color:var(--on-accent)}
.bar span{flex:1;text-align:end}
.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}
.off>div{opacity:.55}
.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}
.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}
.ed button{flex:none}
.err{color:var(--danger)}`,
  ];

  @property({ attribute: false }) hass?: Hass;
  /** One state field: each decorated field costs bundle bytes. `edit` is the item being
   * edited (id "" for a new one), `del` the item asking "Delete?". */
  @state() private s: { d?: Data; kb: boolean; edit?: Item; del: string; error: string } = {
    kb: false,
    del: "",
    error: "",
  };

  connectedCallback(): void {
    super.connectedCallback();
    void this.call("");
  }

  private async call(type: string, msg: Record<string, unknown> = {}): Promise<void> {
    const ws = this.hass!.connection;
    const get = (type: string, msg = {}) =>
      ws.sendMessagePromise<Data>({ type: "llm_agent/home_notes" + type, ...msg });
    try {
      this.s = { ...this.s, d: await get(type, msg), edit: undefined, del: "", error: "" };
    } catch (err) {
      const e = err as { code?: string; message?: string };
      this.s = { ...this.s, error: e.message ?? String(err) };
      // changed elsewhere (an approved AI suggestion, another window): show what is
      // stored now, and keep the message saying why the edit was not saved
      if (e.code === "changed") this.s = { ...this.s, d: await get(""), edit: undefined, del: "" };
    }
  }

  /** A save or delete of `i`, naming the version it started from. */
  private change(type: string, i: Item, fields: Item | object = {}): Promise<void> {
    return this.call(type, {
      kind: this.s.kb ? "knowledge" : "note",
      ...(i.id ? { item_id: i.id, base: i.updated } : {}),
      ...fields,
    });
  }

  private set(key: keyof Item) {
    return (ev: Event) => {
      // the draft is edited in place: typing needs no render
      Object.assign(this.s.edit!, { [key]: (ev.target as HTMLInputElement).value });
    };
  }

  protected render(): TemplateResult {
    const { d, kb, edit, error } = this.s;
    const items = (kb ? d?.knowledge : d?.notes) ?? [];
    const tab = (on: boolean, key: "notes_tab" | "knowledge_tab") =>
      html`<button class="small" role="tab" aria-selected=${on === kb} @click=${() => (this.s = { ...this.s, kb: on, edit: undefined, del: "", error: "" })}>${t(key)}</button>`;
    return html`<div class="bar" role="tablist">${tab(false, "notes_tab")}${tab(true, "knowledge_tab")}<span>${kb || !d ? "" : t("characters_left", { count: d.room })}</span>
<button class="small primary" @click=${() => (this.s = { ...this.s, edit: { id: "", text: "", title: "", summary: "", body: "" } })}>${t("add")}</button></div>
<p>${t(kb ? "knowledge_hint" : "notes_hint")}</p>${error ? html`<p class="err">${error}</p>` : nothing}${edit && !edit.id ? this.editor(edit) : nothing}${d && !items.length && !edit
      ? html`<div class="empty">${t("notes_none")}</div>`
      : nothing}${items.map((i) => (edit?.id === i.id ? this.editor(edit) : this.row(i)))}`;
  }

  private row(i: Item): TemplateResult {
    const btn = (key: "edit" | "delete" | "cancel", go: () => void, cls = "ghost") =>
      html`<button class="small ${cls}" @click=${go}>${t(key)}</button>`;
    const del = this.s.del === i.id;
    return html`<div class="row ${i.enabled ? "" : "off"}"><input type="checkbox" aria-label=${t("note_enabled")} title=${t("note_enabled")} .checked=${!!i.enabled} @change=${() => this.change("/save", i, { enabled: !i.enabled })}>
<div>${this.s.kb ? html`<b>${i.title}</b> ${i.summary}` : i.text} ${i.added_by === "agent" ? html`<span class="tag">${t("note_from_ai")}</span>` : nothing}</div>${del
      ? html`<span class="err">${t("delete_confirm")}</span>${btn("delete", () => this.change("/delete", i), "danger")}${btn("cancel", () => (this.s = { ...this.s, del: "" }))}`
      : html`${btn("edit", () => (this.s = { ...this.s, edit: { ...i }, del: "", error: "" }))}${btn("delete", () => (this.s = { ...this.s, del: i.id }))}`}</div>`;
  }

  private editor(e: Item): TemplateResult {
    const save = () =>
      this.change("/save", e, this.s.kb ? { title: e.title, summary: e.summary, body: e.body } : { text: e.text });
    return html`<div class="row ed">${this.s.kb
      ? html`<input aria-label=${t("knowledge_title")} placeholder=${t("knowledge_title")} maxlength="80" .value=${e.title ?? ""} @input=${this.set("title")}>
<input aria-label=${t("knowledge_summary")} placeholder=${t("knowledge_summary")} maxlength="200" .value=${e.summary ?? ""} @input=${this.set("summary")}>
<textarea rows="14" aria-label=${t("knowledge_body")} placeholder=${t("knowledge_body")} maxlength="20000" .value=${e.body ?? ""} @input=${this.set("body")}></textarea>`
      : html`<textarea rows="2" aria-label=${t("home_notes")} placeholder=${t("notes_placeholder")} maxlength=${this.s.d?.note_max ?? 300} .value=${e.text ?? ""} @input=${this.set("text")}></textarea>`}
<button class="small primary" @click=${save}>${t("save")}</button><button class="small ghost" @click=${() => (this.s = { ...this.s, edit: undefined })}>${t("cancel")}</button></div>`;
  }
}

customElements.define("llm-agent-notes", LlmAgentNotes);
