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
var b = class extends HTMLElement {
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[v("elementProperties")] = /* @__PURE__ */ new Map(), b[v("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: b }), (g.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ie = globalThis, ae = (e) => e, x = ie.trustedTypes, oe = x ? x.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, se = "$lit$", ce = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + ce, ue = `<${le}>`, S = document, de = () => S.createComment(""), fe = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, me = (e) => pe(e) || typeof e?.[Symbol.iterator] == "function", he = "[ 	\n\f\r]", ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, ve = />/g, C = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ye = /'/g, be = /"/g, xe = /^(?:script|style|textarea|title)$/i, Se = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), w = Se(1), Ce = Se(2), we = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), E = S.createTreeWalker(S, 129);
function Ee(e, t) {
	if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return oe === void 0 ? t : oe.createHTML(t);
}
var D = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ge;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ge ? c[1] === "!--" ? o = _e : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = C) : (xe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = C) : o = ve : o === C ? c[0] === ">" ? (o = i ?? ge, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? C : c[3] === "\"" ? be : ye) : o === be || o === ye ? o = C : o === _e || o === ve ? o = ge : (o = C, i = void 0);
		let d = o === C && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ge ? n + ue : l >= 0 ? (r.push(s), n.slice(0, l) + se + n.slice(l) + ce + d) : n + ce + (l === -2 ? t : d);
	}
	return [Ee(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, De = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = D(t, n);
		if (this.el = e.createElement(l, r), E.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = E.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(se)) {
					let t = u[o++], n = i.getAttribute(e).split(ce), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ae : r[1] === "?" ? je : r[1] === "@" ? Me : k
					}), i.removeAttribute(e);
				} else e.startsWith(ce) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (xe.test(i.tagName)) {
					let e = i.textContent.split(ce), t = e.length - 1;
					if (t > 0) {
						i.textContent = x ? x.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], de()), E.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], de());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === le) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(ce, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += ce.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = S.createElement("template");
		return n.innerHTML = e, n;
	}
};
function O(e, t, n = e, r) {
	if (t === we) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = fe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = O(e, i._$AS(e, t.values), i, r)), t;
}
var Oe = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? S).importNode(t, !0);
		E.currentNode = r;
		let i = E.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new ke(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ne(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = E.nextNode(), a++);
		}
		return E.currentNode = S, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, ke = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = O(this, e, t), fe(e) ? e === T || e == null || e === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : e !== this._$AH && e !== we && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? me(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== T && fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(Ee(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Oe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Te.get(e.strings);
		return t === void 0 && Te.set(e.strings, t = new De(e)), t;
	}
	k(t) {
		pe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(de()), this.O(de()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ae(e).nextSibling;
			ae(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, k = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = T, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = T;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = O(this, e, t, 0), a = !fe(e) || e !== this._$AH && e !== we, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = O(this, r[n + o], t, o), s === we && (s = this._$AH[o]), a ||= !fe(s) || s !== this._$AH[o], s === T ? e = T : e !== T && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ae = class extends k {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === T ? void 0 : e;
	}
}, je = class extends k {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== T);
	}
}, Me = class extends k {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = O(this, e, t, 0) ?? T) === we) return;
		let n = this._$AH, r = e === T && n !== T || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== T && (n === T || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ne = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		O(this, e);
	}
}, Pe = {
	M: se,
	P: ce,
	A: le,
	C: 1,
	L: D,
	R: Oe,
	D: me,
	V: O,
	I: ke,
	H: k,
	N: je,
	U: Me,
	B: Ae,
	F: Ne
}, Fe = ie.litHtmlPolyfillSupport;
Fe?.(De, ke), (ie.litHtmlVersions ??= []).push("3.3.3");
var Ie = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new ke(t.insertBefore(de(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Le = globalThis, A = class extends b {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ie(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return we;
	}
};
A._$litElement$ = !0, A.finalized = !0, Le.litElementHydrateSupport?.({ LitElement: A });
var Re = Le.litElementPolyfillSupport;
Re?.({ LitElement: A }), (Le.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var ze = {
	attribute: !0,
	type: String,
	converter: ne,
	reflect: !1,
	hasChanged: re
}, Be = (e = ze, t, n) => {
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
function j(e) {
	return (t, n) => typeof n == "object" ? Be(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function M(e) {
	return j({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/base.js
var Ve = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
//#endregion
//#region node_modules/@lit/reactive-element/decorators/query.js
function He(e, t) {
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
			return Ve(n, r, { get() {
				let n = e.call(this);
				return n === void 0 && (n = a(this), (n !== null || this.hasUpdated) && t.call(this, n)), n;
			} });
		}
		return Ve(n, r, { get() {
			return a(this);
		} });
	};
}
//#endregion
//#region node_modules/lit-html/directive.js
var Ue = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, We = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ge = class {
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
}, Ke = class extends Ge {
	constructor(e) {
		if (super(e), this.it = T, e.type !== Ue.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === T || e == null) return this._t = void 0, this.it = e;
		if (e === we) return e;
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
Ke.directiveName = "unsafeHTML", Ke.resultType = 1;
var N = We(Ke), { I: qe } = Pe, Je = (e) => e, Ye = () => document.createComment(""), Xe = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new qe(r.insertBefore(Ye(), i), r.insertBefore(Ye(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = Je(e).nextSibling;
				Je(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, Ze = (e, t, n = e) => (e._$AI(t, n), e), Qe = {}, $e = (e, t = Qe) => e._$AH = t, et = (e) => e._$AH, P = (e) => {
	e._$AR(), e._$AA.remove();
}, tt = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, nt = We(class extends Ge {
	constructor(e) {
		if (super(e), e.type !== Ue.CHILD) throw Error("repeat() can only be used in text expressions");
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
		let i = et(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = Ze(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = Ze(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = Ze(i[d], a[m]), Xe(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = Ze(i[f], a[p]), Xe(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = tt(o, p, m), u = tt(s, d, f)), l.has(s[d])) {
			if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = Xe(e, i[d]);
					Ze(t, a[p]), c[p] = t;
				} else c[p] = Ze(n, a[p]), Xe(e, i[d], n), i[t] = null;
				p++;
			} else P(i[f]), f--;
		} else P(i[d]), d++;
		for (; p <= m;) {
			let t = Xe(e, c[m + 1]);
			Ze(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && P(e);
		}
		return this.ut = o, $e(e, c), we;
	}
}), rt = {
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
	settings_bad_json: "This isn't valid JSON."
}, it = [
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
], at = {}, ot = "en";
function F(e, t) {
	let n = at[e] ?? rt[e];
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}
function st(e) {
	return e in rt;
}
function ct(e) {
	if (!e) return "en";
	let t = it.find((t) => t.toLowerCase() === e.toLowerCase());
	if (t) return t;
	let n = e.split("-")[0].toLowerCase();
	return it.find((e) => e.split("-")[0].toLowerCase() === n) ?? "en";
}
async function lt(e) {
	let t = ct(e);
	if (t === ot) return !1;
	if (t === "en") return at = {}, ot = "en", !0;
	try {
		let e = new URL(import.meta.url), n = await fetch(new URL(`i18n/${t}.json${e.search}`, e));
		if (!n.ok) return !1;
		let r = await n.json(), i = {};
		for (let e of Object.keys(rt)) typeof r[e] == "string" && (i[e] = r[e]);
		return at = i, ot = t, !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region node_modules/dompurify/dist/purify.es.mjs
function ut(e, t) {
	this.v = e, this.k = t;
}
function I(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function dt(e) {
	if (Array.isArray(e)) return e;
}
function ft(e, t) {
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
function pt() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function mt(e, t) {
	return dt(e) || ft(e, t) || ht(e, t) || pt();
}
function ht(e, t) {
	if (e) {
		if (typeof e == "string") return I(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? I(e, t) : void 0;
	}
}
function gt(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof ut;
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
gt.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, gt.prototype.next = function(e) {
	return this._invoke("next", e);
}, gt.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, gt.prototype.return = function(e) {
	return this._invoke("return", e);
};
var _t = Object.entries, vt = Object.setPrototypeOf, yt = Object.isFrozen, bt = Object.getPrototypeOf, xt = Object.getOwnPropertyDescriptor, L = Object.freeze, R = Object.seal, St = Object.create, Ct = typeof Reflect < "u" && Reflect, wt = Ct.apply, Tt = Ct.construct;
L ||= function(e) {
	return e;
}, R ||= function(e) {
	return e;
}, wt ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, Tt ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var Et = V(Array.prototype.forEach);
Array.prototype.indexOf;
var Dt = V(Array.prototype.lastIndexOf), Ot = V(Array.prototype.pop), kt = V(Array.prototype.push), At = V(Array.prototype.slice), jt = V(Array.prototype.splice), Mt = Array.isArray, Nt = Jt(Set), Pt = V(Set.prototype.add), Ft = V(Set.prototype.has), It = V(String.prototype.toLowerCase), Lt = V(String.prototype.toString), Rt = V(String.prototype.match), zt = V(String.prototype.replace), Bt = V(String.prototype.indexOf), Vt = V(String.prototype.trim), Ht = V(Number.prototype.toString), Ut = V(Boolean.prototype.toString), Wt = typeof BigInt > "u" ? null : V(BigInt.prototype.toString), Gt = typeof Symbol > "u" ? null : V(Symbol.prototype.toString), z = V(Object.prototype.hasOwnProperty), Kt = V(Object.prototype.toString), B = V(RegExp.prototype.test), qt = Jt(TypeError);
function V(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return wt(e, t, n);
	};
}
function Jt(e) {
	return function() {
		return Tt(e, [...arguments]);
	};
}
function H(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : It;
	if (vt && vt(e, null), !Mt(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (yt(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function Yt(e) {
	for (let t = 0; t < e.length; t++) z(e, t) || (e[t] = null);
	return e;
}
function U(e) {
	let t = St(null);
	for (let r of _t(e)) {
		var n = mt(r, 2);
		let i = n[0], a = n[1];
		z(e, i) && (t[i] = Mt(a) ? Yt(a) : a && typeof a == "object" && a.constructor === Object ? U(a) : a);
	}
	return t;
}
function Xt(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return Ht(e);
		case "boolean": return Ut(e);
		case "bigint": return Wt ? Wt(e) : "0";
		case "symbol": return Gt ? Gt(e) : "Symbol()";
		case "undefined": return Kt(e);
		case "function":
		case "object": {
			if (e === null) return Kt(e);
			let t = e, n = W(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : Kt(e);
			}
			return Kt(e);
		}
		default: return Kt(e);
	}
}
function W(e, t) {
	for (; e !== null;) {
		let n = xt(e, t);
		if (n) {
			if (n.get) return V(n.get);
			if (typeof n.value == "function") return V(n.value);
		}
		e = bt(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Zt(e, t) {
	for (; e !== null;) {
		let n = xt(e, t);
		if (n) return n.get ? V(n.get) : null;
		e = bt(e);
	}
	return null;
}
function Qt(e) {
	try {
		return B(e, ""), !0;
	} catch {
		return !1;
	}
}
var $t = L(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), en = L(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), tn = L([
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
]), nn = L([
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
]), rn = L(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), an = L([
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
]), on = L(["#text"]), sn = L(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), cn = L(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), ln = L(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), un = L([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), dn = R(/{{[\w\W]*|^[\w\W]*}}/g), fn = R(/<%[\w\W]*|^[\w\W]*%>/g), pn = R(/\${[\w\W]*/g), mn = R(/^data-[\-\w.\u00B7-\uFFFF]+$/), hn = R(/^aria-[\-\w]+$/), gn = R(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), _n = R(/^(?:\w+script|data):/i), vn = R(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), yn = R(/^html$/i), bn = R(/^[a-z][.\w]*(-[.\w]+)+$/i), xn = R(/<[/\w!]/g), Sn = R(/<[/\w]/g), Cn = R(/<\/no(script|embed|frames)/i), wn = R(/\/>/i), G = {
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
}, Tn = L(H({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
])), En = function() {
	return typeof window > "u" ? null : window;
}, Dn = function(e, t) {
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
}, On = function() {
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
}, kn = function(e, t, n, r) {
	return z(e, t) && Mt(e[t]) ? H(r.base ? U(r.base) : {}, e[t], r.transform) : n;
}, An = function(e, t, n) {
	let r = z(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? U(r) : n();
};
function jn() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : En(), t = (e) => jn(e);
	if (t.version = "3.4.17", t.removed = [], !e || !e.document || e.document.nodeType !== G.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = W(d, "cloneNode"), p = W(d, "remove"), m = W(d, "removeAttributeNode"), h = W(d, "nextSibling"), g = W(d, "childNodes"), _ = W(d, "parentNode"), ee = W(d, "shadowRoot"), te = W(d, "attributes"), v = o && o.prototype ? W(o.prototype, "nodeType") : null, ne = o && o.prototype ? W(o.prototype, "nodeName") : null, re = o && o.prototype ? W(o.prototype, "ownerDocument") : null, y = function(e) {
		return v ? v(e) : e.nodeType;
	}, b = function(e) {
		return ne ? ne(e) : e.nodeName;
	}, ie = Zt(d, "namespaceURI"), ae = function(e) {
		return ie ? ie(e) : e.namespaceURI;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let x, oe = "", se, ce = !1, le = 0, ue = function() {
		if (le > 0) throw qt("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, S = function(e) {
		ue(), le++;
		try {
			return x.createHTML(e);
		} finally {
			le--;
		}
	}, de = function(e) {
		ue(), le++;
		try {
			return x.createScriptURL(e);
		} finally {
			le--;
		}
	}, fe = function() {
		return ce ||= (se = Dn(u, i), !0), se;
	}, pe = n, me = pe.implementation, he = pe.createNodeIterator, ge = pe.createDocumentFragment, _e = pe.getElementsByTagName, ve = r.importNode, C = On();
	t.isSupported = typeof _t == "function" && typeof _ == "function" && me && me.createHTMLDocument !== void 0;
	let ye = dn, be = fn, xe = pn, Se = mn, w = hn, Ce = _n, we = vn, T = bn, Te = gn, E = null, Ee = H({}, [
		...$t,
		...en,
		...tn,
		...rn,
		...on
	]), D = null, De = H({}, [
		...sn,
		...cn,
		...ln,
		...un
	]), O = Object.seal(St(null, {
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
	})), Oe = null, ke = null, k = Object.seal(St(null, {
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
	})), Ae = !0, je = !0, Me = !1, Ne = !0, Pe = !1, Fe = !0, Ie = !1, Le = !1, A = null, Re = null, ze = !1, Be = !1, j = !1, M = !1, Ve = !0, He = !1, Ue = "user-content-", We = !0, Ge = !1, Ke = null, N = {}, qe = null, Je = H({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Ye = null, Xe = H({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), Ze = null, Qe = H({}, [
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
	]), $e = "http://www.w3.org/1998/Math/MathML", et = "http://www.w3.org/2000/svg", P = "http://www.w3.org/1999/xhtml", tt = P, nt = !1, rt = null, it = H({}, [
		$e,
		et,
		P
	], Lt), at = L([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), ot = H({}, at), F = L(["annotation-xml"]), st = H({}, F), ct = H({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), lt = null, ut = ["application/xhtml+xml", "text/html"], I = null, dt = null, ft = n.createElement("form"), pt = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, mt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (dt && dt === e) return;
		(!e || typeof e != "object") && (e = {}), e = U(e), lt = ut.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, I = lt === "application/xhtml+xml" ? Lt : It, E = kn(e, "ALLOWED_TAGS", Ee, { transform: I }), D = kn(e, "ALLOWED_ATTR", De, { transform: I }), rt = kn(e, "ALLOWED_NAMESPACES", it, { transform: Lt }), Ze = kn(e, "ADD_URI_SAFE_ATTR", Qe, {
			transform: I,
			base: Qe
		}), Ye = kn(e, "ADD_DATA_URI_TAGS", Xe, {
			transform: I,
			base: Xe
		}), qe = kn(e, "FORBID_CONTENTS", Je, { transform: I }), Oe = kn(e, "FORBID_TAGS", U({}), { transform: I }), ke = kn(e, "FORBID_ATTR", U({}), { transform: I }), N = z(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? U(e.USE_PROFILES) : e.USE_PROFILES : !1, Ae = e.ALLOW_ARIA_ATTR !== !1, je = e.ALLOW_DATA_ATTR !== !1, Me = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Ne = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Pe = e.SAFE_FOR_TEMPLATES || !1, Fe = e.SAFE_FOR_XML !== !1, Ie = e.WHOLE_DOCUMENT || !1, Be = e.RETURN_DOM || !1, j = e.RETURN_DOM_FRAGMENT || !1, M = e.RETURN_TRUSTED_TYPE || !1, ze = e.FORCE_BODY || !1, Ve = e.SANITIZE_DOM !== !1, He = e.SANITIZE_NAMED_PROPS || !1, We = e.KEEP_CONTENT !== !1, Ge = e.IN_PLACE || !1, Te = Qt(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : gn, tt = typeof e.NAMESPACE == "string" ? e.NAMESPACE : P, ot = An(e, "MATHML_TEXT_INTEGRATION_POINTS", () => H({}, at)), st = An(e, "HTML_INTEGRATION_POINTS", () => H({}, F));
		let t = An(e, "CUSTOM_ELEMENT_HANDLING", () => St(null));
		if (O = St(null), z(t, "tagNameCheck") && pt(t.tagNameCheck) && (O.tagNameCheck = t.tagNameCheck), z(t, "attributeNameCheck") && pt(t.attributeNameCheck) && (O.attributeNameCheck = t.attributeNameCheck), z(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (O.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), R(O), Pe && (je = !1), j && (Be = !0), N && (E = H({}, on), D = St(null), N.html === !0 && (H(E, $t), H(D, sn)), N.svg === !0 && (H(E, en), H(D, cn), H(D, un)), N.svgFilters === !0 && (H(E, tn), H(D, cn), H(D, un)), N.mathMl === !0 && (H(E, rn), H(D, ln), H(D, un))), k.tagCheck = null, k.attributeCheck = null, z(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? k.tagCheck = e.ADD_TAGS : Mt(e.ADD_TAGS) && (E === Ee && (E = U(E)), H(E, e.ADD_TAGS, I))), z(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? k.attributeCheck = e.ADD_ATTR : Mt(e.ADD_ATTR) && (D === De && (D = U(D)), H(D, e.ADD_ATTR, I))), z(e, "ADD_FORBID_CONTENTS") && Mt(e.ADD_FORBID_CONTENTS) && (qe === Je && (qe = U(qe)), H(qe, e.ADD_FORBID_CONTENTS, I)), We && (E["#text"] = !0), Ie && H(E, [
			"html",
			"head",
			"body"
		]), E.table && (H(E, ["tbody"]), delete Oe.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw qt("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw qt("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = x;
			x = e.TRUSTED_TYPES_POLICY;
			try {
				oe = S("");
			} catch (e) {
				throw x = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (x = void 0, oe = "") : (x === void 0 && (x = fe()), x && typeof oe == "string" && (oe = S("")));
		L && L(e), dt = e;
	}, ht = H({}, [
		...en,
		...tn,
		...nn
	]), gt = H({}, [...rn, ...an]), vt = function(e, t, n) {
		return t.namespaceURI === P ? e === "svg" : t.namespaceURI === $e ? e === "svg" && (n === "annotation-xml" || ot[n]) : !!ht[e];
	}, yt = function(e, t, n) {
		return t.namespaceURI === P ? e === "math" : t.namespaceURI === et ? e === "math" && st[n] : !!gt[e];
	}, bt = function(e, t, n) {
		return t.namespaceURI === et && !st[n] || t.namespaceURI === $e && !ot[n] ? !1 : !gt[e] && (ct[e] || !ht[e]);
	}, xt = function(e) {
		let t = ae(e), n = It(b(e)), r = _(e), i, a;
		return r && y(r) === G.element ? (i = { namespaceURI: ae(r) }, a = It(b(r))) : (i = { namespaceURI: tt }, a = "template"), rt[t] ? t === et ? vt(n, i, a) : t === $e ? yt(n, i, a) : t === P ? bt(n, i, a) : !!(lt === "application/xhtml+xml" && rt[t]) : !1;
	}, Ct = function(e) {
		kt(t.removed, { element: e });
		try {
			_(e).removeChild(e);
		} catch {
			if (p(e), !_(e)) throw qt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, wt = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, Tt = function(e) {
		Gt(e);
		let t = g(e);
		t && Et(At(t), (e) => {
			try {
				p(e);
			} catch {}
		});
		let n = y(e) === G.element ? te(e) : null;
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && wt(e, r, i);
		}
	}, Ht = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		kt(t.removed, {
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
			if (Be || j) try {
				Ct(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, Ut = function(e) {
		let t = te(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || D[I(i)] || wt(e, r, i);
		}
	}, Wt = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = [e];
		for (; r.length > 0;) {
			let e = r.pop();
			if (t(e) === !1) continue;
			if (n && y(e) === G.element) {
				let t = ee(e);
				Bn(t) && r.push(t);
			}
			let i = g(e);
			if (i) for (let e = i.length - 1; e >= 0; --e) r.push(i[e]);
		}
	}, Gt = function(e) {
		Wt(e, (e) => {
			y(e) === G.element && Ut(e);
		});
	}, Kt = function(e) {
		let t = [];
		return Wt(e, (e) => {
			t.push(e);
		}, !0), t;
	}, V = function(e, t) {
		let n = Nt();
		Et(Kt(e), (e) => {
			y(e) === G.element && Pt(n, e);
		}), Et(t, (e) => {
			y(e) === G.element && !Ft(n, e) && Ut(e);
		});
	}, Jt = function(e, n) {
		let r = !1;
		return Et(t.removed, (t) => {
			t.element && (r ||= t.element === e, Gt(t.element));
		}), V(e, n), r;
	}, Yt = function(e, t) {
		let n = Ke, r = null, i = () => (r || (r = Nt(), Et(t, (e) => {
			Pt(r, e);
		})), r);
		for (let t = 0;; t++) {
			let r = Kt(e), a = [e], o = !1;
			if (Et(r, (e) => {
				y(e) === G.documentFragment ? kt(a, e) : !o && !Ft(n, e) && (o = Ft(i(), e));
			}), !o) return;
			if (t >= 8) throw qt("the tree kept changing during in-place sanitization; refusing to return it");
			Et(a, (t, n) => {
				Mn(t, n > 0, e, i());
			});
		}
	}, Mn = function(e, t, n, r) {
		let i = Ln(e), a;
		for (; a = i.nextNode();) Ft(r, a) && !Ft(Ke, a) && (t && J(C.uponSanitizeShadowNode, a, null), qn(a, n), er(a, n), Bn(a.content) && tr(a.content));
	}, Nn = function(e) {
		Ke && Pt(Ke, e);
	}, Pn = function(e, t) {
		return Fe ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, Fn = function(e) {
		Fe && Wt(e, (e) => {
			let t = y(e);
			if (t === G.processingInstruction || t === G.comment && B(Sn, e.data)) {
				try {
					p(e);
				} catch {}
				return !1;
			}
			if (t === G.element) {
				let t = e, n = I(b(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && Pn("for", n) && t.removeAttribute("for");
				} catch {}
			}
			return !0;
		});
	}, In = function(e) {
		let t = null, r = null;
		if (ze) e = "<remove></remove>" + e;
		else {
			let t = Rt(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		lt === "application/xhtml+xml" && tt === P && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = x ? S(e) : e;
		if (tt === P) try {
			t = new l().parseFromString(i, lt);
		} catch {}
		if (!t || !t.documentElement) {
			t = me.createDocument(tt, "template", null);
			try {
				t.documentElement.innerHTML = nt ? oe : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), tt === P ? _e.call(t, Ie ? "html" : "body")[0] : Ie ? t.documentElement : a;
	}, Ln = function(e) {
		let t = re ? re(e) : e.ownerDocument;
		return he.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, K = function(e) {
		return e = zt(e, ye, " "), e = zt(e, be, " "), e = zt(e, xe, " "), e;
	}, Rn = function(e) {
		q(e);
		let t = e.querySelectorAll?.call(e, "template");
		t && Et(t, (e) => {
			Bn(e.content) && Rn(e.content);
		});
	}, q = function(e) {
		e.normalize();
		let t = re ? re(e) : e.ownerDocument, n = he.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = K(r.data), r = n.nextNode();
	}, zn = function(e) {
		let t = ne ? ne(e) : null;
		return typeof t != "string" || I(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== te(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== v(e) || e.childNodes !== g(e);
	}, Bn = function(e) {
		if (!v || typeof e != "object" || !e) return !1;
		try {
			return v(e) === G.documentFragment;
		} catch {
			return !1;
		}
	}, Vn = function(e) {
		if (!v || typeof e != "object" || !e) return !1;
		try {
			return typeof v(e) == "number";
		} catch {
			return !1;
		}
	};
	function J(e, n, r) {
		e.length !== 0 && Et(e, (e) => {
			e.call(t, n, r, dt);
		});
	}
	let Hn = function(e, t) {
		return !!(Fe && e.hasChildNodes() && !Vn(e.firstElementChild) && B(xn, e.textContent) && B(xn, e.innerHTML) || Fe && Tn[t] && y(e) === G.element && ae(e) === P && (Vn(e.firstElementChild) || typeof e.textContent == "string" && B(xn, e.textContent)) || e.nodeType === G.processingInstruction || Fe && e.nodeType === G.comment && B(Sn, e.data));
	}, Un = function(e, t) {
		return e instanceof RegExp ? B(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, Wn = function(e, t, n) {
		if (!Oe[t] && Xn(t) && Un(O.tagNameCheck, t)) return !1;
		if (We && !qe[t] && !qe[It(t)]) {
			let t = _(e), r = g(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return Ct(e), !0;
	}, Gn = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? U(t) : t;
	}, Kn = function(e, t) {
		return e === t || _(e) !== null ? !1 : (Ge && Gt(e), !0);
	}, qn = function(e, n) {
		if (Nn(e), J(C.beforeSanitizeElements, e, null), Kn(e, n)) return !0;
		if (zn(e)) return Ct(e), !0;
		let r = I(b(e));
		if (E = Gn(C.uponSanitizeElement, E, Ee, A), J(C.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: E
		}), Kn(e, n)) return !0;
		if (Hn(e, r)) return Ct(e), !0;
		if (Oe[r] || !(k.tagCheck instanceof Function && k.tagCheck(r)) && !E[r]) {
			let t = Wn(e, r, n);
			return t === !1 && (J(C.afterSanitizeElements, e, null), Kn(e, n)) ? !0 : t;
		}
		if (y(e) === G.element && !xt(e) || (r === "noscript" || r === "noembed" || r === "noframes") && B(Cn, e.innerHTML)) return Ct(e), !0;
		if (Pe && e.nodeType === G.text) {
			let n = K(e.textContent);
			e.textContent !== n && (kt(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return J(C.afterSanitizeElements, e, null), Kn(e, n);
	}, Jn = function(e, t, r) {
		if (ke[t] || Pn(t, e) || Ve && (t === "id" || t === "name") && (r in n || r in ft)) return !1;
		let i = D[t] || k.attributeCheck instanceof Function && k.attributeCheck(t, e);
		return je && B(Se, t) || Ae && B(w, t) ? !0 : i ? Ze[t] || B(Te, zt(r, we, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && Bt(r, "data:") === 0 && Ye[e] || Me && !B(Ce, zt(r, we, "")) ? !0 : !r : Xn(e) && Un(O.tagNameCheck, e) && Un(O.attributeNameCheck, t, e) || t === "is" && O.allowCustomizedBuiltInElements && Un(O.tagNameCheck, r);
	}, Yn = H({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Xn = function(e) {
		return !Yn[It(e)] && B(T, e);
	}, Zn = function(e, t, n, r) {
		if (x && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return S(r);
			case "TrustedScriptURL": return de(r);
		}
		return r;
	}, Qn = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !zn(e) || (Ct(e), !1);
		} catch {
			return Ht(t, e), !1;
		}
	}, $n = function(e, t) {
		return Fe && B(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, t) ? !0 : It(e) === "attributename" && Rt(t, "href") !== null;
	}, er = function(e, n) {
		if (J(C.beforeSanitizeAttributes, e, null), Kn(e, n)) return;
		let r = e.attributes;
		if (!r || zn(e)) return;
		D = Gn(C.uponSanitizeAttribute, D, De, Re);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: D,
			forceKeepAttr: void 0
		}, a = r.length, o = I(e.nodeName);
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = I(s), d = l, f = s === "value" ? d : Vt(d), p = !1;
			i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, J(C.uponSanitizeAttribute, e, i), f = i.attrValue, He && (u === "id" || u === "name") && Bt(f, Ue) !== 0 && (Ht(s, e, n), f = Ue + f, p = !0), $n(s, f) ? Ht(s, e, n) : i.forceKeepAttr || (i.keepAttr ? !Ne && B(wn, f) ? Ht(s, e, n) : (Pe && (f = K(f)), Jn(o, u, f) ? (f = Zn(o, u, c, f), f !== d && Qn(e, s, c, f) && p && Ot(t.removed)) : Ht(s, e, n)) : Ht(s, e, n));
		}
		J(C.afterSanitizeAttributes, e, null), Kn(e, n);
	}, tr = function(e) {
		let t = null, n = Ln(e);
		for (J(C.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (J(C.uponSanitizeShadowNode, t, null), qn(t, e), er(t, e), Bn(t.content) && tr(t.content), y(t) === G.element) {
			let e = ee(t);
			Bn(e) && (nr(e), tr(e));
		}
		Pe && q(e), J(C.afterSanitizeShadowDOM, e, null);
	}, nr = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				tr(e.shadow);
				continue;
			}
			let n = e.node, r = y(n) === G.element, i = g(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = ne ? ne(n) : null;
				if (typeof e == "string" && I(e) === "template") {
					let e = n.content;
					Bn(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = ee(n);
				Bn(e) && t.push({
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
		if (nt = !e, nt && (e = "<!-->"), typeof e != "string" && !Vn(e) && (e = Xt(e), typeof e != "string")) throw qt("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Le ? (E = A, D = Re) : mt(n), (C.uponSanitizeElement.length > 0 || C.uponSanitizeAttribute.length > 0) && (E = U(E)), C.uponSanitizeAttribute.length > 0 && (D = U(D)), t.removed = [];
		let c = Ge && typeof e != "string" && Vn(e), l = [], u = Ke;
		if (c) {
			Fn(e);
			let t = b(e);
			if (typeof t == "string") {
				let n = I(t);
				if (!E[n] || Oe[n]) throw Tt(e), qt("root node is forbidden and cannot be sanitized in-place");
			}
			if (zn(e)) throw Tt(e), qt("root node is clobbered and cannot be sanitized in-place");
			l = Kt(e), Ke = Nt();
		} else if (Vn(e)) i = In("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === G.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), nr(i);
		else {
			if (!Be && !Pe && !Ie && e.indexOf("<") === -1) return x && M ? S(e) : e;
			if (i = In(e), !i) return Be ? null : M ? oe : "";
		}
		i && ze && Ct(i.firstChild);
		let d = c ? e : i;
		try {
			c && nr(e);
			let t = Ln(d);
			for (; o = t.nextNode();) qn(o, d), er(o, d), Bn(o.content) && tr(o.content);
			c && Yt(e, l);
		} catch (t) {
			throw c && (Tt(e), Jt(e, l)), t;
		} finally {
			Ke = u;
		}
		if (c) {
			if (Jt(e, l)) throw qt("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return Pe && Rn(e), e;
		}
		if (Be) {
			if (Pe && Rn(i), j) for (s = ge.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (D.shadowroot || D.shadowrootmode) && (s = ve.call(r, s, !0)), s;
		}
		let f = Ie ? i.outerHTML : i.innerHTML;
		return Ie && E["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && B(yn, i.ownerDocument.doctype.name) && (f = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + f), Pe && (f = K(f)), x && M ? S(f) : f;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		mt(e), Le = !0, A = E, Re = D;
	}, t.clearConfig = function() {
		dt = null, Le = !1, A = null, Re = null, x = se, oe = "";
	}, t.isValidAttribute = function(e, t, n) {
		dt || mt({});
		let r = I(e), i = I(t);
		return typeof n == "string" && ($n(t, n) || !Ne && B(wn, n)) ? !1 : Jn(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && z(C, e) && kt(C[e], t);
	}, t.removeHook = function(e, t) {
		if (z(C, e)) {
			if (t !== void 0) {
				let n = Dt(C[e], t);
				return n === -1 ? void 0 : jt(C[e], n, 1)[0];
			}
			return Ot(C[e]);
		}
	}, t.removeHooks = function(e) {
		z(C, e) && (C[e] = []);
	}, t.removeAllHooks = function() {
		C = On();
	}, t;
}
var Mn = jn();
//#endregion
//#region node_modules/marked/lib/marked.esm.js
function Nn() {
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
var Pn = Nn();
function Fn(e) {
	Pn = e;
}
var In = { exec: () => null };
function Ln(e) {
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
var Rn = ((e = "") => {
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
	nextBulletRegex: Ln((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: Ln((e) => RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: Ln((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: Ln((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: Ln((e) => RegExp(`^ {0,${e}}(?:</?(?:${Qn})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")),
	blockquoteBeginRegex: Ln((e) => RegExp(`^ {0,${e}}>`))
}, zn = /^(?:[ \t]*(?:\n|$))+/, Bn = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Vn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, J = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Hn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Un = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Wn = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Gn = K(Wn).replace(/bull/g, Un).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Kn = K(Wn).replace(/bull/g, Un).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), qn = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, Jn = /^[^\n]+/, Yn = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Xn = K(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Yn).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Zn = K(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Un).getRegex(), Qn = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", $n = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, er = K("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", $n).replace("tag", Qn).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), tr = (e) => K(qn).replace("hr", J).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Qn).getRegex(), nr = tr(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), rr = tr(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), ir = {
	blockquote: K(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", rr).getRegex(),
	code: Bn,
	def: Xn,
	fences: Vn,
	heading: Hn,
	hr: J,
	html: er,
	lheading: Gn,
	list: Zn,
	newline: zn,
	paragraph: nr,
	table: In,
	text: Jn
}, ar = K("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", J).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Qn).getRegex(), or = {
	...ir,
	lheading: Kn,
	table: ar,
	paragraph: K(qn).replace("hr", J).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ar).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Qn).getRegex()
}, sr = {
	...ir,
	html: K("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", $n).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: In,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: K(qn).replace("hr", J).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Gn).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, cr = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, lr = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ur = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, dr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, fr = /[\p{P}\p{S}]/u, pr = /[\s\p{P}\p{S}]/u, mr = /[^\s\p{P}\p{S}]/u, hr = K(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, pr).getRegex(), gr = /[\p{Pi}\p{Ps}"']/u, _r = /(?!~)[\p{P}\p{S}]/u, vr = /(?!~)[\s\p{P}\p{S}]/u, yr = /(?:[^\s\p{P}\p{S}]|~)/u, br = K(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Rn ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), xr = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, Sr = K(xr, "u").replace(/punct/g, fr).getRegex(), Cr = K(xr, "u").replace(/punct/g, _r).getRegex(), wr = K(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, gr).replace(/punct/g, fr).getRegex(), Tr = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Er = K(Tr, "gu").replace(/notPunctSpace/g, mr).replace(/punctSpace/g, pr).replace(/punct/g, fr).getRegex(), Dr = K(Tr, "gu").replace(/notPunctSpace/g, yr).replace(/punctSpace/g, vr).replace(/punct/g, _r).getRegex(), Or = K("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, mr).replace(/punctSpace/g, pr).replace(/punct/g, fr).getRegex(), kr = K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, mr).replace(/punctSpace/g, pr).replace(/punct/g, fr).getRegex(), Ar = K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, mr).replace(/punctSpace/g, pr).replace(/punct/g, fr).getRegex(), jr = K(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, fr).getRegex(), Mr = K("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, mr).replace(/punctSpace/g, pr).replace(/punct/g, fr).getRegex(), Nr = K(/\\(punct)/, "gu").replace(/punct/g, fr).getRegex(), Pr = K(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, fr).getRegex(), Fr = K(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ir = K($n).replace("(?:-->|$)", "-->").getRegex(), Lr = K("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ir).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Rr = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, zr = K(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Rr).getRegex(), Br = K(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", zr).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Vr = K(/^!?\[(label)\]\[(ref)\]/).replace("label", zr).replace("ref", Yn).getRegex(), Hr = K(/^!?\[(ref)\](?:\[\])?/).replace("ref", Yn).getRegex(), Ur = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, Wr = K(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Rr).getRegex(), Gr = K("reflink|nolink(?!\\()", "g").replace("reflink", K(/^!?\[(label)\]\[(ref)\]/).replace("label", Wr).replace("ref", Ur).getRegex()).replace("nolink", K(/^!?\[(ref)\](?:\[\])?/).replace("ref", Ur).getRegex()).getRegex(), Kr = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, qr = K(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), Jr = {
	_backpedal: In,
	anyPunctuation: Nr,
	anyPunctuationOutsideCode: Pr,
	autolink: Fr,
	blockSkip: br,
	br: ur,
	code: lr,
	del: In,
	delLDelim: In,
	delRDelim: In,
	emStrongLDelim: Sr,
	emStrongRDelimAst: Er,
	emStrongRDelimUnd: kr,
	escape: cr,
	link: Br,
	nolink: Hr,
	punctuation: hr,
	reflink: Vr,
	reflinkSearch: Gr,
	tag: Lr,
	text: dr,
	url: In
}, Yr = {
	...Jr,
	emStrongLDelim: wr,
	emStrongRDelimAst: Or,
	emStrongRDelimUnd: Ar,
	link: K(/^!?\[(label)\]\((.*?)\)/).replace("label", zr).getRegex(),
	reflink: K(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", zr).getRegex()
}, Xr = {
	...Jr,
	emStrongRDelimAst: Dr,
	emStrongLDelim: Cr,
	delLDelim: jr,
	delRDelim: Mr,
	url: K(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", qr).replace("protocol", Kr).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: K(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", Kr).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex()
}, Zr = {
	...Xr,
	br: K(ur).replace("{2,}", "*").getRegex(),
	text: K(Xr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Qr = {
	normal: ir,
	gfm: or,
	pedantic: sr
}, $r = {
	normal: Jr,
	gfm: Xr,
	breaks: Zr,
	pedantic: Yr
}, ei = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, ti = (e) => ei[e];
function Y(e, t) {
	if (t) {
		if (q.escapeTest.test(e)) return e.replace(q.escapeReplace, ti);
	} else if (q.escapeTestNoEncode.test(e)) return e.replace(q.escapeReplaceNoEncode, ti);
	return e;
}
function ni(e) {
	return q.numericCharacterReference.test(e) ? e.replace(q.numericCharacterReferenceOrAmpersand, (e, t, n) => {
		if (t === void 0 && n === void 0) return "&amp;";
		let r = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
		return r === 0 || r > 1114111 || r >= 55296 && r <= 57343 ? "�" : r === 38 ? "&amp;" : String.fromCodePoint(r);
	}) : e;
}
function ri(e) {
	try {
		e = encodeURI(e).replace(q.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function ii(e, t) {
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
function ai(e, t, n) {
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
function oi(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && q.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function si(e) {
	return e.trim().toLowerCase().toUpperCase().toLowerCase();
}
function ci(e, t) {
	if (e.indexOf(t[0]) === -1 && e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function li(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function ui(e, t, n, r, i) {
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
function di(e, t, n) {
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
function fi(e, t, n, r) {
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
var pi = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || Pn;
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
			let e = this.options.pedantic ? t[0] : oi(t[0]);
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
			let e = t[0], n = di(e, t[3] || "", this.rules);
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
				let t = ai(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceTabChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: ai(t[0], "\n"),
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
			raw: ai(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = ai(t[0], "\n").split("\n"), n = "", r = "", i = [];
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
				let u = t[2].split("\n", 1)[0], d = t[1].length, f = this.options.pedantic ? li(u, d) : u.replace(this.rules.other.leadingSpaceTab, (e) => li(e, d)), p = e.split("\n", 1)[0], m = !f.trim(), h = 0;
				if (this.options.pedantic ? (h = 2, a = f.trimStart()) : m ? h = d + 1 : (h = f.search(this.rules.other.nonSpaceChar), h = h > 4 ? 1 : h, a = f.slice(h), h += d), m && this.rules.other.blankLine.test(p) && (e = e.substring(p.length + 1), i = !0), !i) {
					let t = this.rules.other.nextBulletRegex(h), n = this.rules.other.hrRegex(h), r = this.rules.other.fencesBeginRegex(h), i = this.rules.other.headingBeginRegex(h), o = this.rules.other.htmlBeginRegex(h), s = this.rules.other.blockquoteBeginRegex(h);
					for (; e;) {
						let c = e.split("\n", 1)[0], l;
						if (p = c, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), l = p) : l = p.replace(this.rules.other.leadingSpaceTab, (e) => li(e)), r.test(p) || i.test(p) || o.test(p) || s.test(p) || t.test(p) || n.test(p)) break;
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
			let e = oi(t[0]);
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
			if (!this.rules.other.startAngleBracket.test(t[2]) && ci(t[2], "()") !== -1) return;
			let e = si(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: ai(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = ii(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: ai(t[0], "\n"),
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
			for (let e of i) a.rows.push(ii(e, a.header.length).map((e, t) => ({
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
				raw: ai(t[0], "\n"),
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
			if (!this.options.pedantic && fi(e, t[1], n, this.rules)) return;
			let r = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
				if (!this.rules.other.endAngleBracket.test(r)) return;
				let e = ai(r.slice(0, -1), "\\");
				if ((r.length - e.length) % 2 == 0) return;
			} else {
				let e = ci(t[2], "()");
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
			return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (i = this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? i.slice(1) : i.slice(1, -1)), ui(t, {
				href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
				title: a && a.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let r = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && fi(e, n[1], r, this.rules)) return;
			let i = t[si((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
			if (!i) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return ui(n, i, n[0], this.lexer, this.rules);
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
				text: e ? t[0] : ni(t[0]),
				escaped: e
			};
		}
	}
}, X = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || Pn, this.options.tokenizer = this.options.tokenizer || new pi(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			linkParenPossible: !0,
			top: !0
		};
		let t = {
			other: q,
			block: Qr.normal,
			inline: $r.normal
		};
		this.options.pedantic ? (t.block = Qr.pedantic, t.inline = $r.pedantic) : this.options.gfm && (t.block = Qr.gfm, t.inline = this.options.breaks ? $r.breaks : $r.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: Qr,
			inline: $r
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
			if (e.charAt(0) !== "!" && Object.hasOwn(this.tokens.links, si(e.slice(n + 1, -1))) && !(n > 1 && this.linkInText(e.slice(1, n - 1)))) return !0;
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
				if (!Object.hasOwn(this.tokens.links, si(n.slice(r + 1, -1)))) return n;
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
}, mi = class {
	options;
	parser;
	constructor(e) {
		this.options = e || Pn;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(q.notSpaceStart)?.[0], i = e ? e.replace(q.endingNewline, "") + "\n" : "";
		return r ? "<pre><code class=\"language-" + Y(r) + "\">" + (n ? i : Y(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : Y(i, !0)) + "</code></pre>\n";
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
		return `<code>${Y(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: r, autolink: i }) {
		let a = i ? Y(n, !0) : this.parser.parseInline(r), o = ri(e);
		if (o === null) return a;
		e = Y(o, i);
		let s = "<a href=\"" + e + "\"";
		return t && (s += " title=\"" + Y(t) + "\""), s += ">" + a + "</a>", s;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = ri(e);
		if (i === null) return Y(n);
		e = i;
		let a = `<img src="${Y(e)}" alt="${Y(n)}"`;
		return t && (a += ` title="${Y(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Y(e.text);
	}
}, hi = class {
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
}, gi = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || Pn, this.options.renderer = this.options.renderer || new mi(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new hi();
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
}, _i = class {
	options;
	block;
	constructor(e) {
		this.options = e || Pn;
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
		return e ? X.lex : X.lexInline;
	}
	provideParser(e = this.block) {
		return e ? gi.parse : gi.parseInline;
	}
};
function vi(e, t) {
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e.push(t[n]);
	else e.push(t);
}
var yi = class {
	defaults = Nn();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = gi;
	Renderer = mi;
	TextRenderer = hi;
	Lexer = X;
	Tokenizer = pi;
	Hooks = _i;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (vi(n, t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) vi(n, this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) vi(n, this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				vi(n, this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					vi(n, this.walkTokens(i, t));
				}) : e.tokens && vi(n, this.walkTokens(e.tokens, t));
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
				let t = this.defaults.renderer || new mi(this.defaults);
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
				let t = this.defaults.tokenizer || new pi(this.defaults);
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
				let t = this.defaults.hooks || new _i();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = _i.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && _i.passThroughHooksRespectAsync.has(n)) return (async () => {
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
					return n.push(r.call(this, e)), t && vi(n, t.call(this, e)), n;
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
		return X.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return gi.parse(e, t ?? this.defaults);
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
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? X.lex : X.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? gi.parse : gi.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? X.lex : X.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? gi.parse : gi.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + Y(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}, bi = new yi();
function Z(e, t) {
	return bi.parse(e, t);
}
Z.options = Z.setOptions = function(e) {
	return bi.setOptions(e), Z.defaults = bi.defaults, Fn(Z.defaults), Z;
}, Z.getDefaults = Nn, Z.defaults = Pn;
function xi(...e) {
	return bi.use(...e), Z.defaults = bi.defaults, Fn(Z.defaults), Z;
}
Z.use = xi, Z.walkTokens = function(e, t) {
	return bi.walkTokens(e, t);
}, Z.parseInline = bi.parseInline, Z.Parser = gi, Z.parser = gi.parse, Z.Renderer = mi, Z.TextRenderer = hi, Z.Lexer = X, Z.lexer = X.lex, Z.Tokenizer = pi, Z.Hooks = _i, Z.parse = Z, Z.options, Z.setOptions, Z.walkTokens, Z.parseInline, gi.parse, X.lex;
//#endregion
//#region src/markdown.ts
var Si = new yi({
	gfm: !0,
	breaks: !0,
	async: !1
});
Mn.addHook("afterSanitizeAttributes", (e) => {
	e.tagName === "A" && (e.setAttribute("target", "_blank"), e.setAttribute("rel", "noopener noreferrer"));
});
var Ci = /* @__PURE__ */ new Map();
function wi(e, t = !0) {
	if (t) {
		let t = Ci.get(e);
		if (t !== void 0) return t;
	}
	let n = Mn.sanitize(Si.parse(e), {
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
	return t && (Ci.size > 300 && Ci.clear(), Ci.set(e, n)), n;
}
//#endregion
//#region node_modules/tiny-markdown-editor/lib/grammar.js
var Ti = /* @__PURE__ */ e(((e) => {
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
})), Ei = (/* @__PURE__ */ e(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Editor = void 0;
	var t = Ti();
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
})))(), Di = Ti();
function Oi(e, t) {
	try {
		return new Ii(e, t);
	} catch (n) {
		return console.warn("llm-agent: Markdown editor did not start, using a plain box", n), new ki(e, t);
	}
}
var ki = class {
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
function Ai(e) {
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
function ji(e) {
	return !(e instanceof ShadowRoot) || typeof e.getSelection == "function" || typeof Selection.prototype.getComposedRanges == "function";
}
var Mi = class extends Ei.Editor {
	getSelection(e = !1) {
		let t = this, n = Ai(t.e.getRootNode()), r = e ? n?.anchorNode : n?.focusNode;
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
}, Ni = /^ {0,3}(`{3,}|~{3,})/;
function Pi(e, t) {
	let n = !1;
	for (let r of e.slice(0, t).split("\n").slice(0, -1)) Ni.test(r) && (n = !n);
	return n;
}
var Fi = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Ii = class {
	#e;
	#t;
	#n = !1;
	#r = "";
	#i = !0;
	#a = "";
	constructor(e, t) {
		this.source = e;
		let n = e.getRootNode();
		if (!ji(n)) throw Error("this browser cannot read a caret inside a shadow root");
		let r = document.createElement("div");
		r.className = "box", r.setAttribute("role", "textbox"), r.setAttribute("aria-multiline", "true"), r.addEventListener("keydown", t.onKey), r.addEventListener("paste", (e) => {
			t.onPaste(e), e.defaultPrevented && e.stopImmediatePropagation();
		}), r.addEventListener("blur", t.onBlur), r.addEventListener("focus", () => this.#i = !1);
		let i = n instanceof ShadowRoot ? n.host : null;
		i?.addEventListener("keydown", this.#s), this.#t = i, e.after(r);
		try {
			this.#e = new Mi({
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
		let r = t.lastIndexOf("\n", n - 2) + 1, i = Ni.exec(t.slice(r, n - 1));
		i && !Pi(t, r) && (t.slice(n).split("\n").some((e) => Ni.test(e)) || (this.value = `${t.slice(0, n)}\n${i[1]}\n${t.slice(n)}`, this.setSelectionRange(n, n)));
	}
	#s = (e) => {
		let t = e;
		t.ctrlKey || t.altKey || t.metaKey || t.composedPath()[0] === this.el && t.stopPropagation();
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
			n.customInlineGrammar = {}, n.mergedInlineGrammar = Di.inlineGrammar;
			return;
		}
		let r = [...e].sort((e, t) => t.length - e.length).map(Fi), i = {
			regexp: RegExp(`^(@(?:${r.join("|")}))`),
			replacement: "<span class=\"TMMention\">$1</span>"
		};
		n.customInlineGrammar = { mention: i }, n.mergedInlineGrammar = {
			...Di.inlineGrammar,
			mention: i
		};
	}
	setPlaceholder(e) {
		this.el.getAttribute("data-placeholder") !== e && (this.el.setAttribute("data-placeholder", e), this.el.setAttribute("aria-label", e));
	}
	destroy() {
		this.#t?.removeEventListener("keydown", this.#s), this.#e.destroy(), this.el.remove();
	}
}, Li = /device_id:[0-9a-f]{32} \(([^()\n]+)\)|area_id:([a-z0-9_]+)|\b([a-z_]+\.[a-z0-9_]+)\b/g;
function Ri(e, t, n, r) {
	if (t !== void 0) return t;
	if (n !== void 0) return e?.areas?.[n]?.name ?? n;
	let i = r === void 0 ? void 0 : e?.states?.[r];
	if (i) return i.attributes.friendly_name || i.entity_id;
}
var zi = class {
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
		return e.replace(Li, (e, n, r, i) => {
			let a = Ri(t, n, r, i);
			return a === void 0 ? e : `@${this.add(a, e)}`;
		});
	}
	expand(e) {
		let t = [...this.byLabel.keys()].sort((e, t) => t.length - e.length);
		for (let n of t) e = e.split(`@${n}`).join(this.byLabel.get(n));
		return e;
	}
}, Bi = /* @__PURE__ */ new Map();
function Vi(e, t) {
	let n = Bi.get(e);
	if (n !== void 0) return n;
	let r = document.createElement("template");
	r.innerHTML = e;
	let i = document.createTreeWalker(r.content, NodeFilter.SHOW_TEXT), a = [];
	for (let e = i.nextNode(); e; e = i.nextNode()) a.push(e);
	for (let e of a) {
		if (e.parentElement?.closest("code, pre, a")) continue;
		let n = e.data, r = document.createDocumentFragment(), i = 0;
		for (let e of n.matchAll(Li)) {
			let a = Ri(t, e[1], e[2], e[3]);
			if (a === void 0) continue;
			r.append(n.slice(i, e.index));
			let o = document.createElement("span");
			o.className = "chip", o.title = e[0], o.textContent = a, r.append(o), i = e.index + e[0].length;
		}
		i !== 0 && (r.append(n.slice(i)), e.replaceWith(r));
	}
	let o = r.innerHTML;
	return Bi.size > 300 && Bi.clear(), Bi.set(e, o), o;
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
var Hi = /* @__PURE__ */ new Set([
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
]), Ui = /* @__PURE__ */ new Set([
	"horizontal-stack",
	"vertical-stack",
	"grid"
]), Wi = /* @__PURE__ */ new Set(["section", "divider"]), Gi = /\\|\/\/|url\s*\(|\{\{|\{%|\[\[\[|<|custom:|javascript:|data:/i, Ki = /* @__PURE__ */ new Set([
	"card_mod",
	"style",
	"image",
	"image_entity",
	"camera_image"
]);
function qi(e, t = 0) {
	return t > 20 ? !1 : typeof e == "string" ? !Gi.test(e) : Array.isArray(e) ? e.every((e) => qi(e, t + 1)) : e && typeof e == "object" ? Object.entries(e).every(([e, n]) => !Ki.has(e) && !Gi.test(e) && qi(n, t + 1)) : !0;
}
function Ji(e) {
	let t = [...e.cards ?? []];
	for (let n of e.sections ?? []) t.push(...n.cards ?? []);
	return t.filter((e) => e && typeof e == "object");
}
async function Yi() {
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
function Xi(e, t = 0) {
	if (!e || typeof e != "object" || t > 5) return !1;
	let n = e.type;
	if (typeof n != "string") return !1;
	if (Ui.has(n)) {
		let { cards: n, ...r } = e;
		return Array.isArray(n) && n.every((e) => Xi(e, t + 1)) && qi(r);
	}
	if (!Hi.has(n)) return !1;
	let r = e.entities;
	return Array.isArray(r) && !r.every((e) => typeof e == "string" || e && typeof e == "object" && (!("type" in e) || Wi.has(String(e.type)))) ? !1 : qi(e);
}
var Zi = class extends A {
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
				let t = await Yi();
				if (!t) throw Error("card helpers aren't available");
				for (let n of Ji(e).slice(0, 40)) {
					if (!Xi(n)) {
						this.skipped++;
						continue;
					}
					let e = t.createCardElement(n);
					e.hass = this.hass, this.cards.push(e);
				}
				this.error = "";
			} catch (e) {
				this.error = F("preview_unavailable", { error: e.message });
			}
			this.requestUpdate();
		}
	}
	render() {
		return this.views.length ? w`
      ${this.views.length > 1 ? w`<div class="tabs">
              ${this.views.map((e, t) => w`<button
                    class=${t === this.view ? "on" : ""}
                    @click=${() => this.view = t}
                  >
                    ${e.title || e.path || F("preview_view", { n: t + 1 })}
                  </button>`)}
            </div>` : T}
      ${this.error ? w`<p class="note">${this.error}</p>` : T}
      <div class="grid" inert>${this.cards}</div>
      ${this.skipped ? w`<p class="note">
              ${this.skipped > 1 ? F("preview_skipped_n", { count: this.skipped }) : F("preview_skipped_one")}
            </p>` : T}
    ` : w`<p class="note">${F("preview_no_views")}</p>`;
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
Q([j({ attribute: !1 })], Zi.prototype, "hass", void 0), Q([j({ attribute: !1 })], Zi.prototype, "config", void 0), Q([M()], Zi.prototype, "view", void 0), Q([M()], Zi.prototype, "error", void 0), customElements.get("llm-dashboard-preview") || customElements.define("llm-dashboard-preview", Zi);
//#endregion
//#region src/styles.ts
var Qi = s`
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
    min-height: calc(3em + 10px);
    max-height: 50vh;
    max-height: 50dvh;
    overflow-y: auto;
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
`, $i = {
	asked: "changes_asked",
	auto: "changes_auto",
	rule: "changes_rule",
	reviewer: "reviewer_approved",
	denied: "denied"
}, ea = (e) => e.message ?? String(e), ta = class extends A {
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
		this.styles = [Qi, s`:host{flex:1;min-height:0;height:auto;overflow-y:auto;background:none;container-type:inline-size}
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
				since: n.from ? na(n.from, 0, this.zone) : null,
				until: n.to ? na(n.to, 1, this.zone) - .001 : null,
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
			a = { error: ea(e) };
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
		if (confirm(F("confirm_undo", { name: e.detail || e.tool }))) {
			try {
				await this.hass.connection.sendMessagePromise({
					type: "llm_agent/undo",
					snapshot_id: e.snapshot_id,
					...e.conversation_id ? { conversation_id: e.conversation_id } : {}
				});
			} catch (e) {
				this.s = {
					...this.s,
					error: ea(e)
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
		let { s: e } = this, t = (e, t) => w`<option value=${e}>${t}</option>`;
		return w`<div class="bar">
<input type="date" aria-label=${F("changes_from")} title=${F("changes_from")} @change=${this.set("from")}>
<input type="date" aria-label=${F("changes_to")} title=${F("changes_to")} @change=${this.set("to")}>
<select aria-label=${F("conversation")} @change=${this.set("chat")}>${t("", F("changes_all_chats"))}${e.chats?.map((e) => t(e.id, e.title || F("new_chat")))}</select>
<select aria-label=${F("changes_user")} @change=${this.set("user")}>${t("", F("changes_everyone"))}${e.users?.map((e) => t(e.id, e.name))}</select>
<input type="search" placeholder=${F("changes_search")} aria-label=${F("changes_search")} @input=${this.set("text")}>
</div>${e.error ? w`<div class="empty">${F("changes_error", { error: e.error })}</div>` : !e.loading && !e.changes.length ? w`<div class="empty">${F("changes_none")}</div>` : T}${e.changes.map((e) => this.row(e))}${e.cursor ? w`<div class="more"><button class="small" ?disabled=${e.loading} @click=${() => this.load(!0)}>${F("changes_more")}</button></div>` : T}`;
	}
	row(e) {
		let t = `tool_${e.tool}`, n = (e, t = !1, n = "") => w`<span class="tag ${t ? "bad" : ""}" title=${n}>${e}</span>`;
		return w`<div class="row"><span class="t">${this.fmt(e.time)}</span><span class="c">${e.conversation_id ? w`<button class="link" @click=${() => this.dispatchEvent(new CustomEvent("open-chat", { detail: e.conversation_id }))}>${e.chat_title ?? F("changes_deleted_chat")}</button>` : T}</span><span class="u">${e.user_name ?? (e.user_id ? e.user_id.slice(0, 8) : F("changes_no_user"))}</span>
<div class="w"><b class="what">${st(t) ? F(t) : e.tool.replace(/_/g, " ")}</b><code title=${e.args}>${e.args}</code></div>
<div class="o">${e.approval ? n(F($i[e.approval]), e.approval === "denied") : T}${e.approval === "denied" ? T : n(e.ok ? F("done") : F("failed"), !e.ok)}<span>${e.detail}</span>${e.undo === "undone" ? n(F("undone")) : T}${e.undo === "gone" ? n(F("changes_undo_gone"), !1, F("changes_undo_gone_title")) : T}${e.undo === "available" ? w`<button class="ghost small" title=${F("undo_title")} @click=${() => this.undo(e)}>${F("undo")}</button>` : T}</div></div>`;
	}
};
Q([j({ attribute: !1 })], ta.prototype, "hass", void 0), Q([M()], ta.prototype, "s", void 0);
function na(e, t, n) {
	let [r, i, a] = e.split("-").map(Number);
	if (!n) return new Date(r, i - 1, a + t).getTime() / 1e3;
	let o = Date.UTC(r, i - 1, a + t);
	return (o - ra(o - ra(o, n), n)) / 1e3;
}
function ra(e, t) {
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
customElements.define("llm-agent-changes", ta);
//#endregion
//#region src/notes.ts
var ia = class extends A {
	constructor(...e) {
		super(...e), this.s = {
			kb: !1,
			del: "",
			error: ""
		};
	}
	static {
		this.styles = [Qi, s`:host{flex:1;min-height:0;height:auto;overflow-y:auto;background:none}
.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}
.bar span{flex:1;text-align:end}
.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}
.off>div{opacity:.55}
.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}
.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}
.ed button{flex:none}
.err{color:var(--danger)}`];
	}
	connectedCallback() {
		super.connectedCallback(), this.call("");
	}
	async call(e, t = {}) {
		let n = this.hass.connection, r = (e, t = {}) => n.sendMessagePromise({
			type: "llm_agent/home_notes" + e,
			...t
		});
		try {
			this.s = {
				...this.s,
				d: await r(e, t),
				edit: void 0,
				del: "",
				error: ""
			};
		} catch (e) {
			let t = e;
			this.s = {
				...this.s,
				error: t.message ?? String(e)
			}, t.code === "changed" && (this.s = {
				...this.s,
				d: await r(""),
				edit: void 0,
				del: ""
			});
		}
	}
	change(e, t, n = {}) {
		return this.call(e, {
			kind: this.s.kb ? "knowledge" : "note",
			...t.id ? {
				item_id: t.id,
				base: t.updated
			} : {},
			...n
		});
	}
	set(e) {
		return (t) => {
			Object.assign(this.s.edit, { [e]: t.target.value });
		};
	}
	render() {
		let { d: e, kb: t, edit: n, error: r } = this.s, i = (t ? e?.knowledge : e?.notes) ?? [], a = (e, n) => w`<button class="small" role="tab" aria-selected=${e === t} @click=${() => this.s = {
			...this.s,
			kb: e,
			edit: void 0,
			del: "",
			error: ""
		}}>${F(n)}</button>`;
		return w`<div class="bar" role="tablist">${a(!1, "notes_tab")}${a(!0, "knowledge_tab")}<span>${t || !e ? "" : F("characters_left", { count: e.room })}</span>
<button class="small primary" @click=${() => this.s = {
			...this.s,
			edit: {
				id: "",
				text: "",
				title: "",
				summary: "",
				body: ""
			}
		}}>${F("add")}</button></div>
<p>${F(t ? "knowledge_hint" : "notes_hint")}</p>${r ? w`<p class="err">${r}</p>` : T}${n && !n.id ? this.editor(n) : T}${e && !i.length && !n ? w`<div class="empty">${F("notes_none")}</div>` : T}${i.map((e) => n?.id === e.id ? this.editor(n) : this.row(e))}`;
	}
	row(e) {
		let t = (e, t, n = "ghost") => w`<button class="small ${n}" @click=${t}>${F(e)}</button>`, n = this.s.del === e.id;
		return w`<div class="row ${e.enabled ? "" : "off"}"><input type="checkbox" aria-label=${F("note_enabled")} title=${F("note_enabled")} .checked=${!!e.enabled} @change=${() => this.change("/save", e, { enabled: !e.enabled })}>
<div>${this.s.kb ? w`<b>${e.title}</b> ${e.summary}` : e.text} ${e.added_by === "agent" ? w`<span class="tag">${F("note_from_ai")}</span>` : T}</div>${n ? w`<span class="err">${F("delete_confirm")}</span>${t("delete", () => this.change("/delete", e), "danger")}${t("cancel", () => this.s = {
			...this.s,
			del: ""
		})}` : w`${t("edit", () => this.s = {
			...this.s,
			edit: { ...e },
			del: "",
			error: ""
		})}${t("delete", () => this.s = {
			...this.s,
			del: e.id
		})}`}</div>`;
	}
	editor(e) {
		return w`<div class="row ed">${this.s.kb ? w`<input aria-label=${F("knowledge_title")} placeholder=${F("knowledge_title")} maxlength="80" .value=${e.title ?? ""} @input=${this.set("title")}>
<input aria-label=${F("knowledge_summary")} placeholder=${F("knowledge_summary")} maxlength="200" .value=${e.summary ?? ""} @input=${this.set("summary")}>
<textarea rows="14" aria-label=${F("knowledge_body")} placeholder=${F("knowledge_body")} maxlength="20000" .value=${e.body ?? ""} @input=${this.set("body")}></textarea>` : w`<textarea rows="2" aria-label=${F("home_notes")} placeholder=${F("notes_placeholder")} maxlength=${this.s.d?.note_max ?? 300} .value=${e.text ?? ""} @input=${this.set("text")}></textarea>`}
<button class="small primary" @click=${() => this.change("/save", e, this.s.kb ? {
			title: e.title,
			summary: e.summary,
			body: e.body
		} : { text: e.text })}>${F("save")}</button><button class="small ghost" @click=${() => this.s = {
			...this.s,
			edit: void 0
		}}>${F("cancel")}</button></div>`;
	}
};
Q([j({ attribute: !1 })], ia.prototype, "hass", void 0), Q([M()], ia.prototype, "s", void 0), customElements.define("llm-agent-notes", ia);
//#endregion
//#region src/usage.ts
var aa = (e) => e.message ?? String(e), oa = class extends A {
	constructor(...e) {
		super(...e), this.s = {
			days: 30,
			error: ""
		}, this.gen = 0;
	}
	static {
		this.styles = [Qi, s`:host{flex:1;min-height:0;height:auto;overflow-y:auto;background:none;container-type:inline-size}
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
				error: aa(e)
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
		let { u: e, b: t, days: n, error: r } = this.s, i = (e) => w`<button class="small" role="tab" aria-selected=${n === e} @click=${() => this.load(e)}>${F("usage_days", { n: e })}</button>`;
		return w`<div class="bar" role="tablist">${i(7)}${i(30)}${i(90)}</div>${r ? w`<p class="err">${F("usage_error", { error: r })}</p>` : T}${e ? this.body(e) : T}${t?.map((e) => this.balance(e))}`;
	}
	body(e) {
		let t = (e, t) => w`<div>${e}<b>${this.money(t)}</b></div>`, n = e.cap > 0 ? Math.round(e.cap_used / e.cap * 100) : 0;
		return w`<div class="tot">${t(F("usage_today"), e.totals.today)}${t(F("usage_week"), e.totals.week)}${t(F("usage_month"), e.totals.month)}</div>${e.cap > 0 ? w`<p>${F("usage_cap", {
			cap: this.money(e.cap),
			used: this.money(e.cap_used),
			pct: n
		})}</p>` : T}${this.chart(e.series)}<p>${e.since ? F("usage_since", { date: this.date(e.since) }) : F("usage_none")} ${F("usage_estimate")}</p>${e.breakdown.length ? this.table(e.breakdown) : T}`;
	}
	chart(e) {
		let t = Math.max(...e.map((e) => e.cost), 0), n = e.length;
		return w`<div class="ch" aria-label=${F("usage_chart")}>${F("usage_chart")}: ${this.money(t)}<svg viewBox="0 0 ${n * 10} 100" preserveAspectRatio="none" role="img" aria-label=${F("usage_chart")}>${e.map((e, n) => {
			let r = t > 0 && e.cost > 0 ? Math.max(e.cost / t * 100, 1.5) : 0;
			return Ce`<g><title>${this.date(e.day)}: ${this.money(e.cost)}</title><rect class="h" x=${n * 10} y="0" width="10" height="100"></rect><rect class="b" x=${n * 10 + 1.5} y=${100 - r} width="7" height=${r}></rect></g>`;
		})}</svg><div class="ax"><span>${this.date(e[0].day)}</span><span>${this.date(e[n - 1].day)}</span></div></div>`;
	}
	table(e) {
		let t = (e) => e.kind === "task" ? F("usage_kind_task") : e.kind === "review" ? F("usage_kind_review") : "";
		return w`<div class="tb"><table><thead><tr><th>${F("usage_model")}</th><th>${F("usage_in")}</th><th>${F("usage_out")}</th><th>${F("usage_col_cached")}</th><th>${F("usage_calls")}</th><th>${F("usage_cost")}</th></tr></thead><tbody>${e.map((e) => w`<tr class=${e.kind}><td>${e.model}<small>${e.provider_name ?? e.provider_type}${t(e) ? w`, ${t(e)}` : T}</small></td><td>${this.num(e.input)}</td><td>${this.num(e.output)}</td><td title=${`${e.cache_read} / ${e.cache_write}`}>${this.num(e.cache_read + e.cache_write)}</td><td>${e.calls}</td><td>${e.unpriced === e.calls ? F("usage_no_price") : this.money(e.cost)}${e.unpriced && e.unpriced < e.calls ? w`<small>${F("usage_unpriced", { n: e.unpriced })}</small>` : T}</td></tr>`)}</tbody></table></div>`;
	}
	balance(e) {
		return w`<p class="bal">${e.status === "ok" ? e.remaining != null && e.limit != null ? F("balance_left", {
			name: e.name,
			left: this.money(e.remaining),
			limit: this.money(e.limit)
		}) : F("balance_no_limit", {
			name: e.name,
			month: this.money(e.usage_monthly ?? 0)
		}) : e.status === "error" ? F("balance_error", {
			name: e.name,
			error: e.error ?? ""
		}) : F(e.status === "local" ? "balance_local" : "balance_none", { name: e.name })}${e.billing_url ? w` <a href=${e.billing_url} target="_blank" rel="noreferrer">${F("billing_page")}</a>` : T}</p>`;
	}
};
Q([j({ attribute: !1 })], oa.prototype, "hass", void 0), Q([M()], oa.prototype, "s", void 0), customElements.define("llm-agent-usage", oa);
//#endregion
//#region src/settings.ts
var sa = "config/config_entries/options/flow", ca = [
	"text",
	"number",
	"boolean",
	"select",
	"object"
], la = "component.llm_agent.", ua = "/config/integrations/integration/llm_agent";
function da() {
	history.pushState(null, "", ua), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }));
}
var fa = (e) => e.type === "string" ? "text" : Object.keys(e.selector ?? {})[0], pa = (e) => e.selector?.[fa(e)] ?? {}, ma = (e) => e.every((e) => e.type === "expandable" ? ma(e.schema ?? []) : ca.includes(fa(e)) && !pa(e).multiple), ha = (e) => Object.fromEntries(e.map((e) => [e.name, e.type === "expandable" ? ha(e.schema ?? []) : e.description?.suggested_value ?? e.default])), ga = (e) => e?.body?.message ?? e?.message ?? e?.error ?? String(e), _a = class extends A {
	constructor(...e) {
		super(...e), this.s = {}, this.v = {}, this.raw = {}, this.words = {}, this.cycle = 0;
	}
	static {
		this.styles = [Qi, s`:host{position:absolute;inset:0;height:auto;z-index:20;display:flex;flex-direction:column;background:var(--bg);color:var(--text)}
.top{display:flex;align-items:center;gap:4px;height:60px;flex:none;padding:0 12px;border-bottom:1px solid var(--line)}
.top b{flex:1;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.body{flex:1;overflow-y:auto;padding:20px max(16px,calc((100% - 680px)/2)) 32px}
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
		].includes(e.type) && this.hass?.callApi("DELETE", `${sa}/${e.flow_id}`).catch(() => void 0);
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
				if (this.words = Object.assign({}, ...i.map((e) => e?.resources)), !this.entry) throw Error(F("no_provider"));
				this.show(await e.callApi("POST", sa, {
					handler: this.entry,
					show_advanced_options: !1
				}));
			} catch (e) {
				this.s = { error: ga(e) };
			}
		}
	}
	show(e) {
		let t = e.data_schema ?? [], n = ![
			"form",
			"menu",
			"abort",
			"create_entry"
		].includes(e.type) || e.type === "form" && !ma(t);
		e.type === "form" && (this.v = ha(t), this.raw = {}), this.s = {
			step: e,
			stuck: n
		}, n && this.drop();
	}
	tr(e, t = this.s.step?.description_placeholders) {
		let n = this.words[la + e] ?? "";
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
			n = await this.hass.callApi("POST", `${sa}/${t.flow_id}`, e);
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
				error: ga(e)
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
				errors: { [t]: F("settings_bad_json") }
			}
		} : this.send(r);
	}
	close() {
		this.dispatchEvent(new CustomEvent("close"));
	}
	render() {
		let { step: e, error: t, busy: n, stuck: r, done: i, saving: a } = this.s, o = e?.step_id ?? "init", s = e?.type !== "create_entry" && this.tr(`options.step.${o}.title`) || F("integration_settings"), c = e?.type === "form" || e?.type === "menu" ? this.tr(`options.step.${o}.description`) : "", l = e?.type === "abort" ? this.tr(`options.abort.${e.reason}`) || e.reason : "", u = w`<button class="small" @click=${da}>${F("open_in_ha")}</button>`, d = w`<button class="small ghost" ?disabled=${n} @click=${() => this.begin()}>${F("settings_menu")}</button>`;
		return w`<div class="top" @keydown=${(e) => e.key === "Escape" && (e.preventDefault(), this.close())}>
<button class="icon" title=${F("close")} aria-label=${F("close")} @click=${this.close}><ha-icon icon="mdi:close"></ha-icon></button>
<b>${s}</b></div>
<div class="body" aria-busy=${!!n || !!a} @keydown=${(e) => e.key === "Escape" && (e.preventDefault(), this.close())}>
${c ? w`<div class="d">${N(wi(c))}</div>` : T}
${t ? w`<div class="err" role="alert">${F("settings_error", { error: t })}</div><div class="bar">${d}${u}</div>` : e ? r ? w`<div class="note">${F("settings_unsupported")}</div><div class="bar">${d}${u}</div>` : a ? w`<div class="note" role="status">${F("settings_reloading")}</div>` : i === void 0 ? l ? w`<div class="note">${l}</div><div class="bar">${d}</div>` : e.type === "menu" ? this.menu(e) : this.form(e) : w`<div class="note" role="status">${F(i === 2 ? "settings_reloaded" : i ? "settings_reload_failed" : "settings_saved")}</div>
<div class="bar">${i === 1 || i === 3 ? u : T}${d}<button class="small primary" @click=${this.close}>${F("settings_back")}</button></div>` : w`<div class="note">${F("settings_loading")}</div>`}
</div>`;
	}
	menu(e) {
		let t = e.menu_options ?? [];
		return w`<div class="menu">${(Array.isArray(t) ? t.map((e) => [e, ""]) : Object.entries(t)).map(([t, n]) => w`<button ?disabled=${this.s.busy} @click=${() => this.send({ next_step_id: t })}>
${this.tr(`options.step.${e.step_id}.menu_options.${t}`) || n || t}<ha-icon icon="mdi:chevron-right"></ha-icon></button>`)}</div>`;
	}
	form(e) {
		let t = e.errors ?? {}, n = t.base;
		return w`<form @submit=${this.submit} novalidate>
${n ? w`<div class="err" role="alert">${this.tr(`options.error.${n}`) || n}</div>` : T}
${(e.data_schema ?? []).map((n) => n.type === "expandable" ? w`<details ?open=${n.expanded}><summary>${this.tr(`options.step.${e.step_id}.sections.${n.name}.name`) || n.name}</summary>
${this.tr(`options.step.${e.step_id}.sections.${n.name}.description`) ? w`<div class="d">${N(wi(this.tr(`options.step.${e.step_id}.sections.${n.name}.description`)))}</div>` : T}
${(n.schema ?? []).map((e) => this.field(e, t, n.name))}</details>` : this.field(n, t))}
<div class="bar">${this.again()}<button class="small primary" type="submit" ?disabled=${this.s.busy}>${F("settings_submit")}</button></div>
</form>`;
	}
	again() {
		return w`<button class="small ghost" type="button" ?disabled=${this.s.busy} @click=${() => (this.drop(), this.begin())}>${F("settings_menu")}</button>`;
	}
	field(e, t, n = "") {
		let r = `options.step.${this.s.step?.step_id}${n ? `.sections.${n}` : ""}`, i = this.tr(`${r}.data.${e.name}`) || e.name, a = this.tr(`${r}.data_description.${e.name}`), o = n && t[n]?.[e.name] || t[e.name], s = n ? this.v[n] ??= {} : this.v, c = s[e.name], l = (t) => {
			s[e.name] = t, this.requestUpdate();
		}, u = pa(e), d = fa(e), f = `f-${n}-${e.name}`, p;
		if (d === "boolean") p = w`<label><input type="checkbox" .checked=${!!c} @change=${(e) => l(e.target.checked)}>${i}</label>`;
		else {
			let t, r = (e) => e.target.value;
			if (d === "number") t = w`<span class="u"><input id=${f} type="number" min=${u.min ?? T} max=${u.max ?? T} step=${u.step ?? "any"} .value=${c == null ? "" : String(c)} @input=${(e) => l(r(e) === "" ? void 0 : Number(r(e)))}>${u.unit_of_measurement ? w`<span>${u.unit_of_measurement}</span>` : T}</span>`;
			else if (d === "select") {
				let e = (u.options ?? []).map((e) => typeof e == "string" ? {
					value: e,
					label: e
				} : e), n = (e) => u.translation_key && this.tr(`selector.${u.translation_key}.options.${e.value}`) || e.label;
				t = u.mode === "list" && !u.custom_value ? w`<fieldset class="r" id=${f} aria-label=${i}>${e.map((e) => w`<label><input type="radio" name=${f} .checked=${c === e.value} @change=${() => l(e.value)}>${n(e)}</label>`)}</fieldset>` : u.custom_value ? w`<input id=${f} list=${f + "l"} .value=${c ?? ""} @input=${(e) => l(r(e))}><datalist id=${f + "l"}>${e.map((e) => w`<option value=${e.value}>${n(e)}</option>`)}</datalist>` : w`<select id=${f} @change=${(e) => l(r(e))}>${c == null ? w`<option selected></option>` : T}${e.map((e) => w`<option value=${e.value} ?selected=${c === e.value}>${n(e)}</option>`)}</select>`;
			} else if (d === "object") {
				let i = n + "." + e.name;
				this.raw[i] ??= c == null ? "" : JSON.stringify(c, null, 2), t = w`<textarea id=${f} class="json" spellcheck="false" .value=${this.raw[i]} @input=${(e) => this.raw[i] = r(e)}></textarea>`;
			} else t = u.multiline ? w`<textarea id=${f} .value=${c ?? ""} @input=${(e) => l(r(e))}></textarea>` : w`<input id=${f} type=${u.type ?? "text"} autocomplete=${u.type === "password" ? "new-password" : "off"} .value=${c ?? ""} @input=${(e) => l(r(e))}>`;
			p = w`<label for=${f}>${i}</label>${t}`;
		}
		return w`<div class="f">${p}
${a ? w`<div class="d">${N(wi(a))}</div>` : T}
${o ? w`<div class="err">${this.tr(`options.error.${o}`) || o}</div>` : T}</div>`;
	}
};
Q([j({ attribute: !1 })], _a.prototype, "hass", void 0), Q([M()], _a.prototype, "s", void 0), customElements.define("llm-agent-settings", _a);
//#endregion
//#region src/panel.ts
var va = /* @__PURE__ */ new Set([
	"config",
	"content",
	"old",
	"new",
	"text",
	"body"
]), ya = {
	input: 0,
	output: 0,
	cache_read: 0,
	cache_write: 0,
	cost: 0
}, $ = class extends A {
	constructor(...e) {
		super(...e), this.narrow = !1, this.convs = [], this.query = "", this.previews = /* @__PURE__ */ new Set(), this.hits = null, this.convId = null, this.chatTitle = "New chat", this.items = [], this.usage = ya, this.running = !1, this.announce = "", this.editAt = -1, this.hasText = !1, this.photos = [], this.files = [], this.dragging = !1, this.photoGen = 0, this.providerId = "", this.model = "", this.fetched = {}, this.showList = !1, this.loadError = "", this.mentions = [], this.picked = new zi(), this.prefs = ja(), this.showPrefs = !1, this.showSettings = !1, this.showChanges = !1, this.view = "changes", this.mentionIndex = 0, this.mentionStart = -1, this.gen = 0, this.started = !1, this.stickToBottom = !0, this.onReady = () => {
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
		this.styles = Qi;
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
		}, Ma(this.prefs), this.applyPrefs();
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
			t !== n && lt(n).then((e) => {
				e && this.requestUpdate();
			});
		}
		this.attachBox(), this.stickToBottom && this.scroller && (this.scroller.scrollTop = this.scroller.scrollHeight), this.addCopyButtons();
	}
	attachBox() {
		let e = this.source;
		e && (this.input?.source !== e && (this.input?.destroy(), this.input = Oi(e, {
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
			t.className = "copy small ghost", t.textContent = F("copy"), t.addEventListener("click", async () => {
				let n = e.querySelector("code") ?? e;
				t.textContent = F(await xa(n.textContent ?? "") ? "copied" : "copy_failed"), setTimeout(() => t.textContent = F("copy"), 1500);
			}), e.prepend(t);
		}
	}
	async copy(e, t) {
		let n = await xa(e), r = t.querySelector("ha-icon");
		r?.setAttribute("icon", n ? "mdi:check" : "mdi:alert-circle-outline"), this.announce = F(n ? "copied" : "copy_failed"), setTimeout(() => r?.setAttribute("icon", "mdi:content-copy"), 1500);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.listening?.removeEventListener?.("ready", this.onReady), this.listening = void 0, this.detach(), this.started = !1;
	}
	async init() {
		this.listening = this.ws, this.ws.addEventListener?.("ready", this.onReady), await lt(this.hass?.locale?.language) && this.requestUpdate();
		try {
			this.info = await this.ws.sendMessagePromise({ type: "llm_agent/info" }), this.loadError = "";
		} catch (e) {
			this.loadError = e.message ?? String(e);
			return;
		}
		this.applyPrefs(), this.providerId || this.startModel(), await this.refreshList();
		let e = this.convId ?? Oa();
		if (e && this.convs.some((t) => t.id === e)) try {
			await this.open(e);
		} catch {
			ka(null);
		}
		this.convId || (await this.updateComplete, this.setText(wa(this.draftKey, null)));
	}
	async refreshList() {
		this.convs = await this.ws.sendMessagePromise({ type: "llm_agent/conversations/list" }), Ea(this.draftKey, this.convs);
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
		this.hasText = !!e.trim(), this.input?.fit(), this.editAt < 0 && Ta(this.draftKey, this.convId, e);
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
		this.showChanges = !1, this.editAt = -1, this.clearAttachments(), this.detach(), this.convId = null, ka(null), this.chatTitle = "New chat", this.items = [], this.usage = ya, this.running = !1, this.showList = !1, this.startModel(), this.setText(wa(this.draftKey, null)), this.input?.focus();
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
		this.convId = r.id, ka(r.id), this.setText(wa(this.draftKey, r.id)), this.chatTitle = r.title, this.usage = r.usage, this.providerId = r.provider_id, this.model = r.model, this.items = Ba(r.messages), r.stopped && r.stopped_text && this.items.push({
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
		let n = Object.fromEntries(Object.entries(e ?? {}).filter(([e]) => !(t && va.has(e))));
		return Object.keys(n).length ? w`<pre class="args">${JSON.stringify(n, null, 2)}</pre>` : T;
	}
	async removeConv(e, t) {
		t.stopPropagation(), confirm(F("confirm_delete")) && (await this.ws.sendMessagePromise({
			type: "llm_agent/conversations/delete",
			conversation_id: e
		}), e === this.convId && this.newChat(), await this.refreshList());
	}
	lastUserIndex() {
		for (let e = this.items.length - 1; e >= 0; e--) if (this.items[e].kind === "user") return e;
		return -1;
	}
	async send(e, t = !1) {
		let n = this.lastUserIndex(), r = e === void 0 ? this.editAt : n, i = r >= 0 && r === n, a = this.items[n], o = e === void 0 ? this.photos : a?.kind === "user" && a.images || [], s = e === void 0 ? this.files : a?.kind === "user" && a.files || [], c = e ?? this.composed.trim();
		if (!c && s.length && (c = `(${s.map((e) => e.name).join(", ")})`), !c && o.length && (c = "(photo)"), !c || this.running) return;
		if (e !== void 0 && a?.kind === "user" && (a.photos && !a.images || a.files?.some((e) => !e.data))) {
			this.edit(n);
			return;
		}
		let l = this.gen, u = r >= 0 ? this.items.slice(0, r) : this.items;
		if (r >= 0 && !i) {
			try {
				await this.ws.sendMessagePromise({
					type: "llm_agent/conversations/truncate",
					conversation_id: this.convId,
					index: u.filter((e) => e.kind === "user").length
				});
			} catch (e) {
				this.push({
					kind: "notice",
					text: $a(e),
					error: !0
				});
				return;
			}
			if (l !== this.gen) return;
		}
		let d = {
			items: r >= 0 && !i ? u : this.items,
			draft: this.composed,
			photos: this.photos,
			files: this.files,
			editAt: i ? this.editAt : -1
		}, f = this.editAt >= 0;
		this.editAt = -1, e === void 0 && (this.clearAttachments(), this.setText(f ? wa(this.draftKey, this.convId) : ""), this.focusComposer()), this.items = [
			...u,
			{
				kind: "user",
				text: c,
				images: o.length ? o : void 0,
				files: s.length ? s : void 0
			},
			{
				kind: "assistant",
				text: ""
			}
		], this.running = !0, this.announce = "", this.stickToBottom = !0;
		try {
			let e = await this.ws.subscribeMessage((e) => {
				l === this.gen && (e.type === "conversation" ? this.convId || (this.convId = e.conversation_id, this.chatTitle = e.title || c.slice(0, 60), ka(this.convId)) : this.onEvent(e));
			}, {
				type: "llm_agent/chat",
				text: c,
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
				})) : void 0
			}, { resubscribe: !1 });
			this.keepOrDrop(l, e);
		} catch (t) {
			if (l !== this.gen) return;
			this.running = !1, this.items = d.items, this.editAt = d.editAt, e === void 0 && (this.setText(d.draft), this.photos = d.photos, this.files = d.files), this.push({
				kind: "notice",
				text: $a(t),
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
				}), this.announce = e.phone_only ? F("announce_phone") : F("announce_approval");
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
				}), this.announce = F("announce_error");
				return;
			case "done":
				this.usage = e.usage, this.running = !1, this.announce = F("announce_done"), this.items = this.items.filter((e) => !(e.kind === "assistant" && !e.text)), this.updateComplete.then(() => this.focusComposer()), this.detach(), this.refreshList().then(() => {
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
				text: $a(t),
				error: !0
			});
		}
	}
	async undo(e) {
		if (e.snapshotId && confirm(F("confirm_undo", { name: e.summary || e.name }))) try {
			let t = await this.ws.sendMessagePromise({
				type: "llm_agent/undo",
				snapshot_id: e.snapshotId,
				...this.convId ? { conversation_id: this.convId } : {}
			});
			this.patchTool(e.id, { undone: !0 }), this.push({
				kind: "notice",
				text: F("undone_notice", { summary: t.summary })
			});
		} catch (e) {
			this.push({
				kind: "notice",
				text: $a(e),
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
		this.setText(F("continue_message")), this.send(void 0, e);
	}
	edit(e) {
		let t = this.items[e];
		t?.kind === "user" && (this.editAt = e, this.clearAttachments(), this.photos = t.images ?? [], this.files = (t.files ?? []).filter((e) => e.data), t.photos && !t.images && this.photosNotKept(), t.files?.some((e) => !e.data) && this.push({
			kind: "notice",
			text: F("files_not_kept")
		}), this.setText(t.text), this.input.focus());
	}
	cancelEdit() {
		this.editAt = -1, this.clearAttachments(), this.setText(wa(this.draftKey, this.convId));
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
		let t = e.filter(ao);
		t.length && await this.addPhotos(t);
		let n = this.photoGen;
		for (let t of e.filter((e) => !ao(e))) {
			let e = t.name || F("that_file"), r = (t, n = {}) => this.push({
				kind: "notice",
				text: F(t, {
					name: e,
					...n
				}),
				error: !0
			});
			if (this.files.length >= to) {
				r("too_many_files", { count: to });
				return;
			}
			if (t.size > no) {
				r("file_too_large", { limit: so(no) });
				continue;
			}
			if (this.payload() + oo(t.size) > ro) {
				r("files_over_total");
				continue;
			}
			let i;
			try {
				i = await uo(t);
			} catch {
				r("file_unreadable");
				continue;
			}
			if (n !== this.photoGen) return;
			i ? this.payload() + (i.data?.length ?? 0) > ro ? r("files_over_total") : this.files = [...this.files, i] : r("file_unsupported");
		}
	}
	payload() {
		return this.photos.reduce((e, t) => e + t.data.length, 0) + this.files.reduce((e, t) => e + (t.data?.length ?? 0), 0);
	}
	photosNotKept() {
		this.push({
			kind: "notice",
			text: F("photos_not_kept")
		});
	}
	async addPhotos(e) {
		let t = this.photoGen;
		for (let n of e) {
			if (this.photos.length >= eo) break;
			try {
				let e = await mo(n);
				if (t !== this.photoGen || this.photos.length >= eo) return;
				this.photos = [...this.photos, e];
			} catch {
				this.push({
					kind: "notice",
					text: F("photo_unreadable", { name: n.name || F("that_picture") }),
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
			if (this.prefs.send === "ctrl" && !t || !t && this.input && Pi(this.input.value, this.input.selectionStart)) return;
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
		r ? (this.mentionStart = n.length - r[2].length - 1, this.mentions = Ia(t, r[2]), this.mentionIndex = 0) : this.mentions = [];
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
		if (this.loadError) return w`<div class="empty">${F("load_error", { error: this.loadError })}</div>`;
		if (this.info && !this.info.providers.length) return w`<div class="empty">${F("no_provider")}</div>`;
		let e = this.narrow ? this.showList : this.prefs.listOpen, t = this.convId ? this.lastUserIndex() : -1;
		return w`
      <div
        class="layout ${this.narrow ? "narrow" : ""}"
        @click=${this.closePrefsOutside}
        @keydown=${(e) => {
			e.key === "Escape" && (this.running && !e.defaultPrevented && !e.isComposing && !this.showPrefs && this.stop(), this.showPrefs = !1);
		}}
      >
        ${e ? this.renderList() : T}
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
              title=${F(e ? "hide_chats" : "show_chats")}
              aria-label=${F("conversations")}
              aria-expanded=${e}
              @click=${() => this.narrow ? this.showList = !this.showList : this.setPref("listOpen", !this.prefs.listOpen)}
            >
              <ha-icon
                icon=${this.narrow ? "mdi:forum-outline" : "mdi:dock-left"}
              ></ha-icon>
            </button>
            <div class="title">${this.showChanges ? F(this.view === "notes" ? "home_notes" : this.view) : Ga(this.chatTitle)}</div>
            ${this.items.length ? w`<button
                    class="icon"
                    title=${F("export_title")}
                    aria-label=${F("export")}
                    @click=${this.exportChat}
                  >
                    <ha-icon icon="mdi:tray-arrow-down"></ha-icon>
                  </button>` : T}
            ${e ? T : w`<button
                    class="icon"
                    title=${F("new_chat")}
                    aria-label=${F("new_chat")}
                    @click=${this.newChat}
                  >
                    <ha-icon icon="mdi:square-edit-outline"></ha-icon>
                  </button>`}
            ${this.member ? T : w`<button
                    class="icon"
                    title=${F("home_notes")}
                    aria-label=${F("home_notes")}
                    aria-pressed=${this.showChanges && this.view === "notes"}
                    @click=${() => {
			this.showChanges = !(this.showChanges && this.view === "notes"), this.view = "notes";
		}}
                  >
                    <ha-icon icon="mdi:notebook-outline"></ha-icon>
                  </button>`}
            ${this.member ? T : w`<button
                    class="icon"
                    title=${F("changes_title")}
                    aria-label=${F("changes")}
                    aria-pressed=${this.showChanges && this.view === "changes"}
                    @click=${() => {
			this.showChanges = !(this.showChanges && this.view === "changes"), this.view = "changes";
		}}
                  >
                    <ha-icon icon="mdi:history"></ha-icon>
                  </button>`}
            ${this.member ? T : w`<button
                    class="icon"
                    title=${F("usage_view_title")}
                    aria-label=${F("usage")}
                    aria-pressed=${this.showChanges && this.view === "usage"}
                    @click=${() => {
			this.showChanges = !(this.showChanges && this.view === "usage"), this.view = "usage";
		}}
                  >
                    <ha-icon icon="mdi:chart-bar"></ha-icon>
                  </button>`}
            <button
              class="icon gear"
              title=${F("panel_settings")}
              aria-label=${F("panel_settings")}
              aria-expanded=${this.showPrefs}
              @click=${() => this.showPrefs = !this.showPrefs}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            ${this.showPrefs ? this.renderPrefs() : T}
          </header>
          ${this.showChanges && this.view === "notes" ? w`<llm-agent-notes .hass=${this.hass}></llm-agent-notes>` : this.showChanges && this.view === "usage" ? w`<llm-agent-usage .hass=${this.hass}></llm-agent-usage>` : this.showChanges ? w`<llm-agent-changes
                  .hass=${this.hass}
                  @open-chat=${(e) => void this.open(e.detail)}
                ></llm-agent-changes>` : T}
          <div class="sr-only" role="status" aria-live="polite">${this.announce}</div>
          <div class="messages" role="log" aria-label=${F("conversation")} @scroll=${this.onScroll}>
            ${this.items.length ? T : this.renderWelcome()}
            ${nt(this.items, (e, t) => t, (e, n) => this.renderItem(e, n === this.items.length - 1, n === t, e.kind !== "user" && e.kind !== "notice" && (n === 0 || this.items[n - 1].kind === "user"), n))}
          </div>
          ${this.renderComposer()}
        </main>
        ${this.showSettings ? w`<llm-agent-settings
                .hass=${this.hass}
                @close=${() => this.showSettings = !1}
                @reloaded=${this.reloaded}
              ></llm-agent-settings>` : T}
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
		let e = La(this.chatTitle, this.items), t = URL.createObjectURL(new Blob([e], { type: "text/markdown" })), n = document.createElement("a");
		n.href = t, n.download = `${Ra(this.chatTitle) || "chat"}.md`, n.click(), URL.revokeObjectURL(t);
	}
	renderList() {
		let e = this.hits ?? this.convs;
		return w`<nav>
      <div class="nav-head">
        <span class="brand"
          ><span class="brand-mark"
            ><ha-icon icon="mdi:robot-happy-outline"></ha-icon></span
          >LLM Agent</span
        >
        <button
          class="icon"
          title=${F("new_chat")}
          aria-label=${F("new_chat")}
          @click=${this.newChat}
        >
          <ha-icon icon="mdi:square-edit-outline"></ha-icon>
        </button>
      </div>
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder=${F("search_chats")}
          aria-label=${F("search_chats")}
          .value=${this.query}
          @input=${this.onSearch}
        />
      </label>
      <div class="convs">
        ${this.hits && !this.hits.length ? w`<div class="nav-empty">${F("no_matches")}</div>` : T}
        ${!this.hits && !this.convs.length ? w`<div class="nav-empty">${F("no_chats")}</div>` : T}
        ${Ja(e, !!this.hits).map(([e, t]) => w`
            ${e ? w`<div class="group">${F(e)}</div>` : T}
            ${t.map((e) => w`<div
                  class="conv ${e.id === this.convId ? "active" : ""}"
                  @click=${() => this.open(e.id)}
                >
                  <span class="conv-title"
                    >${e.source === "action" ? w`<ha-icon
                            class="auto"
                            icon="mdi:robot-outline"
                            title=${F("started_by_automation")}
                          ></ha-icon>` : T}${Ga(e.title)}${e.snippet && e.snippet !== e.title ? w`<small class="snippet">${e.snippet}</small>` : T}</span
                  >
                  <button
                    class="icon del"
                    title=${F("delete")}
                    aria-label=${F("delete_chat")}
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
		let e = this.prefs, t = (t, n, r) => w`<label
        >${n}
        <select
          @change=${(e) => this.setPref(t, e.target.value)}
        >
          ${r.map(([n, r]) => w`<option value=${String(n)} ?selected=${e[t] === n}>
                ${r}
              </option>`)}
        </select></label
      >`, n = (t, n) => w`<label class="check"
        ><input
          type="checkbox"
          .checked=${e[t]}
          @change=${(e) => this.setPref(t, e.target.checked)}
        />${n}</label
      >`, r = this.info?.my_default, i = r ? `${this.info?.providers.find((e) => e.id === r.provider_id)?.name ?? "?"} · ${r.model || F("model_provider_default")}` : "";
		return w`<div class="prefs" role="dialog" aria-label=${F("panel_settings")}>
      ${t("theme", F("theme"), [
			["auto", F("theme_auto")],
			["light", F("theme_light")],
			["dark", F("theme_dark")]
		])}
      ${t("size", F("text_size"), [
			["small", F("size_small")],
			["normal", F("size_normal")],
			["large", F("size_large")]
		])}
      ${t("send", F("send_with"), [["enter", "Enter"], ["ctrl", "Ctrl+Enter"]])}
      ${n("compact", F("compact_layout"))}
      ${n("toolsOpen", F("expand_tools"))}
      ${n("showUsage", F("show_usage"))}
      ${this.member ? T : w`<div class="mine">
        <div>${F("my_default", { model: r ? i : F("provider_default") })}</div>
        <button class="small" @click=${() => this.setMyDefault()}>
          ${F("use_current_model")}
        </button>
        ${r ? w`<button
                class="small ghost"
                @click=${() => this.setMyDefault(!0)}
              >
                ${F("clear")}
              </button>` : T}
      </div>`}
      ${this.admin ? w`<div class="mine">
              <button
                class="small"
                @click=${() => {
			this.showPrefs = !1, this.showSettings = !0;
		}}
              >
                ${F("integration_settings")}
              </button>
              <button class="small ghost" @click=${da}>${F("open_in_ha")}</button>
            </div>` : T}
      <div class="hint">${F("prefs_hint")}</div>
    </div>`;
	}
	renderWelcome() {
		let e = Fa(this.hass, this.member), t = this.hass?.user?.name?.split(" ")[0];
		return w`<div class="welcome">
      <div class="logo"><ha-icon icon="mdi:robot-happy-outline"></ha-icon></div>
      <h2>${t ? F("greeting_name", {
			greeting: qa(),
			name: t
		}) : qa()}</h2>
      ${this.member ? w`<p>${F("welcome_member")}</p>` : w`<p>${F("welcome_admin")}</p>
              <span class="mode-chip"
                ><ha-icon icon="mdi:shield-check-outline"></ha-icon
                >${Qa(this.info?.approval_mode)}</span
              >`}
      <div class="tips">
        ${e.map((e) => w`<button
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
		let a = r ? w`<div class="avatar" aria-hidden="true">
          <ha-icon icon="mdi:robot-happy-outline"></ha-icon>
        </div>` : T;
		switch (e.kind) {
			case "user": return w`<div class="row user ${i === this.editAt ? "edited" : ""}">
          ${this.convId && !this.running ? w`<div class="msg-actions">
                  <button
                    class="icon"
                    title=${F("edit")}
                    aria-label=${F("edit")}
                    @click=${() => this.edit(i)}
                  >
                    <ha-icon icon="mdi:pencil-outline"></ha-icon>
                  </button>
                  ${n ? w`<button
                          class="icon"
                          title=${F("retry")}
                          aria-label=${F("retry")}
                          @click=${() => this.send(e.text)}
                        >
                          <ha-icon icon="mdi:refresh"></ha-icon>
                        </button>` : T}
                </div>` : T}
          <div class="msg user md">
            ${this.renderPhotos(e)}${N(Vi(wi(e.text), this.hass))}
          </div>
        </div>`;
			case "assistant": return e.text ? w`<div class="row reply">
          ${a}
          <div class="msg assistant md">
            ${N(wi(e.text, !(t && this.running)))}
          </div>
          ${t && this.running ? T : w`<div class="msg-actions acts">
                  <button
                    class="icon"
                    title=${F("copy")}
                    aria-label=${F("copy")}
                    @click=${(t) => this.copy(e.text, t.currentTarget)}
                  >
                    <ha-icon icon="mdi:content-copy"></ha-icon>
                  </button>
                </div>`}
        </div>` : t && this.running ? w`<div class="row reply">
                ${a}
                <div class="msg assistant typing">
                  <span></span><span></span><span></span>
                </div>
              </div>` : T;
			case "notice": return w`<div class="notice ${e.error ? "error" : ""}">
          ${e.text}
          ${t && !this.running && e.stop && za.has(e.stop) ? w`<button
                  class="small"
                  @click=${() => this.continueTurn(e.stop === "spend_cap")}
                >
                  ${e.stop === "spend_cap" ? F("continue_anyway") : F("continue")}
                </button>` : T}
        </div>`;
			case "tool": return w`<div class="row reply">
          ${a}${this.renderTool(e)}
        </div>`;
		}
	}
	renderPreview(e) {
		let t = e.args?.config;
		if (!t || typeof t != "object") return w``;
		let n = this.previews.has(e.id);
		return w`<div class="preview">
      <button
        class="ghost small"
        @click=${() => {
			let t = new Set(this.previews);
			n ? t.delete(e.id) : t.add(e.id), this.previews = t;
		}}
      >
        <ha-icon icon=${n ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
        ${F(n ? "hide_preview" : "preview_dashboard")}
      </button>
      ${n ? w`<llm-dashboard-preview .hass=${this.hass} .config=${t}></llm-dashboard-preview>` : T}
    </div>`;
	}
	renderNoteSuggestion(e) {
		let t = (e.approval?.diff ?? "").replace(/\n+$/, "").split("\n"), n = t.filter((e) => e.startsWith("+") && !e.startsWith("+++")).map((e) => e.slice(1)), r = t.filter((e) => e.startsWith("-") && !e.startsWith("---")).map((e) => e.slice(1)), i = this.noteCardSince.get(e.id);
		i === void 0 && (i = Date.now(), this.noteCardSince.set(e.id, i), setTimeout(() => this.requestUpdate(), Pa + 50));
		let a = Date.now() - i >= Pa;
		return w`<div class="note-suggestion" role="group" aria-label=${F("suggested_note")}>
      <div class="note-head">
        <ha-icon icon="mdi:notebook-edit-outline"></ha-icon>
        <div>
          <strong>${F("note_question")}</strong>
          <small>${F("note_explain")}</small>
        </div>
      </div>
      ${n.filter((e) => e.trim()).length ? w`<ul class="note-lines add">
            ${n.filter((e) => e.trim()).map((e) => w`<li>${e}</li>`)}
          </ul>` : T}
      ${r.filter((e) => e.trim()).length ? w`<div class="note-label">${F("forget")}</div>
            <ul class="note-lines del">
              ${r.filter((e) => e.trim()).map((e) => w`<li>${e}</li>`)}
            </ul>` : T}
      <div class="note-actions">
        <button class="ghost" @click=${() => this.answer(e.id, !1)}>
          ${F("note_no")}
        </button>
        <button
          class="note-save"
          ?disabled=${!a}
          title=${F(a ? "note_save_title" : "read_it_first")}
          @click=${() => this.answer(e.id, !0)}
        >
          ${F("save_to_notes")}
        </button>
      </div>
    </div>`;
	}
	renderTool(e) {
		let t = e.approval;
		if (t && !t.phoneOnly && e.name === "change_home_note") return this.renderNoteSuggestion(e);
		let n = {
			running: w`<span class="spinner" aria-label=${F("running")}></span>`,
			ok: w`<ha-icon
        class="st ok"
        icon="mdi:check-circle"
        aria-label=${F("done")}
      ></ha-icon>`,
			error: w`<ha-icon
        class="st error"
        icon="mdi:alert-circle"
        aria-label=${F("failed")}
      ></ha-icon>`,
			waiting: w`<span class="tag wait">${F("waiting_for_you")}</span>`
		}[e.status];
		return w`<div
      class="tool ${e.status} ${t?.risky ? "risky" : ""}"
    >
      ${t ? w`<div class="approval-head">
              <ha-icon
                icon=${t.risky ? "mdi:shield-alert-outline" : "mdi:hand-back-right-outline"}
              ></ha-icon>
              <span
                >${F("needs_approval")}${t.reason ? w`<span class="why"> · ${t.reason}</span>` : T}</span
              >
            </div>` : T}
      <details ?open=${!!t || this.prefs.toolsOpen}>
        <summary>
          <span class="tool-icon"
            ><ha-icon icon=${Wa(e.name)}></ha-icon
          ></span>
          <span class="tool-name">${Ya(e.name)}</span>
          <span class="tool-summary"
            >${t?.summary ?? e.summary ?? Xa(e.args)}</span
          >
          ${e.undone ? w`<span class="tag">${F("undone")}</span>` : T}
          ${Ha(e.review, e.reviewing)}
          ${n}
          ${e.snapshotId && !e.undone && e.status === "ok" && !this.member ? w`<button
                  class="ghost small undo"
                  title=${F("undo_title")}
                  @click=${(t) => {
			t.preventDefault(), t.stopPropagation(), this.undo(e);
		}}
                >
                  ${F("undo")}
                </button>` : T}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        ${e.review ? w`<div class="review-note ${e.review.decision}">
                <ha-icon icon="mdi:shield-check-outline"></ha-icon>
                <span
                  ><b>${e.review.model ? F("reviewer_model", { model: e.review.model }) : F("reviewer")}:</b>
                  ${e.review.reason || F(Va[e.review.decision])}</span
                >
              </div>` : T}
        ${t?.diff ? w`<pre class="diff">${Ua(t.diff)}</pre>` : T}
        ${t && e.name === "save_dashboard" ? this.renderPreview(e) : T}
        ${this.renderArgs(e.args, !!t?.diff)}
        ${e.preview && !t ? w`<pre class="result">${e.preview}</pre>` : T}
      </details>
        ${e.image ? w`<img class="snapshot" src=${e.image} alt=${F("camera_snapshot")} />` : T}
      ${t?.phoneOnly ? w`<div class="approval phone-wait">
              <ha-icon icon="mdi:cellphone-message"></ha-icon>
              ${F("phone_wait")}
            </div>` : t ? w`<div class="approval">
              <input
                id="note-${e.id}"
                placeholder=${F("approval_note")}
                aria-label=${F("approval_note")}
              />
              <button
                class="ghost danger-text"
                @click=${() => this.answer(e.id, !1)}
              >
                ${F("deny")}
              </button>
              <button
                class="primary"
                @click=${() => this.answer(e.id, !0)}
              >
                ${F("approve")}
              </button>
            </div>` : T}
    </div>`;
	}
	renderPhotos(e) {
		if (e.kind !== "user") return T;
		let t = e.files?.length ? w`<div class="files">${e.files.map((e) => this.renderFile(e))}</div>` : T;
		return e.images?.length ? w`<div class="photos">${e.images.map((e) => w`<img src=${e.url} alt=${F("your_photo")} />`)}</div>${t}` : e.photos ? w`<div class="photo-note"><ha-icon icon="mdi:image-outline"></ha-icon>${Ka(e.photos)} ${F("not_kept")}</div>${t}` : t;
	}
	renderFile(e, t) {
		return w`<span class="file" title=${e.name}>
      <ha-icon icon=${io[e.kind]}></ha-icon>
      <span class="file-name">${e.name}</span>
      <span class="file-meta">${co(e)}, ${so(e.size)}</span>
      ${t ? w`<button
              class="icon"
              title=${F("remove_file")}
              aria-label=${`${F("remove_file")}: ${e.name}`}
              @click=${t}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : T}
    </span>`;
	}
	renderComposer() {
		let e = this.provider, t = "models";
		return w`<footer>
      <div class="composer ${this.dragging ? "dragging" : ""}">
        <textarea
          rows="1"
          placeholder=${this.narrow ? F("composer_placeholder") : `${F("composer_placeholder")} (${F(this.prefs.send === "ctrl" ? "keys_ctrl" : "keys_enter")})`}
        ></textarea>
        ${this.mentions.length ? w`<ul class="mentions" role="listbox">
                ${this.mentions.map((e, t) => w`<li
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
              </ul>` : T}
        ${this.photos.length ? w`<div class="attached">
                ${this.photos.map((e, t) => w`<span class="thumb">
                      <img src=${e.url} alt=${F("photo_to_send")} />
                      <button
                        class="icon"
                        title=${F("remove_photo")}
                        aria-label=${F("remove_photo")}
                        @click=${() => this.photos = this.photos.filter((e, n) => n !== t)}
                      >
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    </span>`)}
              </div>` : T}
        ${this.files.length ? w`<div class="attached files">
                ${this.files.map((e, t) => this.renderFile(e, () => {
			this.files = this.files.filter((e, n) => n !== t);
		}))}
              </div>` : T}
        <div class="toolbar">
          <label
            class="attach icon"
            title=${F("attach_title")}
            ?hidden=${this.photos.length >= eo && this.files.length >= to}
          >
            <ha-icon icon="mdi:paperclip"></ha-icon>
            <!-- No accept filter: HA files often have no extension (.storage/*,
                 home-assistant.log.1), and the type is decided from the bytes. -->
            <input
              type="file"
              multiple
              aria-label=${F("attach")}
              ?disabled=${this.running}
              @change=${this.onPick}
            />
          </label>
          ${this.member ? T : w`<label
            class="model-pill"
            title=${this.modelError || F("provider_and_model")}
          >
            <ha-icon icon="mdi:creation-outline"></ha-icon>
            <select
              aria-label=${F("provider")}
              @change=${this.pickProvider}
              .value=${this.providerId}
              ?disabled=${this.running}
            >
              ${this.info?.providers.map((e) => w`<option
                    value=${e.id}
                    ?selected=${e.id === this.providerId}
                  >
                    ${e.name}
                  </option>`)}
            </select>
            <span class="sep">/</span>
            <input
              class="model"
              aria-label=${F("model")}
              list=${t}
              .value=${this.model}
              ?disabled=${this.running}
              @change=${(e) => this.model = e.target.value.trim()}
              @focus=${this.loadModels}
            />
            <datalist id=${t}>
              ${(this.fetched[this.providerId] ?? e?.models)?.map((e) => w`<option value=${e.id}>${e.label}</option>`)}
            </datalist>
          </label>`}
          <span class="spacer"></span>
          ${this.running ? w`<button
                  class="send stop"
                  title=${F("stop")}
                  aria-label=${F("stop")}
                  @click=${this.stop}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>` : w`<button
                  class="send"
                  title=${F("send")}
                  aria-label=${F("send")}
                  ?disabled=${!this.hasText && !this.photos.length && !this.files.length}
                  @click=${() => this.send()}
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>`}
        </div>
      </div>
      <div class="meta">
        ${this.editAt >= 0 ? w`<span class="editing"
                >${F(this.editAt === this.lastUserIndex() ? "editing_last" : "editing_earlier")}
                <button class="small ghost" @click=${this.cancelEdit}>
                  ${F("cancel")}
                </button></span
              >` : T}
        <span
          class="usage"
          ?hidden=${!this.prefs.showUsage}
          title=${F("usage_title")}
        >
          ${F("usage_line", {
			input: Za(this.usage.input + this.usage.cache_read + this.usage.cache_write),
			output: Za(this.usage.output)
		})}
          ${this.usage.cache_read ? ` · ${F("usage_cached", { count: Za(this.usage.cache_read) })}` : T}
          ·
          ${this.usage.cost == null ? F("cost_na") : `~$${this.usage.cost.toFixed(this.usage.cost < 1 ? 4 : 2)}`}
          ${this.usage.review ? ` · ${F("reviewer_usage", {
			tokens: Za(this.usage.review.input + this.usage.review.output),
			cost: this.usage.review.cost == null ? F("cost_na") : `~$${this.usage.review.cost.toFixed(4)}`
		})}` : T}
        </span>
      </div>
    </footer>`;
	}
};
Q([j({ attribute: !1 })], $.prototype, "hass", void 0), Q([j({ type: Boolean })], $.prototype, "narrow", void 0), Q([M()], $.prototype, "info", void 0), Q([M()], $.prototype, "convs", void 0), Q([M()], $.prototype, "query", void 0), Q([M()], $.prototype, "previews", void 0), Q([M()], $.prototype, "hits", void 0), Q([M()], $.prototype, "convId", void 0), Q([M()], $.prototype, "chatTitle", void 0), Q([M()], $.prototype, "items", void 0), Q([M()], $.prototype, "usage", void 0), Q([M()], $.prototype, "running", void 0), Q([M()], $.prototype, "announce", void 0), Q([M()], $.prototype, "editAt", void 0), Q([M()], $.prototype, "hasText", void 0), Q([M()], $.prototype, "photos", void 0), Q([M()], $.prototype, "files", void 0), Q([M()], $.prototype, "dragging", void 0), Q([M()], $.prototype, "providerId", void 0), Q([M()], $.prototype, "model", void 0), Q([M()], $.prototype, "fetched", void 0), Q([M()], $.prototype, "showList", void 0), Q([M()], $.prototype, "loadError", void 0), Q([M()], $.prototype, "mentions", void 0), Q([M()], $.prototype, "prefs", void 0), Q([M()], $.prototype, "showPrefs", void 0), Q([M()], $.prototype, "showSettings", void 0), Q([M()], $.prototype, "showChanges", void 0), Q([M()], $.prototype, "view", void 0), Q([M()], $.prototype, "mentionIndex", void 0), Q([He(".composer textarea")], $.prototype, "source", void 0), Q([He(".messages")], $.prototype, "scroller", void 0);
var ba = "llm-agent-prefs";
async function xa(e) {
	try {
		return await navigator.clipboard.writeText(e), !0;
	} catch {
		let t = document.createElement("textarea");
		t.value = e, document.body.append(t), t.select();
		let n = document.execCommand("copy");
		return t.remove(), n;
	}
}
function Sa(e) {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "{}");
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
function Ca(e, t) {
	try {
		Object.keys(t).length ? localStorage.setItem(e, JSON.stringify(t)) : localStorage.removeItem(e);
	} catch {}
}
function wa(e, t) {
	let n = Sa(e)[t ?? ""];
	return typeof n == "string" ? n : "";
}
function Ta(e, t, n) {
	let r = Sa(e), i = t ?? "";
	if (n.trim()) r[i] = n;
	else if (i in r) delete r[i];
	else return;
	Ca(e, r);
}
function Ea(e, t) {
	let n = Sa(e), r = new Set(t.map((e) => e.id)), i = Object.keys(n).filter((e) => e && !r.has(e));
	for (let e of i) delete n[e];
	i.length && Ca(e, n);
}
var Da = "llm-agent-last-chat";
function Oa() {
	try {
		return localStorage.getItem(Da);
	} catch {
		return null;
	}
}
function ka(e) {
	try {
		e ? localStorage.setItem(Da, e) : localStorage.removeItem(Da);
	} catch {}
}
var Aa = {
	theme: "auto",
	size: "normal",
	compact: !1,
	toolsOpen: !1,
	showUsage: !0,
	send: "enter",
	listOpen: !0
};
function ja() {
	try {
		let e = JSON.parse(localStorage.getItem(ba) ?? "{}");
		return {
			...Aa,
			...typeof e == "object" && e ? e : {}
		};
	} catch {
		return { ...Aa };
	}
}
function Ma(e) {
	try {
		localStorage.setItem(ba, JSON.stringify(e));
	} catch {}
}
var Na = 8, Pa = 1500;
function Fa(e, t = !1) {
	let n = Object.values(e?.areas ?? {}).map((e) => String(e.name ?? "")).filter(Boolean).sort((e, t) => e.localeCompare(t))[0] ?? F("living_room"), r = Object.values(e?.states ?? {}).some((e) => e.attributes?.device_class === "energy");
	return t ? [
		{
			text: F("tip_lights", { room: n }),
			icon: "mdi:lightbulb-group-outline"
		},
		{
			text: F("tip_anything_on"),
			icon: "mdi:power"
		},
		{
			text: F("tip_temperature"),
			icon: "mdi:thermometer"
		}
	] : [
		{
			text: F("tip_lights", { room: n }),
			icon: "mdi:lightbulb-group-outline"
		},
		{
			text: F("tip_dashboard_room", { room: n }),
			icon: "mdi:view-dashboard-outline"
		},
		{
			text: F("tip_dashboard_all"),
			icon: "mdi:view-dashboard-edit-outline"
		},
		{
			text: F("tip_automation"),
			icon: "mdi:robot-outline"
		},
		r ? {
			text: F("tip_energy"),
			icon: "mdi:lightning-bolt-outline"
		} : {
			text: F("tip_unavailable"),
			icon: "mdi:stethoscope"
		},
		{
			text: F("tip_batteries"),
			icon: "mdi:battery-alert-variant-outline"
		}
	];
}
function Ia(e, t) {
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
	return r.sort((e, t) => e[0] - t[0] || e[1].label.localeCompare(t[1].label)), r.slice(0, Na).map(([, e]) => e);
}
function La(e, t) {
	let n = [`# ${Ga(e)}`, ""];
	for (let e of t) if (e.kind === "user") {
		let t = e.images?.length || e.photos || 0, r = [...t ? [Ka(t)] : [], ...(e.files ?? []).map((e) => e.name)], i = r.length ? ` _(${r.join(", ")})_` : "";
		n.push(`**${F("you")}:** ${e.text}${i}`, "");
	} else if (e.kind === "assistant" && e.text) n.push(e.text, "");
	else if (e.kind === "notice") n.push(`> ${e.text}`, "");
	else if (e.kind === "tool") {
		let t = e.status === "ok" ? "✓" : e.status === "error" ? "✗" : "…";
		n.push(`- ${t} \`${e.name}\`${e.summary ? `: ${e.summary}` : ""}`, "");
	}
	return n.join("\n");
}
function Ra(e) {
	return e.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
}
var za = /* @__PURE__ */ new Set([
	"length",
	"tool_limit",
	"cancelled",
	"spend_cap"
]);
function Ba(e) {
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
			summary: r.summary || (r.decision === "denied" ? F("denied") : ""),
			preview: r.preview,
			snapshotId: r.snapshot_id,
			undone: r.undone,
			review: r.review ?? void 0
		});
	}
	return t;
}
var Va = {
	approve: "reviewer_approved",
	deny: "reviewer_denied",
	ask: "reviewer_unsure"
};
function Ha(e, t) {
	return t && !e ? w`<span class="tag wait">${F("reviewing")}</span>` : e ? w`<span class="tag review ${e.decision}" title=${e.reason}
    >${F(Va[e.decision] ?? "reviewer")}</span
  >` : T;
}
function Ua(e) {
	return e.replace(/\n+$/, "").split("\n").map((e) => w`<span class=${e.startsWith("+") && !e.startsWith("+++") ? "add" : e.startsWith("-") && !e.startsWith("---") ? "del" : e.startsWith("@@") ? "hunk" : ""}>${e || " "}</span>`);
}
function Wa(e) {
	return e === "shell" ? "mdi:console" : e === "call_service" ? "mdi:play-circle-outline" : e === "undo" ? "mdi:undo" : e === "system" ? "mdi:cog-outline" : e === "ha_websocket" ? "mdi:api" : e === "integrations" ? "mdi:puzzle-outline" : e === "read_reference" ? "mdi:book-open-variant" : e === "render_template" ? "mdi:code-braces" : e === "get_history" ? "mdi:chart-timeline-variant" : e === "web_fetch" ? "mdi:web" : e === "web_search" ? "mdi:magnify" : e === "camera_snapshot" ? "mdi:cctv" : e === "get_traces" ? "mdi:transit-connection-variant" : e === "get_logbook" ? "mdi:history" : e === "read_log" ? "mdi:text-box-search-outline" : e.includes("dashboard") ? "mdi:view-dashboard-outline" : e.includes("config_item") ? "mdi:robot-outline" : e.includes("file") ? "mdi:file-document-outline" : e.includes("area") || e.includes("device") || e.includes("registry") ? "mdi:devices" : e.includes("entit") || e.includes("service") ? "mdi:format-list-bulleted" : "mdi:wrench-outline";
}
function Ga(e) {
	return e === "New chat" ? F("new_chat") : e;
}
function Ka(e) {
	return e === 1 ? F("one_photo") : F("n_photos", { count: e });
}
function qa() {
	let e = (/* @__PURE__ */ new Date()).getHours();
	return F(e < 5 ? "greeting_evening" : e < 12 ? "greeting_morning" : e < 18 ? "greeting_afternoon" : "greeting_evening");
}
function Ja(e, t) {
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
function Ya(e) {
	let t = `tool_${e}`;
	return st(t) ? F(t) : e.replace(/_/g, " ");
}
function Xa(e) {
	let t = Object.entries(e).filter(([e]) => !e.startsWith("_")).map(([e, t]) => `${e}=${typeof t == "string" ? t : JSON.stringify(t)}`).join(" ");
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
function Za(e) {
	return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(e);
}
function Qa(e) {
	let t = {
		ask_all: "mode_ask_all",
		ask_risky: "mode_ask_risky",
		reviewer: "mode_reviewer",
		autopilot: "mode_autopilot",
		yolo: "mode_yolo",
		read_only: "mode_read_only"
	}[e ?? ""];
	return t ? F(t) : "";
}
function $a(e) {
	return e.message ?? String(e);
}
customElements.get("llm-agent-panel") || customElements.define("llm-agent-panel", $);
var eo = 3, to = 10, no = 2097152, ro = 35e5, io = {
	text: "mdi:file-document-outline",
	pdf: "mdi:file-pdf-box",
	zip: "mdi:folder-zip-outline",
	gzip: "mdi:folder-zip-outline"
};
function ao(e) {
	return e.type.startsWith("image/") && e.type !== "image/svg+xml";
}
function oo(e) {
	return Math.ceil(e / 3) * 4;
}
function so(e) {
	return e >= 1048576 ? `${(e / 1048576).toFixed(1)} MB` : e >= 1024 ? `${Math.round(e / 1024)} KB` : `${e} B`;
}
function co(e) {
	if (e.kind !== "text") return e.kind.toUpperCase();
	let t = e.name.lastIndexOf("."), n = t > 0 ? e.name.slice(t + 1) : "";
	return n && n.length <= 5 ? n.toUpperCase() : F("file_text");
}
function lo(e) {
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
async function uo(e) {
	let t = lo(new Uint8Array(await e.slice(0, 8192).arrayBuffer()));
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
var fo = 1568, po = 1e6;
async function mo(e) {
	let t = await createImageBitmap(e);
	try {
		let e = Math.min(fo, Math.max(t.width, t.height));
		for (;;) {
			for (let n of [
				.85,
				.7,
				.55
			]) {
				let r = ho(t, e, n), i = r.slice(r.indexOf(",") + 1);
				if (i.length <= po) return {
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
function ho(e, t, n) {
	let r = Math.min(1, t / Math.max(e.width, e.height)), i = document.createElement("canvas");
	i.width = Math.max(1, Math.round(e.width * r)), i.height = Math.max(1, Math.round(e.height * r));
	let a = i.getContext("2d");
	return a.fillStyle = "#fff", a.fillRect(0, 0, i.width, i.height), a.drawImage(e, 0, 0, i.width, i.height), i.toDataURL("image/jpeg", n);
}
//#endregion
export { Ia as findMentions, La as toMarkdown, Fa as welcomeTips };
