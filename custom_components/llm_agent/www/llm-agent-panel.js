var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),t=class extends Error{constructor(e){let t=Error,n=t.stackTraceLimit;n&&(t.stackTraceLimit=0),super(),n&&(t.stackTraceLimit=n),this.source=e}},n=class extends Error{constructor(e,t){try{var n=String(t instanceof Error?t.message:t)}catch{}super(n,{cause:t}),this.source=e}};function r(e){return e instanceof n?e.cause:e}var i=1024,a=2048,o=4096,s=8192,c=16384,l=1<<17,u=1<<18,d=1<<19,f=1<<22,p=1<<23,m=1<<20,h=1024,g=1<<21,_=1<<22,v={},y=typeof Proxy==`function`,b={},x=Symbol(`refresh`),S=Set;function C(e){let t=e.pe;for(;t;)t.R|=32,C(t),t=t.Ge}var ee;function w(e){try{e()}catch(e){ee||=[e],it()}}function T(e){let t=ee;if(ee=void 0,t&&!e)throw t[0]}function E(e,t=!1,n){let r=e.R;if(r&64)return;t&&(!n&&e.T!==null&&(e.T.me!==null||e.T.Le!==null)&&E(e,!1,!0),e.R=r|64,e.X&&(Jt(e),(e.m&1&&e.T?.Re!=null||r&2048||N.length)&&it()));let i=n?e.T.me:e.pe;for(n?e.T.me=null:e.pe=null;i;)i.l&=-33,At(i,M),zt(i),i.Me=i,E(i,!0),i=i.Ge;if(n||(e.be=0),t&&!n&&!(r&32)&&e._parent!==null&&!(e._parent.R&64)){let t=e.Me,n=e.Ge;t===null?e._parent.pe=n:t.Ge=n,n!==null&&(n.Me=t),e.Me=null}if(ne(e,n),t&&e.ze){let t=e.ze;e.ze=void 0,w(t)}}function te(e,t){let n=e.pe;t.Me=null,t.Ge=n,n!==null&&(n.Me=t),e.pe=t}function ne(e,t){let n=t?e.T.Le:e.ke;if(n){if(t?e.T.Le=null:e.ke=null,Array.isArray(n))for(let e=n.length-1;e>=0;e--)w(n[e]);else w(n)}}function re(e,t){for(;e.l&4&&e._parent;)e=e._parent;if(e.id!=null)return oe(e.id,t?e.be++:e.be);throw Error()}function ie(e){return re(e,!0)}function ae(e,t,n){return e?.id??(t?n?.id:n?.id==null?void 0:ie(n))}function oe(e,t){let n=t.toString(36),r=n.length-1;return e+(r?String.fromCharCode(64+r):``)+n}function D(){return F}function se(e,t=F){return t&&(t.ke?Array.isArray(t.ke)?t.ke.push(e):t.ke=[t.ke,e]:t.ke=e),e}function ce(e=!0){E(this,e),ee&&!P.Y&&T()}function le(e){let t=F,n=e?.transparent??!1,r={id:ae(e,n,t),l:n?4:0,R:0,Qe:!0,Ke:t?.Qe?t.Ke:t,pe:null,Ge:null,Me:null,ke:null,A:t?.A||b,be:0,T:null,_parent:t,dispose:ce};return t&&te(t,r),r}function ue(e,t){let n=le(t);return rr(n,()=>e(ce.bind(n,!0)))}var de=null,fe=null,pe=null,O=null,me=null,he=null,ge=null,_e=null,ve=null,ye=null,be=null,xe=null,Se=null,k=null,Ce=null,A=null,we=null,Te=null,Ee=null,De=null,Oe=void 0,ke=[];function Ae(e,t=null){let n={ln:[],rn:[[],[]],fn:[],eo:null,_parent:t,P:e,Pe:null,tt:0,nt:!1,nn:null,Ue:!1,un:!1,I:null};return e||ke.push(n),n}var je=null,Me=null,Ne=null;function Pe(e,t){if(P.Y&&!t||Me!==null)return Le(e);Ne===null?Ne=Ie(e):Re(Ie(e),Ne),it()}function j(e){return e.T.Re=Ie(e.T.Re)}function Fe(e){return e=Ie(e),ke.indexOf(e)===-1?null:e}function Ie(e){for(;e.eo!==null;)e=e.eo;return e}function Le(e){let t=Me;t===null?Me=e===null?Ae(!1):Ie(e):e!==null&&Re(Ie(e),t),P.Y||it()}function Re(e,t){e=Ie(e),t=Ie(t),!(e===t||e.P||t.P)&&(e.eo=t,t.tt+=e.tt,t.nt||=e.nt,pt(t.ln,e.ln),pt(t.rn[0],e.rn[0]),pt(t.rn[1],e.rn[1]),pt(t.fn,e.fn),e.I!==null&&pt(t.I??=[],e.I),ke.splice(ke.indexOf(e),1))}function ze(e){return e.tt!==0||Ve(e.ln,e)||!!me?.(e)}var Be=null;function Ve(e,t,n){for(let r=0;r<e.length;r++){let i=e[r];if(!(!(i.m&1)||i.R&64||i.l&8192||i.T.Re!==null&&j(i)!==t||n&&!n(i,t))){if(i.i===1){if(He(i,Be??t))return!0}else for(let e=i.o;e!==null;e=e.t){let n=e.u;if((n.i===1&&n.m&1||n.R&2048||n.l&16384&&n.m===1)&&(e.Ne===n.de||n.T?.U!=null)&&!(n.R&64)&&He(n,Be??t))return!0}}}return!1}function He(e,t){return!ye?.(e)&&!(e.R&32&&Ue(e,t))}function Ue(e,t){for(;e?.R&32;)e=e._parent;return e?.l&256&&e.T?.Re!=null&&j(e)===Ie(t)}var We=[];function Ge(e){We.push(e)}var Ke=[];function qe(e){At(e,M),e.R&=-4,Ke.push(e)}function Je(e,t){e.l|=256,Ye(e,t)}function Ye(e,t){let n=yn(e);n.Re!==t&&(n.Re=t,t.ln.push(e))}function Xe(e,t){for(let n=e.pe;n!==null;n=n.Ge)n.T?.Re?.P||(n.X!==void 0&&(n.l&256||Je(n,t),n.l|=m),Xe(n,t))}var M={et:Array(2e3).fill(void 0),p:!1,Fe:0,Et:0},Ze=0,Qe=!1,$e=!1,et=!1,tt=0,nt=0,rt=0;function it(){$e?ct():Qe||(Qe=!0,!tt&&!P.Y&&queueMicrotask(wt))}var at=Symbol.for(`solid-js/root-error-hook`),ot=`[REACTIVITY_HALTED]`;function st(e){if($e)return;$e=!0,T(!0);let t=ot,n=e!==void 0&&globalThis.reportError;n||e===void 0?console.error(t):console.error(t,e),n&&n(e)}function ct(){et||(et=!0,console.error(ot))}var lt=class e{rn=[[],[]];Y=!1;flush(){if(!this.Y){this.Y=!0,Gn(),je=null,Ne=null;try{Wt(),Nt(M,e._e),this.settle(),Ze++,Qe=M.Et>=M.Fe||N.length!==0,this.run(1),this.run(2)}finally{this.Y=!1,Ne=null}}}settle(){pe?.()&&Nt(M,e._e);let t=Me;Me=null,fe?.(t);let n=t!==null&&!t.P?Ie(t):null;if(n!==null){let e=N.length;for(let t=0;t<e;t++){let e=N[t];if(!(e.l&2304)&&(e.T===null||e.T.Re===null||!e.T.Re.P)){if(e.ue===v&&e.m&4&&e.i!==1)continue;if(e.ue!==v&&!(e.m&5)&&e.T?.me==null&&e.T?.Le==null&&!e.T?.Te&&er(e,e.le,e.ue)){e.ue=v,e.l&=-129;continue}Je(e,n)}e.l&128&&Xe(e,n)}N.length=0,Se?.(n),Ke.splice(0)}else{Ct();for(let e=0;e<We.length;e++){let t=We[e];t.T?.U==null&&!t.Ae&&Rt(t)}}We.length&&=0;let r=this.rn;this.rn=[[],[]];for(let e=ke.length-1;e>=0;e--){let t=ke[e];ze(t)||(ke.splice(e,1),O?.(t),dt(t),e=ke.length)}k?.();let i=n&&Fe(n);Ce?.(i);let a=i!==null;for(let e=0;e<2;e++)a&&pt(i.rn[e],r[e]),this.rn[e]=a||this.rn[e].length?[].concat(a?[]:r[e],this.rn[e]):r[e];if(Ke.length!==0){let e=Ke.splice(0).sort((e,t)=>e.he-t.he);for(let t=0;t<e.length;t++)e[t].R&64||gn(e[t])}be?.()}run(e){let t=this.rn[e-1];t.length&&(this.rn[e-1]=[],Tt(t,e))}enqueue(e,t,n=je){e&&(n?.P?n:this).rn[e-1].push(t),it()}notify(e,t,n,r){return _e?.(e,n&t,r)?!0:t&1?(n&1&&je===null&&Le(null),!0):!1}};function ut(e){let t;for(let n=0;n<e.fn.length;n++){let r=e.fn[n],i=r.T?.U?.source;if(!(r.R&64||r.m&2&&(r.i||!(r.l&8388608))&&i!==r&&(i?.m??2)&2)&&r.R&2048){t=1,e.P||(r.R&=~a),r.Ae=!1;for(let e=r.pe;e!==null;e=e.Ge)e.i&&(e.Ae=!1);he?.(r),Et(r)}}return e.fn.length=0,t}function dt(e){let t=ut(e);for(let t=0;t<e.ln.length;t++){let n=e.ln[t];n.T.Re!==null&&j(n)===e&&(n.T.Re=null,St(n))}Me===e&&(Me=null),t?P.rn[1].push(()=>ft(e)):ft(e)}function ft(e){for(let t=0;t<2;t++)pt(P.rn[t],e.rn[t]),e.rn[t]=[]}function pt(e,t){for(let n=0;n<t.length;n++)e.push(t[n])}var N=[];function mt(e,t){t.fn.push(e),e.R|=a}function ht(e){N.push(e),P.Y||Bn()}var gt=0;function _t(){gt++}function vt(e){e.we=gt;let t=!!(e.l&512)&&e.T?.De!==void 0;for(let n=e.o;n!==null;n=n.t){let r=n.u;r.R&4&&n.Ne===r.de&&(n!==r._||!e.X)&&(r.R|=o),t&&r.l&8?r.R|=256:(Et(r),r.R&8388608&&Mt(r._parent,1))}}function yt(e){e.Ae=!0,P.enqueue(e.i,e.W??=lt.q.bind(null,e))}function bt(e){return e.ue!==v&&(e.le=e.ue,e.ue=v)}function xt(e){return!(e.m&4)&&!!e.T?.Ee&&!e.T.Ve&&(e.ue=v,!0)}function St(e){if(!e.X){e.l&=-385,bt(e);return}let t=!!(e.m&1)&&(e.ue===v||xt(e)),n=e.l&g;if(!t&&e.T&&(e.T.Te=null),e.l=t?e.l&-1048833|h:e.l&-3147137,n){let t=e.ue;e.ue=v,e.ie=Ze+1,fn(e,2,t)}else bt(e)&&(e.m&=-5,e.T!=null&&(e.T.Ve=!1,e.T.je=v),e.i&&e.i!==3&&yt(e));e.Ie=!1,e.R&=~i,e.T?.U??Rt(e),e.m&1||(e.m&=-5),!t&&e.T!=null&&(e.T.me!==null||e.T.Le!==null)&&lt.Ce(e,!1,!0)}function Ct(){for(let e=0;e<N.length;e++){let t=N[e];t.l&2304||St(t)}N.length=0}var P=new lt;function wt(e){if(nt>0)return e?e():void 0;if(e){tt++;try{return e()}finally{try{wt()}finally{tt--}}}if(!P.Y&&!$e){for(;Qe;)P.flush();T()}}function Tt(e,t){for(let n=0;n<e.length;n++)e[n](t)}function Et(e){M.Fe>e.he&&(M.Fe=e.he),Ot(e,M)}function Dt(e,t){let n=(e._parent?.Qe?e._parent.Ke?.he:e._parent?.he)??-1;n>=e.he&&(e.he=n+1);let r=e.he,i=t.et[r];if(i===void 0)t.et[r]=e;else{let t=i.We;t.ve=e,e.We=t,i.We=e}r>t.Et&&(t.Et=r)}function Ot(e,t){let n=e.R;n&12||(n&1?e.R=n&-4|10:(e.R=n|8,t.p&&Mt(e)),n&16||Dt(e,t))}function kt(e,t){let n=e.R;n&28||(e.R=n|16,Dt(e,t))}function At(e,t){let n=e.R;if(!(n&24))return;e.R=n&-25;let r=e.he;if(e.We===e)t.et[r]=void 0;else{let n=e.ve,i=t.et[r],a=n??i;e===i?t.et[r]=n:e.We.ve=n,a.We=e.We}e.We=e,e.ve=void 0}function jt(e){if(!e.p){e.p=!0;for(let t=0;t<=e.Et;t++)for(let n=e.et[t];n!==void 0;n=n.ve)n.R&8&&Mt(n)}}function Mt(e,t=2){let n=e.R;if(!((n&3)>=t)){e.R=n&-4|t;for(let t=e.o;t!==null;t=t.t)Mt(t.u,1)}}function Nt(e,t){for(e.p=!1,e.Fe=0;e.Fe<=e.Et;e.Fe++){let n=e.et[e.Fe];for(;n!==void 0;)n.R&8?t(n):Pt(n,e),n=e.et[e.Fe]}e.Et=0}function Pt(e,t){At(e,t);let n=e.he;for(let t=e.C;t;t=t.G){let e=t.S;e.X&&e.he>=n&&(n=e.he+1)}if(e.he!==n){e.he=n,Ft(e,n);for(let n=e.o;n!==null;n=n.t)n.u!==e._parent&&kt(n.u,t)}}function Ft(e,t){for(let n=e.pe;n;n=n.Ge)if(n.Qe)Ft(n,t);else if(n.he<=t){let e=n.R&24;At(n,M),n.he=t+1,e&&(e&8?Ot:kt)(n,M),Ft(n,t+1)}}var It;function Lt(e){let t=e.S,n=e.G,r=e.t,i=e.en;return r===null?t.Ze=i:r.en=i,i===null?(t.o=r,r===null&&(t.l&4096?It(t):t.T?.Ye&&w(t.T.Ye),t.X&&t.l&32&&!(t.R&32)&&!(t.m&1)&&(Bt?Bt.push(t):Ht(t)))):i.t=r,n}function Rt(e){let t=e._,n=t===null?e.C:t.G;if(n!==null){do n=Lt(n);while(n!==null);t===null?e.C=null:t.G=null}}function zt(e){e.C&&(e._=null,Rt(e))}var Bt=null,Vt=e=>Bt=e;function Ht(e){At(e,M),zt(e),E(e,!0)}var Ut=new S;function Wt(){if(Ut.size!==0){for(let e of Ut)!e.o&&e.l&32&&!(e.m&1)&&!(e.R&96)&&Ht(e);Ut.clear()}}function Gt(e,t){let n=t._;if(n!==null&&n.S===e)return;let r=null,i=t.R&4;if(i&&(r=n===null?t.C:n.G,r!==null&&r.S===e))return r.Ne=t.de,t._=r;let a=e.Ze;if(a!==null&&a.u===t&&(!i||a.Ne===t.de))return;let o=t._=e.Ze={S:e,u:t,G:r,en:a,t:null,Ne:t.de};n===null?t.C=o:n.G=o,a===null?e.o=o:a.t=o,_t()}function Kt(e,t){return!e.T?.se?.has(t)&&((yn(e).se??=new S).add(t),!0)}function qt(e,t){let n=e.T?.se;return n?.delete(t)?(n.size||(e.T.se=void 0),!0):!1}function Jt(e){e.T!==null&&(e.T.Ee=null)}function Yt(e){e.T!==null&&(e.T.se=void 0)}function Xt(e,t){for(let n=e.C;n;n=n.G){let e=n.S;if(!(e.R&64)&&(e===t?e.m&1:e.T?.se?.has(t)))return!0}return!1}function Zt(e,t){yn(e).fe=!0,t.source&&Kt(e,t.source),e.m&2||Qt(e,t.source,t)}function Qt(e,n,r){if(!n){e.T!==null&&(e.T.U=null);return}let i=r instanceof t&&r.source===n?r:e.T?.U;yn(e).U=i instanceof t&&i.source===n?i:new t(n)}function $t(e,t){for(let n=e.o;n!==null;n=n.t)t(n.u,n)}function en(e,t){let n=new S,r=e=>{let i=n.has(e);t(e,i)!==!1&&!i&&(n.add(e),$t(e,r))};$t(e,r)}function tn(e){e.X&&e.l&32&&!e.o&&!(e.R&32)&&!(e.m&1)&&(e.R&8?e.R|=f:Ht(e))}function nn(e){let t;if(en(e,(e,n)=>{!n&&!e.o&&e.l&32&&(t??=[]).push(e)}),t)for(let e of t)tn(e)}function rn(e,t,r){return!(e.l&256||r&&e.R&16384&&P.Y&&!e.rr)||je?!1:(Yt(e),e.T&&(e.T.fe=!1),(e.m&=6)&2||Qt(e),e.ue=t instanceof n?t:new n(e,t),e.l|=128|g,on(e),it(),!0)}function an(e,t){let n=!1;en(e,(e,r)=>{!r&&e.T?.U===t&&(Et(e),n=!0)}),n&&it()}function on(e,t=e){qt(e,t);let n=!1,r;if(en(e,(i,a)=>{if(a||t!==e&&Xt(i,t)||!qt(i,t))return!1;i.ie=Ze;let o=i.T?.se?.values().next().value,s=i.m&2;o?s||Qt(i,o):(i.m&=-2,s||Qt(i),i.l&256&&!(t.m&1)&&Le(j(i)),i.T?.fe&&(Et(i),n=!0),i.T!==null&&(i.T.fe=!1),!i.o&&i.l&32&&(r??=[]).push(i),Te?.(i,e))}),r)for(let e of r)tn(e);n&&it()}function sn(e){return typeof e==`object`&&!!e&&typeof e.then==`function`}function cn(e){let t=e.T?.Se;t!=null&&(e.T.Se=null,t())}function ln(e,n,r,i){let a=!1,o=!1;if(typeof n==`object`&&n&&Pn(()=>{a=n[Symbol.asyncIterator],o=!a&&sn(n)}),!o&&!a)return e.T!==null&&(e.T.Ee=null),e.Ie=!1,n;yn(e).Ee=n,e.T.ce=rt||2147483647,e.T.se=void 0;let s,c=r=>{if(e.T?.Ee!==n)return;let a=r instanceof t;a&&e.Ie?(Jt(e),Zt(e,r),e.ie=Ze):((a||!rn(e,r))&&(fn(e,a?1:2,r),a||E(e,!1,!0)),a&&on(e),e.ie=Ze,a||nn(e),i?.(r,a))},l=(t,i)=>{if(e.T?.Ee!==n||e.R&2)return;let a=we&&N.some(e=>e.ue!==v),o=e.m&4;if(dn(e),r){if(!r(t,o,c))return}else tr(e,()=>t);e.ue===v&&(e.Ie=!1,Rt(e)),on(e),it(),(i||!a)&&wt(),i?.()},u=()=>e.l&32&&!e.o&&!(e.m&1)?(Ht(e),!0):!1,d=(t,r)=>{let i=t[Symbol.asyncIterator](),a=!1,o=!1,d=!r,f=()=>{if(!o){o=!0;try{let e=i.return?.();sn(e)&&e.then(void 0,()=>{})}catch{}}};se(f,r),yn(e).Se=f;let p=()=>{try{u()||m()}catch(e){c(e)}},m=()=>{let t,r,f=!1,h=!1,g=!0,_=i.next();if((sn(_)?_:{then:e=>void e(_)}).then(r=>{if(g&&d)t=r,f=!0,r.done&&(o=!0);else if(e.T?.Ee!==n)return;else r.done?(o=!0,a?(it(),wt()):l(void 0),u()):(a=!0,l(r.value,p))},t=>{g&&d?(r=t,h=!0):e.T?.Ee===n&&(o=!0,c(t),u())}),g=!1,h){if(o=!0,c(r),d)throw r;return!0}return f&&!t.done?(s=t.value,a=!0,m()):f&&t.done},h=m();return d=!1,a||h},f=null,p=(e,t)=>{let n=!1;if(typeof e==`object`&&e&&Pn(()=>{n=e[Symbol.asyncIterator]}),!n)return!1;s=void 0;let r=d(e,t);return t||(f=r),!0};if(o){let t=!1,r=!1,i,a=!0;if(n.then(r=>{if(a)s=r,t=!0;else{try{if(e.T?.Ee===n&&!(e.R&64)&&p(r,e))return;l(r)}catch(e){c(e)}u()}},e=>{a?(i=e,r=!0):(c(e),u())}),a=!1,r)throw c(i),i;t?p(s)||(e.Ie=!1):f=!1}if(a&&p(n),f!==null){if(!f){if(e.Ie)return e.le;throw new t(F)}e.Ie=!1}return s}function un(e,t=!1){e.T?.se&&Yt(e),e.T?.fe&&(e.T.fe=!1),e.m=t?0:e.m&4,e.T?.U&&Qt(e);let n=On(e);n&&n.call(e)}function dn(e,t=!1){let n=e.T?.se;n&&(n.delete(e),n.size)?(e.T.fe=!1,t&&(e.m=1),Qt(e,n.values().next().value)):un(e,t)}function fn(e,r,i){r===2&&!(i instanceof n)&&!(i instanceof t)&&(i=new n(e,i));let a=r===1&&i instanceof t&&i.source;a?(e.m&2&&(e.T.Te=e.T.U),Kt(e,a)):Yt(e),e.m=r|(r===2?e.m&12?8:0:r===1&&e.m&8?4:e.m&4),a?Qt(e,a,i):yn(e).U=i;let o=On(e);o?o.call(e):pn(e,r,i)}function pn(e,n,r){let i=n===1&&r instanceof t&&r.source;$t(e,(t,a)=>{t.ie=Ze,t.l&16384||n===1&&a.Ne!==t.de?(n!==1&&qt(t,e)&&on(t,e),Et(t),it()):i&&t.T?.se?.has(i)?je===null&&(t.l&2304)==256&&P.Y&&!ve?.(t,i.ie===Ze)&&Le(j(t)):(i||n!==1&&(t.T?.U!==r||t.T?.se))&&(ht(t),n===1&&(t.l&2304)==256&&!t.i&&Le(j(t)),fn(t,n,r),t.rr?.st(n,r))})}lt._e=e=>{e.i===3?(At(e,M),e.Ae=!0,P.enqueue(2,e.Z)):e.R&32&&!(e.R&65536)?qe(e):gn(e)},lt.Ce=E;var mn=!1,F=null,hn;function gn(e,n=!1){_t();let r=e.i,i,p=je,m=de&&(hn=n&&(p||hn)),h=e.l&g;if(!n){if(At(e,M),e.T!==null&&(e.T.Ee=null,cn(e)),e.l&256){let t=j(e);t.P||e.l&524288||(e.l&8421376?t!==Me&&!(e.m&4||e.l&1048576)&&(e.ue!==v&&vt(e),e.ue=v,e.l&=-257):Pe(t,ve?.(e,e.m&4)))}if(r===3||e.l&128){let t=Bt;Vt(i=[]),E(e),Vt(t)}else(e.pe!==null||e.ke!==null)&&wn(e);e.l&2097152&&(e.ue=v,e.l^=g)}let _=e.m&4,y=e.m&2&&e.T?.U,b=!!(e.m&1)&&e.T?.se,x=e.T?.se?.has(e),S=!1,C=!!(e.R&8192)&&!((e.m&1||e.ue!==v&&!(e.R&1024))&&e.T!==null&&!e.T.Ve),ee=F;F=e,e._=null,e.de++;let w=e.R&f;e.R=4|e.R&(32|s),e.ie=Ze;let T=e.ue===v?e.le:e.ue,te=e.he,ne=!1,re=!1,ie=mn;mn=!0;try{if(e.l&64)T=e.X(T),e.T!==null&&(e.T.Ee=null),e.Ie=!1;else{let t=e.T?.Ee,n=e.X(T),r=typeof n==`object`&&!!n,i=e.T?.Ee!==t;T=i||!r?n:ln(e,n),!i&&!r&&(e.T!==null&&(e.T.Ee=null),e.Ie=!1)}(e.m!==0||e.T!==null)&&un(e,n)}catch(n){let r=n instanceof t;if(r&&e.Ie)Zt(e,n);else if((r||!(S=rn(e,n,!0)))&&(r&&(yn(e).fe=!0),fn(e,r?1:2,n),r&&x&&!e.T?.Ee&&on(e)),(r||S)&&b)for(let t of b)t!==e&&!(e.T?.se?.has(t)&&(t.m&1||Xt(e,t)))&&on(e,t)}finally{if(mn=ie,ne=(e.R&o)!==0,re=!!(e.R&(m?p||r||!(e.m&1)?128|c:0:128)),e.R=e.R&(96|a|c|l|u|d)|(n?e.R&256:0),F=ee,i)for(let e of i)tn(e);e.T!==null&&(e.T.Ve=C&&!!(e.m&1))}if(e.R&64){zt(e),Jt(e);return}let ae=!!e.T?.U||S;if(!ae){let t=e.ue===v,i=t?e.le:e.ue,a=Me??Ne,o=t&&_&&!r||!!e.T?.Te||!!(y&&a)||!!h||!er(e,i,T);if(r&&o&&!(e.R&262144&&!e.Ae&&Object.is(e.ge,T))&&t&&(e.Ae=!e.T?.U,n||P.enqueue(r,e.W??=lt.q.bind(null,e),null)),!ae){if(o)(n?!(a!==null&&(re||Cn(ee)?.R&128)):r&&e.ue===v)?e.le=T:(e.ue=T,y&&(e.T.Te=y),n&&(Je(e,a),e.m|=4,ve?.(e,!m&&Me))),e.o!==null&&vt(e);else if(e.he!=te)for(let t=e.o;t!==null;t=t.t)kt(t.u,M)}if(!o&&!e.T?.U&&(y&&an(e,y),b))for(let t of b)t!==e&&on(e,t);x&&!(e.m&5)&&on(e)}if(n&&re&&e.m&1){let t=Me??Ne;t&&!t.P&&(r&&ve?.(e)===2||Je(e,t))}!e.T?.U&&e.ue===v&&!(r&&e.Ae)&&(n||r===3?Rt(e):Ge(e)),(e.ue!==v||e.T!==null&&(e.T.me!==null||e.T.Le!==null)||e.m&5&&(!n||e.m&1))&&(e.l|=128,ht(e)),ne&&(Et(e),it()),w&&tn(e)}function _n(e){if(!(e.R&68)){if(e.R&1)for(let t=e.C;t;t=t.G){let n=t.S;if(n.X&&_n(n),e.R&2)break}(e.R&2||e.T?.U&&e.ie<Ze&&!e.T?.Ee)&&gn(e),e.R&=376|i|a|c|l|u|d}}function vn(e,t){let n=t?.transparent??!1,r=typeof t==`object`&&!!t&&`loadingValue`in t,i={id:ae(t,n,F),l:(n?4:0)|!!t?.ownedWrite|(!F||t?.lazy?32:0)|(t?.sync?64:0)|(t?.ae?2:0)|(t?.xe??0),ye:t?.equals??Mn,ke:null,A:F?.A??b,be:0,X:e,le:r?t.loadingValue:void 0,he:0,ve:void 0,We:null,C:null,_:null,de:0,o:null,Ze:null,_parent:F,Ge:null,Me:null,pe:null,R:t?.lazy?512:0,m:r?0:4,ie:Ze,ue:v,we:-1,Ie:r,T:null};return t?.unobserved&&(yn(i).Ye=t.unobserved),An(i,t),i}function yn(e){return e.T??={Ee:null,Se:null,U:void 0,fe:void 0,se:void 0,Ye:void 0,De:void 0,me:null,Le:null,Re:null,Ve:!1,je:v,Be:-1,ce:0,Ue:!1,I:0,Te:null}}function bn(e,t){e.R|=128,(t.m&4||e.i!==1)&&Pe(j(t),!e.i&&e.m&4||ve?.(e))}function xn(e,t){let n=A&&e.l&32768,r=de&&je!==null;if(!(n&&De(e,t))&&!((!r||e.m&4&&t.m&1)&&!n&&(!(e.l&1<<23)||t.l&1024))){let i=j(t);if(r&&je.over&&Ie(je.over)===i&&!n)return!1;if(!(!r&&i===Me&&!n||Sn(e,i)))return mt(e,i),(r||n)&&ge(e,t),!0}return bn(e,t),!1}function Sn(e,t){return(e.m&4||e.l&1048576)&&e.l&256&&j(e)===t}function Cn(e){return e!==null&&e.Qe?e.Ke:e}function wn(e){C(e);let t=yn(e);t.Le=e.ke,t.me=e.pe,e.ke=null,e.pe=null,e.be=0}function Tn(e,t,n,r,i){let a=i?.transparent??!1,o={id:ae(i,a,F),l:r<<23|(a?4:0)|!!i?.ownedWrite|(i?.sync?64:0)|(i?.xe??0),ye:!1,ke:null,A:F?.A??b,be:0,X:e,le:void 0,he:0,ve:void 0,We:null,C:null,_:null,de:0,o:null,Ze:null,_parent:F,Ge:null,Me:null,pe:null,R:512,m:4,ie:Ze,ue:v,we:-1,Ie:!1,Ae:!1,ge:void 0,qe:t,Je:n,ze:void 0,i:r,T:null};return i?.unobserved&&(yn(o).Ye=i.unobserved),An(o,kn),o}var En=null;function Dn(e){En=e}function On(e){return e.i?En:null}var kn={lazy:!0};function An(e,t){e.We=e;let n=F?.Qe?F.Ke:F;F&&te(F,e),n&&(e.he=n.he+1),Oe?.(e),!t?.lazy&&gn(e,!0)}function jn(e,t){let n={ye:t?.equals??Mn,l:+!!t?.ownedWrite|(t?.ae?2:0),le:e,o:null,Ze:null,ie:Ze,ue:v,we:-1,T:null};return t?.unobserved&&(yn(n).Ye=t.unobserved),n}function Mn(e,t){return e===t}var Nn=null;function Pn(e,t){let n=mn;mn=!1;try{return e()}finally{mn=n}}var Fn=0;function In(e){Fn++;try{Pn(e)}finally{Fn--}}function Ln(e,t){if(e.R&512)e.R&=-513,gn(e,!0);else if(e.R&64&&e.l&32){let t=e._parent;if(t!==null){if(t.R&64){e.l&=-33;return}e.R&32||te(t,e)}gn(e,!0)}}function Rn(e,t){return!t||e.ue===v||t.l&16}var zn=!1;function Bn(){zn=!0}function Vn(e){return P.Y||e.ue===v||e.l&4194304?v:e.l&256?e.T.Be===Ze?e.T.je:v:e.le}function Hn(e){let t=e.T;t.Be!==Ze&&(t.je=e.ue,t.Be=Ze,zn=!0)}var Un=[];function Wn(e){return e.R|=o,!0}function Gn(){if(zn=!1,Un.length!==0){for(let e of Un)e.l&=~_;Un.length=0}}function Kn(e,t){e.he>=M.Fe||e.R&1?(Mt(t),jt(M),_n(e)):t.l&65536&&_n(e);let n=e.he;e._parent===t?e.R|=p:n>=t.he&&Ft(t,t.he=n+1)}function qn(){return F.R&a}function Jn(e){let t=F;if(t?.Qe&&(t=t.Ke),Nn!==null)return Nn(e,t);if(typeof e.X==`function`&&Ln(e),!e.X&&e.T?.De===void 0&&(!zn||e.ue===v)&&!(e.l&2048))return t&&(mn&&Gt(e,t),e.l&256&&!(t.l&16)&&xn(t,e))||!t||e.ue===v||t.l&16||e.ue===e.le&&Object.is(e.ue,e.le)?e.le:(Zn(t),e.ue);let n=!1,r;if(t&&(mn&&(r=Gt(e,t),e.X&&Kn(e,t)),e.l&256&&!(e.l&2048)&&!(t.l&16)&&(e.m&4?bn(t,e):n=xn(t,e))),e.m&1&&!n){if(t){if(!(t.l&16)||e.m&4)throw!mn&&e!==t&&Gt(e,t),e.T?.U}else if(e.m&4)throw e.T?.U}if(e.X&&e.m&2){if(r&&e.ie<Ze&&!(e.R&32))return gn(e),Jn(e);throw!n&&e.l&2097152&&Xn(e,t),e.T?.U}(n||!t)&&Yn(e);let i=Xn(e,n?null:t);return!t&&typeof e.X==`function`&&e.l&32&&!(e.m&1)&&!e.o&&(Ut.add(e),it()),i}function Yn(e){if(e.T?.Te)throw e.T.Te}function Xn(e,n){if(e.ue!==v&&e.m&4&&(!n||n.l&16)){if(Fn>0){let t=Cn(F);if(t&&e.l&256&&Sn(t,j(e)))return e.ue}throw new t(null)}let r=n&&zn?Vn(e):v;if(r!==v)return Wn(n),r;if(Rn(e,n))return e.le;if(Zn(n,e),e.l&2097152)throw e.ue;return e.ue}function Zn(e,t){t?.m&4||(e.R|=c)}function Qn(e){P.Y||e.l&4194304||(e.l|=_,Un.push(e))}var $n=null;function er(e,n,r){if(e.ye===Mn)return n===r;try{return e.ye&&e.ye(n,r)}catch(n){if(!(n instanceof t))return fn(e,2,n),!0}}function tr(e,t){$n!==null&&$n(e);let n=e.ue===v?e.le:e.ue;if(typeof t==`function`&&(t=t(n)),e.l&256&&Le(j(e)),!(e.m&4||e.T?.Te||!er(e,n,t)))return t;let r=e.ue!==v;return r?e.l&256&&!P.Y&&Hn(e):ht(e),e.ue=t,F!==null&&Qn(e),e.X!==void 0&&(e.ie=Ze),r&&e.we===gt||(vt(e),it()),t}function nr(e,t){let n=e.l&256&&!(e.R&1024)&&j(e)!==Me;if(n&&typeof t==`function`){let n=t(e.le);t=()=>n}return e.m&2&&(e.T.Te=e.T.U,fn(e,0)),t=tr(e,t),e.l&=~g,n?(e.R=e.R&-2|2,Ot(e,M),it()):e.ue!==v&&(e.R|=i),t}function rr(e,t){let n=F,r=mn;F=e,mn=!1;try{return t()}finally{F=n,mn=r}}var ir=null;function ar(e,t,n,r){let i=Tn(e,t,n,r?.user?2:1,r);gn(i,!0),r?.defer?bt(i):i.ue===v&&(i.T?.Re?.P||i.i===2||r?.schedule?P.enqueue(i.i,cr.bind(null,i),i.T?.Re):cr(i,0))}function or(){let e=this.m,t=this.T?.U;if(e&2){if(P.notify(this,1,0),this.i===2){this.m&2&&yt(this);return}sr(this,r(t))}else this.i===2?e&1&&this.Ae&&!t?.source?.T?.Ve&&(yn(this).fe=!(this.Ae=!1)):this.i===1&&P.notify(this,3,e,t)}function sr(e,t,n){if(!P.notify(e,2,2))throw st(t),t}function cr(e,t){if(!e.Ae||e.R&64||t&&xe?.(e)||t&&Ee?.(e))return;if(e.m&2&&e.i===2){let t=r(e.T?.U);e.ge=e.le,e.Ae=!1;try{e.Je?e.Je(t,()=>{let t=e.ze;e.ze=void 0,t?.()}):console.error(t)}catch(t){sr(e,t)}return}let i=e.T?.U==null,a=e.ze;e.ze=void 0;try{a?.(),e.ze=e.qe(e.le,e.ge)}catch(t){yn(e).U=new n(e,t),e.m|=2,sr(e,t)}finally{e.ge=e.le,e.Ae=!1,i&&Rt(e)}}lt.q=cr,Dn(or);var lr=Symbol(0),ur=Symbol(0),dr=Symbol(0),fr=Symbol(0);function pr(e){return Reflect.ownKeys(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}var mr=null;function hr(e){return se(e)}function gr(e){let t=Jn.bind(null,e);return t[x]=e,t}function _r(e,t){if(typeof e==`function`){let n=vn(e,t);return n.l&=-33,[gr(n),nr.bind(null,n)]}let n=jn(e,t);return ir!==null&&ir(n),[gr(n),tr.bind(null,n)]}function vr(e,t){return gr(vn(e,t))}function yr(e,t,n){ar(e,t.effect||t,t.error,{user:!0,...n})}function br(e,t,n){ar(e,t,void 0,n)}function xr(e,t,n){let r=typeof n?.keyed==`function`?n.keyed:void 0,i=t.length>1,a=t,o={H:le(),it:0,st:e,ot:[],ft:a,ht:[],ln:[],Xe:r,ct:r||n?.keyed===!1?[]:void 0,lt:i&&n?.keyed!==!1?[]:void 0,ut:n?.keyed===!1,L:n?.fallback},s=vn(Or.bind(o),void 0);return s.l&=-33,gr(s)}var Sr={ownedWrite:!0};function Cr(e,t,n,r){let i=e.ot,a=e.it-1,o=[],s=[],c=[],l=256,u=r,d=r;for(;u<=a&&d<=n-1;){let e=i[u],r=t[d];if(e===r){let e=u;do d++;while(++u<=a&&d<n&&i[u]===t[d]);c.push(e,d-u+e,u-e);continue}let f=-1,p=Math.min(32-o.length,a-u,l);for(let e=1;e<=p;e++)if(i[u+e]===r){f=e;break}l-=f===-1?p:f;let m=-1;p=Math.min(32-s.length,n-1-d,l);for(let n=1;n<=p;n++)if(t[d+n]===e){m=n;break}if(l-=m===-1?p:m,f!==-1&&(m===-1||f<=m))for(;f-->0;)o.push(u++);else if(m!==-1)for(;m-->0;)s.push(d++);else{if(l<=0||o.length===32||s.length===32)return!1;o.push(u++),s.push(d++)}}for(;u<=a;u++){if(o.length===32)return!1;o.push(u)}for(;d<=n-1;d++){if(s.length===32)return!1;s.push(d)}return wr(e,t,n,r,o,s,c)}function wr(e,t,n,r,i,a,o){let s=e.ot,c,l,u;if(a.length!==0)for(u=Array(i.length),l=0;l<a.length;l++){let e=-1;for(c=0;c<i.length;c++)if(!u[c]&&s[i[c]]===t[a[l]]){e=c;break}if(e===-1)return!1;u[e]=!0,a[l]=a[l]<<6|e}for(c=0;c<i.length;c++){let e=s[i[c]];if(e===void 0)return!1;for(l=r-1;(l=s.indexOf(e,l+1))!==-1;)if(!i.includes(l))return!1}let d=e.ht,f=e.ln,p=d.slice(0,n),m=f.slice(0,n);for(let e=0;e<o.length;e+=3){let t=o[e],n=o[e+1];if(t!==n)for(let r=0;r<o[e+2];r++)p[n+r]=d[t+r],m[n+r]=f[t+r]}for(l=0;l<a.length;l++){let e=a[l]>>6,t=i[a[l]&63];p[e]=d[t],m[e]=f[t]}for(e.ht=p,e.ln=m,e.it=n,e.ot=t,c=0;c<i.length;c++)(u===void 0||!u[c])&&f[i[c]].dispose();return!0}function Tr(e,t,n,r,i,a,o,s,c){let l=e.Xe,u=e.ot,d=e.ln,f=[],p=n;for(let m=n;m<=i;p++,m++){let i=l?l(t[m]):t[m];for(;p<=r&&(l?l(u[p]):u[p])!==i;)f.push(d[p++]);if(p>r)return o.fill(void 0),null;a[m]=e.ht[p],o[m-n]=d[p],s&&(s[m-n]=e.ct[p]),c&&(c[m-n]=e.lt[p])}for(;p<=r;p++)f.push(d[p]);return f}function Er(e,t,n,r,i,a,o,s,c){let l=e.ln,u=e.ct,d=e.lt,f=e.it,p=n-f,m,h;if(p>0)for(l.length=n,u&&(u.length=n),d&&(d.length=n),m=f-1,h=n-1;m>i;m--,h--)l[h]=l[m],u&&(u[h]=u[m]),d&&(d[h]=d[m]);else if(p<0){for(m=i+1,h=a+1;m<f;m++,h++)l[h]=l[m],u&&(u[h]=u[m]),d&&(d[h]=d[m]);l.length=n,u&&(u.length=n),d&&(d.length=n)}for(h=r;h<=a;h++)l[h]=o[h-r],u&&Dr(u[h]=s[h-r],t[h]),d&&tr(d[h]=c[h-r],h);for(h=a+1;h<n;h++)u&&Dr(u[h],t[h]),d&&p!==0&&tr(d[h],h)}var Dr=(e,t)=>e.le===t&&e.ue===v||tr(e,t);function Or(){this.H.Ke=D();let e=this.st()||[];e[lr],e=mr?.(e[ur])??e;let t=e.length;return rr(this.H,kr.bind(this,e,t)),this.ht}function kr(e,t){let n=e.slice(0),r,i,a,o,s,c=this.ct?this.ut?()=>(o[a]=jn(n[i],Sr),this.ft(gr(o[a]),i)):()=>(o[a]=jn(n[i],Sr),s&&(s[a]=jn(i,Sr)),this.ft(gr(o[a]),s?gr(s[a]):void 0)):this.lt?()=>{let e=n[i];return s[a]=jn(i,Sr),this.ft(e,gr(s[a]))}:()=>{let e=n[i];return this.ft(e)};if(t===0)this.it!==0&&(this.H.dispose(!1),this.ln=[],this.ot=[],this.ht=[],this.it=0,this.ct&&=[],this.lt&&=[]),this.L&&!this.ht.length&&(this.ln[0]?.dispose(),this.ht[0]=rr(this.ln[0]=le(),this.L));else if(this.it===0){let e=Array(t),l=Array(t);o=this.ct&&Array(t),s=this.lt&&Array(t);try{for(i=0;i<t;i++)a=i,e[i]=rr(l[i]=le(),c)}catch(e){for(r=0;r<=i;r++)l[r]?.dispose();throw e}this.ln[0]&&this.ln[0].dispose(),this.ht=e,this.ln=l,o&&(this.ct=o),s&&(this.lt=s),this.ot=n,this.it=t}else{let e,l,u,d,f,p,m,h,g;for(e=0,l=Math.min(this.it,t);e<l&&(this.ot[e]===n[e]||this.ct&&Ar(this.Xe,this.ot[e],n[e]));e++)this.ct&&Dr(this.ct[e],n[e]);for(l=this.it-1,u=t-1;l>=e&&u>=e&&(this.ot[l]===n[u]||this.ct&&Ar(this.Xe,this.ot[l],n[u]));l--,u--);if(e===t&&this.it===t){this.ot=n;return}if(t<=this.it&&l-e>64&&this.ct===void 0&&this.lt===void 0){let r=e+(u-e>>1),i=n[r],a=Math.min(l,r+32),o=Math.max(e,r-32);for(;o<=a&&this.ot[o]!==i;)o++;if(o<=a&&Cr(this,n,t,e))return}let _=t-this.it,v=u-e+1,y=Array(t),b=Array(v);o=this.ct?Array(v):void 0,s=this.lt?Array(v):void 0;let x=_<0?Tr(this,n,e,l,u,y,b,o,s):null;if(x!==null)x.length!==0&&(h=x);else{for(p=/* @__PURE__ */ new Map,m=Array(v),i=u;i>=e;i--)d=n[i],f=this.Xe?this.Xe(d):d,r=p.get(f),m[i-e]=r===void 0?-1:r,p.set(f,i);for(r=e;r<=l;r++)d=this.ot[r],f=this.Xe?this.Xe(d):d,i=p.get(f),i!==void 0&&i!==-1?(y[i]=this.ht[r],b[i-e]=this.ln[r],o&&(o[i-e]=this.ct[r]),s&&(s[i-e]=this.lt[r]),i=m[i-e],p.set(f,i)):(h??=[]).push(this.ln[r]);try{for(i=e;i<=u;i++)b[i-e]===void 0&&((g??=[]).push(b[i-e]=le()),a=i-e,y[i]=rr(b[i-e],c))}catch(e){if(g)for(r=0;r<g.length;r++)g[r].dispose();throw e}}for(r=0;r<e;r++)y[r]=this.ht[r];for(i=u+1;i<t;i++)y[i]=this.ht[i-_];if(Er(this,n,t,e,l,u,b,o,s),this.ht=y,this.it=t,this.ot=n,h)for(r=0;r<h.length;r++)h[r].dispose()}}function Ar(e,t,n){return!e||e(t)===e(n)}function jr(e,t){if(typeof e==`function`&&!e.length){if(t?.doNotUnwrap)return e;do e=e();while(typeof e==`function`&&!e.length)}if(!t?.skipNonRendered||e!=null&&e!==!0&&e!==!1&&e!==``){if(Array.isArray(e)){let n=[];return Mr(e,n,t)?()=>{let e=[];return Mr(n,e,{...t,doNotUnwrap:!1}),e}:n}return e}}function Mr(e,n=[],r){let i=null,a=!1;for(let o=0;o<e.length;o++)try{let t=e[o];if(typeof t==`function`&&!t.length){if(r?.doNotUnwrap){n.push(t),a=!0;continue}do t=t();while(typeof t==`function`&&!t.length)}Array.isArray(t)?a=Mr(t,n,r)||a:r?.skipNonRendered&&(t==null||t===!0||t===!1||t===``)||n.push(t)}catch(e){if(!(e instanceof t))throw e;i=e}if(i)throw i;return a}function Nr(){return!0}var Pr=Object.freeze({});function Fr(e,t){return t===3?(e=e())||Pr:e}function Ir(e,t){let n=e.hidden;return typeof n==`function`?n(t):n.includes(t)}function Lr(e){return Fr(e.source,e.kind)}function Rr(e){return e[fr]}function zr(e,t){if(t===0)return Object.keys(e);if(t===2||e[dr]===e){let t=e[ur];return(t?.px===e?t:Reflect).ownKeys(e)}return Object.keys(e)}function Br(e,t,n){return t===1?Ir(e,n)?!1:e.kind===4?ai(e.source,n):n in Lr(e):n in Fr(e,t)}function Vr(e,t){return t===0?!0:t===1?e.kind===0||e.kind===4&&Hr(e.source):!1}function Hr(e){let t=e.sources,n=e.kinds;for(let e=0;e<t.length;e++)if(!Vr(t[e],n[e]))return!1;return!0}function Ur(e,t=!0){return{configurable:!0,enumerable:t,get:e,set:Nr}}function Wr(e,t,n,r=!1){if(t===1)return Ir(e,n)?void 0:Wr(e.source,e.kind,n,r);if(t===4)return oi(e,n);if(t===3)return r||n in Fr(e,t)?Ur(()=>Fr(e,t)[n]):void 0;if(t===2)return Rr(e)===void 0?r||n in e?Ur(()=>e[n]):void 0:Reflect.getOwnPropertyDescriptor(e,n);let i=Reflect.getOwnPropertyDescriptor(e,n);if(i!==void 0)return i.get!==void 0||i.set!==void 0?Ur(()=>e[n],i.enumerable):i.configurable?i:{configurable:!0,enumerable:i.enumerable,writable:!0,value:i.value}}var Gr=class{sources;kinds;table=0;keys=void 0;descs=void 0;constructor(e,t){this.sources=e,this.kinds=t}};function Kr(e){let t=e.table;if(typeof t!=`object`){let n=e.sources,r=e.kinds;for(let t=0;t<n.length;t++)if(!Vr(n[t],r[t])){e.table=null;return}t=/* @__PURE__ */ new Map,qr(t,e,void 0),e.table=t}return t===null?void 0:t}function qr(e,t,n){let r=t.sources,i=t.kinds;for(let t=0;t<r.length;t++){let a=r[t];if(i[t]===1){if(a.kind===4){n===void 0?n=[a]:n.push(a),qr(e,a.source,n),n.pop();continue}let t=a.source,r=Reflect.ownKeys(t);for(let i=0;i<r.length;i++){let o=r[i];!Ir(a,o)&&!Jr(n,o)&&Yr(e,o,t)}}else{let t=Reflect.ownKeys(a);for(let r=0;r<t.length;r++){let i=t[r];Jr(n,i)||Yr(e,i,a)}}}}function Jr(e,t){if(e!==void 0){for(let n=e.length-1;n>=0;n--)if(Ir(e[n],t))return!0}return!1}function Yr(e,t,n){e.has(t)&&e.delete(t),e.set(t,n)}var Xr=Object.prototype.propertyIsEnumerable;function Zr(e,t){let n=e.keys;if(n===void 0){n=e.keys=[];for(let[e,r]of t)Xr.call(r,e)&&n.push(e)}return n}function Qr(e,t,n){let r=t.get(n);if(r===void 0)return;let i=e.descs;i===void 0&&(i=e.descs=/* @__PURE__ */ new Map);let a=i.get(n);return a===void 0?(a=Wr(r,0,n),a===void 0?void 0:(i.set(n,a),a)):a.get===void 0?{configurable:!0,enumerable:a.enumerable,writable:a.writable,value:r[n]}:a}var $r=16;function ei(e){let t=e.table;if(typeof t==`object`)return t===null?void 0:t;if(t+1<$r)e.table=t+1;else return Kr(e)}function ti(e){let t=e.table;return typeof t==`object`&&t?t:void 0}var ni=Symbol();function ri(e,t){let n=ti(e);if(n!==void 0){let e=n.get(t);return e===void 0?ni:e[t]}let r=e.sources,i=e.kinds;for(let e=r.length-1;e>=0;e--){let n=i[e];if(n===0){let n=r[e];if(t in n)return n[t]}else if(n===1){let n=r[e];if(Ir(n,t))continue;if(n.kind===4){let e=ri(n.source,t);if(e!==ni)return e;continue}let i=Lr(n);if(t in i)return i[t]}else{let i=Fr(r[e],n);if(t in i)return i[t]}}return ni}function ii(e,t){let n=ri(e,t);return n===ni?void 0:n}function ai(e,t){let n=ti(e);if(n!==void 0)return n.has(t);let r=e.sources,i=e.kinds;for(let e=r.length-1;e>=0;e--)if(Br(r[e],i[e],t))return!0;return!1}function oi(e,t){let n=ti(e);if(n!==void 0)return Qr(e,n,t);let r=e.sources,i=e.kinds;for(let n=r.length-1;n>=0;n--)if(Br(r[n],i[n],t))return Wr(r[n],i[n],t,!0)??Ur(()=>ii(e,t))}function si(e,t,n){let r=[];return ci(e,n===void 0?void 0:[n],t,r,null),r}function ci(e,t,n,r,i){let a=e.sources,o=e.kinds;for(let e=0;e<a.length;e++){let s=a[e],c=o[e],l;if(c===1){if(s.kind===4){t===void 0?t=[s]:t.push(s),ci(s.source,t,n,r,i),t.pop();continue}l=s,c=s.kind,s=s.source}s=Fr(s,c);let u=n?pr(s):zr(s,c);for(let e=0;e<u.length;e++){let n=u[e];l!==void 0&&Ir(l,n)||Jr(t,n)||li(r,i,n,s)}}}function li(e,t,n,r){let i=e.indexOf(n);i!==-1&&(e.splice(i,1),t!==null&&t.splice(i,1)),e.push(n),t!==null&&t.push(r)}function ui(e,t){let n=Kr(e);if(n===void 0)return si(e,!0,t);let r=Zr(e,n);if(t===void 0)return r;let i=[];for(let e=0;e<r.length;e++)Ir(t,r[e])||i.push(r[e]);return i}var di={get(e,t,n){if(typeof t==`symbol`){if(t===dr)return n;if(t===fr)return e;if(t===ur)return}let r=e.table,i;if(typeof r!=`object`){if(r+1<$r){e.table=r+1;let n=e.sources,i=e.kinds;for(let r=n.length-1;r>=0;r--){if(i[r]!==0)return ii(e,t);let a=n[r][t];if(a!==void 0||t in n[r])return a}return}if(i=Kr(e),i===void 0)return ii(e,t)}else if(r===null)return ii(e,t);else i=r;let a=i.get(t);return a===void 0?void 0:a[t]},has(e,t){if(t===dr)return!0;if(t===ur||t===fr)return!1;let n=ei(e);return n===void 0?ai(e,t):n.has(t)},set:Nr,deleteProperty:Nr,getOwnPropertyDescriptor(e,t){if(t===dr||t===ur||t===fr)return;let n=ei(e);return n===void 0?oi(e,t):Qr(e,n,t)},ownKeys(e){return ui(e)}};function fi(...e){if(e.length===1&&typeof e[0]!=`function`)return e[0];let t=Array(e.length),n=Array(e.length),r=0,i,a=0;for(let o=0;o<e.length;o++){let s=e[o];if(s){if(a++,i=s,typeof s==`function`)t[r]=vr(s),n[r++]=3;else if(dr in s){let e=Rr(s);if(e instanceof Gr)for(let i=0;i<e.sources.length;i++)t[r]=e.sources[i],n[r++]=e.kinds[i];else e===void 0?(t[r]=s,n[r++]=2):(t[r]=e,n[r++]=1)}else t[r]=s,n[r++]=0}}if(r!==t.length&&(t.length=r,n.length=r),y)return a===1&&typeof i!=`function`?i:new Proxy(new Gr(t,n),di);let o=Object.create(null),s=!1,c=t.length-1;for(let e=c;e>=0;e--){let n=t[e];if(!n){e===c&&c--;continue}let r=Object.getOwnPropertyNames(n);for(let t=r.length-1;t>=0;t--){let i=r[t];if(i!==`__proto__`&&i!==`constructor`&&!o[i]){s||=e!==c;let t=Object.getOwnPropertyDescriptor(n,i);o[i]=t.get?{enumerable:!0,configurable:!0,get:t.get.bind(n)}:t}}}if(!s)return t[c];let l={},u=Object.keys(o);for(let e=u.length-1;e>=0;e--){let t=u[e],n=o[t];n.get?Object.defineProperty(l,t,n):l[t]=n.value}return l}var pi=!1;function mi(e){let t=vr(e,{lazy:!0}),n=vr(()=>jr(t()),{lazy:!0,sync:!0});return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var hi={hydrating:!1,registry:void 0,done:!1},gi=(...e)=>vr(...e),I=_r,_i=ue,vi=br,yi=(...e)=>yr(...e);function L(e,t,n,r){return Pn(()=>e(t||{}))}var bi=e=>{throw`Stale read from <${e}>.`};function R(e){let t=`fallback`in e?{keyed:e.keyed,fallback:()=>e.fallback}:{keyed:e.keyed},n=D(),r,i=()=>rr(n,()=>xr(()=>e.each,e.children,t));return hi.hydrating&&(r=i()),()=>(r??=i())()}function z(e){let t=e.keyed,n=vr(()=>e.when,void 0),r=t?n:vr(n,{equals:(e,t)=>!e==!t,sync:!0});return vr(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?Pn(t?()=>a(i):()=>a(()=>(r()||bi(`Show`),n())),pi):a}return e.fallback},{sync:!0})}function xi(e){let t=mi(()=>e.children),n=vr(()=>{let e=t.toArray(),n=()=>void 0;for(let t=0;t<e.length;t++){let r=t,i=e[t];if(i==null)continue;let a=n,o=vr(()=>a()?void 0:i.when,void 0),s=i.keyed?o:vr(o,{equals:(e,t)=>!e==!t,sync:!0});n=()=>{let e=a();if(e)return e;let t=s();return t?[r,t,o,i]:void 0}}return n},{sync:!0});return vr(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a,o]=t,s=o.children;return typeof s==`function`&&s.length>0?o.keyed?Pn(()=>s(i),pi):Pn(()=>s(()=>(Pn(n)()?.[0]===r||bi(`Match`),a())),pi):s},{sync:!0})}function Si(e){return e}var Ci=qn,wi=hi,Ti=/*#__PURE__*/ Symbol(`slot`),Ei=/*#__PURE__*/ Symbol(`index`),Di={transparent:!0,sync:!0},Oi={sync:!0};function B(e,t,n){vi(e,t,n?{sync:!0,...n,transparent:!n.scope}:Di)}function V(e){return gi(()=>e(),Oi)}function ki(e,t,n,r){let i=n.length,a=t.length,o=i,s=0,c=0,l,u,d,f;for(;s<a&&t[s]===n[c];)s++,c++;if(s===a&&c===o)return;let p=e.moveBefore&&e.isConnected,m=r||e,h=(t,n)=>{p&&t.isConnected?e.moveBefore(t,n):e.insertBefore(t,n),(r||t[Ti])&&(t[Ti]=m)};if(!a){for(let e of n)h(e,r);return}let g=t=>t&&t.parentNode===e&&(!(t=t[Ti])||t===m),_=t=>{for(;t<i&&!g(n[t]);)t++;return n[t]||(u&&u.parentNode!==e?r||null:u)};for(u=g(f=t[a-1])?f.nextSibling:r||null;s<a||c<o;)if(t[s]===n[c])s++,c++;else{for(;a>s&&o>c&&t[a-1]===n[o-1];)a--,o--;if(a===s)for(f=_(o);c<o;)h(n[c++],f);else if(!g(f=t[s]))s++;else if(n[c]===t[a-1]&&(f===n[o-1]||!l&&f===n[c+1]&&t[s+1]===n[c+2]))do h(t[--a],f),c++;while(s<a-1&&c<o&&f===n[o-1]&&n[c]===t[a-1]);else if(c<o&&f===n[o-1]&&t[s+1]!==n[o-2]&&g(n[c])&&g(t[a-1]))h(f,_(o)),s++,o--;else{if(!l)for(l=1,d=c;d<o;)n[d][Ei]=d++;if((d=f[Ei])>=0&&n[d]===f){if(c<d&&d<o){let i=s,l=1;for(;++i<a&&i<o&&t[i]===n[d+l];)l++;if(l>d-c)for(;c<d;)h(n[c++],f);else{let t=n[c++];s++,p?h(t,f):e.replaceChild(t,f),(r||t[Ti])&&(t[Ti]=m)}}else s++}else f.remove(),s++}}}var Ai=`_$$`,ji=`_$SOLID_EVENT_OWNER`,Mi=Symbol(),Ni={},Pi=/* @__PURE__ */ new Set,Fi=/* @__PURE__ */ new Map;function Ii(e,t,n,r={}){let i;zi(t);try{_i(a=>{i=a,r.onError&&(D()[at]=r.onError);let o=e();t===document?B(()=>jr(o),()=>{}):W(t,()=>o,t.firstChild?null:void 0,n,{...r.insertOptions,schedule:!0})},{id:r.renderId}),wt()}catch(e){throw i&&i(),Bi(t),e}return()=>{i(),Bi(t),t.textContent=``}}function Li(e,t,n){let r=document.createElement(`template`);r.innerHTML=e;let i=r.content.firstChild;return n===2?i.firstChild:i}function H(e,t){let n;return r=>(n||=Li(e,r,t),t===1?document.importNode(n,!0):n.cloneNode(!0))}function Ri(e){for(let t of e)Pi.has(t)||(Pi.add(t),Fi.forEach((e,n)=>Wi(t,n,e)))}function zi(e){Vi(e,e)}function Bi(e){Hi(e,e)}function Vi(e,t=e){if(!e||!t)return;let n=Fi.get(e);n||Fi.set(e,n={owners:/* @__PURE__ */ new Map,handlers:/* @__PURE__ */ new Map}),n.owners.set(t,(n.owners.get(t)||0)+1),Pi.forEach(t=>Wi(t,e,n))}function Hi(e,t=e){let n=Fi.get(e);if(!n)return;let r=n.owners.get(t);r>1?n.owners.set(t,r-1):n.owners.delete(t),!n.owners.size&&(n.handlers.forEach((t,n)=>{e.removeEventListener(n,Ui,!0),e.removeEventListener(n,t)}),Fi.delete(e))}function Ui(e){delete e[ji]}function Wi(e,t,n){if(n.handlers.has(e))return;let r=e=>fa(e,t,n);n.handlers.set(e,r),t.addEventListener(e,Ui,!0),t.addEventListener(e,r)}var Gi=e=>e._$host||e.parentNode||e.host;function Ki(e,t){let n=0;for(;e;){if(t.owners.has(e))return{owner:e,distance:n};n++,e=Gi(e)}}function qi(e,t,n){if(ca(e))return;let r=e.nodeName;t===`value`&&r===`SELECT`?ha(e,n):(t===`value`||t===`defaultValue`)&&(r===`INPUT`||r===`TEXTAREA`)?n==null&&/^(checkbox|radio)$/.test(e.type)?e.removeAttribute(`value`):e[t]=n??``:e[t]=n,Zi(e,t)}var Ji=null,Yi=[];function Xi(e,t){for(let n=0;n<e.length;n++)e[n](t)}function Zi(e,t){Ji!==null&&e._$claimed&&Yi.some(e=>e.includes(t.slice(t.indexOf(`:`)+1)))&&Xi(Ji,e)}function Qi(e,t){return Ji!==null&&!e._$claimed&&(e._$claimed=!0,t===void 0?Xi(Ji,e):rr(t,()=>Xi(Ji,e))),e}function U(e,t,n){if(ca(e))return;let r=t===`multiple`&&e.localName===`select`;if(n==null||n===!1)e.removeAttribute(t);else if(e.setAttribute(t,n===!0?``:n),r&&!e._$multiple){let t=e.options;for(let e=0;e<t.length;e++)t[e].defaultSelected&&(t[e].selected=!0)}r&&(e._$multiple=!0),Zi(e,t)}function $i(e,t,n){if(typeof t==`number`&&(t=``+t),typeof n==`number`&&(n=``+n),ca(e)){e._$classes=t&&typeof t==`object`?ua(t):void 0;return}if(t==null||t===!1){(n||e._$classes)&&(e.removeAttribute(`class`),e._$classes=void 0);return}if(typeof t==`string`){e._$classes&&=void 0,t!==n&&e.setAttribute(`class`,t);return}let r;typeof n==`string`?(r={},e.removeAttribute(`class`)):r=e._$classes||ua(n||{}),t=ua(t);let i=Object.keys(t),a=Object.keys(r),o,s;for(o=0,s=a.length;o<s;o++){let n=a[o];n&&n!==`undefined`&&!t[n]&&e.classList.remove(n)}for(o=0,s=i.length;o<s;o++){let n=i[o],a=!!t[n];n&&n!==`undefined`&&r[n]!==a&&a&&e.classList.add(n)}e._$classes=t}function ea(e,t,n,r){if(r){let r=Ai+t,i;Array.isArray(n)?(i=n[1],e[r]=n[0]):e[r]=n,e[`${r}Data`]=i}else{if(Array.isArray(n)){let r=n[0],i=t=>r.call(e,n[1],t);return i[Mi]=n,e.addEventListener(t,i),i}return e.addEventListener(t,n,typeof n!=`function`&&n),n}}function ta(e){if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return e.map(ta);if(e[dr]!==e)return e;let t=Reflect.ownKeys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof i==`string`&&(n[i]=e[i])}return n}function na(e,t){Array.isArray(e)?e.flat(1/0).forEach(e=>e&&e(t)):e(t)}function ra(e,t){let n=Pn(e);In(()=>na(n,t))}var ia={scope:!0},aa=null,oa=null,sa=null;function W(e,t,n,r,i){let a=n!==void 0;if(a&&!r&&(r=[]),aa!==null&&(r=aa.claimInitial(e,a,r)),typeof t!=`function`&&(t=_a(t,r,a,!0),typeof t!=`function`)){pa(e,t,r,n),sa!==null&&i&&i.host&&sa(t,i.host);return}if(a&&r.length===0){let t=document.createTextNode(``);e.insertBefore(t,n),r=[t]}let o=!1;B(()=>{aa!==null&&(r=aa.reclaimRegion(r,e,n));let s=_a(t(),r,a,!0),c=o;return o=!0,typeof s==`function`?(B(()=>(aa!==null&&(r=aa.reclaimRegion(r,e,n)),_a(s,r,a)),t=>{r=pa(e,t,r,n),sa!==null&&i&&i.host&&sa(r,i.host)},c&&!(i&&i.schedule)?{...i,schedule:!0}:i),Ni):s},t=>{t!==Ni&&(r=pa(e,t,r,n),sa!==null&&i&&i.host&&sa(r,i.host))},t.$s?i?{...i,scope:!0}:ia:i)}function ca(e){return!wi.hydrating||wi.isClaiming&&!wi.isClaiming()?!1:!e||e.isConnected?!0:la!==null&&la.claimed(e)}var la=null;function ua(e){if(Array.isArray(e)){let t={};da(e,t),e=t}if(e&&typeof e==`object`){let t={},n=Object.keys(e);for(let r=0,i=n.length;r<i;r++){let i=n[r];if(!e[i])continue;let a=i.trim().split(/\s+/);for(let e=0,n=a.length;e<n;e++)a[e]&&(t[a[e]]=!0)}return t}return e}function da(e,t){for(let n=0,r=e.length;n<r;n++){let r=e[n];Array.isArray(r)?da(r,t):typeof r==`object`&&r?Object.assign(t,r):typeof r!=`boolean`&&(r||r===0)&&(t[r]=!0)}}function fa(e,t,n){if(aa!==null&&aa.dedupEvent(e))return;let r=e[ji],i;if(r){if(r===!0||r===t||!t.contains(r))return;i=r}let a=n.owners.size===1&&n.owners.has(t)?t:Ki(e.target,n)?.owner;if(!a||a===i)return;e[ji]=a;let o=i||e.target,s=Ai+e.type,c=(t,n)=>Object.defineProperty(e,t,{configurable:!0,value:n}),l=()=>{let t=o[s];if(t&&!o.disabled){c(`currentTarget`,o);let n=o[`${s}Data`];if(n===void 0?typeof t==`function`?t.call(o,e):t.handleEvent(e):t.call(o,n,e),e.cancelBubble)return}return o.host&&typeof o.host!=`string`&&!o.host._$host&&o.contains(e.target)&&c(`target`,o.host),!0},u=()=>o===a||o.parentNode===a,d=()=>{for(;o&&l()&&!u();)o=Gi(o)};if(i)i===e.target&&(o=Gi(i)),o&&o!==a&&d();else if(e.composedPath){let t=e.composedPath();if(t.length){c(`target`,t[0]);for(let e=0;e<t.length&&(o=t[e],l());e++){if(o._$host){o=o._$host,d();break}if(u())break}}else d()}else d();delete e.target,delete e.currentTarget}function pa(e,t,n,r){if(aa!==null&&ca(e)){if(t&&t!==n){let e=Array.isArray(t);for(let r of e?t:[t])if(r&&r.nodeType){if(!ca(r))return n}else if(e&&(typeof r==`string`||typeof r==`number`))return n}return t}if(t===n)return t;if(aa!==null&&wi.hydrating&&t&&t.length!==0){let r=[].concat(n??[]);if([].concat(t).every(t=>(t===r[0]&&r.shift(),t?.parentNode===e))&&!r.length)return t}let i=typeof t;if(i===`string`||i===`number`){let r=typeof n;r===`string`||r===`number`?e.firstChild.data=t:va(e,n)?e.textContent=t:(ya(e,n),e.insertBefore(document.createTextNode(t),e.firstChild))}else if(t===void 0)ba(e,n,r);else if(t.nodeType)Array.isArray(n)?ba(e,n,r??null,t):n!=null&&n.nodeType?n.parentNode===e?e.replaceChild(t,n):e.appendChild(t):n!=null&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t),(r||t[Ti])&&(t[Ti]=r||e);else if(Array.isArray(t)){let i=Array.isArray(n);for(let e=0,r=t.length;e<r;e++){let r=t[e],a=typeof r;if(a===`string`||a===`number`){let a=i?n[e]:void 0;if(a&&a.nodeType===3){let n=a._$d;n!==r&&(n!==void 0||a.data!==``+r)&&(a.data=a._$d=r),t[e]=a}else t[e]=document.createTextNode(r)}}t.length===0?ba(e,n,r):i?ki(e,n,t,r):(n!=null&&ba(e,n),ki(e,[],t))}return oa&&oa(e),t}function ma(e){(e=e.currentTarget||e)._$v=null,e.removeEventListener(`change`,ma,!0)}function ha(e,t){let n=e._$v&&e._$v.map;if(t!=null&&t.map?n||e.addEventListener(`change`,ma,!0):n&&e.removeEventListener(`change`,ma,!0),t==null)return e._$v=null,queueMicrotask(()=>e.value=t)||(e.value=t);e._$v=t,(oa||=ga)(e),queueMicrotask(()=>oa(e))}function ga(e){e&&e._$v==null&&(e=e.parentNode);let t=e&&e._$v;if(t!=null){if(t.map){let n=[...e.options];for(let e=0;e<n.length;e++)n[e].selected=t.some(t=>t==n[e].value);t.every(e=>n.some(t=>t.value==e))&&ma(e)}else e.value=t,e.selectedIndex>-1&&e.value==t&&(e._$v=null)}}function _a(e,t,n,r){if(e=jr(e,{skipNonRendered:!0,doNotUnwrap:r}),r&&typeof e==`function`)return e;if(n&&!Array.isArray(e)&&(e=[e??``]),aa!==null&&wi.hydrating&&Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n],i=t&&t[n],a=typeof r;(a===`string`||a===`number`)&&i&&i.nodeType===3&&ca(i)&&(e[n]=i)}return e}function va(e,t){if(t==null)return!0;if(Array.isArray(t))return t.length?e.firstChild===t[0]&&e.lastChild===t[t.length-1]:e.firstChild===null;if(t===``)return e.firstChild===null;if(t.nodeType)return e.firstChild===t&&e.lastChild===t;let n=e.firstChild;return n!==null&&n.nodeType===3&&e.lastChild===n}function ya(e,t){if(Array.isArray(t))for(let n=0;n<t.length;n++){let r=t[n];r.parentNode===e&&r.remove()}else if(t.nodeType)t.parentNode===e&&t.remove();else{let t=e.firstChild;t&&t.nodeType===3&&t.remove()}}function ba(e,t,n,r){if(n===void 0)return va(e,t)?e.textContent=``:ya(e,t);if(t.length){let i=!1;for(let a=t.length-1;a>=0;a--){let o=t[a];if(r!==o){let t=o[Ti],s=o.parentNode===e&&(!t||t===(n||e));r&&!i&&!a?s?e.replaceChild(r,o):e.insertBefore(r,n):s&&o.remove()}else i=!0}}else r&&e.insertBefore(r,n);r&&(n||r[Ti])&&(r[Ti]=n||e)}function G(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}function xa(e){let t=new CSSStyleSheet;return t.replaceSync(e),t}function Sa(e,t){if(customElements.get(e))return;class n extends HTMLElement{#e=/* @__PURE__ */ new Map;#t;constructor(){super();for(let e of t.props)if(this.#e.set(e,I()),Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}#n=/* @__PURE__ */ new Map;_get(e){return this.#n.get(e)}_set(e,t){this.#n.set(e,t),this.#e.get(e)[1](()=>t)}connectedCallback(){if(this.#t)return;let e=this.shadowRoot??this.attachShadow({mode:`open`});e.adoptedStyleSheets=t.styles();let n={};for(let[e,[t]]of this.#e)n[e]=t;this.#t=Ii(()=>t.view(n,this),e)}disconnectedCallback(){queueMicrotask(()=>{!this.isConnected&&this.#t&&(this.#t(),this.#t=void 0,this.shadowRoot?.replaceChildren())})}}for(let e of t.props)Object.defineProperty(n.prototype,e,{get(){return this._get(e)},set(t){this._set(e,t)},configurable:!0});customElements.define(e,n)}function Ca(e,t){return gi(()=>{let n=e();return n?t(n):void 0})}var wa=Symbol(`slots`);function Ta(e,t){let n=e[wa]??=/* @__PURE__ */ new Map,r=n.get(t);return r||(r={v:void 0,ver:I(0)},n.set(t,r)),r}function K(){return(e,t)=>{Object.defineProperty(e,t,{get(){let e=Ta(this,t);return e.ver[0](),e.v},set(e){let n=Ta(this,t);n.v!==e&&(n.v=e,n.ver[1](e=>e+1))},configurable:!0})}}var Ea={new_chat:`New chat`,copy:`Copy`,copied:`Copied`,copy_failed:`Copy failed`,confirm_delete:`Delete this conversation?`,announce_phone:`Waiting for an admin to approve on their phone.`,announce_approval:`An action needs your approval; its card is in the chat.`,announce_error:`Something went wrong; the message is in the chat.`,announce_done:`Reply finished`,confirm_undo:`Undo "{name}"?`,undone_notice:`Undone: {summary}`,continue_message:`Continue.`,photos_not_kept:`Photos aren't kept after they're sent. Attach them again to include them.`,photo_unreadable:`Couldn't read {name} as a photo.`,that_picture:`that picture`,load_error:`LLM Agent could not load: {error}`,no_provider:`No AI provider is configured. Add one under Settings → Devices & services → LLM Agent → Configure.`,hide_chats:`Hide chats`,show_chats:`Show chats`,conversations:`Conversations`,export_title:`Download this chat as Markdown`,export:`Export`,home_notes:`Home notes`,panel_settings:`Panel settings`,conversation:`Conversation`,search_chats:`Search chats`,no_matches:`No chats match.`,no_chats:`No chats yet.`,started_by_automation:`Started by an automation`,delete:`Delete`,delete_chat:`Delete chat`,notes_placeholder:`The office is upstairs.`,save:`Save`,characters_left:`{count} characters left`,notes_hint:`Short lasting facts and rules about this home. Enabled notes go into every chat. To change how the AI works, use "Extra instructions for the AI" in the integration's settings instead. Don't put passwords here.`,knowledge_hint:`Longer reference about this home. Only the titles and summaries go into each chat, and the AI reads an entry when a question needs it.`,notes_tab:`Notes`,knowledge_tab:`Knowledge`,add:`Add`,notes_none:`Nothing here yet.`,note_enabled:`Enabled`,note_from_ai:`from the AI`,delete_confirm:`Delete this?`,knowledge_title:`Title`,knowledge_summary:`One-line summary`,knowledge_body:`Text (Markdown)`,theme:`Theme`,theme_auto:`Follow Home Assistant`,theme_light:`Light`,theme_dark:`Dark`,text_size:`Text size`,size_small:`Small`,size_normal:`Normal`,size_large:`Large`,send_with:`Send with`,compact_layout:`Compact layout`,expand_tools:`Expand tool cards`,show_usage:`Show token use and cost`,my_default:`My default for new chats: {model}`,provider_default:`the provider's default`,model_provider_default:`provider default`,use_current_model:`Use the current model`,clear:`Clear`,prefs_hint:`These settings are kept in this browser.`,greeting_morning:`Good morning`,greeting_afternoon:`Good afternoon`,greeting_evening:`Good evening`,greeting_name:`{greeting}, {name}`,welcome_member:`I can control the devices shared with Assist and answer questions about them.`,welcome_admin:`I can control devices, answer questions about your home, and build automations, scenes, scripts and dashboards.`,mode_ask_all:`Ask before every change`,mode_ask_risky:`Ask before risky actions`,mode_reviewer:`Reviewer decides risky actions`,mode_autopilot:`Autopilot`,mode_yolo:`YOLO`,mode_read_only:`Read only`,edit:`Edit`,retry:`Retry`,continue:`Continue`,continue_anyway:`Continue anyway`,hide_preview:`Hide preview`,preview_dashboard:`Preview the dashboard`,suggested_note:`Suggested home note`,note_question:`Remember this for every chat?`,note_explain:`The AI suggests changing your home notes. Every future chat follows them.`,forget:`Forget`,note_no:`No, don't remember`,note_save_title:`Save to home notes`,read_it_first:`Read it first`,save_to_notes:`Save to notes`,running:`Running`,done:`Done`,failed:`Failed`,waiting_for_you:`Waiting for you`,needs_approval:`Needs your approval`,undone:`undone`,undo_title:`Undo this change`,undo:`Undo`,reviewer:`Reviewer`,reviewer_model:`Reviewer ({model})`,reviewer_approved:`Reviewer approved`,reviewer_denied:`Reviewer denied`,reviewer_unsure:`Reviewer unsure, asking you`,reviewing:`Reviewing…`,denied:`Denied`,camera_snapshot:`Camera snapshot`,phone_wait:`Waiting for an admin to approve this on their phone.`,approval_note:`Optional note for the AI`,deny:`Deny`,approve:`Approve`,your_photo:`Your photo`,one_photo:`1 photo`,n_photos:`{count} photos`,not_kept:`(not kept)`,page_chip:`Page: {page}`,page_chip_on:`Sent with your next message. Click to leave it out.`,page_chip_off:`Left out of your next message. Click to send it.`,page_sent:`with page: {page}`,composer_placeholder:`Ask or tell me to do something…`,photo_to_send:`Photo to send`,remove_photo:`Remove photo`,attach_title:`Attach photos or files: text, logs, YAML, JSON, CSV, PDF, zip`,attach:`Attach photos or files`,remove_file:`Remove file`,that_file:`that file`,file_text:`Text`,too_many_files:`Up to {count} files can go with one message.`,file_too_large:`{name} is larger than {limit}.`,files_over_total:`{name} would make this message too large to send. Remove an attachment or send it in a separate message.`,file_unreadable:`Couldn't read {name}.`,file_unsupported:`{name} can't be read. Text files (YAML, JSON, logs, CSV, code), PDFs, zip or gzip archives and pictures work.`,files_not_kept:`Files can't be sent again from a reloaded chat. Attach them again to include them.`,provider_and_model:`Provider and model`,provider:`Provider`,model:`Model`,stop:`Stop`,send:`Send`,editing_last:`Editing your last message`,editing_earlier:`Editing an earlier message. Sending replaces it and everything after it. Device changes already made are not undone.`,keys_enter:`Enter to send, Shift+Enter for a new line`,keys_ctrl:`Ctrl+Enter to send`,cancel:`Cancel`,usage_title:`Tokens in / out (cached). Cost is an estimate.`,usage_line:`{input} in · {output} out`,usage_cached:`{count} cached`,cost_na:`cost n/a`,reviewer_usage:`reviewer {tokens} tokens, {cost}`,today:`Today`,yesterday:`Yesterday`,previous_7:`Previous 7 days`,previous_30:`Previous 30 days`,older:`Older`,you:`You`,tip_lights:`Turn off all the lights in the {room}`,tip_anything_on:`Is anything still on?`,tip_temperature:`What's the temperature inside?`,tip_dashboard_room:`Make a dashboard for the {room}`,tip_dashboard_all:`Make a dashboard with a card for every room`,tip_automation:`Create an automation: porch light on at sunset, off at 11pm`,tip_energy:`What used the most energy this week?`,tip_unavailable:`Why did a sensor go unavailable yesterday?`,tip_batteries:`Which batteries are running low?`,living_room:`living room`,preview_unavailable:`Preview unavailable: {error}`,preview_no_views:`This dashboard has no views.`,preview_view:`View {n}`,preview_skipped_n:`{count} cards not shown: the preview only draws Home Assistant's own entity cards.`,preview_skipped_one:`1 card not shown: the preview only draws Home Assistant's own entity cards.`,tool_call_service:`call service`,tool_camera_snapshot:`camera snapshot`,tool_delete_config_item:`delete config item`,tool_delete_dashboard:`delete dashboard`,tool_get_config_item:`get config item`,tool_get_dashboard:`get dashboard`,tool_get_entities:`get entities`,tool_get_history:`get history`,tool_get_logbook:`get logbook`,tool_get_statistics:`get statistics`,tool_get_traces:`get traces`,tool_ha_websocket:`ha websocket`,tool_home_control:`home control`,tool_home_entities:`home entities`,tool_home_history:`home history`,tool_integrations:`integrations`,tool_list_areas:`list areas`,tool_list_config_items:`list config items`,tool_list_dashboards:`list dashboards`,tool_list_devices:`list devices`,tool_list_files:`list files`,tool_list_services:`list services`,tool_read_file:`read file`,tool_read_log:`read log`,tool_read_reference:`read reference`,tool_render_template:`render template`,tool_save_config_item:`save config item`,tool_save_dashboard:`save dashboard`,tool_search_entities:`search entities`,tool_shell:`shell`,tool_system:`system`,tool_undo:`undo`,tool_change_home_note:`change home note`,tool_change_knowledge:`change knowledge`,tool_read_knowledge:`read knowledge`,tool_update_registry:`update registry`,tool_web_fetch:`web fetch`,tool_web_search:`web search`,tool_write_file:`write file`,changes:`Changes`,changes_title:`What the assistant changed, in every chat`,changes_from:`From`,changes_to:`To`,changes_all_chats:`All chats`,changes_user:`Person`,changes_everyone:`Everyone`,changes_search:`Search changes`,changes_error:`Could not load changes: {error}`,changes_none:`No changes match.`,changes_more:`Load more`,changes_deleted_chat:`Deleted chat`,changes_no_user:`No signed-in user`,changes_asked:`Approved by a person`,changes_auto:`Automatic`,changes_rule:`Allowed by a rule`,changes_undo_gone:`Undo expired`,changes_undo_gone_title:`Its undo copy was removed to save space`,tool_change_history:`change history`,tool_past_chats:`past chats`,tool_read_chat:`read chat`,usage:`Usage`,usage_view_title:`Spend and tokens over time, in every chat`,usage_days:`{n} days`,usage_today:`Today`,usage_week:`Last 7 days`,usage_month:`Last 30 days`,usage_cap:`Daily cap {cap}: {used} used today ({pct}%). AI Task calls do not count toward the cap.`,usage_chart:`Estimated spend per day, highest`,usage_since:`Tracked since {date}. Nothing before that was recorded.`,usage_none:`No usage recorded yet.`,usage_estimate:`Costs are estimates from model prices, not the provider's bill.`,usage_model:`Model`,usage_in:`In`,usage_out:`Out`,usage_col_cached:`Cached`,usage_calls:`Calls`,usage_cost:`Cost`,usage_kind_task:`AI Task`,usage_kind_review:`Reviewer`,usage_no_price:`No price`,usage_unpriced:`{n} calls without a price`,usage_error:`Could not load usage: {error}`,balance_left:`{name}: {left} left of this key's {limit} limit.`,balance_no_limit:`{name}: this key has no spending limit and used {month} this month. The account balance is only shown on the billing page.`,balance_none:`{name} has no balance an API key can read.`,balance_local:`{name} runs locally and has no balance.`,balance_error:`{name}: the balance could not be read ({error}).`,billing_page:`Billing page`,integration_settings:`Integration settings`,open_in_ha:`Open in Home Assistant`,close:`Close`,settings_loading:`Loading the integration's settings.`,settings_unsupported:`This step can't be shown here. Open it in Home Assistant to continue.`,settings_error:`Could not open the integration's settings: {error}`,settings_menu:`Back to the menu`,settings_submit:`Submit`,settings_reloading:`Saved. LLM Agent is reloading with the new settings.`,settings_reloaded:`Saved. LLM Agent reloaded with the new settings.`,settings_saved:`Saved.`,settings_reload_failed:`Saved, but LLM Agent did not start again. Open it in Home Assistant to see why.`,settings_back:`Back to chat`,settings_bad_json:`This isn't valid JSON.`,usage_all_time:`All time`,usage_all_time_hint:`All time is every saved chat's cost added up ({count} chats), plus AI Tasks. Deleted chats are not in it.`,usage_since_filled:`Model detail since {date}. Days before that are daily totals from the spend cap's record.`,usage_earlier:`Before model detail`,usage_earlier_hint:`daily totals only`,float_minimize:`Minimize`,float_restore:`Restore`,float_full_panel:`Open the full panel`,float_resize:`Resize`,chat_mode:`Approval mode`,chat_mode_title:`Approval mode for this chat. New chats start in the mode set in the integration settings.`,chat_mode_ask_all:`Manual`,chat_mode_ask_risky:`Ask for risky`,chat_mode_accept_edits:`Accept edits`,chat_mode_reviewer:`Reviewer`,chat_mode_autopilot:`Auto`,chat_mode_yolo:`YOLO`,chat_mode_read_only:`Read only`,chat_mode_planning:`Planning`,run_plan:`Run plan`,run_plan_message:`Run this plan now:`,model_search:`Search models`,models_found:`{count} models`,models_suggested_first:`{count} models, suggestions first`,model_price_head:`$ per M tokens, in / out`,models_more:`{count} more, keep typing to narrow it down`,models_none:`No model matches. Press Enter to use what you typed.`,model_free:`free`,turn_log_about:`Turn log: one record per chat turn, for tuning the prompt. It stays in Home Assistant.`,turn_log_download:`Download turn log`,turn_log_empty:`The turn log is empty.`,turn_log_off:`The turn log is off in the integration settings and holds nothing.`,turn_log_saved:`Saved {count} turns.`},Da=[`de`,`es`,`fr`,`it`,`nl`,`pl`,`pt-BR`,`sv`,`zh-Hans`,`zh-Hant`],Oa={},ka=`en`,Aa=/* @__PURE__ */ I(0);function q(e,t){Aa[0]();let n=Oa[e]??Ea[e];return t?n.replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):e):n}function ja(e){return e in Ea}function Ma(e){if(!e)return`en`;let t=Da.find(t=>t.toLowerCase()===e.toLowerCase());if(t)return t;let n=e.split(`-`)[0].toLowerCase();return Da.find(e=>e.split(`-`)[0].toLowerCase()===n)??`en`}async function Na(e){let t=Ma(e);if(t===ka)return!1;if(t===`en`)return Oa={},ka=`en`,Aa[1](e=>e+1),!0;try{let e=new URL(import.meta.url),n=await fetch(new URL(`i18n/${t}.json${e.search}`,e));if(!n.ok)return!1;let r=await n.json(),i={};for(let e of Object.keys(Ea))typeof r[e]==`string`&&(i[e]=r[e]);return Oa=i,ka=t,Aa[1](e=>e+1),!0}catch{return!1}}function Pa(e,t){this.v=e,this.k=t}function Fa(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Ia(e){if(Array.isArray(e))return e}function La(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function Ra(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function za(e,t){return Ia(e)||La(e,t)||Ba(e,t)||Ra()}function Ba(e,t){if(e){if(typeof e==`string`)return Fa(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Fa(e,t):void 0}}function Va(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof Pa;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}Va.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},Va.prototype.next=function(e){return this._invoke(`next`,e)},Va.prototype.throw=function(e){return this._invoke(`throw`,e)},Va.prototype.return=function(e){return this._invoke(`return`,e)};var Ha=Object.entries,Ua=Object.setPrototypeOf,Wa=Object.isFrozen,Ga=Object.getPrototypeOf,Ka=Object.getOwnPropertyDescriptor,qa=Object.freeze,Ja=Object.seal,Ya=Object.create,Xa=typeof Reflect<`u`&&Reflect,Za=Xa.apply,Qa=Xa.construct;qa||=function(e){return e},Ja||=function(e){return e},Za||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},Qa||=function(e){return new e(...[...arguments].slice(1))};var $a=J(Array.prototype.forEach);Array.prototype.indexOf;var eo=J(Array.prototype.lastIndexOf),to=J(Array.prototype.pop),no=J(Array.prototype.push),ro=J(Array.prototype.slice),io=J(Array.prototype.splice),ao=Array.isArray,oo=wo(Set),so=J(Set.prototype.add),co=J(Set.prototype.has),lo=J(String.prototype.toLowerCase),uo=J(String.prototype.toString),fo=J(String.prototype.match),po=J(String.prototype.replace),mo=J(String.prototype.indexOf),ho=J(String.prototype.trim),go=J(Number.prototype.toString),_o=J(Boolean.prototype.toString),vo=typeof BigInt>`u`?null:J(BigInt.prototype.toString),yo=typeof Symbol>`u`?null:J(Symbol.prototype.toString),bo=J(Object.prototype.hasOwnProperty),xo=J(Object.prototype.toString),So=J(RegExp.prototype.test),Co=wo(TypeError);function J(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return Za(e,t,n)}}function wo(e){return function(){return Qa(e,[...arguments])}}function Y(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:lo;if(Ua&&Ua(e,null),!ao(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(Wa(t)||(t[r]=e),i=e)}e[i]=!0}return e}function To(e){for(let t=0;t<e.length;t++)bo(e,t)||(e[t]=null);return e}function Eo(e){let t=Ya(null);for(let r of Ha(e)){var n=za(r,2);let i=n[0],a=n[1];bo(e,i)&&(t[i]=ao(a)?To(a):a&&typeof a==`object`&&a.constructor===Object?Eo(a):a)}return t}function Do(e){switch(typeof e){case`string`:return e;case`number`:return go(e);case`boolean`:return _o(e);case`bigint`:return vo?vo(e):`0`;case`symbol`:return yo?yo(e):`Symbol()`;case`undefined`:return xo(e);case`function`:case`object`:{if(e===null)return xo(e);let t=e,n=Oo(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:xo(e)}return xo(e)}default:return xo(e)}}function Oo(e,t){for(;e!==null;){let n=Ka(e,t);if(n){if(n.get)return J(n.get);if(typeof n.value==`function`)return J(n.value)}e=Ga(e)}function n(){return null}return n}function ko(e,t){for(;e!==null;){let n=Ka(e,t);if(n)return n.get?J(n.get):null;e=Ga(e)}return null}function Ao(e){try{return So(e,``),!0}catch{return!1}}var jo=qa(/* @__PURE__ */ `a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Mo=qa(/* @__PURE__ */ `svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),No=qa([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),Po=qa([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),Fo=qa(/* @__PURE__ */ `math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),Io=qa([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Lo=qa([`#text`]),Ro=qa(/* @__PURE__ */ `accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),zo=qa(/* @__PURE__ */ `accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Bo=qa(/* @__PURE__ */ `accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Vo=qa([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Ho=Ja(/{{[\w\W]*|^[\w\W]*}}/g),Uo=Ja(/<%[\w\W]*|^[\w\W]*%>/g),Wo=Ja(/\${[\w\W]*/g),Go=Ja(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ko=Ja(/^aria-[\-\w]+$/),qo=Ja(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jo=Ja(/^(?:\w+script|data):/i),Yo=Ja(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xo=Ja(/^html$/i),Zo=Ja(/^[a-z][.\w]*(-[.\w]+)+$/i),Qo=Ja(/<[/\w!]/g),$o=Ja(/<[/\w]/g),es=Ja(/<\/no(script|embed|frames)/i),ts=Ja(/\/>/i),X={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ns=qa(Y({},[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`])),rs=function(){return typeof window>`u`?null:window},is=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},as=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},os=function(e,t,n,r){return bo(e,t)&&ao(e[t])?Y(r.base?Eo(r.base):{},e[t],r.transform):n},ss=function(e,t,n){let r=bo(e,t)?e[t]:void 0;return r&&typeof r==`object`?Eo(r):n()};function cs(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rs(),t=e=>cs(e);if(t.version=`3.4.17`,t.removed=[],!e||!e.document||e.document.nodeType!==X.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=Oo(d,`cloneNode`),p=Oo(d,`remove`),m=Oo(d,`removeAttributeNode`),h=Oo(d,`nextSibling`),g=Oo(d,`childNodes`),_=Oo(d,`parentNode`),v=Oo(d,`shadowRoot`),y=Oo(d,`attributes`),b=o&&o.prototype?Oo(o.prototype,`nodeType`):null,x=o&&o.prototype?Oo(o.prototype,`nodeName`):null,S=o&&o.prototype?Oo(o.prototype,`ownerDocument`):null,C=function(e){return b?b(e):e.nodeType},ee=function(e){return x?x(e):e.nodeName},w=ko(d,`namespaceURI`),T=function(e){return w?w(e):e.namespaceURI};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let E,te=``,ne,re=!1,ie=0,ae=function(){if(ie>0)throw Co(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},oe=function(e){ae(),ie++;try{return E.createHTML(e)}finally{ie--}},D=function(e){ae(),ie++;try{return E.createScriptURL(e)}finally{ie--}},se=function(){return re||=(ne=is(u,i),!0),ne},ce=n,le=ce.implementation,ue=ce.createNodeIterator,de=ce.createDocumentFragment,fe=ce.getElementsByTagName,pe=r.importNode,O=as();t.isSupported=typeof Ha==`function`&&typeof _==`function`&&le&&le.createHTMLDocument!==void 0;let me=Ho,he=Uo,ge=Wo,_e=Go,ve=Ko,ye=Jo,be=Yo,xe=Zo,Se=qo,k=null,Ce=Y({},[...jo,...Mo,...No,...Fo,...Lo]),A=null,we=Y({},[...Ro,...zo,...Bo,...Vo]),Te=Object.seal(Ya(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ee=null,De=null,Oe=Object.seal(Ya(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ke=!0,Ae=!0,je=!1,Me=!0,Ne=!1,Pe=!0,j=!1,Fe=!1,Ie=null,Le=null,Re=!1,ze=!1,Be=!1,Ve=!1,He=!0,Ue=!1,We=`user-content-`,Ge=!0,Ke=!1,qe=null,Je={},Ye=null,Xe=Y({},/* @__PURE__ */ `annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),M=null,Ze=Y({},[`audio`,`video`,`img`,`source`,`image`,`track`]),Qe=null,$e=Y({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),et=`http://www.w3.org/1998/Math/MathML`,tt=`http://www.w3.org/2000/svg`,nt=`http://www.w3.org/1999/xhtml`,rt=nt,it=!1,at=null,ot=Y({},[et,tt,nt],uo),st=qa([`mi`,`mo`,`mn`,`ms`,`mtext`]),ct=Y({},st),lt=qa([`annotation-xml`]),ut=Y({},lt),dt=Y({},[`title`,`style`,`font`,`a`,`script`]),ft=null,pt=[`application/xhtml+xml`,`text/html`],N=null,mt=null,ht=n.createElement(`form`),gt=function(e){return e instanceof RegExp||e instanceof Function},_t=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(mt&&mt===e)return;(!e||typeof e!=`object`)&&(e={}),e=Eo(e),ft=pt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,N=ft===`application/xhtml+xml`?uo:lo,k=os(e,`ALLOWED_TAGS`,Ce,{transform:N}),A=os(e,`ALLOWED_ATTR`,we,{transform:N}),at=os(e,`ALLOWED_NAMESPACES`,ot,{transform:uo}),Qe=os(e,`ADD_URI_SAFE_ATTR`,$e,{transform:N,base:$e}),M=os(e,`ADD_DATA_URI_TAGS`,Ze,{transform:N,base:Ze}),Ye=os(e,`FORBID_CONTENTS`,Xe,{transform:N}),Ee=os(e,`FORBID_TAGS`,Eo({}),{transform:N}),De=os(e,`FORBID_ATTR`,Eo({}),{transform:N}),Je=bo(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?Eo(e.USE_PROFILES):e.USE_PROFILES:!1,ke=e.ALLOW_ARIA_ATTR!==!1,Ae=e.ALLOW_DATA_ATTR!==!1,je=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ne=e.SAFE_FOR_TEMPLATES||!1,Pe=e.SAFE_FOR_XML!==!1,j=e.WHOLE_DOCUMENT||!1,ze=e.RETURN_DOM||!1,Be=e.RETURN_DOM_FRAGMENT||!1,Ve=e.RETURN_TRUSTED_TYPE||!1,Re=e.FORCE_BODY||!1,He=e.SANITIZE_DOM!==!1,Ue=e.SANITIZE_NAMED_PROPS||!1,Ge=e.KEEP_CONTENT!==!1,Ke=e.IN_PLACE||!1,Se=Ao(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:qo,rt=typeof e.NAMESPACE==`string`?e.NAMESPACE:nt,ct=ss(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>Y({},st)),ut=ss(e,`HTML_INTEGRATION_POINTS`,()=>Y({},lt));let t=ss(e,`CUSTOM_ELEMENT_HANDLING`,()=>Ya(null));if(Te=Ya(null),bo(t,`tagNameCheck`)&&gt(t.tagNameCheck)&&(Te.tagNameCheck=t.tagNameCheck),bo(t,`attributeNameCheck`)&&gt(t.attributeNameCheck)&&(Te.attributeNameCheck=t.attributeNameCheck),bo(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(Te.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),Ja(Te),Ne&&(Ae=!1),Be&&(ze=!0),Je&&(k=Y({},Lo),A=Ya(null),Je.html===!0&&(Y(k,jo),Y(A,Ro)),Je.svg===!0&&(Y(k,Mo),Y(A,zo),Y(A,Vo)),Je.svgFilters===!0&&(Y(k,No),Y(A,zo),Y(A,Vo)),Je.mathMl===!0&&(Y(k,Fo),Y(A,Bo),Y(A,Vo))),Oe.tagCheck=null,Oe.attributeCheck=null,bo(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?Oe.tagCheck=e.ADD_TAGS:ao(e.ADD_TAGS)&&(k===Ce&&(k=Eo(k)),Y(k,e.ADD_TAGS,N))),bo(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?Oe.attributeCheck=e.ADD_ATTR:ao(e.ADD_ATTR)&&(A===we&&(A=Eo(A)),Y(A,e.ADD_ATTR,N))),bo(e,`ADD_FORBID_CONTENTS`)&&ao(e.ADD_FORBID_CONTENTS)&&(Ye===Xe&&(Ye=Eo(Ye)),Y(Ye,e.ADD_FORBID_CONTENTS,N)),Ge&&(k[`#text`]=!0),j&&Y(k,[`html`,`head`,`body`]),k.table&&(Y(k,[`tbody`]),delete Ee.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw Co(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw Co(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=E;E=e.TRUSTED_TYPES_POLICY;try{te=oe(``)}catch(e){throw E=t,e}}else e.TRUSTED_TYPES_POLICY===null?(E=void 0,te=``):(E===void 0&&(E=se()),E&&typeof te==`string`&&(te=oe(``)));qa&&qa(e),mt=e},vt=Y({},[...Mo,...No,...Po]),yt=Y({},[...Fo,...Io]),bt=function(e,t,n){return t.namespaceURI===nt?e===`svg`:t.namespaceURI===et?e===`svg`&&(n===`annotation-xml`||ct[n]):!!vt[e]},xt=function(e,t,n){return t.namespaceURI===nt?e===`math`:t.namespaceURI===tt?e===`math`&&ut[n]:!!yt[e]},St=function(e,t,n){return t.namespaceURI===tt&&!ut[n]||t.namespaceURI===et&&!ct[n]?!1:!yt[e]&&(dt[e]||!vt[e])},Ct=function(e){let t=T(e),n=lo(ee(e)),r=_(e),i,a;return r&&C(r)===X.element?(i={namespaceURI:T(r)},a=lo(ee(r))):(i={namespaceURI:rt},a=`template`),at[t]?t===tt?bt(n,i,a):t===et?xt(n,i,a):t===nt?St(n,i,a):!!(ft===`application/xhtml+xml`&&at[t]):!1},P=function(e){no(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw Co(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},wt=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},Tt=function(e){kt(e);let t=g(e);t&&$a(ro(t),e=>{try{p(e)}catch{}});let n=C(e)===X.element?y(e):null;if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&wt(e,r,i)}},Et=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}no(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(ze||Be)try{P(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},Dt=function(e){let t=y(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||A[N(i)]||wt(e,r,i)}},Ot=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=[e];for(;r.length>0;){let e=r.pop();if(t(e)===!1)continue;if(n&&C(e)===X.element){let t=v(e);Wt(t)&&r.push(t)}let i=g(e);if(i)for(let e=i.length-1;e>=0;--e)r.push(i[e])}},kt=function(e){Ot(e,e=>{C(e)===X.element&&Dt(e)})},At=function(e){let t=[];return Ot(e,e=>{t.push(e)},!0),t},jt=function(e,t){let n=oo();$a(At(e),e=>{C(e)===X.element&&so(n,e)}),$a(t,e=>{C(e)===X.element&&!co(n,e)&&Dt(e)})},Mt=function(e,n){let r=!1;return $a(t.removed,t=>{t.element&&(r||=t.element===e,kt(t.element))}),jt(e,n),r},Nt=function(e,t){let n=qe,r=null,i=()=>(r||(r=oo(),$a(t,e=>{so(r,e)})),r);for(let t=0;;t++){let r=At(e),a=[e],o=!1;if($a(r,e=>{C(e)===X.documentFragment?no(a,e):!o&&!co(n,e)&&(o=co(i(),e))}),!o)return;if(t>=8)throw Co(`the tree kept changing during in-place sanitization; refusing to return it`);$a(a,(t,n)=>{Pt(t,n>0,e,i())})}},Pt=function(e,t,n,r){let i=zt(e),a;for(;a=i.nextNode();)co(r,a)&&!co(qe,a)&&(t&&Kt(O.uponSanitizeShadowNode,a,null),Qt(a,n),on(a,n),Wt(a.content)&&sn(a.content))},Ft=function(e){qe&&so(qe,e)},It=function(e,t){return Pe?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Lt=function(e){Pe&&Ot(e,e=>{let t=C(e);if(t===X.processingInstruction||t===X.comment&&So($o,e.data)){try{p(e)}catch{}return!1}if(t===X.element){let t=e,n=N(ee(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&It(`for`,n)&&t.removeAttribute(`for`)}catch{}}return!0})},Rt=function(e){let t=null,r=null;if(Re)e=`<remove></remove>`+e;else{let t=fo(e,/^[\r\n\t ]+/);r=t&&t[0]}ft===`application/xhtml+xml`&&rt===nt&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=E?oe(e):e;if(rt===nt)try{t=new l().parseFromString(i,ft)}catch{}if(!t||!t.documentElement){t=le.createDocument(rt,`template`,null);try{t.documentElement.innerHTML=it?te:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),rt===nt?fe.call(t,j?`html`:`body`)[0]:j?t.documentElement:a},zt=function(e){let t=S?S(e):e.ownerDocument;return ue.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Bt=function(e){return e=po(e,me,` `),e=po(e,he,` `),e=po(e,ge,` `),e},Vt=function(e){Ht(e);let t=e.querySelectorAll?.call(e,`template`);t&&$a(t,e=>{Wt(e.content)&&Vt(e.content)})},Ht=function(e){e.normalize();let t=S?S(e):e.ownerDocument,n=ue.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=Bt(r.data),r=n.nextNode()},Ut=function(e){let t=x?x(e):null;return typeof t!=`string`||N(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==y(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==b(e)||e.childNodes!==g(e)},Wt=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return b(e)===X.documentFragment}catch{return!1}},Gt=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return typeof b(e)==`number`}catch{return!1}};function Kt(e,n,r){e.length!==0&&$a(e,e=>{e.call(t,n,r,mt)})}let qt=function(e,t){return!!(Pe&&e.hasChildNodes()&&!Gt(e.firstElementChild)&&So(Qo,e.textContent)&&So(Qo,e.innerHTML)||Pe&&ns[t]&&C(e)===X.element&&T(e)===nt&&(Gt(e.firstElementChild)||typeof e.textContent==`string`&&So(Qo,e.textContent))||e.nodeType===X.processingInstruction||Pe&&e.nodeType===X.comment&&So($o,e.data))},Jt=function(e,t){return e instanceof RegExp?So(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},Yt=function(e,t,n){if(!Ee[t]&&tn(t)&&Jt(Te.tagNameCheck,t))return!1;if(Ge&&!Ye[t]&&!Ye[lo(t)]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return P(e),!0},Xt=function(e,t,n,r){return e.length===0?t:t===n||t===r?Eo(t):t},Zt=function(e,t){return e===t||_(e)!==null?!1:(Ke&&kt(e),!0)},Qt=function(e,n){if(Ft(e),Kt(O.beforeSanitizeElements,e,null),Zt(e,n))return!0;if(Ut(e))return P(e),!0;let r=N(ee(e));if(k=Xt(O.uponSanitizeElement,k,Ce,Ie),Kt(O.uponSanitizeElement,e,{tagName:r,allowedTags:k}),Zt(e,n))return!0;if(qt(e,r))return P(e),!0;if(Ee[r]||!(Oe.tagCheck instanceof Function&&Oe.tagCheck(r))&&!k[r]){let t=Yt(e,r,n);return t===!1&&(Kt(O.afterSanitizeElements,e,null),Zt(e,n))?!0:t}if(C(e)===X.element&&!Ct(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&So(es,e.innerHTML))return P(e),!0;if(Ne&&e.nodeType===X.text){let n=Bt(e.textContent);e.textContent!==n&&(no(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Kt(O.afterSanitizeElements,e,null),Zt(e,n)},$t=function(e,t,r){if(De[t]||It(t,e)||He&&(t===`id`||t===`name`)&&(r in n||r in ht))return!1;let i=A[t]||Oe.attributeCheck instanceof Function&&Oe.attributeCheck(t,e);return Ae&&So(_e,t)||ke&&So(ve,t)?!0:i?Qe[t]||So(Se,po(r,be,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&mo(r,`data:`)===0&&M[e]||je&&!So(ye,po(r,be,``))?!0:!r:tn(e)&&Jt(Te.tagNameCheck,e)&&Jt(Te.attributeNameCheck,t,e)||t===`is`&&Te.allowCustomizedBuiltInElements&&Jt(Te.tagNameCheck,r)},en=Y({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),tn=function(e){return!en[lo(e)]&&So(xe,e)},nn=function(e,t,n,r){if(E&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return oe(r);case`TrustedScriptURL`:return D(r)}return r},rn=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Ut(e)||(P(e),!1)}catch{return Et(t,e),!1}},an=function(e,t){return Pe&&So(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t)?!0:lo(e)===`attributename`&&fo(t,`href`)!==null},on=function(e,n){if(Kt(O.beforeSanitizeAttributes,e,null),Zt(e,n))return;let r=e.attributes;if(!r||Ut(e))return;A=Xt(O.uponSanitizeAttribute,A,we,Le);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:A,forceKeepAttr:void 0},a=r.length,o=N(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=N(s),d=l,f=s===`value`?d:ho(d),p=!1;i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Kt(O.uponSanitizeAttribute,e,i),f=i.attrValue,Ue&&(u===`id`||u===`name`)&&mo(f,We)!==0&&(Et(s,e,n),f=We+f,p=!0),an(s,f)?Et(s,e,n):i.forceKeepAttr||(i.keepAttr?!Me&&So(ts,f)?Et(s,e,n):(Ne&&(f=Bt(f)),$t(o,u,f)?(f=nn(o,u,c,f),f!==d&&rn(e,s,c,f)&&p&&to(t.removed)):Et(s,e,n)):Et(s,e,n))}Kt(O.afterSanitizeAttributes,e,null),Zt(e,n)},sn=function(e){let t=null,n=zt(e);for(Kt(O.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Kt(O.uponSanitizeShadowNode,t,null),Qt(t,e),on(t,e),Wt(t.content)&&sn(t.content),C(t)===X.element){let e=v(t);Wt(e)&&(cn(e),sn(e))}Ne&&Ht(e),Kt(O.afterSanitizeShadowDOM,e,null)},cn=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){sn(e.shadow);continue}let n=e.node,r=C(n)===X.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=x?x(n):null;if(typeof e==`string`&&N(e)===`template`){let e=n.content;Wt(e)&&t.push({node:e,shadow:null})}}if(r){let e=v(n);Wt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(it=!e,it&&(e=`<!-->`),typeof e!=`string`&&!Gt(e)&&(e=Do(e),typeof e!=`string`))throw Co(`dirty is not a string, aborting`);if(!t.isSupported)return e;Fe?(k=Ie,A=Le):_t(n),(O.uponSanitizeElement.length>0||O.uponSanitizeAttribute.length>0)&&(k=Eo(k)),O.uponSanitizeAttribute.length>0&&(A=Eo(A)),t.removed=[];let c=Ke&&typeof e!=`string`&&Gt(e),l=[],u=qe;if(c){Lt(e);let t=ee(e);if(typeof t==`string`){let n=N(t);if(!k[n]||Ee[n])throw Tt(e),Co(`root node is forbidden and cannot be sanitized in-place`)}if(Ut(e))throw Tt(e),Co(`root node is clobbered and cannot be sanitized in-place`);l=At(e),qe=oo()}else if(Gt(e))i=Rt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===X.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),cn(i);else{if(!ze&&!Ne&&!j&&e.indexOf(`<`)===-1)return E&&Ve?oe(e):e;if(i=Rt(e),!i)return ze?null:Ve?te:``}i&&Re&&P(i.firstChild);let d=c?e:i;try{c&&cn(e);let t=zt(d);for(;o=t.nextNode();)Qt(o,d),on(o,d),Wt(o.content)&&sn(o.content);c&&Nt(e,l)}catch(t){throw c&&(Tt(e),Mt(e,l)),t}finally{qe=u}if(c){if(Mt(e,l))throw Co(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Ne&&Vt(e),e}if(ze){if(Ne&&Vt(i),Be)for(s=de.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(A.shadowroot||A.shadowrootmode)&&(s=pe.call(r,s,!0)),s}let f=j?i.outerHTML:i.innerHTML;return j&&k[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&So(Xo,i.ownerDocument.doctype.name)&&(f=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+f),Ne&&(f=Bt(f)),E&&Ve?oe(f):f},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};_t(e),Fe=!0,Ie=k,Le=A},t.clearConfig=function(){mt=null,Fe=!1,Ie=null,Le=null,E=ne,te=``},t.isValidAttribute=function(e,t,n){mt||_t({});let r=N(e),i=N(t);return typeof n==`string`&&(an(t,n)||!Me&&So(ts,n))?!1:$t(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&bo(O,e)&&no(O[e],t)},t.removeHook=function(e,t){if(bo(O,e)){if(t!==void 0){let n=eo(O[e],t);return n===-1?void 0:io(O[e],n,1)[0]}return to(O[e])}},t.removeHooks=function(e){bo(O,e)&&(O[e]=[])},t.removeAllHooks=function(){O=as()},t}var ls=cs();function us(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ds=us();function fs(e){ds=e}var ps={exec:()=>null};function ms(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function Z(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(gs.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var hs=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),gs={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,numericCharacterReferenceOrAmpersand:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:ms(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:ms(e=>RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:ms(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:ms(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:ms(e=>RegExp(`^ {0,${e}}(?:</?(?:${js})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,`i`)),blockquoteBeginRegex:ms(e=>RegExp(`^ {0,${e}}>`))},_s=/^(?:[ \t]*(?:\n|$))+/,vs=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ys=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xs=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ss=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Cs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ws=Z(Cs).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Ts=Z(Cs).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Es=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,Ds=/^[^\n]+/,Os=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ks=Z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,Os).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),As=Z(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Ss).getRegex(),js=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,Ms=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ns=Z(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,Ms).replace(`tag`,js).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ps=e=>Z(Es).replace(`hr`,bs).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,e).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,js).getRegex(),Fs=Ps(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Is=Ps(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Ls={blockquote:Z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,Is).getRegex(),code:vs,def:ks,fences:ys,heading:xs,hr:bs,html:Ns,lheading:ws,list:As,newline:_s,paragraph:Fs,table:ps,text:Ds},Rs=Z(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,bs).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,js).getRegex(),zs={...Ls,lheading:Ts,table:Rs,paragraph:Z(Es).replace(`hr`,bs).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,Rs).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,js).getRegex()},Bs={...Ls,html:Z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,Ms).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ps,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Z(Es).replace(`hr`,bs).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,ws).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},Vs=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Hs=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Us=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,Ws=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Gs=/[\p{P}\p{S}]/u,Ks=/[\s\p{P}\p{S}]/u,qs=/[^\s\p{P}\p{S}]/u,Js=Z(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,Ks).getRegex(),Ys=/[\p{Pi}\p{Ps}"']/u,Xs=/(?!~)[\p{P}\p{S}]/u,Zs=/(?!~)[\s\p{P}\p{S}]/u,Qs=/(?:[^\s\p{P}\p{S}]|~)/u,$s=Z(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,hs?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),ec=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,tc=Z(ec,`u`).replace(/punct/g,Gs).getRegex(),nc=Z(ec,`u`).replace(/punct/g,Xs).getRegex(),rc=Z(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,`u`).replace(/openQuote/g,Ys).replace(/punct/g,Gs).getRegex(),ic=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,ac=Z(ic,`gu`).replace(/notPunctSpace/g,qs).replace(/punctSpace/g,Ks).replace(/punct/g,Gs).getRegex(),oc=Z(ic,`gu`).replace(/notPunctSpace/g,Qs).replace(/punctSpace/g,Zs).replace(/punct/g,Xs).getRegex(),sc=Z(`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,qs).replace(/punctSpace/g,Ks).replace(/punct/g,Gs).getRegex(),cc=Z(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,qs).replace(/punctSpace/g,Ks).replace(/punct/g,Gs).getRegex(),lc=Z(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,qs).replace(/punctSpace/g,Ks).replace(/punct/g,Gs).getRegex(),uc=Z(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,Gs).getRegex(),dc=Z(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,qs).replace(/punctSpace/g,Ks).replace(/punct/g,Gs).getRegex(),fc=Z(/\\(punct)/,`gu`).replace(/punct/g,Gs).getRegex(),pc=Z(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/,`gu`).replace(/punct/g,Gs).getRegex(),mc=Z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),hc=Z(Ms).replace(`(?:-->|$)`,`-->`).getRegex(),gc=Z(`^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,hc).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_c=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,vc=Z(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace(`brackets`,_c).getRegex(),yc=Z(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace(`label`,vc).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),bc=Z(/^!?\[(label)\]\[(ref)\]/).replace(`label`,vc).replace(`ref`,Os).getRegex(),xc=Z(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Os).getRegex(),Sc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,Cc=Z(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace(`brackets`,_c).getRegex(),wc=Z(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,Z(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Cc).replace(`ref`,Sc).getRegex()).replace(`nolink`,Z(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Sc).getRegex()).getRegex(),Tc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ec=Z(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),Dc={_backpedal:ps,anyPunctuation:fc,anyPunctuationOutsideCode:pc,autolink:mc,blockSkip:$s,br:Us,code:Hs,del:ps,delLDelim:ps,delRDelim:ps,emStrongLDelim:tc,emStrongRDelimAst:ac,emStrongRDelimUnd:cc,escape:Vs,link:yc,nolink:xc,punctuation:Js,reflink:bc,reflinkSearch:wc,tag:gc,text:Ws,url:ps},Oc={...Dc,emStrongLDelim:rc,emStrongRDelimAst:sc,emStrongRDelimUnd:lc,link:Z(/^!?\[(label)\]\((.*?)\)/).replace(`label`,vc).getRegex(),reflink:Z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,vc).getRegex()},kc={...Dc,emStrongRDelimAst:oc,emStrongLDelim:nc,delLDelim:uc,delRDelim:dc,url:Z(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`emailProtocol`,Ec).replace(`protocol`,Tc).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Z(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace(`protocol`,Tc).replace(/emailProtocol/g,/(?:mailto|xmpp):/).getRegex()},Ac={...kc,br:Z(Us).replace(`{2,}`,`*`).getRegex(),text:Z(kc.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},jc={normal:Ls,gfm:zs,pedantic:Bs},Mc={normal:Dc,gfm:kc,breaks:Ac,pedantic:Oc},Nc={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Pc=e=>Nc[e];function Fc(e,t){if(t){if(gs.escapeTest.test(e))return e.replace(gs.escapeReplace,Pc)}else if(gs.escapeTestNoEncode.test(e))return e.replace(gs.escapeReplaceNoEncode,Pc);return e}function Ic(e){return gs.numericCharacterReference.test(e)?e.replace(gs.numericCharacterReferenceOrAmpersand,(e,t,n)=>{if(t===void 0&&n===void 0)return`&amp;`;let r=t===void 0?Number.parseInt(n,16):Number.parseInt(t,10);return r===0||r>1114111||r>=55296&&r<=57343?`�`:r===38?`&amp;`:String.fromCodePoint(r)}):e}function Lc(e){try{e=encodeURI(e).replace(gs.percentDecode,`%`)}catch{return null}return e}function Rc(e,t){let n=e.replace(gs.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(gs.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(gs.slashPipe,`|`);return n}function zc(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Bc(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&gs.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function Vc(e){return e.trim().toLowerCase().toUpperCase().toLowerCase()}function Hc(e,t){if(e.indexOf(t[0])===-1&&e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Uc(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Wc(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`),c=e[0].charAt(0)===`!`,l=r.state.inLink,u=r.state.linkEmitted,d=r.state.inRawBlock;r.state.inLink=!0,r.state.linkEmitted=!1;let f=r.inlineTokens(s),p=r.state.linkEmitted;if(r.state.linkEmitted=u,r.state.inLink=l,!c){if(p){r.state.inRawBlock=d;return}r.state.linkEmitted=!0}return{type:c?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:f}}function Gc(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return e.slice(Math.min(r.length,i.length))}).join(`
`)}function Kc(e,t,n,r){if(!t.includes(`<`))return!1;for(let i=0;i<t.length;i++){if(t[i]===`\\`){i++;continue}if(t[i]==="`"){let e=r.inline.code.exec(t.slice(i));if(e){i+=e[0].length-1;continue}}if(t[i]!==`<`)continue;let a=e.slice(n+i),o=r.inline.tag.exec(a)||r.inline.autolink.exec(a);if(o){if(o[0].length>t.length-i)return!0;i+=o[0].length-1}}return!1}var qc=class{options;rules;lexer;constructor(e){this.options=e||ds}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Bc(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Gc(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=zc(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceTabChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:zc(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:zc(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=zc(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o=0;for(;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`||u?.type===`heading`||u?.type===`hr`||u?.type===`html`)break;if(u?.type===`blockquote`){let t=u,a=e.join(`
`),o=t.raw+`
`+a.replace(this.rules.other.blockquoteSetextReplace2,``),s=this.blockquote(o);i[i.length-1]=s;let c=o.substring(s.raw.length).replace(/^\n/,``),l=c?c.split(`
`).length:0,d=l?e.slice(0,-l):e;d.length>0&&(n=`${n}
${d.join(`
`)}`),r=r.substring(0,r.length-t.text.length)+s.text;break}if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`)}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=e,r=()=>n.length-e.length,i=t[1].trim(),a=i.length>1,o={type:`list`,raw:``,ordered:a,start:a?+i.slice(0,-1):``,loose:!1,items:[]};i=a?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=a?i:`[*+-]`);let s=this.rules.other.listItemRegex(i),c=!1;for(;e;){let i=!1,a=``;if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;let l=r();e=e.substring(t[0].length);let u=t[2].split(`
`,1)[0],d=t[1].length,f=this.options.pedantic?Uc(u,d):u.replace(this.rules.other.leadingSpaceTab,e=>Uc(e,d)),p=e.split(`
`,1)[0],m=!f.trim(),h=0;if(this.options.pedantic?(h=2,a=f.trimStart()):m?h=d+1:(h=f.search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=f.slice(h),h+=d),m&&this.rules.other.blankLine.test(p)&&(e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),n=this.rules.other.hrRegex(h),r=this.rules.other.fencesBeginRegex(h),i=this.rules.other.headingBeginRegex(h),o=this.rules.other.htmlBeginRegex(h),s=this.rules.other.blockquoteBeginRegex(h);for(;e;){let c=e.split(`
`,1)[0],l;if(p=c,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,`  `),l=p):l=p.replace(this.rules.other.leadingSpaceTab,e=>Uc(e)),r.test(p)||i.test(p)||o.test(p)||s.test(p)||t.test(p)||n.test(p))break;if(l.search(this.rules.other.nonSpaceChar)>=h||!p.trim())a+=`
`+l.slice(h);else{if(m||f.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||r.test(f)||i.test(f)||n.test(f))break;a+=`
`+p}m=!p.trim(),e=e.substring(c.length+1),f=l.slice(h)}}let g=n.slice(l,r());o.loose||(c?o.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(c=!0)),o.items.push({type:`list_item`,raw:g,task:!!this.options.gfm&&this.rules.other.listIsTask.test(a),loose:!1,text:a,tokens:[]})}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=n.slice(0,r()).trimEnd();for(let e of o.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!o.loose){let t=e.tokens.filter(e=>e.type===`space`);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}for(let e of o.items){let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,o.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1}if(o.loose)for(let e of o.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Bc(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){if(!this.rules.other.startAngleBracket.test(t[2])&&Hc(t[2],`()`)!==-1)return;let e=Vc(t[1]).replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:zc(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Rc(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:zc(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(Rc(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:zc(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){if(this.lexer.state.linkParenPossible===!1)return;let t=this.rules.inline.link.exec(e);if(t){let n=t[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&Kc(e,t[1],n,this.rules))return;let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let e=zc(r.slice(0,-1),`\\`);if((r.length-e.length)%2==0)return}else{let e=Hc(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let i=t[2],a=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],a=e[3])}else a=t[3]?t[3].slice(1,-1):``;return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i.slice(1):i.slice(1,-1)),Wc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,`$1`),title:a&&a.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=n[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&Kc(e,n[1],r,this.rules))return;let i=t[Vc((n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `))];if(!i){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Wc(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let i=[...r[0]].length-1,a,o,s=i,c=0,l=r[0][0],u=n===l,d=l===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+i);(r=d.exec(t))!==null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(o=[...a].length,r[3]||r[4]){s+=o;continue}if(r[5]||r[6]){if(i%3&&!((i+o)%3)){c+=o;continue}if(u)break}if(s-=o,s>0)continue;o=Math.min(o,o+s+c);let t=[...r[0]][0].length,n=e.slice(0,i+r.index+t+o);if(Math.min(i,o)%2){let e=n.slice(1,-1);return{type:`em`,raw:n,text:e,tokens:this.lexer.inlineTokens(e)}}let l=n.slice(2,-2);return{type:`strong`,raw:n,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:e?t[0]:Ic(t[0]),escaped:e}}}},Jc=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ds,this.options.tokenizer=this.options.tokenizer||new qc,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,linkParenPossible:!0,top:!0};let t={other:gs,block:jc.normal,inline:Mc.normal};this.options.pedantic?(t.block=jc.pedantic,t.inline=Mc.pedantic):this.options.gfm&&(t.block=jc.gfm,t.inline=this.options.breaks?Mc.breaks:Mc.gfm),this.tokenizer.rules=t}static get rules(){return{block:jc,inline:Mc}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(gs.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(gs.tabCharGlobal,`    `).replace(gs.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if((i=this.tokenizer.fences(e))||(i=this.tokenizer.heading(e))||(i=this.tokenizer.hr(e))||(i=this.tokenizer.blockquote(e))||(i=this.tokenizer.list(e))||(i=this.tokenizer.html(e))){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if((i=this.tokenizer.table(e))||(i=this.tokenizer.lheading(e))){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let r=t.at(-1);n&&r?.type===`paragraph`?(r.raw+=(r.raw.endsWith(`
`)?``:`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=a.length!==e.length,e=e.substring(i.raw.length)}else if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes(`[`))return!1;let t=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(n[0])&&e.charAt(n.index-1)!==`!`)return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],n=e.lastIndexOf(`[`);if(e.charAt(0)!==`!`&&Object.hasOwn(this.tokens.links,Vc(e.slice(n+1,-1)))&&!(n>1&&this.linkInText(e.slice(1,n-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=this.state.linkParenPossible;this.state.linkParenPossible=n&&e.includes(`)`);try{return this.#e(e,t)}finally{this.state.linkParenPossible=n}}#e(e,t){let n=e;if(this.tokens.links&&e.includes(`[`)){let e=this.tokenizer.rules.inline.reflinkSearch,t=n=>{let r=n.lastIndexOf(`[`);if(!Object.hasOwn(this.tokens.links,Vc(n.slice(r+1,-1))))return n;if(r>1&&n.charAt(0)!==`!`){let i=n.slice(1,r-1);if(this.linkInText(i))return`[`+i.replace(e,t)+`][`+`a`.repeat(n.length-r-2)+`]`}return`[`+`a`.repeat(n.length-2)+`]`};n=n.replace(e,t)}n=n.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode,(e,t,n)=>n?`+`.repeat(e.length):t?t+e.slice(t.length,-t.length).replace(/`/g,`+`)+t:e),n=n.replace(this.tokenizer.rules.inline.blockSkip,(e,t,n)=>{let r=n?n.length:0;return e.slice(0,r)+`[`+`a`.repeat(e.length-r-2)+`]`}),n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(n=>(o=n.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if((o=this.tokenizer.escape(e))||(o=this.tokenizer.tag(e))||(o=this.tokenizer.link(e))){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let n=t.at(-1);o.type===`text`&&n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if((o=this.tokenizer.emStrong(e,n,i))||(o=this.tokenizer.codespan(e))||(o=this.tokenizer.br(e))||(o=this.tokenizer.del(e,n,i))||(o=this.tokenizer.autolink(e))||!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},Yc=class{options;parser;constructor(e){this.options=e||ds}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(gs.notSpaceStart)?.[0],i=e?e.replace(gs.endingNewline,``)+`
`:``;return r?`<pre><code class="language-`+Fc(r)+`">`+(n?i:Fc(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:Fc(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Fc(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,text:n,tokens:r,autolink:i}){let a=i?Fc(n,!0):this.parser.parseInline(r),o=Lc(e);if(o===null)return a;e=Fc(o,i);let s=`<a href="`+e+`"`;return t&&(s+=` title="`+Fc(t)+`"`),s+=`>`+a+`</a>`,s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Lc(e);if(i===null)return Fc(n);e=i;let a=`<img src="${Fc(e)}" alt="${Fc(n)}"`;return t&&(a+=` title="${Fc(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:Fc(e.text)}},Xc=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},Zc=class e{options;renderer;textRenderer;constructor(e){this.options=e||ds,this.options.renderer=this.options.renderer||new Yc,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xc}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`checkbox`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`checkbox`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},Qc=class{options;block;constructor(e){this.options=e||ds}static passThroughHooks=/* @__PURE__ */ new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=/* @__PURE__ */ new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?Jc.lex:Jc.lexInline}provideParser(e=this.block){return e?Zc.parse:Zc.parseInline}};function $c(e,t){if(Array.isArray(t))for(let n=0;n<t.length;n++)e.push(t[n]);else e.push(t)}var el=class{defaults=us();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Zc;Renderer=Yc;TextRenderer=Xc;Lexer=Jc;Tokenizer=qc;Hooks=Qc;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch($c(n,t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)$c(n,this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)$c(n,this.walkTokens(e.tokens,t));break}case`list`:{let e=r;$c(n,this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);$c(n,this.walkTokens(i,t))}):e.tokens&&$c(n,this.walkTokens(e.tokens,t))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new Yc(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new qc(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Qc;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=Qc.passThroughHooks.has(n)?e=>{if(this.defaults.async&&Qc.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&$c(n,t.call(this,e)),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jc.lex(e,t??this.defaults)}parser(e,t){return Zc.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(/* @__PURE__ */ Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(/* @__PURE__ */ Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(/* @__PURE__ */ Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?Jc.lex:Jc.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?Zc.parse:Zc.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?Jc.lex:Jc.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?Zc.parse:Zc.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+Fc(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}},tl=new el;function Q(e,t){return tl.parse(e,t)}Q.options=Q.setOptions=function(e){return tl.setOptions(e),Q.defaults=tl.defaults,fs(Q.defaults),Q},Q.getDefaults=us,Q.defaults=ds;function nl(...e){return tl.use(...e),Q.defaults=tl.defaults,fs(Q.defaults),Q}Q.use=nl,Q.walkTokens=function(e,t){return tl.walkTokens(e,t)},Q.parseInline=tl.parseInline,Q.Parser=Zc,Q.parser=Zc.parse,Q.Renderer=Yc,Q.TextRenderer=Xc,Q.Lexer=Jc,Q.lexer=Jc.lex,Q.Tokenizer=qc,Q.Hooks=Qc,Q.parse=Q,Q.options,Q.setOptions,Q.walkTokens,Q.parseInline,Zc.parse,Jc.lex;var rl=new el({gfm:!0,breaks:!0,async:!1});ls.addHook(`afterSanitizeAttributes`,e=>{e.tagName===`A`&&(e.setAttribute(`target`,`_blank`),e.setAttribute(`rel`,`noopener noreferrer`))});var il=/* @__PURE__ */ new Map;function al(e,t=!0){if(t){let t=il.get(e);if(t!==void 0)return t}let n=ls.sanitize(rl.parse(e),{USE_PROFILES:{html:!0},FORBID_TAGS:[`style`,`form`,`input`,`button`,`iframe`,`img`,`image`,`video`,`audio`,`source`,`picture`,`track`,`object`,`embed`,`link`,`meta`,`base`,`svg`,`math`],FORBID_ATTR:[`style`,`src`,`srcset`,`poster`,`background`,`ping`,`xlink:href`,`formaction`]});return t&&(il.size>300&&il.clear(),il.set(e,n)),n}var ol=/* @__PURE__ */ e((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.commands=e.inlineGrammar=e.htmlBlockGrammar=e.lineGrammar=e.editorRegExp=e.punctuationTrailing=e.punctuationLeading=void 0,e.createMergedInlineGrammar=i,e.htmlescape=a;var t={ASCIIPunctuation:/[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\]/,NotTriggerChar:/[^`_*[\]()<>!~\n]/,Scheme:/[A-Za-z][A-Za-z0-9+.-]{1,31}/,Email:/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/,HTMLOpenTag:/<HTMLTagName(?:HTMLAttribute)*\s*\/?>/,HTMLCloseTag:/<\/HTMLTagName\s*>/,HTMLTagName:/[A-Za-z][A-Za-z0-9-]*/,HTMLComment:/<!--(?:[^>-]|(?:[^>-](?:[^-]|-[^-])*[^-]))-->/,HTMLPI:/<\?(?:|.|(?:[^?]|\?[^>])*)\?>/,HTMLDeclaration:/<![A-Z]+\s[^>]*>/,HTMLCDATA:/<!\[CDATA\[.*?\]\]>/,HTMLAttribute:/\s+[A-Za-z_:][A-Za-z0-9_.:-]*(?:HTMLAttValue)?/,HTMLAttValue:/\s*=\s*(?:(?:'[^']*')|(?:"[^"]*")|(?:[^\s"'=<>`]+))/,KnownTag:/address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul/};e.punctuationLeading=/* @__PURE__ */ new RegExp(/^(?:[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])/),e.punctuationTrailing=/* @__PURE__ */ new RegExp(/(?:[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])$/),e.editorRegExp={macPlatform:/Mac|iPod|iPhone|iPad/,lineSplit:/(?:\r\n|\r|\n)/,replacementPlaceholder:/(\${1,2})([0-9])/g,inlineContentPlaceholder:/\$\$([0-9])/,inlineReplacementPlaceholder:/\$([1-9])/g,blankContent:/^\s*$/,leadingWhitespace:/^\s/,trailingWhitespace:/\s$/,leadingWhitespaceRun:/^\s+/,surroundingWhitespace:/^(?<leading>\s*).*\S(?<trailing>\s*)$/,taskListItem:/^(\[)([ xX])(\])(\s|$)([\s\S]*)$/,orderedListNumber:/\d{1,9}/,inlineTagName:/^<\s*([a-zA-Z][a-zA-Z0-9]*)/,changeEvent:/^(?:change|input)$/i,selectionEvent:/^(?:selection|selectionchange)$/i,dropEvent:/^(?:drop)$/i,autolinkPrecedingChar:/[\s*_~(]/,emphasisDelimiter:/(^\*+)|(^_+)/,strikethroughDelimiter:/^~~/,autolinkScheme:/^(?:https?|ftp):\/\//i,autolinkWww:/^www\./i,autolinkDomain:/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+/,autolinkPath:/^[^\s<]*/,autolinkProtocol:/^(?:mailto|xmpp):/i,autolinkXmpp:/^xmpp:/i,autolinkXmppResource:/^\/[a-zA-Z0-9@.\-_]+/,autolinkEmail:/^[a-zA-Z0-9.\-_+]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+/,emailTrailingChar:/[-_]$/,emailTld:/\.[a-zA-Z0-9]+$/,linkClosingBracket:/^\]/,openingAngle:/^</,closingAngle:/^>/,titleQuote:/^["']/,openingParen:/^\(/,closingParen:/^\)/,endsWithOpenAngle:/<$/,containsOpenAngle:/</,anyChar:/^./},e.lineGrammar={TMH1:{regexp:/^( {0,3}#\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH1">$1</span>$$2<span class="TMMark TMMark_TMH1">$3</span>`},TMH2:{regexp:/^( {0,3}##\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH2">$1</span>$$2<span class="TMMark TMMark_TMH2">$3</span>`},TMH3:{regexp:/^( {0,3}###\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH3">$1</span>$$2<span class="TMMark TMMark_TMH3">$3</span>`},TMH4:{regexp:/^( {0,3}####\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH4">$1</span>$$2<span class="TMMark TMMark_TMH4">$3</span>`},TMH5:{regexp:/^( {0,3}#####\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH5">$1</span>$$2<span class="TMMark TMMark_TMH5">$3</span>`},TMH6:{regexp:/^( {0,3}######\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH6">$1</span>$$2<span class="TMMark TMMark_TMH6">$3</span>`},TMBlockquote:{regexp:/^( {0,3}>[ ]?)(.*)$/,replacement:`<span class="TMMark TMMark_TMBlockquote">$1</span>$$2`},TMCodeFenceBacktickOpen:{regexp:/^( {0,3}(?<seq>````*)\s*)([^`]*?)(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceBacktick">$1</span><span class="TMInfoString">$3</span>$4`},TMCodeFenceTildeOpen:{regexp:/^( {0,3}(?<seq>~~~~*)\s*)(.*?)(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceTilde">$1</span><span class="TMInfoString">$3</span>$4`},TMCodeFenceBacktickClose:{regexp:/^( {0,3}(?<seq>````*))(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceBacktick">$1</span>$3`},TMCodeFenceTildeClose:{regexp:/^( {0,3}(?<seq>~~~~*))(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceTilde">$1</span>$3`},TMBlankLine:{regexp:/^([ \t]*)$/,replacement:`$0`},TMSetextH1Marker:{regexp:/^ {0,3}=+\s*$/,replacement:`<span class="TMMark TMMark_TMSetextH1Marker">$0</span>`},TMSetextH2Marker:{regexp:/^ {0,3}-+\s*$/,replacement:`<span class="TMMark TMMark_TMSetextH1Marker">$0</span>`},TMHR:{regexp:/^( {0,3}(\*[ \t]*\*[ \t]*\*[ \t*]*)|(-[ \t]*-[ \t]*-[ \t-]*)|(_[ \t]*_[ \t]*_[ \t_]*))$/,replacement:`<span class="TMMark TMMark_TMHR">$0</span>`},TMUL:{regexp:/^( {0,3}[+*-] {1,4})(.*)$/,replacement:`<span class="TMMark TMMark_TMUL">$1</span>$$2`},TMOL:{regexp:/^( {0,3}\d{1,9}[.)] {1,4})(.*)$/,replacement:`<span class="TMMark TMMark_TMOL">$1</span>$$2`},TMIndentedCode:{regexp:/^( {4}|\t)(.*)$/,replacement:`<span class="TMMark TMMark_TMIndentedCode">$1</span>$2`},TMLinkReferenceDefinition:{regexp:/^( {0,3}\[\s*)([^\s\]](?:[^\]]|\\\])*?)(\s*\]:\s*)((?:[^\s<>]+)|(?:<(?:[^<>\\]|\\.)*>))?(\s*)((?:\((?:[^()\\]|\\.)*\))|(?:"(?:[^"\\]|\\.)*")|(?:'(?:[^'\\]|\\.)*'))?(\s*)$/,replacement:`<span class="TMMark TMMark_TMLinkReferenceDefinition">$1</span><span class="TMLinkLabel TMLinkLabel_Definition">$2</span><span class="TMMark TMMark_TMLinkReferenceDefinition">$3</span><span class="TMLinkDestination">$4</span>$5<span class="TMLinkTitle">$6</span>$7`,labelPlaceholder:2}},e.htmlBlockGrammar=[{start:/^ {0,3}<(?:script|pre|style)(?:\s|>|$)/i,end:/(?:<\/script>|<\/pre>|<\/style>)/i,paraInterrupt:!0},{start:/^ {0,3}<!--/,end:/-->/,paraInterrupt:!0},{start:/^ {0,3}<\?/,end:/\?>/,paraInterrupt:!0},{start:/^ {0,3}<![A-Z]/,end:/>/,paraInterrupt:!0},{start:/^ {0,3}<!\[CDATA\[/,end:/\]\]>/,paraInterrupt:!0},{start:/^ {0,3}(?:<|<\/)(?:KnownTag)(?:\s|>|\/>|$)/i,end:!1,paraInterrupt:!0},{start:/^ {0,3}(?:HTMLOpenTag|HTMLCloseTag)\s*$/,end:!1,paraInterrupt:!1}],e.inlineGrammar={escape:{regexp:/^\\(ASCIIPunctuation)/,replacement:`<span class="TMMark TMMark_TMEscape">\\</span>$1`},code:{regexp:/^(`+)((?:[^`])|(?:[^`].*?[^`]))(\1)/,replacement:`<span class="TMMark TMMark_TMCode">$1</span><code class="TMCode">$2</code><span class="TMMark TMMark_TMCode">$3</span>`},autolink:{regexp:/^<((?:Scheme:[^\s<>]*)|(?:Email))>/,replacement:`<span class="TMMark TMMark_TMAutolink">&lt;</span><span class="TMAutolink">$1</span><span class="TMMark TMMark_TMAutolink">&gt;</span>`},html:{regexp:/^((?:HTMLOpenTag)|(?:HTMLCloseTag)|(?:HTMLComment)|(?:HTMLPI)|(?:HTMLDeclaration)|(?:HTMLCDATA))/,replacement:`<span class="TMHTML">$1</span>`},linkOpen:{regexp:/^\[/,replacement:``},imageOpen:{regexp:/^!\[/,replacement:``},linkLabel:{regexp:/^(\[\s*)([^\]]*?)(\s*\])/,replacement:``,labelPlaceholder:2},default:{regexp:/^(.|(?:NotTriggerChar+))/,replacement:`$1`}};var n=new RegExp(Object.keys(t).join(`|`)),r=[...Object.keys(e.inlineGrammar)];for(let i of r){let r=e.inlineGrammar[i].regexp.source;for(;r.match(n);)r=r.replace(n,e=>t[e].source);e.inlineGrammar[i].regexp=new RegExp(r,e.inlineGrammar[i].regexp.flags)}for(let r of e.htmlBlockGrammar){let e=r.start.source;for(;e.match(n);)e=e.replace(n,e=>t[e].source);r.start=new RegExp(e,r.start.flags)}function i(n={}){let r={...e.inlineGrammar};for(let[e,i]of Object.entries(n)){let n={...i},a=i.regexp.source,o=new RegExp(Object.keys(t).join(`|`));for(;a.match(o);)a=a.replace(o,e=>t[e].source);n.regexp=new RegExp(a,i.regexp.flags),r[e]=n}return r}function a(e){return(e||``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}e.commands={bold:{type:`inline`,className:`TMStrong`,set:{pre:`**`,post:`**`},unset:{prePattern:/(?:\*\*|__)$/,postPattern:/^(?:\*\*|__)/}},italic:{type:`inline`,className:`TMEm`,set:{pre:`*`,post:`*`},unset:{prePattern:/(?:\*|_)$/,postPattern:/^(?:\*|_)/}},code:{type:`inline`,className:`TMCode`,set:{pre:"`",post:"`"},unset:{prePattern:/`+$/,postPattern:/^`+/}},strikethrough:{type:`inline`,className:`TMStrikethrough`,set:{pre:`~~`,post:`~~`},unset:{prePattern:/~~$/,postPattern:/^~~/}},h1:{type:`line`,className:`TMH1`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`# $2`},unset:{pattern:/^( {0,3}#\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h2:{type:`line`,className:`TMH2`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`## $2`},unset:{pattern:/^( {0,3}##\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h3:{type:`line`,className:`TMH3`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`### $2`},unset:{pattern:/^( {0,3}###\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h4:{type:`line`,className:`TMH4`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`#### $2`},unset:{pattern:/^( {0,3}####\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h5:{type:`line`,className:`TMH5`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`##### $2`},unset:{pattern:/^( {0,3}#####\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h6:{type:`line`,className:`TMH6`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`###### $2`},unset:{pattern:/^( {0,3}######\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},ul:{type:`line`,className:`TMUL`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`- $2`},unset:{pattern:/^( {0,3}[+*-] {1,4})(.*)$/,replacement:`$2`}},ol:{type:`line`,className:`TMOL`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`$#. $2`},unset:{pattern:/^( {0,3}\d{1,9}[.)] {1,4})(.*)$/,replacement:`$2`}},blockquote:{type:`line`,className:`TMBlockquote`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`> $2`},unset:{pattern:/^( {0,3}>[ ]?)(.*)$/,replacement:`$2`}}}})),sl=(/* @__PURE__ */ e((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Editor=void 0;var t=ol();e.Editor=class{constructor(e={}){this.e=null,this.textarea=null,this.lines=[],this.lineElements=[],this.lineTypes=[],this.lineCaptures=[],this.lineReplacements=[],this.linkLabels=[],this.lineDirty=[],this.lastCommandState=null,this.customInlineGrammar={},this.mergedInlineGrammar=t.inlineGrammar,this.hasFocus=!0,this.lastSelection=null,this.cleanupFns=[],this.ownsElement=!1,this.elementOriginalStyle=null,this.textareaOriginalDisplay=null,this.destroyed=!1,this.listeners={change:[],selection:[],drop:[]},this.undoStack=[],this.redoStack=[],this.isRestoringHistory=!1,this.maxHistory=100,this.e=null,this.textarea=null,this.lines=[],this.lineElements=[],this.lineTypes=[],this.lineCaptures=[],this.lineReplacements=[],this.linkLabels=[],this.lineDirty=[],this.lastCommandState=null,this.hasFocus=!0,this.lastSelection=null,this.customInlineGrammar=e.customInlineGrammar||{},this.mergedInlineGrammar=(0,t.createMergedInlineGrammar)(this.customInlineGrammar),this.listeners={change:[],selection:[],drop:[]};let n=null;typeof e.element==`string`?n=document.getElementById(e.element):e.element&&(n=e.element),typeof e.textarea==`string`?this.textarea=document.getElementById(e.textarea):e.textarea&&(this.textarea=e.textarea),this.textarea&&(n||=this.textarea),n||=document.getElementsByTagName(`body`)[0],n&&n.tagName===`TEXTAREA`&&(this.textarea=n,n=this.textarea.parentNode),this.textarea&&(this.textareaOriginalDisplay=this.textarea.style.display,this.textarea.style.display=`none`),this.placeholder=e.placeholder===void 0?this.textarea?.placeholder||void 0:e.placeholder,this.undoStack=[],this.redoStack=[],this.isRestoringHistory=!1,this.maxHistory=100,this.createEditorElement(n,e),this.setContent(typeof e.content==`string`?e.content:this.textarea?this.textarea.value:`# Hello TinyMDE!
Edit **here**`),this.addListener(this.e,`keydown`,e=>this.handleUndoRedoKey(e))}get canUndo(){return this.undoStack.length>=2}get canRedo(){return this.redoStack.length>0}pushHistory(){this.isRestoringHistory||(this.pushCurrentState(),this.redoStack=[])}pushCurrentState(){this.undoStack.push({content:this.getContent(),selection:this.getSelection(),anchor:this.getSelection(!0)}),this.undoStack.length>this.maxHistory&&this.undoStack.shift()}undo(){if(this.undoStack.length<2)return;this.isRestoringHistory=!0,this.pushCurrentState();let e=this.undoStack.pop();this.redoStack.push(e);let t=this.undoStack[this.undoStack.length-1];this.setContent(t.content),t.selection&&this.setSelection(t.selection,t.anchor),this.undoStack.pop(),this.isRestoringHistory=!1}redo(){if(!this.redoStack.length)return;this.isRestoringHistory=!0,this.pushCurrentState();let e=this.redoStack.pop();this.setContent(e.content),e.selection&&this.setSelection(e.selection,e.anchor),this.isRestoringHistory=!1}handleUndoRedoKey(e){(t.editorRegExp.macPlatform.test(navigator.platform)?e.metaKey:e.ctrlKey)&&!e.altKey&&(e.key===`z`||e.key===`Z`?(e.shiftKey?this.redo():this.undo(),e.preventDefault()):(e.key===`y`||e.key===`Y`)&&(this.redo(),e.preventDefault()))}createEditorElement(e,t){t&&t.editor!==void 0?this.e=typeof t.editor==`string`?document.getElementById(t.editor):t.editor:(this.e=document.createElement(`div`),this.ownsElement=!0),this.ownsElement||(this.elementOriginalStyle=this.e.getAttribute(`style`)),this.e.classList.add(`TinyMDE`),this.e.contentEditable=`true`,this.e.style.whiteSpace=`pre-wrap`,this.e.style.webkitUserModify=`read-write-plaintext-only`,this.placeholder&&this.e.setAttribute(`data-placeholder`,this.placeholder),t.editor===void 0&&(this.textarea&&this.textarea.parentNode===e&&this.textarea.nextSibling?e.insertBefore(this.e,this.textarea.nextSibling):e.appendChild(this.e)),this.addListener(this.e,`input`,e=>this.handleInputEvent(e)),this.addListener(this.e,`beforeinput`,e=>this.handleBeforeInputEvent(e)),this.addListener(this.e,`compositionend`,e=>this.handleInputEvent(e)),this.addListener(document,`selectionchange`,e=>{this.hasFocus&&this.handleSelectionChangeEvent(e)}),this.addListener(this.e,`blur`,()=>this.hasFocus=!1),this.addListener(this.e,`focus`,()=>this.hasFocus=!0),this.addListener(this.e,`paste`,e=>this.handlePaste(e)),this.addListener(this.e,`drop`,e=>this.handleDrop(e)),this.addListener(this.e,`click`,e=>this.handleClick(e)),this.lineElements=this.e.childNodes}setContent(e){for(;this.e.firstChild;)this.e.removeChild(this.e.firstChild);this.lines=e.split(t.editorRegExp.lineSplit),this.lineDirty=[];for(let e=0;e<this.lines.length;e++){let e=document.createElement(`div`);this.e.appendChild(e),this.lineDirty.push(!0)}this.lineTypes=Array(this.lines.length),this.updateFormatting(),this.updatePlaceholder(),this.fireChange(),this.isRestoringHistory||this.pushHistory()}getContent(){return this.lines.join(`
`)}updatePlaceholder(){this.placeholder&&this.e&&(this.getContent()===``?this.e.classList.add(`TinyMDE_empty`):this.e.classList.remove(`TinyMDE_empty`))}updateFormatting(){this.updateLineTypes(),this.updateLinkLabels(),this.applyLineTypes()}updateLinkLabels(){this.linkLabels=[];for(let e=0;e<this.lines.length;e++)this.lineTypes[e]===`TMLinkReferenceDefinition`&&this.linkLabels.push(this.lineCaptures[e][t.lineGrammar.TMLinkReferenceDefinition.labelPlaceholder])}replace(e,n){return e.replace(t.editorRegExp.replacementPlaceholder,(e,r,i)=>r===`$`?(0,t.htmlescape)(n[parseInt(i)]):`<span class="TMInlineFormatted">${this.processInlineStyles(n[parseInt(i)])}</span>`)}applyLineTypes(){let e=0;for(;e<this.lines.length;)if(this.isInlineGroupLeader(e)){let t=this.lineTypes[e],n=e;for(;n+1<this.lines.length&&this.isInlineContinuation(n+1,t);)n++;this.applyInlineGroup(e,n),e=n+1}else this.applyLine(e),e++}isInlineGroupLeader(e){let t=this.lineTypes[e];return t===`TMPara`||t===`TMUL`||t===`TMOL`||t===`TMBlockquote`&&!this.isBlankBlockquoteContent(e)}isInlineContinuation(e,t){let n=this.lineTypes[e];return n===`TMPara`||n===`TMBlockquote`&&t===`TMBlockquote`&&!this.isBlankBlockquoteContent(e)}isBlankBlockquoteContent(e){let n=this.lineCaptures[e],r=n&&n[2]!==void 0?n[2]:``;return t.editorRegExp.blankContent.test(r)}applyLine(e){let t=this.lineElements[e];if(this.lineDirty[e]){let n=this.replace(this.lineReplacements[e],this.lineCaptures[e]);t.className=this.lineTypes[e],t.removeAttribute(`style`),t.innerHTML=n===``?`<br />`:n,delete t.dataset.mlSig}t.dataset.lineNum=e.toString()}applyInlineGroup(e,t){let n=[],r=`${t-e}`;for(let i=e;i<=t;i++){let e=this.inlineContentIndex(this.lineReplacements[i]);n.push(this.lineCaptures[i][e]===void 0?``:this.lineCaptures[i][e]),r+=`\x1f${this.lineTypes[i]}\x1f${this.lineReplacements[i]}\x1f${JSON.stringify(this.lineCaptures[i])}`}let i=`${this.hashString(r)}`,a=!1;for(let n=e;n<=t;n++)if(this.lineDirty[n]||this.lineElements[n].dataset.mlSig!==i){a=!0;break}if(a){let r=this.splitInlineHTMLByLine(this.processInlineStyles(n.join(`
`)));for(let n=e;n<=t;n++){let t=this.lineElements[n],a=r[n-e]||``,o=this.replaceWithInline(this.lineReplacements[n],this.lineCaptures[n],a);t.className=this.lineTypes[n],t.removeAttribute(`style`),t.innerHTML=o===``?`<br />`:o,t.dataset.mlSig=i}}for(let n=e;n<=t;n++)this.lineElements[n].dataset.lineNum=n.toString()}inlineContentIndex(e){let n=t.editorRegExp.inlineContentPlaceholder.exec(e);return n?parseInt(n[1]):0}replaceWithInline(e,n,r){return e.replace(t.editorRegExp.replacementPlaceholder,(e,i,a)=>i===`$`?(0,t.htmlescape)(n[parseInt(a)]):`<span class="TMInlineFormatted">${r}</span>`)}splitInlineHTMLByLine(e){let t=[],n=[],r=``,i=0;for(;i<e.length;){let a=e[i];if(a===`
`){for(let e=n.length-1;e>=0;e--)r+=`</${this.inlineTagName(n[e])}>`;t.push(r),r=n.join(``),i++}else if(a===`<`){let t=e.indexOf(`>`,i);if(t<0){r+=e.substr(i);break}let a=e.substring(i,t+1);r+=a,a[1]===`/`?n.pop():a[a.length-2]!==`/`&&n.push(a),i=t+1}else r+=a,i++}return t.push(r),t}inlineTagName(e){let n=t.editorRegExp.inlineTagName.exec(e);return n?n[1]:`span`}hashString(e){let t=5381;for(let n=0;n<e.length;n++)t=((t<<5)+t^e.charCodeAt(n))>>>0;return t}updateLineTypes(){let e=!1,n=0,r=!1;for(let i=0;i<this.lines.length;i++){let a=`TMPara`,o=[this.lines[i]],s=`$$0`;if(e===`TMCodeFenceBacktickOpen`){let r=t.lineGrammar.TMCodeFenceBacktickClose.regexp.exec(this.lines[i]);r&&r.groups.seq.length>=n?(a=`TMCodeFenceBacktickClose`,s=t.lineGrammar.TMCodeFenceBacktickClose.replacement,o=r,e=!1):(a=`TMFencedCodeBacktick`,s=`<span class="TMFencedCode">$0<br /></span>`,o=[this.lines[i]])}else if(e===`TMCodeFenceTildeOpen`){let r=t.lineGrammar.TMCodeFenceTildeClose.regexp.exec(this.lines[i]);r&&r.groups.seq.length>=n?(a=`TMCodeFenceTildeClose`,s=t.lineGrammar.TMCodeFenceTildeClose.replacement,o=r,e=!1):(a=`TMFencedCodeTilde`,s=`<span class="TMFencedCode">$0<br /></span>`,o=[this.lines[i]])}if(a===`TMPara`&&r===!1){for(let e of t.htmlBlockGrammar)if(this.lines[i].match(e.start)&&(e.paraInterrupt||i===0||this.lineTypes[i-1]!==`TMPara`&&this.lineTypes[i-1]!==`TMUL`&&this.lineTypes[i-1]!==`TMOL`&&this.lineTypes[i-1]!==`TMBlockquote`)){r=e;break}}if(r!==!1&&(a=`TMHTMLBlock`,s=`<span class="TMHTMLContent">$0<br /></span>`,o=[this.lines[i]],r.end?this.lines[i].match(r.end)&&(r=!1):(i===this.lines.length-1||this.lines[i+1].match(t.lineGrammar.TMBlankLine.regexp))&&(r=!1)),a===`TMPara`){for(let e in t.lineGrammar)if(t.lineGrammar[e].regexp){let n=t.lineGrammar[e].regexp.exec(this.lines[i]);if(n){a=e,s=t.lineGrammar[e].replacement,o=n;break}}}if((a===`TMCodeFenceBacktickOpen`||a===`TMCodeFenceTildeOpen`)&&(e=a,n=o.groups.seq.length),(a===`TMIndentedCode`||a===`TMLinkReferenceDefinition`)&&i>0&&(this.lineTypes[i-1]===`TMPara`||this.lineTypes[i-1]===`TMUL`||this.lineTypes[i-1]===`TMOL`||this.lineTypes[i-1]===`TMBlockquote`)&&(a=`TMPara`,o=[this.lines[i]],s=`$$0`),a===`TMSetextH2Marker`){let e=t.lineGrammar.TMUL.regexp.exec(this.lines[i]);e&&(a=`TMUL`,s=t.lineGrammar.TMUL.replacement,o=e)}if(a===`TMSetextH1Marker`||a===`TMSetextH2Marker`){if(i===0||this.lineTypes[i-1]!==`TMPara`){let e=t.lineGrammar.TMHR.regexp.exec(this.lines[i]);e?(a=`TMHR`,o=e,s=t.lineGrammar.TMHR.replacement):(a=`TMPara`,o=[this.lines[i]],s=`$$0`)}else{let e=i-1,t=a===`TMSetextH1Marker`?`TMSetextH1`:`TMSetextH2`;do this.lineTypes[e]!==t&&(this.lineTypes[e]=t,this.lineDirty[e]=!0),this.lineReplacements[e]=`$$0`,this.lineCaptures[e]=[this.lines[e]],e--;while(e>=0&&this.lineTypes[e]===`TMPara`)}}if(a===`TMUL`||a===`TMOL`){let e=o[2]===void 0?``:o[2],n=t.editorRegExp.taskListItem.exec(e);if(n){let e=n[2]!==` `,t=a===`TMUL`?`TMMark_TMUL`:`TMMark_TMOL`,r=e?`TMCheckbox TMCheckbox_checked`:`TMCheckbox TMCheckbox_unchecked`;o=[o[0],o[1],n[1],n[2],n[3],n[4],n[5]],s=`<span class="TMMark ${t}">$1</span><span class="TMMark TMMark_TMTask">$2</span><span class="${r}">$3</span><span class="TMMark TMMark_TMTask">$4</span><span class="TMMark TMMark_TMTask">$5</span>$$6`}}this.lineTypes[i]!==a&&(this.lineTypes[i]=a,this.lineDirty[i]=!0),this.lineReplacements[i]=s,this.lineCaptures[i]=o}}getSelection(e=!1){let t=window.getSelection(),n=e?t.anchorNode:t.focusNode;if(!n)return null;let r=e?t.anchorOffset:t.focusOffset;if(n===this.e)return r<this.lines.length?{row:r,col:0}:{row:r-1,col:this.lines[r-1].length};let i=this.computeColumn(n,r);if(i===null)return null;let a=n;for(;a.parentElement!==this.e;)a=a.parentElement;let o=0;if(a.previousSibling){let e=a.dataset?.lineNum,t=a.previousSibling.dataset?.lineNum;if(e&&t){let n=parseInt(e);if(n===parseInt(t)+1)o=n;else for(;a.previousSibling;)o++,a=a.previousSibling}}return{row:o,col:i}}setSelection(e,t=null){if(!e)return;let{node:n,offset:r}=this.computeNodeAndOffset(e.row,e.col,t?t.row===e.row&&t.col>e.col:!1),i=null,a=null;if(t&&(t.row!==e.row||t.col!==e.col)){let{node:n,offset:r}=this.computeNodeAndOffset(t.row,t.col,e.row===t.row&&e.col>t.col);i=n,a=r}window.getSelection().setBaseAndExtent(n,r,i||n,i?a:r)}restoreLastSelection(){return this.lastSelection&&this.lastSelection.focus?(this.setSelection(this.lastSelection.focus,this.lastSelection.anchor),!0):!1}paste(e,n=null,r=null){n||=this.getSelection(!0),r||=this.getSelection(!1);let i,a;r||={row:this.lines.length-1,col:this.lines[this.lines.length-1].length},n||=r,n.row<r.row||n.row===r.row&&n.col<=r.col?(i=n,a=r):(i=r,a=n);let o=e.split(t.editorRegExp.lineSplit),s=this.lines[i.row].substr(0,i.col),c=this.lines[a.row].substr(a.col);o[0]=s.concat(o[0]);let l=o[o.length-1].length;o[o.length-1]=o[o.length-1].concat(c),this.spliceLines(i.row,1+a.row-i.row,o),r.row=i.row+o.length-1,r.col=l,this.updateFormatting(),this.setSelection(r),this.fireChange()}wrapSelection(e,t,n=null,r=null){if(n||=this.getSelection(!1),r||=this.getSelection(!0),!n||!r||n.row!==r.row)return;this.isRestoringHistory||this.pushHistory(),this.lineDirty[n.row]=!0;let i=n.col<r.col?n.col:r.col,a=n.col<r.col?r.col:n.col,o=this.lines[n.row].substr(0,i).concat(e),s=a===i?``:this.lines[n.row].substr(i,a-i),c=t.concat(this.lines[n.row].substr(a));this.lines[n.row]=o.concat(s,c),r.col=o.length,n.col=r.col+s.length,this.updateFormatting(),this.setSelection(n,r),this.fireChange()}addEventListener(e,n){e.match(t.editorRegExp.changeEvent)&&this.listeners.change.push(n),e.match(t.editorRegExp.selectionEvent)&&this.listeners.selection.push(n),e.match(t.editorRegExp.dropEvent)&&this.listeners.drop.push(n)}removeEventListener(e,n){e.match(t.editorRegExp.changeEvent)&&(this.listeners.change=this.listeners.change.filter(e=>e!==n)),e.match(t.editorRegExp.selectionEvent)&&(this.listeners.selection=this.listeners.selection.filter(e=>e!==n)),e.match(t.editorRegExp.dropEvent)&&(this.listeners.drop=this.listeners.drop.filter(e=>e!==n))}addListener(e,t,n){e.addEventListener(t,n),this.cleanupFns.push(()=>e.removeEventListener(t,n))}destroy(){if(!this.destroyed){this.destroyed=!0;for(let e of this.cleanupFns)e();if(this.cleanupFns=[],this.e){if(this.ownsElement)this.e.parentNode&&this.e.parentNode.removeChild(this.e);else{for(this.e.classList.remove(`TinyMDE`,`TinyMDE_empty`),this.e.removeAttribute(`contenteditable`),this.e.removeAttribute(`data-placeholder`);this.e.firstChild;)this.e.removeChild(this.e.firstChild);this.elementOriginalStyle?this.e.setAttribute(`style`,this.elementOriginalStyle):this.e.removeAttribute(`style`)}}this.textarea&&(this.textarea.style.display=this.textareaOriginalDisplay??``),this.listeners={change:[],selection:[],drop:[]},this.e=null,this.textarea=null}}fireChange(){if(this.updatePlaceholder(),!this.textarea&&!this.listeners.change.length)return;let e=this.getContent();this.textarea&&(this.textarea.value=e);for(let t of this.listeners.change)t({content:e,linesDirty:[...this.lineDirty]})}handleBeforeInputEvent(e){let n=e;if(n.inputType===`deleteContentBackward`||n.inputType===`deleteContentForward`){let t=this.getSelection(),r=this.getSelection(!0);if(!t||!r)return;let i=n.inputType===`deleteContentBackward`;if(t.row===r.row&&t.col===r.col){if(i&&t.col===0&&t.row>0){e.preventDefault(),this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();let n=this.lines[t.row-1].length;this.lines[t.row-1]=this.lines[t.row-1]+this.lines[t.row],this.lineDirty[t.row-1]=!0,this.spliceLines(t.row,1),this.updateFormatting(),this.setSelection({row:t.row-1,col:n}),this.fireChange();return}if(!i&&t.col===this.lines[t.row].length&&t.row<this.lines.length-1){e.preventDefault(),this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();let n=this.lines[t.row].length;this.lines[t.row]=this.lines[t.row]+this.lines[t.row+1],this.lineDirty[t.row]=!0,this.spliceLines(t.row+1,1),this.updateFormatting(),this.setSelection({row:t.row,col:n}),this.fireChange();return}}return}if(n.inputType!==`insertParagraph`&&n.inputType!==`insertLineBreak`)return;this.isRestoringHistory||this.pushHistory(),e.preventDefault(),this.clearDirtyFlag();let r=this.getSelection(),i=this.getSelection(!0);if(r&&i){if(r.row!==i.row){let e=r.row<i.row?r:i,t=r.row<i.row?i:r;this.lines[e.row]=this.lines[e.row].substring(0,e.col),this.lines[t.row]=this.lines[t.row].substring(t.col),this.spliceLines(e.row+1,t.row-e.row-1),r.row=e.row+1,r.col=0}else{let e=!1;switch(this.lineTypes[r.row]){case`TMUL`:e=`TMUL`;break;case`TMOL`:e=`TMOL`;break;case`TMIndentedCode`:e=`TMIndentedCode`}let n=this.lines[r.row].substring(0,r.col<=i.col?r.col:i.col),a=this.lines[r.row].substring(r.col<=i.col?i.col:r.col);if(this.spliceLines(r.row,1,[n,a]),r.row+=1,r.col=0,e){let n=t.lineGrammar[e].regexp.exec(this.lines[r.row-1]);n&&(n[2]?(e===`TMOL`&&(n[1]=n[1].replace(t.editorRegExp.orderedListNumber,e=>(parseInt(e)+1).toString())),this.lines[r.row]=`${n[1]}${this.lines[r.row]}`,this.lineDirty[r.row]=!0,r.col=n[1].length):(this.lines[r.row-1]=``,this.lineDirty[r.row-1]=!0))}}this.updateFormatting(),this.setSelection(r),r&&r.row<this.lineElements.length&&this.lineElements[r.row].scrollIntoView({block:`nearest`,inline:`nearest`}),this.fireChange()}}handleInputEvent(e){let t=e;if(t.inputType===`insertCompositionText`)return;this.isRestoringHistory||this.pushHistory();let n=this.getSelection();(t.inputType!==`insertParagraph`&&t.inputType!==`insertLineBreak`||!n)&&(this.e.firstChild?this.fixNodeHierarchy():this.e.innerHTML=`<div class="TMBlankLine"><br></div>`,this.updateLineContentsAndFormatting(),n&&this.setSelection(n),this.fireChange())}handleSelectionChangeEvent(e){this.fireSelection()}handlePaste(e){this.isRestoringHistory||this.pushHistory(),e.preventDefault();let t=e.clipboardData.getData(`text/plain`);this.paste(t)}handleDrop(e){e.preventDefault(),this.fireDrop(e.dataTransfer)}handleClick(e){let t=e.target,n=t&&t.closest?t.closest(`.TMCheckbox`):null;if(!n)return;let r=n;for(;r&&r.parentNode!==this.e;)r=r.parentNode;if(!r||r.dataset.lineNum===void 0)return;let i=parseInt(r.dataset.lineNum,10);if(isNaN(i)||i<0||i>=this.lines.length)return;let a=this.computeColumn(n,0);if(a===null)return;let o=this.lines[i].charAt(a);if(o!==` `&&o!==`x`&&o!==`X`)return;e.preventDefault(),this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();let s=o===` `?`x`:` `;this.lines[i]=this.lines[i].substr(0,a)+s+this.lines[i].substr(a+1),this.lineDirty[i]=!0,this.updateFormatting(),this.fireChange()}processInlineStyles(e){let n=``,r=[],i=0,a=e;outer:for(;a;){if(a.charCodeAt(0)===10){n+=`
`,a=a.substr(1),i+=1;continue outer}for(let e of[`escape`,`code`,`autolink`,`html`])if(this.mergedInlineGrammar[e]){let r=this.mergedInlineGrammar[e].regexp.exec(a);if(r){a=a.substr(r[0].length),i+=r[0].length,n+=this.mergedInlineGrammar[e].replacement.replace(t.editorRegExp.inlineReplacementPlaceholder,(e,n)=>(0,t.htmlescape)(r[n]));continue outer}}for(let e in this.customInlineGrammar)if(e!==`escape`&&e!==`code`&&e!==`autolink`&&e!==`html`&&e!==`linkOpen`&&e!==`imageOpen`&&e!==`linkLabel`&&e!=="default"){let r=this.mergedInlineGrammar[e].regexp.exec(a);if(r){a=a.substr(r[0].length),i+=r[0].length,n+=this.mergedInlineGrammar[e].replacement.replace(t.editorRegExp.inlineReplacementPlaceholder,(e,n)=>(0,t.htmlescape)(r[n]));continue outer}}let o=i>0?e[i-1]:``;if(o===``||t.editorRegExp.autolinkPrecedingChar.test(o)){let e=this.parseAutolinkExtension(a);if(e){n=`${n}${e.output}`,a=a.substr(e.charCount),i+=e.charCount;continue outer}}let s=a.match(this.mergedInlineGrammar.linkOpen.regexp),c=a.match(this.mergedInlineGrammar.imageOpen.regexp);if(c||s){let e=this.parseLinkOrImage(a,!!c);if(e){n=`${n}${e.output}`,a=a.substr(e.charCount),i+=e.charCount;continue outer}}let l=t.editorRegExp.emphasisDelimiter.exec(a);if(l){let o=l[0].length,s=l[0],c=l[0][0];a=a.substr(l[0].length);let u=i>0?e.substr(0,i):` `,d=i+l[0].length<e.length?a:` `,f=d.match(t.punctuationLeading),p=u.match(t.punctuationTrailing),m=d.match(t.editorRegExp.leadingWhitespace),h=u.match(t.editorRegExp.trailingWhitespace),g=!m&&(!f||!!h||!!p),_=!h&&(!p||!!m||!!f);if(c===`_`&&g&&_&&(g=!!p,_=!!f),_){let e=r.length-1;for(;o&&e>=0;)if(r[e].delimiter===c){for(;e<r.length-1;){let e=r.pop();n=`${e.output}${e.delimString.substr(0,e.count)}${n}`}o>=2&&r[e].count>=2?(n=`<span class="TMMark">${c}${c}</span><strong class="TMStrong">${n}</strong><span class="TMMark">${c}${c}</span>`,o-=2,r[e].count-=2):(n=`<span class="TMMark">${c}</span><em class="TMEm">${n}</em><span class="TMMark">${c}</span>`,--o,--r[e].count),r[e].count===0&&(n=`${r.pop().output}${n}`,e--)}else e--}o&&g&&(r.push({delimiter:c,delimString:s,count:o,output:n}),n=``,o=0),o&&(n=`${n}${s.substr(0,o)}`),i+=l[0].length;continue outer}if(l=t.editorRegExp.strikethroughDelimiter.exec(a),l){let e=!1,t=r.length-1;for(;!e&&t>=0;)if(r[t].delimiter===`~`){for(;t<r.length-1;){let e=r.pop();n=`${e.output}${e.delimString.substr(0,e.count)}${n}`}n=`<span class="TMMark">~~</span><del class="TMStrikethrough">${n}</del><span class="TMMark">~~</span>`,n=`${r.pop().output}${n}`,e=!0}else t--;e||(r.push({delimiter:`~`,delimString:`~~`,count:2,output:n}),n=``),i+=l[0].length,a=a.substr(l[0].length);continue outer}if(l=this.mergedInlineGrammar.default.regexp.exec(a),l){a=a.substr(l[0].length),i+=l[0].length,n+=this.mergedInlineGrammar.default.replacement.replace(t.editorRegExp.inlineReplacementPlaceholder,(e,n)=>(0,t.htmlescape)(l[n]));continue outer}throw`Infinite loop!`}for(;r.length;){let e=r.pop();n=`${e.output}${e.delimString.substr(0,e.count)}${n}`}return n}computeColumn(e,t){let n=e,r;for(;n&&n.parentNode!==this.e;)n=n.parentNode;if(n===null)return null;for(e.nodeType===Node.TEXT_NODE||t===0?(r=t,n=e):t>0?(n=e.childNodes[t-1],r=n.textContent.length):(r=0,n=e);n.parentNode!==this.e;)n.previousSibling?(n=n.previousSibling,r+=n.textContent.length):n=n.parentNode;return r}computeNodeAndOffset(e,t,n=!1){e>=this.lineElements.length&&(e=this.lineElements.length-1,t=this.lines[e].length),t>this.lines[e].length&&(t=this.lines[e].length);let r=this.lineElements[e],i=r.firstChild,a=!1,o={node:r.firstChild?r.firstChild:r,offset:0};for(;i!==r;){if(!a&&i.nodeType===Node.TEXT_NODE){if(i.nodeValue.length>=t){if(n&&i.nodeValue.length===t)o={node:i,offset:t},t=0;else return{node:i,offset:t}}else t-=i.nodeValue.length}!a&&i.firstChild?i=i.firstChild:i.nextSibling?(a=!1,i=i.nextSibling):(a=!0,i=i.parentNode)}return o}updateLineContentsAndFormatting(){this.clearDirtyFlag(),this.updateLineContents(),this.updateFormatting()}clearDirtyFlag(){this.lineDirty=Array(this.lines.length);for(let e=0;e<this.lineDirty.length;e++)this.lineDirty[e]=!1}updateLineContents(){let e=this.e.childElementCount-this.lines.length;if(e){let t=0;for(;t<=this.lines.length&&t<=this.lineElements.length&&this.lineElements[t]&&this.lines[t]===this.lineElements[t].textContent&&this.lineTypes[t]===this.lineElements[t].className;)t++;let n=-1;for(;-n<this.lines.length&&-n<this.lineElements.length&&this.lines[this.lines.length+n]===this.lineElements[this.lineElements.length+n].textContent&&this.lineTypes[this.lines.length+n]===this.lineElements[this.lineElements.length+n].className;)n--;let r=this.lines.length+n+1-t;r<-e&&(r=-e),r<0&&(r=0);let i=[];for(let n=0;n<r+e;n++)i.push(this.lineElements[t+n].textContent||``);this.spliceLines(t,r,i,!1)}else for(let e=0;e<this.lineElements.length;e++){let t=this.lineElements[e],n=t.textContent||``;(this.lines[e]!==n||this.lineTypes[e]!==t.className)&&(this.lines[e]=n,this.lineTypes[e]=t.className,this.lineDirty[e]=!0)}}spliceLines(e,t=0,n=[],r=!0){if(r)for(let n=0;n<t;n++)this.e.removeChild(this.e.childNodes[e]);let i=[],a=[];for(let t=0;t<n.length;t++)i.push(``),a.push(!0),r&&(this.e.childNodes[e]?this.e.insertBefore(document.createElement(`div`),this.e.childNodes[e]):this.e.appendChild(document.createElement(`div`)));this.lines.splice(e,t,...n),this.lineTypes.splice(e,t,...i),this.lineDirty.splice(e,t,...a)}fixNodeHierarchy(){let e=Array.from(this.e.childNodes),t=(e,...t)=>{let n=e.parentElement,r=e.nextSibling;n.removeChild(e),t.forEach(e=>r?n.insertBefore(e,r):n.appendChild(e))};e.forEach(e=>{if(e.nodeType!==Node.ELEMENT_NODE||e.tagName!==`DIV`){let n=document.createElement(`div`);t(e,n),n.appendChild(e)}else if(e.childNodes.length===0)e.appendChild(document.createElement(`br`));else{let n=Array.from(e.childNodes);if(n.some(e=>e.nodeType===Node.ELEMENT_NODE&&e.tagName===`DIV`))return t(e,...n)}})}parseAutolinkExtension(e){let n=this.matchExtendedAutolink(e);return n?{output:`<span class="TMAutolink">${(0,t.htmlescape)(n)}</span>`,charCount:n.length}:!1}matchExtendedAutolink(e){let n=t.editorRegExp.autolinkScheme.exec(e),r=t.editorRegExp.autolinkWww.test(e);if(n||r){let r=n?n[0].length:0,i=e.substr(r),a=t.editorRegExp.autolinkDomain.exec(i);if(a&&this.isValidAutolinkDomain(a[0])){let n=t.editorRegExp.autolinkPath.exec(i.substr(a[0].length)),o=e.substr(0,r+a[0].length+(n?n[0].length:0)),s=this.trimAutolinkTrailing(o);if(s.length>=r+a[0].length)return s}}let i=t.editorRegExp.autolinkProtocol.exec(e);if(i){let n=this.matchAutolinkEmail(e.substr(i[0].length));if(n){let r=``;if(t.editorRegExp.autolinkXmpp.test(e)){let a=t.editorRegExp.autolinkXmppResource.exec(e.substr(i[0].length+n.length));a&&(r=a[0])}return i[0]+n+r}}return this.matchAutolinkEmail(e)||!1}isValidAutolinkDomain(e){let t=e.split(`.`);return t.length<2?!1:!t.slice(-2).some(e=>e.indexOf(`_`)>=0)}matchAutolinkEmail(e){let n=t.editorRegExp.autolinkEmail.exec(e);if(!n)return!1;let r=n[0];for(;r.length&&t.editorRegExp.emailTrailingChar.test(r);)r=r.substr(0,r.length-1);return t.editorRegExp.emailTld.test(r)?r:!1}trimAutolinkTrailing(e){let t=e.length,n=!0;for(;n&&t>0;){n=!1;let r=e[t-1];if(`?!.,:*_~`.indexOf(r)>=0)t--,n=!0;else if(r===`)`){let r=0,i=0;for(let n=0;n<t;n++)e[n]===`(`?r++:e[n]===`)`&&i++;i>r&&(t--,n=!0)}}return e.substr(0,t)}parseLinkOrImage(e,n){let r=n?2:1,i=e.substr(0,r),a=n?`TMImage`:`TMLink`,o=r,s=1,c=!1,l=!1,u=[],d=[];textOuter:for(;o<e.length&&c===!1;){let i=e.substr(o);for(let e of[`escape`,`code`,`autolink`,`html`]){let t=this.mergedInlineGrammar[e].regexp.exec(i);if(t){o+=t[0].length;continue textOuter}}if(i.match(this.mergedInlineGrammar.imageOpen.regexp)){s++,o+=2;continue textOuter}if(i.match(this.mergedInlineGrammar.linkOpen.regexp)){if(s++,!n&&this.parseLinkOrImage(i,!1))return!1;o+=1;continue textOuter}if(i.match(t.editorRegExp.linkClosingBracket)&&(s--,s===0)){c=e.substr(r,o-r),o++;continue textOuter}o++}if(c===!1)return!1;let f=o<e.length?e.substr(o,1):``;if(f===`[`){let t=e.substr(o),n=this.mergedInlineGrammar.linkLabel.regexp.exec(t);if(n)o+=n[0].length,u.push(n[1],n[2],n[3]),l=n[this.mergedInlineGrammar.linkLabel.labelPlaceholder]?n[this.mergedInlineGrammar.linkLabel.labelPlaceholder]:c.trim();else return!1}else if(f!==`(`)l=c.trim();else{o++;let n=1;inlineOuter:for(;o<e.length&&n>0;){let r=e.substr(o),i=t.editorRegExp.leadingWhitespaceRun.exec(r);if(i){switch(d.length){case 0:d.push(i[0]);break;case 1:d.push(i[0]);break;case 2:if(d[0].match(t.editorRegExp.containsOpenAngle))d[1]=d[1].concat(i[0]);else{if(n!==1)return!1;d.push(``),d.push(i[0])}break;case 3:d.push(i[0]);break;case 4:return!1;case 5:d.push(``);case 6:d[5]=d[5].concat(i[0]);break;case 7:d[6]=d[6].concat(i[0]);break;default:return!1}o+=i[0].length;continue inlineOuter}if(i=this.mergedInlineGrammar.escape.regexp.exec(r),i){switch(d.length){case 0:d.push(``);case 1:d.push(i[0]);break;case 2:d[1]=d[1].concat(i[0]);break;case 3:return!1;case 4:return!1;case 5:d.push(``);case 6:d[5]=d[5].concat(i[0]);break;default:return!1}o+=i[0].length;continue inlineOuter}if(d.length<2&&r.match(t.editorRegExp.openingAngle)){d.length===0&&d.push(``),d[0]=d[0].concat(`<`),o++;continue inlineOuter}if((d.length===1||d.length===2)&&r.match(t.editorRegExp.closingAngle)){d.length===1&&d.push(``),d.push(`>`),o++;continue inlineOuter}if(i=t.editorRegExp.titleQuote.exec(r),i&&(d.length===0||d.length===1||d.length===4)){for(;d.length<4;)d.push(``);d.push(i[0]),o++;continue inlineOuter}if(i&&(d.length===5||d.length===6)&&d[4]===i[0]){d.length===5&&d.push(``),d.push(i[0]),o++;continue inlineOuter}if(r.match(t.editorRegExp.openingParen)){switch(d.length){case 0:d.push(``);case 1:d.push(``);case 2:d[1]=d[1].concat(`(`),d[0].match(t.editorRegExp.endsWithOpenAngle)||n++;break;case 3:d.push(``);case 4:d.push(`(`);break;case 5:d.push(``);case 6:if(d[4]===`(`)return!1;d[5]=d[5].concat(`(`);break;default:return!1}o++;continue inlineOuter}if(r.match(t.editorRegExp.closingParen)){if(d.length<=2){for(;d.length<2;)d.push(``);d[0].match(t.editorRegExp.endsWithOpenAngle)||n--,n>0&&(d[1]=d[1].concat(`)`))}else d.length===5||d.length===6?d[4]===`(`?(d.length===5&&d.push(``),d.push(`)`)):d.length===5?d.push(`)`):d[5]=d[5].concat(`)`):n--;if(n===0)for(;d.length<7;)d.push(``);o++;continue inlineOuter}if(i=t.editorRegExp.anyChar.exec(r),i){switch(d.length){case 0:d.push(``);case 1:d.push(i[0]);break;case 2:d[1]=d[1].concat(i[0]);break;case 3:return!1;case 4:return!1;case 5:d.push(``);case 6:d[5]=d[5].concat(i[0]);break;default:return!1}o+=i[0].length;continue inlineOuter}throw`Infinite loop`}if(n>0)return!1}if(l!==!1){let e=!1;for(let t of this.linkLabels)if(t===l){e=!0;break}let t=e?`TMLinkLabel TMLinkLabel_Valid`:`TMLinkLabel TMLinkLabel_Invalid`,n=`<span class="TMMark TMMark_${a}">${i}</span><span class="${a} ${u.length<3||!u[1]?t:``}">${this.processInlineStyles(c)}</span><span class="TMMark TMMark_${a}">]</span>`;return u.length>=3&&(n=n.concat(`<span class="TMMark TMMark_${a}">${u[0]}</span>`,`<span class="${t}">${u[1]}</span>`,`<span class="TMMark TMMark_${a}">${u[2]}</span>`)),{output:n,charCount:o}}if(d.length>0){for(;d.length<7;)d.push(``);return{output:`<span class="TMMark TMMark_${a}">${i}</span><span class="${a}">${this.processInlineStyles(c)}</span><span class="TMMark TMMark_${a}">](${(0,t.htmlescape)(d[0])}</span><span class="${a}Destination">${(0,t.htmlescape)(d[1])}</span><span class="TMMark TMMark_${a}">${(0,t.htmlescape)(d[2])}${(0,t.htmlescape)(d[3])}${(0,t.htmlescape)(d[4])}</span><span class="${a}Title">${(0,t.htmlescape)(d[5])}</span><span class="TMMark TMMark_${a}">${(0,t.htmlescape)(d[6])})</span>`,charCount:o}}return!1}computeCommonAncestor(e,t){if(!e||!t)return null;if(e===t)return e;let n=e=>{let t=[];for(;e;)t.unshift(e),e=e.parentNode;return t},r=n(e),i=n(t);if(r[0]!==i[0])return null;let a=0;for(;r[a]===i[a];a++);return r[a-1]}computeEnclosingMarkupNode(e,t,n){let r=null;if(!e)return null;if(t){if(e.row!==t.row)return null;let n=window.getSelection();if(!n)return null;r=this.computeCommonAncestor(n.focusNode,n.anchorNode)}else{let e=window.getSelection();if(!e||!e.focusNode)return null;r=e.focusNode}if(!r)return null;for(;r!==this.e;){if(r.classList&&r.classList.contains(n))return r;r=r.parentNode}return null}getCommandState(e=null,n=null){let r={};if(e||=this.getSelection(!1),n||=this.getSelection(!0),!e){for(let e in t.commands)r[e]=null;return r}n||=e;let i,a;n.row<e.row||n.row===e.row&&n.col<e.col?(i=n,a=e):(i=e,a=n),a.row>i.row&&a.col===0&&(a.row--,a.col=this.lines[a.row].length);for(let o in t.commands)if(t.commands[o].type===`inline`&&(r[o]=!e||e.row!==n.row||!this.isInlineFormattingAllowed()?null:!!this.computeEnclosingMarkupNode(e,n,t.commands[o].className)||e.col===n.col&&!!this.lines[e.row].substr(0,e.col).match(t.commands[o].unset.prePattern)&&!!this.lines[e.row].substr(e.col).match(t.commands[o].unset.postPattern)),t.commands[o].type===`line`){if(!e)r[o]=null;else{let e=this.lineTypes[i.row]===t.commands[o].className;for(let n=i.row;n<=a.row;n++)if(this.lineTypes[n]===t.commands[o].className!==e){e=null;break}r[o]=e}}return r}setCommandState(e,n){if(this.isRestoringHistory||this.pushHistory(),t.commands[e].type===`inline`){let n=this.getSelection(!0),r=this.getSelection(!1);if(n||=r,!n||n.row!==r.row||!this.isInlineFormattingAllowed())return;let i=this.computeEnclosingMarkupNode(r,n,t.commands[e].className);if(this.clearDirtyFlag(),i){this.lineDirty[r.row]=!0;let a=this.computeColumn(i,0),o=i.textContent.length,s=this.lines[r.row].substr(0,a).replace(t.commands[e].unset.prePattern,``),c=this.lines[r.row].substr(a,o),l=this.lines[r.row].substr(a+o).replace(t.commands[e].unset.postPattern,``);this.lines[r.row]=s.concat(c,l),n.col=s.length,r.col=n.col+o,this.updateFormatting(),this.setSelection(r,n),this.fireChange()}else if(r.col===n.col&&this.lines[r.row].substr(0,r.col).match(t.commands[e].unset.prePattern)&&this.lines[r.row].substr(r.col).match(t.commands[e].unset.postPattern)){this.lineDirty[r.row]=!0;let i=this.lines[r.row].substr(0,r.col).replace(t.commands[e].unset.prePattern,``),a=this.lines[r.row].substr(r.col).replace(t.commands[e].unset.postPattern,``);this.lines[r.row]=i.concat(a),r.col=n.col=i.length,this.updateFormatting(),this.setSelection(r,n),this.fireChange()}else{let{startCol:i,endCol:a}=r.col<n.col?{startCol:r.col,endCol:n.col}:{startCol:n.col,endCol:r.col},o=this.lines[r.row].substr(i,a-i).match(t.editorRegExp.surroundingWhitespace);o&&(i+=o.groups.leading.length,a-=o.groups.trailing.length),r.col=i,n.col=a,this.wrapSelection(t.commands[e].set.pre,t.commands[e].set.post,r,n)}}else if(t.commands[e].type===`line`){let r=this.getSelection(!0),i=this.getSelection(!1);if(r||=i,!i)return;this.clearDirtyFlag();let a=r.row>i.row?i:r,o=r.row>i.row?r:i;o.row>a.row&&o.col===0&&o.row--;for(let r=a.row;r<=o.row;r++)n&&this.lineTypes[r]!==t.commands[e].className&&(this.lines[r]=this.lines[r].replace(t.commands[e].set.pattern,t.commands[e].set.replacement.replace(`$#`,(r-a.row+1).toString())),this.lineDirty[r]=!0),!n&&this.lineTypes[r]===t.commands[e].className&&(this.lines[r]=this.lines[r].replace(t.commands[e].unset.pattern,t.commands[e].unset.replacement),this.lineDirty[r]=!0);this.updateFormatting(),this.setSelection({row:o.row,col:this.lines[o.row].length},{row:a.row,col:0}),this.fireChange()}}listItemMarker(e){let n=t.lineGrammar.TMUL.regexp.exec(e);if(n)return n[1];let r=t.lineGrammar.TMOL.regexp.exec(e);return r?r[1]:null}isTaskListItem(e){if(e<0||e>=this.lines.length)return!1;let n=this.lineTypes[e];if(n!==`TMUL`&&n!==`TMOL`)return!1;let r=this.listItemMarker(this.lines[e]);return r!==null&&t.editorRegExp.taskListItem.test(this.lines[e].substr(r.length))}addTaskCheckbox(e){let n=this.listItemMarker(e);if(n!==null){let r=e.substr(n.length);return t.editorRegExp.taskListItem.test(r)?e:`${n}[ ] ${r}`}return e.replace(t.commands.ul.set.pattern,`- [ ] $2`)}removeTaskCheckbox(e){let n=this.listItemMarker(e);if(n===null)return e;let r=t.editorRegExp.taskListItem.exec(e.substr(n.length));return r?`${n}${r[5]}`:e}toggleTaskList(){let e=this.getSelection(!0),t=this.getSelection(!1);if(e||=t,!t)return;let n=e.row>t.row?t:e,r=e.row>t.row?e:t;r.row>n.row&&r.col===0&&r.row--;let i=!0;for(let e=n.row;e<=r.row;e++)if(!this.isTaskListItem(e)){i=!1;break}this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();for(let e=n.row;e<=r.row;e++){let t=i?this.removeTaskCheckbox(this.lines[e]):this.addTaskCheckbox(this.lines[e]);t!==this.lines[e]&&(this.lines[e]=t,this.lineDirty[e]=!0)}this.updateFormatting(),this.setSelection({row:r.row,col:this.lines[r.row].length},{row:n.row,col:0}),this.fireChange()}isInlineFormattingAllowed(){let e=window.getSelection();if(!e||!e.focusNode||!e.anchorNode)return!1;if(e.isCollapsed&&e.focusNode.nodeType===3&&e.focusOffset===e.focusNode.nodeValue.length){let t;for(t=e.focusNode;t&&t.nextSibling===null;t=t.parentNode);if(t&&t.nextSibling&&t.nextSibling.classList&&t.nextSibling.classList.contains(`TMInlineFormatted`))return!0}let t=this.computeCommonAncestor(e.focusNode,e.anchorNode);if(!t)return!1;for(;t&&t!==this.e;){if(t.classList&&(t.classList.contains(`TMInlineFormatted`)||t.classList.contains(`TMBlankLine`)))return!0;t=t.parentNode}return!1}toggleCommandState(e){this.lastCommandState||=this.getCommandState(),this.setCommandState(e,!this.lastCommandState[e])}fireDrop(e){for(let t of this.listeners.drop)t({dataTransfer:e})}fireSelection(){let e=this.getSelection(!1),t=this.getSelection(!0);if(this.lastSelection={focus:e,anchor:t},this.listeners.selection&&this.listeners.selection.length){let n=this.getCommandState(e,t);this.lastCommandState?Object.assign(this.lastCommandState,n):this.lastCommandState=Object.assign({},n);for(let n of this.listeners.selection)n({focus:e,anchor:t,commandState:this.lastCommandState})}}}})))(),cl=ol();function ll(e,t){try{return new _l(e,t)}catch(n){return console.warn(`llm-agent: Markdown editor did not start, using a plain box`,n),new ul(e,t)}}var ul=class{#e;constructor(e,t){this.source=e,this.el=e;let n=()=>t.onChange();e.addEventListener(`keydown`,t.onKey),e.addEventListener(`input`,n),e.addEventListener(`paste`,t.onPaste),e.addEventListener(`blur`,t.onBlur),this.#e=()=>{e.removeEventListener(`keydown`,t.onKey),e.removeEventListener(`input`,n),e.removeEventListener(`paste`,t.onPaste),e.removeEventListener(`blur`,t.onBlur)}}get value(){return this.el.value}set value(e){this.el.value=e}get selectionStart(){return this.el.selectionStart??this.el.value.length}setSelectionRange(e,t){this.el.setSelectionRange(e,t)}focus(){this.el.focus()}fit(){this.el.style.height=`auto`,this.el.style.height=`${this.el.scrollHeight}px`}setMentions(){}setPlaceholder(){}destroy(){this.#e()}};function dl(e){if(e instanceof ShadowRoot){let t=e.getSelection?.();if(t)return t;let n=document.getSelection(),r=n?.getComposedRanges;if(!n||!r)return null;let i;try{i=r.call(n,{shadowRoots:[e]})}catch{i=r.call(n,e)}let a=i[0];return a?n.direction===`backward`?{anchorNode:a.endContainer,anchorOffset:a.endOffset,focusNode:a.startContainer,focusOffset:a.startOffset}:{anchorNode:a.startContainer,anchorOffset:a.startOffset,focusNode:a.endContainer,focusOffset:a.endOffset}:null}return document.getSelection()}function fl(e){return!(e instanceof ShadowRoot)||typeof e.getSelection==`function`||typeof Selection.prototype.getComposedRanges==`function`}var pl=class extends sl.Editor{getSelection(e=!1){let t=this,n=dl(t.e.getRootNode()),r=e?n?.anchorNode:n?.focusNode;if(!n||!r)return null;let i=e?n.anchorOffset:n.focusOffset;if(r===t.e){if(i<t.lines.length)return{row:i,col:0};let e=t.lines.length-1;return{row:e,col:t.lines[e]?.length??0}}let a=t.computeColumn(r,i);if(a===null)return null;let o=r;for(;o.parentNode&&o.parentNode!==t.e;)o=o.parentNode;let s=Array.prototype.indexOf.call(t.e.childNodes,o);return s<0?null:{row:s,col:a}}setSelection(e,t=null){if(!e)return;let n=this,r=n.computeNodeAndOffset(e.row,e.col,t?t.row===e.row&&t.col>e.col:!1),i=r;t&&(t.row!==e.row||t.col!==e.col)&&(i=n.computeNodeAndOffset(t.row,t.col,e.row===t.row&&e.col>t.col)),(n.e.getRootNode().getSelection?.()??document.getSelection())?.setBaseAndExtent(i.node,i.offset,r.node,r.offset)}},ml=/^ {0,3}(`{3,}|~{3,})/;function hl(e,t){let n=!1;for(let r of e.slice(0,t).split(`
`).slice(0,-1))ml.test(r)&&(n=!n);return n}var gl=e=>e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),_l=class{#e;#t;#n=!1;#r=``;#i=!0;#a=``;constructor(e,t){this.source=e;let n=e.getRootNode();if(!fl(n))throw Error(`this browser cannot read a caret inside a shadow root`);let r=document.createElement(`div`);r.className=`box`,r.setAttribute(`role`,`textbox`),r.setAttribute(`aria-multiline`,`true`),r.addEventListener(`keydown`,t.onKey),r.addEventListener(`paste`,e=>{t.onPaste(e),e.defaultPrevented&&e.stopImmediatePropagation()}),r.addEventListener(`blur`,t.onBlur),r.addEventListener(`focus`,()=>this.#i=!1);let i=n instanceof ShadowRoot?n.host:null;i?.addEventListener(`keydown`,this.#s),this.#t=i,e.after(r);try{this.#e=new pl({textarea:e,editor:r})}catch(t){throw r.remove(),i?.removeEventListener(`keydown`,this.#s),e.style.display=``,t}this.el=r,this.setPlaceholder(e.placeholder),this.#e.addEventListener(`change`,()=>{this.#n||(this.#o(),t.onChange())})}#o(){let e=this.#a,t=this.value;if(this.#a=t,t.length!==e.length+1)return;let n=this.selectionStart;if(t[n-1]!==`
`||t.slice(0,n-1)+t.slice(n)!==e)return;let r=t.lastIndexOf(`
`,n-2)+1,i=ml.exec(t.slice(r,n-1));i&&!hl(t,r)&&(t.slice(n).split(`
`).some(e=>ml.test(e))||(this.value=`${t.slice(0,n)}\n${i[1]}\n${t.slice(n)}`,this.setSelectionRange(n,n)))}#s=e=>{let t=e;t.ctrlKey||t.altKey||t.metaKey||t.key!==`Escape`&&t.composedPath()[0]===this.el&&t.stopPropagation()};get value(){return this.#e.getContent()}set value(e){let t=this.el.getRootNode().activeElement===this.el;this.#n=!0,this.#a=e;try{this.#e.setContent(e)}finally{this.#n=!1}t?this.setSelectionRange(e.length,e.length):this.#i=!0}#c(e){let t=this.#e.lines,n=e.col;for(let r=0;r<e.row&&r<t.length;r++)n+=(t[r]?.length??0)+1;return n}#l(e){let t=this.#e.lines,n=e;for(let e=0;e<t.length;e++){let r=t[e]?.length??0;if(n<=r)return{row:e,col:n};n-=r+1}let r=Math.max(0,t.length-1);return{row:r,col:t[r]?.length??0}}get selectionStart(){let e=this.#e.getSelection(!1),t=this.#e.getSelection(!0);return e===null?this.value.length:Math.min(this.#c(e),t===null?1/0:this.#c(t))}setSelectionRange(e,t){this.#e.setSelection(this.#l(t),this.#l(e))}focus(){let e=!this.#i&&this.#e.getSelection()!==null;this.el.focus(),this.#i=!1,e||this.setSelectionRange(this.value.length,this.value.length)}fit(){}setMentions(e){let t=e.join(`
`);if(t===this.#r)return;this.#r=t;let n=this.#e;if(!e.length){n.customInlineGrammar={},n.mergedInlineGrammar=cl.inlineGrammar;return}let r=[...e].sort((e,t)=>t.length-e.length).map(gl),i={regexp:RegExp(`^(@(?:${r.join(`|`)}))`),replacement:`<span class="TMMention">$1</span>`};n.customInlineGrammar={mention:i},n.mergedInlineGrammar={...cl.inlineGrammar,mention:i}}setPlaceholder(e){this.el.getAttribute(`data-placeholder`)!==e&&(this.el.setAttribute(`data-placeholder`,e),this.el.setAttribute(`aria-label`,e))}destroy(){this.#t?.removeEventListener(`keydown`,this.#s),this.#e.destroy(),this.el.remove()}},vl=/device_id:[0-9a-f]{32} \(([^()\n]+)\)|area_id:([a-z0-9_]+)|\b([a-z_]+\.[a-z0-9_]+)\b/g;function yl(e,t,n,r){if(t!==void 0)return t;if(n!==void 0)return e?.areas?.[n]?.name??n;let i=r===void 0?void 0:e?.states?.[r];if(i)return i.attributes.friendly_name||i.entity_id}var bl=class{constructor(){this.byLabel=/* @__PURE__ */ new Map}add(e,t){let n=e;for(let r=2;this.byLabel.has(n)&&this.byLabel.get(n)!==t;r++)n=`${e} ${r}`;return this.byLabel.set(n,t),n}labels(){return[...this.byLabel.keys()]}show(e,t){return e.replace(vl,(e,n,r,i)=>{let a=yl(t,n,r,i);return a===void 0?e:`@${this.add(a,e)}`})}expand(e){let t=[...this.byLabel.keys()].sort((e,t)=>t.length-e.length);for(let n of t)e=e.split(`@${n}`).join(this.byLabel.get(n));return e}},xl=/* @__PURE__ */ new Map;function Sl(e,t){let n=xl.get(e);if(n!==void 0)return n;let r=document.createElement(`template`);r.innerHTML=e;let i=document.createTreeWalker(r.content,NodeFilter.SHOW_TEXT),a=[];for(let e=i.nextNode();e;e=i.nextNode())a.push(e);for(let e of a){if(e.parentElement?.closest(`code, pre, a`))continue;let n=e.data,r=document.createDocumentFragment(),i=0;for(let e of n.matchAll(vl)){let a=yl(t,e[1],e[2],e[3]);if(a===void 0)continue;r.append(n.slice(i,e.index));let o=document.createElement(`span`);o.className=`chip`,o.title=e[0],o.textContent=a,r.append(o),i=e.index+e[0].length}i!==0&&(r.append(n.slice(i)),e.replaceWith(r))}let o=r.innerHTML;return xl.size>300&&xl.clear(),xl.set(e,o),o}var Cl=/* @__PURE__ */ H(`<div class=tabs>`),wl=/* @__PURE__ */ H(`<p class=note>`),Tl=/* @__PURE__ */ H(`<div class=grid inert>`),El=/* @__PURE__ */ H(`<button>`),Dl=/* @__PURE__ */ new Set([`alarm-panel`,`button`,`calendar`,`entities`,`entity`,`gauge`,`glance`,`heading`,`history-graph`,`humidifier`,`light`,`logbook`,`sensor`,`statistic`,`statistics-graph`,`thermostat`,`tile`,`todo-list`]),Ol=/* @__PURE__ */ new Set([`horizontal-stack`,`vertical-stack`,`grid`]),kl=/* @__PURE__ */ new Set([`section`,`divider`]),Al=/\\|\/\/|url\s*\(|\{\{|\{%|\[\[\[|<|custom:|javascript:|data:/i,jl=/* @__PURE__ */ new Set([`card_mod`,`style`,`image`,`image_entity`,`camera_image`]);function Ml(e,t=0){return t>20?!1:typeof e==`string`?!Al.test(e):Array.isArray(e)?e.every(e=>Ml(e,t+1)):e&&typeof e==`object`?Object.entries(e).every(([e,n])=>!jl.has(e)&&!Al.test(e)&&Ml(n,t+1)):!0}function Nl(e){let t=[...e.cards??[]];for(let n of e.sections??[])t.push(...n.cards??[]);return t.filter(e=>e&&typeof e==`object`)}async function Pl(){if(!window.loadCardHelpers)try{let e=document.createElement(`partial-panel-resolver`);e.hass={panels:[{url_path:`llm-preview`,component_name:`lovelace`}]},e._updateRoutes?.(),await e.routerOptions?.routes?.[`llm-preview`]?.load?.()}catch{}for(let e=0;e<50&&!window.loadCardHelpers;e++)await new Promise(e=>setTimeout(e,100));return window.loadCardHelpers?.()}function Fl(e,t=0){if(!e||typeof e!=`object`||t>5)return!1;let n=e.type;if(typeof n!=`string`)return!1;if(Ol.has(n)){let{cards:n,...r}=e;return Array.isArray(n)&&n.every(e=>Fl(e,t+1))&&Ml(r)}if(!Dl.has(n))return!1;let r=e.entities;return Array.isArray(r)&&!r.every(e=>typeof e==`string`||e&&typeof e==`object`&&(!(`type`in e)||kl.has(String(e.type))))?!1:Ml(e)}var Il=xa(`
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
  `);function Ll(e){let[t,n]=I(0),[r,i]=I({cards:[],skipped:0,error:``}),a=()=>{let t=e.config();return Array.isArray(t?.views)?t.views:[]},o=0;async function s(t){let n={cards:[],skipped:0,error:``};if(!t)return n;try{let r=await Pl();if(!r)throw Error(`card helpers aren't available`);for(let i of Nl(t).slice(0,40)){if(!Fl(i)){n.skipped++;continue}let t=r.createCardElement(i);t.hass=e.hass(),n.cards.push(t)}}catch(e){n.error=q(`preview_unavailable`,{error:e.message})}return n}return yi(()=>a()[t()],e=>{let t=++o;s(e).then(e=>t===o&&i(e))}),yi(()=>[e.hass(),r().cards],([e,t])=>{for(let n of t)n.hass=e}),V(()=>V(()=>!!a().length)()?[L(z,{get when(){return a().length>1},get children(){var e=Cl();return W(e,L(R,{get each(){return a()},children:(e,r)=>(()=>{var i=El();return i._$$click=()=>n(r()),W(i,()=>e.title||e.path||q(`preview_view`,{n:r()+1})),B(()=>ta(r()===t()?`on`:``),(e,t)=>{$i(i,e,t)}),i})()})),e}}),L(z,{get when(){return r().error},get children(){var e=wl();return W(e,()=>r().error),e}}),(()=>{var e=Tl();return W(e,()=>r().cards),e})(),L(z,{get when(){return r().skipped},get children(){var e=wl();return W(e,(()=>{var e=V(()=>r().skipped>1);return()=>e()?q(`preview_skipped_n`,{count:r().skipped}):q(`preview_skipped_one`)})()),e}})]:(()=>{var e=wl();return W(e,()=>q(`preview_no_views`)),e})())}Sa(`llm-dashboard-preview`,{props:[`hass`,`config`],styles:()=>[Il],view:e=>L(Ll,e)}),Ri([`click`]);var Rl=new CSSStyleSheet;Rl.replaceSync(`
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
  /* The toolbar holds the attach button, both pickers and Send. On a 390 px phone the
     pickers shrink (and cut their text) rather than push Send off the edge or wrap it
     onto a line of its own. */
  .toolbar > .attach,
  .toolbar > button.send {
    flex-shrink: 0;
  }
  .toolbar > .model-pill {
    flex: 0 1 auto;
    overflow: hidden;
  }
  .model-pill select {
    min-width: 0;
    text-overflow: ellipsis;
  }
  .model-pill input.model {
    flex: 1 1 auto;
    min-width: 72px;
  }
  .mode-pill select {
    max-width: 130px;
  }
  @media (max-width: 600px) {
    .model-pill select {
      max-width: 88px;
    }
    .model-pill input.model {
      width: 120px;
    }
  }
  .plan-run {
    margin: 6px 0 0;
  }
  .plan-run button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    --mdc-icon-size: 16px;
  }
  ul.models {
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
    max-height: min(360px, 50vh);
    overflow-y: auto;
    overscroll-behavior: contain;
    z-index: 5;
    font-size: 13px;
  }
  ul.models li {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 10px;
    min-height: 24px;
    border-radius: 8px;
    cursor: pointer;
    --mdc-icon-size: 14px;
  }
  ul.models li.active {
    background: var(--accent-soft);
  }
  ul.models li.current .label {
    font-weight: 600;
  }
  ul.models li.models-head,
  ul.models li.models-more {
    cursor: default;
    color: var(--muted);
    font-size: 11.5px;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  ul.models .star {
    color: var(--accent);
    flex-shrink: 0;
  }
  ul.models .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ul.models .mid {
    margin-left: 8px;
    color: var(--muted);
    font-family: var(--mono);
    font-size: 11.5px;
  }
  ul.models .price {
    flex-shrink: 0;
    color: var(--muted);
    font-family: var(--mono);
    font-size: 11.5px;
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
`);var zl=/* @__PURE__ */ H(`<span class=tag>`),Bl=/* @__PURE__ */ H(`<div class=row><span class=t></span><span class=c></span><span class=u></span><div class=w><b class=what></b><code></code></div><div class=o><!><span></span><!><!><!>`),Vl=/* @__PURE__ */ H(`<button class=link>`),Hl=/* @__PURE__ */ H(`<button class="ghost small">`),Ul=/* @__PURE__ */ H(`<div class=bar><input type=date><input type=date><select><option value></option></select><select><option value></option></select><input type=search>`),Wl=/* @__PURE__ */ H(`<option>`),Gl=/* @__PURE__ */ H(`<div class=empty>`),Kl=/* @__PURE__ */ H(`<div class=more><button class=small>`),ql={asked:`changes_asked`,auto:`changes_auto`,rule:`changes_rule`,reviewer:`reviewer_approved`,denied:`denied`},Jl=e=>e.message??String(e),Yl=xa(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
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
.more{padding:12px 20px}`);function Xl(e,t){let n=Ca(e.hass,e=>e.connection),r=t=>Ca(e.hass,e=>t(e)),i=r(e=>e.locale?.language),a=r(e=>e.locale?.time_format),o=r(e=>e.locale?.time_zone===`server`?e.config?.time_zone:void 0),[s,c]=I({changes:[],cursor:null,chats:[],users:[],error:``,loading:!1}),l={from:``,to:``,chat:``,user:``,text:``},u=0,d;async function f(e=!1){let t=n();if(!t)return;let r=s(),i=++u;c(e=>({...e,loading:!0}));let a;try{let n=await t.sendMessagePromise({type:`llm_agent/changes`,since:l.from?Zl(l.from,0,o()):null,until:l.to?Zl(l.to,1,o())-.001:null,conversation_id:l.chat||null,user_id:l.user||null,text:l.text,cursor:e?r.cursor:null});a={...n,changes:e?[...r.changes,...n.changes]:n.changes,error:``}}catch(e){a={error:Jl(e)}}i===u&&c(e=>({...e,...a,loading:!1}))}let p=!1;yi(()=>n()!==void 0,e=>{e&&!p&&(p=!0,f())});let m=e=>t=>{l={...l,[e]:t.target.value},clearTimeout(d),d=window.setTimeout(()=>void f(),e===`text`?300:0)};async function h(e){if(confirm(q(`confirm_undo`,{name:e.detail||e.tool}))){try{await n().sendMessagePromise({type:`llm_agent/undo`,snapshot_id:e.snapshot_id,...e.conversation_id?{conversation_id:e.conversation_id}:{}})}catch(e){c(t=>({...t,error:Jl(e)}));return}await f()}}let g=e=>{let t=a();return new Intl.DateTimeFormat(i(),{dateStyle:`medium`,timeStyle:`short`,timeZone:o(),...t===`12`||t===`24`?{hour12:t===`12`}:{}}).format(e*1e3)},_=e=>(()=>{var t=zl();return W(t,()=>e.text),B(()=>({e:!!e.bad,t:e.title??``}),({e,t:n},r)=>{e!==r?.e&&t.classList.toggle(`bad`,e),n!==r?.t&&U(t,`title`,n)}),t})(),v=e=>{let n=e.r,r=`tool_${n.tool}`;var i=Bl(),a=i.firstChild,o=a.nextSibling,s=o.nextSibling,c=s.nextSibling,l=c.firstChild,u=l.nextSibling,d=c.nextSibling,f=d.firstChild,p=f.nextSibling,m=p.nextSibling,v=m.nextSibling,y=v.nextSibling;return W(a,()=>g(n.time)),W(o,(()=>{var e=V(()=>!!n.conversation_id);return()=>e()?(()=>{var e=Vl();return e._$$click=()=>t.dispatchEvent(new CustomEvent(`open-chat`,{detail:n.conversation_id})),W(e,()=>n.chat_title??q(`changes_deleted_chat`)),e})():void 0})()),W(s,()=>n.user_name??(n.user_id?n.user_id.slice(0,8):q(`changes_no_user`))),W(l,(()=>{var e=V(()=>!!ja(r));return()=>e()?q(r):n.tool.replace(/_/g,` `)})()),W(u,()=>n.args),W(d,L(z,{get when(){return n.approval},children:e=>L(_,{get text(){return q(ql[e()])},get bad(){return e()===`denied`}})}),f),W(d,(()=>{var e=V(()=>n.approval!==`denied`);return()=>e()?L(_,{get text(){return V(()=>!!n.ok)()?q(`done`):q(`failed`)},get bad(){return!n.ok}}):void 0})(),p),W(p,()=>n.detail),W(d,(()=>{var e=V(()=>n.undo===`undone`);return()=>e()?L(_,{get text(){return q(`undone`)}}):void 0})(),m),W(d,(()=>{var e=V(()=>n.undo===`gone`);return()=>e()?L(_,{get text(){return q(`changes_undo_gone`)},get title(){return q(`changes_undo_gone_title`)}}):void 0})(),v),W(d,(()=>{var e=V(()=>n.undo===`available`);return()=>e()?(()=>{var e=Hl();return e._$$click=()=>void h(n),W(e,()=>q(`undo`)),B(()=>q(`undo_title`),t=>{U(e,`title`,t)}),e})():void 0})(),y),B(()=>n.args,e=>{U(u,`title`,e)}),i};return[(()=>{var e=Ul(),t=e.firstChild,n=t.nextSibling,r=n.nextSibling,i=r.firstChild,a=r.nextSibling,o=a.firstChild,c=a.nextSibling;return ea(t,`change`,m(`from`)),ea(n,`change`,m(`to`)),ea(r,`change`,m(`chat`)),W(i,()=>q(`changes_all_chats`)),W(r,L(R,{get each(){return s().chats},keyed:e=>e.id,children:e=>(()=>{var t=Wl();return W(t,()=>e().title||q(`new_chat`)),B(()=>e().id,e=>{t.value=e}),t})()}),null),ea(a,`change`,m(`user`)),W(o,()=>q(`changes_everyone`)),W(a,L(R,{get each(){return s().users},keyed:e=>e.id,children:e=>(()=>{var t=Wl();return W(t,()=>e().name),B(()=>e().id,e=>{t.value=e}),t})()}),null),ea(c,`input`,m(`text`),!0),B(()=>({e:q(`changes_from`),t:q(`changes_from`),a:q(`changes_to`),o:q(`changes_to`),i:q(`conversation`),n:q(`changes_user`),s:q(`changes_search`),h:q(`changes_search`)}),({e,t:i,a:o,o:s,i:l,n:u,s:d,h:f},p)=>{e!==p?.e&&U(t,`aria-label`,e),i!==p?.t&&U(t,`title`,i),o!==p?.a&&U(n,`aria-label`,o),s!==p?.o&&U(n,`title`,s),l!==p?.i&&U(r,`aria-label`,l),u!==p?.n&&U(a,`aria-label`,u),d!==p?.s&&U(c,`placeholder`,d),f!==p?.h&&U(c,`aria-label`,f)}),e})(),V(()=>V(()=>!!s().error)()?(()=>{var e=Gl();return W(e,()=>q(`changes_error`,{error:s().error})),e})():L(z,{get when(){return V(()=>!s().loading)()&&!s().changes.length},get children(){var e=Gl();return W(e,()=>q(`changes_none`)),e}})),L(R,{get each(){return s().changes},children:e=>L(v,{r:e})}),V(()=>V(()=>!!s().cursor)()?(()=>{var e=Kl(),t=e.firstChild;return t._$$click=()=>void f(!0),W(t,()=>q(`changes_more`)),B(()=>s().loading,e=>{U(t,`disabled`,e)}),e})():void 0)]}function Zl(e,t,n){let[r,i,a]=e.split(`-`).map(Number);if(!n)return new Date(r,i-1,a+t).getTime()/1e3;let o=Date.UTC(r,i-1,a+t);return(o-Ql(o-Ql(o,n),n))/1e3}function Ql(e,t){let n={};for(let r of new Intl.DateTimeFormat(`en-US`,{timeZone:t,hourCycle:`h23`,year:`numeric`,month:`numeric`,day:`numeric`,hour:`numeric`,minute:`numeric`,second:`numeric`}).formatToParts(e))n[r.type]=+r.value;return Date.UTC(n.year,n.month-1,n.day,n.hour,n.minute,n.second)-Math.floor(e/1e3)*1e3}Sa(`llm-agent-changes`,{props:[`hass`],styles:()=>[Rl,Yl],view:(e,t)=>Xl(e,t)}),Ri([`click`,`input`]);var $l=/* @__PURE__ */ H(`<button class=small role=tab>`),eu=/* @__PURE__ */ H(`<div class="row ed"><button class="small primary"></button><button class="small ghost">`),tu=/* @__PURE__ */ H(`<input maxlength=80>`),nu=/* @__PURE__ */ H(`<input maxlength=200>`),ru=/* @__PURE__ */ H(`<textarea rows=14 maxlength=20000>`),iu=/* @__PURE__ */ H(`<textarea rows=2>`),au=/* @__PURE__ */ H(`<div class=row><input type=checkbox><div> <!>`),ou=/* @__PURE__ */ H(`<b>`),su=/* @__PURE__ */ H(`<span class=tag>`),cu=/* @__PURE__ */ H(`<span class=err>`),lu=/* @__PURE__ */ H(`<button class="small danger">`),uu=/* @__PURE__ */ H(`<button class="small ghost">`),du=/* @__PURE__ */ H(`<div class=bar role=tablist><!><span></span><button class="small primary">`),fu=/* @__PURE__ */ H(`<p>`),pu=/* @__PURE__ */ H(`<p class=err>`),mu=/* @__PURE__ */ H(`<div class=empty>`),hu=xa(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none}
.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}
.bar span{flex:1;text-align:end}
.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}
.off>div{opacity:.55}
.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}
.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}
.ed button{flex:none}
.err{color:var(--danger)}`);function gu(e){let t=Ca(e.hass,e=>e.connection),[n,r]=I(),[i,a]=I(!1),[o,s]=I(),[c,l]=I(``),[u,d]=I(``),f=()=>{s(void 0),l(``)};async function p(e,n={}){let i=t(),a=(e,t={})=>i.sendMessagePromise({type:`llm_agent/home_notes`+e,...t});try{r(await a(e,n)),f(),d(``)}catch(e){let t=e;d(t.message??String(e)),t.code===`changed`&&(r(await a(``)),f())}}let m=!1;yi(()=>t()!==void 0,e=>{e&&!m&&(m=!0,p(``))});let h=(e,t,n={})=>p(e,{kind:i()?`knowledge`:`note`,...t.id?{item_id:t.id,base:t.updated}:{},...n}),g=()=>(i()?n()?.knowledge:n()?.notes)??[],_=e=>(()=>{var t=$l();return t._$$click=()=>{a(e.on),f(),d(``)},W(t,()=>q(e.label)),B(()=>e.on===i()?`true`:`false`,e=>{U(t,`aria-selected`,e)}),t})(),v=e=>{let t=t=>n=>Object.assign(e.e,{[t]:n.target.value}),r=()=>h(`/save`,e.e,i()?{title:e.e.title,summary:e.e.summary,body:e.e.body}:{text:e.e.text});var a=eu(),o=a.firstChild,c=o.nextSibling;return W(a,(()=>{var r=V(()=>!!i());return()=>r()?[(()=>{var n=tu();return ea(n,`input`,t(`title`),!0),B(()=>({e:q(`knowledge_title`),t:q(`knowledge_title`),a:e.e.title??``,o:Ci()}),({e,t,a:r,o:i},a)=>{e!==a?.e&&U(n,`aria-label`,e),t!==a?.t&&U(n,`placeholder`,t),(r!==a?.a||!i)&&(n.value=r??``)}),n})(),(()=>{var n=nu();return ea(n,`input`,t(`summary`),!0),B(()=>({e:q(`knowledge_summary`),t:q(`knowledge_summary`),a:e.e.summary??``,o:Ci()}),({e,t,a:r,o:i},a)=>{e!==a?.e&&U(n,`aria-label`,e),t!==a?.t&&U(n,`placeholder`,t),(r!==a?.a||!i)&&(n.value=r??``)}),n})(),(()=>{var n=ru();return ea(n,`input`,t(`body`),!0),B(()=>({e:q(`knowledge_body`),t:q(`knowledge_body`),a:e.e.body??``,o:Ci()}),({e,t,a:r,o:i},a)=>{e!==a?.e&&U(n,`aria-label`,e),t!==a?.t&&U(n,`placeholder`,t),(r!==a?.a||!i)&&(n.value=r??``)}),n})()]:(()=>{var r=iu();return ea(r,`input`,t(`text`),!0),B(()=>({e:q(`home_notes`),t:q(`notes_placeholder`),a:n()?.note_max??300,o:e.e.text??``,i:Ci()}),({e,t,a:n,o:i,i:a},o)=>{e!==o?.e&&U(r,`aria-label`,e),t!==o?.t&&U(r,`placeholder`,t),n!==o?.a&&U(r,`maxlength`,n),(i!==o?.o||!a)&&(r.value=i??``)}),r})()})(),o),o._$$click=r,W(o,()=>q(`save`)),c._$$click=()=>s(void 0),W(c,()=>q(`cancel`)),a},y=e=>(()=>{var t=au(),n=t.firstChild,r=n.nextSibling,a=r.firstChild,o=a.nextSibling;return n.addEventListener(`change`,()=>h(`/save`,e.i,{enabled:!e.i.enabled})),W(r,(()=>{var t=V(()=>!!i());return()=>t()?[(()=>{var t=ou();return W(t,()=>e.i.title),t})(),` `,V(()=>e.i.summary)]:e.i.text})(),a),W(r,(()=>{var t=V(()=>e.i.added_by===`agent`);return()=>t()?(()=>{var e=su();return W(e,()=>q(`note_from_ai`)),e})():void 0})(),o),W(t,(()=>{var t=V(()=>c()===e.i.id);return()=>t()?[(()=>{var e=cu();return W(e,()=>q(`delete_confirm`)),e})(),(()=>{var t=lu();return t._$$click=()=>h(`/delete`,e.i),W(t,()=>q(`delete`)),t})(),(()=>{var e=uu();return e._$$click=()=>l(``),W(e,()=>q(`cancel`)),e})()]:[(()=>{var t=uu();return t._$$click=()=>{s({...e.i}),l(``),d(``)},W(t,()=>q(`edit`)),t})(),(()=>{var t=uu();return t._$$click=()=>l(e.i.id),W(t,()=>q(`delete`)),t})()]})(),null),B(()=>({e:!e.i.enabled,t:q(`note_enabled`),a:q(`note_enabled`),o:!!e.i.enabled,i:Ci()}),({e,t:r,a:i,o:a,i:o},s)=>{e!==s?.e&&t.classList.toggle(`off`,e),r!==s?.t&&U(n,`aria-label`,r),i!==s?.a&&U(n,`title`,i),(a!==s?.o||!o)&&(n.checked=a)}),t})();return[(()=>{var e=du(),t=e.firstChild,r=t.nextSibling,a=r.nextSibling;return W(e,L(_,{on:!1,label:`notes_tab`}),t),W(e,L(_,{on:!0,label:`knowledge_tab`}),r),W(r,(()=>{var e=V(()=>!(!i()&&n()));return()=>e()?``:q(`characters_left`,{count:n().room})})()),a._$$click=()=>s({id:``,text:``,title:``,summary:``,body:``}),W(a,()=>q(`add`)),e})(),(()=>{var e=fu();return W(e,()=>q(i()?`knowledge_hint`:`notes_hint`)),e})(),V(()=>V(()=>!!u())()?(()=>{var e=pu();return W(e,u),e})():void 0),V(()=>V(()=>o()?.id===``)()?L(v,{get e(){return o()}}):void 0),V(()=>V(()=>!(!n()||g().length||o()))()?(()=>{var e=mu();return W(e,()=>q(`notes_none`)),e})():void 0),L(R,{get each(){return g()},keyed:e=>e.id,children:e=>V(()=>V(()=>o()?.id===e().id)()?L(v,{get e(){return o()}}):L(y,{get i(){return e()}}))})]}Sa(`llm-agent-notes`,{props:[`hass`],styles:()=>[Rl,hu],view:e=>L(gu,e)}),Ri([`click`,`input`]);var _u=/* @__PURE__ */ H(`<button class=small role=tab>`),vu=/* @__PURE__ */ H(`<div><b>`),yu=/* @__PURE__ */ H(`<div class=ch>: <svg preserveAspectRatio=none role=img></svg><div class=ax><span></span><span>`),bu=/* @__PURE__ */ H(`<svg><g><title>: <!></title><rect class=h y=0 width=10 height=100></rect><rect class=b width=7></svg>`,2),xu=/* @__PURE__ */ H(`<div class=tb><table><thead><tr><th></th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody>`),Su=/* @__PURE__ */ H(`<tr class=earlier><td><small></small></td><td></td><td></td><td></td><td></td><td>`),Cu=/* @__PURE__ */ H(`<tr><td><small><!><!></small></td><td></td><td></td><td></td><td></td><td><!><!>`),wu=/* @__PURE__ */ H(`<small>`),Tu=/* @__PURE__ */ H(`<div class=tot><!><!><!><!>`),Eu=/* @__PURE__ */ H(`<p> <!> <!>`),Du=/* @__PURE__ */ H(`<p>`),Ou=/* @__PURE__ */ H(`<p class=bal><!><!>`),ku=/* @__PURE__ */ H(`<a target=_blank rel=noreferrer>`),Au=/* @__PURE__ */ H(`<div class=bar role=tablist><!><!><!>`),ju=/* @__PURE__ */ H(`<p class=tl><span></span> <button class=small><ha-icon icon=mdi:download></ha-icon> </button> `,1),Mu=/* @__PURE__ */ H(`<p class=err>`),Nu=/* @__PURE__ */ H(`<span>`),Pu=e=>e.message??String(e),Fu=xa(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
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
.err{color:var(--danger)}`);function Iu(e){let t=Ca(e.hass,e=>e.connection),n=Ca(e.hass,e=>e.locale?.language),[r,i]=I(),[a,o]=I(),[s,c]=I(30),[l,u]=I(``),[d,f]=I(``),p=0;async function m(){let e=t();if(e)try{let t=await e.sendMessagePromise({type:`llm_agent/turn_log`});if(!t.count){f(q(t.enabled?`turn_log_empty`:`turn_log_off`));return}let n=URL.createObjectURL(new Blob([t.jsonl],{type:`application/x-ndjson`})),r=document.createElement(`a`);r.href=n,r.download=`llm-agent-turns-${(/* @__PURE__ */ new Date()).toISOString().slice(0,10)}.jsonl`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3),f(q(`turn_log_saved`,{count:t.count}))}catch(e){f(q(`usage_error`,{error:Pu(e)}))}}async function h(e){let n=t();if(!n)return;let r=++p;c(e);try{let t=await n.sendMessagePromise({type:`llm_agent/usage`,days:e});r===p&&(i(t),u(``))}catch(e){r===p&&u(Pu(e))}}let g=!1;yi(()=>t(),e=>{e&&!g&&(g=!0,h(30),e.sendMessagePromise({type:`llm_agent/balance`}).then(e=>o(e.providers),()=>void 0))});let _=e=>new Intl.NumberFormat(n(),{style:`currency`,currency:`USD`,minimumFractionDigits:2,maximumFractionDigits:e&&Math.abs(e)<1?4:2}).format(e),v=e=>new Intl.NumberFormat(n(),{notation:`compact`}).format(e),y=e=>{let[t,r,i]=e.split(`-`).map(Number);return new Intl.DateTimeFormat(n(),{dateStyle:`medium`,timeZone:`UTC`}).format(Date.UTC(t,r-1,i))},b=e=>(()=>{var t=_u();return t._$$click=()=>h(e.n),W(t,()=>q(`usage_days`,{n:e.n})),B(()=>s()===e.n?`true`:`false`,e=>{U(t,`aria-selected`,e)}),t})(),x=e=>(()=>{var t=vu(),n=t.firstChild;return W(t,()=>e.label,n),W(n,()=>_(e.v)),B(()=>e.hint??``,e=>{U(t,`title`,e)}),t})(),S=e=>{let t=()=>Math.max(...e.series.map(e=>e.cost),0),n=()=>e.series.length;var r=yu(),i=r.firstChild,a=i.nextSibling,o=a.nextSibling.firstChild,s=o.nextSibling;return W(r,()=>q(`usage_chart`),i),W(r,()=>_(t()),a),W(a,L(R,{get each(){return e.series},children:(e,n)=>{let r=()=>t()>0&&e.cost>0?Math.max(e.cost/t()*100,1.5):0;var i=bu(),a=i.firstChild,o=a.firstChild,s=o.nextSibling,c=a.nextSibling,l=c.nextSibling;return W(a,()=>y(e.day),o),W(a,()=>_(e.cost),s),B(()=>({e:n()*10,t:n()*10+1.5,a:100-r(),o:r()}),({e,t,a:n,o:r},i)=>{e!==i?.e&&U(c,`x`,e),t!==i?.t&&U(l,`x`,t),n!==i?.a&&U(l,`y`,n),r!==i?.o&&U(l,`height`,r)}),i}})),W(o,()=>y(e.series[0].day)),W(s,()=>y(e.series[n()-1].day)),B(()=>({e:q(`usage_chart`),t:`0 0 ${n()*10} 100`,a:q(`usage_chart`)}),({e,t,a:n},i)=>{e!==i?.e&&U(r,`aria-label`,e),t!==i?.t&&U(a,`viewBox`,t),n!==i?.a&&U(a,`aria-label`,n)}),r},C=e=>{let t=e=>e.kind===`task`?q(`usage_kind_task`):e.kind===`review`?q(`usage_kind_review`):``;var n=xu(),r=n.firstChild.firstChild,i=r.firstChild.firstChild,a=i.nextSibling,o=a.nextSibling,s=o.nextSibling,c=s.nextSibling,l=c.nextSibling,u=r.nextSibling;return W(i,()=>q(`usage_model`)),W(a,()=>q(`usage_in`)),W(o,()=>q(`usage_out`)),W(s,()=>q(`usage_col_cached`)),W(c,()=>q(`usage_calls`)),W(l,()=>q(`usage_cost`)),W(u,L(R,{get each(){return e.rows},children:e=>e.kind===`earlier`?(()=>{var t=Su(),n=t.firstChild,r=n.firstChild,i=n.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;return W(n,()=>q(`usage_earlier`),r),W(r,()=>q(`usage_earlier_hint`)),W(i,()=>_(e.cost)),t})():(()=>{var n=Cu(),r=n.firstChild,i=r.firstChild,a=i.firstChild,o=a.nextSibling,s=r.nextSibling,c=s.nextSibling,l=c.nextSibling,u=l.nextSibling,d=u.nextSibling,f=d.firstChild,p=f.nextSibling;return W(r,()=>e.model,i),W(i,()=>e.provider_name??e.provider_type,a),W(i,(()=>{var n=V(()=>!!t(e));return()=>n()?`, ${t(e)}`:``})(),o),W(s,()=>v(e.input)),W(c,()=>v(e.output)),W(l,()=>v(e.cache_read+e.cache_write)),W(u,()=>e.calls),W(d,(()=>{var t=V(()=>e.unpriced===e.calls);return()=>t()?q(`usage_no_price`):_(e.cost)})(),f),W(d,(()=>{var t=V(()=>!!(e.unpriced&&e.unpriced<e.calls));return()=>t()?(()=>{var t=wu();return W(t,()=>q(`usage_unpriced`,{n:e.unpriced})),t})():void 0})(),p),B(()=>({e:ta(e.kind),t:`${e.cache_read} / ${e.cache_write}`}),({e,t},r)=>{$i(n,e,r?.e),t!==r?.t&&U(l,`title`,t)}),n})()})),n},ee=e=>{let t=e.u.all_time,n=e.u.cap>0?Math.round(e.u.cap_used/e.u.cap*100):0;return[(()=>{var n=Tu(),r=n.firstChild,i=r.nextSibling,a=i.nextSibling,o=a.nextSibling;return W(n,L(x,{get label(){return q(`usage_today`)},get v(){return e.u.totals.today}}),r),W(n,L(x,{get label(){return q(`usage_week`)},get v(){return e.u.totals.week}}),i),W(n,L(x,{get label(){return q(`usage_month`)},get v(){return e.u.totals.month}}),a),W(n,L(x,{get label(){return q(`usage_all_time`)},get v(){return t.total},get hint(){return q(`usage_all_time_hint`,{count:t.chat_count})}}),o),n})(),V(()=>V(()=>e.u.cap>0)()?(()=>{var t=Du();return W(t,()=>q(`usage_cap`,{cap:_(e.u.cap),used:_(e.u.cap_used),pct:n})),t})():void 0),L(S,{get series(){return e.u.series}}),(()=>{var n=Eu(),r=n.firstChild,i=r.nextSibling,a=i.nextSibling.nextSibling;return W(n,(()=>{var t=V(()=>!!e.u.since);return()=>t()?V(()=>!!e.u.filled_from)()?q(`usage_since_filled`,{date:y(e.u.since)}):q(`usage_since`,{date:y(e.u.since)}):q(`usage_none`)})(),r),W(n,()=>q(`usage_all_time_hint`,{count:t.chat_count}),i),W(n,()=>q(`usage_estimate`),a),n})(),V(()=>V(()=>!!e.u.breakdown.length)()?L(C,{get rows(){return e.u.breakdown}}):void 0)]},w=e=>{let t=()=>{let t=e.x;return t.status===`ok`?t.remaining!=null&&t.limit!=null?q(`balance_left`,{name:t.name,left:_(t.remaining),limit:_(t.limit)}):q(`balance_no_limit`,{name:t.name,month:_(t.usage_monthly??0)}):t.status===`error`?q(`balance_error`,{name:t.name,error:t.error??``}):q(t.status===`local`?`balance_local`:`balance_none`,{name:t.name})};var n=Ou(),r=n.firstChild,i=r.nextSibling;return W(n,t,r),W(n,(()=>{var t=V(()=>!!e.x.billing_url);return()=>t()?[` `,(()=>{var t=ku(),n=D();return W(t,()=>q(`billing_page`)),B(()=>e.x.billing_url,e=>{U(t,`href`,e),Qi(t,n)}),t})()]:void 0})(),i),n};return[(()=>{var e=Au(),t=e.firstChild,n=t.nextSibling,r=n.nextSibling;return W(e,L(b,{n:7}),t),W(e,L(b,{n:30}),n),W(e,L(b,{n:90}),r),e})(),V(()=>V(()=>!!l())()?(()=>{var e=Mu();return W(e,()=>q(`usage_error`,{error:l()})),e})():void 0),L(z,{get when(){return r()},keyed:!0,children:e=>L(ee,{u:e})}),L(R,{get each(){return a()??[]},children:e=>L(w,{x:e})}),(()=>{var e=ju(),t=e.firstChild,n=t.nextSibling.nextSibling,r=n.firstChild;return W(t,()=>q(`turn_log_about`)),n._$$click=()=>void m(),r._$owner=D(),W(n,()=>q(`turn_log_download`),null),W(e,(()=>{var e=V(()=>!!d());return()=>e()?(()=>{var e=Nu();return W(e,d),e})():void 0})(),null),e})()]}Sa(`llm-agent-usage`,{props:[`hass`],styles:()=>[Rl,Fu],view:e=>L(Iu,e)}),Ri([`click`]);var Lu=/* @__PURE__ */ H(`<button class=small>`),Ru=/* @__PURE__ */ H(`<button class="small ghost">`),zu=/* @__PURE__ */ H(`<label><input type=checkbox>`),Bu=/* @__PURE__ */ H(`<span class=u><input type=number>`),Vu=/* @__PURE__ */ H(`<span>`),Hu=/* @__PURE__ */ H(`<fieldset class=r>`),Uu=/* @__PURE__ */ H(`<input>`),Wu=/* @__PURE__ */ H(`<datalist>`),Gu=/* @__PURE__ */ H(`<select><!><!>`),Ku=/* @__PURE__ */ H(`<label><input type=radio>`),qu=/* @__PURE__ */ H(`<option>`),Ju=/* @__PURE__ */ H(`<option selected>`),Yu=/* @__PURE__ */ H(`<textarea class=json spellcheck=false>`),Xu=/* @__PURE__ */ H(`<textarea>`),Zu=/* @__PURE__ */ H(`<label>`),Qu=/* @__PURE__ */ H(`<div class=f><!><!><!>`),$u=/* @__PURE__ */ H(`<div class=d>`),ed=/* @__PURE__ */ H(`<div class=err>`),td=/* @__PURE__ */ H(`<form novalidate><!><div class=bar><button class="small ghost"type=button></button><button class="small primary"type=submit>`),nd=/* @__PURE__ */ H(`<div class=err role=alert>`),rd=/* @__PURE__ */ H(`<details><summary></summary><!><!>`),id=/* @__PURE__ */ H(`<div class=top><button class=icon><ha-icon icon=mdi:close></ha-icon></button><b>`,1),ad=/* @__PURE__ */ H(`<div class=bar><!><!>`),od=/* @__PURE__ */ H(`<div class=note>`),sd=/* @__PURE__ */ H(`<div class=note role=status>`),cd=/* @__PURE__ */ H(`<div class=bar><!><button class="small primary">`),ld=/* @__PURE__ */ H(`<div class=bar>`),ud=/* @__PURE__ */ H(`<div class=menu>`),dd=/* @__PURE__ */ H(`<div class=body><!><!>`),fd=/* @__PURE__ */ H(`<button><ha-icon icon=mdi:chevron-right>`,1),pd=`config/config_entries/options/flow`,md=[`text`,`number`,`boolean`,`select`,`object`],hd=`component.llm_agent.`,gd=`/config/integrations/integration/llm_agent`;function _d(){history.pushState(null,``,gd),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}var vd=e=>e.type===`string`?`text`:Object.keys(e.selector??{})[0],yd=e=>e.selector?.[vd(e)]??{},bd=e=>e.every(e=>e.type===`expandable`?bd(e.schema??[]):md.includes(vd(e))&&!yd(e).multiple),xd=e=>Object.fromEntries(e.map(e=>[e.name,e.type===`expandable`?xd(e.schema??[]):e.description?.suggested_value??e.default])),Sd=e=>e?.body?.message??e?.message??e?.error??String(e),Cd=xa(`:host{position:absolute;inset:0;height:auto;z-index:20;display:flex;flex-direction:column;background:var(--bg);color:var(--text)}
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
.bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}`);function wd(e){let t=Ca(e.hass,e=>e.connection),[n,r]=I({}),i={},a=e=>{i=e,r(e)},[o,s]=I(),[c,l]=I(0),u=0,d={},f={},p={},m,h,g=0,_=gi(()=>n().step),v=gi(()=>!!n().busy),y=gi(()=>!!n().saving),b=gi(()=>n().done),x=gi(()=>n().error??``),S=(e,t)=>{let n=p[hd+e]??``;return t?n.replace(/\{(\w+)\}/g,(e,n)=>t[n]??e):n},C=e=>S(e,_()?.description_placeholders),ee=e=>e?.type===`abort`&&(S(`options.abort.${e.reason}`,e.description_placeholders)||e.reason)||``,w=gi(()=>{let{step:e,error:t,stuck:r,saving:i,done:a}=n();return t?`error`:e?r?`stuck`:i?`saving`:a===void 0?ee(e)?`reason`:e.type===`menu`?`menu`:`form`:`done`:`loading`}),T=()=>_()?.step_id??`init`,E=()=>_()?.type!==`create_entry`&&C(`options.step.${T()}.title`)||q(`integration_settings`),te=()=>{let e=_();return e?.type===`form`||e?.type===`menu`?C(`options.step.${T()}.description`):``},ne=()=>e.host.dispatchEvent(new CustomEvent(`close`)),re=()=>{let t=i.step;t&&[`form`,`menu`,`progress`,`external`].includes(t.type)&&e.hass()?.callApi(`DELETE`,`${pd}/${t.flow_id}`)?.catch(()=>void 0)};function ie(e){let t=e.data_schema??[],n=![`form`,`menu`,`abort`,`create_entry`].includes(e.type)||e.type===`form`&&!bd(t);e.type===`form`&&(d=xd(t),f={}),s(e),a({step:e,stuck:n}),n&&re()}async function ae(){let t=e.hass();if(t){a({busy:!0});try{let e=()=>{},n=new Promise(t=>e=t);h??=t.connection.subscribeMessage(t=>{for(let{type:e,entry:n}of t)n.domain===`llm_agent`&&(e?n.entry_id===m&&(g=n.state===`loaded`?g&&2:/error|retry|failed/.test(n.state)?3:g||1):m??=n.entry_id);e()},{type:`config_entries/subscribe`}),await h,m||await n;let r=t.locale?.language??`en`,i=await Promise.all([`options`,`selector`].map(e=>t.connection.sendMessagePromise({type:`frontend/get_translations`,language:r,category:e,integration:[`llm_agent`]})));if(p=Object.assign({},...i.map(e=>e?.resources)),!m)throw Error(q(`no_provider`));ie(await t.callApi(`POST`,pd,{handler:m,show_advanced_options:!1}))}catch(e){a({error:Sd(e)})}}}async function oe(t){let n=i.step;a({...i,busy:!0}),g=0;let r;try{r=await e.hass().callApi(`POST`,`${pd}/${n.flow_id}`,t)}catch(e){let t=e?.body?.errors;a(t?{step:{...n,errors:t},busy:!1}:{...i,busy:!1,error:Sd(e)});return}if(r.type!==`create_entry`)return ie(r);a({step:r,saving:!0});for(let e=0;e<600&&g<2&&(g||e<30);e++)await new Promise(e=>setTimeout(e,100));a({step:r,done:g}),g===2&&e.host.dispatchEvent(new CustomEvent(`reloaded`,{bubbles:!0,composed:!0}))}function se(e){e.preventDefault();let t=``,n=(e,r,i=``)=>{let a={};for(let o of e){if(o.type===`expandable`){a[o.name]=n(o.schema??[],r[o.name]??{},o.name);continue}let e=r[o.name],s=f[i+`.`+o.name];if(s!==void 0)try{e=s.trim()?JSON.parse(s):void 0}catch{t=o.name}e!=null&&e!==``&&!Number.isNaN(e)&&(a[o.name]=e)}return a},r=n(i.step?.data_schema??[],d);t?a({...i,step:{...i.step,errors:{[t]:q(`settings_bad_json`)}}}):oe(r)}let ce=!1;yi(()=>t()!==void 0,e=>{e&&!ce&&(ce=!0,ae())}),hr(()=>{h?.then(e=>e()).catch(()=>void 0),h=void 0,re()});let le=e=>e.key===`Escape`&&(e.preventDefault(),ne()),ue=()=>(()=>{var e=Lu();return e._$$click=_d,W(e,()=>q(`open_in_ha`)),e})(),de=()=>(()=>{var e=Ru();return e._$$click=()=>void ae(),W(e,()=>q(`settings_menu`)),B(()=>v(),t=>{U(e,`disabled`,t)}),e})(),fe=gi(()=>{let e=_()?.menu_options??[];return Array.isArray(e)?e.map(e=>[e,``]):Object.entries(e)}),pe=(e,t,n,r=``)=>{let i=e=>S(e,t.description_placeholders),a=`options.step.${t.step_id}${r?`.sections.${r}`:``}`,o=i(`${a}.data.${e.name}`)||e.name,s=i(`${a}.data_description.${e.name}`),p=()=>r&&n()[r]?.[e.name]||n()[e.name],m=r?d[r]??={}:d,h=t=>{m[e.name]=t,l(++u)},g=()=>(c(),m[e.name]),_=yd(e),v=vd(e),y=`f-${r}-${e.name}`,b=e=>e.target.value,x;if(v===`boolean`)x=(()=>{var e=zu(),t=e.firstChild;return t.addEventListener(`change`,e=>h(e.target.checked)),W(e,o,null),B(()=>!!g(),e=>{t.checked=e}),e})();else{let t;if(v===`number`){let n=m[e.name];t=(()=>{var e=Bu(),t=e.firstChild;return t._$$input=e=>h(b(e)===``?void 0:Number(b(e))),U(t,`id`,y),W(e,(()=>{var e=V(()=>!!_.unit_of_measurement);return()=>e()?(()=>{var e=Vu();return W(e,()=>_.unit_of_measurement),e})():null})(),null),B(()=>({e:_.min,t:_.max,a:_.step??`any`,o:n==null?``:String(n),i:Ci()}),({e,t:n,a:r,o:i,i:a},o)=>{e!==o?.e&&U(t,`min`,e),n!==o?.t&&U(t,`max`,n),r!==o?.a&&U(t,`step`,r),(i!==o?.o||!a)&&(t.value=i??``)}),e})()}else if(v===`select`){let n=(_.options??[]).map(e=>typeof e==`string`?{value:e,label:e}:e),r=e=>_.translation_key&&i(`selector.${_.translation_key}.options.${e.value}`)||e.label;t=_.mode===`list`&&!_.custom_value?(()=>{var e=Hu();return U(e,`id`,y),U(e,`aria-label`,o),W(e,()=>n.map(e=>(()=>{var t=Ku(),n=t.firstChild;return n.addEventListener(`change`,()=>h(e.value)),U(n,`name`,y),W(t,()=>r(e),null),B(()=>g()===e.value,e=>{n.checked=e}),t})())),e})():_.custom_value?[(()=>{var t=Uu();return t._$$input=e=>h(b(e)),U(t,`id`,y),U(t,`list`,y+`l`),B(()=>m[e.name]??``,e=>{t.value=e??``}),t})(),(()=>{var e=Wu();return U(e,`id`,y+`l`),W(e,()=>n.map(e=>(()=>{var t=qu();return W(t,()=>r(e)),B(()=>e.value,e=>{t.value=e}),t})())),e})()]:(()=>{var e=Gu(),t=e.firstChild,i=t.nextSibling;return e.addEventListener(`change`,e=>h(b(e))),U(e,`id`,y),W(e,(()=>{var e=V(()=>g()==null);return()=>e()?Ju():void 0})(),t),W(e,()=>n.map(e=>(()=>{var t=qu();return W(t,()=>r(e)),B(()=>({e:e.value,t:g()===e.value,a:Ci()}),({e,t:n,a:r},i)=>{(e!==i?.e||!r)&&(t.value=e),(n!==i?.t||!r)&&(t.selected=n)}),t})()),i),e})()}else if(v===`object`){let n=r+`.`+e.name,i=m[e.name];f[n]??=i==null?``:JSON.stringify(i,null,2),t=(()=>{var e=Yu();return e._$$input=e=>f[n]=b(e),U(e,`id`,y),B(()=>f[n],t=>{e.value=t??``}),e})()}else t=_.multiline?(()=>{var t=Xu();return t._$$input=e=>h(b(e)),U(t,`id`,y),B(()=>m[e.name]??``,e=>{t.value=e??``}),t})():(()=>{var t=Uu();return t._$$input=e=>h(b(e)),U(t,`id`,y),B(()=>({e:_.type??`text`,t:_.type===`password`?`new-password`:`off`,a:m[e.name]??``,o:Ci()}),({e,t:n,a:r,o:i},a)=>{e!==a?.e&&U(t,`type`,e),n!==a?.t&&U(t,`autocomplete`,n),(r!==a?.a||!i)&&qi(t,`value`,r)}),t})();x=[(()=>{var e=Zu();return U(e,`for`,y),W(e,o),e})(),t]}var C=Qu(),ee=C.firstChild,w=ee.nextSibling,T=w.nextSibling;return W(C,x,ee),W(C,s?(()=>{var e=$u();return B(()=>al(s),t=>{e.innerHTML=t}),e})():null,w),W(C,(()=>{var e=V(()=>!!p());return()=>e()?(()=>{var e=ed();return W(e,()=>i(`options.error.${p()}`)||p()),e})():void 0})(),T),C},O=e=>{let t=()=>_()?.errors??{},n=e.st,r=e=>S(e,n.description_placeholders);var i=td(),a=i.firstChild,o=a.nextSibling,s=o.firstChild,c=s.nextSibling;return i.addEventListener(`submit`,se),W(i,(()=>{var e=V(()=>!!t().base);return()=>e()?(()=>{var e=nd();return W(e,()=>r(`options.error.${t().base}`)||t().base),e})():void 0})(),a),W(i,()=>(n.data_schema??[]).map(e=>{if(e.type!==`expandable`)return pe(e,n,t);let i=r(`options.step.${n.step_id}.sections.${e.name}.description`);var a=rd(),o=a.firstChild,s=o.nextSibling,c=s.nextSibling;return W(o,()=>r(`options.step.${n.step_id}.sections.${e.name}.name`)||e.name),W(a,i?(()=>{var e=$u();return B(()=>al(i),t=>{e.innerHTML=t}),e})():null,s),W(a,()=>(e.schema??[]).map(r=>pe(r,n,t,e.name)),c),B(()=>!!e.expanded,e=>{U(a,`open`,e)}),a}),o),s._$$click=()=>(re(),void ae()),W(s,()=>q(`settings_menu`)),W(c,()=>q(`settings_submit`)),B(()=>({e:v(),t:v()}),({e,t},n)=>{e!==n?.e&&U(s,`disabled`,e),t!==n?.t&&U(c,`disabled`,t)}),i};return[(()=>{var e=id(),t=e.firstChild,n=t.firstChild,r=t.nextSibling;return e._$$keydown=le,t._$$click=ne,n._$owner=D(),W(r,E),B(()=>({e:q(`close`),t:q(`close`)}),({e,t:n},r)=>{e!==r?.e&&U(t,`title`,e),n!==r?.t&&U(t,`aria-label`,n)}),e})(),(()=>{var e=dd(),t=e.firstChild,n=t.nextSibling;return e._$$keydown=le,W(e,(()=>{var e=V(()=>!!te());return()=>e()?(()=>{var e=$u();return B(()=>al(te()),t=>{e.innerHTML=t}),e})():void 0})(),t),W(e,L(xi,{get children(){return[L(Si,{get when(){return w()===`error`},get children(){return[(()=>{var e=nd();return W(e,()=>q(`settings_error`,{error:x()})),e})(),(()=>{var e=ad(),t=e.firstChild,n=t.nextSibling;return W(e,L(de,{}),t),W(e,L(ue,{}),n),e})()]}}),L(Si,{get when(){return w()===`loading`},get children(){var e=od();return W(e,()=>q(`settings_loading`)),e}}),L(Si,{get when(){return w()===`stuck`},get children(){return[(()=>{var e=od();return W(e,()=>q(`settings_unsupported`)),e})(),(()=>{var e=ad(),t=e.firstChild,n=t.nextSibling;return W(e,L(de,{}),t),W(e,L(ue,{}),n),e})()]}}),L(Si,{get when(){return w()===`saving`},get children(){var e=sd();return W(e,()=>q(`settings_reloading`)),e}}),L(Si,{get when(){return w()===`done`},get children(){return[(()=>{var e=sd();return W(e,()=>q(b()===2?`settings_reloaded`:b()?`settings_reload_failed`:`settings_saved`)),e})(),(()=>{var e=cd(),t=e.firstChild,n=t.nextSibling;return W(e,(()=>{var e=V(()=>b()===1||b()===3);return()=>e()?L(ue,{}):void 0})(),t),W(e,L(de,{}),n),n._$$click=ne,W(n,()=>q(`settings_back`)),e})()]}}),L(Si,{get when(){return w()===`reason`},get children(){return[(()=>{var e=od();return W(e,()=>ee(_())),e})(),(()=>{var e=ld();return W(e,L(de,{})),e})()]}}),L(Si,{get when(){return w()===`menu`},get children(){var e=ud();return W(e,L(R,{get each(){return fe()},children:e=>(()=>{var t=fd(),n=t.firstChild;return t._$$click=()=>void oe({next_step_id:e[0]}),W(t,()=>C(`options.step.${_()?.step_id}.menu_options.${e[0]}`)||e[1]||e[0],n),n._$owner=D(),B(()=>v(),e=>{U(t,`disabled`,e)}),t})()})),e}}),L(Si,{get when(){return w()===`form`},get children(){return L(z,{get when(){return o()},keyed:!0,children:e=>L(O,{st:e})})}})]}}),n),B(()=>v()||y()?`true`:`false`,t=>{U(e,`aria-busy`,t)}),e})()]}Sa(`llm-agent-settings`,{props:[`hass`],styles:()=>[Rl,Cd],view:(e,t)=>L(wd,fi(e,{host:t}))}),Ri([`click`,`input`,`keydown`]);var Td=8192,Ed=15360,Dd=3e3,Od=1e3,kd=2e3,Ad=80,jd=40,Md=40,Nd=30,Pd=300,Fd=`(max-width: 870px)`,Id=/* @__PURE__ */ new Set([`entity_picture`,`access_token`]),Ld=/* @__PURE__ */ new Set([`SCRIPT`,`STYLE`,`TEMPLATE`,`NOSCRIPT`,`INPUT`,`TEXTAREA`,`SELECT`,`OPTION`,`SVG`,`HA-ICON`,`HA-SVG-ICON`,`HA-PASSWORD-FIELD`]);async function Rd(e){pf();let t=e,n=location.pathname+location.search,r;try{r=await Bd(t)}catch{r=Vd()}let i=af();if(i&&t.states?.[i]){let e=rf(t,i);r={kind:`entity`,title:`Entity: ${e.name}`,summary:String(e.name),details:{entity:e,behind:{kind:r.kind,title:r.title,...r.details}}}}r.details.narrow=window.matchMedia?.(Fd).matches??!1;let a=zd();return a&&(r.details.selection=a),_f({path:n,...r})}function zd(){return lf}async function Bd(e){let t=location.pathname.split(`/`).filter(Boolean).map(decodeURIComponent),n=new URLSearchParams(location.search),[r=``,i=``,a=``,o=``]=t;if(r===`config`)return[`automation`,`script`,`scene`].includes(i)&&o?Yd(e,i,a,o):i===`devices`&&a===`device`&&o?Xd(e,o):i===`areas`&&a===`area`&&o?Zd(e,o):i===`integrations`&&a===`integration`&&o?Qd(e,o):i===`tools`||i===`developer-tools`?ef(a):Hd(t);if(r===`developer-tools`)return ef(i);if(r===`history`||r===`logbook`)return $d(e,r,n);let s=e.panels?.[r];return s?.component_name===`lovelace`||Ud.has(s?.component_name??``)?Wd(e,r,i,s?.component_name===`lovelace`):Vd()}function Vd(){let e=sf();return{kind:`other`,title:e,summary:e,details:{},text:cf()}}function Hd(e){let t=sf();return{kind:`settings`,title:t,summary:t,details:{section:e.slice(1).join(`/`)||`config`},text:cf()}}var Ud=/* @__PURE__ */ new Set([`home`,`light`,`security`,`climate`,`maintenance`]);async function Wd(e,t,n,r){let i=e.panels?.[t],a=i?.title&&(e.localize?.(`panel.${i.title}`)||i.title)||e.localize?.(`panel.states`)||`Overview`,o,s=!r;if(r)try{o=await e.connection.sendMessagePromise({type:`lovelace/config`,url_path:t===`lovelace`?null:t})}catch{s=!0}o?.strategy&&(s=!0);let c=s?Gd()??void 0:o,l=Array.isArray(c?.views)?c.views:[],u=l.findIndex(e=>e.path!==void 0&&String(e.path)===n),d=u>=0?u:/^\d+$/.test(n)?Number(n):0,f=l[d];if(f?.strategy&&!f.cards&&!f.sections){let e=Gd()?.views;Array.isArray(e)&&e[d]&&(f={...e[d],strategy:f.strategy})}let p=f?String(f.title??f.path??`View ${d+1}`):``,m={dashboard:{url_path:t===`lovelace`?null:t,title:a}};f&&(m.view={path:f.path??null,index:d,title:p}),s&&(m.generated=!0);let h=[];f?.strategy&&(m.view_generated=!0),f&&(h=qd(e,f)),(s||f?.strategy||!h.length)&&(h=[.../* @__PURE__ */ new Set([...h,...qd(e,{cards:Kd()})])]),h.length?(m.entities=h.slice(0,Ad).map(t=>nf(e,t)),h.length>Ad&&(m.entities_total=h.length)):s&&(m.note=`Generated dashboard; its cards could not be read, so no entities are listed.`);let g=p.toLowerCase()===a.toLowerCase(),_=p&&!g&&(r||d!==0)?`${a}, ${p}`:a;return{kind:`dashboard`,title:`Dashboard ${_}`,summary:_,details:m}}function Gd(){for(let e of[`hui-root`,`ha-panel-lovelace`]){let t=of(e)?.lovelace?.config;if(t&&typeof t==`object`)return t}return null}function Kd(){let e=of(`hui-root`);if(!e)return[];let t=[],n=[e],r=0;for(;n.length&&r++<2e4;){let e=n.shift();if(e instanceof Element&&/^HUI-.*(CARD|BADGE)$/.test(e.tagName)){let n=e,r=n.config??n._config,i=!e.hasAttribute(`hidden`)&&getComputedStyle(e).display!==`none`;if(i&&r&&typeof r==`object`&&t.push(r),!i)continue}let r=e instanceof Element?e.shadowRoot:null;r&&n.push(r);for(let t of e.children)n.push(t)}return t}function qd(e,t){let n=/* @__PURE__ */ new Set,r=t=>{typeof t==`string`&&e.states?.[t]&&n.add(t)},i=(e,t)=>{if(!(t>25||typeof e!=`object`||!e)){if(Array.isArray(e))for(let n of e)i(n,t+1);else for(let[n,a]of Object.entries(e)){if(n===`entity`||n===`entity_id`)Array.isArray(a)?a.forEach(r):r(a);else if(n===`entities`&&Array.isArray(a)){for(let e of a)typeof e==`string`?r(e):i(e,t+1);continue}i(a,t+1)}}};return i(t,0),[...n]}var Jd={automation:`ha-automation-editor`,script:`ha-script-editor`,scene:`ha-scene-editor`};function Yd(e,t,n,r){let i=of(Jd[t]),a=i?.config??i?._config,o=r===`new`,s=o?void 0:Object.values(e.states??{}).find(e=>e.entity_id.startsWith(`${t}.`)&&(String(e.attributes.id??``)===r||e.entity_id===`${t}.${r}`)),c=String(a?.alias??s?.attributes.friendly_name??(o?`New `+t:r)),l={id:o?null:r,alias:c,new:o};s&&(l.entity_id=s.entity_id),n!==`edit`&&(l.view=n);let u=i?.dirty??i?._dirty;return typeof u==`boolean`&&(l.unsaved_changes=u),{kind:t,title:`${t[0].toUpperCase()+t.slice(1)}: ${c}`,summary:c,details:l}}function Xd(e,t){let n=e.devices?.[t],r=n?.name_by_user||n?.name||t,i=Object.values(e.entities??{}).filter(e=>e.device_id===t).map(e=>e.entity_id),a={device:{id:t,name:r,manufacturer:n?.manufacturer??null,model:n?.model??null,area:n?.area_id?e.areas?.[n.area_id]?.name??n.area_id:null},entities:i.slice(0,jd).map(t=>nf(e,t))};return i.length>jd&&(a.entities_total=i.length),{kind:`device`,title:`Device: ${r}`,summary:r,details:a}}function Zd(e,t){let n=e.areas?.[t]?.name??t,r=Object.values(e.devices??{}).filter(e=>e.area_id===t),i=new Set(r.map(e=>e.id)),a=Object.values(e.entities??{}).filter(e=>e.area_id===t||!e.area_id&&e.device_id&&i.has(e.device_id)).map(e=>e.entity_id),o={area:{id:t,name:n},devices:r.slice(0,Md).map(e=>({id:e.id,name:e.name_by_user||e.name||e.id})),entities:a.slice(0,Md).map(t=>nf(e,t))};return r.length>Md&&(o.devices_total=r.length),a.length>Md&&(o.entities_total=a.length),{kind:`area`,title:`Area: ${n}`,summary:n,details:o}}async function Qd(e,t){let n={domain:t};try{n.entries=(await e.connection.sendMessagePromise({type:`config_entries/get`,domain:t})).map(e=>({title:e.title,state:e.state}))}catch{}return{kind:`integration`,title:`Integration: ${t}`,summary:t,details:n}}function $d(e,t,n){let r=(n.get(`entity_id`)??``).split(`,`).filter(Boolean),i={entity_ids:r,start:n.get(`start_date`),end:n.get(`end_date`)},a=r.map(t=>String(e.states?.[t]?.attributes.friendly_name??t)),o=t===`history`?`History`:`Logbook`,s=a.length?`${o}: ${a.slice(0,3).join(`, `)}`:o;return{kind:t,title:s,summary:s,details:i}}function ef(e){let t=e||`yaml`,n={tab:t};if(t===`template`){let e=of(`tools-template`),t=typeof e?._template==`string`?e._template:void 0;if(t===void 0)try{t=localStorage.getItem(`panel-dev-template-template`)??void 0}catch{}t!==void 0&&(n.template=t.slice(0,kd),t.length>kd&&(n.template_length=t.length))}let r=`Developer tools: ${t}`;return{kind:`developer-tools`,title:r,summary:r,details:n}}function tf(e,t){let n=e.states?.[t];return String(n?.attributes.friendly_name??e.entities?.[t]?.name??t)}function nf(e,t){let n=e.states?.[t],r={entity_id:t,name:tf(e,t),state:n?.state??null},i=n?.attributes.unit_of_measurement;return i&&(r.unit=i),r}function rf(e,t){let n=e.states[t],r={},i=0;for(let[e,t]of Object.entries(n.attributes)){if(Id.has(e)||e===`friendly_name`)continue;if(++i>Nd)break;let n=JSON.stringify(t)??``;r[e]=n.length>Pd?`${n.slice(0,Pd)} (cut)`:t}let a=Object.keys(n.attributes).length,o={entity_id:t,name:tf(e,t),state:n.state,attributes:r};return i>Nd&&(o.attributes_total=a),o}function af(){let e=of(`ha-more-info-dialog`);return!e||e._open===!1?null:typeof e._entityId==`string`&&e._entityId?e._entityId:null}function of(e){let t=document.querySelector(`home-assistant`);if(!t)return document.querySelector(e);let n=[t],r=0;for(;n.length&&r++<2e4;){let t=n.shift();if(t instanceof Element&&t.matches(e))return t;let r=t instanceof Element?t.shadowRoot:null;r&&n.push(r);for(let e of t.children)e.tagName.startsWith(`LLM-AGENT`)||n.push(e)}return null}function sf(){return document.title.replace(/\s*[-|\u2013\u2014]\s*Home Assistant\s*$/i,``).trim()||location.pathname}function cf(){let e=of(`partial-panel-resolver`);if(!e)return;let t=[],n=0,r=e=>{if(n>=Dd)return;if(e.nodeType===Node.TEXT_NODE){let r=(e.textContent??``).replace(/\s+/g,` `).trim();r&&(t.push(r),n+=r.length+1);return}if(!(e instanceof Element)){(e instanceof ShadowRoot||e instanceof DocumentFragment)&&e.childNodes.forEach(r);return}let i=e.tagName;Ld.has(i)||i.startsWith(`LLM-AGENT`)||e.getAttribute(`aria-hidden`)!==`true`&&(typeof e.checkVisibility!=`function`||e.checkVisibility({checkVisibilityCSS:!0}))&&(i===`SLOT`?e.assignedNodes({flatten:!0}).forEach(r):e.shadowRoot?r(e.shadowRoot):e.childNodes.forEach(r))};return r(e),t.join(`
`).slice(0,Dd)||void 0}var lf=``,uf=!1;function df(){let e=document.activeElement;for(;e;){if(e.tagName.startsWith(`LLM-AGENT`))return!0;e=e.shadowRoot?.activeElement??null}return!1}function ff(){let e=document.getSelection()?.toString().trim()??``;if(e)return e;let t=document.querySelector(`home-assistant`);if(!t)return``;let n=[t],r=0;for(;n.length&&r++<2e4;){let e=n.pop();if(e.tagName.startsWith(`LLM-AGENT`))continue;let t=e.shadowRoot;if(t){let e=t.getSelection?.()?.toString().trim();if(e)return e;n.push(...t.children)}n.push(...e.children)}return``}function pf(){uf||(uf=!0,document.addEventListener(`selectionchange`,()=>{df()||(lf=ff().slice(0,Od))}),lf=ff().slice(0,Od))}var mf=new TextEncoder,hf=e=>mf.encode(JSON.stringify(e)).length;function gf(e){let t=null,n=(e,r)=>{for(let[i,a]of Object.entries(e))if(Array.isArray(a)&&a.length>1){let n=hf(a);(!t||n>t.size)&&(t={owner:e,key:i,size:n})}else r<2&&a&&typeof a==`object`&&!Array.isArray(a)&&n(a,r+1)};return n(e,0),t}function _f(e){let t=e.details;for(let e=0;e<40&&hf(t)>Td;e++){let e=gf(t);if(!e)break;let n=e.owner[e.key],r=`${e.key}_total`;e.owner[r]===void 0&&(e.owner[r]=n.length),e.owner[e.key]=n.slice(0,Math.floor(n.length/2)),e.owner[`${e.key}_trimmed`]=!0}for(hf(t)>Td&&(e.details={trimmed:!0,note:`The page details were too large to send.`,narrow:t.narrow,selection:t.selection});e.text&&hf(e)>Ed;)e.text=e.text.slice(0,Math.floor(e.text.length*.75));return hf(e)>Ed&&delete e.text,e}var vf=/* @__PURE__ */ H(`<pre class=args>`),yf=/* @__PURE__ */ H(`<div class=empty>`),bf=/* @__PURE__ */ H(`<button class=icon><ha-icon>`,1),xf=/* @__PURE__ */ H(`<llm-agent-notes>`,1),Sf=/* @__PURE__ */ H(`<llm-agent-usage>`,1),Cf=/* @__PURE__ */ H(`<llm-agent-changes>`,1),wf=/* @__PURE__ */ H(`<div> <main><header> <button class=icon><ha-icon></ha-icon></button> <div class=title></div> <!> <!> <!> <!> <!> <button class="icon gear"><ha-icon icon=mdi:cog-outline></ha-icon></button> <!></header> <!> <div class=sr-only role=status aria-live=polite></div> <div class=messages role=log> <!></div> <!></main> <!>`,1),Tf=/* @__PURE__ */ H(`<ha-menu-button>`,1),Ef=/* @__PURE__ */ H(`<button class=icon><ha-icon icon=mdi:tray-arrow-down>`,1),Df=/* @__PURE__ */ H(`<button class=icon><ha-icon icon=mdi:square-edit-outline>`,1),Of=/* @__PURE__ */ H(`<llm-agent-settings>`,1),kf=/* @__PURE__ */ H(`<nav><div class=nav-head><span class=brand><span class=brand-mark><ha-icon icon=mdi:robot-happy-outline></ha-icon></span>LLM Agent</span> <button class=icon><ha-icon icon=mdi:square-edit-outline></ha-icon></button></div> <label class=search><ha-icon icon=mdi:magnify></ha-icon> <input type=search></label> <div class=convs> <!> <!>`,1),Af=/* @__PURE__ */ H(`<div class=nav-empty>`),jf=/* @__PURE__ */ H(`<div class=group>`),Mf=/* @__PURE__ */ H(`<div><span class=conv-title><!><!><!></span> <button class="icon del"><ha-icon icon=mdi:trash-can-outline>`,1),Nf=/* @__PURE__ */ H(`<ha-icon class=auto icon=mdi:robot-outline>`,1),Pf=/* @__PURE__ */ H(`<small class=snippet>`),Ff=/* @__PURE__ */ H(`<label> <select>`),If=/* @__PURE__ */ H(`<option>`),Lf=/* @__PURE__ */ H(`<label class=check><input type=checkbox>`),Rf=/* @__PURE__ */ H(`<div class=prefs role=dialog> <!> <!> <!> <!> <!> <!> <!> <div class=hint>`),zf=/* @__PURE__ */ H(`<div class=mine><div></div> <button class=small></button> `),Bf=/* @__PURE__ */ H(`<button class="small ghost">`),Vf=/* @__PURE__ */ H(`<div class=mine><button class=small></button> <button class="small ghost">`),Hf=/* @__PURE__ */ H(`<div class=welcome><div class=logo><ha-icon icon=mdi:robot-happy-outline></ha-icon></div> <h2></h2> <!> <div class=tips>`,1),Uf=/* @__PURE__ */ H(`<p>`),Wf=/* @__PURE__ */ H(`<span class=mode-chip><ha-icon icon=mdi:shield-check-outline>`,1),Gf=/* @__PURE__ */ H(`<button class=tip><ha-icon></ha-icon> <span>`,1),Kf=/* @__PURE__ */ H(`<div class=avatar aria-hidden=true><ha-icon icon=mdi:robot-happy-outline>`,1),qf=/* @__PURE__ */ H(`<div> <div class="msg user md"><!><!></div> <!>`),Jf=/* @__PURE__ */ H(`<div class="row reply"> <div class="msg assistant typing"><span></span><span></span><span>`),Yf=/* @__PURE__ */ H(`<div class="row reply"> <div class="msg assistant md"></div> <!> <!>`),Xf=/* @__PURE__ */ H(`<div> <!>`),Zf=/* @__PURE__ */ H(`<div class="row reply"><!><!>`),Qf=/* @__PURE__ */ H(`<div class=msg-actions><button class=icon><ha-icon icon=mdi:pencil-outline></ha-icon></button> `,1),$f=/* @__PURE__ */ H(`<button class=icon><ha-icon icon=mdi:refresh>`,1),ep=/* @__PURE__ */ H(`<div class=page-note><ha-icon icon=mdi:file-eye-outline>`,1),tp=/* @__PURE__ */ H(`<div class=plan-run><button class="small primary"><ha-icon icon=mdi:play></ha-icon> `,1),np=/* @__PURE__ */ H(`<div class="msg-actions acts"><button class=icon><ha-icon icon=mdi:content-copy>`,1),rp=/* @__PURE__ */ H(`<button class=small>`),ip=/* @__PURE__ */ H(`<div class=preview><button class="ghost small"><ha-icon></ha-icon> </button> `,1),ap=/* @__PURE__ */ H(`<llm-dashboard-preview>`,1),op=/* @__PURE__ */ H(`<div class=note-suggestion role=group><div class=note-head><ha-icon icon=mdi:notebook-edit-outline></ha-icon> <div><strong></strong> <small></small></div></div> <!> <!> <div class=note-actions><button class=ghost></button> <button class=note-save>`,1),sp=/* @__PURE__ */ H(`<ul class="note-lines add"> <!> `),cp=/* @__PURE__ */ H(`<li>`),lp=/* @__PURE__ */ H(`<div class=note-label>`),up=/* @__PURE__ */ H(`<ul class="note-lines del"> <!> `),dp=/* @__PURE__ */ H(`<span class=spinner>`),fp=/* @__PURE__ */ H(`<ha-icon class="st ok"icon=mdi:check-circle>`,1),pp=/* @__PURE__ */ H(`<ha-icon class="st error"icon=mdi:alert-circle>`,1),mp=/* @__PURE__ */ H(`<span class="tag wait">`),hp=/* @__PURE__ */ H(`<div> <details><summary><span class=tool-icon><ha-icon></ha-icon></span> <span class=tool-name></span> <span class=tool-summary></span> <!> <!> <!> <!> <ha-icon class=chev icon=mdi:chevron-down></ha-icon></summary> <!> <!> <!> <!> <!></details> <!> <!>`,1),gp=/* @__PURE__ */ H(`<div class=approval-head><ha-icon></ha-icon> <span><!><!>`,1),_p=/* @__PURE__ */ H(`<span class=why> · `),vp=/* @__PURE__ */ H(`<span class=tag>`),yp=/* @__PURE__ */ H(`<button class="ghost small undo">`),bp=/* @__PURE__ */ H(`<div><ha-icon icon=mdi:shield-check-outline></ha-icon> <span><b>:</b> `,1),xp=/* @__PURE__ */ H(`<pre class=diff>`),Sp=/* @__PURE__ */ H(`<pre class=result>`),Cp=/* @__PURE__ */ H(`<img class=snapshot>`),wp=/* @__PURE__ */ H(`<div class="approval phone-wait"><ha-icon icon=mdi:cellphone-message></ha-icon> `,1),Tp=/* @__PURE__ */ H(`<div class=approval><input> <button class="ghost danger-text"></button> <button class=primary>`),Ep=/* @__PURE__ */ H(`<div class=files>`),Dp=/* @__PURE__ */ H(`<div class=photos>`),Op=/* @__PURE__ */ H(`<div class=photo-note><ha-icon icon=mdi:image-outline></ha-icon> <!>`,1),kp=/* @__PURE__ */ H(`<img>`),Ap=/* @__PURE__ */ H(`<span class=file><ha-icon></ha-icon> <span class=file-name></span> <span class=file-meta>, <!></span> `,1),jp=/* @__PURE__ */ H(`<button class=icon><ha-icon icon=mdi:close>`,1),Mp=/* @__PURE__ */ H(`<footer> <div><textarea rows=1></textarea> <!> <!> <!> <div class=toolbar><label class="attach icon"><ha-icon icon=mdi:paperclip></ha-icon> <input type=file multiple></label> <label class="model-pill mode-pill"><ha-icon></ha-icon> <select> <!> </select></label> <!> <!> <span class=spacer></span> <!></div></div> <div class=meta> <span class=usage> <!> · <!> <!>`,1),Np=/* @__PURE__ */ H(`<button><ha-icon></ha-icon> <span>`,1),Pp=/* @__PURE__ */ H(`<ul class=mentions role=listbox> <!> `),Fp=/* @__PURE__ */ H(`<li role=option><span class=kind></span> <span class=label></span> <span class=detail>`),Ip=/* @__PURE__ */ H(`<div class=attached> <!> `),Lp=/* @__PURE__ */ H(`<span class=thumb><img> <button class=icon><ha-icon icon=mdi:close>`,1),Rp=/* @__PURE__ */ H(`<div class="attached files"> <!> `),zp=/* @__PURE__ */ H(`<label class=model-pill><ha-icon icon=mdi:creation-outline></ha-icon> <select> <!> </select> <span class=sep>/</span> <input class=model role=combobox aria-autocomplete=list aria-controls=model-list autocomplete=off>`,1),Bp=/* @__PURE__ */ H(`<ul class=models id=model-list role=listbox><li class=models-head role=presentation><span></span> <span></span></li> <!> <!> <!>`),Vp=/* @__PURE__ */ H(`<li role=option> <span class=label><!><!></span> <span class=price>`),Hp=/* @__PURE__ */ H(`<ha-icon class=star icon=mdi:star-outline>`,1),Up=/* @__PURE__ */ H(`<span class=mid>`),Wp=/* @__PURE__ */ H(`<li class=models-more role=presentation>`),Gp=/* @__PURE__ */ H(`<button class="send stop"><ha-icon icon=mdi:stop>`,1),Kp=/* @__PURE__ */ H(`<button class=send><ha-icon icon=mdi:arrow-up>`,1),qp=/* @__PURE__ */ H(`<span class=editing> <button class="small ghost">`),Jp=/* @__PURE__ */ H(`<span>`),Yp=/* @__PURE__ */ new Set([`config`,`content`,`old`,`new`,`text`,`body`]),Xp={input:0,output:0,cache_read:0,cache_write:0,cost:0},$=class e extends HTMLElement{static{this.hostCss=xa(`
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
    `)}get hass(){return this._hass}set hass(e){this._hass=e,e&&!this.started&&this.isConnected&&(this.started=!0,queueMicrotask(()=>void this.init()))}get pageContext(){return this._page}set pageContext(e){let t=this._page;(t?.path!==e?.path||t?.summary!==e?.summary)&&(this.pageOff=!1),this._page=e}get embedded(){return this._embedded}set embedded(e){this._embedded=e,this.toggleAttribute(`embedded`,e)}get slim(){return this.narrow||this.embedded}get ws(){return this.hass.connection}applyPrefs(){let e=this.prefs;e.theme===`auto`?this.removeAttribute(`data-theme`):this.setAttribute(`data-theme`,e.theme),e.size===`normal`?this.removeAttribute(`data-size`):this.setAttribute(`data-size`,e.size),this.toggleAttribute(`data-compact`,e.compact)}setPref(e,t){this.prefs={...this.prefs,[e]:t},lm(this.prefs),this.applyPrefs()}async setMyDefault(e=!1){let t=await this.ws.sendMessagePromise({type:`llm_agent/my_default`,provider_id:e?null:this.providerId,model:e?``:this.model});this.info&&={...this.info,my_default:t.my_default}}startModel(){let e=this.info?.my_default,t=e&&this.info?.providers.find(t=>t.id===e.provider_id)||this.info?.providers[0];t&&(this.providerId=t.id,this.model=e&&e.provider_id===t.id&&e.model?e.model:t.default_model)}pageToSend(){let e=this.pageContext;if(!e||this.pageOff)return;let t=zd(),n={...e.details};return t?n.selection=t:delete n.selection,{...e,details:n}}#e;constructor(){super(),this._embedded=!1,this.convs=[],this.query=``,this.previews=/* @__PURE__ */ new Set,this.hits=null,this.convId=null,this.chatTitle=`New chat`,this.items=[],this.usage=Xp,this.running=!1,this.announce=``,this.editAt=-1,this.hasText=!1,this.photos=[],this.files=[],this.dragging=!1,this.photoGen=0,this.providerId=``,this.model=``,this.fetched={},this.showList=!1,this.mode=``,this.modeBefore=null,this.modelOpen=!1,this.modelQuery=``,this.modelIndex=-1,this.loadError=``,this.mentions=[],this.picked=new bl,this.prefs=cm(),this.showPrefs=!1,this.showSettings=!1,this.showChanges=!1,this.view=`changes`,this.mentionIndex=0,this.pageOff=!1,this.mentionStart=-1,this.gen=0,this.started=!1,this.stickToBottom=!0,this.#e=!1,this.onReady=()=>{this.running&&this.convId&&this.open(this.convId).catch(()=>void 0)},this.reloaded=async()=>{try{this.info=await this.ws.sendMessagePromise({type:`llm_agent/info`})}catch{return}this.provider||this.startModel(),await this.refreshList(),this.convId&&await this.open(this.convId).catch(()=>void 0)},this.modelError=``,this.loadingModels=/* @__PURE__ */ new Set,this.noteCardSince=/* @__PURE__ */ new Map,this.noteTick=0;for(let e of[`hass`,`narrow`,`pageContext`,`embedded`])if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}connectedCallback(){if(!this.#e){this.#e=!0;let t=this.attachShadow({mode:`open`});t.adoptedStyleSheets=[Rl,e.hostCss],Ii(()=>this.renderPanel(),t)}this.hass&&!this.started&&(this.started=!0,queueMicrotask(()=>void this.init()))}attachBox(){let e=this.source;e&&(this.input?.source!==e&&(this.input?.destroy(),this.input=ll(e,{onKey:e=>this.onKey(e),onChange:()=>this.onInput(),onPaste:e=>void this.onPaste(e),onBlur:()=>setTimeout(()=>{this.shadowRoot.activeElement!==this.input?.el&&(this.mentions=[])},150)})),this.input.setPlaceholder(e.placeholder))}addCopyButtons(){if(this.scroller)for(let e of this.scroller.querySelectorAll(`.md pre:not([data-copy])`)){e.dataset.copy=`1`;let t=document.createElement(`button`);t.className=`copy small ghost`,t.textContent=q(`copy`),t.addEventListener(`click`,async()=>{let n=e.querySelector(`code`)??e;t.textContent=q(await Qp(n.textContent??``)?`copied`:`copy_failed`),setTimeout(()=>t.textContent=q(`copy`),1500)}),e.prepend(t)}}async copy(e,t){let n=await Qp(e),r=t.querySelector(`ha-icon`);r?.setAttribute(`icon`,n?`mdi:check`:`mdi:alert-circle-outline`),this.announce=q(n?`copied`:`copy_failed`),setTimeout(()=>r?.setAttribute(`icon`,`mdi:content-copy`),1500)}disconnectedCallback(){queueMicrotask(()=>{this.isConnected||(this.listening?.removeEventListener?.(`ready`,this.onReady),this.listening=void 0,this.detach(),this.started=!1)})}async init(){this.listening=this.ws,this.ws.addEventListener?.(`ready`,this.onReady),await Na(this.hass?.locale?.language);try{this.info=await this.ws.sendMessagePromise({type:`llm_agent/info`}),this.loadError=``}catch(e){this.loadError=e.message??String(e);return}this.applyPrefs(),this.providerId||this.startModel(),await this.refreshList();let e=this.convId??am();if(e&&this.convs.some(t=>t.id===e))try{await this.open(e)}catch{om(null)}this.convId||(wt(),this.setText(tm(this.draftKey,null)))}async refreshList(){this.convs=await this.ws.sendMessagePromise({type:`llm_agent/conversations/list`}),rm(this.draftKey,this.convs)}get draftKey(){return`llm-agent-drafts-${this.hass?.user?.id??``}`}setText(e){let t=this.input;if(!t)return;let n=this.picked.show(e,this.hass);t.setMentions(this.picked.labels()),t.value=n,this.stored(e)}get composed(){return this.picked.expand(this.input?.value??``)}stored(e){this.hasText=!!e.trim(),this.input?.fit(),this.editAt<0&&nm(this.draftKey,this.convId,e)}focusComposer(){let e=this.shadowRoot.activeElement;matchMedia(`(pointer: coarse)`).matches||e&&e!==this.input?.el&&e.tagName!==`BUTTON`||this.input?.focus()}get member(){return this.info?.is_admin===!1}get admin(){return!this.member&&!!this.hass?.user?.is_admin}get provider(){return this.info?.providers.find(e=>e.id===this.providerId)}async detach(){let e=++this.gen,t=this.unsub;if(this.unsub=void 0,t)try{await t()}catch{}return e}clearAttachments(){this.photos=[],this.files=[],this.photoGen++}newChat(){this.showChanges=!1,this.editAt=-1,this.clearAttachments(),this.detach(),this.convId=null,om(null),this.chatTitle=`New chat`,this.items=[],this.usage=Xp,this.running=!1,this.showList=!1,this.mode=``,this.modeBefore=null,this.startModel(),this.setText(tm(this.draftKey,null)),this.input?.focus()}async open(e,t=!1){this.showChanges=!1;let n=await this.detach();if(n!==this.gen)return;this.showList=!1,this.editAt=-1,this.clearAttachments();let r=await this.ws.sendMessagePromise({type:`llm_agent/conversations/get`,conversation_id:e});if(n!==this.gen)return;this.convId=r.id,om(r.id),this.setText(tm(this.draftKey,r.id)),this.chatTitle=r.title,this.usage=r.usage,this.providerId=r.provider_id,this.model=r.model,this.mode=r.mode??``,this.modeBefore=r.mode_before_plan??null,this.items=_m(r.messages),r.stopped&&r.stopped_text&&(this.items=[...this.items,{kind:`notice`,text:r.stopped_text,stop:r.stopped}]),this.running=!1,this.stickToBottom=!0;let i=await this.ws.sendMessagePromise({type:`llm_agent/info`});if(n!==this.gen||!i.running.includes(e))return;this.running=!0,this.items=[...this.items,{kind:`assistant`,text:``}];let a;try{a=await this.ws.subscribeMessage(e=>{n===this.gen&&this.onEvent(e)},{type:`llm_agent/attach`,conversation_id:e})}catch{n===this.gen&&!t?await this.open(e,!0):n===this.gen&&(this.running=!1);return}this.keepOrDrop(n,a)}keepOrDrop(e,t){e===this.gen?this.unsub=t:t().catch(()=>void 0)}renderArgs(e,t){let n=Object.fromEntries(Object.entries(e??{}).filter(([e])=>!(t&&Yp.has(e))));if(!Object.keys(n).length)return null;var r=vf();return W(r,()=>JSON.stringify(n,null,2)),r}async removeConv(e,t){t.stopPropagation(),confirm(q(`confirm_delete`))&&(await this.ws.sendMessagePromise({type:`llm_agent/conversations/delete`,conversation_id:e}),e===this.convId&&this.newChat(),await this.refreshList())}lastUserIndex(){for(let e=this.items.length-1;e>=0;e--)if(this.items[e].kind===`user`)return e;return-1}async send(e,t=!1){let n=this.lastUserIndex(),r=e===void 0?this.editAt:n,i=r>=0&&r===n,a=this.items[n],o=e===void 0?this.photos:a?.kind===`user`&&a.images||[],s=e===void 0?this.files:a?.kind===`user`&&a.files||[],c=e!==void 0&&a?.kind===`user`&&a.pageData?a.pageData:this.pageToSend(),l=e??this.composed.trim();if(!l&&s.length&&(l=`(${s.map(e=>e.name).join(`, `)})`),!l&&o.length&&(l=`(photo)`),!l||this.running)return;if(e!==void 0&&a?.kind===`user`&&(a.photos&&!a.images||a.files?.some(e=>!e.data))){this.edit(n);return}let u=this.gen,d=r>=0?this.items.slice(0,r):this.items;if(r>=0&&!i){try{await this.ws.sendMessagePromise({type:`llm_agent/conversations/truncate`,conversation_id:this.convId,index:d.filter(e=>e.kind===`user`).length})}catch(e){this.push({kind:`notice`,text:Lm(e),error:!0});return}if(u!==this.gen)return}let f={items:r>=0&&!i?d:this.items,draft:this.composed,photos:this.photos,files:this.files,editAt:i?this.editAt:-1},p=this.editAt>=0;this.editAt=-1,e===void 0&&(this.clearAttachments(),this.setText(p?tm(this.draftKey,this.convId):``),this.focusComposer()),this.items=[...d,{kind:`user`,text:l,images:o.length?o:void 0,files:s.length?s:void 0,page:c?.summary,pageData:c},{kind:`assistant`,text:``}],this.running=!0,this.announce=``,this.stickToBottom=!0;try{let e=await this.ws.subscribeMessage(e=>{u===this.gen&&(e.type===`conversation`?this.convId||(this.convId=e.conversation_id,this.chatTitle=e.title||l.slice(0,60),om(this.convId)):this.onEvent(e))},{type:`llm_agent/chat`,text:l,conversation_id:this.convId,provider_id:this.providerId||void 0,model:this.model||void 0,mode:this.mode||void 0,rewind:i||void 0,over_cap:t||void 0,language:this.hass?.locale?.language||void 0,images:o.length?o.map(({media_type:e,data:t})=>({media_type:e,data:t})):void 0,files:s.length?s.map(({name:e,data:t})=>({name:e,data:t})):void 0,page:c},{resubscribe:!1});this.keepOrDrop(u,e)}catch(t){if(u!==this.gen)return;this.running=!1,this.items=f.items,this.editAt=f.editAt,e===void 0&&(this.setText(f.draft),this.photos=f.photos,this.files=f.files),this.push({kind:`notice`,text:Lm(t),error:!0});return}await this.refreshList()}onEvent(e){switch(e.type){case`delta`:{let t=this.items[this.items.length-1];t?.kind===`assistant`?t.text+=e.text:this.items=[...this.items,{kind:`assistant`,text:e.text}],this.scheduleRender();return}case`tool_start`:this.push({kind:`tool`,id:e.call_id,name:e.name,args:e.args,status:`running`});return;case`approval`:this.patchTool(e.call_id,{status:`waiting`,approval:{summary:e.summary,reason:e.reason,risky:e.risky,diff:e.diff,phoneOnly:e.phone_only,phone:e.phone}},{kind:`tool`,id:e.call_id,name:e.name,args:e.args,status:`waiting`}),this.announce=e.phone_only?q(`announce_phone`):q(`announce_approval`);return;case`review_start`:this.patchTool(e.call_id,{reviewing:!0});return;case`review`:this.patchTool(e.call_id,{reviewing:!1,review:{decision:e.decision,reason:e.reason,model:e.model}});return;case`tool_result`:this.patchTool(e.call_id,{...e.review?{review:e.review}:{},...e.image?.startsWith(`data:image/`)?{image:e.image}:{},status:e.ok?`ok`:`error`,summary:e.summary,preview:e.preview,snapshotId:e.snapshot_id,approval:void 0}),this.push({kind:`assistant`,text:``});return;case`usage`:this.usage=e.usage;return;case`notice`:this.push({kind:`notice`,text:e.text,stop:e.stop});return;case`error`:this.push({kind:`notice`,text:e.message,error:!0}),this.announce=q(`announce_error`);return;case`done`:this.usage=e.usage,this.running=!1,this.announce=q(`announce_done`),this.items=this.items.filter(e=>!(e.kind===`assistant`&&!e.text)),queueMicrotask(()=>{wt(),this.focusComposer()}),this.detach(),this.refreshList().then(()=>{this.chatTitle=this.convs.find(e=>e.id===this.convId)?.title??this.chatTitle});return}}scheduleRender(){this.renderTimer===void 0&&(this.renderTimer=window.setTimeout(()=>{this.renderTimer=void 0;let e=this.items.length;e&&(this.items=[...this.items.slice(0,-1),{...this.items[e-1]}])},80))}push(e){let t=this.items.filter(e=>!(e.kind===`assistant`&&!e.text));this.items=[...t,e]}patchTool(e,t,n){let r=!1;this.items=this.items.map(n=>n.kind===`tool`&&n.id===e?(r=!0,{...n,...t}):n),!r&&n&&this.push({...n,...t})}async answer(e,t){let n=this.shadowRoot.querySelector(`#note-${CSS.escape(e)}`)?.value??``,r=this.items.find(t=>t.kind===`tool`&&t.id===e),i=r?{status:r.status,approval:r.approval}:void 0;this.patchTool(e,{status:`running`,approval:void 0});try{await this.ws.sendMessagePromise({type:`llm_agent/approve`,conversation_id:this.convId,call_id:e,approved:t,note:n})}catch(t){i&&this.patchTool(e,i),this.push({kind:`notice`,text:Lm(t),error:!0})}}async undo(e){if(e.snapshotId&&confirm(q(`confirm_undo`,{name:e.summary||e.name})))try{let t=await this.ws.sendMessagePromise({type:`llm_agent/undo`,snapshot_id:e.snapshotId,...this.convId?{conversation_id:this.convId}:{}});this.patchTool(e.id,{undone:!0}),this.push({kind:`notice`,text:q(`undone_notice`,{summary:t.summary})})}catch(e){this.push({kind:`notice`,text:Lm(e),error:!0})}}async stop(){this.convId&&await this.ws.sendMessagePromise({type:`llm_agent/cancel`,conversation_id:this.convId})}async loadModels(){let e=this.providerId;if(!(!e||e in this.fetched||this.loadingModels.has(e))){this.loadingModels.add(e);try{let t=await this.ws.sendMessagePromise({type:`llm_agent/models`,provider_id:e});this.modelError=t.error??``,this.fetched={...this.fetched,[e]:t.models}}catch{}finally{this.loadingModels.delete(e)}}}get chatMode(){let e=this.mode||this.info?.approval_mode||`ask_risky`;return this.member&&jm.has(e)?`ask_risky`:e}async pickMode(e){let t=this.mode||this.info?.approval_mode||`ask_risky`;if(e===`planning`&&t!==`planning`&&(this.modeBefore=t),this.mode=e,this.convId&&!this.running)try{let t=await this.ws.sendMessagePromise({type:`llm_agent/conversations/mode`,conversation_id:this.convId,mode:e});this.modeBefore=t.mode_before_plan}catch(e){this.push({kind:`notice`,text:Lm(e),error:!0})}}runPlan(e){let t=this.modeBefore&&this.modeBefore!==`planning`?this.modeBefore:`autopilot`;this.mode=t,this.modeBefore=null,this.setText(`${q(`run_plan_message`)}\n\n${e}`),this.send()}matchingModels(){let e=this.modelQuery.toLowerCase().split(/\s+/).filter(Boolean),t=(this.fetched[this.providerId]??this.provider?.models??[]).filter(t=>{let n=`${t.id} ${t.label}`.toLowerCase();return e.every(e=>n.includes(e))});return[...t.filter(e=>e.suggested),...t.filter(e=>!e.suggested)]}pickModel(e){this.model=e,this.modelInput&&(this.modelInput.value=e),this.modelOpen=!1,this.modelQuery=``,this.modelIndex=-1}modelKey(e){let t=this.matchingModels().slice(0,Nm);if(e.key===`ArrowDown`||e.key===`ArrowUp`){if(e.preventDefault(),this.modelOpen=!0,!t.length)return;let n=e.key===`ArrowDown`?1:-1;this.modelIndex=(this.modelIndex+n+t.length)%t.length,this.shadowRoot?.getElementById(`model-opt-${this.modelIndex}`)?.scrollIntoView({block:`nearest`})}else if(e.key===`Enter`){e.preventDefault();let n=this.modelOpen&&this.modelIndex>=0?t[this.modelIndex]:void 0;this.pickModel(n?n.id:e.target.value.trim()||this.model)}else e.key===`Escape`&&this.modelOpen&&(e.preventDefault(),e.stopPropagation(),this.pickModel(this.model))}continueTurn(e=!1){this.setText(q(`continue_message`)),this.send(void 0,e)}edit(e){let t=this.items[e];t?.kind===`user`&&(this.editAt=e,this.clearAttachments(),this.photos=t.images??[],this.files=(t.files??[]).filter(e=>e.data),t.photos&&!t.images&&this.photosNotKept(),t.files?.some(e=>!e.data)&&this.push({kind:`notice`,text:q(`files_not_kept`)}),this.setText(t.text),this.input.focus())}cancelEdit(){this.editAt=-1,this.clearAttachments(),this.setText(tm(this.draftKey,this.convId))}async onPick(e){let t=e.target,n=[...t.files??[]];t.value=``,await this.addFiles(n)}async onPaste(e){let t=[...e.clipboardData?.files??[]];t.length&&(e.preventDefault(),await this.addFiles(t))}onDragOver(e){if(!e.dataTransfer?.types.includes(`Files`))return;e.preventDefault();let t=this.running||this.showChanges;e.dataTransfer.dropEffect=t?`none`:`copy`,this.dragging=!t}onDragLeave(e){let t=e.relatedTarget;t&&e.currentTarget.contains(t)||(this.dragging=!1)}async onDrop(e){e.dataTransfer?.types.includes(`Files`)&&(e.preventDefault(),this.dragging=!1,!this.running&&!this.showChanges&&await this.addFiles([...e.dataTransfer.files]))}async addFiles(e){let t=e.filter(Gm);t.length&&await this.addPhotos(t);let n=this.photoGen;for(let t of e.filter(e=>!Gm(e))){let e=t.name||q(`that_file`),r=(t,n={})=>this.push({kind:`notice`,text:q(t,{name:e,...n}),error:!0});if(this.files.length>=Vm){r(`too_many_files`,{count:Vm});return}if(t.size>Hm){r(`file_too_large`,{limit:qm(Hm)});continue}if(this.payload()+Km(t.size)>Um){r(`files_over_total`);continue}let i;try{i=await Xm(t)}catch{r(`file_unreadable`);continue}if(n!==this.photoGen)return;i?this.payload()+(i.data?.length??0)>Um?r(`files_over_total`):this.files=[...this.files,i]:r(`file_unsupported`)}}payload(){return this.photos.reduce((e,t)=>e+t.data.length,0)+this.files.reduce((e,t)=>e+(t.data?.length??0),0)}photosNotKept(){this.push({kind:`notice`,text:q(`photos_not_kept`)})}async addPhotos(e){let t=this.photoGen;for(let n of e){if(this.photos.length>=Bm)break;try{let e=await $m(n);if(t!==this.photoGen||this.photos.length>=Bm)return;this.photos=[...this.photos,e]}catch{this.push({kind:`notice`,text:q(`photo_unreadable`,{name:n.name||q(`that_picture`)}),error:!0})}}}onKey(e){if(this.mentions.length&&!e.isComposing){let t=this.mentions.length;if(e.key===`ArrowDown`||e.key===`ArrowUp`){e.preventDefault(),this.mentionIndex=(this.mentionIndex+(e.key===`ArrowDown`?1:t-1))%t;return}if(e.key===`Enter`||e.key===`Tab`){e.preventDefault(),this.pickMention(this.mentions[this.mentionIndex]);return}if(e.key===`Escape`){e.preventDefault(),this.mentions=[];return}}if(e.key===`ArrowUp`&&!e.isComposing&&!this.input?.value&&!this.running&&this.editAt<0&&this.convId){let t=this.lastUserIndex();t>=0&&(e.preventDefault(),this.edit(t))}else if(e.key===`Enter`&&!e.shiftKey&&!e.isComposing){let t=e.ctrlKey||e.metaKey;if(this.prefs.send===`ctrl`&&!t||!t&&this.input&&hl(this.input.value,this.input.selectionStart))return;e.preventDefault(),this.send()}}onInput(){this.stored(this.composed),this.updateMentions()}updateMentions(){let e=this.input,t=this.hass;if(!e||!t)return;let n=e.value.slice(0,e.selectionStart??e.value.length),r=/(^|\s)@([^\s@]*)$/.exec(n);r?(this.mentionStart=n.length-r[2].length-1,this.mentions=pm(t,r[2]),this.mentionIndex=0):this.mentions=[]}pickMention(e){let t=this.input,n=t.selectionStart??t.value.length,r=t.value,i=`@${this.picked.add(e.label,e.insert)} `;t.setMentions(this.picked.labels()),t.value=r.slice(0,this.mentionStart)+i+r.slice(n),this.stored(this.composed);let a=this.mentionStart+i.length;t.setSelectionRange(a,a),this.mentions=[],t.focus()}onScroll(){let e=this.scroller;e&&(this.stickToBottom=e.scrollHeight-e.scrollTop-e.clientHeight<40)}pickProvider(e){this.providerId=e.target.value,this.model=this.provider?.default_model??``}#t;#n;#r;renderPanel(){this.#t=Ca(()=>this.hass,e=>e.user),this.#n=gi(()=>fm(this.hass,this.member),{equals:(e,t)=>JSON.stringify(e)===JSON.stringify(t)}),this.#r=gi(()=>this.convId?this.lastUserIndex():-1);let e=Ca(()=>this.hass,e=>e.locale?.language),t=!0;yi(()=>e(),e=>{t?t=!1:Na(e)}),yi(()=>this.placeholder(),e=>this.input?.setPlaceholder(e));let n=this;return V(()=>V(()=>!n.loadError)()?L(z,{get when(){return!(n.info&&!n.info.providers.length)},get fallback(){var e=yf();return W(e,()=>q(`no_provider`)),e},get children(){return n.renderLayout()}}):(()=>{var e=yf();return W(e,()=>q(`load_error`,{error:n.loadError})),e})())}watchMessages(e){this.scroller=e;let t=()=>{this.stickToBottom&&(e.scrollTop=e.scrollHeight)},n=new ResizeObserver(t);n.observe(e),queueMicrotask(()=>new MutationObserver(r=>{for(let t of r)if(t.target===e)for(let e of t.removedNodes)e instanceof Element&&n.unobserve(e);for(let t of e.children)n.observe(t);t(),this.addCopyButtons()}).observe(this.shadowRoot,{childList:!0,subtree:!0,characterData:!0,attributes:!0}))}placeholder(){return this.slim?q(`composer_placeholder`):`${q(`composer_placeholder`)} (${q(this.prefs.send===`ctrl`?`keys_ctrl`:`keys_enter`)})`}listOpen(){return this.slim?this.showList:this.prefs.listOpen}renderLayout(){let e=(e,t,n,r)=>{let i=this;return(()=>{var a=bf(),o=a.firstChild;return a._$$click=()=>{i.showChanges=!(i.showChanges&&i.view===e),i.view=e},U(o,`icon`,r),o._$owner=D(),B(()=>({e:q(t),t:q(n),a:Rm(i.showChanges&&i.view===e)}),({e,t,a:n},r)=>{e!==r?.e&&U(a,`title`,e),t!==r?.t&&U(a,`aria-label`,t),n!==r?.a&&U(a,`aria-pressed`,n)}),a})()},t=this;var n=wf(),r=n.firstChild,i=r.nextSibling,a=i.firstChild,o=a.firstChild,s=o.nextSibling,c=s.firstChild,l=s.nextSibling.nextSibling,u=l.nextSibling.nextSibling,d=u.nextSibling.nextSibling,f=d.nextSibling.nextSibling,p=f.nextSibling.nextSibling,m=p.nextSibling.nextSibling,h=m.nextSibling.nextSibling,g=h.firstChild,_=h.nextSibling.nextSibling,v=a.nextSibling.nextSibling,y=v.nextSibling.nextSibling,b=y.nextSibling.nextSibling,x=b.firstChild,S=x.nextSibling,C=b.nextSibling.nextSibling,ee=i.nextSibling.nextSibling;return n._$$keydown=e=>{e.key===`Escape`&&(t.running&&!e.defaultPrevented&&!e.isComposing&&!t.showPrefs&&(e.preventDefault(),t.stop()),t.showPrefs&&e.preventDefault(),t.showPrefs=!1)},n._$$click=e=>t.closePrefsOutside(e),W(n,L(z,{get when(){return t.listOpen()},get children(){return t.renderList()}}),r),i.addEventListener(`drop`,e=>void t.onDrop(e)),i.addEventListener(`dragleave`,e=>t.onDragLeave(e)),i.addEventListener(`dragover`,e=>t.onDragOver(e)),W(a,(()=>{var e=V(()=>!t.embedded);return()=>e()?(()=>{var e=Tf();return e._$owner=D(),B(()=>({e:t.hass,t:t.narrow}),({e:t,t:n},r)=>{t!==r?.e&&(e.hass=t),n!==r?.t&&(e.narrow=n)}),e})():void 0})(),o),s._$$click=()=>t.slim?t.showList=!t.showList:t.setPref(`listOpen`,!t.prefs.listOpen),c._$owner=D(),W(l,(()=>{var e=V(()=>!!t.showChanges);return()=>e()?q(t.view===`notes`?`home_notes`:t.view):Sm(t.chatTitle)})()),W(a,(()=>{var e=V(()=>!!t.items.length);return()=>e()?(()=>{var e=Ef(),n=e.firstChild;return e._$$click=()=>t.exportChat(),n._$owner=D(),B(()=>({e:q(`export_title`),t:q(`export`)}),({e:t,t:n},r)=>{t!==r?.e&&U(e,`title`,t),n!==r?.t&&U(e,`aria-label`,n)}),e})():void 0})(),u),W(a,(()=>{var e=V(()=>!t.listOpen());return()=>e()?(()=>{var e=Df(),n=e.firstChild;return e._$$click=()=>t.newChat(),n._$owner=D(),B(()=>({e:q(`new_chat`),t:q(`new_chat`)}),({e:t,t:n},r)=>{t!==r?.e&&U(e,`title`,t),n!==r?.t&&U(e,`aria-label`,n)}),e})():void 0})(),d),W(a,L(z,{get when(){return!t.member},get children(){return e(`notes`,`home_notes`,`home_notes`,`mdi:notebook-outline`)}}),f),W(a,L(z,{get when(){return!t.member},get children(){return e(`changes`,`changes_title`,`changes`,`mdi:history`)}}),p),W(a,L(z,{get when(){return!t.member},get children(){return e(`usage`,`usage_view_title`,`usage`,`mdi:chart-bar`)}}),m),h._$$click=()=>t.showPrefs=!t.showPrefs,g._$owner=D(),W(a,L(z,{get when(){return t.showPrefs},get children(){return t.renderPrefs()}}),_),W(i,L(xi,{get children(){return[L(Si,{get when(){return V(()=>!!t.showChanges)()?t.view===`notes`:t.showChanges},get children(){var e=xf();return e._$owner=D(),B(()=>t.hass,t=>{e.hass=t}),e}}),L(Si,{get when(){return V(()=>!!t.showChanges)()?t.view===`usage`:t.showChanges},get children(){var e=Sf();return e._$owner=D(),B(()=>t.hass,t=>{e.hass=t}),e}}),L(Si,{get when(){return t.showChanges},get children(){var e=Cf();return ra(()=>e=>e.addEventListener(`open-chat`,e=>void t.open(e.detail)),e),e._$owner=D(),B(()=>t.hass,t=>{e.hass=t}),e}})]}}),v),W(y,()=>t.announce),b.addEventListener(`scroll`,()=>t.onScroll()),ra(()=>e=>t.watchMessages(e),b),W(b,L(z,{get when(){return!t.items.length},get children(){return t.renderWelcome()}}),x),W(b,L(R,{get each(){return t.items},keyed:!1,children:(e,n)=>t.renderItem(e,n)}),S),W(i,()=>t.renderComposer(),C),W(n,(()=>{var e=V(()=>!!t.showSettings);return()=>e()?(()=>{var e=Of();return ra(()=>e=>{e.addEventListener(`close`,()=>t.showSettings=!1),e.addEventListener(`reloaded`,()=>void t.reloaded())},e),e._$owner=D(),B(()=>t.hass,t=>{e.hass=t}),e})():void 0})(),ee),B(()=>({e:`layout ${t.slim?`narrow`:``}`,t:ta(t.showChanges?`changes`:``),a:t.listOpen()?q(`hide_chats`):q(`show_chats`),o:q(`conversations`),i:Rm(t.listOpen()),n:t.slim?`mdi:forum-outline`:`mdi:dock-left`,s:q(`panel_settings`),h:q(`panel_settings`),r:Rm(t.showPrefs),d:q(`conversation`)}),({e,t,a:r,o:a,i:o,n:l,s:u,h:d,r:f,d:p},m)=>{$i(n,e,m?.e),$i(i,t,m?.t),r!==m?.a&&U(s,`title`,r),a!==m?.o&&U(s,`aria-label`,a),o!==m?.i&&U(s,`aria-expanded`,o),l!==m?.n&&U(c,`icon`,l),u!==m?.s&&U(h,`title`,u),d!==m?.h&&U(h,`aria-label`,d),f!==m?.r&&U(h,`aria-expanded`,f),p!==m?.d&&U(b,`aria-label`,p)}),n}onSearch(e){this.query=e.target.value,clearTimeout(this.searchTimer),this.query.trim()?this.searchTimer=window.setTimeout(async()=>{let e=this.query,t=await this.ws.sendMessagePromise({type:`llm_agent/conversations/search`,query:e});e===this.query&&(this.hits=t.conversations)},300):this.hits=null}exportChat(){let e=mm(this.chatTitle,this.items),t=URL.createObjectURL(new Blob([e],{type:`text/markdown`})),n=document.createElement(`a`);n.href=t,n.download=`${hm(this.chatTitle)||`chat`}.md`,n.click(),URL.revokeObjectURL(t)}renderList(){let e=this;var t=kf(),n=t.firstChild,r=n.firstChild,i=r.firstChild.firstChild,a=r.nextSibling.nextSibling,o=a.firstChild,s=n.nextSibling.nextSibling,c=s.firstChild,l=c.nextSibling.nextSibling,u=s.nextSibling.nextSibling,d=u.firstChild,f=d.nextSibling,p=f.nextSibling.nextSibling;return i._$owner=D(),a._$$click=()=>e.newChat(),o._$owner=D(),c._$owner=D(),l._$$input=t=>e.onSearch(t),W(u,(()=>{var t=V(()=>!(!e.hits||e.hits.length));return()=>t()?(()=>{var e=Af();return W(e,()=>q(`no_matches`)),e})():void 0})(),d),W(u,(()=>{var t=V(()=>!(e.hits||e.convs.length));return()=>t()?(()=>{var e=Af();return W(e,()=>q(`no_chats`)),e})():void 0})(),f),W(u,L(R,{get each(){return Tm(e.hits??e.convs,!!e.hits)},children:([t,n])=>[` `,t?(()=>{var e=jf();return W(e,()=>q(t)),e})():void 0,` `,L(R,{each:n,children:t=>(()=>{var n=Mf(),r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=a.nextSibling,s=r.nextSibling.nextSibling,c=s.firstChild;return n._$$click=()=>void e.open(t.id),W(r,(()=>{var e=V(()=>t.source===`action`);return()=>e()?(()=>{var e=Nf();return e._$owner=D(),B(()=>q(`started_by_automation`),t=>{U(e,`title`,t)}),e})():void 0})(),i),W(r,()=>Sm(t.title),a),W(r,(()=>{var e=V(()=>!!(t.snippet&&t.snippet!==t.title));return()=>e()?(()=>{var e=Pf();return W(e,()=>t.snippet),e})():void 0})(),o),s._$$click=n=>void e.removeConv(t.id,n),c._$owner=D(),B(()=>({e:`conv ${t.id===e.convId?`active`:``}`,t:q(`delete`),a:q(`delete_chat`)}),({e,t,a:r},i)=>{$i(n,e,i?.e),t!==i?.t&&U(s,`title`,t),r!==i?.a&&U(s,`aria-label`,r)}),n})()}),` `]}),p),B(()=>({e:q(`new_chat`),t:q(`new_chat`),a:q(`search_chats`),o:q(`search_chats`),i:e.query,n:Ci()}),({e,t,a:n,o:r,i,n:o},s)=>{e!==s?.e&&U(a,`title`,e),t!==s?.t&&U(a,`aria-label`,t),n!==s?.a&&U(l,`placeholder`,n),r!==s?.o&&U(l,`aria-label`,r),(i!==s?.i||!o)&&(l.value=i??``)}),t}closePrefsOutside(e){this.showPrefs&&(e.composedPath().some(e=>e instanceof HTMLElement&&(e.classList.contains(`prefs`)||e.classList.contains(`gear`)))||(this.showPrefs=!1))}renderPrefs(){let e=(e,t,n)=>{let r=this;return(()=>{var i=Ff(),a=i.firstChild,o=a.nextSibling;return W(i,t,a),o.addEventListener(`change`,t=>r.setPref(e,t.target.value)),W(o,()=>n.map(([t,n])=>(()=>{var i=If();return W(i,n),B(()=>({e:String(t),t:r.prefs[e]===t,a:Ci()}),({e,t,a:n},r)=>{(e!==r?.e||!n)&&(i.value=e),(t!==r?.t||!n)&&(i.selected=t)}),i})())),i})()},t=(e,t)=>{let n=this;return(()=>{var r=Lf(),i=r.firstChild;return i.addEventListener(`change`,t=>n.setPref(e,t.target.checked)),W(r,t,null),B(()=>n.prefs[e],e=>{i.checked=e}),r})()},n=()=>this.info?.my_default,r=()=>{let e=n();return e?`${this.info?.providers.find(t=>t.id===e.provider_id)?.name??`?`} \u00b7 ${e.model||q(`model_provider_default`)}`:``},i=this;var a=Rf(),o=a.firstChild,s=o.nextSibling,c=s.nextSibling.nextSibling,l=c.nextSibling.nextSibling,u=l.nextSibling.nextSibling,d=u.nextSibling.nextSibling,f=d.nextSibling.nextSibling,p=f.nextSibling.nextSibling,m=p.nextSibling.nextSibling;return W(a,()=>e(`theme`,q(`theme`),[[`auto`,q(`theme_auto`)],[`light`,q(`theme_light`)],[`dark`,q(`theme_dark`)]]),o),W(a,()=>e(`size`,q(`text_size`),[[`small`,q(`size_small`)],[`normal`,q(`size_normal`)],[`large`,q(`size_large`)]]),s),W(a,()=>e(`send`,q(`send_with`),[[`enter`,`Enter`],[`ctrl`,`Ctrl+Enter`]]),c),W(a,()=>t(`compact`,q(`compact_layout`)),l),W(a,()=>t(`toolsOpen`,q(`expand_tools`)),u),W(a,()=>t(`showUsage`,q(`show_usage`)),d),W(a,(()=>{var e=V(()=>!i.member);return()=>e()?(()=>{var e=zf(),t=e.firstChild,a=t.nextSibling.nextSibling;return W(t,()=>q(`my_default`,{model:n()?r():q(`provider_default`)})),a._$$click=()=>void i.setMyDefault(),W(a,()=>q(`use_current_model`)),W(e,(()=>{var e=V(()=>!!n());return()=>e()?(()=>{var e=Bf();return e._$$click=()=>void i.setMyDefault(!0),W(e,()=>q(`clear`)),e})():void 0})(),null),e})():void 0})(),f),W(a,(()=>{var e=V(()=>!!i.admin);return()=>e()?(()=>{var e=Vf(),t=e.firstChild,n=t.nextSibling.nextSibling;return t._$$click=()=>{i.showPrefs=!1,i.showSettings=!0},W(t,()=>q(`integration_settings`)),ea(n,`click`,_d,!0),W(n,()=>q(`open_in_ha`)),e})():void 0})(),p),W(m,()=>q(`prefs_hint`)),B(()=>q(`panel_settings`),e=>{U(a,`aria-label`,e)}),a}renderWelcome(){let e=()=>this.#t()?.name?.split(` `)[0],t=this;var n=Hf(),r=n.firstChild,i=r.firstChild,a=r.nextSibling.nextSibling,o=a.nextSibling.nextSibling,s=o.nextSibling.nextSibling;return i._$owner=D(),W(a,(()=>{var t=V(()=>!!e());return()=>t()?q(`greeting_name`,{greeting:wm(),name:e()}):wm()})()),W(n,(()=>{var e=V(()=>!!t.member);return()=>e()?(()=>{var e=Uf();return W(e,()=>q(`welcome_member`)),e})():[(()=>{var e=Uf();return W(e,()=>q(`welcome_admin`)),e})(),` `,(()=>{var e=Wf(),n=e.firstChild;return n._$owner=D(),W(e,()=>Im(t.info?.approval_mode),null),e})()]})(),o),W(s,L(R,{get each(){return t.#n()},children:e=>[` `,(()=>{var n=Gf(),r=n.firstChild,i=r.nextSibling.nextSibling;return n._$$click=()=>{t.setText(e.text),t.input.focus()},r._$owner=D(),W(i,()=>e.text),B(()=>e.icon,e=>{U(r,`icon`,e)}),n})(),` `]})),n}renderItem(e,t){let n=()=>t===this.items.length-1,r=()=>{let n=e().kind;return n!==`user`&&n!==`notice`&&(t===0||this.items[t-1]?.kind===`user`)},i=()=>V(()=>V(()=>!!r())()?(()=>{var e=Kf(),t=e.firstChild;return t._$owner=D(),e})():void 0),a=()=>e(),o=()=>e(),s=()=>e(),c=()=>e(),l=gi(()=>e().kind===`user`?al(a().text):``),u=gi(()=>Sl(l(),this.hass)),d=this;return L(xi,{get children(){return[L(Si,{get when(){return e().kind===`user`},get children(){var e=qf(),n=e.firstChild,r=n.nextSibling,i=r.firstChild,o=i.nextSibling,s=r.nextSibling.nextSibling;return W(e,(()=>{var e=V(()=>!(!d.convId||d.running));return()=>e()?(()=>{var e=Qf(),n=e.firstChild,r=n.firstChild;return n._$$click=()=>d.edit(t),r._$owner=D(),W(e,(()=>{var e=V(()=>t===d.#r());return()=>e()?(()=>{var e=$f(),t=e.firstChild;return e._$$click=()=>void d.send(a().text),t._$owner=D(),B(()=>({e:q(`retry`),t:q(`retry`)}),({e:t,t:n},r)=>{t!==r?.e&&U(e,`title`,t),n!==r?.t&&U(e,`aria-label`,n)}),e})():void 0})(),null),B(()=>({e:q(`edit`),t:q(`edit`)}),({e,t},r)=>{e!==r?.e&&U(n,`title`,e),t!==r?.t&&U(n,`aria-label`,t)}),e})():void 0})(),n),W(r,()=>d.renderPhotos(a),i),W(r,()=>zm(u()),o),W(e,(()=>{var e=V(()=>!!a().page);return()=>e()?(()=>{var e=ep(),t=e.firstChild;return t._$owner=D(),W(e,()=>q(`page_sent`,{page:a().page}),null),e})():void 0})(),s),B(()=>`row user ${t===d.editAt?`edited`:``}`,(t,n)=>{$i(e,t,n)}),e}}),L(Si,{get when(){return V(()=>!(e().kind!==`assistant`||o().text||!n()))()?d.running:e().kind===`assistant`&&!o().text&&n()},get children(){var e=Jf(),t=e.firstChild;return W(e,i,t),e}}),L(Si,{get when(){return V(()=>e().kind===`assistant`)()&&o().text},get children(){var e=Yf(),t=e.firstChild,r=t.nextSibling,a=r.nextSibling.nextSibling,s=a.nextSibling.nextSibling;return W(e,i,t),W(e,(()=>{var e=V(()=>!(!n()||d.running||d.chatMode!==`planning`));return()=>e()?(()=>{var e=tp(),t=e.firstChild,n=t.firstChild;return t._$$click=()=>d.runPlan(o().text),n._$owner=D(),W(t,()=>q(`run_plan`),null),e})():void 0})(),a),W(e,(()=>{var e=V(()=>!(n()&&d.running));return()=>e()?(()=>{var e=np(),t=e.firstChild,n=t.firstChild;return t._$$click=e=>void d.copy(o().text,e.currentTarget),n._$owner=D(),B(()=>({e:q(`copy`),t:q(`copy`)}),({e,t:n},r)=>{e!==r?.e&&U(t,`title`,e),n!==r?.t&&U(t,`aria-label`,n)}),e})():void 0})(),s),B(()=>al(o().text,!(n()&&d.running)),e=>{r.innerHTML=e}),e}}),L(Si,{get when(){return e().kind===`notice`},get children(){var e=Xf(),t=e.firstChild,r=t.nextSibling;return W(e,()=>s().text,t),W(e,(()=>{var e=V(()=>!!(n()&&!d.running&&s().stop&&gm.has(s().stop)));return()=>e()?(()=>{var e=rp();return e._$$click=()=>d.continueTurn(s().stop===`spend_cap`),W(e,(()=>{var e=V(()=>s().stop===`spend_cap`);return()=>e()?q(`continue_anyway`):q(`continue`)})()),e})():void 0})(),r),B(()=>`notice ${s().error?`error`:``}`,(t,n)=>{$i(e,t,n)}),e}}),L(Si,{get when(){return e().kind===`tool`},get children(){var e=Zf(),t=e.firstChild,n=t.nextSibling;return W(e,i,t),W(e,()=>d.renderTool(c),n),e}})]}})}renderPreview(e){let t=()=>{let t=e().args?.config;return t&&typeof t==`object`?t:void 0},n=()=>this.previews.has(e().id),r=this;return V(()=>V(()=>!!t())()?(()=>{var i=ip(),a=i.firstChild,o=a.firstChild;return a._$$click=()=>{let t=new Set(r.previews);n()?t.delete(e().id):t.add(e().id),r.previews=t},o._$owner=D(),W(a,(()=>{var e=V(()=>!!n());return()=>e()?q(`hide_preview`):q(`preview_dashboard`)})(),null),W(i,(()=>{var e=V(()=>!!n());return()=>e()?(()=>{var e=ap();return e._$owner=D(),B(()=>({e:r.hass,t:t()}),({e:t,t:n},r)=>{t!==r?.e&&(e.hass=t),n!==r?.t&&(e.config=n)}),e})():void 0})(),null),B(()=>n()?`mdi:eye-off-outline`:`mdi:eye-outline`,e=>{U(o,`icon`,e)}),i})():void 0)}renderNoteSuggestion(e){let t=()=>(e().approval?.diff??``).replace(/\n+$/,``).split(`
`),n=()=>t().filter(e=>e.startsWith(`+`)&&!e.startsWith(`+++`)).map(e=>e.slice(1)).filter(e=>e.trim()),r=()=>t().filter(e=>e.startsWith(`-`)&&!e.startsWith(`---`)).map(e=>e.slice(1)).filter(e=>e.trim()),i=()=>{this.noteTick;let t=e().id,n=this.noteCardSince.get(t);return n===void 0&&(n=Date.now(),this.noteCardSince.set(t,n),setTimeout(()=>this.noteTick++,dm+50)),Date.now()-n>=dm},a=this;var o=op(),s=o.firstChild,c=s.firstChild,l=c.nextSibling.nextSibling.firstChild,u=l.nextSibling.nextSibling,d=s.nextSibling.nextSibling,f=d.nextSibling.nextSibling,p=f.nextSibling.nextSibling.firstChild,m=p.nextSibling.nextSibling;return c._$owner=D(),W(l,()=>q(`note_question`)),W(u,()=>q(`note_explain`)),W(o,(()=>{var e=V(()=>!!n().length);return()=>e()?(()=>{var e=sp(),t=e.firstChild.nextSibling;return W(e,L(R,{get each(){return n()},children:e=>(()=>{var t=cp();return W(t,e),t})()}),t),e})():void 0})(),d),W(o,(()=>{var e=V(()=>!!r().length);return()=>e()?[(()=>{var e=lp();return W(e,()=>q(`forget`)),e})(),` `,(()=>{var e=up(),t=e.firstChild.nextSibling;return W(e,L(R,{get each(){return r()},children:e=>(()=>{var t=cp();return W(t,e),t})()}),t),e})()]:void 0})(),f),p._$$click=()=>void a.answer(e().id,!1),W(p,()=>q(`note_no`)),m._$$click=()=>void a.answer(e().id,!0),W(m,()=>q(`save_to_notes`)),B(()=>({e:q(`suggested_note`),t:!i(),a:i()?q(`note_save_title`):q(`read_it_first`)}),({e,t,a:n},r)=>{e!==r?.e&&U(o,`aria-label`,e),t!==r?.t&&U(m,`disabled`,t),n!==r?.a&&U(m,`title`,n)}),o}renderTool(e){let t=()=>e().approval,n=()=>{switch(e().status){case`running`:var t=dp();return B(()=>q(`running`),e=>{U(t,`aria-label`,e)}),t;case`ok`:var n=fp();return n._$owner=D(),B(()=>q(`done`),e=>{U(n,`aria-label`,e)}),n;case`error`:var r=pp();return r._$owner=D(),B(()=>q(`failed`),e=>{U(r,`aria-label`,e)}),r;case`waiting`:var i=mp();return W(i,()=>q(`waiting_for_you`)),i}},r=this;return V(()=>V(()=>!(t()&&!t().phoneOnly&&e().name===`change_home_note`))()?(()=>{var i=hp(),a=i.firstChild,o=a.nextSibling,s=o.firstChild,c=s.firstChild,l=c.firstChild,u=c.nextSibling.nextSibling,d=u.nextSibling.nextSibling,f=d.nextSibling.nextSibling,p=f.nextSibling.nextSibling,m=p.nextSibling.nextSibling,h=m.nextSibling.nextSibling,g=h.nextSibling.nextSibling,_=s.nextSibling.nextSibling,v=_.nextSibling.nextSibling,y=v.nextSibling.nextSibling,b=y.nextSibling.nextSibling,x=b.nextSibling.nextSibling,S=o.nextSibling.nextSibling,C=S.nextSibling.nextSibling;return W(i,L(z,{get when(){return t()},children:e=>(()=>{var t=gp(),n=t.firstChild,r=n.nextSibling.nextSibling,i=r.firstChild,a=i.nextSibling;return n._$owner=D(),W(r,()=>q(`needs_approval`),i),W(r,(()=>{var t=V(()=>!!e().reason);return()=>t()?(()=>{var t=_p();return W(t,()=>e().reason,null),t})():void 0})(),a),B(()=>e().risky?`mdi:shield-alert-outline`:`mdi:hand-back-right-outline`,e=>{U(n,`icon`,e)}),t})()}),a),l._$owner=D(),W(u,()=>Em(e().name)),W(d,()=>t()?.summary??e().summary??Dm(e().args)),W(s,(()=>{var t=V(()=>!!e().undone);return()=>t()?(()=>{var e=vp();return W(e,()=>q(`undone`)),e})():void 0})(),f),W(s,()=>ym(e().review,e().reviewing),p),W(s,n,m),W(s,(()=>{var t=V(()=>!(!e().snapshotId||e().undone||e().status!==`ok`||r.member));return()=>t()?(()=>{var t=yp();return t._$$click=t=>{t.preventDefault(),t.stopPropagation(),r.undo(e())},W(t,()=>q(`undo`)),B(()=>q(`undo_title`),e=>{U(t,`title`,e)}),t})():void 0})(),h),g._$owner=D(),W(o,L(z,{get when(){return e().review},children:e=>(()=>{var t=bp(),n=t.firstChild,r=n.nextSibling.nextSibling,i=r.firstChild,a=i.firstChild;return n._$owner=D(),W(i,(()=>{var t=V(()=>!!e().model);return()=>t()?q(`reviewer_model`,{model:e().model}):q(`reviewer`)})(),a),W(r,()=>e().reason||q(vm[e().decision]),null),B(()=>`review-note ${e().decision}`,(e,n)=>{$i(t,e,n)}),t})()}),_),W(o,(()=>{var e=V(()=>!!t()?.diff);return()=>e()?(()=>{var e=xp();return W(e,()=>bm(t().diff)),e})():void 0})(),v),W(o,L(z,{get when(){return V(()=>!!t())()?e().name===`save_dashboard`:t()},get children(){return r.renderPreview(e)}}),y),W(o,()=>r.renderArgs(e().args,!!t()?.diff),b),W(o,(()=>{var n=V(()=>!(!e().preview||t()));return()=>n()?(()=>{var t=Sp();return W(t,()=>e().preview),t})():void 0})(),x),W(i,(()=>{var t=V(()=>!!e().image);return()=>t()?(()=>{var t=Cp();return B(()=>({e:e().image,t:q(`camera_snapshot`)}),({e,t:n},r)=>{e!==r?.e&&U(t,`src`,e),n!==r?.t&&U(t,`alt`,n)}),t})():void 0})(),S),W(i,(()=>{var n=V(()=>!!t()?.phoneOnly);return()=>n()?(()=>{var e=wp(),t=e.firstChild;return t._$owner=D(),W(e,()=>q(`phone_wait`),null),e})():L(z,{get when(){return t()},get children(){var t=Tp(),n=t.firstChild,i=n.nextSibling.nextSibling,a=i.nextSibling.nextSibling;return i._$$click=()=>void r.answer(e().id,!1),W(i,()=>q(`deny`)),a._$$click=()=>void r.answer(e().id,!0),W(a,()=>q(`approve`)),B(()=>({e:`note-${e().id}`,t:q(`approval_note`),a:q(`approval_note`)}),({e,t,a:r},i)=>{e!==i?.e&&U(n,`id`,e),t!==i?.t&&U(n,`placeholder`,t),r!==i?.a&&U(n,`aria-label`,r)}),t}})})(),C),B(()=>({e:`tool ${e().status} ${t()?.risky?`risky`:``}`,t:!!t()||r.prefs.toolsOpen,a:xm(e().name)}),({e,t,a:n},r)=>{$i(i,e,r?.e),t!==r?.t&&U(o,`open`,t),n!==r?.a&&U(l,`icon`,n)}),i})():r.renderNoteSuggestion(e))}renderPhotos(e){let t=()=>{let t=this;return V(()=>V(()=>!!e().files?.length)()?(()=>{var n=Ep();return W(n,L(R,{get each(){return e().files},children:e=>t.renderFile(e)})),n})():void 0)};return L(xi,{get fallback(){return t()},get children(){return[L(Si,{get when(){return e().images?.length},get children(){return[(()=>{var t=Dp();return W(t,L(R,{get each(){return e().images},children:e=>(()=>{var t=kp();return B(()=>({e:e.url,t:q(`your_photo`)}),({e,t:n},r)=>{e!==r?.e&&U(t,`src`,e),n!==r?.t&&U(t,`alt`,n)}),t})()})),t})(),V(()=>t())]}}),L(Si,{get when(){return e().photos},get children(){return[(()=>{var t=Op(),n=t.firstChild,r=n.nextSibling,i=r.nextSibling;return n._$owner=D(),W(t,()=>Cm(e().photos),r),W(t,()=>q(`not_kept`),i),t})(),V(()=>t())]}})]}})}renderFile(e,t){var n=Ap(),r=n.firstChild,i=r.nextSibling.nextSibling,a=i.nextSibling.nextSibling,o=a.firstChild,s=o.nextSibling;return r._$owner=D(),W(i,()=>e.name),W(a,()=>Jm(e),o),W(a,()=>qm(e.size),s),W(n,t?(()=>{var n=jp(),r=n.firstChild;return ea(n,`click`,t,!0),r._$owner=D(),B(()=>({e:q(`remove_file`),t:`${q(`remove_file`)}: ${e.name}`}),({e,t},r)=>{e!==r?.e&&U(n,`title`,e),t!==r?.t&&U(n,`aria-label`,t)}),n})():null,null),B(()=>({e:e.name,t:Wm[e.kind]}),({e,t},i)=>{e!==i?.e&&U(n,`title`,e),t!==i?.t&&U(r,`icon`,t)}),n}renderComposer(){let e=()=>this.usage,t=()=>this.matchingModels(),n=this;var r=Mp(),i=r.firstChild,a=i.nextSibling,o=a.firstChild,s=o.nextSibling.nextSibling,c=s.nextSibling.nextSibling,l=c.nextSibling.nextSibling,u=l.nextSibling.nextSibling,d=u.firstChild,f=d.firstChild,p=f.nextSibling.nextSibling,m=d.nextSibling.nextSibling,h=m.firstChild,g=h.nextSibling.nextSibling,_=g.firstChild.nextSibling,v=m.nextSibling.nextSibling,y=v.nextSibling.nextSibling,b=y.nextSibling.nextSibling.nextSibling.nextSibling,x=a.nextSibling.nextSibling,S=x.firstChild,C=S.nextSibling,ee=C.firstChild,w=ee.nextSibling,T=w.nextSibling.nextSibling,E=T.nextSibling.nextSibling;return W(r,L(z,{get when(){return n.pageContext},children:e=>(()=>{var t=Np(),r=t.firstChild,i=r.nextSibling.nextSibling;return t._$$click=()=>n.pageOff=!n.pageOff,r._$owner=D(),W(i,()=>q(`page_chip`,{page:e().summary})),B(()=>({e:`page-chip ${n.pageOff?`off`:``}`,t:Rm(!n.pageOff),a:`${e().path}\n${q(n.pageOff?`page_chip_off`:`page_chip_on`)}`,o:n.pageOff?`mdi:file-remove-outline`:`mdi:file-eye-outline`}),({e,t:n,a:i,o:a},o)=>{$i(t,e,o?.e),n!==o?.t&&U(t,`aria-pressed`,n),i!==o?.a&&U(t,`title`,i),a!==o?.o&&U(r,`icon`,a)}),t})()}),i),ra(()=>e=>{n.source=e,queueMicrotask(()=>n.attachBox())},o),W(a,(()=>{var e=V(()=>!!n.mentions.length);return()=>e()?(()=>{var e=Pp(),t=e.firstChild.nextSibling;return W(e,L(R,{get each(){return n.mentions},children:(e,t)=>(()=>{var r=Fp(),i=r.firstChild,a=i.nextSibling.nextSibling,o=a.nextSibling.nextSibling;return r._$$mousedown=t=>{t.preventDefault(),n.pickMention(e)},W(i,()=>e.kind),W(a,()=>e.label),W(o,()=>e.detail),B(()=>({e:Rm(t()===n.mentionIndex),t:ta(t()===n.mentionIndex?`active`:``)}),({e,t},n)=>{e!==n?.e&&U(r,`aria-selected`,e),$i(r,t,n?.t)}),r})()}),t),e})():void 0})(),s),W(a,(()=>{var e=V(()=>!!n.photos.length);return()=>e()?(()=>{var e=Ip(),t=e.firstChild.nextSibling;return W(e,L(R,{get each(){return n.photos},children:(e,t)=>(()=>{var r=Lp(),i=r.firstChild,a=i.nextSibling.nextSibling,o=a.firstChild;return a._$$click=()=>n.photos=n.photos.filter((e,n)=>n!==t()),o._$owner=D(),B(()=>({e:e.url,t:q(`photo_to_send`),a:q(`remove_photo`),o:q(`remove_photo`)}),({e,t,a:n,o:r},o)=>{e!==o?.e&&U(i,`src`,e),t!==o?.t&&U(i,`alt`,t),n!==o?.a&&U(a,`title`,n),r!==o?.o&&U(a,`aria-label`,r)}),r})()}),t),e})():void 0})(),c),W(a,(()=>{var e=V(()=>!!n.files.length);return()=>e()?(()=>{var e=Rp(),t=e.firstChild.nextSibling;return W(e,L(R,{get each(){return n.files},children:(e,t)=>n.renderFile(e,()=>{n.files=n.files.filter((e,n)=>n!==t())})}),t),e})():void 0})(),l),f._$owner=D(),p.addEventListener(`change`,e=>void n.onPick(e)),h._$owner=D(),g.addEventListener(`change`,e=>void n.pickMode(e.target.value)),W(g,L(R,{get each(){return n.member?Am:km},children:e=>(()=>{var t=If();return t.value=e,W(t,()=>Pm(e)),B(()=>e===n.chatMode,e=>{t.selected=e}),t})()}),_),W(u,(()=>{var e=V(()=>!n.member);return()=>e()?(()=>{var e=zp(),t=e.firstChild,r=t.nextSibling.nextSibling,i=r.firstChild.nextSibling,a=r.nextSibling.nextSibling.nextSibling.nextSibling;return t._$owner=D(),r.addEventListener(`change`,e=>n.pickProvider(e)),W(r,L(R,{get each(){return n.info?.providers},children:e=>(()=>{var t=If();return W(t,()=>e.name),B(()=>({e:e.id,t:e.id===n.providerId,a:Ci()}),({e,t:n,a:r},i)=>{(e!==i?.e||!r)&&(t.value=e),(n!==i?.t||!r)&&(t.selected=n)}),t})()}),i),a.addEventListener(`blur`,e=>{n.modelOpen&&n.pickModel(e.target.value.trim()||n.model)}),a._$$keydown=e=>n.modelKey(e),a._$$input=e=>{n.modelQuery=e.target.value,n.modelIndex=n.modelQuery.trim()?0:-1,n.modelOpen=!0},a.addEventListener(`focus`,e=>{n.loadModels(),e.target.select(),n.modelQuery=``,n.modelIndex=-1,n.modelOpen=!0}),ra(()=>e=>n.modelInput=e,a),B(()=>({e:n.modelError||q(`provider_and_model`),t:q(`provider`),a:n.providerId,o:n.running,i:q(`model`),n:Rm(n.modelOpen),s:n.modelOpen&&n.modelIndex>=0?`model-opt-${n.modelIndex}`:void 0,h:q(`model_search`),r:n.model,d:n.running,l:Ci()}),({e:t,t:n,a:i,o,i:s,n:c,s:l,h:u,r:d,d:f,l:p},m)=>{t!==m?.e&&U(e,`title`,t),n!==m?.t&&U(r,`aria-label`,n),(i!==m?.a||!p)&&qi(r,`value`,i),o!==m?.o&&U(r,`disabled`,o),s!==m?.i&&U(a,`aria-label`,s),c!==m?.n&&U(a,`aria-expanded`,c),l!==m?.s&&U(a,`aria-activedescendant`,l),u!==m?.h&&U(a,`placeholder`,u),(d!==m?.r||!p)&&(a.value=d??``),f!==m?.d&&U(a,`disabled`,f)}),e})():void 0})(),v),W(u,(()=>{var e=V(()=>!(!n.modelOpen||n.member));return()=>e()?(()=>{var e=Bp(),r=e.firstChild,i=r.firstChild,a=i.nextSibling.nextSibling,o=r.nextSibling.nextSibling,s=o.nextSibling.nextSibling,c=s.nextSibling.nextSibling;return W(i,()=>q(n.modelQuery.trim()?`models_found`:`models_suggested_first`,{count:t().length})),W(a,()=>q(`model_price_head`)),W(e,L(R,{get each(){return t().slice(0,Nm)},children:(e,t)=>(()=>{var r=Vp(),i=r.firstChild,a=i.nextSibling,o=a.firstChild,s=o.nextSibling,c=a.nextSibling.nextSibling;return r._$$mousedown=t=>{t.preventDefault(),n.pickModel(e.id)},W(r,(()=>{var t=V(()=>!!e.suggested);return()=>t()?(()=>{var e=Hp();return e._$owner=D(),e})():void 0})(),i),W(a,(()=>{var t=V(()=>e.label!==e.id);return()=>t()?e.label:e.id})(),o),W(a,(()=>{var t=V(()=>e.label!==e.id);return()=>t()?(()=>{var t=Up();return W(t,()=>e.id),t})():void 0})(),s),W(c,()=>Fm(e)),B(()=>({e:`model-opt-${t()}`,t:Rm(t()===n.modelIndex),a:`${t()===n.modelIndex?`active`:``} ${e.id===n.model?`current`:``}`}),({e,t,a:n},i)=>{e!==i?.e&&U(r,`id`,e),t!==i?.t&&U(r,`aria-selected`,t),$i(r,n,i?.a)}),r})()}),o),W(e,(()=>{var e=V(()=>t().length>Nm);return()=>e()?(()=>{var e=Wp();return W(e,()=>q(`models_more`,{count:t().length-Nm})),e})():void 0})(),s),W(e,(()=>{var e=V(()=>!t().length);return()=>e()?(()=>{var e=Wp();return W(e,()=>q(`models_none`)),e})():void 0})(),c),B(()=>q(`model`),t=>{U(e,`aria-label`,t)}),e})():void 0})(),y),W(u,(()=>{var e=V(()=>!!n.running);return()=>e()?(()=>{var e=Gp(),t=e.firstChild;return e._$$click=()=>void n.stop(),t._$owner=D(),B(()=>({e:q(`stop`),t:q(`stop`)}),({e:t,t:n},r)=>{t!==r?.e&&U(e,`title`,t),n!==r?.t&&U(e,`aria-label`,n)}),e})():(()=>{var e=Kp(),t=e.firstChild;return e._$$click=()=>void n.send(),t._$owner=D(),B(()=>({e:q(`send`),t:q(`send`),a:!n.hasText&&!n.photos.length&&!n.files.length}),({e:t,t:n,a:r},i)=>{t!==i?.e&&U(e,`title`,t),n!==i?.t&&U(e,`aria-label`,n),r!==i?.a&&U(e,`disabled`,r)}),e})()})(),b),W(x,(()=>{var e=V(()=>n.editAt>=0);return()=>e()?(()=>{var e=qp(),t=e.firstChild,r=t.nextSibling;return W(e,()=>q(n.editAt===n.lastUserIndex()?`editing_last`:`editing_earlier`),t),r._$$click=()=>n.cancelEdit(),W(r,()=>q(`cancel`)),e})():void 0})(),S),W(C,()=>q(`usage_line`,{input:Om(e().input+e().cache_read+e().cache_write),output:Om(e().output)}),ee),W(C,(()=>{var t=V(()=>!!e().cache_read);return()=>t()?` \u00b7 ${q(`usage_cached`,{count:Om(e().cache_read)})}`:null})(),w),W(C,(()=>{var t=V(()=>e().cost==null);return()=>t()?q(`cost_na`):`~$${e().cost.toFixed(e().cost<1?4:2)}`})(),T),W(C,(()=>{var t=V(()=>!!e().review);return()=>t()?` \u00b7 ${q(`reviewer_usage`,{tokens:Om(e().review.input+e().review.output),cost:e().review.cost==null?q(`cost_na`):`~$${e().review.cost.toFixed(4)}`})}`:null})(),E),B(()=>({e:`composer ${n.dragging?`dragging`:``}`,t:n.placeholder(),a:q(`attach_title`),o:n.photos.length>=Bm&&n.files.length>=Vm,i:q(`attach`),n:n.running,s:q(`chat_mode_title`),h:Mm[n.chatMode]??`mdi:shield-check-outline`,r:q(`chat_mode`),d:n.chatMode,l:n.running,u:!n.prefs.showUsage,c:q(`usage_title`),w:Ci()}),({e,t,a:n,o:r,i,n:s,s:c,h:l,r:u,d:f,l:_,u:v,c:y,w:b},x)=>{$i(a,e,x?.e),t!==x?.t&&U(o,`placeholder`,t),n!==x?.a&&U(d,`title`,n),r!==x?.o&&U(d,`hidden`,r),i!==x?.i&&U(p,`aria-label`,i),s!==x?.n&&U(p,`disabled`,s),c!==x?.s&&U(m,`title`,c),l!==x?.h&&U(h,`icon`,l),u!==x?.r&&U(g,`aria-label`,u),(f!==x?.d||!b)&&qi(g,`value`,f),_!==x?.l&&U(g,`disabled`,_),v!==x?.u&&U(C,`hidden`,v),y!==x?.c&&U(C,`title`,y)}),r}};G([K()],$.prototype,`_hass`,void 0),G([K()],$.prototype,`narrow`,void 0),G([K()],$.prototype,`_page`,void 0),G([K()],$.prototype,`_embedded`,void 0),G([K()],$.prototype,`info`,void 0),G([K()],$.prototype,`convs`,void 0),G([K()],$.prototype,`query`,void 0),G([K()],$.prototype,`previews`,void 0),G([K()],$.prototype,`hits`,void 0),G([K()],$.prototype,`convId`,void 0),G([K()],$.prototype,`chatTitle`,void 0),G([K()],$.prototype,`items`,void 0),G([K()],$.prototype,`usage`,void 0),G([K()],$.prototype,`running`,void 0),G([K()],$.prototype,`announce`,void 0),G([K()],$.prototype,`editAt`,void 0),G([K()],$.prototype,`hasText`,void 0),G([K()],$.prototype,`photos`,void 0),G([K()],$.prototype,`files`,void 0),G([K()],$.prototype,`dragging`,void 0),G([K()],$.prototype,`providerId`,void 0),G([K()],$.prototype,`model`,void 0),G([K()],$.prototype,`fetched`,void 0),G([K()],$.prototype,`showList`,void 0),G([K()],$.prototype,`mode`,void 0),G([K()],$.prototype,`modeBefore`,void 0),G([K()],$.prototype,`modelOpen`,void 0),G([K()],$.prototype,`modelQuery`,void 0),G([K()],$.prototype,`modelIndex`,void 0),G([K()],$.prototype,`loadError`,void 0),G([K()],$.prototype,`mentions`,void 0),G([K()],$.prototype,`prefs`,void 0),G([K()],$.prototype,`showPrefs`,void 0),G([K()],$.prototype,`showSettings`,void 0),G([K()],$.prototype,`showChanges`,void 0),G([K()],$.prototype,`view`,void 0),G([K()],$.prototype,`mentionIndex`,void 0),G([K()],$.prototype,`pageOff`,void 0),G([K()],$.prototype,`modelError`,void 0),G([K()],$.prototype,`noteTick`,void 0);var Zp=`llm-agent-prefs`;async function Qp(e){try{return await navigator.clipboard.writeText(e),!0}catch{let t=document.createElement(`textarea`);t.value=e,document.body.append(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}}function $p(e){try{let t=JSON.parse(localStorage.getItem(e)??`{}`);return t&&typeof t==`object`?t:{}}catch{return{}}}function em(e,t){try{Object.keys(t).length?localStorage.setItem(e,JSON.stringify(t)):localStorage.removeItem(e)}catch{}}function tm(e,t){let n=$p(e)[t??``];return typeof n==`string`?n:``}function nm(e,t,n){let r=$p(e),i=t??``;if(n.trim())r[i]=n;else if(i in r)delete r[i];else return;em(e,r)}function rm(e,t){let n=$p(e),r=new Set(t.map(e=>e.id)),i=Object.keys(n).filter(e=>e&&!r.has(e));for(let e of i)delete n[e];i.length&&em(e,n)}var im=`llm-agent-last-chat`;function am(){try{return localStorage.getItem(im)}catch{return null}}function om(e){try{e?localStorage.setItem(im,e):localStorage.removeItem(im)}catch{}}var sm={theme:`auto`,size:`normal`,compact:!1,toolsOpen:!1,showUsage:!0,send:`enter`,listOpen:!0};function cm(){try{let e=JSON.parse(localStorage.getItem(Zp)??`{}`);return{...sm,...typeof e==`object`&&e?e:{}}}catch{return{...sm}}}function lm(e){try{localStorage.setItem(Zp,JSON.stringify(e))}catch{}}var um=8,dm=1500;function fm(e,t=!1){let n=Object.values(e?.areas??{}).map(e=>String(e.name??``)).filter(Boolean).sort((e,t)=>e.localeCompare(t))[0]??q(`living_room`),r=Object.values(e?.states??{}).some(e=>e.attributes?.device_class===`energy`);return t?[{text:q(`tip_lights`,{room:n}),icon:`mdi:lightbulb-group-outline`},{text:q(`tip_anything_on`),icon:`mdi:power`},{text:q(`tip_temperature`),icon:`mdi:thermometer`}]:[{text:q(`tip_lights`,{room:n}),icon:`mdi:lightbulb-group-outline`},{text:q(`tip_dashboard_room`,{room:n}),icon:`mdi:view-dashboard-outline`},{text:q(`tip_dashboard_all`),icon:`mdi:view-dashboard-edit-outline`},{text:q(`tip_automation`),icon:`mdi:robot-outline`},r?{text:q(`tip_energy`),icon:`mdi:lightning-bolt-outline`}:{text:q(`tip_unavailable`),icon:`mdi:stethoscope`},{text:q(`tip_batteries`),icon:`mdi:battery-alert-variant-outline`}]}function pm(e,t){let n=t.toLowerCase(),r=[],i=(e,t)=>{let i=e.label.toLowerCase(),a=t.toLowerCase(),o;if(!n)o=3;else if(i.startsWith(n)||a.startsWith(n))o=0;else if(i.includes(n)||a.includes(n))o=1;else return;r.push([o,e])};for(let t of Object.values(e.areas??{}))i({kind:`area`,label:t.name,insert:`area_id:${t.area_id}`,detail:t.area_id},t.area_id);for(let t of Object.values(e.devices??{})){let e=t.name_by_user||t.name;e&&i({kind:`device`,label:e,insert:`device_id:${t.id} (${e})`,detail:`device`},e)}for(let t of Object.values(e.states??{}))i({kind:`entity`,label:t.attributes.friendly_name||t.entity_id,insert:t.entity_id,detail:t.entity_id},t.entity_id);return r.sort((e,t)=>e[0]-t[0]||e[1].label.localeCompare(t[1].label)),r.slice(0,um).map(([,e])=>e)}function mm(e,t){let n=[`# ${Sm(e)}`,``];for(let e of t)if(e.kind===`user`){let t=e.images?.length||e.photos||0,r=[...t?[Cm(t)]:[],...(e.files??[]).map(e=>e.name)],i=r.length?` _(${r.join(`, `)})_`:``;n.push(`**${q(`you`)}:** ${e.text}${i}`,``)}else if(e.kind===`assistant`&&e.text)n.push(e.text,``);else if(e.kind===`notice`)n.push(`> ${e.text}`,``);else if(e.kind===`tool`){let t=e.status===`ok`?`✓`:e.status===`error`?`✗`:`…`;n.push(`- ${t} \`${e.name}\`${e.summary?`: ${e.summary}`:``}`,``)}return n.join(`
`)}function hm(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``).slice(0,50)}var gm=/* @__PURE__ */ new Set([`length`,`tool_limit`,`cancelled`,`spend_cap`]);function _m(e){let t=[],n=/* @__PURE__ */ new Map;for(let r of e)if(r.role===`user`)t.push({kind:`user`,text:r.content,photos:r.photos,files:r.files,page:r.page});else if(r.role===`assistant`){r.content&&t.push({kind:`assistant`,text:r.content});for(let e of r.tool_calls)n.set(e.id,{name:e.name,args:e.args})}else{let e=n.get(r.tool_call_id);t.push({kind:`tool`,id:r.tool_call_id,name:r.name,args:e?.args??{},status:r.ok?`ok`:`error`,summary:r.summary||(r.decision===`denied`?q(`denied`):``),preview:r.preview,snapshotId:r.snapshot_id,undone:r.undone,review:r.review??void 0})}return t}var vm={approve:`reviewer_approved`,deny:`reviewer_denied`,ask:`reviewer_unsure`};function ym(e,t){if(t&&!e)return(()=>{var e=mp();return W(e,()=>q(`reviewing`)),e})();if(!e)return null;var n=Jp();return W(n,()=>q(vm[e.decision]??`reviewer`)),B(()=>({e:`tag review ${e.decision}`,t:e.reason}),({e,t},r)=>{$i(n,e,r?.e),t!==r?.t&&U(n,`title`,t)}),n}function bm(e){return e.replace(/\n+$/,``).split(`
`).map(e=>{let t=e.startsWith(`+`)&&!e.startsWith(`+++`)?`add`:e.startsWith(`-`)&&!e.startsWith(`---`)?`del`:e.startsWith(`@@`)?`hunk`:``;var n=Jp();return W(n,e||` `),B(()=>ta(t),(e,t)=>{$i(n,e,t)}),n})}function xm(e){return e===`shell`?`mdi:console`:e===`call_service`?`mdi:play-circle-outline`:e===`undo`?`mdi:undo`:e===`system`?`mdi:cog-outline`:e===`ha_websocket`?`mdi:api`:e===`integrations`?`mdi:puzzle-outline`:e===`read_reference`?`mdi:book-open-variant`:e===`render_template`?`mdi:code-braces`:e===`get_history`?`mdi:chart-timeline-variant`:e===`web_fetch`?`mdi:web`:e===`web_search`?`mdi:magnify`:e===`camera_snapshot`?`mdi:cctv`:e===`get_traces`?`mdi:transit-connection-variant`:e===`get_logbook`?`mdi:history`:e===`read_log`?`mdi:text-box-search-outline`:e.includes(`dashboard`)?`mdi:view-dashboard-outline`:e.includes(`config_item`)?`mdi:robot-outline`:e.includes(`file`)?`mdi:file-document-outline`:e.includes(`area`)||e.includes(`device`)||e.includes(`registry`)?`mdi:devices`:e.includes(`entit`)||e.includes(`service`)?`mdi:format-list-bulleted`:`mdi:wrench-outline`}function Sm(e){return e===`New chat`?q(`new_chat`):e}function Cm(e){return e===1?q(`one_photo`):q(`n_photos`,{count:e})}function wm(){let e=(/* @__PURE__ */ new Date()).getHours();return q(e<5?`greeting_evening`:e<12?`greeting_morning`:e<18?`greeting_afternoon`:`greeting_evening`)}function Tm(e,t){if(t)return[[``,e]];let n=/* @__PURE__ */ new Date;n.setHours(0,0,0,0);let r=n.getTime()/1e3,i=[[`today`,r],[`yesterday`,r-86400],[`previous_7`,r-604800],[`previous_30`,r-2592e3],[`older`,-1/0]],a=[];for(let t of e){let e=i.find(([,e])=>t.updated>=e)[0],n=a.find(([t])=>t===e);n?n[1].push(t):a.push([e,[t]])}return a}function Em(e){let t=`tool_${e}`;return ja(t)?q(t):e.replace(/_/g,` `)}function Dm(e){let t=Object.entries(e).filter(([e])=>!e.startsWith(`_`)).map(([e,t])=>`${e}=${typeof t==`string`?t:JSON.stringify(t)}`).join(` `);return t.length>120?`${t.slice(0,117)}…`:t}function Om(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}var km=[`ask_all`,`ask_risky`,`accept_edits`,`reviewer`,`autopilot`,`yolo`,`read_only`,`planning`],Am=[`ask_all`,`ask_risky`,`read_only`,`planning`],jm=/* @__PURE__ */ new Set([`autopilot`,`reviewer`,`yolo`,`accept_edits`]),Mm={ask_all:`mdi:hand-back-right-outline`,ask_risky:`mdi:shield-check-outline`,accept_edits:`mdi:file-document-edit-outline`,reviewer:`mdi:account-eye-outline`,autopilot:`mdi:airplane`,yolo:`mdi:rocket-launch-outline`,read_only:`mdi:eye-outline`,planning:`mdi:format-list-numbered`},Nm=60;function Pm(e){return ja(`chat_mode_${e}`)?q(`chat_mode_${e}`):e}function Fm(e){if(e.input==null||e.output==null)return``;if(!e.input&&!e.output)return q(`model_free`);let t=e=>`$${Number(e.toPrecision(3))}`;return`${t(e.input)} / ${t(e.output)}`}function Im(e){let t={ask_all:`mode_ask_all`,ask_risky:`mode_ask_risky`,reviewer:`mode_reviewer`,autopilot:`mode_autopilot`,yolo:`mode_yolo`,read_only:`mode_read_only`}[e??``];return t?q(t):``}function Lm(e){return e.message??String(e)}customElements.get(`llm-agent-panel`)||customElements.define(`llm-agent-panel`,$);function Rm(e){return e?`true`:`false`}function zm(e){let t=document.createElement(`template`);return t.innerHTML=e,[...t.content.childNodes]}var Bm=3,Vm=10,Hm=2097152,Um=35e5,Wm={text:`mdi:file-document-outline`,pdf:`mdi:file-pdf-box`,zip:`mdi:folder-zip-outline`,gzip:`mdi:folder-zip-outline`};function Gm(e){return e.type.startsWith(`image/`)&&e.type!==`image/svg+xml`}function Km(e){return Math.ceil(e/3)*4}function qm(e){return e>=1048576?`${(e/1048576).toFixed(1)} MB`:e>=1024?`${Math.round(e/1024)} KB`:`${e} B`}function Jm(e){if(e.kind!==`text`)return e.kind.toUpperCase();let t=e.name.lastIndexOf(`.`),n=t>0?e.name.slice(t+1):``;return n&&n.length<=5?n.toUpperCase():q(`file_text`)}function Ym(e){let t=(...t)=>t.every((t,n)=>e[n]===t);if(t(80,75,3,4)||t(80,75,5,6))return`zip`;if(t(31,139))return`gzip`;if(t(37,80,68,70,45))return`pdf`;if(t(255,254)||t(254,255))return`text`;let n=0;for(let t of e){if(t===0)return null;t<32&&t!==9&&t!==10&&t!==12&&t!==13&&t!==27&&n++}return e.length&&n/e.length>.02?null:`text`}async function Xm(e){let t=Ym(new Uint8Array(await e.slice(0,8192).arrayBuffer()));if(!t)return null;let n=await new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>n(r.error),r.readAsDataURL(e)});return{name:e.name||`file`,size:e.size,kind:t,data:n.slice(n.indexOf(`,`)+1)}}var Zm=1568,Qm=1e6;async function $m(e){let t=await createImageBitmap(e);try{let e=Math.min(Zm,Math.max(t.width,t.height));for(;;){for(let n of[.85,.7,.55]){let r=eh(t,e,n),i=r.slice(r.indexOf(`,`)+1);if(i.length<=Qm)return{media_type:`image/jpeg`,data:i,url:r}}if(e<=256)throw Error(`photo too detailed to send`);e=Math.round(e*.75)}}finally{t.close()}}function eh(e,t,n){let r=Math.min(1,t/Math.max(e.width,e.height)),i=document.createElement(`canvas`);i.width=Math.max(1,Math.round(e.width*r)),i.height=Math.max(1,Math.round(e.height*r));let a=i.getContext(`2d`);return a.fillStyle=`#fff`,a.fillRect(0,0,i.width,i.height),a.drawImage(e,0,0,i.width,i.height),i.toDataURL(`image/jpeg`,n)}Ri([`click`,`keydown`,`input`,`mousedown`]);export{Rd as collectPageContext,pm as findMentions,mm as toMarkdown,fm as welcomeTips};