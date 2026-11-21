var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),t=globalThis,n=t.ShadowRoot&&(t.ShadyCSS===void 0||t.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,r=Symbol(),i=/* @__PURE__ */ new WeakMap,a=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(n&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=i.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(t,e))}return e}toString(){return this.cssText}},o=e=>new a(typeof e==`string`?e:e+``,void 0,r),s=(e,...t)=>new a(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,r),c=(e,r)=>{if(n)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of r){let r=document.createElement(`style`),i=t.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=n.cssText,e.appendChild(r)}},l=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return o(t)})(e):e,{is:u,defineProperty:d,getOwnPropertyDescriptor:f,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:h}=Object,g=globalThis,_=g.trustedTypes,v=_?_.emptyScript:``,y=g.reactiveElementPolyfillSupport,b=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ee=(e,t)=>!u(e,t),S={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??=Symbol(`metadata`),g.litPropertyMetadata??=/* @__PURE__ */ new WeakMap;var te=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=S){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=f(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??S}static _$Ei(){if(this.hasOwnProperty(b(`elementProperties`)))return;let e=h(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b(`properties`))){let e=this.properties,t=[...p(e),...m(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=/* @__PURE__ */ new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(l(e))}else e!==void 0&&t.push(l(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=/* @__PURE__ */ new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=/* @__PURE__ */ new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=/* @__PURE__ */ new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?x:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?x:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ee)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=/* @__PURE__ */ new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=/* @__PURE__ */ new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=/* @__PURE__ */ new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};te.elementStyles=[],te.shadowRootOptions={mode:`open`},te[b(`elementProperties`)]=/* @__PURE__ */ new Map,te[b(`finalized`)]=/* @__PURE__ */ new Map,y?.({ReactiveElement:te}),(g.reactiveElementVersions??=[]).push(`2.1.2`);var ne=globalThis,re=e=>e,C=ne.trustedTypes,ie=C?C.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ae=`$lit$`,oe=`lit$${Math.random().toFixed(9).slice(2)}$`,se=`?`+oe,ce=`<${se}>`,le=document,ue=()=>le.createComment(``),de=e=>e===null||typeof e!=`object`&&typeof e!=`function`,fe=Array.isArray,pe=e=>fe(e)||typeof e?.[Symbol.iterator]==`function`,me=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,_e=/>/g,w=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ve=/'/g,ye=/"/g,be=/^(?:script|style|textarea|title)$/i,T=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),xe=Symbol.for(`lit-noChange`),E=Symbol.for(`lit-nothing`),Se=/* @__PURE__ */ new WeakMap,Ce=le.createTreeWalker(le,129);function we(e,t){if(!fe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ie===void 0?t:ie.createHTML(t)}var D=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=he;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===he?c[1]===`!--`?o=ge:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=w):(be.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=w):o=_e:o===w?c[0]===`>`?(o=i??he,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?w:c[3]===`"`?ye:ve):o===ye||o===ve?o=w:o===ge||o===_e?o=he:(o=w,i=void 0);let d=o===w&&e[t+1].startsWith(`/>`)?` `:``;a+=o===he?n+ce:l>=0?(r.push(s),n.slice(0,l)+ae+n.slice(l)+oe+d):n+oe+(l===-2?t:d)}return[we(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Te=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=D(t,n);if(this.el=e.createElement(l,r),Ce.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Ce.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ae)){let t=u[o++],n=i.getAttribute(e).split(oe),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ke:r[1]===`?`?Ae:r[1]===`@`?je:Oe}),i.removeAttribute(e)}else e.startsWith(oe)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(be.test(i.tagName)){let e=i.textContent.split(oe),t=e.length-1;if(t>0){i.textContent=C?C.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],ue()),Ce.nextNode(),c.push({type:2,index:++a});i.append(e[t],ue())}}}else if(i.nodeType===8){if(i.data===se)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(oe,e+1))!==-1;)c.push({type:7,index:a}),e+=oe.length-1}}a++}}static createElement(e,t){let n=le.createElement(`template`);return n.innerHTML=e,n}};function O(e,t,n=e,r){if(t===xe)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=de(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=O(e,i._$AS(e,t.values),i,r)),t}var Ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??le).importNode(t,!0);Ce.currentNode=r;let i=Ce.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new De(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Me(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Ce.nextNode(),a++)}return Ce.currentNode=le,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},De=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=O(this,e,t),de(e)?e===E||e==null||e===``?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==xe&&this._(e):e._$litType$===void 0?e.nodeType===void 0?pe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&de(this._$AH)?this._$AA.nextSibling.data=e:this.T(le.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Te.createElement(we(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ee(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Se.get(e.strings);return t===void 0&&Se.set(e.strings,t=new Te(e)),t}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(ue()),this.O(ue()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=re(e).nextSibling;re(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(/* @__PURE__ */ new String),this.strings=n):this._$AH=E}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=O(this,e,t,0),a=!de(e)||e!==this._$AH&&e!==xe,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=O(this,r[n+o],t,o),s===xe&&(s=this._$AH[o]),a||=!de(s)||s!==this._$AH[o],s===E?e=E:e!==E&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ke=class extends Oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}},Ae=class extends Oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}},je=class extends Oe{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=O(this,e,t,0)??E)===xe)return;let n=this._$AH,r=e===E&&n!==E||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==E&&(n===E||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Me=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){O(this,e)}},Ne={M:ae,P:oe,A:se,C:1,L:D,R:Ee,D:pe,V:O,I:De,H:Oe,N:Ae,U:je,B:ke,F:Me},Pe=ne.litHtmlPolyfillSupport;Pe?.(Te,De),(ne.litHtmlVersions??=[]).push(`3.3.3`);var Fe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new De(t.insertBefore(ue(),e),e,void 0,n??{})}return i._$AI(e),i},Ie=globalThis,Le=class extends te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Fe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return xe}};Le._$litElement$=!0,Le.finalized=!0,Ie.litElementHydrateSupport?.({LitElement:Le});var Re=Ie.litElementPolyfillSupport;Re?.({LitElement:Le}),(Ie.litElementVersions??=[]).push(`4.2.2`);var ze={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:ee},Be=(e=ze,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=/* @__PURE__ */ new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function Ve(e){return(t,n)=>typeof n==`object`?Be(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function k(e){return Ve({...e,state:!0,attribute:!1})}var He=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function Ue(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return He(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return He(n,r,{get(){return a(this)}})}}var We={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ge=e=>(...t)=>({_$litDirective$:e,values:t}),Ke=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},qe=class extends Ke{constructor(e){if(super(e),this.it=E,e.type!==We.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===E||e==null)return this._t=void 0,this.it=e;if(e===xe)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};qe.directiveName=`unsafeHTML`,qe.resultType=1;var Je=Ge(qe),{I:Ye}=Ne,Xe=e=>e,Ze=()=>document.createComment(``),Qe=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Ye(r.insertBefore(Ze(),i),r.insertBefore(Ze(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Xe(e).nextSibling;Xe(r).insertBefore(e,i),e=t}}}return n},$e=(e,t,n=e)=>(e._$AI(t,n),e),et={},tt=(e,t=et)=>e._$AH=t,nt=e=>e._$AH,rt=e=>{e._$AR(),e._$AA.remove()},it=(e,t,n)=>{let r=/* @__PURE__ */ new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},at=Ge(class extends Ke{constructor(e){if(super(e),e.type!==We.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=nt(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=$e(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=$e(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=$e(i[d],a[m]),Qe(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=$e(i[f],a[p]),Qe(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=it(o,p,m),u=it(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Qe(e,i[d]);$e(t,a[p]),c[p]=t}else c[p]=$e(n,a[p]),Qe(e,i[d],n),i[t]=null;p++}else rt(i[f]),f--}else rt(i[d]),d++;for(;p<=m;){let t=Qe(e,c[m+1]);$e(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&rt(e)}return this.ut=o,tt(e,c),xe}}),A=class extends Error{constructor(e){let t=Error,n=t.stackTraceLimit;n&&(t.stackTraceLimit=0),super(),n&&(t.stackTraceLimit=n),this.source=e}},ot=class extends Error{constructor(e,t){try{var n=String(t instanceof Error?t.message:t)}catch{}super(n,{cause:t}),this.source=e}};function st(e){return e instanceof ot?e.cause:e}var ct=1024,lt=2048,ut=4096,dt=8192,ft=16384,pt=1<<17,mt=1<<18,ht=1<<19,j=1<<22,gt=1<<23,_t=1<<20,vt=1024,yt=1<<21,bt=1<<22,M={},xt=typeof Proxy==`function`,St={},Ct=Symbol(`refresh`),wt=Set;function Tt(e){let t=e.pe;for(;t;)t.R|=32,Tt(t),t=t.Ge}var Et;function Dt(e){try{e()}catch(e){Et||=[e],Rn()}}function Ot(e){let t=Et;if(Et=void 0,t&&!e)throw t[0]}function kt(e,t=!1,n){let r=e.R;if(r&64)return;t&&(!n&&e.T!==null&&(e.T.me!==null||e.T.Le!==null)&&kt(e,!1,!0),e.R=r|64,e.X&&(kr(e),(e.m&1&&e.T?.Re!=null||r&2048||Jn.length)&&Rn()));let i=n?e.T.me:e.pe;for(n?e.T.me=null:e.pe=null;i;)i.l&=-33,dr(i,N),br(i),i.Me=i,kt(i,!0),i=i.Ge;if(n||(e.be=0),t&&!n&&!(r&32)&&e._parent!==null&&!(e._parent.R&64)){let t=e.Me,n=e.Ge;t===null?e._parent.pe=n:t.Ge=n,n!==null&&(n.Me=t),e.Me=null}if(jt(e,n),t&&e.ze){let t=e.ze;e.ze=void 0,Dt(t)}}function At(e,t){let n=e.pe;t.Me=null,t.Ge=n,n!==null&&(n.Me=t),e.pe=t}function jt(e,t){let n=t?e.T.Le:e.ke;if(n){if(t?e.T.Le=null:e.ke=null,Array.isArray(n))for(let e=n.length-1;e>=0;e--)Dt(n[e]);else Dt(n)}}function Mt(e,t){for(;e.l&4&&e._parent;)e=e._parent;if(e.id!=null)return Ft(e.id,t?e.be++:e.be);throw Error()}function Nt(e){return Mt(e,!0)}function Pt(e,t,n){return e?.id??(t?n?.id:n?.id==null?void 0:Nt(n))}function Ft(e,t){let n=t.toString(36),r=n.length-1;return e+(r?String.fromCharCode(64+r):``)+n}function It(){return I}function Lt(e,t=I){return t&&(t.ke?Array.isArray(t.ke)?t.ke.push(e):t.ke=[t.ke,e]:t.ke=e),e}function Rt(e=!0){kt(this,e),Et&&!F.Y&&Ot()}function zt(e){let t=I,n=e?.transparent??!1,r={id:Pt(e,n,t),l:n?4:0,R:0,Qe:!0,Ke:t?.Qe?t.Ke:t,pe:null,Ge:null,Me:null,ke:null,A:t?.A||St,be:0,T:null,_parent:t,dispose:Rt};return t&&At(t,r),r}function Bt(e,t){let n=zt(t);return Ii(n,()=>e(Rt.bind(n,!0)))}var Vt=null,Ht=null,Ut=null,Wt=null,Gt=null,Kt=null,qt=null,Jt=null,Yt=null,Xt=null,Zt=null,Qt=null,$t=null,en=null,tn=null,nn=null,rn=null,an=null,on=null,sn=null,cn=void 0,ln=[];function un(e,t=null){let n={ln:[],rn:[[],[]],fn:[],eo:null,_parent:t,P:e,Pe:null,tt:0,nt:!1,nn:null,Ue:!1,un:!1,I:null};return e||ln.push(n),n}var dn=null,fn=null,pn=null;function mn(e,t){if(F.Y&&!t||fn!==null)return vn(e);pn===null?pn=_n(e):yn(_n(e),pn),Rn()}function hn(e){return e.T.Re=_n(e.T.Re)}function gn(e){return e=_n(e),ln.indexOf(e)===-1?null:e}function _n(e){for(;e.eo!==null;)e=e.eo;return e}function vn(e){let t=fn;t===null?fn=e===null?un(!1):_n(e):e!==null&&yn(_n(e),t),F.Y||Rn()}function yn(e,t){e=_n(e),t=_n(t),!(e===t||e.P||t.P)&&(e.eo=t,t.tt+=e.tt,t.nt||=e.nt,qn(t.ln,e.ln),qn(t.rn[0],e.rn[0]),qn(t.rn[1],e.rn[1]),qn(t.fn,e.fn),e.I!==null&&qn(t.I??=[],e.I),ln.splice(ln.indexOf(e),1))}function bn(e){return e.tt!==0||Sn(e.ln,e)||!!Gt?.(e)}var xn=null;function Sn(e,t,n){for(let r=0;r<e.length;r++){let i=e[r];if(!(!(i.m&1)||i.R&64||i.l&8192||i.T.Re!==null&&hn(i)!==t||n&&!n(i,t))){if(i.i===1){if(Cn(i,xn??t))return!0}else for(let e=i.o;e!==null;e=e.t){let n=e.u;if((n.i===1&&n.m&1||n.R&2048||n.l&16384&&n.m===1)&&(e.Ne===n.de||n.T?.U!=null)&&!(n.R&64)&&Cn(n,xn??t))return!0}}}return!1}function Cn(e,t){return!Xt?.(e)&&!(e.R&32&&wn(e,t))}function wn(e,t){for(;e?.R&32;)e=e._parent;return e?.l&256&&e.T?.Re!=null&&hn(e)===_n(t)}var Tn=[];function En(e){Tn.push(e)}var Dn=[];function On(e){dr(e,N),e.R&=-4,Dn.push(e)}function kn(e,t){e.l|=256,An(e,t)}function An(e,t){let n=$r(e);n.Re!==t&&(n.Re=t,t.ln.push(e))}function jn(e,t){for(let n=e.pe;n!==null;n=n.Ge)n.T?.Re?.P||(n.X!==void 0&&(n.l&256||kn(n,t),n.l|=_t),jn(n,t))}var N={et:Array(2e3).fill(void 0),p:!1,Fe:0,Et:0},P=0,Mn=!1,Nn=!1,Pn=!1,Fn=0,In=0,Ln=0;function Rn(){Nn?Hn():Mn||(Mn=!0,!Fn&&!F.Y&&queueMicrotask(ar))}var zn=Symbol.for(`solid-js/root-error-hook`),Bn=`[REACTIVITY_HALTED]`;function Vn(e){if(Nn)return;Nn=!0,Ot(!0);let t=Bn,n=e!==void 0&&globalThis.reportError;n||e===void 0?console.error(t):console.error(t,e),n&&n(e)}function Hn(){Pn||(Pn=!0,console.error(Bn))}var Un=class e{rn=[[],[]];Y=!1;flush(){if(!this.Y){this.Y=!0,wi(),dn=null,pn=null;try{Tr(),mr(N,e._e),this.settle(),P++,Mn=N.Et>=N.Fe||Jn.length!==0,this.run(1),this.run(2)}finally{this.Y=!1,pn=null}}}settle(){Ut?.()&&mr(N,e._e);let t=fn;fn=null,Ht?.(t);let n=t!==null&&!t.P?_n(t):null;if(n!==null){let e=Jn.length;for(let t=0;t<e;t++){let e=Jn[t];if(!(e.l&2304)&&(e.T===null||e.T.Re===null||!e.T.Re.P)){if(e.ue===M&&e.m&4&&e.i!==1)continue;if(e.ue!==M&&!(e.m&5)&&e.T?.me==null&&e.T?.Le==null&&!e.T?.Te&&Ni(e,e.le,e.ue)){e.ue=M,e.l&=-129;continue}kn(e,n)}e.l&128&&jn(e,n)}Jn.length=0,$t?.(n),Dn.splice(0)}else{ir();for(let e=0;e<Tn.length;e++){let t=Tn[e];t.T?.U==null&&!t.Ae&&yr(t)}}Tn.length&&=0;let r=this.rn;this.rn=[[],[]];for(let e=ln.length-1;e>=0;e--){let t=ln[e];bn(t)||(ln.splice(e,1),Wt?.(t),Gn(t),e=ln.length)}en?.();let i=n&&gn(n);tn?.(i);let a=i!==null;for(let e=0;e<2;e++)a&&qn(i.rn[e],r[e]),this.rn[e]=a||this.rn[e].length?[].concat(a?[]:r[e],this.rn[e]):r[e];if(Dn.length!==0){let e=Dn.splice(0).sort((e,t)=>e.he-t.he);for(let t=0;t<e.length;t++)e[t].R&64||Xr(e[t])}Zt?.()}run(e){let t=this.rn[e-1];t.length&&(this.rn[e-1]=[],or(t,e))}enqueue(e,t,n=dn){e&&(n?.P?n:this).rn[e-1].push(t),Rn()}notify(e,t,n,r){return Jt?.(e,n&t,r)?!0:t&1?(n&1&&dn===null&&vn(null),!0):!1}};function Wn(e){let t;for(let n=0;n<e.fn.length;n++){let r=e.fn[n],i=r.T?.U?.source;if(!(r.R&64||r.m&2&&(r.i||!(r.l&8388608))&&i!==r&&(i?.m??2)&2)&&r.R&2048){t=1,e.P||(r.R&=~lt),r.Ae=!1;for(let e=r.pe;e!==null;e=e.Ge)e.i&&(e.Ae=!1);Kt?.(r),sr(r)}}return e.fn.length=0,t}function Gn(e){let t=Wn(e);for(let t=0;t<e.ln.length;t++){let n=e.ln[t];n.T.Re!==null&&hn(n)===e&&(n.T.Re=null,rr(n))}fn===e&&(fn=null),t?F.rn[1].push(()=>Kn(e)):Kn(e)}function Kn(e){for(let t=0;t<2;t++)qn(F.rn[t],e.rn[t]),e.rn[t]=[]}function qn(e,t){for(let n=0;n<t.length;n++)e.push(t[n])}var Jn=[];function Yn(e,t){t.fn.push(e),e.R|=lt}function Xn(e){Jn.push(e),F.Y||yi()}var Zn=0;function Qn(){Zn++}function $n(e){e.we=Zn;let t=!!(e.l&512)&&e.T?.De!==void 0;for(let n=e.o;n!==null;n=n.t){let r=n.u;r.R&4&&n.Ne===r.de&&(n!==r._||!e.X)&&(r.R|=ut),t&&r.l&8?r.R|=256:(sr(r),r.R&8388608&&pr(r._parent,1))}}function er(e){e.Ae=!0,F.enqueue(e.i,e.W??=Un.q.bind(null,e))}function tr(e){return e.ue!==M&&(e.le=e.ue,e.ue=M)}function nr(e){return!(e.m&4)&&!!e.T?.Ee&&!e.T.Ve&&(e.ue=M,!0)}function rr(e){if(!e.X){e.l&=-385,tr(e);return}let t=!!(e.m&1)&&(e.ue===M||nr(e)),n=e.l&yt;if(!t&&e.T&&(e.T.Te=null),e.l=t?e.l&-1048833|vt:e.l&-3147137,n){let t=e.ue;e.ue=M,e.ie=P+1,Kr(e,2,t)}else tr(e)&&(e.m&=-5,e.T!=null&&(e.T.Ve=!1,e.T.je=M),e.i&&e.i!==3&&er(e));e.Ie=!1,e.R&=~ct,e.T?.U??yr(e),e.m&1||(e.m&=-5),!t&&e.T!=null&&(e.T.me!==null||e.T.Le!==null)&&Un.Ce(e,!1,!0)}function ir(){for(let e=0;e<Jn.length;e++){let t=Jn[e];t.l&2304||rr(t)}Jn.length=0}var F=new Un;function ar(e){if(In>0)return e?e():void 0;if(e){Fn++;try{return e()}finally{try{ar()}finally{Fn--}}}if(!F.Y&&!Nn){for(;Mn;)F.flush();Ot()}}function or(e,t){for(let n=0;n<e.length;n++)e[n](t)}function sr(e){N.Fe>e.he&&(N.Fe=e.he),lr(e,N)}function cr(e,t){let n=(e._parent?.Qe?e._parent.Ke?.he:e._parent?.he)??-1;n>=e.he&&(e.he=n+1);let r=e.he,i=t.et[r];if(i===void 0)t.et[r]=e;else{let t=i.We;t.ve=e,e.We=t,i.We=e}r>t.Et&&(t.Et=r)}function lr(e,t){let n=e.R;n&12||(n&1?e.R=n&-4|10:(e.R=n|8,t.p&&pr(e)),n&16||cr(e,t))}function ur(e,t){let n=e.R;n&28||(e.R=n|16,cr(e,t))}function dr(e,t){let n=e.R;if(!(n&24))return;e.R=n&-25;let r=e.he;if(e.We===e)t.et[r]=void 0;else{let n=e.ve,i=t.et[r],a=n??i;e===i?t.et[r]=n:e.We.ve=n,a.We=e.We}e.We=e,e.ve=void 0}function fr(e){if(!e.p){e.p=!0;for(let t=0;t<=e.Et;t++)for(let n=e.et[t];n!==void 0;n=n.ve)n.R&8&&pr(n)}}function pr(e,t=2){let n=e.R;if(!((n&3)>=t)){e.R=n&-4|t;for(let t=e.o;t!==null;t=t.t)pr(t.u,1)}}function mr(e,t){for(e.p=!1,e.Fe=0;e.Fe<=e.Et;e.Fe++){let n=e.et[e.Fe];for(;n!==void 0;)n.R&8?t(n):hr(n,e),n=e.et[e.Fe]}e.Et=0}function hr(e,t){dr(e,t);let n=e.he;for(let t=e.C;t;t=t.G){let e=t.S;e.X&&e.he>=n&&(n=e.he+1)}if(e.he!==n){e.he=n,gr(e,n);for(let n=e.o;n!==null;n=n.t)n.u!==e._parent&&ur(n.u,t)}}function gr(e,t){for(let n=e.pe;n;n=n.Ge)if(n.Qe)gr(n,t);else if(n.he<=t){let e=n.R&24;dr(n,N),n.he=t+1,e&&(e&8?lr:ur)(n,N),gr(n,t+1)}}var _r;function vr(e){let t=e.S,n=e.G,r=e.t,i=e.en;return r===null?t.Ze=i:r.en=i,i===null?(t.o=r,r===null&&(t.l&4096?_r(t):t.T?.Ye&&Dt(t.T.Ye),t.X&&t.l&32&&!(t.R&32)&&!(t.m&1)&&(xr?xr.push(t):Cr(t)))):i.t=r,n}function yr(e){let t=e._,n=t===null?e.C:t.G;if(n!==null){do n=vr(n);while(n!==null);t===null?e.C=null:t.G=null}}function br(e){e.C&&(e._=null,yr(e))}var xr=null,Sr=e=>xr=e;function Cr(e){dr(e,N),br(e),kt(e,!0)}var wr=new wt;function Tr(){if(wr.size!==0){for(let e of wr)!e.o&&e.l&32&&!(e.m&1)&&!(e.R&96)&&Cr(e);wr.clear()}}function Er(e,t){let n=t._;if(n!==null&&n.S===e)return;let r=null,i=t.R&4;if(i&&(r=n===null?t.C:n.G,r!==null&&r.S===e))return r.Ne=t.de,t._=r;let a=e.Ze;if(a!==null&&a.u===t&&(!i||a.Ne===t.de))return;let o=t._=e.Ze={S:e,u:t,G:r,en:a,t:null,Ne:t.de};n===null?t.C=o:n.G=o,a===null?e.o=o:a.t=o,Qn()}function Dr(e,t){return!e.T?.se?.has(t)&&(($r(e).se??=new wt).add(t),!0)}function Or(e,t){let n=e.T?.se;return n?.delete(t)?(n.size||(e.T.se=void 0),!0):!1}function kr(e){e.T!==null&&(e.T.Ee=null)}function Ar(e){e.T!==null&&(e.T.se=void 0)}function jr(e,t){for(let n=e.C;n;n=n.G){let e=n.S;if(!(e.R&64)&&(e===t?e.m&1:e.T?.se?.has(t)))return!0}return!1}function Mr(e,t){$r(e).fe=!0,t.source&&Dr(e,t.source),e.m&2||Nr(e,t.source,t)}function Nr(e,t,n){if(!t){e.T!==null&&(e.T.U=null);return}let r=n instanceof A&&n.source===t?n:e.T?.U;$r(e).U=r instanceof A&&r.source===t?r:new A(t)}function Pr(e,t){for(let n=e.o;n!==null;n=n.t)t(n.u,n)}function Fr(e,t){let n=new wt,r=e=>{let i=n.has(e);t(e,i)!==!1&&!i&&(n.add(e),Pr(e,r))};Pr(e,r)}function Ir(e){e.X&&e.l&32&&!e.o&&!(e.R&32)&&!(e.m&1)&&(e.R&8?e.R|=j:Cr(e))}function Lr(e){let t;if(Fr(e,(e,n)=>{!n&&!e.o&&e.l&32&&(t??=[]).push(e)}),t)for(let e of t)Ir(e)}function Rr(e,t,n){return!(e.l&256||n&&e.R&16384&&F.Y&&!e.rr)||dn?!1:(Ar(e),e.T&&(e.T.fe=!1),(e.m&=6)&2||Nr(e),e.ue=t instanceof ot?t:new ot(e,t),e.l|=128|yt,Br(e),Rn(),!0)}function zr(e,t){let n=!1;Fr(e,(e,r)=>{!r&&e.T?.U===t&&(sr(e),n=!0)}),n&&Rn()}function Br(e,t=e){Or(e,t);let n=!1,r;if(Fr(e,(i,a)=>{if(a||t!==e&&jr(i,t)||!Or(i,t))return!1;i.ie=P;let o=i.T?.se?.values().next().value,s=i.m&2;o?s||Nr(i,o):(i.m&=-2,s||Nr(i),i.l&256&&!(t.m&1)&&vn(hn(i)),i.T?.fe&&(sr(i),n=!0),i.T!==null&&(i.T.fe=!1),!i.o&&i.l&32&&(r??=[]).push(i),an?.(i,e))}),r)for(let e of r)Ir(e);n&&Rn()}function Vr(e){return typeof e==`object`&&!!e&&typeof e.then==`function`}function Hr(e){let t=e.T?.Se;t!=null&&(e.T.Se=null,t())}function Ur(e,t,n,r){let i=!1,a=!1;if(typeof t==`object`&&t&&mi(()=>{i=t[Symbol.asyncIterator],a=!i&&Vr(t)}),!a&&!i)return e.T!==null&&(e.T.Ee=null),e.Ie=!1,t;$r(e).Ee=t,e.T.ce=Ln||2147483647,e.T.se=void 0;let o,s=n=>{if(e.T?.Ee!==t)return;let i=n instanceof A;i&&e.Ie?(kr(e),Mr(e,n),e.ie=P):((i||!Rr(e,n))&&(Kr(e,i?1:2,n),i||kt(e,!1,!0)),i&&Br(e),e.ie=P,i||Lr(e),r?.(n,i))},c=(r,i)=>{if(e.T?.Ee!==t||e.R&2)return;let a=rn&&Jn.some(e=>e.ue!==M),o=e.m&4;if(Gr(e),n){if(!n(r,o,s))return}else Pi(e,()=>r);e.ue===M&&(e.Ie=!1,yr(e)),Br(e),Rn(),(i||!a)&&ar(),i?.()},l=()=>e.l&32&&!e.o&&!(e.m&1)?(Cr(e),!0):!1,u=(n,r)=>{let i=n[Symbol.asyncIterator](),a=!1,u=!1,d=!r,f=()=>{if(!u){u=!0;try{let e=i.return?.();Vr(e)&&e.then(void 0,()=>{})}catch{}}};Lt(f,r),$r(e).Se=f;let p=()=>{try{l()||m()}catch(e){s(e)}},m=()=>{let n,r,f=!1,h=!1,g=!0,_=i.next();if((Vr(_)?_:{then:e=>void e(_)}).then(r=>{if(g&&d)n=r,f=!0,r.done&&(u=!0);else if(e.T?.Ee!==t)return;else r.done?(u=!0,a?(Rn(),ar()):c(void 0),l()):(a=!0,c(r.value,p))},n=>{g&&d?(r=n,h=!0):e.T?.Ee===t&&(u=!0,s(n),l())}),g=!1,h){if(u=!0,s(r),d)throw r;return!0}return f&&!n.done?(o=n.value,a=!0,m()):f&&n.done},h=m();return d=!1,a||h},d=null,f=(e,t)=>{let n=!1;if(typeof e==`object`&&e&&mi(()=>{n=e[Symbol.asyncIterator]}),!n)return!1;o=void 0;let r=u(e,t);return t||(d=r),!0};if(a){let n=!1,r=!1,i,a=!0;if(t.then(r=>{if(a)o=r,n=!0;else{try{if(e.T?.Ee===t&&!(e.R&64)&&f(r,e))return;c(r)}catch(e){s(e)}l()}},e=>{a?(i=e,r=!0):(s(e),l())}),a=!1,r)throw s(i),i;n?f(o)||(e.Ie=!1):d=!1}if(i&&f(t),d!==null){if(!d){if(e.Ie)return e.le;throw new A(I)}e.Ie=!1}return o}function Wr(e,t=!1){e.T?.se&&Ar(e),e.T?.fe&&(e.T.fe=!1),e.m=t?0:e.m&4,e.T?.U&&Nr(e);let n=ci(e);n&&n.call(e)}function Gr(e,t=!1){let n=e.T?.se;n&&(n.delete(e),n.size)?(e.T.fe=!1,t&&(e.m=1),Nr(e,n.values().next().value)):Wr(e,t)}function Kr(e,t,n){t===2&&!(n instanceof ot)&&!(n instanceof A)&&(n=new ot(e,n));let r=t===1&&n instanceof A&&n.source;r?(e.m&2&&(e.T.Te=e.T.U),Dr(e,r)):Ar(e),e.m=t|(t===2?e.m&12?8:0:t===1&&e.m&8?4:e.m&4),r?Nr(e,r,n):$r(e).U=n;let i=ci(e);i?i.call(e):qr(e,t,n)}function qr(e,t,n){let r=t===1&&n instanceof A&&n.source;Pr(e,(i,a)=>{i.ie=P,i.l&16384||t===1&&a.Ne!==i.de?(t!==1&&Or(i,e)&&Br(i,e),sr(i),Rn()):r&&i.T?.se?.has(r)?dn===null&&(i.l&2304)==256&&F.Y&&!Yt?.(i,r.ie===P)&&vn(hn(i)):(r||t!==1&&(i.T?.U!==n||i.T?.se))&&(Xn(i),t===1&&(i.l&2304)==256&&!i.i&&vn(hn(i)),Kr(i,t,n),i.rr?.st(t,n))})}Un._e=e=>{e.i===3?(dr(e,N),e.Ae=!0,F.enqueue(2,e.Z)):e.R&32&&!(e.R&65536)?On(e):Xr(e)},Un.Ce=kt;var Jr=!1,I=null,Yr;function Xr(e,t=!1){Qn();let n=e.i,r,i=dn,a=Vt&&(Yr=t&&(i||Yr)),o=e.l&yt;if(!t){if(dr(e,N),e.T!==null&&(e.T.Ee=null,Hr(e)),e.l&256){let t=hn(e);t.P||e.l&524288||(e.l&8421376?t!==fn&&!(e.m&4||e.l&1048576)&&(e.ue!==M&&$n(e),e.ue=M,e.l&=-257):mn(t,Yt?.(e,e.m&4)))}if(n===3||e.l&128){let t=xr;Sr(r=[]),kt(e),Sr(t)}else(e.pe!==null||e.ke!==null)&&ii(e);e.l&2097152&&(e.ue=M,e.l^=yt)}let s=e.m&4,c=e.m&2&&e.T?.U,l=!!(e.m&1)&&e.T?.se,u=e.T?.se?.has(e),d=!1,f=!!(e.R&8192)&&!((e.m&1||e.ue!==M&&!(e.R&1024))&&e.T!==null&&!e.T.Ve),p=I;I=e,e._=null,e.de++;let m=e.R&j;e.R=4|e.R&(32|dt),e.ie=P;let h=e.ue===M?e.le:e.ue,g=e.he,_=!1,v=!1,y=Jr;Jr=!0;try{if(e.l&64)h=e.X(h),e.T!==null&&(e.T.Ee=null),e.Ie=!1;else{let t=e.T?.Ee,n=e.X(h),r=typeof n==`object`&&!!n,i=e.T?.Ee!==t;h=i||!r?n:Ur(e,n),!i&&!r&&(e.T!==null&&(e.T.Ee=null),e.Ie=!1)}(e.m!==0||e.T!==null)&&Wr(e,t)}catch(t){let n=t instanceof A;if(n&&e.Ie)Mr(e,t);else if((n||!(d=Rr(e,t,!0)))&&(n&&($r(e).fe=!0),Kr(e,n?1:2,t),n&&u&&!e.T?.Ee&&Br(e)),(n||d)&&l)for(let t of l)t!==e&&!(e.T?.se?.has(t)&&(t.m&1||jr(e,t)))&&Br(e,t)}finally{if(Jr=y,_=(e.R&ut)!==0,v=!!(e.R&(a?i||n||!(e.m&1)?128|ft:0:128)),e.R=e.R&(96|lt|ft|pt|mt|ht)|(t?e.R&256:0),I=p,r)for(let e of r)Ir(e);e.T!==null&&(e.T.Ve=f&&!!(e.m&1))}if(e.R&64){br(e),kr(e);return}let b=!!e.T?.U||d;if(!b){let r=e.ue===M,i=r?e.le:e.ue,d=fn??pn,f=r&&s&&!n||!!e.T?.Te||!!(c&&d)||!!o||!Ni(e,i,h);if(n&&f&&!(e.R&262144&&!e.Ae&&Object.is(e.ge,h))&&r&&(e.Ae=!e.T?.U,t||F.enqueue(n,e.W??=Un.q.bind(null,e),null)),!b){if(f)(t?!(d!==null&&(v||ri(p)?.R&128)):n&&e.ue===M)?e.le=h:(e.ue=h,c&&(e.T.Te=c),t&&(kn(e,d),e.m|=4,Yt?.(e,!a&&fn))),e.o!==null&&$n(e);else if(e.he!=g)for(let t=e.o;t!==null;t=t.t)ur(t.u,N)}if(!f&&!e.T?.U&&(c&&zr(e,c),l))for(let t of l)t!==e&&Br(e,t);u&&!(e.m&5)&&Br(e)}if(t&&v&&e.m&1){let t=fn??pn;t&&!t.P&&(n&&Yt?.(e)===2||kn(e,t))}!e.T?.U&&e.ue===M&&!(n&&e.Ae)&&(t||n===3?yr(e):En(e)),(e.ue!==M||e.T!==null&&(e.T.me!==null||e.T.Le!==null)||e.m&5&&(!t||e.m&1))&&(e.l|=128,Xn(e)),_&&(sr(e),Rn()),m&&Ir(e)}function Zr(e){if(!(e.R&68)){if(e.R&1)for(let t=e.C;t;t=t.G){let n=t.S;if(n.X&&Zr(n),e.R&2)break}(e.R&2||e.T?.U&&e.ie<P&&!e.T?.Ee)&&Xr(e),e.R&=376|ct|lt|ft|pt|mt|ht}}function Qr(e,t){let n=t?.transparent??!1,r=typeof t==`object`&&!!t&&`loadingValue`in t,i={id:Pt(t,n,I),l:(n?4:0)|!!t?.ownedWrite|(!I||t?.lazy?32:0)|(t?.sync?64:0)|(t?.ae?2:0)|(t?.xe??0),ye:t?.equals??fi,ke:null,A:I?.A??St,be:0,X:e,le:r?t.loadingValue:void 0,he:0,ve:void 0,We:null,C:null,_:null,de:0,o:null,Ze:null,_parent:I,Ge:null,Me:null,pe:null,R:t?.lazy?512:0,m:r?0:4,ie:P,ue:M,we:-1,Ie:r,T:null};return t?.unobserved&&($r(i).Ye=t.unobserved),ui(i,t),i}function $r(e){return e.T??={Ee:null,Se:null,U:void 0,fe:void 0,se:void 0,Ye:void 0,De:void 0,me:null,Le:null,Re:null,Ve:!1,je:M,Be:-1,ce:0,Ue:!1,I:0,Te:null}}function ei(e,t){e.R|=128,(t.m&4||e.i!==1)&&mn(hn(t),!e.i&&e.m&4||Yt?.(e))}function ti(e,t){let n=nn&&e.l&32768,r=Vt&&dn!==null;if(!(n&&sn(e,t))&&!((!r||e.m&4&&t.m&1)&&!n&&(!(e.l&1<<23)||t.l&1024))){let i=hn(t);if(r&&dn.over&&_n(dn.over)===i&&!n)return!1;if(!(!r&&i===fn&&!n||ni(e,i)))return Yn(e,i),(r||n)&&qt(e,t),!0}return ei(e,t),!1}function ni(e,t){return(e.m&4||e.l&1048576)&&e.l&256&&hn(e)===t}function ri(e){return e!==null&&e.Qe?e.Ke:e}function ii(e){Tt(e);let t=$r(e);t.Le=e.ke,t.me=e.pe,e.ke=null,e.pe=null,e.be=0}function ai(e,t,n,r,i){let a=i?.transparent??!1,o={id:Pt(i,a,I),l:r<<23|(a?4:0)|!!i?.ownedWrite|(i?.sync?64:0)|(i?.xe??0),ye:!1,ke:null,A:I?.A??St,be:0,X:e,le:void 0,he:0,ve:void 0,We:null,C:null,_:null,de:0,o:null,Ze:null,_parent:I,Ge:null,Me:null,pe:null,R:512,m:4,ie:P,ue:M,we:-1,Ie:!1,Ae:!1,ge:void 0,qe:t,Je:n,ze:void 0,i:r,T:null};return i?.unobserved&&($r(o).Ye=i.unobserved),ui(o,li),o}var oi=null;function si(e){oi=e}function ci(e){return e.i?oi:null}var li={lazy:!0};function ui(e,t){e.We=e;let n=I?.Qe?I.Ke:I;I&&At(I,e),n&&(e.he=n.he+1),cn?.(e),!t?.lazy&&Xr(e,!0)}function di(e,t){let n={ye:t?.equals??fi,l:+!!t?.ownedWrite|(t?.ae?2:0),le:e,o:null,Ze:null,ie:P,ue:M,we:-1,T:null};return t?.unobserved&&($r(n).Ye=t.unobserved),n}function fi(e,t){return e===t}var pi=null;function mi(e,t){let n=Jr;Jr=!1;try{return e()}finally{Jr=n}}var hi=0;function gi(e,t){if(e.R&512)e.R&=-513,Xr(e,!0);else if(e.R&64&&e.l&32){let t=e._parent;if(t!==null){if(t.R&64){e.l&=-33;return}e.R&32||At(t,e)}Xr(e,!0)}}function _i(e,t){return!t||e.ue===M||t.l&16}var vi=!1;function yi(){vi=!0}function bi(e){return F.Y||e.ue===M||e.l&4194304?M:e.l&256?e.T.Be===P?e.T.je:M:e.le}function xi(e){let t=e.T;t.Be!==P&&(t.je=e.ue,t.Be=P,vi=!0)}var Si=[];function Ci(e){return e.R|=ut,!0}function wi(){if(vi=!1,Si.length!==0){for(let e of Si)e.l&=~bt;Si.length=0}}function Ti(e,t){e.he>=N.Fe||e.R&1?(pr(t),fr(N),Zr(e)):t.l&65536&&Zr(e);let n=e.he;e._parent===t?e.R|=gt:n>=t.he&&gr(t,t.he=n+1)}function Ei(){return I.R&lt}function Di(e){let t=I;if(t?.Qe&&(t=t.Ke),pi!==null)return pi(e,t);if(typeof e.X==`function`&&gi(e),!e.X&&e.T?.De===void 0&&(!vi||e.ue===M)&&!(e.l&2048))return t&&(Jr&&Er(e,t),e.l&256&&!(t.l&16)&&ti(t,e))||!t||e.ue===M||t.l&16||e.ue===e.le&&Object.is(e.ue,e.le)?e.le:(Ai(t),e.ue);let n=!1,r;if(t&&(Jr&&(r=Er(e,t),e.X&&Ti(e,t)),e.l&256&&!(e.l&2048)&&!(t.l&16)&&(e.m&4?ei(t,e):n=ti(t,e))),e.m&1&&!n){if(t){if(!(t.l&16)||e.m&4)throw!Jr&&e!==t&&Er(e,t),e.T?.U}else if(e.m&4)throw e.T?.U}if(e.X&&e.m&2){if(r&&e.ie<P&&!(e.R&32))return Xr(e),Di(e);throw!n&&e.l&2097152&&ki(e,t),e.T?.U}(n||!t)&&Oi(e);let i=ki(e,n?null:t);return!t&&typeof e.X==`function`&&e.l&32&&!(e.m&1)&&!e.o&&(wr.add(e),Rn()),i}function Oi(e){if(e.T?.Te)throw e.T.Te}function ki(e,t){if(e.ue!==M&&e.m&4&&(!t||t.l&16)){if(hi>0){let t=ri(I);if(t&&e.l&256&&ni(t,hn(e)))return e.ue}throw new A(null)}let n=t&&vi?bi(e):M;if(n!==M)return Ci(t),n;if(_i(e,t))return e.le;if(Ai(t,e),e.l&2097152)throw e.ue;return e.ue}function Ai(e,t){t?.m&4||(e.R|=ft)}function ji(e){F.Y||e.l&4194304||(e.l|=bt,Si.push(e))}var Mi=null;function Ni(e,t,n){if(e.ye===fi)return t===n;try{return e.ye&&e.ye(t,n)}catch(t){if(!(t instanceof A))return Kr(e,2,t),!0}}function Pi(e,t){Mi!==null&&Mi(e);let n=e.ue===M?e.le:e.ue;if(typeof t==`function`&&(t=t(n)),e.l&256&&vn(hn(e)),!(e.m&4||e.T?.Te||!Ni(e,n,t)))return t;let r=e.ue!==M;return r?e.l&256&&!F.Y&&xi(e):Xn(e),e.ue=t,I!==null&&ji(e),e.X!==void 0&&(e.ie=P),r&&e.we===Zn||($n(e),Rn()),t}function Fi(e,t){let n=e.l&256&&!(e.R&1024)&&hn(e)!==fn;if(n&&typeof t==`function`){let n=t(e.le);t=()=>n}return e.m&2&&(e.T.Te=e.T.U,Kr(e,0)),t=Pi(e,t),e.l&=~yt,n?(e.R=e.R&-2|2,lr(e,N),Rn()):e.ue!==M&&(e.R|=ct),t}function Ii(e,t){let n=I,r=Jr;I=e,Jr=!1;try{return t()}finally{I=n,Jr=r}}var Li=null;function Ri(e,t,n,r){let i=ai(e,t,n,r?.user?2:1,r);Xr(i,!0),r?.defer?tr(i):i.ue===M&&(i.T?.Re?.P||i.i===2||r?.schedule?F.enqueue(i.i,Vi.bind(null,i),i.T?.Re):Vi(i,0))}function zi(){let e=this.m,t=this.T?.U;if(e&2){if(F.notify(this,1,0),this.i===2){this.m&2&&er(this);return}Bi(this,st(t))}else this.i===2?e&1&&this.Ae&&!t?.source?.T?.Ve&&($r(this).fe=!(this.Ae=!1)):this.i===1&&F.notify(this,3,e,t)}function Bi(e,t,n){if(!F.notify(e,2,2))throw Vn(t),t}function Vi(e,t){if(!e.Ae||e.R&64||t&&Qt?.(e)||t&&on?.(e))return;if(e.m&2&&e.i===2){let t=st(e.T?.U);e.ge=e.le,e.Ae=!1;try{e.Je?e.Je(t,()=>{let t=e.ze;e.ze=void 0,t?.()}):console.error(t)}catch(t){Bi(e,t)}return}let n=e.T?.U==null,r=e.ze;e.ze=void 0;try{r?.(),e.ze=e.qe(e.le,e.ge)}catch(t){$r(e).U=new ot(e,t),e.m|=2,Bi(e,t)}finally{e.ge=e.le,e.Ae=!1,n&&yr(e)}}Un.q=Vi,si(zi);var Hi=Symbol(0),Ui=Symbol(0),Wi=Symbol(0),Gi=Symbol(0);function Ki(e){return Reflect.ownKeys(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}var qi=null;function Ji(e){return Lt(e)}function Yi(e){let t=Di.bind(null,e);return t[Ct]=e,t}function Xi(e,t){if(typeof e==`function`){let n=Qr(e,t);return n.l&=-33,[Yi(n),Fi.bind(null,n)]}let n=di(e,t);return Li!==null&&Li(n),[Yi(n),Pi.bind(null,n)]}function Zi(e,t){return Yi(Qr(e,t))}function Qi(e,t,n){Ri(e,t.effect||t,t.error,{user:!0,...n})}function $i(e,t,n){Ri(e,t,void 0,n)}function ea(e,t,n){let r=typeof n?.keyed==`function`?n.keyed:void 0,i=t.length>1,a=t,o={H:zt(),it:0,st:e,ot:[],ft:a,ht:[],ln:[],Xe:r,ct:r||n?.keyed===!1?[]:void 0,lt:i&&n?.keyed!==!1?[]:void 0,ut:n?.keyed===!1,L:n?.fallback},s=Qr(sa.bind(o),void 0);return s.l&=-33,Yi(s)}var ta={ownedWrite:!0};function na(e,t,n,r){let i=e.ot,a=e.it-1,o=[],s=[],c=[],l=256,u=r,d=r;for(;u<=a&&d<=n-1;){let e=i[u],r=t[d];if(e===r){let e=u;do d++;while(++u<=a&&d<n&&i[u]===t[d]);c.push(e,d-u+e,u-e);continue}let f=-1,p=Math.min(32-o.length,a-u,l);for(let e=1;e<=p;e++)if(i[u+e]===r){f=e;break}l-=f===-1?p:f;let m=-1;p=Math.min(32-s.length,n-1-d,l);for(let n=1;n<=p;n++)if(t[d+n]===e){m=n;break}if(l-=m===-1?p:m,f!==-1&&(m===-1||f<=m))for(;f-->0;)o.push(u++);else if(m!==-1)for(;m-->0;)s.push(d++);else{if(l<=0||o.length===32||s.length===32)return!1;o.push(u++),s.push(d++)}}for(;u<=a;u++){if(o.length===32)return!1;o.push(u)}for(;d<=n-1;d++){if(s.length===32)return!1;s.push(d)}return ra(e,t,n,r,o,s,c)}function ra(e,t,n,r,i,a,o){let s=e.ot,c,l,u;if(a.length!==0)for(u=Array(i.length),l=0;l<a.length;l++){let e=-1;for(c=0;c<i.length;c++)if(!u[c]&&s[i[c]]===t[a[l]]){e=c;break}if(e===-1)return!1;u[e]=!0,a[l]=a[l]<<6|e}for(c=0;c<i.length;c++){let e=s[i[c]];if(e===void 0)return!1;for(l=r-1;(l=s.indexOf(e,l+1))!==-1;)if(!i.includes(l))return!1}let d=e.ht,f=e.ln,p=d.slice(0,n),m=f.slice(0,n);for(let e=0;e<o.length;e+=3){let t=o[e],n=o[e+1];if(t!==n)for(let r=0;r<o[e+2];r++)p[n+r]=d[t+r],m[n+r]=f[t+r]}for(l=0;l<a.length;l++){let e=a[l]>>6,t=i[a[l]&63];p[e]=d[t],m[e]=f[t]}for(e.ht=p,e.ln=m,e.it=n,e.ot=t,c=0;c<i.length;c++)(u===void 0||!u[c])&&f[i[c]].dispose();return!0}function ia(e,t,n,r,i,a,o,s,c){let l=e.Xe,u=e.ot,d=e.ln,f=[],p=n;for(let m=n;m<=i;p++,m++){let i=l?l(t[m]):t[m];for(;p<=r&&(l?l(u[p]):u[p])!==i;)f.push(d[p++]);if(p>r)return o.fill(void 0),null;a[m]=e.ht[p],o[m-n]=d[p],s&&(s[m-n]=e.ct[p]),c&&(c[m-n]=e.lt[p])}for(;p<=r;p++)f.push(d[p]);return f}function aa(e,t,n,r,i,a,o,s,c){let l=e.ln,u=e.ct,d=e.lt,f=e.it,p=n-f,m,h;if(p>0)for(l.length=n,u&&(u.length=n),d&&(d.length=n),m=f-1,h=n-1;m>i;m--,h--)l[h]=l[m],u&&(u[h]=u[m]),d&&(d[h]=d[m]);else if(p<0){for(m=i+1,h=a+1;m<f;m++,h++)l[h]=l[m],u&&(u[h]=u[m]),d&&(d[h]=d[m]);l.length=n,u&&(u.length=n),d&&(d.length=n)}for(h=r;h<=a;h++)l[h]=o[h-r],u&&oa(u[h]=s[h-r],t[h]),d&&Pi(d[h]=c[h-r],h);for(h=a+1;h<n;h++)u&&oa(u[h],t[h]),d&&p!==0&&Pi(d[h],h)}var oa=(e,t)=>e.le===t&&e.ue===M||Pi(e,t);function sa(){this.H.Ke=It();let e=this.st()||[];e[Hi],e=qi?.(e[Ui])??e;let t=e.length;return Ii(this.H,ca.bind(this,e,t)),this.ht}function ca(e,t){let n=e.slice(0),r,i,a,o,s,c=this.ct?this.ut?()=>(o[a]=di(n[i],ta),this.ft(Yi(o[a]),i)):()=>(o[a]=di(n[i],ta),s&&(s[a]=di(i,ta)),this.ft(Yi(o[a]),s?Yi(s[a]):void 0)):this.lt?()=>{let e=n[i];return s[a]=di(i,ta),this.ft(e,Yi(s[a]))}:()=>{let e=n[i];return this.ft(e)};if(t===0)this.it!==0&&(this.H.dispose(!1),this.ln=[],this.ot=[],this.ht=[],this.it=0,this.ct&&=[],this.lt&&=[]),this.L&&!this.ht.length&&(this.ln[0]?.dispose(),this.ht[0]=Ii(this.ln[0]=zt(),this.L));else if(this.it===0){let e=Array(t),l=Array(t);o=this.ct&&Array(t),s=this.lt&&Array(t);try{for(i=0;i<t;i++)a=i,e[i]=Ii(l[i]=zt(),c)}catch(e){for(r=0;r<=i;r++)l[r]?.dispose();throw e}this.ln[0]&&this.ln[0].dispose(),this.ht=e,this.ln=l,o&&(this.ct=o),s&&(this.lt=s),this.ot=n,this.it=t}else{let e,l,u,d,f,p,m,h,g;for(e=0,l=Math.min(this.it,t);e<l&&(this.ot[e]===n[e]||this.ct&&la(this.Xe,this.ot[e],n[e]));e++)this.ct&&oa(this.ct[e],n[e]);for(l=this.it-1,u=t-1;l>=e&&u>=e&&(this.ot[l]===n[u]||this.ct&&la(this.Xe,this.ot[l],n[u]));l--,u--);if(e===t&&this.it===t){this.ot=n;return}if(t<=this.it&&l-e>64&&this.ct===void 0&&this.lt===void 0){let r=e+(u-e>>1),i=n[r],a=Math.min(l,r+32),o=Math.max(e,r-32);for(;o<=a&&this.ot[o]!==i;)o++;if(o<=a&&na(this,n,t,e))return}let _=t-this.it,v=u-e+1,y=Array(t),b=Array(v);o=this.ct?Array(v):void 0,s=this.lt?Array(v):void 0;let x=_<0?ia(this,n,e,l,u,y,b,o,s):null;if(x!==null)x.length!==0&&(h=x);else{for(p=/* @__PURE__ */ new Map,m=Array(v),i=u;i>=e;i--)d=n[i],f=this.Xe?this.Xe(d):d,r=p.get(f),m[i-e]=r===void 0?-1:r,p.set(f,i);for(r=e;r<=l;r++)d=this.ot[r],f=this.Xe?this.Xe(d):d,i=p.get(f),i!==void 0&&i!==-1?(y[i]=this.ht[r],b[i-e]=this.ln[r],o&&(o[i-e]=this.ct[r]),s&&(s[i-e]=this.lt[r]),i=m[i-e],p.set(f,i)):(h??=[]).push(this.ln[r]);try{for(i=e;i<=u;i++)b[i-e]===void 0&&((g??=[]).push(b[i-e]=zt()),a=i-e,y[i]=Ii(b[i-e],c))}catch(e){if(g)for(r=0;r<g.length;r++)g[r].dispose();throw e}}for(r=0;r<e;r++)y[r]=this.ht[r];for(i=u+1;i<t;i++)y[i]=this.ht[i-_];if(aa(this,n,t,e,l,u,b,o,s),this.ht=y,this.it=t,this.ot=n,h)for(r=0;r<h.length;r++)h[r].dispose()}}function la(e,t,n){return!e||e(t)===e(n)}function ua(e,t){if(typeof e==`function`&&!e.length){if(t?.doNotUnwrap)return e;do e=e();while(typeof e==`function`&&!e.length)}if(!t?.skipNonRendered||e!=null&&e!==!0&&e!==!1&&e!==``){if(Array.isArray(e)){let n=[];return da(e,n,t)?()=>{let e=[];return da(n,e,{...t,doNotUnwrap:!1}),e}:n}return e}}function da(e,t=[],n){let r=null,i=!1;for(let a=0;a<e.length;a++)try{let r=e[a];if(typeof r==`function`&&!r.length){if(n?.doNotUnwrap){t.push(r),i=!0;continue}do r=r();while(typeof r==`function`&&!r.length)}Array.isArray(r)?i=da(r,t,n)||i:n?.skipNonRendered&&(r==null||r===!0||r===!1||r===``)||t.push(r)}catch(e){if(!(e instanceof A))throw e;r=e}if(r)throw r;return i}function fa(){return!0}var pa=Object.freeze({});function ma(e,t){return t===3?(e=e())||pa:e}function ha(e,t){let n=e.hidden;return typeof n==`function`?n(t):n.includes(t)}function ga(e){return ma(e.source,e.kind)}function _a(e){return e[Gi]}function va(e,t){if(t===0)return Object.keys(e);if(t===2||e[Wi]===e){let t=e[Ui];return(t?.px===e?t:Reflect).ownKeys(e)}return Object.keys(e)}function ya(e,t,n){return t===1?ha(e,n)?!1:e.kind===4?Ra(e.source,n):n in ga(e):n in ma(e,t)}function ba(e,t){return t===0?!0:t===1?e.kind===0||e.kind===4&&xa(e.source):!1}function xa(e){let t=e.sources,n=e.kinds;for(let e=0;e<t.length;e++)if(!ba(t[e],n[e]))return!1;return!0}function Sa(e,t=!0){return{configurable:!0,enumerable:t,get:e,set:fa}}function Ca(e,t,n,r=!1){if(t===1)return ha(e,n)?void 0:Ca(e.source,e.kind,n,r);if(t===4)return za(e,n);if(t===3)return r||n in ma(e,t)?Sa(()=>ma(e,t)[n]):void 0;if(t===2)return _a(e)===void 0?r||n in e?Sa(()=>e[n]):void 0:Reflect.getOwnPropertyDescriptor(e,n);let i=Reflect.getOwnPropertyDescriptor(e,n);if(i!==void 0)return i.get!==void 0||i.set!==void 0?Sa(()=>e[n],i.enumerable):i.configurable?i:{configurable:!0,enumerable:i.enumerable,writable:!0,value:i.value}}var wa=class{sources;kinds;table=0;keys=void 0;descs=void 0;constructor(e,t){this.sources=e,this.kinds=t}};function Ta(e){let t=e.table;if(typeof t!=`object`){let n=e.sources,r=e.kinds;for(let t=0;t<n.length;t++)if(!ba(n[t],r[t])){e.table=null;return}t=/* @__PURE__ */ new Map,Ea(t,e,void 0),e.table=t}return t===null?void 0:t}function Ea(e,t,n){let r=t.sources,i=t.kinds;for(let t=0;t<r.length;t++){let a=r[t];if(i[t]===1){if(a.kind===4){n===void 0?n=[a]:n.push(a),Ea(e,a.source,n),n.pop();continue}let t=a.source,r=Reflect.ownKeys(t);for(let i=0;i<r.length;i++){let o=r[i];!ha(a,o)&&!Da(n,o)&&Oa(e,o,t)}}else{let t=Reflect.ownKeys(a);for(let r=0;r<t.length;r++){let i=t[r];Da(n,i)||Oa(e,i,a)}}}}function Da(e,t){if(e!==void 0){for(let n=e.length-1;n>=0;n--)if(ha(e[n],t))return!0}return!1}function Oa(e,t,n){e.has(t)&&e.delete(t),e.set(t,n)}var ka=Object.prototype.propertyIsEnumerable;function Aa(e,t){let n=e.keys;if(n===void 0){n=e.keys=[];for(let[e,r]of t)ka.call(r,e)&&n.push(e)}return n}function ja(e,t,n){let r=t.get(n);if(r===void 0)return;let i=e.descs;i===void 0&&(i=e.descs=/* @__PURE__ */ new Map);let a=i.get(n);return a===void 0?(a=Ca(r,0,n),a===void 0?void 0:(i.set(n,a),a)):a.get===void 0?{configurable:!0,enumerable:a.enumerable,writable:a.writable,value:r[n]}:a}var Ma=16;function Na(e){let t=e.table;if(typeof t==`object`)return t===null?void 0:t;if(t+1<Ma)e.table=t+1;else return Ta(e)}function Pa(e){let t=e.table;return typeof t==`object`&&t?t:void 0}var Fa=Symbol();function Ia(e,t){let n=Pa(e);if(n!==void 0){let e=n.get(t);return e===void 0?Fa:e[t]}let r=e.sources,i=e.kinds;for(let e=r.length-1;e>=0;e--){let n=i[e];if(n===0){let n=r[e];if(t in n)return n[t]}else if(n===1){let n=r[e];if(ha(n,t))continue;if(n.kind===4){let e=Ia(n.source,t);if(e!==Fa)return e;continue}let i=ga(n);if(t in i)return i[t]}else{let i=ma(r[e],n);if(t in i)return i[t]}}return Fa}function La(e,t){let n=Ia(e,t);return n===Fa?void 0:n}function Ra(e,t){let n=Pa(e);if(n!==void 0)return n.has(t);let r=e.sources,i=e.kinds;for(let e=r.length-1;e>=0;e--)if(ya(r[e],i[e],t))return!0;return!1}function za(e,t){let n=Pa(e);if(n!==void 0)return ja(e,n,t);let r=e.sources,i=e.kinds;for(let n=r.length-1;n>=0;n--)if(ya(r[n],i[n],t))return Ca(r[n],i[n],t,!0)??Sa(()=>La(e,t))}function Ba(e,t,n){let r=[];return Va(e,n===void 0?void 0:[n],t,r,null),r}function Va(e,t,n,r,i){let a=e.sources,o=e.kinds;for(let e=0;e<a.length;e++){let s=a[e],c=o[e],l;if(c===1){if(s.kind===4){t===void 0?t=[s]:t.push(s),Va(s.source,t,n,r,i),t.pop();continue}l=s,c=s.kind,s=s.source}s=ma(s,c);let u=n?Ki(s):va(s,c);for(let e=0;e<u.length;e++){let n=u[e];l!==void 0&&ha(l,n)||Da(t,n)||Ha(r,i,n,s)}}}function Ha(e,t,n,r){let i=e.indexOf(n);i!==-1&&(e.splice(i,1),t!==null&&t.splice(i,1)),e.push(n),t!==null&&t.push(r)}function Ua(e,t){let n=Ta(e);if(n===void 0)return Ba(e,!0,t);let r=Aa(e,n);if(t===void 0)return r;let i=[];for(let e=0;e<r.length;e++)ha(t,r[e])||i.push(r[e]);return i}var Wa={get(e,t,n){if(typeof t==`symbol`){if(t===Wi)return n;if(t===Gi)return e;if(t===Ui)return}let r=e.table,i;if(typeof r!=`object`){if(r+1<Ma){e.table=r+1;let n=e.sources,i=e.kinds;for(let r=n.length-1;r>=0;r--){if(i[r]!==0)return La(e,t);let a=n[r][t];if(a!==void 0||t in n[r])return a}return}if(i=Ta(e),i===void 0)return La(e,t)}else if(r===null)return La(e,t);else i=r;let a=i.get(t);return a===void 0?void 0:a[t]},has(e,t){if(t===Wi)return!0;if(t===Ui||t===Gi)return!1;let n=Na(e);return n===void 0?Ra(e,t):n.has(t)},set:fa,deleteProperty:fa,getOwnPropertyDescriptor(e,t){if(t===Wi||t===Ui||t===Gi)return;let n=Na(e);return n===void 0?za(e,t):ja(e,n,t)},ownKeys(e){return Ua(e)}};function Ga(...e){if(e.length===1&&typeof e[0]!=`function`)return e[0];let t=Array(e.length),n=Array(e.length),r=0,i,a=0;for(let o=0;o<e.length;o++){let s=e[o];if(s){if(a++,i=s,typeof s==`function`)t[r]=Zi(s),n[r++]=3;else if(Wi in s){let e=_a(s);if(e instanceof wa)for(let i=0;i<e.sources.length;i++)t[r]=e.sources[i],n[r++]=e.kinds[i];else e===void 0?(t[r]=s,n[r++]=2):(t[r]=e,n[r++]=1)}else t[r]=s,n[r++]=0}}if(r!==t.length&&(t.length=r,n.length=r),xt)return a===1&&typeof i!=`function`?i:new Proxy(new wa(t,n),Wa);let o=Object.create(null),s=!1,c=t.length-1;for(let e=c;e>=0;e--){let n=t[e];if(!n){e===c&&c--;continue}let r=Object.getOwnPropertyNames(n);for(let t=r.length-1;t>=0;t--){let i=r[t];if(i!==`__proto__`&&i!==`constructor`&&!o[i]){s||=e!==c;let t=Object.getOwnPropertyDescriptor(n,i);o[i]=t.get?{enumerable:!0,configurable:!0,get:t.get.bind(n)}:t}}}if(!s)return t[c];let l={},u=Object.keys(o);for(let e=u.length-1;e>=0;e--){let t=u[e],n=o[t];n.get?Object.defineProperty(l,t,n):l[t]=n.value}return l}var Ka=!1;function qa(e){let t=Zi(e,{lazy:!0}),n=Zi(()=>ua(t()),{lazy:!0,sync:!0});return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var Ja={hydrating:!1,registry:void 0,done:!1},Ya=(...e)=>Zi(...e),L=Xi,Xa=Bt,Za=$i,Qa=(...e)=>Qi(...e);function R(e,t,n,r){return mi(()=>e(t||{}))}var $a=e=>{throw`Stale read from <${e}>.`};function eo(e){let t=`fallback`in e?{keyed:e.keyed,fallback:()=>e.fallback}:{keyed:e.keyed},n=It(),r,i=()=>Ii(n,()=>ea(()=>e.each,e.children,t));return Ja.hydrating&&(r=i()),()=>(r??=i())()}function to(e){let t=e.keyed,n=Zi(()=>e.when,void 0),r=t?n:Zi(n,{equals:(e,t)=>!e==!t,sync:!0});return Zi(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?mi(t?()=>a(i):()=>a(()=>(r()||$a(`Show`),n())),Ka):a}return e.fallback},{sync:!0})}function no(e){let t=qa(()=>e.children),n=Zi(()=>{let e=t.toArray(),n=()=>void 0;for(let t=0;t<e.length;t++){let r=t,i=e[t];if(i==null)continue;let a=n,o=Zi(()=>a()?void 0:i.when,void 0),s=i.keyed?o:Zi(o,{equals:(e,t)=>!e==!t,sync:!0});n=()=>{let e=a();if(e)return e;let t=s();return t?[r,t,o,i]:void 0}}return n},{sync:!0});return Zi(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a,o]=t,s=o.children;return typeof s==`function`&&s.length>0?o.keyed?mi(()=>s(i),Ka):mi(()=>s(()=>(mi(n)()?.[0]===r||$a(`Match`),a())),Ka):s},{sync:!0})}function ro(e){return e}var io={new_chat:`New chat`,copy:`Copy`,copied:`Copied`,copy_failed:`Copy failed`,confirm_delete:`Delete this conversation?`,announce_phone:`Waiting for an admin to approve on their phone.`,announce_approval:`An action needs your approval; its card is in the chat.`,announce_error:`Something went wrong; the message is in the chat.`,announce_done:`Reply finished`,confirm_undo:`Undo "{name}"?`,undone_notice:`Undone: {summary}`,continue_message:`Continue.`,photos_not_kept:`Photos aren't kept after they're sent. Attach them again to include them.`,photo_unreadable:`Couldn't read {name} as a photo.`,that_picture:`that picture`,load_error:`LLM Agent could not load: {error}`,no_provider:`No AI provider is configured. Add one under Settings → Devices & services → LLM Agent → Configure.`,hide_chats:`Hide chats`,show_chats:`Show chats`,conversations:`Conversations`,export_title:`Download this chat as Markdown`,export:`Export`,home_notes:`Home notes`,panel_settings:`Panel settings`,conversation:`Conversation`,search_chats:`Search chats`,no_matches:`No chats match.`,no_chats:`No chats yet.`,started_by_automation:`Started by an automation`,delete:`Delete`,delete_chat:`Delete chat`,notes_placeholder:`The office is upstairs.`,save:`Save`,characters_left:`{count} characters left`,notes_hint:`Short lasting facts and rules about this home. Enabled notes go into every chat. To change how the AI works, use "Extra instructions for the AI" in the integration's settings instead. Don't put passwords here.`,knowledge_hint:`Longer reference about this home. Only the titles and summaries go into each chat, and the AI reads an entry when a question needs it.`,notes_tab:`Notes`,knowledge_tab:`Knowledge`,add:`Add`,notes_none:`Nothing here yet.`,note_enabled:`Enabled`,note_from_ai:`from the AI`,delete_confirm:`Delete this?`,knowledge_title:`Title`,knowledge_summary:`One-line summary`,knowledge_body:`Text (Markdown)`,theme:`Theme`,theme_auto:`Follow Home Assistant`,theme_light:`Light`,theme_dark:`Dark`,text_size:`Text size`,size_small:`Small`,size_normal:`Normal`,size_large:`Large`,send_with:`Send with`,compact_layout:`Compact layout`,expand_tools:`Expand tool cards`,show_usage:`Show token use and cost`,my_default:`My default for new chats: {model}`,provider_default:`the provider's default`,model_provider_default:`provider default`,use_current_model:`Use the current model`,clear:`Clear`,prefs_hint:`These settings are kept in this browser.`,greeting_morning:`Good morning`,greeting_afternoon:`Good afternoon`,greeting_evening:`Good evening`,greeting_name:`{greeting}, {name}`,welcome_member:`I can control the devices shared with Assist and answer questions about them.`,welcome_admin:`I can control devices, answer questions about your home, and build automations, scenes, scripts and dashboards.`,mode_ask_all:`Ask before every change`,mode_ask_risky:`Ask before risky actions`,mode_reviewer:`Reviewer decides risky actions`,mode_autopilot:`Autopilot`,mode_yolo:`YOLO`,mode_read_only:`Read only`,edit:`Edit`,retry:`Retry`,continue:`Continue`,continue_anyway:`Continue anyway`,hide_preview:`Hide preview`,preview_dashboard:`Preview the dashboard`,suggested_note:`Suggested home note`,note_question:`Remember this for every chat?`,note_explain:`The AI suggests changing your home notes. Every future chat follows them.`,forget:`Forget`,note_no:`No, don't remember`,note_save_title:`Save to home notes`,read_it_first:`Read it first`,save_to_notes:`Save to notes`,running:`Running`,done:`Done`,failed:`Failed`,waiting_for_you:`Waiting for you`,needs_approval:`Needs your approval`,undone:`undone`,undo_title:`Undo this change`,undo:`Undo`,reviewer:`Reviewer`,reviewer_model:`Reviewer ({model})`,reviewer_approved:`Reviewer approved`,reviewer_denied:`Reviewer denied`,reviewer_unsure:`Reviewer unsure, asking you`,reviewing:`Reviewing…`,denied:`Denied`,camera_snapshot:`Camera snapshot`,phone_wait:`Waiting for an admin to approve this on their phone.`,approval_note:`Optional note for the AI`,deny:`Deny`,approve:`Approve`,your_photo:`Your photo`,one_photo:`1 photo`,n_photos:`{count} photos`,not_kept:`(not kept)`,page_chip:`Page: {page}`,page_chip_on:`Sent with your next message. Click to leave it out.`,page_chip_off:`Left out of your next message. Click to send it.`,page_sent:`with page: {page}`,composer_placeholder:`Ask or tell me to do something…`,photo_to_send:`Photo to send`,remove_photo:`Remove photo`,attach_title:`Attach photos or files: text, logs, YAML, JSON, CSV, PDF, zip`,attach:`Attach photos or files`,remove_file:`Remove file`,that_file:`that file`,file_text:`Text`,too_many_files:`Up to {count} files can go with one message.`,file_too_large:`{name} is larger than {limit}.`,files_over_total:`{name} would make this message too large to send. Remove an attachment or send it in a separate message.`,file_unreadable:`Couldn't read {name}.`,file_unsupported:`{name} can't be read. Text files (YAML, JSON, logs, CSV, code), PDFs, zip or gzip archives and pictures work.`,files_not_kept:`Files can't be sent again from a reloaded chat. Attach them again to include them.`,provider_and_model:`Provider and model`,provider:`Provider`,model:`Model`,stop:`Stop`,send:`Send`,editing_last:`Editing your last message`,editing_earlier:`Editing an earlier message. Sending replaces it and everything after it. Device changes already made are not undone.`,keys_enter:`Enter to send, Shift+Enter for a new line`,keys_ctrl:`Ctrl+Enter to send`,cancel:`Cancel`,usage_title:`Tokens in / out (cached). Cost is an estimate.`,usage_line:`{input} in · {output} out`,usage_cached:`{count} cached`,cost_na:`cost n/a`,reviewer_usage:`reviewer {tokens} tokens, {cost}`,today:`Today`,yesterday:`Yesterday`,previous_7:`Previous 7 days`,previous_30:`Previous 30 days`,older:`Older`,you:`You`,tip_lights:`Turn off all the lights in the {room}`,tip_anything_on:`Is anything still on?`,tip_temperature:`What's the temperature inside?`,tip_dashboard_room:`Make a dashboard for the {room}`,tip_dashboard_all:`Make a dashboard with a card for every room`,tip_automation:`Create an automation: porch light on at sunset, off at 11pm`,tip_energy:`What used the most energy this week?`,tip_unavailable:`Why did a sensor go unavailable yesterday?`,tip_batteries:`Which batteries are running low?`,living_room:`living room`,preview_unavailable:`Preview unavailable: {error}`,preview_no_views:`This dashboard has no views.`,preview_view:`View {n}`,preview_skipped_n:`{count} cards not shown: the preview only draws Home Assistant's own entity cards.`,preview_skipped_one:`1 card not shown: the preview only draws Home Assistant's own entity cards.`,tool_call_service:`call service`,tool_camera_snapshot:`camera snapshot`,tool_delete_config_item:`delete config item`,tool_delete_dashboard:`delete dashboard`,tool_get_config_item:`get config item`,tool_get_dashboard:`get dashboard`,tool_get_entities:`get entities`,tool_get_history:`get history`,tool_get_logbook:`get logbook`,tool_get_statistics:`get statistics`,tool_get_traces:`get traces`,tool_ha_websocket:`ha websocket`,tool_home_control:`home control`,tool_home_entities:`home entities`,tool_home_history:`home history`,tool_integrations:`integrations`,tool_list_areas:`list areas`,tool_list_config_items:`list config items`,tool_list_dashboards:`list dashboards`,tool_list_devices:`list devices`,tool_list_files:`list files`,tool_list_services:`list services`,tool_read_file:`read file`,tool_read_log:`read log`,tool_read_reference:`read reference`,tool_render_template:`render template`,tool_save_config_item:`save config item`,tool_save_dashboard:`save dashboard`,tool_search_entities:`search entities`,tool_shell:`shell`,tool_system:`system`,tool_undo:`undo`,tool_change_home_note:`change home note`,tool_change_knowledge:`change knowledge`,tool_read_knowledge:`read knowledge`,tool_update_registry:`update registry`,tool_web_fetch:`web fetch`,tool_web_search:`web search`,tool_write_file:`write file`,changes:`Changes`,changes_title:`What the assistant changed, in every chat`,changes_from:`From`,changes_to:`To`,changes_all_chats:`All chats`,changes_user:`Person`,changes_everyone:`Everyone`,changes_search:`Search changes`,changes_error:`Could not load changes: {error}`,changes_none:`No changes match.`,changes_more:`Load more`,changes_deleted_chat:`Deleted chat`,changes_no_user:`No signed-in user`,changes_asked:`Approved by a person`,changes_auto:`Automatic`,changes_rule:`Allowed by a rule`,changes_undo_gone:`Undo expired`,changes_undo_gone_title:`Its undo copy was removed to save space`,tool_change_history:`change history`,tool_past_chats:`past chats`,tool_read_chat:`read chat`,usage:`Usage`,usage_view_title:`Spend and tokens over time, in every chat`,usage_days:`{n} days`,usage_today:`Today`,usage_week:`Last 7 days`,usage_month:`Last 30 days`,usage_cap:`Daily cap {cap}: {used} used today ({pct}%). AI Task calls do not count toward the cap.`,usage_chart:`Estimated spend per day, highest`,usage_since:`Tracked since {date}. Nothing before that was recorded.`,usage_none:`No usage recorded yet.`,usage_estimate:`Costs are estimates from model prices, not the provider's bill.`,usage_model:`Model`,usage_in:`In`,usage_out:`Out`,usage_col_cached:`Cached`,usage_calls:`Calls`,usage_cost:`Cost`,usage_kind_task:`AI Task`,usage_kind_review:`Reviewer`,usage_no_price:`No price`,usage_unpriced:`{n} calls without a price`,usage_error:`Could not load usage: {error}`,balance_left:`{name}: {left} left of this key's {limit} limit.`,balance_no_limit:`{name}: this key has no spending limit and used {month} this month. The account balance is only shown on the billing page.`,balance_none:`{name} has no balance an API key can read.`,balance_local:`{name} runs locally and has no balance.`,balance_error:`{name}: the balance could not be read ({error}).`,billing_page:`Billing page`,integration_settings:`Integration settings`,open_in_ha:`Open in Home Assistant`,close:`Close`,settings_loading:`Loading the integration's settings.`,settings_unsupported:`This step can't be shown here. Open it in Home Assistant to continue.`,settings_error:`Could not open the integration's settings: {error}`,settings_menu:`Back to the menu`,settings_submit:`Submit`,settings_reloading:`Saved. LLM Agent is reloading with the new settings.`,settings_reloaded:`Saved. LLM Agent reloaded with the new settings.`,settings_saved:`Saved.`,settings_reload_failed:`Saved, but LLM Agent did not start again. Open it in Home Assistant to see why.`,settings_back:`Back to chat`,settings_bad_json:`This isn't valid JSON.`,usage_all_time:`All time`,usage_all_time_hint:`All time is every saved chat's cost added up ({count} chats), plus AI Tasks. Deleted chats are not in it.`,usage_since_filled:`Model detail since {date}. Days before that are daily totals from the spend cap's record.`,usage_earlier:`Before model detail`,usage_earlier_hint:`daily totals only`,float_minimize:`Minimize`,float_restore:`Restore`,float_full_panel:`Open the full panel`,float_resize:`Resize`},ao=[`de`,`es`,`fr`,`it`,`nl`,`pl`,`pt-BR`,`sv`,`zh-Hans`,`zh-Hant`],oo={},so=`en`,co=/* @__PURE__ */ L(0);function z(e,t){co[0]();let n=oo[e]??io[e];return t?n.replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):e):n}function lo(e){return e in io}function uo(e){if(!e)return`en`;let t=ao.find(t=>t.toLowerCase()===e.toLowerCase());if(t)return t;let n=e.split(`-`)[0].toLowerCase();return ao.find(e=>e.split(`-`)[0].toLowerCase()===n)??`en`}async function fo(e){let t=uo(e);if(t===so)return!1;if(t===`en`)return oo={},so=`en`,co[1](e=>e+1),!0;try{let e=new URL(import.meta.url),n=await fetch(new URL(`i18n/${t}.json${e.search}`,e));if(!n.ok)return!1;let r=await n.json(),i={};for(let e of Object.keys(io))typeof r[e]==`string`&&(i[e]=r[e]);return oo=i,so=t,co[1](e=>e+1),!0}catch{return!1}}function po(e,t){this.v=e,this.k=t}function mo(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function ho(e){if(Array.isArray(e))return e}function go(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function _o(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function vo(e,t){return ho(e)||go(e,t)||yo(e,t)||_o()}function yo(e,t){if(e){if(typeof e==`string`)return mo(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?mo(e,t):void 0}}function bo(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof po;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}bo.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},bo.prototype.next=function(e){return this._invoke(`next`,e)},bo.prototype.throw=function(e){return this._invoke(`throw`,e)},bo.prototype.return=function(e){return this._invoke(`return`,e)};var xo=Object.entries,So=Object.setPrototypeOf,Co=Object.isFrozen,wo=Object.getPrototypeOf,To=Object.getOwnPropertyDescriptor,B=Object.freeze,Eo=Object.seal,Do=Object.create,Oo=typeof Reflect<`u`&&Reflect,ko=Oo.apply,Ao=Oo.construct;B||=function(e){return e},Eo||=function(e){return e},ko||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},Ao||=function(e){return new e(...[...arguments].slice(1))};var jo=V(Array.prototype.forEach);Array.prototype.indexOf;var Mo=V(Array.prototype.lastIndexOf),No=V(Array.prototype.pop),Po=V(Array.prototype.push),Fo=V(Array.prototype.slice),Io=V(Array.prototype.splice),Lo=Array.isArray,Ro=ts(Set),zo=V(Set.prototype.add),Bo=V(Set.prototype.has),Vo=V(String.prototype.toLowerCase),Ho=V(String.prototype.toString),Uo=V(String.prototype.match),Wo=V(String.prototype.replace),Go=V(String.prototype.indexOf),Ko=V(String.prototype.trim),qo=V(Number.prototype.toString),Jo=V(Boolean.prototype.toString),Yo=typeof BigInt>`u`?null:V(BigInt.prototype.toString),Xo=typeof Symbol>`u`?null:V(Symbol.prototype.toString),Zo=V(Object.prototype.hasOwnProperty),Qo=V(Object.prototype.toString),$o=V(RegExp.prototype.test),es=ts(TypeError);function V(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return ko(e,t,n)}}function ts(e){return function(){return Ao(e,[...arguments])}}function H(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Vo;if(So&&So(e,null),!Lo(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(Co(t)||(t[r]=e),i=e)}e[i]=!0}return e}function ns(e){for(let t=0;t<e.length;t++)Zo(e,t)||(e[t]=null);return e}function rs(e){let t=Do(null);for(let r of xo(e)){var n=vo(r,2);let i=n[0],a=n[1];Zo(e,i)&&(t[i]=Lo(a)?ns(a):a&&typeof a==`object`&&a.constructor===Object?rs(a):a)}return t}function is(e){switch(typeof e){case`string`:return e;case`number`:return qo(e);case`boolean`:return Jo(e);case`bigint`:return Yo?Yo(e):`0`;case`symbol`:return Xo?Xo(e):`Symbol()`;case`undefined`:return Qo(e);case`function`:case`object`:{if(e===null)return Qo(e);let t=e,n=as(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:Qo(e)}return Qo(e)}default:return Qo(e)}}function as(e,t){for(;e!==null;){let n=To(e,t);if(n){if(n.get)return V(n.get);if(typeof n.value==`function`)return V(n.value)}e=wo(e)}function n(){return null}return n}function os(e,t){for(;e!==null;){let n=To(e,t);if(n)return n.get?V(n.get):null;e=wo(e)}return null}function ss(e){try{return $o(e,``),!0}catch{return!1}}var cs=B(/* @__PURE__ */ `a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),ls=B(/* @__PURE__ */ `svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),us=B([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),ds=B([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),fs=B(/* @__PURE__ */ `math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),ps=B([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),ms=B([`#text`]),hs=B(/* @__PURE__ */ `accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),gs=B(/* @__PURE__ */ `accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),_s=B(/* @__PURE__ */ `accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),vs=B([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),ys=Eo(/{{[\w\W]*|^[\w\W]*}}/g),bs=Eo(/<%[\w\W]*|^[\w\W]*%>/g),xs=Eo(/\${[\w\W]*/g),Ss=Eo(/^data-[\-\w.\u00B7-\uFFFF]+$/),Cs=Eo(/^aria-[\-\w]+$/),ws=Eo(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ts=Eo(/^(?:\w+script|data):/i),Es=Eo(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ds=Eo(/^html$/i),Os=Eo(/^[a-z][.\w]*(-[.\w]+)+$/i),ks=Eo(/<[/\w!]/g),As=Eo(/<[/\w]/g),js=Eo(/<\/no(script|embed|frames)/i),Ms=Eo(/\/>/i),U={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ns=B(H({},[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`])),Ps=function(){return typeof window>`u`?null:window},Fs=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},Is=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Ls=function(e,t,n,r){return Zo(e,t)&&Lo(e[t])?H(r.base?rs(r.base):{},e[t],r.transform):n},Rs=function(e,t,n){let r=Zo(e,t)?e[t]:void 0;return r&&typeof r==`object`?rs(r):n()};function zs(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ps(),t=e=>zs(e);if(t.version=`3.4.17`,t.removed=[],!e||!e.document||e.document.nodeType!==U.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=as(d,`cloneNode`),p=as(d,`remove`),m=as(d,`removeAttributeNode`),h=as(d,`nextSibling`),g=as(d,`childNodes`),_=as(d,`parentNode`),v=as(d,`shadowRoot`),y=as(d,`attributes`),b=o&&o.prototype?as(o.prototype,`nodeType`):null,x=o&&o.prototype?as(o.prototype,`nodeName`):null,ee=o&&o.prototype?as(o.prototype,`ownerDocument`):null,S=function(e){return b?b(e):e.nodeType},te=function(e){return x?x(e):e.nodeName},ne=os(d,`namespaceURI`),re=function(e){return ne?ne(e):e.namespaceURI};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let C,ie=``,ae,oe=!1,se=0,ce=function(){if(se>0)throw es(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},le=function(e){ce(),se++;try{return C.createHTML(e)}finally{se--}},ue=function(e){ce(),se++;try{return C.createScriptURL(e)}finally{se--}},de=function(){return oe||=(ae=Fs(u,i),!0),ae},fe=n,pe=fe.implementation,me=fe.createNodeIterator,he=fe.createDocumentFragment,ge=fe.getElementsByTagName,_e=r.importNode,w=Is();t.isSupported=typeof xo==`function`&&typeof _==`function`&&pe&&pe.createHTMLDocument!==void 0;let ve=ys,ye=bs,be=xs,T=Ss,xe=Cs,E=Ts,Se=Es,Ce=Os,we=ws,D=null,Te=H({},[...cs,...ls,...us,...fs,...ms]),O=null,Ee=H({},[...hs,...gs,..._s,...vs]),De=Object.seal(Do(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,ke=null,Ae=Object.seal(Do(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),je=!0,Me=!0,Ne=!1,Pe=!0,Fe=!1,Ie=!0,Le=!1,Re=!1,ze=null,Be=null,Ve=!1,k=!1,He=!1,Ue=!1,We=!0,Ge=!1,Ke=`user-content-`,qe=!0,Je=!1,Ye=null,Xe={},Ze=null,Qe=H({},/* @__PURE__ */ `annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),$e=null,et=H({},[`audio`,`video`,`img`,`source`,`image`,`track`]),tt=null,nt=H({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),rt=`http://www.w3.org/1998/Math/MathML`,it=`http://www.w3.org/2000/svg`,at=`http://www.w3.org/1999/xhtml`,A=at,ot=!1,st=null,ct=H({},[rt,it,at],Ho),lt=B([`mi`,`mo`,`mn`,`ms`,`mtext`]),ut=H({},lt),dt=B([`annotation-xml`]),ft=H({},dt),pt=H({},[`title`,`style`,`font`,`a`,`script`]),mt=null,ht=[`application/xhtml+xml`,`text/html`],j=null,gt=null,_t=n.createElement(`form`),vt=function(e){return e instanceof RegExp||e instanceof Function},yt=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(gt&&gt===e)return;(!e||typeof e!=`object`)&&(e={}),e=rs(e),mt=ht.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,j=mt===`application/xhtml+xml`?Ho:Vo,D=Ls(e,`ALLOWED_TAGS`,Te,{transform:j}),O=Ls(e,`ALLOWED_ATTR`,Ee,{transform:j}),st=Ls(e,`ALLOWED_NAMESPACES`,ct,{transform:Ho}),tt=Ls(e,`ADD_URI_SAFE_ATTR`,nt,{transform:j,base:nt}),$e=Ls(e,`ADD_DATA_URI_TAGS`,et,{transform:j,base:et}),Ze=Ls(e,`FORBID_CONTENTS`,Qe,{transform:j}),Oe=Ls(e,`FORBID_TAGS`,rs({}),{transform:j}),ke=Ls(e,`FORBID_ATTR`,rs({}),{transform:j}),Xe=Zo(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?rs(e.USE_PROFILES):e.USE_PROFILES:!1,je=e.ALLOW_ARIA_ATTR!==!1,Me=e.ALLOW_DATA_ATTR!==!1,Ne=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Pe=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Fe=e.SAFE_FOR_TEMPLATES||!1,Ie=e.SAFE_FOR_XML!==!1,Le=e.WHOLE_DOCUMENT||!1,k=e.RETURN_DOM||!1,He=e.RETURN_DOM_FRAGMENT||!1,Ue=e.RETURN_TRUSTED_TYPE||!1,Ve=e.FORCE_BODY||!1,We=e.SANITIZE_DOM!==!1,Ge=e.SANITIZE_NAMED_PROPS||!1,qe=e.KEEP_CONTENT!==!1,Je=e.IN_PLACE||!1,we=ss(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:ws,A=typeof e.NAMESPACE==`string`?e.NAMESPACE:at,ut=Rs(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>H({},lt)),ft=Rs(e,`HTML_INTEGRATION_POINTS`,()=>H({},dt));let t=Rs(e,`CUSTOM_ELEMENT_HANDLING`,()=>Do(null));if(De=Do(null),Zo(t,`tagNameCheck`)&&vt(t.tagNameCheck)&&(De.tagNameCheck=t.tagNameCheck),Zo(t,`attributeNameCheck`)&&vt(t.attributeNameCheck)&&(De.attributeNameCheck=t.attributeNameCheck),Zo(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(De.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),Eo(De),Fe&&(Me=!1),He&&(k=!0),Xe&&(D=H({},ms),O=Do(null),Xe.html===!0&&(H(D,cs),H(O,hs)),Xe.svg===!0&&(H(D,ls),H(O,gs),H(O,vs)),Xe.svgFilters===!0&&(H(D,us),H(O,gs),H(O,vs)),Xe.mathMl===!0&&(H(D,fs),H(O,_s),H(O,vs))),Ae.tagCheck=null,Ae.attributeCheck=null,Zo(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?Ae.tagCheck=e.ADD_TAGS:Lo(e.ADD_TAGS)&&(D===Te&&(D=rs(D)),H(D,e.ADD_TAGS,j))),Zo(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?Ae.attributeCheck=e.ADD_ATTR:Lo(e.ADD_ATTR)&&(O===Ee&&(O=rs(O)),H(O,e.ADD_ATTR,j))),Zo(e,`ADD_FORBID_CONTENTS`)&&Lo(e.ADD_FORBID_CONTENTS)&&(Ze===Qe&&(Ze=rs(Ze)),H(Ze,e.ADD_FORBID_CONTENTS,j)),qe&&(D[`#text`]=!0),Le&&H(D,[`html`,`head`,`body`]),D.table&&(H(D,[`tbody`]),delete Oe.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw es(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw es(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=C;C=e.TRUSTED_TYPES_POLICY;try{ie=le(``)}catch(e){throw C=t,e}}else e.TRUSTED_TYPES_POLICY===null?(C=void 0,ie=``):(C===void 0&&(C=de()),C&&typeof ie==`string`&&(ie=le(``)));B&&B(e),gt=e},bt=H({},[...ls,...us,...ds]),M=H({},[...fs,...ps]),xt=function(e,t,n){return t.namespaceURI===at?e===`svg`:t.namespaceURI===rt?e===`svg`&&(n===`annotation-xml`||ut[n]):!!bt[e]},St=function(e,t,n){return t.namespaceURI===at?e===`math`:t.namespaceURI===it?e===`math`&&ft[n]:!!M[e]},Ct=function(e,t,n){return t.namespaceURI===it&&!ft[n]||t.namespaceURI===rt&&!ut[n]?!1:!M[e]&&(pt[e]||!bt[e])},wt=function(e){let t=re(e),n=Vo(te(e)),r=_(e),i,a;return r&&S(r)===U.element?(i={namespaceURI:re(r)},a=Vo(te(r))):(i={namespaceURI:A},a=`template`),st[t]?t===it?xt(n,i,a):t===rt?St(n,i,a):t===at?Ct(n,i,a):!!(mt===`application/xhtml+xml`&&st[t]):!1},Tt=function(e){Po(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw es(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},Et=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},Dt=function(e){jt(e);let t=g(e);t&&jo(Fo(t),e=>{try{p(e)}catch{}});let n=S(e)===U.element?y(e):null;if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&Et(e,r,i)}},Ot=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}Po(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(k||He)try{Tt(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},kt=function(e){let t=y(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||O[j(i)]||Et(e,r,i)}},At=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=[e];for(;r.length>0;){let e=r.pop();if(t(e)===!1)continue;if(n&&S(e)===U.element){let t=v(e);Kt(t)&&r.push(t)}let i=g(e);if(i)for(let e=i.length-1;e>=0;--e)r.push(i[e])}},jt=function(e){At(e,e=>{S(e)===U.element&&kt(e)})},Mt=function(e){let t=[];return At(e,e=>{t.push(e)},!0),t},Nt=function(e,t){let n=Ro();jo(Mt(e),e=>{S(e)===U.element&&zo(n,e)}),jo(t,e=>{S(e)===U.element&&!Bo(n,e)&&kt(e)})},Pt=function(e,n){let r=!1;return jo(t.removed,t=>{t.element&&(r||=t.element===e,jt(t.element))}),Nt(e,n),r},Ft=function(e,t){let n=Ye,r=null,i=()=>(r||(r=Ro(),jo(t,e=>{zo(r,e)})),r);for(let t=0;;t++){let r=Mt(e),a=[e],o=!1;if(jo(r,e=>{S(e)===U.documentFragment?Po(a,e):!o&&!Bo(n,e)&&(o=Bo(i(),e))}),!o)return;if(t>=8)throw es(`the tree kept changing during in-place sanitization; refusing to return it`);jo(a,(t,n)=>{It(t,n>0,e,i())})}},It=function(e,t,n,r){let i=Vt(e),a;for(;a=i.nextNode();)Bo(r,a)&&!Bo(Ye,a)&&(t&&Jt(w.uponSanitizeShadowNode,a,null),en(a,n),cn(a,n),Kt(a.content)&&ln(a.content))},Lt=function(e){Ye&&zo(Ye,e)},Rt=function(e,t){return Ie?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},zt=function(e){Ie&&At(e,e=>{let t=S(e);if(t===U.processingInstruction||t===U.comment&&$o(As,e.data)){try{p(e)}catch{}return!1}if(t===U.element){let t=e,n=j(te(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&Rt(`for`,n)&&t.removeAttribute(`for`)}catch{}}return!0})},Bt=function(e){let t=null,r=null;if(Ve)e=`<remove></remove>`+e;else{let t=Uo(e,/^[\r\n\t ]+/);r=t&&t[0]}mt===`application/xhtml+xml`&&A===at&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=C?le(e):e;if(A===at)try{t=new l().parseFromString(i,mt)}catch{}if(!t||!t.documentElement){t=pe.createDocument(A,`template`,null);try{t.documentElement.innerHTML=ot?ie:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),A===at?ge.call(t,Le?`html`:`body`)[0]:Le?t.documentElement:a},Vt=function(e){let t=ee?ee(e):e.ownerDocument;return me.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ht=function(e){return e=Wo(e,ve,` `),e=Wo(e,ye,` `),e=Wo(e,be,` `),e},Ut=function(e){Wt(e);let t=e.querySelectorAll?.call(e,`template`);t&&jo(t,e=>{Kt(e.content)&&Ut(e.content)})},Wt=function(e){e.normalize();let t=ee?ee(e):e.ownerDocument,n=me.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=Ht(r.data),r=n.nextNode()},Gt=function(e){let t=x?x(e):null;return typeof t!=`string`||j(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==y(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==b(e)||e.childNodes!==g(e)},Kt=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return b(e)===U.documentFragment}catch{return!1}},qt=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return typeof b(e)==`number`}catch{return!1}};function Jt(e,n,r){e.length!==0&&jo(e,e=>{e.call(t,n,r,gt)})}let Yt=function(e,t){return!!(Ie&&e.hasChildNodes()&&!qt(e.firstElementChild)&&$o(ks,e.textContent)&&$o(ks,e.innerHTML)||Ie&&Ns[t]&&S(e)===U.element&&re(e)===at&&(qt(e.firstElementChild)||typeof e.textContent==`string`&&$o(ks,e.textContent))||e.nodeType===U.processingInstruction||Ie&&e.nodeType===U.comment&&$o(As,e.data))},Xt=function(e,t){return e instanceof RegExp?$o(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},Zt=function(e,t,n){if(!Oe[t]&&rn(t)&&Xt(De.tagNameCheck,t))return!1;if(qe&&!Ze[t]&&!Ze[Vo(t)]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return Tt(e),!0},Qt=function(e,t,n,r){return e.length===0?t:t===n||t===r?rs(t):t},$t=function(e,t){return e===t||_(e)!==null?!1:(Je&&jt(e),!0)},en=function(e,n){if(Lt(e),Jt(w.beforeSanitizeElements,e,null),$t(e,n))return!0;if(Gt(e))return Tt(e),!0;let r=j(te(e));if(D=Qt(w.uponSanitizeElement,D,Te,ze),Jt(w.uponSanitizeElement,e,{tagName:r,allowedTags:D}),$t(e,n))return!0;if(Yt(e,r))return Tt(e),!0;if(Oe[r]||!(Ae.tagCheck instanceof Function&&Ae.tagCheck(r))&&!D[r]){let t=Zt(e,r,n);return t===!1&&(Jt(w.afterSanitizeElements,e,null),$t(e,n))?!0:t}if(S(e)===U.element&&!wt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&$o(js,e.innerHTML))return Tt(e),!0;if(Fe&&e.nodeType===U.text){let n=Ht(e.textContent);e.textContent!==n&&(Po(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Jt(w.afterSanitizeElements,e,null),$t(e,n)},tn=function(e,t,r){if(ke[t]||Rt(t,e)||We&&(t===`id`||t===`name`)&&(r in n||r in _t))return!1;let i=O[t]||Ae.attributeCheck instanceof Function&&Ae.attributeCheck(t,e);return Me&&$o(T,t)||je&&$o(xe,t)?!0:i?tt[t]||$o(we,Wo(r,Se,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&Go(r,`data:`)===0&&$e[e]||Ne&&!$o(E,Wo(r,Se,``))?!0:!r:rn(e)&&Xt(De.tagNameCheck,e)&&Xt(De.attributeNameCheck,t,e)||t===`is`&&De.allowCustomizedBuiltInElements&&Xt(De.tagNameCheck,r)},nn=H({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),rn=function(e){return!nn[Vo(e)]&&$o(Ce,e)},an=function(e,t,n,r){if(C&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return le(r);case`TrustedScriptURL`:return ue(r)}return r},on=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Gt(e)||(Tt(e),!1)}catch{return Ot(t,e),!1}},sn=function(e,t){return Ie&&$o(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t)?!0:Vo(e)===`attributename`&&Uo(t,`href`)!==null},cn=function(e,n){if(Jt(w.beforeSanitizeAttributes,e,null),$t(e,n))return;let r=e.attributes;if(!r||Gt(e))return;O=Qt(w.uponSanitizeAttribute,O,Ee,Be);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:O,forceKeepAttr:void 0},a=r.length,o=j(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=j(s),d=l,f=s===`value`?d:Ko(d),p=!1;i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Jt(w.uponSanitizeAttribute,e,i),f=i.attrValue,Ge&&(u===`id`||u===`name`)&&Go(f,Ke)!==0&&(Ot(s,e,n),f=Ke+f,p=!0),sn(s,f)?Ot(s,e,n):i.forceKeepAttr||(i.keepAttr?!Pe&&$o(Ms,f)?Ot(s,e,n):(Fe&&(f=Ht(f)),tn(o,u,f)?(f=an(o,u,c,f),f!==d&&on(e,s,c,f)&&p&&No(t.removed)):Ot(s,e,n)):Ot(s,e,n))}Jt(w.afterSanitizeAttributes,e,null),$t(e,n)},ln=function(e){let t=null,n=Vt(e);for(Jt(w.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Jt(w.uponSanitizeShadowNode,t,null),en(t,e),cn(t,e),Kt(t.content)&&ln(t.content),S(t)===U.element){let e=v(t);Kt(e)&&(un(e),ln(e))}Fe&&Wt(e),Jt(w.afterSanitizeShadowDOM,e,null)},un=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){ln(e.shadow);continue}let n=e.node,r=S(n)===U.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=x?x(n):null;if(typeof e==`string`&&j(e)===`template`){let e=n.content;Kt(e)&&t.push({node:e,shadow:null})}}if(r){let e=v(n);Kt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(ot=!e,ot&&(e=`<!-->`),typeof e!=`string`&&!qt(e)&&(e=is(e),typeof e!=`string`))throw es(`dirty is not a string, aborting`);if(!t.isSupported)return e;Re?(D=ze,O=Be):yt(n),(w.uponSanitizeElement.length>0||w.uponSanitizeAttribute.length>0)&&(D=rs(D)),w.uponSanitizeAttribute.length>0&&(O=rs(O)),t.removed=[];let c=Je&&typeof e!=`string`&&qt(e),l=[],u=Ye;if(c){zt(e);let t=te(e);if(typeof t==`string`){let n=j(t);if(!D[n]||Oe[n])throw Dt(e),es(`root node is forbidden and cannot be sanitized in-place`)}if(Gt(e))throw Dt(e),es(`root node is clobbered and cannot be sanitized in-place`);l=Mt(e),Ye=Ro()}else if(qt(e))i=Bt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===U.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),un(i);else{if(!k&&!Fe&&!Le&&e.indexOf(`<`)===-1)return C&&Ue?le(e):e;if(i=Bt(e),!i)return k?null:Ue?ie:``}i&&Ve&&Tt(i.firstChild);let d=c?e:i;try{c&&un(e);let t=Vt(d);for(;o=t.nextNode();)en(o,d),cn(o,d),Kt(o.content)&&ln(o.content);c&&Ft(e,l)}catch(t){throw c&&(Dt(e),Pt(e,l)),t}finally{Ye=u}if(c){if(Pt(e,l))throw es(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Fe&&Ut(e),e}if(k){if(Fe&&Ut(i),He)for(s=he.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(O.shadowroot||O.shadowrootmode)&&(s=_e.call(r,s,!0)),s}let f=Le?i.outerHTML:i.innerHTML;return Le&&D[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&$o(Ds,i.ownerDocument.doctype.name)&&(f=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+f),Fe&&(f=Ht(f)),C&&Ue?le(f):f},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};yt(e),Re=!0,ze=D,Be=O},t.clearConfig=function(){gt=null,Re=!1,ze=null,Be=null,C=ae,ie=``},t.isValidAttribute=function(e,t,n){gt||yt({});let r=j(e),i=j(t);return typeof n==`string`&&(sn(t,n)||!Pe&&$o(Ms,n))?!1:tn(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&Zo(w,e)&&Po(w[e],t)},t.removeHook=function(e,t){if(Zo(w,e)){if(t!==void 0){let n=Mo(w[e],t);return n===-1?void 0:Io(w[e],n,1)[0]}return No(w[e])}},t.removeHooks=function(e){Zo(w,e)&&(w[e]=[])},t.removeAllHooks=function(){w=Is()},t}var Bs=zs();function Vs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Hs=Vs();function Us(e){Hs=e}var Ws={exec:()=>null};function Gs(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function W(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(G.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var Ks=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),G={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,numericCharacterReferenceOrAmpersand:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:Gs(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:Gs(e=>RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:Gs(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:Gs(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:Gs(e=>RegExp(`^ {0,${e}}(?:</?(?:${sc})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,`i`)),blockquoteBeginRegex:Gs(e=>RegExp(`^ {0,${e}}>`))},qs=/^(?:[ \t]*(?:\n|$))+/,Js=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ys=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Xs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zs=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Qs=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,$s=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ec=W($s).replace(/bull/g,Qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),tc=W($s).replace(/bull/g,Qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),nc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,rc=/^[^\n]+/,ic=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ac=W(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,ic).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),oc=W(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Qs).getRegex(),sc=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,cc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,lc=W(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,cc).replace(`tag`,sc).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),uc=e=>W(nc).replace(`hr`,Xs).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,e).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,sc).getRegex(),dc=uc(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),fc=uc(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),pc={blockquote:W(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,fc).getRegex(),code:Js,def:ac,fences:Ys,heading:Zs,hr:Xs,html:lc,lheading:ec,list:oc,newline:qs,paragraph:dc,table:Ws,text:rc},mc=W(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,Xs).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,sc).getRegex(),hc={...pc,lheading:tc,table:mc,paragraph:W(nc).replace(`hr`,Xs).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,mc).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,sc).getRegex()},gc={...pc,html:W(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,cc).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ws,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:W(nc).replace(`hr`,Xs).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,ec).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},_c=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,vc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,yc=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,bc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xc=/[\p{P}\p{S}]/u,Sc=/[\s\p{P}\p{S}]/u,Cc=/[^\s\p{P}\p{S}]/u,wc=W(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,Sc).getRegex(),Tc=/[\p{Pi}\p{Ps}"']/u,Ec=/(?!~)[\p{P}\p{S}]/u,Dc=/(?!~)[\s\p{P}\p{S}]/u,Oc=/(?:[^\s\p{P}\p{S}]|~)/u,kc=W(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,Ks?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),Ac=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,jc=W(Ac,`u`).replace(/punct/g,xc).getRegex(),Mc=W(Ac,`u`).replace(/punct/g,Ec).getRegex(),Nc=W(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,`u`).replace(/openQuote/g,Tc).replace(/punct/g,xc).getRegex(),Pc=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,Fc=W(Pc,`gu`).replace(/notPunctSpace/g,Cc).replace(/punctSpace/g,Sc).replace(/punct/g,xc).getRegex(),Ic=W(Pc,`gu`).replace(/notPunctSpace/g,Oc).replace(/punctSpace/g,Dc).replace(/punct/g,Ec).getRegex(),Lc=W(`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Cc).replace(/punctSpace/g,Sc).replace(/punct/g,xc).getRegex(),Rc=W(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,Cc).replace(/punctSpace/g,Sc).replace(/punct/g,xc).getRegex(),zc=W(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Cc).replace(/punctSpace/g,Sc).replace(/punct/g,xc).getRegex(),Bc=W(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,xc).getRegex(),Vc=W(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Cc).replace(/punctSpace/g,Sc).replace(/punct/g,xc).getRegex(),Hc=W(/\\(punct)/,`gu`).replace(/punct/g,xc).getRegex(),Uc=W(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/,`gu`).replace(/punct/g,xc).getRegex(),Wc=W(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gc=W(cc).replace(`(?:-->|$)`,`-->`).getRegex(),Kc=W(`^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,Gc).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),qc=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,Jc=W(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace(`brackets`,qc).getRegex(),Yc=W(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace(`label`,Jc).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Xc=W(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Jc).replace(`ref`,ic).getRegex(),Zc=W(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,ic).getRegex(),Qc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,$c=W(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace(`brackets`,qc).getRegex(),el=W(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,W(/^!?\[(label)\]\[(ref)\]/).replace(`label`,$c).replace(`ref`,Qc).getRegex()).replace(`nolink`,W(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Qc).getRegex()).getRegex(),tl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,nl=W(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),rl={_backpedal:Ws,anyPunctuation:Hc,anyPunctuationOutsideCode:Uc,autolink:Wc,blockSkip:kc,br:yc,code:vc,del:Ws,delLDelim:Ws,delRDelim:Ws,emStrongLDelim:jc,emStrongRDelimAst:Fc,emStrongRDelimUnd:Rc,escape:_c,link:Yc,nolink:Zc,punctuation:wc,reflink:Xc,reflinkSearch:el,tag:Kc,text:bc,url:Ws},il={...rl,emStrongLDelim:Nc,emStrongRDelimAst:Lc,emStrongRDelimUnd:zc,link:W(/^!?\[(label)\]\((.*?)\)/).replace(`label`,Jc).getRegex(),reflink:W(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,Jc).getRegex()},al={...rl,emStrongRDelimAst:Ic,emStrongLDelim:Mc,delLDelim:Bc,delRDelim:Vc,url:W(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`emailProtocol`,nl).replace(`protocol`,tl).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:W(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace(`protocol`,tl).replace(/emailProtocol/g,/(?:mailto|xmpp):/).getRegex()},ol={...al,br:W(yc).replace(`{2,}`,`*`).getRegex(),text:W(al.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},sl={normal:pc,gfm:hc,pedantic:gc},cl={normal:rl,gfm:al,breaks:ol,pedantic:il},ll={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},ul=e=>ll[e];function dl(e,t){if(t){if(G.escapeTest.test(e))return e.replace(G.escapeReplace,ul)}else if(G.escapeTestNoEncode.test(e))return e.replace(G.escapeReplaceNoEncode,ul);return e}function fl(e){return G.numericCharacterReference.test(e)?e.replace(G.numericCharacterReferenceOrAmpersand,(e,t,n)=>{if(t===void 0&&n===void 0)return`&amp;`;let r=t===void 0?Number.parseInt(n,16):Number.parseInt(t,10);return r===0||r>1114111||r>=55296&&r<=57343?`�`:r===38?`&amp;`:String.fromCodePoint(r)}):e}function pl(e){try{e=encodeURI(e).replace(G.percentDecode,`%`)}catch{return null}return e}function ml(e,t){let n=e.replace(G.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(G.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(G.slashPipe,`|`);return n}function hl(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function gl(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&G.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function _l(e){return e.trim().toLowerCase().toUpperCase().toLowerCase()}function vl(e,t){if(e.indexOf(t[0])===-1&&e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function yl(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function bl(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`),c=e[0].charAt(0)===`!`,l=r.state.inLink,u=r.state.linkEmitted,d=r.state.inRawBlock;r.state.inLink=!0,r.state.linkEmitted=!1;let f=r.inlineTokens(s),p=r.state.linkEmitted;if(r.state.linkEmitted=u,r.state.inLink=l,!c){if(p){r.state.inRawBlock=d;return}r.state.linkEmitted=!0}return{type:c?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:f}}function xl(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return e.slice(Math.min(r.length,i.length))}).join(`
`)}function Sl(e,t,n,r){if(!t.includes(`<`))return!1;for(let i=0;i<t.length;i++){if(t[i]===`\\`){i++;continue}if(t[i]==="`"){let e=r.inline.code.exec(t.slice(i));if(e){i+=e[0].length-1;continue}}if(t[i]!==`<`)continue;let a=e.slice(n+i),o=r.inline.tag.exec(a)||r.inline.autolink.exec(a);if(o){if(o[0].length>t.length-i)return!0;i+=o[0].length-1}}return!1}var Cl=class{options;rules;lexer;constructor(e){this.options=e||Hs}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:gl(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=xl(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=hl(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceTabChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:hl(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:hl(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=hl(t[0],`
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
`,1)[0],d=t[1].length,f=this.options.pedantic?yl(u,d):u.replace(this.rules.other.leadingSpaceTab,e=>yl(e,d)),p=e.split(`
`,1)[0],m=!f.trim(),h=0;if(this.options.pedantic?(h=2,a=f.trimStart()):m?h=d+1:(h=f.search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=f.slice(h),h+=d),m&&this.rules.other.blankLine.test(p)&&(e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),n=this.rules.other.hrRegex(h),r=this.rules.other.fencesBeginRegex(h),i=this.rules.other.headingBeginRegex(h),o=this.rules.other.htmlBeginRegex(h),s=this.rules.other.blockquoteBeginRegex(h);for(;e;){let c=e.split(`
`,1)[0],l;if(p=c,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,`  `),l=p):l=p.replace(this.rules.other.leadingSpaceTab,e=>yl(e)),r.test(p)||i.test(p)||o.test(p)||s.test(p)||t.test(p)||n.test(p))break;if(l.search(this.rules.other.nonSpaceChar)>=h||!p.trim())a+=`
`+l.slice(h);else{if(m||f.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||r.test(f)||i.test(f)||n.test(f))break;a+=`
`+p}m=!p.trim(),e=e.substring(c.length+1),f=l.slice(h)}}let g=n.slice(l,r());o.loose||(c?o.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(c=!0)),o.items.push({type:`list_item`,raw:g,task:!!this.options.gfm&&this.rules.other.listIsTask.test(a),loose:!1,text:a,tokens:[]})}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=n.slice(0,r()).trimEnd();for(let e of o.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!o.loose){let t=e.tokens.filter(e=>e.type===`space`);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}for(let e of o.items){let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,o.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1}if(o.loose)for(let e of o.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=gl(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){if(!this.rules.other.startAngleBracket.test(t[2])&&vl(t[2],`()`)!==-1)return;let e=_l(t[1]).replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:hl(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ml(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:hl(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(ml(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:hl(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){if(this.lexer.state.linkParenPossible===!1)return;let t=this.rules.inline.link.exec(e);if(t){let n=t[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&Sl(e,t[1],n,this.rules))return;let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let e=hl(r.slice(0,-1),`\\`);if((r.length-e.length)%2==0)return}else{let e=vl(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let i=t[2],a=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(i);e&&(i=e[1],a=e[3])}else a=t[3]?t[3].slice(1,-1):``;return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i.slice(1):i.slice(1,-1)),bl(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,`$1`),title:a&&a.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=n[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&Sl(e,n[1],r,this.rules))return;let i=t[_l((n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `))];if(!i){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return bl(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let i=[...r[0]].length-1,a,o,s=i,c=0,l=r[0][0],u=n===l,d=l===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+i);(r=d.exec(t))!==null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(o=[...a].length,r[3]||r[4]){s+=o;continue}if(r[5]||r[6]){if(i%3&&!((i+o)%3)){c+=o;continue}if(u)break}if(s-=o,s>0)continue;o=Math.min(o,o+s+c);let t=[...r[0]][0].length,n=e.slice(0,i+r.index+t+o);if(Math.min(i,o)%2){let e=n.slice(1,-1);return{type:`em`,raw:n,text:e,tokens:this.lexer.inlineTokens(e)}}let l=n.slice(2,-2);return{type:`strong`,raw:n,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:e?t[0]:fl(t[0]),escaped:e}}}},wl=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Hs,this.options.tokenizer=this.options.tokenizer||new Cl,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,linkParenPossible:!0,top:!0};let t={other:G,block:sl.normal,inline:cl.normal};this.options.pedantic?(t.block=sl.pedantic,t.inline=cl.pedantic):this.options.gfm&&(t.block=sl.gfm,t.inline=this.options.breaks?cl.breaks:cl.gfm),this.tokenizer.rules=t}static get rules(){return{block:sl,inline:cl}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(G.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(G.tabCharGlobal,`    `).replace(G.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
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
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes(`[`))return!1;let t=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(n[0])&&e.charAt(n.index-1)!==`!`)return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],n=e.lastIndexOf(`[`);if(e.charAt(0)!==`!`&&Object.hasOwn(this.tokens.links,_l(e.slice(n+1,-1)))&&!(n>1&&this.linkInText(e.slice(1,n-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=this.state.linkParenPossible;this.state.linkParenPossible=n&&e.includes(`)`);try{return this.#e(e,t)}finally{this.state.linkParenPossible=n}}#e(e,t){let n=e;if(this.tokens.links&&e.includes(`[`)){let e=this.tokenizer.rules.inline.reflinkSearch,t=n=>{let r=n.lastIndexOf(`[`);if(!Object.hasOwn(this.tokens.links,_l(n.slice(r+1,-1))))return n;if(r>1&&n.charAt(0)!==`!`){let i=n.slice(1,r-1);if(this.linkInText(i))return`[`+i.replace(e,t)+`][`+`a`.repeat(n.length-r-2)+`]`}return`[`+`a`.repeat(n.length-2)+`]`};n=n.replace(e,t)}n=n.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode,(e,t,n)=>n?`+`.repeat(e.length):t?t+e.slice(t.length,-t.length).replace(/`/g,`+`)+t:e),n=n.replace(this.tokenizer.rules.inline.blockSkip,(e,t,n)=>{let r=n?n.length:0;return e.slice(0,r)+`[`+`a`.repeat(e.length-r-2)+`]`}),n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(n=>(o=n.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if((o=this.tokenizer.escape(e))||(o=this.tokenizer.tag(e))||(o=this.tokenizer.link(e))){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let n=t.at(-1);o.type===`text`&&n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if((o=this.tokenizer.emStrong(e,n,i))||(o=this.tokenizer.codespan(e))||(o=this.tokenizer.br(e))||(o=this.tokenizer.del(e,n,i))||(o=this.tokenizer.autolink(e))||!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},Tl=class{options;parser;constructor(e){this.options=e||Hs}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(G.notSpaceStart)?.[0],i=e?e.replace(G.endingNewline,``)+`
`:``;return r?`<pre><code class="language-`+dl(r)+`">`+(n?i:dl(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:dl(i,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${dl(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,text:n,tokens:r,autolink:i}){let a=i?dl(n,!0):this.parser.parseInline(r),o=pl(e);if(o===null)return a;e=dl(o,i);let s=`<a href="`+e+`"`;return t&&(s+=` title="`+dl(t)+`"`),s+=`>`+a+`</a>`,s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=pl(e);if(i===null)return dl(n);e=i;let a=`<img src="${dl(e)}" alt="${dl(n)}"`;return t&&(a+=` title="${dl(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:dl(e.text)}},El=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},Dl=class e{options;renderer;textRenderer;constructor(e){this.options=e||Hs,this.options.renderer=this.options.renderer||new Tl,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new El}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`checkbox`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`checkbox`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},Ol=class{options;block;constructor(e){this.options=e||Hs}static passThroughHooks=/* @__PURE__ */ new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=/* @__PURE__ */ new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?wl.lex:wl.lexInline}provideParser(e=this.block){return e?Dl.parse:Dl.parseInline}};function kl(e,t){if(Array.isArray(t))for(let n=0;n<t.length;n++)e.push(t[n]);else e.push(t)}var Al=class{defaults=Vs();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Dl;Renderer=Tl;TextRenderer=El;Lexer=wl;Tokenizer=Cl;Hooks=Ol;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(kl(n,t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)kl(n,this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)kl(n,this.walkTokens(e.tokens,t));break}case`list`:{let e=r;kl(n,this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);kl(n,this.walkTokens(i,t))}):e.tokens&&kl(n,this.walkTokens(e.tokens,t))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new Tl(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Cl(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Ol;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=Ol.passThroughHooks.has(n)?e=>{if(this.defaults.async&&Ol.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&kl(n,t.call(this,e)),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return wl.lex(e,t??this.defaults)}parser(e,t){return Dl.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(/* @__PURE__ */ Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(/* @__PURE__ */ Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(/* @__PURE__ */ Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?wl.lex:wl.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?Dl.parse:Dl.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?wl.lex:wl.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?Dl.parse:Dl.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+dl(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}},jl=new Al;function K(e,t){return jl.parse(e,t)}K.options=K.setOptions=function(e){return jl.setOptions(e),K.defaults=jl.defaults,Us(K.defaults),K},K.getDefaults=Vs,K.defaults=Hs;function Ml(...e){return jl.use(...e),K.defaults=jl.defaults,Us(K.defaults),K}K.use=Ml,K.walkTokens=function(e,t){return jl.walkTokens(e,t)},K.parseInline=jl.parseInline,K.Parser=Dl,K.parser=Dl.parse,K.Renderer=Tl,K.TextRenderer=El,K.Lexer=wl,K.lexer=wl.lex,K.Tokenizer=Cl,K.Hooks=Ol,K.parse=K,K.options,K.setOptions,K.walkTokens,K.parseInline,Dl.parse,wl.lex;var Nl=new Al({gfm:!0,breaks:!0,async:!1});Bs.addHook(`afterSanitizeAttributes`,e=>{e.tagName===`A`&&(e.setAttribute(`target`,`_blank`),e.setAttribute(`rel`,`noopener noreferrer`))});var Pl=/* @__PURE__ */ new Map;function Fl(e,t=!0){if(t){let t=Pl.get(e);if(t!==void 0)return t}let n=Bs.sanitize(Nl.parse(e),{USE_PROFILES:{html:!0},FORBID_TAGS:[`style`,`form`,`input`,`button`,`iframe`,`img`,`image`,`video`,`audio`,`source`,`picture`,`track`,`object`,`embed`,`link`,`meta`,`base`,`svg`,`math`],FORBID_ATTR:[`style`,`src`,`srcset`,`poster`,`background`,`ping`,`xlink:href`,`formaction`]});return t&&(Pl.size>300&&Pl.clear(),Pl.set(e,n)),n}var Il=/* @__PURE__ */ e((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.commands=e.inlineGrammar=e.htmlBlockGrammar=e.lineGrammar=e.editorRegExp=e.punctuationTrailing=e.punctuationLeading=void 0,e.createMergedInlineGrammar=i,e.htmlescape=a;var t={ASCIIPunctuation:/[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\]/,NotTriggerChar:/[^`_*[\]()<>!~\n]/,Scheme:/[A-Za-z][A-Za-z0-9+.-]{1,31}/,Email:/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/,HTMLOpenTag:/<HTMLTagName(?:HTMLAttribute)*\s*\/?>/,HTMLCloseTag:/<\/HTMLTagName\s*>/,HTMLTagName:/[A-Za-z][A-Za-z0-9-]*/,HTMLComment:/<!--(?:[^>-]|(?:[^>-](?:[^-]|-[^-])*[^-]))-->/,HTMLPI:/<\?(?:|.|(?:[^?]|\?[^>])*)\?>/,HTMLDeclaration:/<![A-Z]+\s[^>]*>/,HTMLCDATA:/<!\[CDATA\[.*?\]\]>/,HTMLAttribute:/\s+[A-Za-z_:][A-Za-z0-9_.:-]*(?:HTMLAttValue)?/,HTMLAttValue:/\s*=\s*(?:(?:'[^']*')|(?:"[^"]*")|(?:[^\s"'=<>`]+))/,KnownTag:/address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul/};e.punctuationLeading=/* @__PURE__ */ new RegExp(/^(?:[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])/),e.punctuationTrailing=/* @__PURE__ */ new RegExp(/(?:[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])$/),e.editorRegExp={macPlatform:/Mac|iPod|iPhone|iPad/,lineSplit:/(?:\r\n|\r|\n)/,replacementPlaceholder:/(\${1,2})([0-9])/g,inlineContentPlaceholder:/\$\$([0-9])/,inlineReplacementPlaceholder:/\$([1-9])/g,blankContent:/^\s*$/,leadingWhitespace:/^\s/,trailingWhitespace:/\s$/,leadingWhitespaceRun:/^\s+/,surroundingWhitespace:/^(?<leading>\s*).*\S(?<trailing>\s*)$/,taskListItem:/^(\[)([ xX])(\])(\s|$)([\s\S]*)$/,orderedListNumber:/\d{1,9}/,inlineTagName:/^<\s*([a-zA-Z][a-zA-Z0-9]*)/,changeEvent:/^(?:change|input)$/i,selectionEvent:/^(?:selection|selectionchange)$/i,dropEvent:/^(?:drop)$/i,autolinkPrecedingChar:/[\s*_~(]/,emphasisDelimiter:/(^\*+)|(^_+)/,strikethroughDelimiter:/^~~/,autolinkScheme:/^(?:https?|ftp):\/\//i,autolinkWww:/^www\./i,autolinkDomain:/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+/,autolinkPath:/^[^\s<]*/,autolinkProtocol:/^(?:mailto|xmpp):/i,autolinkXmpp:/^xmpp:/i,autolinkXmppResource:/^\/[a-zA-Z0-9@.\-_]+/,autolinkEmail:/^[a-zA-Z0-9.\-_+]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+/,emailTrailingChar:/[-_]$/,emailTld:/\.[a-zA-Z0-9]+$/,linkClosingBracket:/^\]/,openingAngle:/^</,closingAngle:/^>/,titleQuote:/^["']/,openingParen:/^\(/,closingParen:/^\)/,endsWithOpenAngle:/<$/,containsOpenAngle:/</,anyChar:/^./},e.lineGrammar={TMH1:{regexp:/^( {0,3}#\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH1">$1</span>$$2<span class="TMMark TMMark_TMH1">$3</span>`},TMH2:{regexp:/^( {0,3}##\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH2">$1</span>$$2<span class="TMMark TMMark_TMH2">$3</span>`},TMH3:{regexp:/^( {0,3}###\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH3">$1</span>$$2<span class="TMMark TMMark_TMH3">$3</span>`},TMH4:{regexp:/^( {0,3}####\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH4">$1</span>$$2<span class="TMMark TMMark_TMH4">$3</span>`},TMH5:{regexp:/^( {0,3}#####\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH5">$1</span>$$2<span class="TMMark TMMark_TMH5">$3</span>`},TMH6:{regexp:/^( {0,3}######\s)(.*?)((?:\s+#+\s*)?)$/,replacement:`<span class="TMMark TMMark_TMH6">$1</span>$$2<span class="TMMark TMMark_TMH6">$3</span>`},TMBlockquote:{regexp:/^( {0,3}>[ ]?)(.*)$/,replacement:`<span class="TMMark TMMark_TMBlockquote">$1</span>$$2`},TMCodeFenceBacktickOpen:{regexp:/^( {0,3}(?<seq>````*)\s*)([^`]*?)(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceBacktick">$1</span><span class="TMInfoString">$3</span>$4`},TMCodeFenceTildeOpen:{regexp:/^( {0,3}(?<seq>~~~~*)\s*)(.*?)(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceTilde">$1</span><span class="TMInfoString">$3</span>$4`},TMCodeFenceBacktickClose:{regexp:/^( {0,3}(?<seq>````*))(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceBacktick">$1</span>$3`},TMCodeFenceTildeClose:{regexp:/^( {0,3}(?<seq>~~~~*))(\s*)$/,replacement:`<span class="TMMark TMMark_TMCodeFenceTilde">$1</span>$3`},TMBlankLine:{regexp:/^([ \t]*)$/,replacement:`$0`},TMSetextH1Marker:{regexp:/^ {0,3}=+\s*$/,replacement:`<span class="TMMark TMMark_TMSetextH1Marker">$0</span>`},TMSetextH2Marker:{regexp:/^ {0,3}-+\s*$/,replacement:`<span class="TMMark TMMark_TMSetextH1Marker">$0</span>`},TMHR:{regexp:/^( {0,3}(\*[ \t]*\*[ \t]*\*[ \t*]*)|(-[ \t]*-[ \t]*-[ \t-]*)|(_[ \t]*_[ \t]*_[ \t_]*))$/,replacement:`<span class="TMMark TMMark_TMHR">$0</span>`},TMUL:{regexp:/^( {0,3}[+*-] {1,4})(.*)$/,replacement:`<span class="TMMark TMMark_TMUL">$1</span>$$2`},TMOL:{regexp:/^( {0,3}\d{1,9}[.)] {1,4})(.*)$/,replacement:`<span class="TMMark TMMark_TMOL">$1</span>$$2`},TMIndentedCode:{regexp:/^( {4}|\t)(.*)$/,replacement:`<span class="TMMark TMMark_TMIndentedCode">$1</span>$2`},TMLinkReferenceDefinition:{regexp:/^( {0,3}\[\s*)([^\s\]](?:[^\]]|\\\])*?)(\s*\]:\s*)((?:[^\s<>]+)|(?:<(?:[^<>\\]|\\.)*>))?(\s*)((?:\((?:[^()\\]|\\.)*\))|(?:"(?:[^"\\]|\\.)*")|(?:'(?:[^'\\]|\\.)*'))?(\s*)$/,replacement:`<span class="TMMark TMMark_TMLinkReferenceDefinition">$1</span><span class="TMLinkLabel TMLinkLabel_Definition">$2</span><span class="TMMark TMMark_TMLinkReferenceDefinition">$3</span><span class="TMLinkDestination">$4</span>$5<span class="TMLinkTitle">$6</span>$7`,labelPlaceholder:2}},e.htmlBlockGrammar=[{start:/^ {0,3}<(?:script|pre|style)(?:\s|>|$)/i,end:/(?:<\/script>|<\/pre>|<\/style>)/i,paraInterrupt:!0},{start:/^ {0,3}<!--/,end:/-->/,paraInterrupt:!0},{start:/^ {0,3}<\?/,end:/\?>/,paraInterrupt:!0},{start:/^ {0,3}<![A-Z]/,end:/>/,paraInterrupt:!0},{start:/^ {0,3}<!\[CDATA\[/,end:/\]\]>/,paraInterrupt:!0},{start:/^ {0,3}(?:<|<\/)(?:KnownTag)(?:\s|>|\/>|$)/i,end:!1,paraInterrupt:!0},{start:/^ {0,3}(?:HTMLOpenTag|HTMLCloseTag)\s*$/,end:!1,paraInterrupt:!1}],e.inlineGrammar={escape:{regexp:/^\\(ASCIIPunctuation)/,replacement:`<span class="TMMark TMMark_TMEscape">\\</span>$1`},code:{regexp:/^(`+)((?:[^`])|(?:[^`].*?[^`]))(\1)/,replacement:`<span class="TMMark TMMark_TMCode">$1</span><code class="TMCode">$2</code><span class="TMMark TMMark_TMCode">$3</span>`},autolink:{regexp:/^<((?:Scheme:[^\s<>]*)|(?:Email))>/,replacement:`<span class="TMMark TMMark_TMAutolink">&lt;</span><span class="TMAutolink">$1</span><span class="TMMark TMMark_TMAutolink">&gt;</span>`},html:{regexp:/^((?:HTMLOpenTag)|(?:HTMLCloseTag)|(?:HTMLComment)|(?:HTMLPI)|(?:HTMLDeclaration)|(?:HTMLCDATA))/,replacement:`<span class="TMHTML">$1</span>`},linkOpen:{regexp:/^\[/,replacement:``},imageOpen:{regexp:/^!\[/,replacement:``},linkLabel:{regexp:/^(\[\s*)([^\]]*?)(\s*\])/,replacement:``,labelPlaceholder:2},default:{regexp:/^(.|(?:NotTriggerChar+))/,replacement:`$1`}};var n=new RegExp(Object.keys(t).join(`|`)),r=[...Object.keys(e.inlineGrammar)];for(let i of r){let r=e.inlineGrammar[i].regexp.source;for(;r.match(n);)r=r.replace(n,e=>t[e].source);e.inlineGrammar[i].regexp=new RegExp(r,e.inlineGrammar[i].regexp.flags)}for(let r of e.htmlBlockGrammar){let e=r.start.source;for(;e.match(n);)e=e.replace(n,e=>t[e].source);r.start=new RegExp(e,r.start.flags)}function i(n={}){let r={...e.inlineGrammar};for(let[e,i]of Object.entries(n)){let n={...i},a=i.regexp.source,o=new RegExp(Object.keys(t).join(`|`));for(;a.match(o);)a=a.replace(o,e=>t[e].source);n.regexp=new RegExp(a,i.regexp.flags),r[e]=n}return r}function a(e){return(e||``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}e.commands={bold:{type:`inline`,className:`TMStrong`,set:{pre:`**`,post:`**`},unset:{prePattern:/(?:\*\*|__)$/,postPattern:/^(?:\*\*|__)/}},italic:{type:`inline`,className:`TMEm`,set:{pre:`*`,post:`*`},unset:{prePattern:/(?:\*|_)$/,postPattern:/^(?:\*|_)/}},code:{type:`inline`,className:`TMCode`,set:{pre:"`",post:"`"},unset:{prePattern:/`+$/,postPattern:/^`+/}},strikethrough:{type:`inline`,className:`TMStrikethrough`,set:{pre:`~~`,post:`~~`},unset:{prePattern:/~~$/,postPattern:/^~~/}},h1:{type:`line`,className:`TMH1`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`# $2`},unset:{pattern:/^( {0,3}#\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h2:{type:`line`,className:`TMH2`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`## $2`},unset:{pattern:/^( {0,3}##\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h3:{type:`line`,className:`TMH3`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`### $2`},unset:{pattern:/^( {0,3}###\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h4:{type:`line`,className:`TMH4`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`#### $2`},unset:{pattern:/^( {0,3}####\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h5:{type:`line`,className:`TMH5`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`##### $2`},unset:{pattern:/^( {0,3}#####\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},h6:{type:`line`,className:`TMH6`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`###### $2`},unset:{pattern:/^( {0,3}######\s+)(.*?)((?:\s+#+\s*)?)$/,replacement:`$2`}},ul:{type:`line`,className:`TMUL`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`- $2`},unset:{pattern:/^( {0,3}[+*-] {1,4})(.*)$/,replacement:`$2`}},ol:{type:`line`,className:`TMOL`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`$#. $2`},unset:{pattern:/^( {0,3}\d{1,9}[.)] {1,4})(.*)$/,replacement:`$2`}},blockquote:{type:`line`,className:`TMBlockquote`,set:{pattern:/^( {0,3}(?:(?:#+|[0-9]{1,9}[).]|[>\-*+])\s+)?)(.*)$/,replacement:`> $2`},unset:{pattern:/^( {0,3}>[ ]?)(.*)$/,replacement:`$2`}}}})),Ll=(/* @__PURE__ */ e((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Editor=void 0;var t=Il();e.Editor=class{constructor(e={}){this.e=null,this.textarea=null,this.lines=[],this.lineElements=[],this.lineTypes=[],this.lineCaptures=[],this.lineReplacements=[],this.linkLabels=[],this.lineDirty=[],this.lastCommandState=null,this.customInlineGrammar={},this.mergedInlineGrammar=t.inlineGrammar,this.hasFocus=!0,this.lastSelection=null,this.cleanupFns=[],this.ownsElement=!1,this.elementOriginalStyle=null,this.textareaOriginalDisplay=null,this.destroyed=!1,this.listeners={change:[],selection:[],drop:[]},this.undoStack=[],this.redoStack=[],this.isRestoringHistory=!1,this.maxHistory=100,this.e=null,this.textarea=null,this.lines=[],this.lineElements=[],this.lineTypes=[],this.lineCaptures=[],this.lineReplacements=[],this.linkLabels=[],this.lineDirty=[],this.lastCommandState=null,this.hasFocus=!0,this.lastSelection=null,this.customInlineGrammar=e.customInlineGrammar||{},this.mergedInlineGrammar=(0,t.createMergedInlineGrammar)(this.customInlineGrammar),this.listeners={change:[],selection:[],drop:[]};let n=null;typeof e.element==`string`?n=document.getElementById(e.element):e.element&&(n=e.element),typeof e.textarea==`string`?this.textarea=document.getElementById(e.textarea):e.textarea&&(this.textarea=e.textarea),this.textarea&&(n||=this.textarea),n||=document.getElementsByTagName(`body`)[0],n&&n.tagName===`TEXTAREA`&&(this.textarea=n,n=this.textarea.parentNode),this.textarea&&(this.textareaOriginalDisplay=this.textarea.style.display,this.textarea.style.display=`none`),this.placeholder=e.placeholder===void 0?this.textarea?.placeholder||void 0:e.placeholder,this.undoStack=[],this.redoStack=[],this.isRestoringHistory=!1,this.maxHistory=100,this.createEditorElement(n,e),this.setContent(typeof e.content==`string`?e.content:this.textarea?this.textarea.value:`# Hello TinyMDE!
Edit **here**`),this.addListener(this.e,`keydown`,e=>this.handleUndoRedoKey(e))}get canUndo(){return this.undoStack.length>=2}get canRedo(){return this.redoStack.length>0}pushHistory(){this.isRestoringHistory||(this.pushCurrentState(),this.redoStack=[])}pushCurrentState(){this.undoStack.push({content:this.getContent(),selection:this.getSelection(),anchor:this.getSelection(!0)}),this.undoStack.length>this.maxHistory&&this.undoStack.shift()}undo(){if(this.undoStack.length<2)return;this.isRestoringHistory=!0,this.pushCurrentState();let e=this.undoStack.pop();this.redoStack.push(e);let t=this.undoStack[this.undoStack.length-1];this.setContent(t.content),t.selection&&this.setSelection(t.selection,t.anchor),this.undoStack.pop(),this.isRestoringHistory=!1}redo(){if(!this.redoStack.length)return;this.isRestoringHistory=!0,this.pushCurrentState();let e=this.redoStack.pop();this.setContent(e.content),e.selection&&this.setSelection(e.selection,e.anchor),this.isRestoringHistory=!1}handleUndoRedoKey(e){(t.editorRegExp.macPlatform.test(navigator.platform)?e.metaKey:e.ctrlKey)&&!e.altKey&&(e.key===`z`||e.key===`Z`?(e.shiftKey?this.redo():this.undo(),e.preventDefault()):(e.key===`y`||e.key===`Y`)&&(this.redo(),e.preventDefault()))}createEditorElement(e,t){t&&t.editor!==void 0?this.e=typeof t.editor==`string`?document.getElementById(t.editor):t.editor:(this.e=document.createElement(`div`),this.ownsElement=!0),this.ownsElement||(this.elementOriginalStyle=this.e.getAttribute(`style`)),this.e.classList.add(`TinyMDE`),this.e.contentEditable=`true`,this.e.style.whiteSpace=`pre-wrap`,this.e.style.webkitUserModify=`read-write-plaintext-only`,this.placeholder&&this.e.setAttribute(`data-placeholder`,this.placeholder),t.editor===void 0&&(this.textarea&&this.textarea.parentNode===e&&this.textarea.nextSibling?e.insertBefore(this.e,this.textarea.nextSibling):e.appendChild(this.e)),this.addListener(this.e,`input`,e=>this.handleInputEvent(e)),this.addListener(this.e,`beforeinput`,e=>this.handleBeforeInputEvent(e)),this.addListener(this.e,`compositionend`,e=>this.handleInputEvent(e)),this.addListener(document,`selectionchange`,e=>{this.hasFocus&&this.handleSelectionChangeEvent(e)}),this.addListener(this.e,`blur`,()=>this.hasFocus=!1),this.addListener(this.e,`focus`,()=>this.hasFocus=!0),this.addListener(this.e,`paste`,e=>this.handlePaste(e)),this.addListener(this.e,`drop`,e=>this.handleDrop(e)),this.addListener(this.e,`click`,e=>this.handleClick(e)),this.lineElements=this.e.childNodes}setContent(e){for(;this.e.firstChild;)this.e.removeChild(this.e.firstChild);this.lines=e.split(t.editorRegExp.lineSplit),this.lineDirty=[];for(let e=0;e<this.lines.length;e++){let e=document.createElement(`div`);this.e.appendChild(e),this.lineDirty.push(!0)}this.lineTypes=Array(this.lines.length),this.updateFormatting(),this.updatePlaceholder(),this.fireChange(),this.isRestoringHistory||this.pushHistory()}getContent(){return this.lines.join(`
`)}updatePlaceholder(){this.placeholder&&this.e&&(this.getContent()===``?this.e.classList.add(`TinyMDE_empty`):this.e.classList.remove(`TinyMDE_empty`))}updateFormatting(){this.updateLineTypes(),this.updateLinkLabels(),this.applyLineTypes()}updateLinkLabels(){this.linkLabels=[];for(let e=0;e<this.lines.length;e++)this.lineTypes[e]===`TMLinkReferenceDefinition`&&this.linkLabels.push(this.lineCaptures[e][t.lineGrammar.TMLinkReferenceDefinition.labelPlaceholder])}replace(e,n){return e.replace(t.editorRegExp.replacementPlaceholder,(e,r,i)=>r===`$`?(0,t.htmlescape)(n[parseInt(i)]):`<span class="TMInlineFormatted">${this.processInlineStyles(n[parseInt(i)])}</span>`)}applyLineTypes(){let e=0;for(;e<this.lines.length;)if(this.isInlineGroupLeader(e)){let t=this.lineTypes[e],n=e;for(;n+1<this.lines.length&&this.isInlineContinuation(n+1,t);)n++;this.applyInlineGroup(e,n),e=n+1}else this.applyLine(e),e++}isInlineGroupLeader(e){let t=this.lineTypes[e];return t===`TMPara`||t===`TMUL`||t===`TMOL`||t===`TMBlockquote`&&!this.isBlankBlockquoteContent(e)}isInlineContinuation(e,t){let n=this.lineTypes[e];return n===`TMPara`||n===`TMBlockquote`&&t===`TMBlockquote`&&!this.isBlankBlockquoteContent(e)}isBlankBlockquoteContent(e){let n=this.lineCaptures[e],r=n&&n[2]!==void 0?n[2]:``;return t.editorRegExp.blankContent.test(r)}applyLine(e){let t=this.lineElements[e];if(this.lineDirty[e]){let n=this.replace(this.lineReplacements[e],this.lineCaptures[e]);t.className=this.lineTypes[e],t.removeAttribute(`style`),t.innerHTML=n===``?`<br />`:n,delete t.dataset.mlSig}t.dataset.lineNum=e.toString()}applyInlineGroup(e,t){let n=[],r=`${t-e}`;for(let i=e;i<=t;i++){let e=this.inlineContentIndex(this.lineReplacements[i]);n.push(this.lineCaptures[i][e]===void 0?``:this.lineCaptures[i][e]),r+=`\x1f${this.lineTypes[i]}\x1f${this.lineReplacements[i]}\x1f${JSON.stringify(this.lineCaptures[i])}`}let i=`${this.hashString(r)}`,a=!1;for(let n=e;n<=t;n++)if(this.lineDirty[n]||this.lineElements[n].dataset.mlSig!==i){a=!0;break}if(a){let r=this.splitInlineHTMLByLine(this.processInlineStyles(n.join(`
`)));for(let n=e;n<=t;n++){let t=this.lineElements[n],a=r[n-e]||``,o=this.replaceWithInline(this.lineReplacements[n],this.lineCaptures[n],a);t.className=this.lineTypes[n],t.removeAttribute(`style`),t.innerHTML=o===``?`<br />`:o,t.dataset.mlSig=i}}for(let n=e;n<=t;n++)this.lineElements[n].dataset.lineNum=n.toString()}inlineContentIndex(e){let n=t.editorRegExp.inlineContentPlaceholder.exec(e);return n?parseInt(n[1]):0}replaceWithInline(e,n,r){return e.replace(t.editorRegExp.replacementPlaceholder,(e,i,a)=>i===`$`?(0,t.htmlescape)(n[parseInt(a)]):`<span class="TMInlineFormatted">${r}</span>`)}splitInlineHTMLByLine(e){let t=[],n=[],r=``,i=0;for(;i<e.length;){let a=e[i];if(a===`
`){for(let e=n.length-1;e>=0;e--)r+=`</${this.inlineTagName(n[e])}>`;t.push(r),r=n.join(``),i++}else if(a===`<`){let t=e.indexOf(`>`,i);if(t<0){r+=e.substr(i);break}let a=e.substring(i,t+1);r+=a,a[1]===`/`?n.pop():a[a.length-2]!==`/`&&n.push(a),i=t+1}else r+=a,i++}return t.push(r),t}inlineTagName(e){let n=t.editorRegExp.inlineTagName.exec(e);return n?n[1]:`span`}hashString(e){let t=5381;for(let n=0;n<e.length;n++)t=((t<<5)+t^e.charCodeAt(n))>>>0;return t}updateLineTypes(){let e=!1,n=0,r=!1;for(let i=0;i<this.lines.length;i++){let a=`TMPara`,o=[this.lines[i]],s=`$$0`;if(e===`TMCodeFenceBacktickOpen`){let r=t.lineGrammar.TMCodeFenceBacktickClose.regexp.exec(this.lines[i]);r&&r.groups.seq.length>=n?(a=`TMCodeFenceBacktickClose`,s=t.lineGrammar.TMCodeFenceBacktickClose.replacement,o=r,e=!1):(a=`TMFencedCodeBacktick`,s=`<span class="TMFencedCode">$0<br /></span>`,o=[this.lines[i]])}else if(e===`TMCodeFenceTildeOpen`){let r=t.lineGrammar.TMCodeFenceTildeClose.regexp.exec(this.lines[i]);r&&r.groups.seq.length>=n?(a=`TMCodeFenceTildeClose`,s=t.lineGrammar.TMCodeFenceTildeClose.replacement,o=r,e=!1):(a=`TMFencedCodeTilde`,s=`<span class="TMFencedCode">$0<br /></span>`,o=[this.lines[i]])}if(a===`TMPara`&&r===!1){for(let e of t.htmlBlockGrammar)if(this.lines[i].match(e.start)&&(e.paraInterrupt||i===0||this.lineTypes[i-1]!==`TMPara`&&this.lineTypes[i-1]!==`TMUL`&&this.lineTypes[i-1]!==`TMOL`&&this.lineTypes[i-1]!==`TMBlockquote`)){r=e;break}}if(r!==!1&&(a=`TMHTMLBlock`,s=`<span class="TMHTMLContent">$0<br /></span>`,o=[this.lines[i]],r.end?this.lines[i].match(r.end)&&(r=!1):(i===this.lines.length-1||this.lines[i+1].match(t.lineGrammar.TMBlankLine.regexp))&&(r=!1)),a===`TMPara`){for(let e in t.lineGrammar)if(t.lineGrammar[e].regexp){let n=t.lineGrammar[e].regexp.exec(this.lines[i]);if(n){a=e,s=t.lineGrammar[e].replacement,o=n;break}}}if((a===`TMCodeFenceBacktickOpen`||a===`TMCodeFenceTildeOpen`)&&(e=a,n=o.groups.seq.length),(a===`TMIndentedCode`||a===`TMLinkReferenceDefinition`)&&i>0&&(this.lineTypes[i-1]===`TMPara`||this.lineTypes[i-1]===`TMUL`||this.lineTypes[i-1]===`TMOL`||this.lineTypes[i-1]===`TMBlockquote`)&&(a=`TMPara`,o=[this.lines[i]],s=`$$0`),a===`TMSetextH2Marker`){let e=t.lineGrammar.TMUL.regexp.exec(this.lines[i]);e&&(a=`TMUL`,s=t.lineGrammar.TMUL.replacement,o=e)}if(a===`TMSetextH1Marker`||a===`TMSetextH2Marker`){if(i===0||this.lineTypes[i-1]!==`TMPara`){let e=t.lineGrammar.TMHR.regexp.exec(this.lines[i]);e?(a=`TMHR`,o=e,s=t.lineGrammar.TMHR.replacement):(a=`TMPara`,o=[this.lines[i]],s=`$$0`)}else{let e=i-1,t=a===`TMSetextH1Marker`?`TMSetextH1`:`TMSetextH2`;do this.lineTypes[e]!==t&&(this.lineTypes[e]=t,this.lineDirty[e]=!0),this.lineReplacements[e]=`$$0`,this.lineCaptures[e]=[this.lines[e]],e--;while(e>=0&&this.lineTypes[e]===`TMPara`)}}if(a===`TMUL`||a===`TMOL`){let e=o[2]===void 0?``:o[2],n=t.editorRegExp.taskListItem.exec(e);if(n){let e=n[2]!==` `,t=a===`TMUL`?`TMMark_TMUL`:`TMMark_TMOL`,r=e?`TMCheckbox TMCheckbox_checked`:`TMCheckbox TMCheckbox_unchecked`;o=[o[0],o[1],n[1],n[2],n[3],n[4],n[5]],s=`<span class="TMMark ${t}">$1</span><span class="TMMark TMMark_TMTask">$2</span><span class="${r}">$3</span><span class="TMMark TMMark_TMTask">$4</span><span class="TMMark TMMark_TMTask">$5</span>$$6`}}this.lineTypes[i]!==a&&(this.lineTypes[i]=a,this.lineDirty[i]=!0),this.lineReplacements[i]=s,this.lineCaptures[i]=o}}getSelection(e=!1){let t=window.getSelection(),n=e?t.anchorNode:t.focusNode;if(!n)return null;let r=e?t.anchorOffset:t.focusOffset;if(n===this.e)return r<this.lines.length?{row:r,col:0}:{row:r-1,col:this.lines[r-1].length};let i=this.computeColumn(n,r);if(i===null)return null;let a=n;for(;a.parentElement!==this.e;)a=a.parentElement;let o=0;if(a.previousSibling){let e=a.dataset?.lineNum,t=a.previousSibling.dataset?.lineNum;if(e&&t){let n=parseInt(e);if(n===parseInt(t)+1)o=n;else for(;a.previousSibling;)o++,a=a.previousSibling}}return{row:o,col:i}}setSelection(e,t=null){if(!e)return;let{node:n,offset:r}=this.computeNodeAndOffset(e.row,e.col,t?t.row===e.row&&t.col>e.col:!1),i=null,a=null;if(t&&(t.row!==e.row||t.col!==e.col)){let{node:n,offset:r}=this.computeNodeAndOffset(t.row,t.col,e.row===t.row&&e.col>t.col);i=n,a=r}window.getSelection().setBaseAndExtent(n,r,i||n,i?a:r)}restoreLastSelection(){return this.lastSelection&&this.lastSelection.focus?(this.setSelection(this.lastSelection.focus,this.lastSelection.anchor),!0):!1}paste(e,n=null,r=null){n||=this.getSelection(!0),r||=this.getSelection(!1);let i,a;r||={row:this.lines.length-1,col:this.lines[this.lines.length-1].length},n||=r,n.row<r.row||n.row===r.row&&n.col<=r.col?(i=n,a=r):(i=r,a=n);let o=e.split(t.editorRegExp.lineSplit),s=this.lines[i.row].substr(0,i.col),c=this.lines[a.row].substr(a.col);o[0]=s.concat(o[0]);let l=o[o.length-1].length;o[o.length-1]=o[o.length-1].concat(c),this.spliceLines(i.row,1+a.row-i.row,o),r.row=i.row+o.length-1,r.col=l,this.updateFormatting(),this.setSelection(r),this.fireChange()}wrapSelection(e,t,n=null,r=null){if(n||=this.getSelection(!1),r||=this.getSelection(!0),!n||!r||n.row!==r.row)return;this.isRestoringHistory||this.pushHistory(),this.lineDirty[n.row]=!0;let i=n.col<r.col?n.col:r.col,a=n.col<r.col?r.col:n.col,o=this.lines[n.row].substr(0,i).concat(e),s=a===i?``:this.lines[n.row].substr(i,a-i),c=t.concat(this.lines[n.row].substr(a));this.lines[n.row]=o.concat(s,c),r.col=o.length,n.col=r.col+s.length,this.updateFormatting(),this.setSelection(n,r),this.fireChange()}addEventListener(e,n){e.match(t.editorRegExp.changeEvent)&&this.listeners.change.push(n),e.match(t.editorRegExp.selectionEvent)&&this.listeners.selection.push(n),e.match(t.editorRegExp.dropEvent)&&this.listeners.drop.push(n)}removeEventListener(e,n){e.match(t.editorRegExp.changeEvent)&&(this.listeners.change=this.listeners.change.filter(e=>e!==n)),e.match(t.editorRegExp.selectionEvent)&&(this.listeners.selection=this.listeners.selection.filter(e=>e!==n)),e.match(t.editorRegExp.dropEvent)&&(this.listeners.drop=this.listeners.drop.filter(e=>e!==n))}addListener(e,t,n){e.addEventListener(t,n),this.cleanupFns.push(()=>e.removeEventListener(t,n))}destroy(){if(!this.destroyed){this.destroyed=!0;for(let e of this.cleanupFns)e();if(this.cleanupFns=[],this.e){if(this.ownsElement)this.e.parentNode&&this.e.parentNode.removeChild(this.e);else{for(this.e.classList.remove(`TinyMDE`,`TinyMDE_empty`),this.e.removeAttribute(`contenteditable`),this.e.removeAttribute(`data-placeholder`);this.e.firstChild;)this.e.removeChild(this.e.firstChild);this.elementOriginalStyle?this.e.setAttribute(`style`,this.elementOriginalStyle):this.e.removeAttribute(`style`)}}this.textarea&&(this.textarea.style.display=this.textareaOriginalDisplay??``),this.listeners={change:[],selection:[],drop:[]},this.e=null,this.textarea=null}}fireChange(){if(this.updatePlaceholder(),!this.textarea&&!this.listeners.change.length)return;let e=this.getContent();this.textarea&&(this.textarea.value=e);for(let t of this.listeners.change)t({content:e,linesDirty:[...this.lineDirty]})}handleBeforeInputEvent(e){let n=e;if(n.inputType===`deleteContentBackward`||n.inputType===`deleteContentForward`){let t=this.getSelection(),r=this.getSelection(!0);if(!t||!r)return;let i=n.inputType===`deleteContentBackward`;if(t.row===r.row&&t.col===r.col){if(i&&t.col===0&&t.row>0){e.preventDefault(),this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();let n=this.lines[t.row-1].length;this.lines[t.row-1]=this.lines[t.row-1]+this.lines[t.row],this.lineDirty[t.row-1]=!0,this.spliceLines(t.row,1),this.updateFormatting(),this.setSelection({row:t.row-1,col:n}),this.fireChange();return}if(!i&&t.col===this.lines[t.row].length&&t.row<this.lines.length-1){e.preventDefault(),this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();let n=this.lines[t.row].length;this.lines[t.row]=this.lines[t.row]+this.lines[t.row+1],this.lineDirty[t.row]=!0,this.spliceLines(t.row+1,1),this.updateFormatting(),this.setSelection({row:t.row,col:n}),this.fireChange();return}}return}if(n.inputType!==`insertParagraph`&&n.inputType!==`insertLineBreak`)return;this.isRestoringHistory||this.pushHistory(),e.preventDefault(),this.clearDirtyFlag();let r=this.getSelection(),i=this.getSelection(!0);if(r&&i){if(r.row!==i.row){let e=r.row<i.row?r:i,t=r.row<i.row?i:r;this.lines[e.row]=this.lines[e.row].substring(0,e.col),this.lines[t.row]=this.lines[t.row].substring(t.col),this.spliceLines(e.row+1,t.row-e.row-1),r.row=e.row+1,r.col=0}else{let e=!1;switch(this.lineTypes[r.row]){case`TMUL`:e=`TMUL`;break;case`TMOL`:e=`TMOL`;break;case`TMIndentedCode`:e=`TMIndentedCode`}let n=this.lines[r.row].substring(0,r.col<=i.col?r.col:i.col),a=this.lines[r.row].substring(r.col<=i.col?i.col:r.col);if(this.spliceLines(r.row,1,[n,a]),r.row+=1,r.col=0,e){let n=t.lineGrammar[e].regexp.exec(this.lines[r.row-1]);n&&(n[2]?(e===`TMOL`&&(n[1]=n[1].replace(t.editorRegExp.orderedListNumber,e=>(parseInt(e)+1).toString())),this.lines[r.row]=`${n[1]}${this.lines[r.row]}`,this.lineDirty[r.row]=!0,r.col=n[1].length):(this.lines[r.row-1]=``,this.lineDirty[r.row-1]=!0))}}this.updateFormatting(),this.setSelection(r),r&&r.row<this.lineElements.length&&this.lineElements[r.row].scrollIntoView({block:`nearest`,inline:`nearest`}),this.fireChange()}}handleInputEvent(e){let t=e;if(t.inputType===`insertCompositionText`)return;this.isRestoringHistory||this.pushHistory();let n=this.getSelection();(t.inputType!==`insertParagraph`&&t.inputType!==`insertLineBreak`||!n)&&(this.e.firstChild?this.fixNodeHierarchy():this.e.innerHTML=`<div class="TMBlankLine"><br></div>`,this.updateLineContentsAndFormatting(),n&&this.setSelection(n),this.fireChange())}handleSelectionChangeEvent(e){this.fireSelection()}handlePaste(e){this.isRestoringHistory||this.pushHistory(),e.preventDefault();let t=e.clipboardData.getData(`text/plain`);this.paste(t)}handleDrop(e){e.preventDefault(),this.fireDrop(e.dataTransfer)}handleClick(e){let t=e.target,n=t&&t.closest?t.closest(`.TMCheckbox`):null;if(!n)return;let r=n;for(;r&&r.parentNode!==this.e;)r=r.parentNode;if(!r||r.dataset.lineNum===void 0)return;let i=parseInt(r.dataset.lineNum,10);if(isNaN(i)||i<0||i>=this.lines.length)return;let a=this.computeColumn(n,0);if(a===null)return;let o=this.lines[i].charAt(a);if(o!==` `&&o!==`x`&&o!==`X`)return;e.preventDefault(),this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();let s=o===` `?`x`:` `;this.lines[i]=this.lines[i].substr(0,a)+s+this.lines[i].substr(a+1),this.lineDirty[i]=!0,this.updateFormatting(),this.fireChange()}processInlineStyles(e){let n=``,r=[],i=0,a=e;outer:for(;a;){if(a.charCodeAt(0)===10){n+=`
`,a=a.substr(1),i+=1;continue outer}for(let e of[`escape`,`code`,`autolink`,`html`])if(this.mergedInlineGrammar[e]){let r=this.mergedInlineGrammar[e].regexp.exec(a);if(r){a=a.substr(r[0].length),i+=r[0].length,n+=this.mergedInlineGrammar[e].replacement.replace(t.editorRegExp.inlineReplacementPlaceholder,(e,n)=>(0,t.htmlescape)(r[n]));continue outer}}for(let e in this.customInlineGrammar)if(e!==`escape`&&e!==`code`&&e!==`autolink`&&e!==`html`&&e!==`linkOpen`&&e!==`imageOpen`&&e!==`linkLabel`&&e!=="default"){let r=this.mergedInlineGrammar[e].regexp.exec(a);if(r){a=a.substr(r[0].length),i+=r[0].length,n+=this.mergedInlineGrammar[e].replacement.replace(t.editorRegExp.inlineReplacementPlaceholder,(e,n)=>(0,t.htmlescape)(r[n]));continue outer}}let o=i>0?e[i-1]:``;if(o===``||t.editorRegExp.autolinkPrecedingChar.test(o)){let e=this.parseAutolinkExtension(a);if(e){n=`${n}${e.output}`,a=a.substr(e.charCount),i+=e.charCount;continue outer}}let s=a.match(this.mergedInlineGrammar.linkOpen.regexp),c=a.match(this.mergedInlineGrammar.imageOpen.regexp);if(c||s){let e=this.parseLinkOrImage(a,!!c);if(e){n=`${n}${e.output}`,a=a.substr(e.charCount),i+=e.charCount;continue outer}}let l=t.editorRegExp.emphasisDelimiter.exec(a);if(l){let o=l[0].length,s=l[0],c=l[0][0];a=a.substr(l[0].length);let u=i>0?e.substr(0,i):` `,d=i+l[0].length<e.length?a:` `,f=d.match(t.punctuationLeading),p=u.match(t.punctuationTrailing),m=d.match(t.editorRegExp.leadingWhitespace),h=u.match(t.editorRegExp.trailingWhitespace),g=!m&&(!f||!!h||!!p),_=!h&&(!p||!!m||!!f);if(c===`_`&&g&&_&&(g=!!p,_=!!f),_){let e=r.length-1;for(;o&&e>=0;)if(r[e].delimiter===c){for(;e<r.length-1;){let e=r.pop();n=`${e.output}${e.delimString.substr(0,e.count)}${n}`}o>=2&&r[e].count>=2?(n=`<span class="TMMark">${c}${c}</span><strong class="TMStrong">${n}</strong><span class="TMMark">${c}${c}</span>`,o-=2,r[e].count-=2):(n=`<span class="TMMark">${c}</span><em class="TMEm">${n}</em><span class="TMMark">${c}</span>`,--o,--r[e].count),r[e].count===0&&(n=`${r.pop().output}${n}`,e--)}else e--}o&&g&&(r.push({delimiter:c,delimString:s,count:o,output:n}),n=``,o=0),o&&(n=`${n}${s.substr(0,o)}`),i+=l[0].length;continue outer}if(l=t.editorRegExp.strikethroughDelimiter.exec(a),l){let e=!1,t=r.length-1;for(;!e&&t>=0;)if(r[t].delimiter===`~`){for(;t<r.length-1;){let e=r.pop();n=`${e.output}${e.delimString.substr(0,e.count)}${n}`}n=`<span class="TMMark">~~</span><del class="TMStrikethrough">${n}</del><span class="TMMark">~~</span>`,n=`${r.pop().output}${n}`,e=!0}else t--;e||(r.push({delimiter:`~`,delimString:`~~`,count:2,output:n}),n=``),i+=l[0].length,a=a.substr(l[0].length);continue outer}if(l=this.mergedInlineGrammar.default.regexp.exec(a),l){a=a.substr(l[0].length),i+=l[0].length,n+=this.mergedInlineGrammar.default.replacement.replace(t.editorRegExp.inlineReplacementPlaceholder,(e,n)=>(0,t.htmlescape)(l[n]));continue outer}throw`Infinite loop!`}for(;r.length;){let e=r.pop();n=`${e.output}${e.delimString.substr(0,e.count)}${n}`}return n}computeColumn(e,t){let n=e,r;for(;n&&n.parentNode!==this.e;)n=n.parentNode;if(n===null)return null;for(e.nodeType===Node.TEXT_NODE||t===0?(r=t,n=e):t>0?(n=e.childNodes[t-1],r=n.textContent.length):(r=0,n=e);n.parentNode!==this.e;)n.previousSibling?(n=n.previousSibling,r+=n.textContent.length):n=n.parentNode;return r}computeNodeAndOffset(e,t,n=!1){e>=this.lineElements.length&&(e=this.lineElements.length-1,t=this.lines[e].length),t>this.lines[e].length&&(t=this.lines[e].length);let r=this.lineElements[e],i=r.firstChild,a=!1,o={node:r.firstChild?r.firstChild:r,offset:0};for(;i!==r;){if(!a&&i.nodeType===Node.TEXT_NODE){if(i.nodeValue.length>=t){if(n&&i.nodeValue.length===t)o={node:i,offset:t},t=0;else return{node:i,offset:t}}else t-=i.nodeValue.length}!a&&i.firstChild?i=i.firstChild:i.nextSibling?(a=!1,i=i.nextSibling):(a=!0,i=i.parentNode)}return o}updateLineContentsAndFormatting(){this.clearDirtyFlag(),this.updateLineContents(),this.updateFormatting()}clearDirtyFlag(){this.lineDirty=Array(this.lines.length);for(let e=0;e<this.lineDirty.length;e++)this.lineDirty[e]=!1}updateLineContents(){let e=this.e.childElementCount-this.lines.length;if(e){let t=0;for(;t<=this.lines.length&&t<=this.lineElements.length&&this.lineElements[t]&&this.lines[t]===this.lineElements[t].textContent&&this.lineTypes[t]===this.lineElements[t].className;)t++;let n=-1;for(;-n<this.lines.length&&-n<this.lineElements.length&&this.lines[this.lines.length+n]===this.lineElements[this.lineElements.length+n].textContent&&this.lineTypes[this.lines.length+n]===this.lineElements[this.lineElements.length+n].className;)n--;let r=this.lines.length+n+1-t;r<-e&&(r=-e),r<0&&(r=0);let i=[];for(let n=0;n<r+e;n++)i.push(this.lineElements[t+n].textContent||``);this.spliceLines(t,r,i,!1)}else for(let e=0;e<this.lineElements.length;e++){let t=this.lineElements[e],n=t.textContent||``;(this.lines[e]!==n||this.lineTypes[e]!==t.className)&&(this.lines[e]=n,this.lineTypes[e]=t.className,this.lineDirty[e]=!0)}}spliceLines(e,t=0,n=[],r=!0){if(r)for(let n=0;n<t;n++)this.e.removeChild(this.e.childNodes[e]);let i=[],a=[];for(let t=0;t<n.length;t++)i.push(``),a.push(!0),r&&(this.e.childNodes[e]?this.e.insertBefore(document.createElement(`div`),this.e.childNodes[e]):this.e.appendChild(document.createElement(`div`)));this.lines.splice(e,t,...n),this.lineTypes.splice(e,t,...i),this.lineDirty.splice(e,t,...a)}fixNodeHierarchy(){let e=Array.from(this.e.childNodes),t=(e,...t)=>{let n=e.parentElement,r=e.nextSibling;n.removeChild(e),t.forEach(e=>r?n.insertBefore(e,r):n.appendChild(e))};e.forEach(e=>{if(e.nodeType!==Node.ELEMENT_NODE||e.tagName!==`DIV`){let n=document.createElement(`div`);t(e,n),n.appendChild(e)}else if(e.childNodes.length===0)e.appendChild(document.createElement(`br`));else{let n=Array.from(e.childNodes);if(n.some(e=>e.nodeType===Node.ELEMENT_NODE&&e.tagName===`DIV`))return t(e,...n)}})}parseAutolinkExtension(e){let n=this.matchExtendedAutolink(e);return n?{output:`<span class="TMAutolink">${(0,t.htmlescape)(n)}</span>`,charCount:n.length}:!1}matchExtendedAutolink(e){let n=t.editorRegExp.autolinkScheme.exec(e),r=t.editorRegExp.autolinkWww.test(e);if(n||r){let r=n?n[0].length:0,i=e.substr(r),a=t.editorRegExp.autolinkDomain.exec(i);if(a&&this.isValidAutolinkDomain(a[0])){let n=t.editorRegExp.autolinkPath.exec(i.substr(a[0].length)),o=e.substr(0,r+a[0].length+(n?n[0].length:0)),s=this.trimAutolinkTrailing(o);if(s.length>=r+a[0].length)return s}}let i=t.editorRegExp.autolinkProtocol.exec(e);if(i){let n=this.matchAutolinkEmail(e.substr(i[0].length));if(n){let r=``;if(t.editorRegExp.autolinkXmpp.test(e)){let a=t.editorRegExp.autolinkXmppResource.exec(e.substr(i[0].length+n.length));a&&(r=a[0])}return i[0]+n+r}}return this.matchAutolinkEmail(e)||!1}isValidAutolinkDomain(e){let t=e.split(`.`);return t.length<2?!1:!t.slice(-2).some(e=>e.indexOf(`_`)>=0)}matchAutolinkEmail(e){let n=t.editorRegExp.autolinkEmail.exec(e);if(!n)return!1;let r=n[0];for(;r.length&&t.editorRegExp.emailTrailingChar.test(r);)r=r.substr(0,r.length-1);return t.editorRegExp.emailTld.test(r)?r:!1}trimAutolinkTrailing(e){let t=e.length,n=!0;for(;n&&t>0;){n=!1;let r=e[t-1];if(`?!.,:*_~`.indexOf(r)>=0)t--,n=!0;else if(r===`)`){let r=0,i=0;for(let n=0;n<t;n++)e[n]===`(`?r++:e[n]===`)`&&i++;i>r&&(t--,n=!0)}}return e.substr(0,t)}parseLinkOrImage(e,n){let r=n?2:1,i=e.substr(0,r),a=n?`TMImage`:`TMLink`,o=r,s=1,c=!1,l=!1,u=[],d=[];textOuter:for(;o<e.length&&c===!1;){let i=e.substr(o);for(let e of[`escape`,`code`,`autolink`,`html`]){let t=this.mergedInlineGrammar[e].regexp.exec(i);if(t){o+=t[0].length;continue textOuter}}if(i.match(this.mergedInlineGrammar.imageOpen.regexp)){s++,o+=2;continue textOuter}if(i.match(this.mergedInlineGrammar.linkOpen.regexp)){if(s++,!n&&this.parseLinkOrImage(i,!1))return!1;o+=1;continue textOuter}if(i.match(t.editorRegExp.linkClosingBracket)&&(s--,s===0)){c=e.substr(r,o-r),o++;continue textOuter}o++}if(c===!1)return!1;let f=o<e.length?e.substr(o,1):``;if(f===`[`){let t=e.substr(o),n=this.mergedInlineGrammar.linkLabel.regexp.exec(t);if(n)o+=n[0].length,u.push(n[1],n[2],n[3]),l=n[this.mergedInlineGrammar.linkLabel.labelPlaceholder]?n[this.mergedInlineGrammar.linkLabel.labelPlaceholder]:c.trim();else return!1}else if(f!==`(`)l=c.trim();else{o++;let n=1;inlineOuter:for(;o<e.length&&n>0;){let r=e.substr(o),i=t.editorRegExp.leadingWhitespaceRun.exec(r);if(i){switch(d.length){case 0:d.push(i[0]);break;case 1:d.push(i[0]);break;case 2:if(d[0].match(t.editorRegExp.containsOpenAngle))d[1]=d[1].concat(i[0]);else{if(n!==1)return!1;d.push(``),d.push(i[0])}break;case 3:d.push(i[0]);break;case 4:return!1;case 5:d.push(``);case 6:d[5]=d[5].concat(i[0]);break;case 7:d[6]=d[6].concat(i[0]);break;default:return!1}o+=i[0].length;continue inlineOuter}if(i=this.mergedInlineGrammar.escape.regexp.exec(r),i){switch(d.length){case 0:d.push(``);case 1:d.push(i[0]);break;case 2:d[1]=d[1].concat(i[0]);break;case 3:return!1;case 4:return!1;case 5:d.push(``);case 6:d[5]=d[5].concat(i[0]);break;default:return!1}o+=i[0].length;continue inlineOuter}if(d.length<2&&r.match(t.editorRegExp.openingAngle)){d.length===0&&d.push(``),d[0]=d[0].concat(`<`),o++;continue inlineOuter}if((d.length===1||d.length===2)&&r.match(t.editorRegExp.closingAngle)){d.length===1&&d.push(``),d.push(`>`),o++;continue inlineOuter}if(i=t.editorRegExp.titleQuote.exec(r),i&&(d.length===0||d.length===1||d.length===4)){for(;d.length<4;)d.push(``);d.push(i[0]),o++;continue inlineOuter}if(i&&(d.length===5||d.length===6)&&d[4]===i[0]){d.length===5&&d.push(``),d.push(i[0]),o++;continue inlineOuter}if(r.match(t.editorRegExp.openingParen)){switch(d.length){case 0:d.push(``);case 1:d.push(``);case 2:d[1]=d[1].concat(`(`),d[0].match(t.editorRegExp.endsWithOpenAngle)||n++;break;case 3:d.push(``);case 4:d.push(`(`);break;case 5:d.push(``);case 6:if(d[4]===`(`)return!1;d[5]=d[5].concat(`(`);break;default:return!1}o++;continue inlineOuter}if(r.match(t.editorRegExp.closingParen)){if(d.length<=2){for(;d.length<2;)d.push(``);d[0].match(t.editorRegExp.endsWithOpenAngle)||n--,n>0&&(d[1]=d[1].concat(`)`))}else d.length===5||d.length===6?d[4]===`(`?(d.length===5&&d.push(``),d.push(`)`)):d.length===5?d.push(`)`):d[5]=d[5].concat(`)`):n--;if(n===0)for(;d.length<7;)d.push(``);o++;continue inlineOuter}if(i=t.editorRegExp.anyChar.exec(r),i){switch(d.length){case 0:d.push(``);case 1:d.push(i[0]);break;case 2:d[1]=d[1].concat(i[0]);break;case 3:return!1;case 4:return!1;case 5:d.push(``);case 6:d[5]=d[5].concat(i[0]);break;default:return!1}o+=i[0].length;continue inlineOuter}throw`Infinite loop`}if(n>0)return!1}if(l!==!1){let e=!1;for(let t of this.linkLabels)if(t===l){e=!0;break}let t=e?`TMLinkLabel TMLinkLabel_Valid`:`TMLinkLabel TMLinkLabel_Invalid`,n=`<span class="TMMark TMMark_${a}">${i}</span><span class="${a} ${u.length<3||!u[1]?t:``}">${this.processInlineStyles(c)}</span><span class="TMMark TMMark_${a}">]</span>`;return u.length>=3&&(n=n.concat(`<span class="TMMark TMMark_${a}">${u[0]}</span>`,`<span class="${t}">${u[1]}</span>`,`<span class="TMMark TMMark_${a}">${u[2]}</span>`)),{output:n,charCount:o}}if(d.length>0){for(;d.length<7;)d.push(``);return{output:`<span class="TMMark TMMark_${a}">${i}</span><span class="${a}">${this.processInlineStyles(c)}</span><span class="TMMark TMMark_${a}">](${(0,t.htmlescape)(d[0])}</span><span class="${a}Destination">${(0,t.htmlescape)(d[1])}</span><span class="TMMark TMMark_${a}">${(0,t.htmlescape)(d[2])}${(0,t.htmlescape)(d[3])}${(0,t.htmlescape)(d[4])}</span><span class="${a}Title">${(0,t.htmlescape)(d[5])}</span><span class="TMMark TMMark_${a}">${(0,t.htmlescape)(d[6])})</span>`,charCount:o}}return!1}computeCommonAncestor(e,t){if(!e||!t)return null;if(e===t)return e;let n=e=>{let t=[];for(;e;)t.unshift(e),e=e.parentNode;return t},r=n(e),i=n(t);if(r[0]!==i[0])return null;let a=0;for(;r[a]===i[a];a++);return r[a-1]}computeEnclosingMarkupNode(e,t,n){let r=null;if(!e)return null;if(t){if(e.row!==t.row)return null;let n=window.getSelection();if(!n)return null;r=this.computeCommonAncestor(n.focusNode,n.anchorNode)}else{let e=window.getSelection();if(!e||!e.focusNode)return null;r=e.focusNode}if(!r)return null;for(;r!==this.e;){if(r.classList&&r.classList.contains(n))return r;r=r.parentNode}return null}getCommandState(e=null,n=null){let r={};if(e||=this.getSelection(!1),n||=this.getSelection(!0),!e){for(let e in t.commands)r[e]=null;return r}n||=e;let i,a;n.row<e.row||n.row===e.row&&n.col<e.col?(i=n,a=e):(i=e,a=n),a.row>i.row&&a.col===0&&(a.row--,a.col=this.lines[a.row].length);for(let o in t.commands)if(t.commands[o].type===`inline`&&(r[o]=!e||e.row!==n.row||!this.isInlineFormattingAllowed()?null:!!this.computeEnclosingMarkupNode(e,n,t.commands[o].className)||e.col===n.col&&!!this.lines[e.row].substr(0,e.col).match(t.commands[o].unset.prePattern)&&!!this.lines[e.row].substr(e.col).match(t.commands[o].unset.postPattern)),t.commands[o].type===`line`){if(!e)r[o]=null;else{let e=this.lineTypes[i.row]===t.commands[o].className;for(let n=i.row;n<=a.row;n++)if(this.lineTypes[n]===t.commands[o].className!==e){e=null;break}r[o]=e}}return r}setCommandState(e,n){if(this.isRestoringHistory||this.pushHistory(),t.commands[e].type===`inline`){let n=this.getSelection(!0),r=this.getSelection(!1);if(n||=r,!n||n.row!==r.row||!this.isInlineFormattingAllowed())return;let i=this.computeEnclosingMarkupNode(r,n,t.commands[e].className);if(this.clearDirtyFlag(),i){this.lineDirty[r.row]=!0;let a=this.computeColumn(i,0),o=i.textContent.length,s=this.lines[r.row].substr(0,a).replace(t.commands[e].unset.prePattern,``),c=this.lines[r.row].substr(a,o),l=this.lines[r.row].substr(a+o).replace(t.commands[e].unset.postPattern,``);this.lines[r.row]=s.concat(c,l),n.col=s.length,r.col=n.col+o,this.updateFormatting(),this.setSelection(r,n),this.fireChange()}else if(r.col===n.col&&this.lines[r.row].substr(0,r.col).match(t.commands[e].unset.prePattern)&&this.lines[r.row].substr(r.col).match(t.commands[e].unset.postPattern)){this.lineDirty[r.row]=!0;let i=this.lines[r.row].substr(0,r.col).replace(t.commands[e].unset.prePattern,``),a=this.lines[r.row].substr(r.col).replace(t.commands[e].unset.postPattern,``);this.lines[r.row]=i.concat(a),r.col=n.col=i.length,this.updateFormatting(),this.setSelection(r,n),this.fireChange()}else{let{startCol:i,endCol:a}=r.col<n.col?{startCol:r.col,endCol:n.col}:{startCol:n.col,endCol:r.col},o=this.lines[r.row].substr(i,a-i).match(t.editorRegExp.surroundingWhitespace);o&&(i+=o.groups.leading.length,a-=o.groups.trailing.length),r.col=i,n.col=a,this.wrapSelection(t.commands[e].set.pre,t.commands[e].set.post,r,n)}}else if(t.commands[e].type===`line`){let r=this.getSelection(!0),i=this.getSelection(!1);if(r||=i,!i)return;this.clearDirtyFlag();let a=r.row>i.row?i:r,o=r.row>i.row?r:i;o.row>a.row&&o.col===0&&o.row--;for(let r=a.row;r<=o.row;r++)n&&this.lineTypes[r]!==t.commands[e].className&&(this.lines[r]=this.lines[r].replace(t.commands[e].set.pattern,t.commands[e].set.replacement.replace(`$#`,(r-a.row+1).toString())),this.lineDirty[r]=!0),!n&&this.lineTypes[r]===t.commands[e].className&&(this.lines[r]=this.lines[r].replace(t.commands[e].unset.pattern,t.commands[e].unset.replacement),this.lineDirty[r]=!0);this.updateFormatting(),this.setSelection({row:o.row,col:this.lines[o.row].length},{row:a.row,col:0}),this.fireChange()}}listItemMarker(e){let n=t.lineGrammar.TMUL.regexp.exec(e);if(n)return n[1];let r=t.lineGrammar.TMOL.regexp.exec(e);return r?r[1]:null}isTaskListItem(e){if(e<0||e>=this.lines.length)return!1;let n=this.lineTypes[e];if(n!==`TMUL`&&n!==`TMOL`)return!1;let r=this.listItemMarker(this.lines[e]);return r!==null&&t.editorRegExp.taskListItem.test(this.lines[e].substr(r.length))}addTaskCheckbox(e){let n=this.listItemMarker(e);if(n!==null){let r=e.substr(n.length);return t.editorRegExp.taskListItem.test(r)?e:`${n}[ ] ${r}`}return e.replace(t.commands.ul.set.pattern,`- [ ] $2`)}removeTaskCheckbox(e){let n=this.listItemMarker(e);if(n===null)return e;let r=t.editorRegExp.taskListItem.exec(e.substr(n.length));return r?`${n}${r[5]}`:e}toggleTaskList(){let e=this.getSelection(!0),t=this.getSelection(!1);if(e||=t,!t)return;let n=e.row>t.row?t:e,r=e.row>t.row?e:t;r.row>n.row&&r.col===0&&r.row--;let i=!0;for(let e=n.row;e<=r.row;e++)if(!this.isTaskListItem(e)){i=!1;break}this.isRestoringHistory||this.pushHistory(),this.clearDirtyFlag();for(let e=n.row;e<=r.row;e++){let t=i?this.removeTaskCheckbox(this.lines[e]):this.addTaskCheckbox(this.lines[e]);t!==this.lines[e]&&(this.lines[e]=t,this.lineDirty[e]=!0)}this.updateFormatting(),this.setSelection({row:r.row,col:this.lines[r.row].length},{row:n.row,col:0}),this.fireChange()}isInlineFormattingAllowed(){let e=window.getSelection();if(!e||!e.focusNode||!e.anchorNode)return!1;if(e.isCollapsed&&e.focusNode.nodeType===3&&e.focusOffset===e.focusNode.nodeValue.length){let t;for(t=e.focusNode;t&&t.nextSibling===null;t=t.parentNode);if(t&&t.nextSibling&&t.nextSibling.classList&&t.nextSibling.classList.contains(`TMInlineFormatted`))return!0}let t=this.computeCommonAncestor(e.focusNode,e.anchorNode);if(!t)return!1;for(;t&&t!==this.e;){if(t.classList&&(t.classList.contains(`TMInlineFormatted`)||t.classList.contains(`TMBlankLine`)))return!0;t=t.parentNode}return!1}toggleCommandState(e){this.lastCommandState||=this.getCommandState(),this.setCommandState(e,!this.lastCommandState[e])}fireDrop(e){for(let t of this.listeners.drop)t({dataTransfer:e})}fireSelection(){let e=this.getSelection(!1),t=this.getSelection(!0);if(this.lastSelection={focus:e,anchor:t},this.listeners.selection&&this.listeners.selection.length){let n=this.getCommandState(e,t);this.lastCommandState?Object.assign(this.lastCommandState,n):this.lastCommandState=Object.assign({},n);for(let n of this.listeners.selection)n({focus:e,anchor:t,commandState:this.lastCommandState})}}}})))(),Rl=Il();function zl(e,t){try{return new ql(e,t)}catch(n){return console.warn(`llm-agent: Markdown editor did not start, using a plain box`,n),new Bl(e,t)}}var Bl=class{#e;constructor(e,t){this.source=e,this.el=e;let n=()=>t.onChange();e.addEventListener(`keydown`,t.onKey),e.addEventListener(`input`,n),e.addEventListener(`paste`,t.onPaste),e.addEventListener(`blur`,t.onBlur),this.#e=()=>{e.removeEventListener(`keydown`,t.onKey),e.removeEventListener(`input`,n),e.removeEventListener(`paste`,t.onPaste),e.removeEventListener(`blur`,t.onBlur)}}get value(){return this.el.value}set value(e){this.el.value=e}get selectionStart(){return this.el.selectionStart??this.el.value.length}setSelectionRange(e,t){this.el.setSelectionRange(e,t)}focus(){this.el.focus()}fit(){this.el.style.height=`auto`,this.el.style.height=`${this.el.scrollHeight}px`}setMentions(){}setPlaceholder(){}destroy(){this.#e()}};function Vl(e){if(e instanceof ShadowRoot){let t=e.getSelection?.();if(t)return t;let n=document.getSelection(),r=n?.getComposedRanges;if(!n||!r)return null;let i;try{i=r.call(n,{shadowRoots:[e]})}catch{i=r.call(n,e)}let a=i[0];return a?n.direction===`backward`?{anchorNode:a.endContainer,anchorOffset:a.endOffset,focusNode:a.startContainer,focusOffset:a.startOffset}:{anchorNode:a.startContainer,anchorOffset:a.startOffset,focusNode:a.endContainer,focusOffset:a.endOffset}:null}return document.getSelection()}function Hl(e){return!(e instanceof ShadowRoot)||typeof e.getSelection==`function`||typeof Selection.prototype.getComposedRanges==`function`}var Ul=class extends Ll.Editor{getSelection(e=!1){let t=this,n=Vl(t.e.getRootNode()),r=e?n?.anchorNode:n?.focusNode;if(!n||!r)return null;let i=e?n.anchorOffset:n.focusOffset;if(r===t.e){if(i<t.lines.length)return{row:i,col:0};let e=t.lines.length-1;return{row:e,col:t.lines[e]?.length??0}}let a=t.computeColumn(r,i);if(a===null)return null;let o=r;for(;o.parentNode&&o.parentNode!==t.e;)o=o.parentNode;let s=Array.prototype.indexOf.call(t.e.childNodes,o);return s<0?null:{row:s,col:a}}setSelection(e,t=null){if(!e)return;let n=this,r=n.computeNodeAndOffset(e.row,e.col,t?t.row===e.row&&t.col>e.col:!1),i=r;t&&(t.row!==e.row||t.col!==e.col)&&(i=n.computeNodeAndOffset(t.row,t.col,e.row===t.row&&e.col>t.col)),(n.e.getRootNode().getSelection?.()??document.getSelection())?.setBaseAndExtent(i.node,i.offset,r.node,r.offset)}},Wl=/^ {0,3}(`{3,}|~{3,})/;function Gl(e,t){let n=!1;for(let r of e.slice(0,t).split(`
`).slice(0,-1))Wl.test(r)&&(n=!n);return n}var Kl=e=>e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),ql=class{#e;#t;#n=!1;#r=``;#i=!0;#a=``;constructor(e,t){this.source=e;let n=e.getRootNode();if(!Hl(n))throw Error(`this browser cannot read a caret inside a shadow root`);let r=document.createElement(`div`);r.className=`box`,r.setAttribute(`role`,`textbox`),r.setAttribute(`aria-multiline`,`true`),r.addEventListener(`keydown`,t.onKey),r.addEventListener(`paste`,e=>{t.onPaste(e),e.defaultPrevented&&e.stopImmediatePropagation()}),r.addEventListener(`blur`,t.onBlur),r.addEventListener(`focus`,()=>this.#i=!1);let i=n instanceof ShadowRoot?n.host:null;i?.addEventListener(`keydown`,this.#s),this.#t=i,e.after(r);try{this.#e=new Ul({textarea:e,editor:r})}catch(t){throw r.remove(),i?.removeEventListener(`keydown`,this.#s),e.style.display=``,t}this.el=r,this.setPlaceholder(e.placeholder),this.#e.addEventListener(`change`,()=>{this.#n||(this.#o(),t.onChange())})}#o(){let e=this.#a,t=this.value;if(this.#a=t,t.length!==e.length+1)return;let n=this.selectionStart;if(t[n-1]!==`
`||t.slice(0,n-1)+t.slice(n)!==e)return;let r=t.lastIndexOf(`
`,n-2)+1,i=Wl.exec(t.slice(r,n-1));i&&!Gl(t,r)&&(t.slice(n).split(`
`).some(e=>Wl.test(e))||(this.value=`${t.slice(0,n)}\n${i[1]}\n${t.slice(n)}`,this.setSelectionRange(n,n)))}#s=e=>{let t=e;t.ctrlKey||t.altKey||t.metaKey||t.key!==`Escape`&&t.composedPath()[0]===this.el&&t.stopPropagation()};get value(){return this.#e.getContent()}set value(e){let t=this.el.getRootNode().activeElement===this.el;this.#n=!0,this.#a=e;try{this.#e.setContent(e)}finally{this.#n=!1}t?this.setSelectionRange(e.length,e.length):this.#i=!0}#c(e){let t=this.#e.lines,n=e.col;for(let r=0;r<e.row&&r<t.length;r++)n+=(t[r]?.length??0)+1;return n}#l(e){let t=this.#e.lines,n=e;for(let e=0;e<t.length;e++){let r=t[e]?.length??0;if(n<=r)return{row:e,col:n};n-=r+1}let r=Math.max(0,t.length-1);return{row:r,col:t[r]?.length??0}}get selectionStart(){let e=this.#e.getSelection(!1),t=this.#e.getSelection(!0);return e===null?this.value.length:Math.min(this.#c(e),t===null?1/0:this.#c(t))}setSelectionRange(e,t){this.#e.setSelection(this.#l(t),this.#l(e))}focus(){let e=!this.#i&&this.#e.getSelection()!==null;this.el.focus(),this.#i=!1,e||this.setSelectionRange(this.value.length,this.value.length)}fit(){}setMentions(e){let t=e.join(`
`);if(t===this.#r)return;this.#r=t;let n=this.#e;if(!e.length){n.customInlineGrammar={},n.mergedInlineGrammar=Rl.inlineGrammar;return}let r=[...e].sort((e,t)=>t.length-e.length).map(Kl),i={regexp:RegExp(`^(@(?:${r.join(`|`)}))`),replacement:`<span class="TMMention">$1</span>`};n.customInlineGrammar={mention:i},n.mergedInlineGrammar={...Rl.inlineGrammar,mention:i}}setPlaceholder(e){this.el.getAttribute(`data-placeholder`)!==e&&(this.el.setAttribute(`data-placeholder`,e),this.el.setAttribute(`aria-label`,e))}destroy(){this.#t?.removeEventListener(`keydown`,this.#s),this.#e.destroy(),this.el.remove()}},Jl=/device_id:[0-9a-f]{32} \(([^()\n]+)\)|area_id:([a-z0-9_]+)|\b([a-z_]+\.[a-z0-9_]+)\b/g;function Yl(e,t,n,r){if(t!==void 0)return t;if(n!==void 0)return e?.areas?.[n]?.name??n;let i=r===void 0?void 0:e?.states?.[r];if(i)return i.attributes.friendly_name||i.entity_id}var Xl=class{constructor(){this.byLabel=/* @__PURE__ */ new Map}add(e,t){let n=e;for(let r=2;this.byLabel.has(n)&&this.byLabel.get(n)!==t;r++)n=`${e} ${r}`;return this.byLabel.set(n,t),n}labels(){return[...this.byLabel.keys()]}show(e,t){return e.replace(Jl,(e,n,r,i)=>{let a=Yl(t,n,r,i);return a===void 0?e:`@${this.add(a,e)}`})}expand(e){let t=[...this.byLabel.keys()].sort((e,t)=>t.length-e.length);for(let n of t)e=e.split(`@${n}`).join(this.byLabel.get(n));return e}},Zl=/* @__PURE__ */ new Map;function Ql(e,t){let n=Zl.get(e);if(n!==void 0)return n;let r=document.createElement(`template`);r.innerHTML=e;let i=document.createTreeWalker(r.content,NodeFilter.SHOW_TEXT),a=[];for(let e=i.nextNode();e;e=i.nextNode())a.push(e);for(let e of a){if(e.parentElement?.closest(`code, pre, a`))continue;let n=e.data,r=document.createDocumentFragment(),i=0;for(let e of n.matchAll(Jl)){let a=Yl(t,e[1],e[2],e[3]);if(a===void 0)continue;r.append(n.slice(i,e.index));let o=document.createElement(`span`);o.className=`chip`,o.title=e[0],o.textContent=a,r.append(o),i=e.index+e[0].length}i!==0&&(r.append(n.slice(i)),e.replaceWith(r))}let o=r.innerHTML;return Zl.size>300&&Zl.clear(),Zl.set(e,o),o}var $l=Ei,eu=Ja,tu=/*#__PURE__*/ Symbol(`slot`),nu=/*#__PURE__*/ Symbol(`index`),ru={transparent:!0,sync:!0},iu={sync:!0};function q(e,t,n){Za(e,t,n?{sync:!0,...n,transparent:!n.scope}:ru)}function J(e){return Ya(()=>e(),iu)}function au(e,t,n,r){let i=n.length,a=t.length,o=i,s=0,c=0,l,u,d,f;for(;s<a&&t[s]===n[c];)s++,c++;if(s===a&&c===o)return;let p=e.moveBefore&&e.isConnected,m=r||e,h=(t,n)=>{p&&t.isConnected?e.moveBefore(t,n):e.insertBefore(t,n),(r||t[tu])&&(t[tu]=m)};if(!a){for(let e of n)h(e,r);return}let g=t=>t&&t.parentNode===e&&(!(t=t[tu])||t===m),_=t=>{for(;t<i&&!g(n[t]);)t++;return n[t]||(u&&u.parentNode!==e?r||null:u)};for(u=g(f=t[a-1])?f.nextSibling:r||null;s<a||c<o;)if(t[s]===n[c])s++,c++;else{for(;a>s&&o>c&&t[a-1]===n[o-1];)a--,o--;if(a===s)for(f=_(o);c<o;)h(n[c++],f);else if(!g(f=t[s]))s++;else if(n[c]===t[a-1]&&(f===n[o-1]||!l&&f===n[c+1]&&t[s+1]===n[c+2]))do h(t[--a],f),c++;while(s<a-1&&c<o&&f===n[o-1]&&n[c]===t[a-1]);else if(c<o&&f===n[o-1]&&t[s+1]!==n[o-2]&&g(n[c])&&g(t[a-1]))h(f,_(o)),s++,o--;else{if(!l)for(l=1,d=c;d<o;)n[d][nu]=d++;if((d=f[nu])>=0&&n[d]===f){if(c<d&&d<o){let i=s,l=1;for(;++i<a&&i<o&&t[i]===n[d+l];)l++;if(l>d-c)for(;c<d;)h(n[c++],f);else{let t=n[c++];s++,p?h(t,f):e.replaceChild(t,f),(r||t[tu])&&(t[tu]=m)}}else s++}else f.remove(),s++}}}var ou=`_$$`,su=`_$SOLID_EVENT_OWNER`,cu=Symbol(),lu={},uu=/* @__PURE__ */ new Set,du=/* @__PURE__ */ new Map;function fu(e,t,n,r={}){let i;hu(t);try{Xa(a=>{i=a,r.onError&&(It()[zn]=r.onError);let o=e();t===document?q(()=>ua(o),()=>{}):Z(t,()=>o,t.firstChild?null:void 0,n,{...r.insertOptions,schedule:!0})},{id:r.renderId}),ar()}catch(e){throw i&&i(),gu(t),e}return()=>{i(),gu(t),t.textContent=``}}function pu(e,t,n){let r=document.createElement(`template`);r.innerHTML=e;let i=r.content.firstChild;return n===2?i.firstChild:i}function Y(e,t){let n;return r=>(n||=pu(e,r,t),t===1?document.importNode(n,!0):n.cloneNode(!0))}function mu(e){for(let t of e)uu.has(t)||(uu.add(t),du.forEach((e,n)=>bu(t,n,e)))}function hu(e){_u(e,e)}function gu(e){vu(e,e)}function _u(e,t=e){if(!e||!t)return;let n=du.get(e);n||du.set(e,n={owners:/* @__PURE__ */ new Map,handlers:/* @__PURE__ */ new Map}),n.owners.set(t,(n.owners.get(t)||0)+1),uu.forEach(t=>bu(t,e,n))}function vu(e,t=e){let n=du.get(e);if(!n)return;let r=n.owners.get(t);r>1?n.owners.set(t,r-1):n.owners.delete(t),!n.owners.size&&(n.handlers.forEach((t,n)=>{e.removeEventListener(n,yu,!0),e.removeEventListener(n,t)}),du.delete(e))}function yu(e){delete e[su]}function bu(e,t,n){if(n.handlers.has(e))return;let r=e=>Bu(e,t,n);n.handlers.set(e,r),t.addEventListener(e,yu,!0),t.addEventListener(e,r)}var xu=e=>e._$host||e.parentNode||e.host;function Su(e,t){let n=0;for(;e;){if(t.owners.has(e))return{owner:e,distance:n};n++,e=xu(e)}}function Cu(e,t,n){if(Iu(e))return;let r=e.nodeName;t===`value`&&r===`SELECT`?Uu(e,n):(t===`value`||t===`defaultValue`)&&(r===`INPUT`||r===`TEXTAREA`)?n==null&&/^(checkbox|radio)$/.test(e.type)?e.removeAttribute(`value`):e[t]=n??``:e[t]=n,Du(e,t)}var wu=null,Tu=[];function Eu(e,t){for(let n=0;n<e.length;n++)e[n](t)}function Du(e,t){wu!==null&&e._$claimed&&Tu.some(e=>e.includes(t.slice(t.indexOf(`:`)+1)))&&Eu(wu,e)}function Ou(e,t){return wu!==null&&!e._$claimed&&(e._$claimed=!0,t===void 0?Eu(wu,e):Ii(t,()=>Eu(wu,e))),e}function X(e,t,n){if(Iu(e))return;let r=t===`multiple`&&e.localName===`select`;if(n==null||n===!1)e.removeAttribute(t);else if(e.setAttribute(t,n===!0?``:n),r&&!e._$multiple){let t=e.options;for(let e=0;e<t.length;e++)t[e].defaultSelected&&(t[e].selected=!0)}r&&(e._$multiple=!0),Du(e,t)}function ku(e,t,n){if(typeof t==`number`&&(t=``+t),typeof n==`number`&&(n=``+n),Iu(e)){e._$classes=t&&typeof t==`object`?Ru(t):void 0;return}if(t==null||t===!1){(n||e._$classes)&&(e.removeAttribute(`class`),e._$classes=void 0);return}if(typeof t==`string`){e._$classes&&=void 0,t!==n&&e.setAttribute(`class`,t);return}let r;typeof n==`string`?(r={},e.removeAttribute(`class`)):r=e._$classes||Ru(n||{}),t=Ru(t);let i=Object.keys(t),a=Object.keys(r),o,s;for(o=0,s=a.length;o<s;o++){let n=a[o];n&&n!==`undefined`&&!t[n]&&e.classList.remove(n)}for(o=0,s=i.length;o<s;o++){let n=i[o],a=!!t[n];n&&n!==`undefined`&&r[n]!==a&&a&&e.classList.add(n)}e._$classes=t}function Au(e,t,n,r){if(r){let r=ou+t,i;Array.isArray(n)?(i=n[1],e[r]=n[0]):e[r]=n,e[`${r}Data`]=i}else{if(Array.isArray(n)){let r=n[0],i=t=>r.call(e,n[1],t);return i[cu]=n,e.addEventListener(t,i),i}return e.addEventListener(t,n,typeof n!=`function`&&n),n}}function ju(e){if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return e.map(ju);if(e[Wi]!==e)return e;let t=Reflect.ownKeys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof i==`string`&&(n[i]=e[i])}return n}var Mu={scope:!0},Nu=null,Pu=null,Fu=null;function Z(e,t,n,r,i){let a=n!==void 0;if(a&&!r&&(r=[]),Nu!==null&&(r=Nu.claimInitial(e,a,r)),typeof t!=`function`&&(t=Gu(t,r,a,!0),typeof t!=`function`)){Vu(e,t,r,n),Fu!==null&&i&&i.host&&Fu(t,i.host);return}if(a&&r.length===0){let t=document.createTextNode(``);e.insertBefore(t,n),r=[t]}let o=!1;q(()=>{Nu!==null&&(r=Nu.reclaimRegion(r,e,n));let s=Gu(t(),r,a,!0),c=o;return o=!0,typeof s==`function`?(q(()=>(Nu!==null&&(r=Nu.reclaimRegion(r,e,n)),Gu(s,r,a)),t=>{r=Vu(e,t,r,n),Fu!==null&&i&&i.host&&Fu(r,i.host)},c&&!(i&&i.schedule)?{...i,schedule:!0}:i),lu):s},t=>{t!==lu&&(r=Vu(e,t,r,n),Fu!==null&&i&&i.host&&Fu(r,i.host))},t.$s?i?{...i,scope:!0}:Mu:i)}function Iu(e){return!eu.hydrating||eu.isClaiming&&!eu.isClaiming()?!1:!e||e.isConnected?!0:Lu!==null&&Lu.claimed(e)}var Lu=null;function Ru(e){if(Array.isArray(e)){let t={};zu(e,t),e=t}if(e&&typeof e==`object`){let t={},n=Object.keys(e);for(let r=0,i=n.length;r<i;r++){let i=n[r];if(!e[i])continue;let a=i.trim().split(/\s+/);for(let e=0,n=a.length;e<n;e++)a[e]&&(t[a[e]]=!0)}return t}return e}function zu(e,t){for(let n=0,r=e.length;n<r;n++){let r=e[n];Array.isArray(r)?zu(r,t):typeof r==`object`&&r?Object.assign(t,r):typeof r!=`boolean`&&(r||r===0)&&(t[r]=!0)}}function Bu(e,t,n){if(Nu!==null&&Nu.dedupEvent(e))return;let r=e[su],i;if(r){if(r===!0||r===t||!t.contains(r))return;i=r}let a=n.owners.size===1&&n.owners.has(t)?t:Su(e.target,n)?.owner;if(!a||a===i)return;e[su]=a;let o=i||e.target,s=ou+e.type,c=(t,n)=>Object.defineProperty(e,t,{configurable:!0,value:n}),l=()=>{let t=o[s];if(t&&!o.disabled){c(`currentTarget`,o);let n=o[`${s}Data`];if(n===void 0?typeof t==`function`?t.call(o,e):t.handleEvent(e):t.call(o,n,e),e.cancelBubble)return}return o.host&&typeof o.host!=`string`&&!o.host._$host&&o.contains(e.target)&&c(`target`,o.host),!0},u=()=>o===a||o.parentNode===a,d=()=>{for(;o&&l()&&!u();)o=xu(o)};if(i)i===e.target&&(o=xu(i)),o&&o!==a&&d();else if(e.composedPath){let t=e.composedPath();if(t.length){c(`target`,t[0]);for(let e=0;e<t.length&&(o=t[e],l());e++){if(o._$host){o=o._$host,d();break}if(u())break}}else d()}else d();delete e.target,delete e.currentTarget}function Vu(e,t,n,r){if(Nu!==null&&Iu(e)){if(t&&t!==n){let e=Array.isArray(t);for(let r of e?t:[t])if(r&&r.nodeType){if(!Iu(r))return n}else if(e&&(typeof r==`string`||typeof r==`number`))return n}return t}if(t===n)return t;if(Nu!==null&&eu.hydrating&&t&&t.length!==0){let r=[].concat(n??[]);if([].concat(t).every(t=>(t===r[0]&&r.shift(),t?.parentNode===e))&&!r.length)return t}let i=typeof t;if(i===`string`||i===`number`){let r=typeof n;r===`string`||r===`number`?e.firstChild.data=t:Ku(e,n)?e.textContent=t:(qu(e,n),e.insertBefore(document.createTextNode(t),e.firstChild))}else if(t===void 0)Ju(e,n,r);else if(t.nodeType)Array.isArray(n)?Ju(e,n,r??null,t):n!=null&&n.nodeType?n.parentNode===e?e.replaceChild(t,n):e.appendChild(t):n!=null&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t),(r||t[tu])&&(t[tu]=r||e);else if(Array.isArray(t)){let i=Array.isArray(n);for(let e=0,r=t.length;e<r;e++){let r=t[e],a=typeof r;if(a===`string`||a===`number`){let a=i?n[e]:void 0;if(a&&a.nodeType===3){let n=a._$d;n!==r&&(n!==void 0||a.data!==``+r)&&(a.data=a._$d=r),t[e]=a}else t[e]=document.createTextNode(r)}}t.length===0?Ju(e,n,r):i?au(e,n,t,r):(n!=null&&Ju(e,n),au(e,[],t))}return Pu&&Pu(e),t}function Hu(e){(e=e.currentTarget||e)._$v=null,e.removeEventListener(`change`,Hu,!0)}function Uu(e,t){let n=e._$v&&e._$v.map;if(t!=null&&t.map?n||e.addEventListener(`change`,Hu,!0):n&&e.removeEventListener(`change`,Hu,!0),t==null)return e._$v=null,queueMicrotask(()=>e.value=t)||(e.value=t);e._$v=t,(Pu||=Wu)(e),queueMicrotask(()=>Pu(e))}function Wu(e){e&&e._$v==null&&(e=e.parentNode);let t=e&&e._$v;if(t!=null){if(t.map){let n=[...e.options];for(let e=0;e<n.length;e++)n[e].selected=t.some(t=>t==n[e].value);t.every(e=>n.some(t=>t.value==e))&&Hu(e)}else e.value=t,e.selectedIndex>-1&&e.value==t&&(e._$v=null)}}function Gu(e,t,n,r){if(e=ua(e,{skipNonRendered:!0,doNotUnwrap:r}),r&&typeof e==`function`)return e;if(n&&!Array.isArray(e)&&(e=[e??``]),Nu!==null&&eu.hydrating&&Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n],i=t&&t[n],a=typeof r;(a===`string`||a===`number`)&&i&&i.nodeType===3&&Iu(i)&&(e[n]=i)}return e}function Ku(e,t){if(t==null)return!0;if(Array.isArray(t))return t.length?e.firstChild===t[0]&&e.lastChild===t[t.length-1]:e.firstChild===null;if(t===``)return e.firstChild===null;if(t.nodeType)return e.firstChild===t&&e.lastChild===t;let n=e.firstChild;return n!==null&&n.nodeType===3&&e.lastChild===n}function qu(e,t){if(Array.isArray(t))for(let n=0;n<t.length;n++){let r=t[n];r.parentNode===e&&r.remove()}else if(t.nodeType)t.parentNode===e&&t.remove();else{let t=e.firstChild;t&&t.nodeType===3&&t.remove()}}function Ju(e,t,n,r){if(n===void 0)return Ku(e,t)?e.textContent=``:qu(e,t);if(t.length){let i=!1;for(let a=t.length-1;a>=0;a--){let o=t[a];if(r!==o){let t=o[tu],s=o.parentNode===e&&(!t||t===(n||e));r&&!i&&!a?s?e.replaceChild(r,o):e.insertBefore(r,n):s&&o.remove()}else i=!0}}else r&&e.insertBefore(r,n);r&&(n||r[tu])&&(r[tu]=n||e)}function Yu(e){let t=new CSSStyleSheet;return t.replaceSync(e),t}function Xu(e,t){if(customElements.get(e))return;class n extends HTMLElement{#e=/* @__PURE__ */ new Map;#t;constructor(){super();for(let e of t.props)if(this.#e.set(e,L()),Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}#n=/* @__PURE__ */ new Map;_get(e){return this.#n.get(e)}_set(e,t){this.#n.set(e,t),this.#e.get(e)[1](()=>t)}connectedCallback(){if(this.#t)return;let e=this.shadowRoot??this.attachShadow({mode:`open`});e.adoptedStyleSheets=t.styles();let n={};for(let[e,[t]]of this.#e)n[e]=t;this.#t=fu(()=>t.view(n,this),e)}disconnectedCallback(){queueMicrotask(()=>{!this.isConnected&&this.#t&&(this.#t(),this.#t=void 0,this.shadowRoot?.replaceChildren())})}}for(let e of t.props)Object.defineProperty(n.prototype,e,{get(){return this._get(e)},set(t){this._set(e,t)},configurable:!0});customElements.define(e,n)}function Zu(e,t){return Ya(()=>{let n=e();return n?t(n):void 0})}var Qu=/* @__PURE__ */ Y(`<div class=tabs>`),$u=/* @__PURE__ */ Y(`<p class=note>`),ed=/* @__PURE__ */ Y(`<div class=grid inert>`),td=/* @__PURE__ */ Y(`<button>`),nd=/* @__PURE__ */ new Set([`alarm-panel`,`button`,`calendar`,`entities`,`entity`,`gauge`,`glance`,`heading`,`history-graph`,`humidifier`,`light`,`logbook`,`sensor`,`statistic`,`statistics-graph`,`thermostat`,`tile`,`todo-list`]),rd=/* @__PURE__ */ new Set([`horizontal-stack`,`vertical-stack`,`grid`]),id=/* @__PURE__ */ new Set([`section`,`divider`]),ad=/\\|\/\/|url\s*\(|\{\{|\{%|\[\[\[|<|custom:|javascript:|data:/i,od=/* @__PURE__ */ new Set([`card_mod`,`style`,`image`,`image_entity`,`camera_image`]);function sd(e,t=0){return t>20?!1:typeof e==`string`?!ad.test(e):Array.isArray(e)?e.every(e=>sd(e,t+1)):e&&typeof e==`object`?Object.entries(e).every(([e,n])=>!od.has(e)&&!ad.test(e)&&sd(n,t+1)):!0}function cd(e){let t=[...e.cards??[]];for(let n of e.sections??[])t.push(...n.cards??[]);return t.filter(e=>e&&typeof e==`object`)}async function ld(){if(!window.loadCardHelpers)try{let e=document.createElement(`partial-panel-resolver`);e.hass={panels:[{url_path:`llm-preview`,component_name:`lovelace`}]},e._updateRoutes?.(),await e.routerOptions?.routes?.[`llm-preview`]?.load?.()}catch{}for(let e=0;e<50&&!window.loadCardHelpers;e++)await new Promise(e=>setTimeout(e,100));return window.loadCardHelpers?.()}function ud(e,t=0){if(!e||typeof e!=`object`||t>5)return!1;let n=e.type;if(typeof n!=`string`)return!1;if(rd.has(n)){let{cards:n,...r}=e;return Array.isArray(n)&&n.every(e=>ud(e,t+1))&&sd(r)}if(!nd.has(n))return!1;let r=e.entities;return Array.isArray(r)&&!r.every(e=>typeof e==`string`||e&&typeof e==`object`&&(!(`type`in e)||id.has(String(e.type))))?!1:sd(e)}var dd=Yu(`
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
  `);function fd(e){let[t,n]=L(0),[r,i]=L({cards:[],skipped:0,error:``}),a=()=>{let t=e.config();return Array.isArray(t?.views)?t.views:[]},o=0;async function s(t){let n={cards:[],skipped:0,error:``};if(!t)return n;try{let r=await ld();if(!r)throw Error(`card helpers aren't available`);for(let i of cd(t).slice(0,40)){if(!ud(i)){n.skipped++;continue}let t=r.createCardElement(i);t.hass=e.hass(),n.cards.push(t)}}catch(e){n.error=z(`preview_unavailable`,{error:e.message})}return n}return Qa(()=>a()[t()],e=>{let t=++o;s(e).then(e=>t===o&&i(e))}),Qa(()=>[e.hass(),r().cards],([e,t])=>{for(let n of t)n.hass=e}),J(()=>J(()=>!!a().length)()?[R(to,{get when(){return a().length>1},get children(){var e=Qu();return Z(e,R(eo,{get each(){return a()},children:(e,r)=>(()=>{var i=td();return i._$$click=()=>n(r()),Z(i,()=>e.title||e.path||z(`preview_view`,{n:r()+1})),q(()=>ju(r()===t()?`on`:``),(e,t)=>{ku(i,e,t)}),i})()})),e}}),R(to,{get when(){return r().error},get children(){var e=$u();return Z(e,()=>r().error),e}}),(()=>{var e=ed();return Z(e,()=>r().cards),e})(),R(to,{get when(){return r().skipped},get children(){var e=$u();return Z(e,(()=>{var e=J(()=>r().skipped>1);return()=>e()?z(`preview_skipped_n`,{count:r().skipped}):z(`preview_skipped_one`)})()),e}})]:(()=>{var e=$u();return Z(e,()=>z(`preview_no_views`)),e})())}Xu(`llm-dashboard-preview`,{props:[`hass`,`config`],styles:()=>[dd],view:e=>R(fd,e)}),mu([`click`]);var pd=s`
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
`,md=/* @__PURE__ */ Y(`<span class=tag>`),hd=/* @__PURE__ */ Y(`<div class=row><span class=t></span><span class=c></span><span class=u></span><div class=w><b class=what></b><code></code></div><div class=o><!><span></span><!><!><!>`),gd=/* @__PURE__ */ Y(`<button class=link>`),_d=/* @__PURE__ */ Y(`<button class="ghost small">`),vd=/* @__PURE__ */ Y(`<div class=bar><input type=date><input type=date><select><option value></option></select><select><option value></option></select><input type=search>`),yd=/* @__PURE__ */ Y(`<option>`),bd=/* @__PURE__ */ Y(`<div class=empty>`),xd=/* @__PURE__ */ Y(`<div class=more><button class=small>`),Sd={asked:`changes_asked`,auto:`changes_auto`,rule:`changes_rule`,reviewer:`reviewer_approved`,denied:`denied`},Cd=e=>e.message??String(e),wd=Yu(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
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
.more{padding:12px 20px}`);function Td(e,t){let n=Zu(e.hass,e=>e.connection),r=t=>Zu(e.hass,e=>t(e)),i=r(e=>e.locale?.language),a=r(e=>e.locale?.time_format),o=r(e=>e.locale?.time_zone===`server`?e.config?.time_zone:void 0),[s,c]=L({changes:[],cursor:null,chats:[],users:[],error:``,loading:!1}),l={from:``,to:``,chat:``,user:``,text:``},u=0,d;async function f(e=!1){let t=n();if(!t)return;let r=s(),i=++u;c(e=>({...e,loading:!0}));let a;try{let n=await t.sendMessagePromise({type:`llm_agent/changes`,since:l.from?Ed(l.from,0,o()):null,until:l.to?Ed(l.to,1,o())-.001:null,conversation_id:l.chat||null,user_id:l.user||null,text:l.text,cursor:e?r.cursor:null});a={...n,changes:e?[...r.changes,...n.changes]:n.changes,error:``}}catch(e){a={error:Cd(e)}}i===u&&c(e=>({...e,...a,loading:!1}))}let p=!1;Qa(()=>n()!==void 0,e=>{e&&!p&&(p=!0,f())});let m=e=>t=>{l={...l,[e]:t.target.value},clearTimeout(d),d=window.setTimeout(()=>void f(),e===`text`?300:0)};async function h(e){if(confirm(z(`confirm_undo`,{name:e.detail||e.tool}))){try{await n().sendMessagePromise({type:`llm_agent/undo`,snapshot_id:e.snapshot_id,...e.conversation_id?{conversation_id:e.conversation_id}:{}})}catch(e){c(t=>({...t,error:Cd(e)}));return}await f()}}let g=e=>{let t=a();return new Intl.DateTimeFormat(i(),{dateStyle:`medium`,timeStyle:`short`,timeZone:o(),...t===`12`||t===`24`?{hour12:t===`12`}:{}}).format(e*1e3)},_=e=>(()=>{var t=md();return Z(t,()=>e.text),q(()=>({e:!!e.bad,t:e.title??``}),({e,t:n},r)=>{e!==r?.e&&t.classList.toggle(`bad`,e),n!==r?.t&&X(t,`title`,n)}),t})(),v=e=>{let n=e.r,r=`tool_${n.tool}`;var i=hd(),a=i.firstChild,o=a.nextSibling,s=o.nextSibling,c=s.nextSibling,l=c.firstChild,u=l.nextSibling,d=c.nextSibling,f=d.firstChild,p=f.nextSibling,m=p.nextSibling,v=m.nextSibling,y=v.nextSibling;return Z(a,()=>g(n.time)),Z(o,(()=>{var e=J(()=>!!n.conversation_id);return()=>e()?(()=>{var e=gd();return e._$$click=()=>t.dispatchEvent(new CustomEvent(`open-chat`,{detail:n.conversation_id})),Z(e,()=>n.chat_title??z(`changes_deleted_chat`)),e})():void 0})()),Z(s,()=>n.user_name??(n.user_id?n.user_id.slice(0,8):z(`changes_no_user`))),Z(l,(()=>{var e=J(()=>!!lo(r));return()=>e()?z(r):n.tool.replace(/_/g,` `)})()),Z(u,()=>n.args),Z(d,R(to,{get when(){return n.approval},children:e=>R(_,{get text(){return z(Sd[e()])},get bad(){return e()===`denied`}})}),f),Z(d,(()=>{var e=J(()=>n.approval!==`denied`);return()=>e()?R(_,{get text(){return J(()=>!!n.ok)()?z(`done`):z(`failed`)},get bad(){return!n.ok}}):void 0})(),p),Z(p,()=>n.detail),Z(d,(()=>{var e=J(()=>n.undo===`undone`);return()=>e()?R(_,{get text(){return z(`undone`)}}):void 0})(),m),Z(d,(()=>{var e=J(()=>n.undo===`gone`);return()=>e()?R(_,{get text(){return z(`changes_undo_gone`)},get title(){return z(`changes_undo_gone_title`)}}):void 0})(),v),Z(d,(()=>{var e=J(()=>n.undo===`available`);return()=>e()?(()=>{var e=_d();return e._$$click=()=>void h(n),Z(e,()=>z(`undo`)),q(()=>z(`undo_title`),t=>{X(e,`title`,t)}),e})():void 0})(),y),q(()=>n.args,e=>{X(u,`title`,e)}),i};return[(()=>{var e=vd(),t=e.firstChild,n=t.nextSibling,r=n.nextSibling,i=r.firstChild,a=r.nextSibling,o=a.firstChild,c=a.nextSibling;return Au(t,`change`,m(`from`)),Au(n,`change`,m(`to`)),Au(r,`change`,m(`chat`)),Z(i,()=>z(`changes_all_chats`)),Z(r,R(eo,{get each(){return s().chats},keyed:e=>e.id,children:e=>(()=>{var t=yd();return Z(t,()=>e().title||z(`new_chat`)),q(()=>e().id,e=>{t.value=e}),t})()}),null),Au(a,`change`,m(`user`)),Z(o,()=>z(`changes_everyone`)),Z(a,R(eo,{get each(){return s().users},keyed:e=>e.id,children:e=>(()=>{var t=yd();return Z(t,()=>e().name),q(()=>e().id,e=>{t.value=e}),t})()}),null),Au(c,`input`,m(`text`),!0),q(()=>({e:z(`changes_from`),t:z(`changes_from`),a:z(`changes_to`),o:z(`changes_to`),i:z(`conversation`),n:z(`changes_user`),s:z(`changes_search`),h:z(`changes_search`)}),({e,t:i,a:o,o:s,i:l,n:u,s:d,h:f},p)=>{e!==p?.e&&X(t,`aria-label`,e),i!==p?.t&&X(t,`title`,i),o!==p?.a&&X(n,`aria-label`,o),s!==p?.o&&X(n,`title`,s),l!==p?.i&&X(r,`aria-label`,l),u!==p?.n&&X(a,`aria-label`,u),d!==p?.s&&X(c,`placeholder`,d),f!==p?.h&&X(c,`aria-label`,f)}),e})(),J(()=>J(()=>!!s().error)()?(()=>{var e=bd();return Z(e,()=>z(`changes_error`,{error:s().error})),e})():R(to,{get when(){return J(()=>!s().loading)()&&!s().changes.length},get children(){var e=bd();return Z(e,()=>z(`changes_none`)),e}})),R(eo,{get each(){return s().changes},children:e=>R(v,{r:e})}),J(()=>J(()=>!!s().cursor)()?(()=>{var e=xd(),t=e.firstChild;return t._$$click=()=>void f(!0),Z(t,()=>z(`changes_more`)),q(()=>s().loading,e=>{X(t,`disabled`,e)}),e})():void 0)]}function Ed(e,t,n){let[r,i,a]=e.split(`-`).map(Number);if(!n)return new Date(r,i-1,a+t).getTime()/1e3;let o=Date.UTC(r,i-1,a+t);return(o-Dd(o-Dd(o,n),n))/1e3}function Dd(e,t){let n={};for(let r of new Intl.DateTimeFormat(`en-US`,{timeZone:t,hourCycle:`h23`,year:`numeric`,month:`numeric`,day:`numeric`,hour:`numeric`,minute:`numeric`,second:`numeric`}).formatToParts(e))n[r.type]=+r.value;return Date.UTC(n.year,n.month-1,n.day,n.hour,n.minute,n.second)-Math.floor(e/1e3)*1e3}Xu(`llm-agent-changes`,{props:[`hass`],styles:()=>[pd.styleSheet,wd],view:(e,t)=>Td(e,t)}),mu([`click`,`input`]);var Od=/* @__PURE__ */ Y(`<button class=small role=tab>`),kd=/* @__PURE__ */ Y(`<div class="row ed"><button class="small primary"></button><button class="small ghost">`),Ad=/* @__PURE__ */ Y(`<input maxlength=80>`),jd=/* @__PURE__ */ Y(`<input maxlength=200>`),Md=/* @__PURE__ */ Y(`<textarea rows=14 maxlength=20000>`),Nd=/* @__PURE__ */ Y(`<textarea rows=2>`),Pd=/* @__PURE__ */ Y(`<div class=row><input type=checkbox><div> <!>`),Fd=/* @__PURE__ */ Y(`<b>`),Id=/* @__PURE__ */ Y(`<span class=tag>`),Ld=/* @__PURE__ */ Y(`<span class=err>`),Rd=/* @__PURE__ */ Y(`<button class="small danger">`),zd=/* @__PURE__ */ Y(`<button class="small ghost">`),Bd=/* @__PURE__ */ Y(`<div class=bar role=tablist><!><span></span><button class="small primary">`),Vd=/* @__PURE__ */ Y(`<p>`),Hd=/* @__PURE__ */ Y(`<p class=err>`),Ud=/* @__PURE__ */ Y(`<div class=empty>`),Wd=Yu(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none}
.bar,.row,p{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 20px;margin:0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}
.bar button.small[aria-selected=true]:not(.ghost):not(.primary):not(.danger){background:var(--accent);color:var(--on-accent)}
.bar span{flex:1;text-align:end}
.row>div{flex:1;min-width:12rem;color:var(--text);overflow-wrap:anywhere}
.off>div{opacity:.55}
.ed>*{flex:1 1 100%;box-sizing:border-box;font:inherit;font-size:13px}
.ed textarea{border:1px solid var(--line);border-radius:8px;padding:6px 8px;background:var(--surface);resize:vertical;max-height:none}
.ed button{flex:none}
.err{color:var(--danger)}`);function Gd(e){let t=Zu(e.hass,e=>e.connection),[n,r]=L(),[i,a]=L(!1),[o,s]=L(),[c,l]=L(``),[u,d]=L(``),f=()=>{s(void 0),l(``)};async function p(e,n={}){let i=t(),a=(e,t={})=>i.sendMessagePromise({type:`llm_agent/home_notes`+e,...t});try{r(await a(e,n)),f(),d(``)}catch(e){let t=e;d(t.message??String(e)),t.code===`changed`&&(r(await a(``)),f())}}let m=!1;Qa(()=>t()!==void 0,e=>{e&&!m&&(m=!0,p(``))});let h=(e,t,n={})=>p(e,{kind:i()?`knowledge`:`note`,...t.id?{item_id:t.id,base:t.updated}:{},...n}),g=()=>(i()?n()?.knowledge:n()?.notes)??[],_=e=>(()=>{var t=Od();return t._$$click=()=>{a(e.on),f(),d(``)},Z(t,()=>z(e.label)),q(()=>e.on===i()?`true`:`false`,e=>{X(t,`aria-selected`,e)}),t})(),v=e=>{let t=t=>n=>Object.assign(e.e,{[t]:n.target.value}),r=()=>h(`/save`,e.e,i()?{title:e.e.title,summary:e.e.summary,body:e.e.body}:{text:e.e.text});var a=kd(),o=a.firstChild,c=o.nextSibling;return Z(a,(()=>{var r=J(()=>!!i());return()=>r()?[(()=>{var n=Ad();return Au(n,`input`,t(`title`),!0),q(()=>({e:z(`knowledge_title`),t:z(`knowledge_title`),a:e.e.title??``,o:$l()}),({e,t,a:r,o:i},a)=>{e!==a?.e&&X(n,`aria-label`,e),t!==a?.t&&X(n,`placeholder`,t),(r!==a?.a||!i)&&(n.value=r??``)}),n})(),(()=>{var n=jd();return Au(n,`input`,t(`summary`),!0),q(()=>({e:z(`knowledge_summary`),t:z(`knowledge_summary`),a:e.e.summary??``,o:$l()}),({e,t,a:r,o:i},a)=>{e!==a?.e&&X(n,`aria-label`,e),t!==a?.t&&X(n,`placeholder`,t),(r!==a?.a||!i)&&(n.value=r??``)}),n})(),(()=>{var n=Md();return Au(n,`input`,t(`body`),!0),q(()=>({e:z(`knowledge_body`),t:z(`knowledge_body`),a:e.e.body??``,o:$l()}),({e,t,a:r,o:i},a)=>{e!==a?.e&&X(n,`aria-label`,e),t!==a?.t&&X(n,`placeholder`,t),(r!==a?.a||!i)&&(n.value=r??``)}),n})()]:(()=>{var r=Nd();return Au(r,`input`,t(`text`),!0),q(()=>({e:z(`home_notes`),t:z(`notes_placeholder`),a:n()?.note_max??300,o:e.e.text??``,i:$l()}),({e,t,a:n,o:i,i:a},o)=>{e!==o?.e&&X(r,`aria-label`,e),t!==o?.t&&X(r,`placeholder`,t),n!==o?.a&&X(r,`maxlength`,n),(i!==o?.o||!a)&&(r.value=i??``)}),r})()})(),o),o._$$click=r,Z(o,()=>z(`save`)),c._$$click=()=>s(void 0),Z(c,()=>z(`cancel`)),a},y=e=>(()=>{var t=Pd(),n=t.firstChild,r=n.nextSibling,a=r.firstChild,o=a.nextSibling;return n.addEventListener(`change`,()=>h(`/save`,e.i,{enabled:!e.i.enabled})),Z(r,(()=>{var t=J(()=>!!i());return()=>t()?[(()=>{var t=Fd();return Z(t,()=>e.i.title),t})(),` `,J(()=>e.i.summary)]:e.i.text})(),a),Z(r,(()=>{var t=J(()=>e.i.added_by===`agent`);return()=>t()?(()=>{var e=Id();return Z(e,()=>z(`note_from_ai`)),e})():void 0})(),o),Z(t,(()=>{var t=J(()=>c()===e.i.id);return()=>t()?[(()=>{var e=Ld();return Z(e,()=>z(`delete_confirm`)),e})(),(()=>{var t=Rd();return t._$$click=()=>h(`/delete`,e.i),Z(t,()=>z(`delete`)),t})(),(()=>{var e=zd();return e._$$click=()=>l(``),Z(e,()=>z(`cancel`)),e})()]:[(()=>{var t=zd();return t._$$click=()=>{s({...e.i}),l(``),d(``)},Z(t,()=>z(`edit`)),t})(),(()=>{var t=zd();return t._$$click=()=>l(e.i.id),Z(t,()=>z(`delete`)),t})()]})(),null),q(()=>({e:!e.i.enabled,t:z(`note_enabled`),a:z(`note_enabled`),o:!!e.i.enabled,i:$l()}),({e,t:r,a:i,o:a,i:o},s)=>{e!==s?.e&&t.classList.toggle(`off`,e),r!==s?.t&&X(n,`aria-label`,r),i!==s?.a&&X(n,`title`,i),(a!==s?.o||!o)&&(n.checked=a)}),t})();return[(()=>{var e=Bd(),t=e.firstChild,r=t.nextSibling,a=r.nextSibling;return Z(e,R(_,{on:!1,label:`notes_tab`}),t),Z(e,R(_,{on:!0,label:`knowledge_tab`}),r),Z(r,(()=>{var e=J(()=>!(!i()&&n()));return()=>e()?``:z(`characters_left`,{count:n().room})})()),a._$$click=()=>s({id:``,text:``,title:``,summary:``,body:``}),Z(a,()=>z(`add`)),e})(),(()=>{var e=Vd();return Z(e,()=>z(i()?`knowledge_hint`:`notes_hint`)),e})(),J(()=>J(()=>!!u())()?(()=>{var e=Hd();return Z(e,u),e})():void 0),J(()=>J(()=>o()?.id===``)()?R(v,{get e(){return o()}}):void 0),J(()=>J(()=>!(!n()||g().length||o()))()?(()=>{var e=Ud();return Z(e,()=>z(`notes_none`)),e})():void 0),R(eo,{get each(){return g()},keyed:e=>e.id,children:e=>J(()=>J(()=>o()?.id===e().id)()?R(v,{get e(){return o()}}):R(y,{get i(){return e()}}))})]}Xu(`llm-agent-notes`,{props:[`hass`],styles:()=>[pd.styleSheet,Wd],view:e=>R(Gd,e)}),mu([`click`,`input`]);var Kd=/* @__PURE__ */ Y(`<button class=small role=tab>`),qd=/* @__PURE__ */ Y(`<div><b>`),Jd=/* @__PURE__ */ Y(`<div class=ch>: <svg preserveAspectRatio=none role=img></svg><div class=ax><span></span><span>`),Yd=/* @__PURE__ */ Y(`<svg><g><title>: <!></title><rect class=h y=0 width=10 height=100></rect><rect class=b width=7></svg>`,2),Xd=/* @__PURE__ */ Y(`<div class=tb><table><thead><tr><th></th><th></th><th></th><th></th><th></th><th></th></tr></thead><tbody>`),Zd=/* @__PURE__ */ Y(`<tr class=earlier><td><small></small></td><td></td><td></td><td></td><td></td><td>`),Qd=/* @__PURE__ */ Y(`<tr><td><small><!><!></small></td><td></td><td></td><td></td><td></td><td><!><!>`),$d=/* @__PURE__ */ Y(`<small>`),ef=/* @__PURE__ */ Y(`<div class=tot><!><!><!><!>`),tf=/* @__PURE__ */ Y(`<p> <!> <!>`),nf=/* @__PURE__ */ Y(`<p>`),rf=/* @__PURE__ */ Y(`<p class=bal><!><!>`),af=/* @__PURE__ */ Y(`<a target=_blank rel=noreferrer>`),of=/* @__PURE__ */ Y(`<div class=bar role=tablist><!><!><!>`),sf=/* @__PURE__ */ Y(`<p class=err>`),cf=e=>e.message??String(e),lf=Yu(`:host{flex:1;min-height:0;height:auto;overflow-y:auto;overscroll-behavior:contain;background:none;container-type:inline-size}
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
.err{color:var(--danger)}`);function uf(e){let t=Zu(e.hass,e=>e.connection),n=Zu(e.hass,e=>e.locale?.language),[r,i]=L(),[a,o]=L(),[s,c]=L(30),[l,u]=L(``),d=0;async function f(e){let n=t();if(!n)return;let r=++d;c(e);try{let t=await n.sendMessagePromise({type:`llm_agent/usage`,days:e});r===d&&(i(t),u(``))}catch(e){r===d&&u(cf(e))}}let p=!1;Qa(()=>t(),e=>{e&&!p&&(p=!0,f(30),e.sendMessagePromise({type:`llm_agent/balance`}).then(e=>o(e.providers),()=>void 0))});let m=e=>new Intl.NumberFormat(n(),{style:`currency`,currency:`USD`,minimumFractionDigits:2,maximumFractionDigits:e&&Math.abs(e)<1?4:2}).format(e),h=e=>new Intl.NumberFormat(n(),{notation:`compact`}).format(e),g=e=>{let[t,r,i]=e.split(`-`).map(Number);return new Intl.DateTimeFormat(n(),{dateStyle:`medium`,timeZone:`UTC`}).format(Date.UTC(t,r-1,i))},_=e=>(()=>{var t=Kd();return t._$$click=()=>f(e.n),Z(t,()=>z(`usage_days`,{n:e.n})),q(()=>s()===e.n?`true`:`false`,e=>{X(t,`aria-selected`,e)}),t})(),v=e=>(()=>{var t=qd(),n=t.firstChild;return Z(t,()=>e.label,n),Z(n,()=>m(e.v)),q(()=>e.hint??``,e=>{X(t,`title`,e)}),t})(),y=e=>{let t=()=>Math.max(...e.series.map(e=>e.cost),0),n=()=>e.series.length;var r=Jd(),i=r.firstChild,a=i.nextSibling,o=a.nextSibling.firstChild,s=o.nextSibling;return Z(r,()=>z(`usage_chart`),i),Z(r,()=>m(t()),a),Z(a,R(eo,{get each(){return e.series},children:(e,n)=>{let r=()=>t()>0&&e.cost>0?Math.max(e.cost/t()*100,1.5):0;var i=Yd(),a=i.firstChild,o=a.firstChild,s=o.nextSibling,c=a.nextSibling,l=c.nextSibling;return Z(a,()=>g(e.day),o),Z(a,()=>m(e.cost),s),q(()=>({e:n()*10,t:n()*10+1.5,a:100-r(),o:r()}),({e,t,a:n,o:r},i)=>{e!==i?.e&&X(c,`x`,e),t!==i?.t&&X(l,`x`,t),n!==i?.a&&X(l,`y`,n),r!==i?.o&&X(l,`height`,r)}),i}})),Z(o,()=>g(e.series[0].day)),Z(s,()=>g(e.series[n()-1].day)),q(()=>({e:z(`usage_chart`),t:`0 0 ${n()*10} 100`,a:z(`usage_chart`)}),({e,t,a:n},i)=>{e!==i?.e&&X(r,`aria-label`,e),t!==i?.t&&X(a,`viewBox`,t),n!==i?.a&&X(a,`aria-label`,n)}),r},b=e=>{let t=e=>e.kind===`task`?z(`usage_kind_task`):e.kind===`review`?z(`usage_kind_review`):``;var n=Xd(),r=n.firstChild.firstChild,i=r.firstChild.firstChild,a=i.nextSibling,o=a.nextSibling,s=o.nextSibling,c=s.nextSibling,l=c.nextSibling,u=r.nextSibling;return Z(i,()=>z(`usage_model`)),Z(a,()=>z(`usage_in`)),Z(o,()=>z(`usage_out`)),Z(s,()=>z(`usage_col_cached`)),Z(c,()=>z(`usage_calls`)),Z(l,()=>z(`usage_cost`)),Z(u,R(eo,{get each(){return e.rows},children:e=>e.kind===`earlier`?(()=>{var t=Zd(),n=t.firstChild,r=n.firstChild,i=n.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;return Z(n,()=>z(`usage_earlier`),r),Z(r,()=>z(`usage_earlier_hint`)),Z(i,()=>m(e.cost)),t})():(()=>{var n=Qd(),r=n.firstChild,i=r.firstChild,a=i.firstChild,o=a.nextSibling,s=r.nextSibling,c=s.nextSibling,l=c.nextSibling,u=l.nextSibling,d=u.nextSibling,f=d.firstChild,p=f.nextSibling;return Z(r,()=>e.model,i),Z(i,()=>e.provider_name??e.provider_type,a),Z(i,(()=>{var n=J(()=>!!t(e));return()=>n()?`, ${t(e)}`:``})(),o),Z(s,()=>h(e.input)),Z(c,()=>h(e.output)),Z(l,()=>h(e.cache_read+e.cache_write)),Z(u,()=>e.calls),Z(d,(()=>{var t=J(()=>e.unpriced===e.calls);return()=>t()?z(`usage_no_price`):m(e.cost)})(),f),Z(d,(()=>{var t=J(()=>!!(e.unpriced&&e.unpriced<e.calls));return()=>t()?(()=>{var t=$d();return Z(t,()=>z(`usage_unpriced`,{n:e.unpriced})),t})():void 0})(),p),q(()=>({e:ju(e.kind),t:`${e.cache_read} / ${e.cache_write}`}),({e,t},r)=>{ku(n,e,r?.e),t!==r?.t&&X(l,`title`,t)}),n})()})),n},x=e=>{let t=e.u.all_time,n=e.u.cap>0?Math.round(e.u.cap_used/e.u.cap*100):0;return[(()=>{var n=ef(),r=n.firstChild,i=r.nextSibling,a=i.nextSibling,o=a.nextSibling;return Z(n,R(v,{get label(){return z(`usage_today`)},get v(){return e.u.totals.today}}),r),Z(n,R(v,{get label(){return z(`usage_week`)},get v(){return e.u.totals.week}}),i),Z(n,R(v,{get label(){return z(`usage_month`)},get v(){return e.u.totals.month}}),a),Z(n,R(v,{get label(){return z(`usage_all_time`)},get v(){return t.total},get hint(){return z(`usage_all_time_hint`,{count:t.chat_count})}}),o),n})(),J(()=>J(()=>e.u.cap>0)()?(()=>{var t=nf();return Z(t,()=>z(`usage_cap`,{cap:m(e.u.cap),used:m(e.u.cap_used),pct:n})),t})():void 0),R(y,{get series(){return e.u.series}}),(()=>{var n=tf(),r=n.firstChild,i=r.nextSibling,a=i.nextSibling.nextSibling;return Z(n,(()=>{var t=J(()=>!!e.u.since);return()=>t()?J(()=>!!e.u.filled_from)()?z(`usage_since_filled`,{date:g(e.u.since)}):z(`usage_since`,{date:g(e.u.since)}):z(`usage_none`)})(),r),Z(n,()=>z(`usage_all_time_hint`,{count:t.chat_count}),i),Z(n,()=>z(`usage_estimate`),a),n})(),J(()=>J(()=>!!e.u.breakdown.length)()?R(b,{get rows(){return e.u.breakdown}}):void 0)]},ee=e=>{let t=()=>{let t=e.x;return t.status===`ok`?t.remaining!=null&&t.limit!=null?z(`balance_left`,{name:t.name,left:m(t.remaining),limit:m(t.limit)}):z(`balance_no_limit`,{name:t.name,month:m(t.usage_monthly??0)}):t.status===`error`?z(`balance_error`,{name:t.name,error:t.error??``}):z(t.status===`local`?`balance_local`:`balance_none`,{name:t.name})};var n=rf(),r=n.firstChild,i=r.nextSibling;return Z(n,t,r),Z(n,(()=>{var t=J(()=>!!e.x.billing_url);return()=>t()?[` `,(()=>{var t=af(),n=It();return Z(t,()=>z(`billing_page`)),q(()=>e.x.billing_url,e=>{X(t,`href`,e),Ou(t,n)}),t})()]:void 0})(),i),n};return[(()=>{var e=of(),t=e.firstChild,n=t.nextSibling,r=n.nextSibling;return Z(e,R(_,{n:7}),t),Z(e,R(_,{n:30}),n),Z(e,R(_,{n:90}),r),e})(),J(()=>J(()=>!!l())()?(()=>{var e=sf();return Z(e,()=>z(`usage_error`,{error:l()})),e})():void 0),R(to,{get when(){return r()},keyed:!0,children:e=>R(x,{u:e})}),R(eo,{get each(){return a()??[]},children:e=>R(ee,{x:e})})]}Xu(`llm-agent-usage`,{props:[`hass`],styles:()=>[pd.styleSheet,lf],view:e=>R(uf,e)}),mu([`click`]);var df=/* @__PURE__ */ Y(`<button class=small>`),ff=/* @__PURE__ */ Y(`<button class="small ghost">`),pf=/* @__PURE__ */ Y(`<label><input type=checkbox>`),mf=/* @__PURE__ */ Y(`<span class=u><input type=number>`),hf=/* @__PURE__ */ Y(`<span>`),gf=/* @__PURE__ */ Y(`<fieldset class=r>`),_f=/* @__PURE__ */ Y(`<input>`),vf=/* @__PURE__ */ Y(`<datalist>`),yf=/* @__PURE__ */ Y(`<select><!><!>`),bf=/* @__PURE__ */ Y(`<label><input type=radio>`),xf=/* @__PURE__ */ Y(`<option>`),Sf=/* @__PURE__ */ Y(`<option selected>`),Cf=/* @__PURE__ */ Y(`<textarea class=json spellcheck=false>`),wf=/* @__PURE__ */ Y(`<textarea>`),Tf=/* @__PURE__ */ Y(`<label>`),Ef=/* @__PURE__ */ Y(`<div class=f><!><!><!>`),Df=/* @__PURE__ */ Y(`<div class=d>`),Of=/* @__PURE__ */ Y(`<div class=err>`),kf=/* @__PURE__ */ Y(`<form novalidate><!><div class=bar><button class="small ghost"type=button></button><button class="small primary"type=submit>`),Af=/* @__PURE__ */ Y(`<div class=err role=alert>`),jf=/* @__PURE__ */ Y(`<details><summary></summary><!><!>`),Mf=/* @__PURE__ */ Y(`<div class=top><button class=icon><ha-icon icon=mdi:close></ha-icon></button><b>`,1),Nf=/* @__PURE__ */ Y(`<div class=bar><!><!>`),Pf=/* @__PURE__ */ Y(`<div class=note>`),Ff=/* @__PURE__ */ Y(`<div class=note role=status>`),If=/* @__PURE__ */ Y(`<div class=bar><!><button class="small primary">`),Lf=/* @__PURE__ */ Y(`<div class=bar>`),Rf=/* @__PURE__ */ Y(`<div class=menu>`),zf=/* @__PURE__ */ Y(`<div class=body><!><!>`),Bf=/* @__PURE__ */ Y(`<button><ha-icon icon=mdi:chevron-right>`,1),Vf=`config/config_entries/options/flow`,Hf=[`text`,`number`,`boolean`,`select`,`object`],Uf=`component.llm_agent.`,Wf=`/config/integrations/integration/llm_agent`;function Gf(){history.pushState(null,``,Wf),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}var Kf=e=>e.type===`string`?`text`:Object.keys(e.selector??{})[0],qf=e=>e.selector?.[Kf(e)]??{},Jf=e=>e.every(e=>e.type===`expandable`?Jf(e.schema??[]):Hf.includes(Kf(e))&&!qf(e).multiple),Yf=e=>Object.fromEntries(e.map(e=>[e.name,e.type===`expandable`?Yf(e.schema??[]):e.description?.suggested_value??e.default])),Xf=e=>e?.body?.message??e?.message??e?.error??String(e),Zf=Yu(`:host{position:absolute;inset:0;height:auto;z-index:20;display:flex;flex-direction:column;background:var(--bg);color:var(--text)}
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
.bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}`);function Qf(e){let t=Zu(e.hass,e=>e.connection),[n,r]=L({}),i={},a=e=>{i=e,r(e)},[o,s]=L(),[c,l]=L(0),u=0,d={},f={},p={},m,h,g=0,_=Ya(()=>n().step),v=Ya(()=>!!n().busy),y=Ya(()=>!!n().saving),b=Ya(()=>n().done),x=Ya(()=>n().error??``),ee=(e,t)=>{let n=p[Uf+e]??``;return t?n.replace(/\{(\w+)\}/g,(e,n)=>t[n]??e):n},S=e=>ee(e,_()?.description_placeholders),te=e=>e?.type===`abort`&&(ee(`options.abort.${e.reason}`,e.description_placeholders)||e.reason)||``,ne=Ya(()=>{let{step:e,error:t,stuck:r,saving:i,done:a}=n();return t?`error`:e?r?`stuck`:i?`saving`:a===void 0?te(e)?`reason`:e.type===`menu`?`menu`:`form`:`done`:`loading`}),re=()=>_()?.step_id??`init`,C=()=>_()?.type!==`create_entry`&&S(`options.step.${re()}.title`)||z(`integration_settings`),ie=()=>{let e=_();return e?.type===`form`||e?.type===`menu`?S(`options.step.${re()}.description`):``},ae=()=>e.host.dispatchEvent(new CustomEvent(`close`)),oe=()=>{let t=i.step;t&&[`form`,`menu`,`progress`,`external`].includes(t.type)&&e.hass()?.callApi(`DELETE`,`${Vf}/${t.flow_id}`)?.catch(()=>void 0)};function se(e){let t=e.data_schema??[],n=![`form`,`menu`,`abort`,`create_entry`].includes(e.type)||e.type===`form`&&!Jf(t);e.type===`form`&&(d=Yf(t),f={}),s(e),a({step:e,stuck:n}),n&&oe()}async function ce(){let t=e.hass();if(t){a({busy:!0});try{let e=()=>{},n=new Promise(t=>e=t);h??=t.connection.subscribeMessage(t=>{for(let{type:e,entry:n}of t)n.domain===`llm_agent`&&(e?n.entry_id===m&&(g=n.state===`loaded`?g&&2:/error|retry|failed/.test(n.state)?3:g||1):m??=n.entry_id);e()},{type:`config_entries/subscribe`}),await h,m||await n;let r=t.locale?.language??`en`,i=await Promise.all([`options`,`selector`].map(e=>t.connection.sendMessagePromise({type:`frontend/get_translations`,language:r,category:e,integration:[`llm_agent`]})));if(p=Object.assign({},...i.map(e=>e?.resources)),!m)throw Error(z(`no_provider`));se(await t.callApi(`POST`,Vf,{handler:m,show_advanced_options:!1}))}catch(e){a({error:Xf(e)})}}}async function le(t){let n=i.step;a({...i,busy:!0}),g=0;let r;try{r=await e.hass().callApi(`POST`,`${Vf}/${n.flow_id}`,t)}catch(e){let t=e?.body?.errors;a(t?{step:{...n,errors:t},busy:!1}:{...i,busy:!1,error:Xf(e)});return}if(r.type!==`create_entry`)return se(r);a({step:r,saving:!0});for(let e=0;e<600&&g<2&&(g||e<30);e++)await new Promise(e=>setTimeout(e,100));a({step:r,done:g}),g===2&&e.host.dispatchEvent(new CustomEvent(`reloaded`,{bubbles:!0,composed:!0}))}function ue(e){e.preventDefault();let t=``,n=(e,r,i=``)=>{let a={};for(let o of e){if(o.type===`expandable`){a[o.name]=n(o.schema??[],r[o.name]??{},o.name);continue}let e=r[o.name],s=f[i+`.`+o.name];if(s!==void 0)try{e=s.trim()?JSON.parse(s):void 0}catch{t=o.name}e!=null&&e!==``&&!Number.isNaN(e)&&(a[o.name]=e)}return a},r=n(i.step?.data_schema??[],d);t?a({...i,step:{...i.step,errors:{[t]:z(`settings_bad_json`)}}}):le(r)}let de=!1;Qa(()=>t()!==void 0,e=>{e&&!de&&(de=!0,ce())}),Ji(()=>{h?.then(e=>e()).catch(()=>void 0),h=void 0,oe()});let fe=e=>e.key===`Escape`&&(e.preventDefault(),ae()),pe=()=>(()=>{var e=df();return e._$$click=Gf,Z(e,()=>z(`open_in_ha`)),e})(),me=()=>(()=>{var e=ff();return e._$$click=()=>void ce(),Z(e,()=>z(`settings_menu`)),q(()=>v(),t=>{X(e,`disabled`,t)}),e})(),he=Ya(()=>{let e=_()?.menu_options??[];return Array.isArray(e)?e.map(e=>[e,``]):Object.entries(e)}),ge=(e,t,n,r=``)=>{let i=e=>ee(e,t.description_placeholders),a=`options.step.${t.step_id}${r?`.sections.${r}`:``}`,o=i(`${a}.data.${e.name}`)||e.name,s=i(`${a}.data_description.${e.name}`),p=()=>r&&n()[r]?.[e.name]||n()[e.name],m=r?d[r]??={}:d,h=t=>{m[e.name]=t,l(++u)},g=()=>(c(),m[e.name]),_=qf(e),v=Kf(e),y=`f-${r}-${e.name}`,b=e=>e.target.value,x;if(v===`boolean`)x=(()=>{var e=pf(),t=e.firstChild;return t.addEventListener(`change`,e=>h(e.target.checked)),Z(e,o,null),q(()=>!!g(),e=>{t.checked=e}),e})();else{let t;if(v===`number`){let n=m[e.name];t=(()=>{var e=mf(),t=e.firstChild;return t._$$input=e=>h(b(e)===``?void 0:Number(b(e))),X(t,`id`,y),Z(e,(()=>{var e=J(()=>!!_.unit_of_measurement);return()=>e()?(()=>{var e=hf();return Z(e,()=>_.unit_of_measurement),e})():null})(),null),q(()=>({e:_.min,t:_.max,a:_.step??`any`,o:n==null?``:String(n),i:$l()}),({e,t:n,a:r,o:i,i:a},o)=>{e!==o?.e&&X(t,`min`,e),n!==o?.t&&X(t,`max`,n),r!==o?.a&&X(t,`step`,r),(i!==o?.o||!a)&&(t.value=i??``)}),e})()}else if(v===`select`){let n=(_.options??[]).map(e=>typeof e==`string`?{value:e,label:e}:e),r=e=>_.translation_key&&i(`selector.${_.translation_key}.options.${e.value}`)||e.label;t=_.mode===`list`&&!_.custom_value?(()=>{var e=gf();return X(e,`id`,y),X(e,`aria-label`,o),Z(e,()=>n.map(e=>(()=>{var t=bf(),n=t.firstChild;return n.addEventListener(`change`,()=>h(e.value)),X(n,`name`,y),Z(t,()=>r(e),null),q(()=>g()===e.value,e=>{n.checked=e}),t})())),e})():_.custom_value?[(()=>{var t=_f();return t._$$input=e=>h(b(e)),X(t,`id`,y),X(t,`list`,y+`l`),q(()=>m[e.name]??``,e=>{t.value=e??``}),t})(),(()=>{var e=vf();return X(e,`id`,y+`l`),Z(e,()=>n.map(e=>(()=>{var t=xf();return Z(t,()=>r(e)),q(()=>e.value,e=>{t.value=e}),t})())),e})()]:(()=>{var e=yf(),t=e.firstChild,i=t.nextSibling;return e.addEventListener(`change`,e=>h(b(e))),X(e,`id`,y),Z(e,(()=>{var e=J(()=>g()==null);return()=>e()?Sf():void 0})(),t),Z(e,()=>n.map(e=>(()=>{var t=xf();return Z(t,()=>r(e)),q(()=>({e:e.value,t:g()===e.value,a:$l()}),({e,t:n,a:r},i)=>{(e!==i?.e||!r)&&(t.value=e),(n!==i?.t||!r)&&(t.selected=n)}),t})()),i),e})()}else if(v===`object`){let n=r+`.`+e.name,i=m[e.name];f[n]??=i==null?``:JSON.stringify(i,null,2),t=(()=>{var e=Cf();return e._$$input=e=>f[n]=b(e),X(e,`id`,y),q(()=>f[n],t=>{e.value=t??``}),e})()}else t=_.multiline?(()=>{var t=wf();return t._$$input=e=>h(b(e)),X(t,`id`,y),q(()=>m[e.name]??``,e=>{t.value=e??``}),t})():(()=>{var t=_f();return t._$$input=e=>h(b(e)),X(t,`id`,y),q(()=>({e:_.type??`text`,t:_.type===`password`?`new-password`:`off`,a:m[e.name]??``,o:$l()}),({e,t:n,a:r,o:i},a)=>{e!==a?.e&&X(t,`type`,e),n!==a?.t&&X(t,`autocomplete`,n),(r!==a?.a||!i)&&Cu(t,`value`,r)}),t})();x=[(()=>{var e=Tf();return X(e,`for`,y),Z(e,o),e})(),t]}var S=Ef(),te=S.firstChild,ne=te.nextSibling,re=ne.nextSibling;return Z(S,x,te),Z(S,s?(()=>{var e=Df();return q(()=>Fl(s),t=>{e.innerHTML=t}),e})():null,ne),Z(S,(()=>{var e=J(()=>!!p());return()=>e()?(()=>{var e=Of();return Z(e,()=>i(`options.error.${p()}`)||p()),e})():void 0})(),re),S},_e=e=>{let t=()=>_()?.errors??{},n=e.st,r=e=>ee(e,n.description_placeholders);var i=kf(),a=i.firstChild,o=a.nextSibling,s=o.firstChild,c=s.nextSibling;return i.addEventListener(`submit`,ue),Z(i,(()=>{var e=J(()=>!!t().base);return()=>e()?(()=>{var e=Af();return Z(e,()=>r(`options.error.${t().base}`)||t().base),e})():void 0})(),a),Z(i,()=>(n.data_schema??[]).map(e=>{if(e.type!==`expandable`)return ge(e,n,t);let i=r(`options.step.${n.step_id}.sections.${e.name}.description`);var a=jf(),o=a.firstChild,s=o.nextSibling,c=s.nextSibling;return Z(o,()=>r(`options.step.${n.step_id}.sections.${e.name}.name`)||e.name),Z(a,i?(()=>{var e=Df();return q(()=>Fl(i),t=>{e.innerHTML=t}),e})():null,s),Z(a,()=>(e.schema??[]).map(r=>ge(r,n,t,e.name)),c),q(()=>!!e.expanded,e=>{X(a,`open`,e)}),a}),o),s._$$click=()=>(oe(),void ce()),Z(s,()=>z(`settings_menu`)),Z(c,()=>z(`settings_submit`)),q(()=>({e:v(),t:v()}),({e,t},n)=>{e!==n?.e&&X(s,`disabled`,e),t!==n?.t&&X(c,`disabled`,t)}),i};return[(()=>{var e=Mf(),t=e.firstChild,n=t.firstChild,r=t.nextSibling;return e._$$keydown=fe,t._$$click=ae,n._$owner=It(),Z(r,C),q(()=>({e:z(`close`),t:z(`close`)}),({e,t:n},r)=>{e!==r?.e&&X(t,`title`,e),n!==r?.t&&X(t,`aria-label`,n)}),e})(),(()=>{var e=zf(),t=e.firstChild,n=t.nextSibling;return e._$$keydown=fe,Z(e,(()=>{var e=J(()=>!!ie());return()=>e()?(()=>{var e=Df();return q(()=>Fl(ie()),t=>{e.innerHTML=t}),e})():void 0})(),t),Z(e,R(no,{get children(){return[R(ro,{get when(){return ne()===`error`},get children(){return[(()=>{var e=Af();return Z(e,()=>z(`settings_error`,{error:x()})),e})(),(()=>{var e=Nf(),t=e.firstChild,n=t.nextSibling;return Z(e,R(me,{}),t),Z(e,R(pe,{}),n),e})()]}}),R(ro,{get when(){return ne()===`loading`},get children(){var e=Pf();return Z(e,()=>z(`settings_loading`)),e}}),R(ro,{get when(){return ne()===`stuck`},get children(){return[(()=>{var e=Pf();return Z(e,()=>z(`settings_unsupported`)),e})(),(()=>{var e=Nf(),t=e.firstChild,n=t.nextSibling;return Z(e,R(me,{}),t),Z(e,R(pe,{}),n),e})()]}}),R(ro,{get when(){return ne()===`saving`},get children(){var e=Ff();return Z(e,()=>z(`settings_reloading`)),e}}),R(ro,{get when(){return ne()===`done`},get children(){return[(()=>{var e=Ff();return Z(e,()=>z(b()===2?`settings_reloaded`:b()?`settings_reload_failed`:`settings_saved`)),e})(),(()=>{var e=If(),t=e.firstChild,n=t.nextSibling;return Z(e,(()=>{var e=J(()=>b()===1||b()===3);return()=>e()?R(pe,{}):void 0})(),t),Z(e,R(me,{}),n),n._$$click=ae,Z(n,()=>z(`settings_back`)),e})()]}}),R(ro,{get when(){return ne()===`reason`},get children(){return[(()=>{var e=Pf();return Z(e,()=>te(_())),e})(),(()=>{var e=Lf();return Z(e,R(me,{})),e})()]}}),R(ro,{get when(){return ne()===`menu`},get children(){var e=Rf();return Z(e,R(eo,{get each(){return he()},children:e=>(()=>{var t=Bf(),n=t.firstChild;return t._$$click=()=>void le({next_step_id:e[0]}),Z(t,()=>S(`options.step.${_()?.step_id}.menu_options.${e[0]}`)||e[1]||e[0],n),n._$owner=It(),q(()=>v(),e=>{X(t,`disabled`,e)}),t})()})),e}}),R(ro,{get when(){return ne()===`form`},get children(){return R(to,{get when(){return o()},keyed:!0,children:e=>R(_e,{st:e})})}})]}}),n),q(()=>v()||y()?`true`:`false`,t=>{X(e,`aria-busy`,t)}),e})()]}Xu(`llm-agent-settings`,{props:[`hass`],styles:()=>[pd.styleSheet,Zf],view:(e,t)=>R(Qf,Ga(e,{host:t}))}),mu([`click`,`input`,`keydown`]);var $f=8192,ep=15360,tp=3e3,np=1e3,rp=2e3,ip=80,ap=40,op=40,sp=30,cp=300,lp=`(max-width: 870px)`,up=/* @__PURE__ */ new Set([`entity_picture`,`access_token`]),dp=/* @__PURE__ */ new Set([`SCRIPT`,`STYLE`,`TEMPLATE`,`NOSCRIPT`,`INPUT`,`TEXTAREA`,`SELECT`,`OPTION`,`SVG`,`HA-ICON`,`HA-SVG-ICON`,`HA-PASSWORD-FIELD`]);async function fp(e){Bp();let t=e,n=location.pathname+location.search,r;try{r=await mp(t)}catch{r=hp()}let i=Mp();if(i&&t.states?.[i]){let e=jp(t,i);r={kind:`entity`,title:`Entity: ${e.name}`,summary:String(e.name),details:{entity:e,behind:{kind:r.kind,title:r.title,...r.details}}}}r.details.narrow=window.matchMedia?.(lp).matches??!1;let a=pp();return a&&(r.details.selection=a),Wp({path:n,...r})}function pp(){return Ip}async function mp(e){let t=location.pathname.split(`/`).filter(Boolean).map(decodeURIComponent),n=new URLSearchParams(location.search),[r=``,i=``,a=``,o=``]=t;if(r===`config`)return[`automation`,`script`,`scene`].includes(i)&&o?Cp(e,i,a,o):i===`devices`&&a===`device`&&o?wp(e,o):i===`areas`&&a===`area`&&o?Tp(e,o):i===`integrations`&&a===`integration`&&o?Ep(e,o):i===`tools`||i===`developer-tools`?Op(a):gp(t);if(r===`developer-tools`)return Op(i);if(r===`history`||r===`logbook`)return Dp(e,r,n);let s=e.panels?.[r];return s?.component_name===`lovelace`||_p.has(s?.component_name??``)?vp(e,r,i,s?.component_name===`lovelace`):hp()}function hp(){let e=Pp();return{kind:`other`,title:e,summary:e,details:{},text:Fp()}}function gp(e){let t=Pp();return{kind:`settings`,title:t,summary:t,details:{section:e.slice(1).join(`/`)||`config`},text:Fp()}}var _p=/* @__PURE__ */ new Set([`home`,`light`,`security`,`climate`,`maintenance`]);async function vp(e,t,n,r){let i=e.panels?.[t],a=i?.title&&(e.localize?.(`panel.${i.title}`)||i.title)||e.localize?.(`panel.states`)||`Overview`,o,s=!r;if(r)try{o=await e.connection.sendMessagePromise({type:`lovelace/config`,url_path:t===`lovelace`?null:t})}catch{s=!0}o?.strategy&&(s=!0);let c=s?yp()??void 0:o,l=Array.isArray(c?.views)?c.views:[],u=l.findIndex(e=>e.path!==void 0&&String(e.path)===n),d=u>=0?u:/^\d+$/.test(n)?Number(n):0,f=l[d];if(f?.strategy&&!f.cards&&!f.sections){let e=yp()?.views;Array.isArray(e)&&e[d]&&(f={...e[d],strategy:f.strategy})}let p=f?String(f.title??f.path??`View ${d+1}`):``,m={dashboard:{url_path:t===`lovelace`?null:t,title:a}};f&&(m.view={path:f.path??null,index:d,title:p}),s&&(m.generated=!0);let h=[];f?.strategy&&(m.view_generated=!0),f&&(h=xp(e,f)),(s||f?.strategy||!h.length)&&(h=[.../* @__PURE__ */ new Set([...h,...xp(e,{cards:bp()})])]),h.length?(m.entities=h.slice(0,ip).map(t=>Ap(e,t)),h.length>ip&&(m.entities_total=h.length)):s&&(m.note=`Generated dashboard; its cards could not be read, so no entities are listed.`);let g=p.toLowerCase()===a.toLowerCase(),_=p&&!g&&(r||d!==0)?`${a}, ${p}`:a;return{kind:`dashboard`,title:`Dashboard ${_}`,summary:_,details:m}}function yp(){for(let e of[`hui-root`,`ha-panel-lovelace`]){let t=Np(e)?.lovelace?.config;if(t&&typeof t==`object`)return t}return null}function bp(){let e=Np(`hui-root`);if(!e)return[];let t=[],n=[e],r=0;for(;n.length&&r++<2e4;){let e=n.shift();if(e instanceof Element&&/^HUI-.*(CARD|BADGE)$/.test(e.tagName)){let n=e,r=n.config??n._config,i=!e.hasAttribute(`hidden`)&&getComputedStyle(e).display!==`none`;if(i&&r&&typeof r==`object`&&t.push(r),!i)continue}let r=e instanceof Element?e.shadowRoot:null;r&&n.push(r);for(let t of e.children)n.push(t)}return t}function xp(e,t){let n=/* @__PURE__ */ new Set,r=t=>{typeof t==`string`&&e.states?.[t]&&n.add(t)},i=(e,t)=>{if(!(t>25||typeof e!=`object`||!e)){if(Array.isArray(e))for(let n of e)i(n,t+1);else for(let[n,a]of Object.entries(e)){if(n===`entity`||n===`entity_id`)Array.isArray(a)?a.forEach(r):r(a);else if(n===`entities`&&Array.isArray(a)){for(let e of a)typeof e==`string`?r(e):i(e,t+1);continue}i(a,t+1)}}};return i(t,0),[...n]}var Sp={automation:`ha-automation-editor`,script:`ha-script-editor`,scene:`ha-scene-editor`};function Cp(e,t,n,r){let i=Np(Sp[t]),a=i?.config??i?._config,o=r===`new`,s=o?void 0:Object.values(e.states??{}).find(e=>e.entity_id.startsWith(`${t}.`)&&(String(e.attributes.id??``)===r||e.entity_id===`${t}.${r}`)),c=String(a?.alias??s?.attributes.friendly_name??(o?`New `+t:r)),l={id:o?null:r,alias:c,new:o};s&&(l.entity_id=s.entity_id),n!==`edit`&&(l.view=n);let u=i?.dirty??i?._dirty;return typeof u==`boolean`&&(l.unsaved_changes=u),{kind:t,title:`${t[0].toUpperCase()+t.slice(1)}: ${c}`,summary:c,details:l}}function wp(e,t){let n=e.devices?.[t],r=n?.name_by_user||n?.name||t,i=Object.values(e.entities??{}).filter(e=>e.device_id===t).map(e=>e.entity_id),a={device:{id:t,name:r,manufacturer:n?.manufacturer??null,model:n?.model??null,area:n?.area_id?e.areas?.[n.area_id]?.name??n.area_id:null},entities:i.slice(0,ap).map(t=>Ap(e,t))};return i.length>ap&&(a.entities_total=i.length),{kind:`device`,title:`Device: ${r}`,summary:r,details:a}}function Tp(e,t){let n=e.areas?.[t]?.name??t,r=Object.values(e.devices??{}).filter(e=>e.area_id===t),i=new Set(r.map(e=>e.id)),a=Object.values(e.entities??{}).filter(e=>e.area_id===t||!e.area_id&&e.device_id&&i.has(e.device_id)).map(e=>e.entity_id),o={area:{id:t,name:n},devices:r.slice(0,op).map(e=>({id:e.id,name:e.name_by_user||e.name||e.id})),entities:a.slice(0,op).map(t=>Ap(e,t))};return r.length>op&&(o.devices_total=r.length),a.length>op&&(o.entities_total=a.length),{kind:`area`,title:`Area: ${n}`,summary:n,details:o}}async function Ep(e,t){let n={domain:t};try{n.entries=(await e.connection.sendMessagePromise({type:`config_entries/get`,domain:t})).map(e=>({title:e.title,state:e.state}))}catch{}return{kind:`integration`,title:`Integration: ${t}`,summary:t,details:n}}function Dp(e,t,n){let r=(n.get(`entity_id`)??``).split(`,`).filter(Boolean),i={entity_ids:r,start:n.get(`start_date`),end:n.get(`end_date`)},a=r.map(t=>String(e.states?.[t]?.attributes.friendly_name??t)),o=t===`history`?`History`:`Logbook`,s=a.length?`${o}: ${a.slice(0,3).join(`, `)}`:o;return{kind:t,title:s,summary:s,details:i}}function Op(e){let t=e||`yaml`,n={tab:t};if(t===`template`){let e=Np(`tools-template`),t=typeof e?._template==`string`?e._template:void 0;if(t===void 0)try{t=localStorage.getItem(`panel-dev-template-template`)??void 0}catch{}t!==void 0&&(n.template=t.slice(0,rp),t.length>rp&&(n.template_length=t.length))}let r=`Developer tools: ${t}`;return{kind:`developer-tools`,title:r,summary:r,details:n}}function kp(e,t){let n=e.states?.[t];return String(n?.attributes.friendly_name??e.entities?.[t]?.name??t)}function Ap(e,t){let n=e.states?.[t],r={entity_id:t,name:kp(e,t),state:n?.state??null},i=n?.attributes.unit_of_measurement;return i&&(r.unit=i),r}function jp(e,t){let n=e.states[t],r={},i=0;for(let[e,t]of Object.entries(n.attributes)){if(up.has(e)||e===`friendly_name`)continue;if(++i>sp)break;let n=JSON.stringify(t)??``;r[e]=n.length>cp?`${n.slice(0,cp)} (cut)`:t}let a=Object.keys(n.attributes).length,o={entity_id:t,name:kp(e,t),state:n.state,attributes:r};return i>sp&&(o.attributes_total=a),o}function Mp(){let e=Np(`ha-more-info-dialog`);return!e||e._open===!1?null:typeof e._entityId==`string`&&e._entityId?e._entityId:null}function Np(e){let t=document.querySelector(`home-assistant`);if(!t)return document.querySelector(e);let n=[t],r=0;for(;n.length&&r++<2e4;){let t=n.shift();if(t instanceof Element&&t.matches(e))return t;let r=t instanceof Element?t.shadowRoot:null;r&&n.push(r);for(let e of t.children)e.tagName.startsWith(`LLM-AGENT`)||n.push(e)}return null}function Pp(){return document.title.replace(/\s*[-|\u2013\u2014]\s*Home Assistant\s*$/i,``).trim()||location.pathname}function Fp(){let e=Np(`partial-panel-resolver`);if(!e)return;let t=[],n=0,r=e=>{if(n>=tp)return;if(e.nodeType===Node.TEXT_NODE){let r=(e.textContent??``).replace(/\s+/g,` `).trim();r&&(t.push(r),n+=r.length+1);return}if(!(e instanceof Element)){(e instanceof ShadowRoot||e instanceof DocumentFragment)&&e.childNodes.forEach(r);return}let i=e.tagName;dp.has(i)||i.startsWith(`LLM-AGENT`)||e.getAttribute(`aria-hidden`)!==`true`&&(typeof e.checkVisibility!=`function`||e.checkVisibility({checkVisibilityCSS:!0}))&&(i===`SLOT`?e.assignedNodes({flatten:!0}).forEach(r):e.shadowRoot?r(e.shadowRoot):e.childNodes.forEach(r))};return r(e),t.join(`
`).slice(0,tp)||void 0}var Ip=``,Lp=!1;function Rp(){let e=document.activeElement;for(;e;){if(e.tagName.startsWith(`LLM-AGENT`))return!0;e=e.shadowRoot?.activeElement??null}return!1}function zp(){let e=document.getSelection()?.toString().trim()??``;if(e)return e;let t=document.querySelector(`home-assistant`);if(!t)return``;let n=[t],r=0;for(;n.length&&r++<2e4;){let e=n.pop();if(e.tagName.startsWith(`LLM-AGENT`))continue;let t=e.shadowRoot;if(t){let e=t.getSelection?.()?.toString().trim();if(e)return e;n.push(...t.children)}n.push(...e.children)}return``}function Bp(){Lp||(Lp=!0,document.addEventListener(`selectionchange`,()=>{Rp()||(Ip=zp().slice(0,np))}),Ip=zp().slice(0,np))}var Vp=new TextEncoder,Hp=e=>Vp.encode(JSON.stringify(e)).length;function Up(e){let t=null,n=(e,r)=>{for(let[i,a]of Object.entries(e))if(Array.isArray(a)&&a.length>1){let n=Hp(a);(!t||n>t.size)&&(t={owner:e,key:i,size:n})}else r<2&&a&&typeof a==`object`&&!Array.isArray(a)&&n(a,r+1)};return n(e,0),t}function Wp(e){let t=e.details;for(let e=0;e<40&&Hp(t)>$f;e++){let e=Up(t);if(!e)break;let n=e.owner[e.key],r=`${e.key}_total`;e.owner[r]===void 0&&(e.owner[r]=n.length),e.owner[e.key]=n.slice(0,Math.floor(n.length/2)),e.owner[`${e.key}_trimmed`]=!0}for(Hp(t)>$f&&(e.details={trimmed:!0,note:`The page details were too large to send.`,narrow:t.narrow,selection:t.selection});e.text&&Hp(e)>ep;)e.text=e.text.slice(0,Math.floor(e.text.length*.75));return Hp(e)>ep&&delete e.text,e}function Q(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Gp=/* @__PURE__ */ new Set([`config`,`content`,`old`,`new`,`text`,`body`]),Kp={input:0,output:0,cache_read:0,cache_write:0,cost:0},$=class extends Le{constructor(...e){super(...e),this.narrow=!1,this.embedded=!1,this.convs=[],this.query=``,this.previews=/* @__PURE__ */ new Set,this.hits=null,this.convId=null,this.chatTitle=`New chat`,this.items=[],this.usage=Kp,this.running=!1,this.announce=``,this.editAt=-1,this.hasText=!1,this.photos=[],this.files=[],this.dragging=!1,this.photoGen=0,this.providerId=``,this.model=``,this.fetched={},this.showList=!1,this.loadError=``,this.mentions=[],this.picked=new Xl,this.prefs=im(),this.showPrefs=!1,this.showSettings=!1,this.showChanges=!1,this.view=`changes`,this.mentionIndex=0,this.pageOff=!1,this.mentionStart=-1,this.gen=0,this.started=!1,this.stickToBottom=!0,this.onReady=()=>{this.running&&this.convId&&this.open(this.convId).catch(()=>void 0)},this.reloaded=async()=>{try{this.info=await this.ws.sendMessagePromise({type:`llm_agent/info`})}catch{return}this.provider||this.startModel(),await this.refreshList(),this.convId&&await this.open(this.convId).catch(()=>void 0)},this.modelError=``,this.loadingModels=/* @__PURE__ */ new Set,this.noteCardSince=/* @__PURE__ */ new Map}static{this.styles=[pd,s`
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
    `]}get slim(){return this.narrow||this.embedded}get ws(){return this.hass.connection}applyPrefs(){let e=this.prefs;e.theme===`auto`?this.removeAttribute(`data-theme`):this.setAttribute(`data-theme`,e.theme),e.size===`normal`?this.removeAttribute(`data-size`):this.setAttribute(`data-size`,e.size),this.toggleAttribute(`data-compact`,e.compact)}setPref(e,t){this.prefs={...this.prefs,[e]:t},am(this.prefs),this.applyPrefs()}async setMyDefault(e=!1){let t=await this.ws.sendMessagePromise({type:`llm_agent/my_default`,provider_id:e?null:this.providerId,model:e?``:this.model});this.info&&={...this.info,my_default:t.my_default}}startModel(){let e=this.info?.my_default,t=e&&this.info?.providers.find(t=>t.id===e.provider_id)||this.info?.providers[0];t&&(this.providerId=t.id,this.model=e&&e.provider_id===t.id&&e.model?e.model:t.default_model)}willUpdate(e){if(e.has(`pageContext`)){let t=e.get(`pageContext`),n=this.pageContext;(t?.path!==n?.path||t?.summary!==n?.summary)&&(this.pageOff=!1)}}pageToSend(){let e=this.pageContext;if(!e||this.pageOff)return;let t=pp(),n={...e.details};return t?n.selection=t:delete n.selection,{...e,details:n}}updated(e){if(e.has(`hass`)&&this.hass&&!this.started)this.started=!0,this.init();else if(e.has(`hass`)&&this.hass){let t=e.get(`hass`)?.locale?.language,n=this.hass.locale?.language;t!==n&&fo(n).then(e=>{e&&this.requestUpdate()})}this.attachBox(),this.stickToBottom&&this.scroller&&(this.scroller.scrollTop=this.scroller.scrollHeight),this.addCopyButtons()}attachBox(){let e=this.source;e&&(this.input?.source!==e&&(this.input?.destroy(),this.input=zl(e,{onKey:e=>this.onKey(e),onChange:()=>this.onInput(),onPaste:e=>void this.onPaste(e),onBlur:()=>setTimeout(()=>{this.renderRoot.activeElement!==this.input?.el&&(this.mentions=[])},150)})),this.input.setPlaceholder(e.placeholder))}addCopyButtons(){if(this.scroller)for(let e of this.scroller.querySelectorAll(`.md pre:not([data-copy])`)){e.dataset.copy=`1`;let t=document.createElement(`button`);t.className=`copy small ghost`,t.textContent=z(`copy`),t.addEventListener(`click`,async()=>{let n=e.querySelector(`code`)??e;t.textContent=z(await Jp(n.textContent??``)?`copied`:`copy_failed`),setTimeout(()=>t.textContent=z(`copy`),1500)}),e.prepend(t)}}async copy(e,t){let n=await Jp(e),r=t.querySelector(`ha-icon`);r?.setAttribute(`icon`,n?`mdi:check`:`mdi:alert-circle-outline`),this.announce=z(n?`copied`:`copy_failed`),setTimeout(()=>r?.setAttribute(`icon`,`mdi:content-copy`),1500)}disconnectedCallback(){super.disconnectedCallback(),this.listening?.removeEventListener?.(`ready`,this.onReady),this.listening=void 0,this.detach(),this.started=!1}async init(){this.listening=this.ws,this.ws.addEventListener?.(`ready`,this.onReady),await fo(this.hass?.locale?.language)&&this.requestUpdate();try{this.info=await this.ws.sendMessagePromise({type:`llm_agent/info`}),this.loadError=``}catch(e){this.loadError=e.message??String(e);return}this.applyPrefs(),this.providerId||this.startModel(),await this.refreshList();let e=this.convId??tm();if(e&&this.convs.some(t=>t.id===e))try{await this.open(e)}catch{nm(null)}this.convId||(await this.updateComplete,this.setText(Zp(this.draftKey,null)))}async refreshList(){this.convs=await this.ws.sendMessagePromise({type:`llm_agent/conversations/list`}),$p(this.draftKey,this.convs)}get draftKey(){return`llm-agent-drafts-${this.hass?.user?.id??``}`}setText(e){let t=this.input;if(!t)return;let n=this.picked.show(e,this.hass);t.setMentions(this.picked.labels()),t.value=n,this.stored(e)}get composed(){return this.picked.expand(this.input?.value??``)}stored(e){this.hasText=!!e.trim(),this.input?.fit(),this.editAt<0&&Qp(this.draftKey,this.convId,e)}focusComposer(){let e=this.renderRoot.activeElement;matchMedia(`(pointer: coarse)`).matches||e&&e!==this.input?.el&&e.tagName!==`BUTTON`||this.input?.focus()}get member(){return this.info?.is_admin===!1}get admin(){return!this.member&&!!this.hass?.user?.is_admin}get provider(){return this.info?.providers.find(e=>e.id===this.providerId)}async detach(){let e=++this.gen,t=this.unsub;if(this.unsub=void 0,t)try{await t()}catch{}return e}clearAttachments(){this.photos=[],this.files=[],this.photoGen++}newChat(){this.showChanges=!1,this.editAt=-1,this.clearAttachments(),this.detach(),this.convId=null,nm(null),this.chatTitle=`New chat`,this.items=[],this.usage=Kp,this.running=!1,this.showList=!1,this.startModel(),this.setText(Zp(this.draftKey,null)),this.input?.focus()}async open(e,t=!1){this.showChanges=!1;let n=await this.detach();if(n!==this.gen)return;this.showList=!1,this.editAt=-1,this.clearAttachments();let r=await this.ws.sendMessagePromise({type:`llm_agent/conversations/get`,conversation_id:e});if(n!==this.gen)return;this.convId=r.id,nm(r.id),this.setText(Zp(this.draftKey,r.id)),this.chatTitle=r.title,this.usage=r.usage,this.providerId=r.provider_id,this.model=r.model,this.items=pm(r.messages),r.stopped&&r.stopped_text&&this.items.push({kind:`notice`,text:r.stopped_text,stop:r.stopped}),this.running=!1,this.stickToBottom=!0;let i=await this.ws.sendMessagePromise({type:`llm_agent/info`});if(n!==this.gen||!i.running.includes(e))return;this.running=!0,this.items=[...this.items,{kind:`assistant`,text:``}];let a;try{a=await this.ws.subscribeMessage(e=>{n===this.gen&&this.onEvent(e)},{type:`llm_agent/attach`,conversation_id:e})}catch{n===this.gen&&!t?await this.open(e,!0):n===this.gen&&(this.running=!1);return}this.keepOrDrop(n,a)}keepOrDrop(e,t){e===this.gen?this.unsub=t:t().catch(()=>void 0)}renderArgs(e,t){let n=Object.fromEntries(Object.entries(e??{}).filter(([e])=>!(t&&Gp.has(e))));return Object.keys(n).length?T`<pre class="args">${JSON.stringify(n,null,2)}</pre>`:E}async removeConv(e,t){t.stopPropagation(),confirm(z(`confirm_delete`))&&(await this.ws.sendMessagePromise({type:`llm_agent/conversations/delete`,conversation_id:e}),e===this.convId&&this.newChat(),await this.refreshList())}lastUserIndex(){for(let e=this.items.length-1;e>=0;e--)if(this.items[e].kind===`user`)return e;return-1}async send(e,t=!1){let n=this.lastUserIndex(),r=e===void 0?this.editAt:n,i=r>=0&&r===n,a=this.items[n],o=e===void 0?this.photos:a?.kind===`user`&&a.images||[],s=e===void 0?this.files:a?.kind===`user`&&a.files||[],c=e!==void 0&&a?.kind===`user`&&a.pageData?a.pageData:this.pageToSend(),l=e??this.composed.trim();if(!l&&s.length&&(l=`(${s.map(e=>e.name).join(`, `)})`),!l&&o.length&&(l=`(photo)`),!l||this.running)return;if(e!==void 0&&a?.kind===`user`&&(a.photos&&!a.images||a.files?.some(e=>!e.data))){this.edit(n);return}let u=this.gen,d=r>=0?this.items.slice(0,r):this.items;if(r>=0&&!i){try{await this.ws.sendMessagePromise({type:`llm_agent/conversations/truncate`,conversation_id:this.convId,index:d.filter(e=>e.kind===`user`).length})}catch(e){this.push({kind:`notice`,text:Em(e),error:!0});return}if(u!==this.gen)return}let f={items:r>=0&&!i?d:this.items,draft:this.composed,photos:this.photos,files:this.files,editAt:i?this.editAt:-1},p=this.editAt>=0;this.editAt=-1,e===void 0&&(this.clearAttachments(),this.setText(p?Zp(this.draftKey,this.convId):``),this.focusComposer()),this.items=[...d,{kind:`user`,text:l,images:o.length?o:void 0,files:s.length?s:void 0,page:c?.summary,pageData:c},{kind:`assistant`,text:``}],this.running=!0,this.announce=``,this.stickToBottom=!0;try{let e=await this.ws.subscribeMessage(e=>{u===this.gen&&(e.type===`conversation`?this.convId||(this.convId=e.conversation_id,this.chatTitle=e.title||l.slice(0,60),nm(this.convId)):this.onEvent(e))},{type:`llm_agent/chat`,text:l,conversation_id:this.convId,provider_id:this.providerId||void 0,model:this.model||void 0,rewind:i||void 0,over_cap:t||void 0,language:this.hass?.locale?.language||void 0,images:o.length?o.map(({media_type:e,data:t})=>({media_type:e,data:t})):void 0,files:s.length?s.map(({name:e,data:t})=>({name:e,data:t})):void 0,page:c},{resubscribe:!1});this.keepOrDrop(u,e)}catch(t){if(u!==this.gen)return;this.running=!1,this.items=f.items,this.editAt=f.editAt,e===void 0&&(this.setText(f.draft),this.photos=f.photos,this.files=f.files),this.push({kind:`notice`,text:Em(t),error:!0});return}await this.refreshList()}onEvent(e){switch(e.type){case`delta`:{let t=this.items[this.items.length-1];t?.kind===`assistant`?t.text+=e.text:this.items.push({kind:`assistant`,text:e.text}),this.scheduleRender();return}case`tool_start`:this.push({kind:`tool`,id:e.call_id,name:e.name,args:e.args,status:`running`});return;case`approval`:this.patchTool(e.call_id,{status:`waiting`,approval:{summary:e.summary,reason:e.reason,risky:e.risky,diff:e.diff,phoneOnly:e.phone_only,phone:e.phone}},{kind:`tool`,id:e.call_id,name:e.name,args:e.args,status:`waiting`}),this.announce=e.phone_only?z(`announce_phone`):z(`announce_approval`);return;case`review_start`:this.patchTool(e.call_id,{reviewing:!0});return;case`review`:this.patchTool(e.call_id,{reviewing:!1,review:{decision:e.decision,reason:e.reason,model:e.model}});return;case`tool_result`:this.patchTool(e.call_id,{...e.review?{review:e.review}:{},...e.image?.startsWith(`data:image/`)?{image:e.image}:{},status:e.ok?`ok`:`error`,summary:e.summary,preview:e.preview,snapshotId:e.snapshot_id,approval:void 0}),this.push({kind:`assistant`,text:``});return;case`usage`:this.usage=e.usage;return;case`notice`:this.push({kind:`notice`,text:e.text,stop:e.stop});return;case`error`:this.push({kind:`notice`,text:e.message,error:!0}),this.announce=z(`announce_error`);return;case`done`:this.usage=e.usage,this.running=!1,this.announce=z(`announce_done`),this.items=this.items.filter(e=>!(e.kind===`assistant`&&!e.text)),this.updateComplete.then(()=>this.focusComposer()),this.detach(),this.refreshList().then(()=>{this.chatTitle=this.convs.find(e=>e.id===this.convId)?.title??this.chatTitle});return}}scheduleRender(){this.renderTimer===void 0&&(this.renderTimer=window.setTimeout(()=>{this.renderTimer=void 0,this.requestUpdate()},80))}push(e){let t=this.items.filter(e=>!(e.kind===`assistant`&&!e.text));this.items=[...t,e]}patchTool(e,t,n){let r=!1;this.items=this.items.map(n=>n.kind===`tool`&&n.id===e?(r=!0,{...n,...t}):n),!r&&n&&this.push({...n,...t})}async answer(e,t){let n=this.renderRoot.querySelector(`#note-${CSS.escape(e)}`)?.value??``,r=this.items.find(t=>t.kind===`tool`&&t.id===e),i=r?{status:r.status,approval:r.approval}:void 0;this.patchTool(e,{status:`running`,approval:void 0});try{await this.ws.sendMessagePromise({type:`llm_agent/approve`,conversation_id:this.convId,call_id:e,approved:t,note:n})}catch(t){i&&this.patchTool(e,i),this.push({kind:`notice`,text:Em(t),error:!0})}}async undo(e){if(e.snapshotId&&confirm(z(`confirm_undo`,{name:e.summary||e.name})))try{let t=await this.ws.sendMessagePromise({type:`llm_agent/undo`,snapshot_id:e.snapshotId,...this.convId?{conversation_id:this.convId}:{}});this.patchTool(e.id,{undone:!0}),this.push({kind:`notice`,text:z(`undone_notice`,{summary:t.summary})})}catch(e){this.push({kind:`notice`,text:Em(e),error:!0})}}async stop(){this.convId&&await this.ws.sendMessagePromise({type:`llm_agent/cancel`,conversation_id:this.convId})}async loadModels(){let e=this.providerId;if(!(!e||e in this.fetched||this.loadingModels.has(e))){this.loadingModels.add(e);try{let t=await this.ws.sendMessagePromise({type:`llm_agent/models`,provider_id:e});this.modelError=t.error??``,this.fetched={...this.fetched,[e]:t.models}}catch{}finally{this.loadingModels.delete(e)}}}continueTurn(e=!1){this.setText(z(`continue_message`)),this.send(void 0,e)}edit(e){let t=this.items[e];t?.kind===`user`&&(this.editAt=e,this.clearAttachments(),this.photos=t.images??[],this.files=(t.files??[]).filter(e=>e.data),t.photos&&!t.images&&this.photosNotKept(),t.files?.some(e=>!e.data)&&this.push({kind:`notice`,text:z(`files_not_kept`)}),this.setText(t.text),this.input.focus())}cancelEdit(){this.editAt=-1,this.clearAttachments(),this.setText(Zp(this.draftKey,this.convId))}async onPick(e){let t=e.target,n=[...t.files??[]];t.value=``,await this.addFiles(n)}async onPaste(e){let t=[...e.clipboardData?.files??[]];t.length&&(e.preventDefault(),await this.addFiles(t))}onDragOver(e){if(!e.dataTransfer?.types.includes(`Files`))return;e.preventDefault();let t=this.running||this.showChanges;e.dataTransfer.dropEffect=t?`none`:`copy`,this.dragging=!t}onDragLeave(e){let t=e.relatedTarget;t&&e.currentTarget.contains(t)||(this.dragging=!1)}async onDrop(e){e.dataTransfer?.types.includes(`Files`)&&(e.preventDefault(),this.dragging=!1,!this.running&&!this.showChanges&&await this.addFiles([...e.dataTransfer.files]))}async addFiles(e){let t=e.filter(Mm);t.length&&await this.addPhotos(t);let n=this.photoGen;for(let t of e.filter(e=>!Mm(e))){let e=t.name||z(`that_file`),r=(t,n={})=>this.push({kind:`notice`,text:z(t,{name:e,...n}),error:!0});if(this.files.length>=Om){r(`too_many_files`,{count:Om});return}if(t.size>km){r(`file_too_large`,{limit:Pm(km)});continue}if(this.payload()+Nm(t.size)>Am){r(`files_over_total`);continue}let i;try{i=await Lm(t)}catch{r(`file_unreadable`);continue}if(n!==this.photoGen)return;i?this.payload()+(i.data?.length??0)>Am?r(`files_over_total`):this.files=[...this.files,i]:r(`file_unsupported`)}}payload(){return this.photos.reduce((e,t)=>e+t.data.length,0)+this.files.reduce((e,t)=>e+(t.data?.length??0),0)}photosNotKept(){this.push({kind:`notice`,text:z(`photos_not_kept`)})}async addPhotos(e){let t=this.photoGen;for(let n of e){if(this.photos.length>=Dm)break;try{let e=await Bm(n);if(t!==this.photoGen||this.photos.length>=Dm)return;this.photos=[...this.photos,e]}catch{this.push({kind:`notice`,text:z(`photo_unreadable`,{name:n.name||z(`that_picture`)}),error:!0})}}}onKey(e){if(this.mentions.length&&!e.isComposing){let t=this.mentions.length;if(e.key===`ArrowDown`||e.key===`ArrowUp`){e.preventDefault(),this.mentionIndex=(this.mentionIndex+(e.key===`ArrowDown`?1:t-1))%t;return}if(e.key===`Enter`||e.key===`Tab`){e.preventDefault(),this.pickMention(this.mentions[this.mentionIndex]);return}if(e.key===`Escape`){e.preventDefault(),this.mentions=[];return}}if(e.key===`ArrowUp`&&!e.isComposing&&!this.input?.value&&!this.running&&this.editAt<0&&this.convId){let t=this.lastUserIndex();t>=0&&(e.preventDefault(),this.edit(t))}else if(e.key===`Enter`&&!e.shiftKey&&!e.isComposing){let t=e.ctrlKey||e.metaKey;if(this.prefs.send===`ctrl`&&!t||!t&&this.input&&Gl(this.input.value,this.input.selectionStart))return;e.preventDefault(),this.send()}}onInput(){this.stored(this.composed),this.updateMentions()}updateMentions(){let e=this.input,t=this.hass;if(!e||!t)return;let n=e.value.slice(0,e.selectionStart??e.value.length),r=/(^|\s)@([^\s@]*)$/.exec(n);r?(this.mentionStart=n.length-r[2].length-1,this.mentions=lm(t,r[2]),this.mentionIndex=0):this.mentions=[]}pickMention(e){let t=this.input,n=t.selectionStart??t.value.length,r=t.value,i=`@${this.picked.add(e.label,e.insert)} `;t.setMentions(this.picked.labels()),t.value=r.slice(0,this.mentionStart)+i+r.slice(n),this.stored(this.composed);let a=this.mentionStart+i.length;t.setSelectionRange(a,a),this.mentions=[],t.focus()}onScroll(){let e=this.scroller;e&&(this.stickToBottom=e.scrollHeight-e.scrollTop-e.clientHeight<40)}pickProvider(e){this.providerId=e.target.value,this.model=this.provider?.default_model??``}render(){if(this.loadError)return T`<div class="empty">${z(`load_error`,{error:this.loadError})}</div>`;if(this.info&&!this.info.providers.length)return T`<div class="empty">${z(`no_provider`)}</div>`;let e=this.slim?this.showList:this.prefs.listOpen,t=this.convId?this.lastUserIndex():-1;return T`
      <div
        class="layout ${this.slim?`narrow`:``}"
        @click=${this.closePrefsOutside}
        @keydown=${e=>{e.key===`Escape`&&(this.running&&!e.defaultPrevented&&!e.isComposing&&!this.showPrefs&&(e.preventDefault(),this.stop()),this.showPrefs&&e.preventDefault(),this.showPrefs=!1)}}
      >
        ${e?this.renderList():E}
        <main
          class=${this.showChanges?`changes`:``}
          @dragover=${this.onDragOver}
          @dragleave=${this.onDragLeave}
          @drop=${this.onDrop}
        >
          <header>
            ${this.embedded?E:T`<ha-menu-button
                    .hass=${this.hass}
                    .narrow=${this.narrow}
                  ></ha-menu-button>`}
            <button
              class="icon"
              title=${z(e?`hide_chats`:`show_chats`)}
              aria-label=${z(`conversations`)}
              aria-expanded=${e}
              @click=${()=>this.slim?this.showList=!this.showList:this.setPref(`listOpen`,!this.prefs.listOpen)}
            >
              <ha-icon
                icon=${this.slim?`mdi:forum-outline`:`mdi:dock-left`}
              ></ha-icon>
            </button>
            <div class="title">${this.showChanges?z(this.view===`notes`?`home_notes`:this.view):vm(this.chatTitle)}</div>
            ${this.items.length?T`<button
                    class="icon"
                    title=${z(`export_title`)}
                    aria-label=${z(`export`)}
                    @click=${this.exportChat}
                  >
                    <ha-icon icon="mdi:tray-arrow-down"></ha-icon>
                  </button>`:E}
            ${e?E:T`<button
                    class="icon"
                    title=${z(`new_chat`)}
                    aria-label=${z(`new_chat`)}
                    @click=${this.newChat}
                  >
                    <ha-icon icon="mdi:square-edit-outline"></ha-icon>
                  </button>`}
            ${this.member?E:T`<button
                    class="icon"
                    title=${z(`home_notes`)}
                    aria-label=${z(`home_notes`)}
                    aria-pressed=${this.showChanges&&this.view===`notes`}
                    @click=${()=>{this.showChanges=!(this.showChanges&&this.view===`notes`),this.view=`notes`}}
                  >
                    <ha-icon icon="mdi:notebook-outline"></ha-icon>
                  </button>`}
            ${this.member?E:T`<button
                    class="icon"
                    title=${z(`changes_title`)}
                    aria-label=${z(`changes`)}
                    aria-pressed=${this.showChanges&&this.view===`changes`}
                    @click=${()=>{this.showChanges=!(this.showChanges&&this.view===`changes`),this.view=`changes`}}
                  >
                    <ha-icon icon="mdi:history"></ha-icon>
                  </button>`}
            ${this.member?E:T`<button
                    class="icon"
                    title=${z(`usage_view_title`)}
                    aria-label=${z(`usage`)}
                    aria-pressed=${this.showChanges&&this.view===`usage`}
                    @click=${()=>{this.showChanges=!(this.showChanges&&this.view===`usage`),this.view=`usage`}}
                  >
                    <ha-icon icon="mdi:chart-bar"></ha-icon>
                  </button>`}
            <button
              class="icon gear"
              title=${z(`panel_settings`)}
              aria-label=${z(`panel_settings`)}
              aria-expanded=${this.showPrefs}
              @click=${()=>this.showPrefs=!this.showPrefs}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            ${this.showPrefs?this.renderPrefs():E}
          </header>
          ${this.showChanges&&this.view===`notes`?T`<llm-agent-notes .hass=${this.hass}></llm-agent-notes>`:this.showChanges&&this.view===`usage`?T`<llm-agent-usage .hass=${this.hass}></llm-agent-usage>`:this.showChanges?T`<llm-agent-changes
                  .hass=${this.hass}
                  @open-chat=${e=>void this.open(e.detail)}
                ></llm-agent-changes>`:E}
          <div class="sr-only" role="status" aria-live="polite">${this.announce}</div>
          <div class="messages" role="log" aria-label=${z(`conversation`)} @scroll=${this.onScroll}>
            ${this.items.length?E:this.renderWelcome()}
            ${at(this.items,(e,t)=>t,(e,n)=>this.renderItem(e,n===this.items.length-1,n===t,e.kind!==`user`&&e.kind!==`notice`&&(n===0||this.items[n-1].kind===`user`),n))}
          </div>
          ${this.renderComposer()}
        </main>
        ${this.showSettings?T`<llm-agent-settings
                .hass=${this.hass}
                @close=${()=>this.showSettings=!1}
                @reloaded=${this.reloaded}
              ></llm-agent-settings>`:E}
      </div>
    `}onSearch(e){this.query=e.target.value,clearTimeout(this.searchTimer),this.query.trim()?this.searchTimer=window.setTimeout(async()=>{let e=this.query,t=await this.ws.sendMessagePromise({type:`llm_agent/conversations/search`,query:e});e===this.query&&(this.hits=t.conversations)},300):this.hits=null}exportChat(){let e=um(this.chatTitle,this.items),t=URL.createObjectURL(new Blob([e],{type:`text/markdown`})),n=document.createElement(`a`);n.href=t,n.download=`${dm(this.chatTitle)||`chat`}.md`,n.click(),URL.revokeObjectURL(t)}renderList(){let e=this.hits??this.convs;return T`<nav>
      <div class="nav-head">
        <span class="brand"
          ><span class="brand-mark"
            ><ha-icon icon="mdi:robot-happy-outline"></ha-icon></span
          >LLM Agent</span
        >
        <button
          class="icon"
          title=${z(`new_chat`)}
          aria-label=${z(`new_chat`)}
          @click=${this.newChat}
        >
          <ha-icon icon="mdi:square-edit-outline"></ha-icon>
        </button>
      </div>
      <label class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder=${z(`search_chats`)}
          aria-label=${z(`search_chats`)}
          .value=${this.query}
          @input=${this.onSearch}
        />
      </label>
      <div class="convs">
        ${this.hits&&!this.hits.length?T`<div class="nav-empty">${z(`no_matches`)}</div>`:E}
        ${!this.hits&&!this.convs.length?T`<div class="nav-empty">${z(`no_chats`)}</div>`:E}
        ${xm(e,!!this.hits).map(([e,t])=>T`
            ${e?T`<div class="group">${z(e)}</div>`:E}
            ${t.map(e=>T`<div
                  class="conv ${e.id===this.convId?`active`:``}"
                  @click=${()=>this.open(e.id)}
                >
                  <span class="conv-title"
                    >${e.source===`action`?T`<ha-icon
                            class="auto"
                            icon="mdi:robot-outline"
                            title=${z(`started_by_automation`)}
                          ></ha-icon>`:E}${vm(e.title)}${e.snippet&&e.snippet!==e.title?T`<small class="snippet">${e.snippet}</small>`:E}</span
                  >
                  <button
                    class="icon del"
                    title=${z(`delete`)}
                    aria-label=${z(`delete_chat`)}
                    @click=${t=>this.removeConv(e.id,t)}
                  >
                    <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                  </button>
                </div>`)}
          `)}
      </div>
    </nav>`}closePrefsOutside(e){this.showPrefs&&(e.composedPath().some(e=>e instanceof HTMLElement&&(e.classList.contains(`prefs`)||e.classList.contains(`gear`)))||(this.showPrefs=!1))}renderPrefs(){let e=this.prefs,t=(t,n,r)=>T`<label
        >${n}
        <select
          @change=${e=>this.setPref(t,e.target.value)}
        >
          ${r.map(([n,r])=>T`<option value=${String(n)} ?selected=${e[t]===n}>
                ${r}
              </option>`)}
        </select></label
      >`,n=(t,n)=>T`<label class="check"
        ><input
          type="checkbox"
          .checked=${e[t]}
          @change=${e=>this.setPref(t,e.target.checked)}
        />${n}</label
      >`,r=this.info?.my_default,i=r?`${this.info?.providers.find(e=>e.id===r.provider_id)?.name??`?`} · ${r.model||z(`model_provider_default`)}`:``;return T`<div class="prefs" role="dialog" aria-label=${z(`panel_settings`)}>
      ${t(`theme`,z(`theme`),[[`auto`,z(`theme_auto`)],[`light`,z(`theme_light`)],[`dark`,z(`theme_dark`)]])}
      ${t(`size`,z(`text_size`),[[`small`,z(`size_small`)],[`normal`,z(`size_normal`)],[`large`,z(`size_large`)]])}
      ${t(`send`,z(`send_with`),[[`enter`,`Enter`],[`ctrl`,`Ctrl+Enter`]])}
      ${n(`compact`,z(`compact_layout`))}
      ${n(`toolsOpen`,z(`expand_tools`))}
      ${n(`showUsage`,z(`show_usage`))}
      ${this.member?E:T`<div class="mine">
        <div>${z(`my_default`,{model:r?i:z(`provider_default`)})}</div>
        <button class="small" @click=${()=>this.setMyDefault()}>
          ${z(`use_current_model`)}
        </button>
        ${r?T`<button
                class="small ghost"
                @click=${()=>this.setMyDefault(!0)}
              >
                ${z(`clear`)}
              </button>`:E}
      </div>`}
      ${this.admin?T`<div class="mine">
              <button
                class="small"
                @click=${()=>{this.showPrefs=!1,this.showSettings=!0}}
              >
                ${z(`integration_settings`)}
              </button>
              <button class="small ghost" @click=${Gf}>${z(`open_in_ha`)}</button>
            </div>`:E}
      <div class="hint">${z(`prefs_hint`)}</div>
    </div>`}renderWelcome(){let e=cm(this.hass,this.member),t=this.hass?.user?.name?.split(` `)[0];return T`<div class="welcome">
      <div class="logo"><ha-icon icon="mdi:robot-happy-outline"></ha-icon></div>
      <h2>${t?z(`greeting_name`,{greeting:bm(),name:t}):bm()}</h2>
      ${this.member?T`<p>${z(`welcome_member`)}</p>`:T`<p>${z(`welcome_admin`)}</p>
              <span class="mode-chip"
                ><ha-icon icon="mdi:shield-check-outline"></ha-icon
                >${Tm(this.info?.approval_mode)}</span
              >`}
      <div class="tips">
        ${e.map(e=>T`<button
              class="tip"
              @click=${()=>{this.setText(e.text),this.input.focus()}}
            >
              <ha-icon icon=${e.icon}></ha-icon>
              <span>${e.text}</span>
            </button>`)}
      </div>
    </div>`}renderItem(e,t,n=!1,r=!1,i=-1){let a=r?T`<div class="avatar" aria-hidden="true">
          <ha-icon icon="mdi:robot-happy-outline"></ha-icon>
        </div>`:E;switch(e.kind){case`user`:return T`<div class="row user ${i===this.editAt?`edited`:``}">
          ${this.convId&&!this.running?T`<div class="msg-actions">
                  <button
                    class="icon"
                    title=${z(`edit`)}
                    aria-label=${z(`edit`)}
                    @click=${()=>this.edit(i)}
                  >
                    <ha-icon icon="mdi:pencil-outline"></ha-icon>
                  </button>
                  ${n?T`<button
                          class="icon"
                          title=${z(`retry`)}
                          aria-label=${z(`retry`)}
                          @click=${()=>this.send(e.text)}
                        >
                          <ha-icon icon="mdi:refresh"></ha-icon>
                        </button>`:E}
                </div>`:E}
          <div class="msg user md">
            ${this.renderPhotos(e)}${Je(Ql(Fl(e.text),this.hass))}
          </div>
          ${e.page?T`<div class="page-note">
                  <ha-icon icon="mdi:file-eye-outline"></ha-icon>${z(`page_sent`,{page:e.page})}
                </div>`:E}
        </div>`;case`assistant`:return e.text?T`<div class="row reply">
          ${a}
          <div class="msg assistant md">
            ${Je(Fl(e.text,!(t&&this.running)))}
          </div>
          ${t&&this.running?E:T`<div class="msg-actions acts">
                  <button
                    class="icon"
                    title=${z(`copy`)}
                    aria-label=${z(`copy`)}
                    @click=${t=>this.copy(e.text,t.currentTarget)}
                  >
                    <ha-icon icon="mdi:content-copy"></ha-icon>
                  </button>
                </div>`}
        </div>`:t&&this.running?T`<div class="row reply">
                ${a}
                <div class="msg assistant typing">
                  <span></span><span></span><span></span>
                </div>
              </div>`:E;case`notice`:return T`<div class="notice ${e.error?`error`:``}">
          ${e.text}
          ${t&&!this.running&&e.stop&&fm.has(e.stop)?T`<button
                  class="small"
                  @click=${()=>this.continueTurn(e.stop===`spend_cap`)}
                >
                  ${e.stop===`spend_cap`?z(`continue_anyway`):z(`continue`)}
                </button>`:E}
        </div>`;case`tool`:return T`<div class="row reply">
          ${a}${this.renderTool(e)}
        </div>`}}renderPreview(e){let t=e.args?.config;if(!t||typeof t!=`object`)return T``;let n=this.previews.has(e.id);return T`<div class="preview">
      <button
        class="ghost small"
        @click=${()=>{let t=new Set(this.previews);n?t.delete(e.id):t.add(e.id),this.previews=t}}
      >
        <ha-icon icon=${n?`mdi:eye-off-outline`:`mdi:eye-outline`}></ha-icon>
        ${z(n?`hide_preview`:`preview_dashboard`)}
      </button>
      ${n?T`<llm-dashboard-preview .hass=${this.hass} .config=${t}></llm-dashboard-preview>`:E}
    </div>`}renderNoteSuggestion(e){let t=(e.approval?.diff??``).replace(/\n+$/,``).split(`
`),n=t.filter(e=>e.startsWith(`+`)&&!e.startsWith(`+++`)).map(e=>e.slice(1)),r=t.filter(e=>e.startsWith(`-`)&&!e.startsWith(`---`)).map(e=>e.slice(1)),i=this.noteCardSince.get(e.id);i===void 0&&(i=Date.now(),this.noteCardSince.set(e.id,i),setTimeout(()=>this.requestUpdate(),sm+50));let a=Date.now()-i>=sm;return T`<div class="note-suggestion" role="group" aria-label=${z(`suggested_note`)}>
      <div class="note-head">
        <ha-icon icon="mdi:notebook-edit-outline"></ha-icon>
        <div>
          <strong>${z(`note_question`)}</strong>
          <small>${z(`note_explain`)}</small>
        </div>
      </div>
      ${n.filter(e=>e.trim()).length?T`<ul class="note-lines add">
            ${n.filter(e=>e.trim()).map(e=>T`<li>${e}</li>`)}
          </ul>`:E}
      ${r.filter(e=>e.trim()).length?T`<div class="note-label">${z(`forget`)}</div>
            <ul class="note-lines del">
              ${r.filter(e=>e.trim()).map(e=>T`<li>${e}</li>`)}
            </ul>`:E}
      <div class="note-actions">
        <button class="ghost" @click=${()=>this.answer(e.id,!1)}>
          ${z(`note_no`)}
        </button>
        <button
          class="note-save"
          ?disabled=${!a}
          title=${z(a?`note_save_title`:`read_it_first`)}
          @click=${()=>this.answer(e.id,!0)}
        >
          ${z(`save_to_notes`)}
        </button>
      </div>
    </div>`}renderTool(e){let t=e.approval;if(t&&!t.phoneOnly&&e.name===`change_home_note`)return this.renderNoteSuggestion(e);let n={running:T`<span class="spinner" aria-label=${z(`running`)}></span>`,ok:T`<ha-icon
        class="st ok"
        icon="mdi:check-circle"
        aria-label=${z(`done`)}
      ></ha-icon>`,error:T`<ha-icon
        class="st error"
        icon="mdi:alert-circle"
        aria-label=${z(`failed`)}
      ></ha-icon>`,waiting:T`<span class="tag wait">${z(`waiting_for_you`)}</span>`}[e.status];return T`<div
      class="tool ${e.status} ${t?.risky?`risky`:``}"
    >
      ${t?T`<div class="approval-head">
              <ha-icon
                icon=${t.risky?`mdi:shield-alert-outline`:`mdi:hand-back-right-outline`}
              ></ha-icon>
              <span
                >${z(`needs_approval`)}${t.reason?T`<span class="why"> · ${t.reason}</span>`:E}</span
              >
            </div>`:E}
      <details ?open=${!!t||this.prefs.toolsOpen}>
        <summary>
          <span class="tool-icon"
            ><ha-icon icon=${_m(e.name)}></ha-icon
          ></span>
          <span class="tool-name">${Sm(e.name)}</span>
          <span class="tool-summary"
            >${t?.summary??e.summary??Cm(e.args)}</span
          >
          ${e.undone?T`<span class="tag">${z(`undone`)}</span>`:E}
          ${hm(e.review,e.reviewing)}
          ${n}
          ${e.snapshotId&&!e.undone&&e.status===`ok`&&!this.member?T`<button
                  class="ghost small undo"
                  title=${z(`undo_title`)}
                  @click=${t=>{t.preventDefault(),t.stopPropagation(),this.undo(e)}}
                >
                  ${z(`undo`)}
                </button>`:E}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        ${e.review?T`<div class="review-note ${e.review.decision}">
                <ha-icon icon="mdi:shield-check-outline"></ha-icon>
                <span
                  ><b>${e.review.model?z(`reviewer_model`,{model:e.review.model}):z(`reviewer`)}:</b>
                  ${e.review.reason||z(mm[e.review.decision])}</span
                >
              </div>`:E}
        ${t?.diff?T`<pre class="diff">${gm(t.diff)}</pre>`:E}
        ${t&&e.name===`save_dashboard`?this.renderPreview(e):E}
        ${this.renderArgs(e.args,!!t?.diff)}
        ${e.preview&&!t?T`<pre class="result">${e.preview}</pre>`:E}
      </details>
        ${e.image?T`<img class="snapshot" src=${e.image} alt=${z(`camera_snapshot`)} />`:E}
      ${t?.phoneOnly?T`<div class="approval phone-wait">
              <ha-icon icon="mdi:cellphone-message"></ha-icon>
              ${z(`phone_wait`)}
            </div>`:t?T`<div class="approval">
              <input
                id="note-${e.id}"
                placeholder=${z(`approval_note`)}
                aria-label=${z(`approval_note`)}
              />
              <button
                class="ghost danger-text"
                @click=${()=>this.answer(e.id,!1)}
              >
                ${z(`deny`)}
              </button>
              <button
                class="primary"
                @click=${()=>this.answer(e.id,!0)}
              >
                ${z(`approve`)}
              </button>
            </div>`:E}
    </div>`}renderPhotos(e){if(e.kind!==`user`)return E;let t=e.files?.length?T`<div class="files">${e.files.map(e=>this.renderFile(e))}</div>`:E;return e.images?.length?T`<div class="photos">${e.images.map(e=>T`<img src=${e.url} alt=${z(`your_photo`)} />`)}</div>${t}`:e.photos?T`<div class="photo-note"><ha-icon icon="mdi:image-outline"></ha-icon>${ym(e.photos)} ${z(`not_kept`)}</div>${t}`:t}renderFile(e,t){return T`<span class="file" title=${e.name}>
      <ha-icon icon=${jm[e.kind]}></ha-icon>
      <span class="file-name">${e.name}</span>
      <span class="file-meta">${Fm(e)}, ${Pm(e.size)}</span>
      ${t?T`<button
              class="icon"
              title=${z(`remove_file`)}
              aria-label=${`${z(`remove_file`)}: ${e.name}`}
              @click=${t}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>`:E}
    </span>`}renderComposer(){let e=this.provider,t=`models`,n=this.pageContext;return T`<footer>
      ${n?T`<button
              class="page-chip ${this.pageOff?`off`:``}"
              aria-pressed=${!this.pageOff}
              title=${`${n.path}\n${z(this.pageOff?`page_chip_off`:`page_chip_on`)}`}
              @click=${()=>this.pageOff=!this.pageOff}
            >
              <ha-icon icon=${this.pageOff?`mdi:file-remove-outline`:`mdi:file-eye-outline`}></ha-icon>
              <span>${z(`page_chip`,{page:n.summary})}</span>
            </button>`:E}
      <div class="composer ${this.dragging?`dragging`:``}">
        <textarea
          rows="1"
          placeholder=${this.slim?z(`composer_placeholder`):`${z(`composer_placeholder`)} (${z(this.prefs.send===`ctrl`?`keys_ctrl`:`keys_enter`)})`}
        ></textarea>
        ${this.mentions.length?T`<ul class="mentions" role="listbox">
                ${this.mentions.map((e,t)=>T`<li
                      role="option"
                      aria-selected=${t===this.mentionIndex}
                      class=${t===this.mentionIndex?`active`:``}
                      @mousedown=${t=>{t.preventDefault(),this.pickMention(e)}}
                    >
                      <span class="kind">${e.kind}</span>
                      <span class="label">${e.label}</span>
                      <span class="detail">${e.detail}</span>
                    </li>`)}
              </ul>`:E}
        ${this.photos.length?T`<div class="attached">
                ${this.photos.map((e,t)=>T`<span class="thumb">
                      <img src=${e.url} alt=${z(`photo_to_send`)} />
                      <button
                        class="icon"
                        title=${z(`remove_photo`)}
                        aria-label=${z(`remove_photo`)}
                        @click=${()=>this.photos=this.photos.filter((e,n)=>n!==t)}
                      >
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    </span>`)}
              </div>`:E}
        ${this.files.length?T`<div class="attached files">
                ${this.files.map((e,t)=>this.renderFile(e,()=>{this.files=this.files.filter((e,n)=>n!==t)}))}
              </div>`:E}
        <div class="toolbar">
          <label
            class="attach icon"
            title=${z(`attach_title`)}
            ?hidden=${this.photos.length>=Dm&&this.files.length>=Om}
          >
            <ha-icon icon="mdi:paperclip"></ha-icon>
            <!-- No accept filter: HA files often have no extension (.storage/*,
                 home-assistant.log.1), and the type is decided from the bytes. -->
            <input
              type="file"
              multiple
              aria-label=${z(`attach`)}
              ?disabled=${this.running}
              @change=${this.onPick}
            />
          </label>
          ${this.member?E:T`<label
            class="model-pill"
            title=${this.modelError||z(`provider_and_model`)}
          >
            <ha-icon icon="mdi:creation-outline"></ha-icon>
            <select
              aria-label=${z(`provider`)}
              @change=${this.pickProvider}
              .value=${this.providerId}
              ?disabled=${this.running}
            >
              ${this.info?.providers.map(e=>T`<option
                    value=${e.id}
                    ?selected=${e.id===this.providerId}
                  >
                    ${e.name}
                  </option>`)}
            </select>
            <span class="sep">/</span>
            <input
              class="model"
              aria-label=${z(`model`)}
              list=${t}
              .value=${this.model}
              ?disabled=${this.running}
              @change=${e=>this.model=e.target.value.trim()}
              @focus=${this.loadModels}
            />
            <datalist id=${t}>
              ${(this.fetched[this.providerId]??e?.models)?.map(e=>T`<option value=${e.id}>${e.label}</option>`)}
            </datalist>
          </label>`}
          <span class="spacer"></span>
          ${this.running?T`<button
                  class="send stop"
                  title=${z(`stop`)}
                  aria-label=${z(`stop`)}
                  @click=${this.stop}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>`:T`<button
                  class="send"
                  title=${z(`send`)}
                  aria-label=${z(`send`)}
                  ?disabled=${!this.hasText&&!this.photos.length&&!this.files.length}
                  @click=${()=>this.send()}
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>`}
        </div>
      </div>
      <div class="meta">
        ${this.editAt>=0?T`<span class="editing"
                >${z(this.editAt===this.lastUserIndex()?`editing_last`:`editing_earlier`)}
                <button class="small ghost" @click=${this.cancelEdit}>
                  ${z(`cancel`)}
                </button></span
              >`:E}
        <span
          class="usage"
          ?hidden=${!this.prefs.showUsage}
          title=${z(`usage_title`)}
        >
          ${z(`usage_line`,{input:wm(this.usage.input+this.usage.cache_read+this.usage.cache_write),output:wm(this.usage.output)})}
          ${this.usage.cache_read?` · ${z(`usage_cached`,{count:wm(this.usage.cache_read)})}`:E}
          ·
          ${this.usage.cost==null?z(`cost_na`):`~$${this.usage.cost.toFixed(this.usage.cost<1?4:2)}`}
          ${this.usage.review?` · ${z(`reviewer_usage`,{tokens:wm(this.usage.review.input+this.usage.review.output),cost:this.usage.review.cost==null?z(`cost_na`):`~$${this.usage.review.cost.toFixed(4)}`})}`:E}
        </span>
      </div>
    </footer>`}};Q([Ve({attribute:!1})],$.prototype,`hass`,void 0),Q([Ve({type:Boolean})],$.prototype,`narrow`,void 0),Q([Ve({attribute:!1})],$.prototype,`pageContext`,void 0),Q([Ve({type:Boolean,reflect:!0})],$.prototype,`embedded`,void 0),Q([k()],$.prototype,`info`,void 0),Q([k()],$.prototype,`convs`,void 0),Q([k()],$.prototype,`query`,void 0),Q([k()],$.prototype,`previews`,void 0),Q([k()],$.prototype,`hits`,void 0),Q([k()],$.prototype,`convId`,void 0),Q([k()],$.prototype,`chatTitle`,void 0),Q([k()],$.prototype,`items`,void 0),Q([k()],$.prototype,`usage`,void 0),Q([k()],$.prototype,`running`,void 0),Q([k()],$.prototype,`announce`,void 0),Q([k()],$.prototype,`editAt`,void 0),Q([k()],$.prototype,`hasText`,void 0),Q([k()],$.prototype,`photos`,void 0),Q([k()],$.prototype,`files`,void 0),Q([k()],$.prototype,`dragging`,void 0),Q([k()],$.prototype,`providerId`,void 0),Q([k()],$.prototype,`model`,void 0),Q([k()],$.prototype,`fetched`,void 0),Q([k()],$.prototype,`showList`,void 0),Q([k()],$.prototype,`loadError`,void 0),Q([k()],$.prototype,`mentions`,void 0),Q([k()],$.prototype,`prefs`,void 0),Q([k()],$.prototype,`showPrefs`,void 0),Q([k()],$.prototype,`showSettings`,void 0),Q([k()],$.prototype,`showChanges`,void 0),Q([k()],$.prototype,`view`,void 0),Q([k()],$.prototype,`mentionIndex`,void 0),Q([k()],$.prototype,`pageOff`,void 0),Q([Ue(`.composer textarea`)],$.prototype,`source`,void 0),Q([Ue(`.messages`)],$.prototype,`scroller`,void 0);var qp=`llm-agent-prefs`;async function Jp(e){try{return await navigator.clipboard.writeText(e),!0}catch{let t=document.createElement(`textarea`);t.value=e,document.body.append(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}}function Yp(e){try{let t=JSON.parse(localStorage.getItem(e)??`{}`);return t&&typeof t==`object`?t:{}}catch{return{}}}function Xp(e,t){try{Object.keys(t).length?localStorage.setItem(e,JSON.stringify(t)):localStorage.removeItem(e)}catch{}}function Zp(e,t){let n=Yp(e)[t??``];return typeof n==`string`?n:``}function Qp(e,t,n){let r=Yp(e),i=t??``;if(n.trim())r[i]=n;else if(i in r)delete r[i];else return;Xp(e,r)}function $p(e,t){let n=Yp(e),r=new Set(t.map(e=>e.id)),i=Object.keys(n).filter(e=>e&&!r.has(e));for(let e of i)delete n[e];i.length&&Xp(e,n)}var em=`llm-agent-last-chat`;function tm(){try{return localStorage.getItem(em)}catch{return null}}function nm(e){try{e?localStorage.setItem(em,e):localStorage.removeItem(em)}catch{}}var rm={theme:`auto`,size:`normal`,compact:!1,toolsOpen:!1,showUsage:!0,send:`enter`,listOpen:!0};function im(){try{let e=JSON.parse(localStorage.getItem(qp)??`{}`);return{...rm,...typeof e==`object`&&e?e:{}}}catch{return{...rm}}}function am(e){try{localStorage.setItem(qp,JSON.stringify(e))}catch{}}var om=8,sm=1500;function cm(e,t=!1){let n=Object.values(e?.areas??{}).map(e=>String(e.name??``)).filter(Boolean).sort((e,t)=>e.localeCompare(t))[0]??z(`living_room`),r=Object.values(e?.states??{}).some(e=>e.attributes?.device_class===`energy`);return t?[{text:z(`tip_lights`,{room:n}),icon:`mdi:lightbulb-group-outline`},{text:z(`tip_anything_on`),icon:`mdi:power`},{text:z(`tip_temperature`),icon:`mdi:thermometer`}]:[{text:z(`tip_lights`,{room:n}),icon:`mdi:lightbulb-group-outline`},{text:z(`tip_dashboard_room`,{room:n}),icon:`mdi:view-dashboard-outline`},{text:z(`tip_dashboard_all`),icon:`mdi:view-dashboard-edit-outline`},{text:z(`tip_automation`),icon:`mdi:robot-outline`},r?{text:z(`tip_energy`),icon:`mdi:lightning-bolt-outline`}:{text:z(`tip_unavailable`),icon:`mdi:stethoscope`},{text:z(`tip_batteries`),icon:`mdi:battery-alert-variant-outline`}]}function lm(e,t){let n=t.toLowerCase(),r=[],i=(e,t)=>{let i=e.label.toLowerCase(),a=t.toLowerCase(),o;if(!n)o=3;else if(i.startsWith(n)||a.startsWith(n))o=0;else if(i.includes(n)||a.includes(n))o=1;else return;r.push([o,e])};for(let t of Object.values(e.areas??{}))i({kind:`area`,label:t.name,insert:`area_id:${t.area_id}`,detail:t.area_id},t.area_id);for(let t of Object.values(e.devices??{})){let e=t.name_by_user||t.name;e&&i({kind:`device`,label:e,insert:`device_id:${t.id} (${e})`,detail:`device`},e)}for(let t of Object.values(e.states??{}))i({kind:`entity`,label:t.attributes.friendly_name||t.entity_id,insert:t.entity_id,detail:t.entity_id},t.entity_id);return r.sort((e,t)=>e[0]-t[0]||e[1].label.localeCompare(t[1].label)),r.slice(0,om).map(([,e])=>e)}function um(e,t){let n=[`# ${vm(e)}`,``];for(let e of t)if(e.kind===`user`){let t=e.images?.length||e.photos||0,r=[...t?[ym(t)]:[],...(e.files??[]).map(e=>e.name)],i=r.length?` _(${r.join(`, `)})_`:``;n.push(`**${z(`you`)}:** ${e.text}${i}`,``)}else if(e.kind===`assistant`&&e.text)n.push(e.text,``);else if(e.kind===`notice`)n.push(`> ${e.text}`,``);else if(e.kind===`tool`){let t=e.status===`ok`?`✓`:e.status===`error`?`✗`:`…`;n.push(`- ${t} \`${e.name}\`${e.summary?`: ${e.summary}`:``}`,``)}return n.join(`
`)}function dm(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``).slice(0,50)}var fm=/* @__PURE__ */ new Set([`length`,`tool_limit`,`cancelled`,`spend_cap`]);function pm(e){let t=[],n=/* @__PURE__ */ new Map;for(let r of e)if(r.role===`user`)t.push({kind:`user`,text:r.content,photos:r.photos,files:r.files,page:r.page});else if(r.role===`assistant`){r.content&&t.push({kind:`assistant`,text:r.content});for(let e of r.tool_calls)n.set(e.id,{name:e.name,args:e.args})}else{let e=n.get(r.tool_call_id);t.push({kind:`tool`,id:r.tool_call_id,name:r.name,args:e?.args??{},status:r.ok?`ok`:`error`,summary:r.summary||(r.decision===`denied`?z(`denied`):``),preview:r.preview,snapshotId:r.snapshot_id,undone:r.undone,review:r.review??void 0})}return t}var mm={approve:`reviewer_approved`,deny:`reviewer_denied`,ask:`reviewer_unsure`};function hm(e,t){return t&&!e?T`<span class="tag wait">${z(`reviewing`)}</span>`:e?T`<span class="tag review ${e.decision}" title=${e.reason}
    >${z(mm[e.decision]??`reviewer`)}</span
  >`:E}function gm(e){return e.replace(/\n+$/,``).split(`
`).map(e=>T`<span class=${e.startsWith(`+`)&&!e.startsWith(`+++`)?`add`:e.startsWith(`-`)&&!e.startsWith(`---`)?`del`:e.startsWith(`@@`)?`hunk`:``}>${e||` `}</span>`)}function _m(e){return e===`shell`?`mdi:console`:e===`call_service`?`mdi:play-circle-outline`:e===`undo`?`mdi:undo`:e===`system`?`mdi:cog-outline`:e===`ha_websocket`?`mdi:api`:e===`integrations`?`mdi:puzzle-outline`:e===`read_reference`?`mdi:book-open-variant`:e===`render_template`?`mdi:code-braces`:e===`get_history`?`mdi:chart-timeline-variant`:e===`web_fetch`?`mdi:web`:e===`web_search`?`mdi:magnify`:e===`camera_snapshot`?`mdi:cctv`:e===`get_traces`?`mdi:transit-connection-variant`:e===`get_logbook`?`mdi:history`:e===`read_log`?`mdi:text-box-search-outline`:e.includes(`dashboard`)?`mdi:view-dashboard-outline`:e.includes(`config_item`)?`mdi:robot-outline`:e.includes(`file`)?`mdi:file-document-outline`:e.includes(`area`)||e.includes(`device`)||e.includes(`registry`)?`mdi:devices`:e.includes(`entit`)||e.includes(`service`)?`mdi:format-list-bulleted`:`mdi:wrench-outline`}function vm(e){return e===`New chat`?z(`new_chat`):e}function ym(e){return e===1?z(`one_photo`):z(`n_photos`,{count:e})}function bm(){let e=(/* @__PURE__ */ new Date()).getHours();return z(e<5?`greeting_evening`:e<12?`greeting_morning`:e<18?`greeting_afternoon`:`greeting_evening`)}function xm(e,t){if(t)return[[``,e]];let n=/* @__PURE__ */ new Date;n.setHours(0,0,0,0);let r=n.getTime()/1e3,i=[[`today`,r],[`yesterday`,r-86400],[`previous_7`,r-604800],[`previous_30`,r-2592e3],[`older`,-1/0]],a=[];for(let t of e){let e=i.find(([,e])=>t.updated>=e)[0],n=a.find(([t])=>t===e);n?n[1].push(t):a.push([e,[t]])}return a}function Sm(e){let t=`tool_${e}`;return lo(t)?z(t):e.replace(/_/g,` `)}function Cm(e){let t=Object.entries(e).filter(([e])=>!e.startsWith(`_`)).map(([e,t])=>`${e}=${typeof t==`string`?t:JSON.stringify(t)}`).join(` `);return t.length>120?`${t.slice(0,117)}…`:t}function wm(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Tm(e){let t={ask_all:`mode_ask_all`,ask_risky:`mode_ask_risky`,reviewer:`mode_reviewer`,autopilot:`mode_autopilot`,yolo:`mode_yolo`,read_only:`mode_read_only`}[e??``];return t?z(t):``}function Em(e){return e.message??String(e)}customElements.get(`llm-agent-panel`)||customElements.define(`llm-agent-panel`,$);var Dm=3,Om=10,km=2097152,Am=35e5,jm={text:`mdi:file-document-outline`,pdf:`mdi:file-pdf-box`,zip:`mdi:folder-zip-outline`,gzip:`mdi:folder-zip-outline`};function Mm(e){return e.type.startsWith(`image/`)&&e.type!==`image/svg+xml`}function Nm(e){return Math.ceil(e/3)*4}function Pm(e){return e>=1048576?`${(e/1048576).toFixed(1)} MB`:e>=1024?`${Math.round(e/1024)} KB`:`${e} B`}function Fm(e){if(e.kind!==`text`)return e.kind.toUpperCase();let t=e.name.lastIndexOf(`.`),n=t>0?e.name.slice(t+1):``;return n&&n.length<=5?n.toUpperCase():z(`file_text`)}function Im(e){let t=(...t)=>t.every((t,n)=>e[n]===t);if(t(80,75,3,4)||t(80,75,5,6))return`zip`;if(t(31,139))return`gzip`;if(t(37,80,68,70,45))return`pdf`;if(t(255,254)||t(254,255))return`text`;let n=0;for(let t of e){if(t===0)return null;t<32&&t!==9&&t!==10&&t!==12&&t!==13&&t!==27&&n++}return e.length&&n/e.length>.02?null:`text`}async function Lm(e){let t=Im(new Uint8Array(await e.slice(0,8192).arrayBuffer()));if(!t)return null;let n=await new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>n(r.error),r.readAsDataURL(e)});return{name:e.name||`file`,size:e.size,kind:t,data:n.slice(n.indexOf(`,`)+1)}}var Rm=1568,zm=1e6;async function Bm(e){let t=await createImageBitmap(e);try{let e=Math.min(Rm,Math.max(t.width,t.height));for(;;){for(let n of[.85,.7,.55]){let r=Vm(t,e,n),i=r.slice(r.indexOf(`,`)+1);if(i.length<=zm)return{media_type:`image/jpeg`,data:i,url:r}}if(e<=256)throw Error(`photo too detailed to send`);e=Math.round(e*.75)}}finally{t.close()}}function Vm(e,t,n){let r=Math.min(1,t/Math.max(e.width,e.height)),i=document.createElement(`canvas`);i.width=Math.max(1,Math.round(e.width*r)),i.height=Math.max(1,Math.round(e.height*r));let a=i.getContext(`2d`);return a.fillStyle=`#fff`,a.fillRect(0,0,i.width,i.height),a.drawImage(e,0,0,i.width,i.height),i.toDataURL(`image/jpeg`,n)}export{fp as collectPageContext,lm as findMentions,um as toMarkdown,cm as welcomeTips};