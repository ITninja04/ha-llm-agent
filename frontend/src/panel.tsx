import { render, type JSX } from "@solidjs/web";
import { For, Match, Show, Switch, createEffect, createMemo, flush, type Accessor } from "solid-js";
import { hassPart, sheet, state } from "./element";
import { has, type Key, loadLanguage, t } from "./i18n";
import { renderMarkdown } from "./markdown";
import { type ComposerBox, insideFence, makeBox } from "./composer";
import { Mentions, withChips } from "./mentions";
import "./preview";
import "./changes";
import "./notes";
import "./usage";
import { openInHa } from "./settings";
import { type PageContext, currentSelection } from "./pagecontext";
import { styles } from "./styles";
import type {
  ChatEvent,
  Conversation,
  ConvSummary,
  Hass,
  HassConnection,
  Info,
  Item,
  Mention,
  Prefs,
  ModelSuggestion,
  ProviderInfo,
  ReviewVerdict,
  StoredMessage,
  Usage,
  Photo,
  AttachedFile,
} from "./types";

// Arguments a preview diff shows in full (same list as the server's phone text).
const DIFF_ARGS = new Set(["config", "content", "old", "new", "text", "body"]);

const EMPTY_USAGE: Usage = {
  input: 0,
  output: 0,
  cache_read: 0,
  cache_write: 0,
  cost: 0,
};

// The floating chat (and the e2e test) read the page with the same collector the chip
// shows, from this one bundle.
export { collectPageContext } from "./pagecontext";
export type { PageContext } from "./pagecontext";

class LlmAgentPanel extends HTMLElement {
  /* The panel keeps itself clear of the phone's status bar and home indicator. It is
   * registered with handle_safe_area (custom_components/llm_agent/__init__.py), because
   * otherwise HA pads its own container by those insets (ha-panel-custom.ts in HA
   * frontend 20261028.6, lines 182-183) around a host that is already 100dvh tall, and
   * the page grows by both insets and scrolls. height: 100% is no way out: that
   * container has no height of its own. The padding sits inside the 100dvh box
   * (border-box), and the floating window takes care of the insets itself, so it gets
   * none. Left and right follow HA, where the sidebar already covers its side. */
  static hostCss = sheet(`
      :host {
        box-sizing: border-box;
        padding: var(--safe-area-inset-top, 0px)
          var(--safe-area-content-inset-right, var(--safe-area-inset-right, 0px))
          var(--safe-area-inset-bottom, 0px)
          var(--safe-area-content-inset-left, var(--safe-area-inset-left, 0px));
      }
      :host([embedded]) {
        padding: 0;
      }
    `);

  @state() private _hass?: Hass;
  // no initializer: it would run before the constructor moves a value HA set early
  @state() narrow?: boolean;

  get hass(): Hass | undefined {
    return this._hass;
  }

  /** HA sets this on every state change in the house. The first one starts the panel
   * (Lit's updated() did this after the first render with hass). */
  set hass(hass: Hass | undefined) {
    this._hass = hass;
    if (hass && !this.started && this.isConnected) {
      this.started = true;
      queueMicrotask(() => void this.init());
    }
  }
  /** The page the person is on, set by the floating chat. The full panel at /llm-agent
   * never sets it, so it shows no page chip. */
  @state() private _page?: PageContext;

  get pageContext(): PageContext | undefined {
    return this._page;
  }

  /** A new page turns the chip back on (Lit's willUpdate did this). */
  set pageContext(now: PageContext | undefined) {
    const old = this._page;
    if (old?.path !== now?.path || old?.summary !== now?.summary) this.pageOff = false;
    this._page = now;
  }
  /** Drawn inside the floating chat window (float.ts) rather than as HA's panel: the
   * narrow layout at any width, since the window is phone sized, and no HA menu button,
   * which would open HA's sidebar from inside a window on top of it. */
  @state() private _embedded = false;

  get embedded(): boolean {
    return this._embedded;
  }

  /** Reflected as the embedded attribute, which the host styles above match. */
  set embedded(on: boolean) {
    this._embedded = on;
    this.toggleAttribute("embedded", on);
  }

  @state() private info?: Info;
  @state() private convs: ConvSummary[] = [];
  @state() private query = "";
  @state() private previews = new Set<string>();
  @state() private hits: ConvSummary[] | null = null;
  private searchTimer?: number;
  @state() private convId: string | null = null;
  @state() private chatTitle = "New chat";
  @state() private items: Item[] = [];
  @state() private usage: Usage = EMPTY_USAGE;
  @state() private running = false;
  /** Read out by screen readers: replies finished, approvals waiting, errors. */
  @state() private announce = "";
  /** Index in `items` of the sent message being edited, or -1. */
  @state() private editAt = -1;
  /** The composer has text: Send is disabled without it (or an attachment). */
  @state() private hasText = false;
  /** Photos waiting to go with the next message. */
  @state() private photos: Photo[] = [];
  /** Files other than pictures waiting to go with the next message. */
  @state() private files: AttachedFile[] = [];
  /** Files are being dragged over the panel. */
  @state() private dragging = false;
  /** Bumped whenever the draft attachments are cleared, so a photo or file still being
   * read then is thrown away instead of reappearing. */
  private photoGen = 0;
  @state() private providerId = "";
  @state() private model = "";
  /** Models fetched from each provider, loaded the first time the model box is used. */
  @state() private fetched: Record<string, ModelSuggestion[]> = {};
  @state() private showList = false;
  @state() private loadError = "";
  @state() private mentions: Mention[] = [];
  // @Name labels in the composer and the exact ids they stand for (see mentions.ts)
  private picked = new Mentions();
  @state() private prefs: Prefs = loadPrefs();
  @state() private showPrefs = false;
  /** The integration's own settings (its options flow), drawn over the panel. */
  @state() private showSettings = false;
  /** A view in the chat's place: Changes, Notes or Usage, named by `view`. One flag for
   * all, so everything that hides the composer for Changes covers the others too. */
  @state() private showChanges = false;
  @state() private view: "changes" | "notes" | "usage" = "changes";
  @state() private mentionIndex = 0;
  /** The page chip switched off for the next messages. On again when the page changes. */
  @state() private pageOff = false;
  private mentionStart = -1;

  private source?: HTMLTextAreaElement;
  /** The chat box: the Markdown editor, or the textarea when the editor cannot start. */
  private input?: ComposerBox;
  private scroller?: HTMLElement;

  private gen = 0;
  private listening?: HassConnection;
  private unsub?: () => Promise<void>;
  private started = false;
  private stickToBottom = true;
  private renderTimer?: number;

  /** The phone layout: chats behind a button, the composer without the keys hint. */
  private get slim(): boolean {
    return this.narrow || this.embedded;
  }

  private get ws() {
    return this.hass!.connection;
  }

  private applyPrefs(): void {
    const p = this.prefs;
    if (p.theme === "auto") this.removeAttribute("data-theme");
    else this.setAttribute("data-theme", p.theme);
    if (p.size === "normal") this.removeAttribute("data-size");
    else this.setAttribute("data-size", p.size);
    this.toggleAttribute("data-compact", p.compact);
  }

  private setPref<K extends keyof Prefs>(key: K, value: Prefs[K]): void {
    this.prefs = { ...this.prefs, [key]: value };
    savePrefs(this.prefs);
    this.applyPrefs();
  }

  /** Make the current provider and model this user's default for new chats (or clear it). */
  private async setMyDefault(clear = false): Promise<void> {
    const res = await this.ws.sendMessagePromise<{
      my_default: Info["my_default"];
    }>({
      type: "llm_agent/my_default",
      provider_id: clear ? null : this.providerId,
      model: clear ? "" : this.model,
    });
    if (this.info) this.info = { ...this.info, my_default: res.my_default };
  }

  /** Provider and model for a new chat: the user's own default if it still exists. */
  private startModel(): void {
    const mine = this.info?.my_default;
    const p =
      (mine && this.info?.providers.find((x) => x.id === mine.provider_id)) ||
      this.info?.providers[0];
    if (!p) return;
    this.providerId = p.id;
    this.model =
      mine && mine.provider_id === p.id && mine.model
        ? mine.model
        : p.default_model;
  }

  /** The page to send with a message: the chip's page with the latest selection, or
   * nothing when the chip is off or there is no page. */
  private pageToSend(): PageContext | undefined {
    const page = this.pageContext;
    if (!page || this.pageOff) return undefined;
    const selection = currentSelection();
    const details = { ...page.details };
    if (selection) details.selection = selection;
    else delete details.selection;
    return { ...page, details };
  }

  #rendered = false;

  constructor() {
    super();
    // A property set before the element was defined sits on the instance and would hide
    // the accessor; move it over, as Lit did for its properties.
    for (const key of ["hass", "narrow", "pageContext", "embedded"] as const) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const v = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = v;
      }
    }
  }

  connectedCallback(): void {
    if (!this.#rendered) {
      // Rendered once and kept, as Lit kept its shadow DOM, so a move in the page (the
      // floating window keeps one panel for the life of the page) loses nothing.
      this.#rendered = true;
      const root = this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = [styles, LlmAgentPanel.hostCss];
      render(() => this.renderPanel(), root);
    }
    if (this.hass && !this.started) {
      this.started = true;
      queueMicrotask(() => void this.init());
    }
  }

  /** The composer's textarea is rendered by the template; the box that formats it is
   * made here, once per textarea, and kept in step with its placeholder. */
  private attachBox(): void {
    const ta = this.source;
    if (!ta) return;
    if (this.input?.source !== ta) {
      this.input?.destroy();
      this.input = makeBox(ta, {
        onKey: (ev) => this.onKey(ev),
        onChange: () => this.onInput(),
        onPaste: (ev) => void this.onPaste(ev),
        onBlur: () =>
          // close the list unless focus came back (a pick by mouse refocuses the box)
          setTimeout(() => {
            if (this.shadowRoot!.activeElement !== this.input?.el)
              this.mentions = [];
          }, 150),
      });
    }
    this.input.setPlaceholder(ta.placeholder);
  }

  /** Copy buttons on code blocks in finished replies (the model's YAML is often pasted). */
  private addCopyButtons(): void {
    if (!this.scroller) return;
    for (const pre of this.scroller.querySelectorAll<HTMLPreElement>(
      ".md pre:not([data-copy])",
    )) {
      pre.dataset.copy = "1";
      const btn = document.createElement("button");
      btn.className = "copy small ghost";
      btn.textContent = t("copy");
      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code") ?? pre;
        btn.textContent = t((await copyText(code.textContent ?? "")) ? "copied" : "copy_failed");
        setTimeout(() => (btn.textContent = t("copy")), 1500);
      });
      pre.prepend(btn);
    }
  }

  /** Copy a reply's markdown source; the button shows a tick (or a warning) for a moment. */
  private async copy(text: string, btn: HTMLElement): Promise<void> {
    const ok = await copyText(text);
    const icon = btn.querySelector("ha-icon");
    icon?.setAttribute("icon", ok ? "mdi:check" : "mdi:alert-circle-outline");
    this.announce = t(ok ? "copied" : "copy_failed");
    setTimeout(() => icon?.setAttribute("icon", "mdi:content-copy"), 1500);
  }

  /** After the socket reconnects, subscriptions are gone (sends are never resent), so
   * read the open chat again: it reattaches if the reply is still going. */
  private readonly onReady = (): void => {
    if (this.running && this.convId) void this.open(this.convId).catch(() => undefined);
  };

  disconnectedCallback(): void {
    // A move (out and back in within the same task) is not a leave.
    queueMicrotask(() => {
      if (this.isConnected) return;
      this.listening?.removeEventListener?.("ready", this.onReady);
      this.listening = undefined;
      void this.detach();
      this.started = false;
    });
  }

  private async init(): Promise<void> {
    this.listening = this.ws;
    this.ws.addEventListener?.("ready", this.onReady);
    await loadLanguage(this.hass?.locale?.language);
    try {
      this.info = await this.ws.sendMessagePromise<Info>({
        type: "llm_agent/info",
      });
      this.loadError = "";
    } catch (err) {
      this.loadError = (err as { message?: string }).message ?? String(err);
      return;
    }
    this.applyPrefs();
    if (!this.providerId) this.startModel();
    await this.refreshList();
    // Coming back to the panel reopens the chat that was open last time.
    const last = this.convId ?? lastConv();
    if (last && this.convs.some((c) => c.id === last)) {
      try {
        await this.open(last);
      } catch {
        rememberConv(null);
      }
    }
    if (!this.convId) {
      flush(); // the composer exists from the first render; let it see the state above
      this.setText(loadDraft(this.draftKey, null));
    }
  }

  private async refreshList(): Promise<void> {
    this.convs = await this.ws.sendMessagePromise<ConvSummary[]>({
      type: "llm_agent/conversations/list",
    });
    pruneDrafts(this.draftKey, this.convs);
  }

  /** Drafts are kept per Home Assistant user, so people sharing a browser don't see
   * (or prune) each other's. */
  private get draftKey(): string {
    return `llm-agent-drafts-${this.hass?.user?.id ?? ""}`;
  }

  /** Put text in the composer. It is saved as this chat's draft, except while a sent
   * message is being edited: Cancel then brings the real draft back. */
  private setText(text: string): void {
    const ta = this.input;
    if (!ta) return;
    const shown = this.picked.show(text, this.hass);
    ta.setMentions(this.picked.labels());
    ta.value = shown;
    this.stored(text);
  }

  /** The composer's text with each @Name back to its id, as it is sent and stored. */
  private get composed(): string {
    return this.picked.expand(this.input?.value ?? "");
  }

  private stored(text: string): void {
    this.hasText = !!text.trim();
    this.input?.fit();
    if (this.editAt < 0) saveDraft(this.draftKey, this.convId, text);
  }

  /** Back to the composer after sending and when a reply ends. Not on touch screens,
   * where focusing opens the keyboard over the reply, and not away from another field
   * (an approval note) the person is typing in. */
  private focusComposer(): void {
    const active = this.shadowRoot!.activeElement;
    if (matchMedia("(pointer: coarse)").matches) return;
    if (active && active !== this.input?.el && active.tagName !== "BUTTON") return;
    this.input?.focus();
  }

  /** A household member (not an admin): a simpler panel, the server enforces the limits. */
  private get member(): boolean {
    return this.info?.is_admin === false;
  }

  /** May change the integration's settings: HA's flow API refuses everyone else, the
   * check here only keeps members from seeing entries that would fail for them. */
  private get admin(): boolean {
    return !this.member && !!this.hass?.user?.is_admin;
  }

  /** A settings save reloaded the integration: providers, models and limits may have
   * changed, and a reply that was running was stopped by the reload. */
  private readonly reloaded = async (): Promise<void> => {
    try {
      this.info = await this.ws.sendMessagePromise<Info>({ type: "llm_agent/info" });
    } catch {
      return;
    }
    if (!this.provider) this.startModel();
    await this.refreshList();
    if (this.convId) await this.open(this.convId).catch(() => undefined);
  };

  private get provider(): ProviderInfo | undefined {
    return this.info?.providers.find((p) => p.id === this.providerId);
  }

  // ---- conversations -------------------------------------------------------

  /** End the current view's subscription. Returns the new view's generation: anything
   * still on its way for an older one is dropped. */
  private async detach(): Promise<number> {
    const gen = ++this.gen;
    const unsub = this.unsub;
    this.unsub = undefined;
    if (unsub) {
      try {
        await unsub();
      } catch {
        /* socket already closed */
      }
    }
    return gen;
  }

  private clearAttachments(): void {
    this.photos = [];
    this.files = [];
    this.photoGen++;
  }

  private newChat(): void {
    this.showChanges = false;
    this.editAt = -1;
    this.clearAttachments();
    void this.detach();
    this.convId = null;
    rememberConv(null);
    this.chatTitle = "New chat";
    this.items = [];
    this.usage = EMPTY_USAGE;
    this.running = false;
    this.showList = false;
    this.startModel();
    this.setText(loadDraft(this.draftKey, null));
    this.input?.focus();
  }

  private async open(id: string, retried = false): Promise<void> {
    this.showChanges = false;
    const gen = await this.detach();
    if (gen !== this.gen) return; // a newer open started while the old one ended
    this.showList = false;
    this.editAt = -1;
    this.clearAttachments();
    const conv = await this.ws.sendMessagePromise<Conversation>({
      type: "llm_agent/conversations/get",
      conversation_id: id,
    });
    if (gen !== this.gen) return; // another chat was opened meanwhile
    this.convId = conv.id;
    rememberConv(conv.id);
    this.setText(loadDraft(this.draftKey, conv.id));
    this.chatTitle = conv.title;
    this.usage = conv.usage;
    this.providerId = conv.provider_id;
    this.model = conv.model;
    this.items = toItems(conv.messages);
    if (conv.stopped && conv.stopped_text)
      this.items = [...this.items, {
        kind: "notice",
        text: conv.stopped_text,
        stop: conv.stopped,
      }];
    this.running = false;
    this.stickToBottom = true;
    const info = await this.ws.sendMessagePromise<Info>({
      type: "llm_agent/info",
    });
    if (gen !== this.gen || !info.running.includes(id)) return;
    this.running = true;
    this.items = [...this.items, { kind: "assistant", text: "" }];
    let unsub: () => Promise<void>;
    try {
      unsub = await this.ws.subscribeMessage<ChatEvent>(
        (e) => {
          if (gen === this.gen) this.onEvent(e);
        },
        { type: "llm_agent/attach", conversation_id: id },
      );
    } catch {
      // it finished between reading the chat and attaching: read it again
      if (gen === this.gen && !retried) await this.open(id, true);
      else if (gen === this.gen) this.running = false;
      return;
    }
    this.keepOrDrop(gen, unsub);
  }

  /** Install a subscription only if its view is still current; otherwise end it. */
  private keepOrDrop(gen: number, unsub: () => Promise<void>): void {
    if (gen === this.gen) this.unsub = unsub;
    else void unsub().catch(() => undefined);
  }

  /** The call's arguments, in full: what Approve runs must be visible. A diff already
   * shows content, so those arguments are left out next to one. */
  private renderArgs(args: Record<string, unknown> | undefined, hasDiff: boolean) {
    const shown = Object.fromEntries(
      Object.entries(args ?? {}).filter(([k]) => !(hasDiff && DIFF_ARGS.has(k))),
    );
    if (!Object.keys(shown).length) return null;
    return <pre class="args">{JSON.stringify(shown, null, 2)}</pre>;
  }

  private async removeConv(id: string, ev: Event): Promise<void> {
    ev.stopPropagation();
    if (!confirm(t("confirm_delete"))) return;
    await this.ws.sendMessagePromise({
      type: "llm_agent/conversations/delete",
      conversation_id: id,
    });
    if (id === this.convId) this.newChat();
    await this.refreshList();
  }

  // ---- sending -------------------------------------------------------------

  private lastUserIndex(): number {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].kind === "user") return i;
    }
    return -1;
  }

  /** Send the composer text, or `retry` to run the last message again. Retrying or
   * editing the last message replaces it and its reply; editing an earlier one first
   * cuts the saved chat there (llm_agent/conversations/truncate). */
  private async send(retry?: string, overCap = false): Promise<void> {
    const lastUser = this.lastUserIndex();
    const at = retry !== undefined ? lastUser : this.editAt;
    // the chat command rewinds the last message itself, in the same step as the send
    const rewind = at >= 0 && at === lastUser;
    const prev = this.items[lastUser];
    const photos =
      retry !== undefined
        ? (prev?.kind === "user" && prev.images) || []
        : this.photos;
    const files =
      retry !== undefined ? (prev?.kind === "user" && prev.files) || [] : this.files;
    // a retry asks the same question about the same page
    const page =
      retry !== undefined && prev?.kind === "user" && prev.pageData
        ? prev.pageData
        : this.pageToSend();
    let text = retry ?? this.composed.trim();
    // the server needs some text; file names make a better chat title than a placeholder
    if (!text && files.length) text = `(${files.map((f) => f.name).join(", ")})`;
    if (!text && photos.length) text = "(photo)";
    if (!text || this.running) return;
    if (
      retry !== undefined &&
      prev?.kind === "user" &&
      ((prev.photos && !prev.images) || prev.files?.some((f) => !f.data))
    ) {
      // its photos or files weren't kept: let the person attach them again rather
      // than silently replacing the answer with one that never saw them
      this.edit(lastUser);
      return;
    }
    const gen = this.gen;
    const kept = at >= 0 ? this.items.slice(0, at) : this.items;
    if (at >= 0 && !rewind) {
      try {
        await this.ws.sendMessagePromise({
          type: "llm_agent/conversations/truncate",
          conversation_id: this.convId,
          index: kept.filter((i) => i.kind === "user").length,
        });
      } catch (err) {
        this.push({ kind: "notice", text: errText(err), error: true });
        return;
      }
      if (gen !== this.gen) return;
    }
    // to put back if the server refuses the message; a cut chat stays cut
    const before = {
      items: at >= 0 && !rewind ? kept : this.items,
      draft: this.composed,
      photos: this.photos,
      files: this.files,
      editAt: rewind ? this.editAt : -1,
    };
    const wasEditing = this.editAt >= 0;
    this.editAt = -1;
    if (retry === undefined) {
      this.clearAttachments();
      // after an edit, the draft typed before it comes back
      this.setText(wasEditing ? loadDraft(this.draftKey, this.convId) : "");
      this.focusComposer();
    }
    this.items = [
      ...kept,
      {
        kind: "user",
        text,
        images: photos.length ? photos : undefined,
        files: files.length ? files : undefined,
        page: page?.summary,
        pageData: page,
      },
      { kind: "assistant", text: "" },
    ];
    this.running = true;
    this.announce = "";
    this.stickToBottom = true;
    try {
      const unsub = await this.ws.subscribeMessage<
        ChatEvent | { type: "conversation"; conversation_id: string; title: string }
      >(
        (e) => {
          if (gen !== this.gen) return;
          if (e.type === "conversation") {
            // the chat's real id, never guessed from the list (another tab may add one)
            if (!this.convId) {
              this.convId = e.conversation_id;
              this.chatTitle = e.title || text.slice(0, 60);
              rememberConv(this.convId);
            }
            return;
          }
          this.onEvent(e as ChatEvent);
        },
        {
          type: "llm_agent/chat",
          text,
          conversation_id: this.convId,
          provider_id: this.providerId || undefined,
          model: this.model || undefined,
          rewind: rewind || undefined,
          over_cap: overCap || undefined,
          language: this.hass?.locale?.language || undefined,
          images: photos.length
            ? photos.map(({ media_type, data }) => ({ media_type, data }))
            : undefined,
          files: files.length
            ? files.map(({ name, data }) => ({ name, data }))
            : undefined,
          page,
        },
        // a reconnect must never send the message again
        { resubscribe: false },
      );
      this.keepOrDrop(gen, unsub);
    } catch (err) {
      if (gen !== this.gen) return; // the user has moved on; this chat isn't shown
      this.running = false;
      this.items = before.items;
      this.editAt = before.editAt;
      if (retry === undefined) {
        this.setText(before.draft);
        this.photos = before.photos;
        this.files = before.files;
      }
      this.push({ kind: "notice", text: errText(err), error: true });
      return;
    }
    await this.refreshList();
  }

  private onEvent(e: ChatEvent): void {
    switch (e.type) {
      case "delta": {
        const last = this.items[this.items.length - 1];
        if (last?.kind === "assistant") {
          last.text += e.text;
        } else {
          this.items = [...this.items, { kind: "assistant", text: e.text }];
        }
        this.scheduleRender();
        return;
      }
      case "tool_start":
        this.push({
          kind: "tool",
          id: e.call_id,
          name: e.name,
          args: e.args,
          status: "running",
        });
        return;
      case "approval":
        this.patchTool(
          e.call_id,
          {
            status: "waiting",
            approval: {
              summary: e.summary,
              reason: e.reason,
              risky: e.risky,
              diff: e.diff,
              phoneOnly: e.phone_only,
              phone: e.phone,
            },
          },
          {
            kind: "tool",
            id: e.call_id,
            name: e.name,
            args: e.args,
            status: "waiting",
          },
        );
        this.announce = e.phone_only
          ? t("announce_phone")
          : t("announce_approval");
        return;
      case "review_start":
        this.patchTool(e.call_id, { reviewing: true });
        return;
      case "review":
        this.patchTool(e.call_id, {
          reviewing: false,
          review: { decision: e.decision, reason: e.reason, model: e.model },
        });
        return;
      case "tool_result":
        this.patchTool(e.call_id, {
          ...(e.review ? { review: e.review } : {}),
          ...(e.image?.startsWith("data:image/") ? { image: e.image } : {}),
          status: e.ok ? "ok" : "error",
          summary: e.summary,
          preview: e.preview,
          snapshotId: e.snapshot_id,
          approval: undefined,
        });
        // the model writes its next text after the tools
        this.push({ kind: "assistant", text: "" });
        return;
      case "usage":
        this.usage = e.usage;
        return;
      case "notice":
        this.push({ kind: "notice", text: e.text, stop: e.stop });
        return;
      case "error":
        this.push({ kind: "notice", text: e.message, error: true });
        this.announce = t("announce_error");
        return;
      case "done":
        this.usage = e.usage;
        this.running = false;
        // The log region reads the reply itself; this only marks the end.
        this.announce = t("announce_done");
        this.items = this.items.filter(
          (i) => !(i.kind === "assistant" && !i.text),
        );
        queueMicrotask(() => {
          flush();
          this.focusComposer();
        });
        void this.detach();
        void this.refreshList().then(() => {
          this.chatTitle =
            this.convs.find((c) => c.id === this.convId)?.title ??
            this.chatTitle;
        });
        return;
    }
  }

  private scheduleRender(): void {
    // Streaming tokens re-render at most ~12 times a second.
    if (this.renderTimer !== undefined) return;
    this.renderTimer = window.setTimeout(() => {
      this.renderTimer = undefined;
      // The reply grows in place (onEvent appends to its text); a new copy of the last
      // item is what tells its row to draw the text again. Rows are kept by index.
      const n = this.items.length;
      if (n) this.items = [...this.items.slice(0, -1), { ...this.items[n - 1] }];
    }, 80);
  }

  private push(item: Item): void {
    const items = this.items.filter(
      (i) => !(i.kind === "assistant" && !i.text),
    );
    this.items = [...items, item];
  }

  private patchTool(
    id: string,
    patch: Partial<Extract<Item, { kind: "tool" }>>,
    fallback?: Item,
  ): void {
    let found = false;
    this.items = this.items.map((i) => {
      if (i.kind === "tool" && i.id === id) {
        found = true;
        return { ...i, ...patch };
      }
      return i;
    });
    if (!found && fallback)
      this.push({ ...(fallback as object), ...patch } as Item);
  }

  private async answer(id: string, approved: boolean): Promise<void> {
    const note =
      (
        this.shadowRoot!.querySelector(
          `#note-${CSS.escape(id)}`,
        ) as HTMLInputElement | null
      )?.value ?? "";
    const card = this.items.find((i) => i.kind === "tool" && i.id === id) as
      | Extract<Item, { kind: "tool" }>
      | undefined;
    const prior = card ? { status: card.status, approval: card.approval } : undefined;
    this.patchTool(id, { status: "running", approval: undefined });
    try {
      await this.ws.sendMessagePromise({
        type: "llm_agent/approve",
        conversation_id: this.convId,
        call_id: id,
        approved,
        note,
      });
    } catch (err) {
      if (prior) this.patchTool(id, prior); // show the buttons again
      this.push({ kind: "notice", text: errText(err), error: true });
    }
  }

  private async undo(item: Extract<Item, { kind: "tool" }>): Promise<void> {
    if (!item.snapshotId || !confirm(t("confirm_undo", { name: item.summary || item.name })))
      return;
    try {
      const res = await this.ws.sendMessagePromise<{ summary: string }>({
        type: "llm_agent/undo",
        snapshot_id: item.snapshotId,
        ...(this.convId ? { conversation_id: this.convId } : {}),
      });
      this.patchTool(item.id, { undone: true });
      this.push({ kind: "notice", text: t("undone_notice", { summary: res.summary }) });
    } catch (err) {
      this.push({ kind: "notice", text: errText(err), error: true });
    }
  }

  private async stop(): Promise<void> {
    if (this.convId) {
      await this.ws.sendMessagePromise({
        type: "llm_agent/cancel",
        conversation_id: this.convId,
      });
    }
  }

  // ---- input ---------------------------------------------------------------

  @state() private modelError = "";
  private loadingModels = new Set<string>();

  private async loadModels(): Promise<void> {
    const id = this.providerId;
    if (!id || id in this.fetched || this.loadingModels.has(id)) return;
    this.loadingModels.add(id);
    try {
      const res = await this.ws.sendMessagePromise<{
        models: ModelSuggestion[];
        error: string | null;
      }>({ type: "llm_agent/models", provider_id: id });
      this.modelError = res.error ?? "";
      this.fetched = { ...this.fetched, [id]: res.models };
    } catch {
      // keep the built-in suggestions; try again next time
    } finally {
      this.loadingModels.delete(id);
    }
  }

  /** Pick up after a reply that was cut off, stopped, or hit the tool limit. */
  private continueTurn(overCap = false): void {
    this.setText(t("continue_message"));
    void this.send(undefined, overCap);
  }

  /** Put a sent message (index in `items`) back in the composer. Sending it replaces
   * that message and everything after it. */
  private edit(at: number): void {
    const item = this.items[at];
    if (item?.kind !== "user") return;
    this.editAt = at;
    this.clearAttachments();
    this.photos = item.images ?? [];
    this.files = (item.files ?? []).filter((f) => f.data);
    if (item.photos && !item.images) this.photosNotKept();
    if (item.files?.some((f) => !f.data))
      this.push({ kind: "notice", text: t("files_not_kept") });
    this.setText(item.text);
    this.input!.focus();
  }

  private cancelEdit(): void {
    this.editAt = -1;
    this.clearAttachments();
    this.setText(loadDraft(this.draftKey, this.convId));
  }

  private async onPick(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const picked = [...(input.files ?? [])];
    input.value = "";
    await this.addFiles(picked);
  }

  private async onPaste(ev: ClipboardEvent): Promise<void> {
    const files = [...(ev.clipboardData?.files ?? [])];
    if (!files.length) return;
    ev.preventDefault();
    await this.addFiles(files);
  }

  // Dropping a file anywhere on the panel attaches it. Without preventDefault on
  // dragover the browser would open the dropped file in place of Home Assistant.
  private onDragOver(ev: DragEvent): void {
    if (!ev.dataTransfer?.types.includes("Files")) return;
    ev.preventDefault();
    // the composer is hidden while Changes shows, so nothing may land in it unseen
    const closed = this.running || this.showChanges;
    ev.dataTransfer.dropEffect = closed ? "none" : "copy";
    this.dragging = !closed;
  }

  private onDragLeave(ev: DragEvent): void {
    // leaving for a child element is not leaving the panel
    const to = ev.relatedTarget as Node | null;
    if (to && (ev.currentTarget as Node).contains(to)) return;
    this.dragging = false;
  }

  private async onDrop(ev: DragEvent): Promise<void> {
    if (!ev.dataTransfer?.types.includes("Files")) return;
    ev.preventDefault();
    this.dragging = false;
    if (!this.running && !this.showChanges) await this.addFiles([...ev.dataTransfer.files]);
  }

  /** Pictures go the photo way (re-encoded, metadata dropped); everything else is
   * checked here and read as it is. The server decides again from the bytes. */
  private async addFiles(list: File[]): Promise<void> {
    const pictures = list.filter(isPicture);
    if (pictures.length) await this.addPhotos(pictures);
    const gen = this.photoGen;
    for (const file of list.filter((f) => !isPicture(f))) {
      const name = file.name || t("that_file");
      const error = (key: Key, vars: Record<string, string | number> = {}) =>
        this.push({ kind: "notice", text: t(key, { name, ...vars }), error: true });
      if (this.files.length >= MAX_FILES) {
        error("too_many_files", { count: MAX_FILES });
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        error("file_too_large", { limit: fmtBytes(MAX_FILE_BYTES) });
        continue;
      }
      if (this.payload() + base64Length(file.size) > PAYLOAD_BUDGET) {
        error("files_over_total");
        continue;
      }
      let read: AttachedFile | null;
      try {
        read = await readFile(file);
      } catch {
        error("file_unreadable");
        continue;
      }
      // cleared, sent or switched chats while reading: drop it
      if (gen !== this.photoGen) return;
      if (!read) error("file_unsupported");
      else if (this.payload() + (read.data?.length ?? 0) > PAYLOAD_BUDGET)
        error("files_over_total");
      else this.files = [...this.files, read];
    }
  }

  /** Base64 characters already attached, photos included. */
  private payload(): number {
    return (
      this.photos.reduce((n, p) => n + p.data.length, 0) +
      this.files.reduce((n, f) => n + (f.data?.length ?? 0), 0)
    );
  }

  private photosNotKept(): void {
    this.push({
      kind: "notice",
      text: t("photos_not_kept"),
    });
  }

  private async addPhotos(files: File[]): Promise<void> {
    const gen = this.photoGen;
    for (const file of files) {
      if (this.photos.length >= MAX_PHOTOS) break;
      try {
        const photo = await shrinkPhoto(file);
        // cleared, sent or switched chats while encoding: drop it
        if (gen !== this.photoGen || this.photos.length >= MAX_PHOTOS) return;
        this.photos = [...this.photos, photo];
      } catch {
        this.push({
          kind: "notice",
          text: t("photo_unreadable", { name: file.name || t("that_picture") }),
          error: true,
        });
      }
    }
  }

  private onKey(ev: KeyboardEvent): void {
    if (this.mentions.length && !ev.isComposing) {
      const n = this.mentions.length;
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault();
        this.mentionIndex =
          (this.mentionIndex + (ev.key === "ArrowDown" ? 1 : n - 1)) % n;
        return;
      }
      if (ev.key === "Enter" || ev.key === "Tab") {
        ev.preventDefault();
        this.pickMention(this.mentions[this.mentionIndex]);
        return;
      }
      if (ev.key === "Escape") {
        ev.preventDefault();
        this.mentions = [];
        return;
      }
    }
    if (
      ev.key === "ArrowUp" &&
      !ev.isComposing &&
      !this.input?.value &&
      !this.running &&
      this.editAt < 0 &&
      this.convId
    ) {
      const last = this.lastUserIndex();
      if (last >= 0) {
        ev.preventDefault();
        this.edit(last);
      }
      return;
    }
    if (ev.key === "Enter" && !ev.shiftKey && !ev.isComposing) {
      const modifier = ev.ctrlKey || ev.metaKey;
      if (this.prefs.send === "ctrl" && !modifier) return; // plain Enter is a new line
      // Inside a code block Enter is a new line too: code is typed line by line, and half
      // a block is never what someone meant to send. Ctrl or Cmd+Enter still sends.
      if (!modifier && this.input && insideFence(this.input.value, this.input.selectionStart)) return;
      ev.preventDefault();
      void this.send();
    }
  }

  private onInput(): void {
    // Not setText: rewriting the box while someone types would move their cursor.
    this.stored(this.composed);
    this.updateMentions();
  }

  /** Show `@` suggestions for the word being typed at the cursor. */
  private updateMentions(): void {
    const ta = this.input;
    const hass = this.hass;
    if (!ta || !hass) return;
    const before = ta.value.slice(0, ta.selectionStart ?? ta.value.length);
    const m = /(^|\s)@([^\s@]*)$/.exec(before);
    if (!m) {
      this.mentions = [];
      return;
    }
    this.mentionStart = before.length - m[2].length - 1;
    this.mentions = findMentions(hass, m[2]);
    this.mentionIndex = 0;
  }

  private pickMention(item: Mention): void {
    const ta = this.input!;
    const end = ta.selectionStart ?? ta.value.length;
    const value = ta.value;
    const label = `@${this.picked.add(item.label, item.insert)} `;
    ta.setMentions(this.picked.labels());
    ta.value = value.slice(0, this.mentionStart) + label + value.slice(end);
    this.stored(this.composed);
    const pos = this.mentionStart + label.length;
    ta.setSelectionRange(pos, pos);
    this.mentions = [];
    ta.focus();
  }

  private onScroll(): void {
    const el = this.scroller;
    if (el)
      this.stickToBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 40;
  }

  private pickProvider(ev: Event): void {
    this.providerId = (ev.target as HTMLSelectElement).value;
    this.model = this.provider?.default_model ?? "";
  }

  // ---- render --------------------------------------------------------------
  // The markup is the Lit template's, element for element. Where Lit had whitespace
  // between two siblings the JSX has {" "}: inside a line of text or icons that space
  // shows, and JSX would otherwise drop it.

  /** The parts of hass the panel draws from. HA replaces hass on every state change in
   * the house; these change only when their part does (see element.tsx). Made in renderPanel(),
   * which runs under Solid's owner. */
  #user!: Accessor<Hass["user"] | undefined>;
  #tips!: Accessor<{ text: string; icon: string }[]>;

  /** The last item index that is the newest sent message, or -1 (no edit/retry offered). */
  #lastUser!: Accessor<number>;

  private renderPanel(): JSX.Element {
    this.#user = hassPart(() => this.hass, (h) => h.user);
    this.#tips = createMemo(() => welcomeTips(this.hass, this.member), {
      // hass changes all the time, the tips almost never
      equals: (a, b) => JSON.stringify(a) === JSON.stringify(b),
    });
    this.#lastUser = createMemo(() => (this.convId ? this.lastUserIndex() : -1));
    const lang = hassPart(() => this.hass, (h) => h.locale?.language);
    // a language change in the profile: the words follow (t() is reactive)
    let first = true;
    createEffect(
      () => lang(),
      (now) => {
        if (first) {
          first = false; // init() loads the first language
          return;
        }
        void loadLanguage(now);
      },
    );
    // Lit's updated() kept the box's placeholder in step after each render.
    createEffect(
      () => this.placeholder(),
      (text) => this.input?.setPlaceholder(text),
    );
    return (
      <Show
        when={!this.loadError}
        fallback={<div class="empty">{t("load_error", { error: this.loadError })}</div>}
      >
        <Show when={!(this.info && !this.info.providers.length)} fallback={<div class="empty">{t("no_provider")}</div>}>
          {this.renderLayout()}
        </Show>
      </Show>
    );
  }

  /** Follow the newest message and add copy buttons to new code blocks, which Lit's
   * updated() did after every render. Here it runs once the DOM has really changed: an
   * effect would run before Solid applies the attributes of rows it just made, measure
   * a card still closed, stop short of the bottom, and make the card's chevron animate
   * open. The resize observer also catches the list growing when an icon or a picture
   * loads, and the pane shrinking when the composer grows. */
  private watchMessages(el: HTMLElement): void {
    this.scroller = el;
    const follow = () => {
      if (this.stickToBottom) el.scrollTop = el.scrollHeight;
    };
    const sizes = new ResizeObserver(follow);
    sizes.observe(el);
    new MutationObserver((records) => {
      for (const r of records) {
        for (const n of r.addedNodes) if (n instanceof Element && n.parentNode === el) sizes.observe(n);
        for (const n of r.removedNodes) if (n instanceof Element) sizes.unobserve(n);
      }
      follow();
      this.addCopyButtons();
    }).observe(el, { childList: true, subtree: true, characterData: true, attributes: true });
  }

  private placeholder(): string {
    return this.slim
      ? t("composer_placeholder")
      : `${t("composer_placeholder")} (${t(this.prefs.send === "ctrl" ? "keys_ctrl" : "keys_enter")})`;
  }

  private listOpen(): boolean {
    return this.slim ? this.showList : this.prefs.listOpen;
  }

  private renderLayout(): JSX.Element {
    const viewBtn = (view: "notes" | "changes" | "usage", title: Key, label: Key, icon: string) => (
      <button
        class="icon"
        title={t(title)}
        aria-label={t(label)}
        aria-pressed={tf(this.showChanges && this.view === view)}
        onClick={() => {
          this.showChanges = !(this.showChanges && this.view === view);
          this.view = view;
        }}
      >
        <ha-icon icon={icon} />
      </button>
    );
    return (
      <div
        class={`layout ${this.slim ? "narrow" : ""}`}
        onClick={(e) => this.closePrefsOutside(e)}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Escape") {
            // Esc stops a reply from anywhere in the panel, unless it closed a popover
            // or the @ list (those prevent the default) first. Using the key marks it
            // used too, so the floating window around an embedded panel stays open.
            if (this.running && !e.defaultPrevented && !e.isComposing && !this.showPrefs) {
              e.preventDefault();
              void this.stop();
            }
            if (this.showPrefs) e.preventDefault();
            this.showPrefs = false;
          }
        }}
      >
        <Show when={this.listOpen()}>{this.renderList()}</Show>{" "}
        <main
          class={this.showChanges ? "changes" : ""}
          onDragOver={(e) => this.onDragOver(e)}
          onDragLeave={(e) => this.onDragLeave(e)}
          onDrop={(e) => void this.onDrop(e)}
        >
          <header>
            <Show when={!this.embedded}>
              <ha-menu-button prop:hass={this.hass} prop:narrow={this.narrow} />
            </Show>{" "}
            <button
              class="icon"
              title={this.listOpen() ? t("hide_chats") : t("show_chats")}
              aria-label={t("conversations")}
              aria-expanded={tf(this.listOpen())}
              onClick={() =>
                this.slim ? (this.showList = !this.showList) : this.setPref("listOpen", !this.prefs.listOpen)
              }
            >
              <ha-icon icon={this.slim ? "mdi:forum-outline" : "mdi:dock-left"} />
            </button>{" "}
            <div class="title">
              {this.showChanges ? t(this.view === "notes" ? "home_notes" : this.view) : chatName(this.chatTitle)}
            </div>{" "}
            <Show when={this.items.length}>
              <button class="icon" title={t("export_title")} aria-label={t("export")} onClick={() => this.exportChat()}>
                <ha-icon icon="mdi:tray-arrow-down" />
              </button>
            </Show>{" "}
            <Show when={!this.listOpen()}>
              <button class="icon" title={t("new_chat")} aria-label={t("new_chat")} onClick={() => this.newChat()}>
                <ha-icon icon="mdi:square-edit-outline" />
              </button>
            </Show>{" "}
            <Show when={!this.member}>{viewBtn("notes", "home_notes", "home_notes", "mdi:notebook-outline")}</Show>{" "}
            <Show when={!this.member}>{viewBtn("changes", "changes_title", "changes", "mdi:history")}</Show>{" "}
            <Show when={!this.member}>{viewBtn("usage", "usage_view_title", "usage", "mdi:chart-bar")}</Show>{" "}
            <button
              class="icon gear"
              title={t("panel_settings")}
              aria-label={t("panel_settings")}
              aria-expanded={tf(this.showPrefs)}
              onClick={() => (this.showPrefs = !this.showPrefs)}
            >
              <ha-icon icon="mdi:cog-outline" />
            </button>{" "}
            <Show when={this.showPrefs}>{this.renderPrefs()}</Show>
          </header>{" "}
          <Switch>
            <Match when={this.showChanges && this.view === "notes"}>
              <llm-agent-notes prop:hass={this.hass} />
            </Match>
            <Match when={this.showChanges && this.view === "usage"}>
              <llm-agent-usage prop:hass={this.hass} />
            </Match>
            <Match when={this.showChanges}>
              <llm-agent-changes
                prop:hass={this.hass}
                ref={(el: HTMLElement) =>
                  el.addEventListener("open-chat", (e) => void this.open((e as CustomEvent<string>).detail))
                }
              />
            </Match>
          </Switch>{" "}
          <div class="sr-only" role="status" aria-live="polite">
            {this.announce}
          </div>{" "}
          <div
            class="messages"
            role="log"
            aria-label={t("conversation")}
            ref={(el) => this.watchMessages(el)}
            onScroll={() => this.onScroll()}
          >
            <Show when={!this.items.length}>{this.renderWelcome()}</Show>{" "}
            {/* By index, as Lit's repeat() was: a row keeps its DOM (an open card, a
                typed approval note) while its item is replaced by a newer copy. */}
            <For each={this.items} keyed={false}>
              {(item, idx) => this.renderItem(item, idx)}
            </For>
          </div>{" "}
          {this.renderComposer()}
        </main>{" "}
        <Show when={this.showSettings}>
          <llm-agent-settings
            prop:hass={this.hass}
            ref={(el: HTMLElement) => {
              el.addEventListener("close", () => (this.showSettings = false));
              el.addEventListener("reloaded", () => void this.reloaded());
            }}
          />
        </Show>
      </div>
    );
  }

  private onSearch(ev: Event): void {
    this.query = (ev.target as HTMLInputElement).value;
    clearTimeout(this.searchTimer);
    if (!this.query.trim()) {
      this.hits = null;
      return;
    }
    this.searchTimer = window.setTimeout(async () => {
      const query = this.query;
      const res = await this.ws.sendMessagePromise<{
        conversations: ConvSummary[];
      }>({ type: "llm_agent/conversations/search", query });
      if (query === this.query) this.hits = res.conversations;
    }, 300);
  }

  private exportChat(): void {
    const md = toMarkdown(this.chatTitle, this.items);
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug(this.chatTitle) || "chat"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  private renderList(): JSX.Element {
    return (
      <nav>
        <div class="nav-head">
          <span class="brand">
            <span class="brand-mark">
              <ha-icon icon="mdi:robot-happy-outline" />
            </span>
            LLM Agent
          </span>{" "}
          <button class="icon" title={t("new_chat")} aria-label={t("new_chat")} onClick={() => this.newChat()}>
            <ha-icon icon="mdi:square-edit-outline" />
          </button>
        </div>{" "}
        <label class="search">
          <ha-icon icon="mdi:magnify" />{" "}
          <input
            type="search"
            placeholder={t("search_chats")}
            aria-label={t("search_chats")}
            value={this.query}
            onInput={(e) => this.onSearch(e)}
          />
        </label>{" "}
        <div class="convs">
          <Show when={this.hits && !this.hits.length}>
            <div class="nav-empty">{t("no_matches")}</div>
          </Show>{" "}
          <Show when={!this.hits && !this.convs.length}>
            <div class="nav-empty">{t("no_chats")}</div>
          </Show>{" "}
          <For each={groupByDay(this.hits ?? this.convs, !!this.hits)}>
            {([label, convs]) => (
              <>
                {" "}
                <Show when={label}>
                  <div class="group">{t(label as Key)}</div>
                </Show>{" "}
                <For each={convs}>
                  {(c) => (
                    <div class={`conv ${c.id === this.convId ? "active" : ""}`} onClick={() => void this.open(c.id)}>
                      <span class="conv-title">
                        <Show when={c.source === "action"}>
                          <ha-icon class="auto" icon="mdi:robot-outline" title={t("started_by_automation")} />
                        </Show>
                        {chatName(c.title)}
                        <Show when={c.snippet && c.snippet !== c.title}>
                          <small class="snippet">{c.snippet}</small>
                        </Show>
                      </span>{" "}
                      <button
                        class="icon del"
                        title={t("delete")}
                        aria-label={t("delete_chat")}
                        onClick={(e) => void this.removeConv(c.id, e)}
                      >
                        <ha-icon icon="mdi:trash-can-outline" />
                      </button>
                    </div>
                  )}
                </For>{" "}
              </>
            )}
          </For>
        </div>
      </nav>
    );
  }

  /** Close the panel settings popover on a click anywhere outside it. */
  private closePrefsOutside(ev: Event): void {
    if (!this.showPrefs) return;
    const inside = ev
      .composedPath()
      .some(
        (el) =>
          el instanceof HTMLElement &&
          (el.classList.contains("prefs") || el.classList.contains("gear")),
      );
    if (!inside) this.showPrefs = false;
  }

  private renderPrefs(): JSX.Element {
    const pick = <K extends keyof Prefs>(key: K, label: string, options: [Prefs[K], string][]) => (
      <label>
        {label}{" "}
        <select onChange={(e) => this.setPref(key, (e.target as HTMLSelectElement).value as Prefs[K])}>
          {options.map(([value, text]) => (
            <option value={String(value)} selected={this.prefs[key] === value}>
              {text}
            </option>
          ))}
        </select>
      </label>
    );
    const check = (key: "compact" | "toolsOpen" | "showUsage", label: string) => (
      <label class="check">
        <input
          type="checkbox"
          checked={this.prefs[key]}
          onChange={(e) => this.setPref(key, (e.target as HTMLInputElement).checked)}
        />
        {label}
      </label>
    );
    const mine = () => this.info?.my_default;
    const mineName = () => {
      const m = mine();
      return m
        ? `${this.info?.providers.find((x) => x.id === m.provider_id)?.name ?? "?"} \u00b7 ${m.model || t("model_provider_default")}`
        : "";
    };
    return (
      <div class="prefs" role="dialog" aria-label={t("panel_settings")}>
        {pick("theme", t("theme"), [
          ["auto", t("theme_auto")],
          ["light", t("theme_light")],
          ["dark", t("theme_dark")],
        ])}{" "}
        {pick("size", t("text_size"), [
          ["small", t("size_small")],
          ["normal", t("size_normal")],
          ["large", t("size_large")],
        ])}{" "}
        {pick("send", t("send_with"), [
          ["enter", "Enter"],
          ["ctrl", "Ctrl+Enter"],
        ])}{" "}
        {check("compact", t("compact_layout"))} {check("toolsOpen", t("expand_tools"))}{" "}
        {check("showUsage", t("show_usage"))}{" "}
        <Show when={!this.member}>
          <div class="mine">
            <div>{t("my_default", { model: mine() ? mineName() : t("provider_default") })}</div>{" "}
            <button class="small" onClick={() => void this.setMyDefault()}>
              {t("use_current_model")}
            </button>{" "}
            <Show when={mine()}>
              <button class="small ghost" onClick={() => void this.setMyDefault(true)}>
                {t("clear")}
              </button>
            </Show>
          </div>
        </Show>{" "}
        <Show when={this.admin}>
          <div class="mine">
            <button
              class="small"
              onClick={() => {
                this.showPrefs = false;
                this.showSettings = true;
              }}
            >
              {t("integration_settings")}
            </button>{" "}
            <button class="small ghost" onClick={openInHa}>
              {t("open_in_ha")}
            </button>
          </div>
        </Show>{" "}
        <div class="hint">{t("prefs_hint")}</div>
      </div>
    );
  }

  private renderWelcome(): JSX.Element {
    const name = () => this.#user()?.name?.split(" ")[0];
    return (
      <div class="welcome">
        <div class="logo">
          <ha-icon icon="mdi:robot-happy-outline" />
        </div>{" "}
        <h2>{name() ? t("greeting_name", { greeting: greeting(), name: name()! }) : greeting()}</h2>{" "}
        <Show
          when={this.member}
          fallback={
            <>
              <p>{t("welcome_admin")}</p>{" "}
              <span class="mode-chip">
                <ha-icon icon="mdi:shield-check-outline" />
                {modeName(this.info?.approval_mode)}
              </span>
            </>
          }
        >
          <p>{t("welcome_member")}</p>
        </Show>{" "}
        <div class="tips">
          <For each={this.#tips()}>
            {(tip) => (
              <>
                {" "}
                <button
                  class="tip"
                  onClick={() => {
                    this.setText(tip.text);
                    this.input!.focus();
                  }}
                >
                  <ha-icon icon={tip.icon} /> <span>{tip.text}</span>
                </button>{" "}
              </>
            )}
          </For>
        </div>
      </div>
    );
  }

  /** One row of the chat. `item` is the row's current item: a row stays while the item
   * at its index is replaced (a streamed reply, a tool that finished). */
  private renderItem(item: Accessor<Item>, idx: number): JSX.Element {
    const last = () => idx === this.items.length - 1;
    const replyStart = () => {
      const k = item().kind;
      return k !== "user" && k !== "notice" && (idx === 0 || this.items[idx - 1]?.kind === "user");
    };
    const avatar = () => (
      <Show when={replyStart()}>
        <div class="avatar" aria-hidden="true">
          <ha-icon icon="mdi:robot-happy-outline" />
        </div>
      </Show>
    );
    const user = () => item() as Extract<Item, { kind: "user" }>;
    const said = () => item() as Extract<Item, { kind: "assistant" }>;
    const notice = () => item() as Extract<Item, { kind: "notice" }>;
    const tool = () => item() as Extract<Item, { kind: "tool" }>;
    // Markdown is rendered when the text changes; the @ chips are filled in from hass,
    // and the DOM is only touched when the chips' names change.
    const userMd = createMemo(() => (item().kind === "user" ? renderMarkdown(user().text) : ""));
    const userHtml = createMemo(() => withChips(userMd(), this.hass));
    return (
      <Switch>
        <Match when={item().kind === "user"}>
          <div class={`row user ${idx === this.editAt ? "edited" : ""}`}>
            <Show when={this.convId && !this.running}>
              <div class="msg-actions">
                <button class="icon" title={t("edit")} aria-label={t("edit")} onClick={() => this.edit(idx)}>
                  <ha-icon icon="mdi:pencil-outline" />
                </button>{" "}
                <Show when={idx === this.#lastUser()}>
                  <button
                    class="icon"
                    title={t("retry")}
                    aria-label={t("retry")}
                    onClick={() => void this.send(user().text)}
                  >
                    <ha-icon icon="mdi:refresh" />
                  </button>
                </Show>
              </div>
            </Show>{" "}
            <div class="msg user md">
              {this.renderPhotos(user)}
              {nodes(userHtml())}
            </div>{" "}
            <Show when={user().page}>
              <div class="page-note">
                <ha-icon icon="mdi:file-eye-outline" />
                {t("page_sent", { page: user().page! })}
              </div>
            </Show>
          </div>
        </Match>
        <Match when={item().kind === "assistant" && !said().text && last() && this.running}>
          <div class="row reply">
            {avatar()}{" "}
            <div class="msg assistant typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        </Match>
        <Match when={item().kind === "assistant" && said().text}>
          <div class="row reply">
            {avatar()}{" "}
            <div class="msg assistant md" innerHTML={renderMarkdown(said().text, !(last() && this.running))} />{" "}
            <Show when={!(last() && this.running)}>
              <div class="msg-actions acts">
                <button
                  class="icon"
                  title={t("copy")}
                  aria-label={t("copy")}
                  onClick={(e) => void this.copy(said().text, e.currentTarget as HTMLElement)}
                >
                  <ha-icon icon="mdi:content-copy" />
                </button>
              </div>
            </Show>
          </div>
        </Match>
        <Match when={item().kind === "notice"}>
          <div class={`notice ${notice().error ? "error" : ""}`}>
            {notice().text}{" "}
            <Show when={last() && !this.running && notice().stop && CONTINUABLE.has(notice().stop!)}>
              <button class="small" onClick={() => this.continueTurn(notice().stop === "spend_cap")}>
                {notice().stop === "spend_cap" ? t("continue_anyway") : t("continue")}
              </button>
            </Show>
          </div>
        </Match>
        <Match when={item().kind === "tool"}>
          <div class="row reply">
            {avatar()}
            {this.renderTool(tool)}
          </div>
        </Match>
      </Switch>
    );
  }

  private renderPreview(item: Accessor<Extract<Item, { kind: "tool" }>>): JSX.Element {
    const config = () => {
      const c = item().args?.config;
      return c && typeof c === "object" ? c : undefined;
    };
    const open = () => this.previews.has(item().id);
    return (
      <Show when={config()}>
        <div class="preview">
          <button
            class="ghost small"
            onClick={() => {
              const next = new Set(this.previews);
              if (open()) next.delete(item().id);
              else next.add(item().id);
              this.previews = next;
            }}
          >
            <ha-icon icon={open() ? "mdi:eye-off-outline" : "mdi:eye-outline"} />{" "}
            {open() ? t("hide_preview") : t("preview_dashboard")}
          </button>{" "}
          <Show when={open()}>
            <llm-dashboard-preview prop:hass={this.hass} prop:config={config()} />
          </Show>
        </div>
      </Show>
    );
  }

  /** When each notes card appeared; its Save button waits a moment so it isn't clicked by habit. */
  private noteCardSince = new Map<string, number>();
  /** Bumped when a notes card's wait is over, so its Save button is drawn again. */
  @state() private noteTick = 0;

  /** A suggested change to the home notes: its own look and words, unlike an action approval. */
  private renderNoteSuggestion(item: Accessor<Extract<Item, { kind: "tool" }>>): JSX.Element {
    const lines = () => (item().approval?.diff ?? "").replace(/\n+$/, "").split("\n");
    const added = () =>
      lines()
        .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
        .map((l) => l.slice(1))
        .filter((l) => l.trim());
    const removed = () =>
      lines()
        .filter((l) => l.startsWith("-") && !l.startsWith("---"))
        .map((l) => l.slice(1))
        .filter((l) => l.trim());
    const armed = () => {
      void this.noteTick;
      const id = item().id;
      let since = this.noteCardSince.get(id);
      if (since === undefined) {
        since = Date.now();
        this.noteCardSince.set(id, since);
        setTimeout(() => this.noteTick++, NOTE_ARM_MS + 50);
      }
      return Date.now() - since >= NOTE_ARM_MS;
    };
    return (
      <div class="note-suggestion" role="group" aria-label={t("suggested_note")}>
        <div class="note-head">
          <ha-icon icon="mdi:notebook-edit-outline" />{" "}
          <div>
            <strong>{t("note_question")}</strong> <small>{t("note_explain")}</small>
          </div>
        </div>{" "}
        <Show when={added().length}>
          <ul class="note-lines add">
            {" "}
            <For each={added()}>{(l) => <li>{l}</li>}</For>{" "}
          </ul>
        </Show>{" "}
        <Show when={removed().length}>
          <div class="note-label">{t("forget")}</div>{" "}
          <ul class="note-lines del">
            {" "}
            <For each={removed()}>{(l) => <li>{l}</li>}</For>{" "}
          </ul>
        </Show>{" "}
        <div class="note-actions">
          <button class="ghost" onClick={() => void this.answer(item().id, false)}>
            {t("note_no")}
          </button>{" "}
          <button
            class="note-save"
            disabled={!armed()}
            title={armed() ? t("note_save_title") : t("read_it_first")}
            onClick={() => void this.answer(item().id, true)}
          >
            {t("save_to_notes")}
          </button>
        </div>
      </div>
    );
  }

  private renderTool(item: Accessor<Extract<Item, { kind: "tool" }>>): JSX.Element {
    const approval = () => item().approval;
    const status = () => {
      switch (item().status) {
        case "running":
          return <span class="spinner" aria-label={t("running")} />;
        case "ok":
          return <ha-icon class="st ok" icon="mdi:check-circle" aria-label={t("done")} />;
        case "error":
          return <ha-icon class="st error" icon="mdi:alert-circle" aria-label={t("failed")} />;
        case "waiting":
          return <span class="tag wait">{t("waiting_for_you")}</span>;
      }
    };
    return (
      <Show
        when={!(approval() && !approval()!.phoneOnly && item().name === "change_home_note")}
        fallback={this.renderNoteSuggestion(item)}
      >
        <div class={`tool ${item().status} ${approval()?.risky ? "risky" : ""}`}>
          <Show when={approval()}>
            {(a) => (
              <div class="approval-head">
                <ha-icon icon={a().risky ? "mdi:shield-alert-outline" : "mdi:hand-back-right-outline"} />{" "}
                <span>
                  {t("needs_approval")}
                  <Show when={a().reason}>
                    <span class="why"> {"\u00b7"} {a().reason}</span>
                  </Show>
                </span>
              </div>
            )}
          </Show>{" "}
          <details open={!!approval() || this.prefs.toolsOpen}>
            <summary>
              <span class="tool-icon">
                <ha-icon icon={toolIcon(item().name)} />
              </span>{" "}
              <span class="tool-name">{toolLabel(item().name)}</span>{" "}
              <span class="tool-summary">{approval()?.summary ?? item().summary ?? argsLine(item().args)}</span>{" "}
              <Show when={item().undone}>
                <span class="tag">{t("undone")}</span>
              </Show>{" "}
              {reviewTag(item().review, item().reviewing)} {status()}{" "}
              <Show when={item().snapshotId && !item().undone && item().status === "ok" && !this.member}>
                <button
                  class="ghost small undo"
                  title={t("undo_title")}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void this.undo(item());
                  }}
                >
                  {t("undo")}
                </button>
              </Show>{" "}
              <ha-icon class="chev" icon="mdi:chevron-down" />
            </summary>{" "}
            <Show when={item().review}>
              {(r) => (
                <div class={`review-note ${r().decision}`}>
                  <ha-icon icon="mdi:shield-check-outline" />{" "}
                  <span>
                    <b>{r().model ? t("reviewer_model", { model: r().model }) : t("reviewer")}:</b>{" "}
                    {r().reason || t(REVIEW_WORDS[r().decision])}
                  </span>
                </div>
              )}
            </Show>{" "}
            <Show when={approval()?.diff}>
              <pre class="diff">{diffLines(approval()!.diff!)}</pre>
            </Show>{" "}
            <Show when={approval() && item().name === "save_dashboard"}>{this.renderPreview(item)}</Show>{" "}
            {this.renderArgs(item().args, Boolean(approval()?.diff))}{" "}
            <Show when={item().preview && !approval()}>
              <pre class="result">{item().preview}</pre>
            </Show>
          </details>{" "}
          <Show when={item().image}>
            <img class="snapshot" src={item().image} alt={t("camera_snapshot")} />
          </Show>{" "}
          <Show
            when={approval()?.phoneOnly}
            fallback={
              <Show when={approval()}>
                <div class="approval">
                  <input id={`note-${item().id}`} placeholder={t("approval_note")} aria-label={t("approval_note")} />{" "}
                  <button class="ghost danger-text" onClick={() => void this.answer(item().id, false)}>
                    {t("deny")}
                  </button>{" "}
                  <button class="primary" onClick={() => void this.answer(item().id, true)}>
                    {t("approve")}
                  </button>
                </div>
              </Show>
            }
          >
            <div class="approval phone-wait">
              <ha-icon icon="mdi:cellphone-message" /> {t("phone_wait")}
            </div>
          </Show>
        </div>
      </Show>
    );
  }

  /** Photos and files on a sent message. The bubble keeps whitespace, so this adds none. */
  private renderPhotos(item: Accessor<Extract<Item, { kind: "user" }>>): JSX.Element {
    const files = () => (
      <Show when={item().files?.length}>
        <div class="files">
          <For each={item().files}>{(f) => this.renderFile(f)}</For>
        </div>
      </Show>
    );
    return (
      <Switch fallback={files()}>
        <Match when={item().images?.length}>
          <div class="photos">
            <For each={item().images}>{(p) => <img src={p.url} alt={t("your_photo")} />}</For>
          </div>
          {files()}
        </Match>
        <Match when={item().photos}>
          <div class="photo-note">
            <ha-icon icon="mdi:image-outline" />
            {photoCount(item().photos!)} {t("not_kept")}
          </div>
          {files()}
        </Match>
      </Switch>
    );
  }

  /** A file chip: kind, name and size, with a remove button while it is a draft. */
  private renderFile(f: AttachedFile, remove?: () => void): JSX.Element {
    return (
      <span class="file" title={f.name}>
        <ha-icon icon={FILE_ICONS[f.kind]} /> <span class="file-name">{f.name}</span>{" "}
        <span class="file-meta">
          {fileLabel(f)}, {fmtBytes(f.size)}
        </span>{" "}
        {remove ? (
          <button class="icon" title={t("remove_file")} aria-label={`${t("remove_file")}: ${f.name}`} onClick={remove}>
            <ha-icon icon="mdi:close" />
          </button>
        ) : null}
      </span>
    );
  }

  private renderComposer(): JSX.Element {
    const listId = "models";
    const usage = () => this.usage;
    return (
      <footer>
        <Show when={this.pageContext}>
          {(page) => (
            <button
              class={`page-chip ${this.pageOff ? "off" : ""}`}
              aria-pressed={tf(!this.pageOff)}
              title={`${page().path}\n${t(this.pageOff ? "page_chip_off" : "page_chip_on")}`}
              onClick={() => (this.pageOff = !this.pageOff)}
            >
              <ha-icon icon={this.pageOff ? "mdi:file-remove-outline" : "mdi:file-eye-outline"} />{" "}
              <span>{t("page_chip", { page: page().summary })}</span>
            </button>
          )}
        </Show>{" "}
        <div class={`composer ${this.dragging ? "dragging" : ""}`}>
          <textarea
            rows="1"
            placeholder={this.placeholder()}
            ref={(ta) => {
              this.source = ta;
              // the box is made once the textarea is in the shadow root (see attachBox)
              queueMicrotask(() => this.attachBox());
            }}
          />{" "}
          <Show when={this.mentions.length}>
            <ul class="mentions" role="listbox">
              {" "}
              <For each={this.mentions}>
                {(m, i) => (
                  <li
                    role="option"
                    aria-selected={tf(i() === this.mentionIndex)}
                    class={i() === this.mentionIndex ? "active" : ""}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      this.pickMention(m);
                    }}
                  >
                    <span class="kind">{m.kind}</span> <span class="label">{m.label}</span>{" "}
                    <span class="detail">{m.detail}</span>
                  </li>
                )}
              </For>{" "}
            </ul>
          </Show>{" "}
          <Show when={this.photos.length}>
            <div class="attached">
              {" "}
              <For each={this.photos}>
                {(p, i) => (
                  <span class="thumb">
                    <img src={p.url} alt={t("photo_to_send")} />{" "}
                    <button
                      class="icon"
                      title={t("remove_photo")}
                      aria-label={t("remove_photo")}
                      onClick={() => (this.photos = this.photos.filter((_, j) => j !== i()))}
                    >
                      <ha-icon icon="mdi:close" />
                    </button>
                  </span>
                )}
              </For>{" "}
            </div>
          </Show>{" "}
          <Show when={this.files.length}>
            <div class="attached files">
              {" "}
              <For each={this.files}>
                {(f, i) =>
                  this.renderFile(f, () => {
                    this.files = this.files.filter((_, j) => j !== i());
                  })
                }
              </For>{" "}
            </div>
          </Show>{" "}
          <div class="toolbar">
            <label
              class="attach icon"
              title={t("attach_title")}
              hidden={this.photos.length >= MAX_PHOTOS && this.files.length >= MAX_FILES}
            >
              <ha-icon icon="mdi:paperclip" />{" "}
              {/* No accept filter: HA files often have no extension (.storage/*,
                  home-assistant.log.1), and the type is decided from the bytes. */}
              <input
                type="file"
                multiple
                aria-label={t("attach")}
                disabled={this.running}
                onChange={(e) => void this.onPick(e)}
              />
            </label>{" "}
            <Show when={!this.member}>
              <label class="model-pill" title={this.modelError || t("provider_and_model")}>
                <ha-icon icon="mdi:creation-outline" />{" "}
                <select
                  aria-label={t("provider")}
                  onChange={(e) => this.pickProvider(e)}
                  value={this.providerId}
                  disabled={this.running}
                >
                  {" "}
                  <For each={this.info?.providers}>
                    {(prov) => (
                      <option value={prov.id} selected={prov.id === this.providerId}>
                        {prov.name}
                      </option>
                    )}
                  </For>{" "}
                </select>{" "}
                <span class="sep">/</span>{" "}
                <input
                  class="model"
                  aria-label={t("model")}
                  list={listId}
                  value={this.model}
                  disabled={this.running}
                  onChange={(e) => (this.model = (e.target as HTMLInputElement).value.trim())}
                  onFocus={() => void this.loadModels()}
                />{" "}
                <datalist id={listId}>
                  {" "}
                  <For each={this.fetched[this.providerId] ?? this.provider?.models}>
                    {(m) => <option value={m.id}>{m.label}</option>}
                  </For>{" "}
                </datalist>
              </label>
            </Show>{" "}
            <span class="spacer" />{" "}
            <Show
              when={this.running}
              fallback={
                <button
                  class="send"
                  title={t("send")}
                  aria-label={t("send")}
                  disabled={!this.hasText && !this.photos.length && !this.files.length}
                  onClick={() => void this.send()}
                >
                  <ha-icon icon="mdi:arrow-up" />
                </button>
              }
            >
              <button class="send stop" title={t("stop")} aria-label={t("stop")} onClick={() => void this.stop()}>
                <ha-icon icon="mdi:stop" />
              </button>
            </Show>
          </div>
        </div>{" "}
        <div class="meta">
          <Show when={this.editAt >= 0}>
            <span class="editing">
              {t(this.editAt === this.lastUserIndex() ? "editing_last" : "editing_earlier")}{" "}
              <button class="small ghost" onClick={() => this.cancelEdit()}>
                {t("cancel")}
              </button>
            </span>
          </Show>{" "}
          <span class="usage" hidden={!this.prefs.showUsage} title={t("usage_title")}>
            {t("usage_line", {
              input: fmtTokens(usage().input + usage().cache_read + usage().cache_write),
              output: fmtTokens(usage().output),
            })}{" "}
            {usage().cache_read ? ` \u00b7 ${t("usage_cached", { count: fmtTokens(usage().cache_read) })}` : null}{" "}
            {"\u00b7"}{" "}
            {usage().cost == null ? t("cost_na") : `~$${usage().cost!.toFixed(usage().cost! < 1 ? 4 : 2)}`}{" "}
            {usage().review
              ? ` \u00b7 ${t("reviewer_usage", {
                  tokens: fmtTokens(usage().review!.input + usage().review!.output),
                  cost: usage().review!.cost == null ? t("cost_na") : `~$${usage().review!.cost!.toFixed(4)}`,
                })}`
              : null}
          </span>
        </div>
      </footer>
    );
  }
}

// ---- helpers ----------------------------------------------------------------

const PREFS_KEY = "llm-agent-prefs";

/** Copy to the clipboard. The Clipboard API only exists on https and localhost, and many
 * Home Assistant installs are plain http on the LAN, so fall back to the older copy
 * command there instead of failing. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/** Unsent drafts by chat id ("" is a new chat), in one entry per Home Assistant user. */
function drafts(key: string): Record<string, string> {
  try {
    const d = JSON.parse(localStorage.getItem(key) ?? "{}");
    return d && typeof d === "object" ? d : {};
  } catch {
    return {};
  }
}

function storeDrafts(key: string, d: Record<string, string>): void {
  try {
    if (Object.keys(d).length) localStorage.setItem(key, JSON.stringify(d));
    else localStorage.removeItem(key);
  } catch {
    // private mode or storage full: the draft lasts until the page reloads
  }
}

function loadDraft(key: string, id: string | null): string {
  const text = drafts(key)[id ?? ""];
  return typeof text === "string" ? text : "";
}

function saveDraft(key: string, id: string | null, text: string): void {
  const d = drafts(key);
  const k = id ?? "";
  if (text.trim()) d[k] = text;
  else if (k in d) delete d[k];
  else return;
  storeDrafts(key, d);
}

/** Forget drafts of chats that are gone (deleted here, elsewhere, or by retention). */
function pruneDrafts(key: string, convs: ConvSummary[]): void {
  const d = drafts(key);
  const ids = new Set(convs.map((c) => c.id));
  const gone = Object.keys(d).filter((id) => id && !ids.has(id));
  for (const id of gone) delete d[id];
  if (gone.length) storeDrafts(key, d);
}
const LAST_CONV_KEY = "llm-agent-last-chat";

function lastConv(): string | null {
  try {
    return localStorage.getItem(LAST_CONV_KEY);
  } catch {
    return null;
  }
}

function rememberConv(id: string | null): void {
  try {
    if (id) localStorage.setItem(LAST_CONV_KEY, id);
    else localStorage.removeItem(LAST_CONV_KEY);
  } catch {
    // private mode: the panel opens on a new chat next time
  }
}
const DEFAULT_PREFS: Prefs = {
  theme: "auto",
  size: "normal",
  compact: false,
  toolsOpen: false,
  showUsage: true,
  send: "enter",
  listOpen: true,
};

function loadPrefs(): Prefs {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFS_KEY) ?? "{}");
    return {
      ...DEFAULT_PREFS,
      ...(typeof saved === "object" && saved ? saved : {}),
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

function savePrefs(p: Prefs): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p));
  } catch {
    // private mode or storage full: the setting lasts until the page reloads
  }
}

const MAX_MENTIONS = 8;
const NOTE_ARM_MS = 1500;

/** Starter requests for the empty chat, using this home's own area names. */
export function welcomeTips(hass: any, member = false): { text: string; icon: string }[] {
  const areas = Object.values(hass?.areas ?? {})
    .map((a: any) => String(a.name ?? ""))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  const room = areas[0] ?? t("living_room");
  const energy = Object.values(hass?.states ?? {}).some(
    (s: any) => s.attributes?.device_class === "energy",
  );
  if (member)
    return [
      { text: t("tip_lights", { room }), icon: "mdi:lightbulb-group-outline" },
      { text: t("tip_anything_on"), icon: "mdi:power" },
      { text: t("tip_temperature"), icon: "mdi:thermometer" },
    ];
  return [
    { text: t("tip_lights", { room }), icon: "mdi:lightbulb-group-outline" },
    { text: t("tip_dashboard_room", { room }), icon: "mdi:view-dashboard-outline" },
    {
      text: t("tip_dashboard_all"),
      icon: "mdi:view-dashboard-edit-outline",
    },
    {
      text: t("tip_automation"),
      icon: "mdi:robot-outline",
    },
    energy
      ? { text: t("tip_energy"), icon: "mdi:lightning-bolt-outline" }
      : { text: t("tip_unavailable"), icon: "mdi:stethoscope" },
    { text: t("tip_batteries"), icon: "mdi:battery-alert-variant-outline" },
  ];
}

/** Entities, areas and devices whose id or name contains `q`, best matches first.
 * Inserting exact ids saves the model a search and avoids picking the wrong device. */
export function findMentions(hass: Hass, q: string): Mention[] {
  const needle = q.toLowerCase();
  const scored: [number, Mention][] = [];
  const add = (m: Mention, id: string) => {
    const name = m.label.toLowerCase();
    const key = id.toLowerCase();
    let score: number;
    if (!needle) score = 3;
    else if (name.startsWith(needle) || key.startsWith(needle)) score = 0;
    else if (name.includes(needle) || key.includes(needle)) score = 1;
    else return;
    scored.push([score, m]);
  };
  for (const a of Object.values(hass.areas ?? {})) {
    add(
      {
        kind: "area",
        label: a.name,
        insert: `area_id:${a.area_id}`,
        detail: a.area_id,
      },
      a.area_id,
    );
  }
  for (const d of Object.values(hass.devices ?? {})) {
    const name = d.name_by_user || d.name;
    if (!name) continue;
    add(
      {
        kind: "device",
        label: name,
        insert: `device_id:${d.id} (${name})`,
        detail: "device",
      },
      name,
    );
  }
  for (const st of Object.values(hass.states ?? {})) {
    const name = st.attributes.friendly_name || st.entity_id;
    add(
      {
        kind: "entity",
        label: name,
        insert: st.entity_id,
        detail: st.entity_id,
      },
      st.entity_id,
    );
  }
  scored.sort((x, y) => x[0] - y[0] || x[1].label.localeCompare(y[1].label));
  return scored.slice(0, MAX_MENTIONS).map(([, m]) => m);
}

/** A chat as Markdown: messages, and each tool call with its result. */
export function toMarkdown(title: string, items: Item[]): string {
  const out = [`# ${chatName(title)}`, ""];
  for (const item of items) {
    if (item.kind === "user") {
      const n = item.images?.length || item.photos || 0;
      const parts = [
        ...(n ? [photoCount(n)] : []),
        ...(item.files ?? []).map((f) => f.name),
      ];
      const note = parts.length ? ` _(${parts.join(", ")})_` : "";
      out.push(`**${t("you")}:** ${item.text}${note}`, "");
    }
    else if (item.kind === "assistant" && item.text) out.push(item.text, "");
    else if (item.kind === "notice") out.push(`> ${item.text}`, "");
    else if (item.kind === "tool") {
      const mark =
        item.status === "ok" ? "✓" : item.status === "error" ? "✗" : "…";
      out.push(
        `- ${mark} \`${item.name}\`${item.summary ? `: ${item.summary}` : ""}`,
        "",
      );
    }
  }
  return out.join("\n");
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

const CONTINUABLE = new Set(["length", "tool_limit", "cancelled", "spend_cap"]);

function toItems(messages: StoredMessage[]): Item[] {
  const items: Item[] = [];
  const calls = new Map<
    string,
    { name: string; args: Record<string, unknown> }
  >();
  for (const m of messages) {
    if (m.role === "user")
      items.push({
        kind: "user",
        text: m.content,
        photos: m.photos,
        files: m.files,
        page: m.page,
      });
    else if (m.role === "assistant") {
      if (m.content) items.push({ kind: "assistant", text: m.content });
      for (const c of m.tool_calls)
        calls.set(c.id, { name: c.name, args: c.args });
    } else {
      const call = calls.get(m.tool_call_id);
      items.push({
        kind: "tool",
        id: m.tool_call_id,
        name: m.name,
        args: call?.args ?? {},
        status: m.ok ? "ok" : "error",
        summary: m.summary || (m.decision === "denied" ? t("denied") : ""),
        preview: m.preview,
        snapshotId: m.snapshot_id,
        undone: m.undone,
        review: m.review ?? undefined,
      });
    }
  }
  return items;
}

const REVIEW_WORDS = {
  approve: "reviewer_approved",
  deny: "reviewer_denied",
  ask: "reviewer_unsure",
} as const;

function reviewTag(
  review: ReviewVerdict | undefined,
  reviewing: boolean | undefined,
): JSX.Element {
  if (reviewing && !review) return <span class="tag wait">{t("reviewing")}</span>;
  if (!review) return null;
  return (
    <span class={`tag review ${review.decision}`} title={review.reason}>
      {t(REVIEW_WORDS[review.decision] ?? "reviewer")}
    </span>
  );
}

function diffLines(diff: string): JSX.Element[] {
  return diff
    .replace(/\n+$/, "")
    .split("\n")
    .map((line) => {
      const cls =
        line.startsWith("+") && !line.startsWith("+++")
          ? "add"
          : line.startsWith("-") && !line.startsWith("---")
            ? "del"
            : line.startsWith("@@")
              ? "hunk"
              : "";
      return <span class={cls}>{line || " "}</span>;
    });
}

function toolIcon(name: string): string {
  if (name === "shell") return "mdi:console";
  if (name === "call_service") return "mdi:play-circle-outline";
  if (name === "undo") return "mdi:undo";
  if (name === "system") return "mdi:cog-outline";
  if (name === "ha_websocket") return "mdi:api";
  if (name === "integrations") return "mdi:puzzle-outline";
  if (name === "read_reference") return "mdi:book-open-variant";
  if (name === "render_template") return "mdi:code-braces";
  if (name === "get_history") return "mdi:chart-timeline-variant";
  if (name === "web_fetch") return "mdi:web";
  if (name === "web_search") return "mdi:magnify";
  if (name === "camera_snapshot") return "mdi:cctv";
  if (name === "get_traces") return "mdi:transit-connection-variant";
  if (name === "get_logbook") return "mdi:history";
  if (name === "read_log") return "mdi:text-box-search-outline";
  if (name.includes("dashboard")) return "mdi:view-dashboard-outline";
  if (name.includes("config_item")) return "mdi:robot-outline";
  if (name.includes("file")) return "mdi:file-document-outline";
  if (
    name.includes("area") ||
    name.includes("device") ||
    name.includes("registry")
  )
    return "mdi:devices";
  if (name.includes("entit") || name.includes("service"))
    return "mdi:format-list-bulleted";
  return "mdi:wrench-outline";
}

/** The server names a chat "New chat" until its first message gives it a title. */
function chatName(title: string): string {
  return title === "New chat" ? t("new_chat") : title;
}

function photoCount(n: number): string {
  return n === 1 ? t("one_photo") : t("n_photos", { count: n });
}

function greeting(): string {
  const h = new Date().getHours();
  return t(
    h < 5
      ? "greeting_evening"
      : h < 12
        ? "greeting_morning"
        : h < 18
          ? "greeting_afternoon"
          : "greeting_evening",
  );
}

/** Chats grouped by when they were last used; search results stay in one group. */
function groupByDay(
  list: ConvSummary[],
  flat: boolean,
): [Key | "", ConvSummary[]][] {
  if (flat) return [["", list]];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const today = start.getTime() / 1000;
  const bounds: [Key, number][] = [
    ["today", today],
    ["yesterday", today - 86400],
    ["previous_7", today - 7 * 86400],
    ["previous_30", today - 30 * 86400],
    ["older", -Infinity],
  ];
  const groups: [Key | "", ConvSummary[]][] = [];
  for (const c of list) {
    const label = bounds.find(([, t]) => c.updated >= t)![0];
    const g = groups.find(([l]) => l === label);
    if (g) g[1].push(c);
    else groups.push([label, [c]]);
  }
  return groups;
}

/** A built-in tool's name in the user's language; MCP and unknown tools as they are. */
function toolLabel(name: string): string {
  const key = `tool_${name}`;
  return has(key) ? t(key) : name.replace(/_/g, " ");
}

function argsLine(args: Record<string, unknown>): string {
  const s = Object.entries(args)
    .filter(([k]) => !k.startsWith("_"))
    .map(([k, v]) => `${k}=${typeof v === "string" ? v : JSON.stringify(v)}`)
    .join(" ");
  return s.length > 120 ? `${s.slice(0, 117)}…` : s;
}

function fmtTokens(n: number): string {
  return n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1000
      ? `${(n / 1000).toFixed(1)}k`
      : String(n);
}

function modeName(mode?: string): string {
  const key = (
    {
      ask_all: "mode_ask_all",
      ask_risky: "mode_ask_risky",
      reviewer: "mode_reviewer",
      autopilot: "mode_autopilot",
      yolo: "mode_yolo",
      read_only: "mode_read_only",
    } as Record<string, Key>
  )[mode ?? ""];
  return key ? t(key) : "";
}

function errText(err: unknown): string {
  return (err as { message?: string }).message ?? String(err);
}

if (!customElements.get("llm-agent-panel")) {
  customElements.define("llm-agent-panel", LlmAgentPanel);
}

/** An ARIA true/false attribute: a boolean false would remove it instead. */
function tf(on: boolean): "true" | "false" {
  return on ? "true" : "false";
}

/** An HTML string as nodes, for markup that must sit directly in its parent (the
 * bubble's CSS styles its first and last child), the job Lit's unsafeHTML did. */
function nodes(html: string): Node[] {
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  return [...tpl.content.childNodes];
}

const MAX_PHOTOS = 3;
// Same limits as the server's attachments.py.
const MAX_FILES = 10;
const MAX_FILE_BYTES = 2 * 1024 * 1024;
// Base64 characters for photos and files together. Home Assistant drops WebSocket
// messages over 4 MiB; this leaves room for the text (up to 100k characters) and JSON.
const PAYLOAD_BUDGET = 3_500_000;

const FILE_ICONS: Record<AttachedFile["kind"], string> = {
  text: "mdi:file-document-outline",
  pdf: "mdi:file-pdf-box",
  zip: "mdi:folder-zip-outline",
  gzip: "mdi:folder-zip-outline",
};

/** Pictures the photo path can re-encode. SVG is text and goes as a file. */
function isPicture(f: File): boolean {
  return f.type.startsWith("image/") && f.type !== "image/svg+xml";
}

function base64Length(bytes: number): number {
  return Math.ceil(bytes / 3) * 4;
}

function fmtBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  if (n >= 1024) return `${Math.round(n / 1024)} KB`;
  return `${n} B`;
}

/** The extension for text files (YAML, LOG, CSV), else the kind. */
function fileLabel(f: AttachedFile): string {
  if (f.kind !== "text") return f.kind.toUpperCase();
  const dot = f.name.lastIndexOf(".");
  const ext = dot > 0 ? f.name.slice(dot + 1) : "";
  return ext && ext.length <= 5 ? ext.toUpperCase() : t("file_text");
}

/** What the file is, judged from its first bytes with the server's rules, or null
 * for a binary the server would refuse. Checked here so the person hears at once. */
function sniff(b: Uint8Array): AttachedFile["kind"] | null {
  const starts = (...sig: number[]) => sig.every((v, i) => b[i] === v);
  if (starts(0x50, 0x4b, 0x03, 0x04) || starts(0x50, 0x4b, 0x05, 0x06)) return "zip";
  if (starts(0x1f, 0x8b)) return "gzip";
  if (starts(0x25, 0x50, 0x44, 0x46, 0x2d)) return "pdf";
  if (starts(0xff, 0xfe) || starts(0xfe, 0xff)) return "text"; // UTF-16
  let control = 0;
  for (const x of b) {
    if (x === 0) return null;
    if (x < 32 && x !== 9 && x !== 10 && x !== 12 && x !== 13 && x !== 27) control++;
  }
  return b.length && control / b.length > 0.02 ? null : "text";
}

/** The file as base64, or null when it is not a type the server reads. */
async function readFile(file: File): Promise<AttachedFile | null> {
  const kind = sniff(new Uint8Array(await file.slice(0, 8192).arrayBuffer()));
  if (!kind) return null;
  const url = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  return { name: file.name || "file", size: file.size, kind, data: url.slice(url.indexOf(",") + 1) };
}
const PHOTO_SIDE = 1568; // larger pictures cost more tokens without helping the model
// Base64 characters per photo: three of them plus the text stay well under Home
// Assistant's 4 MiB WebSocket message limit, even for noisy pictures.
const PHOTO_BUDGET = 1_000_000;

/** Re-encode a picture as a JPEG of at most PHOTO_SIDE pixels a side. This keeps the
 * message well under Home Assistant's WebSocket limit and drops metadata such as the
 * location the photo was taken. */
async function shrinkPhoto(file: File): Promise<Photo> {
  const bitmap = await createImageBitmap(file);
  try {
    let side = Math.min(PHOTO_SIDE, Math.max(bitmap.width, bitmap.height));
    for (;;) {
      for (const quality of [0.85, 0.7, 0.55]) {
        const url = encodeJpeg(bitmap, side, quality);
        const data = url.slice(url.indexOf(",") + 1);
        if (data.length <= PHOTO_BUDGET) return { media_type: "image/jpeg", data, url };
      }
      if (side <= 256) throw new Error("photo too detailed to send");
      side = Math.round(side * 0.75);
    }
  } finally {
    bitmap.close();
  }
}

function encodeJpeg(bitmap: ImageBitmap, side: number, quality: number): string {
  const scale = Math.min(1, side / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff"; // transparent areas would turn black in a JPEG
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}
