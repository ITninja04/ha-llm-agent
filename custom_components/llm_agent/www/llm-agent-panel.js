//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), t = globalThis, n = t.ShadowRoot && (t.ShadyCSS === void 0 || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, r = Symbol(), i = /* @__PURE__ */ new WeakMap(), a = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== r) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (n && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = i.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && i.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, o = (e) => new a(typeof e == "string" ? e : e + "", void 0, r), s = (e, ...t) => new a(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, r), c = (e, r) => {
	if (n) e.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of r) {
		let r = document.createElement("style"), i = t.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, e.appendChild(r);
	}
}, l = n ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return o(t);
})(e) : e, { is: u, defineProperty: d, getOwnPropertyDescriptor: f, getOwnPropertyNames: p, getOwnPropertySymbols: m, getPrototypeOf: h } = Object, g = globalThis, _ = g.trustedTypes, ee = _ ? _.emptyScript : "", te = g.reactiveElementPolyfillSupport, v = (e, t) => e, ne = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, re = (e, t) => !u(e, t), y = {
	attribute: !0,
	type: String,
	converter: ne,
	reflect: !1,
	useDefault: !1,
	hasChanged: re
};
Symbol.metadata ??= Symbol("metadata"), g.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var ie = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = y) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && d(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = f(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? y;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = h(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
			let e = this.properties, t = [...p(e), ...m(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(l(e));
		} else e !== void 0 && t.push(l(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return c(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? ne : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ne : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? re)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
ie.elementStyles = [], ie.shadowRootOptions = { mode: "open" }, ie[v("elementProperties")] = /* @__PURE__ */ new Map(), ie[v("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: ie }), (g.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ae = globalThis, oe = (e) => e, b = ae.trustedTypes, se = b ? b.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ce = "$lit$", le = `lit$${Math.random().toFixed(9).slice(2)}$`, ue = "?" + le, de = `<${ue}>`, fe = document, pe = () => fe.createComment(""), me = (e) => e === null || typeof e != "object" && typeof e != "function", he = Array.isArray, ge = (e) => he(e) || typeof e?.[Symbol.iterator] == "function", _e = "[ 	\n\f\r]", ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, be = />/g, x = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, Se = /"/g, Ce = /^(?:script|style|textarea|title)$/i, we = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), S = we(1), Te = we(2), Ee = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), w = fe.createTreeWalker(fe, 129);
function Oe(e, t) {
	if (!he(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return se === void 0 ? t : se.createHTML(t);
}
var T = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ve;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ve ? c[1] === "!--" ? o = ye : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = x) : (Ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = x) : o = be : o === x ? c[0] === ">" ? (o = i ?? ve, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? x : c[3] === "\"" ? Se : xe) : o === Se || o === xe ? o = x : o === ye || o === be ? o = ve : (o = x, i = void 0);
		let d = o === x && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ve ? n + de : l >= 0 ? (r.push(s), n.slice(0, l) + ce + n.slice(l) + le + d) : n + le + (l === -2 ? t : d);
	}
	return [Oe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, ke = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = T(t, n);
		if (this.el = e.createElement(l, r), w.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = w.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ce)) {
					let t = u[o++], n = i.getAttribute(e).split(le), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ne : r[1] === "?" ? Pe : r[1] === "@" ? Fe : Me
					}), i.removeAttribute(e);
				} else e.startsWith(le) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ce.test(i.tagName)) {
					let e = i.textContent.split(le), t = e.length - 1;
					if (t > 0) {
						i.textContent = b ? b.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], pe()), w.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], pe());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ue) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(le, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += le.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = fe.createElement("template");
		return n.innerHTML = e, n;
	}
};
function E(e, t, n = e, r) {
	if (t === Ee) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = me(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = E(e, i._$AS(e, t.values), i, r)), t;
}
var Ae = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? fe).importNode(t, !0);
		w.currentNode = r;
		let i = w.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new je(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ie(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = w.nextNode(), a++);
		}
		return w.currentNode = fe, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, je = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = E(this, e, t), me(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== Ee && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ge(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== C && me(this._$AH) ? this._$AA.nextSibling.data = e : this.T(fe.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ke.createElement(Oe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ae(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = De.get(e.strings);
		return t === void 0 && De.set(e.strings, t = new ke(e)), t;
	}
	k(t) {
		he(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(pe()), this.O(pe()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = oe(e).nextSibling;
			oe(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Me = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = C;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = E(this, e, t, 0), a = !me(e) || e !== this._$AH && e !== Ee, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = E(this, r[n + o], t, o), s === Ee && (s = this._$AH[o]), a ||= !me(s) || s !== this._$AH[o], s === C ? e = C : e !== C && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ne = class extends Me {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === C ? void 0 : e;
	}
}, Pe = class extends Me {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== C);
	}
}, Fe = class extends Me {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = E(this, e, t, 0) ?? C) === Ee) return;
		let n = this._$AH, r = e === C && n !== C || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== C && (n === C || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ie = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		E(this, e);
	}
}, Le = {
	M: ce,
	P: le,
	A: ue,
	C: 1,
	L: T,
	R: Ae,
	D: ge,
	V: E,
	I: je,
	H: Me,
	N: Pe,
	U: Fe,
	B: Ne,
	F: Ie
}, Re = ae.litHtmlPolyfillSupport;
Re?.(ke, je), (ae.litHtmlVersions ??= []).push("3.3.3");
var ze = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new je(t.insertBefore(pe(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Be = globalThis, Ve = class extends ie {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Ee;
	}
};
Ve._$litElement$ = !0, Ve.finalized = !0, Be.litElementHydrateSupport?.({ LitElement: Ve });
var He = Be.litElementPolyfillSupport;
He?.({ LitElement: Ve }), (Be.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Ue = {
	attribute: !0,
	type: String,
	converter: ne,
	reflect: !1,
	hasChanged: re
}, We = (e = Ue, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function D(e) {
	return (t, n) => typeof n == "object" ? We(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function O(e) {
	return D({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/base.js
var Ge = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
//#endregion
//#region node_modules/@lit/reactive-element/decorators/query.js
function Ke(e, t) {
	return (n, r, i) => {
		let a = (t) => t.renderRoot?.querySelector(e) ?? null;
		if (t) {
			let { get: e, set: t } = typeof r == "object" ? n : i ?? (() => {
				let e = Symbol();
				return {
					get() {
						return this[e];
					},
					set(t) {
						this[e] = t;
					}
				};
			})();
			return Ge(n, r, { get() {
				let n = e.call(this);
				return n === void 0 && (n = a(this), (n !== null || this.hasUpdated) && t.call(this, n)), n;
			} });
		}
		return Ge(n, r, { get() {
			return a(this);
		} });
	};
}
//#endregion
//#region node_modules/lit-html/directive.js
var qe = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Je = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ye = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, Xe = class extends Ye {
	constructor(e) {
		if (super(e), this.it = C, e.type !== qe.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === C || e == null) return this._t = void 0, this.it = e;
		if (e === Ee) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
Xe.directiveName = "unsafeHTML", Xe.resultType = 1;
var Ze = Je(Xe), { I: Qe } = Le, $e = (e) => e, et = () => document.createComment(""), tt = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new Qe(r.insertBefore(et(), i), r.insertBefore(et(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = $e(e).nextSibling;
				$e(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, nt = (e, t, n = e) => (e._$AI(t, n), e), rt = {}, it = (e, t = rt) => e._$AH = t, at = (e) => e._$AH, ot = (e) => {
	e._$AR(), e._$AA.remove();
}, st = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, ct = Je(class extends Ye {
	constructor(e) {
		if (super(e), e.type !== qe.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = at(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = nt(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = nt(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = nt(i[d], a[m]), tt(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = nt(i[f], a[p]), tt(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = st(o, p, m), u = st(s, d, f)), l.has(s[d])) {
			if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = tt(e, i[d]);
					nt(t, a[p]), c[p] = t;
				} else c[p] = nt(n, a[p]), tt(e, i[d], n), i[t] = null;
				p++;
			} else ot(i[f]), f--;
		} else ot(i[d]), d++;
		for (; p <= m;) {
			let t = tt(e, c[m + 1]);
			nt(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && ot(e);
		}
		return this.ut = o, it(e, c), Ee;
	}
}), k = class extends Error {
	constructor(e) {
		let t = Error, n = t.stackTraceLimit;
		n && (t.stackTraceLimit = 0), super(), n && (t.stackTraceLimit = n), this.source = e;
	}
}, lt = class extends Error {
	constructor(e, t) {
		try {
			var n = String(t instanceof Error ? t.message : t);
		} catch {}
		super(n, { cause: t }), this.source = e;
	}
};
function ut(e) {
	return e instanceof lt ? e.cause : e;
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/constants.js
var dt = 1024, ft = 2048, pt = 4096, mt = 8192, ht = 16384, gt = 1 << 17, A = 1 << 18, _t = 1 << 19, vt = 1 << 22, yt = 1 << 23, bt = 1 << 20, xt = 1024, St = 1 << 21, Ct = 1 << 22, j = {}, wt = {}, Tt = Symbol("refresh"), Et = Set;
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/owner.js
function Dt(e) {
	let t = e.pe;
	for (; t;) t.R |= 32, Dt(t), t = t.Ge;
}
var Ot;
function kt(e) {
	try {
		e();
	} catch (e) {
		Ot ||= [e], P();
	}
}
function At(e) {
	let t = Ot;
	if (Ot = void 0, t && !e) throw t[0];
}
function jt(e, t = !1, n) {
	let r = e.R;
	if (r & 64) return;
	t && (!n && e.T !== null && (e.T.me !== null || e.T.Le !== null) && jt(e, !1, !0), e.R = r | 64, e.X && (Ar(e), (e.m & 1 && e.T?.Re != null || r & 2048 || Yn.length) && P()));
	let i = n ? e.T.me : e.pe;
	for (n ? e.T.me = null : e.pe = null; i;) i.l &= -33, fr(i, M), xr(i), i.Me = i, jt(i, !0), i = i.Ge;
	if (n || (e.be = 0), t && !n && !(r & 32) && e._parent !== null && !(e._parent.R & 64)) {
		let t = e.Me, n = e.Ge;
		t === null ? e._parent.pe = n : t.Ge = n, n !== null && (n.Me = t), e.Me = null;
	}
	if (Nt(e, n), t && e.ze) {
		let t = e.ze;
		e.ze = void 0, kt(t);
	}
}
function Mt(e, t) {
	let n = e.pe;
	t.Me = null, t.Ge = n, n !== null && (n.Me = t), e.pe = t;
}
function Nt(e, t) {
	let n = t ? e.T.Le : e.ke;
	if (n) {
		if (t ? e.T.Le = null : e.ke = null, Array.isArray(n)) for (let e = n.length - 1; e >= 0; e--) kt(n[e]);
		else kt(n);
	}
}
function Pt(e, t) {
	for (; e.l & 4 && e._parent;) e = e._parent;
	if (e.id != null) return Lt(e.id, t ? e.be++ : e.be);
	throw Error();
}
function Ft(e) {
	return Pt(e, !0);
}
function It(e, t, n) {
	return e?.id ?? (t ? n?.id : n?.id == null ? void 0 : Ft(n));
}
function Lt(e, t) {
	let n = t.toString(36), r = n.length - 1;
	return e + (r ? String.fromCharCode(64 + r) : "") + n;
}
function Rt() {
	return I;
}
function zt(e, t = I) {
	return t && (t.ke ? Array.isArray(t.ke) ? t.ke.push(e) : t.ke = [t.ke, e] : t.ke = e), e;
}
function Bt(e = !0) {
	jt(this, e), Ot && !F.Y && At();
}
function Vt(e) {
	let t = I, n = e?.transparent ?? !1, r = {
		id: It(e, n, t),
		l: n ? 4 : 0,
		R: 0,
		Qe: !0,
		Ke: t?.Qe ? t.Ke : t,
		pe: null,
		Ge: null,
		Me: null,
		ke: null,
		A: t?.A || wt,
		be: 0,
		T: null,
		_parent: t,
		dispose: Bt
	};
	return t && Mt(t, r), r;
}
function Ht(e, t) {
	let n = Vt(t);
	return Ii(n, () => e(Bt.bind(n, !0)));
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/scheduler.js
var Ut = null, Wt = null, Gt = null, Kt = null, qt = null, Jt = null, Yt = null, Xt = null, Zt = null, Qt = null, $t = null, en = null, tn = null, nn = null, rn = null, an = null, on = null, sn = null, cn = null, ln = null, un = void 0, dn = [];
function fn(e, t = null) {
	let n = {
		ln: [],
		rn: [[], []],
		fn: [],
		eo: null,
		_parent: t,
		P: e,
		Pe: null,
		tt: 0,
		nt: !1,
		nn: null,
		Ue: !1,
		un: !1,
		I: null
	};
	return e || dn.push(n), n;
}
var pn = null, mn = null, hn = null;
function gn(e, t) {
	if (F.Y && !t || mn !== null) return bn(e);
	hn === null ? hn = yn(e) : xn(yn(e), hn), P();
}
function _n(e) {
	return e.T.Re = yn(e.T.Re);
}
function vn(e) {
	return e = yn(e), dn.indexOf(e) === -1 ? null : e;
}
function yn(e) {
	for (; e.eo !== null;) e = e.eo;
	return e;
}
function bn(e) {
	let t = mn;
	t === null ? mn = e === null ? fn(!1) : yn(e) : e !== null && xn(yn(e), t), F.Y || P();
}
function xn(e, t) {
	e = yn(e), t = yn(t), !(e === t || e.P || t.P) && (e.eo = t, t.tt += e.tt, t.nt ||= e.nt, Jn(t.ln, e.ln), Jn(t.rn[0], e.rn[0]), Jn(t.rn[1], e.rn[1]), Jn(t.fn, e.fn), e.I !== null && Jn(t.I ??= [], e.I), dn.splice(dn.indexOf(e), 1));
}
function Sn(e) {
	return e.tt !== 0 || wn(e.ln, e) || !!qt?.(e);
}
var Cn = null;
function wn(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (!(!(i.m & 1) || i.R & 64 || i.l & 8192 || i.T.Re !== null && _n(i) !== t || n && !n(i, t))) {
			if (i.i === 1) {
				if (Tn(i, Cn ?? t)) return !0;
			} else for (let e = i.o; e !== null; e = e.t) {
				let n = e.u;
				if ((n.i === 1 && n.m & 1 || n.R & 2048 || n.l & 16384 && n.m === 1) && (e.Ne === n.de || n.T?.U != null) && !(n.R & 64) && Tn(n, Cn ?? t)) return !0;
			}
		}
	}
	return !1;
}
function Tn(e, t) {
	return !Qt?.(e) && !(e.R & 32 && En(e, t));
}
function En(e, t) {
	for (; e?.R & 32;) e = e._parent;
	return e?.l & 256 && e.T?.Re != null && _n(e) === yn(t);
}
var Dn = [];
function On(e) {
	Dn.push(e);
}
var kn = [];
function An(e) {
	fr(e, M), e.R &= -4, kn.push(e);
}
function jn(e, t) {
	e.l |= 256, Mn(e, t);
}
function Mn(e, t) {
	let n = L(e);
	n.Re !== t && (n.Re = t, t.ln.push(e));
}
function Nn(e, t) {
	for (let n = e.pe; n !== null; n = n.Ge) n.T?.Re?.P || (n.X !== void 0 && (n.l & 256 || jn(n, t), n.l |= bt), Nn(n, t));
}
var M = {
	et: Array(2e3).fill(void 0),
	p: !1,
	Fe: 0,
	Et: 0
}, N = 0, Pn = !1, Fn = !1, In = !1, Ln = 0, Rn = 0, zn = 0;
function P() {
	Fn ? Un() : Pn || (Pn = !0, !Ln && !F.Y && queueMicrotask(or));
}
var Bn = Symbol.for("solid-js/root-error-hook"), Vn = "[REACTIVITY_HALTED]";
function Hn(e) {
	if (Fn) return;
	Fn = !0, At(!0);
	let t = Vn, n = e !== void 0 && globalThis.reportError;
	n || e === void 0 ? console.error(t) : console.error(t, e), n && n(e);
}
function Un() {
	In || (In = !0, console.error(Vn));
}
var Wn = class e {
	rn = [[], []];
	Y = !1;
	flush() {
		if (!this.Y) {
			this.Y = !0, wi(), pn = null, hn = null;
			try {
				Er(), hr(M, e._e), this.settle(), N++, Pn = M.Et >= M.Fe || Yn.length !== 0, this.run(1), this.run(2);
			} finally {
				this.Y = !1, hn = null;
			}
		}
	}
	settle() {
		Gt?.() && hr(M, e._e);
		let t = mn;
		mn = null, Wt?.(t);
		let n = t !== null && !t.P ? yn(t) : null;
		if (n !== null) {
			let e = Yn.length;
			for (let t = 0; t < e; t++) {
				let e = Yn[t];
				if (!(e.l & 2304) && (e.T === null || e.T.Re === null || !e.T.Re.P)) {
					if (e.ue === j && e.m & 4 && e.i !== 1) continue;
					if (e.ue !== j && !(e.m & 5) && e.T?.me == null && e.T?.Le == null && !e.T?.Te && Ni(e, e.le, e.ue)) {
						e.ue = j, e.l &= -129;
						continue;
					}
					jn(e, n);
				}
				e.l & 128 && Nn(e, n);
			}
			Yn.length = 0, tn?.(n), kn.splice(0);
		} else {
			ar();
			for (let e = 0; e < Dn.length; e++) {
				let t = Dn[e];
				t.T?.U == null && !t.Ae && br(t);
			}
		}
		Dn.length &&= 0;
		let r = this.rn;
		this.rn = [[], []];
		for (let e = dn.length - 1; e >= 0; e--) {
			let t = dn[e];
			Sn(t) || (dn.splice(e, 1), Kt?.(t), Kn(t), e = dn.length);
		}
		nn?.();
		let i = n && vn(n);
		rn?.(i);
		let a = i !== null;
		for (let e = 0; e < 2; e++) a && Jn(i.rn[e], r[e]), this.rn[e] = a || this.rn[e].length ? [].concat(a ? [] : r[e], this.rn[e]) : r[e];
		if (kn.length !== 0) {
			let e = kn.splice(0).sort((e, t) => e.he - t.he);
			for (let t = 0; t < e.length; t++) e[t].R & 64 || Zr(e[t]);
		}
		$t?.();
	}
	run(e) {
		let t = this.rn[e - 1];
		t.length && (this.rn[e - 1] = [], sr(t, e));
	}
	enqueue(e, t, n = pn) {
		e && (n?.P ? n : this).rn[e - 1].push(t), P();
	}
	notify(e, t, n, r) {
		return Xt?.(e, n & t, r) ? !0 : t & 1 ? (n & 1 && pn === null && bn(null), !0) : !1;
	}
};
function Gn(e) {
	let t;
	for (let n = 0; n < e.fn.length; n++) {
		let r = e.fn[n], i = r.T?.U?.source;
		if (!(r.R & 64 || r.m & 2 && (r.i || !(r.l & 8388608)) && i !== r && (i?.m ?? 2) & 2) && r.R & 2048) {
			t = 1, e.P || (r.R &= ~ft), r.Ae = !1;
			for (let e = r.pe; e !== null; e = e.Ge) e.i && (e.Ae = !1);
			Jt?.(r), cr(r);
		}
	}
	return e.fn.length = 0, t;
}
function Kn(e) {
	let t = Gn(e);
	for (let t = 0; t < e.ln.length; t++) {
		let n = e.ln[t];
		n.T.Re !== null && _n(n) === e && (n.T.Re = null, ir(n));
	}
	mn === e && (mn = null), t ? F.rn[1].push(() => qn(e)) : qn(e);
}
function qn(e) {
	for (let t = 0; t < 2; t++) Jn(F.rn[t], e.rn[t]), e.rn[t] = [];
}
function Jn(e, t) {
	for (let n = 0; n < t.length; n++) e.push(t[n]);
}
var Yn = [];
function Xn(e, t) {
	t.fn.push(e), e.R |= ft;
}
function Zn(e) {
	Yn.push(e), F.Y || yi();
}
var Qn = 0;
function $n() {
	Qn++;
}
function er(e) {
	e.we = Qn;
	let t = !!(e.l & 512) && e.T?.De !== void 0;
	for (let n = e.o; n !== null; n = n.t) {
		let r = n.u;
		r.R & 4 && n.Ne === r.de && (n !== r._ || !e.X) && (r.R |= pt), t && r.l & 8 ? r.R |= 256 : (cr(r), r.R & 8388608 && mr(r._parent, 1));
	}
}
function tr(e) {
	e.Ae = !0, F.enqueue(e.i, e.W ??= Wn.q.bind(null, e));
}
function nr(e) {
	return e.ue !== j && (e.le = e.ue, e.ue = j);
}
function rr(e) {
	return !(e.m & 4) && !!e.T?.Ee && !e.T.Ve && (e.ue = j, !0);
}
function ir(e) {
	if (!e.X) {
		e.l &= -385, nr(e);
		return;
	}
	let t = !!(e.m & 1) && (e.ue === j || rr(e)), n = e.l & St;
	if (!t && e.T && (e.T.Te = null), e.l = t ? e.l & -1048833 | xt : e.l & -3147137, n) {
		let t = e.ue;
		e.ue = j, e.ie = N + 1, qr(e, 2, t);
	} else nr(e) && (e.m &= -5, e.T != null && (e.T.Ve = !1, e.T.je = j), e.i && e.i !== 3 && tr(e));
	e.Ie = !1, e.R &= ~dt, e.T?.U ?? br(e), e.m & 1 || (e.m &= -5), !t && e.T != null && (e.T.me !== null || e.T.Le !== null) && Wn.Ce(e, !1, !0);
}
function ar() {
	for (let e = 0; e < Yn.length; e++) {
		let t = Yn[e];
		t.l & 2304 || ir(t);
	}
	Yn.length = 0;
}
var F = new Wn();
function or(e) {
	if (Rn > 0) return e ? e() : void 0;
	if (e) {
		Ln++;
		try {
			return e();
		} finally {
			try {
				or();
			} finally {
				Ln--;
			}
		}
	}
	if (!F.Y && !Fn) {
		for (; Pn;) F.flush();
		At();
	}
}
function sr(e, t) {
	for (let n = 0; n < e.length; n++) e[n](t);
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/heap.js
function cr(e) {
	M.Fe > e.he && (M.Fe = e.he), ur(e, M);
}
function lr(e, t) {
	let n = (e._parent?.Qe ? e._parent.Ke?.he : e._parent?.he) ?? -1;
	n >= e.he && (e.he = n + 1);
	let r = e.he, i = t.et[r];
	if (i === void 0) t.et[r] = e;
	else {
		let t = i.We;
		t.ve = e, e.We = t, i.We = e;
	}
	r > t.Et && (t.Et = r);
}
function ur(e, t) {
	let n = e.R;
	n & 12 || (n & 1 ? e.R = n & -4 | 10 : (e.R = n | 8, t.p && mr(e)), n & 16 || lr(e, t));
}
function dr(e, t) {
	let n = e.R;
	n & 28 || (e.R = n | 16, lr(e, t));
}
function fr(e, t) {
	let n = e.R;
	if (!(n & 24)) return;
	e.R = n & -25;
	let r = e.he;
	if (e.We === e) t.et[r] = void 0;
	else {
		let n = e.ve, i = t.et[r], a = n ?? i;
		e === i ? t.et[r] = n : e.We.ve = n, a.We = e.We;
	}
	e.We = e, e.ve = void 0;
}
function pr(e) {
	if (!e.p) {
		e.p = !0;
		for (let t = 0; t <= e.Et; t++) for (let n = e.et[t]; n !== void 0; n = n.ve) n.R & 8 && mr(n);
	}
}
function mr(e, t = 2) {
	let n = e.R;
	if (!((n & 3) >= t)) {
		e.R = n & -4 | t;
		for (let t = e.o; t !== null; t = t.t) mr(t.u, 1);
	}
}
function hr(e, t) {
	for (e.p = !1, e.Fe = 0; e.Fe <= e.Et; e.Fe++) {
		let n = e.et[e.Fe];
		for (; n !== void 0;) n.R & 8 ? t(n) : gr(n, e), n = e.et[e.Fe];
	}
	e.Et = 0;
}
function gr(e, t) {
	fr(e, t);
	let n = e.he;
	for (let t = e.C; t; t = t.G) {
		let e = t.S;
		e.X && e.he >= n && (n = e.he + 1);
	}
	if (e.he !== n) {
		e.he = n, _r(e, n);
		for (let n = e.o; n !== null; n = n.t) n.u !== e._parent && dr(n.u, t);
	}
}
function _r(e, t) {
	for (let n = e.pe; n; n = n.Ge) if (n.Qe) _r(n, t);
	else if (n.he <= t) {
		let e = n.R & 24;
		fr(n, M), n.he = t + 1, e && (e & 8 ? ur : dr)(n, M), _r(n, t + 1);
	}
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/graph.js
var vr;
function yr(e) {
	let t = e.S, n = e.G, r = e.t, i = e.en;
	return r === null ? t.Ze = i : r.en = i, i === null ? (t.o = r, r === null && (t.l & 4096 ? vr(t) : t.T?.Ye && kt(t.T.Ye), t.X && t.l & 32 && !(t.R & 32) && !(t.m & 1) && (Sr ? Sr.push(t) : wr(t)))) : i.t = r, n;
}
function br(e) {
	let t = e._, n = t === null ? e.C : t.G;
	if (n !== null) {
		do
			n = yr(n);
		while (n !== null);
		t === null ? e.C = null : t.G = null;
	}
}
function xr(e) {
	e.C && (e._ = null, br(e));
}
var Sr = null, Cr = (e) => Sr = e;
function wr(e) {
	fr(e, M), xr(e), jt(e, !0);
}
var Tr = new Et();
function Er() {
	if (Tr.size !== 0) {
		for (let e of Tr) !e.o && e.l & 32 && !(e.m & 1) && !(e.R & 96) && wr(e);
		Tr.clear();
	}
}
function Dr(e, t) {
	let n = t._;
	if (n !== null && n.S === e) return;
	let r = null, i = t.R & 4;
	if (i && (r = n === null ? t.C : n.G, r !== null && r.S === e)) return r.Ne = t.de, t._ = r;
	let a = e.Ze;
	if (a !== null && a.u === t && (!i || a.Ne === t.de)) return;
	let o = t._ = e.Ze = {
		S: e,
		u: t,
		G: r,
		en: a,
		t: null,
		Ne: t.de
	};
	n === null ? t.C = o : n.G = o, a === null ? e.o = o : a.t = o, $n();
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/async.js
function Or(e, t) {
	return !e.T?.se?.has(t) && ((L(e).se ??= new Et()).add(t), !0);
}
function kr(e, t) {
	let n = e.T?.se;
	return n?.delete(t) ? (n.size || (e.T.se = void 0), !0) : !1;
}
function Ar(e) {
	e.T !== null && (e.T.Ee = null);
}
function jr(e) {
	e.T !== null && (e.T.se = void 0);
}
function Mr(e, t) {
	for (let n = e.C; n; n = n.G) {
		let e = n.S;
		if (!(e.R & 64) && (e === t ? e.m & 1 : e.T?.se?.has(t))) return !0;
	}
	return !1;
}
function Nr(e, t) {
	L(e).fe = !0, t.source && Or(e, t.source), e.m & 2 || Pr(e, t.source, t);
}
function Pr(e, t, n) {
	if (!t) {
		e.T !== null && (e.T.U = null);
		return;
	}
	let r = n instanceof k && n.source === t ? n : e.T?.U;
	L(e).U = r instanceof k && r.source === t ? r : new k(t);
}
function Fr(e, t) {
	for (let n = e.o; n !== null; n = n.t) t(n.u, n);
}
function Ir(e, t) {
	let n = new Et(), r = (e) => {
		let i = n.has(e);
		t(e, i) !== !1 && !i && (n.add(e), Fr(e, r));
	};
	Fr(e, r);
}
function Lr(e) {
	e.X && e.l & 32 && !e.o && !(e.R & 32) && !(e.m & 1) && (e.R & 8 ? e.R |= vt : wr(e));
}
function Rr(e) {
	let t;
	if (Ir(e, (e, n) => {
		!n && !e.o && e.l & 32 && (t ??= []).push(e);
	}), t) for (let e of t) Lr(e);
}
function zr(e, t, n) {
	return !(e.l & 256 || n && e.R & 16384 && F.Y && !e.rr) || pn ? !1 : (jr(e), e.T && (e.T.fe = !1), (e.m &= 6) & 2 || Pr(e), e.ue = t instanceof lt ? t : new lt(e, t), e.l |= 128 | St, Vr(e), P(), !0);
}
function Br(e, t) {
	let n = !1;
	Ir(e, (e, r) => {
		!r && e.T?.U === t && (cr(e), n = !0);
	}), n && P();
}
function Vr(e, t = e) {
	kr(e, t);
	let n = !1, r;
	if (Ir(e, (i, a) => {
		if (a || t !== e && Mr(i, t) || !kr(i, t)) return !1;
		i.ie = N;
		let o = i.T?.se?.values().next().value, s = i.m & 2;
		o ? s || Pr(i, o) : (i.m &= -2, s || Pr(i), i.l & 256 && !(t.m & 1) && bn(_n(i)), i.T?.fe && (cr(i), n = !0), i.T !== null && (i.T.fe = !1), !i.o && i.l & 32 && (r ??= []).push(i), sn?.(i, e));
	}), r) for (let e of r) Lr(e);
	n && P();
}
function Hr(e) {
	return typeof e == "object" && !!e && typeof e.then == "function";
}
function Ur(e) {
	let t = e.T?.Se;
	t != null && (e.T.Se = null, t());
}
function Wr(e, t, n, r) {
	let i = !1, a = !1;
	if (typeof t == "object" && t && mi(() => {
		i = t[Symbol.asyncIterator], a = !i && Hr(t);
	}), !a && !i) return e.T !== null && (e.T.Ee = null), e.Ie = !1, t;
	L(e).Ee = t, e.T.ce = zn || 2147483647, e.T.se = void 0;
	let o, s = (n) => {
		if (e.T?.Ee !== t) return;
		let i = n instanceof k;
		i && e.Ie ? (Ar(e), Nr(e, n), e.ie = N) : ((i || !zr(e, n)) && (qr(e, i ? 1 : 2, n), i || jt(e, !1, !0)), i && Vr(e), e.ie = N, i || Rr(e), r?.(n, i));
	}, c = (r, i) => {
		if (e.T?.Ee !== t || e.R & 2) return;
		let a = on && Yn.some((e) => e.ue !== j), o = e.m & 4;
		if (Kr(e), n) {
			if (!n(r, o, s)) return;
		} else Pi(e, () => r);
		e.ue === j && (e.Ie = !1, br(e)), Vr(e), P(), (i || !a) && or(), i?.();
	}, l = () => e.l & 32 && !e.o && !(e.m & 1) ? (wr(e), !0) : !1, u = (n, r) => {
		let i = n[Symbol.asyncIterator](), a = !1, u = !1, d = !r, f = () => {
			if (!u) {
				u = !0;
				try {
					let e = i.return?.();
					Hr(e) && e.then(void 0, () => {});
				} catch {}
			}
		};
		zt(f, r), L(e).Se = f;
		let p = () => {
			try {
				l() || m();
			} catch (e) {
				s(e);
			}
		}, m = () => {
			let n, r, f = !1, h = !1, g = !0, _ = i.next();
			if ((Hr(_) ? _ : { then: (e) => void e(_) }).then((r) => {
				if (g && d) n = r, f = !0, r.done && (u = !0);
				else if (e.T?.Ee !== t) return;
				else r.done ? (u = !0, a ? (P(), or()) : c(void 0), l()) : (a = !0, c(r.value, p));
			}, (n) => {
				g && d ? (r = n, h = !0) : e.T?.Ee === t && (u = !0, s(n), l());
			}), g = !1, h) {
				if (u = !0, s(r), d) throw r;
				return !0;
			}
			return f && !n.done ? (o = n.value, a = !0, m()) : f && n.done;
		}, h = m();
		return d = !1, a || h;
	}, d = null, f = (e, t) => {
		let n = !1;
		if (typeof e == "object" && e && mi(() => {
			n = e[Symbol.asyncIterator];
		}), !n) return !1;
		o = void 0;
		let r = u(e, t);
		return t || (d = r), !0;
	};
	if (a) {
		let n = !1, r = !1, i, a = !0;
		if (t.then((r) => {
			if (a) o = r, n = !0;
			else {
				try {
					if (e.T?.Ee === t && !(e.R & 64) && f(r, e)) return;
					c(r);
				} catch (e) {
					s(e);
				}
				l();
			}
		}, (e) => {
			a ? (i = e, r = !0) : (s(e), l());
		}), a = !1, r) throw s(i), i;
		n ? f(o) || (e.Ie = !1) : d = !1;
	}
	if (i && f(t), d !== null) {
		if (!d) {
			if (e.Ie) return e.le;
			throw new k(I);
		}
		e.Ie = !1;
	}
	return o;
}
function Gr(e, t = !1) {
	e.T?.se && jr(e), e.T?.fe && (e.T.fe = !1), e.m = t ? 0 : e.m & 4, e.T?.U && Pr(e);
	let n = ci(e);
	n && n.call(e);
}
function Kr(e, t = !1) {
	let n = e.T?.se;
	n && (n.delete(e), n.size) ? (e.T.fe = !1, t && (e.m = 1), Pr(e, n.values().next().value)) : Gr(e, t);
}
function qr(e, t, n) {
	t === 2 && !(n instanceof lt) && !(n instanceof k) && (n = new lt(e, n));
	let r = t === 1 && n instanceof k && n.source;
	r ? (e.m & 2 && (e.T.Te = e.T.U), Or(e, r)) : jr(e), e.m = t | (t === 2 ? e.m & 12 ? 8 : 0 : t === 1 && e.m & 8 ? 4 : e.m & 4), r ? Pr(e, r, n) : L(e).U = n;
	let i = ci(e);
	i ? i.call(e) : Jr(e, t, n);
}
function Jr(e, t, n) {
	let r = t === 1 && n instanceof k && n.source;
	Fr(e, (i, a) => {
		i.ie = N, i.l & 16384 || t === 1 && a.Ne !== i.de ? (t !== 1 && kr(i, e) && Vr(i, e), cr(i), P()) : r && i.T?.se?.has(r) ? pn === null && (i.l & 2304) == 256 && F.Y && !Zt?.(i, r.ie === N) && bn(_n(i)) : (r || t !== 1 && (i.T?.U !== n || i.T?.se)) && (Zn(i), t === 1 && (i.l & 2304) == 256 && !i.i && bn(_n(i)), qr(i, t, n), i.rr?.st(t, n));
	});
}
Wn._e = (e) => {
	e.i === 3 ? (fr(e, M), e.Ae = !0, F.enqueue(2, e.Z)) : e.R & 32 && !(e.R & 65536) ? An(e) : Zr(e);
}, Wn.Ce = jt;
var Yr = !1, I = null, Xr;
function Zr(e, t = !1) {
	$n();
	let n = e.i, r, i = pn, a = Ut && (Xr = t && (i || Xr)), o = e.l & St;
	if (!t) {
		if (fr(e, M), e.T !== null && (e.T.Ee = null, Ur(e)), e.l & 256) {
			let t = _n(e);
			t.P || e.l & 524288 || (e.l & 8421376 ? t !== mn && !(e.m & 4 || e.l & 1048576) && (e.ue !== j && er(e), e.ue = j, e.l &= -257) : gn(t, Zt?.(e, e.m & 4)));
		}
		if (n === 3 || e.l & 128) {
			let t = Sr;
			Cr(r = []), jt(e), Cr(t);
		} else (e.pe !== null || e.ke !== null) && ii(e);
		e.l & 2097152 && (e.ue = j, e.l ^= St);
	}
	let s = e.m & 4, c = e.m & 2 && e.T?.U, l = !!(e.m & 1) && e.T?.se, u = e.T?.se?.has(e), d = !1, f = !!(e.R & 8192) && !((e.m & 1 || e.ue !== j && !(e.R & 1024)) && e.T !== null && !e.T.Ve), p = I;
	I = e, e._ = null, e.de++;
	let m = e.R & vt;
	e.R = 4 | e.R & (32 | mt), e.ie = N;
	let h = e.ue === j ? e.le : e.ue, g = e.he, _ = !1, ee = !1, te = Yr;
	Yr = !0;
	try {
		if (e.l & 64) h = e.X(h), e.T !== null && (e.T.Ee = null), e.Ie = !1;
		else {
			let t = e.T?.Ee, n = e.X(h), r = typeof n == "object" && !!n, i = e.T?.Ee !== t;
			h = i || !r ? n : Wr(e, n), !i && !r && (e.T !== null && (e.T.Ee = null), e.Ie = !1);
		}
		(e.m !== 0 || e.T !== null) && Gr(e, t);
	} catch (t) {
		let n = t instanceof k;
		if (n && e.Ie) Nr(e, t);
		else if ((n || !(d = zr(e, t, !0))) && (n && (L(e).fe = !0), qr(e, n ? 1 : 2, t), n && u && !e.T?.Ee && Vr(e)), (n || d) && l) for (let t of l) t !== e && !(e.T?.se?.has(t) && (t.m & 1 || Mr(e, t))) && Vr(e, t);
	} finally {
		if (Yr = te, _ = (e.R & pt) !== 0, ee = !!(e.R & (a ? i || n || !(e.m & 1) ? 128 | ht : 0 : 128)), e.R = e.R & (96 | ft | ht | gt | A | _t) | (t ? e.R & 256 : 0), I = p, r) for (let e of r) Lr(e);
		e.T !== null && (e.T.Ve = f && !!(e.m & 1));
	}
	if (e.R & 64) {
		xr(e), Ar(e);
		return;
	}
	let v = !!e.T?.U || d;
	if (!v) {
		let r = e.ue === j, i = r ? e.le : e.ue, d = mn ?? hn, f = r && s && !n || !!e.T?.Te || !!(c && d) || !!o || !Ni(e, i, h);
		if (n && f && !(e.R & 262144 && !e.Ae && Object.is(e.ge, h)) && r && (e.Ae = !e.T?.U, t || F.enqueue(n, e.W ??= Wn.q.bind(null, e), null)), !v) {
			if (f) (t ? !(d !== null && (ee || ri(p)?.R & 128)) : n && e.ue === j) ? e.le = h : (e.ue = h, c && (e.T.Te = c), t && (jn(e, d), e.m |= 4, Zt?.(e, !a && mn))), e.o !== null && er(e);
			else if (e.he != g) for (let t = e.o; t !== null; t = t.t) dr(t.u, M);
		}
		if (!f && !e.T?.U && (c && Br(e, c), l)) for (let t of l) t !== e && Vr(e, t);
		u && !(e.m & 5) && Vr(e);
	}
	if (t && ee && e.m & 1) {
		let t = mn ?? hn;
		t && !t.P && (n && Zt?.(e) === 2 || jn(e, t));
	}
	!e.T?.U && e.ue === j && !(n && e.Ae) && (t || n === 3 ? br(e) : On(e)), (e.ue !== j || e.T !== null && (e.T.me !== null || e.T.Le !== null) || e.m & 5 && (!t || e.m & 1)) && (e.l |= 128, Zn(e)), _ && (cr(e), P()), m && Lr(e);
}
function Qr(e) {
	if (!(e.R & 68)) {
		if (e.R & 1) for (let t = e.C; t; t = t.G) {
			let n = t.S;
			if (n.X && Qr(n), e.R & 2) break;
		}
		(e.R & 2 || e.T?.U && e.ie < N && !e.T?.Ee) && Zr(e), e.R &= 376 | dt | ft | ht | gt | A | _t;
	}
}
function $r(e, t) {
	let n = t?.transparent ?? !1, r = typeof t == "object" && !!t && "loadingValue" in t, i = {
		id: It(t, n, I),
		l: (n ? 4 : 0) | !!t?.ownedWrite | (!I || t?.lazy ? 32 : 0) | (t?.sync ? 64 : 0) | (t?.ae ? 2 : 0) | (t?.xe ?? 0),
		ye: t?.equals ?? fi,
		ke: null,
		A: I?.A ?? wt,
		be: 0,
		X: e,
		le: r ? t.loadingValue : void 0,
		he: 0,
		ve: void 0,
		We: null,
		C: null,
		_: null,
		de: 0,
		o: null,
		Ze: null,
		_parent: I,
		Ge: null,
		Me: null,
		pe: null,
		R: t?.lazy ? 512 : 0,
		m: r ? 0 : 4,
		ie: N,
		ue: j,
		we: -1,
		Ie: r,
		T: null
	};
	return t?.unobserved && (L(i).Ye = t.unobserved), ui(i, t), i;
}
function L(e) {
	return e.T ??= {
		Ee: null,
		Se: null,
		U: void 0,
		fe: void 0,
		se: void 0,
		Ye: void 0,
		De: void 0,
		me: null,
		Le: null,
		Re: null,
		Ve: !1,
		je: j,
		Be: -1,
		ce: 0,
		Ue: !1,
		I: 0,
		Te: null
	};
}
function ei(e, t) {
	e.R |= 128, (t.m & 4 || e.i !== 1) && gn(_n(t), !e.i && e.m & 4 || Zt?.(e));
}
function ti(e, t) {
	let n = an && e.l & 32768, r = Ut && pn !== null;
	if (!(n && ln(e, t)) && !((!r || e.m & 4 && t.m & 1) && !n && (!(e.l & 1 << 23) || t.l & 1024))) {
		let i = _n(t);
		if (r && pn.over && yn(pn.over) === i && !n) return !1;
		if (!(!r && i === mn && !n || ni(e, i))) return Xn(e, i), (r || n) && Yt(e, t), !0;
	}
	return ei(e, t), !1;
}
function ni(e, t) {
	return (e.m & 4 || e.l & 1048576) && e.l & 256 && _n(e) === t;
}
function ri(e) {
	return e !== null && e.Qe ? e.Ke : e;
}
function ii(e) {
	Dt(e);
	let t = L(e);
	t.Le = e.ke, t.me = e.pe, e.ke = null, e.pe = null, e.be = 0;
}
function ai(e, t, n, r, i) {
	let a = i?.transparent ?? !1, o = {
		id: It(i, a, I),
		l: r << 23 | (a ? 4 : 0) | !!i?.ownedWrite | (i?.sync ? 64 : 0) | (i?.xe ?? 0),
		ye: !1,
		ke: null,
		A: I?.A ?? wt,
		be: 0,
		X: e,
		le: void 0,
		he: 0,
		ve: void 0,
		We: null,
		C: null,
		_: null,
		de: 0,
		o: null,
		Ze: null,
		_parent: I,
		Ge: null,
		Me: null,
		pe: null,
		R: 512,
		m: 4,
		ie: N,
		ue: j,
		we: -1,
		Ie: !1,
		Ae: !1,
		ge: void 0,
		qe: t,
		Je: n,
		ze: void 0,
		i: r,
		T: null
	};
	return i?.unobserved && (L(o).Ye = i.unobserved), ui(o, li), o;
}
var oi = null;
function si(e) {
	oi = e;
}
function ci(e) {
	return e.i ? oi : null;
}
var li = { lazy: !0 };
function ui(e, t) {
	e.We = e;
	let n = I?.Qe ? I.Ke : I;
	I && Mt(I, e), n && (e.he = n.he + 1), un?.(e), !t?.lazy && Zr(e, !0);
}
function di(e, t) {
	let n = {
		ye: t?.equals ?? fi,
		l: +!!t?.ownedWrite | (t?.ae ? 2 : 0),
		le: e,
		o: null,
		Ze: null,
		ie: N,
		ue: j,
		we: -1,
		T: null
	};
	return t?.unobserved && (L(n).Ye = t.unobserved), n;
}
function fi(e, t) {
	return e === t;
}
var pi = null;
function mi(e, t) {
	let n = Yr;
	Yr = !1;
	try {
		return e();
	} finally {
		Yr = n;
	}
}
var hi = 0;
function gi(e, t) {
	if (e.R & 512) e.R &= -513, Zr(e, !0);
	else if (e.R & 64 && e.l & 32) {
		let t = e._parent;
		if (t !== null) {
			if (t.R & 64) {
				e.l &= -33;
				return;
			}
			e.R & 32 || Mt(t, e);
		}
		Zr(e, !0);
	}
}
function _i(e, t) {
	return !t || e.ue === j || t.l & 16;
}
var vi = !1;
function yi() {
	vi = !0;
}
function bi(e) {
	return F.Y || e.ue === j || e.l & 4194304 ? j : e.l & 256 ? e.T.Be === N ? e.T.je : j : e.le;
}
function xi(e) {
	let t = e.T;
	t.Be !== N && (t.je = e.ue, t.Be = N, vi = !0);
}
var Si = [];
function Ci(e) {
	return e.R |= pt, !0;
}
function wi() {
	if (vi = !1, Si.length !== 0) {
		for (let e of Si) e.l &= ~Ct;
		Si.length = 0;
	}
}
function Ti(e, t) {
	e.he >= M.Fe || e.R & 1 ? (mr(t), pr(M), Qr(e)) : t.l & 65536 && Qr(e);
	let n = e.he;
	e._parent === t ? e.R |= yt : n >= t.he && _r(t, t.he = n + 1);
}
function Ei() {
	return I.R & ft;
}
function Di(e) {
	let t = I;
	if (t?.Qe && (t = t.Ke), pi !== null) return pi(e, t);
	if (typeof e.X == "function" && gi(e), !e.X && e.T?.De === void 0 && (!vi || e.ue === j) && !(e.l & 2048)) return t && (Yr && Dr(e, t), e.l & 256 && !(t.l & 16) && ti(t, e)) || !t || e.ue === j || t.l & 16 || e.ue === e.le && Object.is(e.ue, e.le) ? e.le : (Ai(t), e.ue);
	let n = !1, r;
	if (t && (Yr && (r = Dr(e, t), e.X && Ti(e, t)), e.l & 256 && !(e.l & 2048) && !(t.l & 16) && (e.m & 4 ? ei(t, e) : n = ti(t, e))), e.m & 1 && !n) {
		if (t) {
			if (!(t.l & 16) || e.m & 4) throw !Yr && e !== t && Dr(e, t), e.T?.U;
		} else if (e.m & 4) throw e.T?.U;
	}
	if (e.X && e.m & 2) {
		if (r && e.ie < N && !(e.R & 32)) return Zr(e), Di(e);
		throw !n && e.l & 2097152 && ki(e, t), e.T?.U;
	}
	(n || !t) && Oi(e);
	let i = ki(e, n ? null : t);
	return !t && typeof e.X == "function" && e.l & 32 && !(e.m & 1) && !e.o && (Tr.add(e), P()), i;
}
function Oi(e) {
	if (e.T?.Te) throw e.T.Te;
}
function ki(e, t) {
	if (e.ue !== j && e.m & 4 && (!t || t.l & 16)) {
		if (hi > 0) {
			let t = ri(I);
			if (t && e.l & 256 && ni(t, _n(e))) return e.ue;
		}
		throw new k(null);
	}
	let n = t && vi ? bi(e) : j;
	if (n !== j) return Ci(t), n;
	if (_i(e, t)) return e.le;
	if (Ai(t, e), e.l & 2097152) throw e.ue;
	return e.ue;
}
function Ai(e, t) {
	t?.m & 4 || (e.R |= ht);
}
function ji(e) {
	F.Y || e.l & 4194304 || (e.l |= Ct, Si.push(e));
}
var Mi = null;
function Ni(e, t, n) {
	if (e.ye === fi) return t === n;
	try {
		return e.ye && e.ye(t, n);
	} catch (t) {
		if (!(t instanceof k)) return qr(e, 2, t), !0;
	}
}
function Pi(e, t) {
	Mi !== null && Mi(e);
	let n = e.ue === j ? e.le : e.ue;
	if (typeof t == "function" && (t = t(n)), e.l & 256 && bn(_n(e)), !(e.m & 4 || e.T?.Te || !Ni(e, n, t))) return t;
	let r = e.ue !== j;
	return r ? e.l & 256 && !F.Y && xi(e) : Zn(e), e.ue = t, I !== null && ji(e), e.X !== void 0 && (e.ie = N), r && e.we === Qn || (er(e), P()), t;
}
function Fi(e, t) {
	let n = e.l & 256 && !(e.R & 1024) && _n(e) !== mn;
	if (n && typeof t == "function") {
		let n = t(e.le);
		t = () => n;
	}
	return e.m & 2 && (e.T.Te = e.T.U, qr(e, 0)), t = Pi(e, t), e.l &= ~St, n ? (e.R = e.R & -2 | 2, ur(e, M), P()) : e.ue !== j && (e.R |= dt), t;
}
function Ii(e, t) {
	let n = I, r = Yr;
	I = e, Yr = !1;
	try {
		return t();
	} finally {
		I = n, Yr = r;
	}
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/identities.js
var Li = null;
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/effect.js
function Ri(e, t, n, r) {
	let i = ai(e, t, n, r?.user ? 2 : 1, r);
	Zr(i, !0), r?.defer ? nr(i) : i.ue === j && (i.T?.Re?.P || i.i === 2 || r?.schedule ? F.enqueue(i.i, Vi.bind(null, i), i.T?.Re) : Vi(i, 0));
}
function zi() {
	let e = this.m, t = this.T?.U;
	if (e & 2) {
		if (F.notify(this, 1, 0), this.i === 2) {
			this.m & 2 && tr(this);
			return;
		}
		Bi(this, ut(t));
	} else this.i === 2 ? e & 1 && this.Ae && !t?.source?.T?.Ve && (L(this).fe = !(this.Ae = !1)) : this.i === 1 && F.notify(this, 3, e, t);
}
function Bi(e, t, n) {
	if (!F.notify(e, 2, 2)) throw Hn(t), t;
}
function Vi(e, t) {
	if (!e.Ae || e.R & 64 || t && en?.(e) || t && cn?.(e)) return;
	if (e.m & 2 && e.i === 2) {
		let t = ut(e.T?.U);
		e.ge = e.le, e.Ae = !1;
		try {
			e.Je ? e.Je(t, () => {
				let t = e.ze;
				e.ze = void 0, t?.();
			}) : console.error(t);
		} catch (t) {
			Bi(e, t);
		}
		return;
	}
	let n = e.T?.U == null, r = e.ze;
	e.ze = void 0;
	try {
		r?.(), e.ze = e.qe(e.le, e.ge);
	} catch (t) {
		L(e).U = new lt(e, t), e.m |= 2, Bi(e, t);
	} finally {
		e.ge = e.le, e.Ae = !1, n && br(e);
	}
}
Wn.q = Vi, si(zi);
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/store/types.js
var Hi = Symbol(0), Ui = Symbol(0), Wi = null;
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/signals.js
function Gi(e) {
	let t = Di.bind(null, e);
	return t[Tt] = e, t;
}
function Ki(e, t) {
	if (typeof e == "function") {
		let n = $r(e, t);
		return n.l &= -33, [Gi(n), Fi.bind(null, n)];
	}
	let n = di(e, t);
	return Li !== null && Li(n), [Gi(n), Pi.bind(null, n)];
}
function qi(e, t) {
	return Gi($r(e, t));
}
function Ji(e, t, n) {
	Ri(e, t.effect || t, t.error, {
		user: !0,
		...n
	});
}
function Yi(e, t, n) {
	Ri(e, t, void 0, n);
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/map.js
function Xi(e, t, n) {
	let r = typeof n?.keyed == "function" ? n.keyed : void 0, i = t.length > 1, a = t, o = {
		H: Vt(),
		it: 0,
		st: e,
		ot: [],
		ft: a,
		ht: [],
		ln: [],
		Xe: r,
		ct: r || n?.keyed === !1 ? [] : void 0,
		lt: i && n?.keyed !== !1 ? [] : void 0,
		ut: n?.keyed === !1,
		L: n?.fallback
	}, s = $r(ra.bind(o), void 0);
	return s.l &= -33, Gi(s);
}
var Zi = { ownedWrite: !0 };
function Qi(e, t, n, r) {
	let i = e.ot, a = e.it - 1, o = [], s = [], c = [], l = 256, u = r, d = r;
	for (; u <= a && d <= n - 1;) {
		let e = i[u], r = t[d];
		if (e === r) {
			let e = u;
			do
				d++;
			while (++u <= a && d < n && i[u] === t[d]);
			c.push(e, d - u + e, u - e);
			continue;
		}
		let f = -1, p = Math.min(32 - o.length, a - u, l);
		for (let e = 1; e <= p; e++) if (i[u + e] === r) {
			f = e;
			break;
		}
		l -= f === -1 ? p : f;
		let m = -1;
		p = Math.min(32 - s.length, n - 1 - d, l);
		for (let n = 1; n <= p; n++) if (t[d + n] === e) {
			m = n;
			break;
		}
		if (l -= m === -1 ? p : m, f !== -1 && (m === -1 || f <= m)) for (; f-- > 0;) o.push(u++);
		else if (m !== -1) for (; m-- > 0;) s.push(d++);
		else {
			if (l <= 0 || o.length === 32 || s.length === 32) return !1;
			o.push(u++), s.push(d++);
		}
	}
	for (; u <= a; u++) {
		if (o.length === 32) return !1;
		o.push(u);
	}
	for (; d <= n - 1; d++) {
		if (s.length === 32) return !1;
		s.push(d);
	}
	return $i(e, t, n, r, o, s, c);
}
function $i(e, t, n, r, i, a, o) {
	let s = e.ot, c, l, u;
	if (a.length !== 0) for (u = Array(i.length), l = 0; l < a.length; l++) {
		let e = -1;
		for (c = 0; c < i.length; c++) if (!u[c] && s[i[c]] === t[a[l]]) {
			e = c;
			break;
		}
		if (e === -1) return !1;
		u[e] = !0, a[l] = a[l] << 6 | e;
	}
	for (c = 0; c < i.length; c++) {
		let e = s[i[c]];
		if (e === void 0) return !1;
		for (l = r - 1; (l = s.indexOf(e, l + 1)) !== -1;) if (!i.includes(l)) return !1;
	}
	let d = e.ht, f = e.ln, p = d.slice(0, n), m = f.slice(0, n);
	for (let e = 0; e < o.length; e += 3) {
		let t = o[e], n = o[e + 1];
		if (t !== n) for (let r = 0; r < o[e + 2]; r++) p[n + r] = d[t + r], m[n + r] = f[t + r];
	}
	for (l = 0; l < a.length; l++) {
		let e = a[l] >> 6, t = i[a[l] & 63];
		p[e] = d[t], m[e] = f[t];
	}
	for (e.ht = p, e.ln = m, e.it = n, e.ot = t, c = 0; c < i.length; c++) (u === void 0 || !u[c]) && f[i[c]].dispose();
	return !0;
}
function ea(e, t, n, r, i, a, o, s, c) {
	let l = e.Xe, u = e.ot, d = e.ln, f = [], p = n;
	for (let m = n; m <= i; p++, m++) {
		let i = l ? l(t[m]) : t[m];
		for (; p <= r && (l ? l(u[p]) : u[p]) !== i;) f.push(d[p++]);
		if (p > r) return o.fill(void 0), null;
		a[m] = e.ht[p], o[m - n] = d[p], s && (s[m - n] = e.ct[p]), c && (c[m - n] = e.lt[p]);
	}
	for (; p <= r; p++) f.push(d[p]);
	return f;
}
function ta(e, t, n, r, i, a, o, s, c) {
	let l = e.ln, u = e.ct, d = e.lt, f = e.it, p = n - f, m, h;
	if (p > 0) for (l.length = n, u && (u.length = n), d && (d.length = n), m = f - 1, h = n - 1; m > i; m--, h--) l[h] = l[m], u && (u[h] = u[m]), d && (d[h] = d[m]);
	else if (p < 0) {
		for (m = i + 1, h = a + 1; m < f; m++, h++) l[h] = l[m], u && (u[h] = u[m]), d && (d[h] = d[m]);
		l.length = n, u && (u.length = n), d && (d.length = n);
	}
	for (h = r; h <= a; h++) l[h] = o[h - r], u && na(u[h] = s[h - r], t[h]), d && Pi(d[h] = c[h - r], h);
	for (h = a + 1; h < n; h++) u && na(u[h], t[h]), d && p !== 0 && Pi(d[h], h);
}
var na = (e, t) => e.le === t && e.ue === j || Pi(e, t);
function ra() {
	this.H.Ke = Rt();
	let e = this.st() || [];
	e[Hi], e = Wi?.(e[Ui]) ?? e;
	let t = e.length;
	return Ii(this.H, ia.bind(this, e, t)), this.ht;
}
function ia(e, t) {
	let n = e.slice(0), r, i, a, o, s, c = this.ct ? this.ut ? () => (o[a] = di(n[i], Zi), this.ft(Gi(o[a]), i)) : () => (o[a] = di(n[i], Zi), s && (s[a] = di(i, Zi)), this.ft(Gi(o[a]), s ? Gi(s[a]) : void 0)) : this.lt ? () => {
		let e = n[i];
		return s[a] = di(i, Zi), this.ft(e, Gi(s[a]));
	} : () => {
		let e = n[i];
		return this.ft(e);
	};
	if (t === 0) this.it !== 0 && (this.H.dispose(!1), this.ln = [], this.ot = [], this.ht = [], this.it = 0, this.ct &&= [], this.lt &&= []), this.L && !this.ht.length && (this.ln[0]?.dispose(), this.ht[0] = Ii(this.ln[0] = Vt(), this.L));
	else if (this.it === 0) {
		let e = Array(t), l = Array(t);
		o = this.ct && Array(t), s = this.lt && Array(t);
		try {
			for (i = 0; i < t; i++) a = i, e[i] = Ii(l[i] = Vt(), c);
		} catch (e) {
			for (r = 0; r <= i; r++) l[r]?.dispose();
			throw e;
		}
		this.ln[0] && this.ln[0].dispose(), this.ht = e, this.ln = l, o && (this.ct = o), s && (this.lt = s), this.ot = n, this.it = t;
	} else {
		let e, l, u, d, f, p, m, h, g;
		for (e = 0, l = Math.min(this.it, t); e < l && (this.ot[e] === n[e] || this.ct && aa(this.Xe, this.ot[e], n[e])); e++) this.ct && na(this.ct[e], n[e]);
		for (l = this.it - 1, u = t - 1; l >= e && u >= e && (this.ot[l] === n[u] || this.ct && aa(this.Xe, this.ot[l], n[u])); l--, u--);
		if (e === t && this.it === t) {
			this.ot = n;
			return;
		}
		if (t <= this.it && l - e > 64 && this.ct === void 0 && this.lt === void 0) {
			let r = e + (u - e >> 1), i = n[r], a = Math.min(l, r + 32), o = Math.max(e, r - 32);
			for (; o <= a && this.ot[o] !== i;) o++;
			if (o <= a && Qi(this, n, t, e)) return;
		}
		let _ = t - this.it, ee = u - e + 1, te = Array(t), v = Array(ee);
		o = this.ct ? Array(ee) : void 0, s = this.lt ? Array(ee) : void 0;
		let ne = _ < 0 ? ea(this, n, e, l, u, te, v, o, s) : null;
		if (ne !== null) ne.length !== 0 && (h = ne);
		else {
			for (p = /* @__PURE__ */ new Map(), m = Array(ee), i = u; i >= e; i--) d = n[i], f = this.Xe ? this.Xe(d) : d, r = p.get(f), m[i - e] = r === void 0 ? -1 : r, p.set(f, i);
			for (r = e; r <= l; r++) d = this.ot[r], f = this.Xe ? this.Xe(d) : d, i = p.get(f), i !== void 0 && i !== -1 ? (te[i] = this.ht[r], v[i - e] = this.ln[r], o && (o[i - e] = this.ct[r]), s && (s[i - e] = this.lt[r]), i = m[i - e], p.set(f, i)) : (h ??= []).push(this.ln[r]);
			try {
				for (i = e; i <= u; i++) v[i - e] === void 0 && ((g ??= []).push(v[i - e] = Vt()), a = i - e, te[i] = Ii(v[i - e], c));
			} catch (e) {
				if (g) for (r = 0; r < g.length; r++) g[r].dispose();
				throw e;
			}
		}
		for (r = 0; r < e; r++) te[r] = this.ht[r];
		for (i = u + 1; i < t; i++) te[i] = this.ht[i - _];
		if (ta(this, n, t, e, l, u, v, o, s), this.ht = te, this.it = t, this.ot = n, h) for (r = 0; r < h.length; r++) h[r].dispose();
	}
}
function aa(e, t, n) {
	return !e || e(t) === e(n);
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/flatten.js
function oa(e, t) {
	if (typeof e == "function" && !e.length) {
		if (t?.doNotUnwrap) return e;
		do
			e = e();
		while (typeof e == "function" && !e.length);
	}
	if (!t?.skipNonRendered || e != null && e !== !0 && e !== !1 && e !== "") {
		if (Array.isArray(e)) {
			let n = [];
			return sa(e, n, t) ? () => {
				let e = [];
				return sa(n, e, {
					...t,
					doNotUnwrap: !1
				}), e;
			} : n;
		}
		return e;
	}
}
function sa(e, t = [], n) {
	let r = null, i = !1;
	for (let a = 0; a < e.length; a++) try {
		let r = e[a];
		if (typeof r == "function" && !r.length) {
			if (n?.doNotUnwrap) {
				t.push(r), i = !0;
				continue;
			}
			do
				r = r();
			while (typeof r == "function" && !r.length);
		}
		Array.isArray(r) ? i = sa(r, t, n) || i : n?.skipNonRendered && (r == null || r === !0 || r === !1 || r === "") || t.push(r);
	} catch (e) {
		if (!(e instanceof k)) throw e;
		r = e;
	}
	if (r) throw r;
	return i;
}
//#endregion
//#region node_modules/solid-js/dist/solid.js
var ca = {
	hydrating: !1,
	registry: void 0,
	done: !1
}, la = (...e) => qi(...e), ua = Ki, da = Ht, fa = Yi, pa = (...e) => Ji(...e);
function ma(e, t, n, r) {
	return mi(() => e(t || {}));
}
function ha(e) {
	let t = "fallback" in e ? {
		keyed: e.keyed,
		fallback: () => e.fallback
	} : { keyed: e.keyed }, n = Rt(), r, i = () => Ii(n, () => Xi(() => e.each, e.children, t));
	return ca.hydrating && (r = i()), () => (r ??= i())();
}
var ga = {
	new_chat: "New chat",
	copy: "Copy",
	copied: "Copied",
	copy_failed: "Copy failed",
	confirm_delete: "Delete this conversation?",
	announce_phone: "Waiting for an admin to approve on their phone.",
	announce_approval: "An action needs your approval; its card is in the chat.",
	announce_error: "Something went wrong; the message is in the chat.",
	announce_done: "Reply finished",
	confirm_undo: "Undo \"{name}\"?",
	undone_notice: "Undone: {summary}",
	continue_message: "Continue.",
	photos_not_kept: "Photos aren't kept after they're sent. Attach them again to include them.",
	photo_unreadable: "Couldn't read {name} as a photo.",
	that_picture: "that picture",
	load_error: "LLM Agent could not load: {error}",
	no_provider: "No AI provider is configured. Add one under Settings → Devices & services → LLM Agent → Configure.",
	hide_chats: "Hide chats",
	show_chats: "Show chats",
	conversations: "Conversations",
	export_title: "Download this chat as Markdown",
	export: "Export",
	home_notes: "Home notes",
	panel_settings: "Panel settings",
	conversation: "Conversation",
	search_chats: "Search chats",
	no_matches: "No chats match.",
	no_chats: "No chats yet.",
	started_by_automation: "Started by an automation",
	delete: "Delete",
	delete_chat: "Delete chat",
	notes_placeholder: "The office is upstairs.",
	save: "Save",
	characters_left: "{count} characters left",
	notes_hint: "Short lasting facts and rules about this home. Enabled notes go into every chat. To change how the AI works, use \"Extra instructions for the AI\" in the integration's settings instead. Don't put passwords here.",
	knowledge_hint: "Longer reference about this home. Only the titles and summaries go into each chat, and the AI reads an entry when a question needs it.",
	notes_tab: "Notes",
	knowledge_tab: "Knowledge",
	add: "Add",
	notes_none: "Nothing here yet.",
	note_enabled: "Enabled",
	note_from_ai: "from the AI",
	delete_confirm: "Delete this?",
	knowledge_title: "Title",
	knowledge_summary: "One-line summary",
	knowledge_body: "Text (Markdown)",
	theme: "Theme",
	theme_auto: "Follow Home Assistant",
	theme_light: "Light",
	theme_dark: "Dark",
	text_size: "Text size",
	size_small: "Small",
	size_normal: "Normal",
	size_large: "Large",
	send_with: "Send with",
	compact_layout: "Compact layout",
	expand_tools: "Expand tool cards",
	show_usage: "Show token use and cost",
	my_default: "My default for new chats: {model}",
	provider_default: "the provider's default",
	model_provider_default: "provider default",
	use_current_model: "Use the current model",
	clear: "Clear",
	prefs_hint: "These settings are kept in this browser.",
	greeting_morning: "Good morning",
	greeting_afternoon: "Good afternoon",
	greeting_evening: "Good evening",
	greeting_name: "{greeting}, {name}",
	welcome_member: "I can control the devices shared with Assist and answer questions about them.",
	welcome_admin: "I can control devices, answer questions about your home, and build automations, scenes, scripts and dashboards.",
	mode_ask_all: "Ask before every change",
	mode_ask_risky: "Ask before risky actions",
	mode_reviewer: "Reviewer decides risky actions",
	mode_autopilot: "Autopilot",
	mode_yolo: "YOLO",
	mode_read_only: "Read only",
	edit: "Edit",
	retry: "Retry",
	continue: "Continue",
	continue_anyway: "Continue anyway",
	hide_preview: "Hide preview",
	preview_dashboard: "Preview the dashboard",
	suggested_note: "Suggested home note",
	note_question: "Remember this for every chat?",
	note_explain: "The AI suggests changing your home notes. Every future chat follows them.",
	forget: "Forget",
	note_no: "No, don't remember",
	note_save_title: "Save to home notes",
	read_it_first: "Read it first",
	save_to_notes: "Save to notes",
	running: "Running",
	done: "Done",
	failed: "Failed",
	waiting_for_you: "Waiting for you",
	needs_approval: "Needs your approval",
	undone: "undone",
	undo_title: "Undo this change",
	undo: "Undo",
	reviewer: "Reviewer",
	reviewer_model: "Reviewer ({model})",
	reviewer_approved: "Reviewer approved",
	reviewer_denied: "Reviewer denied",
	reviewer_unsure: "Reviewer unsure, asking you",
	reviewing: "Reviewing…",
	denied: "Denied",
	camera_snapshot: "Camera snapshot",
	phone_wait: "Waiting for an admin to approve this on their phone.",
	approval_note: "Optional note for the AI",
	deny: "Deny",
	approve: "Approve",
	your_photo: "Your photo",
	one_photo: "1 photo",
	n_photos: "{count} photos",
	not_kept: "(not kept)",
	page_chip: "Page: {page}",
	page_chip_on: "Sent with your next message. Click to leave it out.",
	page_chip_off: "Left out of your next message. Click to send it.",
	page_sent: "with page: {page}",
	composer_placeholder: "Ask or tell me to do something…",
	photo_to_send: "Photo to send",
	remove_photo: "Remove photo",
	attach_title: "Attach photos or files: text, logs, YAML, JSON, CSV, PDF, zip",
	attach: "Attach photos or files",
	remove_file: "Remove file",
	that_file: "that file",
	file_text: "Text",
	too_many_files: "Up to {count} files can go with one message.",
	file_too_large: "{name} is larger than {limit}.",
	files_over_total: "{name} would make this message too large to send. Remove an attachment or send it in a separate message.",
	file_unreadable: "Couldn't read {name}.",
	file_unsupported: "{name} can't be read. Text files (YAML, JSON, logs, CSV, code), PDFs, zip or gzip archives and pictures work.",
	files_not_kept: "Files can't be sent again from a reloaded chat. Attach them again to include them.",
	provider_and_model: "Provider and model",
	provider: "Provider",
	model: "Model",
	stop: "Stop",
	send: "Send",
	editing_last: "Editing your last message",
	editing_earlier: "Editing an earlier message. Sending replaces it and everything after it. Device changes already made are not undone.",
	keys_enter: "Enter to send, Shift+Enter for a new line",
	keys_ctrl: "Ctrl+Enter to send",
	cancel: "Cancel",
	usage_title: "Tokens in / out (cached). Cost is an estimate.",
	usage_line: "{input} in · {output} out",
	usage_cached: "{count} cached",
	cost_na: "cost n/a",
	reviewer_usage: "reviewer {tokens} tokens, {cost}",
	today: "Today",
	yesterday: "Yesterday",
	previous_7: "Previous 7 days",
	previous_30: "Previous 30 days",
	older: "Older",
	you: "You",
	tip_lights: "Turn off all the lights in the {room}",
	tip_anything_on: "Is anything still on?",
	tip_temperature: "What's the temperature inside?",
	tip_dashboard_room: "Make a dashboard for the {room}",
	tip_dashboard_all: "Make a dashboard with a card for every room",
	tip_automation: "Create an automation: porch light on at sunset, off at 11pm",
	tip_energy: "What used the most energy this week?",
	tip_unavailable: "Why did a sensor go unavailable yesterday?",
	tip_batteries: "Which batteries are running low?",
	living_room: "living room",
	preview_unavailable: "Preview unavailable: {error}",
	preview_no_views: "This dashboard has no views.",
	preview_view: "View {n}",
	preview_skipped_n: "{count} cards not shown: the preview only draws Home Assistant's own entity cards.",
	preview_skipped_one: "1 card not shown: the preview only draws Home Assistant's own entity cards.",
	tool_call_service: "call service",
	tool_camera_snapshot: "camera snapshot",
	tool_delete_config_item: "delete config item",
	tool_delete_dashboard: "delete dashboard",
	tool_get_config_item: "get config item",
	tool_get_dashboard: "get dashboard",
	tool_get_entities: "get entities",
	tool_get_history: "get history",
	tool_get_logbook: "get logbook",
	tool_get_statistics: "get statistics",
	tool_get_traces: "get traces",
	tool_ha_websocket: "ha websocket",
	tool_home_control: "home control",
	tool_home_entities: "home entities",
	tool_home_history: "home history",
	tool_integrations: "integrations",
	tool_list_areas: "list areas",
	tool_list_config_items: "list config items",
	tool_list_dashboards: "list dashboards",
	tool_list_devices: "list devices",
	tool_list_files: "list files",
	tool_list_services: "list services",
	tool_read_file: "read file",
	tool_read_log: "read log",
	tool_read_reference: "read reference",
	tool_render_template: "render template",
	tool_save_config_item: "save config item",
	tool_save_dashboard: "save dashboard",
	tool_search_entities: "search entities",
	tool_shell: "shell",
	tool_system: "system",
	tool_undo: "undo",
	tool_change_home_note: "change home note",
	tool_change_knowledge: "change knowledge",
	tool_read_knowledge: "read knowledge",
	tool_update_registry: "update registry",
	tool_web_fetch: "web fetch",
	tool_web_search: "web search",
	tool_write_file: "write file",
	changes: "Changes",
	changes_title: "What the assistant changed, in every chat",
	changes_from: "From",
	changes_to: "To",
	changes_all_chats: "All chats",
	changes_user: "Person",
	changes_everyone: "Everyone",
	changes_search: "Search changes",
	changes_error: "Could not load changes: {error}",
	changes_none: "No changes match.",
	changes_more: "Load more",
	changes_deleted_chat: "Deleted chat",
	changes_no_user: "No signed-in user",
	changes_asked: "Approved by a person",
	changes_auto: "Automatic",
	changes_rule: "Allowed by a rule",
	changes_undo_gone: "Undo expired",
	changes_undo_gone_title: "Its undo copy was removed to save space",
	tool_change_history: "change history",
	tool_past_chats: "past chats",
	tool_read_chat: "read chat",
	usage: "Usage",
	usage_view_title: "Spend and tokens over time, in every chat",
	usage_days: "{n} days",
	usage_today: "Today",
	usage_week: "Last 7 days",
	usage_month: "Last 30 days",
	usage_cap: "Daily cap {cap}: {used} used today ({pct}%). AI Task calls do not count toward the cap.",
	usage_chart: "Estimated spend per day, highest",
	usage_since: "Tracked since {date}. Nothing before that was recorded.",
	usage_none: "No usage recorded yet.",
	usage_estimate: "Costs are estimates from model prices, not the provider's bill.",
	usage_model: "Model",
	usage_in: "In",
	usage_out: "Out",
	usage_col_cached: "Cached",
	usage_calls: "Calls",
	usage_cost: "Cost",
	usage_kind_task: "AI Task",
	usage_kind_review: "Reviewer",
	usage_no_price: "No price",
	usage_unpriced: "{n} calls without a price",
	usage_error: "Could not load usage: {error}",
	balance_left: "{name}: {left} left of this key's {limit} limit.",
	balance_no_limit: "{name}: this key has no spending limit and used {month} this month. The account balance is only shown on the billing page.",
	balance_none: "{name} has no balance an API key can read.",
	balance_local: "{name} runs locally and has no balance.",
	balance_error: "{name}: the balance could not be read ({error}).",
	billing_page: "Billing page",
	integration_settings: "Integration settings",
	open_in_ha: "Open in Home Assistant",
	close: "Close",
	settings_loading: "Loading the integration's settings.",
	settings_unsupported: "This step can't be shown here. Open it in Home Assistant to continue.",
	settings_error: "Could not open the integration's settings: {error}",
	settings_menu: "Back to the menu",
	settings_submit: "Submit",
	settings_reloading: "Saved. LLM Agent is reloading with the new settings.",
	settings_reloaded: "Saved. LLM Agent reloaded with the new settings.",
	settings_saved: "Saved.",
	settings_reload_failed: "Saved, but LLM Agent did not start again. Open it in Home Assistant to see why.",
	settings_back: "Back to chat",
	settings_bad_json: "This isn't valid JSON.",
	usage_all_time: "All time",
	usage_all_time_hint: "All time is every saved chat's cost added up ({count} chats), plus AI Tasks. Deleted chats are not in it.",
	usage_since_filled: "Model detail since {date}. Days before that are daily totals from the spend cap's record.",
	usage_earlier: "Before model detail",
	usage_earlier_hint: "daily totals only",
	float_minimize: "Minimize",
	float_restore: "Restore",
	float_full_panel: "Open the full panel",
	float_resize: "Resize"
}, _a = [
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
], va = {}, ya = "en", ba = /* @__PURE__ */ ua(0);
function R(e, t) {
	ba[0]();
	let n = va[e] ?? ga[e];
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}
function xa(e) {
	return e in ga;
}
function Sa(e) {
	if (!e) return "en";
	let t = _a.find((t) => t.toLowerCase() === e.toLowerCase());
	if (t) return t;
	let n = e.split("-")[0].toLowerCase();
	return _a.find((e) => e.split("-")[0].toLowerCase() === n) ?? "en";
}
async function Ca(e) {
	let t = Sa(e);
	if (t === ya) return !1;
	if (t === "en") return va = {}, ya = "en", ba[1]((e) => e + 1), !0;
	try {
		let e = new URL(import.meta.url), n = await fetch(new URL(`i18n/${t}.json${e.search}`, e));
		if (!n.ok) return !1;
		let r = await n.json(), i = {};
		for (let e of Object.keys(ga)) typeof r[e] == "string" && (i[e] = r[e]);
		return va = i, ya = t, ba[1]((e) => e + 1), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
function wa(e, t) {
	this.v = e, this.k = t;
}
function Ta(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Ea(e) {
	if (Array.isArray(e)) return e;
}
function Da(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Oa() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ka(e, t) {
	return Ea(e) || Da(e, t) || Aa(e, t) || Oa();
}
function Aa(e, t) {
	if (e) {
		if (typeof e == "string") return Ta(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ta(e, t) : void 0;
	}
}
function ja(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof wa;
			Promise.resolve(s ? o.v : o).then(function(n) {
				if (s) {
					var c = t === "return" && o.k ? t : "next";
					if (!o.k || n.done) return r(c, n);
					n = e[c](n).value;
				}
				i(!!a.done, n);
			}, function(e) {
				r("throw", e);
			});
		} catch (e) {
			i(2, e);
		}
	}
	function i(e, i) {
		e === 2 ? t.reject(i) : t.resolve({
			value: i,
			done: e
		}), (t = t.next) ? r(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, i) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: i,
				resolve: a,
				reject: o,
				next: null
			};
			n ? n = n.next = s : (t = n = s, r(e, i));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
ja.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, ja.prototype.next = function(e) {
	return this._invoke("next", e);
}, ja.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, ja.prototype.return = function(e) {
	return this._invoke("return", e);
};
var Ma = Object.entries, Na = Object.setPrototypeOf, Pa = Object.isFrozen, Fa = Object.getPrototypeOf, Ia = Object.getOwnPropertyDescriptor, z = Object.freeze, B = Object.seal, La = Object.create, Ra = typeof Reflect < "u" && Reflect, za = Ra.apply, Ba = Ra.construct;
z ||= function(e) {
	return e;
}, B ||= function(e) {
	return e;
}, za ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, Ba ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var Va = U(Array.prototype.forEach);
Array.prototype.indexOf;
var Ha = U(Array.prototype.lastIndexOf), Ua = U(Array.prototype.pop), Wa = U(Array.prototype.push), Ga = U(Array.prototype.slice), Ka = U(Array.prototype.splice), qa = Array.isArray, Ja = lo(Set), Ya = U(Set.prototype.add), Xa = U(Set.prototype.has), Za = U(String.prototype.toLowerCase), Qa = U(String.prototype.toString), $a = U(String.prototype.match), eo = U(String.prototype.replace), to = U(String.prototype.indexOf), no = U(String.prototype.trim), ro = U(Number.prototype.toString), io = U(Boolean.prototype.toString), ao = typeof BigInt > "u" ? null : U(BigInt.prototype.toString), oo = typeof Symbol > "u" ? null : U(Symbol.prototype.toString), V = U(Object.prototype.hasOwnProperty), so = U(Object.prototype.toString), H = U(RegExp.prototype.test), co = lo(TypeError);
function U(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return za(e, t, n);
	};
}
function lo(e) {
	return function() {
		return Ba(e, [...arguments]);
	};
}
function W(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Za;
	if (Na && Na(e, null), !qa(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (Pa(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function uo(e) {
	for (let t = 0; t < e.length; t++) V(e, t) || (e[t] = null);
	return e;
}
function fo(e) {
	let t = La(null);
	for (let r of Ma(e)) {
		var n = ka(r, 2);
		let i = n[0], a = n[1];
		V(e, i) && (t[i] = qa(a) ? uo(a) : a && typeof a == "object" && a.constructor === Object ? fo(a) : a);
	}
	return t;
}
function po(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return ro(e);
		case "boolean": return io(e);
		case "bigint": return ao ? ao(e) : "0";
		case "symbol": return oo ? oo(e) : "Symbol()";
		case "undefined": return so(e);
		case "function":
		case "object": {
			if (e === null) return so(e);
			let t = e, n = mo(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : so(e);
			}
			return so(e);
		}
		default: return so(e);
	}
}
function mo(e, t) {
	for (; e !== null;) {
		let n = Ia(e, t);
		if (n) {
			if (n.get) return U(n.get);
			if (typeof n.value == "function") return U(n.value);
		}
		e = Fa(e);
	}
	function n() {
		return null;
	}
	return n;
}
function ho(e, t) {
	for (; e !== null;) {
		let n = Ia(e, t);
		if (n) return n.get ? U(n.get) : null;
		e = Fa(e);
	}
	return null;
}
function go(e) {
	try {
		return H(e, ""), !0;
	} catch {
		return !1;
	}
}
var _o = z(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), vo = z(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), yo = z([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), bo = z([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), xo = z(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), So = z([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), Co = z(["#text"]), wo = z(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), To = z(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), Eo = z(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), Do = z([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), Oo = B(/{{[\w\W]*|^[\w\W]*}}/g), ko = B(/<%[\w\W]*|^[\w\W]*%>/g), Ao = B(/\${[\w\W]*/g), jo = B(/^data-[\-\w.\u00B7-\uFFFF]+$/), Mo = B(/^aria-[\-\w]+$/), No = B(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), Po = B(/^(?:\w+script|data):/i), Fo = B(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), Io = B(/^html$/i), Lo = B(/^[a-z][.\w]*(-[.\w]+)+$/i), Ro = B(/<[/\w!]/g), zo = B(/<[/\w]/g), Bo = B(/<\/no(script|embed|frames)/i), Vo = B(/\/>/i), G = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, Ho = z(W({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
])), Uo = function() {
	return typeof window > "u" ? null : window;
}, Wo = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, Go = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, Ko = function(e, t, n, r) {
	return V(e, t) && qa(e[t]) ? W(r.base ? fo(r.base) : {}, e[t], r.transform) : n;
}, qo = function(e, t, n) {
	let r = V(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? fo(r) : n();
};
function Jo() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Uo(), t = (e) => Jo(e);
	if (t.version = "3.4.17", t.removed = [], !e || !e.document || e.document.nodeType !== G.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = mo(d, "cloneNode"), p = mo(d, "remove"), m = mo(d, "removeAttributeNode"), h = mo(d, "nextSibling"), g = mo(d, "childNodes"), _ = mo(d, "parentNode"), ee = mo(d, "shadowRoot"), te = mo(d, "attributes"), v = o && o.prototype ? mo(o.prototype, "nodeType") : null, ne = o && o.prototype ? mo(o.prototype, "nodeName") : null, re = o && o.prototype ? mo(o.prototype, "ownerDocument") : null, y = function(e) {
		return v ? v(e) : e.nodeType;
	}, ie = function(e) {
		return ne ? ne(e) : e.nodeName;
	}, ae = ho(d, "namespaceURI"), oe = function(e) {
		return ae ? ae(e) : e.namespaceURI;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let b, se = "", ce, le = !1, ue = 0, de = function() {
		if (ue > 0) throw co("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, fe = function(e) {
		de(), ue++;
		try {
			return b.createHTML(e);
		} finally {
			ue--;
		}
	}, pe = function(e) {
		de(), ue++;
		try {
			return b.createScriptURL(e);
		} finally {
			ue--;
		}
	}, me = function() {
		return le ||= (ce = Wo(u, i), !0), ce;
	}, he = n, ge = he.implementation, _e = he.createNodeIterator, ve = he.createDocumentFragment, ye = he.getElementsByTagName, be = r.importNode, x = Go();
	t.isSupported = typeof Ma == "function" && typeof _ == "function" && ge && ge.createHTMLDocument !== void 0;
	let xe = Oo, Se = ko, Ce = Ao, we = jo, S = Mo, Te = Po, Ee = Fo, C = Lo, De = No, w = null, Oe = W({}, [
		..._o,
		...vo,
		...yo,
		...xo,
		...Co
	]), T = null, ke = W({}, [
		...wo,
		...To,
		...Eo,
		...Do
	]), E = Object.seal(La(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), Ae = null, je = null, Me = Object.seal(La(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), Ne = !0, Pe = !0, Fe = !1, Ie = !0, Le = !1, Re = !0, ze = !1, Be = !1, Ve = null, He = null, Ue = !1, We = !1, D = !1, O = !1, Ge = !0, Ke = !1, qe = "user-content-", Je = !0, Ye = !1, Xe = null, Ze = {}, Qe = null, $e = W({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), et = null, tt = W({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), nt = null, rt = W({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), it = "http://www.w3.org/1998/Math/MathML", at = "http://www.w3.org/2000/svg", ot = "http://www.w3.org/1999/xhtml", st = ot, ct = !1, k = null, lt = W({}, [
		it,
		at,
		ot
	], Qa), ut = z([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), dt = W({}, ut), ft = z(["annotation-xml"]), pt = W({}, ft), mt = W({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), ht = null, gt = ["application/xhtml+xml", "text/html"], A = null, _t = null, vt = n.createElement("form"), yt = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, bt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (_t && _t === e) return;
		(!e || typeof e != "object") && (e = {}), e = fo(e), ht = gt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, A = ht === "application/xhtml+xml" ? Qa : Za, w = Ko(e, "ALLOWED_TAGS", Oe, { transform: A }), T = Ko(e, "ALLOWED_ATTR", ke, { transform: A }), k = Ko(e, "ALLOWED_NAMESPACES", lt, { transform: Qa }), nt = Ko(e, "ADD_URI_SAFE_ATTR", rt, {
			transform: A,
			base: rt
		}), et = Ko(e, "ADD_DATA_URI_TAGS", tt, {
			transform: A,
			base: tt
		}), Qe = Ko(e, "FORBID_CONTENTS", $e, { transform: A }), Ae = Ko(e, "FORBID_TAGS", fo({}), { transform: A }), je = Ko(e, "FORBID_ATTR", fo({}), { transform: A }), Ze = V(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? fo(e.USE_PROFILES) : e.USE_PROFILES : !1, Ne = e.ALLOW_ARIA_ATTR !== !1, Pe = e.ALLOW_DATA_ATTR !== !1, Fe = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Ie = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Le = e.SAFE_FOR_TEMPLATES || !1, Re = e.SAFE_FOR_XML !== !1, ze = e.WHOLE_DOCUMENT || !1, We = e.RETURN_DOM || !1, D = e.RETURN_DOM_FRAGMENT || !1, O = e.RETURN_TRUSTED_TYPE || !1, Ue = e.FORCE_BODY || !1, Ge = e.SANITIZE_DOM !== !1, Ke = e.SANITIZE_NAMED_PROPS || !1, Je = e.KEEP_CONTENT !== !1, Ye = e.IN_PLACE || !1, De = go(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : No, st = typeof e.NAMESPACE == "string" ? e.NAMESPACE : ot, dt = qo(e, "MATHML_TEXT_INTEGRATION_POINTS", () => W({}, ut)), pt = qo(e, "HTML_INTEGRATION_POINTS", () => W({}, ft));
		let t = qo(e, "CUSTOM_ELEMENT_HANDLING", () => La(null));
		if (E = La(null), V(t, "tagNameCheck") && yt(t.tagNameCheck) && (E.tagNameCheck = t.tagNameCheck), V(t, "attributeNameCheck") && yt(t.attributeNameCheck) && (E.attributeNameCheck = t.attributeNameCheck), V(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), B(E), Le && (Pe = !1), D && (We = !0), Ze && (w = W({}, Co), T = La(null), Ze.html === !0 && (W(w, _o), W(T, wo)), Ze.svg === !0 && (W(w, vo), W(T, To), W(T, Do)), Ze.svgFilters === !0 && (W(w, yo), W(T, To), W(T, Do)), Ze.mathMl === !0 && (W(w, xo), W(T, Eo), W(T, Do))), Me.tagCheck = null, Me.attributeCheck = null, V(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? Me.tagCheck = e.ADD_TAGS : qa(e.ADD_TAGS) && (w === Oe && (w = fo(w)), W(w, e.ADD_TAGS, A))), V(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? Me.attributeCheck = e.ADD_ATTR : qa(e.ADD_ATTR) && (T === ke && (T = fo(T)), W(T, e.ADD_ATTR, A))), V(e, "ADD_FORBID_CONTENTS") && qa(e.ADD_FORBID_CONTENTS) && (Qe === $e && (Qe = fo(Qe)), W(Qe, e.ADD_FORBID_CONTENTS, A)), Je && (w["#text"] = !0), ze && W(w, [
			"html",
			"head",
			"body"
		]), w.table && (W(w, ["tbody"]), delete Ae.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw co("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw co("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = b;
			b = e.TRUSTED_TYPES_POLICY;
			try {
				se = fe("");
			} catch (e) {
				throw b = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (b = void 0, se = "") : (b === void 0 && (b = me()), b && typeof se == "string" && (se = fe("")));
		z && z(e), _t = e;
	}, xt = W({}, [
		...vo,
		...yo,
		...bo
	]), St = W({}, [...xo, ...So]), Ct = function(e, t, n) {
		return t.namespaceURI === ot ? e === "svg" : t.namespaceURI === it ? e === "svg" && (n === "annotation-xml" || dt[n]) : !!xt[e];
	}, j = function(e, t, n) {
		return t.namespaceURI === ot ? e === "math" : t.namespaceURI === at ? e === "math" && pt[n] : !!St[e];
	}, wt = function(e, t, n) {
		return t.namespaceURI === at && !pt[n] || t.namespaceURI === it && !dt[n] ? !1 : !St[e] && (mt[e] || !xt[e]);
	}, Tt = function(e) {
		let t = oe(e), n = Za(ie(e)), r = _(e), i, a;
		return r && y(r) === G.element ? (i = { namespaceURI: oe(r) }, a = Za(ie(r))) : (i = { namespaceURI: st }, a = "template"), k[t] ? t === at ? Ct(n, i, a) : t === it ? j(n, i, a) : t === ot ? wt(n, i, a) : !!(ht === "application/xhtml+xml" && k[t]) : !1;
	}, Et = function(e) {
		Wa(t.removed, { element: e });
		try {
			_(e).removeChild(e);
		} catch {
			if (p(e), !_(e)) throw co("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, Dt = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, Ot = function(e) {
		Mt(e);
		let t = g(e);
		t && Va(Ga(t), (e) => {
			try {
				p(e);
			} catch {}
		});
		let n = y(e) === G.element ? te(e) : null;
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && Dt(e, r, i);
		}
	}, kt = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		Wa(t.removed, {
			attribute: r || null,
			from: n
		});
		try {
			r ? m(n, r) : n.removeAttribute(e);
		} catch {
			try {
				n.removeAttribute(e);
			} catch {}
		}
		if (e === "is") {
			if (We || D) try {
				Et(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, At = function(e) {
		let t = te(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || T[A(i)] || Dt(e, r, i);
		}
	}, jt = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = [e];
		for (; r.length > 0;) {
			let e = r.pop();
			if (t(e) === !1) continue;
			if (n && y(e) === G.element) {
				let t = ee(e);
				qt(t) && r.push(t);
			}
			let i = g(e);
			if (i) for (let e = i.length - 1; e >= 0; --e) r.push(i[e]);
		}
	}, Mt = function(e) {
		jt(e, (e) => {
			y(e) === G.element && At(e);
		});
	}, Nt = function(e) {
		let t = [];
		return jt(e, (e) => {
			t.push(e);
		}, !0), t;
	}, Pt = function(e, t) {
		let n = Ja();
		Va(Nt(e), (e) => {
			y(e) === G.element && Ya(n, e);
		}), Va(t, (e) => {
			y(e) === G.element && !Xa(n, e) && At(e);
		});
	}, Ft = function(e, n) {
		let r = !1;
		return Va(t.removed, (t) => {
			t.element && (r ||= t.element === e, Mt(t.element));
		}), Pt(e, n), r;
	}, It = function(e, t) {
		let n = Xe, r = null, i = () => (r || (r = Ja(), Va(t, (e) => {
			Ya(r, e);
		})), r);
		for (let t = 0;; t++) {
			let r = Nt(e), a = [e], o = !1;
			if (Va(r, (e) => {
				y(e) === G.documentFragment ? Wa(a, e) : !o && !Xa(n, e) && (o = Xa(i(), e));
			}), !o) return;
			if (t >= 8) throw co("the tree kept changing during in-place sanitization; refusing to return it");
			Va(a, (t, n) => {
				Lt(t, n > 0, e, i());
			});
		}
	}, Lt = function(e, t, n, r) {
		let i = Ht(e), a;
		for (; a = i.nextNode();) Xa(r, a) && !Xa(Xe, a) && (t && Yt(x.uponSanitizeShadowNode, a, null), tn(a, n), ln(a, n), qt(a.content) && un(a.content));
	}, Rt = function(e) {
		Xe && Ya(Xe, e);
	}, zt = function(e, t) {
		return Re ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, Bt = function(e) {
		Re && jt(e, (e) => {
			let t = y(e);
			if (t === G.processingInstruction || t === G.comment && H(zo, e.data)) {
				try {
					p(e);
				} catch {}
				return !1;
			}
			if (t === G.element) {
				let t = e, n = A(ie(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && zt("for", n) && t.removeAttribute("for");
				} catch {}
			}
			return !0;
		});
	}, Vt = function(e) {
		let t = null, r = null;
		if (Ue) e = "<remove></remove>" + e;
		else {
			let t = $a(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		ht === "application/xhtml+xml" && st === ot && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = b ? fe(e) : e;
		if (st === ot) try {
			t = new l().parseFromString(i, ht);
		} catch {}
		if (!t || !t.documentElement) {
			t = ge.createDocument(st, "template", null);
			try {
				t.documentElement.innerHTML = ct ? se : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), st === ot ? ye.call(t, ze ? "html" : "body")[0] : ze ? t.documentElement : a;
	}, Ht = function(e) {
		let t = re ? re(e) : e.ownerDocument;
		return _e.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Ut = function(e) {
		return e = eo(e, xe, " "), e = eo(e, Se, " "), e = eo(e, Ce, " "), e;
	}, Wt = function(e) {
		Gt(e);
		let t = e.querySelectorAll?.call(e, "template");
		t && Va(t, (e) => {
			qt(e.content) && Wt(e.content);
		});
	}, Gt = function(e) {
		e.normalize();
		let t = re ? re(e) : e.ownerDocument, n = _e.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = Ut(r.data), r = n.nextNode();
	}, Kt = function(e) {
		let t = ne ? ne(e) : null;
		return typeof t != "string" || A(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== te(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== v(e) || e.childNodes !== g(e);
	}, qt = function(e) {
		if (!v || typeof e != "object" || !e) return !1;
		try {
			return v(e) === G.documentFragment;
		} catch {
			return !1;
		}
	}, Jt = function(e) {
		if (!v || typeof e != "object" || !e) return !1;
		try {
			return typeof v(e) == "number";
		} catch {
			return !1;
		}
	};
	function Yt(e, n, r) {
		e.length !== 0 && Va(e, (e) => {
			e.call(t, n, r, _t);
		});
	}
	let Xt = function(e, t) {
		return !!(Re && e.hasChildNodes() && !Jt(e.firstElementChild) && H(Ro, e.textContent) && H(Ro, e.innerHTML) || Re && Ho[t] && y(e) === G.element && oe(e) === ot && (Jt(e.firstElementChild) || typeof e.textContent == "string" && H(Ro, e.textContent)) || e.nodeType === G.processingInstruction || Re && e.nodeType === G.comment && H(zo, e.data));
	}, Zt = function(e, t) {
		return e instanceof RegExp ? H(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, Qt = function(e, t, n) {
		if (!Ae[t] && an(t) && Zt(E.tagNameCheck, t)) return !1;
		if (Je && !Qe[t] && !Qe[Za(t)]) {
			let t = _(e), r = g(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return Et(e), !0;
	}, $t = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? fo(t) : t;
	}, en = function(e, t) {
		return e === t || _(e) !== null ? !1 : (Ye && Mt(e), !0);
	}, tn = function(e, n) {
		if (Rt(e), Yt(x.beforeSanitizeElements, e, null), en(e, n)) return !0;
		if (Kt(e)) return Et(e), !0;
		let r = A(ie(e));
		if (w = $t(x.uponSanitizeElement, w, Oe, Ve), Yt(x.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: w
		}), en(e, n)) return !0;
		if (Xt(e, r)) return Et(e), !0;
		if (Ae[r] || !(Me.tagCheck instanceof Function && Me.tagCheck(r)) && !w[r]) {
			let t = Qt(e, r, n);
			return t === !1 && (Yt(x.afterSanitizeElements, e, null), en(e, n)) ? !0 : t;
		}
		if (y(e) === G.element && !Tt(e) || (r === "noscript" || r === "noembed" || r === "noframes") && H(Bo, e.innerHTML)) return Et(e), !0;
		if (Le && e.nodeType === G.text) {
			let n = Ut(e.textContent);
			e.textContent !== n && (Wa(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return Yt(x.afterSanitizeElements, e, null), en(e, n);
	}, nn = function(e, t, r) {
		if (je[t] || zt(t, e) || Ge && (t === "id" || t === "name") && (r in n || r in vt)) return !1;
		let i = T[t] || Me.attributeCheck instanceof Function && Me.attributeCheck(t, e);
		return Pe && H(we, t) || Ne && H(S, t) ? !0 : i ? nt[t] || H(De, eo(r, Ee, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && to(r, "data:") === 0 && et[e] || Fe && !H(Te, eo(r, Ee, "")) ? !0 : !r : an(e) && Zt(E.tagNameCheck, e) && Zt(E.attributeNameCheck, t, e) || t === "is" && E.allowCustomizedBuiltInElements && Zt(E.tagNameCheck, r);
	}, rn = W({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), an = function(e) {
		return !rn[Za(e)] && H(C, e);
	}, on = function(e, t, n, r) {
		if (b && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return fe(r);
			case "TrustedScriptURL": return pe(r);
		}
		return r;
	}, sn = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !Kt(e) || (Et(e), !1);
		} catch {
			return kt(t, e), !1;
		}
	}, cn = function(e, t) {
		return Re && H(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, t) ? !0 : Za(e) === "attributename" && $a(t, "href") !== null;
	}, ln = function(e, n) {
		if (Yt(x.beforeSanitizeAttributes, e, null), en(e, n)) return;
		let r = e.attributes;
		if (!r || Kt(e)) return;
		T = $t(x.uponSanitizeAttribute, T, ke, He);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: T,
			forceKeepAttr: void 0
		}, a = r.length, o = A(e.nodeName);
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = A(s), d = l, f = s === "value" ? d : no(d), p = !1;
			i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, Yt(x.uponSanitizeAttribute, e, i), f = i.attrValue, Ke && (u === "id" || u === "name") && to(f, qe) !== 0 && (kt(s, e, n), f = qe + f, p = !0), cn(s, f) ? kt(s, e, n) : i.forceKeepAttr || (i.keepAttr ? !Ie && H(Vo, f) ? kt(s, e, n) : (Le && (f = Ut(f)), nn(o, u, f) ? (f = on(o, u, c, f), f !== d && sn(e, s, c, f) && p && Ua(t.removed)) : kt(s, e, n)) : kt(s, e, n));
		}
		Yt(x.afterSanitizeAttributes, e, null), en(e, n);
	}, un = function(e) {
		let t = null, n = Ht(e);
		for (Yt(x.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (Yt(x.uponSanitizeShadowNode, t, null), tn(t, e), ln(t, e), qt(t.content) && un(t.content), y(t) === G.element) {
			let e = ee(t);
			qt(e) && (dn(e), un(e));
		}
		Le && Gt(e), Yt(x.afterSanitizeShadowDOM, e, null);
	}, dn = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				un(e.shadow);
				continue;
			}
			let n = e.node, r = y(n) === G.element, i = g(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = ne ? ne(n) : null;
				if (typeof e == "string" && A(e) === "template") {
					let e = n.content;
					qt(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = ee(n);
				qt(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (ct = !e, ct && (e = "<!-->"), typeof e != "string" && !Jt(e) && (e = po(e), typeof e != "string")) throw co("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Be ? (w = Ve, T = He) : bt(n), (x.uponSanitizeElement.length > 0 || x.uponSanitizeAttribute.length > 0) && (w = fo(w)), x.uponSanitizeAttribute.length > 0 && (T = fo(T)), t.removed = [];
		let c = Ye && typeof e != "string" && Jt(e), l = [], u = Xe;
		if (c) {
			Bt(e);
			let t = ie(e);
			if (typeof t == "string") {
				let n = A(t);
				if (!w[n] || Ae[n]) throw Ot(e), co("root node is forbidden and cannot be sanitized in-place");
			}
			if (Kt(e)) throw Ot(e), co("root node is clobbered and cannot be sanitized in-place");
			l = Nt(e), Xe = Ja();
		} else if (Jt(e)) i = Vt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === G.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), dn(i);
		else {
			if (!We && !Le && !ze && e.indexOf("<") === -1) return b && O ? fe(e) : e;
			if (i = Vt(e), !i) return We ? null : O ? se : "";
		}
		i && Ue && Et(i.firstChild);
		let d = c ? e : i;
		try {
			c && dn(e);
			let t = Ht(d);
			for (; o = t.nextNode();) tn(o, d), ln(o, d), qt(o.content) && un(o.content);
			c && It(e, l);
		} catch (t) {
			throw c && (Ot(e), Ft(e, l)), t;
		} finally {
			Xe = u;
		}
		if (c) {
			if (Ft(e, l)) throw co("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return Le && Wt(e), e;
		}
		if (We) {
			if (Le && Wt(i), D) for (s = ve.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (T.shadowroot || T.shadowrootmode) && (s = be.call(r, s, !0)), s;
		}
		let f = ze ? i.outerHTML : i.innerHTML;
		return ze && w["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && H(Io, i.ownerDocument.doctype.name) && (f = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + f), Le && (f = Ut(f)), b && O ? fe(f) : f;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		bt(e), Be = !0, Ve = w, He = T;
	}, t.clearConfig = function() {
		_t = null, Be = !1, Ve = null, He = null, b = ce, se = "";
	}, t.isValidAttribute = function(e, t, n) {
		_t || bt({});
		let r = A(e), i = A(t);
		return typeof n == "string" && (cn(t, n) || !Ie && H(Vo, n)) ? !1 : nn(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && V(x, e) && Wa(x[e], t);
	}, t.removeHook = function(e, t) {
		if (V(x, e)) {
			if (t !== void 0) {
				let n = Ha(x[e], t);
				return n === -1 ? void 0 : Ka(x[e], n, 1)[0];
			}
			return Ua(x[e]);
		}
	}, t.removeHooks = function(e) {
		V(x, e) && (x[e] = []);
	}, t.removeAllHooks = function() {
		x = Go();
	}, t;
}
var Yo = Jo();
//#endregion
//#region node_modules/marked/lib/marked.esm.js
function Xo() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var Zo = Xo();
function Qo(e) {
	Zo = e;
}
var $o = { exec: () => null };
function es(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function K(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(q.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var ts = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), q = {
	codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	endingSpaceTabChar: /[ \t]$/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	leadingSpaceTab: /^[ \t]+/,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,
	numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: es((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: es((e) => RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: es((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: es((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: es((e) => RegExp(`^ {0,${e}}(?:</?(?:${gs})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")),
	blockquoteBeginRegex: es((e) => RegExp(`^ {0,${e}}>`))
}, ns = /^(?:[ \t]*(?:\n|$))+/, rs = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, is = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, as = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, os = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ss = / {0,3}(?:[*+-]|\d{1,9}[.)])/, cs = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, ls = K(cs).replace(/bull/g, ss).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), us = K(cs).replace(/bull/g, ss).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ds = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, fs = /^[^\n]+/, ps = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, ms = K(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ps).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), hs = K(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, ss).getRegex(), gs = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", _s = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, vs = K("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", _s).replace("tag", gs).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ys = (e) => K(ds).replace("hr", as).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", gs).getRegex(), bs = ys(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), xs = ys(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), Ss = {
	blockquote: K(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", xs).getRegex(),
	code: rs,
	def: ms,
	fences: is,
	heading: os,
	hr: as,
	html: vs,
	lheading: ls,
	list: hs,
	newline: ns,
	paragraph: bs,
	table: $o,
	text: fs
}, Cs = K("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", as).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", gs).getRegex(), ws = {
	...Ss,
	lheading: us,
	table: Cs,
	paragraph: K(ds).replace("hr", as).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Cs).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", gs).getRegex()
}, Ts = {
	...Ss,
	html: K("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", _s).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: $o,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: K(ds).replace("hr", as).replace("heading", " *#{1,6} *[^\n]").replace("lheading", ls).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Es = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ds = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Os = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, ks = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, As = /[\p{P}\p{S}]/u, js = /[\s\p{P}\p{S}]/u, Ms = /[^\s\p{P}\p{S}]/u, Ns = K(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, js).getRegex(), Ps = /[\p{Pi}\p{Ps}"']/u, Fs = /(?!~)[\p{P}\p{S}]/u, Is = /(?!~)[\s\p{P}\p{S}]/u, Ls = /(?:[^\s\p{P}\p{S}]|~)/u, Rs = K(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", ts ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), zs = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, Bs = K(zs, "u").replace(/punct/g, As).getRegex(), Vs = K(zs, "u").replace(/punct/g, Fs).getRegex(), Hs = K(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, Ps).replace(/punct/g, As).getRegex(), Us = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Ws = K(Us, "gu").replace(/notPunctSpace/g, Ms).replace(/punctSpace/g, js).replace(/punct/g, As).getRegex(), Gs = K(Us, "gu").replace(/notPunctSpace/g, Ls).replace(/punctSpace/g, Is).replace(/punct/g, Fs).getRegex(), Ks = K("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Ms).replace(/punctSpace/g, js).replace(/punct/g, As).getRegex(), qs = K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Ms).replace(/punctSpace/g, js).replace(/punct/g, As).getRegex(), Js = K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Ms).replace(/punctSpace/g, js).replace(/punct/g, As).getRegex(), Ys = K(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, As).getRegex(), Xs = K("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Ms).replace(/punctSpace/g, js).replace(/punct/g, As).getRegex(), Zs = K(/\\(punct)/, "gu").replace(/punct/g, As).getRegex(), Qs = K(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, As).getRegex(), $s = K(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ec = K(_s).replace("(?:-->|$)", "-->").getRegex(), tc = K("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ec).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), nc = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, rc = K(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", nc).getRegex(), ic = K(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", rc).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ac = K(/^!?\[(label)\]\[(ref)\]/).replace("label", rc).replace("ref", ps).getRegex(), oc = K(/^!?\[(ref)\](?:\[\])?/).replace("ref", ps).getRegex(), sc = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, cc = K(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", nc).getRegex(), lc = K("reflink|nolink(?!\\()", "g").replace("reflink", K(/^!?\[(label)\]\[(ref)\]/).replace("label", cc).replace("ref", sc).getRegex()).replace("nolink", K(/^!?\[(ref)\](?:\[\])?/).replace("ref", sc).getRegex()).getRegex(), uc = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, dc = K(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), fc = {
	_backpedal: $o,
	anyPunctuation: Zs,
	anyPunctuationOutsideCode: Qs,
	autolink: $s,
	blockSkip: Rs,
	br: Os,
	code: Ds,
	del: $o,
	delLDelim: $o,
	delRDelim: $o,
	emStrongLDelim: Bs,
	emStrongRDelimAst: Ws,
	emStrongRDelimUnd: qs,
	escape: Es,
	link: ic,
	nolink: oc,
	punctuation: Ns,
	reflink: ac,
	reflinkSearch: lc,
	tag: tc,
	text: ks,
	url: $o
}, pc = {
	...fc,
	emStrongLDelim: Hs,
	emStrongRDelimAst: Ks,
	emStrongRDelimUnd: Js,
	link: K(/^!?\[(label)\]\((.*?)\)/).replace("label", rc).getRegex(),
	reflink: K(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", rc).getRegex()
}, mc = {
	...fc,
	emStrongRDelimAst: Gs,
	emStrongLDelim: Vs,
	delLDelim: Ys,
	delRDelim: Xs,
	url: K(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", dc).replace("protocol", uc).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: K(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", uc).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex()
}, hc = {
	...mc,
	br: K(Os).replace("{2,}", "*").getRegex(),
	text: K(mc.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, gc = {
	normal: Ss,
	gfm: ws,
	pedantic: Ts
}, _c = {
	normal: fc,
	gfm: mc,
	breaks: hc,
	pedantic: pc
}, vc = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, yc = (e) => vc[e];
function bc(e, t) {
	if (t) {
		if (q.escapeTest.test(e)) return e.replace(q.escapeReplace, yc);
	} else if (q.escapeTestNoEncode.test(e)) return e.replace(q.escapeReplaceNoEncode, yc);
	return e;
}
function xc(e) {
	return q.numericCharacterReference.test(e) ? e.replace(q.numericCharacterReferenceOrAmpersand, (e, t, n) => {
		if (t === void 0 && n === void 0) return "&amp;";
		let r = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return r === 0 || r > 1114111 || r >= 55296 && r <= 57343 ? "�" : r === 38 ? "&amp;" : String.fromCodePoint(r);
	}) : e;
}
function Sc(e) {
	try {
		e = encodeURI(e).replace(q.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function Cc(e, t) {
	let n = e.replace(q.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(q.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(q.slashPipe, "|");
	return n;
}
function wc(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function Tc(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && q.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function Ec(e) {
	return e.trim().toLowerCase().toUpperCase().toLowerCase();
}
function Dc(e, t) {
	if (e.indexOf(t[0]) === -1 && e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function Oc(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function kc(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1"), c = e[0].charAt(0) === "!", l = r.state.inLink, u = r.state.linkEmitted, d = r.state.inRawBlock;
	r.state.inLink = !0, r.state.linkEmitted = !1;
	let f = r.inlineTokens(s), p = r.state.linkEmitted;
	if (r.state.linkEmitted = u, r.state.inLink = l, !c) {
		if (p) {
			r.state.inRawBlock = d;
			return;
		}
		r.state.linkEmitted = !0;
	}
	return {
		type: c ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: f
	};
}
function Ac(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return e.slice(Math.min(r.length, i.length));
	}).join("\n");
}
function jc(e, t, n, r) {
	if (!t.includes("<")) return !1;
	for (let i = 0; i < t.length; i++) {
		if (t[i] === "\\") {
			i++;
			continue;
		}
		if (t[i] === "`") {
			let e = r.inline.code.exec(t.slice(i));
			if (e) {
				i += e[0].length - 1;
				continue;
			}
		}
		if (t[i] !== "<") continue;
		let a = e.slice(n + i), o = r.inline.tag.exec(a) || r.inline.autolink.exec(a);
		if (o) {
			if (o[0].length > t.length - i) return !0;
			i += o[0].length - 1;
		}
	}
	return !1;
}
var Mc = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || Zo;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = this.options.pedantic ? t[0] : Tc(t[0]);
			return {
				type: "code",
				raw: e,
				codeBlockStyle: "indented",
				text: e.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = Ac(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = wc(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceTabChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: wc(t[0], "\n"),
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: wc(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = wc(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o = 0;
				for (; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code" || u?.type === "heading" || u?.type === "hr" || u?.type === "html") break;
				if (u?.type === "blockquote") {
					let t = u, a = e.join("\n"), o = t.raw + "\n" + a.replace(this.rules.other.blockquoteSetextReplace2, ""), s = this.blockquote(o);
					i[i.length - 1] = s;
					let c = o.substring(s.raw.length).replace(/^\n/, ""), l = c ? c.split("\n").length : 0, d = l ? e.slice(0, -l) : e;
					d.length > 0 && (n = `${n}
${d.join("\n")}`), r = r.substring(0, r.length - t.text.length) + s.text;
					break;
				}
				if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - u.raw.length) + o.raw, r = r.substring(0, r.length - t.raw.length) + o.raw, e = a.substring(i.at(-1).raw.length).split("\n");
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = e, r = () => n.length - e.length, i = t[1].trim(), a = i.length > 1, o = {
				type: "list",
				raw: "",
				ordered: a,
				start: a ? +i.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			i = a ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = a ? i : "[*+-]");
			let s = this.rules.other.listItemRegex(i), c = !1;
			for (; e;) {
				let i = !1, a = "";
				if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
				let l = r();
				e = e.substring(t[0].length);
				let u = t[2].split("\n", 1)[0], d = t[1].length, f = this.options.pedantic ? Oc(u, d) : u.replace(this.rules.other.leadingSpaceTab, (e) => Oc(e, d)), p = e.split("\n", 1)[0], m = !f.trim(), h = 0;
				if (this.options.pedantic ? (h = 2, a = f.trimStart()) : m ? h = d + 1 : (h = f.search(this.rules.other.nonSpaceChar), h = h > 4 ? 1 : h, a = f.slice(h), h += d), m && this.rules.other.blankLine.test(p) && (e = e.substring(p.length + 1), i = !0), !i) {
					let t = this.rules.other.nextBulletRegex(h), n = this.rules.other.hrRegex(h), r = this.rules.other.fencesBeginRegex(h), i = this.rules.other.headingBeginRegex(h), o = this.rules.other.htmlBeginRegex(h), s = this.rules.other.blockquoteBeginRegex(h);
					for (; e;) {
						let c = e.split("\n", 1)[0], l;
						if (p = c, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), l = p) : l = p.replace(this.rules.other.leadingSpaceTab, (e) => Oc(e)), r.test(p) || i.test(p) || o.test(p) || s.test(p) || t.test(p) || n.test(p)) break;
						if (l.search(this.rules.other.nonSpaceChar) >= h || !p.trim()) a += "\n" + l.slice(h);
						else {
							if (m || f.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || r.test(f) || i.test(f) || n.test(f)) break;
							a += "\n" + p;
						}
						m = !p.trim(), e = e.substring(c.length + 1), f = l.slice(h);
					}
				}
				let g = n.slice(l, r());
				o.loose || (c ? o.loose = !0 : this.rules.other.doubleBlankLine.test(g) && (c = !0)), o.items.push({
					type: "list_item",
					raw: g,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(a),
					loose: !1,
					text: a,
					tokens: []
				});
			}
			let l = o.items.at(-1);
			if (l) l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
			else return;
			o.raw = n.slice(0, r()).trimEnd();
			for (let e of o.items) if (this.lexer.state.top = !1, e.tokens = this.lexer.blockTokens(e.text, []), !o.loose) {
				let t = e.tokens.filter((e) => e.type === "space");
				o.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
			}
			for (let e of o.items) {
				let t = e.tokens[0];
				if (e.task && (t?.type === "text" || t?.type === "paragraph")) {
					e.text = e.text.replace(this.rules.other.listReplaceTask, ""), t.raw = t.raw.replace(this.rules.other.listReplaceTask, ""), t.text = t.text.replace(this.rules.other.listReplaceTask, "");
					for (let e = this.lexer.inlineQueue.length - 1; e >= 0; e--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)) {
						this.lexer.inlineQueue[e].src = this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let n = this.rules.other.listTaskCheckbox.exec(e.raw);
					if (n) {
						let t = {
							type: "checkbox",
							raw: n[0] + " ",
							checked: n[0] !== "[ ]"
						};
						e.checked = t.checked, o.loose ? e.tokens[0] && ["paragraph", "text"].includes(e.tokens[0].type) && "tokens" in e.tokens[0] && e.tokens[0].tokens ? (e.tokens[0].raw = t.raw + e.tokens[0].raw, e.tokens[0].text = t.raw + e.tokens[0].text, e.tokens[0].tokens.unshift(t)) : e.tokens.unshift({
							type: "paragraph",
							raw: t.raw,
							text: t.raw,
							tokens: [t]
						}) : e.tokens.unshift(t);
					}
				} else e.task &&= !1;
			}
			if (o.loose) for (let e of o.items) {
				e.loose = !0;
				for (let t of e.tokens) t.type === "text" && (t.type = "paragraph");
			}
			return o;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let e = Tc(t[0]);
			return {
				type: "html",
				block: !0,
				raw: e,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: e
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			if (!this.rules.other.startAngleBracket.test(t[2]) && Dc(t[2], "()") !== -1) return;
			let e = Ec(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: wc(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = Cc(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: wc(t[0], "\n"),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push(Cc(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let e = t[1].trim();
			return {
				type: "heading",
				raw: wc(t[0], "\n"),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		if (this.lexer.state.linkParenPossible === !1) return;
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let n = t[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && jc(e, t[1], n, this.rules)) return;
			let r = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
				if (!this.rules.other.endAngleBracket.test(r)) return;
				let e = wc(r.slice(0, -1), "\\");
				if ((r.length - e.length) % 2 == 0) return;
			} else {
				let e = Dc(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let i = t[2], a = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(i);
				e && (i = e[1], a = e[3]);
			} else a = t[3] ? t[3].slice(1, -1) : "";
			return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (i = this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? i.slice(1) : i.slice(1, -1)), kc(t, {
				href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
				title: a && a.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let r = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && jc(e, n[1], r, this.rules)) return;
			let i = t[Ec((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
			if (!i) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return kc(n, i, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!(!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[3]) || !n || this.rules.inline.punctuation.exec(n))) {
			let i = [...r[0]].length - 1, a, o, s = i, c = 0, l = r[0][0], u = n === l, d = l === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (r = d.exec(t)) !== null;) {
				if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
				if (o = [...a].length, r[3] || r[4]) {
					s += o;
					continue;
				}
				if (r[5] || r[6]) {
					if (i % 3 && !((i + o) % 3)) {
						c += o;
						continue;
					}
					if (u) break;
				}
				if (s -= o, s > 0) continue;
				o = Math.min(o, o + s + c);
				let t = [...r[0]][0].length, n = e.slice(0, i + r.index + t + o);
				if (Math.min(i, o) % 2) {
					let e = n.slice(1, -1);
					return {
						type: "em",
						raw: n,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = n.slice(2, -2);
				return {
					type: "strong",
					raw: n,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let r = this.rules.inline.delLDelim.exec(e);
		if (r && (!r[1] || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = this.rules.inline.delRDelim;
			for (s.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = s.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i || (a = [...i].length, a !== n)) continue;
				if (r[3] || r[4]) {
					o += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o);
				let t = [...r[0]][0].length, s = e.slice(0, n + r.index + t + a), c = s.slice(n, -n);
				return {
					type: "del",
					raw: s,
					text: c,
					tokens: this.lexer.inlineTokens(c)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: e ? t[0] : xc(t[0]),
				escaped: e
			};
		}
	}
}, Nc = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || Zo, this.options.tokenizer = this.options.tokenizer || new Mc(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			linkParenPossible: !0,
			top: !0
		};
		let t = {
			other: q,
			block: gc.normal,
			inline: _c.normal
		};
		this.options.pedantic ? (t.block = gc.pedantic, t.inline = _c.pedantic) : this.options.gfm && (t.block = gc.gfm, t.inline = this.options.breaks ? _c.breaks : _c.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: gc,
			inline: _c
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(q.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(q.tabCharGlobal, "    ").replace(q.spaceLine, ""));
		let r = 1 / 0;
		for (; e;) {
			if (e.length < r) r = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let i;
			if (this.options.extensions?.block?.some((n) => (i = n.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1)) continue;
			if (i = this.tokenizer.space(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				i.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(i);
				continue;
			}
			if (i = this.tokenizer.code(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if ((i = this.tokenizer.fences(e)) || (i = this.tokenizer.heading(e)) || (i = this.tokenizer.hr(e)) || (i = this.tokenizer.blockquote(e)) || (i = this.tokenizer.list(e)) || (i = this.tokenizer.html(e))) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.def(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.raw, this.inlineQueue.at(-1).src = n.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
					href: i.href,
					title: i.title
				}, t.push(i));
				continue;
			}
			if ((i = this.tokenizer.table(e)) || (i = this.tokenizer.lheading(e))) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startBlock) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (a = e.substring(0, t + 1));
			}
			if (this.state.top && (i = this.tokenizer.paragraph(a))) {
				let r = t.at(-1);
				n && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith("\n") ? "" : "\n") + i.raw, r.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(i), n = a.length !== e.length, e = e.substring(i.raw.length);
			} else if (i = this.tokenizer.text(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(i);
			} else if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	linkInText(e) {
		if (!e.includes("[")) return !1;
		let t = this.tokenizer.rules.inline.link;
		for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
		for (let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
			let e = t[0], n = e.lastIndexOf("[");
			if (e.charAt(0) !== "!" && Object.hasOwn(this.tokens.links, Ec(e.slice(n + 1, -1))) && !(n > 1 && this.linkInText(e.slice(1, n - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = this.state.linkParenPossible;
		this.state.linkParenPossible = n && e.includes(")");
		try {
			return this.#e(e, t);
		} finally {
			this.state.linkParenPossible = n;
		}
	}
	#e(e, t) {
		let n = e;
		if (this.tokens.links && e.includes("[")) {
			let e = this.tokenizer.rules.inline.reflinkSearch, t = (n) => {
				let r = n.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, Ec(n.slice(r + 1, -1)))) return n;
				if (r > 1 && n.charAt(0) !== "!") {
					let i = n.slice(1, r - 1);
					if (this.linkInText(i)) return "[" + i.replace(e, t) + "][" + "a".repeat(n.length - r - 2) + "]";
				}
				return "[" + "a".repeat(n.length - 2) + "]";
			};
			n = n.replace(e, t);
		}
		n = n.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (e, t, n) => n ? "+".repeat(e.length) : t ? t + e.slice(t.length, -t.length).replace(/`/g, "+") + t : e), n = n.replace(this.tokenizer.rules.inline.blockSkip, (e, t, n) => {
			let r = n ? n.length : 0;
			return e.slice(0, r) + "[" + "a".repeat(e.length - r - 2) + "]";
		}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let r = !1, i = "", a = 1 / 0;
		for (; e;) {
			if (e.length < a) a = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			r || (i = ""), r = !1;
			let o;
			if (this.options.extensions?.inline?.some((n) => (o = n.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1)) continue;
			if ((o = this.tokenizer.escape(e)) || (o = this.tokenizer.tag(e)) || (o = this.tokenizer.link(e))) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(o.raw.length);
				let n = t.at(-1);
				o.type === "text" && n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if ((o = this.tokenizer.emStrong(e, n, i)) || (o = this.tokenizer.codespan(e)) || (o = this.tokenizer.br(e)) || (o = this.tokenizer.del(e, n, i)) || (o = this.tokenizer.autolink(e)) || !this.state.inLink && (o = this.tokenizer.url(e))) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			let s = e;
			if (this.options.extensions?.startInline) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
			}
			if (o = this.tokenizer.inlineText(s)) {
				e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (i = o.raw.slice(-1)), r = !0;
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
			} else if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw Error(t);
	}
}, Pc = class {
	options;
	parser;
	constructor(e) {
		this.options = e || Zo;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(q.notSpaceStart)?.[0], i = e ? e.replace(q.endingNewline, "") + "\n" : "";
		return r ? "<pre><code class=\"language-" + bc(r) + "\">" + (n ? i : bc(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : bc(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r &&= `<tbody>${r}</tbody>`, "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${bc(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: r, autolink: i }) {
		let a = i ? bc(n, !0) : this.parser.parseInline(r), o = Sc(e);
		if (o === null) return a;
		e = bc(o, i);
		let s = "<a href=\"" + e + "\"";
		return t && (s += " title=\"" + bc(t) + "\""), s += ">" + a + "</a>", s;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = Sc(e);
		if (i === null) return bc(n);
		e = i;
		let a = `<img src="${bc(e)}" alt="${bc(n)}"`;
		return t && (a += ` title="${bc(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : bc(e.text);
	}
}, Fc = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
}, Ic = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || Zo, this.options.renderer = this.options.renderer || new Pc(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Fc();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (this.options.extensions?.renderers?.[r.type]) {
				let e = r, n = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (n !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					t += n || "";
					continue;
				}
			}
			let i = r;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "checkbox":
					n += t.checkbox(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, Lc = class {
	options;
	block;
	constructor(e) {
		this.options = e || Zo;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? Nc.lex : Nc.lexInline;
	}
	provideParser(e = this.block) {
		return e ? Ic.parse : Ic.parseInline;
	}
};
function Rc(e, t) {
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e.push(t[n]);
	else e.push(t);
}
var zc = class {
	defaults = Xo();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = Ic;
	Renderer = Pc;
	TextRenderer = Fc;
	Lexer = Nc;
	Tokenizer = Mc;
	Hooks = Lc;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (Rc(n, t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) Rc(n, this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) Rc(n, this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				Rc(n, this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					Rc(n, this.walkTokens(i, t));
				}) : e.tokens && Rc(n, this.walkTokens(e.tokens, t));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new Pc(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new Mc(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new Lc();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = Lc.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && Lc.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : (...e) => {
						if (this.defaults.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && Rc(n, t.call(this, e)), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return Nc.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return Ic.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? Nc.lex : Nc.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? Ic.parse : Ic.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? Nc.lex : Nc.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? Ic.parse : Ic.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + bc(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}, Bc = new zc();
function J(e, t) {
	return Bc.parse(e, t);
}
J.options = J.setOptions = function(e) {
	return Bc.setOptions(e), J.defaults = Bc.defaults, Qo(J.defaults), J;
}, J.getDefaults = Xo, J.defaults = Zo;
function Vc(...e) {
	return Bc.use(...e), J.defaults = Bc.defaults, Qo(J.defaults), J;
}
J.use = Vc, J.walkTokens = function(e, t) {
	return Bc.walkTokens(e, t);
}, J.parseInline = Bc.parseInline, J.Parser = Ic, J.parser = Ic.parse, J.Renderer = Pc, J.TextRenderer = Fc, J.Lexer = Nc, J.lexer = Nc.lex, J.Tokenizer = Mc, J.Hooks = Lc, J.parse = J, J.options, J.setOptions, J.walkTokens, J.parseInline, Ic.parse, Nc.lex;
//#endregion
//#region src/markdown.ts
var Hc = new zc({
	gfm: !0,
	breaks: !0,
	async: !1
});
Yo.addHook("afterSanitizeAttributes", (e) => {
	e.tagName === "A" && (e.setAttribute("target", "_blank"), e.setAttribute("rel", "noopener noreferrer"));
});
var Uc = /* @__PURE__ */ new Map();
function Wc(e, t = !0) {
	if (t) {
		let t = Uc.get(e);
		if (t !== void 0) return t;
	}
	let n = Yo.sanitize(Hc.parse(e), {
		USE_PROFILES: { html: !0 },
		FORBID_TAGS: [
			"style",
			"form",
			"input",
			"button",
			"iframe",
			"img",
			"image",
			"video",
			"audio",
			"source",
			"picture",
			"track",
			"object",
			"embed",
			"link",
			"meta",
			"base",
			"svg",
			"math"
		],
		FORBID_ATTR: [
			"style",
			"src",
			"srcset",
			"poster",
			"background",
			"ping",
			"xlink:href",
			"formaction"
		]
	});
	return t && (Uc.size > 300 && Uc.clear(), Uc.set(e, n)), n;
}
//#endregion
//#region node_modules/tiny-markdown-editor/lib/grammar.js
var Gc = /* @__PURE__ */ e(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.commands = e.inlineGrammar = e.htmlBlockGrammar = e.lineGrammar = e.editorRegExp = e.punctuationTrailing = e.punctuationLeading = void 0, e.createMergedInlineGrammar = i, e.htmlescape = a;
	var t = {
		ASCIIPunctuation: /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\]/,
		NotTriggerChar: /[^`_*[\]()<>!~\n]/,
		Scheme: /[A-Za-z][A-Za-z0-9+.-]{1,31}/,
		Email: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/,
		HTMLOpenTag: /<HTMLTagName(?:HTMLAttribute)*\s*\/?>/,
		HTMLCloseTag: /<\/HTMLTagName\s*>/,
		HTMLTagName: /[A-Za-z][A-Za-z0-9-]*/,
		HTMLComment: /<!--(?:[^>-]|(?:[^>-](?:[^-]|-[^-])*[^-]))-->/,
		HTMLPI: /<\?(?:|.|(?:[^?]|\?[^>])*)\?>/,
		HTMLDeclaration: /<![A-Z]+\s[^>]*>/,
		HTMLCDATA: /<!\[CDATA\[.*?\]\]>/,
		HTMLAttribute: /\s+[A-Za-z_:][A-Za-z0-9_.:-]*(?:HTMLAttValue)?/,
		HTMLAttValue: /\s*=\s*(?:(?:'[^']*')|(?:"[^"]*")|(?:[^\s"'=<>`]+))/,
		KnownTag: /address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul/
	};
	e.punctuationLeading = /* @__PURE__ */ new RegExp(/^(?:[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])/), e.punctuationTrailing = /* @__PURE__ */ new RegExp(/(?:[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])$/), e.editorRegExp = {
		macPlatform: /Mac|iPod|iPhone|iPad/,
		lineSplit: /(?:\r\n|\r|\n)/,
		replacementPlaceholder: /(\${1,2})([0-9])/g,
		inlineContentPlaceholder: /\$\$([0-9])/,
		inlineReplacementPlaceholder: /\$([1-9])/g,
		blankContent: /^\s*$/,
		leadingWhitespace: /^\s/,
		trailingWhitespace: /\s$/,
		leadingWhitespaceRun: /^\s+/,
		surroundingWhitespace: /^(?<leading>\s*).*\S(?<trailing>\s*)$/,
		taskListItem: /^(\[)([ xX])(\])(\s|$)([\s\S]*)$/,
		orderedListNumber: /\d{1,9}/,
		inlineTagName: /^<\s*([a-zA-Z][a-zA-Z0-9]*)/,
		changeEvent: /^(?:change|input)$/i,
		selectionEvent: /^(?:selection|selectionchange)$/i,
		dropEvent: /^(?:drop)$/i,
		autolinkPrecedingChar: /[\s*_~(]/,
		emphasisDelimiter: /(^\*+)|(^_+)/,
		strikethroughDelimiter: /^~~/,
		autolinkScheme: /^(?:https?|ftp):\/\//i,
		autolinkWww: /^www\./i,
		autolinkDomain: /^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+/,
		autolinkPath: /^[^\s<]*/,
		autolinkProtocol: /^(?:mailto|xmpp):/i,
		autolinkXmpp: /^xmpp:/i,
		autolinkXmppResource: /^\/[a-zA-Z0-9@.\-_]+/,
		autolinkEmail: /^[a-zA-Z0-9.\-_+]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+/,
		emailTrailingChar: /[-_]$/,
		emailTld: /\.[a-zA-Z0-9]+$/,
		linkClosingBracket: /^\]/,
		openingAngle: /^</,
		closingAngle: /^>/,
		titleQuote: /^["']/,
		openingParen: /^\(/,
		closingParen: /^\)/,
		endsWithOpenAngle: /<$/,
		containsOpenAngle: /</,
		anyChar: /^./
	}, e.lineGrammar = {
		TMH1: {
			regexp: /^( {0,3}#\s)(.*?)((?:\s+#+\s*)?)$/,
			replacement: "<span class=\"TMMark TMMark_TMH1\">$1</span>$$2<span class=\"TMMark TMMark_TMH1\">$3</span>"
		},
		TMH2: {
			regexp: /^( {0,3}##\s)(.*?)((?:\s+#+\s*)?)$/,
			replacement: "<span class=\"TMMark TMMark_TMH2\">$1</span>$$2<span class=\"TMMark TMMark_TMH2\">$3</span>"
		},
		TMH3: {
			regexp: /^( {0,3}###\s)(.*?)((?:\s+#+\s*)?)$/,
			replacement: "<span class=\"TMMark TMMark_TMH3\">$1</span>$$2<span class=\"TMMark TMMark_TMH3\">$3</span>"
		},
		TMH4: {
			regexp: /^( {0,3}####\s)(.*?)((?:\s+#+\s*)?)$/,
			replacement: "<span class=\"TMMark TMMark_TMH4\">$1</span>$$2<span class=\"TMMark TMMark_TMH4\">$3</span>"
		},
		TMH5: {
			regexp: /^( {0,3}#####\s)(.*?)((?:\s+#+\s*)?)$/,
			replacement: "<span class=\"TMMark TMMark_TMH5\">$1</span>$$2<span class=\"TMMark TMMark_TMH5\">$3</span>"
		},
		TMH6: {
			regexp: /^( {0,3}######\s)(.*?)((?:\s+#+\s*)?)$/,
			replacement: "<span class=\"TMMark TMMark_TMH6\">$1</span>$$2<span class=\"TMMark TMMark_TMH6\">$3</span>"
		},
		TMBlockquote: {
			regexp: /^( {0,3}>[ ]?)(.*)$/,
			replacement: "<span class=\"TMMark TMMark_TMBlockquote\">$1</span>$$2"
		},
		TMCodeFenceBacktickOpen: {
			regexp: /^( {0,3}(?<seq>````*)\s*)([^`]*?)(\s*)$/,
			replacement: "<span class=\"TMMark TMMark_TMCodeFenceBacktick\">$1</span><span class=\"TMInfoString\">$3</span>$4"
		},
		TMCodeFenceTildeOpen: {
			regexp: /^( {0,3}(?<seq>~~~~*)\s*)(.*?)(\s*)$/,
			replacement: "<span class=\"TMMark TMMark_TMCodeFenceTilde\">$1</span><span class=\"TMInfoString\">$3</span>$4"
		},
		TMCodeFenceBacktickClose: {
			regexp: /^( {0,3}(?<seq>````*))(\s*)$/,
			replacement: "<span class=\"TMMark TMMark_TMCodeFenceBacktick\">$1</span>$3"
		},
		TMCodeFenceTildeClose: {
			regexp: /^( {0,3}(?<seq>~~~~*))(\s*)$/,
			replacement: "<span class=\"TMMark TMMark_TMCodeFenceTilde\">$1</span>$3"
		},
		TMBlankLine: {
			regexp: /^([ \t]*)$/,
			replacement: "$0"
		},
		TMSetextH1Marker: {
			regexp: /^ {0,3}=+\s*$/,
			replacement: "<span class=\"TMMark TMMark_TMSetextH1Marker\">$0</span>"
		},
		TMSetextH2Marker: {
			regexp: /^ {0,3}-+\s*$/,
			replacement: "<span class=\"TMMark TMMark_TMSetextH1Marker\">$0</span>"
		},
		TMHR: {
			regexp: /^( {0,3}(\*[ \t]*\*[ \t]*\*[ \t*]*)|(-[ \t]*-[ \t]*-[ \t-]*)|(_[ \t]*_[ \t]*_[ \t_]*))$/,
			replacement: "<span class=\"TMMark TMMark_TMHR\">$0</span>"
		},
		TMUL: {
			regexp: /^( {0,3}[+*-] {1,4})(.*)$/,
			replacement: "<span class=\"TMMark TMMark_TMUL\">$1</span>$$2"
		},
		TMOL: {
			regexp: /^( {0,3}\d{1,9}[.)] {1,4})(.*)$/,
			replacement: "<span class=\"TMMark TMMark_TMOL\">$1</span>$$2"
		},
		TMIndentedCode: {
			regexp: /^( {4}|\t)(.*)$/,
			replacement: "<span class=\"TMMark TMMark_TMIndentedCode\">$1</span>$2"
		},
		TMLinkReferenceDefinition: {
			regexp: /^( {0,3}\[\s*)([^\s\]](?:[^\]]|\\\])*?)(\s*\]:\s*)((?:[^\s<>]+)|(?:<(?:[^<>\\]|\\.)*>))?(\s*)((?:\((?:[^()\\]|\\.)*\))|(?:"(?:[^"\\]|\\.)*")|(?:'(?:[^'\\]|\\.)*'))?(\s*)$/,
			replacement: "<span class=\"TMMark TMMark_TMLinkReferenceDefinition\">$1</span><span class=\"TMLinkLabel TMLinkLabel_Definition\">$2</span><span class=\"TMMark TMMark_TMLinkReferenceDefinition\">$3</span><span class=\"TMLinkDestination\">$4</span>$5<span class=\"TMLinkTitle\">$6</span>$7",
			labelPlaceholder: 2
		}
	}, e.htmlBlockGrammar = [
		{
			start: /^ {0,3}<(?:script|pre|style)(?:\s|>|$)/i,
			end: /(?:<\/script>|<\/pre>|<\/style>)/i,
			paraInterrupt: !0
		},
		{
			start: /^ {0,3}<!--/,
			end: /-->/,
			paraInterrupt: !0
		},
		{
			start: /^ {0,3}<\?/,
			end: /\?>/,
			paraInterrupt: !0
		},
		{
			start: /^ {0,3}<![A-Z]/,
			end: />/,
			paraInterrupt: !0
		},
		{
			start: /^ {0,3}<!\[CDATA\[/,
			end: /\]\]>/,
			paraInterrupt: !0
		},
		{
			start: /^ {0,3}(?:<|<\/)(?:KnownTag)(?:\s|>|\/>|$)/i,
			end: !1,
			paraInterrupt: !0
		},
		{
			start: /^ {0,3}(?:HTMLOpenTag|HTMLCloseTag)\s*$/,
			end: !1,
			paraInterrupt: !1
		}
	], e.inlineGrammar = {
		escape: {
			regexp: /^\\(ASCIIPunctuation)/,
			replacement: "<span class=\"TMMark TMMark_TMEscape\">\\</span>$1"
		},
		code: {
			regexp: /^(`+)((?:[^`])|(?:[^`].*?[^`]))(\1)/,
			replacement: "<span class=\"TMMark TMMark_TMCode\">$1</span><code class=\"TMCode\">$2</code><span class=\"TMMark TMMark_TMCode\">$3</span>"
		},
		autolink: {
			regexp: /^<((?:Scheme:[^\s<>]*)|(?:Email))>/,
			replacement: "<span class=\"TMMark TMMark_TMAutolink\">&lt;</span><span class=\"TMAutolink\">$1</span><span class=\"TMMark TMMark_TMAutolink\">&gt;</span>"
		},
		html: {
			regexp: /^((?:HTMLOpenTag)|(?:HTMLCloseTag)|(?:HTMLComment)|(?:HTMLPI)|(?:HTMLDeclaration)|(?:HTMLCDATA))/,
			replacement: "<span class=\"TMHTML\">$1</span>"
		},
		linkOpen: {
			regexp: /^\[/,
			replacement: ""
		},
		imageOpen: {
			regexp: /^!\[/,
			replacement: ""
		},
		linkLabel: {
			regexp: /^(\[\s*)([^\]]*?)(\s*\])/,
			replacement: "",
			labelPlaceholder: 2
		},
		default: {
			regexp: /^(.|(?:NotTriggerChar+))/,
			replacement: "$1"
		}
	};
	var n = new RegExp(Object.keys(t).join("|")), r = [...Object.keys(e.inlineGrammar)];
	for (let i of r) {
		let r = e.inlineGrammar[i].regexp.source;
		for (; r.match(n);) r = r.replace(n, (e) => t[e].source);
		e.inlineGrammar[i].regexp = new RegExp(r, e.inlineGrammar[i].regexp.flags);
	}
	for (let r of e.htmlBlockGrammar) {
		let e = r.start.source;
		for (; e.match(n);) e = e.replace(n, (e) => t[e].source);
		r.start = new RegExp(e, r.start.flags);
	}
	function i(n = {}) {
		let r = { ...e.inlineGrammar };
		for (let [e, i] of Object.entries(n)) {
			let n = { ...i }, a = i.regexp.source, o = new RegExp(Object.keys(t).join("|"));
			for (; a.match(o);) a = a.replace(o, (e) => t[e].source);
			n.regexp = new RegExp(a, i.regexp.flags), r[e] = n;
		}
		return r;
	}
	function a(e) {
		return (e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	e.commands = {
		bold: {
			type: "inline",
			className: "TMStrong",
			set: {
				pre: "**",
				post: "**"
			},
			unset: {
				prePattern: /(?:\*\*|__)$/,
				postPattern: /^(?:\*\*|__)/
			}
		},
		italic: {
			type: "inline",
			className: "TMEm",
			set: {
				pre: "*",
				post: "*"
			},
			unset: {
				prePattern: /(?:\*|_)$/,
				postPattern: /^(?:\*|_)/
			}
		},
		code: {
			type: "inline",
			className: "TMCode",
			set: {
				pre: "`",
				post: "`"
			},
			unset: {
				prePattern: /`+$/,
				postPattern: /^`+/
			}
		},
		strikethrough: {
			type: "inline",
			className: "TMStrikethrough",
			set: {
				pre: "~~",
				post: "~~"
			},
			unset: {
				prePattern: /~~$/,
				postPattern: /^~~/
			}
		},
		h1: {
			type: "line",
			className: "TMH1",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "# $2"
			},
			unset: {
				pattern: /^( {0,3}#\s+)(.*?)((?:\s+#+\s*)?)$/,
				replacement: "$2"
			}
		},
		h2: {
			type: "line",
			className: "TMH2",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "## $2"
			},
			unset: {
				pattern: /^( {0,3}##\s+)(.*?)((?:\s+#+\s*)?)$/,
				replacement: "$2"
			}
		},
		h3: {
			type: "line",
			className: "TMH3",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "### $2"
			},
			unset: {
				pattern: /^( {0,3}###\s+)(.*?)((?:\s+#+\s*)?)$/,
				replacement: "$2"
			}
		},
		h4: {
			type: "line",
			className: "TMH4",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "#### $2"
			},
			unset: {
				pattern: /^( {0,3}####\s+)(.*?)((?:\s+#+\s*)?)$/,
				replacement: "$2"
			}
		},
		h5: {
			type: "line",
			className: "TMH5",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "##### $2"
			},
			unset: {
				pattern: /^( {0,3}#####\s+)(.*?)((?:\s+#+\s*)?)$/,
				replacement: "$2"
			}
		},
		h6: {
			type: "line",
			className: "TMH6",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "###### $2"
			},
			unset: {
				pattern: /^( {0,3}######\s+)(.*?)((?:\s+#+\s*)?)$/,
				replacement: "$2"
			}
		},
		ul: {
			type: "line",
			className: "TMUL",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "- $2"
			},
			unset: {
				pattern: /^( {0,3}[+*-] {1,4})(.*)$/,
				replacement: "$2"
			}
		},
		ol: {
			type: "line",
			className: "TMOL",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "$#. $2"
			},
			unset: {
				pattern: /^( {0,3}\d{1,9}[.)] {1,4})(.*)$/,
				replacement: "$2"
			}
		},
		blockquote: {
			type: "line",
			className: "TMBlockquote",
			set: {
				pattern: /^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,
				replacement: "> $2"
			},
			unset: {
				pattern: /^( {0,3}>[ ]?)(.*)$/,
				replacement: "$2"
			}
		}
	};
})), Kc = (/* @__PURE__ */ e(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Editor = void 0;
	var t = Gc();
	e.Editor = class {
		constructor(e = {}) {
			this.e = null, this.textarea = null, this.lines = [], this.lineElements = [], this.lineTypes = [], this.lineCaptures = [], this.lineReplacements = [], this.linkLabels = [], this.lineDirty = [], this.lastCommandState = null, this.customInlineGrammar = {}, this.mergedInlineGrammar = t.inlineGrammar, this.hasFocus = !0, this.lastSelection = null, this.cleanupFns = [], this.ownsElement = !1, this.elementOriginalStyle = null, this.textareaOriginalDisplay = null, this.destroyed = !1, this.listeners = {
				change: [],
				selection: [],
				drop: []
			}, this.undoStack = [], this.redoStack = [], this.isRestoringHistory = !1, this.maxHistory = 100, this.e = null, this.textarea = null, this.lines = [], this.lineElements = [], this.lineTypes = [], this.lineCaptures = [], this.lineReplacements = [], this.linkLabels = [], this.lineDirty = [], this.lastCommandState = null, this.hasFocus = !0, this.lastSelection = null, this.customInlineGrammar = e.customInlineGrammar || {}, this.mergedInlineGrammar = (0, t.createMergedInlineGrammar)(this.customInlineGrammar), this.listeners = {
				change: [],
				selection: [],
				drop: []
			};
			let n = null;
			typeof e.element == "string" ? n = document.getElementById(e.element) : e.element && (n = e.element), typeof e.textarea == "string" ? this.textarea = document.getElementById(e.textarea) : e.textarea && (this.textarea = e.textarea), this.textarea && (n ||= this.textarea), n ||= document.getElementsByTagName("body")[0], n && n.tagName === "TEXTAREA" && (this.textarea = n, n = this.textarea.parentNode), this.textarea && (this.textareaOriginalDisplay = this.textarea.style.display, this.textarea.style.display = "none"), this.placeholder = e.placeholder === void 0 ? this.textarea?.placeholder || void 0 : e.placeholder, this.undoStack = [], this.redoStack = [], this.isRestoringHistory = !1, this.maxHistory = 100, this.createEditorElement(n, e), this.setContent(typeof e.content == "string" ? e.content : this.textarea ? this.textarea.value : "# Hello TinyMDE!\nEdit **here**"), this.addListener(this.e, "keydown", (e) => this.handleUndoRedoKey(e));
		}
		get canUndo() {
			return this.undoStack.length >= 2;
		}
		get canRedo() {
			return this.redoStack.length > 0;
		}
		pushHistory() {
			this.isRestoringHistory || (this.pushCurrentState(), this.redoStack = []);
		}
		pushCurrentState() {
			this.undoStack.push({
				content: this.getContent(),
				selection: this.getSelection(),
				anchor: this.getSelection(!0)
			}), this.undoStack.length > this.maxHistory && this.undoStack.shift();
		}
		undo() {
			if (this.undoStack.length < 2) return;
			this.isRestoringHistory = !0, this.pushCurrentState();
			let e = this.undoStack.pop();
			this.redoStack.push(e);
			let t = this.undoStack[this.undoStack.length - 1];
			this.setContent(t.content), t.selection && this.setSelection(t.selection, t.anchor), this.undoStack.pop(), this.isRestoringHistory = !1;
		}
		redo() {
			if (!this.redoStack.length) return;
			this.isRestoringHistory = !0, this.pushCurrentState();
			let e = this.redoStack.pop();
			this.setContent(e.content), e.selection && this.setSelection(e.selection, e.anchor), this.isRestoringHistory = !1;
		}
		handleUndoRedoKey(e) {
			(t.editorRegExp.macPlatform.test(navigator.platform) ? e.metaKey : e.ctrlKey) && !e.altKey && (e.key === "z" || e.key === "Z" ? (e.shiftKey ? this.redo() : this.undo(), e.preventDefault()) : (e.key === "y" || e.key === "Y") && (this.redo(), e.preventDefault()));
		}
		createEditorElement(e, t) {
			t && t.editor !== void 0 ? this.e = typeof t.editor == "string" ? document.getElementById(t.editor) : t.editor : (this.e = document.createElement("div"), this.ownsElement = !0), this.ownsElement || (this.elementOriginalStyle = this.e.getAttribute("style")), this.e.classList.add("TinyMDE"), this.e.contentEditable = "true", this.e.style.whiteSpace = "pre-wrap", this.e.style.webkitUserModify = "read-write-plaintext-only", this.placeholder && this.e.setAttribute("data-placeholder", this.placeholder), t.editor === void 0 && (this.textarea && this.textarea.parentNode === e && this.textarea.nextSibling ? e.insertBefore(this.e, this.textarea.nextSibling) : e.appendChild(this.e)), this.addListener(this.e, "input", (e) => this.handleInputEvent(e)), this.addListener(this.e, "beforeinput", (e) => this.handleBeforeInputEvent(e)), this.addListener(this.e, "compositionend", (e) => this.handleInputEvent(e)), this.addListener(document, "selectionchange", (e) => {
				this.hasFocus && this.handleSelectionChangeEvent(e);
			}), this.addListener(this.e, "blur", () => this.hasFocus = !1), this.addListener(this.e, "focus", () => this.hasFocus = !0), this.addListener(this.e, "paste", (e) => this.handlePaste(e)), this.addListener(this.e, "drop", (e) => this.handleDrop(e)), this.addListener(this.e, "click", (e) => this.handleClick(e)), this.lineElements = this.e.childNodes;
		}
		setContent(e) {
			for (; this.e.firstChild;) this.e.removeChild(this.e.firstChild);
			this.lines = e.split(t.editorRegExp.lineSplit), this.lineDirty = [];
			for (let e = 0; e < this.lines.length; e++) {
				let e = document.createElement("div");
				this.e.appendChild(e), this.lineDirty.push(!0);
			}
			this.lineTypes = Array(this.lines.length), this.updateFormatting(), this.updatePlaceholder(), this.fireChange(), this.isRestoringHistory || this.pushHistory();
		}
		getContent() {
			return this.lines.join("\n");
		}
		updatePlaceholder() {
			this.placeholder && this.e && (this.getContent() === "" ? this.e.classList.add("TinyMDE_empty") : this.e.classList.remove("TinyMDE_empty"));
		}
		updateFormatting() {
			this.updateLineTypes(), this.updateLinkLabels(), this.applyLineTypes();
		}
		updateLinkLabels() {
			this.linkLabels = [];
			for (let e = 0; e < this.lines.length; e++) this.lineTypes[e] === "TMLinkReferenceDefinition" && this.linkLabels.push(this.lineCaptures[e][t.lineGrammar.TMLinkReferenceDefinition.labelPlaceholder]);
		}
		replace(e, n) {
			return e.replace(t.editorRegExp.replacementPlaceholder, (e, r, i) => r === "$" ? (0, t.htmlescape)(n[parseInt(i)]) : `<span class="TMInlineFormatted">${this.processInlineStyles(n[parseInt(i)])}</span>`);
		}
		applyLineTypes() {
			let e = 0;
			for (; e < this.lines.length;) if (this.isInlineGroupLeader(e)) {
				let t = this.lineTypes[e], n = e;
				for (; n + 1 < this.lines.length && this.isInlineContinuation(n + 1, t);) n++;
				this.applyInlineGroup(e, n), e = n + 1;
			} else this.applyLine(e), e++;
		}
		isInlineGroupLeader(e) {
			let t = this.lineTypes[e];
			return t === "TMPara" || t === "TMUL" || t === "TMOL" || t === "TMBlockquote" && !this.isBlankBlockquoteContent(e);
		}
		isInlineContinuation(e, t) {
			let n = this.lineTypes[e];
			return n === "TMPara" || n === "TMBlockquote" && t === "TMBlockquote" && !this.isBlankBlockquoteContent(e);
		}
		isBlankBlockquoteContent(e) {
			let n = this.lineCaptures[e], r = n && n[2] !== void 0 ? n[2] : "";
			return t.editorRegExp.blankContent.test(r);
		}
		applyLine(e) {
			let t = this.lineElements[e];
			if (this.lineDirty[e]) {
				let n = this.replace(this.lineReplacements[e], this.lineCaptures[e]);
				t.className = this.lineTypes[e], t.removeAttribute("style"), t.innerHTML = n === "" ? "<br />" : n, delete t.dataset.mlSig;
			}
			t.dataset.lineNum = e.toString();
		}
		applyInlineGroup(e, t) {
			let n = [], r = `${t - e}`;
			for (let i = e; i <= t; i++) {
				let e = this.inlineContentIndex(this.lineReplacements[i]);
				n.push(this.lineCaptures[i][e] === void 0 ? "" : this.lineCaptures[i][e]), r += `\x1f${this.lineTypes[i]}\x1f${this.lineReplacements[i]}\x1f${JSON.stringify(this.lineCaptures[i])}`;
			}
			let i = `${this.hashString(r)}`, a = !1;
			for (let n = e; n <= t; n++) if (this.lineDirty[n] || this.lineElements[n].dataset.mlSig !== i) {
				a = !0;
				break;
			}
			if (a) {
				let r = this.splitInlineHTMLByLine(this.processInlineStyles(n.join("\n")));
				for (let n = e; n <= t; n++) {
					let t = this.lineElements[n], a = r[n - e] || "", o = this.replaceWithInline(this.lineReplacements[n], this.lineCaptures[n], a);
					t.className = this.lineTypes[n], t.removeAttribute("style"), t.innerHTML = o === "" ? "<br />" : o, t.dataset.mlSig = i;
				}
			}
			for (let n = e; n <= t; n++) this.lineElements[n].dataset.lineNum = n.toString();
		}
		inlineContentIndex(e) {
			let n = t.editorRegExp.inlineContentPlaceholder.exec(e);
			return n ? parseInt(n[1]) : 0;
		}
		replaceWithInline(e, n, r) {
			return e.replace(t.editorRegExp.replacementPlaceholder, (e, i, a) => i === "$" ? (0, t.htmlescape)(n[parseInt(a)]) : `<span class="TMInlineFormatted">${r}</span>`);
		}
		splitInlineHTMLByLine(e) {
			let t = [], n = [], r = "", i = 0;
			for (; i < e.length;) {
				let a = e[i];
				if (a === "\n") {
					for (let e = n.length - 1; e >= 0; e--) r += `</${this.inlineTagName(n[e])}>`;
					t.push(r), r = n.join(""), i++;
				} else if (a === "<") {
					let t = e.indexOf(">", i);
					if (t < 0) {
						r += e.substr(i);
						break;
					}
					let a = e.substring(i, t + 1);
					r += a, a[1] === "/" ? n.pop() : a[a.length - 2] !== "/" && n.push(a), i = t + 1;
				} else r += a, i++;
			}
			return t.push(r), t;
		}
		inlineTagName(e) {
			let n = t.editorRegExp.inlineTagName.exec(e);
			return n ? n[1] : "span";
		}
		hashString(e) {
			let t = 5381;
			for (let n = 0; n < e.length; n++) t = ((t << 5) + t ^ e.charCodeAt(n)) >>> 0;
			return t;
		}
		updateLineTypes() {
			let e = !1, n = 0, r = !1;
			for (let i = 0; i < this.lines.length; i++) {
				let a = "TMPara", o = [this.lines[i]], s = "$$0";
				if (e === "TMCodeFenceBacktickOpen") {
					let r = t.lineGrammar.TMCodeFenceBacktickClose.regexp.exec(this.lines[i]);
					r && r.groups.seq.length >= n ? (a = "TMCodeFenceBacktickClose", s = t.lineGrammar.TMCodeFenceBacktickClose.replacement, o = r, e = !1) : (a = "TMFencedCodeBacktick", s = "<span class=\"TMFencedCode\">$0<br /></span>", o = [this.lines[i]]);
				} else if (e === "TMCodeFenceTildeOpen") {
					let r = t.lineGrammar.TMCodeFenceTildeClose.regexp.exec(this.lines[i]);
					r && r.groups.seq.length >= n ? (a = "TMCodeFenceTildeClose", s = t.lineGrammar.TMCodeFenceTildeClose.replacement, o = r, e = !1) : (a = "TMFencedCodeTilde", s = "<span class=\"TMFencedCode\">$0<br /></span>", o = [this.lines[i]]);
				}
				if (a === "TMPara" && r === !1) {
					for (let e of t.htmlBlockGrammar) if (this.lines[i].match(e.start) && (e.paraInterrupt || i === 0 || this.lineTypes[i - 1] !== "TMPara" && this.lineTypes[i - 1] !== "TMUL" && this.lineTypes[i - 1] !== "TMOL" && this.lineTypes[i - 1] !== "TMBlockquote")) {
						r = e;
						break;
					}
				}
				if (r !== !1 && (a = "TMHTMLBlock", s = "<span class=\"TMHTMLContent\">$0<br /></span>", o = [this.lines[i]], r.end ? this.lines[i].match(r.end) && (r = !1) : (i === this.lines.length - 1 || this.lines[i + 1].match(t.lineGrammar.TMBlankLine.regexp)) && (r = !1)), a === "TMPara") {
					for (let e in t.lineGrammar) if (t.lineGrammar[e].regexp) {
						let n = t.lineGrammar[e].regexp.exec(this.lines[i]);
						if (n) {
							a = e, s = t.lineGrammar[e].replacement, o = n;
							break;
						}
					}
				}
				if ((a === "TMCodeFenceBacktickOpen" || a === "TMCodeFenceTildeOpen") && (e = a, n = o.groups.seq.length), (a === "TMIndentedCode" || a === "TMLinkReferenceDefinition") && i > 0 && (this.lineTypes[i - 1] === "TMPara" || this.lineTypes[i - 1] === "TMUL" || this.lineTypes[i - 1] === "TMOL" || this.lineTypes[i - 1] === "TMBlockquote") && (a = "TMPara", o = [this.lines[i]], s = "$$0"), a === "TMSetextH2Marker") {
					let e = t.lineGrammar.TMUL.regexp.exec(this.lines[i]);
					e && (a = "TMUL", s = t.lineGrammar.TMUL.replacement, o = e);
				}
				if (a === "TMSetextH1Marker" || a === "TMSetextH2Marker") {
					if (i === 0 || this.lineTypes[i - 1] !== "TMPara") {
						let e = t.lineGrammar.TMHR.regexp.exec(this.lines[i]);
						e ? (a = "TMHR", o = e, s = t.lineGrammar.TMHR.replacement) : (a = "TMPara", o = [this.lines[i]], s = "$$0");
					} else {
						let e = i - 1, t = a === "TMSetextH1Marker" ? "TMSetextH1" : "TMSetextH2";
						do
							this.lineTypes[e] !== t && (this.lineTypes[e] = t, this.lineDirty[e] = !0), this.lineReplacements[e] = "$$0", this.lineCaptures[e] = [this.lines[e]], e--;
						while (e >= 0 && this.lineTypes[e] === "TMPara");
					}
				}
				if (a === "TMUL" || a === "TMOL") {
					let e = o[2] === void 0 ? "" : o[2], n = t.editorRegExp.taskListItem.exec(e);
					if (n) {
						let e = n[2] !== " ", t = a === "TMUL" ? "TMMark_TMUL" : "TMMark_TMOL", r = e ? "TMCheckbox TMCheckbox_checked" : "TMCheckbox TMCheckbox_unchecked";
						o = [
							o[0],
							o[1],
							n[1],
							n[2],
							n[3],
							n[4],
							n[5]
						], s = `<span class="TMMark ${t}">$1</span><span class="TMMark TMMark_TMTask">$2</span><span class="${r}">$3</span><span class="TMMark TMMark_TMTask">$4</span><span class="TMMark TMMark_TMTask">$5</span>$$6`;
					}
				}
				this.lineTypes[i] !== a && (this.lineTypes[i] = a, this.lineDirty[i] = !0), this.lineReplacements[i] = s, this.lineCaptures[i] = o;
			}
		}
		getSelection(e = !1) {
			let t = window.getSelection(), n = e ? t.anchorNode : t.focusNode;
			if (!n) return null;
			let r = e ? t.anchorOffset : t.focusOffset;
			if (n === this.e) return r < this.lines.length ? {
				row: r,
				col: 0
			} : {
				row: r - 1,
				col: this.lines[r - 1].length
			};
			let i = this.computeColumn(n, r);
			if (i === null) return null;
			let a = n;
			for (; a.parentElement !== this.e;) a = a.parentElement;
			let o = 0;
			if (a.previousSibling) {
				let e = a.dataset?.lineNum, t = a.previousSibling.dataset?.lineNum;
				if (e && t) {
					let n = parseInt(e);
					if (n === parseInt(t) + 1) o = n;
					else for (; a.previousSibling;) o++, a = a.previousSibling;
				}
			}
			return {
				row: o,
				col: i
			};
		}
		setSelection(e, t = null) {
			if (!e) return;
			let { node: n, offset: r } = this.computeNodeAndOffset(e.row, e.col, t ? t.row === e.row && t.col > e.col : !1), i = null, a = null;
			if (t && (t.row !== e.row || t.col !== e.col)) {
				let { node: n, offset: r } = this.computeNodeAndOffset(t.row, t.col, e.row === t.row && e.col > t.col);
				i = n, a = r;
			}
			window.getSelection().setBaseAndExtent(n, r, i || n, i ? a : r);
		}
		restoreLastSelection() {
			return this.lastSelection && this.lastSelection.focus ? (this.setSelection(this.lastSelection.focus, this.lastSelection.anchor), !0) : !1;
		}
		paste(e, n = null, r = null) {
			n ||= this.getSelection(!0), r ||= this.getSelection(!1);
			let i, a;
			r ||= {
				row: this.lines.length - 1,
				col: this.lines[this.lines.length - 1].length
			}, n ||= r, n.row < r.row || n.row === r.row && n.col <= r.col ? (i = n, a = r) : (i = r, a = n);
			let o = e.split(t.editorRegExp.lineSplit), s = this.lines[i.row].substr(0, i.col), c = this.lines[a.row].substr(a.col);
			o[0] = s.concat(o[0]);
			let l = o[o.length - 1].length;
			o[o.length - 1] = o[o.length - 1].concat(c), this.spliceLines(i.row, 1 + a.row - i.row, o), r.row = i.row + o.length - 1, r.col = l, this.updateFormatting(), this.setSelection(r), this.fireChange();
		}
		wrapSelection(e, t, n = null, r = null) {
			if (n ||= this.getSelection(!1), r ||= this.getSelection(!0), !n || !r || n.row !== r.row) return;
			this.isRestoringHistory || this.pushHistory(), this.lineDirty[n.row] = !0;
			let i = n.col < r.col ? n.col : r.col, a = n.col < r.col ? r.col : n.col, o = this.lines[n.row].substr(0, i).concat(e), s = a === i ? "" : this.lines[n.row].substr(i, a - i), c = t.concat(this.lines[n.row].substr(a));
			this.lines[n.row] = o.concat(s, c), r.col = o.length, n.col = r.col + s.length, this.updateFormatting(), this.setSelection(n, r), this.fireChange();
		}
		addEventListener(e, n) {
			e.match(t.editorRegExp.changeEvent) && this.listeners.change.push(n), e.match(t.editorRegExp.selectionEvent) && this.listeners.selection.push(n), e.match(t.editorRegExp.dropEvent) && this.listeners.drop.push(n);
		}
		removeEventListener(e, n) {
			e.match(t.editorRegExp.changeEvent) && (this.listeners.change = this.listeners.change.filter((e) => e !== n)), e.match(t.editorRegExp.selectionEvent) && (this.listeners.selection = this.listeners.selection.filter((e) => e !== n)), e.match(t.editorRegExp.dropEvent) && (this.listeners.drop = this.listeners.drop.filter((e) => e !== n));
		}
		addListener(e, t, n) {
			e.addEventListener(t, n), this.cleanupFns.push(() => e.removeEventListener(t, n));
		}
		destroy() {
			if (!this.destroyed) {
				this.destroyed = !0;
				for (let e of this.cleanupFns) e();
				if (this.cleanupFns = [], this.e) {
					if (this.ownsElement) this.e.parentNode && this.e.parentNode.removeChild(this.e);
					else {
						for (this.e.classList.remove("TinyMDE", "TinyMDE_empty"), this.e.removeAttribute("contenteditable"), this.e.removeAttribute("data-placeholder"); this.e.firstChild;) this.e.removeChild(this.e.firstChild);
						this.elementOriginalStyle ? this.e.setAttribute("style", this.elementOriginalStyle) : this.e.removeAttribute("style");
					}
				}
				this.textarea && (this.textarea.style.display = this.textareaOriginalDisplay ?? ""), this.listeners = {
					change: [],
					selection: [],
					drop: []
				}, this.e = null, this.textarea = null;
			}
		}
		fireChange() {
			if (this.updatePlaceholder(), !this.textarea && !this.listeners.change.length) return;
			let e = this.getContent();
			this.textarea && (this.textarea.value = e);
			for (let t of this.listeners.change) t({
				content: e,
				linesDirty: [...this.lineDirty]
			});
		}
		handleBeforeInputEvent(e) {
			let n = e;
			if (n.inputType === "deleteContentBackward" || n.inputType === "deleteContentForward") {
				let t = this.getSelection(), r = this.getSelection(!0);
				if (!t || !r) return;
				let i = n.inputType === "deleteContentBackward";
				if (t.row === r.row && t.col === r.col) {
					if (i && t.col === 0 && t.row > 0) {
						e.preventDefault(), this.isRestoringHistory || this.pushHistory(), this.clearDirtyFlag();
						let n = this.lines[t.row - 1].length;
						this.lines[t.row - 1] = this.lines[t.row - 1] + this.lines[t.row], this.lineDirty[t.row - 1] = !0, this.spliceLines(t.row, 1), this.updateFormatting(), this.setSelection({
							row: t.row - 1,
							col: n
						}), this.fireChange();
						return;
					}
					if (!i && t.col === this.lines[t.row].length && t.row < this.lines.length - 1) {
						e.preventDefault(), this.isRestoringHistory || this.pushHistory(), this.clearDirtyFlag();
						let n = this.lines[t.row].length;
						this.lines[t.row] = this.lines[t.row] + this.lines[t.row + 1], this.lineDirty[t.row] = !0, this.spliceLines(t.row + 1, 1), this.updateFormatting(), this.setSelection({
							row: t.row,
							col: n
						}), this.fireChange();
						return;
					}
				}
				return;
			}
			if (n.inputType !== "insertParagraph" && n.inputType !== "insertLineBreak") return;
			this.isRestoringHistory || this.pushHistory(), e.preventDefault(), this.clearDirtyFlag();
			let r = this.getSelection(), i = this.getSelection(!0);
			if (r && i) {
				if (r.row !== i.row) {
					let e = r.row < i.row ? r : i, t = r.row < i.row ? i : r;
					this.lines[e.row] = this.lines[e.row].substring(0, e.col), this.lines[t.row] = this.lines[t.row].substring(t.col), this.spliceLines(e.row + 1, t.row - e.row - 1), r.row = e.row + 1, r.col = 0;
				} else {
					let e = !1;
					switch (this.lineTypes[r.row]) {
						case "TMUL":
							e = "TMUL";
							break;
						case "TMOL":
							e = "TMOL";
							break;
						case "TMIndentedCode": e = "TMIndentedCode";
					}
					let n = this.lines[r.row].substring(0, r.col <= i.col ? r.col : i.col), a = this.lines[r.row].substring(r.col <= i.col ? i.col : r.col);
					if (this.spliceLines(r.row, 1, [n, a]), r.row += 1, r.col = 0, e) {
						let n = t.lineGrammar[e].regexp.exec(this.lines[r.row - 1]);
						n && (n[2] ? (e === "TMOL" && (n[1] = n[1].replace(t.editorRegExp.orderedListNumber, (e) => (parseInt(e) + 1).toString())), this.lines[r.row] = `${n[1]}${this.lines[r.row]}`, this.lineDirty[r.row] = !0, r.col = n[1].length) : (this.lines[r.row - 1] = "", this.lineDirty[r.row - 1] = !0));
					}
				}
				this.updateFormatting(), this.setSelection(r), r && r.row < this.lineElements.length && this.lineElements[r.row].scrollIntoView({
					block: "nearest",
					inline: "nearest"
				}), this.fireChange();
			}
		}
		handleInputEvent(e) {
			let t = e;
			if (t.inputType === "insertCompositionText") return;
			this.isRestoringHistory || this.pushHistory();
			let n = this.getSelection();
			(t.inputType !== "insertParagraph" && t.inputType !== "insertLineBreak" || !n) && (this.e.firstChild ? this.fixNodeHierarchy() : this.e.innerHTML = "<div class=\"TMBlankLine\"><br></div>", this.updateLineContentsAndFormatting(), n && this.setSelection(n), this.fireChange());
		}
		handleSelectionChangeEvent(e) {
			this.fireSelection();
		}
		handlePaste(e) {
			this.isRestoringHistory || this.pushHistory(), e.preventDefault();
			let t = e.clipboardData.getData("text/plain");
			this.paste(t);
		}
		handleDrop(e) {
			e.preventDefault(), this.fireDrop(e.dataTransfer);
		}
		handleClick(e) {
			let t = e.target, n = t && t.closest ? t.closest(".TMCheckbox") : null;
			if (!n) return;
			let r = n;
			for (; r && r.parentNode !== this.e;) r = r.parentNode;
			if (!r || r.dataset.lineNum === void 0) return;
			let i = parseInt(r.dataset.lineNum, 10);
			if (isNaN(i) || i < 0 || i >= this.lines.length) return;
			let a = this.computeColumn(n, 0);
			if (a === null) return;
			let o = this.lines[i].charAt(a);
			if (o !== " " && o !== "x" && o !== "X") return;
			e.preventDefault(), this.isRestoringHistory || this.pushHistory(), this.clearDirtyFlag();
			let s = o === " " ? "x" : " ";
			this.lines[i] = this.lines[i].substr(0, a) + s + this.lines[i].substr(a + 1), this.lineDirty[i] = !0, this.updateFormatting(), this.fireChange();
		}
		processInlineStyles(e) {
			let n = "", r = [], i = 0, a = e;
			outer: for (; a;) {
				if (a.charCodeAt(0) === 10) {
					n += "\n", a = a.substr(1), i += 1;
					continue outer;
				}
				for (let e of [
					"escape",
					"code",
					"autolink",
					"html"
				]) if (this.mergedInlineGrammar[e]) {
					let r = this.mergedInlineGrammar[e].regexp.exec(a);
					if (r) {
						a = a.substr(r[0].length), i += r[0].length, n += this.mergedInlineGrammar[e].replacement.replace(t.editorRegExp.inlineReplacementPlaceholder, (e, n) => (0, t.htmlescape)(r[n]));
						continue outer;
					}
				}
				for (let e in this.customInlineGrammar) if (e !== "escape" && e !== "code" && e !== "autolink" && e !== "html" && e !== "linkOpen" && e !== "imageOpen" && e !== "linkLabel" && e !== "default") {
					let r = this.mergedInlineGrammar[e].regexp.exec(a);
					if (r) {
						a = a.substr(r[0].length), i += r[0].length, n += this.mergedInlineGrammar[e].replacement.replace(t.editorRegExp.inlineReplacementPlaceholder, (e, n) => (0, t.htmlescape)(r[n]));
						continue outer;
					}
				}
				let o = i > 0 ? e[i - 1] : "";
				if (o === "" || t.editorRegExp.autolinkPrecedingChar.test(o)) {
					let e = this.parseAutolinkExtension(a);
					if (e) {
						n = `${n}${e.output}`, a = a.substr(e.charCount), i += e.charCount;
						continue outer;
					}
				}
				let s = a.match(this.mergedInlineGrammar.linkOpen.regexp), c = a.match(this.mergedInlineGrammar.imageOpen.regexp);
				if (c || s) {
					let e = this.parseLinkOrImage(a, !!c);
					if (e) {
						n = `${n}${e.output}`, a = a.substr(e.charCount), i += e.charCount;
						continue outer;
					}
				}
				let l = t.editorRegExp.emphasisDelimiter.exec(a);
				if (l) {
					let o = l[0].length, s = l[0], c = l[0][0];
					a = a.substr(l[0].length);
					let u = i > 0 ? e.substr(0, i) : " ", d = i + l[0].length < e.length ? a : " ", f = d.match(t.punctuationLeading), p = u.match(t.punctuationTrailing), m = d.match(t.editorRegExp.leadingWhitespace), h = u.match(t.editorRegExp.trailingWhitespace), g = !m && (!f || !!h || !!p), _ = !h && (!p || !!m || !!f);
					if (c === "_" && g && _ && (g = !!p, _ = !!f), _) {
						let e = r.length - 1;
						for (; o && e >= 0;) if (r[e].delimiter === c) {
							for (; e < r.length - 1;) {
								let e = r.pop();
								n = `${e.output}${e.delimString.substr(0, e.count)}${n}`;
							}
							o >= 2 && r[e].count >= 2 ? (n = `<span class="TMMark">${c}${c}</span><strong class="TMStrong">${n}</strong><span class="TMMark">${c}${c}</span>`, o -= 2, r[e].count -= 2) : (n = `<span class="TMMark">${c}</span><em class="TMEm">${n}</em><span class="TMMark">${c}</span>`, --o, --r[e].count), r[e].count === 0 && (n = `${r.pop().output}${n}`, e--);
						} else e--;
					}
					o && g && (r.push({
						delimiter: c,
						delimString: s,
						count: o,
						output: n
					}), n = "", o = 0), o && (n = `${n}${s.substr(0, o)}`), i += l[0].length;
					continue outer;
				}
				if (l = t.editorRegExp.strikethroughDelimiter.exec(a), l) {
					let e = !1, t = r.length - 1;
					for (; !e && t >= 0;) if (r[t].delimiter === "~") {
						for (; t < r.length - 1;) {
							let e = r.pop();
							n = `${e.output}${e.delimString.substr(0, e.count)}${n}`;
						}
						n = `<span class="TMMark">~~</span><del class="TMStrikethrough">${n}</del><span class="TMMark">~~</span>`, n = `${r.pop().output}${n}`, e = !0;
					} else t--;
					e || (r.push({
						delimiter: "~",
						delimString: "~~",
						count: 2,
						output: n
					}), n = ""), i += l[0].length, a = a.substr(l[0].length);
					continue outer;
				}
				if (l = this.mergedInlineGrammar.default.regexp.exec(a), l) {
					a = a.substr(l[0].length), i += l[0].length, n += this.mergedInlineGrammar.default.replacement.replace(t.editorRegExp.inlineReplacementPlaceholder, (e, n) => (0, t.htmlescape)(l[n]));
					continue outer;
				}
				throw "Infinite loop!";
			}
			for (; r.length;) {
				let e = r.pop();
				n = `${e.output}${e.delimString.substr(0, e.count)}${n}`;
			}
			return n;
		}
		computeColumn(e, t) {
			let n = e, r;
			for (; n && n.parentNode !== this.e;) n = n.parentNode;
			if (n === null) return null;
			for (e.nodeType === Node.TEXT_NODE || t === 0 ? (r = t, n = e) : t > 0 ? (n = e.childNodes[t - 1], r = n.textContent.length) : (r = 0, n = e); n.parentNode !== this.e;) n.previousSibling ? (n = n.previousSibling, r += n.textContent.length) : n = n.parentNode;
			return r;
		}
		computeNodeAndOffset(e, t, n = !1) {
			e >= this.lineElements.length && (e = this.lineElements.length - 1, t = this.lines[e].length), t > this.lines[e].length && (t = this.lines[e].length);
			let r = this.lineElements[e], i = r.firstChild, a = !1, o = {
				node: r.firstChild ? r.firstChild : r,
				offset: 0
			};
			for (; i !== r;) {
				if (!a && i.nodeType === Node.TEXT_NODE) {
					if (i.nodeValue.length >= t) {
						if (n && i.nodeValue.length === t) o = {
							node: i,
							offset: t
						}, t = 0;
						else return {
							node: i,
							offset: t
						};
					} else t -= i.nodeValue.length;
				}
				!a && i.firstChild ? i = i.firstChild : i.nextSibling ? (a = !1, i = i.nextSibling) : (a = !0, i = i.parentNode);
			}
			return o;
		}
		updateLineContentsAndFormatting() {
			this.clearDirtyFlag(), this.updateLineContents(), this.updateFormatting();
		}
		clearDirtyFlag() {
			this.lineDirty = Array(this.lines.length);
			for (let e = 0; e < this.lineDirty.length; e++) this.lineDirty[e] = !1;
		}
		updateLineContents() {
			let e = this.e.childElementCount - this.lines.length;
			if (e) {
				let t = 0;
				for (; t <= this.lines.length && t <= this.lineElements.length && this.lineElements[t] && this.lines[t] === this.lineElements[t].textContent && this.lineTypes[t] === this.lineElements[t].className;) t++;
				let n = -1;
				for (; -n < this.lines.length && -n < this.lineElements.length && this.lines[this.lines.length + n] === this.lineElements[this.lineElements.length + n].textContent && this.lineTypes[this.lines.length + n] === this.lineElements[this.lineElements.length + n].className;) n--;
				let r = this.lines.length + n + 1 - t;
				r < -e && (r = -e), r < 0 && (r = 0);
				let i = [];
				for (let n = 0; n < r + e; n++) i.push(this.lineElements[t + n].textContent || "");
				this.spliceLines(t, r, i, !1);
			} else for (let e = 0; e < this.lineElements.length; e++) {
				let t = this.lineElements[e], n = t.textContent || "";
				(this.lines[e] !== n || this.lineTypes[e] !== t.className) && (this.lines[e] = n, this.lineTypes[e] = t.className, this.lineDirty[e] = !0);
			}
		}
		spliceLines(e, t = 0, n = [], r = !0) {
			if (r) for (let n = 0; n < t; n++) this.e.removeChild(this.e.childNodes[e]);
			let i = [], a = [];
			for (let t = 0; t < n.length; t++) i.push(""), a.push(!0), r && (this.e.childNodes[e] ? this.e.insertBefore(document.createElement("div"), this.e.childNodes[e]) : this.e.appendChild(document.createElement("div")));
			this.lines.splice(e, t, ...n), this.lineTypes.splice(e, t, ...i), this.lineDirty.splice(e, t, ...a);
		}
		fixNodeHierarchy() {
			let e = Array.from(this.e.childNodes), t = (e, ...t) => {
				let n = e.parentElement, r = e.nextSibling;
				n.removeChild(e), t.forEach((e) => r ? n.insertBefore(e, r) : n.appendChild(e));
			};
			e.forEach((e) => {
				if (e.nodeType !== Node.ELEMENT_NODE || e.tagName !== "DIV") {
					let n = document.createElement("div");
					t(e, n), n.appendChild(e);
				} else if (e.childNodes.length === 0) e.appendChild(document.createElement("br"));
				else {
					let n = Array.from(e.childNodes);
					if (n.some((e) => e.nodeType === Node.ELEMENT_NODE && e.tagName === "DIV")) return t(e, ...n);
				}
			});
		}
		parseAutolinkExtension(e) {
			let n = this.matchExtendedAutolink(e);
			return n ? {
				output: `<span class="TMAutolink">${(0, t.htmlescape)(n)}</span>`,
				charCount: n.length
			} : !1;
		}
		matchExtendedAutolink(e) {
			let n = t.editorRegExp.autolinkScheme.exec(e), r = t.editorRegExp.autolinkWww.test(e);
			if (n || r) {
				let r = n ? n[0].length : 0, i = e.substr(r), a = t.editorRegExp.autolinkDomain.exec(i);
				if (a && this.isValidAutolinkDomain(a[0])) {
					let n = t.editorRegExp.autolinkPath.exec(i.substr(a[0].length)), o = e.substr(0, r + a[0].length + (n ? n[0].length : 0)), s = this.trimAutolinkTrailing(o);
					if (s.length >= r + a[0].length) return s;
				}
			}
			let i = t.editorRegExp.autolinkProtocol.exec(e);
			if (i) {
				let n = this.matchAutolinkEmail(e.substr(i[0].length));
				if (n) {
					let r = "";
					if (t.editorRegExp.autolinkXmpp.test(e)) {
						let a = t.editorRegExp.autolinkXmppResource.exec(e.substr(i[0].length + n.length));
						a && (r = a[0]);
					}
					return i[0] + n + r;
				}
			}
			return this.matchAutolinkEmail(e) || !1;
		}
		isValidAutolinkDomain(e) {
			let t = e.split(".");
			return t.length < 2 ? !1 : !t.slice(-2).some((e) => e.indexOf("_") >= 0);
		}
		matchAutolinkEmail(e) {
			let n = t.editorRegExp.autolinkEmail.exec(e);
			if (!n) return !1;
			let r = n[0];
			for (; r.length && t.editorRegExp.emailTrailingChar.test(r);) r = r.substr(0, r.length - 1);
			return t.editorRegExp.emailTld.test(r) ? r : !1;
		}
		trimAutolinkTrailing(e) {
			let t = e.length, n = !0;
			for (; n && t > 0;) {
				n = !1;
				let r = e[t - 1];
				if ("?!.,:*_~".indexOf(r) >= 0) t--, n = !0;
				else if (r === ")") {
					let r = 0, i = 0;
					for (let n = 0; n < t; n++) e[n] === "(" ? r++ : e[n] === ")" && i++;
					i > r && (t--, n = !0);
				}
			}
			return e.substr(0, t);
		}
		parseLinkOrImage(e, n) {
			let r = n ? 2 : 1, i = e.substr(0, r), a = n ? "TMImage" : "TMLink", o = r, s = 1, c = !1, l = !1, u = [], d = [];
			textOuter: for (; o < e.length && c === !1;) {
				let i = e.substr(o);
				for (let e of [
					"escape",
					"code",
					"autolink",
					"html"
				]) {
					let t = this.mergedInlineGrammar[e].regexp.exec(i);
					if (t) {
						o += t[0].length;
						continue textOuter;
					}
				}
				if (i.match(this.mergedInlineGrammar.imageOpen.regexp)) {
					s++, o += 2;
					continue textOuter;
				}
				if (i.match(this.mergedInlineGrammar.linkOpen.regexp)) {
					if (s++, !n && this.parseLinkOrImage(i, !1)) return !1;
					o += 1;
					continue textOuter;
				}
				if (i.match(t.editorRegExp.linkClosingBracket) && (s--, s === 0)) {
					c = e.substr(r, o - r), o++;
					continue textOuter;
				}
				o++;
			}
			if (c === !1) return !1;
			let f = o < e.length ? e.substr(o, 1) : "";
			if (f === "[") {
				let t = e.substr(o), n = this.mergedInlineGrammar.linkLabel.regexp.exec(t);
				if (n) o += n[0].length, u.push(n[1], n[2], n[3]), l = n[this.mergedInlineGrammar.linkLabel.labelPlaceholder] ? n[this.mergedInlineGrammar.linkLabel.labelPlaceholder] : c.trim();
				else return !1;
			} else if (f !== "(") l = c.trim();
			else {
				o++;
				let n = 1;
				inlineOuter: for (; o < e.length && n > 0;) {
					let r = e.substr(o), i = t.editorRegExp.leadingWhitespaceRun.exec(r);
					if (i) {
						switch (d.length) {
							case 0:
								d.push(i[0]);
								break;
							case 1:
								d.push(i[0]);
								break;
							case 2:
								if (d[0].match(t.editorRegExp.containsOpenAngle)) d[1] = d[1].concat(i[0]);
								else {
									if (n !== 1) return !1;
									d.push(""), d.push(i[0]);
								}
								break;
							case 3:
								d.push(i[0]);
								break;
							case 4: return !1;
							case 5: d.push("");
							case 6:
								d[5] = d[5].concat(i[0]);
								break;
							case 7:
								d[6] = d[6].concat(i[0]);
								break;
							default: return !1;
						}
						o += i[0].length;
						continue inlineOuter;
					}
					if (i = this.mergedInlineGrammar.escape.regexp.exec(r), i) {
						switch (d.length) {
							case 0: d.push("");
							case 1:
								d.push(i[0]);
								break;
							case 2:
								d[1] = d[1].concat(i[0]);
								break;
							case 3: return !1;
							case 4: return !1;
							case 5: d.push("");
							case 6:
								d[5] = d[5].concat(i[0]);
								break;
							default: return !1;
						}
						o += i[0].length;
						continue inlineOuter;
					}
					if (d.length < 2 && r.match(t.editorRegExp.openingAngle)) {
						d.length === 0 && d.push(""), d[0] = d[0].concat("<"), o++;
						continue inlineOuter;
					}
					if ((d.length === 1 || d.length === 2) && r.match(t.editorRegExp.closingAngle)) {
						d.length === 1 && d.push(""), d.push(">"), o++;
						continue inlineOuter;
					}
					if (i = t.editorRegExp.titleQuote.exec(r), i && (d.length === 0 || d.length === 1 || d.length === 4)) {
						for (; d.length < 4;) d.push("");
						d.push(i[0]), o++;
						continue inlineOuter;
					}
					if (i && (d.length === 5 || d.length === 6) && d[4] === i[0]) {
						d.length === 5 && d.push(""), d.push(i[0]), o++;
						continue inlineOuter;
					}
					if (r.match(t.editorRegExp.openingParen)) {
						switch (d.length) {
							case 0: d.push("");
							case 1: d.push("");
							case 2:
								d[1] = d[1].concat("("), d[0].match(t.editorRegExp.endsWithOpenAngle) || n++;
								break;
							case 3: d.push("");
							case 4:
								d.push("(");
								break;
							case 5: d.push("");
							case 6:
								if (d[4] === "(") return !1;
								d[5] = d[5].concat("(");
								break;
							default: return !1;
						}
						o++;
						continue inlineOuter;
					}
					if (r.match(t.editorRegExp.closingParen)) {
						if (d.length <= 2) {
							for (; d.length < 2;) d.push("");
							d[0].match(t.editorRegExp.endsWithOpenAngle) || n--, n > 0 && (d[1] = d[1].concat(")"));
						} else d.length === 5 || d.length === 6 ? d[4] === "(" ? (d.length === 5 && d.push(""), d.push(")")) : d.length === 5 ? d.push(")") : d[5] = d[5].concat(")") : n--;
						if (n === 0) for (; d.length < 7;) d.push("");
						o++;
						continue inlineOuter;
					}
					if (i = t.editorRegExp.anyChar.exec(r), i) {
						switch (d.length) {
							case 0: d.push("");
							case 1:
								d.push(i[0]);
								break;
							case 2:
								d[1] = d[1].concat(i[0]);
								break;
							case 3: return !1;
							case 4: return !1;
							case 5: d.push("");
							case 6:
								d[5] = d[5].concat(i[0]);
								break;
							default: return !1;
						}
						o += i[0].length;
						continue inlineOuter;
					}
					throw "Infinite loop";
				}
				if (n > 0) return !1;
			}
			if (l !== !1) {
				let e = !1;
				for (let t of this.linkLabels) if (t === l) {
					e = !0;
					break;
				}
				let t = e ? "TMLinkLabel TMLinkLabel_Valid" : "TMLinkLabel TMLinkLabel_Invalid", n = `<span class="TMMark TMMark_${a}">${i}</span><span class="${a} ${u.length < 3 || !u[1] ? t : ""}">${this.processInlineStyles(c)}</span><span class="TMMark TMMark_${a}">]</span>`;
				return u.length >= 3 && (n = n.concat(`<span class="TMMark TMMark_${a}">${u[0]}</span>`, `<span class="${t}">${u[1]}</span>`, `<span class="TMMark TMMark_${a}">${u[2]}</span>`)), {
					output: n,
					charCount: o
				};
			}
			if (d.length > 0) {
				for (; d.length < 7;) d.push("");
				return {
					output: `<span class="TMMark TMMark_${a}">${i}</span><span class="${a}">${this.processInlineStyles(c)}</span><span class="TMMark TMMark_${a}">](${(0, t.htmlescape)(d[0])}</span><span class="${a}Destination">${(0, t.htmlescape)(d[1])}</span><span class="TMMark TMMark_${a}">${(0, t.htmlescape)(d[2])}${(0, t.htmlescape)(d[3])}${(0, t.htmlescape)(d[4])}</span><span class="${a}Title">${(0, t.htmlescape)(d[5])}</span><span class="TMMark TMMark_${a}">${(0, t.htmlescape)(d[6])})</span>`,
					charCount: o
				};
			}
			return !1;
		}
		computeCommonAncestor(e, t) {
			if (!e || !t) return null;
			if (e === t) return e;
			let n = (e) => {
				let t = [];
				for (; e;) t.unshift(e), e = e.parentNode;
				return t;
			}, r = n(e), i = n(t);
			if (r[0] !== i[0]) return null;
			let a = 0;
			for (; r[a] === i[a]; a++);
			return r[a - 1];
		}
		computeEnclosingMarkupNode(e, t, n) {
			let r = null;
			if (!e) return null;
			if (t) {
				if (e.row !== t.row) return null;
				let n = window.getSelection();
				if (!n) return null;
				r = this.computeCommonAncestor(n.focusNode, n.anchorNode);
			} else {
				let e = window.getSelection();
				if (!e || !e.focusNode) return null;
				r = e.focusNode;
			}
			if (!r) return null;
			for (; r !== this.e;) {
				if (r.classList && r.classList.contains(n)) return r;
				r = r.parentNode;
			}
			return null;
		}
		getCommandState(e = null, n = null) {
			let r = {};
			if (e ||= this.getSelection(!1), n ||= this.getSelection(!0), !e) {
				for (let e in t.commands) r[e] = null;
				return r;
			}
			n ||= e;
			let i, a;
			n.row < e.row || n.row === e.row && n.col < e.col ? (i = n, a = e) : (i = e, a = n), a.row > i.row && a.col === 0 && (a.row--, a.col = this.lines[a.row].length);
			for (let o in t.commands) if (t.commands[o].type === "inline" && (r[o] = !e || e.row !== n.row || !this.isInlineFormattingAllowed() ? null : !!this.computeEnclosingMarkupNode(e, n, t.commands[o].className) || e.col === n.col && !!this.lines[e.row].substr(0, e.col).match(t.commands[o].unset.prePattern) && !!this.lines[e.row].substr(e.col).match(t.commands[o].unset.postPattern)), t.commands[o].type === "line") {
				if (!e) r[o] = null;
				else {
					let e = this.lineTypes[i.row] === t.commands[o].className;
					for (let n = i.row; n <= a.row; n++) if (this.lineTypes[n] === t.commands[o].className !== e) {
						e = null;
						break;
					}
					r[o] = e;
				}
			}
			return r;
		}
		setCommandState(e, n) {
			if (this.isRestoringHistory || this.pushHistory(), t.commands[e].type === "inline") {
				let n = this.getSelection(!0), r = this.getSelection(!1);
				if (n ||= r, !n || n.row !== r.row || !this.isInlineFormattingAllowed()) return;
				let i = this.computeEnclosingMarkupNode(r, n, t.commands[e].className);
				if (this.clearDirtyFlag(), i) {
					this.lineDirty[r.row] = !0;
					let a = this.computeColumn(i, 0), o = i.textContent.length, s = this.lines[r.row].substr(0, a).replace(t.commands[e].unset.prePattern, ""), c = this.lines[r.row].substr(a, o), l = this.lines[r.row].substr(a + o).replace(t.commands[e].unset.postPattern, "");
					this.lines[r.row] = s.concat(c, l), n.col = s.length, r.col = n.col + o, this.updateFormatting(), this.setSelection(r, n), this.fireChange();
				} else if (r.col === n.col && this.lines[r.row].substr(0, r.col).match(t.commands[e].unset.prePattern) && this.lines[r.row].substr(r.col).match(t.commands[e].unset.postPattern)) {
					this.lineDirty[r.row] = !0;
					let i = this.lines[r.row].substr(0, r.col).replace(t.commands[e].unset.prePattern, ""), a = this.lines[r.row].substr(r.col).replace(t.commands[e].unset.postPattern, "");
					this.lines[r.row] = i.concat(a), r.col = n.col = i.length, this.updateFormatting(), this.setSelection(r, n), this.fireChange();
				} else {
					let { startCol: i, endCol: a } = r.col < n.col ? {
						startCol: r.col,
						endCol: n.col
					} : {
						startCol: n.col,
						endCol: r.col
					}, o = this.lines[r.row].substr(i, a - i).match(t.editorRegExp.surroundingWhitespace);
					o && (i += o.groups.leading.length, a -= o.groups.trailing.length), r.col = i, n.col = a, this.wrapSelection(t.commands[e].set.pre, t.commands[e].set.post, r, n);
				}
			} else if (t.commands[e].type === "line") {
				let r = this.getSelection(!0), i = this.getSelection(!1);
				if (r ||= i, !i) return;
				this.clearDirtyFlag();
				let a = r.row > i.row ? i : r, o = r.row > i.row ? r : i;
				o.row > a.row && o.col === 0 && o.row--;
				for (let r = a.row; r <= o.row; r++) n && this.lineTypes[r] !== t.commands[e].className && (this.lines[r] = this.lines[r].replace(t.commands[e].set.pattern, t.commands[e].set.replacement.replace("$#", (r - a.row + 1).toString())), this.lineDirty[r] = !0), !n && this.lineTypes[r] === t.commands[e].className && (this.lines[r] = this.lines[r].replace(t.commands[e].unset.pattern, t.commands[e].unset.replacement), this.lineDirty[r] = !0);
				this.updateFormatting(), this.setSelection({
					row: o.row,
					col: this.lines[o.row].length
				}, {
					row: a.row,
					col: 0
				}), this.fireChange();
			}
		}
		listItemMarker(e) {
			let n = t.lineGrammar.TMUL.regexp.exec(e);
			if (n) return n[1];
			let r = t.lineGrammar.TMOL.regexp.exec(e);
			return r ? r[1] : null;
		}
		isTaskListItem(e) {
			if (e < 0 || e >= this.lines.length) return !1;
			let n = this.lineTypes[e];
			if (n !== "TMUL" && n !== "TMOL") return !1;
			let r = this.listItemMarker(this.lines[e]);
			return r !== null && t.editorRegExp.taskListItem.test(this.lines[e].substr(r.length));
		}
		addTaskCheckbox(e) {
			let n = this.listItemMarker(e);
			if (n !== null) {
				let r = e.substr(n.length);
				return t.editorRegExp.taskListItem.test(r) ? e : `${n}[ ] ${r}`;
			}
			return e.replace(t.commands.ul.set.pattern, "- [ ] $2");
		}
		removeTaskCheckbox(e) {
			let n = this.listItemMarker(e);
			if (n === null) return e;
			let r = t.editorRegExp.taskListItem.exec(e.substr(n.length));
			return r ? `${n}${r[5]}` : e;
		}
		toggleTaskList() {
			let e = this.getSelection(!0), t = this.getSelection(!1);
			if (e ||= t, !t) return;
			let n = e.row > t.row ? t : e, r = e.row > t.row ? e : t;
			r.row > n.row && r.col === 0 && r.row--;
			let i = !0;
			for (let e = n.row; e <= r.row; e++) if (!this.isTaskListItem(e)) {
				i = !1;
				break;
			}
			this.isRestoringHistory || this.pushHistory(), this.clearDirtyFlag();
			for (let e = n.row; e <= r.row; e++) {
				let t = i ? this.removeTaskCheckbox(this.lines[e]) : this.addTaskCheckbox(this.lines[e]);
				t !== this.lines[e] && (this.lines[e] = t, this.lineDirty[e] = !0);
			}
			this.updateFormatting(), this.setSelection({
				row: r.row,
				col: this.lines[r.row].length
			}, {
				row: n.row,
				col: 0
			}), this.fireChange();
		}
		isInlineFormattingAllowed() {
			let e = window.getSelection();
			if (!e || !e.focusNode || !e.anchorNode) return !1;
			if (e.isCollapsed && e.focusNode.nodeType === 3 && e.focusOffset === e.focusNode.nodeValue.length) {
				let t;
				for (t = e.focusNode; t && t.nextSibling === null; t = t.parentNode);
				if (t && t.nextSibling && t.nextSibling.classList && t.nextSibling.classList.contains("TMInlineFormatted")) return !0;
			}
			let t = this.computeCommonAncestor(e.focusNode, e.anchorNode);
			if (!t) return !1;
			for (; t && t !== this.e;) {
				if (t.classList && (t.classList.contains("TMInlineFormatted") || t.classList.contains("TMBlankLine"))) return !0;
				t = t.parentNode;
			}
			return !1;
		}
		toggleCommandState(e) {
			this.lastCommandState ||= this.getCommandState(), this.setCommandState(e, !this.lastCommandState[e]);
		}
		fireDrop(e) {
			for (let t of this.listeners.drop) t({ dataTransfer: e });
		}
		fireSelection() {
			let e = this.getSelection(!1), t = this.getSelection(!0);
			if (this.lastSelection = {
				focus: e,
				anchor: t
			}, this.listeners.selection && this.listeners.selection.length) {
				let n = this.getCommandState(e, t);
				this.lastCommandState ? Object.assign(this.lastCommandState, n) : this.lastCommandState = Object.assign({}, n);
				for (let n of this.listeners.selection) n({
					focus: e,
					anchor: t,
					commandState: this.lastCommandState
				});
			}
		}
	};
})))(), qc = Gc();
function Jc(e, t) {
	try {
		return new nl(e, t);
	} catch (n) {
		return console.warn("llm-agent: Markdown editor did not start, using a plain box", n), new Yc(e, t);
	}
}
var Yc = class {
	#e;
	constructor(e, t) {
		this.source = e, this.el = e;
		let n = () => t.onChange();
		e.addEventListener("keydown", t.onKey), e.addEventListener("input", n), e.addEventListener("paste", t.onPaste), e.addEventListener("blur", t.onBlur), this.#e = () => {
			e.removeEventListener("keydown", t.onKey), e.removeEventListener("input", n), e.removeEventListener("paste", t.onPaste), e.removeEventListener("blur", t.onBlur);
		};
	}
	get value() {
		return this.el.value;
	}
	set value(e) {
		this.el.value = e;
	}
	get selectionStart() {
		return this.el.selectionStart ?? this.el.value.length;
	}
	setSelectionRange(e, t) {
		this.el.setSelectionRange(e, t);
	}
	focus() {
		this.el.focus();
	}
	fit() {
		this.el.style.height = "auto", this.el.style.height = `${this.el.scrollHeight}px`;
	}
	setMentions() {}
	setPlaceholder() {}
	destroy() {
		this.#e();
	}
};
function Xc(e) {
	if (e instanceof ShadowRoot) {
		let t = e.getSelection?.();
		if (t) return t;
		let n = document.getSelection(), r = n?.getComposedRanges;
		if (!n || !r) return null;
		let i;
		try {
			i = r.call(n, { shadowRoots: [e] });
		} catch {
			i = r.call(n, e);
		}
		let a = i[0];
		return a ? n.direction === "backward" ? {
			anchorNode: a.endContainer,
			anchorOffset: a.endOffset,
			focusNode: a.startContainer,
			focusOffset: a.startOffset
		} : {
			anchorNode: a.startContainer,
			anchorOffset: a.startOffset,
			focusNode: a.endContainer,
			focusOffset: a.endOffset
		} : null;
	}
	return document.getSelection();
}
function Zc(e) {
	return !(e instanceof ShadowRoot) || typeof e.getSelection == "function" || typeof Selection.prototype.getComposedRanges == "function";
}
var Qc = class extends Kc.Editor {
	getSelection(e = !1) {
		let t = this, n = Xc(t.e.getRootNode()), r = e ? n?.anchorNode : n?.focusNode;
		if (!n || !r) return null;
		let i = e ? n.anchorOffset : n.focusOffset;
		if (r === t.e) {
			if (i < t.lines.length) return {
				row: i,
				col: 0
			};
			let e = t.lines.length - 1;
			return {
				row: e,
				col: t.lines[e]?.length ?? 0
			};
		}
		let a = t.computeColumn(r, i);
		if (a === null) return null;
		let o = r;
		for (; o.parentNode && o.parentNode !== t.e;) o = o.parentNode;
		let s = Array.prototype.indexOf.call(t.e.childNodes, o);
		return s < 0 ? null : {
			row: s,
			col: a
		};
	}
	setSelection(e, t = null) {
		if (!e) return;
		let n = this, r = n.computeNodeAndOffset(e.row, e.col, t ? t.row === e.row && t.col > e.col : !1), i = r;
		t && (t.row !== e.row || t.col !== e.col) && (i = n.computeNodeAndOffset(t.row, t.col, e.row === t.row && e.col > t.col)), (n.e.getRootNode().getSelection?.() ?? document.getSelection())?.setBaseAndExtent(i.node, i.offset, r.node, r.offset);
	}
}, $c = /^ {0,3}(`{3,}|~{3,})/;
function el(e, t) {
	let n = !1;
	for (let r of e.slice(0, t).split("\n").slice(0, -1)) $c.test(r) && (n = !n);
	return n;
}
var tl = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), nl = class {
	#e;
	#t;
	#n = !1;
	#r = "";
	#i = !0;
	#a = "";
	constructor(e, t) {
		this.source = e;
		let n = e.getRootNode();
		if (!Zc(n)) throw Error("this browser cannot read a caret inside a shadow root");
		let r = document.createElement("div");
		r.className = "box", r.setAttribute("role", "textbox"), r.setAttribute("aria-multiline", "true"), r.addEventListener("keydown", t.onKey), r.addEventListener("paste", (e) => {
			t.onPaste(e), e.defaultPrevented && e.stopImmediatePropagation();
		}), r.addEventListener("blur", t.onBlur), r.addEventListener("focus", () => this.#i = !1);
		let i = n instanceof ShadowRoot ? n.host : null;
		i?.addEventListener("keydown", this.#s), this.#t = i, e.after(r);
		try {
			this.#e = new Qc({
				textarea: e,
				editor: r
			});
		} catch (t) {
			throw r.remove(), i?.removeEventListener("keydown", this.#s), e.style.display = "", t;
		}
		this.el = r, this.setPlaceholder(e.placeholder), this.#e.addEventListener("change", () => {
			this.#n || (this.#o(), t.onChange());
		});
	}
	#o() {
		let e = this.#a, t = this.value;
		if (this.#a = t, t.length !== e.length + 1) return;
		let n = this.selectionStart;
		if (t[n - 1] !== "\n" || t.slice(0, n - 1) + t.slice(n) !== e) return;
		let r = t.lastIndexOf("\n", n - 2) + 1, i = $c.exec(t.slice(r, n - 1));
		i && !el(t, r) && (t.slice(n).split("\n").some((e) => $c.test(e)) || (this.value = `${t.slice(0, n)}\n${i[1]}\n${t.slice(n)}`, this.setSelectionRange(n, n)));
	}
	#s = (e) => {
		let t = e;
		t.ctrlKey || t.altKey || t.metaKey || t.key !== "Escape" && t.composedPath()[0] === this.el && t.stopPropagation();
	};
	get value() {
		return this.#e.getContent();
	}
	set value(e) {
		let t = this.el.getRootNode().activeElement === this.el;
		this.#n = !0, this.#a = e;
		try {
			this.#e.setContent(e);
		} finally {
			this.#n = !1;
		}
		t ? this.setSelectionRange(e.length, e.length) : this.#i = !0;
	}
	#c(e) {
		let t = this.#e.lines, n = e.col;
		for (let r = 0; r < e.row && r < t.length; r++) n += (t[r]?.length ?? 0) + 1;
		return n;
	}
	#l(e) {
		let t = this.#e.lines, n = e;
		for (let e = 0; e < t.length; e++) {
			let r = t[e]?.length ?? 0;
			if (n <= r) return {
				row: e,
				col: n
			};
			n -= r + 1;
		}
		let r = Math.max(0, t.length - 1);
		return {
			row: r,
			col: t[r]?.length ?? 0
		};
	}
	get selectionStart() {
		let e = this.#e.getSelection(!1), t = this.#e.getSelection(!0);
		return e === null ? this.value.length : Math.min(this.#c(e), t === null ? Infinity : this.#c(t));
	}
	setSelectionRange(e, t) {
		this.#e.setSelection(this.#l(t), this.#l(e));
	}
	focus() {
		let e = !this.#i && this.#e.getSelection() !== null;
		this.el.focus(), this.#i = !1, e || this.setSelectionRange(this.value.length, this.value.length);
	}
	fit() {}
	setMentions(e) {
		let t = e.join("\n");
		if (t === this.#r) return;
		this.#r = t;
		let n = this.#e;
		if (!e.length) {
			n.customInlineGrammar = {}, n.mergedInlineGrammar = qc.inlineGrammar;
			return;
		}
		let r = [...e].sort((e, t) => t.length - e.length).map(tl), i = {
			regexp: RegExp(`^(@(?:${r.join("|")}))`),
			replacement: "<span class=\"TMMention\">$1</span>"
		};
		n.customInlineGrammar = { mention: i }, n.mergedInlineGrammar = {
			...qc.inlineGrammar,
			mention: i
		};
	}
	setPlaceholder(e) {
		this.el.getAttribute("data-placeholder") !== e && (this.el.setAttribute("data-placeholder", e), this.el.setAttribute("aria-label", e));
	}
	destroy() {
		this.#t?.removeEventListener("keydown", this.#s), this.#e.destroy(), this.el.remove();
	}
}, rl = /device_id:[0-9a-f]{32} \(([^()\n]+)\)|area_id:([a-z0-9_]+)|\b([a-z_]+\.[a-z0-9_]+)\b/g;
function il(e, t, n, r) {
	if (t !== void 0) return t;
	if (n !== void 0) return e?.areas?.[n]?.name ?? n;
	let i = r === void 0 ? void 0 : e?.states?.[r];
	if (i) return i.attributes.friendly_name || i.entity_id;
}
var al = class {
	constructor() {
		this.byLabel = /* @__PURE__ */ new Map();
	}
	add(e, t) {
		let n = e;
		for (let r = 2; this.byLabel.has(n) && this.byLabel.get(n) !== t; r++) n = `${e} ${r}`;
		return this.byLabel.set(n, t), n;
	}
	labels() {
		return [...this.byLabel.keys()];
	}
	show(e, t) {
		return e.replace(rl, (e, n, r, i) => {
			let a = il(t, n, r, i);
			return a === void 0 ? e : `@${this.add(a, e)}`;
		});
	}
	expand(e) {
		let t = [...this.byLabel.keys()].sort((e, t) => t.length - e.length);
		for (let n of t) e = e.split(`@${n}`).join(this.byLabel.get(n));
		return e;
	}
}, ol = /* @__PURE__ */ new Map();
function sl(e, t) {
	let n = ol.get(e);
	if (n !== void 0) return n;
	let r = document.createElement("template");
	r.innerHTML = e;
	let i = document.createTreeWalker(r.content, NodeFilter.SHOW_TEXT), a = [];
	for (let e = i.nextNode(); e; e = i.nextNode()) a.push(e);
	for (let e of a) {
		if (e.parentElement?.closest("code, pre, a")) continue;
		let n = e.data, r = document.createDocumentFragment(), i = 0;
		for (let e of n.matchAll(rl)) {
			let a = il(t, e[1], e[2], e[3]);
			if (a === void 0) continue;
			r.append(n.slice(i, e.index));
			let o = document.createElement("span");
			o.className = "chip", o.title = e[0], o.textContent = a, r.append(o), i = e.index + e[0].length;
		}
		i !== 0 && (r.append(n.slice(i)), e.replaceWith(r));
	}
	let o = r.innerHTML;
	return ol.size > 300 && ol.clear(), ol.set(e, o), o;
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorate.js
function Y(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/preview.ts
var cl = /* @__PURE__ */ new Set([
	"alarm-panel",
	"button",
	"calendar",
	"entities",
	"entity",
	"gauge",
	"glance",
	"heading",
	"history-graph",
	"humidifier",
	"light",
	"logbook",
	"sensor",
	"statistic",
	"statistics-graph",
	"thermostat",
	"tile",
	"todo-list"
]), ll = /* @__PURE__ */ new Set([
	"horizontal-stack",
	"vertical-stack",
	"grid"
]), ul = /* @__PURE__ */ new Set(["section", "divider"]), dl = /\\|\/\/|url\s*\(|\{\{|\{%|\[\[\[|<|custom:|javascript:|data:/i, fl = /* @__PURE__ */ new Set([
	"card_mod",
	"style",
	"image",
	"image_entity",
	"camera_image"
]);
function pl(e, t = 0) {
	return t > 20 ? !1 : typeof e == "string" ? !dl.test(e) : Array.isArray(e) ? e.every((e) => pl(e, t + 1)) : e && typeof e == "object" ? Object.entries(e).every(([e, n]) => !fl.has(e) && !dl.test(e) && pl(n, t + 1)) : !0;
}
function ml(e) {
	let t = [...e.cards ?? []];
	for (let n of e.sections ?? []) t.push(...n.cards ?? []);
	return t.filter((e) => e && typeof e == "object");
}
async function hl() {
	if (!window.loadCardHelpers) try {
		let e = document.createElement("partial-panel-resolver");
		e.hass = { panels: [{
			url_path: "llm-preview",
			component_name: "lovelace"
		}] }, e._updateRoutes?.(), await e.routerOptions?.routes?.["llm-preview"]?.load?.();
	} catch {}
	for (let e = 0; e < 50 && !window.loadCardHelpers; e++) await new Promise((e) => setTimeout(e, 100));
	return window.loadCardHelpers?.();
}
function gl(e, t = 0) {
	if (!e || typeof e != "object" || t > 5) return !1;
	let n = e.type;
	if (typeof n != "string") return !1;
	if (ll.has(n)) {
		let { cards: n, ...r } = e;
		return Array.isArray(n) && n.every((e) => gl(e, t + 1)) && pl(r);
	}
	if (!cl.has(n)) return !1;
	let r = e.entities;
	return Array.isArray(r) && !r.every((e) => typeof e == "string" || e && typeof e == "object" && (!("type" in e) || ul.has(String(e.type)))) ? !1 : pl(e);
}
var _l = class extends Ve {
	constructor(...e) {
		super(...e), this.view = 0, this.error = "", this.cards = [], this.skipped = 0;
	}
	get views() {
		return Array.isArray(this.config?.views) ? this.config.views : [];
	}
	async willUpdate(e) {
		(e.has("config") || e.has("view")) && await this.build();
		for (let e of this.cards) e.hass = this.hass;
	}
	async build() {
		this.cards = [], this.skipped = 0;
		let e = this.views[this.view];
		if (e) {
			try {
				let t = await hl();
				if (!t) throw Error("card helpers aren't available");
				for (let n of ml(e).slice(0, 40)) {
					if (!gl(n)) {
						this.skipped++;
						continue;
					}
					let e = t.createCardElement(n);
					e.hass = this.hass, this.cards.push(e);
				}
				this.error = "";
			} catch (e) {
				this.error = R("preview_unavailable", { error: e.message });
			}
			this.requestUpdate();
		}
	}
	render() {
		return this.views.length ? S`
      ${this.views.length > 1 ? S`<div class="tabs">
              ${this.views.map((e, t) => S`<button
                    class=${t === this.view ? "on" : ""}
                    @click=${() => this.view = t}
                  >
                    ${e.title || e.path || R("preview_view", { n: t + 1 })}
                  </button>`)}
            </div>` : C}
      ${this.error ? S`<p class="note">${this.error}</p>` : C}
      <div class="grid" inert>${this.cards}</div>
      ${this.skipped ? S`<p class="note">
              ${this.skipped > 1 ? R("preview_skipped_n", { count: this.skipped }) : R("preview_skipped_one")}
            </p>` : C}
    ` : S`<p class="note">${R("preview_no_views")}</p>`;
	}
	static {
		this.styles = s`
    :host {
      display: block;
      padding: 8px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 8px;
      pointer-events: none; /* a preview, not a remote control */
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;
    }
    .tabs button {
      font: inherit;
      border: 1px solid var(--divider-color);
      background: none;
      color: inherit;
      border-radius: 12px;
      padding: 2px 10px;
      cursor: pointer;
    }
    .tabs button.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color);
    }
    .note {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      margin: 6px 0;
    }
  `;
	}
};
Y([D({ attribute: !1 })], _l.prototype, "hass", void 0), Y([D({ attribute: !1 })], _l.prototype, "config", void 0), Y([O()], _l.prototype, "view", void 0), Y([O()], _l.prototype, "error", void 0), customElements.get("llm-dashboard-preview") || customElements.define("llm-dashboard-preview", _l);
//#endregion
//#region src/styles.ts
var vl = s`
  :host {
    display: block;
    height: 100vh;
    height: 100dvh;
    --bg: var(--primary-background-color, #f6f7f9);
    --surface: var(--card-background-color, #ffffff);
    --sidebar: var(--sidebar-background-color, var(--surface));
    --text: var(--primary-text-color, #1f2328);
    --muted: var(--secondary-text-color, #656d76);
    --line: var(--divider-color, rgba(127, 127, 127, 0.2));
    --accent: var(--primary-color, #2563eb);
    --on-accent: var(--text-primary-color, #ffffff);
    --danger: var(--error-color, #dc2626);
    --ok: var(--success-color, #16a34a);
    --warn: var(--warning-color, #d97706);
    --soft: color-mix(in srgb, var(--text) 5%, transparent);
    --softer: color-mix(in srgb, var(--text) 3%, transparent);
    --hover: color-mix(in srgb, var(--text) 7%, transparent);
    --accent-soft: color-mix(in srgb, var(--accent) 13%, var(--surface));
    --ring: color-mix(in srgb, var(--accent) 35%, transparent);
    --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
    --shadow:
      0 1px 2px rgba(15, 23, 42, 0.05), 0 4px 16px rgba(15, 23, 42, 0.07);
    --shadow-lg:
      0 2px 6px rgba(15, 23, 42, 0.08), 0 16px 40px rgba(15, 23, 42, 0.14);
    --radius: 16px;
    --radius-sm: 10px;
    --mono: var(
      --code-font-family,
      ui-monospace,
      "SF Mono",
      "Cascadia Code",
      Menlo,
      Consolas,
      monospace
    );
    --card: var(--surface);
    background: var(--bg);
    color: var(--text);
    font-family:
      "Inter",
      ui-sans-serif,
      system-ui,
      -apple-system,
      "Segoe UI",
      Roboto,
      sans-serif;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
  }
  /* inside the floating window, which sets the size and keeps clear of the safe areas */
  :host([embedded]) {
    height: 100%;
  }
  :host([data-theme="light"]) {
    --bg: #f6f7f9;
    --surface: #ffffff;
    --sidebar: #fbfbfc;
    --text: #1f2328;
    --muted: #667080;
    --line: rgba(15, 23, 42, 0.09);
    --accent: #2563eb;
    --on-accent: #ffffff;
    --primary-background-color: var(--bg);
    --primary-text-color: var(--text);
    --secondary-text-color: var(--muted);
    --card-background-color: var(--surface);
    --divider-color: var(--line);
    color-scheme: light;
  }
  :host([data-theme="dark"]) {
    --bg: #0e1013;
    --surface: #171a1f;
    --sidebar: #121418;
    --text: #e7e9ec;
    --muted: #949ba5;
    --line: rgba(255, 255, 255, 0.08);
    --accent: #5b8cff;
    --on-accent: #ffffff;
    --accent-soft: color-mix(in srgb, var(--accent) 22%, var(--surface));
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow: 0 1px 2px rgba(0, 0, 0, 0.35), 0 6px 20px rgba(0, 0, 0, 0.35);
    --shadow-lg: 0 2px 8px rgba(0, 0, 0, 0.4), 0 18px 48px rgba(0, 0, 0, 0.55);
    --primary-background-color: var(--bg);
    --primary-text-color: var(--text);
    --secondary-text-color: var(--muted);
    --card-background-color: var(--surface);
    --divider-color: var(--line);
    color-scheme: dark;
  }
  :host([data-size="small"]) .layout {
    zoom: 0.9;
  }
  :host([data-size="large"]) .layout {
    zoom: 1.15;
  }
  :host([data-compact]) .messages {
    gap: 6px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  :host([data-compact]) .msg.user {
    padding: 6px 12px;
  }
  [hidden] {
    display: none !important;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--hover) transparent;
  }
  ha-icon {
    --mdc-icon-size: 20px;
  }

  /* Layout */
  .layout {
    display: flex;
    height: 100%;
    position: relative;
  }
  nav {
    width: 256px;
    flex: none;
    border-right: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    padding: 12px 10px;
    gap: 8px;
    box-sizing: border-box;
    background: var(--sidebar);
  }
  .narrow nav {
    position: absolute;
    z-index: 3;
    top: 60px;
    bottom: 0;
    left: 0;
    box-shadow: var(--shadow-lg);
  }
  .nav-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 2px 4px 6px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 650;
    font-size: 15px;
    letter-spacing: -0.01em;
  }
  .brand-mark {
    width: 28px;
    height: 28px;
    border-radius: 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      var(--accent),
      color-mix(in srgb, var(--accent) 55%, #a855f7)
    );
    color: #fff;
    --mdc-icon-size: 18px;
    box-shadow: var(--shadow-sm);
  }
  label.search {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 10px;
    border-radius: 10px;
    background: var(--soft);
    border: 1px solid transparent;
    color: var(--muted);
    --mdc-icon-size: 18px;
    transition:
      border-color 0.12s,
      background 0.12s;
  }
  label.search:focus-within {
    background: var(--surface);
    border-color: color-mix(in srgb, var(--accent) 50%, var(--line));
  }
  label.search input {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    padding: 8px 0;
    font-size: 14px;
    color: var(--text);
    box-shadow: none;
  }
  .group {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--muted);
    padding: 14px 10px 6px;
  }
  .nav-empty {
    color: var(--muted);
    font-size: 13px;
    padding: 16px 10px;
  }
  .snippet {
    display: block;
    color: var(--muted);
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .convs {
    overflow-y: auto;
    overscroll-behavior: contain;
    flex: 1;
    margin: 0 -4px;
    padding: 0 4px;
  }
  .conv {
    display: flex;
    align-items: center;
    padding: 7px 4px 7px 10px;
    margin-bottom: 1px;
    border-radius: 8px;
    cursor: pointer;
    gap: 4px;
    color: color-mix(in srgb, var(--text) 82%, transparent);
    transition: background 0.12s;
  }
  .conv:hover {
    background: var(--hover);
  }
  .conv.active {
    background: var(--hover);
    color: var(--text);
  }
  .conv.active .conv-title {
    font-weight: 600;
  }
  .conv-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13.5px;
  }
  .conv-title .auto {
    --mdc-icon-size: 14px;
    margin-right: 4px;
    vertical-align: -2px;
    color: var(--muted);
  }
  .conv .del {
    opacity: 0;
    padding: 3px;
    --mdc-icon-size: 16px;
  }
  .conv:hover .del,
  .conv .del:focus-visible {
    opacity: 1;
  }
  .conv .del:hover {
    color: var(--danger);
  }
  @media (hover: none) {
    .conv.active .del {
      opacity: 1;
    }
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  /* the Changes, Notes and Usage views take the place of the chat; the chat keeps its state
     underneath */
  main.changes > :not(header):not(llm-agent-changes):not(llm-agent-notes):not(llm-agent-usage) {
    display: none;
  }
  header {
    position: relative;
    z-index: 6; /* popovers open above the messages */
    height: 60px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 12px 0 20px;
    border-bottom: 1px solid var(--line);
    flex: none;
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(8px);
  }
  .title {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.01em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Panel settings popover */
  .prefs {
    position: absolute;
    top: calc(100% + 6px);
    right: 12px;
    z-index: 10;
    width: min(340px, calc(100vw - 24px));
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 14px;
    box-shadow: var(--shadow-lg);
    font-size: 14px;
    animation: pop 0.14s ease-out;
  }
  @keyframes pop {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.98);
    }
  }
  .prefs label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .prefs label.check {
    justify-content: flex-start;
    gap: 10px;
  }
  .prefs .mine {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    border-top: 1px solid var(--line);
    padding-top: 12px;
  }
  .prefs .mine div {
    width: 100%;
  }
  .prefs .hint {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.45;
  }
  input[type="checkbox"] {
    accent-color: var(--accent);
    width: 16px;
    height: 16px;
    margin: 0;
  }

  /* Messages */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
  .messages {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 24px max(20px, calc((100% - 780px) / 2));
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .row.reply {
    padding-left: 40px;
    position: relative;
  }
  .row.reply > .msg,
  .row.reply > .tool {
    flex: 1;
    min-width: 0;
  }
  .avatar {
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 28px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      var(--accent),
      color-mix(in srgb, var(--accent) 55%, #a855f7)
    );
    color: #fff;
    --mdc-icon-size: 17px;
    box-shadow: var(--shadow-sm);
  }
  .row.user {
    justify-content: flex-end;
    align-items: center;
  }
  .row.user + .row.reply {
    margin-top: 4px;
  }
  .msg {
    line-height: 1.65;
    overflow-wrap: anywhere;
  }
  .msg.assistant {
    padding-top: 2px;
  }
  .msg.user {
    background: var(--accent-soft);
    color: var(--text);
    padding: 10px 16px;
    border-radius: 18px 18px 6px 18px;
    max-width: 78%;
  }
  /* A picked device, area or entity in a sent message: its name, with the id on hover. */
  .md .chip {
    display: inline-block;
    padding: 0 8px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    font-size: 0.92em;
    line-height: 1.5;
    white-space: nowrap;
  }
  .md :first-child {
    margin-top: 0;
  }
  .md :last-child {
    margin-bottom: 0;
  }
  .md p {
    margin: 0.6em 0;
  }
  .md h1,
  .md h2,
  .md h3 {
    font-size: 1.05em;
    font-weight: 600;
    margin: 1em 0 0.4em;
  }
  .md ul,
  .md ol {
    padding-left: 1.4em;
  }
  .md li {
    margin: 0.2em 0;
  }
  .md pre,
  pre {
    background: var(--soft);
    border: 1px solid var(--line);
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 12.5px;
    line-height: 1.5;
    margin: 8px 0;
    white-space: pre;
  }
  .md code {
    font-family: var(--mono);
    font-size: 0.88em;
    background: var(--soft);
    padding: 0.1em 0.35em;
    border-radius: 5px;
  }
  .md pre code {
    background: none;
    padding: 0;
    font-size: inherit;
  }
  .msg-actions {
    display: flex;
    gap: 2px;
    opacity: 0;
    transition: opacity 0.12s;
    --mdc-icon-size: 17px;
  }
  .row:hover .msg-actions,
  .msg-actions:focus-within {
    opacity: 1;
  }
  .row.reply {
    flex-wrap: wrap;
  }
  /* what page the model was given with this message, under the bubble */
  .row.user:has(.page-note) {
    flex-wrap: wrap;
  }
  .page-note {
    flex-basis: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    margin-top: 2px;
    color: var(--muted);
    font-size: 0.8em;
    --mdc-icon-size: 14px;
  }
  .msg-actions.acts {
    flex-basis: 100%;
    margin: -10px 0 0 -5px;
  }
  .row.edited .msg.user {
    outline: 2px solid var(--accent);
  }
  @media (hover: none) {
    .msg-actions {
      opacity: 1;
    }
  }
  /* a phone-width window may still report hover (a desktop browser, a tablet with a
     mouse); on the narrow layout the buttons never wait for it */
  .narrow .msg-actions {
    opacity: 1;
  }
  .msg-actions button.icon {
    padding: 5px;
  }
  .editing {
    color: var(--accent);
  }
  .md pre {
    position: relative;
  }
  .md pre .copy {
    position: absolute;
    top: 6px;
    right: 6px;
    opacity: 0;
    background: var(--surface);
    border-color: var(--line);
    transition: opacity 0.12s;
  }
  .md pre:hover .copy,
  .md pre .copy:focus-visible {
    opacity: 1;
  }
  @media (hover: none) {
    .md pre .copy {
      opacity: 1;
    }
  }
  .md table {
    border-collapse: collapse;
    font-size: 0.94em;
  }
  .md td,
  .md th {
    border: 1px solid var(--line);
    padding: 6px 10px;
  }
  .md th {
    background: var(--softer);
    font-weight: 600;
  }
  .md a {
    color: var(--accent);
    text-decoration: none;
  }
  .md a:hover {
    text-decoration: underline;
  }
  .md blockquote {
    margin: 8px 0;
    padding-left: 12px;
    border-left: 3px solid var(--line);
    color: var(--muted);
  }
  .typing {
    padding-top: 10px;
  }
  .typing span {
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 4px;
    border-radius: 50%;
    background: var(--muted);
    animation: blink 1.2s infinite;
  }
  .typing span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing span:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes blink {
    50% {
      opacity: 0.2;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .typing span,
    .prefs {
      animation: none;
    }
  }

  /* Tool cards */
  .tool {
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--surface);
    font-size: 13.5px;
    position: relative;
    overflow: hidden;
  }
  .tool.waiting {
    border-color: color-mix(in srgb, var(--accent) 55%, var(--line));
    box-shadow:
      0 0 0 3px var(--ring),
      var(--shadow);
  }
  .tool.waiting.risky {
    border-color: color-mix(in srgb, var(--warn) 65%, var(--line));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--warn) 25%, transparent),
      var(--shadow);
  }
  .approval-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    font-weight: 600;
    font-size: 13px;
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    color: var(--accent);
    border-bottom: 1px solid var(--line);
    --mdc-icon-size: 18px;
  }
  .risky .approval-head {
    background: color-mix(in srgb, var(--warn) 13%, transparent);
    color: color-mix(in srgb, var(--warn) 80%, var(--text));
  }
  .approval-head .why {
    font-weight: 400;
    color: var(--text);
  }
  .tool summary {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    cursor: pointer;
    list-style: none;
  }
  .tool summary:hover {
    background: var(--softer);
  }
  .tool summary::-webkit-details-marker {
    display: none;
  }
  .tool details > :not(summary) {
    margin: 0 12px 10px;
  }
  .tool-icon {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--soft);
    color: var(--muted);
    --mdc-icon-size: 16px;
  }
  .tool-name {
    font-weight: 600;
    flex: none;
    text-transform: capitalize;
  }
  .tool-summary {
    color: var(--muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
  .st {
    --mdc-icon-size: 18px;
    flex: none;
  }
  .st.ok {
    color: var(--ok);
  }
  .st.error {
    color: var(--danger);
  }
  .chev {
    --mdc-icon-size: 18px;
    color: var(--muted);
    flex: none;
    transition: transform 0.15s;
  }
  details[open] .chev {
    transform: rotate(180deg);
  }
  .spinner {
    width: 14px;
    height: 14px;
    flex: none;
    border-radius: 50%;
    border: 2px solid var(--hover);
    border-top-color: var(--accent);
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .tag {
    font-size: 11px;
    font-weight: 500;
    color: var(--muted);
    background: var(--soft);
    border-radius: 999px;
    padding: 2px 8px;
    flex: none;
  }
  .tag.wait {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }
  .tag.review.approve {
    color: var(--ok);
    background: color-mix(in srgb, var(--ok) 12%, transparent);
  }
  .tag.review.deny {
    color: var(--danger);
    background: color-mix(in srgb, var(--danger) 12%, transparent);
  }
  .tag.review.ask {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }
  .snapshot {
    display: block;
    max-width: min(100%, 480px);
    margin: 8px 12px;
    border-radius: 8px;
  }
  .review-note {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    margin: 8px 12px;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 13px;
    background: var(--soft);
    color: var(--text);
  }
  .review-note ha-icon {
    --mdc-icon-size: 18px;
    color: var(--muted);
    flex: none;
  }
  .review-note.deny ha-icon {
    color: var(--danger);
  }
  .review-note.approve ha-icon {
    color: var(--ok);
  }
  .diff span {
    display: block;
  }
  .diff .add {
    color: var(--ok);
    background: color-mix(in srgb, var(--ok) 9%, transparent);
  }
  .diff .del {
    color: var(--danger);
    background: color-mix(in srgb, var(--danger) 9%, transparent);
  }
  .diff .hunk {
    color: var(--muted);
  }
  pre.result,
  pre.args {
    max-height: 260px;
    overflow: auto;
    white-space: pre-wrap;
  }
  .note-suggestion {
    --note: #b45309;
    margin: 6px 0;
    padding: 12px 14px;
    border: 1.5px dashed color-mix(in srgb, var(--note) 60%, transparent);
    border-radius: 12px;
    background: color-mix(in srgb, #fde68a 22%, var(--surface));
  }
  .note-head {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    color: var(--note);
    --mdc-icon-size: 22px;
  }
  .note-head strong {
    display: block;
    font-size: 14px;
  }
  .note-head small {
    display: block;
    color: var(--muted);
    margin-top: 2px;
  }
  .note-label {
    margin: 8px 0 0 32px;
    font-size: 12px;
    color: var(--muted);
  }
  .note-lines {
    margin: 8px 0 0 32px;
    padding-left: 18px;
  }
  .note-lines li {
    margin: 3px 0;
  }
  .note-lines.add li {
    font-style: italic;
  }
  .note-lines.del li {
    text-decoration: line-through;
    color: var(--muted);
  }
  .note-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
  }
  .note-save {
    border: 1.5px solid var(--note);
    color: var(--note);
    background: transparent;
    border-radius: 8px;
    padding: 6px 14px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
  .note-save:disabled {
    opacity: 0.45;
    cursor: default;
  }
  :host([data-theme="dark"]) .note-suggestion {
    --note: #fbbf24;
    background: color-mix(in srgb, #fbbf24 8%, var(--surface));
  }
  .approval.phone-wait {
    color: var(--muted);
    font-size: 0.92em;
  }
  .approval {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 12px;
    border-top: 1px solid var(--line);
    background: var(--softer);
  }
  .approval input {
    flex: 1;
    min-width: 160px;
    padding: 7px 10px;
  }
  button.danger-text {
    color: var(--danger);
  }
  button.danger-text:hover {
    background: color-mix(in srgb, var(--danger) 10%, transparent);
    border-color: color-mix(in srgb, var(--danger) 40%, var(--line));
  }
  .undo {
    flex: none;
  }
  .narrow .row.reply {
    padding-left: 0;
  }
  .narrow .avatar {
    display: none;
  }
  .notice {
    align-self: center;
    font-size: 12.5px;
    color: var(--muted);
    text-align: center;
    background: var(--soft);
    border-radius: 999px;
    padding: 5px 6px 5px 14px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    max-width: 90%;
  }
  .notice:not(:has(button)) {
    padding-right: 14px;
  }
  .notice.error {
    color: var(--danger);
    background: color-mix(in srgb, var(--danger) 10%, transparent);
  }
  .notice button {
    margin-left: 8px;
  }

  /* Welcome */
  .welcome {
    margin: auto 0;
    text-align: center;
    color: var(--muted);
    line-height: 1.55;
    padding: 0 8px;
  }
  .welcome .logo {
    width: 56px;
    height: 56px;
    margin: 0 auto 14px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-soft);
    color: var(--accent);
    --mdc-icon-size: 30px;
  }
  .mode-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 14px;
    padding: 4px 12px 4px 8px;
    border-radius: 999px;
    background: var(--soft);
    font-size: 12.5px;
    --mdc-icon-size: 16px;
  }
  .welcome h2 {
    color: var(--text);
    font-size: 26px;
    font-weight: 650;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
  }
  .welcome p {
    max-width: 520px;
    margin: 0 auto;
  }
  .tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px;
    max-width: 620px;
    margin: 24px auto 0;
  }
  .tip {
    border: 1px solid var(--line);
    background: var(--surface);
    color: var(--text);
    border-radius: 14px;
    padding: 12px 14px;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
    text-align: left;
    line-height: 1.4;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    box-shadow: var(--shadow-sm);
    transition:
      border-color 0.12s,
      transform 0.12s,
      box-shadow 0.12s;
  }
  .tip ha-icon {
    color: var(--accent);
    --mdc-icon-size: 18px;
    flex: none;
    margin-top: 1px;
  }
  .tip:hover {
    border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
    box-shadow: var(--shadow);
    transform: translateY(-1px);
  }

  /* Composer */
  footer {
    padding: 8px max(20px, calc((100% - 780px) / 2)) 14px;
    flex: none;
  }
  /* The page the floating chat sends with the next message; a click leaves it out. */
  .page-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
    margin: 0 0 6px 4px;
    padding: 3px 10px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--accent-soft);
    color: inherit;
    font: inherit;
    font-size: 0.85em;
    cursor: pointer;
    --mdc-icon-size: 16px;
  }
  .page-chip span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .page-chip.off {
    background: transparent;
    color: var(--muted);
  }
  .page-chip.off span {
    text-decoration: line-through;
  }
  .composer {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 8px 8px 8px 12px;
    background: var(--surface);
    box-shadow: var(--shadow);
    transition:
      border-color 0.12s,
      box-shadow 0.12s;
  }
  .composer:focus-within {
    border-color: color-mix(in srgb, var(--accent) 60%, var(--line));
    box-shadow:
      var(--shadow),
      0 0 0 3px var(--ring);
  }
  ul.mentions {
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: calc(100% + 6px);
    margin: 0;
    padding: 6px;
    list-style: none;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 14px;
    box-shadow: var(--shadow-lg);
    max-height: 280px;
    overflow-y: auto;
    overscroll-behavior: contain;
    z-index: 5;
  }
  ul.mentions li {
    display: flex;
    gap: 10px;
    align-items: baseline;
    padding: 7px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
  ul.mentions li.active {
    background: var(--accent-soft);
  }
  ul.mentions .kind {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--muted);
    width: 4em;
  }
  ul.mentions .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ul.mentions .detail {
    font-size: 12px;
    color: var(--muted);
    font-family: var(--mono);
  }
  textarea {
    flex: 1;
    border: none;
    resize: none;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 15px;
    line-height: 1.5;
    outline: none;
    max-height: 240px;
    padding: 6px 2px 4px;
  }
  /* The composer is a column flexbox with no set height. flex: 1 on the box gives it
     a flex-basis of 0 there, which lets the engine size it from its one-row minimum
     instead of the height autosize() sets. Reported as "effectively one line"; the
     cause is from reading this CSS, not reproduced in a browser. flex: none makes the
     inline height the size. The cap is a share of the visible viewport: dvh shrinks
     when a phone keyboard opens, so the box never pushes the chat off screen. */
  .composer textarea {
    flex: none;
    box-sizing: border-box;
    min-height: calc(3em + 10px);
    max-height: 50vh;
    max-height: 50dvh;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  /* The Markdown editor that takes the textarea's place (composer.ts). It keeps the
     textarea's type, padding and cap so swapping one for the other moves nothing. Its
     classes are TinyMDE's; none of TinyMDE's own stylesheet is loaded, because its fixed
     colours (black on white, red list markers) ignore the panel's themes. */
  /* Two lines tall when empty and half the visible viewport at most (both asked for on
     2026-11-15; it was one line and 40%). The extra bottom padding keeps the last line,
     often the empty line inside a new code block, off the toolbar's edge. */
  .composer .box {
    font-size: 15px;
    line-height: 1.5;
    padding: 6px 2px 10px;
    outline: none;
    box-sizing: border-box;
    min-height: calc(3em + 16px);
    max-height: 50vh;
    max-height: 50dvh;
    overflow-y: auto;
    overscroll-behavior: contain;
    overflow-wrap: anywhere;
    cursor: text;
  }
  .box.TinyMDE_empty {
    position: relative;
  }
  .box.TinyMDE_empty::before {
    content: attr(data-placeholder);
    position: absolute;
    color: var(--muted);
    pointer-events: none;
  }
  .box .TMMark,
  .box .TMInfoString {
    color: var(--muted);
  }
  .box .TMH1,
  .box .TMSetextH1 {
    font-size: 1.35em;
    font-weight: 650;
    line-height: 1.35;
  }
  .box .TMH2,
  .box .TMSetextH2 {
    font-size: 1.2em;
    font-weight: 650;
    line-height: 1.35;
  }
  .box .TMH3,
  .box .TMH4,
  .box .TMH5,
  .box .TMH6 {
    font-size: 1.05em;
    font-weight: 600;
  }
  /* A list item hangs its wrapped lines under its text, past the marker, as a rendered
     list does; the marker itself is accented so the line reads as a bullet. */
  .box .TMUL,
  .box .TMOL {
    padding-left: 1.1em;
    text-indent: -1.1em;
  }
  .box .TMMark_TMUL,
  .box .TMMark_TMOL {
    color: var(--accent);
    font-weight: 700;
  }
  .box .TMStrong {
    font-weight: 650;
  }
  .box .TMEm {
    font-style: italic;
  }
  .box .TMStrikethrough {
    text-decoration: line-through;
  }
  .box .TMMark_TMCode,
  .box .TMCode {
    font-family: var(--mono);
    font-size: 0.88em;
  }
  .box .TMCode {
    background: var(--soft);
    border-radius: 5px;
    padding: 0.1em 0.2em;
  }
  /* A fenced block: every line of it, fences included, shares one shaded panel. */
  .box .TMCodeFenceBacktickOpen,
  .box .TMCodeFenceTildeOpen,
  .box .TMFencedCodeBacktick,
  .box .TMFencedCodeTilde,
  .box .TMCodeFenceBacktickClose,
  .box .TMCodeFenceTildeClose,
  .box .TMIndentedCode {
    font-family: var(--mono);
    font-size: 13px;
    background: var(--soft);
    padding: 0 10px;
  }
  .box .TMCodeFenceBacktickOpen,
  .box .TMCodeFenceTildeOpen {
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    padding-top: 4px;
  }
  .box .TMCodeFenceBacktickClose,
  .box .TMCodeFenceTildeClose {
    border-radius: 0 0 var(--radius-sm) var(--radius-sm);
    padding-bottom: 4px;
  }
  .box .TMBlockquote {
    border-left: 3px solid var(--line);
    padding-left: 10px;
    color: var(--muted);
  }
  .box .TMLink,
  .box .TMAutolink {
    color: var(--accent);
  }
  /* A picked device, area or entity, drawn like the name chip in a sent message. Inline
     with padding rather than inline-block, so the caret still moves through it letter by
     letter and a long name wraps. */
  .box .TMMention {
    background: var(--accent-soft);
    border-radius: 999px;
    padding: 0.05em 0.45em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
  .composer.dragging {
    border-color: var(--accent);
    box-shadow:
      var(--shadow),
      0 0 0 3px var(--ring);
  }
  .toolbar {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .attach {
    position: relative;
    display: inline-flex;
    color: var(--muted);
    padding: 7px;
    border-radius: 10px;
    cursor: pointer;
  }
  .attach:hover,
  .attach:focus-within {
    background: var(--hover);
    color: var(--text);
  }
  .attach:focus-within {
    outline: 2px solid var(--accent);
  }
  .attach input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
  }
  .attached {
    display: flex;
    gap: 8px;
    padding: 4px 0 8px;
    flex-wrap: wrap;
  }
  .thumb {
    position: relative;
  }
  .thumb img,
  .photos img {
    display: block;
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid var(--line);
  }
  .thumb button.icon {
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 2px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 50%;
    --mdc-icon-size: 14px;
  }
  .photos {
    display: flex;
    gap: 6px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }
  .photos img {
    width: 120px;
    height: 120px;
  }
  .files {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }
  .attached.files {
    margin-bottom: 0;
  }
  .file {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
    min-width: 0;
    padding: 4px 8px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: var(--surface);
    color: var(--text);
    font-size: 13px;
    white-space: nowrap;
    --mdc-icon-size: 18px;
  }
  .file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
    min-width: 0;
  }
  .file-meta {
    color: var(--muted);
    font-size: 12px;
    flex: none;
  }
  .file button.icon {
    padding: 2px;
    margin-right: -4px;
    --mdc-icon-size: 14px;
  }
  @media (max-width: 600px) {
    .file-name {
      max-width: 40vw;
    }
  }
  .photo-note {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--muted);
    font-size: 0.85em;
    margin-bottom: 4px;
    --mdc-icon-size: 16px;
  }
  .spacer {
    flex: 1;
  }
  .model-pill {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 0 4px 0 8px;
    height: 32px;
    border-radius: 999px;
    background: var(--soft);
    color: var(--muted);
    font-size: 12.5px;
    max-width: 100%;
    min-width: 0;
    --mdc-icon-size: 15px;
  }
  .model-pill:hover {
    background: var(--hover);
  }
  .model-pill .sep {
    opacity: 0.5;
  }
  .model-pill select,
  .model-pill input {
    border: none;
    background: transparent;
    color: var(--text);
    font-size: 12.5px;
    padding: 4px 2px;
    box-shadow: none;
  }
  .model-pill select {
    max-width: 140px;
  }
  .model-pill input.model {
    width: 170px;
  }
  .model-pill select:focus,
  .model-pill input:focus {
    box-shadow: none;
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-underline-offset: 4px;
  }
  textarea::placeholder {
    color: var(--muted);
    opacity: 0.8;
  }
  button.send {
    width: 34px;
    height: 34px;
    padding: 0;
    flex: none;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: var(--shadow-sm);
  }
  button.send:hover {
    filter: brightness(1.1);
  }
  button.send:disabled {
    opacity: 0.4;
    filter: none;
    cursor: default;
  }
  button.send.stop {
    background: var(--text);
    color: var(--bg);
  }
  .meta {
    display: flex;
    gap: 8px;
    align-items: center;
    min-height: 18px;
    margin-top: 6px;
    padding: 0 6px;
    font-size: 12px;
    color: var(--muted);
    flex-wrap: wrap;
  }
  .usage {
    margin-left: auto;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  /* Controls */
  select,
  input {
    background: var(--surface);
    color: inherit;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 5px 8px;
    font: inherit;
    font-size: 13px;
    outline: none;
    transition:
      border-color 0.12s,
      box-shadow 0.12s;
  }
  select:focus,
  input:focus {
    border-color: color-mix(in srgb, var(--accent) 60%, var(--line));
    box-shadow: 0 0 0 3px var(--ring);
  }
  button {
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid transparent;
    padding: 7px 14px;
    transition:
      background 0.12s,
      border-color 0.12s,
      filter 0.12s;
  }
  button.primary {
    background: var(--accent);
    color: var(--on-accent);
  }
  button.primary:hover,
  button.danger:hover {
    filter: brightness(1.08);
  }
  button.danger {
    background: var(--danger);
    color: #fff;
  }
  button.ghost {
    background: transparent;
    color: var(--text);
    border-color: var(--line);
  }
  button.ghost:hover {
    background: var(--hover);
  }
  button.icon {
    background: transparent;
    color: var(--muted);
    padding: 7px;
    line-height: 0;
    border-radius: 10px;
  }
  button.icon:hover {
    background: var(--hover);
    color: var(--text);
  }
  .preview {
    padding: 6px 12px 10px;
  }
  .preview button ha-icon {
    --mdc-icon-size: 16px;
    vertical-align: -3px;
  }
  button.small {
    padding: 3px 10px;
    font-size: 12px;
    border-radius: 8px;
  }
  button.small:not(.ghost):not(.primary):not(.danger) {
    background: var(--soft);
    color: var(--text);
  }
  button.small:not(.ghost):not(.primary):not(.danger):hover {
    background: var(--hover);
  }
  button.wide {
    width: 100%;
  }
  button:focus-visible,
  .tip:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .empty {
    padding: 32px;
    color: var(--muted);
    text-align: center;
  }
`, yl = {
	asked: "changes_asked",
	auto: "changes_auto",
	rule: "changes_rule",
	reviewer: "reviewer_approved",
	denied: "denied"
}, bl = (e) => e.message ?? String(e), xl = class extends Ve {
	constructor(...e) {
		super(...e), this.s = {
			changes: [],
			cursor: null,
			chats: [],
			users: [],
			error: "",
			loading: !1
		}, this.f = {
			from: "",
			to: "",
			chat: "",
			user: "",
			text: ""
		}, this.gen = 0;
	}
	static {
		this.styles = [vl, s`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
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
.more{padding:12px 20px}`];
	}
	connectedCallback() {
		super.connectedCallback(), this.load();
	}
	get zone() {
		let e = this.hass;
		return e?.locale?.time_zone === "server" ? e.config?.time_zone : void 0;
	}
	async load(e = !1) {
		let { hass: t, f: n, s: r } = this;
		if (!t) return;
		let i = ++this.gen;
		this.s = {
			...r,
			loading: !0
		};
		let a;
		try {
			let i = await t.connection.sendMessagePromise({
				type: "llm_agent/changes",
				since: n.from ? Sl(n.from, 0, this.zone) : null,
				until: n.to ? Sl(n.to, 1, this.zone) - .001 : null,
				conversation_id: n.chat || null,
				user_id: n.user || null,
				text: n.text,
				cursor: e ? r.cursor : null
			});
			a = {
				...i,
				changes: e ? [...r.changes, ...i.changes] : i.changes,
				error: ""
			};
		} catch (e) {
			a = { error: bl(e) };
		}
		i === this.gen && (this.s = {
			...this.s,
			...a,
			loading: !1
		});
	}
	set(e) {
		return (t) => {
			this.f = {
				...this.f,
				[e]: t.target.value
			}, clearTimeout(this.timer), this.timer = window.setTimeout(() => void this.load(), e === "text" ? 300 : 0);
		};
	}
	async undo(e) {
		if (confirm(R("confirm_undo", { name: e.detail || e.tool }))) {
			try {
				await this.hass.connection.sendMessagePromise({
					type: "llm_agent/undo",
					snapshot_id: e.snapshot_id,
					...e.conversation_id ? { conversation_id: e.conversation_id } : {}
				});
			} catch (e) {
				this.s = {
					...this.s,
					error: bl(e)
				};
				return;
			}
			await this.load();
		}
	}
	fmt(e) {
		let t = this.hass?.locale?.time_format;
		return new Intl.DateTimeFormat(this.hass?.locale?.language, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone: this.zone,
			...t === "12" || t === "24" ? { hour12: t === "12" } : {}
		}).format(e * 1e3);
	}
	render() {
		let { s: e } = this, t = (e, t) => S`<option value=${e}>${t}</option>`;
		return S`<div class="bar">
<input type="date" aria-label=${R("changes_from")} title=${R("changes_from")} @change=${this.set("from")}>
<input type="date" aria-label=${R("changes_to")} title=${R("changes_to")} @change=${this.set("to")}>
<select aria-label=${R("conversation")} @change=${this.set("chat")}>${t("", R("changes_all_chats"))}${e.chats?.map((e) => t(e.id, e.title || R("new_chat")))}</select>
<select aria-label=${R("changes_user")} @change=${this.set("user")}>${t("", R("changes_everyone"))}${e.users?.map((e) => t(e.id, e.name))}</select>
<input type="search" placeholder=${R("changes_search")} aria-label=${R("changes_search")} @input=${this.set("text")}>
</div>${e.error ? S`<div class="empty">${R("changes_error", { error: e.error })}</div>` : !e.loading && !e.changes.length ? S`<div class="empty">${R("changes_none")}</div>` : C}${e.changes.map((e) => this.row(e))}${e.cursor ? S`<div class="more"><button class="small" ?disabled=${e.loading} @click=${() => this.load(!0)}>${R("changes_more")}</button></div>` : C}`;
	}
	row(e) {
		let t = `tool_${e.tool}`, n = (e, t = !1, n = "") => S`<span class="tag ${t ? "bad" : ""}" title=${n}>${e}</span>`;
		return S`<div class="row"><span class="t">${this.fmt(e.time)}</span><span class="c">${e.conversation_id ? S`<button class="link" @click=${() => this.dispatchEvent(new CustomEvent("open-chat", { detail: e.conversation_id }))}>${e.chat_title ?? R("changes_deleted_chat")}</button>` : C}</span><span class="u">${e.user_name ?? (e.user_id ? e.user_id.slice(0, 8) : R("changes_no_user"))}</span>
<div class="w"><b class="what">${xa(t) ? R(t) : e.tool.replace(/_/g, " ")}</b><code title=${e.args}>${e.args}</code></div>
<div class="o">${e.approval ? n(R(yl[e.approval]), e.approval === "denied") : C}${e.approval === "denied" ? C : n(e.ok ? R("done") : R("failed"), !e.ok)}<span>${e.detail}</span>${e.undo === "undone" ? n(R("undone")) : C}${e.undo === "gone" ? n(R("changes_undo_gone"), !1, R("changes_undo_gone_title")) : C}${e.undo === "available" ? S`<button class="ghost small" title=${R("undo_title")} @click=${() => this.undo(e)}>${R("undo")}</button>` : C}</div></div>`;
	}
};
Y([D({ attribute: !1 })], xl.prototype, "hass", void 0), Y([O()], xl.prototype, "s", void 0);
function Sl(e, t, n) {
	let [r, i, a] = e.split("-").map(Number);
	if (!n) return new Date(r, i - 1, a + t).getTime() / 1e3;
	let o = Date.UTC(r, i - 1, a + t);
	return (o - Cl(o - Cl(o, n), n)) / 1e3;
}
function Cl(e, t) {
	let n = {};
	for (let r of new Intl.DateTimeFormat("en-US", {
		timeZone: t,
		hourCycle: "h23",
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	}).formatToParts(e)) n[r.type] = +r.value;
	return Date.UTC(n.year, n.month - 1, n.day, n.hour, n.minute, n.second) - Math.floor(e / 1e3) * 1e3;
}
customElements.define("llm-agent-changes", xl);
//#endregion
//#region node_modules/solid-js/dist/internal.js
var wl = Ei, Tl = ca, El = /*#__PURE__*/ Symbol("slot"), Dl = /*#__PURE__*/ Symbol("index"), Ol = {
	transparent: !0,
	sync: !0
}, kl = { sync: !0 };
function Al(e, t, n) {
	fa(e, t, n ? {
		sync: !0,
		...n,
		transparent: !n.scope
	} : Ol);
}
function X(e) {
	return la(() => e(), kl);
}
function jl(e, t, n, r) {
	let i = n.length, a = t.length, o = i, s = 0, c = 0, l, u, d, f;
	for (; s < a && t[s] === n[c];) s++, c++;
	if (s === a && c === o) return;
	let p = e.moveBefore && e.isConnected, m = r || e, h = (t, n) => {
		p && t.isConnected ? e.moveBefore(t, n) : e.insertBefore(t, n), (r || t[El]) && (t[El] = m);
	};
	if (!a) {
		for (let e of n) h(e, r);
		return;
	}
	let g = (t) => t && t.parentNode === e && (!(t = t[El]) || t === m), _ = (t) => {
		for (; t < i && !g(n[t]);) t++;
		return n[t] || (u && u.parentNode !== e ? r || null : u);
	};
	for (u = g(f = t[a - 1]) ? f.nextSibling : r || null; s < a || c < o;) if (t[s] === n[c]) s++, c++;
	else {
		for (; a > s && o > c && t[a - 1] === n[o - 1];) a--, o--;
		if (a === s) for (f = _(o); c < o;) h(n[c++], f);
		else if (!g(f = t[s])) s++;
		else if (n[c] === t[a - 1] && (f === n[o - 1] || !l && f === n[c + 1] && t[s + 1] === n[c + 2])) do
			h(t[--a], f), c++;
		while (s < a - 1 && c < o && f === n[o - 1] && n[c] === t[a - 1]);
		else if (c < o && f === n[o - 1] && t[s + 1] !== n[o - 2] && g(n[c]) && g(t[a - 1])) h(f, _(o)), s++, o--;
		else {
			if (!l) for (l = 1, d = c; d < o;) n[d][Dl] = d++;
			if ((d = f[Dl]) >= 0 && n[d] === f) {
				if (c < d && d < o) {
					let i = s, l = 1;
					for (; ++i < a && i < o && t[i] === n[d + l];) l++;
					if (l > d - c) for (; c < d;) h(n[c++], f);
					else {
						let t = n[c++];
						s++, p ? h(t, f) : e.replaceChild(t, f), (r || t[El]) && (t[El] = m);
					}
				} else s++;
			} else f.remove(), s++;
		}
	}
}
var Ml = "_$$", Nl = "_$SOLID_EVENT_OWNER", Pl = Symbol(), Fl = {}, Il = /* @__PURE__ */ new Set(), Ll = /* @__PURE__ */ new Map();
function Rl(e, t, n, r = {}) {
	let i;
	Vl(t);
	try {
		da((a) => {
			i = a, r.onError && (Rt()[Bn] = r.onError);
			let o = e();
			t === document ? Al(() => oa(o), () => {}) : Q(t, () => o, t.firstChild ? null : void 0, n, {
				...r.insertOptions,
				schedule: !0
			});
		}, { id: r.renderId }), or();
	} catch (e) {
		throw i && i(), Hl(t), e;
	}
	return () => {
		i(), Hl(t), t.textContent = "";
	};
}
function zl(e, t, n) {
	let r = document.createElement("template");
	r.innerHTML = e;
	let i = r.content.firstChild;
	return n === 2 ? i.firstChild : i;
}
function Z(e, t) {
	let n;
	return (r) => (n ||= zl(e, r, t), t === 1 ? document.importNode(n, !0) : n.cloneNode(!0));
}
function Bl(e) {
	for (let t of e) Il.has(t) || (Il.add(t), Ll.forEach((e, n) => Kl(t, n, e)));
}
function Vl(e) {
	Ul(e, e);
}
function Hl(e) {
	Wl(e, e);
}
function Ul(e, t = e) {
	if (!e || !t) return;
	let n = Ll.get(e);
	n || Ll.set(e, n = {
		owners: /* @__PURE__ */ new Map(),
		handlers: /* @__PURE__ */ new Map()
	}), n.owners.set(t, (n.owners.get(t) || 0) + 1), Il.forEach((t) => Kl(t, e, n));
}
function Wl(e, t = e) {
	let n = Ll.get(e);
	if (!n) return;
	let r = n.owners.get(t);
	r > 1 ? n.owners.set(t, r - 1) : n.owners.delete(t), !n.owners.size && (n.handlers.forEach((t, n) => {
		e.removeEventListener(n, Gl, !0), e.removeEventListener(n, t);
	}), Ll.delete(e));
}
function Gl(e) {
	delete e[Nl];
}
function Kl(e, t, n) {
	if (n.handlers.has(e)) return;
	let r = (e) => ou(e, t, n);
	n.handlers.set(e, r), t.addEventListener(e, Gl, !0), t.addEventListener(e, r);
}
var ql = (e) => e._$host || e.parentNode || e.host;
function Jl(e, t) {
	let n = 0;
	for (; e;) {
		if (t.owners.has(e)) return {
			owner: e,
			distance: n
		};
		n++, e = ql(e);
	}
}
var Yl = null, Xl = [];
function Zl(e, t) {
	for (let n = 0; n < e.length; n++) e[n](t);
}
function Ql(e, t) {
	Yl !== null && e._$claimed && Xl.some((e) => e.includes(t.slice(t.indexOf(":") + 1))) && Zl(Yl, e);
}
function $l(e, t, n) {
	if (iu(e)) return;
	let r = t === "multiple" && e.localName === "select";
	if (n == null || n === !1) e.removeAttribute(t);
	else if (e.setAttribute(t, n === !0 ? "" : n), r && !e._$multiple) {
		let t = e.options;
		for (let e = 0; e < t.length; e++) t[e].defaultSelected && (t[e].selected = !0);
	}
	r && (e._$multiple = !0), Ql(e, t);
}
function eu(e, t, n, r) {
	if (r) {
		let r = Ml + t, i;
		Array.isArray(n) ? (i = n[1], e[r] = n[0]) : e[r] = n, e[`${r}Data`] = i;
	} else {
		if (Array.isArray(n)) {
			let r = n[0], i = (t) => r.call(e, n[1], t);
			return i[Pl] = n, e.addEventListener(t, i), i;
		}
		return e.addEventListener(t, n, typeof n != "function" && n), n;
	}
}
var tu = { scope: !0 }, nu = null, ru = null;
function Q(e, t, n, r, i) {
	let a = n !== void 0;
	if (a && !r && (r = []), nu !== null && (r = nu.claimInitial(e, a, r)), typeof t != "function" && (t = cu(t, r, a, !0), typeof t != "function")) {
		su(e, t, r, n), ru !== null && i && i.host && ru(t, i.host);
		return;
	}
	if (a && r.length === 0) {
		let t = document.createTextNode("");
		e.insertBefore(t, n), r = [t];
	}
	let o = !1;
	Al(() => {
		nu !== null && (r = nu.reclaimRegion(r, e, n));
		let s = cu(t(), r, a, !0), c = o;
		return o = !0, typeof s == "function" ? (Al(() => (nu !== null && (r = nu.reclaimRegion(r, e, n)), cu(s, r, a)), (t) => {
			r = su(e, t, r, n), ru !== null && i && i.host && ru(r, i.host);
		}, c && !(i && i.schedule) ? {
			...i,
			schedule: !0
		} : i), Fl) : s;
	}, (t) => {
		t !== Fl && (r = su(e, t, r, n), ru !== null && i && i.host && ru(r, i.host));
	}, t.$s ? i ? {
		...i,
		scope: !0
	} : tu : i);
}
function iu(e) {
	return !Tl.hydrating || Tl.isClaiming && !Tl.isClaiming() ? !1 : !e || e.isConnected ? !0 : au !== null && au.claimed(e);
}
var au = null;
function ou(e, t, n) {
	if (nu !== null && nu.dedupEvent(e)) return;
	let r = e[Nl], i;
	if (r) {
		if (r === !0 || r === t || !t.contains(r)) return;
		i = r;
	}
	let a = n.owners.size === 1 && n.owners.has(t) ? t : Jl(e.target, n)?.owner;
	if (!a || a === i) return;
	e[Nl] = a;
	let o = i || e.target, s = Ml + e.type, c = (t, n) => Object.defineProperty(e, t, {
		configurable: !0,
		value: n
	}), l = () => {
		let t = o[s];
		if (t && !o.disabled) {
			c("currentTarget", o);
			let n = o[`${s}Data`];
			if (n === void 0 ? typeof t == "function" ? t.call(o, e) : t.handleEvent(e) : t.call(o, n, e), e.cancelBubble) return;
		}
		return o.host && typeof o.host != "string" && !o.host._$host && o.contains(e.target) && c("target", o.host), !0;
	}, u = () => o === a || o.parentNode === a, d = () => {
		for (; o && l() && !u();) o = ql(o);
	};
	if (i) i === e.target && (o = ql(i)), o && o !== a && d();
	else if (e.composedPath) {
		let t = e.composedPath();
		if (t.length) {
			c("target", t[0]);
			for (let e = 0; e < t.length && (o = t[e], l()); e++) {
				if (o._$host) {
					o = o._$host, d();
					break;
				}
				if (u()) break;
			}
		} else d();
	} else d();
	delete e.target, delete e.currentTarget;
}
function su(e, t, n, r) {
	if (nu !== null && iu(e)) {
		if (t && t !== n) {
			let e = Array.isArray(t);
			for (let r of e ? t : [t]) if (r && r.nodeType) {
				if (!iu(r)) return n;
			} else if (e && (typeof r == "string" || typeof r == "number")) return n;
		}
		return t;
	}
	if (t === n) return t;
	if (nu !== null && Tl.hydrating && t && t.length !== 0) {
		let r = [].concat(n ?? []);
		if ([].concat(t).every((t) => (t === r[0] && r.shift(), t?.parentNode === e)) && !r.length) return t;
	}
	let i = typeof t;
	if (i === "string" || i === "number") {
		let r = typeof n;
		r === "string" || r === "number" ? e.firstChild.data = t : lu(e, n) ? e.textContent = t : (uu(e, n), e.insertBefore(document.createTextNode(t), e.firstChild));
	} else if (t === void 0) du(e, n, r);
	else if (t.nodeType) Array.isArray(n) ? du(e, n, r ?? null, t) : n != null && n.nodeType ? n.parentNode === e ? e.replaceChild(t, n) : e.appendChild(t) : n != null && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t), (r || t[El]) && (t[El] = r || e);
	else if (Array.isArray(t)) {
		let i = Array.isArray(n);
		for (let e = 0, r = t.length; e < r; e++) {
			let r = t[e], a = typeof r;
			if (a === "string" || a === "number") {
				let a = i ? n[e] : void 0;
				if (a && a.nodeType === 3) {
					let n = a._$d;
					n !== r && (n !== void 0 || a.data !== "" + r) && (a.data = a._$d = r), t[e] = a;
				} else t[e] = document.createTextNode(r);
			}
		}
		t.length === 0 ? du(e, n, r) : i ? jl(e, n, t, r) : (n != null && du(e, n), jl(e, [], t));
	}
	return t;
}
function cu(e, t, n, r) {
	if (e = oa(e, {
		skipNonRendered: !0,
		doNotUnwrap: r
	}), r && typeof e == "function") return e;
	if (n && !Array.isArray(e) && (e = [e ?? ""]), nu !== null && Tl.hydrating && Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
		let r = e[n], i = t && t[n], a = typeof r;
		(a === "string" || a === "number") && i && i.nodeType === 3 && iu(i) && (e[n] = i);
	}
	return e;
}
function lu(e, t) {
	if (t == null) return !0;
	if (Array.isArray(t)) return t.length ? e.firstChild === t[0] && e.lastChild === t[t.length - 1] : e.firstChild === null;
	if (t === "") return e.firstChild === null;
	if (t.nodeType) return e.firstChild === t && e.lastChild === t;
	let n = e.firstChild;
	return n !== null && n.nodeType === 3 && e.lastChild === n;
}
function uu(e, t) {
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.parentNode === e && r.remove();
	}
	else if (t.nodeType) t.parentNode === e && t.remove();
	else {
		let t = e.firstChild;
		t && t.nodeType === 3 && t.remove();
	}
}
function du(e, t, n, r) {
	if (n === void 0) return lu(e, t) ? e.textContent = "" : uu(e, t);
	if (t.length) {
		let i = !1;
		for (let a = t.length - 1; a >= 0; a--) {
			let o = t[a];
			if (r !== o) {
				let t = o[El], s = o.parentNode === e && (!t || t === (n || e));
				r && !i && !a ? s ? e.replaceChild(r, o) : e.insertBefore(r, n) : s && o.remove();
			} else i = !0;
		}
	} else r && e.insertBefore(r, n);
	r && (n || r[El]) && (r[El] = n || e);
}
//#endregion
//#region src/element.tsx
function fu(e) {
	let t = new CSSStyleSheet();
	return t.replaceSync(e), t;
}
function pu(e, t) {
	if (customElements.get(e)) return;
	class n extends HTMLElement {
		#e = /* @__PURE__ */ new Map();
		#t;
		constructor() {
			super();
			for (let e of t.props) if (this.#e.set(e, ua()), Object.prototype.hasOwnProperty.call(this, e)) {
				let t = this[e];
				delete this[e], this[e] = t;
			}
		}
		#n = /* @__PURE__ */ new Map();
		_get(e) {
			return this.#n.get(e);
		}
		_set(e, t) {
			this.#n.set(e, t), this.#e.get(e)[1](() => t);
		}
		connectedCallback() {
			if (this.#t) return;
			let e = this.shadowRoot ?? this.attachShadow({ mode: "open" });
			e.adoptedStyleSheets = t.styles();
			let n = {};
			for (let [e, [t]] of this.#e) n[e] = t;
			this.#t = Rl(() => t.view(n, this), e);
		}
		disconnectedCallback() {
			queueMicrotask(() => {
				!this.isConnected && this.#t && (this.#t(), this.#t = void 0, this.shadowRoot?.replaceChildren());
			});
		}
	}
	for (let e of t.props) Object.defineProperty(n.prototype, e, {
		get() {
			return this._get(e);
		},
		set(t) {
			this._set(e, t);
		},
		configurable: !0
	});
	customElements.define(e, n);
}
function mu(e, t) {
	return la(() => {
		let n = e();
		return n ? t(n) : void 0;
	});
}
//#endregion
//#region src/notes.tsx
var hu = /* @__PURE__ */ Z("<button class=small role=tab>"), gu = /* @__PURE__ */ Z("<div class=\"row ed\"><button class=\"small primary\"></button><button class=\"small ghost\">"), _u = /* @__PURE__ */ Z("<input maxlength=80>"), vu = /* @__PURE__ */ Z("<input maxlength=200>"), yu = /* @__PURE__ */ Z("<textarea rows=14 maxlength=20000>"), bu = /* @__PURE__ */ Z("<textarea rows=2>"), xu = /* @__PURE__ */ Z("<div class=row><input type=checkbox><div> <!>"), Su = /* @__PURE__ */ Z("<b>"), Cu = /* @__PURE__ */ Z("<span class=tag>"), wu = /* @__PURE__ */ Z("<span class=err>"), Tu = /* @__PURE__ */ Z("<button class=\"small danger\">"), Eu = /* @__PURE__ */ Z("<button class=\"small ghost\">"), Du = /* @__PURE__ */ Z("<div class=bar role=tablist><!><span></span><button class=\"small primary\">"), Ou = /* @__PURE__ */ Z("<p>"), ku = /* @__PURE__ */ Z("<p class=err>"), Au = /* @__PURE__ */ Z("<div class=empty>"), ju = fu(":host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none}\n.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}\n.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}\n.bar span{flex:1;text-align:end}\n.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}\n.off>div{opacity:.55}\n.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}\n.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}\n.ed button{flex:none}\n.err{color:var(--danger)}");
function Mu(e) {
	let t = mu(e.hass, (e) => e.connection), [n, r] = ua(), [i, a] = ua(!1), [o, s] = ua(), [c, l] = ua(""), [u, d] = ua(""), f = () => {
		s(void 0), l("");
	};
	async function p(e, n = {}) {
		let i = t(), a = (e, t = {}) => i.sendMessagePromise({
			type: "llm_agent/home_notes" + e,
			...t
		});
		try {
			r(await a(e, n)), f(), d("");
		} catch (e) {
			let t = e;
			d(t.message ?? String(e)), t.code === "changed" && (r(await a("")), f());
		}
	}
	let m = !1;
	pa(() => t() !== void 0, (e) => {
		e && !m && (m = !0, p(""));
	});
	let h = (e, t, n = {}) => p(e, {
		kind: i() ? "knowledge" : "note",
		...t.id ? {
			item_id: t.id,
			base: t.updated
		} : {},
		...n
	}), g = () => (i() ? n()?.knowledge : n()?.notes) ?? [], _ = (e) => (() => {
		var t = hu();
		return t._$$click = () => {
			a(e.on), f(), d("");
		}, Q(t, () => R(e.label)), Al(() => e.on === i() ? "true" : "false", (e) => {
			$l(t, "aria-selected", e);
		}), t;
	})(), ee = (e) => {
		let t = (t) => (n) => Object.assign(e.e, { [t]: n.target.value }), r = () => h("/save", e.e, i() ? {
			title: e.e.title,
			summary: e.e.summary,
			body: e.e.body
		} : { text: e.e.text });
		var a = gu(), o = a.firstChild, c = o.nextSibling;
		return Q(a, (() => {
			var r = X(() => !!i());
			return () => r() ? [
				(() => {
					var n = _u();
					return eu(n, "input", t("title"), !0), Al(() => ({
						e: R("knowledge_title"),
						t: R("knowledge_title"),
						a: e.e.title ?? "",
						o: wl()
					}), ({ e, t, a: r, o: i }, a) => {
						e !== a?.e && $l(n, "aria-label", e), t !== a?.t && $l(n, "placeholder", t), (r !== a?.a || !i) && (n.value = r ?? "");
					}), n;
				})(),
				(() => {
					var n = vu();
					return eu(n, "input", t("summary"), !0), Al(() => ({
						e: R("knowledge_summary"),
						t: R("knowledge_summary"),
						a: e.e.summary ?? "",
						o: wl()
					}), ({ e, t, a: r, o: i }, a) => {
						e !== a?.e && $l(n, "aria-label", e), t !== a?.t && $l(n, "placeholder", t), (r !== a?.a || !i) && (n.value = r ?? "");
					}), n;
				})(),
				(() => {
					var n = yu();
					return eu(n, "input", t("body"), !0), Al(() => ({
						e: R("knowledge_body"),
						t: R("knowledge_body"),
						a: e.e.body ?? "",
						o: wl()
					}), ({ e, t, a: r, o: i }, a) => {
						e !== a?.e && $l(n, "aria-label", e), t !== a?.t && $l(n, "placeholder", t), (r !== a?.a || !i) && (n.value = r ?? "");
					}), n;
				})()
			] : (() => {
				var r = bu();
				return eu(r, "input", t("text"), !0), Al(() => ({
					e: R("home_notes"),
					t: R("notes_placeholder"),
					a: n()?.note_max ?? 300,
					o: e.e.text ?? "",
					i: wl()
				}), ({ e, t, a: n, o: i, i: a }, o) => {
					e !== o?.e && $l(r, "aria-label", e), t !== o?.t && $l(r, "placeholder", t), n !== o?.a && $l(r, "maxlength", n), (i !== o?.o || !a) && (r.value = i ?? "");
				}), r;
			})();
		})(), o), o._$$click = r, Q(o, () => R("save")), c._$$click = () => s(void 0), Q(c, () => R("cancel")), a;
	}, te = (e) => (() => {
		var t = xu(), n = t.firstChild, r = n.nextSibling, a = r.firstChild, o = a.nextSibling;
		return n.addEventListener("change", () => h("/save", e.i, { enabled: !e.i.enabled })), Q(r, (() => {
			var t = X(() => !!i());
			return () => t() ? [
				(() => {
					var t = Su();
					return Q(t, () => e.i.title), t;
				})(),
				" ",
				X(() => e.i.summary)
			] : e.i.text;
		})(), a), Q(r, (() => {
			var t = X(() => e.i.added_by === "agent");
			return () => t() ? (() => {
				var e = Cu();
				return Q(e, () => R("note_from_ai")), e;
			})() : void 0;
		})(), o), Q(t, (() => {
			var t = X(() => c() === e.i.id);
			return () => t() ? [
				(() => {
					var e = wu();
					return Q(e, () => R("delete_confirm")), e;
				})(),
				(() => {
					var t = Tu();
					return t._$$click = () => h("/delete", e.i), Q(t, () => R("delete")), t;
				})(),
				(() => {
					var e = Eu();
					return e._$$click = () => l(""), Q(e, () => R("cancel")), e;
				})()
			] : [(() => {
				var t = Eu();
				return t._$$click = () => {
					s({ ...e.i }), l(""), d("");
				}, Q(t, () => R("edit")), t;
			})(), (() => {
				var t = Eu();
				return t._$$click = () => l(e.i.id), Q(t, () => R("delete")), t;
			})()];
		})(), null), Al(() => ({
			e: !e.i.enabled,
			t: R("note_enabled"),
			a: R("note_enabled"),
			o: !!e.i.enabled,
			i: wl()
		}), ({ e, t: r, a: i, o: a, i: o }, s) => {
			e !== s?.e && t.classList.toggle("off", e), r !== s?.t && $l(n, "aria-label", r), i !== s?.a && $l(n, "title", i), (a !== s?.o || !o) && (n.checked = a);
		}), t;
	})();
	return [
		(() => {
			var e = Du(), t = e.firstChild, r = t.nextSibling, a = r.nextSibling;
			return Q(e, ma(_, {
				on: !1,
				label: "notes_tab"
			}), t), Q(e, ma(_, {
				on: !0,
				label: "knowledge_tab"
			}), r), Q(r, (() => {
				var e = X(() => !(!i() && n()));
				return () => e() ? "" : R("characters_left", { count: n().room });
			})()), a._$$click = () => s({
				id: "",
				text: "",
				title: "",
				summary: "",
				body: ""
			}), Q(a, () => R("add")), e;
		})(),
		(() => {
			var e = Ou();
			return Q(e, () => R(i() ? "knowledge_hint" : "notes_hint")), e;
		})(),
		X(() => X(() => !!u())() ? (() => {
			var e = ku();
			return Q(e, u), e;
		})() : void 0),
		X(() => X(() => o()?.id === "")() ? ma(ee, { get e() {
			return o();
		} }) : void 0),
		X(() => X(() => !(!n() || g().length || o()))() ? (() => {
			var e = Au();
			return Q(e, () => R("notes_none")), e;
		})() : void 0),
		ma(ha, {
			get each() {
				return g();
			},
			keyed: (e) => e.id,
			children: (e) => X(() => X(() => o()?.id === e().id)() ? ma(ee, { get e() {
				return o();
			} }) : ma(te, { get i() {
				return e();
			} }))
		})
	];
}
pu("llm-agent-notes", {
	props: ["hass"],
	styles: () => [vl.styleSheet, ju],
	view: (e) => ma(Mu, e)
}), Bl(["click", "input"]);
//#endregion
//#region src/usage.ts
var Nu = (e) => e.message ?? String(e), Pu = class extends Ve {
	constructor(...e) {
		super(...e), this.s = {
			days: 30,
			error: ""
		}, this.gen = 0;
	}
	static {
		this.styles = [vl, s`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
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
.err{color:var(--danger)}`];
	}
	connectedCallback() {
		super.connectedCallback(), this.load(this.s.days), this.hass?.connection.sendMessagePromise({ type: "llm_agent/balance" }).then((e) => this.s = {
			...this.s,
			b: e.providers
		}, () => void 0);
	}
	async load(e) {
		if (!this.hass) return;
		let t = ++this.gen;
		this.s = {
			...this.s,
			days: e
		};
		try {
			let n = await this.hass.connection.sendMessagePromise({
				type: "llm_agent/usage",
				days: e
			});
			t === this.gen && (this.s = {
				...this.s,
				u: n,
				error: ""
			});
		} catch (e) {
			t === this.gen && (this.s = {
				...this.s,
				error: Nu(e)
			});
		}
	}
	get loc() {
		return this.hass?.locale?.language;
	}
	money(e) {
		return new Intl.NumberFormat(this.loc, {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: e && Math.abs(e) < 1 ? 4 : 2
		}).format(e);
	}
	num(e) {
		return new Intl.NumberFormat(this.loc, { notation: "compact" }).format(e);
	}
	date(e) {
		let [t, n, r] = e.split("-").map(Number);
		return new Intl.DateTimeFormat(this.loc, {
			dateStyle: "medium",
			timeZone: "UTC"
		}).format(Date.UTC(t, n - 1, r));
	}
	render() {
		let { u: e, b: t, days: n, error: r } = this.s, i = (e) => S`<button class="small" role="tab" aria-selected=${n === e} @click=${() => this.load(e)}>${R("usage_days", { n: e })}</button>`;
		return S`<div class="bar" role="tablist">${i(7)}${i(30)}${i(90)}</div>${r ? S`<p class="err">${R("usage_error", { error: r })}</p>` : C}${e ? this.body(e) : C}${t?.map((e) => this.balance(e))}`;
	}
	body(e) {
		let t = (e, t, n = "") => S`<div title=${n}>${e}<b>${this.money(t)}</b></div>`, n = e.all_time, r = e.cap > 0 ? Math.round(e.cap_used / e.cap * 100) : 0;
		return S`<div class="tot">${t(R("usage_today"), e.totals.today)}${t(R("usage_week"), e.totals.week)}${t(R("usage_month"), e.totals.month)}${t(R("usage_all_time"), n.total, R("usage_all_time_hint", { count: n.chat_count }))}</div>${e.cap > 0 ? S`<p>${R("usage_cap", {
			cap: this.money(e.cap),
			used: this.money(e.cap_used),
			pct: r
		})}</p>` : C}${this.chart(e.series)}<p>${e.since ? e.filled_from ? R("usage_since_filled", { date: this.date(e.since) }) : R("usage_since", { date: this.date(e.since) }) : R("usage_none")} ${R("usage_all_time_hint", { count: n.chat_count })} ${R("usage_estimate")}</p>${e.breakdown.length ? this.table(e.breakdown) : C}`;
	}
	chart(e) {
		let t = Math.max(...e.map((e) => e.cost), 0), n = e.length;
		return S`<div class="ch" aria-label=${R("usage_chart")}>${R("usage_chart")}: ${this.money(t)}<svg viewBox="0 0 ${n * 10} 100" preserveAspectRatio="none" role="img" aria-label=${R("usage_chart")}>${e.map((e, n) => {
			let r = t > 0 && e.cost > 0 ? Math.max(e.cost / t * 100, 1.5) : 0;
			return Te`<g><title>${this.date(e.day)}: ${this.money(e.cost)}</title><rect class="h" x=${n * 10} y="0" width="10" height="100"></rect><rect class="b" x=${n * 10 + 1.5} y=${100 - r} width="7" height=${r}></rect></g>`;
		})}</svg><div class="ax"><span>${this.date(e[0].day)}</span><span>${this.date(e[n - 1].day)}</span></div></div>`;
	}
	table(e) {
		let t = (e) => e.kind === "task" ? R("usage_kind_task") : e.kind === "review" ? R("usage_kind_review") : "";
		return S`<div class="tb"><table><thead><tr><th>${R("usage_model")}</th><th>${R("usage_in")}</th><th>${R("usage_out")}</th><th>${R("usage_col_cached")}</th><th>${R("usage_calls")}</th><th>${R("usage_cost")}</th></tr></thead><tbody>${e.map((e) => e.kind === "earlier" ? S`<tr class="earlier"><td>${R("usage_earlier")}<small>${R("usage_earlier_hint")}</small></td><td></td><td></td><td></td><td></td><td>${this.money(e.cost)}</td></tr>` : S`<tr class=${e.kind}><td>${e.model}<small>${e.provider_name ?? e.provider_type}${t(e) ? S`, ${t(e)}` : C}</small></td><td>${this.num(e.input)}</td><td>${this.num(e.output)}</td><td title=${`${e.cache_read} / ${e.cache_write}`}>${this.num(e.cache_read + e.cache_write)}</td><td>${e.calls}</td><td>${e.unpriced === e.calls ? R("usage_no_price") : this.money(e.cost)}${e.unpriced && e.unpriced < e.calls ? S`<small>${R("usage_unpriced", { n: e.unpriced })}</small>` : C}</td></tr>`)}</tbody></table></div>`;
	}
	balance(e) {
		return S`<p class="bal">${e.status === "ok" ? e.remaining != null && e.limit != null ? R("balance_left", {
			name: e.name,
			left: this.money(e.remaining),
			limit: this.money(e.limit)
		}) : R("balance_no_limit", {
			name: e.name,
			month: this.money(e.usage_monthly ?? 0)
		}) : e.status === "error" ? R("balance_error", {
			name: e.name,
			error: e.error ?? ""
		}) : R(e.status === "local" ? "balance_local" : "balance_none", { name: e.name })}${e.billing_url ? S` <a href=${e.billing_url} target="_blank" rel="noreferrer">${R("billing_page")}</a>` : C}</p>`;
	}
};
Y([D({ attribute: !1 })], Pu.prototype, "hass", void 0), Y([O()], Pu.prototype, "s", void 0), customElements.define("llm-agent-usage", Pu);
//#endregion
//#region src/settings.ts
var Fu = "config/config_entries/options/flow", Iu = [
	"text",
	"number",
	"boolean",
	"select",
	"object"
], Lu = "component.llm_agent.", Ru = "/config/integrations/integration/llm_agent";
function zu() {
	history.pushState(null, "", Ru), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }));
}
var Bu = (e) => e.type === "string" ? "text" : Object.keys(e.selector ?? {})[0], Vu = (e) => e.selector?.[Bu(e)] ?? {}, Hu = (e) => e.every((e) => e.type === "expandable" ? Hu(e.schema ?? []) : Iu.includes(Bu(e)) && !Vu(e).multiple), Uu = (e) => Object.fromEntries(e.map((e) => [e.name, e.type === "expandable" ? Uu(e.schema ?? []) : e.description?.suggested_value ?? e.default])), Wu = (e) => e?.body?.message ?? e?.message ?? e?.error ?? String(e), Gu = class extends Ve {
	constructor(...e) {
		super(...e), this.s = {}, this.v = {}, this.raw = {}, this.words = {}, this.cycle = 0;
	}
	static {
		this.styles = [vl, s`:host{position:absolute;inset:0;height:auto;z-index:20;display:flex;flex-direction:column;background:var(--bg);color:var(--text)}
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
.bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}`];
	}
	connectedCallback() {
		super.connectedCallback(), this.begin();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsub?.then((e) => e()).catch(() => void 0), this.unsub = void 0, this.drop();
	}
	drop() {
		let e = this.s.step;
		e && [
			"form",
			"menu",
			"progress",
			"external"
		].includes(e.type) && this.hass?.callApi("DELETE", `${Fu}/${e.flow_id}`).catch(() => void 0);
	}
	async begin() {
		let e = this.hass;
		if (e) {
			this.s = { busy: !0 };
			try {
				let t = () => {}, n = new Promise((e) => t = e);
				this.unsub ??= e.connection.subscribeMessage((e) => {
					for (let { type: t, entry: n } of e) n.domain === "llm_agent" && (t ? n.entry_id === this.entry && (this.cycle = n.state === "loaded" ? this.cycle && 2 : /error|retry|failed/.test(n.state) ? 3 : this.cycle || 1) : this.entry ??= n.entry_id);
					t();
				}, { type: "config_entries/subscribe" }), await this.unsub, this.entry || await n;
				let r = e.locale?.language ?? "en", i = await Promise.all(["options", "selector"].map((t) => e.connection.sendMessagePromise({
					type: "frontend/get_translations",
					language: r,
					category: t,
					integration: ["llm_agent"]
				})));
				if (this.words = Object.assign({}, ...i.map((e) => e?.resources)), !this.entry) throw Error(R("no_provider"));
				this.show(await e.callApi("POST", Fu, {
					handler: this.entry,
					show_advanced_options: !1
				}));
			} catch (e) {
				this.s = { error: Wu(e) };
			}
		}
	}
	show(e) {
		let t = e.data_schema ?? [], n = ![
			"form",
			"menu",
			"abort",
			"create_entry"
		].includes(e.type) || e.type === "form" && !Hu(t);
		e.type === "form" && (this.v = Uu(t), this.raw = {}), this.s = {
			step: e,
			stuck: n
		}, n && this.drop();
	}
	tr(e, t = this.s.step?.description_placeholders) {
		let n = this.words[Lu + e] ?? "";
		return t ? n.replace(/\{(\w+)\}/g, (e, n) => t[n] ?? e) : n;
	}
	async send(e) {
		let t = this.s.step;
		this.s = {
			...this.s,
			busy: !0
		}, this.cycle = 0;
		let n;
		try {
			n = await this.hass.callApi("POST", `${Fu}/${t.flow_id}`, e);
		} catch (e) {
			let n = e?.body?.errors;
			this.s = n ? {
				step: {
					...t,
					errors: n
				},
				busy: !1
			} : {
				...this.s,
				busy: !1,
				error: Wu(e)
			};
			return;
		}
		if (n.type !== "create_entry") return this.show(n);
		this.s = {
			step: n,
			saving: !0
		};
		for (let e = 0; e < 600 && this.cycle < 2 && (this.cycle || e < 30); e++) await new Promise((e) => setTimeout(e, 100));
		this.s = {
			step: n,
			done: this.cycle
		}, this.cycle === 2 && this.dispatchEvent(new CustomEvent("reloaded", {
			bubbles: !0,
			composed: !0
		}));
	}
	submit(e) {
		e.preventDefault();
		let t = "", n = (e, r, i = "") => {
			let a = {};
			for (let o of e) {
				if (o.type === "expandable") {
					a[o.name] = n(o.schema ?? [], r[o.name] ?? {}, o.name);
					continue;
				}
				let e = r[o.name], s = this.raw[i + "." + o.name];
				if (s !== void 0) try {
					e = s.trim() ? JSON.parse(s) : void 0;
				} catch {
					t = o.name;
				}
				e != null && e !== "" && !Number.isNaN(e) && (a[o.name] = e);
			}
			return a;
		}, r = n(this.s.step?.data_schema ?? [], this.v);
		t ? this.s = {
			...this.s,
			step: {
				...this.s.step,
				errors: { [t]: R("settings_bad_json") }
			}
		} : this.send(r);
	}
	close() {
		this.dispatchEvent(new CustomEvent("close"));
	}
	render() {
		let { step: e, error: t, busy: n, stuck: r, done: i, saving: a } = this.s, o = e?.step_id ?? "init", s = e?.type !== "create_entry" && this.tr(`options.step.${o}.title`) || R("integration_settings"), c = e?.type === "form" || e?.type === "menu" ? this.tr(`options.step.${o}.description`) : "", l = e?.type === "abort" ? this.tr(`options.abort.${e.reason}`) || e.reason : "", u = S`<button class="small" @click=${zu}>${R("open_in_ha")}</button>`, d = S`<button class="small ghost" ?disabled=${n} @click=${() => this.begin()}>${R("settings_menu")}</button>`;
		return S`<div class="top" @keydown=${(e) => e.key === "Escape" && (e.preventDefault(), this.close())}>
<button class="icon" title=${R("close")} aria-label=${R("close")} @click=${this.close}><ha-icon icon="mdi:close"></ha-icon></button>
<b>${s}</b></div>
<div class="body" aria-busy=${!!n || !!a} @keydown=${(e) => e.key === "Escape" && (e.preventDefault(), this.close())}>
${c ? S`<div class="d">${Ze(Wc(c))}</div>` : C}
${t ? S`<div class="err" role="alert">${R("settings_error", { error: t })}</div><div class="bar">${d}${u}</div>` : e ? r ? S`<div class="note">${R("settings_unsupported")}</div><div class="bar">${d}${u}</div>` : a ? S`<div class="note" role="status">${R("settings_reloading")}</div>` : i === void 0 ? l ? S`<div class="note">${l}</div><div class="bar">${d}</div>` : e.type === "menu" ? this.menu(e) : this.form(e) : S`<div class="note" role="status">${R(i === 2 ? "settings_reloaded" : i ? "settings_reload_failed" : "settings_saved")}</div>
<div class="bar">${i === 1 || i === 3 ? u : C}${d}<button class="small primary" @click=${this.close}>${R("settings_back")}</button></div>` : S`<div class="note">${R("settings_loading")}</div>`}
</div>`;
	}
	menu(e) {
		let t = e.menu_options ?? [];
		return S`<div class="menu">${(Array.isArray(t) ? t.map((e) => [e, ""]) : Object.entries(t)).map(([t, n]) => S`<button ?disabled=${this.s.busy} @click=${() => this.send({ next_step_id: t })}>
${this.tr(`options.step.${e.step_id}.menu_options.${t}`) || n || t}<ha-icon icon="mdi:chevron-right"></ha-icon></button>`)}</div>`;
	}
	form(e) {
		let t = e.errors ?? {}, n = t.base;
		return S`<form @submit=${this.submit} novalidate>
${n ? S`<div class="err" role="alert">${this.tr(`options.error.${n}`) || n}</div>` : C}
${(e.data_schema ?? []).map((n) => n.type === "expandable" ? S`<details ?open=${n.expanded}><summary>${this.tr(`options.step.${e.step_id}.sections.${n.name}.name`) || n.name}</summary>
${this.tr(`options.step.${e.step_id}.sections.${n.name}.description`) ? S`<div class="d">${Ze(Wc(this.tr(`options.step.${e.step_id}.sections.${n.name}.description`)))}</div>` : C}
${(n.schema ?? []).map((e) => this.field(e, t, n.name))}</details>` : this.field(n, t))}
<div class="bar">${this.again()}<button class="small primary" type="submit" ?disabled=${this.s.busy}>${R("settings_submit")}</button></div>
</form>`;
	}
	again() {
		return S`<button class="small ghost" type="button" ?disabled=${this.s.busy} @click=${() => (this.drop(), this.begin())}>${R("settings_menu")}</button>`;
	}
	field(e, t, n = "") {
		let r = `options.step.${this.s.step?.step_id}${n ? `.sections.${n}` : ""}`, i = this.tr(`${r}.data.${e.name}`) || e.name, a = this.tr(`${r}.data_description.${e.name}`), o = n && t[n]?.[e.name] || t[e.name], s = n ? this.v[n] ??= {} : this.v, c = s[e.name], l = (t) => {
			s[e.name] = t, this.requestUpdate();
		}, u = Vu(e), d = Bu(e), f = `f-${n}-${e.name}`, p;
		if (d === "boolean") p = S`<label><input type="checkbox" .checked=${!!c} @change=${(e) => l(e.target.checked)}>${i}</label>`;
		else {
			let t, r = (e) => e.target.value;
			if (d === "number") t = S`<span class="u"><input id=${f} type="number" min=${u.min ?? C} max=${u.max ?? C} step=${u.step ?? "any"} .value=${c == null ? "" : String(c)} @input=${(e) => l(r(e) === "" ? void 0 : Number(r(e)))}>${u.unit_of_measurement ? S`<span>${u.unit_of_measurement}</span>` : C}</span>`;
			else if (d === "select") {
				let e = (u.options ?? []).map((e) => typeof e == "string" ? {
					value: e,
					label: e
				} : e), n = (e) => u.translation_key && this.tr(`selector.${u.translation_key}.options.${e.value}`) || e.label;
				t = u.mode === "list" && !u.custom_value ? S`<fieldset class="r" id=${f} aria-label=${i}>${e.map((e) => S`<label><input type="radio" name=${f} .checked=${c === e.value} @change=${() => l(e.value)}>${n(e)}</label>`)}</fieldset>` : u.custom_value ? S`<input id=${f} list=${f + "l"} .value=${c ?? ""} @input=${(e) => l(r(e))}><datalist id=${f + "l"}>${e.map((e) => S`<option value=${e.value}>${n(e)}</option>`)}</datalist>` : S`<select id=${f} @change=${(e) => l(r(e))}>${c == null ? S`<option selected></option>` : C}${e.map((e) => S`<option value=${e.value} ?selected=${c === e.value}>${n(e)}</option>`)}</select>`;
			} else if (d === "object") {
				let i = n + "." + e.name;
				this.raw[i] ??= c == null ? "" : JSON.stringify(c, null, 2), t = S`<textarea id=${f} class="json" spellcheck="false" .value=${this.raw[i]} @input=${(e) => this.raw[i] = r(e)}></textarea>`;
			} else t = u.multiline ? S`<textarea id=${f} .value=${c ?? ""} @input=${(e) => l(r(e))}></textarea>` : S`<input id=${f} type=${u.type ?? "text"} autocomplete=${u.type === "password" ? "new-password" : "off"} .value=${c ?? ""} @input=${(e) => l(r(e))}>`;
			p = S`<label for=${f}>${i}</label>${t}`;
		}
		return S`<div class="f">${p}
${a ? S`<div class="d">${Ze(Wc(a))}</div>` : C}
${o ? S`<div class="err">${this.tr(`options.error.${o}`) || o}</div>` : C}</div>`;
	}
};
Y([D({ attribute: !1 })], Gu.prototype, "hass", void 0), Y([O()], Gu.prototype, "s", void 0), customElements.define("llm-agent-settings", Gu);
//#endregion
//#region src/pagecontext.ts
var Ku = 8192, qu = 15360, Ju = 3e3, Yu = 1e3, Xu = 2e3, Zu = 80, Qu = 40, $u = 40, ed = 30, td = 300, nd = "(max-width: 870px)", rd = /* @__PURE__ */ new Set(["entity_picture", "access_token"]), id = /* @__PURE__ */ new Set([
	"SCRIPT",
	"STYLE",
	"TEMPLATE",
	"NOSCRIPT",
	"INPUT",
	"TEXTAREA",
	"SELECT",
	"OPTION",
	"SVG",
	"HA-ICON",
	"HA-SVG-ICON",
	"HA-PASSWORD-FIELD"
]);
async function ad(e) {
	Nd();
	let t = e, n = location.pathname + location.search, r;
	try {
		r = await sd(t);
	} catch {
		r = cd();
	}
	let i = Td();
	if (i && t.states?.[i]) {
		let e = wd(t, i);
		r = {
			kind: "entity",
			title: `Entity: ${e.name}`,
			summary: String(e.name),
			details: {
				entity: e,
				behind: {
					kind: r.kind,
					title: r.title,
					...r.details
				}
			}
		};
	}
	r.details.narrow = window.matchMedia?.(nd).matches ?? !1;
	let a = od();
	return a && (r.details.selection = a), Ld({
		path: n,
		...r
	});
}
function od() {
	return kd;
}
async function sd(e) {
	let t = location.pathname.split("/").filter(Boolean).map(decodeURIComponent), n = new URLSearchParams(location.search), [r = "", i = "", a = "", o = ""] = t;
	if (r === "config") return [
		"automation",
		"script",
		"scene"
	].includes(i) && o ? gd(e, i, a, o) : i === "devices" && a === "device" && o ? _d(e, o) : i === "areas" && a === "area" && o ? vd(e, o) : i === "integrations" && a === "integration" && o ? yd(e, o) : i === "tools" || i === "developer-tools" ? xd(a) : ld(t);
	if (r === "developer-tools") return xd(i);
	if (r === "history" || r === "logbook") return bd(e, r, n);
	let s = e.panels?.[r];
	return s?.component_name === "lovelace" || ud.has(s?.component_name ?? "") ? dd(e, r, i, s?.component_name === "lovelace") : cd();
}
function cd() {
	let e = Dd();
	return {
		kind: "other",
		title: e,
		summary: e,
		details: {},
		text: Od()
	};
}
function ld(e) {
	let t = Dd();
	return {
		kind: "settings",
		title: t,
		summary: t,
		details: { section: e.slice(1).join("/") || "config" },
		text: Od()
	};
}
var ud = /* @__PURE__ */ new Set([
	"home",
	"light",
	"security",
	"climate",
	"maintenance"
]);
async function dd(e, t, n, r) {
	let i = e.panels?.[t], a = i?.title && (e.localize?.(`panel.${i.title}`) || i.title) || e.localize?.("panel.states") || "Overview", o, s = !r;
	if (r) try {
		o = await e.connection.sendMessagePromise({
			type: "lovelace/config",
			url_path: t === "lovelace" ? null : t
		});
	} catch {
		s = !0;
	}
	o?.strategy && (s = !0);
	let c = s ? fd() ?? void 0 : o, l = Array.isArray(c?.views) ? c.views : [], u = l.findIndex((e) => e.path !== void 0 && String(e.path) === n), d = u >= 0 ? u : /^\d+$/.test(n) ? Number(n) : 0, f = l[d];
	if (f?.strategy && !f.cards && !f.sections) {
		let e = fd()?.views;
		Array.isArray(e) && e[d] && (f = {
			...e[d],
			strategy: f.strategy
		});
	}
	let p = f ? String(f.title ?? f.path ?? `View ${d + 1}`) : "", m = { dashboard: {
		url_path: t === "lovelace" ? null : t,
		title: a
	} };
	f && (m.view = {
		path: f.path ?? null,
		index: d,
		title: p
	}), s && (m.generated = !0);
	let h = [];
	f?.strategy && (m.view_generated = !0), f && (h = md(e, f)), (s || f?.strategy || !h.length) && (h = [.../* @__PURE__ */ new Set([...h, ...md(e, { cards: pd() })])]), h.length ? (m.entities = h.slice(0, Zu).map((t) => Cd(e, t)), h.length > Zu && (m.entities_total = h.length)) : s && (m.note = "Generated dashboard; its cards could not be read, so no entities are listed.");
	let g = p.toLowerCase() === a.toLowerCase(), _ = p && !g && (r || d !== 0) ? `${a}, ${p}` : a;
	return {
		kind: "dashboard",
		title: `Dashboard ${_}`,
		summary: _,
		details: m
	};
}
function fd() {
	for (let e of ["hui-root", "ha-panel-lovelace"]) {
		let t = Ed(e)?.lovelace?.config;
		if (t && typeof t == "object") return t;
	}
	return null;
}
function pd() {
	let e = Ed("hui-root");
	if (!e) return [];
	let t = [], n = [e], r = 0;
	for (; n.length && r++ < 2e4;) {
		let e = n.shift();
		if (e instanceof Element && /^HUI-.*(CARD|BADGE)$/.test(e.tagName)) {
			let n = e, r = n.config ?? n._config, i = !e.hasAttribute("hidden") && getComputedStyle(e).display !== "none";
			if (i && r && typeof r == "object" && t.push(r), !i) continue;
		}
		let r = e instanceof Element ? e.shadowRoot : null;
		r && n.push(r);
		for (let t of e.children) n.push(t);
	}
	return t;
}
function md(e, t) {
	let n = /* @__PURE__ */ new Set(), r = (t) => {
		typeof t == "string" && e.states?.[t] && n.add(t);
	}, i = (e, t) => {
		if (!(t > 25 || typeof e != "object" || !e)) {
			if (Array.isArray(e)) for (let n of e) i(n, t + 1);
			else for (let [n, a] of Object.entries(e)) {
				if (n === "entity" || n === "entity_id") Array.isArray(a) ? a.forEach(r) : r(a);
				else if (n === "entities" && Array.isArray(a)) {
					for (let e of a) typeof e == "string" ? r(e) : i(e, t + 1);
					continue;
				}
				i(a, t + 1);
			}
		}
	};
	return i(t, 0), [...n];
}
var hd = {
	automation: "ha-automation-editor",
	script: "ha-script-editor",
	scene: "ha-scene-editor"
};
function gd(e, t, n, r) {
	let i = Ed(hd[t]), a = i?.config ?? i?._config, o = r === "new", s = o ? void 0 : Object.values(e.states ?? {}).find((e) => e.entity_id.startsWith(`${t}.`) && (String(e.attributes.id ?? "") === r || e.entity_id === `${t}.${r}`)), c = String(a?.alias ?? s?.attributes.friendly_name ?? (o ? "New " + t : r)), l = {
		id: o ? null : r,
		alias: c,
		new: o
	};
	s && (l.entity_id = s.entity_id), n !== "edit" && (l.view = n);
	let u = i?.dirty ?? i?._dirty;
	return typeof u == "boolean" && (l.unsaved_changes = u), {
		kind: t,
		title: `${t[0].toUpperCase() + t.slice(1)}: ${c}`,
		summary: c,
		details: l
	};
}
function _d(e, t) {
	let n = e.devices?.[t], r = n?.name_by_user || n?.name || t, i = Object.values(e.entities ?? {}).filter((e) => e.device_id === t).map((e) => e.entity_id), a = {
		device: {
			id: t,
			name: r,
			manufacturer: n?.manufacturer ?? null,
			model: n?.model ?? null,
			area: n?.area_id ? e.areas?.[n.area_id]?.name ?? n.area_id : null
		},
		entities: i.slice(0, Qu).map((t) => Cd(e, t))
	};
	return i.length > Qu && (a.entities_total = i.length), {
		kind: "device",
		title: `Device: ${r}`,
		summary: r,
		details: a
	};
}
function vd(e, t) {
	let n = e.areas?.[t]?.name ?? t, r = Object.values(e.devices ?? {}).filter((e) => e.area_id === t), i = new Set(r.map((e) => e.id)), a = Object.values(e.entities ?? {}).filter((e) => e.area_id === t || !e.area_id && e.device_id && i.has(e.device_id)).map((e) => e.entity_id), o = {
		area: {
			id: t,
			name: n
		},
		devices: r.slice(0, $u).map((e) => ({
			id: e.id,
			name: e.name_by_user || e.name || e.id
		})),
		entities: a.slice(0, $u).map((t) => Cd(e, t))
	};
	return r.length > $u && (o.devices_total = r.length), a.length > $u && (o.entities_total = a.length), {
		kind: "area",
		title: `Area: ${n}`,
		summary: n,
		details: o
	};
}
async function yd(e, t) {
	let n = { domain: t };
	try {
		n.entries = (await e.connection.sendMessagePromise({
			type: "config_entries/get",
			domain: t
		})).map((e) => ({
			title: e.title,
			state: e.state
		}));
	} catch {}
	return {
		kind: "integration",
		title: `Integration: ${t}`,
		summary: t,
		details: n
	};
}
function bd(e, t, n) {
	let r = (n.get("entity_id") ?? "").split(",").filter(Boolean), i = {
		entity_ids: r,
		start: n.get("start_date"),
		end: n.get("end_date")
	}, a = r.map((t) => String(e.states?.[t]?.attributes.friendly_name ?? t)), o = t === "history" ? "History" : "Logbook", s = a.length ? `${o}: ${a.slice(0, 3).join(", ")}` : o;
	return {
		kind: t,
		title: s,
		summary: s,
		details: i
	};
}
function xd(e) {
	let t = e || "yaml", n = { tab: t };
	if (t === "template") {
		let e = Ed("tools-template"), t = typeof e?._template == "string" ? e._template : void 0;
		if (t === void 0) try {
			t = localStorage.getItem("panel-dev-template-template") ?? void 0;
		} catch {}
		t !== void 0 && (n.template = t.slice(0, Xu), t.length > Xu && (n.template_length = t.length));
	}
	let r = `Developer tools: ${t}`;
	return {
		kind: "developer-tools",
		title: r,
		summary: r,
		details: n
	};
}
function Sd(e, t) {
	let n = e.states?.[t];
	return String(n?.attributes.friendly_name ?? e.entities?.[t]?.name ?? t);
}
function Cd(e, t) {
	let n = e.states?.[t], r = {
		entity_id: t,
		name: Sd(e, t),
		state: n?.state ?? null
	}, i = n?.attributes.unit_of_measurement;
	return i && (r.unit = i), r;
}
function wd(e, t) {
	let n = e.states[t], r = {}, i = 0;
	for (let [e, t] of Object.entries(n.attributes)) {
		if (rd.has(e) || e === "friendly_name") continue;
		if (++i > ed) break;
		let n = JSON.stringify(t) ?? "";
		r[e] = n.length > td ? `${n.slice(0, td)} (cut)` : t;
	}
	let a = Object.keys(n.attributes).length, o = {
		entity_id: t,
		name: Sd(e, t),
		state: n.state,
		attributes: r
	};
	return i > ed && (o.attributes_total = a), o;
}
function Td() {
	let e = Ed("ha-more-info-dialog");
	return !e || e._open === !1 ? null : typeof e._entityId == "string" && e._entityId ? e._entityId : null;
}
function Ed(e) {
	let t = document.querySelector("home-assistant");
	if (!t) return document.querySelector(e);
	let n = [t], r = 0;
	for (; n.length && r++ < 2e4;) {
		let t = n.shift();
		if (t instanceof Element && t.matches(e)) return t;
		let r = t instanceof Element ? t.shadowRoot : null;
		r && n.push(r);
		for (let e of t.children) e.tagName.startsWith("LLM-AGENT") || n.push(e);
	}
	return null;
}
function Dd() {
	return document.title.replace(/\s*[-|\u2013\u2014]\s*Home Assistant\s*$/i, "").trim() || location.pathname;
}
function Od() {
	let e = Ed("partial-panel-resolver");
	if (!e) return;
	let t = [], n = 0, r = (e) => {
		if (n >= Ju) return;
		if (e.nodeType === Node.TEXT_NODE) {
			let r = (e.textContent ?? "").replace(/\s+/g, " ").trim();
			r && (t.push(r), n += r.length + 1);
			return;
		}
		if (!(e instanceof Element)) {
			(e instanceof ShadowRoot || e instanceof DocumentFragment) && e.childNodes.forEach(r);
			return;
		}
		let i = e.tagName;
		id.has(i) || i.startsWith("LLM-AGENT") || e.getAttribute("aria-hidden") !== "true" && (typeof e.checkVisibility != "function" || e.checkVisibility({ checkVisibilityCSS: !0 })) && (i === "SLOT" ? e.assignedNodes({ flatten: !0 }).forEach(r) : e.shadowRoot ? r(e.shadowRoot) : e.childNodes.forEach(r));
	};
	return r(e), t.join("\n").slice(0, Ju) || void 0;
}
var kd = "", Ad = !1;
function jd() {
	let e = document.activeElement;
	for (; e;) {
		if (e.tagName.startsWith("LLM-AGENT")) return !0;
		e = e.shadowRoot?.activeElement ?? null;
	}
	return !1;
}
function Md() {
	let e = document.getSelection()?.toString().trim() ?? "";
	if (e) return e;
	let t = document.querySelector("home-assistant");
	if (!t) return "";
	let n = [t], r = 0;
	for (; n.length && r++ < 2e4;) {
		let e = n.pop();
		if (e.tagName.startsWith("LLM-AGENT")) continue;
		let t = e.shadowRoot;
		if (t) {
			let e = t.getSelection?.()?.toString().trim();
			if (e) return e;
			n.push(...t.children);
		}
		n.push(...e.children);
	}
	return "";
}
function Nd() {
	Ad || (Ad = !0, document.addEventListener("selectionchange", () => {
		jd() || (kd = Md().slice(0, Yu));
	}), kd = Md().slice(0, Yu));
}
var Pd = new TextEncoder(), Fd = (e) => Pd.encode(JSON.stringify(e)).length;
function Id(e) {
	let t = null, n = (e, r) => {
		for (let [i, a] of Object.entries(e)) if (Array.isArray(a) && a.length > 1) {
			let n = Fd(a);
			(!t || n > t.size) && (t = {
				owner: e,
				key: i,
				size: n
			});
		} else r < 2 && a && typeof a == "object" && !Array.isArray(a) && n(a, r + 1);
	};
	return n(e, 0), t;
}
function Ld(e) {
	let t = e.details;
	for (let e = 0; e < 40 && Fd(t) > Ku; e++) {
		let e = Id(t);
		if (!e) break;
		let n = e.owner[e.key], r = `${e.key}_total`;
		e.owner[r] === void 0 && (e.owner[r] = n.length), e.owner[e.key] = n.slice(0, Math.floor(n.length / 2)), e.owner[`${e.key}_trimmed`] = !0;
	}
	for (Fd(t) > Ku && (e.details = {
		trimmed: !0,
		note: "The page details were too large to send.",
		narrow: t.narrow,
		selection: t.selection
	}); e.text && Fd(e) > qu;) e.text = e.text.slice(0, Math.floor(e.text.length * .75));
	return Fd(e) > qu && delete e.text, e;
}
//#endregion
//#region src/panel.ts
var Rd = /* @__PURE__ */ new Set([
	"config",
	"content",
	"old",
	"new",
	"text",
	"body"
]), zd = {
	input: 0,
	output: 0,
	cache_read: 0,
	cache_write: 0,
	cost: 0
}, $ = class extends Ve {
	constructor(...e) {
		super(...e), this.narrow = !1, this.embedded = !1, this.convs = [], this.query = "", this.previews = /* @__PURE__ */ new Set(), this.hits = null, this.convId = null, this.chatTitle = "New chat", this.items = [], this.usage = zd, this.running = !1, this.announce = "", this.editAt = -1, this.hasText = !1, this.photos = [], this.files = [], this.dragging = !1, this.photoGen = 0, this.providerId = "", this.model = "", this.fetched = {}, this.showList = !1, this.loadError = "", this.mentions = [], this.picked = new al(), this.prefs = Zd(), this.showPrefs = !1, this.showSettings = !1, this.showChanges = !1, this.view = "changes", this.mentionIndex = 0, this.pageOff = !1, this.mentionStart = -1, this.gen = 0, this.started = !1, this.stickToBottom = !0, this.onReady = () => {
			this.running && this.convId && this.open(this.convId).catch(() => void 0);
		}, this.reloaded = async () => {
			try {
				this.info = await this.ws.sendMessagePromise({ type: "llm_agent/info" });
			} catch {
				return;
			}
			this.provider || this.startModel(), await this.refreshList(), this.convId && await this.open(this.convId).catch(() => void 0);
		}, this.modelError = "", this.loadingModels = /* @__PURE__ */ new Set(), this.noteCardSince = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = [vl, s`
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
    `];
	}
	get slim() {
		return this.narrow || this.embedded;
	}
	get ws() {
		return this.hass.connection;
	}
	applyPrefs() {
		let e = this.prefs;
		e.theme === "auto" ? this.removeAttribute("data-theme") : this.setAttribute("data-theme", e.theme), e.size === "normal" ? this.removeAttribute("data-size") : this.setAttribute("data-size", e.size), this.toggleAttribute("data-compact", e.compact);
	}
	setPref(e, t) {
		this.prefs = {
			...this.prefs,
			[e]: t
		}, Qd(this.prefs), this.applyPrefs();
	}
	async setMyDefault(e = !1) {
		let t = await this.ws.sendMessagePromise({
			type: "llm_agent/my_default",
			provider_id: e ? null : this.providerId,
			model: e ? "" : this.model
		});
		this.info &&= {
			...this.info,
			my_default: t.my_default
		};
	}
	startModel() {
		let e = this.info?.my_default, t = e && this.info?.providers.find((t) => t.id === e.provider_id) || this.info?.providers[0];
		t && (this.providerId = t.id, this.model = e && e.provider_id === t.id && e.model ? e.model : t.default_model);
	}
	willUpdate(e) {
		if (e.has("pageContext")) {
			let t = e.get("pageContext"), n = this.pageContext;
			(t?.path !== n?.path || t?.summary !== n?.summary) && (this.pageOff = !1);
		}
	}
	pageToSend() {
		let e = this.pageContext;
		if (!e || this.pageOff) return;
		let t = od(), n = { ...e.details };
		return t ? n.selection = t : delete n.selection, {
			...e,
			details: n
		};
	}
	updated(e) {
		if (e.has("hass") && this.hass && !this.started) this.started = !0, this.init();
		else if (e.has("hass") && this.hass) {
			let t = e.get("hass")?.locale?.language, n = this.hass.locale?.language;
			t !== n && Ca(n).then((e) => {
				e && this.requestUpdate();
			});
		}
		this.attachBox(), this.stickToBottom && this.scroller && (this.scroller.scrollTop = this.scroller.scrollHeight), this.addCopyButtons();
	}
	attachBox() {
		let e = this.source;
		e && (this.input?.source !== e && (this.input?.destroy(), this.input = Jc(e, {
			onKey: (e) => this.onKey(e),
			onChange: () => this.onInput(),
			onPaste: (e) => void this.onPaste(e),
			onBlur: () => setTimeout(() => {
				this.renderRoot.activeElement !== this.input?.el && (this.mentions = []);
			}, 150)
		})), this.input.setPlaceholder(e.placeholder));
	}
	addCopyButtons() {
		if (this.scroller) for (let e of this.scroller.querySelectorAll(".md pre:not([data-copy])")) {
			e.dataset.copy = "1";
			let t = document.createElement("button");
			t.className = "copy small ghost", t.textContent = R("copy"), t.addEventListener("click", async () => {
				let n = e.querySelector("code") ?? e;
				t.textContent = R(await Vd(n.textContent ?? "") ? "copied" : "copy_failed"), setTimeout(() => t.textContent = R("copy"), 1500);
			}), e.prepend(t);
		}
	}
	async copy(e, t) {
		let n = await Vd(e), r = t.querySelector("ha-icon");
		r?.setAttribute("icon", n ? "mdi:check" : "mdi:alert-circle-outline"), this.announce = R(n ? "copied" : "copy_failed"), setTimeout(() => r?.setAttribute("icon", "mdi:content-copy"), 1500);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.listening?.removeEventListener?.("ready", this.onReady), this.listening = void 0, this.detach(), this.started = !1;
	}
	async init() {
		this.listening = this.ws, this.ws.addEventListener?.("ready", this.onReady), await Ca(this.hass?.locale?.language) && this.requestUpdate();
		try {
			this.info = await this.ws.sendMessagePromise({ type: "llm_agent/info" }), this.loadError = "";
		} catch (e) {
			this.loadError = e.message ?? String(e);
			return;
		}
		this.applyPrefs(), this.providerId || this.startModel(), await this.refreshList();
		let e = this.convId ?? Jd();
		if (e && this.convs.some((t) => t.id === e)) try {
			await this.open(e);
		} catch {
			Yd(null);
		}
		this.convId || (await this.updateComplete, this.setText(Wd(this.draftKey, null)));
	}
	async refreshList() {
		this.convs = await this.ws.sendMessagePromise({ type: "llm_agent/conversations/list" }), Kd(this.draftKey, this.convs);
	}
	get draftKey() {
		return `llm-agent-drafts-${this.hass?.user?.id ?? ""}`;
	}
	setText(e) {
		let t = this.input;
		if (!t) return;
		let n = this.picked.show(e, this.hass);
		t.setMentions(this.picked.labels()), t.value = n, this.stored(e);
	}
	get composed() {
		return this.picked.expand(this.input?.value ?? "");
	}
	stored(e) {
		this.hasText = !!e.trim(), this.input?.fit(), this.editAt < 0 && Gd(this.draftKey, this.convId, e);
	}
	focusComposer() {
		let e = this.renderRoot.activeElement;
		matchMedia("(pointer: coarse)").matches || e && e !== this.input?.el && e.tagName !== "BUTTON" || this.input?.focus();
	}
	get member() {
		return this.info?.is_admin === !1;
	}
	get admin() {
		return !this.member && !!this.hass?.user?.is_admin;
	}
	get provider() {
		return this.info?.providers.find((e) => e.id === this.providerId);
	}
	async detach() {
		let e = ++this.gen, t = this.unsub;
		if (this.unsub = void 0, t) try {
			await t();
		} catch {}
		return e;
	}
	clearAttachments() {
		this.photos = [], this.files = [], this.photoGen++;
	}
	newChat() {
		this.showChanges = !1, this.editAt = -1, this.clearAttachments(), this.detach(), this.convId = null, Yd(null), this.chatTitle = "New chat", this.items = [], this.usage = zd, this.running = !1, this.showList = !1, this.startModel(), this.setText(Wd(this.draftKey, null)), this.input?.focus();
	}
	async open(e, t = !1) {
		this.showChanges = !1;
		let n = await this.detach();
		if (n !== this.gen) return;
		this.showList = !1, this.editAt = -1, this.clearAttachments();
		let r = await this.ws.sendMessagePromise({
			type: "llm_agent/conversations/get",
			conversation_id: e
		});
		if (n !== this.gen) return;
		this.convId = r.id, Yd(r.id), this.setText(Wd(this.draftKey, r.id)), this.chatTitle = r.title, this.usage = r.usage, this.providerId = r.provider_id, this.model = r.model, this.items = sf(r.messages), r.stopped && r.stopped_text && this.items.push({
			kind: "notice",
			text: r.stopped_text,
			stop: r.stopped
		}), this.running = !1, this.stickToBottom = !0;
		let i = await this.ws.sendMessagePromise({ type: "llm_agent/info" });
		if (n !== this.gen || !i.running.includes(e)) return;
		this.running = !0, this.items = [...this.items, {
			kind: "assistant",
			text: ""
		}];
		let a;
		try {
			a = await this.ws.subscribeMessage((e) => {
				n === this.gen && this.onEvent(e);
			}, {
				type: "llm_agent/attach",
				conversation_id: e
			});
		} catch {
			n === this.gen && !t ? await this.open(e, !0) : n === this.gen && (this.running = !1);
			return;
		}
		this.keepOrDrop(n, a);
	}
	keepOrDrop(e, t) {
		e === this.gen ? this.unsub = t : t().catch(() => void 0);
	}
	renderArgs(e, t) {
		let n = Object.fromEntries(Object.entries(e ?? {}).filter(([e]) => !(t && Rd.has(e))));
		return Object.keys(n).length ? S`<pre class="args">${JSON.stringify(n, null, 2)}</pre>` : C;
	}
	async removeConv(e, t) {
		t.stopPropagation(), confirm(R("confirm_delete")) && (await this.ws.sendMessagePromise({
			type: "llm_agent/conversations/delete",
			conversation_id: e
		}), e === this.convId && this.newChat(), await this.refreshList());
	}
	lastUserIndex() {
		for (let e = this.items.length - 1; e >= 0; e--) if (this.items[e].kind === "user") return e;
		return -1;
	}
	async send(e, t = !1) {
		let n = this.lastUserIndex(), r = e === void 0 ? this.editAt : n, i = r >= 0 && r === n, a = this.items[n], o = e === void 0 ? this.photos : a?.kind === "user" && a.images || [], s = e === void 0 ? this.files : a?.kind === "user" && a.files || [], c = e !== void 0 && a?.kind === "user" && a.pageData ? a.pageData : this.pageToSend(), l = e ?? this.composed.trim();
		if (!l && s.length && (l = `(${s.map((e) => e.name).join(", ")})`), !l && o.length && (l = "(photo)"), !l || this.running) return;
		if (e !== void 0 && a?.kind === "user" && (a.photos && !a.images || a.files?.some((e) => !e.data))) {
			this.edit(n);
			return;
		}
		let u = this.gen, d = r >= 0 ? this.items.slice(0, r) : this.items;
		if (r >= 0 && !i) {
			try {
				await this.ws.sendMessagePromise({
					type: "llm_agent/conversations/truncate",
					conversation_id: this.convId,
					index: d.filter((e) => e.kind === "user").length
				});
			} catch (e) {
				this.push({
					kind: "notice",
					text: bf(e),
					error: !0
				});
				return;
			}
			if (u !== this.gen) return;
		}
		let f = {
			items: r >= 0 && !i ? d : this.items,
			draft: this.composed,
			photos: this.photos,
			files: this.files,
			editAt: i ? this.editAt : -1
		}, p = this.editAt >= 0;
		this.editAt = -1, e === void 0 && (this.clearAttachments(), this.setText(p ? Wd(this.draftKey, this.convId) : ""), this.focusComposer()), this.items = [
			...d,
			{
				kind: "user",
				text: l,
				images: o.length ? o : void 0,
				files: s.length ? s : void 0,
				page: c?.summary,
				pageData: c
			},
			{
				kind: "assistant",
				text: ""
			}
		], this.running = !0, this.announce = "", this.stickToBottom = !0;
		try {
			let e = await this.ws.subscribeMessage((e) => {
				u === this.gen && (e.type === "conversation" ? this.convId || (this.convId = e.conversation_id, this.chatTitle = e.title || l.slice(0, 60), Yd(this.convId)) : this.onEvent(e));
			}, {
				type: "llm_agent/chat",
				text: l,
				conversation_id: this.convId,
				provider_id: this.providerId || void 0,
				model: this.model || void 0,
				rewind: i || void 0,
				over_cap: t || void 0,
				language: this.hass?.locale?.language || void 0,
				images: o.length ? o.map(({ media_type: e, data: t }) => ({
					media_type: e,
					data: t
				})) : void 0,
				files: s.length ? s.map(({ name: e, data: t }) => ({
					name: e,
					data: t
				})) : void 0,
				page: c
			}, { resubscribe: !1 });
			this.keepOrDrop(u, e);
		} catch (t) {
			if (u !== this.gen) return;
			this.running = !1, this.items = f.items, this.editAt = f.editAt, e === void 0 && (this.setText(f.draft), this.photos = f.photos, this.files = f.files), this.push({
				kind: "notice",
				text: bf(t),
				error: !0
			});
			return;
		}
		await this.refreshList();
	}
	onEvent(e) {
		switch (e.type) {
			case "delta": {
				let t = this.items[this.items.length - 1];
				t?.kind === "assistant" ? t.text += e.text : this.items.push({
					kind: "assistant",
					text: e.text
				}), this.scheduleRender();
				return;
			}
			case "tool_start":
				this.push({
					kind: "tool",
					id: e.call_id,
					name: e.name,
					args: e.args,
					status: "running"
				});
				return;
			case "approval":
				this.patchTool(e.call_id, {
					status: "waiting",
					approval: {
						summary: e.summary,
						reason: e.reason,
						risky: e.risky,
						diff: e.diff,
						phoneOnly: e.phone_only,
						phone: e.phone
					}
				}, {
					kind: "tool",
					id: e.call_id,
					name: e.name,
					args: e.args,
					status: "waiting"
				}), this.announce = e.phone_only ? R("announce_phone") : R("announce_approval");
				return;
			case "review_start":
				this.patchTool(e.call_id, { reviewing: !0 });
				return;
			case "review":
				this.patchTool(e.call_id, {
					reviewing: !1,
					review: {
						decision: e.decision,
						reason: e.reason,
						model: e.model
					}
				});
				return;
			case "tool_result":
				this.patchTool(e.call_id, {
					...e.review ? { review: e.review } : {},
					...e.image?.startsWith("data:image/") ? { image: e.image } : {},
					status: e.ok ? "ok" : "error",
					summary: e.summary,
					preview: e.preview,
					snapshotId: e.snapshot_id,
					approval: void 0
				}), this.push({
					kind: "assistant",
					text: ""
				});
				return;
			case "usage":
				this.usage = e.usage;
				return;
			case "notice":
				this.push({
					kind: "notice",
					text: e.text,
					stop: e.stop
				});
				return;
			case "error":
				this.push({
					kind: "notice",
					text: e.message,
					error: !0
				}), this.announce = R("announce_error");
				return;
			case "done":
				this.usage = e.usage, this.running = !1, this.announce = R("announce_done"), this.items = this.items.filter((e) => !(e.kind === "assistant" && !e.text)), this.updateComplete.then(() => this.focusComposer()), this.detach(), this.refreshList().then(() => {
					this.chatTitle = this.convs.find((e) => e.id === this.convId)?.title ?? this.chatTitle;
				});
				return;
		}
	}
	scheduleRender() {
		this.renderTimer === void 0 && (this.renderTimer = window.setTimeout(() => {
			this.renderTimer = void 0, this.requestUpdate();
		}, 80));
	}
	push(e) {
		let t = this.items.filter((e) => !(e.kind === "assistant" && !e.text));
		this.items = [...t, e];
	}
	patchTool(e, t, n) {
		let r = !1;
		this.items = this.items.map((n) => n.kind === "tool" && n.id === e ? (r = !0, {
			...n,
			...t
		}) : n), !r && n && this.push({
			...n,
			...t
		});
	}
	async answer(e, t) {
		let n = this.renderRoot.querySelector(`#note-${CSS.escape(e)}`)?.value ?? "", r = this.items.find((t) => t.kind === "tool" && t.id === e), i = r ? {
			status: r.status,
			approval: r.approval
		} : void 0;
		this.patchTool(e, {
			status: "running",
			approval: void 0
		});
		try {
			await this.ws.sendMessagePromise({
				type: "llm_agent/approve",
				conversation_id: this.convId,
				call_id: e,
				approved: t,
				note: n
			});
		} catch (t) {
			i && this.patchTool(e, i), this.push({
				kind: "notice",
				text: bf(t),
				error: !0
			});
		}
	}
	async undo(e) {
		if (e.snapshotId && confirm(R("confirm_undo", { name: e.summary || e.name }))) try {
			let t = await this.ws.sendMessagePromise({
				type: "llm_agent/undo",
				snapshot_id: e.snapshotId,
				...this.convId ? { conversation_id: this.convId } : {}
			});
			this.patchTool(e.id, { undone: !0 }), this.push({
				kind: "notice",
				text: R("undone_notice", { summary: t.summary })
			});
		} catch (e) {
			this.push({
				kind: "notice",
				text: bf(e),
				error: !0
			});
		}
	}
	async stop() {
		this.convId && await this.ws.sendMessagePromise({
			type: "llm_agent/cancel",
			conversation_id: this.convId
		});
	}
	async loadModels() {
		let e = this.providerId;
		if (!(!e || e in this.fetched || this.loadingModels.has(e))) {
			this.loadingModels.add(e);
			try {
				let t = await this.ws.sendMessagePromise({
					type: "llm_agent/models",
					provider_id: e
				});
				this.modelError = t.error ?? "", this.fetched = {
					...this.fetched,
					[e]: t.models
				};
			} catch {} finally {
				this.loadingModels.delete(e);
			}
		}
	}
	continueTurn(e = !1) {
		this.setText(R("continue_message")), this.send(void 0, e);
	}
	edit(e) {
		let t = this.items[e];
		t?.kind === "user" && (this.editAt = e, this.clearAttachments(), this.photos = t.images ?? [], this.files = (t.files ?? []).filter((e) => e.data), t.photos && !t.images && this.photosNotKept(), t.files?.some((e) => !e.data) && this.push({
			kind: "notice",
			text: R("files_not_kept")
		}), this.setText(t.text), this.input.focus());
	}
	cancelEdit() {
		this.editAt = -1, this.clearAttachments(), this.setText(Wd(this.draftKey, this.convId));
	}
	async onPick(e) {
		let t = e.target, n = [...t.files ?? []];
		t.value = "", await this.addFiles(n);
	}
	async onPaste(e) {
		let t = [...e.clipboardData?.files ?? []];
		t.length && (e.preventDefault(), await this.addFiles(t));
	}
	onDragOver(e) {
		if (!e.dataTransfer?.types.includes("Files")) return;
		e.preventDefault();
		let t = this.running || this.showChanges;
		e.dataTransfer.dropEffect = t ? "none" : "copy", this.dragging = !t;
	}
	onDragLeave(e) {
		let t = e.relatedTarget;
		t && e.currentTarget.contains(t) || (this.dragging = !1);
	}
	async onDrop(e) {
		e.dataTransfer?.types.includes("Files") && (e.preventDefault(), this.dragging = !1, !this.running && !this.showChanges && await this.addFiles([...e.dataTransfer.files]));
	}
	async addFiles(e) {
		let t = e.filter(Ef);
		t.length && await this.addPhotos(t);
		let n = this.photoGen;
		for (let t of e.filter((e) => !Ef(e))) {
			let e = t.name || R("that_file"), r = (t, n = {}) => this.push({
				kind: "notice",
				text: R(t, {
					name: e,
					...n
				}),
				error: !0
			});
			if (this.files.length >= Sf) {
				r("too_many_files", { count: Sf });
				return;
			}
			if (t.size > Cf) {
				r("file_too_large", { limit: Of(Cf) });
				continue;
			}
			if (this.payload() + Df(t.size) > wf) {
				r("files_over_total");
				continue;
			}
			let i;
			try {
				i = await jf(t);
			} catch {
				r("file_unreadable");
				continue;
			}
			if (n !== this.photoGen) return;
			i ? this.payload() + (i.data?.length ?? 0) > wf ? r("files_over_total") : this.files = [...this.files, i] : r("file_unsupported");
		}
	}
	payload() {
		return this.photos.reduce((e, t) => e + t.data.length, 0) + this.files.reduce((e, t) => e + (t.data?.length ?? 0), 0);
	}
	photosNotKept() {
		this.push({
			kind: "notice",
			text: R("photos_not_kept")
		});
	}
	async addPhotos(e) {
		let t = this.photoGen;
		for (let n of e) {
			if (this.photos.length >= xf) break;
			try {
				let e = await Pf(n);
				if (t !== this.photoGen || this.photos.length >= xf) return;
				this.photos = [...this.photos, e];
			} catch {
				this.push({
					kind: "notice",
					text: R("photo_unreadable", { name: n.name || R("that_picture") }),
					error: !0
				});
			}
		}
	}
	onKey(e) {
		if (this.mentions.length && !e.isComposing) {
			let t = this.mentions.length;
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault(), this.mentionIndex = (this.mentionIndex + (e.key === "ArrowDown" ? 1 : t - 1)) % t;
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				e.preventDefault(), this.pickMention(this.mentions[this.mentionIndex]);
				return;
			}
			if (e.key === "Escape") {
				e.preventDefault(), this.mentions = [];
				return;
			}
		}
		if (e.key === "ArrowUp" && !e.isComposing && !this.input?.value && !this.running && this.editAt < 0 && this.convId) {
			let t = this.lastUserIndex();
			t >= 0 && (e.preventDefault(), this.edit(t));
		} else if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
			let t = e.ctrlKey || e.metaKey;
			if (this.prefs.send === "ctrl" && !t || !t && this.input && el(this.input.value, this.input.selectionStart)) return;
			e.preventDefault(), this.send();
		}
	}
	onInput() {
		this.stored(this.composed), this.updateMentions();
	}
	updateMentions() {
		let e = this.input, t = this.hass;
		if (!e || !t) return;
		let n = e.value.slice(0, e.selectionStart ?? e.value.length), r = /(^|\s)@([^\s@]*)$/.exec(n);
		r ? (this.mentionStart = n.length - r[2].length - 1, this.mentions = nf(t, r[2]), this.mentionIndex = 0) : this.mentions = [];
	}
	pickMention(e) {
		let t = this.input, n = t.selectionStart ?? t.value.length, r = t.value, i = `@${this.picked.add(e.label, e.insert)} `;
		t.setMentions(this.picked.labels()), t.value = r.slice(0, this.mentionStart) + i + r.slice(n), this.stored(this.composed);
		let a = this.mentionStart + i.length;
		t.setSelectionRange(a, a), this.mentions = [], t.focus();
	}
	onScroll() {
		let e = this.scroller;
		e && (this.stickToBottom = e.scrollHeight - e.scrollTop - e.clientHeight < 40);
	}
	pickProvider(e) {
		this.providerId = e.target.value, this.model = this.provider?.default_model ?? "";
	}
	render() {
		if (this.loadError) return S`<div class="empty">${R("load_error", { error: this.loadError })}</div>`;
		if (this.info && !this.info.providers.length) return S`<div class="empty">${R("no_provider")}</div>`;
		let e = this.slim ? this.showList : this.prefs.listOpen, t = this.convId ? this.lastUserIndex() : -1;
		return S`
      <div
        class="layout ${this.slim ? "narrow" : ""}"
        @click=${this.closePrefsOutside}
        @keydown=${(e) => {
			e.key === "Escape" && (this.running && !e.defaultPrevented && !e.isComposing && !this.showPrefs && (e.preventDefault(), this.stop()), this.showPrefs && e.preventDefault(), this.showPrefs = !1);
		}}
      >
        ${e ? this.renderList() : C}
        <main
          class=${this.showChanges ? "changes" : ""}
          @dragover=${this.onDragOver}
          @dragleave=${this.onDragLeave}
          @drop=${this.onDrop}
        >
          <header>
            ${this.embedded ? C : S`<ha-menu-button
                    .hass=${this.hass}
                    .narrow=${this.narrow}
                  ></ha-menu-button>`}
            <button
              class="icon"
              title=${R(e ? "hide_chats" : "show_chats")}
              aria-label=${R("conversations")}
              aria-expanded=${e}
              @click=${() => this.slim ? this.showList = !this.showList : this.setPref("listOpen", !this.prefs.listOpen)}
            >
              <ha-icon
                icon=${this.slim ? "mdi:forum-outline" : "mdi:dock-left"}
              ></ha-icon>
            </button>
            <div class="title">${this.showChanges ? R(this.view === "notes" ? "home_notes" : this.view) : ff(this.chatTitle)}</div>
            ${this.items.length ? S`<button
                    class="icon"
                    title=${R("export_title")}
                    aria-label=${R("export")}
                    @click=${this.exportChat}
                  >
                    <ha-icon icon="mdi:tray-arrow-down"></ha-icon>
                  </button>` : C}
            ${e ? C : S`<button
                    class="icon"
                    title=${R("new_chat")}
                    aria-label=${R("new_chat")}
                    @click=${this.newChat}
                  >
                    <ha-icon icon="mdi:square-edit-outline"></ha-icon>
                  </button>`}
            ${this.member ? C : S`<button
                    class="icon"
                    title=${R("home_notes")}
                    aria-label=${R("home_notes")}
                    aria-pressed=${this.showChanges && this.view === "notes"}
                    @click=${() => {
			this.showChanges = !(this.showChanges && this.view === "notes"), this.view = "notes";
		}}
                  >
                    <ha-icon icon="mdi:notebook-outline"></ha-icon>
                  </button>`}
            ${this.member ? C : S`<button
                    class="icon"
                    title=${R("changes_title")}
                    aria-label=${R("changes")}
                    aria-pressed=${this.showChanges && this.view === "changes"}
                    @click=${() => {
			this.showChanges = !(this.showChanges && this.view === "changes"), this.view = "changes";
		}}
                  >
                    <ha-icon icon="mdi:history"></ha-icon>
                  </button>`}
            ${this.member ? C : S`<button
                    class="icon"
                    title=${R("usage_view_title")}
                    aria-label=${R("usage")}
                    aria-pressed=${this.showChanges && this.view === "usage"}
                    @click=${() => {
			this.showChanges = !(this.showChanges && this.view === "usage"), this.view = "usage";
		}}
                  >
                    <ha-icon icon="mdi:chart-bar"></ha-icon>
                  </button>`}
            <button
              class="icon gear"
              title=${R("panel_settings")}
              aria-label=${R("panel_settings")}
              aria-expanded=${this.showPrefs}
              @click=${() => this.showPrefs = !this.showPrefs}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            ${this.showPrefs ? this.renderPrefs() : C}
          </header>
          ${this.showChanges && this.view === "notes" ? S`<llm-agent-notes .hass=${this.hass}></llm-agent-notes>` : this.showChanges && this.view === "usage" ? S`<llm-agent-usage .hass=${this.hass}></llm-agent-usage>` : this.showChanges ? S`<llm-agent-changes
                  .hass=${this.hass}
                  @open-chat=${(e) => void this.open(e.detail)}
                ></llm-agent-changes>` : C}
          <div class="sr-only" role="status" aria-live="polite">${this.announce}</div>
          <div class="messages" role="log" aria-label=${R("conversation")} @scroll=${this.onScroll}>
            ${this.items.length ? C : this.renderWelcome()}
            ${ct(this.items, (e, t) => t, (e, n) => this.renderItem(e, n === this.items.length - 1, n === t, e.kind !== "user" && e.kind !== "notice" && (n === 0 || this.items[n - 1].kind === "user"), n))}
          </div>
          ${this.renderComposer()}
        </main>
        ${this.showSettings ? S`<llm-agent-settings
                .hass=${this.hass}
                @close=${() => this.showSettings = !1}
                @reloaded=${this.reloaded}
              ></llm-agent-settings>` : C}
      </div>
    `;
	}
	onSearch(e) {
		this.query = e.target.value, clearTimeout(this.searchTimer), this.query.trim() ? this.searchTimer = window.setTimeout(async () => {
			let e = this.query, t = await this.ws.sendMessagePromise({
				type: "llm_agent/conversations/search",
				query: e
			});
			e === this.query && (this.hits = t.conversations);
		}, 300) : this.hits = null;
	}
	exportChat() {
		let e = rf(this.chatTitle, this.items), t = URL.createObjectURL(new Blob([e], { type: "text/markdown" })), n = document.createElement("a");
		n.href = t, n.download = `${af(this.chatTitle) || "chat"}.md`, n.click(), URL.revokeObjectURL(t);
	}
	renderList() {
		let e = this.hits ?? this.convs;
		return S`<nav>
      <div class="nav-head">
        <span class="brand"
          ><span class="brand-mark"
            ><ha-icon icon="mdi:robot-happy-outline"></ha-icon></span
          >LLM Agent</span
        >
        <button
          class="icon"
          title=${R("new_chat")}
          aria-label=${R("new_chat")}
          @click=${this.newChat}
        >
          <ha-icon icon="mdi:square-edit-outline"></ha-icon>
        </button>
      </div>
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder=${R("search_chats")}
          aria-label=${R("search_chats")}
          .value=${this.query}
          @input=${this.onSearch}
        />
      </label>
      <div class="convs">
        ${this.hits && !this.hits.length ? S`<div class="nav-empty">${R("no_matches")}</div>` : C}
        ${!this.hits && !this.convs.length ? S`<div class="nav-empty">${R("no_chats")}</div>` : C}
        ${hf(e, !!this.hits).map(([e, t]) => S`
            ${e ? S`<div class="group">${R(e)}</div>` : C}
            ${t.map((e) => S`<div
                  class="conv ${e.id === this.convId ? "active" : ""}"
                  @click=${() => this.open(e.id)}
                >
                  <span class="conv-title"
                    >${e.source === "action" ? S`<ha-icon
                            class="auto"
                            icon="mdi:robot-outline"
                            title=${R("started_by_automation")}
                          ></ha-icon>` : C}${ff(e.title)}${e.snippet && e.snippet !== e.title ? S`<small class="snippet">${e.snippet}</small>` : C}</span
                  >
                  <button
                    class="icon del"
                    title=${R("delete")}
                    aria-label=${R("delete_chat")}
                    @click=${(t) => this.removeConv(e.id, t)}
                  >
                    <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                  </button>
                </div>`)}
          `)}
      </div>
    </nav>`;
	}
	closePrefsOutside(e) {
		this.showPrefs && (e.composedPath().some((e) => e instanceof HTMLElement && (e.classList.contains("prefs") || e.classList.contains("gear"))) || (this.showPrefs = !1));
	}
	renderPrefs() {
		let e = this.prefs, t = (t, n, r) => S`<label
        >${n}
        <select
          @change=${(e) => this.setPref(t, e.target.value)}
        >
          ${r.map(([n, r]) => S`<option value=${String(n)} ?selected=${e[t] === n}>
                ${r}
              </option>`)}
        </select></label
      >`, n = (t, n) => S`<label class="check"
        ><input
          type="checkbox"
          .checked=${e[t]}
          @change=${(e) => this.setPref(t, e.target.checked)}
        />${n}</label
      >`, r = this.info?.my_default, i = r ? `${this.info?.providers.find((e) => e.id === r.provider_id)?.name ?? "?"} · ${r.model || R("model_provider_default")}` : "";
		return S`<div class="prefs" role="dialog" aria-label=${R("panel_settings")}>
      ${t("theme", R("theme"), [
			["auto", R("theme_auto")],
			["light", R("theme_light")],
			["dark", R("theme_dark")]
		])}
      ${t("size", R("text_size"), [
			["small", R("size_small")],
			["normal", R("size_normal")],
			["large", R("size_large")]
		])}
      ${t("send", R("send_with"), [["enter", "Enter"], ["ctrl", "Ctrl+Enter"]])}
      ${n("compact", R("compact_layout"))}
      ${n("toolsOpen", R("expand_tools"))}
      ${n("showUsage", R("show_usage"))}
      ${this.member ? C : S`<div class="mine">
        <div>${R("my_default", { model: r ? i : R("provider_default") })}</div>
        <button class="small" @click=${() => this.setMyDefault()}>
          ${R("use_current_model")}
        </button>
        ${r ? S`<button
                class="small ghost"
                @click=${() => this.setMyDefault(!0)}
              >
                ${R("clear")}
              </button>` : C}
      </div>`}
      ${this.admin ? S`<div class="mine">
              <button
                class="small"
                @click=${() => {
			this.showPrefs = !1, this.showSettings = !0;
		}}
              >
                ${R("integration_settings")}
              </button>
              <button class="small ghost" @click=${zu}>${R("open_in_ha")}</button>
            </div>` : C}
      <div class="hint">${R("prefs_hint")}</div>
    </div>`;
	}
	renderWelcome() {
		let e = tf(this.hass, this.member), t = this.hass?.user?.name?.split(" ")[0];
		return S`<div class="welcome">
      <div class="logo"><ha-icon icon="mdi:robot-happy-outline"></ha-icon></div>
      <h2>${t ? R("greeting_name", {
			greeting: mf(),
			name: t
		}) : mf()}</h2>
      ${this.member ? S`<p>${R("welcome_member")}</p>` : S`<p>${R("welcome_admin")}</p>
              <span class="mode-chip"
                ><ha-icon icon="mdi:shield-check-outline"></ha-icon
                >${yf(this.info?.approval_mode)}</span
              >`}
      <div class="tips">
        ${e.map((e) => S`<button
              class="tip"
              @click=${() => {
			this.setText(e.text), this.input.focus();
		}}
            >
              <ha-icon icon=${e.icon}></ha-icon>
              <span>${e.text}</span>
            </button>`)}
      </div>
    </div>`;
	}
	renderItem(e, t, n = !1, r = !1, i = -1) {
		let a = r ? S`<div class="avatar" aria-hidden="true">
          <ha-icon icon="mdi:robot-happy-outline"></ha-icon>
        </div>` : C;
		switch (e.kind) {
			case "user": return S`<div class="row user ${i === this.editAt ? "edited" : ""}">
          ${this.convId && !this.running ? S`<div class="msg-actions">
                  <button
                    class="icon"
                    title=${R("edit")}
                    aria-label=${R("edit")}
                    @click=${() => this.edit(i)}
                  >
                    <ha-icon icon="mdi:pencil-outline"></ha-icon>
                  </button>
                  ${n ? S`<button
                          class="icon"
                          title=${R("retry")}
                          aria-label=${R("retry")}
                          @click=${() => this.send(e.text)}
                        >
                          <ha-icon icon="mdi:refresh"></ha-icon>
                        </button>` : C}
                </div>` : C}
          <div class="msg user md">
            ${this.renderPhotos(e)}${Ze(sl(Wc(e.text), this.hass))}
          </div>
          ${e.page ? S`<div class="page-note">
                  <ha-icon icon="mdi:file-eye-outline"></ha-icon>${R("page_sent", { page: e.page })}
                </div>` : C}
        </div>`;
			case "assistant": return e.text ? S`<div class="row reply">
          ${a}
          <div class="msg assistant md">
            ${Ze(Wc(e.text, !(t && this.running)))}
          </div>
          ${t && this.running ? C : S`<div class="msg-actions acts">
                  <button
                    class="icon"
                    title=${R("copy")}
                    aria-label=${R("copy")}
                    @click=${(t) => this.copy(e.text, t.currentTarget)}
                  >
                    <ha-icon icon="mdi:content-copy"></ha-icon>
                  </button>
                </div>`}
        </div>` : t && this.running ? S`<div class="row reply">
                ${a}
                <div class="msg assistant typing">
                  <span></span><span></span><span></span>
                </div>
              </div>` : C;
			case "notice": return S`<div class="notice ${e.error ? "error" : ""}">
          ${e.text}
          ${t && !this.running && e.stop && of.has(e.stop) ? S`<button
                  class="small"
                  @click=${() => this.continueTurn(e.stop === "spend_cap")}
                >
                  ${e.stop === "spend_cap" ? R("continue_anyway") : R("continue")}
                </button>` : C}
        </div>`;
			case "tool": return S`<div class="row reply">
          ${a}${this.renderTool(e)}
        </div>`;
		}
	}
	renderPreview(e) {
		let t = e.args?.config;
		if (!t || typeof t != "object") return S``;
		let n = this.previews.has(e.id);
		return S`<div class="preview">
      <button
        class="ghost small"
        @click=${() => {
			let t = new Set(this.previews);
			n ? t.delete(e.id) : t.add(e.id), this.previews = t;
		}}
      >
        <ha-icon icon=${n ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
        ${R(n ? "hide_preview" : "preview_dashboard")}
      </button>
      ${n ? S`<llm-dashboard-preview .hass=${this.hass} .config=${t}></llm-dashboard-preview>` : C}
    </div>`;
	}
	renderNoteSuggestion(e) {
		let t = (e.approval?.diff ?? "").replace(/\n+$/, "").split("\n"), n = t.filter((e) => e.startsWith("+") && !e.startsWith("+++")).map((e) => e.slice(1)), r = t.filter((e) => e.startsWith("-") && !e.startsWith("---")).map((e) => e.slice(1)), i = this.noteCardSince.get(e.id);
		i === void 0 && (i = Date.now(), this.noteCardSince.set(e.id, i), setTimeout(() => this.requestUpdate(), ef + 50));
		let a = Date.now() - i >= ef;
		return S`<div class="note-suggestion" role="group" aria-label=${R("suggested_note")}>
      <div class="note-head">
        <ha-icon icon="mdi:notebook-edit-outline"></ha-icon>
        <div>
          <strong>${R("note_question")}</strong>
          <small>${R("note_explain")}</small>
        </div>
      </div>
      ${n.filter((e) => e.trim()).length ? S`<ul class="note-lines add">
            ${n.filter((e) => e.trim()).map((e) => S`<li>${e}</li>`)}
          </ul>` : C}
      ${r.filter((e) => e.trim()).length ? S`<div class="note-label">${R("forget")}</div>
            <ul class="note-lines del">
              ${r.filter((e) => e.trim()).map((e) => S`<li>${e}</li>`)}
            </ul>` : C}
      <div class="note-actions">
        <button class="ghost" @click=${() => this.answer(e.id, !1)}>
          ${R("note_no")}
        </button>
        <button
          class="note-save"
          ?disabled=${!a}
          title=${R(a ? "note_save_title" : "read_it_first")}
          @click=${() => this.answer(e.id, !0)}
        >
          ${R("save_to_notes")}
        </button>
      </div>
    </div>`;
	}
	renderTool(e) {
		let t = e.approval;
		if (t && !t.phoneOnly && e.name === "change_home_note") return this.renderNoteSuggestion(e);
		let n = {
			running: S`<span class="spinner" aria-label=${R("running")}></span>`,
			ok: S`<ha-icon
        class="st ok"
        icon="mdi:check-circle"
        aria-label=${R("done")}
      ></ha-icon>`,
			error: S`<ha-icon
        class="st error"
        icon="mdi:alert-circle"
        aria-label=${R("failed")}
      ></ha-icon>`,
			waiting: S`<span class="tag wait">${R("waiting_for_you")}</span>`
		}[e.status];
		return S`<div
      class="tool ${e.status} ${t?.risky ? "risky" : ""}"
    >
      ${t ? S`<div class="approval-head">
              <ha-icon
                icon=${t.risky ? "mdi:shield-alert-outline" : "mdi:hand-back-right-outline"}
              ></ha-icon>
              <span
                >${R("needs_approval")}${t.reason ? S`<span class="why"> · ${t.reason}</span>` : C}</span
              >
            </div>` : C}
      <details ?open=${!!t || this.prefs.toolsOpen}>
        <summary>
          <span class="tool-icon"
            ><ha-icon icon=${df(e.name)}></ha-icon
          ></span>
          <span class="tool-name">${gf(e.name)}</span>
          <span class="tool-summary"
            >${t?.summary ?? e.summary ?? _f(e.args)}</span
          >
          ${e.undone ? S`<span class="tag">${R("undone")}</span>` : C}
          ${lf(e.review, e.reviewing)}
          ${n}
          ${e.snapshotId && !e.undone && e.status === "ok" && !this.member ? S`<button
                  class="ghost small undo"
                  title=${R("undo_title")}
                  @click=${(t) => {
			t.preventDefault(), t.stopPropagation(), this.undo(e);
		}}
                >
                  ${R("undo")}
                </button>` : C}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        ${e.review ? S`<div class="review-note ${e.review.decision}">
                <ha-icon icon="mdi:shield-check-outline"></ha-icon>
                <span
                  ><b>${e.review.model ? R("reviewer_model", { model: e.review.model }) : R("reviewer")}:</b>
                  ${e.review.reason || R(cf[e.review.decision])}</span
                >
              </div>` : C}
        ${t?.diff ? S`<pre class="diff">${uf(t.diff)}</pre>` : C}
        ${t && e.name === "save_dashboard" ? this.renderPreview(e) : C}
        ${this.renderArgs(e.args, !!t?.diff)}
        ${e.preview && !t ? S`<pre class="result">${e.preview}</pre>` : C}
      </details>
        ${e.image ? S`<img class="snapshot" src=${e.image} alt=${R("camera_snapshot")} />` : C}
      ${t?.phoneOnly ? S`<div class="approval phone-wait">
              <ha-icon icon="mdi:cellphone-message"></ha-icon>
              ${R("phone_wait")}
            </div>` : t ? S`<div class="approval">
              <input
                id="note-${e.id}"
                placeholder=${R("approval_note")}
                aria-label=${R("approval_note")}
              />
              <button
                class="ghost danger-text"
                @click=${() => this.answer(e.id, !1)}
              >
                ${R("deny")}
              </button>
              <button
                class="primary"
                @click=${() => this.answer(e.id, !0)}
              >
                ${R("approve")}
              </button>
            </div>` : C}
    </div>`;
	}
	renderPhotos(e) {
		if (e.kind !== "user") return C;
		let t = e.files?.length ? S`<div class="files">${e.files.map((e) => this.renderFile(e))}</div>` : C;
		return e.images?.length ? S`<div class="photos">${e.images.map((e) => S`<img src=${e.url} alt=${R("your_photo")} />`)}</div>${t}` : e.photos ? S`<div class="photo-note"><ha-icon icon="mdi:image-outline"></ha-icon>${pf(e.photos)} ${R("not_kept")}</div>${t}` : t;
	}
	renderFile(e, t) {
		return S`<span class="file" title=${e.name}>
      <ha-icon icon=${Tf[e.kind]}></ha-icon>
      <span class="file-name">${e.name}</span>
      <span class="file-meta">${kf(e)}, ${Of(e.size)}</span>
      ${t ? S`<button
              class="icon"
              title=${R("remove_file")}
              aria-label=${`${R("remove_file")}: ${e.name}`}
              @click=${t}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : C}
    </span>`;
	}
	renderComposer() {
		let e = this.provider, t = "models", n = this.pageContext;
		return S`<footer>
      ${n ? S`<button
              class="page-chip ${this.pageOff ? "off" : ""}"
              aria-pressed=${!this.pageOff}
              title=${`${n.path}\n${R(this.pageOff ? "page_chip_off" : "page_chip_on")}`}
              @click=${() => this.pageOff = !this.pageOff}
            >
              <ha-icon icon=${this.pageOff ? "mdi:file-remove-outline" : "mdi:file-eye-outline"}></ha-icon>
              <span>${R("page_chip", { page: n.summary })}</span>
            </button>` : C}
      <div class="composer ${this.dragging ? "dragging" : ""}">
        <textarea
          rows="1"
          placeholder=${this.slim ? R("composer_placeholder") : `${R("composer_placeholder")} (${R(this.prefs.send === "ctrl" ? "keys_ctrl" : "keys_enter")})`}
        ></textarea>
        ${this.mentions.length ? S`<ul class="mentions" role="listbox">
                ${this.mentions.map((e, t) => S`<li
                      role="option"
                      aria-selected=${t === this.mentionIndex}
                      class=${t === this.mentionIndex ? "active" : ""}
                      @mousedown=${(t) => {
			t.preventDefault(), this.pickMention(e);
		}}
                    >
                      <span class="kind">${e.kind}</span>
                      <span class="label">${e.label}</span>
                      <span class="detail">${e.detail}</span>
                    </li>`)}
              </ul>` : C}
        ${this.photos.length ? S`<div class="attached">
                ${this.photos.map((e, t) => S`<span class="thumb">
                      <img src=${e.url} alt=${R("photo_to_send")} />
                      <button
                        class="icon"
                        title=${R("remove_photo")}
                        aria-label=${R("remove_photo")}
                        @click=${() => this.photos = this.photos.filter((e, n) => n !== t)}
                      >
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    </span>`)}
              </div>` : C}
        ${this.files.length ? S`<div class="attached files">
                ${this.files.map((e, t) => this.renderFile(e, () => {
			this.files = this.files.filter((e, n) => n !== t);
		}))}
              </div>` : C}
        <div class="toolbar">
          <label
            class="attach icon"
            title=${R("attach_title")}
            ?hidden=${this.photos.length >= xf && this.files.length >= Sf}
          >
            <ha-icon icon="mdi:paperclip"></ha-icon>
            <!-- No accept filter: HA files often have no extension (.storage/*,
                 home-assistant.log.1), and the type is decided from the bytes. -->
            <input
              type="file"
              multiple
              aria-label=${R("attach")}
              ?disabled=${this.running}
              @change=${this.onPick}
            />
          </label>
          ${this.member ? C : S`<label
            class="model-pill"
            title=${this.modelError || R("provider_and_model")}
          >
            <ha-icon icon="mdi:creation-outline"></ha-icon>
            <select
              aria-label=${R("provider")}
              @change=${this.pickProvider}
              .value=${this.providerId}
              ?disabled=${this.running}
            >
              ${this.info?.providers.map((e) => S`<option
                    value=${e.id}
                    ?selected=${e.id === this.providerId}
                  >
                    ${e.name}
                  </option>`)}
            </select>
            <span class="sep">/</span>
            <input
              class="model"
              aria-label=${R("model")}
              list=${t}
              .value=${this.model}
              ?disabled=${this.running}
              @change=${(e) => this.model = e.target.value.trim()}
              @focus=${this.loadModels}
            />
            <datalist id=${t}>
              ${(this.fetched[this.providerId] ?? e?.models)?.map((e) => S`<option value=${e.id}>${e.label}</option>`)}
            </datalist>
          </label>`}
          <span class="spacer"></span>
          ${this.running ? S`<button
                  class="send stop"
                  title=${R("stop")}
                  aria-label=${R("stop")}
                  @click=${this.stop}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>` : S`<button
                  class="send"
                  title=${R("send")}
                  aria-label=${R("send")}
                  ?disabled=${!this.hasText && !this.photos.length && !this.files.length}
                  @click=${() => this.send()}
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>`}
        </div>
      </div>
      <div class="meta">
        ${this.editAt >= 0 ? S`<span class="editing"
                >${R(this.editAt === this.lastUserIndex() ? "editing_last" : "editing_earlier")}
                <button class="small ghost" @click=${this.cancelEdit}>
                  ${R("cancel")}
                </button></span
              >` : C}
        <span
          class="usage"
          ?hidden=${!this.prefs.showUsage}
          title=${R("usage_title")}
        >
          ${R("usage_line", {
			input: vf(this.usage.input + this.usage.cache_read + this.usage.cache_write),
			output: vf(this.usage.output)
		})}
          ${this.usage.cache_read ? ` · ${R("usage_cached", { count: vf(this.usage.cache_read) })}` : C}
          ·
          ${this.usage.cost == null ? R("cost_na") : `~$${this.usage.cost.toFixed(this.usage.cost < 1 ? 4 : 2)}`}
          ${this.usage.review ? ` · ${R("reviewer_usage", {
			tokens: vf(this.usage.review.input + this.usage.review.output),
			cost: this.usage.review.cost == null ? R("cost_na") : `~$${this.usage.review.cost.toFixed(4)}`
		})}` : C}
        </span>
      </div>
    </footer>`;
	}
};
Y([D({ attribute: !1 })], $.prototype, "hass", void 0), Y([D({ type: Boolean })], $.prototype, "narrow", void 0), Y([D({ attribute: !1 })], $.prototype, "pageContext", void 0), Y([D({
	type: Boolean,
	reflect: !0
})], $.prototype, "embedded", void 0), Y([O()], $.prototype, "info", void 0), Y([O()], $.prototype, "convs", void 0), Y([O()], $.prototype, "query", void 0), Y([O()], $.prototype, "previews", void 0), Y([O()], $.prototype, "hits", void 0), Y([O()], $.prototype, "convId", void 0), Y([O()], $.prototype, "chatTitle", void 0), Y([O()], $.prototype, "items", void 0), Y([O()], $.prototype, "usage", void 0), Y([O()], $.prototype, "running", void 0), Y([O()], $.prototype, "announce", void 0), Y([O()], $.prototype, "editAt", void 0), Y([O()], $.prototype, "hasText", void 0), Y([O()], $.prototype, "photos", void 0), Y([O()], $.prototype, "files", void 0), Y([O()], $.prototype, "dragging", void 0), Y([O()], $.prototype, "providerId", void 0), Y([O()], $.prototype, "model", void 0), Y([O()], $.prototype, "fetched", void 0), Y([O()], $.prototype, "showList", void 0), Y([O()], $.prototype, "loadError", void 0), Y([O()], $.prototype, "mentions", void 0), Y([O()], $.prototype, "prefs", void 0), Y([O()], $.prototype, "showPrefs", void 0), Y([O()], $.prototype, "showSettings", void 0), Y([O()], $.prototype, "showChanges", void 0), Y([O()], $.prototype, "view", void 0), Y([O()], $.prototype, "mentionIndex", void 0), Y([O()], $.prototype, "pageOff", void 0), Y([Ke(".composer textarea")], $.prototype, "source", void 0), Y([Ke(".messages")], $.prototype, "scroller", void 0);
var Bd = "llm-agent-prefs";
async function Vd(e) {
	try {
		return await navigator.clipboard.writeText(e), !0;
	} catch {
		let t = document.createElement("textarea");
		t.value = e, document.body.append(t), t.select();
		let n = document.execCommand("copy");
		return t.remove(), n;
	}
}
function Hd(e) {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "{}");
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
function Ud(e, t) {
	try {
		Object.keys(t).length ? localStorage.setItem(e, JSON.stringify(t)) : localStorage.removeItem(e);
	} catch {}
}
function Wd(e, t) {
	let n = Hd(e)[t ?? ""];
	return typeof n == "string" ? n : "";
}
function Gd(e, t, n) {
	let r = Hd(e), i = t ?? "";
	if (n.trim()) r[i] = n;
	else if (i in r) delete r[i];
	else return;
	Ud(e, r);
}
function Kd(e, t) {
	let n = Hd(e), r = new Set(t.map((e) => e.id)), i = Object.keys(n).filter((e) => e && !r.has(e));
	for (let e of i) delete n[e];
	i.length && Ud(e, n);
}
var qd = "llm-agent-last-chat";
function Jd() {
	try {
		return localStorage.getItem(qd);
	} catch {
		return null;
	}
}
function Yd(e) {
	try {
		e ? localStorage.setItem(qd, e) : localStorage.removeItem(qd);
	} catch {}
}
var Xd = {
	theme: "auto",
	size: "normal",
	compact: !1,
	toolsOpen: !1,
	showUsage: !0,
	send: "enter",
	listOpen: !0
};
function Zd() {
	try {
		let e = JSON.parse(localStorage.getItem(Bd) ?? "{}");
		return {
			...Xd,
			...typeof e == "object" && e ? e : {}
		};
	} catch {
		return { ...Xd };
	}
}
function Qd(e) {
	try {
		localStorage.setItem(Bd, JSON.stringify(e));
	} catch {}
}
var $d = 8, ef = 1500;
function tf(e, t = !1) {
	let n = Object.values(e?.areas ?? {}).map((e) => String(e.name ?? "")).filter(Boolean).sort((e, t) => e.localeCompare(t))[0] ?? R("living_room"), r = Object.values(e?.states ?? {}).some((e) => e.attributes?.device_class === "energy");
	return t ? [
		{
			text: R("tip_lights", { room: n }),
			icon: "mdi:lightbulb-group-outline"
		},
		{
			text: R("tip_anything_on"),
			icon: "mdi:power"
		},
		{
			text: R("tip_temperature"),
			icon: "mdi:thermometer"
		}
	] : [
		{
			text: R("tip_lights", { room: n }),
			icon: "mdi:lightbulb-group-outline"
		},
		{
			text: R("tip_dashboard_room", { room: n }),
			icon: "mdi:view-dashboard-outline"
		},
		{
			text: R("tip_dashboard_all"),
			icon: "mdi:view-dashboard-edit-outline"
		},
		{
			text: R("tip_automation"),
			icon: "mdi:robot-outline"
		},
		r ? {
			text: R("tip_energy"),
			icon: "mdi:lightning-bolt-outline"
		} : {
			text: R("tip_unavailable"),
			icon: "mdi:stethoscope"
		},
		{
			text: R("tip_batteries"),
			icon: "mdi:battery-alert-variant-outline"
		}
	];
}
function nf(e, t) {
	let n = t.toLowerCase(), r = [], i = (e, t) => {
		let i = e.label.toLowerCase(), a = t.toLowerCase(), o;
		if (!n) o = 3;
		else if (i.startsWith(n) || a.startsWith(n)) o = 0;
		else if (i.includes(n) || a.includes(n)) o = 1;
		else return;
		r.push([o, e]);
	};
	for (let t of Object.values(e.areas ?? {})) i({
		kind: "area",
		label: t.name,
		insert: `area_id:${t.area_id}`,
		detail: t.area_id
	}, t.area_id);
	for (let t of Object.values(e.devices ?? {})) {
		let e = t.name_by_user || t.name;
		e && i({
			kind: "device",
			label: e,
			insert: `device_id:${t.id} (${e})`,
			detail: "device"
		}, e);
	}
	for (let t of Object.values(e.states ?? {})) i({
		kind: "entity",
		label: t.attributes.friendly_name || t.entity_id,
		insert: t.entity_id,
		detail: t.entity_id
	}, t.entity_id);
	return r.sort((e, t) => e[0] - t[0] || e[1].label.localeCompare(t[1].label)), r.slice(0, $d).map(([, e]) => e);
}
function rf(e, t) {
	let n = [`# ${ff(e)}`, ""];
	for (let e of t) if (e.kind === "user") {
		let t = e.images?.length || e.photos || 0, r = [...t ? [pf(t)] : [], ...(e.files ?? []).map((e) => e.name)], i = r.length ? ` _(${r.join(", ")})_` : "";
		n.push(`**${R("you")}:** ${e.text}${i}`, "");
	} else if (e.kind === "assistant" && e.text) n.push(e.text, "");
	else if (e.kind === "notice") n.push(`> ${e.text}`, "");
	else if (e.kind === "tool") {
		let t = e.status === "ok" ? "✓" : e.status === "error" ? "✗" : "…";
		n.push(`- ${t} \`${e.name}\`${e.summary ? `: ${e.summary}` : ""}`, "");
	}
	return n.join("\n");
}
function af(e) {
	return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
}
var of = /* @__PURE__ */ new Set([
	"length",
	"tool_limit",
	"cancelled",
	"spend_cap"
]);
function sf(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let r of e) if (r.role === "user") t.push({
		kind: "user",
		text: r.content,
		photos: r.photos,
		files: r.files,
		page: r.page
	});
	else if (r.role === "assistant") {
		r.content && t.push({
			kind: "assistant",
			text: r.content
		});
		for (let e of r.tool_calls) n.set(e.id, {
			name: e.name,
			args: e.args
		});
	} else {
		let e = n.get(r.tool_call_id);
		t.push({
			kind: "tool",
			id: r.tool_call_id,
			name: r.name,
			args: e?.args ?? {},
			status: r.ok ? "ok" : "error",
			summary: r.summary || (r.decision === "denied" ? R("denied") : ""),
			preview: r.preview,
			snapshotId: r.snapshot_id,
			undone: r.undone,
			review: r.review ?? void 0
		});
	}
	return t;
}
var cf = {
	approve: "reviewer_approved",
	deny: "reviewer_denied",
	ask: "reviewer_unsure"
};
function lf(e, t) {
	return t && !e ? S`<span class="tag wait">${R("reviewing")}</span>` : e ? S`<span class="tag review ${e.decision}" title=${e.reason}
    >${R(cf[e.decision] ?? "reviewer")}</span
  >` : C;
}
function uf(e) {
	return e.replace(/\n+$/, "").split("\n").map((e) => S`<span class=${e.startsWith("+") && !e.startsWith("+++") ? "add" : e.startsWith("-") && !e.startsWith("---") ? "del" : e.startsWith("@@") ? "hunk" : ""}>${e || " "}</span>`);
}
function df(e) {
	return e === "shell" ? "mdi:console" : e === "call_service" ? "mdi:play-circle-outline" : e === "undo" ? "mdi:undo" : e === "system" ? "mdi:cog-outline" : e === "ha_websocket" ? "mdi:api" : e === "integrations" ? "mdi:puzzle-outline" : e === "read_reference" ? "mdi:book-open-variant" : e === "render_template" ? "mdi:code-braces" : e === "get_history" ? "mdi:chart-timeline-variant" : e === "web_fetch" ? "mdi:web" : e === "web_search" ? "mdi:magnify" : e === "camera_snapshot" ? "mdi:cctv" : e === "get_traces" ? "mdi:transit-connection-variant" : e === "get_logbook" ? "mdi:history" : e === "read_log" ? "mdi:text-box-search-outline" : e.includes("dashboard") ? "mdi:view-dashboard-outline" : e.includes("config_item") ? "mdi:robot-outline" : e.includes("file") ? "mdi:file-document-outline" : e.includes("area") || e.includes("device") || e.includes("registry") ? "mdi:devices" : e.includes("entit") || e.includes("service") ? "mdi:format-list-bulleted" : "mdi:wrench-outline";
}
function ff(e) {
	return e === "New chat" ? R("new_chat") : e;
}
function pf(e) {
	return e === 1 ? R("one_photo") : R("n_photos", { count: e });
}
function mf() {
	let e = (/* @__PURE__ */ new Date()).getHours();
	return R(e < 5 ? "greeting_evening" : e < 12 ? "greeting_morning" : e < 18 ? "greeting_afternoon" : "greeting_evening");
}
function hf(e, t) {
	if (t) return [["", e]];
	let n = /* @__PURE__ */ new Date();
	n.setHours(0, 0, 0, 0);
	let r = n.getTime() / 1e3, i = [
		["today", r],
		["yesterday", r - 86400],
		["previous_7", r - 604800],
		["previous_30", r - 2592e3],
		["older", -Infinity]
	], a = [];
	for (let t of e) {
		let e = i.find(([, e]) => t.updated >= e)[0], n = a.find(([t]) => t === e);
		n ? n[1].push(t) : a.push([e, [t]]);
	}
	return a;
}
function gf(e) {
	let t = `tool_${e}`;
	return xa(t) ? R(t) : e.replace(/_/g, " ");
}
function _f(e) {
	let t = Object.entries(e).filter(([e]) => !e.startsWith("_")).map(([e, t]) => `${e}=${typeof t == "string" ? t : JSON.stringify(t)}`).join(" ");
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
function vf(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(e);
}
function yf(e) {
	let t = {
		ask_all: "mode_ask_all",
		ask_risky: "mode_ask_risky",
		reviewer: "mode_reviewer",
		autopilot: "mode_autopilot",
		yolo: "mode_yolo",
		read_only: "mode_read_only"
	}[e ?? ""];
	return t ? R(t) : "";
}
function bf(e) {
	return e.message ?? String(e);
}
customElements.get("llm-agent-panel") || customElements.define("llm-agent-panel", $);
var xf = 3, Sf = 10, Cf = 2097152, wf = 35e5, Tf = {
	text: "mdi:file-document-outline",
	pdf: "mdi:file-pdf-box",
	zip: "mdi:folder-zip-outline",
	gzip: "mdi:folder-zip-outline"
};
function Ef(e) {
	return e.type.startsWith("image/") && e.type !== "image/svg+xml";
}
function Df(e) {
	return Math.ceil(e / 3) * 4;
}
function Of(e) {
	return e >= 1048576 ? `${(e / 1048576).toFixed(1)} MB` : e >= 1024 ? `${Math.round(e / 1024)} KB` : `${e} B`;
}
function kf(e) {
	if (e.kind !== "text") return e.kind.toUpperCase();
	let t = e.name.lastIndexOf("."), n = t > 0 ? e.name.slice(t + 1) : "";
	return n && n.length <= 5 ? n.toUpperCase() : R("file_text");
}
function Af(e) {
	let t = (...t) => t.every((t, n) => e[n] === t);
	if (t(80, 75, 3, 4) || t(80, 75, 5, 6)) return "zip";
	if (t(31, 139)) return "gzip";
	if (t(37, 80, 68, 70, 45)) return "pdf";
	if (t(255, 254) || t(254, 255)) return "text";
	let n = 0;
	for (let t of e) {
		if (t === 0) return null;
		t < 32 && t !== 9 && t !== 10 && t !== 12 && t !== 13 && t !== 27 && n++;
	}
	return e.length && n / e.length > .02 ? null : "text";
}
async function jf(e) {
	let t = Af(new Uint8Array(await e.slice(0, 8192).arrayBuffer()));
	if (!t) return null;
	let n = await new Promise((t, n) => {
		let r = new FileReader();
		r.onload = () => t(r.result), r.onerror = () => n(r.error), r.readAsDataURL(e);
	});
	return {
		name: e.name || "file",
		size: e.size,
		kind: t,
		data: n.slice(n.indexOf(",") + 1)
	};
}
var Mf = 1568, Nf = 1e6;
async function Pf(e) {
	let t = await createImageBitmap(e);
	try {
		let e = Math.min(Mf, Math.max(t.width, t.height));
		for (;;) {
			for (let n of [
				.85,
				.7,
				.55
			]) {
				let r = Ff(t, e, n), i = r.slice(r.indexOf(",") + 1);
				if (i.length <= Nf) return {
					media_type: "image/jpeg",
					data: i,
					url: r
				};
			}
			if (e <= 256) throw Error("photo too detailed to send");
			e = Math.round(e * .75);
		}
	} finally {
		t.close();
	}
}
function Ff(e, t, n) {
	let r = Math.min(1, t / Math.max(e.width, e.height)), i = document.createElement("canvas");
	i.width = Math.max(1, Math.round(e.width * r)), i.height = Math.max(1, Math.round(e.height * r));
	let a = i.getContext("2d");
	return a.fillStyle = "#fff", a.fillRect(0, 0, i.width, i.height), a.drawImage(e, 0, 0, i.width, i.height), i.toDataURL("image/jpeg", n);
}
//#endregion
export { ad as collectPageContext, nf as findMentions, rf as toMarkdown, tf as welcomeTips };
