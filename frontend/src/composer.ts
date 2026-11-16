/**
 * A plain textarea shows Markdown as raw characters (`# heading`, `**bold**`, fences), so
 * what someone types looked nothing like the message they then saw sent. This file puts a
 * live-formatting editor (TinyMDE, tiny-markdown-editor on npm) in the textarea's place and
 * gives the panel one small interface for both, so panel.ts does not care which it has.
 *
 * What is not true of the editor, stated here so nobody relies on it:
 * - The Markdown characters (#, *, backticks) stay visible. That is how TinyMDE works: it
 *   styles the text as typed and never hides or replaces characters.
 * - Text dragged into the box is not inserted. TinyMDE cancels every drop on the box; files
 *   dropped on it still reach the panel's own drop handler and are attached.
 * - Undo is TinyMDE's own history (Ctrl/Cmd+Z), not the browser's.
 *
 * Why a subclass and not TinyMDE as it ships: it reads the caret with window.getSelection().
 * The panel lives inside Home Assistant's nested shadow roots, where that call returns the
 * shadow host instead of the text node, so every caret read came back empty and Enter,
 * paste and re-rendering lost the cursor. Chromium answers through the non-standard
 * ShadowRoot.getSelection(); WebKit (Safari and the iPhone app) only through
 * Selection.getComposedRanges(). Where neither exists the editor cannot know its caret, so
 * the panel keeps the textarea instead (see markdownBox).
 *
 * Why the lib/ files and not the package's index or dist/: lib/TinyMDE.js and
 * lib/grammar.js import nothing else, while the dist/ bundles carry core-js polyfills the
 * panel's es2022 target does not need. Importing lib/TinyMDE also leaves out the command bar.
 */

import { Editor } from "tiny-markdown-editor/lib/TinyMDE";
import { inlineGrammar, type GrammarRule } from "tiny-markdown-editor/lib/grammar";

/** What the panel needs from its chat box, whichever kind it is. */
export interface ComposerBox {
  /** The element that takes focus and key presses. */
  readonly el: HTMLElement;
  /** The textarea this box was made for; a new one means a new box. */
  readonly source: HTMLTextAreaElement;
  /** The text as shown, with @Name labels (mentions.ts turns them back into ids). */
  value: string;
  /** Caret offset in `value`, or the start of the selection. */
  readonly selectionStart: number;
  setSelectionRange(start: number, end: number): void;
  focus(): void;
  /** Fit the height to the text. */
  fit(): void;
  /** The @Name labels picked so far, drawn as pills. */
  setMentions(labels: string[]): void;
  setPlaceholder(text: string): void;
  destroy(): void;
}

export interface BoxEvents {
  onKey(ev: KeyboardEvent): void;
  /** The text changed by typing, pasting, a new line or undo. Not called for `value = `. */
  onChange(): void;
  onPaste(ev: ClipboardEvent): void;
  onBlur(): void;
}

/** The Markdown editor, or the textarea itself when the editor cannot run here. */
export function makeBox(source: HTMLTextAreaElement, on: BoxEvents): ComposerBox {
  try {
    return new MarkdownBox(source, on);
  } catch (err) {
    // A box that formats nothing beats no box: the panel is unusable without one.
    console.warn("llm-agent: Markdown editor did not start, using a plain box", err);
    return new PlainBox(source, on);
  }
}

class PlainBox implements ComposerBox {
  readonly el: HTMLTextAreaElement;
  readonly #off: () => void;

  constructor(
    readonly source: HTMLTextAreaElement,
    on: BoxEvents,
  ) {
    this.el = source;
    const input = () => on.onChange();
    source.addEventListener("keydown", on.onKey);
    source.addEventListener("input", input);
    source.addEventListener("paste", on.onPaste);
    source.addEventListener("blur", on.onBlur);
    this.#off = () => {
      source.removeEventListener("keydown", on.onKey);
      source.removeEventListener("input", input);
      source.removeEventListener("paste", on.onPaste);
      source.removeEventListener("blur", on.onBlur);
    };
  }

  get value(): string {
    return this.el.value;
  }

  set value(text: string) {
    this.el.value = text;
  }

  get selectionStart(): number {
    return this.el.selectionStart ?? this.el.value.length;
  }

  setSelectionRange(start: number, end: number): void {
    this.el.setSelectionRange(start, end);
  }

  focus(): void {
    this.el.focus();
  }

  /** The cap lives in CSS (a share of the visible viewport, which shrinks when a phone
   * keyboard opens); past it the box scrolls inside. */
  fit(): void {
    this.el.style.height = "auto";
    this.el.style.height = `${this.el.scrollHeight}px`;
  }

  setMentions(): void {}

  setPlaceholder(): void {}

  destroy(): void {
    this.#off();
  }
}

interface Ends {
  anchorNode: Node | null;
  anchorOffset: number;
  focusNode: Node | null;
  focusOffset: number;
}

type ComposedRanges = (...args: unknown[]) => StaticRange[];

/** The selection as seen from inside `root`. See the file comment for why this differs
 * between engines. Returns null when this browser cannot say. */
function readSelection(root: Node): Ends | null {
  if (root instanceof ShadowRoot) {
    const own = (root as { getSelection?: () => Selection | null }).getSelection?.();
    if (own) return own;
    const sel = document.getSelection();
    const composed = (sel as { getComposedRanges?: ComposedRanges } | null)?.getComposedRanges;
    if (!sel || !composed) return null;
    let ranges: StaticRange[];
    try {
      ranges = composed.call(sel, { shadowRoots: [root] });
    } catch {
      // Safari 17.0 to 18.x take the roots as arguments, not in an options object.
      ranges = composed.call(sel, root);
    }
    const r = ranges[0];
    if (!r) return null;
    // A static range has no direction; Selection.direction says which end the caret is at.
    const back = (sel as { direction?: string }).direction === "backward";
    return back
      ? { anchorNode: r.endContainer, anchorOffset: r.endOffset, focusNode: r.startContainer, focusOffset: r.startOffset }
      : { anchorNode: r.startContainer, anchorOffset: r.startOffset, focusNode: r.endContainer, focusOffset: r.endOffset };
  }
  return document.getSelection();
}

function canReadSelection(root: Node): boolean {
  if (!(root instanceof ShadowRoot)) return true;
  if (typeof (root as { getSelection?: unknown }).getSelection === "function") return true;
  return typeof (Selection.prototype as { getComposedRanges?: unknown }).getComposedRanges === "function";
}

interface Pos {
  row: number;
  col: number;
}

// TinyMDE members its type file marks private. They exist at runtime in 0.2.35, the only
// version package.json allows; a version bump has to check them again.
interface Internals {
  e: HTMLDivElement;
  lines: string[];
  customInlineGrammar: Record<string, GrammarRule>;
  mergedInlineGrammar: Record<string, GrammarRule>;
  computeColumn(node: Node, offset: number): number | null;
  computeNodeAndOffset(row: number, col: number, bindRight?: boolean): { node: Node; offset: number };
}

/** TinyMDE with its caret read and written through the shadow root it lives in. */
class ShadowEditor extends Editor {
  override getSelection(getAnchor = false): Pos | null {
    const self = this as unknown as Internals;
    const ends = readSelection(self.e.getRootNode());
    const node = getAnchor ? ends?.anchorNode : ends?.focusNode;
    if (!ends || !node) return null;
    const offset = getAnchor ? ends.anchorOffset : ends.focusOffset;
    if (node === self.e) {
      // The caret sits between line elements, not inside one.
      if (offset < self.lines.length) return { row: offset, col: 0 };
      const row = self.lines.length - 1;
      return { row, col: self.lines[row]?.length ?? 0 };
    }
    const col = self.computeColumn(node, offset);
    if (col === null) return null;
    let line: Node = node;
    while (line.parentNode && line.parentNode !== self.e) line = line.parentNode;
    const row = Array.prototype.indexOf.call(self.e.childNodes, line);
    return row < 0 ? null : { row, col };
  }

  override setSelection(focus: Pos, anchor: Pos | null = null): void {
    if (!focus) return;
    const self = this as unknown as Internals;
    const f = self.computeNodeAndOffset(
      focus.row,
      focus.col,
      anchor ? anchor.row === focus.row && anchor.col > focus.col : false,
    );
    let a = f;
    if (anchor && (anchor.row !== focus.row || anchor.col !== focus.col)) {
      a = self.computeNodeAndOffset(anchor.row, anchor.col, focus.row === anchor.row && focus.col > anchor.col);
    }
    const root = self.e.getRootNode();
    const sel =
      (root as { getSelection?: () => Selection | null }).getSelection?.() ?? document.getSelection();
    sel?.setBaseAndExtent(a.node, a.offset, f.node, f.offset);
  }
}

// A Markdown code fence line: three or more backticks or tildes, indented at most three
// spaces. Opening and closing fences are told apart by counting, not by their text.
const FENCE = /^ {0,3}(`{3,}|~{3,})/;

/** True when `caret` sits inside a code block that is still open there: an odd number of
 * fence lines come before the caret's line. Opening and closing fences of different
 * lengths are not matched up, which only matters for fences nested inside fences. */
export function insideFence(text: string, caret: number): boolean {
  let open = false;
  for (const line of text.slice(0, caret).split("\n").slice(0, -1)) {
    if (FENCE.test(line)) open = !open;
  }
  return open;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

class MarkdownBox implements ComposerBox {
  readonly el: HTMLDivElement;
  readonly #ed: ShadowEditor;
  readonly #host: Element | null;
  #quiet = false;
  #labels = "";
  /** The text was replaced while the box was not focused: focusing puts the caret at
   * the end, as a textarea does, instead of wherever the old text had it. */
  #caretToEnd = true;
  /** The text at the last change, to tell a typed newline from any other edit. */
  #last = "";

  constructor(
    readonly source: HTMLTextAreaElement,
    on: BoxEvents,
  ) {
    const root = source.getRootNode();
    if (!canReadSelection(root)) throw new Error("this browser cannot read a caret inside a shadow root");
    const el = document.createElement("div");
    el.className = "box";
    el.setAttribute("role", "textbox");
    el.setAttribute("aria-multiline", "true");
    // Ours are added before TinyMDE's, so a paste of files can stop its paste handler from
    // also pasting the clipboard's text (a textarea pasted nothing when files came along).
    el.addEventListener("keydown", on.onKey);
    el.addEventListener("paste", (ev) => {
      on.onPaste(ev);
      if (ev.defaultPrevented) ev.stopImmediatePropagation();
    });
    el.addEventListener("blur", on.onBlur);
    // However the box got focus (a click, a tab, focus() below), the caret is now where
    // the person or focus() put it, so the next focus() must not move it to the end.
    el.addEventListener("focus", () => (this.#caretToEnd = false));
    // Home Assistant runs single-key shortcuts from window ("e" opens entity search, "c"
    // the command bar, "a" Assist) unless the key was pressed in an input or a textarea;
    // it does not count an editable div as a text field. Seen in the e2e run on
    // 2026-11-15: typing "@e2e" opened the entity search over the panel. Stopped at the
    // panel's host, not on the box, so the panel's own Escape handler still sees them.
    // Keys with Ctrl, Alt or Cmd pass, as they do from a textarea.
    const host = root instanceof ShadowRoot ? root.host : null;
    host?.addEventListener("keydown", this.#shield);
    this.#host = host;
    source.after(el);
    try {
      this.#ed = new ShadowEditor({ textarea: source, editor: el });
    } catch (err) {
      el.remove();
      host?.removeEventListener("keydown", this.#shield);
      source.style.display = "";
      throw err;
    }
    this.el = el;
    this.setPlaceholder(source.placeholder);
    this.#ed.addEventListener("change", () => {
      if (this.#quiet) return;
      this.#closeFence();
      on.onChange();
    });
  }

  /** Enter after an opening fence adds the closing one, with the caret on an empty line
   * between and an empty line after it. Without it, everything typed below an open fence
   * is code until the closing fence is typed, and the shaded block running off the bottom
   * of the box looked like the box was broken (reported 2026-11-15). Only when the edit was
   * a single typed newline, the line above is a fence that opens a block, and no fence
   * further down would end up paired with it. */
  #closeFence(): void {
    const prev = this.#last;
    const now = this.value;
    this.#last = now;
    if (now.length !== prev.length + 1) return;
    const at = this.selectionStart;
    if (now[at - 1] !== "\n" || now.slice(0, at - 1) + now.slice(at) !== prev) return;
    const start = now.lastIndexOf("\n", at - 2) + 1;
    const fence = FENCE.exec(now.slice(start, at - 1));
    if (!fence || insideFence(now, start)) return;
    if (now.slice(at).split("\n").some((line) => FENCE.test(line))) return;
    this.value = `${now.slice(0, at)}\n${fence[1]}\n${now.slice(at)}`;
    this.setSelectionRange(at, at);
  }

  readonly #shield = (ev: Event): void => {
    const key = ev as KeyboardEvent;
    if (key.ctrlKey || key.altKey || key.metaKey) return;
    if (key.composedPath()[0] === this.el) key.stopPropagation();
  };

  get value(): string {
    return this.#ed.getContent();
  }

  set value(text: string) {
    const focused = (this.el.getRootNode() as ShadowRoot | Document).activeElement === this.el;
    this.#quiet = true;
    this.#last = text;
    try {
      this.#ed.setContent(text);
    } finally {
      this.#quiet = false;
    }
    if (focused) this.setSelectionRange(text.length, text.length);
    else this.#caretToEnd = true;
  }

  #offset(p: Pos): number {
    const lines = (this.#ed as unknown as Internals).lines;
    let n = p.col;
    for (let i = 0; i < p.row && i < lines.length; i++) n += (lines[i]?.length ?? 0) + 1;
    return n;
  }

  #pos(offset: number): Pos {
    const lines = (this.#ed as unknown as Internals).lines;
    let rest = offset;
    for (let row = 0; row < lines.length; row++) {
      const len = lines[row]?.length ?? 0;
      if (rest <= len) return { row, col: rest };
      rest -= len + 1;
    }
    const row = Math.max(0, lines.length - 1);
    return { row, col: lines[row]?.length ?? 0 };
  }

  get selectionStart(): number {
    const f = this.#ed.getSelection(false);
    const a = this.#ed.getSelection(true);
    if (f === null) return this.value.length;
    return Math.min(this.#offset(f), a === null ? Infinity : this.#offset(a));
  }

  setSelectionRange(start: number, end: number): void {
    this.#ed.setSelection(this.#pos(end), this.#pos(start));
  }

  focus(): void {
    const keep = !this.#caretToEnd && this.#ed.getSelection() !== null;
    this.el.focus();
    this.#caretToEnd = false;
    if (!keep) this.setSelectionRange(this.value.length, this.value.length);
  }

  /** A block element grows with its lines by itself; the cap is CSS max-height. */
  fit(): void {}

  setMentions(labels: string[]): void {
    const key = labels.join("\n");
    if (key === this.#labels) return;
    this.#labels = key;
    const ed = this.#ed as unknown as Internals;
    if (!labels.length) {
      ed.customInlineGrammar = {};
      ed.mergedInlineGrammar = inlineGrammar;
      return;
    }
    // Set on the editor directly rather than through its customInlineGrammar option: that
    // path rewrites words such as "Email" or "Scheme" inside the pattern into its own
    // sub-patterns, which would break a device called "Email Server". Longest first, as
    // in Mentions.expand, so "@Kitchen" does not end "@Kitchen light" early. The new
    // pattern applies from the next render; callers set `value` right after.
    const names = [...labels].sort((a, b) => b.length - a.length).map(escapeRe);
    const rule: GrammarRule = {
      regexp: new RegExp(`^(@(?:${names.join("|")}))`),
      replacement: '<span class="TMMention">$1</span>',
    };
    ed.customInlineGrammar = { mention: rule };
    ed.mergedInlineGrammar = { ...inlineGrammar, mention: rule };
  }

  setPlaceholder(text: string): void {
    if (this.el.getAttribute("data-placeholder") === text) return;
    this.el.setAttribute("data-placeholder", text);
    this.el.setAttribute("aria-label", text);
  }

  destroy(): void {
    this.#host?.removeEventListener("keydown", this.#shield);
    this.#ed.destroy();
    this.el.remove();
  }
}
