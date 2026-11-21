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
// Rendered once per step by Solid. Only the connection is read from hass, so a state
// change elsewhere in the house updates nothing here. Typed values live in a plain object
// that inputs write to and read once, so typing never rebuilds an input; the radios,
// checkboxes and selects that must follow a value read a version counter instead.
import { For, Match, Show, Switch, createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { define, hassPart, sheet, type Props } from "./element";
import { t } from "./i18n";
import { renderMarkdown } from "./markdown";
import { styles } from "./styles";
import type { Hass } from "./types";

// Home Assistant's icon element, which Solid's JSX types do not know.

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
/** Everything shown. `done` after a save: 0 nothing reloaded, 2 reloaded, 1 or 3 it did
 * not come back. */
interface State {
  step?: Step;
  busy?: boolean;
  error?: string;
  stuck?: boolean;
  done?: number;
  saving?: boolean;
}

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

const css = sheet(`:host{position:absolute;inset:0;height:auto;z-index:20;display:flex;flex-direction:column;background:var(--bg);color:var(--text)}
.top{display:flex;align-items:center;gap:4px;height:60px;flex:none;padding:0 12px;border-bottom:1px solid var(--line)}
.top b{flex:1;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.body{flex:1;overflow-y:auto;overscroll-behavior:contain;padding:20px max(16px,calc((100% - 680px)/2)) 32px}
.body>*+*{margin-top:14px}
.d,.note{color:var(--muted);font-size:13px;line-height:1.5}.d p{margin:4px 0}.d :is(a,strong){color:var(--text)}
.menu{display:grid;gap:8px}.menu button{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;color:var(--text);background:var(--surface);border-color:var(--line);border-radius:12px;text-align:start}.menu button:hover{background:var(--hover)}
form>*+*{margin-top:16px}.r label{align-items:flex-start}.r input{margin-top:3px}
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
.bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}`);

function Settings(props: Props<{ hass: Api }> & { host: HTMLElement }) {
  const conn = hassPart(props.hass, (h) => h.connection);
  const [s, setS] = createSignal<State>({});
  // Solid stages a write until the next microtask, so a read right after a set would
  // answer the old value. `S` is what was last put; handlers read it, markup reads `s`.
  let S: State = {};
  const put = (n: State) => {
    S = n;
    setS(n);
  };
  /** The step as it was drawn. Only a new step from HA replaces it, so a 400 with field
   * errors leaves the inputs (and their focus and text) alone. */
  const [shown, setShown] = createSignal<Step>();
  const [ver, setVer] = createSignal(0);
  let n = 0;
  let v: Values = {};
  /** Object selectors are edited as JSON text; the text is parsed when sent. */
  let raw: Record<string, string> = {};
  let words: Record<string, string> = {};
  let entry: string | undefined;
  let unsub: Promise<() => Promise<void>> | undefined;
  /** Where the entry is in the reload a save starts: 0 none seen, 1 down, 2 loaded
   * again, 3 failed to load. Read from config_entries/subscribe, opened before the
   * first submit, because the reload can finish before the save's own answer arrives. */
  let cycle = 0;

  const step = createMemo(() => s().step);
  const busy = createMemo(() => !!s().busy);
  const saving = createMemo(() => !!s().saving);
  const done = createMemo(() => s().done);
  const error = createMemo(() => s().error ?? "");

  /** A translation from the integration's strings, with the step's placeholders. */
  const tr = (key: string, ph: Step["description_placeholders"]): string => {
    const text = words[C + key] ?? "";
    return ph ? text.replace(/\{(\w+)\}/g, (m, k) => ph[k] ?? m) : text;
  };
  const trs = (key: string) => tr(key, step()?.description_placeholders);
  const reasonOf = (st: Step | undefined): string =>
    st?.type === "abort" ? tr(`options.abort.${st.reason}`, st.description_placeholders) || st.reason || "" : "";

  const mode = createMemo(() => {
    const { step: st, error: err, stuck, saving: sv, done: d } = s();
    if (err) return "error";
    if (!st) return "loading";
    if (stuck) return "stuck";
    if (sv) return "saving";
    if (d !== undefined) return "done";
    if (reasonOf(st)) return "reason";
    return st.type === "menu" ? "menu" : "form";
  });

  const id = () => step()?.step_id ?? "init";
  const title = () =>
    (step()?.type !== "create_entry" && trs(`options.step.${id()}.title`)) || t("integration_settings");
  const desc = () => {
    const st = step();
    return st?.type === "form" || st?.type === "menu" ? trs(`options.step.${id()}.description`) : "";
  };

  const close = () => props.host.dispatchEvent(new CustomEvent("close"));

  /** End the flow on HA's side, as closing HA's dialog does: a sign-in step waiting in
   * the background stops instead of running out its 15 minutes. */
  const drop = () => {
    const st = S.step;
    if (st && ["form", "menu", "progress", "external"].includes(st.type))
      void props.hass()?.callApi("DELETE", `${API}/${st.flow_id}`)?.catch(() => undefined);
  };

  function show(st: Step): void {
    const fs = st.data_schema ?? [];
    // a menu's schema is HA's own next_step_id list, drawn as buttons, never as fields
    const stuck =
      !["form", "menu", "abort", "create_entry"].includes(st.type) ||
      (st.type === "form" && !drawable(fs));
    if (st.type === "form") {
      v = initial(fs);
      raw = {};
    }
    setShown(st);
    put({ step: st, stuck });
    if (stuck) drop();
  }

  async function begin(): Promise<void> {
    const h = props.hass();
    if (!h) return;
    put({ busy: true });
    try {
      let ready = () => {};
      const first = new Promise<void>((r) => (ready = r));
      unsub ??= h.connection.subscribeMessage<{ type: string | null; entry: any }[]>(
        (evs) => {
          for (const { type, entry: e } of evs) {
            if (e.domain !== "llm_agent") continue;
            if (!type) entry ??= e.entry_id;
            else if (e.entry_id === entry)
              cycle =
                e.state === "loaded"
                  ? cycle && 2
                  : /error|retry|failed/.test(e.state)
                    ? 3
                    : cycle || 1;
          }
          ready();
        },
        { type: "config_entries/subscribe" },
      );
      await unsub;
      if (!entry) await first;
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
      words = Object.assign({}, ...res.map((r) => r?.resources));
      if (!entry) throw new Error(t("no_provider"));
      show(await h.callApi<Step>("POST", API, { handler: entry, show_advanced_options: false }));
    } catch (e) {
      put({ error: msg(e) });
    }
  }

  async function send(data: object): Promise<void> {
    const st = S.step!;
    put({ ...S, busy: true });
    cycle = 0;
    let next: Step;
    try {
      next = await props.hass()!.callApi<Step>("POST", `${API}/${st.flow_id}`, data);
    } catch (e: any) {
      // HA's schema check answers 400 with the message for each field
      const errors = e?.body?.errors;
      put(errors ? { step: { ...st, errors }, busy: false } : { ...S, busy: false, error: msg(e) });
      return;
    }
    if (next.type !== "create_entry") return show(next);
    put({ step: next, saving: true });
    // A save that changed something reloads the entry (HA does that, through the
    // integration's update listener). One that changed nothing does not, so the wait
    // for it to start is short; the wait for it to finish is not.
    for (let i = 0; i < 600 && cycle < 2 && (cycle || i < 30); i++)
      await new Promise((r) => setTimeout(r, 100));
    put({ step: next, done: cycle });
    if (cycle === 2) props.host.dispatchEvent(new CustomEvent("reloaded", { bubbles: true, composed: true }));
  }

  function submit(ev: Event): void {
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
        const r = raw[sec + "." + f.name];
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
    const data = pack(S.step?.data_schema ?? [], v);
    if (bad) {
      put({ ...S, step: { ...S.step!, errors: { [bad]: t("settings_bad_json") } } });
      return;
    }
    void send(data);
  }

  // Start once the connection is there. The element is usually given hass before it is
  // attached, but Solid applies that write a microtask later, so this waits for it.
  let started = false;
  createEffect(
    () => conn() !== undefined,
    (ready) => {
      if (ready && !started) {
        started = true;
        void begin();
      }
    },
  );

  // Runs when the element is removed: stop listening for the reload and end the flow.
  onCleanup(() => {
    void unsub?.then((u) => u()).catch(() => undefined);
    unsub = undefined;
    drop();
  });

  const esc = (e: KeyboardEvent) => e.key === "Escape" && (e.preventDefault(), close());

  const Ha = () => (
    <button class="small" onClick={openInHa}>
      {t("open_in_ha")}
    </button>
  );
  const Again = () => (
    <button class="small ghost" disabled={busy()} onClick={() => void begin()}>
      {t("settings_menu")}
    </button>
  );

  const menuList = createMemo(() => {
    const opts = step()?.menu_options ?? [];
    return Array.isArray(opts) ? opts.map((o) => [o, ""]) : Object.entries(opts);
  });

  const field = (f: Field, st: Step, errs: () => Record<string, any>, sec = "") => {
    const trf = (key: string) => tr(key, st.description_placeholders);
    const at = `options.step.${st.step_id}${sec ? `.sections.${sec}` : ""}`;
    const label = trf(`${at}.data.${f.name}`) || f.name;
    const desc = trf(`${at}.data_description.${f.name}`);
    const err = () => (sec && errs()[sec]?.[f.name]) || errs()[f.name];
    const src: Values = sec ? (v[sec] ??= {}) : v;
    const set = (x: unknown) => {
      src[f.name] = x;
      setVer(++n);
    };
    // what the inputs that must follow a value read; text boxes read it once instead
    const cur = () => (ver(), src[f.name]);
    const c = cfg(f);
    const k = kind(f);
    const fid = `f-${sec}-${f.name}`;
    const on = (e: Event) => (e.target as HTMLInputElement).value;
    let input: any;
    if (k === "boolean") {
      input = (
        <label>
          <input type="checkbox" checked={!!cur()} onChange={(e) => set((e.target as HTMLInputElement).checked)} />
          {label}
        </label>
      );
    } else {
      let box: any;
      if (k === "number") {
        const val = src[f.name];
        box = (
          <span class="u">
            <input
              id={fid}
              type="number"
              min={c.min}
              max={c.max}
              step={c.step ?? "any"}
              value={val == null ? "" : String(val)}
              onInput={(e) => set(on(e) === "" ? undefined : Number(on(e)))}
            />
            {c.unit_of_measurement ? <span>{c.unit_of_measurement}</span> : null}
          </span>
        );
      } else if (k === "select") {
        const opts = (c.options ?? []).map((o: any) =>
          typeof o === "string" ? { value: o, label: o } : o,
        ) as { value: string; label: string }[];
        const name = (o: { value: string; label: string }) =>
          (c.translation_key && trf(`selector.${c.translation_key}.options.${o.value}`)) || o.label;
        box =
          c.mode === "list" && !c.custom_value ? (
            <fieldset class="r" id={fid} aria-label={label}>
              {opts.map((o) => (
                <label>
                  <input type="radio" name={fid} checked={cur() === o.value} onChange={() => set(o.value)} />
                  {name(o)}
                </label>
              ))}
            </fieldset>
          ) : c.custom_value ? (
            <>
              <input id={fid} list={fid + "l"} value={src[f.name] ?? ""} onInput={(e) => set(on(e))} />
              <datalist id={fid + "l"}>
                {opts.map((o) => (
                  <option value={o.value}>{name(o)}</option>
                ))}
              </datalist>
            </>
          ) : (
            <select id={fid} onChange={(e) => set(on(e))}>
              <Show when={cur() == null}>
                <option selected></option>
              </Show>
              {opts.map((o) => (
                <option value={o.value} selected={cur() === o.value}>
                  {name(o)}
                </option>
              ))}
            </select>
          );
      } else if (k === "object") {
        const key = sec + "." + f.name;
        const val = src[f.name];
        raw[key] ??= val == null ? "" : JSON.stringify(val, null, 2);
        box = (
          <textarea
            id={fid}
            class="json"
            spellcheck="false"
            value={raw[key]}
            onInput={(e) => (raw[key] = on(e))}
          ></textarea>
        );
      } else if (c.multiline) {
        box = <textarea id={fid} value={src[f.name] ?? ""} onInput={(e) => set(on(e))}></textarea>;
      } else {
        box = (
          <input
            id={fid}
            type={c.type ?? "text"}
            autocomplete={c.type === "password" ? "new-password" : "off"}
            value={src[f.name] ?? ""}
            onInput={(e) => set(on(e))}
          />
        );
      }
      input = (
        <>
          <label for={fid}>{label}</label>
          {box}
        </>
      );
    }
    return (
      <div class="f">
        {input}
        {desc ? <div class="d" innerHTML={renderMarkdown(desc)}></div> : null}
        <Show when={err()}>
          <div class="err">{trf(`options.error.${err()}`) || err()}</div>
        </Show>
      </div>
    );
  };

  const Form = (p: { st: Step }) => {
    const errs = (): Record<string, any> => step()?.errors ?? {};
    const st = p.st;
    const trf = (key: string) => tr(key, st.description_placeholders);
    return (
      <form onSubmit={submit} novalidate>
        <Show when={errs().base}>
          <div class="err" role="alert">
            {trf(`options.error.${errs().base}`) || errs().base}
          </div>
        </Show>
        {(st.data_schema ?? []).map((f) => {
          if (f.type !== "expandable") return field(f, st, errs);
          const sd = trf(`options.step.${st.step_id}.sections.${f.name}.description`);
          return (
            <details open={!!f.expanded}>
              <summary>{trf(`options.step.${st.step_id}.sections.${f.name}.name`) || f.name}</summary>
              {sd ? <div class="d" innerHTML={renderMarkdown(sd)}></div> : null}
              {(f.schema ?? []).map((g) => field(g, st, errs, f.name))}
            </details>
          );
        })}
        <div class="bar">
          <button class="small ghost" type="button" disabled={busy()} onClick={() => (drop(), void begin())}>
            {t("settings_menu")}
          </button>
          <button class="small primary" type="submit" disabled={busy()}>
            {t("settings_submit")}
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      <div class="top" onKeyDown={esc}>
        <button class="icon" title={t("close")} aria-label={t("close")} onClick={close}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
        <b>{title()}</b>
      </div>
      <div class="body" aria-busy={busy() || saving() ? "true" : "false"} onKeyDown={esc}>
        <Show when={desc()}>
          <div class="d" innerHTML={renderMarkdown(desc())}></div>
        </Show>
        <Switch>
          <Match when={mode() === "error"}>
            <div class="err" role="alert">
              {t("settings_error", { error: error() })}
            </div>
            <div class="bar">
              <Again />
              <Ha />
            </div>
          </Match>
          <Match when={mode() === "loading"}>
            <div class="note">{t("settings_loading")}</div>
          </Match>
          <Match when={mode() === "stuck"}>
            <div class="note">{t("settings_unsupported")}</div>
            <div class="bar">
              <Again />
              <Ha />
            </div>
          </Match>
          <Match when={mode() === "saving"}>
            <div class="note" role="status">
              {t("settings_reloading")}
            </div>
          </Match>
          <Match when={mode() === "done"}>
            <div class="note" role="status">
              {t(done() === 2 ? "settings_reloaded" : done() ? "settings_reload_failed" : "settings_saved")}
            </div>
            <div class="bar">
              <Show when={done() === 1 || done() === 3}>
                <Ha />
              </Show>
              <Again />
              <button class="small primary" onClick={close}>
                {t("settings_back")}
              </button>
            </div>
          </Match>
          <Match when={mode() === "reason"}>
            <div class="note">{reasonOf(step())}</div>
            <div class="bar">
              <Again />
            </div>
          </Match>
          <Match when={mode() === "menu"}>
            <div class="menu">
              <For each={menuList()}>
                {(e) => (
                  <button disabled={busy()} onClick={() => void send({ next_step_id: e[0] })}>
                    {trs(`options.step.${step()?.step_id}.menu_options.${e[0]}`) || e[1] || e[0]}
                    <ha-icon icon="mdi:chevron-right"></ha-icon>
                  </button>
                )}
              </For>
            </div>
          </Match>
          <Match when={mode() === "form"}>
            <Show when={shown()} keyed>
              {(st) => <Form st={st} />}
            </Show>
          </Match>
        </Switch>
      </div>
    </>
  );
}

define<{ hass: Api }>("llm-agent-settings", {
  props: ["hass"],
  styles: () => [styles, css],
  view: (p, host) => <Settings {...p} host={host} />,
});
