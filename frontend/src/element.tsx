// Home Assistant talks to a panel and its views through custom elements: it creates the
// element by tag name and sets properties on it, `hass` above all, which it replaces
// with a new object on every state change in the house, many times a minute. Solid has
// no element class of its own, so this file is the thin shell between the two: each
// declared property becomes a signal, the view renders once into the shadow root, and
// from then on Solid updates only the text, attribute or row that read a changed value.
//
// The obvious alternative, one signal holding all of hass read straight from the view,
// would re-run every part of a view that touches it on every sensor tick, which is what
// Lit's whole-template render did. Views read hass through hassPart() instead: a memo
// re-checks on every tick (one property read) but tells its readers only when the part
// they asked for is a different value.
import { render, type JSX } from "@solidjs/web";
import { createMemo, createSignal, type Accessor, type Setter } from "solid-js";
import type { Hass } from "./types";

/** Each declared property of the element, as an accessor the view reads. */
export type Props<P> = { readonly [K in keyof P]-?: Accessor<P[K] | undefined> };

/** A stylesheet from CSS text, adopted by every element of a tag (one parse each). */
export function sheet(text: string): CSSStyleSheet {
  const s = new CSSStyleSheet();
  s.replaceSync(text);
  return s;
}

interface Options<P> {
  /** Properties HA or the parent sets on the element; each one becomes a signal. */
  props: readonly (keyof P & string)[];
  /** Adopted in order; later sheets win, as Lit's static styles array did. */
  styles: () => CSSStyleSheet[];
  /** Rendered once per connection. `host` is the element, for dispatching events. */
  view: (props: Props<P>, host: HTMLElement) => JSX.Element;
}

/** Define `tag` as a custom element rendered by Solid, unless it is already defined
 * (the panel bundle can be loaded twice: by the panel page and by the floating chat). */
export function define<P extends object>(tag: string, o: Options<P>): void {
  if (customElements.get(tag)) return;
  class SolidHost extends HTMLElement {
    #signals = new Map<string, [Accessor<unknown>, Setter<unknown>]>();
    #dispose?: () => void;

    constructor() {
      super();
      for (const name of o.props) {
        this.#signals.set(name, createSignal<unknown>() as [Accessor<unknown>, Setter<unknown>]);
        // A property set before the element was upgraded sits on the instance and would
        // hide the accessor below; move it into the signal.
        if (Object.prototype.hasOwnProperty.call(this, name)) {
          const v = (this as Record<string, unknown>)[name];
          delete (this as Record<string, unknown>)[name];
          (this as Record<string, unknown>)[name] = v;
        }
      }
    }

    // What was last set, for the getter. Solid stages a signal write until the next
    // microtask, so reading the signal back here would answer the value before it.
    #values = new Map<string, unknown>();

    /** @internal */
    _get(name: string): unknown {
      return this.#values.get(name);
    }

    /** @internal */
    _set(name: string, v: unknown): void {
      this.#values.set(name, v);
      // a function value is stored as it is, not called as an updater
      this.#signals.get(name)![1](() => v);
    }

    connectedCallback(): void {
      if (this.#dispose) return; // moved in the DOM: still rendered, state kept
      const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = o.styles();
      const props = {} as Record<string, Accessor<unknown>>;
      for (const [name, [get]] of this.#signals) props[name] = get;
      this.#dispose = render(() => o.view(props as Props<P>, this), root);
    }

    disconnectedCallback(): void {
      // A move (remove then insert in the same task, as appending to a new parent does)
      // reconnects before this runs, so only an element that stayed out is torn down.
      // Lit kept its state across a move; disposing at once would throw it away.
      queueMicrotask(() => {
        if (this.isConnected || !this.#dispose) return;
        this.#dispose();
        this.#dispose = undefined;
        this.shadowRoot?.replaceChildren();
      });
    }
  }
  for (const name of o.props) {
    Object.defineProperty(SolidHost.prototype, name, {
      get(this: SolidHost) {
        return this._get(name);
      },
      set(this: SolidHost, v: unknown) {
        this._set(name, v);
      },
      configurable: true,
    });
  }
  customElements.define(tag, SolidHost);
}

/** One part of hass, as a memo that changes only when that part does. Reading it in a
 * view costs nothing on the ticks where something else in the house changed. */
export function hassPart<T>(hass: Accessor<Hass | undefined>, pick: (h: Hass) => T): Accessor<T | undefined> {
  return createMemo(() => {
    const h = hass();
    return h ? pick(h) : undefined;
  });
}
