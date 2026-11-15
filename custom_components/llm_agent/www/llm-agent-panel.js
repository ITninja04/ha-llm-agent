//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, ee = h.trustedTypes, te = ee ? ee.emptyScript : "", ne = h.reactiveElementPolyfillSupport, re = (e, t) => e, g = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
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
}, ie = (e, t) => !l(e, t), ae = {
	attribute: !0,
	type: String,
	converter: g,
	reflect: !1,
	useDefault: !1,
	hasChanged: ie
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var _ = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ae) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? ae;
	}
	static _$Ei() {
		if (this.hasOwnProperty(re("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(re("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(re("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
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
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
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
		return s(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? g : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? g : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ie)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
_.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[re("elementProperties")] = /* @__PURE__ */ new Map(), _[re("finalized")] = /* @__PURE__ */ new Map(), ne?.({ ReactiveElement: _ }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var oe = globalThis, se = (e) => e, ce = oe.trustedTypes, v = ce ? ce.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, y = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + b, ue = `<${le}>`, de = document, x = () => de.createComment(""), fe = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, me = (e) => pe(e) || typeof e?.[Symbol.iterator] == "function", he = "[ 	\n\f\r]", ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, ve = />/g, ye = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), S = /'/g, be = /"/g, xe = /^(?:script|style|textarea|title)$/i, C = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), Se = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), we = de.createTreeWalker(de, 129);
function Te(e, t) {
	if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return v === void 0 ? t : v.createHTML(t);
}
var Ee = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ge;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ge ? c[1] === "!--" ? o = _e : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = ye) : (xe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = ye) : o = ve : o === ye ? c[0] === ">" ? (o = i ?? ge, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? ye : c[3] === "\"" ? be : S) : o === be || o === S ? o = ye : o === _e || o === ve ? o = ge : (o = ye, i = void 0);
		let d = o === ye && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ge ? n + ue : l >= 0 ? (r.push(s), n.slice(0, l) + y + n.slice(l) + b + d) : n + b + (l === -2 ? t : d);
	}
	return [Te(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, T = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
		if (this.el = e.createElement(l, r), we.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = we.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(y)) {
					let t = u[o++], n = i.getAttribute(e).split(b), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Oe : r[1] === "?" ? ke : r[1] === "@" ? Ae : O
					}), i.removeAttribute(e);
				} else e.startsWith(b) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (xe.test(i.tagName)) {
					let e = i.textContent.split(b), t = e.length - 1;
					if (t > 0) {
						i.textContent = ce ? ce.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], x()), we.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], x());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === le) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(b, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += b.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = de.createElement("template");
		return n.innerHTML = e, n;
	}
};
function E(e, t, n = e, r) {
	if (t === Se) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = fe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = E(e, i._$AS(e, t.values), i, r)), t;
}
var D = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? de).importNode(t, !0);
		we.currentNode = r;
		let i = we.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new De(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new je(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = we.nextNode(), a++);
		}
		return we.currentNode = de, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, De = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = E(this, e, t), fe(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== Se && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? me(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== w && fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(de.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = T.createElement(Te(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new D(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ce.get(e.strings);
		return t === void 0 && Ce.set(e.strings, t = new T(e)), t;
	}
	k(t) {
		pe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(x()), this.O(x()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = se(e).nextSibling;
			se(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, O = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = w;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = E(this, e, t, 0), a = !fe(e) || e !== this._$AH && e !== Se, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = E(this, r[n + o], t, o), s === Se && (s = this._$AH[o]), a ||= !fe(s) || s !== this._$AH[o], s === w ? e = w : e !== w && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Oe = class extends O {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === w ? void 0 : e;
	}
}, ke = class extends O {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== w);
	}
}, Ae = class extends O {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = E(this, e, t, 0) ?? w) === Se) return;
		let n = this._$AH, r = e === w && n !== w || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== w && (n === w || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, je = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		E(this, e);
	}
}, Me = {
	M: y,
	P: b,
	A: le,
	C: 1,
	L: Ee,
	R: D,
	D: me,
	V: E,
	I: De,
	H: O,
	N: ke,
	U: Ae,
	B: Oe,
	F: je
}, Ne = oe.litHtmlPolyfillSupport;
Ne?.(T, De), (oe.litHtmlVersions ??= []).push("3.3.3");
var Pe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new De(t.insertBefore(x(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, k = globalThis, A = class extends _ {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Pe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Se;
	}
};
A._$litElement$ = !0, A.finalized = !0, k.litElementHydrateSupport?.({ LitElement: A });
var Fe = k.litElementPolyfillSupport;
Fe?.({ LitElement: A }), (k.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Ie = {
	attribute: !0,
	type: String,
	converter: g,
	reflect: !1,
	hasChanged: ie
}, Le = (e = Ie, t, n) => {
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
function Re(e) {
	return (t, n) => typeof n == "object" ? Le(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function j(e) {
	return Re({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/base.js
var ze = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
//#endregion
//#region node_modules/@lit/reactive-element/decorators/query.js
function Be(e, t) {
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
			return ze(n, r, { get() {
				let n = e.call(this);
				return n === void 0 && (n = a(this), (n !== null || this.hasUpdated) && t.call(this, n)), n;
			} });
		}
		return ze(n, r, { get() {
			return a(this);
		} });
	};
}
//#endregion
//#region node_modules/lit-html/directive.js
var Ve = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, He = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ue = class {
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
}, We = class extends Ue {
	constructor(e) {
		if (super(e), this.it = w, e.type !== Ve.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === w || e == null) return this._t = void 0, this.it = e;
		if (e === Se) return e;
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
We.directiveName = "unsafeHTML", We.resultType = 1;
var Ge = He(We), { I: Ke } = Me, qe = (e) => e, Je = () => document.createComment(""), M = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new Ke(r.insertBefore(Je(), i), r.insertBefore(Je(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = qe(e).nextSibling;
				qe(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, Ye = (e, t, n = e) => (e._$AI(t, n), e), Xe = {}, Ze = (e, t = Xe) => e._$AH = t, Qe = (e) => e._$AH, $e = (e) => {
	e._$AR(), e._$AA.remove();
}, et = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, tt = He(class extends Ue {
	constructor(e) {
		if (super(e), e.type !== Ve.CHILD) throw Error("repeat() can only be used in text expressions");
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
		let i = Qe(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = Ye(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = Ye(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = Ye(i[d], a[m]), M(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = Ye(i[f], a[p]), M(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = et(o, p, m), u = et(s, d, f)), l.has(s[d])) {
			if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = M(e, i[d]);
					Ye(t, a[p]), c[p] = t;
				} else c[p] = Ye(n, a[p]), M(e, i[d], n), i[t] = null;
				p++;
			} else $e(i[f]), f--;
		} else $e(i[d]), d++;
		for (; p <= m;) {
			let t = M(e, c[m + 1]);
			Ye(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && $e(e);
		}
		return this.ut = o, Ze(e, c), Se;
	}
}), N = {
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
	saved: "Saved.",
	could_not_save: "Could not save.",
	notes_placeholder: "The office is upstairs.\nNever switch off the freezer plug.",
	save: "Save",
	characters_left: "{count} characters left",
	notes_hint: "Facts and rules for every chat, shared by everyone who uses LLM Agent. Ask the AI to remember something and it proposes a change for you to approve. Don't put passwords here.",
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
	prefs_hint_admin: "Agent settings are under Settings → Devices & services → LLM Agent → Configure.",
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
	tool_update_home_notes: "update home notes",
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
	tool_change_history: "change history"
}, nt = [
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
], rt = {}, it = "en";
function P(e, t) {
	let n = rt[e] ?? N[e];
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}
function at(e) {
	return e in N;
}
function ot(e) {
	if (!e) return "en";
	let t = nt.find((t) => t.toLowerCase() === e.toLowerCase());
	if (t) return t;
	let n = e.split("-")[0].toLowerCase();
	return nt.find((e) => e.split("-")[0].toLowerCase() === n) ?? "en";
}
async function st(e) {
	let t = ot(e);
	if (t === it) return !1;
	if (t === "en") return rt = {}, it = "en", !0;
	try {
		let e = new URL(import.meta.url), n = await fetch(new URL(`i18n/${t}.json${e.search}`, e));
		if (!n.ok) return !1;
		let r = await n.json(), i = {};
		for (let e of Object.keys(N)) typeof r[e] == "string" && (i[e] = r[e]);
		return rt = i, it = t, !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
function ct(e, t) {
	this.v = e, this.k = t;
}
function lt(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function ut(e) {
	if (Array.isArray(e)) return e;
}
function dt(e, t) {
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
function F() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ft(e, t) {
	return ut(e) || dt(e, t) || pt(e, t) || F();
}
function pt(e, t) {
	if (e) {
		if (typeof e == "string") return lt(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? lt(e, t) : void 0;
	}
}
function mt(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof ct;
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
mt.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, mt.prototype.next = function(e) {
	return this._invoke("next", e);
}, mt.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, mt.prototype.return = function(e) {
	return this._invoke("return", e);
};
var ht = Object.entries, gt = Object.setPrototypeOf, _t = Object.isFrozen, vt = Object.getPrototypeOf, yt = Object.getOwnPropertyDescriptor, I = Object.freeze, L = Object.seal, bt = Object.create, xt = typeof Reflect < "u" && Reflect, St = xt.apply, Ct = xt.construct;
I ||= function(e) {
	return e;
}, L ||= function(e) {
	return e;
}, St ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, Ct ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var wt = B(Array.prototype.forEach);
Array.prototype.indexOf;
var Tt = B(Array.prototype.lastIndexOf), Et = B(Array.prototype.pop), Dt = B(Array.prototype.push), Ot = B(Array.prototype.slice), kt = B(Array.prototype.splice), At = Array.isArray, jt = Kt(Set), Mt = B(Set.prototype.add), Nt = B(Set.prototype.has), Pt = B(String.prototype.toLowerCase), Ft = B(String.prototype.toString), It = B(String.prototype.match), Lt = B(String.prototype.replace), Rt = B(String.prototype.indexOf), zt = B(String.prototype.trim), Bt = B(Number.prototype.toString), Vt = B(Boolean.prototype.toString), Ht = typeof BigInt > "u" ? null : B(BigInt.prototype.toString), Ut = typeof Symbol > "u" ? null : B(Symbol.prototype.toString), R = B(Object.prototype.hasOwnProperty), Wt = B(Object.prototype.toString), z = B(RegExp.prototype.test), Gt = Kt(TypeError);
function B(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return St(e, t, n);
	};
}
function Kt(e) {
	return function() {
		return Ct(e, [...arguments]);
	};
}
function V(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Pt;
	if (gt && gt(e, null), !At(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (_t(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function qt(e) {
	for (let t = 0; t < e.length; t++) R(e, t) || (e[t] = null);
	return e;
}
function H(e) {
	let t = bt(null);
	for (let r of ht(e)) {
		var n = ft(r, 2);
		let i = n[0], a = n[1];
		R(e, i) && (t[i] = At(a) ? qt(a) : a && typeof a == "object" && a.constructor === Object ? H(a) : a);
	}
	return t;
}
function Jt(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return Bt(e);
		case "boolean": return Vt(e);
		case "bigint": return Ht ? Ht(e) : "0";
		case "symbol": return Ut ? Ut(e) : "Symbol()";
		case "undefined": return Wt(e);
		case "function":
		case "object": {
			if (e === null) return Wt(e);
			let t = e, n = U(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : Wt(e);
			}
			return Wt(e);
		}
		default: return Wt(e);
	}
}
function U(e, t) {
	for (; e !== null;) {
		let n = yt(e, t);
		if (n) {
			if (n.get) return B(n.get);
			if (typeof n.value == "function") return B(n.value);
		}
		e = vt(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Yt(e, t) {
	for (; e !== null;) {
		let n = yt(e, t);
		if (n) return n.get ? B(n.get) : null;
		e = vt(e);
	}
	return null;
}
function Xt(e) {
	try {
		return z(e, ""), !0;
	} catch {
		return !1;
	}
}
var Zt = I(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), Qt = I(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), $t = I([
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
]), en = I([
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
]), tn = I(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), nn = I([
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
]), rn = I(["#text"]), an = I(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), on = I(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), sn = I(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), cn = I([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), ln = L(/{{[\w\W]*|^[\w\W]*}}/g), un = L(/<%[\w\W]*|^[\w\W]*%>/g), dn = L(/\${[\w\W]*/g), fn = L(/^data-[\-\w.\u00B7-\uFFFF]+$/), pn = L(/^aria-[\-\w]+$/), mn = L(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), hn = L(/^(?:\w+script|data):/i), gn = L(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), _n = L(/^html$/i), vn = L(/^[a-z][.\w]*(-[.\w]+)+$/i), yn = L(/<[/\w!]/g), bn = L(/<[/\w]/g), xn = L(/<\/no(script|embed|frames)/i), Sn = L(/\/>/i), W = {
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
}, Cn = I(V({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
])), wn = function() {
	return typeof window > "u" ? null : window;
}, Tn = function(e, t) {
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
}, En = function() {
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
}, Dn = function(e, t, n, r) {
	return R(e, t) && At(e[t]) ? V(r.base ? H(r.base) : {}, e[t], r.transform) : n;
}, On = function(e, t, n) {
	let r = R(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? H(r) : n();
};
function kn() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wn(), t = (e) => kn(e);
	if (t.version = "3.4.17", t.removed = [], !e || !e.document || e.document.nodeType !== W.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = U(d, "cloneNode"), p = U(d, "remove"), m = U(d, "removeAttributeNode"), h = U(d, "nextSibling"), ee = U(d, "childNodes"), te = U(d, "parentNode"), ne = U(d, "shadowRoot"), re = U(d, "attributes"), g = o && o.prototype ? U(o.prototype, "nodeType") : null, ie = o && o.prototype ? U(o.prototype, "nodeName") : null, ae = o && o.prototype ? U(o.prototype, "ownerDocument") : null, _ = function(e) {
		return g ? g(e) : e.nodeType;
	}, oe = function(e) {
		return ie ? ie(e) : e.nodeName;
	}, se = Yt(d, "namespaceURI"), ce = function(e) {
		return se ? se(e) : e.namespaceURI;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let v, y = "", b, le = !1, ue = 0, de = function() {
		if (ue > 0) throw Gt("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, x = function(e) {
		de(), ue++;
		try {
			return v.createHTML(e);
		} finally {
			ue--;
		}
	}, fe = function(e) {
		de(), ue++;
		try {
			return v.createScriptURL(e);
		} finally {
			ue--;
		}
	}, pe = function() {
		return le ||= (b = Tn(u, i), !0), b;
	}, me = n, he = me.implementation, ge = me.createNodeIterator, _e = me.createDocumentFragment, ve = me.getElementsByTagName, ye = r.importNode, S = En();
	t.isSupported = typeof ht == "function" && typeof te == "function" && he && he.createHTMLDocument !== void 0;
	let be = ln, xe = un, C = dn, Se = fn, w = pn, Ce = hn, we = gn, Te = vn, Ee = mn, T = null, E = V({}, [
		...Zt,
		...Qt,
		...$t,
		...tn,
		...rn
	]), D = null, De = V({}, [
		...an,
		...on,
		...sn,
		...cn
	]), O = Object.seal(bt(null, {
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
	})), Oe = null, ke = null, Ae = Object.seal(bt(null, {
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
	})), je = !0, Me = !0, Ne = !1, Pe = !0, k = !1, A = !0, Fe = !1, Ie = !1, Le = null, Re = null, j = !1, ze = !1, Be = !1, Ve = !1, He = !0, Ue = !1, We = "user-content-", Ge = !0, Ke = !1, qe = null, Je = {}, M = null, Ye = V({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Xe = null, Ze = V({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), Qe = null, $e = V({}, [
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
	]), et = "http://www.w3.org/1998/Math/MathML", tt = "http://www.w3.org/2000/svg", N = "http://www.w3.org/1999/xhtml", nt = N, rt = !1, it = null, P = V({}, [
		et,
		tt,
		N
	], Ft), at = I([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), ot = V({}, at), st = I(["annotation-xml"]), ct = V({}, st), lt = V({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), ut = null, dt = ["application/xhtml+xml", "text/html"], F = null, ft = null, pt = n.createElement("form"), mt = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, gt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (ft && ft === e) return;
		(!e || typeof e != "object") && (e = {}), e = H(e), ut = dt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, F = ut === "application/xhtml+xml" ? Ft : Pt, T = Dn(e, "ALLOWED_TAGS", E, { transform: F }), D = Dn(e, "ALLOWED_ATTR", De, { transform: F }), it = Dn(e, "ALLOWED_NAMESPACES", P, { transform: Ft }), Qe = Dn(e, "ADD_URI_SAFE_ATTR", $e, {
			transform: F,
			base: $e
		}), Xe = Dn(e, "ADD_DATA_URI_TAGS", Ze, {
			transform: F,
			base: Ze
		}), M = Dn(e, "FORBID_CONTENTS", Ye, { transform: F }), Oe = Dn(e, "FORBID_TAGS", H({}), { transform: F }), ke = Dn(e, "FORBID_ATTR", H({}), { transform: F }), Je = R(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? H(e.USE_PROFILES) : e.USE_PROFILES : !1, je = e.ALLOW_ARIA_ATTR !== !1, Me = e.ALLOW_DATA_ATTR !== !1, Ne = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Pe = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, k = e.SAFE_FOR_TEMPLATES || !1, A = e.SAFE_FOR_XML !== !1, Fe = e.WHOLE_DOCUMENT || !1, ze = e.RETURN_DOM || !1, Be = e.RETURN_DOM_FRAGMENT || !1, Ve = e.RETURN_TRUSTED_TYPE || !1, j = e.FORCE_BODY || !1, He = e.SANITIZE_DOM !== !1, Ue = e.SANITIZE_NAMED_PROPS || !1, Ge = e.KEEP_CONTENT !== !1, Ke = e.IN_PLACE || !1, Ee = Xt(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : mn, nt = typeof e.NAMESPACE == "string" ? e.NAMESPACE : N, ot = On(e, "MATHML_TEXT_INTEGRATION_POINTS", () => V({}, at)), ct = On(e, "HTML_INTEGRATION_POINTS", () => V({}, st));
		let t = On(e, "CUSTOM_ELEMENT_HANDLING", () => bt(null));
		if (O = bt(null), R(t, "tagNameCheck") && mt(t.tagNameCheck) && (O.tagNameCheck = t.tagNameCheck), R(t, "attributeNameCheck") && mt(t.attributeNameCheck) && (O.attributeNameCheck = t.attributeNameCheck), R(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (O.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), L(O), k && (Me = !1), Be && (ze = !0), Je && (T = V({}, rn), D = bt(null), Je.html === !0 && (V(T, Zt), V(D, an)), Je.svg === !0 && (V(T, Qt), V(D, on), V(D, cn)), Je.svgFilters === !0 && (V(T, $t), V(D, on), V(D, cn)), Je.mathMl === !0 && (V(T, tn), V(D, sn), V(D, cn))), Ae.tagCheck = null, Ae.attributeCheck = null, R(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? Ae.tagCheck = e.ADD_TAGS : At(e.ADD_TAGS) && (T === E && (T = H(T)), V(T, e.ADD_TAGS, F))), R(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? Ae.attributeCheck = e.ADD_ATTR : At(e.ADD_ATTR) && (D === De && (D = H(D)), V(D, e.ADD_ATTR, F))), R(e, "ADD_FORBID_CONTENTS") && At(e.ADD_FORBID_CONTENTS) && (M === Ye && (M = H(M)), V(M, e.ADD_FORBID_CONTENTS, F)), Ge && (T["#text"] = !0), Fe && V(T, [
			"html",
			"head",
			"body"
		]), T.table && (V(T, ["tbody"]), delete Oe.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw Gt("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw Gt("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = v;
			v = e.TRUSTED_TYPES_POLICY;
			try {
				y = x("");
			} catch (e) {
				throw v = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (v = void 0, y = "") : (v === void 0 && (v = pe()), v && typeof y == "string" && (y = x("")));
		I && I(e), ft = e;
	}, _t = V({}, [
		...Qt,
		...$t,
		...en
	]), vt = V({}, [...tn, ...nn]), yt = function(e, t, n) {
		return t.namespaceURI === N ? e === "svg" : t.namespaceURI === et ? e === "svg" && (n === "annotation-xml" || ot[n]) : !!_t[e];
	}, xt = function(e, t, n) {
		return t.namespaceURI === N ? e === "math" : t.namespaceURI === tt ? e === "math" && ct[n] : !!vt[e];
	}, St = function(e, t, n) {
		return t.namespaceURI === tt && !ct[n] || t.namespaceURI === et && !ot[n] ? !1 : !vt[e] && (lt[e] || !_t[e]);
	}, Ct = function(e) {
		let t = ce(e), n = Pt(oe(e)), r = te(e), i, a;
		return r && _(r) === W.element ? (i = { namespaceURI: ce(r) }, a = Pt(oe(r))) : (i = { namespaceURI: nt }, a = "template"), it[t] ? t === tt ? yt(n, i, a) : t === et ? xt(n, i, a) : t === N ? St(n, i, a) : !!(ut === "application/xhtml+xml" && it[t]) : !1;
	}, Bt = function(e) {
		Dt(t.removed, { element: e });
		try {
			te(e).removeChild(e);
		} catch {
			if (p(e), !te(e)) throw Gt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, Vt = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, Ht = function(e) {
		Kt(e);
		let t = ee(e);
		t && wt(Ot(t), (e) => {
			try {
				p(e);
			} catch {}
		});
		let n = _(e) === W.element ? re(e) : null;
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && Vt(e, r, i);
		}
	}, Ut = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		Dt(t.removed, {
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
			if (ze || Be) try {
				Bt(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, Wt = function(e) {
		let t = re(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || D[F(i)] || Vt(e, r, i);
		}
	}, B = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = [e];
		for (; r.length > 0;) {
			let e = r.pop();
			if (t(e) === !1) continue;
			if (n && _(e) === W.element) {
				let t = ne(e);
				Vn(t) && r.push(t);
			}
			let i = ee(e);
			if (i) for (let e = i.length - 1; e >= 0; --e) r.push(i[e]);
		}
	}, Kt = function(e) {
		B(e, (e) => {
			_(e) === W.element && Wt(e);
		});
	}, qt = function(e) {
		let t = [];
		return B(e, (e) => {
			t.push(e);
		}, !0), t;
	}, An = function(e, t) {
		let n = jt();
		wt(qt(e), (e) => {
			_(e) === W.element && Mt(n, e);
		}), wt(t, (e) => {
			_(e) === W.element && !Nt(n, e) && Wt(e);
		});
	}, jn = function(e, n) {
		let r = !1;
		return wt(t.removed, (t) => {
			t.element && (r ||= t.element === e, Kt(t.element));
		}), An(e, n), r;
	}, Mn = function(e, t) {
		let n = qe, r = null, i = () => (r || (r = jt(), wt(t, (e) => {
			Mt(r, e);
		})), r);
		for (let t = 0;; t++) {
			let r = qt(e), a = [e], o = !1;
			if (wt(r, (e) => {
				_(e) === W.documentFragment ? Dt(a, e) : !o && !Nt(n, e) && (o = Nt(i(), e));
			}), !o) return;
			if (t >= 8) throw Gt("the tree kept changing during in-place sanitization; refusing to return it");
			wt(a, (t, n) => {
				Nn(t, n > 0, e, i());
			});
		}
	}, Nn = function(e, t, n, r) {
		let i = K(e), a;
		for (; a = i.nextNode();) Nt(r, a) && !Nt(qe, a) && (t && q(S.uponSanitizeShadowNode, a, null), Jn(a, n), tr(a, n), Vn(a.content) && nr(a.content));
	}, Pn = function(e) {
		qe && Mt(qe, e);
	}, Fn = function(e, t) {
		return A ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, G = function(e) {
		A && B(e, (e) => {
			let t = _(e);
			if (t === W.processingInstruction || t === W.comment && z(bn, e.data)) {
				try {
					p(e);
				} catch {}
				return !1;
			}
			if (t === W.element) {
				let t = e, n = F(oe(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && Fn("for", n) && t.removeAttribute("for");
				} catch {}
			}
			return !0;
		});
	}, In = function(e) {
		let t = null, r = null;
		if (j) e = "<remove></remove>" + e;
		else {
			let t = It(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		ut === "application/xhtml+xml" && nt === N && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = v ? x(e) : e;
		if (nt === N) try {
			t = new l().parseFromString(i, ut);
		} catch {}
		if (!t || !t.documentElement) {
			t = he.createDocument(nt, "template", null);
			try {
				t.documentElement.innerHTML = rt ? y : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), nt === N ? ve.call(t, Fe ? "html" : "body")[0] : Fe ? t.documentElement : a;
	}, K = function(e) {
		let t = ae ? ae(e) : e.ownerDocument;
		return ge.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Ln = function(e) {
		return e = Lt(e, be, " "), e = Lt(e, xe, " "), e = Lt(e, C, " "), e;
	}, Rn = function(e) {
		zn(e);
		let t = e.querySelectorAll?.call(e, "template");
		t && wt(t, (e) => {
			Vn(e.content) && Rn(e.content);
		});
	}, zn = function(e) {
		e.normalize();
		let t = ae ? ae(e) : e.ownerDocument, n = ge.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = Ln(r.data), r = n.nextNode();
	}, Bn = function(e) {
		let t = ie ? ie(e) : null;
		return typeof t != "string" || F(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== re(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== g(e) || e.childNodes !== ee(e);
	}, Vn = function(e) {
		if (!g || typeof e != "object" || !e) return !1;
		try {
			return g(e) === W.documentFragment;
		} catch {
			return !1;
		}
	}, Hn = function(e) {
		if (!g || typeof e != "object" || !e) return !1;
		try {
			return typeof g(e) == "number";
		} catch {
			return !1;
		}
	};
	function q(e, n, r) {
		e.length !== 0 && wt(e, (e) => {
			e.call(t, n, r, ft);
		});
	}
	let Un = function(e, t) {
		return !!(A && e.hasChildNodes() && !Hn(e.firstElementChild) && z(yn, e.textContent) && z(yn, e.innerHTML) || A && Cn[t] && _(e) === W.element && ce(e) === N && (Hn(e.firstElementChild) || typeof e.textContent == "string" && z(yn, e.textContent)) || e.nodeType === W.processingInstruction || A && e.nodeType === W.comment && z(bn, e.data));
	}, Wn = function(e, t) {
		return e instanceof RegExp ? z(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, Gn = function(e, t, n) {
		if (!Oe[t] && Zn(t) && Wn(O.tagNameCheck, t)) return !1;
		if (Ge && !M[t] && !M[Pt(t)]) {
			let t = te(e), r = ee(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return Bt(e), !0;
	}, Kn = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? H(t) : t;
	}, qn = function(e, t) {
		return e === t || te(e) !== null ? !1 : (Ke && Kt(e), !0);
	}, Jn = function(e, n) {
		if (Pn(e), q(S.beforeSanitizeElements, e, null), qn(e, n)) return !0;
		if (Bn(e)) return Bt(e), !0;
		let r = F(oe(e));
		if (T = Kn(S.uponSanitizeElement, T, E, Le), q(S.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: T
		}), qn(e, n)) return !0;
		if (Un(e, r)) return Bt(e), !0;
		if (Oe[r] || !(Ae.tagCheck instanceof Function && Ae.tagCheck(r)) && !T[r]) {
			let t = Gn(e, r, n);
			return t === !1 && (q(S.afterSanitizeElements, e, null), qn(e, n)) ? !0 : t;
		}
		if (_(e) === W.element && !Ct(e) || (r === "noscript" || r === "noembed" || r === "noframes") && z(xn, e.innerHTML)) return Bt(e), !0;
		if (k && e.nodeType === W.text) {
			let n = Ln(e.textContent);
			e.textContent !== n && (Dt(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return q(S.afterSanitizeElements, e, null), qn(e, n);
	}, Yn = function(e, t, r) {
		if (ke[t] || Fn(t, e) || He && (t === "id" || t === "name") && (r in n || r in pt)) return !1;
		let i = D[t] || Ae.attributeCheck instanceof Function && Ae.attributeCheck(t, e);
		return Me && z(Se, t) || je && z(w, t) ? !0 : i ? Qe[t] || z(Ee, Lt(r, we, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Rt(r, "data:") === 0 && Xe[e] || Ne && !z(Ce, Lt(r, we, "")) ? !0 : !r : Zn(e) && Wn(O.tagNameCheck, e) && Wn(O.attributeNameCheck, t, e) || t === "is" && O.allowCustomizedBuiltInElements && Wn(O.tagNameCheck, r);
	}, Xn = V({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Zn = function(e) {
		return !Xn[Pt(e)] && z(Te, e);
	}, Qn = function(e, t, n, r) {
		if (v && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return x(r);
			case "TrustedScriptURL": return fe(r);
		}
		return r;
	}, $n = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !Bn(e) || (Bt(e), !1);
		} catch {
			return Ut(t, e), !1;
		}
	}, er = function(e, t) {
		return A && z(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, t) ? !0 : Pt(e) === "attributename" && It(t, "href") !== null;
	}, tr = function(e, n) {
		if (q(S.beforeSanitizeAttributes, e, null), qn(e, n)) return;
		let r = e.attributes;
		if (!r || Bn(e)) return;
		D = Kn(S.uponSanitizeAttribute, D, De, Re);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: D,
			forceKeepAttr: void 0
		}, a = r.length, o = F(e.nodeName);
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = F(s), d = l, f = s === "value" ? d : zt(d), p = !1;
			i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, q(S.uponSanitizeAttribute, e, i), f = i.attrValue, Ue && (u === "id" || u === "name") && Rt(f, We) !== 0 && (Ut(s, e, n), f = We + f, p = !0), er(s, f) ? Ut(s, e, n) : i.forceKeepAttr || (i.keepAttr ? !Pe && z(Sn, f) ? Ut(s, e, n) : (k && (f = Ln(f)), Yn(o, u, f) ? (f = Qn(o, u, c, f), f !== d && $n(e, s, c, f) && p && Et(t.removed)) : Ut(s, e, n)) : Ut(s, e, n));
		}
		q(S.afterSanitizeAttributes, e, null), qn(e, n);
	}, nr = function(e) {
		let t = null, n = K(e);
		for (q(S.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (q(S.uponSanitizeShadowNode, t, null), Jn(t, e), tr(t, e), Vn(t.content) && nr(t.content), _(t) === W.element) {
			let e = ne(t);
			Vn(e) && (rr(e), nr(e));
		}
		k && zn(e), q(S.afterSanitizeShadowDOM, e, null);
	}, rr = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				nr(e.shadow);
				continue;
			}
			let n = e.node, r = _(n) === W.element, i = ee(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = ie ? ie(n) : null;
				if (typeof e == "string" && F(e) === "template") {
					let e = n.content;
					Vn(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = ne(n);
				Vn(e) && t.push({
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
		if (rt = !e, rt && (e = "<!-->"), typeof e != "string" && !Hn(e) && (e = Jt(e), typeof e != "string")) throw Gt("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Ie ? (T = Le, D = Re) : gt(n), (S.uponSanitizeElement.length > 0 || S.uponSanitizeAttribute.length > 0) && (T = H(T)), S.uponSanitizeAttribute.length > 0 && (D = H(D)), t.removed = [];
		let c = Ke && typeof e != "string" && Hn(e), l = [], u = qe;
		if (c) {
			G(e);
			let t = oe(e);
			if (typeof t == "string") {
				let n = F(t);
				if (!T[n] || Oe[n]) throw Ht(e), Gt("root node is forbidden and cannot be sanitized in-place");
			}
			if (Bn(e)) throw Ht(e), Gt("root node is clobbered and cannot be sanitized in-place");
			l = qt(e), qe = jt();
		} else if (Hn(e)) i = In("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === W.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), rr(i);
		else {
			if (!ze && !k && !Fe && e.indexOf("<") === -1) return v && Ve ? x(e) : e;
			if (i = In(e), !i) return ze ? null : Ve ? y : "";
		}
		i && j && Bt(i.firstChild);
		let d = c ? e : i;
		try {
			c && rr(e);
			let t = K(d);
			for (; o = t.nextNode();) Jn(o, d), tr(o, d), Vn(o.content) && nr(o.content);
			c && Mn(e, l);
		} catch (t) {
			throw c && (Ht(e), jn(e, l)), t;
		} finally {
			qe = u;
		}
		if (c) {
			if (jn(e, l)) throw Gt("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return k && Rn(e), e;
		}
		if (ze) {
			if (k && Rn(i), Be) for (s = _e.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (D.shadowroot || D.shadowrootmode) && (s = ye.call(r, s, !0)), s;
		}
		let f = Fe ? i.outerHTML : i.innerHTML;
		return Fe && T["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && z(_n, i.ownerDocument.doctype.name) && (f = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + f), k && (f = Ln(f)), v && Ve ? x(f) : f;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		gt(e), Ie = !0, Le = T, Re = D;
	}, t.clearConfig = function() {
		ft = null, Ie = !1, Le = null, Re = null, v = b, y = "";
	}, t.isValidAttribute = function(e, t, n) {
		ft || gt({});
		let r = F(e), i = F(t);
		return typeof n == "string" && (er(t, n) || !Pe && z(Sn, n)) ? !1 : Yn(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && R(S, e) && Dt(S[e], t);
	}, t.removeHook = function(e, t) {
		if (R(S, e)) {
			if (t !== void 0) {
				let n = Tt(S[e], t);
				return n === -1 ? void 0 : kt(S[e], n, 1)[0];
			}
			return Et(S[e]);
		}
	}, t.removeHooks = function(e) {
		R(S, e) && (S[e] = []);
	}, t.removeAllHooks = function() {
		S = En();
	}, t;
}
var An = kn();
//#endregion
//#region node_modules/marked/lib/marked.esm.js
function jn() {
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
var Mn = jn();
function Nn(e) {
	Mn = e;
}
var Pn = { exec: () => null };
function Fn(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function G(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(K.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var In = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), K = {
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
	nextBulletRegex: Fn((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: Fn((e) => RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: Fn((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: Fn((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: Fn((e) => RegExp(`^ {0,${e}}(?:</?(?:${Xn})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")),
	blockquoteBeginRegex: Fn((e) => RegExp(`^ {0,${e}}>`))
}, Ln = /^(?:[ \t]*(?:\n|$))+/, Rn = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, zn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Bn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Vn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Hn = / {0,3}(?:[*+-]|\d{1,9}[.)])/, q = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Un = G(q).replace(/bull/g, Hn).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Wn = G(q).replace(/bull/g, Hn).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Gn = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, Kn = /^[^\n]+/, qn = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Jn = G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", qn).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Yn = G(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Hn).getRegex(), Xn = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Zn = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Qn = G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Zn).replace("tag", Xn).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), $n = (e) => G(Gn).replace("hr", Bn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Xn).getRegex(), er = $n(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), tr = $n(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), nr = {
	blockquote: G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", tr).getRegex(),
	code: Rn,
	def: Jn,
	fences: zn,
	heading: Vn,
	hr: Bn,
	html: Qn,
	lheading: Un,
	list: Yn,
	newline: Ln,
	paragraph: er,
	table: Pn,
	text: Kn
}, rr = G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Bn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Xn).getRegex(), ir = {
	...nr,
	lheading: Wn,
	table: rr,
	paragraph: G(Gn).replace("hr", Bn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", rr).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Xn).getRegex()
}, ar = {
	...nr,
	html: G("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", Zn).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: Pn,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: G(Gn).replace("hr", Bn).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Un).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, or = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, sr = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, cr = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, lr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ur = /[\p{P}\p{S}]/u, dr = /[\s\p{P}\p{S}]/u, fr = /[^\s\p{P}\p{S}]/u, pr = G(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, dr).getRegex(), mr = /[\p{Pi}\p{Ps}"']/u, hr = /(?!~)[\p{P}\p{S}]/u, gr = /(?!~)[\s\p{P}\p{S}]/u, _r = /(?:[^\s\p{P}\p{S}]|~)/u, vr = G(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", In ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), yr = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, br = G(yr, "u").replace(/punct/g, ur).getRegex(), xr = G(yr, "u").replace(/punct/g, hr).getRegex(), Sr = G(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, mr).replace(/punct/g, ur).getRegex(), Cr = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", wr = G(Cr, "gu").replace(/notPunctSpace/g, fr).replace(/punctSpace/g, dr).replace(/punct/g, ur).getRegex(), Tr = G(Cr, "gu").replace(/notPunctSpace/g, _r).replace(/punctSpace/g, gr).replace(/punct/g, hr).getRegex(), Er = G("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, fr).replace(/punctSpace/g, dr).replace(/punct/g, ur).getRegex(), Dr = G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, fr).replace(/punctSpace/g, dr).replace(/punct/g, ur).getRegex(), Or = G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, fr).replace(/punctSpace/g, dr).replace(/punct/g, ur).getRegex(), kr = G(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, ur).getRegex(), Ar = G("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, fr).replace(/punctSpace/g, dr).replace(/punct/g, ur).getRegex(), jr = G(/\\(punct)/, "gu").replace(/punct/g, ur).getRegex(), Mr = G(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, ur).getRegex(), Nr = G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Pr = G(Zn).replace("(?:-->|$)", "-->").getRegex(), Fr = G("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Pr).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ir = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, Lr = G(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Ir).getRegex(), Rr = G(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", Lr).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), zr = G(/^!?\[(label)\]\[(ref)\]/).replace("label", Lr).replace("ref", qn).getRegex(), Br = G(/^!?\[(ref)\](?:\[\])?/).replace("ref", qn).getRegex(), Vr = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, Hr = G(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Ir).getRegex(), Ur = G("reflink|nolink(?!\\()", "g").replace("reflink", G(/^!?\[(label)\]\[(ref)\]/).replace("label", Hr).replace("ref", Vr).getRegex()).replace("nolink", G(/^!?\[(ref)\](?:\[\])?/).replace("ref", Vr).getRegex()).getRegex(), Wr = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Gr = G(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), Kr = {
	_backpedal: Pn,
	anyPunctuation: jr,
	anyPunctuationOutsideCode: Mr,
	autolink: Nr,
	blockSkip: vr,
	br: cr,
	code: sr,
	del: Pn,
	delLDelim: Pn,
	delRDelim: Pn,
	emStrongLDelim: br,
	emStrongRDelimAst: wr,
	emStrongRDelimUnd: Dr,
	escape: or,
	link: Rr,
	nolink: Br,
	punctuation: pr,
	reflink: zr,
	reflinkSearch: Ur,
	tag: Fr,
	text: lr,
	url: Pn
}, qr = {
	...Kr,
	emStrongLDelim: Sr,
	emStrongRDelimAst: Er,
	emStrongRDelimUnd: Or,
	link: G(/^!?\[(label)\]\((.*?)\)/).replace("label", Lr).getRegex(),
	reflink: G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Lr).getRegex()
}, Jr = {
	...Kr,
	emStrongRDelimAst: Tr,
	emStrongLDelim: xr,
	delLDelim: kr,
	delRDelim: Ar,
	url: G(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", Gr).replace("protocol", Wr).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: G(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", Wr).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex()
}, Yr = {
	...Jr,
	br: G(cr).replace("{2,}", "*").getRegex(),
	text: G(Jr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Xr = {
	normal: nr,
	gfm: ir,
	pedantic: ar
}, Zr = {
	normal: Kr,
	gfm: Jr,
	breaks: Yr,
	pedantic: qr
}, Qr = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, $r = (e) => Qr[e];
function J(e, t) {
	if (t) {
		if (K.escapeTest.test(e)) return e.replace(K.escapeReplace, $r);
	} else if (K.escapeTestNoEncode.test(e)) return e.replace(K.escapeReplaceNoEncode, $r);
	return e;
}
function ei(e) {
	return K.numericCharacterReference.test(e) ? e.replace(K.numericCharacterReferenceOrAmpersand, (e, t, n) => {
		if (t === void 0 && n === void 0) return "&amp;";
		let r = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return r === 0 || r > 1114111 || r >= 55296 && r <= 57343 ? "�" : r === 38 ? "&amp;" : String.fromCodePoint(r);
	}) : e;
}
function ti(e) {
	try {
		e = encodeURI(e).replace(K.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function ni(e, t) {
	let n = e.replace(K.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(K.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(K.slashPipe, "|");
	return n;
}
function ri(e, t, n) {
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
function ii(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && K.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function ai(e) {
	return e.trim().toLowerCase().toUpperCase().toLowerCase();
}
function oi(e, t) {
	if (e.indexOf(t[0]) === -1 && e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function si(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function ci(e, t, n, r, i) {
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
function li(e, t, n) {
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
function ui(e, t, n, r) {
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
var di = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || Mn;
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
			let e = this.options.pedantic ? t[0] : ii(t[0]);
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
			let e = t[0], n = li(e, t[3] || "", this.rules);
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
				let t = ri(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceTabChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: ri(t[0], "\n"),
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
			raw: ri(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = ri(t[0], "\n").split("\n"), n = "", r = "", i = [];
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
				let u = t[2].split("\n", 1)[0], d = t[1].length, f = this.options.pedantic ? si(u, d) : u.replace(this.rules.other.leadingSpaceTab, (e) => si(e, d)), p = e.split("\n", 1)[0], m = !f.trim(), h = 0;
				if (this.options.pedantic ? (h = 2, a = f.trimStart()) : m ? h = d + 1 : (h = f.search(this.rules.other.nonSpaceChar), h = h > 4 ? 1 : h, a = f.slice(h), h += d), m && this.rules.other.blankLine.test(p) && (e = e.substring(p.length + 1), i = !0), !i) {
					let t = this.rules.other.nextBulletRegex(h), n = this.rules.other.hrRegex(h), r = this.rules.other.fencesBeginRegex(h), i = this.rules.other.headingBeginRegex(h), o = this.rules.other.htmlBeginRegex(h), s = this.rules.other.blockquoteBeginRegex(h);
					for (; e;) {
						let c = e.split("\n", 1)[0], l;
						if (p = c, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), l = p) : l = p.replace(this.rules.other.leadingSpaceTab, (e) => si(e)), r.test(p) || i.test(p) || o.test(p) || s.test(p) || t.test(p) || n.test(p)) break;
						if (l.search(this.rules.other.nonSpaceChar) >= h || !p.trim()) a += "\n" + l.slice(h);
						else {
							if (m || f.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || r.test(f) || i.test(f) || n.test(f)) break;
							a += "\n" + p;
						}
						m = !p.trim(), e = e.substring(c.length + 1), f = l.slice(h);
					}
				}
				let ee = n.slice(l, r());
				o.loose || (c ? o.loose = !0 : this.rules.other.doubleBlankLine.test(ee) && (c = !0)), o.items.push({
					type: "list_item",
					raw: ee,
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
			let e = ii(t[0]);
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
			if (!this.rules.other.startAngleBracket.test(t[2]) && oi(t[2], "()") !== -1) return;
			let e = ai(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: ri(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = ni(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: ri(t[0], "\n"),
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
			for (let e of i) a.rows.push(ni(e, a.header.length).map((e, t) => ({
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
				raw: ri(t[0], "\n"),
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
			if (!this.options.pedantic && ui(e, t[1], n, this.rules)) return;
			let r = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
				if (!this.rules.other.endAngleBracket.test(r)) return;
				let e = ri(r.slice(0, -1), "\\");
				if ((r.length - e.length) % 2 == 0) return;
			} else {
				let e = oi(t[2], "()");
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
			return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (i = this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? i.slice(1) : i.slice(1, -1)), ci(t, {
				href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
				title: a && a.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let r = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && ui(e, n[1], r, this.rules)) return;
			let i = t[ai((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
			if (!i) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return ci(n, i, n[0], this.lexer, this.rules);
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
				text: e ? t[0] : ei(t[0]),
				escaped: e
			};
		}
	}
}, Y = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || Mn, this.options.tokenizer = this.options.tokenizer || new di(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			linkParenPossible: !0,
			top: !0
		};
		let t = {
			other: K,
			block: Xr.normal,
			inline: Zr.normal
		};
		this.options.pedantic ? (t.block = Xr.pedantic, t.inline = Zr.pedantic) : this.options.gfm && (t.block = Xr.gfm, t.inline = this.options.breaks ? Zr.breaks : Zr.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: Xr,
			inline: Zr
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(K.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(K.tabCharGlobal, "    ").replace(K.spaceLine, ""));
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
			if (e.charAt(0) !== "!" && Object.hasOwn(this.tokens.links, ai(e.slice(n + 1, -1))) && !(n > 1 && this.linkInText(e.slice(1, n - 1)))) return !0;
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
				if (!Object.hasOwn(this.tokens.links, ai(n.slice(r + 1, -1)))) return n;
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
}, fi = class {
	options;
	parser;
	constructor(e) {
		this.options = e || Mn;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(K.notSpaceStart)?.[0], i = e ? e.replace(K.endingNewline, "") + "\n" : "";
		return r ? "<pre><code class=\"language-" + J(r) + "\">" + (n ? i : J(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : J(i, !0)) + "</code></pre>\n";
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
		return `<code>${J(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: r, autolink: i }) {
		let a = i ? J(n, !0) : this.parser.parseInline(r), o = ti(e);
		if (o === null) return a;
		e = J(o, i);
		let s = "<a href=\"" + e + "\"";
		return t && (s += " title=\"" + J(t) + "\""), s += ">" + a + "</a>", s;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = ti(e);
		if (i === null) return J(n);
		e = i;
		let a = `<img src="${J(e)}" alt="${J(n)}"`;
		return t && (a += ` title="${J(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : J(e.text);
	}
}, pi = class {
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
}, X = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || Mn, this.options.renderer = this.options.renderer || new fi(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new pi();
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
}, mi = class {
	options;
	block;
	constructor(e) {
		this.options = e || Mn;
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
		return e ? Y.lex : Y.lexInline;
	}
	provideParser(e = this.block) {
		return e ? X.parse : X.parseInline;
	}
};
function hi(e, t) {
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e.push(t[n]);
	else e.push(t);
}
var gi = class {
	defaults = jn();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = X;
	Renderer = fi;
	TextRenderer = pi;
	Lexer = Y;
	Tokenizer = di;
	Hooks = mi;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (hi(n, t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) hi(n, this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) hi(n, this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				hi(n, this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					hi(n, this.walkTokens(i, t));
				}) : e.tokens && hi(n, this.walkTokens(e.tokens, t));
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
				let t = this.defaults.renderer || new fi(this.defaults);
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
				let t = this.defaults.tokenizer || new di(this.defaults);
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
				let t = this.defaults.hooks || new mi();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = mi.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && mi.passThroughHooksRespectAsync.has(n)) return (async () => {
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
					return n.push(r.call(this, e)), t && hi(n, t.call(this, e)), n;
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
		return Y.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return X.parse(e, t ?? this.defaults);
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
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? Y.lex : Y.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? X.parse : X.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? Y.lex : Y.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? X.parse : X.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + J(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}, _i = new gi();
function Z(e, t) {
	return _i.parse(e, t);
}
Z.options = Z.setOptions = function(e) {
	return _i.setOptions(e), Z.defaults = _i.defaults, Nn(Z.defaults), Z;
}, Z.getDefaults = jn, Z.defaults = Mn;
function vi(...e) {
	return _i.use(...e), Z.defaults = _i.defaults, Nn(Z.defaults), Z;
}
Z.use = vi, Z.walkTokens = function(e, t) {
	return _i.walkTokens(e, t);
}, Z.parseInline = _i.parseInline, Z.Parser = X, Z.parser = X.parse, Z.Renderer = fi, Z.TextRenderer = pi, Z.Lexer = Y, Z.lexer = Y.lex, Z.Tokenizer = di, Z.Hooks = mi, Z.parse = Z, Z.options, Z.setOptions, Z.walkTokens, Z.parseInline, X.parse, Y.lex;
//#endregion
//#region src/markdown.ts
var yi = new gi({
	gfm: !0,
	breaks: !0,
	async: !1
});
An.addHook("afterSanitizeAttributes", (e) => {
	e.tagName === "A" && (e.setAttribute("target", "_blank"), e.setAttribute("rel", "noopener noreferrer"));
});
var bi = /* @__PURE__ */ new Map();
function xi(e, t = !0) {
	if (t) {
		let t = bi.get(e);
		if (t !== void 0) return t;
	}
	let n = An.sanitize(yi.parse(e), {
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
	return t && (bi.size > 300 && bi.clear(), bi.set(e, n)), n;
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorate.js
function Q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/preview.ts
var Si = /* @__PURE__ */ new Set([
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
]), Ci = /* @__PURE__ */ new Set([
	"horizontal-stack",
	"vertical-stack",
	"grid"
]), wi = /* @__PURE__ */ new Set(["section", "divider"]), Ti = /\\|\/\/|url\s*\(|\{\{|\{%|\[\[\[|<|custom:|javascript:|data:/i, Ei = /* @__PURE__ */ new Set([
	"card_mod",
	"style",
	"image",
	"image_entity",
	"camera_image"
]);
function Di(e, t = 0) {
	return t > 20 ? !1 : typeof e == "string" ? !Ti.test(e) : Array.isArray(e) ? e.every((e) => Di(e, t + 1)) : e && typeof e == "object" ? Object.entries(e).every(([e, n]) => !Ei.has(e) && !Ti.test(e) && Di(n, t + 1)) : !0;
}
function Oi(e) {
	let t = [...e.cards ?? []];
	for (let n of e.sections ?? []) t.push(...n.cards ?? []);
	return t.filter((e) => e && typeof e == "object");
}
async function ki() {
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
function Ai(e, t = 0) {
	if (!e || typeof e != "object" || t > 5) return !1;
	let n = e.type;
	if (typeof n != "string") return !1;
	if (Ci.has(n)) {
		let { cards: n, ...r } = e;
		return Array.isArray(n) && n.every((e) => Ai(e, t + 1)) && Di(r);
	}
	if (!Si.has(n)) return !1;
	let r = e.entities;
	return Array.isArray(r) && !r.every((e) => typeof e == "string" || e && typeof e == "object" && (!("type" in e) || wi.has(String(e.type)))) ? !1 : Di(e);
}
var ji = class extends A {
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
				let t = await ki();
				if (!t) throw Error("card helpers aren't available");
				for (let n of Oi(e).slice(0, 40)) {
					if (!Ai(n)) {
						this.skipped++;
						continue;
					}
					let e = t.createCardElement(n);
					e.hass = this.hass, this.cards.push(e);
				}
				this.error = "";
			} catch (e) {
				this.error = P("preview_unavailable", { error: e.message });
			}
			this.requestUpdate();
		}
	}
	render() {
		return this.views.length ? C`
      ${this.views.length > 1 ? C`<div class="tabs">
              ${this.views.map((e, t) => C`<button
                    class=${t === this.view ? "on" : ""}
                    @click=${() => this.view = t}
                  >
                    ${e.title || e.path || P("preview_view", { n: t + 1 })}
                  </button>`)}
            </div>` : w}
      ${this.error ? C`<p class="note">${this.error}</p>` : w}
      <div class="grid" inert>${this.cards}</div>
      ${this.skipped ? C`<p class="note">
              ${this.skipped > 1 ? P("preview_skipped_n", { count: this.skipped }) : P("preview_skipped_one")}
            </p>` : w}
    ` : C`<p class="note">${P("preview_no_views")}</p>`;
	}
	static {
		this.styles = o`
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
Q([Re({ attribute: !1 })], ji.prototype, "hass", void 0), Q([Re({ attribute: !1 })], ji.prototype, "config", void 0), Q([j()], ji.prototype, "view", void 0), Q([j()], ji.prototype, "error", void 0), customElements.get("llm-dashboard-preview") || customElements.define("llm-dashboard-preview", ji);
//#endregion
//#region src/styles.ts
var Mi = o`
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
  /* the Changes view takes the place of the chat; the chat keeps its state underneath */
  main.changes > :not(header):not(llm-agent-changes) {
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
  .prefs.notes {
    width: min(420px, calc(100vw - 24px));
  }
  .prefs.notes textarea {
    flex: none;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    font: inherit;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 8px 10px;
    background: var(--bg);
  }
  .prefs .over {
    color: var(--error-color, #db4437);
    font-size: 12px;
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
    white-space: pre-wrap;
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
  .row.user:hover .msg-actions,
  .msg-actions:focus-within {
    opacity: 1;
  }
  @media (hover: none) {
    .msg-actions {
      opacity: 1;
    }
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
    min-height: calc(1.5em + 10px);
    max-height: 40vh;
    max-height: 40dvh;
    overflow-y: auto;
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
`, Ni = {
	asked: "changes_asked",
	auto: "changes_auto",
	rule: "changes_rule",
	reviewer: "reviewer_approved",
	denied: "denied"
}, Pi = (e) => e.message ?? String(e), Fi = class extends A {
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
		this.styles = [Mi, o`:host{flex:1;min-height:0;height:auto;overflow-y:auto;background:none}
.bar{display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px}
.bar>*{font:inherit;font-size:13px;color:var(--text);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:5px 8px}
.bar>[type=search]{flex:1;min-width:140px}
.row,.bar,.more{border-bottom:1px solid var(--line)}
.row{padding:10px 20px}
.line{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:3px 0;font-size:13px;color:var(--muted)}
b{color:var(--text);font-weight:500}
code{font:12px var(--mono);overflow-wrap:anywhere}
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
				since: n.from ? Ii(n.from, 0, this.zone) : null,
				until: n.to ? Ii(n.to, 1, this.zone) - .001 : null,
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
			a = { error: Pi(e) };
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
		if (confirm(P("confirm_undo", { name: e.detail || e.tool }))) {
			try {
				await this.hass.connection.sendMessagePromise({
					type: "llm_agent/undo",
					snapshot_id: e.snapshot_id,
					...e.conversation_id ? { conversation_id: e.conversation_id } : {}
				});
			} catch (e) {
				this.s = {
					...this.s,
					error: Pi(e)
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
		let { s: e } = this, t = (e, t) => C`<option value=${e}>${t}</option>`;
		return C`<div class="bar">
<input type="date" aria-label=${P("changes_from")} title=${P("changes_from")} @change=${this.set("from")}>
<input type="date" aria-label=${P("changes_to")} title=${P("changes_to")} @change=${this.set("to")}>
<select aria-label=${P("conversation")} @change=${this.set("chat")}>${t("", P("changes_all_chats"))}${e.chats?.map((e) => t(e.id, e.title || P("new_chat")))}</select>
<select aria-label=${P("changes_user")} @change=${this.set("user")}>${t("", P("changes_everyone"))}${e.users?.map((e) => t(e.id, e.name))}</select>
<input type="search" placeholder=${P("changes_search")} aria-label=${P("changes_search")} @input=${this.set("text")}>
</div>${e.error ? C`<div class="empty">${P("changes_error", { error: e.error })}</div>` : !e.loading && !e.changes.length ? C`<div class="empty">${P("changes_none")}</div>` : w}${e.changes.map((e) => this.row(e))}${e.cursor ? C`<div class="more"><button class="small" ?disabled=${e.loading} @click=${() => this.load(!0)}>${P("changes_more")}</button></div>` : w}`;
	}
	row(e) {
		let t = `tool_${e.tool}`, n = (e, t = !1, n = "") => C`<span class="tag ${t ? "bad" : ""}" title=${n}>${e}</span>`;
		return C`<div class="row"><div class="line">${this.fmt(e.time)}${e.conversation_id ? C`<button class="link" @click=${() => this.dispatchEvent(new CustomEvent("open-chat", { detail: e.conversation_id }))}>${e.chat_title ?? P("changes_deleted_chat")}</button>` : w}<span>${e.user_name ?? (e.user_id ? e.user_id.slice(0, 8) : P("changes_no_user"))}</span></div>
<div class="line"><b class="what">${at(t) ? P(t) : e.tool.replace(/_/g, " ")}</b><code>${e.args}</code></div>
<div class="line">${e.approval ? n(P(Ni[e.approval]), e.approval === "denied") : w}${e.approval === "denied" ? w : n(e.ok ? P("done") : P("failed"), !e.ok)}<span>${e.detail}</span>${e.undo === "undone" ? n(P("undone")) : w}${e.undo === "gone" ? n(P("changes_undo_gone"), !1, P("changes_undo_gone_title")) : w}${e.undo === "available" ? C`<button class="ghost small" title=${P("undo_title")} @click=${() => this.undo(e)}>${P("undo")}</button>` : w}</div></div>`;
	}
};
Q([Re({ attribute: !1 })], Fi.prototype, "hass", void 0), Q([j()], Fi.prototype, "s", void 0);
function Ii(e, t, n) {
	let [r, i, a] = e.split("-").map(Number);
	if (!n) return new Date(r, i - 1, a + t).getTime() / 1e3;
	let o = Date.UTC(r, i - 1, a + t);
	return (o - Li(o - Li(o, n), n)) / 1e3;
}
function Li(e, t) {
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
customElements.define("llm-agent-changes", Fi);
//#endregion
//#region src/panel.ts
var Ri = /* @__PURE__ */ new Set([
	"config",
	"content",
	"old",
	"new",
	"notes"
]), zi = {
	input: 0,
	output: 0,
	cache_read: 0,
	cache_write: 0,
	cost: 0
}, $ = class extends A {
	constructor(...e) {
		super(...e), this.narrow = !1, this.convs = [], this.query = "", this.previews = /* @__PURE__ */ new Set(), this.hits = null, this.convId = null, this.chatTitle = "New chat", this.items = [], this.usage = zi, this.running = !1, this.announce = "", this.editing = !1, this.photos = [], this.files = [], this.dragging = !1, this.photoGen = 0, this.providerId = "", this.model = "", this.fetched = {}, this.showList = !1, this.loadError = "", this.mentions = [], this.prefs = Gi(), this.showPrefs = !1, this.showNotes = !1, this.showChanges = !1, this.notesDraft = "", this.notesBase = "", this.notesStatus = "", this.mentionIndex = 0, this.mentionStart = -1, this.gen = 0, this.started = !1, this.stickToBottom = !0, this.onReady = () => {
			this.running && this.convId && this.open(this.convId).catch(() => void 0);
		}, this.modelError = "", this.loadingModels = /* @__PURE__ */ new Set(), this.noteCardSince = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = Mi;
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
		}, Ki(this.prefs), this.applyPrefs();
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
	updated(e) {
		if (e.has("hass") && this.hass && !this.started) this.started = !0, this.init();
		else if (e.has("hass") && this.hass) {
			let t = e.get("hass")?.locale?.language, n = this.hass.locale?.language;
			t !== n && st(n).then((e) => {
				e && this.requestUpdate();
			});
		}
		this.stickToBottom && this.scroller && (this.scroller.scrollTop = this.scroller.scrollHeight), this.addCopyButtons();
	}
	addCopyButtons() {
		if (this.scroller) for (let e of this.scroller.querySelectorAll(".md pre:not([data-copy])")) {
			e.dataset.copy = "1";
			let t = document.createElement("button");
			t.className = "copy small ghost", t.textContent = P("copy"), t.addEventListener("click", async () => {
				let n = e.querySelector("code") ?? e;
				try {
					await navigator.clipboard.writeText(n.textContent ?? ""), t.textContent = P("copied");
				} catch {
					t.textContent = P("copy_failed");
				}
				setTimeout(() => t.textContent = P("copy"), 1500);
			}), e.prepend(t);
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.listening?.removeEventListener?.("ready", this.onReady), this.listening = void 0, this.detach(), this.started = !1;
	}
	async init() {
		this.listening = this.ws, this.ws.addEventListener?.("ready", this.onReady), await st(this.hass?.locale?.language) && this.requestUpdate();
		try {
			this.info = await this.ws.sendMessagePromise({ type: "llm_agent/info" }), this.loadError = "";
		} catch (e) {
			this.loadError = e.message ?? String(e);
			return;
		}
		this.applyPrefs(), this.providerId || this.startModel(), await this.refreshList();
		let e = this.convId ?? Hi();
		if (e && this.convs.some((t) => t.id === e)) try {
			await this.open(e);
		} catch {
			Ui(null);
		}
	}
	async refreshList() {
		this.convs = await this.ws.sendMessagePromise({ type: "llm_agent/conversations/list" });
	}
	get member() {
		return this.info?.is_admin === !1;
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
		this.showChanges = !1, this.editing = !1, this.clearAttachments(), this.detach(), this.convId = null, Ui(null), this.chatTitle = "New chat", this.items = [], this.usage = zi, this.running = !1, this.showList = !1, this.startModel(), this.input?.focus();
	}
	async open(e, t = !1) {
		this.showChanges = !1;
		let n = await this.detach();
		if (n !== this.gen) return;
		this.showList = !1, this.editing = !1, this.clearAttachments();
		let r = await this.ws.sendMessagePromise({
			type: "llm_agent/conversations/get",
			conversation_id: e
		});
		if (n !== this.gen) return;
		this.convId = r.id, Ui(r.id), this.chatTitle = r.title, this.usage = r.usage, this.providerId = r.provider_id, this.model = r.model, this.items = ea(r.messages), r.stopped && r.stopped_text && this.items.push({
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
		let n = Object.fromEntries(Object.entries(e ?? {}).filter(([e]) => !(t && Ri.has(e))));
		return Object.keys(n).length ? C`<pre class="args">${JSON.stringify(n, null, 2)}</pre>` : w;
	}
	async removeConv(e, t) {
		t.stopPropagation(), confirm(P("confirm_delete")) && (await this.ws.sendMessagePromise({
			type: "llm_agent/conversations/delete",
			conversation_id: e
		}), e === this.convId && this.newChat(), await this.refreshList());
	}
	lastUserIndex() {
		for (let e = this.items.length - 1; e >= 0; e--) if (this.items[e].kind === "user") return e;
		return -1;
	}
	async send(e, t = !1) {
		let n = e !== void 0 || this.editing, r = this.lastUserIndex(), i = this.items[r], a = e === void 0 ? this.photos : i?.kind === "user" && i.images || [], o = e === void 0 ? this.files : i?.kind === "user" && i.files || [], s = e ?? this.input?.value.trim();
		if (!s && o.length && (s = `(${o.map((e) => e.name).join(", ")})`), !s && a.length && (s = "(photo)"), !s || this.running) return;
		if (e !== void 0 && i?.kind === "user" && (i.photos && !i.images || i.files?.some((e) => !e.data))) {
			this.editLast(i.text, void 0, i.photos, i.files);
			return;
		}
		let c = {
			items: this.items,
			draft: this.input?.value ?? "",
			photos: this.photos,
			files: this.files,
			editing: this.editing
		};
		e === void 0 && (this.input.value = "", this.clearAttachments(), this.autosize()), this.editing = !1;
		let l = n && r >= 0 ? this.items.slice(0, r) : this.items;
		this.items = [
			...l,
			{
				kind: "user",
				text: s,
				images: a.length ? a : void 0,
				files: o.length ? o : void 0
			},
			{
				kind: "assistant",
				text: ""
			}
		], this.running = !0, this.announce = "", this.stickToBottom = !0;
		let u = this.gen;
		try {
			let e = await this.ws.subscribeMessage((e) => {
				u === this.gen && (e.type === "conversation" ? this.convId || (this.convId = e.conversation_id, this.chatTitle = e.title || s.slice(0, 60), Ui(this.convId)) : this.onEvent(e));
			}, {
				type: "llm_agent/chat",
				text: s,
				conversation_id: this.convId,
				provider_id: this.providerId || void 0,
				model: this.model || void 0,
				rewind: n || void 0,
				over_cap: t || void 0,
				language: this.hass?.locale?.language || void 0,
				images: a.length ? a.map(({ media_type: e, data: t }) => ({
					media_type: e,
					data: t
				})) : void 0,
				files: o.length ? o.map(({ name: e, data: t }) => ({
					name: e,
					data: t
				})) : void 0
			}, { resubscribe: !1 });
			this.keepOrDrop(u, e);
		} catch (t) {
			if (u !== this.gen) return;
			this.running = !1, this.items = c.items, this.editing = c.editing, e === void 0 && this.input && (this.input.value = c.draft, this.photos = c.photos, this.files = c.files, this.autosize()), this.push({
				kind: "notice",
				text: pa(t),
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
				}), this.announce = e.phone_only ? P("announce_phone") : P("announce_approval");
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
				}), this.announce = P("announce_error");
				return;
			case "done":
				this.usage = e.usage, this.running = !1, this.announce = P("announce_done"), this.items = this.items.filter((e) => !(e.kind === "assistant" && !e.text)), this.detach(), this.refreshList().then(() => {
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
				text: pa(t),
				error: !0
			});
		}
	}
	async undo(e) {
		if (e.snapshotId && confirm(P("confirm_undo", { name: e.summary || e.name }))) try {
			let t = await this.ws.sendMessagePromise({
				type: "llm_agent/undo",
				snapshot_id: e.snapshotId,
				...this.convId ? { conversation_id: this.convId } : {}
			});
			this.patchTool(e.id, { undone: !0 }), this.push({
				kind: "notice",
				text: P("undone_notice", { summary: t.summary })
			});
		} catch (e) {
			this.push({
				kind: "notice",
				text: pa(e),
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
		this.input.value = P("continue_message"), this.send(void 0, e);
	}
	editLast(e, t, n, r) {
		this.editing = !0, this.clearAttachments(), this.photos = t ?? [], this.files = (r ?? []).filter((e) => e.data), n && !t && this.photosNotKept(), r?.some((e) => !e.data) && this.push({
			kind: "notice",
			text: P("files_not_kept")
		}), this.input.value = e, this.autosize(), this.input.focus();
	}
	cancelEdit() {
		this.editing = !1, this.clearAttachments(), this.input.value = "", this.autosize();
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
		let t = e.filter(ya);
		t.length && await this.addPhotos(t);
		let n = this.photoGen;
		for (let t of e.filter((e) => !ya(e))) {
			let e = t.name || P("that_file"), r = (t, n = {}) => this.push({
				kind: "notice",
				text: P(t, {
					name: e,
					...n
				}),
				error: !0
			});
			if (this.files.length >= ha) {
				r("too_many_files", { count: ha });
				return;
			}
			if (t.size > ga) {
				r("file_too_large", { limit: xa(ga) });
				continue;
			}
			if (this.payload() + ba(t.size) > _a) {
				r("files_over_total");
				continue;
			}
			let i;
			try {
				i = await wa(t);
			} catch {
				r("file_unreadable");
				continue;
			}
			if (n !== this.photoGen) return;
			i ? this.payload() + (i.data?.length ?? 0) > _a ? r("files_over_total") : this.files = [...this.files, i] : r("file_unsupported");
		}
	}
	payload() {
		return this.photos.reduce((e, t) => e + t.data.length, 0) + this.files.reduce((e, t) => e + (t.data?.length ?? 0), 0);
	}
	photosNotKept() {
		this.push({
			kind: "notice",
			text: P("photos_not_kept")
		});
	}
	async addPhotos(e) {
		let t = this.photoGen;
		for (let n of e) {
			if (this.photos.length >= ma) break;
			try {
				let e = await Da(n);
				if (t !== this.photoGen || this.photos.length >= ma) return;
				this.photos = [...this.photos, e];
			} catch {
				this.push({
					kind: "notice",
					text: P("photo_unreadable", { name: n.name || P("that_picture") }),
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
		if (e.key === "Escape" && this.running && !e.isComposing) e.preventDefault(), this.stop();
		else if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
			let t = e.ctrlKey || e.metaKey;
			if (this.prefs.send === "ctrl" && !t) return;
			e.preventDefault(), this.send();
		}
	}
	onInput() {
		this.autosize(), this.updateMentions();
	}
	updateMentions() {
		let e = this.input, t = this.hass;
		if (!e || !t) return;
		let n = e.value.slice(0, e.selectionStart ?? e.value.length), r = /(^|\s)@([^\s@]*)$/.exec(n);
		r ? (this.mentionStart = n.length - r[2].length - 1, this.mentions = Xi(t, r[2]), this.mentionIndex = 0) : this.mentions = [];
	}
	pickMention(e) {
		let t = this.input, n = t.selectionStart ?? t.value.length, r = t.value;
		t.value = r.slice(0, this.mentionStart) + e.insert + " " + r.slice(n);
		let i = this.mentionStart + e.insert.length + 1;
		t.setSelectionRange(i, i), this.mentions = [], t.focus(), this.autosize();
	}
	autosize() {
		let e = this.input;
		e && (e.style.height = "auto", e.style.height = `${e.scrollHeight}px`);
	}
	onScroll() {
		let e = this.scroller;
		e && (this.stickToBottom = e.scrollHeight - e.scrollTop - e.clientHeight < 40);
	}
	pickProvider(e) {
		this.providerId = e.target.value, this.model = this.provider?.default_model ?? "";
	}
	render() {
		if (this.loadError) return C`<div class="empty">${P("load_error", { error: this.loadError })}</div>`;
		if (this.info && !this.info.providers.length) return C`<div class="empty">${P("no_provider")}</div>`;
		let e = this.narrow ? this.showList : this.prefs.listOpen, t = this.convId ? this.lastUserIndex() : -1;
		return C`
      <div
        class="layout ${this.narrow ? "narrow" : ""}"
        @click=${this.closePrefsOutside}
        @keydown=${(e) => {
			e.key === "Escape" && (this.showPrefs = !1, this.showNotes = !1);
		}}
      >
        ${e ? this.renderList() : w}
        <main
          class=${this.showChanges ? "changes" : ""}
          @dragover=${this.onDragOver}
          @dragleave=${this.onDragLeave}
          @drop=${this.onDrop}
        >
          <header>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <button
              class="icon"
              title=${P(e ? "hide_chats" : "show_chats")}
              aria-label=${P("conversations")}
              aria-expanded=${e}
              @click=${() => this.narrow ? this.showList = !this.showList : this.setPref("listOpen", !this.prefs.listOpen)}
            >
              <ha-icon
                icon=${this.narrow ? "mdi:forum-outline" : "mdi:dock-left"}
              ></ha-icon>
            </button>
            <div class="title">${this.showChanges ? P("changes") : aa(this.chatTitle)}</div>
            ${this.items.length ? C`<button
                    class="icon"
                    title=${P("export_title")}
                    aria-label=${P("export")}
                    @click=${this.exportChat}
                  >
                    <ha-icon icon="mdi:tray-arrow-down"></ha-icon>
                  </button>` : w}
            ${e ? w : C`<button
                    class="icon"
                    title=${P("new_chat")}
                    aria-label=${P("new_chat")}
                    @click=${this.newChat}
                  >
                    <ha-icon icon="mdi:square-edit-outline"></ha-icon>
                  </button>`}
            ${this.member ? w : C`<button
                    class="icon gear"
                    title=${P("home_notes")}
                    aria-label=${P("home_notes")}
                    aria-expanded=${this.showNotes}
                    @click=${this.toggleNotes}
                  >
                    <ha-icon icon="mdi:notebook-outline"></ha-icon>
                  </button>`}
            ${this.showNotes && !this.member ? this.renderNotes() : w}
            ${this.member ? w : C`<button
                    class="icon"
                    title=${P("changes_title")}
                    aria-label=${P("changes")}
                    aria-pressed=${this.showChanges}
                    @click=${() => this.showChanges = !this.showChanges}
                  >
                    <ha-icon icon="mdi:history"></ha-icon>
                  </button>`}
            <button
              class="icon gear"
              title=${P("panel_settings")}
              aria-label=${P("panel_settings")}
              aria-expanded=${this.showPrefs}
              @click=${() => {
			this.showPrefs = !this.showPrefs, this.showNotes = !1;
		}}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            ${this.showPrefs ? this.renderPrefs() : w}
          </header>
          ${this.showChanges ? C`<llm-agent-changes
                  .hass=${this.hass}
                  @open-chat=${(e) => void this.open(e.detail)}
                ></llm-agent-changes>` : w}
          <div class="sr-only" role="status" aria-live="polite">${this.announce}</div>
          <div class="messages" role="log" aria-label=${P("conversation")} @scroll=${this.onScroll}>
            ${this.items.length ? w : this.renderWelcome()}
            ${tt(this.items, (e, t) => t, (e, n) => this.renderItem(e, n === this.items.length - 1, n === t, e.kind !== "user" && e.kind !== "notice" && (n === 0 || this.items[n - 1].kind === "user")))}
          </div>
          ${this.renderComposer()}
        </main>
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
		let e = Zi(this.chatTitle, this.items), t = URL.createObjectURL(new Blob([e], { type: "text/markdown" })), n = document.createElement("a");
		n.href = t, n.download = `${Qi(this.chatTitle) || "chat"}.md`, n.click(), URL.revokeObjectURL(t);
	}
	renderList() {
		let e = this.hits ?? this.convs;
		return C`<nav>
      <div class="nav-head">
        <span class="brand"
          ><span class="brand-mark"
            ><ha-icon icon="mdi:robot-happy-outline"></ha-icon></span
          >LLM Agent</span
        >
        <button
          class="icon"
          title=${P("new_chat")}
          aria-label=${P("new_chat")}
          @click=${this.newChat}
        >
          <ha-icon icon="mdi:square-edit-outline"></ha-icon>
        </button>
      </div>
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder=${P("search_chats")}
          aria-label=${P("search_chats")}
          .value=${this.query}
          @input=${this.onSearch}
        />
      </label>
      <div class="convs">
        ${this.hits && !this.hits.length ? C`<div class="nav-empty">${P("no_matches")}</div>` : w}
        ${!this.hits && !this.convs.length ? C`<div class="nav-empty">${P("no_chats")}</div>` : w}
        ${ca(e, !!this.hits).map(([e, t]) => C`
            ${e ? C`<div class="group">${P(e)}</div>` : w}
            ${t.map((e) => C`<div
                  class="conv ${e.id === this.convId ? "active" : ""}"
                  @click=${() => this.open(e.id)}
                >
                  <span class="conv-title"
                    >${e.source === "action" ? C`<ha-icon
                            class="auto"
                            icon="mdi:robot-outline"
                            title=${P("started_by_automation")}
                          ></ha-icon>` : w}${aa(e.title)}${e.snippet && e.snippet !== e.title ? C`<small class="snippet">${e.snippet}</small>` : w}</span
                  >
                  <button
                    class="icon del"
                    title=${P("delete")}
                    aria-label=${P("delete_chat")}
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
		(this.showPrefs || this.showNotes) && (e.composedPath().some((e) => e instanceof HTMLElement && (e.classList.contains("prefs") || e.classList.contains("gear"))) || (this.showPrefs = !1, this.showNotes = !1));
	}
	async toggleNotes() {
		if (this.showNotes = !this.showNotes, this.showPrefs = !1, this.showNotes) {
			this.notesDraft = this.info?.notes ?? "", this.notesBase = this.notesDraft, this.notesStatus = "";
			try {
				let e = await this.ws.sendMessagePromise({ type: "llm_agent/info" });
				this.info = e, this.showNotes && this.notesDraft === this.notesBase && (this.notesDraft = e.notes ?? "", this.notesBase = this.notesDraft);
			} catch {}
		}
	}
	async saveNotes() {
		let e = this.notesDraft;
		try {
			let t = await this.ws.sendMessagePromise({
				type: "llm_agent/notes",
				notes: e,
				base: this.notesBase
			});
			this.info &&= {
				...this.info,
				notes: t.notes
			}, this.notesDraft === e && (this.notesDraft = t.notes), this.notesBase = t.notes, this.notesStatus = P("saved");
		} catch (e) {
			this.notesStatus = e.message || P("could_not_save");
		}
	}
	renderNotes() {
		let e = this.info?.notes_max ?? 2e3, t = e - this.notesDraft.trim().length;
		return C`<div class="prefs notes" role="dialog" aria-label=${P("home_notes")}>
      <strong>${P("home_notes")}</strong>
      <textarea
        rows="8"
        maxlength=${e + 200}
        placeholder=${P("notes_placeholder")}
        .value=${this.notesDraft}
        @input=${(e) => {
			this.notesDraft = e.target.value, this.notesStatus = "";
		}}
      ></textarea>
      <div class="mine">
        <button class="small" ?disabled=${t < 0} @click=${this.saveNotes}>${P("save")}</button>
        <span class=${t < 0 ? "over" : "hint"}>${P("characters_left", { count: t })}</span>
        ${this.notesStatus ? C`<span class="hint">${this.notesStatus}</span>` : w}
      </div>
      <div class="hint">${P("notes_hint")}</div>
    </div>`;
	}
	renderPrefs() {
		let e = this.prefs, t = (t, n, r) => C`<label
        >${n}
        <select
          @change=${(e) => this.setPref(t, e.target.value)}
        >
          ${r.map(([n, r]) => C`<option value=${String(n)} ?selected=${e[t] === n}>
                ${r}
              </option>`)}
        </select></label
      >`, n = (t, n) => C`<label class="check"
        ><input
          type="checkbox"
          .checked=${e[t]}
          @change=${(e) => this.setPref(t, e.target.checked)}
        />${n}</label
      >`, r = this.info?.my_default, i = r ? `${this.info?.providers.find((e) => e.id === r.provider_id)?.name ?? "?"} · ${r.model || P("model_provider_default")}` : "";
		return C`<div class="prefs" role="dialog" aria-label=${P("panel_settings")}>
      ${t("theme", P("theme"), [
			["auto", P("theme_auto")],
			["light", P("theme_light")],
			["dark", P("theme_dark")]
		])}
      ${t("size", P("text_size"), [
			["small", P("size_small")],
			["normal", P("size_normal")],
			["large", P("size_large")]
		])}
      ${t("send", P("send_with"), [["enter", "Enter"], ["ctrl", "Ctrl+Enter"]])}
      ${n("compact", P("compact_layout"))}
      ${n("toolsOpen", P("expand_tools"))}
      ${n("showUsage", P("show_usage"))}
      ${this.member ? w : C`<div class="mine">
        <div>${P("my_default", { model: r ? i : P("provider_default") })}</div>
        <button class="small" @click=${() => this.setMyDefault()}>
          ${P("use_current_model")}
        </button>
        ${r ? C`<button
                class="small ghost"
                @click=${() => this.setMyDefault(!0)}
              >
                ${P("clear")}
              </button>` : w}
      </div>`}
      <div class="hint">
        ${P("prefs_hint")}${this.member ? "" : ` ${P("prefs_hint_admin")}`}
      </div>
    </div>`;
	}
	renderWelcome() {
		let e = Yi(this.hass, this.member), t = this.hass?.user?.name?.split(" ")[0];
		return C`<div class="welcome">
      <div class="logo"><ha-icon icon="mdi:robot-happy-outline"></ha-icon></div>
      <h2>${t ? P("greeting_name", {
			greeting: sa(),
			name: t
		}) : sa()}</h2>
      ${this.member ? C`<p>${P("welcome_member")}</p>` : C`<p>${P("welcome_admin")}</p>
              <span class="mode-chip"
                ><ha-icon icon="mdi:shield-check-outline"></ha-icon
                >${fa(this.info?.approval_mode)}</span
              >`}
      <div class="tips">
        ${e.map((e) => C`<button
              class="tip"
              @click=${() => {
			this.input.value = e.text, this.input.focus(), this.autosize();
		}}
            >
              <ha-icon icon=${e.icon}></ha-icon>
              <span>${e.text}</span>
            </button>`)}
      </div>
    </div>`;
	}
	renderItem(e, t, n = !1, r = !1) {
		let i = r ? C`<div class="avatar" aria-hidden="true">
          <ha-icon icon="mdi:robot-happy-outline"></ha-icon>
        </div>` : w;
		switch (e.kind) {
			case "user": return C`<div class="row user">
          ${n && !this.running ? C`<div class="msg-actions">
                  <button
                    class="icon"
                    title=${P("edit")}
                    aria-label=${P("edit")}
                    @click=${() => this.editLast(e.text, e.images, e.photos, e.files)}
                  >
                    <ha-icon icon="mdi:pencil-outline"></ha-icon>
                  </button>
                  <button
                    class="icon"
                    title=${P("retry")}
                    aria-label=${P("retry")}
                    @click=${() => this.send(e.text)}
                  >
                    <ha-icon icon="mdi:refresh"></ha-icon>
                  </button>
                </div>` : w}
          <div class="msg user">${this.renderPhotos(e)}${e.text}</div>
        </div>`;
			case "assistant": return e.text ? C`<div class="row reply">
          ${i}
          <div class="msg assistant md">
            ${Ge(xi(e.text, !(t && this.running)))}
          </div>
        </div>` : t && this.running ? C`<div class="row reply">
                ${i}
                <div class="msg assistant typing">
                  <span></span><span></span><span></span>
                </div>
              </div>` : w;
			case "notice": return C`<div class="notice ${e.error ? "error" : ""}">
          ${e.text}
          ${t && !this.running && e.stop && $i.has(e.stop) ? C`<button
                  class="small"
                  @click=${() => this.continueTurn(e.stop === "spend_cap")}
                >
                  ${e.stop === "spend_cap" ? P("continue_anyway") : P("continue")}
                </button>` : w}
        </div>`;
			case "tool": return C`<div class="row reply">
          ${i}${this.renderTool(e)}
        </div>`;
		}
	}
	renderPreview(e) {
		let t = e.args?.config;
		if (!t || typeof t != "object") return C``;
		let n = this.previews.has(e.id);
		return C`<div class="preview">
      <button
        class="ghost small"
        @click=${() => {
			let t = new Set(this.previews);
			n ? t.delete(e.id) : t.add(e.id), this.previews = t;
		}}
      >
        <ha-icon icon=${n ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
        ${P(n ? "hide_preview" : "preview_dashboard")}
      </button>
      ${n ? C`<llm-dashboard-preview .hass=${this.hass} .config=${t}></llm-dashboard-preview>` : w}
    </div>`;
	}
	renderNoteSuggestion(e) {
		let t = (e.approval?.diff ?? "").replace(/\n+$/, "").split("\n"), n = t.filter((e) => e.startsWith("+") && !e.startsWith("+++")).map((e) => e.slice(1)), r = t.filter((e) => e.startsWith("-") && !e.startsWith("---")).map((e) => e.slice(1)), i = this.noteCardSince.get(e.id);
		i === void 0 && (i = Date.now(), this.noteCardSince.set(e.id, i), setTimeout(() => this.requestUpdate(), Ji + 50));
		let a = Date.now() - i >= Ji;
		return C`<div class="note-suggestion" role="group" aria-label=${P("suggested_note")}>
      <div class="note-head">
        <ha-icon icon="mdi:notebook-edit-outline"></ha-icon>
        <div>
          <strong>${P("note_question")}</strong>
          <small>${P("note_explain")}</small>
        </div>
      </div>
      ${n.filter((e) => e.trim()).length ? C`<ul class="note-lines add">
            ${n.filter((e) => e.trim()).map((e) => C`<li>${e}</li>`)}
          </ul>` : w}
      ${r.filter((e) => e.trim()).length ? C`<div class="note-label">${P("forget")}</div>
            <ul class="note-lines del">
              ${r.filter((e) => e.trim()).map((e) => C`<li>${e}</li>`)}
            </ul>` : w}
      <div class="note-actions">
        <button class="ghost" @click=${() => this.answer(e.id, !1)}>
          ${P("note_no")}
        </button>
        <button
          class="note-save"
          ?disabled=${!a}
          title=${P(a ? "note_save_title" : "read_it_first")}
          @click=${() => this.answer(e.id, !0)}
        >
          ${P("save_to_notes")}
        </button>
      </div>
    </div>`;
	}
	renderTool(e) {
		let t = e.approval;
		if (t && !t.phoneOnly && e.name === "update_home_notes") return this.renderNoteSuggestion(e);
		let n = {
			running: C`<span class="spinner" aria-label=${P("running")}></span>`,
			ok: C`<ha-icon
        class="st ok"
        icon="mdi:check-circle"
        aria-label=${P("done")}
      ></ha-icon>`,
			error: C`<ha-icon
        class="st error"
        icon="mdi:alert-circle"
        aria-label=${P("failed")}
      ></ha-icon>`,
			waiting: C`<span class="tag wait">${P("waiting_for_you")}</span>`
		}[e.status];
		return C`<div
      class="tool ${e.status} ${t?.risky ? "risky" : ""}"
    >
      ${t ? C`<div class="approval-head">
              <ha-icon
                icon=${t.risky ? "mdi:shield-alert-outline" : "mdi:hand-back-right-outline"}
              ></ha-icon>
              <span
                >${P("needs_approval")}${t.reason ? C`<span class="why"> · ${t.reason}</span>` : w}</span
              >
            </div>` : w}
      <details ?open=${!!t || this.prefs.toolsOpen}>
        <summary>
          <span class="tool-icon"
            ><ha-icon icon=${ia(e.name)}></ha-icon
          ></span>
          <span class="tool-name">${la(e.name)}</span>
          <span class="tool-summary"
            >${t?.summary ?? e.summary ?? ua(e.args)}</span
          >
          ${e.undone ? C`<span class="tag">${P("undone")}</span>` : w}
          ${na(e.review, e.reviewing)}
          ${n}
          ${e.snapshotId && !e.undone && e.status === "ok" && !this.member ? C`<button
                  class="ghost small undo"
                  title=${P("undo_title")}
                  @click=${(t) => {
			t.preventDefault(), t.stopPropagation(), this.undo(e);
		}}
                >
                  ${P("undo")}
                </button>` : w}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        ${e.review ? C`<div class="review-note ${e.review.decision}">
                <ha-icon icon="mdi:shield-check-outline"></ha-icon>
                <span
                  ><b>${e.review.model ? P("reviewer_model", { model: e.review.model }) : P("reviewer")}:</b>
                  ${e.review.reason || P(ta[e.review.decision])}</span
                >
              </div>` : w}
        ${t?.diff ? C`<pre class="diff">${ra(t.diff)}</pre>` : w}
        ${t && e.name === "save_dashboard" ? this.renderPreview(e) : w}
        ${this.renderArgs(e.args, !!t?.diff)}
        ${e.preview && !t ? C`<pre class="result">${e.preview}</pre>` : w}
      </details>
        ${e.image ? C`<img class="snapshot" src=${e.image} alt=${P("camera_snapshot")} />` : w}
      ${t?.phoneOnly ? C`<div class="approval phone-wait">
              <ha-icon icon="mdi:cellphone-message"></ha-icon>
              ${P("phone_wait")}
            </div>` : t ? C`<div class="approval">
              <input
                id="note-${e.id}"
                placeholder=${P("approval_note")}
                aria-label=${P("approval_note")}
              />
              <button
                class="ghost danger-text"
                @click=${() => this.answer(e.id, !1)}
              >
                ${P("deny")}
              </button>
              <button
                class="primary"
                @click=${() => this.answer(e.id, !0)}
              >
                ${P("approve")}
              </button>
            </div>` : w}
    </div>`;
	}
	renderPhotos(e) {
		if (e.kind !== "user") return w;
		let t = e.files?.length ? C`<div class="files">${e.files.map((e) => this.renderFile(e))}</div>` : w;
		return e.images?.length ? C`<div class="photos">${e.images.map((e) => C`<img src=${e.url} alt=${P("your_photo")} />`)}</div>${t}` : e.photos ? C`<div class="photo-note"><ha-icon icon="mdi:image-outline"></ha-icon>${oa(e.photos)} ${P("not_kept")}</div>${t}` : t;
	}
	renderFile(e, t) {
		return C`<span class="file" title=${e.name}>
      <ha-icon icon=${va[e.kind]}></ha-icon>
      <span class="file-name">${e.name}</span>
      <span class="file-meta">${Sa(e)}, ${xa(e.size)}</span>
      ${t ? C`<button
              class="icon"
              title=${P("remove_file")}
              aria-label=${`${P("remove_file")}: ${e.name}`}
              @click=${t}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : w}
    </span>`;
	}
	renderComposer() {
		let e = this.provider, t = "models";
		return C`<footer>
      <div class="composer ${this.dragging ? "dragging" : ""}">
        <textarea
          rows="1"
          placeholder=${P("composer_placeholder")}
          @keydown=${this.onKey}
          @input=${this.onInput}
          @paste=${this.onPaste}
          @blur=${() => setTimeout(() => {
			this.renderRoot.activeElement !== this.input && (this.mentions = []);
		}, 150)}
        ></textarea>
        ${this.mentions.length ? C`<ul class="mentions" role="listbox">
                ${this.mentions.map((e, t) => C`<li
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
              </ul>` : w}
        ${this.photos.length ? C`<div class="attached">
                ${this.photos.map((e, t) => C`<span class="thumb">
                      <img src=${e.url} alt=${P("photo_to_send")} />
                      <button
                        class="icon"
                        title=${P("remove_photo")}
                        aria-label=${P("remove_photo")}
                        @click=${() => this.photos = this.photos.filter((e, n) => n !== t)}
                      >
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    </span>`)}
              </div>` : w}
        ${this.files.length ? C`<div class="attached files">
                ${this.files.map((e, t) => this.renderFile(e, () => {
			this.files = this.files.filter((e, n) => n !== t);
		}))}
              </div>` : w}
        <div class="toolbar">
          <label
            class="attach icon"
            title=${P("attach_title")}
            ?hidden=${this.photos.length >= ma && this.files.length >= ha}
          >
            <ha-icon icon="mdi:paperclip"></ha-icon>
            <!-- No accept filter: HA files often have no extension (.storage/*,
                 home-assistant.log.1), and the type is decided from the bytes. -->
            <input
              type="file"
              multiple
              aria-label=${P("attach")}
              ?disabled=${this.running}
              @change=${this.onPick}
            />
          </label>
          ${this.member ? w : C`<label
            class="model-pill"
            title=${this.modelError || P("provider_and_model")}
          >
            <ha-icon icon="mdi:creation-outline"></ha-icon>
            <select
              aria-label=${P("provider")}
              @change=${this.pickProvider}
              .value=${this.providerId}
              ?disabled=${this.running}
            >
              ${this.info?.providers.map((e) => C`<option
                    value=${e.id}
                    ?selected=${e.id === this.providerId}
                  >
                    ${e.name}
                  </option>`)}
            </select>
            <span class="sep">/</span>
            <input
              class="model"
              aria-label=${P("model")}
              list=${t}
              .value=${this.model}
              ?disabled=${this.running}
              @change=${(e) => this.model = e.target.value.trim()}
              @focus=${this.loadModels}
            />
            <datalist id=${t}>
              ${(this.fetched[this.providerId] ?? e?.models)?.map((e) => C`<option value=${e.id}>${e.label}</option>`)}
            </datalist>
          </label>`}
          <span class="spacer"></span>
          ${this.running ? C`<button
                  class="send stop"
                  title=${P("stop")}
                  aria-label=${P("stop")}
                  @click=${this.stop}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>` : C`<button
                  class="send"
                  title=${P("send")}
                  aria-label=${P("send")}
                  @click=${() => this.send()}
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>`}
        </div>
      </div>
      <div class="meta">
        ${this.editing ? C`<span class="editing"
                >${P("editing_last")}
                <button class="small ghost" @click=${this.cancelEdit}>
                  ${P("cancel")}
                </button></span
              >` : w}
        <span
          class="usage"
          ?hidden=${!this.prefs.showUsage}
          title=${P("usage_title")}
        >
          ${P("usage_line", {
			input: da(this.usage.input + this.usage.cache_read + this.usage.cache_write),
			output: da(this.usage.output)
		})}
          ${this.usage.cache_read ? ` · ${P("usage_cached", { count: da(this.usage.cache_read) })}` : w}
          ·
          ${this.usage.cost == null ? P("cost_na") : `~$${this.usage.cost.toFixed(this.usage.cost < 1 ? 4 : 2)}`}
          ${this.usage.review ? ` · ${P("reviewer_usage", {
			tokens: da(this.usage.review.input + this.usage.review.output),
			cost: this.usage.review.cost == null ? P("cost_na") : `~$${this.usage.review.cost.toFixed(4)}`
		})}` : w}
        </span>
      </div>
    </footer>`;
	}
};
Q([Re({ attribute: !1 })], $.prototype, "hass", void 0), Q([Re({ type: Boolean })], $.prototype, "narrow", void 0), Q([j()], $.prototype, "info", void 0), Q([j()], $.prototype, "convs", void 0), Q([j()], $.prototype, "query", void 0), Q([j()], $.prototype, "previews", void 0), Q([j()], $.prototype, "hits", void 0), Q([j()], $.prototype, "convId", void 0), Q([j()], $.prototype, "chatTitle", void 0), Q([j()], $.prototype, "items", void 0), Q([j()], $.prototype, "usage", void 0), Q([j()], $.prototype, "running", void 0), Q([j()], $.prototype, "announce", void 0), Q([j()], $.prototype, "editing", void 0), Q([j()], $.prototype, "photos", void 0), Q([j()], $.prototype, "files", void 0), Q([j()], $.prototype, "dragging", void 0), Q([j()], $.prototype, "providerId", void 0), Q([j()], $.prototype, "model", void 0), Q([j()], $.prototype, "fetched", void 0), Q([j()], $.prototype, "showList", void 0), Q([j()], $.prototype, "loadError", void 0), Q([j()], $.prototype, "mentions", void 0), Q([j()], $.prototype, "prefs", void 0), Q([j()], $.prototype, "showPrefs", void 0), Q([j()], $.prototype, "showNotes", void 0), Q([j()], $.prototype, "showChanges", void 0), Q([j()], $.prototype, "notesDraft", void 0), Q([j()], $.prototype, "notesStatus", void 0), Q([j()], $.prototype, "mentionIndex", void 0), Q([Be(".composer textarea")], $.prototype, "input", void 0), Q([Be(".messages")], $.prototype, "scroller", void 0);
var Bi = "llm-agent-prefs", Vi = "llm-agent-last-chat";
function Hi() {
	try {
		return localStorage.getItem(Vi);
	} catch {
		return null;
	}
}
function Ui(e) {
	try {
		e ? localStorage.setItem(Vi, e) : localStorage.removeItem(Vi);
	} catch {}
}
var Wi = {
	theme: "auto",
	size: "normal",
	compact: !1,
	toolsOpen: !1,
	showUsage: !0,
	send: "enter",
	listOpen: !0
};
function Gi() {
	try {
		let e = JSON.parse(localStorage.getItem(Bi) ?? "{}");
		return {
			...Wi,
			...typeof e == "object" && e ? e : {}
		};
	} catch {
		return { ...Wi };
	}
}
function Ki(e) {
	try {
		localStorage.setItem(Bi, JSON.stringify(e));
	} catch {}
}
var qi = 8, Ji = 1500;
function Yi(e, t = !1) {
	let n = Object.values(e?.areas ?? {}).map((e) => String(e.name ?? "")).filter(Boolean).sort((e, t) => e.localeCompare(t))[0] ?? P("living_room"), r = Object.values(e?.states ?? {}).some((e) => e.attributes?.device_class === "energy");
	return t ? [
		{
			text: P("tip_lights", { room: n }),
			icon: "mdi:lightbulb-group-outline"
		},
		{
			text: P("tip_anything_on"),
			icon: "mdi:power"
		},
		{
			text: P("tip_temperature"),
			icon: "mdi:thermometer"
		}
	] : [
		{
			text: P("tip_lights", { room: n }),
			icon: "mdi:lightbulb-group-outline"
		},
		{
			text: P("tip_dashboard_room", { room: n }),
			icon: "mdi:view-dashboard-outline"
		},
		{
			text: P("tip_dashboard_all"),
			icon: "mdi:view-dashboard-edit-outline"
		},
		{
			text: P("tip_automation"),
			icon: "mdi:robot-outline"
		},
		r ? {
			text: P("tip_energy"),
			icon: "mdi:lightning-bolt-outline"
		} : {
			text: P("tip_unavailable"),
			icon: "mdi:stethoscope"
		},
		{
			text: P("tip_batteries"),
			icon: "mdi:battery-alert-variant-outline"
		}
	];
}
function Xi(e, t) {
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
	return r.sort((e, t) => e[0] - t[0] || e[1].label.localeCompare(t[1].label)), r.slice(0, qi).map(([, e]) => e);
}
function Zi(e, t) {
	let n = [`# ${aa(e)}`, ""];
	for (let e of t) if (e.kind === "user") {
		let t = e.images?.length || e.photos || 0, r = [...t ? [oa(t)] : [], ...(e.files ?? []).map((e) => e.name)], i = r.length ? ` _(${r.join(", ")})_` : "";
		n.push(`**${P("you")}:** ${e.text}${i}`, "");
	} else if (e.kind === "assistant" && e.text) n.push(e.text, "");
	else if (e.kind === "notice") n.push(`> ${e.text}`, "");
	else if (e.kind === "tool") {
		let t = e.status === "ok" ? "✓" : e.status === "error" ? "✗" : "…";
		n.push(`- ${t} \`${e.name}\`${e.summary ? `: ${e.summary}` : ""}`, "");
	}
	return n.join("\n");
}
function Qi(e) {
	return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
}
var $i = /* @__PURE__ */ new Set([
	"length",
	"tool_limit",
	"cancelled",
	"spend_cap"
]);
function ea(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let r of e) if (r.role === "user") t.push({
		kind: "user",
		text: r.content,
		photos: r.photos,
		files: r.files
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
			summary: r.summary || (r.decision === "denied" ? P("denied") : ""),
			preview: r.preview,
			snapshotId: r.snapshot_id,
			undone: r.undone,
			review: r.review ?? void 0
		});
	}
	return t;
}
var ta = {
	approve: "reviewer_approved",
	deny: "reviewer_denied",
	ask: "reviewer_unsure"
};
function na(e, t) {
	return t && !e ? C`<span class="tag wait">${P("reviewing")}</span>` : e ? C`<span class="tag review ${e.decision}" title=${e.reason}
    >${P(ta[e.decision] ?? "reviewer")}</span
  >` : w;
}
function ra(e) {
	return e.replace(/\n+$/, "").split("\n").map((e) => C`<span class=${e.startsWith("+") && !e.startsWith("+++") ? "add" : e.startsWith("-") && !e.startsWith("---") ? "del" : e.startsWith("@@") ? "hunk" : ""}>${e || " "}</span>`);
}
function ia(e) {
	return e === "shell" ? "mdi:console" : e === "call_service" ? "mdi:play-circle-outline" : e === "undo" ? "mdi:undo" : e === "system" ? "mdi:cog-outline" : e === "ha_websocket" ? "mdi:api" : e === "integrations" ? "mdi:puzzle-outline" : e === "read_reference" ? "mdi:book-open-variant" : e === "render_template" ? "mdi:code-braces" : e === "get_history" ? "mdi:chart-timeline-variant" : e === "web_fetch" ? "mdi:web" : e === "web_search" ? "mdi:magnify" : e === "camera_snapshot" ? "mdi:cctv" : e === "get_traces" ? "mdi:transit-connection-variant" : e === "get_logbook" ? "mdi:history" : e === "read_log" ? "mdi:text-box-search-outline" : e.includes("dashboard") ? "mdi:view-dashboard-outline" : e.includes("config_item") ? "mdi:robot-outline" : e.includes("file") ? "mdi:file-document-outline" : e.includes("area") || e.includes("device") || e.includes("registry") ? "mdi:devices" : e.includes("entit") || e.includes("service") ? "mdi:format-list-bulleted" : "mdi:wrench-outline";
}
function aa(e) {
	return e === "New chat" ? P("new_chat") : e;
}
function oa(e) {
	return e === 1 ? P("one_photo") : P("n_photos", { count: e });
}
function sa() {
	let e = (/* @__PURE__ */ new Date()).getHours();
	return P(e < 5 ? "greeting_evening" : e < 12 ? "greeting_morning" : e < 18 ? "greeting_afternoon" : "greeting_evening");
}
function ca(e, t) {
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
function la(e) {
	let t = `tool_${e}`;
	return at(t) ? P(t) : e.replace(/_/g, " ");
}
function ua(e) {
	let t = Object.entries(e).filter(([e]) => !e.startsWith("_")).map(([e, t]) => `${e}=${typeof t == "string" ? t : JSON.stringify(t)}`).join(" ");
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
function da(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(e);
}
function fa(e) {
	let t = {
		ask_all: "mode_ask_all",
		ask_risky: "mode_ask_risky",
		reviewer: "mode_reviewer",
		autopilot: "mode_autopilot",
		yolo: "mode_yolo",
		read_only: "mode_read_only"
	}[e ?? ""];
	return t ? P(t) : "";
}
function pa(e) {
	return e.message ?? String(e);
}
customElements.get("llm-agent-panel") || customElements.define("llm-agent-panel", $);
var ma = 3, ha = 10, ga = 2097152, _a = 35e5, va = {
	text: "mdi:file-document-outline",
	pdf: "mdi:file-pdf-box",
	zip: "mdi:folder-zip-outline",
	gzip: "mdi:folder-zip-outline"
};
function ya(e) {
	return e.type.startsWith("image/") && e.type !== "image/svg+xml";
}
function ba(e) {
	return Math.ceil(e / 3) * 4;
}
function xa(e) {
	return e >= 1048576 ? `${(e / 1048576).toFixed(1)} MB` : e >= 1024 ? `${Math.round(e / 1024)} KB` : `${e} B`;
}
function Sa(e) {
	if (e.kind !== "text") return e.kind.toUpperCase();
	let t = e.name.lastIndexOf("."), n = t > 0 ? e.name.slice(t + 1) : "";
	return n && n.length <= 5 ? n.toUpperCase() : P("file_text");
}
function Ca(e) {
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
async function wa(e) {
	let t = Ca(new Uint8Array(await e.slice(0, 8192).arrayBuffer()));
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
var Ta = 1568, Ea = 1e6;
async function Da(e) {
	let t = await createImageBitmap(e);
	try {
		let e = Math.min(Ta, Math.max(t.width, t.height));
		for (;;) {
			for (let n of [
				.85,
				.7,
				.55
			]) {
				let r = Oa(t, e, n), i = r.slice(r.indexOf(",") + 1);
				if (i.length <= Ea) return {
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
function Oa(e, t, n) {
	let r = Math.min(1, t / Math.max(e.width, e.height)), i = document.createElement("canvas");
	i.width = Math.max(1, Math.round(e.width * r)), i.height = Math.max(1, Math.round(e.height * r));
	let a = i.getContext("2d");
	return a.fillStyle = "#fff", a.fillRect(0, 0, i.width, i.height), a.drawImage(e, 0, 0, i.width, i.height), i.toDataURL("image/jpeg", n);
}
//#endregion
export { Xi as findMentions, Zi as toMarkdown, Yi as welcomeTips };
