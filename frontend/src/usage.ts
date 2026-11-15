// The Usage view: estimated spend per day, totals against the daily cap, tokens by
// provider and model, and what is left on each provider where a normal API key can
// read it. It takes the chat's place like the Changes and Notes views. Admin only; the
// server refuses everyone else, the panel only hides the button.
// The chart is plain SVG rather than a chart library: one bar per day is all it needs,
// and a library would cost more of the bundle budget than this whole file.
// The balance is asked for once when the view opens (the server keeps it five minutes);
// switching the range only reloads the usage, never the balance. Nothing polls.
// Written compactly on purpose, like changes.ts: the bundle keeps CSS and template
// whitespace, and CI caps the gzipped panel.
import { LitElement, css, html, nothing, svg, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { t } from "./i18n";
import { styles } from "./styles";
import type { Hass } from "./types";

interface Row {
  provider_id: string;
  provider_type: string;
  provider_name: string | null;
  model: string;
  kind: "chat" | "review" | "task";
  input: number;
  output: number;
  cache_read: number;
  cache_write: number;
  calls: number;
  unpriced: number;
  cost: number;
}

interface Data {
  today: string;
  since: string | null;
  series: { day: string; cost: number }[];
  totals: { today: number; week: number; month: number };
  cap: number;
  cap_used: number;
  breakdown: Row[];
}

interface Balance {
  name: string;
  status: "ok" | "no_api" | "local" | "error";
  billing_url: string | null;
  remaining?: number | null;
  limit?: number | null;
  usage_monthly?: number | null;
  error?: string;
}

const ERR = (err: unknown) => (err as { message?: string }).message ?? String(err);

class LlmAgentUsage extends LitElement {
  static styles = [
    styles,
    css`:host{flex:1;min-height:0;height:auto;overflow-y:auto;background:none;container-type:inline-size}
.bar,.tot,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}
.tot{gap:12px 28px}.tot b{display:block;font-size:20px;font-weight:600;color:var(--text)}
.ch{padding:12px 20px;border-bottom:1px solid var(--line);font-size:12px;color:var(--muted)}
.ch svg{display:block;width:100%;height:140px;margin:4px 0}
.ch rect.b{fill:var(--accent)}.ch rect.h{fill:transparent}.ch g:hover rect.h{fill:var(--accent-soft)}
.ax{display:flex;justify-content:space-between}
.tb{overflow-x:auto;border-bottom:1px solid var(--line)}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{padding:8px 20px 8px 0;text-align:end;white-space:nowrap;border-bottom:1px solid var(--line)}
th:first-child,td:first-child{text-align:start;padding-inline-start:20px;white-space:normal;min-width:9rem;overflow-wrap:anywhere}
th{font-weight:500;color:var(--muted)}tr:last-child td{border-bottom:0}
td small{display:block;color:var(--muted)}
/* a phone has room for model, in, out and cost; cached and calls give way, since cost is
   what the view is for */
@container (max-width:520px){th:nth-child(4),td:nth-child(4),th:nth-child(5),td:nth-child(5){display:none}th,td{padding-inline-end:12px}}
.err{color:var(--danger)}`,
  ];

  @property({ attribute: false }) hass?: Hass;
  /** One state field: each decorated field costs bundle bytes. */
  @state() private s: { u?: Data; b?: Balance[]; days: number; error: string } = {
    days: 30,
    error: "",
  };
  private gen = 0;

  connectedCallback(): void {
    super.connectedCallback();
    void this.load(this.s.days);
    void this.hass?.connection
      .sendMessagePromise<{ providers: Balance[] }>({ type: "llm_agent/balance" })
      .then(
        (r) => (this.s = { ...this.s, b: r.providers }),
        () => undefined, // the usage still shows; balances are a nice-to-have
      );
  }

  private async load(days: number): Promise<void> {
    if (!this.hass) return;
    const gen = ++this.gen; // a slower older range must not overwrite a newer one
    this.s = { ...this.s, days };
    try {
      const u = await this.hass.connection.sendMessagePromise<Data>({ type: "llm_agent/usage", days });
      if (gen === this.gen) this.s = { ...this.s, u, error: "" };
    } catch (err) {
      if (gen === this.gen) this.s = { ...this.s, error: ERR(err) };
    }
  }

  private get loc(): string | undefined {
    return this.hass?.locale?.language;
  }

  private money(v: number): string {
    return new Intl.NumberFormat(this.loc, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: v && Math.abs(v) < 1 ? 4 : 2,
    }).format(v);
  }

  private num(v: number): string {
    return new Intl.NumberFormat(this.loc, { notation: "compact" }).format(v);
  }

  /** A local day as the server names it ("2026-11-15"), shown in the user's language.
   * Formatted in UTC because the string is already the local day, not an instant. */
  private date(day: string): string {
    const [y, m, d] = day.split("-").map(Number);
    return new Intl.DateTimeFormat(this.loc, { dateStyle: "medium", timeZone: "UTC" }).format(Date.UTC(y, m - 1, d));
  }

  protected render(): TemplateResult {
    const { u, b, days, error } = this.s;
    const range = (n: number) =>
      html`<button class="small" role="tab" aria-selected=${days === n} @click=${() => this.load(n)}>${t("usage_days", { n })}</button>`;
    return html`<div class="bar" role="tablist">${range(7)}${range(30)}${range(90)}</div>${error
      ? html`<p class="err">${t("usage_error", { error })}</p>`
      : nothing}${u ? this.body(u) : nothing}${b?.map((x) => this.balance(x))}`;
  }

  private body(u: Data): TemplateResult {
    const tot = (label: string, v: number) => html`<div>${label}<b>${this.money(v)}</b></div>`;
    const pct = u.cap > 0 ? Math.round((u.cap_used / u.cap) * 100) : 0;
    return html`<div class="tot">${tot(t("usage_today"), u.totals.today)}${tot(t("usage_week"), u.totals.week)}${tot(t("usage_month"), u.totals.month)}</div>${u.cap > 0
      ? html`<p>${t("usage_cap", { cap: this.money(u.cap), used: this.money(u.cap_used), pct })}</p>`
      : nothing}${this.chart(u.series)}<p>${u.since ? t("usage_since", { date: this.date(u.since) }) : t("usage_none")} ${t("usage_estimate")}</p>${u.breakdown.length
      ? this.table(u.breakdown)
      : nothing}`;
  }

  private chart(series: Data["series"]): TemplateResult {
    const max = Math.max(...series.map((d) => d.cost), 0);
    const n = series.length;
    // Bars are 10 units apart in a 100 unit high box, stretched to the width: the box
    // is redrawn for 7, 30 or 90 days without measuring the element.
    return html`<div class="ch" aria-label=${t("usage_chart")}>${t("usage_chart")}: ${this.money(max)}<svg viewBox="0 0 ${n * 10} 100" preserveAspectRatio="none" role="img" aria-label=${t("usage_chart")}>${series.map((d, i) => {
      const h = max > 0 && d.cost > 0 ? Math.max((d.cost / max) * 100, 1.5) : 0;
      return svg`<g><title>${this.date(d.day)}: ${this.money(d.cost)}</title><rect class="h" x=${i * 10} y="0" width="10" height="100"></rect><rect class="b" x=${i * 10 + 1.5} y=${100 - h} width="7" height=${h}></rect></g>`;
    })}</svg><div class="ax"><span>${this.date(series[0].day)}</span><span>${this.date(series[n - 1].day)}</span></div></div>`;
  }

  private table(rows: Row[]): TemplateResult {
    const kind = (r: Row) => (r.kind === "task" ? t("usage_kind_task") : r.kind === "review" ? t("usage_kind_review") : "");
    return html`<div class="tb"><table><thead><tr><th>${t("usage_model")}</th><th>${t("usage_in")}</th><th>${t("usage_out")}</th><th>${t("usage_col_cached")}</th><th>${t("usage_calls")}</th><th>${t("usage_cost")}</th></tr></thead><tbody>${rows.map(
      (r) => html`<tr class=${r.kind}><td>${r.model}<small>${r.provider_name ?? r.provider_type}${kind(r) ? html`, ${kind(r)}` : nothing}</small></td><td>${this.num(r.input)}</td><td>${this.num(r.output)}</td><td title=${`${r.cache_read} / ${r.cache_write}`}>${this.num(r.cache_read + r.cache_write)}</td><td>${r.calls}</td><td>${r.unpriced === r.calls
        ? t("usage_no_price")
        : this.money(r.cost)}${r.unpriced && r.unpriced < r.calls ? html`<small>${t("usage_unpriced", { n: r.unpriced })}</small>` : nothing}</td></tr>`,
    )}</tbody></table></div>`;
  }

  private balance(x: Balance): TemplateResult {
    const text =
      x.status === "ok"
        ? x.remaining != null && x.limit != null
          ? t("balance_left", { name: x.name, left: this.money(x.remaining), limit: this.money(x.limit) })
          : t("balance_no_limit", { name: x.name, month: this.money(x.usage_monthly ?? 0) })
        : x.status === "error"
          ? t("balance_error", { name: x.name, error: x.error ?? "" })
          : t(x.status === "local" ? "balance_local" : "balance_none", { name: x.name });
    return html`<p class="bal">${text}${x.billing_url
      ? html` <a href=${x.billing_url} target="_blank" rel="noreferrer">${t("billing_page")}</a>`
      : nothing}</p>`;
  }
}

customElements.define("llm-agent-usage", LlmAgentUsage);
