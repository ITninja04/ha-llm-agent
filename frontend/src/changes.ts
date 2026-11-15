// The Changes view: every change the assistant made, across all chats, read from the
// audit log by llm_agent/changes. Admin only; the server refuses everyone else, this
// file only hides the button. Undo reuses llm_agent/undo, so a change undone here shows
// as undone in its chat too.
// Written compactly on purpose: the bundle keeps CSS and template whitespace, and the
// panel has a 60 kB gzipped budget that CI enforces.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { has, t } from "./i18n";
import { styles } from "./styles";
import type { Hass } from "./types";

interface Change {
  time: number;
  conversation_id: string | null;
  chat_title: string | null;
  user_id: string | null;
  user_name: string | null;
  tool: string;
  args: string;
  approval: keyof typeof APPROVAL | null;
  ok: boolean;
  detail: string;
  snapshot_id: string | null;
  undo: "available" | "undone" | "gone" | null;
}

interface Page {
  changes: Change[];
  cursor: string | null;
  chats?: { id: string; title: string }[];
  users?: { id: string; name: string }[];
}

/** Home Assistant's profile settings for how times are shown. */
type LocaleHass = Hass & {
  locale?: { language: string; time_zone?: string; time_format?: string };
  config?: { time_zone?: string };
};

const APPROVAL = {
  asked: "changes_asked",
  auto: "changes_auto",
  rule: "changes_rule",
  reviewer: "reviewer_approved",
  denied: "denied",
} as const;

const ERR = (err: unknown) => (err as { message?: string }).message ?? String(err);

class LlmAgentChanges extends LitElement {
  static styles = [
    styles,
    css`:host{flex:1;min-height:0;height:auto;overflow-y:auto;background:none;container-type:inline-size}
.bar{display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px}
.bar>*{font:inherit;font-size:13px;color:var(--text);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:5px 8px}
.bar>[type=search]{flex:1;min-width:140px}
.row,.bar,.more{border-bottom:1px solid var(--line)}
/* Every row uses the same fixed column template, so columns line up without the rows
   sharing a grid. display and gap are set here because the panel's chat styles, which
   this view shares, make .row a flex row. */
.row{display:grid;grid-template-columns:11.5rem minmax(5rem,10rem) minmax(4rem,7rem) minmax(8rem,1fr) minmax(9rem,16rem);grid-template-areas:"t c u w o";gap:4px 16px;align-items:start;padding:10px 20px;font-size:13px;color:var(--muted)}
.row>*,.link{min-width:0;text-align:start;overflow-wrap:anywhere}
.t{grid-area:t;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.c{grid-area:c}.u{grid-area:u}
.w{grid-area:w;display:flex;gap:6px;align-items:baseline}
.o{grid-area:o;display:flex;flex-wrap:wrap;align-items:center;gap:6px}
/* the minimums above add up to about 720px with padding; narrower panes (phones) put
   when, chat and person on one line and the change and outcome below */
@container (max-width:720px){.row{grid-template-columns:auto auto minmax(0,1fr);grid-template-areas:"t c u" "w w w" "o o o"}}
b{color:var(--text);font-weight:500;flex:none}
code{font:12px var(--mono);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.link{background:none;border:0;padding:0;font:inherit;color:var(--accent);cursor:pointer}
.bad{color:var(--danger)}
.more{padding:12px 20px}`,
  ];

  @property({ attribute: false }) hass?: LocaleHass;
  /** Everything shown, in one state field: each decorated field costs bundle bytes. */
  @state() private s: Page & { error: string; loading: boolean } = {
    changes: [],
    cursor: null,
    chats: [],
    users: [],
    error: "",
    loading: false,
  };
  private f = { from: "", to: "", chat: "", user: "", text: "" };
  private gen = 0;
  private timer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  /** The zone times are shown in: the server's when the profile says so, else the
   * browser's (Home Assistant's own rule for its "time zone" profile setting). */
  private get zone(): string | undefined {
    const h = this.hass;
    return h?.locale?.time_zone === "server" ? h.config?.time_zone : undefined;
  }

  private async load(more = false): Promise<void> {
    const { hass, f, s } = this;
    if (!hass) return;
    const gen = ++this.gen; // a slower older query must not overwrite a newer one
    this.s = { ...s, loading: true };
    let next: Partial<typeof s>;
    try {
      const page = await hass.connection.sendMessagePromise<Page>({
        type: "llm_agent/changes",
        since: f.from ? dayStart(f.from, 0, this.zone) : null,
        until: f.to ? dayStart(f.to, 1, this.zone) - 0.001 : null,
        conversation_id: f.chat || null,
        user_id: f.user || null,
        text: f.text,
        cursor: more ? s.cursor : null,
      });
      next = { ...page, changes: more ? [...s.changes, ...page.changes] : page.changes, error: "" };
    } catch (err) {
      next = { error: ERR(err) };
    }
    if (gen === this.gen) this.s = { ...this.s, ...next, loading: false };
  }

  private set(key: keyof LlmAgentChanges["f"]) {
    return (ev: Event) => {
      this.f = { ...this.f, [key]: (ev.target as HTMLInputElement).value };
      clearTimeout(this.timer);
      this.timer = window.setTimeout(() => void this.load(), key === "text" ? 300 : 0);
    };
  }

  private async undo(r: Change): Promise<void> {
    if (!confirm(t("confirm_undo", { name: r.detail || r.tool }))) return;
    try {
      await this.hass!.connection.sendMessagePromise({
        type: "llm_agent/undo",
        snapshot_id: r.snapshot_id,
        ...(r.conversation_id ? { conversation_id: r.conversation_id } : {}),
      });
    } catch (err) {
      this.s = { ...this.s, error: ERR(err) };
      return;
    }
    await this.load();
  }

  private fmt(time: number): string {
    const tf = this.hass?.locale?.time_format;
    return new Intl.DateTimeFormat(this.hass?.locale?.language, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: this.zone,
      ...(tf === "12" || tf === "24" ? { hour12: tf === "12" } : {}),
    }).format(time * 1000);
  }

  protected render(): TemplateResult {
    const { s } = this;
    const opt = (v: string, label: string) => html`<option value=${v}>${label}</option>`;
    return html`<div class="bar">
<input type="date" aria-label=${t("changes_from")} title=${t("changes_from")} @change=${this.set("from")}>
<input type="date" aria-label=${t("changes_to")} title=${t("changes_to")} @change=${this.set("to")}>
<select aria-label=${t("conversation")} @change=${this.set("chat")}>${opt("", t("changes_all_chats"))}${s.chats?.map((c) => opt(c.id, c.title || t("new_chat")))}</select>
<select aria-label=${t("changes_user")} @change=${this.set("user")}>${opt("", t("changes_everyone"))}${s.users?.map((u) => opt(u.id, u.name))}</select>
<input type="search" placeholder=${t("changes_search")} aria-label=${t("changes_search")} @input=${this.set("text")}>
</div>${s.error
      ? html`<div class="empty">${t("changes_error", { error: s.error })}</div>`
      : !s.loading && !s.changes.length
        ? html`<div class="empty">${t("changes_none")}</div>`
        : nothing}${s.changes.map((r) => this.row(r))}${s.cursor
      ? html`<div class="more"><button class="small" ?disabled=${s.loading} @click=${() => this.load(true)}>${t("changes_more")}</button></div>`
      : nothing}`;
  }

  private row(r: Change): TemplateResult {
    const key = `tool_${r.tool}`;
    const tag = (text: string, bad = false, title = "") =>
      html`<span class="tag ${bad ? "bad" : ""}" title=${title}>${text}</span>`;
    return html`<div class="row"><span class="t">${this.fmt(r.time)}</span><span class="c">${r.conversation_id
      ? html`<button class="link" @click=${() => this.dispatchEvent(new CustomEvent("open-chat", { detail: r.conversation_id }))}>${r.chat_title ?? t("changes_deleted_chat")}</button>`
      : nothing}</span><span class="u">${r.user_name ?? (r.user_id ? r.user_id.slice(0, 8) : t("changes_no_user"))}</span>
<div class="w"><b class="what">${has(key) ? t(key) : r.tool.replace(/_/g, " ")}</b><code title=${r.args}>${r.args}</code></div>
<div class="o">${r.approval ? tag(t(APPROVAL[r.approval]), r.approval === "denied") : nothing}${r.approval === "denied" ? nothing : tag(r.ok ? t("done") : t("failed"), !r.ok)}<span>${r.detail}</span>${r.undo === "undone" ? tag(t("undone")) : nothing}${r.undo === "gone" ? tag(t("changes_undo_gone"), false, t("changes_undo_gone_title")) : nothing}${r.undo === "available"
      ? html`<button class="ghost small" title=${t("undo_title")} @click=${() => this.undo(r)}>${t("undo")}</button>`
      : nothing}</div></div>`;
  }
}

/** The start of a calendar day (plus `add` days) in a time zone, in epoch seconds.
 * The browser has no "midnight in zone X" call, so the offset is read back from Intl
 * and applied twice, which settles it on days when the offset itself changes. */
function dayStart(date: string, add: number, zone?: string): number {
  const [y, m, d] = date.split("-").map(Number);
  if (!zone) return new Date(y, m - 1, d + add).getTime() / 1000;
  const wall = Date.UTC(y, m - 1, d + add);
  const at = wall - offset(wall - offset(wall, zone), zone);
  return at / 1000;
}

function offset(ms: number, zone: string): number {
  const n: Record<string, number> = {};
  for (const p of new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(ms))
    n[p.type] = +p.value;
  return Date.UTC(n.year, n.month - 1, n.day, n.hour, n.minute, n.second) - Math.floor(ms / 1000) * 1000;
}

customElements.define("llm-agent-changes", LlmAgentChanges);
