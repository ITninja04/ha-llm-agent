//#region node_modules/@solidjs/signals/dist/prod/core/error.js
var e = class extends Error {
	constructor(e) {
		let t = Error, n = t.stackTraceLimit;
		n && (t.stackTraceLimit = 0), super(), n && (t.stackTraceLimit = n), this.source = e;
	}
}, t = class extends Error {
	constructor(e, t) {
		try {
			var n = String(t instanceof Error ? t.message : t);
		} catch {}
		super(n, { cause: t }), this.source = e;
	}
};
function n(e) {
	return e instanceof t ? e.cause : e;
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/constants.js
var r = 1024, i = 2048, a = 4096, o = 8192, s = 16384, c = 1 << 17, l = 1 << 18, u = 1 << 19, d = 1 << 22, f = 1 << 23, p = 1 << 20, m = 1024, h = 1 << 21, g = 1 << 22, _ = {}, v = {}, y = Symbol("refresh"), b = Set;
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/owner.js
function x(e) {
	let t = e.pe;
	for (; t;) t.R |= 32, x(t), t = t.Ge;
}
var S;
function C(e) {
	try {
		e();
	} catch (e) {
		S ||= [e], P();
	}
}
function ee(e) {
	let t = S;
	if (S = void 0, t && !e) throw t[0];
}
function w(e, t = !1, n) {
	let r = e.R;
	if (r & 64) return;
	t && (!n && e.T !== null && (e.T.me !== null || e.T.Le !== null) && w(e, !1, !0), e.R = r | 64, e.X && (Ut(e), (e.m & 1 && e.T?.Re != null || r & 2048 || F.length) && P()));
	let i = n ? e.T.me : e.pe;
	for (n ? e.T.me = null : e.pe = null; i;) i.l &= -33, L(i, M), Pt(i), i.Me = i, w(i, !0), i = i.Ge;
	if (n || (e.be = 0), t && !n && !(r & 32) && e._parent !== null && !(e._parent.R & 64)) {
		let t = e.Me, n = e.Ge;
		t === null ? e._parent.pe = n : t.Ge = n, n !== null && (n.Me = t), e.Me = null;
	}
	if (T(e, n), t && e.ze) {
		let t = e.ze;
		e.ze = void 0, C(t);
	}
}
function te(e, t) {
	let n = e.pe;
	t.Me = null, t.Ge = n, n !== null && (n.Me = t), e.pe = t;
}
function T(e, t) {
	let n = t ? e.T.Le : e.ke;
	if (n) {
		if (t ? e.T.Le = null : e.ke = null, Array.isArray(n)) for (let e = n.length - 1; e >= 0; e--) C(n[e]);
		else C(n);
	}
}
function ne(e, t) {
	for (; e.l & 4 && e._parent;) e = e._parent;
	if (e.id != null) return ae(e.id, t ? e.be++ : e.be);
	throw Error();
}
function re(e) {
	return ne(e, !0);
}
function ie(e, t, n) {
	return e?.id ?? (t ? n?.id : n?.id == null ? void 0 : re(n));
}
function ae(e, t) {
	let n = t.toString(36), r = n.length - 1;
	return e + (r ? String.fromCharCode(64 + r) : "") + n;
}
function oe() {
	return V;
}
function se(e, t = V) {
	return t && (t.ke ? Array.isArray(t.ke) ? t.ke.push(e) : t.ke = [t.ke, e] : t.ke = e), e;
}
function ce(e = !0) {
	w(this, e), S && !I.Y && ee();
}
function le(e) {
	let t = V, n = e?.transparent ?? !1, r = {
		id: ie(e, n, t),
		l: n ? 4 : 0,
		R: 0,
		Qe: !0,
		Ke: t?.Qe ? t.Ke : t,
		pe: null,
		Ge: null,
		Me: null,
		ke: null,
		A: t?.A || v,
		be: 0,
		T: null,
		_parent: t,
		dispose: ce
	};
	return t && te(t, r), r;
}
function ue(e, t) {
	let n = le(t);
	return Kn(n, () => e(ce.bind(n, !0)));
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/scheduler.js
var de = null, fe = null, pe = null, me = null, he = null, ge = null, _e = null, ve = null, ye = null, be = null, xe = null, Se = null, Ce = null, we = null, Te = null, Ee = null, De = null, Oe = null, ke = null, Ae = null, je = void 0, E = [];
function Me(e, t = null) {
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
	return e || E.push(n), n;
}
var D = null, O = null, k = null;
function Ne(e, t) {
	if (I.Y && !t || O !== null) return Fe(e);
	k === null ? k = j(e) : Ie(j(e), k), P();
}
function A(e) {
	return e.T.Re = j(e.T.Re);
}
function Pe(e) {
	return e = j(e), E.indexOf(e) === -1 ? null : e;
}
function j(e) {
	for (; e.eo !== null;) e = e.eo;
	return e;
}
function Fe(e) {
	let t = O;
	t === null ? O = e === null ? Me(!1) : j(e) : e !== null && Ie(j(e), t), I.Y || P();
}
function Ie(e, t) {
	e = j(e), t = j(t), !(e === t || e.P || t.P) && (e.eo = t, t.tt += e.tt, t.nt ||= e.nt, lt(t.ln, e.ln), lt(t.rn[0], e.rn[0]), lt(t.rn[1], e.rn[1]), lt(t.fn, e.fn), e.I !== null && lt(t.I ??= [], e.I), E.splice(E.indexOf(e), 1));
}
function Le(e) {
	return e.tt !== 0 || ze(e.ln, e) || !!he?.(e);
}
var Re = null;
function ze(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (!(!(i.m & 1) || i.R & 64 || i.l & 8192 || i.T.Re !== null && A(i) !== t || n && !n(i, t))) {
			if (i.i === 1) {
				if (Be(i, Re ?? t)) return !0;
			} else for (let e = i.o; e !== null; e = e.t) {
				let n = e.u;
				if ((n.i === 1 && n.m & 1 || n.R & 2048 || n.l & 16384 && n.m === 1) && (e.Ne === n.de || n.T?.U != null) && !(n.R & 64) && Be(n, Re ?? t)) return !0;
			}
		}
	}
	return !1;
}
function Be(e, t) {
	return !be?.(e) && !(e.R & 32 && Ve(e, t));
}
function Ve(e, t) {
	for (; e?.R & 32;) e = e._parent;
	return e?.l & 256 && e.T?.Re != null && A(e) === j(t);
}
var He = [];
function Ue(e) {
	He.push(e);
}
var We = [];
function Ge(e) {
	L(e, M), e.R &= -4, We.push(e);
}
function Ke(e, t) {
	e.l |= 256, qe(e, t);
}
function qe(e, t) {
	let n = U(e);
	n.Re !== t && (n.Re = t, t.ln.push(e));
}
function Je(e, t) {
	for (let n = e.pe; n !== null; n = n.Ge) n.T?.Re?.P || (n.X !== void 0 && (n.l & 256 || Ke(n, t), n.l |= p), Je(n, t));
}
var M = {
	et: Array(2e3).fill(void 0),
	p: !1,
	Fe: 0,
	Et: 0
}, N = 0, Ye = !1, Xe = !1, Ze = !1, Qe = 0, $e = 0, et = 0;
function P() {
	Xe ? it() : Ye || (Ye = !0, !Qe && !I.Y && queueMicrotask(bt));
}
var tt = Symbol.for("solid-js/root-error-hook"), nt = "[REACTIVITY_HALTED]";
function rt(e) {
	if (Xe) return;
	Xe = !0, ee(!0);
	let t = nt, n = e !== void 0 && globalThis.reportError;
	n || e === void 0 ? console.error(t) : console.error(t, e), n && n(e);
}
function it() {
	Ze || (Ze = !0, console.error(nt));
}
var at = class e {
	rn = [[], []];
	Y = !1;
	flush() {
		if (!this.Y) {
			this.Y = !0, Pn(), D = null, k = null;
			try {
				zt(), Ot(M, e._e), this.settle(), N++, Ye = M.Et >= M.Fe || F.length !== 0, this.run(1), this.run(2);
			} finally {
				this.Y = !1, k = null;
			}
		}
	}
	settle() {
		pe?.() && Ot(M, e._e);
		let t = O;
		O = null, fe?.(t);
		let n = t !== null && !t.P ? j(t) : null;
		if (n !== null) {
			let e = F.length;
			for (let t = 0; t < e; t++) {
				let e = F[t];
				if (!(e.l & 2304) && (e.T === null || e.T.Re === null || !e.T.Re.P)) {
					if (e.ue === _ && e.m & 4 && e.i !== 1) continue;
					if (e.ue !== _ && !(e.m & 5) && e.T?.me == null && e.T?.Le == null && !e.T?.Te && Un(e, e.le, e.ue)) {
						e.ue = _, e.l &= -129;
						continue;
					}
					Ke(e, n);
				}
				e.l & 128 && Je(e, n);
			}
			F.length = 0, Ce?.(n), We.splice(0);
		} else {
			yt();
			for (let e = 0; e < He.length; e++) {
				let t = He[e];
				t.T?.U == null && !t.Ae && Nt(t);
			}
		}
		He.length &&= 0;
		let r = this.rn;
		this.rn = [[], []];
		for (let e = E.length - 1; e >= 0; e--) {
			let t = E[e];
			Le(t) || (E.splice(e, 1), me?.(t), st(t), e = E.length);
		}
		we?.();
		let i = n && Pe(n);
		Te?.(i);
		let a = i !== null;
		for (let e = 0; e < 2; e++) a && lt(i.rn[e], r[e]), this.rn[e] = a || this.rn[e].length ? [].concat(a ? [] : r[e], this.rn[e]) : r[e];
		if (We.length !== 0) {
			let e = We.splice(0).sort((e, t) => e.he - t.he);
			for (let t = 0; t < e.length; t++) e[t].R & 64 || H(e[t]);
		}
		xe?.();
	}
	run(e) {
		let t = this.rn[e - 1];
		t.length && (this.rn[e - 1] = [], xt(t, e));
	}
	enqueue(e, t, n = D) {
		e && (n?.P ? n : this).rn[e - 1].push(t), P();
	}
	notify(e, t, n, r) {
		return ve?.(e, n & t, r) ? !0 : t & 1 ? (n & 1 && D === null && Fe(null), !0) : !1;
	}
};
function ot(e) {
	let t;
	for (let n = 0; n < e.fn.length; n++) {
		let r = e.fn[n], a = r.T?.U?.source;
		if (!(r.R & 64 || r.m & 2 && (r.i || !(r.l & 8388608)) && a !== r && (a?.m ?? 2) & 2) && r.R & 2048) {
			t = 1, e.P || (r.R &= ~i), r.Ae = !1;
			for (let e = r.pe; e !== null; e = e.Ge) e.i && (e.Ae = !1);
			ge?.(r), St(r);
		}
	}
	return e.fn.length = 0, t;
}
function st(e) {
	let t = ot(e);
	for (let t = 0; t < e.ln.length; t++) {
		let n = e.ln[t];
		n.T.Re !== null && A(n) === e && (n.T.Re = null, vt(n));
	}
	O === e && (O = null), t ? I.rn[1].push(() => ct(e)) : ct(e);
}
function ct(e) {
	for (let t = 0; t < 2; t++) lt(I.rn[t], e.rn[t]), e.rn[t] = [];
}
function lt(e, t) {
	for (let n = 0; n < t.length; n++) e.push(t[n]);
}
var F = [];
function ut(e, t) {
	t.fn.push(e), e.R |= i;
}
function dt(e) {
	F.push(e), I.Y || kn();
}
var ft = 0;
function pt() {
	ft++;
}
function mt(e) {
	e.we = ft;
	let t = !!(e.l & 512) && e.T?.De !== void 0;
	for (let n = e.o; n !== null; n = n.t) {
		let r = n.u;
		r.R & 4 && n.Ne === r.de && (n !== r._ || !e.X) && (r.R |= a), t && r.l & 8 ? r.R |= 256 : (St(r), r.R & 8388608 && Dt(r._parent, 1));
	}
}
function ht(e) {
	e.Ae = !0, I.enqueue(e.i, e.W ??= at.q.bind(null, e));
}
function gt(e) {
	return e.ue !== _ && (e.le = e.ue, e.ue = _);
}
function _t(e) {
	return !(e.m & 4) && !!e.T?.Ee && !e.T.Ve && (e.ue = _, !0);
}
function vt(e) {
	if (!e.X) {
		e.l &= -385, gt(e);
		return;
	}
	let t = !!(e.m & 1) && (e.ue === _ || _t(e)), n = e.l & h;
	if (!t && e.T && (e.T.Te = null), e.l = t ? e.l & -1048833 | m : e.l & -3147137, n) {
		let t = e.ue;
		e.ue = _, e.ie = N + 1, an(e, 2, t);
	} else gt(e) && (e.m &= -5, e.T != null && (e.T.Ve = !1, e.T.je = _), e.i && e.i !== 3 && ht(e));
	e.Ie = !1, e.R &= ~r, e.T?.U ?? Nt(e), e.m & 1 || (e.m &= -5), !t && e.T != null && (e.T.me !== null || e.T.Le !== null) && at.Ce(e, !1, !0);
}
function yt() {
	for (let e = 0; e < F.length; e++) {
		let t = F[e];
		t.l & 2304 || vt(t);
	}
	F.length = 0;
}
var I = new at();
function bt(e) {
	if ($e > 0) return e ? e() : void 0;
	if (e) {
		Qe++;
		try {
			return e();
		} finally {
			try {
				bt();
			} finally {
				Qe--;
			}
		}
	}
	if (!I.Y && !Xe) {
		for (; Ye;) I.flush();
		ee();
	}
}
function xt(e, t) {
	for (let n = 0; n < e.length; n++) e[n](t);
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/heap.js
function St(e) {
	M.Fe > e.he && (M.Fe = e.he), wt(e, M);
}
function Ct(e, t) {
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
function wt(e, t) {
	let n = e.R;
	n & 12 || (n & 1 ? e.R = n & -4 | 10 : (e.R = n | 8, t.p && Dt(e)), n & 16 || Ct(e, t));
}
function Tt(e, t) {
	let n = e.R;
	n & 28 || (e.R = n | 16, Ct(e, t));
}
function L(e, t) {
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
function Et(e) {
	if (!e.p) {
		e.p = !0;
		for (let t = 0; t <= e.Et; t++) for (let n = e.et[t]; n !== void 0; n = n.ve) n.R & 8 && Dt(n);
	}
}
function Dt(e, t = 2) {
	let n = e.R;
	if (!((n & 3) >= t)) {
		e.R = n & -4 | t;
		for (let t = e.o; t !== null; t = t.t) Dt(t.u, 1);
	}
}
function Ot(e, t) {
	for (e.p = !1, e.Fe = 0; e.Fe <= e.Et; e.Fe++) {
		let n = e.et[e.Fe];
		for (; n !== void 0;) n.R & 8 ? t(n) : kt(n, e), n = e.et[e.Fe];
	}
	e.Et = 0;
}
function kt(e, t) {
	L(e, t);
	let n = e.he;
	for (let t = e.C; t; t = t.G) {
		let e = t.S;
		e.X && e.he >= n && (n = e.he + 1);
	}
	if (e.he !== n) {
		e.he = n, At(e, n);
		for (let n = e.o; n !== null; n = n.t) n.u !== e._parent && Tt(n.u, t);
	}
}
function At(e, t) {
	for (let n = e.pe; n; n = n.Ge) if (n.Qe) At(n, t);
	else if (n.he <= t) {
		let e = n.R & 24;
		L(n, M), n.he = t + 1, e && (e & 8 ? wt : Tt)(n, M), At(n, t + 1);
	}
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/graph.js
var jt;
function Mt(e) {
	let t = e.S, n = e.G, r = e.t, i = e.en;
	return r === null ? t.Ze = i : r.en = i, i === null ? (t.o = r, r === null && (t.l & 4096 ? jt(t) : t.T?.Ye && C(t.T.Ye), t.X && t.l & 32 && !(t.R & 32) && !(t.m & 1) && (Ft ? Ft.push(t) : Lt(t)))) : i.t = r, n;
}
function Nt(e) {
	let t = e._, n = t === null ? e.C : t.G;
	if (n !== null) {
		do
			n = Mt(n);
		while (n !== null);
		t === null ? e.C = null : t.G = null;
	}
}
function Pt(e) {
	e.C && (e._ = null, Nt(e));
}
var Ft = null, It = (e) => Ft = e;
function Lt(e) {
	L(e, M), Pt(e), w(e, !0);
}
var Rt = new b();
function zt() {
	if (Rt.size !== 0) {
		for (let e of Rt) !e.o && e.l & 32 && !(e.m & 1) && !(e.R & 96) && Lt(e);
		Rt.clear();
	}
}
function Bt(e, t) {
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
	n === null ? t.C = o : n.G = o, a === null ? e.o = o : a.t = o, pt();
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/async.js
function Vt(e, t) {
	return !e.T?.se?.has(t) && ((U(e).se ??= new b()).add(t), !0);
}
function Ht(e, t) {
	let n = e.T?.se;
	return n?.delete(t) ? (n.size || (e.T.se = void 0), !0) : !1;
}
function Ut(e) {
	e.T !== null && (e.T.Ee = null);
}
function Wt(e) {
	e.T !== null && (e.T.se = void 0);
}
function Gt(e, t) {
	for (let n = e.C; n; n = n.G) {
		let e = n.S;
		if (!(e.R & 64) && (e === t ? e.m & 1 : e.T?.se?.has(t))) return !0;
	}
	return !1;
}
function Kt(e, t) {
	U(e).fe = !0, t.source && Vt(e, t.source), e.m & 2 || R(e, t.source, t);
}
function R(t, n, r) {
	if (!n) {
		t.T !== null && (t.T.U = null);
		return;
	}
	let i = r instanceof e && r.source === n ? r : t.T?.U;
	U(t).U = i instanceof e && i.source === n ? i : new e(n);
}
function qt(e, t) {
	for (let n = e.o; n !== null; n = n.t) t(n.u, n);
}
function Jt(e, t) {
	let n = new b(), r = (e) => {
		let i = n.has(e);
		t(e, i) !== !1 && !i && (n.add(e), qt(e, r));
	};
	qt(e, r);
}
function Yt(e) {
	e.X && e.l & 32 && !e.o && !(e.R & 32) && !(e.m & 1) && (e.R & 8 ? e.R |= d : Lt(e));
}
function Xt(e) {
	let t;
	if (Jt(e, (e, n) => {
		!n && !e.o && e.l & 32 && (t ??= []).push(e);
	}), t) for (let e of t) Yt(e);
}
function Zt(e, n, r) {
	return !(e.l & 256 || r && e.R & 16384 && I.Y && !e.rr) || D ? !1 : (Wt(e), e.T && (e.T.fe = !1), (e.m &= 6) & 2 || R(e), e.ue = n instanceof t ? n : new t(e, n), e.l |= 128 | h, z(e), P(), !0);
}
function Qt(e, t) {
	let n = !1;
	Jt(e, (e, r) => {
		!r && e.T?.U === t && (St(e), n = !0);
	}), n && P();
}
function z(e, t = e) {
	Ht(e, t);
	let n = !1, r;
	if (Jt(e, (i, a) => {
		if (a || t !== e && Gt(i, t) || !Ht(i, t)) return !1;
		i.ie = N;
		let o = i.T?.se?.values().next().value, s = i.m & 2;
		o ? s || R(i, o) : (i.m &= -2, s || R(i), i.l & 256 && !(t.m & 1) && Fe(A(i)), i.T?.fe && (St(i), n = !0), i.T !== null && (i.T.fe = !1), !i.o && i.l & 32 && (r ??= []).push(i), Oe?.(i, e));
	}), r) for (let e of r) Yt(e);
	n && P();
}
function $t(e) {
	return typeof e == "object" && !!e && typeof e.then == "function";
}
function en(e) {
	let t = e.T?.Se;
	t != null && (e.T.Se = null, t());
}
function tn(t, n, r, i) {
	let a = !1, o = !1;
	if (typeof n == "object" && n && wn(() => {
		a = n[Symbol.asyncIterator], o = !a && $t(n);
	}), !o && !a) return t.T !== null && (t.T.Ee = null), t.Ie = !1, n;
	U(t).Ee = n, t.T.ce = et || 2147483647, t.T.se = void 0;
	let s, c = (r) => {
		if (t.T?.Ee !== n) return;
		let a = r instanceof e;
		a && t.Ie ? (Ut(t), Kt(t, r), t.ie = N) : ((a || !Zt(t, r)) && (an(t, a ? 1 : 2, r), a || w(t, !1, !0)), a && z(t), t.ie = N, a || Xt(t), i?.(r, a));
	}, l = (e, i) => {
		if (t.T?.Ee !== n || t.R & 2) return;
		let a = De && F.some((e) => e.ue !== _), o = t.m & 4;
		if (rn(t), r) {
			if (!r(e, o, c)) return;
		} else Wn(t, () => e);
		t.ue === _ && (t.Ie = !1, Nt(t)), z(t), P(), (i || !a) && bt(), i?.();
	}, u = () => t.l & 32 && !t.o && !(t.m & 1) ? (Lt(t), !0) : !1, d = (e, r) => {
		let i = e[Symbol.asyncIterator](), a = !1, o = !1, d = !r, f = () => {
			if (!o) {
				o = !0;
				try {
					let e = i.return?.();
					$t(e) && e.then(void 0, () => {});
				} catch {}
			}
		};
		se(f, r), U(t).Se = f;
		let p = () => {
			try {
				u() || m();
			} catch (e) {
				c(e);
			}
		}, m = () => {
			let e, r, f = !1, h = !1, g = !0, _ = i.next();
			if (($t(_) ? _ : { then: (e) => void e(_) }).then((r) => {
				if (g && d) e = r, f = !0, r.done && (o = !0);
				else if (t.T?.Ee !== n) return;
				else r.done ? (o = !0, a ? (P(), bt()) : l(void 0), u()) : (a = !0, l(r.value, p));
			}, (e) => {
				g && d ? (r = e, h = !0) : t.T?.Ee === n && (o = !0, c(e), u());
			}), g = !1, h) {
				if (o = !0, c(r), d) throw r;
				return !0;
			}
			return f && !e.done ? (s = e.value, a = !0, m()) : f && e.done;
		}, h = m();
		return d = !1, a || h;
	}, f = null, p = (e, t) => {
		let n = !1;
		if (typeof e == "object" && e && wn(() => {
			n = e[Symbol.asyncIterator];
		}), !n) return !1;
		s = void 0;
		let r = d(e, t);
		return t || (f = r), !0;
	};
	if (o) {
		let e = !1, r = !1, i, a = !0;
		if (n.then((r) => {
			if (a) s = r, e = !0;
			else {
				try {
					if (t.T?.Ee === n && !(t.R & 64) && p(r, t)) return;
					l(r);
				} catch (e) {
					c(e);
				}
				u();
			}
		}, (e) => {
			a ? (i = e, r = !0) : (c(e), u());
		}), a = !1, r) throw c(i), i;
		e ? p(s) || (t.Ie = !1) : f = !1;
	}
	if (a && p(n), f !== null) {
		if (!f) {
			if (t.Ie) return t.le;
			throw new e(V);
		}
		t.Ie = !1;
	}
	return s;
}
function nn(e, t = !1) {
	e.T?.se && Wt(e), e.T?.fe && (e.T.fe = !1), e.m = t ? 0 : e.m & 4, e.T?.U && R(e);
	let n = vn(e);
	n && n.call(e);
}
function rn(e, t = !1) {
	let n = e.T?.se;
	n && (n.delete(e), n.size) ? (e.T.fe = !1, t && (e.m = 1), R(e, n.values().next().value)) : nn(e, t);
}
function an(n, r, i) {
	r === 2 && !(i instanceof t) && !(i instanceof e) && (i = new t(n, i));
	let a = r === 1 && i instanceof e && i.source;
	a ? (n.m & 2 && (n.T.Te = n.T.U), Vt(n, a)) : Wt(n), n.m = r | (r === 2 ? n.m & 12 ? 8 : 0 : r === 1 && n.m & 8 ? 4 : n.m & 4), a ? R(n, a, i) : U(n).U = i;
	let o = vn(n);
	o ? o.call(n) : on(n, r, i);
}
function on(t, n, r) {
	let i = n === 1 && r instanceof e && r.source;
	qt(t, (e, a) => {
		e.ie = N, e.l & 16384 || n === 1 && a.Ne !== e.de ? (n !== 1 && Ht(e, t) && z(e, t), St(e), P()) : i && e.T?.se?.has(i) ? D === null && (e.l & 2304) == 256 && I.Y && !ye?.(e, i.ie === N) && Fe(A(e)) : (i || n !== 1 && (e.T?.U !== r || e.T?.se)) && (dt(e), n === 1 && (e.l & 2304) == 256 && !e.i && Fe(A(e)), an(e, n, r), e.rr?.st(n, r));
	});
}
at._e = (e) => {
	e.i === 3 ? (L(e, M), e.Ae = !0, I.enqueue(2, e.Z)) : e.R & 32 && !(e.R & 65536) ? Ge(e) : H(e);
}, at.Ce = w;
var B = !1, V = null, sn;
function H(t, n = !1) {
	pt();
	let r = t.i, f, p = D, m = de && (sn = n && (p || sn)), g = t.l & h;
	if (!n) {
		if (L(t, M), t.T !== null && (t.T.Ee = null, en(t)), t.l & 256) {
			let e = A(t);
			e.P || t.l & 524288 || (t.l & 8421376 ? e !== O && !(t.m & 4 || t.l & 1048576) && (t.ue !== _ && mt(t), t.ue = _, t.l &= -257) : Ne(e, ye?.(t, t.m & 4)));
		}
		if (r === 3 || t.l & 128) {
			let e = Ft;
			It(f = []), w(t), It(e);
		} else (t.pe !== null || t.ke !== null) && mn(t);
		t.l & 2097152 && (t.ue = _, t.l ^= h);
	}
	let v = t.m & 4, y = t.m & 2 && t.T?.U, b = !!(t.m & 1) && t.T?.se, x = t.T?.se?.has(t), S = !1, C = !!(t.R & 8192) && !((t.m & 1 || t.ue !== _ && !(t.R & 1024)) && t.T !== null && !t.T.Ve), ee = V;
	V = t, t._ = null, t.de++;
	let te = t.R & d;
	t.R = 4 | t.R & (32 | o), t.ie = N;
	let T = t.ue === _ ? t.le : t.ue, ne = t.he, re = !1, ie = !1, ae = B;
	B = !0;
	try {
		if (t.l & 64) T = t.X(T), t.T !== null && (t.T.Ee = null), t.Ie = !1;
		else {
			let e = t.T?.Ee, n = t.X(T), r = typeof n == "object" && !!n, i = t.T?.Ee !== e;
			T = i || !r ? n : tn(t, n), !i && !r && (t.T !== null && (t.T.Ee = null), t.Ie = !1);
		}
		(t.m !== 0 || t.T !== null) && nn(t, n);
	} catch (n) {
		let r = n instanceof e;
		if (r && t.Ie) Kt(t, n);
		else if ((r || !(S = Zt(t, n, !0))) && (r && (U(t).fe = !0), an(t, r ? 1 : 2, n), r && x && !t.T?.Ee && z(t)), (r || S) && b) for (let e of b) e !== t && !(t.T?.se?.has(e) && (e.m & 1 || Gt(t, e))) && z(t, e);
	} finally {
		if (B = ae, re = (t.R & a) !== 0, ie = !!(t.R & (m ? p || r || !(t.m & 1) ? 128 | s : 0 : 128)), t.R = t.R & (96 | i | s | c | l | u) | (n ? t.R & 256 : 0), V = ee, f) for (let e of f) Yt(e);
		t.T !== null && (t.T.Ve = C && !!(t.m & 1));
	}
	if (t.R & 64) {
		Pt(t), Ut(t);
		return;
	}
	let oe = !!t.T?.U || S;
	if (!oe) {
		let e = t.ue === _, i = e ? t.le : t.ue, a = O ?? k, o = e && v && !r || !!t.T?.Te || !!(y && a) || !!g || !Un(t, i, T);
		if (r && o && !(t.R & 262144 && !t.Ae && Object.is(t.ge, T)) && e && (t.Ae = !t.T?.U, n || I.enqueue(r, t.W ??= at.q.bind(null, t), null)), !oe) {
			if (o) (n ? !(a !== null && (ie || pn(ee)?.R & 128)) : r && t.ue === _) ? t.le = T : (t.ue = T, y && (t.T.Te = y), n && (Ke(t, a), t.m |= 4, ye?.(t, !m && O))), t.o !== null && mt(t);
			else if (t.he != ne) for (let e = t.o; e !== null; e = e.t) Tt(e.u, M);
		}
		if (!o && !t.T?.U && (y && Qt(t, y), b)) for (let e of b) e !== t && z(t, e);
		x && !(t.m & 5) && z(t);
	}
	if (n && ie && t.m & 1) {
		let e = O ?? k;
		e && !e.P && (r && ye?.(t) === 2 || Ke(t, e));
	}
	!t.T?.U && t.ue === _ && !(r && t.Ae) && (n || r === 3 ? Nt(t) : Ue(t)), (t.ue !== _ || t.T !== null && (t.T.me !== null || t.T.Le !== null) || t.m & 5 && (!n || t.m & 1)) && (t.l |= 128, dt(t)), re && (St(t), P()), te && Yt(t);
}
function cn(e) {
	if (!(e.R & 68)) {
		if (e.R & 1) for (let t = e.C; t; t = t.G) {
			let n = t.S;
			if (n.X && cn(n), e.R & 2) break;
		}
		(e.R & 2 || e.T?.U && e.ie < N && !e.T?.Ee) && H(e), e.R &= 376 | r | i | s | c | l | u;
	}
}
function ln(e, t) {
	let n = t?.transparent ?? !1, r = typeof t == "object" && !!t && "loadingValue" in t, i = {
		id: ie(t, n, V),
		l: (n ? 4 : 0) | !!t?.ownedWrite | (!V || t?.lazy ? 32 : 0) | (t?.sync ? 64 : 0) | (t?.ae ? 2 : 0) | (t?.xe ?? 0),
		ye: t?.equals ?? Sn,
		ke: null,
		A: V?.A ?? v,
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
		_parent: V,
		Ge: null,
		Me: null,
		pe: null,
		R: t?.lazy ? 512 : 0,
		m: r ? 0 : 4,
		ie: N,
		ue: _,
		we: -1,
		Ie: r,
		T: null
	};
	return t?.unobserved && (U(i).Ye = t.unobserved), bn(i, t), i;
}
function U(e) {
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
		je: _,
		Be: -1,
		ce: 0,
		Ue: !1,
		I: 0,
		Te: null
	};
}
function un(e, t) {
	e.R |= 128, (t.m & 4 || e.i !== 1) && Ne(A(t), !e.i && e.m & 4 || ye?.(e));
}
function dn(e, t) {
	let n = Ee && e.l & 32768, r = de && D !== null;
	if (!(n && Ae(e, t)) && !((!r || e.m & 4 && t.m & 1) && !n && (!(e.l & 1 << 23) || t.l & 1024))) {
		let i = A(t);
		if (r && D.over && j(D.over) === i && !n) return !1;
		if (!(!r && i === O && !n || fn(e, i))) return ut(e, i), (r || n) && _e(e, t), !0;
	}
	return un(e, t), !1;
}
function fn(e, t) {
	return (e.m & 4 || e.l & 1048576) && e.l & 256 && A(e) === t;
}
function pn(e) {
	return e !== null && e.Qe ? e.Ke : e;
}
function mn(e) {
	x(e);
	let t = U(e);
	t.Le = e.ke, t.me = e.pe, e.ke = null, e.pe = null, e.be = 0;
}
function hn(e, t, n, r, i) {
	let a = i?.transparent ?? !1, o = {
		id: ie(i, a, V),
		l: r << 23 | (a ? 4 : 0) | !!i?.ownedWrite | (i?.sync ? 64 : 0) | (i?.xe ?? 0),
		ye: !1,
		ke: null,
		A: V?.A ?? v,
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
		_parent: V,
		Ge: null,
		Me: null,
		pe: null,
		R: 512,
		m: 4,
		ie: N,
		ue: _,
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
	return i?.unobserved && (U(o).Ye = i.unobserved), bn(o, yn), o;
}
var gn = null;
function _n(e) {
	gn = e;
}
function vn(e) {
	return e.i ? gn : null;
}
var yn = { lazy: !0 };
function bn(e, t) {
	e.We = e;
	let n = V?.Qe ? V.Ke : V;
	V && te(V, e), n && (e.he = n.he + 1), je?.(e), !t?.lazy && H(e, !0);
}
function xn(e, t) {
	let n = {
		ye: t?.equals ?? Sn,
		l: +!!t?.ownedWrite | (t?.ae ? 2 : 0),
		le: e,
		o: null,
		Ze: null,
		ie: N,
		ue: _,
		we: -1,
		T: null
	};
	return t?.unobserved && (U(n).Ye = t.unobserved), n;
}
function Sn(e, t) {
	return e === t;
}
var Cn = null;
function wn(e, t) {
	let n = B;
	B = !1;
	try {
		return e();
	} finally {
		B = n;
	}
}
var Tn = 0;
function En(e, t) {
	if (e.R & 512) e.R &= -513, H(e, !0);
	else if (e.R & 64 && e.l & 32) {
		let t = e._parent;
		if (t !== null) {
			if (t.R & 64) {
				e.l &= -33;
				return;
			}
			e.R & 32 || te(t, e);
		}
		H(e, !0);
	}
}
function Dn(e, t) {
	return !t || e.ue === _ || t.l & 16;
}
var On = !1;
function kn() {
	On = !0;
}
function An(e) {
	return I.Y || e.ue === _ || e.l & 4194304 ? _ : e.l & 256 ? e.T.Be === N ? e.T.je : _ : e.le;
}
function jn(e) {
	let t = e.T;
	t.Be !== N && (t.je = e.ue, t.Be = N, On = !0);
}
var Mn = [];
function Nn(e) {
	return e.R |= a, !0;
}
function Pn() {
	if (On = !1, Mn.length !== 0) {
		for (let e of Mn) e.l &= ~g;
		Mn.length = 0;
	}
}
function Fn(e, t) {
	e.he >= M.Fe || e.R & 1 ? (Dt(t), Et(M), cn(e)) : t.l & 65536 && cn(e);
	let n = e.he;
	e._parent === t ? e.R |= f : n >= t.he && At(t, t.he = n + 1);
}
function In() {
	return V.R & i;
}
function Ln(e) {
	let t = V;
	if (t?.Qe && (t = t.Ke), Cn !== null) return Cn(e, t);
	if (typeof e.X == "function" && En(e), !e.X && e.T?.De === void 0 && (!On || e.ue === _) && !(e.l & 2048)) return t && (B && Bt(e, t), e.l & 256 && !(t.l & 16) && dn(t, e)) || !t || e.ue === _ || t.l & 16 || e.ue === e.le && Object.is(e.ue, e.le) ? e.le : (Bn(t), e.ue);
	let n = !1, r;
	if (t && (B && (r = Bt(e, t), e.X && Fn(e, t)), e.l & 256 && !(e.l & 2048) && !(t.l & 16) && (e.m & 4 ? un(t, e) : n = dn(t, e))), e.m & 1 && !n) {
		if (t) {
			if (!(t.l & 16) || e.m & 4) throw !B && e !== t && Bt(e, t), e.T?.U;
		} else if (e.m & 4) throw e.T?.U;
	}
	if (e.X && e.m & 2) {
		if (r && e.ie < N && !(e.R & 32)) return H(e), Ln(e);
		throw !n && e.l & 2097152 && zn(e, t), e.T?.U;
	}
	(n || !t) && Rn(e);
	let i = zn(e, n ? null : t);
	return !t && typeof e.X == "function" && e.l & 32 && !(e.m & 1) && !e.o && (Rt.add(e), P()), i;
}
function Rn(e) {
	if (e.T?.Te) throw e.T.Te;
}
function zn(t, n) {
	if (t.ue !== _ && t.m & 4 && (!n || n.l & 16)) {
		if (Tn > 0) {
			let e = pn(V);
			if (e && t.l & 256 && fn(e, A(t))) return t.ue;
		}
		throw new e(null);
	}
	let r = n && On ? An(t) : _;
	if (r !== _) return Nn(n), r;
	if (Dn(t, n)) return t.le;
	if (Bn(n, t), t.l & 2097152) throw t.ue;
	return t.ue;
}
function Bn(e, t) {
	t?.m & 4 || (e.R |= s);
}
function Vn(e) {
	I.Y || e.l & 4194304 || (e.l |= g, Mn.push(e));
}
var Hn = null;
function Un(t, n, r) {
	if (t.ye === Sn) return n === r;
	try {
		return t.ye && t.ye(n, r);
	} catch (n) {
		if (!(n instanceof e)) return an(t, 2, n), !0;
	}
}
function Wn(e, t) {
	Hn !== null && Hn(e);
	let n = e.ue === _ ? e.le : e.ue;
	if (typeof t == "function" && (t = t(n)), e.l & 256 && Fe(A(e)), !(e.m & 4 || e.T?.Te || !Un(e, n, t))) return t;
	let r = e.ue !== _;
	return r ? e.l & 256 && !I.Y && jn(e) : dt(e), e.ue = t, V !== null && Vn(e), e.X !== void 0 && (e.ie = N), r && e.we === ft || (mt(e), P()), t;
}
function Gn(e, t) {
	let n = e.l & 256 && !(e.R & 1024) && A(e) !== O;
	if (n && typeof t == "function") {
		let n = t(e.le);
		t = () => n;
	}
	return e.m & 2 && (e.T.Te = e.T.U, an(e, 0)), t = Wn(e, t), e.l &= ~h, n ? (e.R = e.R & -2 | 2, wt(e, M), P()) : e.ue !== _ && (e.R |= r), t;
}
function Kn(e, t) {
	let n = V, r = B;
	V = e, B = !1;
	try {
		return t();
	} finally {
		V = n, B = r;
	}
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/identities.js
var qn = null;
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/core/effect.js
function Jn(e, t, n, r) {
	let i = hn(e, t, n, r?.user ? 2 : 1, r);
	H(i, !0), r?.defer ? gt(i) : i.ue === _ && (i.T?.Re?.P || i.i === 2 || r?.schedule ? I.enqueue(i.i, Zn.bind(null, i), i.T?.Re) : Zn(i, 0));
}
function Yn() {
	let e = this.m, t = this.T?.U;
	if (e & 2) {
		if (I.notify(this, 1, 0), this.i === 2) {
			this.m & 2 && ht(this);
			return;
		}
		Xn(this, n(t));
	} else this.i === 2 ? e & 1 && this.Ae && !t?.source?.T?.Ve && (U(this).fe = !(this.Ae = !1)) : this.i === 1 && I.notify(this, 3, e, t);
}
function Xn(e, t, n) {
	if (!I.notify(e, 2, 2)) throw rt(t), t;
}
function Zn(e, r) {
	if (!e.Ae || e.R & 64 || r && Se?.(e) || r && ke?.(e)) return;
	if (e.m & 2 && e.i === 2) {
		let t = n(e.T?.U);
		e.ge = e.le, e.Ae = !1;
		try {
			e.Je ? e.Je(t, () => {
				let t = e.ze;
				e.ze = void 0, t?.();
			}) : console.error(t);
		} catch (t) {
			Xn(e, t);
		}
		return;
	}
	let i = e.T?.U == null, a = e.ze;
	e.ze = void 0;
	try {
		a?.(), e.ze = e.qe(e.le, e.ge);
	} catch (n) {
		U(e).U = new t(e, n), e.m |= 2, Xn(e, n);
	} finally {
		e.ge = e.le, e.Ae = !1, i && Nt(e);
	}
}
at.q = Zn, _n(Yn);
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/store/types.js
var Qn = Symbol(0), $n = Symbol(0), er = null;
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/signals.js
function W(e) {
	let t = Ln.bind(null, e);
	return t[y] = e, t;
}
function tr(e, t) {
	if (typeof e == "function") {
		let n = ln(e, t);
		return n.l &= -33, [W(n), Gn.bind(null, n)];
	}
	let n = xn(e, t);
	return qn !== null && qn(n), [W(n), Wn.bind(null, n)];
}
function nr(e, t) {
	return W(ln(e, t));
}
function rr(e, t, n) {
	Jn(e, t.effect || t, t.error, {
		user: !0,
		...n
	});
}
function ir(e, t, n) {
	Jn(e, t, void 0, n);
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/map.js
function ar(e, t, n) {
	let r = typeof n?.keyed == "function" ? n.keyed : void 0, i = t.length > 1, a = t, o = {
		H: le(),
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
	}, s = ln(fr.bind(o), void 0);
	return s.l &= -33, W(s);
}
var or = { ownedWrite: !0 };
function sr(e, t, n, r) {
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
	return cr(e, t, n, r, o, s, c);
}
function cr(e, t, n, r, i, a, o) {
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
function lr(e, t, n, r, i, a, o, s, c) {
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
function ur(e, t, n, r, i, a, o, s, c) {
	let l = e.ln, u = e.ct, d = e.lt, f = e.it, p = n - f, m, h;
	if (p > 0) for (l.length = n, u && (u.length = n), d && (d.length = n), m = f - 1, h = n - 1; m > i; m--, h--) l[h] = l[m], u && (u[h] = u[m]), d && (d[h] = d[m]);
	else if (p < 0) {
		for (m = i + 1, h = a + 1; m < f; m++, h++) l[h] = l[m], u && (u[h] = u[m]), d && (d[h] = d[m]);
		l.length = n, u && (u.length = n), d && (d.length = n);
	}
	for (h = r; h <= a; h++) l[h] = o[h - r], u && dr(u[h] = s[h - r], t[h]), d && Wn(d[h] = c[h - r], h);
	for (h = a + 1; h < n; h++) u && dr(u[h], t[h]), d && p !== 0 && Wn(d[h], h);
}
var dr = (e, t) => e.le === t && e.ue === _ || Wn(e, t);
function fr() {
	this.H.Ke = oe();
	let e = this.st() || [];
	e[Qn], e = er?.(e[$n]) ?? e;
	let t = e.length;
	return Kn(this.H, pr.bind(this, e, t)), this.ht;
}
function pr(e, t) {
	let n = e.slice(0), r, i, a, o, s, c = this.ct ? this.ut ? () => (o[a] = xn(n[i], or), this.ft(W(o[a]), i)) : () => (o[a] = xn(n[i], or), s && (s[a] = xn(i, or)), this.ft(W(o[a]), s ? W(s[a]) : void 0)) : this.lt ? () => {
		let e = n[i];
		return s[a] = xn(i, or), this.ft(e, W(s[a]));
	} : () => {
		let e = n[i];
		return this.ft(e);
	};
	if (t === 0) this.it !== 0 && (this.H.dispose(!1), this.ln = [], this.ot = [], this.ht = [], this.it = 0, this.ct &&= [], this.lt &&= []), this.L && !this.ht.length && (this.ln[0]?.dispose(), this.ht[0] = Kn(this.ln[0] = le(), this.L));
	else if (this.it === 0) {
		let e = Array(t), l = Array(t);
		o = this.ct && Array(t), s = this.lt && Array(t);
		try {
			for (i = 0; i < t; i++) a = i, e[i] = Kn(l[i] = le(), c);
		} catch (e) {
			for (r = 0; r <= i; r++) l[r]?.dispose();
			throw e;
		}
		this.ln[0] && this.ln[0].dispose(), this.ht = e, this.ln = l, o && (this.ct = o), s && (this.lt = s), this.ot = n, this.it = t;
	} else {
		let e, l, u, d, f, p, m, h, g;
		for (e = 0, l = Math.min(this.it, t); e < l && (this.ot[e] === n[e] || this.ct && mr(this.Xe, this.ot[e], n[e])); e++) this.ct && dr(this.ct[e], n[e]);
		for (l = this.it - 1, u = t - 1; l >= e && u >= e && (this.ot[l] === n[u] || this.ct && mr(this.Xe, this.ot[l], n[u])); l--, u--);
		if (e === t && this.it === t) {
			this.ot = n;
			return;
		}
		if (t <= this.it && l - e > 64 && this.ct === void 0 && this.lt === void 0) {
			let r = e + (u - e >> 1), i = n[r], a = Math.min(l, r + 32), o = Math.max(e, r - 32);
			for (; o <= a && this.ot[o] !== i;) o++;
			if (o <= a && sr(this, n, t, e)) return;
		}
		let _ = t - this.it, v = u - e + 1, y = Array(t), b = Array(v);
		o = this.ct ? Array(v) : void 0, s = this.lt ? Array(v) : void 0;
		let x = _ < 0 ? lr(this, n, e, l, u, y, b, o, s) : null;
		if (x !== null) x.length !== 0 && (h = x);
		else {
			for (p = /* @__PURE__ */ new Map(), m = Array(v), i = u; i >= e; i--) d = n[i], f = this.Xe ? this.Xe(d) : d, r = p.get(f), m[i - e] = r === void 0 ? -1 : r, p.set(f, i);
			for (r = e; r <= l; r++) d = this.ot[r], f = this.Xe ? this.Xe(d) : d, i = p.get(f), i !== void 0 && i !== -1 ? (y[i] = this.ht[r], b[i - e] = this.ln[r], o && (o[i - e] = this.ct[r]), s && (s[i - e] = this.lt[r]), i = m[i - e], p.set(f, i)) : (h ??= []).push(this.ln[r]);
			try {
				for (i = e; i <= u; i++) b[i - e] === void 0 && ((g ??= []).push(b[i - e] = le()), a = i - e, y[i] = Kn(b[i - e], c));
			} catch (e) {
				if (g) for (r = 0; r < g.length; r++) g[r].dispose();
				throw e;
			}
		}
		for (r = 0; r < e; r++) y[r] = this.ht[r];
		for (i = u + 1; i < t; i++) y[i] = this.ht[i - _];
		if (ur(this, n, t, e, l, u, b, o, s), this.ht = y, this.it = t, this.ot = n, h) for (r = 0; r < h.length; r++) h[r].dispose();
	}
}
function mr(e, t, n) {
	return !e || e(t) === e(n);
}
//#endregion
//#region node_modules/@solidjs/signals/dist/prod/flatten.js
function hr(e, t) {
	if (typeof e == "function" && !e.length) {
		if (t?.doNotUnwrap) return e;
		do
			e = e();
		while (typeof e == "function" && !e.length);
	}
	if (!t?.skipNonRendered || e != null && e !== !0 && e !== !1 && e !== "") {
		if (Array.isArray(e)) {
			let n = [];
			return gr(e, n, t) ? () => {
				let e = [];
				return gr(n, e, {
					...t,
					doNotUnwrap: !1
				}), e;
			} : n;
		}
		return e;
	}
}
function gr(t, n = [], r) {
	let i = null, a = !1;
	for (let o = 0; o < t.length; o++) try {
		let e = t[o];
		if (typeof e == "function" && !e.length) {
			if (r?.doNotUnwrap) {
				n.push(e), a = !0;
				continue;
			}
			do
				e = e();
			while (typeof e == "function" && !e.length);
		}
		Array.isArray(e) ? a = gr(e, n, r) || a : r?.skipNonRendered && (e == null || e === !0 || e === !1 || e === "") || n.push(e);
	} catch (t) {
		if (!(t instanceof e)) throw t;
		i = t;
	}
	if (i) throw i;
	return a;
}
//#endregion
//#region node_modules/solid-js/dist/solid.js
var _r = {
	hydrating: !1,
	registry: void 0,
	done: !1
}, vr = (...e) => nr(...e), yr = tr, br = ue, xr = ir, Sr = (...e) => rr(...e);
function G(e, t, n, r) {
	return wn(() => e(t || {}));
}
function Cr(e) {
	let t = "fallback" in e ? {
		keyed: e.keyed,
		fallback: () => e.fallback
	} : { keyed: e.keyed }, n = oe(), r, i = () => Kn(n, () => ar(() => e.each, e.children, t));
	return _r.hydrating && (r = i()), () => (r ??= i())();
}
//#endregion
//#region node_modules/solid-js/dist/internal.js
var wr = In, Tr = _r, K = /*#__PURE__*/ Symbol("slot"), Er = /*#__PURE__*/ Symbol("index"), Dr = {
	transparent: !0,
	sync: !0
}, Or = { sync: !0 };
function q(e, t, n) {
	xr(e, t, n ? {
		sync: !0,
		...n,
		transparent: !n.scope
	} : Dr);
}
function J(e) {
	return vr(() => e(), Or);
}
function kr(e, t, n, r) {
	let i = n.length, a = t.length, o = i, s = 0, c = 0, l, u, d, f;
	for (; s < a && t[s] === n[c];) s++, c++;
	if (s === a && c === o) return;
	let p = e.moveBefore && e.isConnected, m = r || e, h = (t, n) => {
		p && t.isConnected ? e.moveBefore(t, n) : e.insertBefore(t, n), (r || t[K]) && (t[K] = m);
	};
	if (!a) {
		for (let e of n) h(e, r);
		return;
	}
	let g = (t) => t && t.parentNode === e && (!(t = t[K]) || t === m), _ = (t) => {
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
			if (!l) for (l = 1, d = c; d < o;) n[d][Er] = d++;
			if ((d = f[Er]) >= 0 && n[d] === f) {
				if (c < d && d < o) {
					let i = s, l = 1;
					for (; ++i < a && i < o && t[i] === n[d + l];) l++;
					if (l > d - c) for (; c < d;) h(n[c++], f);
					else {
						let t = n[c++];
						s++, p ? h(t, f) : e.replaceChild(t, f), (r || t[K]) && (t[K] = m);
					}
				} else s++;
			} else f.remove(), s++;
		}
	}
}
var Ar = "_$$", jr = "_$SOLID_EVENT_OWNER", Mr = Symbol(), Nr = {}, Pr = /* @__PURE__ */ new Set(), Fr = /* @__PURE__ */ new Map();
function Ir(e, t, n, r = {}) {
	let i;
	zr(t);
	try {
		br((a) => {
			i = a, r.onError && (oe()[tt] = r.onError);
			let o = e();
			t === document ? q(() => hr(o), () => {}) : Q(t, () => o, t.firstChild ? null : void 0, n, {
				...r.insertOptions,
				schedule: !0
			});
		}, { id: r.renderId }), bt();
	} catch (e) {
		throw i && i(), Br(t), e;
	}
	return () => {
		i(), Br(t), t.textContent = "";
	};
}
function Lr(e, t, n) {
	let r = document.createElement("template");
	r.innerHTML = e;
	let i = r.content.firstChild;
	return n === 2 ? i.firstChild : i;
}
function Y(e, t) {
	let n;
	return (r) => (n ||= Lr(e, r, t), t === 1 ? document.importNode(n, !0) : n.cloneNode(!0));
}
function Rr(e) {
	for (let t of e) Pr.has(t) || (Pr.add(t), Fr.forEach((e, n) => Wr(t, n, e)));
}
function zr(e) {
	Vr(e, e);
}
function Br(e) {
	Hr(e, e);
}
function Vr(e, t = e) {
	if (!e || !t) return;
	let n = Fr.get(e);
	n || Fr.set(e, n = {
		owners: /* @__PURE__ */ new Map(),
		handlers: /* @__PURE__ */ new Map()
	}), n.owners.set(t, (n.owners.get(t) || 0) + 1), Pr.forEach((t) => Wr(t, e, n));
}
function Hr(e, t = e) {
	let n = Fr.get(e);
	if (!n) return;
	let r = n.owners.get(t);
	r > 1 ? n.owners.set(t, r - 1) : n.owners.delete(t), !n.owners.size && (n.handlers.forEach((t, n) => {
		e.removeEventListener(n, Ur, !0), e.removeEventListener(n, t);
	}), Fr.delete(e));
}
function Ur(e) {
	delete e[jr];
}
function Wr(e, t, n) {
	if (n.handlers.has(e)) return;
	let r = (e) => ni(e, t, n);
	n.handlers.set(e, r), t.addEventListener(e, Ur, !0), t.addEventListener(e, r);
}
var Gr = (e) => e._$host || e.parentNode || e.host;
function Kr(e, t) {
	let n = 0;
	for (; e;) {
		if (t.owners.has(e)) return {
			owner: e,
			distance: n
		};
		n++, e = Gr(e);
	}
}
var qr = null, Jr = [];
function Yr(e, t) {
	for (let n = 0; n < e.length; n++) e[n](t);
}
function Xr(e, t) {
	qr !== null && e._$claimed && Jr.some((e) => e.includes(t.slice(t.indexOf(":") + 1))) && Yr(qr, e);
}
function X(e, t, n) {
	if (ei(e)) return;
	let r = t === "multiple" && e.localName === "select";
	if (n == null || n === !1) e.removeAttribute(t);
	else if (e.setAttribute(t, n === !0 ? "" : n), r && !e._$multiple) {
		let t = e.options;
		for (let e = 0; e < t.length; e++) t[e].defaultSelected && (t[e].selected = !0);
	}
	r && (e._$multiple = !0), Xr(e, t);
}
function Zr(e, t, n, r) {
	if (r) {
		let r = Ar + t, i;
		Array.isArray(n) ? (i = n[1], e[r] = n[0]) : e[r] = n, e[`${r}Data`] = i;
	} else {
		if (Array.isArray(n)) {
			let r = n[0], i = (t) => r.call(e, n[1], t);
			return i[Mr] = n, e.addEventListener(t, i), i;
		}
		return e.addEventListener(t, n, typeof n != "function" && n), n;
	}
}
var Qr = { scope: !0 }, Z = null, $r = null;
function Q(e, t, n, r, i) {
	let a = n !== void 0;
	if (a && !r && (r = []), Z !== null && (r = Z.claimInitial(e, a, r)), typeof t != "function" && (t = ii(t, r, a, !0), typeof t != "function")) {
		ri(e, t, r, n), $r !== null && i && i.host && $r(t, i.host);
		return;
	}
	if (a && r.length === 0) {
		let t = document.createTextNode("");
		e.insertBefore(t, n), r = [t];
	}
	let o = !1;
	q(() => {
		Z !== null && (r = Z.reclaimRegion(r, e, n));
		let s = ii(t(), r, a, !0), c = o;
		return o = !0, typeof s == "function" ? (q(() => (Z !== null && (r = Z.reclaimRegion(r, e, n)), ii(s, r, a)), (t) => {
			r = ri(e, t, r, n), $r !== null && i && i.host && $r(r, i.host);
		}, c && !(i && i.schedule) ? {
			...i,
			schedule: !0
		} : i), Nr) : s;
	}, (t) => {
		t !== Nr && (r = ri(e, t, r, n), $r !== null && i && i.host && $r(r, i.host));
	}, t.$s ? i ? {
		...i,
		scope: !0
	} : Qr : i);
}
function ei(e) {
	return !Tr.hydrating || Tr.isClaiming && !Tr.isClaiming() ? !1 : !e || e.isConnected ? !0 : ti !== null && ti.claimed(e);
}
var ti = null;
function ni(e, t, n) {
	if (Z !== null && Z.dedupEvent(e)) return;
	let r = e[jr], i;
	if (r) {
		if (r === !0 || r === t || !t.contains(r)) return;
		i = r;
	}
	let a = n.owners.size === 1 && n.owners.has(t) ? t : Kr(e.target, n)?.owner;
	if (!a || a === i) return;
	e[jr] = a;
	let o = i || e.target, s = Ar + e.type, c = (t, n) => Object.defineProperty(e, t, {
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
		for (; o && l() && !u();) o = Gr(o);
	};
	if (i) i === e.target && (o = Gr(i)), o && o !== a && d();
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
function ri(e, t, n, r) {
	if (Z !== null && ei(e)) {
		if (t && t !== n) {
			let e = Array.isArray(t);
			for (let r of e ? t : [t]) if (r && r.nodeType) {
				if (!ei(r)) return n;
			} else if (e && (typeof r == "string" || typeof r == "number")) return n;
		}
		return t;
	}
	if (t === n) return t;
	if (Z !== null && Tr.hydrating && t && t.length !== 0) {
		let r = [].concat(n ?? []);
		if ([].concat(t).every((t) => (t === r[0] && r.shift(), t?.parentNode === e)) && !r.length) return t;
	}
	let i = typeof t;
	if (i === "string" || i === "number") {
		let r = typeof n;
		r === "string" || r === "number" ? e.firstChild.data = t : ai(e, n) ? e.textContent = t : (oi(e, n), e.insertBefore(document.createTextNode(t), e.firstChild));
	} else if (t === void 0) si(e, n, r);
	else if (t.nodeType) Array.isArray(n) ? si(e, n, r ?? null, t) : n != null && n.nodeType ? n.parentNode === e ? e.replaceChild(t, n) : e.appendChild(t) : n != null && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t), (r || t[K]) && (t[K] = r || e);
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
		t.length === 0 ? si(e, n, r) : i ? kr(e, n, t, r) : (n != null && si(e, n), kr(e, [], t));
	}
	return t;
}
function ii(e, t, n, r) {
	if (e = hr(e, {
		skipNonRendered: !0,
		doNotUnwrap: r
	}), r && typeof e == "function") return e;
	if (n && !Array.isArray(e) && (e = [e ?? ""]), Z !== null && Tr.hydrating && Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
		let r = e[n], i = t && t[n], a = typeof r;
		(a === "string" || a === "number") && i && i.nodeType === 3 && ei(i) && (e[n] = i);
	}
	return e;
}
function ai(e, t) {
	if (t == null) return !0;
	if (Array.isArray(t)) return t.length ? e.firstChild === t[0] && e.lastChild === t[t.length - 1] : e.firstChild === null;
	if (t === "") return e.firstChild === null;
	if (t.nodeType) return e.firstChild === t && e.lastChild === t;
	let n = e.firstChild;
	return n !== null && n.nodeType === 3 && e.lastChild === n;
}
function oi(e, t) {
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
function si(e, t, n, r) {
	if (n === void 0) return ai(e, t) ? e.textContent = "" : oi(e, t);
	if (t.length) {
		let i = !1;
		for (let a = t.length - 1; a >= 0; a--) {
			let o = t[a];
			if (r !== o) {
				let t = o[K], s = o.parentNode === e && (!t || t === (n || e));
				r && !i && !a ? s ? e.replaceChild(r, o) : e.insertBefore(r, n) : s && o.remove();
			} else i = !0;
		}
	} else r && e.insertBefore(r, n);
	r && (n || r[K]) && (r[K] = n || e);
}
var ci = {
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
}, li = [
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
], ui = {}, di = "en";
function $(e, t) {
	let n = ui[e] ?? ci[e];
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}
function fi(e) {
	if (!e) return "en";
	let t = li.find((t) => t.toLowerCase() === e.toLowerCase());
	if (t) return t;
	let n = e.split("-")[0].toLowerCase();
	return li.find((e) => e.split("-")[0].toLowerCase() === n) ?? "en";
}
async function pi(e) {
	let t = fi(e);
	if (t === di) return !1;
	if (t === "en") return ui = {}, di = "en", !0;
	try {
		let e = new URL(import.meta.url), n = await fetch(new URL(`i18n/${t}.json${e.search}`, e));
		if (!n.ok) return !1;
		let r = await n.json(), i = {};
		for (let e of Object.keys(ci)) typeof r[e] == "string" && (i[e] = r[e]);
		return ui = i, di = t, !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region src/solid/lit-css.ts
function mi(e) {
	let t = e.join(""), n = new CSSStyleSheet();
	return n.replaceSync(t), {
		cssText: t,
		styleSheet: n
	};
}
//#endregion
//#region src/styles.ts
var hi = mi`
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
  /* inside the floating window, which sets the size */
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
`, gi = /* @__PURE__ */ Y("<button class=small role=tab>"), _i = /* @__PURE__ */ Y("<div class=\"row ed\"><button class=\"small primary\"></button><button class=\"small ghost\">"), vi = /* @__PURE__ */ Y("<input maxlength=80>"), yi = /* @__PURE__ */ Y("<input maxlength=200>"), bi = /* @__PURE__ */ Y("<textarea rows=14 maxlength=20000>"), xi = /* @__PURE__ */ Y("<textarea rows=2>"), Si = /* @__PURE__ */ Y("<div class=row><input type=checkbox><div> <!>"), Ci = /* @__PURE__ */ Y("<b>"), wi = /* @__PURE__ */ Y("<span class=tag>"), Ti = /* @__PURE__ */ Y("<span class=err>"), Ei = /* @__PURE__ */ Y("<button class=\"small danger\">"), Di = /* @__PURE__ */ Y("<button class=\"small ghost\">"), Oi = /* @__PURE__ */ Y("<div class=notes><div class=bar role=tablist><!><span></span><button class=\"small primary\"></button></div><p></p><!><!><!><!>"), ki = /* @__PURE__ */ Y("<p class=err>"), Ai = /* @__PURE__ */ Y("<div class=empty>"), ji = ".notes{flex:1;min-height:0;overflow-y:auto}\n.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}\n.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}\n.bar span{flex:1;text-align:end}\n.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}\n.off>div{opacity:.55}\n.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}\n.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}\n.ed button{flex:none}\n.err{color:var(--danger)}";
function Mi(e) {
	let [t, n] = yr(), [r, i] = yr(!1), [a, o] = yr(), [s, c] = yr(""), [l, u] = yr(""), d = () => {
		o(void 0), c("");
	};
	async function f(t, r = {}) {
		let i = e.hass().connection, a = (e, t = {}) => i.sendMessagePromise({
			type: "llm_agent/home_notes" + e,
			...t
		});
		try {
			n(await a(t, r)), d(), u("");
		} catch (e) {
			let t = e;
			u(t.message ?? String(e)), t.code === "changed" && (n(await a("")), d());
		}
	}
	let p = !1;
	Sr(() => e.hass() !== void 0, (e) => {
		e && !p && (p = !0, f(""));
	});
	let m = (e, t, n = {}) => f(e, {
		kind: r() ? "knowledge" : "note",
		...t.id ? {
			item_id: t.id,
			base: t.updated
		} : {},
		...n
	}), h = () => (r() ? t()?.knowledge : t()?.notes) ?? [], g = (e) => (() => {
		var t = gi();
		return t._$$click = () => {
			i(e.on), d(), u("");
		}, Q(t, () => $(e.label)), q(() => e.on === r() ? "true" : "false", (e) => {
			X(t, "aria-selected", e);
		}), t;
	})(), _ = (e) => {
		let n = (t) => (n) => Object.assign(e.e, { [t]: n.target.value }), i = () => m("/save", e.e, r() ? {
			title: e.e.title,
			summary: e.e.summary,
			body: e.e.body
		} : { text: e.e.text });
		var a = _i(), s = a.firstChild, c = s.nextSibling;
		return Q(a, (() => {
			var i = J(() => !!r());
			return () => i() ? [
				(() => {
					var t = vi();
					return Zr(t, "input", n("title"), !0), q(() => ({
						e: $("knowledge_title"),
						t: $("knowledge_title"),
						a: e.e.title ?? "",
						o: wr()
					}), ({ e, t: n, a: r, o: i }, a) => {
						e !== a?.e && X(t, "aria-label", e), n !== a?.t && X(t, "placeholder", n), (r !== a?.a || !i) && (t.value = r ?? "");
					}), t;
				})(),
				(() => {
					var t = yi();
					return Zr(t, "input", n("summary"), !0), q(() => ({
						e: $("knowledge_summary"),
						t: $("knowledge_summary"),
						a: e.e.summary ?? "",
						o: wr()
					}), ({ e, t: n, a: r, o: i }, a) => {
						e !== a?.e && X(t, "aria-label", e), n !== a?.t && X(t, "placeholder", n), (r !== a?.a || !i) && (t.value = r ?? "");
					}), t;
				})(),
				(() => {
					var t = bi();
					return Zr(t, "input", n("body"), !0), q(() => ({
						e: $("knowledge_body"),
						t: $("knowledge_body"),
						a: e.e.body ?? "",
						o: wr()
					}), ({ e, t: n, a: r, o: i }, a) => {
						e !== a?.e && X(t, "aria-label", e), n !== a?.t && X(t, "placeholder", n), (r !== a?.a || !i) && (t.value = r ?? "");
					}), t;
				})()
			] : (() => {
				var r = xi();
				return Zr(r, "input", n("text"), !0), q(() => ({
					e: $("home_notes"),
					t: $("notes_placeholder"),
					a: t()?.note_max ?? 300,
					o: e.e.text ?? "",
					i: wr()
				}), ({ e, t, a: n, o: i, i: a }, o) => {
					e !== o?.e && X(r, "aria-label", e), t !== o?.t && X(r, "placeholder", t), n !== o?.a && X(r, "maxlength", n), (i !== o?.o || !a) && (r.value = i ?? "");
				}), r;
			})();
		})(), s), s._$$click = i, Q(s, () => $("save")), c._$$click = () => o(void 0), Q(c, () => $("cancel")), a;
	}, v = (e) => (() => {
		var t = Si(), n = t.firstChild, i = n.nextSibling, a = i.firstChild, l = a.nextSibling;
		return n.addEventListener("change", () => m("/save", e.i, { enabled: !e.i.enabled })), Q(i, (() => {
			var t = J(() => !!r());
			return () => t() ? [
				(() => {
					var t = Ci();
					return Q(t, () => e.i.title), t;
				})(),
				" ",
				J(() => e.i.summary)
			] : e.i.text;
		})(), a), Q(i, (() => {
			var t = J(() => e.i.added_by === "agent");
			return () => t() ? (() => {
				var e = wi();
				return Q(e, () => $("note_from_ai")), e;
			})() : void 0;
		})(), l), Q(t, (() => {
			var t = J(() => s() === e.i.id);
			return () => t() ? [
				(() => {
					var e = Ti();
					return Q(e, () => $("delete_confirm")), e;
				})(),
				(() => {
					var t = Ei();
					return t._$$click = () => m("/delete", e.i), Q(t, () => $("delete")), t;
				})(),
				(() => {
					var e = Di();
					return e._$$click = () => c(""), Q(e, () => $("cancel")), e;
				})()
			] : [(() => {
				var t = Di();
				return t._$$click = () => {
					o({ ...e.i }), c(""), u("");
				}, Q(t, () => $("edit")), t;
			})(), (() => {
				var t = Di();
				return t._$$click = () => c(e.i.id), Q(t, () => $("delete")), t;
			})()];
		})(), null), q(() => ({
			e: !e.i.enabled,
			t: $("note_enabled"),
			a: $("note_enabled"),
			o: !!e.i.enabled,
			i: wr()
		}), ({ e, t: r, a: i, o: a, i: o }, s) => {
			e !== s?.e && t.classList.toggle("off", e), r !== s?.t && X(n, "aria-label", r), i !== s?.a && X(n, "title", i), (a !== s?.o || !o) && (n.checked = a);
		}), t;
	})();
	var y = Oi(), b = y.firstChild, x = b.firstChild, S = x.nextSibling, C = S.nextSibling, ee = b.nextSibling, w = ee.nextSibling, te = w.nextSibling, T = te.nextSibling, ne = T.nextSibling;
	return Q(b, G(g, {
		on: !1,
		label: "notes_tab"
	}), x), Q(b, G(g, {
		on: !0,
		label: "knowledge_tab"
	}), S), Q(S, (() => {
		var e = J(() => !(!r() && t()));
		return () => e() ? "" : $("characters_left", { count: t().room });
	})()), C._$$click = () => o({
		id: "",
		text: "",
		title: "",
		summary: "",
		body: ""
	}), Q(C, () => $("add")), Q(ee, () => $(r() ? "knowledge_hint" : "notes_hint")), Q(y, (() => {
		var e = J(() => !!l());
		return () => e() ? (() => {
			var e = ki();
			return Q(e, l), e;
		})() : void 0;
	})(), w), Q(y, (() => {
		var e = J(() => a()?.id === "");
		return () => e() ? G(_, { get e() {
			return a();
		} }) : void 0;
	})(), te), Q(y, (() => {
		var e = J(() => !(!t() || h().length || a()));
		return () => e() ? (() => {
			var e = Ai();
			return Q(e, () => $("notes_none")), e;
		})() : void 0;
	})(), T), Q(y, G(Cr, {
		get each() {
			return h();
		},
		keyed: (e) => e.id,
		children: (e) => J(() => J(() => a()?.id === e().id)() ? G(_, { get e() {
			return a();
		} }) : G(v, { get i() {
			return e();
		} }))
	}), ne), y;
}
Rr(["click", "input"]);
//#endregion
//#region src/solid/preview.tsx
var Ni = /* @__PURE__ */ Y("<header><span>Notes preview: Lit and Solid 2.0"), Pi = /* @__PURE__ */ Y("<div class=cols><section><h2>Lit (shipping)</h2></section><section><h2>Solid 2.0"), Fi = ":host{display:flex;flex-direction:column}\nheader{display:flex;align-items:center;gap:8px;height:56px;padding:0 12px;border-bottom:1px solid var(--line);background:var(--surface);font-size:20px}\n.cols{flex:1;min-height:0;display:flex;flex-wrap:wrap;overflow-y:auto}\nsection{flex:1 1 380px;min-width:0;display:flex;flex-direction:column;border-inline-end:1px solid var(--line)}\nh2{margin:0;padding:10px 20px;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--line)}\nllm-agent-notes{height:auto}", Ii = class extends HTMLElement {
	#e = yr();
	#t;
	#n = document.createElement("ha-menu-button");
	#r;
	set hass(e) {
		this.#e[1](() => e), this.#n.hass = e, this.#r && (this.#r.hass = e);
	}
	set narrow(e) {
		this.#n.narrow = e;
	}
	async connectedCallback() {
		if (this.#t) return;
		let e = this.shadowRoot ?? this.attachShadow({ mode: "open" }), t = new CSSStyleSheet();
		t.replaceSync(ji + "\n" + Fi), e.adoptedStyleSheets = [hi.styleSheet, t], await pi(this.#e[0]()?.locale?.language);
		let n = document.createElement("div");
		n.style.display = "contents";
		let r = this.panel?.config?.lit_url;
		if (r && (await import(
			/* @vite-ignore */
			r
), this.#r = document.createElement("llm-agent-notes"), this.#r.hass = this.#e[0](), n.append(this.#r)), !this.isConnected || this.#t) return;
		let i = this.#e[0];
		this.#t = Ir(() => {
			let e = this;
			return [(() => {
				var t = Ni(), n = t.firstChild;
				return Q(t, () => e.#n, n), t;
			})(), (() => {
				var e = Pi(), t = e.firstChild, r = t.nextSibling;
				return Q(t, n, null), Q(r, G(Mi, { hass: i }), null), e;
			})()];
		}, e);
	}
	disconnectedCallback() {
		this.#t?.(), this.#t = void 0, this.#r = void 0;
	}
};
customElements.define("llm-agent-solid-preview", Ii);
//#endregion
