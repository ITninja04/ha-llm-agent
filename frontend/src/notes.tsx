// The Notes view: home notes and the knowledge base, each a list of separate items the
// household can switch off, edit or delete. It takes the chat's place like the Changes
// view. Admin only; the server refuses everyone else, the panel only hides the button.
// Every change answers with the whole state, so the room left is always the server's
// number and never worked out here.
// Only the connection is read from hass, so a state change elsewhere in the house
// updates nothing here.
import { For, Show, createEffect, createSignal } from "solid-js";
import { define, hassPart, sheet, type Props } from "./element";
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

const css = sheet(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none}
.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}
.bar span{flex:1;text-align:end}
.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}
.off>div{opacity:.55}
.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}
.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}
.ed button{flex:none}
.err{color:var(--danger)}`);

function Notes(props: Props<{ hass: Hass }>) {
  const conn = hassPart(props.hass, (h) => h.connection);
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
    const ws = conn()!;
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

  // Load once the connection is there. The element is usually given hass before it is
  // attached, but Solid applies that write a microtask later, so this waits for it.
  let loaded = false;
  createEffect(
    () => conn() !== undefined,
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
      // a string: a boolean false would remove the attribute, and the CSS matches
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
    // and updates nothing on screen.
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
    <>
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
          would rebuild every row on every save. */}
      <For each={items()} keyed={(i) => i.id}>
        {(i) => (
          <Show when={edit()?.id === i().id} fallback={<Row i={i()} />}>
            <Editor e={edit()!} />
          </Show>
        )}
      </For>
    </>
  );
}

define<{ hass: Hass }>("llm-agent-notes", {
  props: ["hass"],
  styles: () => [styles.styleSheet!, css],
  view: (p) => <Notes {...p} />,
});
