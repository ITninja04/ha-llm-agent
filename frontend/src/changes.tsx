// The Changes view: every change the assistant made, across all chats, read from the
// audit log by llm_agent/changes. Admin only; the server refuses everyone else, this
// file only hides the button. Undo reuses llm_agent/undo, so a change undone here shows
// as undone in its chat too.
// Only the connection and the three time settings are read from hass, so a state change
// elsewhere in the house updates nothing here.
// Written compactly on purpose: the bundle keeps CSS and template whitespace, and the
// panel has a 60 kB gzipped budget that CI enforces.
import { For, Show, createEffect, createSignal } from "solid-js";
import { define, hassPart, sheet, type Props } from "./element";
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

const css = sheet(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
.bar{display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px}
.bar>*{font:inherit;font-size:13px;color:var(--text);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:5px 8px}
.bar>[type=search]{flex:1;min-width:140px}
.row,.bar,.more{border-bottom:1px solid var(--line)}
/* Every row uses the same column template, and the rows are the same width, so the
   columns line up without the rows sharing a grid. Widths are shares (fr) over a
   minimum, so the change column grows with the pane instead of getting only what fixed
   columns leave. display and gap are set here because the panel's chat styles, which
   this view shares, make .row a flex row. */
.row{display:grid;grid-template-columns:11.5rem minmax(5rem,1fr) minmax(4rem,.6fr) minmax(8rem,2fr) minmax(9rem,1.4fr);grid-template-areas:"t c u w o";gap:4px 16px;align-items:start;padding:10px 20px;font-size:13px;color:var(--muted)}
.row>*,.link{min-width:0;text-align:start;overflow-wrap:anywhere}
.t{grid-area:t;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.c{grid-area:c}.u{grid-area:u;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.w{grid-area:w;display:flex;gap:6px;align-items:baseline}
.o{grid-area:o;display:flex;flex-wrap:wrap;align-items:center;gap:6px}
/* the minimums above add up to about 720px with padding; narrower panes (phones) put
   when, chat and person on one line and the change and outcome below */
@container (max-width:720px){.row{grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"t c u" "w w w" "o o o"}}
b{color:var(--text);font-weight:500;flex:none}
code{font:12px var(--mono);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.link{background:none;border:0;padding:0;font:inherit;color:var(--accent);cursor:pointer}
.bad{color:var(--danger)}
.more{padding:12px 20px}`);

type State = Page & { error: string; loading: boolean };

function Changes(props: Props<{ hass: LocaleHass }>, host: HTMLElement) {
  const conn = hassPart(props.hass, (h) => h.connection);
  // hassPart hands its picker a plain Hass, so the profile fields are reached by a cast
  const part = <T,>(pick: (h: LocaleHass) => T) => hassPart(props.hass, (h) => pick(h as LocaleHass));
  const language = part((h) => h.locale?.language);
  const timeFormat = part((h) => h.locale?.time_format);
  // The zone times are shown in: the server's when the profile says so, else the
  // browser's (Home Assistant's own rule for its "time zone" profile setting).
  const zone = part((h) => (h.locale?.time_zone === "server" ? h.config?.time_zone : undefined));
  const [s, setS] = createSignal<State>({ changes: [], cursor: null, chats: [], users: [], error: "", loading: false });
  // The filters are read only when a query is sent and never drawn, so they are no signal.
  let f = { from: "", to: "", chat: "", user: "", text: "" };
  let gen = 0;
  let timer: number | undefined;

  async function load(more = false): Promise<void> {
    const ws = conn();
    if (!ws) return;
    const before = s();
    const mine = ++gen; // a slower older query must not overwrite a newer one
    setS((p) => ({ ...p, loading: true }));
    let next: Partial<State>;
    try {
      const page = await ws.sendMessagePromise<Page>({
        type: "llm_agent/changes",
        since: f.from ? dayStart(f.from, 0, zone()) : null,
        until: f.to ? dayStart(f.to, 1, zone()) - 0.001 : null,
        conversation_id: f.chat || null,
        user_id: f.user || null,
        text: f.text,
        cursor: more ? before.cursor : null,
      });
      next = { ...page, changes: more ? [...before.changes, ...page.changes] : page.changes, error: "" };
    } catch (err) {
      next = { error: ERR(err) };
    }
    if (mine === gen) setS((p) => ({ ...p, ...next, loading: false }));
  }

  // Load once the connection is there. The element is usually given hass before it is
  // attached, but Solid applies that write a microtask later, so this waits for it.
  let loaded = false;
  createEffect(
    () => conn() !== undefined,
    (ready) => {
      if (ready && !loaded) {
        loaded = true;
        void load();
      }
    },
  );

  const set = (key: keyof typeof f) => (ev: Event) => {
    f = { ...f, [key]: (ev.target as HTMLInputElement).value };
    clearTimeout(timer);
    timer = window.setTimeout(() => void load(), key === "text" ? 300 : 0);
  };

  async function undo(r: Change): Promise<void> {
    if (!confirm(t("confirm_undo", { name: r.detail || r.tool }))) return;
    try {
      await conn()!.sendMessagePromise({
        type: "llm_agent/undo",
        snapshot_id: r.snapshot_id,
        ...(r.conversation_id ? { conversation_id: r.conversation_id } : {}),
      });
    } catch (err) {
      setS((p) => ({ ...p, error: ERR(err) }));
      return;
    }
    await load();
  }

  const fmt = (time: number): string => {
    const tf = timeFormat();
    return new Intl.DateTimeFormat(language(), {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: zone(),
      ...(tf === "12" || tf === "24" ? { hour12: tf === "12" } : {}),
    }).format(time * 1000);
  };

  const Tag = (p: { text: string; bad?: boolean; title?: string }) => (
    <span class={["tag", { bad: p.bad }]} title={p.title ?? ""}>
      {p.text}
    </span>
  );

  const Row = (p: { r: Change }) => {
    const r = p.r;
    const key = `tool_${r.tool}`;
    return (
      <div class="row">
        <span class="t">{fmt(r.time)}</span>
        <span class="c">
          <Show when={r.conversation_id}>
            <button class="link" onClick={() => host.dispatchEvent(new CustomEvent("open-chat", { detail: r.conversation_id }))}>
              {r.chat_title ?? t("changes_deleted_chat")}
            </button>
          </Show>
        </span>
        <span class="u">{r.user_name ?? (r.user_id ? r.user_id.slice(0, 8) : t("changes_no_user"))}</span>
        <div class="w">
          <b class="what">{has(key) ? t(key) : r.tool.replace(/_/g, " ")}</b>
          <code title={r.args}>{r.args}</code>
        </div>
        <div class="o">
          <Show when={r.approval}>{(a) => <Tag text={t(APPROVAL[a()])} bad={a() === "denied"} />}</Show>
          <Show when={r.approval !== "denied"}>
            <Tag text={r.ok ? t("done") : t("failed")} bad={!r.ok} />
          </Show>
          <span>{r.detail}</span>
          <Show when={r.undo === "undone"}>
            <Tag text={t("undone")} />
          </Show>
          <Show when={r.undo === "gone"}>
            <Tag text={t("changes_undo_gone")} title={t("changes_undo_gone_title")} />
          </Show>
          <Show when={r.undo === "available"}>
            <button class="ghost small" title={t("undo_title")} onClick={() => void undo(r)}>
              {t("undo")}
            </button>
          </Show>
        </div>
      </div>
    );
  };

  return (
    <>
      <div class="bar">
        <input type="date" aria-label={t("changes_from")} title={t("changes_from")} onChange={set("from")} />
        <input type="date" aria-label={t("changes_to")} title={t("changes_to")} onChange={set("to")} />
        <select aria-label={t("conversation")} onChange={set("chat")}>
          <option value="">{t("changes_all_chats")}</option>
          {/* Keyed by id so each answer updates the options in place: rebuilding them
              would drop the chosen one and the select would jump back to "all". */}
          <For each={s().chats} keyed={(c) => c.id}>
            {(c) => <option value={c().id}>{c().title || t("new_chat")}</option>}
          </For>
        </select>
        <select aria-label={t("changes_user")} onChange={set("user")}>
          <option value="">{t("changes_everyone")}</option>
          <For each={s().users} keyed={(u) => u.id}>
            {(u) => <option value={u().id}>{u().name}</option>}
          </For>
        </select>
        <input type="search" placeholder={t("changes_search")} aria-label={t("changes_search")} onInput={set("text")} />
      </div>
      <Show
        when={s().error}
        fallback={
          <Show when={!s().loading && !s().changes.length}>
            <div class="empty">{t("changes_none")}</div>
          </Show>
        }
      >
        <div class="empty">{t("changes_error", { error: s().error })}</div>
      </Show>
      <For each={s().changes}>{(r) => <Row r={r} />}</For>
      <Show when={s().cursor}>
        <div class="more">
          <button class="small" disabled={s().loading} onClick={() => void load(true)}>
            {t("changes_more")}
          </button>
        </div>
      </Show>
    </>
  );
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

define<{ hass: LocaleHass }>("llm-agent-changes", {
  props: ["hass"],
  styles: () => [styles, css],
  view: (p, host) => Changes(p, host),
});
