// The Usage view: estimated spend per day, totals against the daily cap, tokens by
// provider and model, and what is left on each provider where a normal API key can
// read it. It takes the chat's place like the Changes and Notes views. Admin only; the
// server refuses everyone else, the panel only hides the button.
// The chart is plain SVG rather than a chart library: one bar per day is all it needs,
// and a library would cost more of the bundle budget than this whole file.
// The balance is asked for once when the view opens (the server keeps it five minutes);
// switching the range only reloads the usage, never the balance. Nothing polls.
// Only the connection and the language are read from hass, so a state change
// elsewhere in the house updates nothing here.
// The turn log download sits here too: it is the per-turn record behind these totals
// (docs/TURN_LOG.md), fetched only when the button is pressed, since it can be MBs.
import { For, Show, createEffect, createSignal } from "solid-js";
import { define, hassPart, sheet, type Props } from "./element";
import { t } from "./i18n";
import { styles } from "./styles";
import type { Hass } from "./types";

interface Row {
  provider_id: string;
  provider_type: string;
  provider_name: string | null;
  model: string;
  kind: "chat" | "review" | "task" | "earlier";
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
  all_time: { total: number; chats: number; chat_count: number; tasks: number };
  filled_from: string | null;
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

const css = sheet(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
.bar,.tot,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}
.bal a{color:var(--accent)}
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
.err{color:var(--danger)}`);

function Usage(props: Props<{ hass: Hass }>) {
  const conn = hassPart(props.hass, (h) => h.connection);
  const loc = hassPart(props.hass, (h) => h.locale?.language);
  const [u, setU] = createSignal<Data>();
  const [b, setB] = createSignal<Balance[]>();
  const [days, setDays] = createSignal(30);
  const [error, setError] = createSignal("");
  const [logNote, setLogNote] = createSignal("");
  let gen = 0;

  /** Save the turn log as a .jsonl file. Built in the page from the WS reply: the panel
   * has no download URL of its own, and the log never leaves Home Assistant otherwise. */
  async function downloadLog(): Promise<void> {
    const ws = conn();
    if (!ws) return;
    try {
      const r = await ws.sendMessagePromise<{ enabled: boolean; count: number; jsonl: string }>({
        type: "llm_agent/turn_log",
      });
      if (!r.count) {
        setLogNote(t(r.enabled ? "turn_log_empty" : "turn_log_off"));
        return;
      }
      const url = URL.createObjectURL(new Blob([r.jsonl], { type: "application/x-ndjson" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `llm-agent-turns-${new Date().toISOString().slice(0, 10)}.jsonl`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setLogNote(t("turn_log_saved", { count: r.count }));
    } catch (err) {
      setLogNote(t("usage_error", { error: ERR(err) }));
    }
  }

  async function load(n: number): Promise<void> {
    const ws = conn();
    if (!ws) return;
    const mine = ++gen; // a slower older range must not overwrite a newer one
    setDays(n);
    try {
      const data = await ws.sendMessagePromise<Data>({ type: "llm_agent/usage", days: n });
      if (mine === gen) {
        setU(data);
        setError("");
      }
    } catch (err) {
      if (mine === gen) setError(ERR(err));
    }
  }

  // Load once the connection is there (Solid applies the hass write a microtask late).
  let started = false;
  createEffect(
    () => conn(),
    (ws) => {
      if (!ws || started) return;
      started = true;
      void load(30);
      void ws.sendMessagePromise<{ providers: Balance[] }>({ type: "llm_agent/balance" }).then(
        (r) => setB(r.providers),
        () => undefined, // the usage still shows; balances are a nice-to-have
      );
    },
  );

  const money = (v: number): string =>
    new Intl.NumberFormat(loc(), {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: v && Math.abs(v) < 1 ? 4 : 2,
    }).format(v);

  const num = (v: number): string => new Intl.NumberFormat(loc(), { notation: "compact" }).format(v);

  /** A local day as the server names it ("2026-11-15"), shown in the user's language.
   * Formatted in UTC because the string is already the local day, not an instant. */
  const date = (day: string): string => {
    const [y, m, d] = day.split("-").map(Number);
    return new Intl.DateTimeFormat(loc(), { dateStyle: "medium", timeZone: "UTC" }).format(Date.UTC(y, m - 1, d));
  };

  const Range = (p: { n: number }) => (
    <button class="small" role="tab" aria-selected={days() === p.n ? "true" : "false"} onClick={() => load(p.n)}>
      {t("usage_days", { n: p.n })}
    </button>
  );

  const Tot = (p: { label: string; v: number; hint?: string }) => (
    <div title={p.hint ?? ""}>
      {p.label}
      <b>{money(p.v)}</b>
    </div>
  );

  const Chart = (p: { series: Data["series"] }) => {
    const max = () => Math.max(...p.series.map((d) => d.cost), 0);
    const n = () => p.series.length;
    // Bars are 10 units apart in a 100 unit high box, stretched to the width: the box
    // is redrawn for 7, 30 or 90 days without measuring the element.
    return (
      <div class="ch" aria-label={t("usage_chart")}>
        {t("usage_chart")}: {money(max())}
        <svg viewBox={`0 0 ${n() * 10} 100`} preserveAspectRatio="none" role="img" aria-label={t("usage_chart")}>
          <For each={p.series}>
            {(d, i) => {
              const h = () => (max() > 0 && d.cost > 0 ? Math.max((d.cost / max()) * 100, 1.5) : 0);
              return (
                <g>
                  <title>
                    {date(d.day)}: {money(d.cost)}
                  </title>
                  <rect class="h" x={i() * 10} y="0" width="10" height="100" />
                  <rect class="b" x={i() * 10 + 1.5} y={100 - h()} width="7" height={h()} />
                </g>
              );
            }}
          </For>
        </svg>
        <div class="ax">
          <span>{date(p.series[0].day)}</span>
          <span>{date(p.series[n() - 1].day)}</span>
        </div>
      </div>
    );
  };

  const Table = (p: { rows: Row[] }) => {
    const kind = (r: Row) => (r.kind === "task" ? t("usage_kind_task") : r.kind === "review" ? t("usage_kind_review") : "");
    return (
      <div class="tb">
        <table>
          <thead>
            <tr>
              <th>{t("usage_model")}</th>
              <th>{t("usage_in")}</th>
              <th>{t("usage_out")}</th>
              <th>{t("usage_col_cached")}</th>
              <th>{t("usage_calls")}</th>
              <th>{t("usage_cost")}</th>
            </tr>
          </thead>
          <tbody>
            <For each={p.rows}>
              {(r) =>
                r.kind === "earlier" ? (
                  <tr class="earlier">
                    <td>
                      {t("usage_earlier")}
                      <small>{t("usage_earlier_hint")}</small>
                    </td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>{money(r.cost)}</td>
                  </tr>
                ) : (
                  <tr class={r.kind}>
                    <td>
                      {r.model}
                      <small>
                        {r.provider_name ?? r.provider_type}
                        {kind(r) ? `, ${kind(r)}` : ""}
                      </small>
                    </td>
                    <td>{num(r.input)}</td>
                    <td>{num(r.output)}</td>
                    <td title={`${r.cache_read} / ${r.cache_write}`}>{num(r.cache_read + r.cache_write)}</td>
                    <td>{r.calls}</td>
                    <td>
                      {r.unpriced === r.calls ? t("usage_no_price") : money(r.cost)}
                      <Show when={r.unpriced && r.unpriced < r.calls}>
                        <small>{t("usage_unpriced", { n: r.unpriced })}</small>
                      </Show>
                    </td>
                  </tr>
                )
              }
            </For>
          </tbody>
        </table>
      </div>
    );
  };

  const Body = (p: { u: Data }) => {
    const all = p.u.all_time;
    const pct = p.u.cap > 0 ? Math.round((p.u.cap_used / p.u.cap) * 100) : 0;
    return (
      <>
        <div class="tot">
          <Tot label={t("usage_today")} v={p.u.totals.today} />
          <Tot label={t("usage_week")} v={p.u.totals.week} />
          <Tot label={t("usage_month")} v={p.u.totals.month} />
          <Tot label={t("usage_all_time")} v={all.total} hint={t("usage_all_time_hint", { count: all.chat_count })} />
        </div>
        <Show when={p.u.cap > 0}>
          <p>{t("usage_cap", { cap: money(p.u.cap), used: money(p.u.cap_used), pct })}</p>
        </Show>
        <Chart series={p.u.series} />
        <p>
          {p.u.since
            ? p.u.filled_from
              ? t("usage_since_filled", { date: date(p.u.since) })
              : t("usage_since", { date: date(p.u.since) })
            : t("usage_none")}{" "}
          {t("usage_all_time_hint", { count: all.chat_count })} {t("usage_estimate")}
        </p>
        <Show when={p.u.breakdown.length}>
          <Table rows={p.u.breakdown} />
        </Show>
      </>
    );
  };

  const BalanceRow = (p: { x: Balance }) => {
    const text = () => {
      const x = p.x;
      return x.status === "ok"
        ? x.remaining != null && x.limit != null
          ? t("balance_left", { name: x.name, left: money(x.remaining), limit: money(x.limit) })
          : t("balance_no_limit", { name: x.name, month: money(x.usage_monthly ?? 0) })
        : x.status === "error"
          ? t("balance_error", { name: x.name, error: x.error ?? "" })
          : t(x.status === "local" ? "balance_local" : "balance_none", { name: x.name });
    };
    return (
      <p class="bal">
        {text()}
        <Show when={p.x.billing_url}>
          {" "}
          <a href={p.x.billing_url!} target="_blank" rel="noreferrer">
            {t("billing_page")}
          </a>
        </Show>
      </p>
    );
  };

  return (
    <>
      <div class="bar" role="tablist">
        <Range n={7} />
        <Range n={30} />
        <Range n={90} />
      </div>
      <Show when={error()}>
        <p class="err">{t("usage_error", { error: error() })}</p>
      </Show>
      <Show when={u()} keyed>
        {(data) => <Body u={data} />}
      </Show>
      <For each={b() ?? []}>{(x) => <BalanceRow x={x} />}</For>
      <p class="tl">
        <span>{t("turn_log_about")}</span>{" "}
        {/* text only: an icon's svg here would sit after the chart's bars */}
        <button class="small" onClick={() => void downloadLog()}>
          {t("turn_log_download")}
        </button>{" "}
        <Show when={logNote()}>
          <span>{logNote()}</span>
        </Show>
      </p>
    </>
  );
}

define<{ hass: Hass }>("llm-agent-usage", {
  props: ["hass"],
  styles: () => [styles, css],
  view: (p) => <Usage {...p} />,
});
