//#region src/float.ts
var e = "llm-agent-float", t = "/llm-agent", n = () => document.querySelector("home-assistant")?.hass;
function r() {
	try {
		return JSON.parse(localStorage.getItem("llm-agent-float") ?? "{}").state ?? "closed";
	} catch {
		return "closed";
	}
}
var i = (e) => e.localName === "ha-fab" || e.getAttribute("slot") === "fab" || e.id === "fab" || e.id === "tabbar";
function a(e, t) {
	let n = document.elementFromPoint(e, t);
	for (; n?.shadowRoot;) {
		let r = n.shadowRoot.elementFromPoint(e, t);
		if (!r || r === n) break;
		n = r;
	}
	return n;
}
function o(e) {
	for (; e;) {
		if (i(e)) return e;
		e = e.parentElement ?? (e.getRootNode().host || null);
	}
	return null;
}
var s = class extends HTMLElement {
	#e = this.attachShadow({ mode: "open" });
	#t;
	#n;
	#r = !1;
	#i = !1;
	#a;
	#o = r();
	constructor() {
		super(), this.#e.innerHTML = "<style>\n      :host { position: fixed; z-index: 5; inset: auto 0 0 auto; pointer-events: none; }\n      /* by class: the window is appended to this same shadow root, with buttons of its own */\n      .fab {\n        pointer-events: auto; position: fixed; width: 56px; height: 56px; border-radius: 50%;\n        right: calc(16px + var(--safe-area-inset-right, 0px));\n        bottom: calc(var(--lift, 16px) + var(--safe-area-inset-bottom, 0px));\n        border: none; cursor: pointer; display: grid; place-items: center;\n        background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff);\n        box-shadow: 0 2px 6px rgba(0,0,0,.2), 0 8px 24px rgba(0,0,0,.18);\n        --mdc-icon-size: 26px;\n      }\n      .fab:focus-visible { outline: 3px solid color-mix(in srgb, var(--primary-color, #03a9f4) 45%, transparent); outline-offset: 2px; }\n      [hidden] { display: none !important; }\n    </style><button class=\"fab\" part=\"button\" aria-label=\"LLM Agent\" title=\"LLM Agent\" hidden><ha-icon icon=\"mdi:robot-outline\"></ha-icon></button>", this.#t = this.#e.querySelector(".fab"), this.#t.addEventListener("click", () => void this.open("open"));
	}
	connectedCallback() {
		let e = () => {
			this.#s(), this.#n?.navigated();
		};
		window.addEventListener("location-changed", e), window.addEventListener("popstate", e), window.addEventListener("resize", () => this.#c()), setInterval(() => this.#s(), 1e3), this.#s();
	}
	async open(e) {
		if (this.#o = e, !this.#n) {
			if (this.#r) return;
			this.#r = !0;
			try {
				let e = new URL(import.meta.url), t = await import(
					/* @vite-ignore */
					new URL(`llm-agent-float-window.js${e.search}`, e).href
);
				this.#n = t.createWindow({
					hass: n,
					onState: (e) => {
						this.#o = e, this.#s();
					}
				}), this.#e.append(this.#n.el);
			} finally {
				this.#r = !1;
			}
		}
		this.#s();
	}
	#s() {
		let r = n();
		r?.connection && this.#a !== r.connection && (this.#a = r.connection, r.connection.subscribeMessage((t) => {
			new URL(t.item.url, location.href).pathname.endsWith(`/${e}.js`) && (this.#i = t.change_type === "removed", this.#s());
		}, { type: "frontend/subscribe_extra_js" }).catch(() => void 0));
		let i = location.pathname, a = !!r?.panels?.["llm-agent"] && !this.#i && i !== t && !i.startsWith(`${t}/`), o = this.#o !== "open" && this.#o !== "min";
		a && !o && !this.#n && !this.#r && this.open(this.#o), this.#n && (a && !o ? this.#n.show(this.#o) : this.#n.hide());
		let s = a && (o || !this.#n);
		this.#t.hidden = !s, s && this.#c();
	}
	#c() {
		if (this.#t.hidden) return;
		let e = this.#t;
		e.style.pointerEvents = "none";
		let t = 16;
		for (let n = 0; n < 3; n++) {
			e.style.setProperty("--lift", `${t}px`);
			let n = e.getBoundingClientRect(), r = o(a(n.left + n.width / 2, n.top + n.height / 2));
			if (!r) break;
			t = Math.max(t, Math.round(innerHeight - r.getBoundingClientRect().top + 8));
		}
		e.style.removeProperty("pointer-events");
	}
};
customElements.get(e) || (customElements.define(e, s), document.body.append(document.createElement(e)));
//#endregion
