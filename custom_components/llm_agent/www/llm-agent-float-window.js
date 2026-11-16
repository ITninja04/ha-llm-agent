//#region src/i18n.ts
var e = [
	"de",
	"es",
	"fr",
	"it",
	"nl",
	"pl",
	"pt-BR",
	"sv",
	"zh-Hans",
	"zh-Hant"
];
function t(t) {
	if (!t) return "en";
	let n = e.find((e) => e.toLowerCase() === t.toLowerCase());
	if (n) return n;
	let r = t.split("-")[0].toLowerCase();
	return e.find((e) => e.split("-")[0].toLowerCase() === r) ?? "en";
}
//#endregion
//#region src/floatwindow.ts
var n = "llm-agent-float", r = 600, i = 320, a = 360, o = 8;
function s() {
	let e = {
		w: 420,
		h: 620,
		state: "closed"
	};
	try {
		let t = JSON.parse(localStorage.getItem(n) ?? "{}");
		for (let n of [
			"x",
			"y",
			"w",
			"h"
		]) typeof t[n] == "number" && Number.isFinite(t[n]) && (e[n] = t[n]);
		[
			"open",
			"min",
			"closed"
		].includes(t.state) && (e.state = t.state);
	} catch {}
	return e;
}
function c(e) {
	try {
		localStorage.setItem(n, JSON.stringify(e));
	} catch {}
}
var l = "\n  .win {\n    --w-bg: var(--card-background-color, #fff);\n    --w-text: var(--primary-text-color, #1f2328);\n    --w-muted: var(--secondary-text-color, #656d76);\n    --w-line: var(--divider-color, rgba(127,127,127,.2));\n    --w-hover: color-mix(in srgb, var(--w-text) 8%, transparent);\n    position: fixed; z-index: 5; display: flex; flex-direction: column;\n    background: var(--w-bg); color: var(--w-text); border: 1px solid var(--w-line);\n    border-radius: 14px; overflow: hidden; pointer-events: auto;\n    box-shadow: 0 2px 8px rgba(0,0,0,.12), 0 18px 48px rgba(0,0,0,.24);\n    font-family: ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif;\n  }\n  /* the panel's own explicit themes, so the frame matches what is inside it */\n  .win[data-theme=\"light\"] { --w-bg: #ffffff; --w-text: #1f2328; --w-muted: #667080; --w-line: rgba(15,23,42,.09); color-scheme: light; }\n  .win[data-theme=\"dark\"] { --w-bg: #171a1f; --w-text: #e7e9ec; --w-muted: #949ba5; --w-line: rgba(255,255,255,.08); color-scheme: dark; }\n  .bar {\n    display: flex; align-items: center; gap: 2px; height: 40px; flex: none;\n    padding: 0 4px 0 12px; border-bottom: 1px solid var(--w-line);\n    cursor: grab; user-select: none; touch-action: none;\n  }\n  .win.dragging .bar { cursor: grabbing; }\n  .bar .name { flex: 1; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; min-width: 0; }\n  .bar .name ha-icon { --mdc-icon-size: 18px; color: var(--primary-color, #03a9f4); }\n  .bar button {\n    width: 32px; height: 32px; border: none; border-radius: 8px; background: none;\n    color: var(--w-muted); cursor: pointer; display: grid; place-items: center; --mdc-icon-size: 18px;\n  }\n  .bar button:hover { background: var(--w-hover); color: var(--w-text); }\n  .bar button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); }\n  .body { flex: 1; min-height: 0; position: relative; }\n  .body > llm-agent-panel { position: absolute; inset: 0; }\n  .win.min { height: auto !important; }\n  .win.min .body, .win.min .grip { display: none; }\n  .grip {\n    position: absolute; right: 0; bottom: 0; width: 18px; height: 18px; cursor: nwse-resize;\n    touch-action: none; z-index: 4;\n    background: linear-gradient(135deg, transparent 50%, var(--w-line) 50%, var(--w-line) 60%, transparent 60%, transparent 70%, var(--w-line) 70%, var(--w-line) 80%, transparent 80%);\n  }\n  .win.sheet {\n    left: 0 !important; right: 0; top: auto !important; bottom: 0; width: auto !important;\n    height: calc(100% - 56px - var(--safe-area-inset-top, 0px)) !important;\n    border-radius: 16px 16px 0 0; border-bottom: none;\n    padding-bottom: var(--safe-area-inset-bottom, 0px);\n  }\n  .win.sheet.min { height: auto !important; }\n  .win.sheet .bar { cursor: default; }\n  .win.sheet .grip { display: none; }\n  [hidden] { display: none !important; }\n", u = {
	min: "mdi:window-minimize",
	restore: "mdi:window-restore",
	full: "mdi:open-in-new",
	close: "mdi:close"
};
function d(e) {
	let t = s(), n = document.createElement("div");
	n.innerHTML = `<style>${l}</style>
    <div class="win" role="dialog" aria-label="LLM Agent" hidden>
      <div class="bar">
        <div class="name"><ha-icon icon="mdi:robot-outline"></ha-icon><span>LLM Agent</span></div>
        <button class="min"><ha-icon icon="${u.min}"></ha-icon></button>
        <button class="full"><ha-icon icon="${u.full}"></ha-icon></button>
        <button class="close"><ha-icon icon="${u.close}"></ha-icon></button>
      </div>
      <div class="body"></div>
      <div class="grip" role="separator"></div>
    </div>`;
	let d = n.querySelector(".win"), p = n.querySelector(".bar"), h = n.querySelector(".body"), g = n.querySelector(".grip"), _ = (e) => n.querySelector(`.bar .${e}`), v, y = "closed", b = !1, x, S = 0, C = 0, w = 0, T;
	function E() {
		let t = _("min");
		m(e.hass(), (e, n) => {
			let r = e === "grip" ? g : e === "min" || e === "restore" ? t : _(e);
			(r !== t || e === t.dataset.key) && (r.title = n, r.setAttribute("aria-label", n));
		});
	}
	let D = () => innerWidth < r;
	function O() {
		if (d.classList.toggle("sheet", D()), D()) return;
		let e = Math.min(Math.max(t.w, i), innerWidth - 16), n = Math.min(Math.max(t.h, a), innerHeight - 16), r = t.x ?? innerWidth - e - 24, s = t.y ?? innerHeight - n - 24;
		d.style.width = `${e}px`, d.style.height = `${n}px`, d.style.left = `${Math.min(Math.max(r, o), innerWidth - e - o)}px`, d.style.top = `${Math.min(Math.max(s, o), innerHeight - 40 - o)}px`;
	}
	function k(n) {
		y = n, t.state = n, c(t), e.onState(n);
	}
	function A() {
		let t = e.hass();
		v && t && t !== x && (x = t, v.hass = t), S = b ? requestAnimationFrame(A) : 0;
	}
	function j() {
		clearTimeout(w), w = window.setTimeout(async () => {
			let t = e.hass();
			if (!v || !T || !t || !b) return;
			let n = ++C;
			try {
				let e = await T(t);
				n === C && v && (v.pageContext = e);
			} catch {}
		}, 300);
	}
	async function M() {
		if (v) return;
		let t = new URL(import.meta.url);
		if (T = (await import(
			/* @vite-ignore */
			new URL(`llm-agent-panel.js${t.search}`, t).href
)).collectPageContext, v) return;
		v = document.createElement("llm-agent-panel"), v.embedded = !0, x = e.hass(), x && (v.hass = x), h.append(v);
		let n = () => {
			let e = v?.getAttribute("data-theme");
			e ? d.setAttribute("data-theme", e) : d.removeAttribute("data-theme");
		};
		new MutationObserver(n).observe(v, {
			attributes: !0,
			attributeFilter: ["data-theme"]
		}), n();
	}
	function N() {
		d.hidden = !b, d.classList.toggle("min", y === "min");
		let e = _("min");
		e.querySelector("ha-icon").setAttribute("icon", y === "min" ? u.restore : u.min), e.dataset.key = y === "min" ? "restore" : "min", E(), b && O(), b && !S && (S = requestAnimationFrame(A));
	}
	return _("min").addEventListener("click", () => k(y === "min" ? "open" : "min")), _("close").addEventListener("click", () => k("closed")), _("full").addEventListener("click", () => {
		k("closed"), history.pushState(null, "", "/llm-agent"), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }));
	}), p.addEventListener("dblclick", (e) => {
		e.target.closest("button") || k(y === "min" ? "open" : "min");
	}), d.addEventListener("keydown", (e) => {
		e.key === "Escape" && !e.defaultPrevented && !e.isComposing && (e.preventDefault(), k("closed"));
	}), f(p, (e, n, r) => {
		if (D()) return !1;
		r && d.classList.add("dragging");
		let i = d.getBoundingClientRect();
		return t.x = i.left + e, t.y = i.top + n, O(), !0;
	}, () => {
		d.classList.remove("dragging"), c(t);
	}), f(g, (e, n) => {
		let r = d.getBoundingClientRect();
		return t.w = Math.min(r.width + e, innerWidth - r.left - o), t.h = Math.min(r.height + n, innerHeight - r.top - o), t.x = r.left, t.y = r.top, O(), !0;
	}, () => c(t)), addEventListener("resize", () => b && O()), addEventListener("hass-more-info", () => j(), !0), addEventListener("dialog-closed", () => j(), !0), {
		el: n,
		show(e) {
			let n = !b;
			y !== e && (y = e, t.state !== e && (t.state = e, c(t))), b = !0, N(), n && M().then(j);
		},
		hide() {
			b = !1, N();
		},
		navigated: j
	};
}
function f(e, t, n) {
	e.addEventListener("pointerdown", (r) => {
		if (r.button !== 0 || r.target.closest("button")) return;
		let i = r.clientX, a = r.clientY, o = !1;
		e.setPointerCapture(r.pointerId);
		let s = (e) => {
			let n = e.clientX - i, r = e.clientY - a;
			if (!(!o && Math.abs(n) + Math.abs(r) < 3)) {
				if (!t(n, r, !o)) return c();
				o = !0, i = e.clientX, a = e.clientY;
			}
		}, c = () => {
			e.removeEventListener("pointermove", s), e.removeEventListener("pointerup", c), e.removeEventListener("pointercancel", c), o && n();
		};
		e.addEventListener("pointermove", s), e.addEventListener("pointerup", c), e.addEventListener("pointercancel", c);
	});
}
var p = {};
async function m(e, n) {
	let r = new URL(import.meta.url), i = (e) => p[e] ??= fetch(new URL(`i18n/${e}.json${r.search}`, r)).then((e) => e.ok ? e.json() : {}).catch(() => ({})), [a, o] = await Promise.all([i(t(e?.locale?.language)), i("en")]);
	for (let [e, t] of Object.entries({
		min: "float_minimize",
		restore: "float_restore",
		full: "float_full_panel",
		close: "close",
		grip: "float_resize"
	})) {
		let r = a[t] ?? o[t];
		r && n(e, r);
	}
}
//#endregion
export { d as createWindow };
