// The Notes view written with Solid 2.0, to compare against the Lit one in notes.ts on
// a real screen before deciding whether Solid is worth more of the panel. It is a dev
// preview: the integration only registers the page that loads it when the hidden
// solid_preview option is on (see __init__.py), so nobody else running the integration
// ever downloads it.
//
// Behaviour is meant to match notes.ts line for line: the same WebSocket commands, the
// same words and the same CSS. What differs is only how state reaches the DOM. Lit
// re-renders the whole template on every state change and diffs it; here each signal
// updates the text, attribute or list row that reads it, and nothing else runs.
import { For, Show, createEffect, createSignal, type Accessor } from "solid-js";
import { t } from "../i18n";
import type { Hass } from "../types";

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

// Copied from notes.ts rather than imported: notes.ts keeps this CSS inside its Lit
// class, and moving it out would change the Lit bundle, which this preview must leave
// byte for byte as it is. `:host` became `.notes`, because here the view is a div in
// the preview page's shadow root, not an element of its own.
export const notesCss = `.notes{flex:1;min-height:0;overflow-y:auto}
.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}
.bar span{flex:1;text-align:end}
.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}
.off>div{opacity:.55}
.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}
.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}
.ed button{flex:none}
.err{color:var(--danger)}`;

export function Notes(props: { hass: Accessor<Hass | undefined> }) {
  // One signal per piece of state. Lit kept them in one object because each decorated
  // field costs bundle bytes; here a signal costs nothing extra and lets each part of
  // the page subscribe to only what it shows.
  const [data, setData] = createSignal<Data>();
  const [kb, setKb] = createSignal(false);
  // the item being edited (id "" for a new one), and the item asking "Delete?"
  const [edit, setEdit] = createSignal<Item>();
  const [del, setDel] = createSignal("");
  const [error, setError] = createSignal("");

  const close = () => {
    setEdit(undefined);
    setDel("");
  };

  async function call(type: string, msg: Record<string, unknown> = {}): Promise<void> {
    const ws = props.hass()!.connection;
    const get = (type: string, msg = {}) =>
      ws.sendMessagePromise<Data>({ type: "llm_agent/home_notes" + type, ...msg });
    try {
      setData(await get(type, msg));
      close();
      setError("");
    } catch (err) {
      const e = err as { code?: string; message?: string };
      setError(e.message ?? String(err));
      // changed elsewhere (an approved AI suggestion, another window): show what is
      // stored now, and keep the message saying why the edit was not saved
      if (e.code === "changed") {
        setData(await get(""));
        close();
      }
    }
  }

  // Load once Home Assistant has handed over hass. The Lit view does this in
  // connectedCallback; a Solid component has no such hook, and an effect on "is hass
  // there yet" also covers HA setting hass after the element is attached.
  let loaded = false;
  createEffect(
    () => props.hass() !== undefined,
    (ready) => {
      if (ready && !loaded) {
        loaded = true;
        void call("");
      }
    },
  );

  /** A save or delete of `i`, naming the version it started from. */
  const change = (type: string, i: Item, fields: object = {}) =>
    call(type, {
      kind: kb() ? "knowledge" : "note",
      ...(i.id ? { item_id: i.id, base: i.updated } : {}),
      ...fields,
    });

  const items = () => (kb() ? data()?.knowledge : data()?.notes) ?? [];

  const Tab = (p: { on: boolean; label: "notes_tab" | "knowledge_tab" }) => (
    <button
      class="small"
      role="tab"
      // a string: in Solid 2 a boolean false removes an attribute, and the CSS matches
      // [aria-selected=true]
      aria-selected={p.on === kb() ? "true" : "false"}
      onClick={() => {
        setKb(p.on);
        close();
        setError("");
      }}
    >
      {t(p.label)}
    </button>
  );

  const Editor = (p: { e: Item }) => {
    // The draft is edited in place and read back on save, so typing touches no signal
    // and updates nothing on screen, the same trick notes.ts uses to skip a render.
    const set = (key: keyof Item) => (ev: Event) =>
      Object.assign(p.e, { [key]: (ev.target as HTMLInputElement).value });
    const save = () =>
      change("/save", p.e, kb() ? { title: p.e.title, summary: p.e.summary, body: p.e.body } : { text: p.e.text });
    return (
      <div class="row ed">
        <Show
          when={kb()}
          fallback={
            <textarea
              rows="2"
              aria-label={t("home_notes")}
              placeholder={t("notes_placeholder")}
              maxlength={data()?.note_max ?? 300}
              value={p.e.text ?? ""}
              onInput={set("text")}
            />
          }
        >
          <input
            aria-label={t("knowledge_title")}
            placeholder={t("knowledge_title")}
            maxlength="80"
            value={p.e.title ?? ""}
            onInput={set("title")}
          />
          <input
            aria-label={t("knowledge_summary")}
            placeholder={t("knowledge_summary")}
            maxlength="200"
            value={p.e.summary ?? ""}
            onInput={set("summary")}
          />
          <textarea
            rows="14"
            aria-label={t("knowledge_body")}
            placeholder={t("knowledge_body")}
            maxlength="20000"
            value={p.e.body ?? ""}
            onInput={set("body")}
          />
        </Show>
        <button class="small primary" onClick={save}>
          {t("save")}
        </button>
        <button class="small ghost" onClick={() => setEdit(undefined)}>
          {t("cancel")}
        </button>
      </div>
    );
  };

  const Row = (p: { i: Item }) => (
    <div class={["row", { off: !p.i.enabled }]}>
      <input
        type="checkbox"
        aria-label={t("note_enabled")}
        title={t("note_enabled")}
        checked={!!p.i.enabled}
        onChange={() => change("/save", p.i, { enabled: !p.i.enabled })}
      />
      <div>
        <Show when={kb()} fallback={p.i.text}>
          <b>{p.i.title}</b> {p.i.summary}
        </Show>{" "}
        <Show when={p.i.added_by === "agent"}>
          <span class="tag">{t("note_from_ai")}</span>
        </Show>
      </div>
      <Show
        when={del() === p.i.id}
        fallback={
          <>
            <button
              class="small ghost"
              onClick={() => {
                setEdit({ ...p.i });
                setDel("");
                setError("");
              }}
            >
              {t("edit")}
            </button>
            <button class="small ghost" onClick={() => setDel(p.i.id)}>
              {t("delete")}
            </button>
          </>
        }
      >
        <span class="err">{t("delete_confirm")}</span>
        <button class="small danger" onClick={() => change("/delete", p.i)}>
          {t("delete")}
        </button>
        <button class="small ghost" onClick={() => setDel("")}>
          {t("cancel")}
        </button>
      </Show>
    </div>
  );

  return (
    <div class="notes">
      <div class="bar" role="tablist">
        <Tab on={false} label="notes_tab" />
        <Tab on={true} label="knowledge_tab" />
        <span>{kb() || !data() ? "" : t("characters_left", { count: data()!.room })}</span>
        <button class="small primary" onClick={() => setEdit({ id: "", text: "", title: "", summary: "", body: "" })}>
          {t("add")}
        </button>
      </div>
      <p>{t(kb() ? "knowledge_hint" : "notes_hint")}</p>
      <Show when={error()}>
        <p class="err">{error()}</p>
      </Show>
      <Show when={edit()?.id === ""}>
        <Editor e={edit()!} />
      </Show>
      <Show when={data() && !items().length && !edit()}>
        <div class="empty">{t("notes_none")}</div>
      </Show>
      {/* Keyed by id: every save answers with fresh objects, and keying by object
          would rebuild every row on every save. By id, a row stays and only the
          parts that read a changed field update. */}
      <For each={items()} keyed={(i) => i.id}>
        {(i) => (
          <Show when={edit()?.id === i().id} fallback={<Row i={i()} />}>
            <Editor e={edit()!} />
          </Show>
        )}
      </For>
    </div>
  );
}
