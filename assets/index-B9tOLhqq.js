(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`redwood-electric-draft-v1`;function t(){return{mode:`customer`,route:`home`,cameras:{packageId:null,quoteOverride:``},theater:{packageId:null,addons:[],overrides:{}},network:{rack:null,mesh:null,plansName:``,quoteOverride:``},blinds:{type:null,count:4,size:`standard`,quoteOverride:``},qualify:{yes:null},toast:``}}function n(){try{let n=localStorage.getItem(e);if(!n)return t();let r=JSON.parse(n);return{...t(),...r,cameras:{...t().cameras,...r.cameras},theater:{...t().theater,...r.theater,addons:r.theater?.addons||[]},network:{...t().network,...r.network},blinds:{...t().blinds,...r.blinds},qualify:{yes:null}}}catch{return t()}}function r(t){if(t.mode===`view`)return;let{toast:n,...r}=t;localStorage.setItem(e,JSON.stringify(r))}function i(){let[e,t]=(location.hash||`#/`).slice(1).split(`?`);return{path:e.replace(/^\//,``)||`home`,params:new URLSearchParams(t||``)}}function a(e){return[`home`,`cameras`,`theater`,`network`,`blinds`].includes(e)?e:`home`}function o(e,t){let n=t.get(`mode`);(n===`view`||n===`bid`||n===`customer`)&&(e.mode=n);let r=t.get(`cat`);if(r&&(e.route=a(r)),e.route===`cameras`&&(e.cameras.packageId=t.get(`pkg`)||e.cameras.packageId,t.has(`op`)&&(e.cameras.quoteOverride=t.get(`op`))),e.route===`theater`){e.theater.packageId=t.get(`pkg`)||e.theater.packageId;let n=(t.get(`a`)||``).split(`,`).filter(Boolean);t.has(`a`)&&(e.theater.addons=n),t.has(`op`)&&(e.theater.overrides.pkg=Number(t.get(`op`)));let r=t.get(`oa`)||``;if(r)for(let t of r.split(`,`)){let[n,r]=t.split(`:`);n&&r&&(e.theater.overrides[n]=Number(r))}}return e.route===`network`&&(t.has(`rack`)&&(e.network.rack=t.get(`rack`)===`1`),t.has(`mesh`)&&(e.network.mesh=t.get(`mesh`)===`1`),t.has(`plans`)&&(e.network.plansName=t.get(`plans`)===`1`?`plans-on-file.pdf`:``),t.has(`op`)&&(e.network.quoteOverride=t.get(`op`))),e.route===`blinds`&&(t.has(`type`)&&(e.blinds.type=t.get(`type`)),t.has(`n`)&&(e.blinds.count=Math.max(1,Number(t.get(`n`))||1)),t.has(`size`)&&(e.blinds.size=t.get(`size`)),t.has(`op`)&&(e.blinds.quoteOverride=t.get(`op`))),e}function s(e){let t=new URLSearchParams;if(t.set(`mode`,`view`),t.set(`cat`,e.route),e.route===`cameras`&&(e.cameras.packageId&&t.set(`pkg`,e.cameras.packageId),e.cameras.quoteOverride&&t.set(`op`,String(e.cameras.quoteOverride))),e.route===`theater`){e.theater.packageId&&t.set(`pkg`,e.theater.packageId),e.theater.addons.length&&t.set(`a`,e.theater.addons.join(`,`)),e.theater.overrides.pkg&&t.set(`op`,String(e.theater.overrides.pkg));let n=Object.entries(e.theater.overrides).filter(([e,t])=>e!==`pkg`&&t).map(([e,t])=>`${e}:${t}`);n.length&&t.set(`oa`,n.join(`,`))}return e.route===`network`&&(e.network.rack===!0&&t.set(`rack`,`1`),e.network.rack===!1&&t.set(`rack`,`0`),e.network.mesh===!0&&t.set(`mesh`,`1`),e.network.mesh===!1&&t.set(`mesh`,`0`),e.network.plansName&&t.set(`plans`,`1`),e.network.quoteOverride&&t.set(`op`,String(e.network.quoteOverride))),e.route===`blinds`&&(e.blinds.type&&t.set(`type`,e.blinds.type),t.set(`n`,String(e.blinds.count)),e.blinds.size&&t.set(`size`,e.blinds.size),e.blinds.quoteOverride&&t.set(`op`,String(e.blinds.quoteOverride))),t}function c(e){return`#/${e.route===`home`?`home`:e.route}?${s(e).toString()}`}function l(e){return`${location.origin}${location.pathname}${c(e)}`}function u(e,t,n=!1){let r=`#/${e}`,i=t instanceof URLSearchParams?t.toString():``;i&&(r+=`?${i}`),n?history.replaceState(null,``,r):location.hash=r}var d=`redwoodelectricutah@gmail.com`,f=[{id:`cameras`,title:`Security cameras`,blurb:`Outdoor and indoor coverage with a simple example package.`,photoLabel:`Photo later: exterior camera on a Utah County home`},{id:`theater`,title:`Home theaters`,blurb:`Packages, add-ons, and a running example total.`,photoLabel:`Photo later: finished media room`},{id:`network`,title:`Data rack & internet`,blurb:`Rack, whole-home Wi‑Fi, or both — in plain language.`,photoLabel:`Photo later: structured media rack`},{id:`blinds`,title:`Power blinds`,blurb:`Blackout or light-filtering, sized by window count.`,photoLabel:`Photo later: motorized living-room shades`}],p=[{id:`starter`,name:`Starter`,cameras:4,detail:`Front, back, and two coverage spots. Example NVR + app access.`,low:2800,high:4200},{id:`whole`,name:`Whole home`,cameras:8,detail:`Typical two-story + driveway coverage. Example 4K mix.`,low:5500,high:8500},{id:`property`,name:`Larger property`,cameras:12,detail:`Shop, acreage, or extra buildings. Site walk usually needed.`,low:9e3,high:14e3}],m=[{id:`bronze`,name:`Bronze`,spec:`5.1 · no projector`,detail:`TV-based surround. Front left / center / right, surrounds, and a sub.`,price:9e3},{id:`silver`,name:`Silver`,spec:`5.2.4 · with projector`,detail:`Projection screen, two subs, and four Atmos height speakers.`,price:16e3,projector:!0},{id:`gold`,name:`Gold`,spec:`7.2.4 · with projector`,detail:`Wider surrounds, two subs, Atmos heights, projector + screen.`,price:2e4,projector:!0}],h=[{id:`led`,name:`LED strip in pillars`,detail:`Warm accent in the room columns.`,price:450},{id:`sconce`,name:`Sconce lighting`,detail:`Wall sconces for walk-in light, dimmable.`,price:650},{id:`backlight`,name:`Backlight behind TV / screen`,detail:`Bias lighting so the picture is easier on the eyes.`,price:350}],g=[{id:`blackout`,name:`Blackout`,detail:`Sleep rooms, media rooms, west-facing glare.`,perWindow:{small:320,standard:420,large:560}},{id:`filter`,name:`Light-filtering`,detail:`Daytime privacy without a cave. Living rooms and kitchens.`,perWindow:{small:260,standard:350,large:480}}],ee=[{id:`small`,name:`Small`,hint:`≈ under 36″ wide`},{id:`standard`,name:`Standard`,hint:`≈ 36–60″`},{id:`large`,name:`Large / patio`,hint:`≈ over 60″ or tall`}],_={rack:{low:2500,high:4500,label:`Data rack + patching (example)`},mesh:{low:1200,high:2800,label:`Whole-home Wi‑Fi (example)`},both:{low:3800,high:7200,label:`Rack + whole-home Wi‑Fi (example)`}};function v(e){return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,maximumFractionDigits:0}).format(e)}function y(e,t){return`${v(e)}–${v(t)}`}function b(e){return f.find(t=>t.id===e)}function x(e){return p.find(t=>t.id===e)}function S(e){return m.find(t=>t.id===e)}function te(e){return h.find(t=>t.id===e)}function C(e){return g.find(t=>t.id===e)}function w(e){let t=S(e.packageId);if(!t)return[];let n=[{id:`pkg`,name:`${t.name} theater`,detail:t.spec,price:Number(e.overrides?.pkg??t.price)}];for(let t of e.addons){let r=te(t);r&&n.push({id:t,name:r.name,detail:r.detail,price:Number(e.overrides?.[t]??r.price)})}return n}function T(e){return w(e).reduce((e,t)=>e+t.price,0)}function E(e){let t=x(e.packageId);if(!t)return null;if(e.quoteOverride){let n=Number(e.quoteOverride);return{low:n,high:n,single:n,label:t.name}}return{low:t.low,high:t.high,label:t.name}}function D(e){let t=e.rack===!0,n=e.mesh===!0;if(!t&&!n)return null;let r=_[t&&n?`both`:t?`rack`:`mesh`];if(e.quoteOverride){let t=Number(e.quoteOverride);return{...r,low:t,high:t,single:t}}return{...r}}function O(e){let t=C(e.type);if(!t||!e.count)return null;let n=e.size||`standard`,r=t.perWindow[n],i=Math.round(r*e.count*.9),a=Math.round(r*e.count*1.15);if(e.quoteOverride){let i=Number(e.quoteOverride);return{low:i,high:i,single:i,each:r,type:t.name,size:n,count:e.count}}return{low:i,high:a,each:r,type:t.name,size:n,count:e.count}}function k(e){return e?e.single?v(e.single):y(e.low,e.high):``}function ne(e){return`
    ${re(e)}
    <main class="main">
      ${e.route===`home`?ae(e):se(e)}
    </main>
    ${ie()}
    ${e.toast?`<div class="toast" role="status">${V(e.toast)}</div>`:``}
  `}function re(e){return`
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="#/home" data-action="go-home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-text">
            <span class="brand-name">Redwood Electric</span>
            <span class="brand-sub">Utah County · electrical &amp; low-voltage</span>
          </span>
        </a>
        ${e.mode===`view`?`<span class="view-pill">View-only preview</span>`:`<div class="mode-switch" role="group" aria-label="Site mode">
                <button type="button" class="${e.mode===`customer`?`is-on`:``}" data-action="set-mode" data-mode="customer">Customer</button>
                <button type="button" class="${e.mode===`bid`?`is-on`:``}" data-action="set-mode" data-mode="bid">Bid / Sales</button>
              </div>`}
      </div>
      <p class="draft-banner">ROUGH DRAFT — example prices only, not a quote</p>
    </header>
  `}function ie(){return`
    <footer class="site-footer">
      <p>Redwood Electric · Utah County, Utah</p>
      <p class="fine">${d} · This page is a first-pass sales draft. Photos and firm prices come later.</p>
    </footer>
  `}function ae(e){let t=e.mode===`bid`;return`
    <section class="home">
      <div class="home-intro">
        <p class="eyebrow">Draft estimator</p>
        <h1>${t?`Build a package James can share.`:`See an example ballpark, then decide if you want to talk.`}</h1>
        <p class="lede">${t?`Pick a category, adjust example prices if you want, then generate a view-only preview link for a homeowner or GC.`:`Four common jobs. Tap one, configure a simple package, and we’ll ask if the example range is something you want to move forward with before we take your name.`}</p>
      </div>
      <div class="tile-grid">
        ${f.map(e=>oe(e)).join(``)}
      </div>
    </section>
  `}function oe(e){return`
    <a class="tile tile-${e.id}" href="#/${e.id}" data-action="go-cat" data-cat="${e.id}">
      <div class="tile-art" aria-hidden="true">${A(e.id)}</div>
      <div class="tile-copy">
        <span class="photo-tag">${V(e.photoLabel)}</span>
        <h2>${V(e.title)}</h2>
        <p>${V(e.blurb)}</p>
      </div>
    </a>
  `}function A(e){return e===`cameras`?`
      <div class="art-house">
        <div class="art-roof"></div>
        <div class="art-wall"></div>
        <span class="art-cam c1"></span>
        <span class="art-cam c2"></span>
        <span class="art-cam c3"></span>
      </div>`:e===`theater`?`
      <div class="art-cinema">
        <div class="art-screen"></div>
        <div class="art-glow"></div>
        <div class="art-seats"></div>
      </div>`:e===`network`?`
      <div class="art-rack">
        <span></span><span></span><span></span><span></span>
      </div>`:`
    <div class="art-window">
      <div class="art-slat"></div>
      <div class="art-slat"></div>
      <div class="art-slat"></div>
      <div class="art-slat"></div>
    </div>`}function se(e){let t=b(e.route),n=e.mode===`view`;return`
    <section class="category">
      <nav class="crumb">
        <a href="#/home" data-action="go-home">Home</a>
        <span aria-hidden="true">/</span>
        <span>${V(t.title)}</span>
      </nav>
      <header class="cat-head">
        <div>
          <p class="eyebrow">${n?`Shared preview`:e.mode===`bid`?`Bid / sales`:`Customer path`}</p>
          <h1>${V(t.title)}</h1>
          <p class="lede">${V(t.blurb)}</p>
        </div>
        ${e.mode===`bid`?`<button type="button" class="btn btn-copper" data-action="share-preview">Share preview</button>`:``}
      </header>
      ${e.route===`cameras`?ce(e):``}
      ${e.route===`theater`?le(e):``}
      ${e.route===`network`?ue(e):``}
      ${e.route===`blinds`?j(e):``}
      ${P(e)}
    </section>
  `}function ce(e){let t=e.cameras.packageId,n=x(t),r=e.mode===`view`;return`
    <div class="split">
      <div class="visual visual-cameras" data-pkg="${t||`none`}">
        <span class="photo-tag">Photo placeholder — house + camera coverage</span>
        ${A(`cameras`)}
        <p class="visual-caption">${n?`${n.cameras} cameras in this example package`:`Pick a package to preview coverage`}</p>
      </div>
      <div class="stack">
        <h2 class="section-title">Example packages</h2>
        <div class="pkg-list">
          ${p.map(e=>`
              <button type="button" class="pkg-card ${t===e.id?`is-on`:``}" data-action="camera-pkg" data-id="${e.id}" ${r?`disabled`:``}>
                <span class="pkg-name">${V(e.name)}</span>
                <span class="pkg-spec">${e.cameras} cameras</span>
                <span class="pkg-detail">${V(e.detail)}</span>
                <span class="pkg-price">${k({low:e.low,high:e.high})} <em>example</em></span>
              </button>`).join(``)}
        </div>
        ${N(e,`cameras`,`Quoted number (optional)`)}
      </div>
    </div>
  `}function le(e){let t=e.theater.packageId,n=S(t),r=e.mode===`view`,i=e.theater.addons.join(` `);return`
    <div class="theater-layout">
      <div class="stage" data-pkg="${t||`none`}" data-addons="${V(i)}">
        <span class="photo-tag">Photo placeholder — layered theater mock (swap later)</span>
        <div class="stage-room">
          <div class="stage-ceiling"></div>
          <div class="stage-beam"></div>
          <div class="stage-backwall">
            <div class="stage-backlight"></div>
            <div class="stage-screen"><span>${n?.projector?`Projector screen`:t?`TV`:`Pick a package`}</span></div>
          </div>
          <div class="stage-pillar left"><div class="led"></div></div>
          <div class="stage-pillar right"><div class="led"></div></div>
          <div class="stage-sconce left"></div>
          <div class="stage-sconce right"></div>
          <div class="stage-speakers ${t||`none`}"></div>
          <div class="stage-floor"></div>
        </div>
      </div>

      <div class="stack">
        <h2 class="section-title">Packages</h2>
        <div class="pkg-list pkg-list-3">
          ${m.map(e=>`
              <button type="button" class="pkg-card ${t===e.id?`is-on`:``}" data-action="theater-pkg" data-id="${e.id}" ${r?`disabled`:``}>
                <span class="pkg-name">${V(e.name)}</span>
                <span class="pkg-spec">${V(e.spec)}</span>
                <span class="pkg-detail">${V(e.detail)}</span>
                <span class="pkg-price">${v(e.price)} <em>example</em></span>
              </button>`).join(``)}
        </div>
        ${e.mode===`bid`&&t?`<label class="override">Package price override
                <input type="number" inputmode="numeric" data-action="override-theater-pkg" value="${e.theater.overrides.pkg??n.price}" />
              </label>`:``}

        <h2 class="section-title">Add-ons</h2>
        <p class="hint">One-tap add. They overlay on the room mock above.</p>
        <div class="addon-list">
          ${h.map(n=>{let i=e.theater.addons.includes(n.id),a=Number(e.theater.overrides[n.id]??n.price);return`
              <div class="addon-row ${i?`is-on`:``}">
                <button type="button" class="addon-btn" data-action="theater-addon" data-id="${n.id}" ${r||!t?`disabled`:``}>
                  <span class="addon-check" aria-hidden="true">${i?`✓`:`+`}</span>
                  <span>
                    <strong>${V(n.name)}</strong>
                    <small>${V(n.detail)}</small>
                  </span>
                  <span class="addon-price">${v(n.price)}</span>
                </button>
                ${e.mode===`bid`?`<input type="number" class="addon-override" inputmode="numeric" data-action="override-addon" data-id="${n.id}" value="${a}" ${r?`disabled`:``} aria-label="${V(n.name)} price override" />`:``}
              </div>`}).join(``)}
        </div>
      </div>
    </div>
    <aside class="total-bar" aria-live="polite">
      <div>
        <p class="eyebrow">Running example total</p>
        <p class="total-figure">${t?v(T(e.theater)):`—`}</p>
      </div>
      <p class="fine">Placeholder numbers. Not a quote.</p>
    </aside>
  `}function ue(e){let t=e.mode===`view`;return`
    <div class="split">
      <div class="network-visuals">
        <div class="visual visual-rack ${e.network.rack?`is-on`:``}">
          <span class="photo-tag">Photo placeholder — data rack</span>
          ${A(`network`)}
          <p class="visual-caption">Structured rack, patch panel, clean power</p>
        </div>
        <div class="visual visual-heat ${e.network.mesh?`is-on`:``}">
          <span class="photo-tag">Photo placeholder — Wi‑Fi coverage heat</span>
          <div class="heat-map" aria-hidden="true">
            <i></i><i></i><i></i>
          </div>
          <p class="visual-caption">Whole-home coverage, not jargon</p>
        </div>
      </div>
      <div class="stack">
        <h2 class="section-title">What do you want help with?</h2>
        <p class="hint">You don’t need to know mesh vs. access points. Just tell us the outcome.</p>
        ${M(`network-rack`,`Want a data rack?`,`A closet or garage cabinet where internet, cameras, and AV can live.`,e.network.rack,t)}
        ${M(`network-mesh`,`Want whole-home coverage?`,`Phones and TVs work in bedrooms, basement, and yard without hunting for signal.`,e.network.mesh,t)}
        <label class="file-field">
          <span>Optional: upload PDF plans</span>
          <input type="file" accept="application/pdf,.pdf" data-action="plans-file" ${t?`disabled`:``} />
          <small>${e.network.plansName?`Noted for the email: ${V(e.network.plansName)} (file stays on this device — we do not upload it).`:`Draft only remembers the filename so the email can say you have plans to send.`}</small>
        </label>
        ${N(e,`network`,`Quoted number (optional)`)}
      </div>
    </div>
  `}function j(e){let t=e.mode===`view`,n=e.blinds.type;return`
    <div class="split">
      <div class="visual visual-blinds" data-type="${n||`none`}">
        <span class="photo-tag">Photo placeholder — ${n===`blackout`?`blackout shades`:n===`filter`?`light-filtering shades`:`powered window`}</span>
        <div class="blind-window">
          <div class="blind-slats"></div>
        </div>
        <p class="visual-caption">${n?g.find(e=>e.id===n).name:`Pick a shade type`}</p>
      </div>
      <div class="stack">
        <h2 class="section-title">Shade type</h2>
        <div class="pkg-list">
          ${g.map(e=>`
              <button type="button" class="pkg-card ${n===e.id?`is-on`:``}" data-action="blinds-type" data-id="${e.id}" ${t?`disabled`:``}>
                <span class="pkg-name">${V(e.name)}</span>
                <span class="pkg-detail">${V(e.detail)}</span>
              </button>`).join(``)}
        </div>
        <h2 class="section-title">About how many windows?</h2>
        <div class="stepper">
          <button type="button" data-action="blinds-count" data-delta="-1" ${t?`disabled`:``} aria-label="Fewer windows">−</button>
          <span>${e.blinds.count}</span>
          <button type="button" data-action="blinds-count" data-delta="1" ${t?`disabled`:``} aria-label="More windows">+</button>
        </div>
        <h2 class="section-title">Typical size</h2>
        <div class="chip-row">
          ${ee.map(n=>`
            <button type="button" class="chip ${e.blinds.size===n.id?`is-on`:``}" data-action="blinds-size" data-id="${n.id}" ${t?`disabled`:``}>
              ${V(n.name)}<small>${V(n.hint)}</small>
            </button>`).join(``)}
        </div>
        ${N(e,`blinds`,`Quoted number (optional)`)}
      </div>
    </div>
  `}function M(e,t,n,r,i){return`
    <div class="yn">
      <div>
        <strong>${V(t)}</strong>
        <p>${V(n)}</p>
      </div>
      <div class="yn-btns">
        <button type="button" class="${r===!0?`is-on`:``}" data-action="${e}" data-value="yes" ${i?`disabled`:``}>Yes</button>
        <button type="button" class="${r===!1?`is-on`:``}" data-action="${e}" data-value="no" ${i?`disabled`:``}>No</button>
      </div>
    </div>
  `}function N(e,t,n){if(e.mode!==`bid`)return``;let r=e[t].quoteOverride||``;return`
    <label class="override">${V(n)}
      <input type="number" inputmode="numeric" data-action="override-quote" data-field="${t}" value="${V(String(r))}" placeholder="Leave blank to keep the range" />
    </label>
  `}function P(e){let t=I(e),n=R(e),r=e.mode===`view`,i=e.mode===`bid`;if(!t)return`<div class="outcome muted-card"><p>Select the options above to see an example ballpark.</p></div>`;let a=B(e);return r?`
      <section class="proposal">
        <h2>Example proposal</h2>
        <ul class="lines">${a.map(e=>`<li><span>${V(e.label)}</span><strong>${V(e.value)}</strong></li>`).join(``)}</ul>
        <p class="proposal-total">${V(n)}</p>
        <p class="fine">View-only share — editing is locked. Example prices, not a contract.</p>
      </section>
    `:i?`
      <section class="outcome">
        <div class="range-card">
          <p class="eyebrow">Package total (example)</p>
          <p class="range-figure">${V(n)}</p>
          <ul class="lines">${a.map(e=>`<li><span>${V(e.label)}</span><strong>${V(e.value)}</strong></li>`).join(``)}</ul>
        </div>
        <p class="hint">Share opens a locked preview with this configuration in the URL (and a copy stays in this browser).</p>
        <button type="button" class="btn btn-copper" data-action="share-preview">Share preview with contractor</button>
      </section>
    `:e.qualify.yes===!1?`
      <section class="outcome">
        <div class="range-card">
          <p class="eyebrow">Example ballpark</p>
          <p class="range-figure">${V(n)}</p>
        </div>
        <div class="qualify-box">
          <p>No problem. These numbers are only a starting point — we can reshape the package.</p>
          <a class="btn btn-ghost" href="#/home" data-action="go-home">Browse another category</a>
        </div>
      </section>
    `:`
    <section class="outcome">
      <div class="range-card">
        <p class="eyebrow">Example ballpark</p>
        <p class="range-figure">${V(n)}</p>
        <ul class="lines">${a.map(e=>`<li><span>${V(e.label)}</span><strong>${V(e.value)}</strong></li>`).join(``)}</ul>
        ${e.route===`network`?`<p class="fine">A firm quote needs a site walk${e.network.plansName?` plus the plans you noted`:` — send plans if you have them`}.</p>`:``}
      </div>
      <div class="qualify-box">
        <p>Is this price something you want to move forward with?</p>
        <div class="yn-btns">
          <button type="button" class="btn btn-copper" data-action="qualify" data-value="yes">Yes — continue</button>
          <button type="button" class="btn btn-ghost" data-action="qualify" data-value="no">Not right now</button>
        </div>
      </div>
    </section>
  `}function F(e,t,n){let r=R(e);return`
    <div class="modal-backdrop" data-action="close-modal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="lead-title" data-modal>
        <button type="button" class="modal-close" data-action="close-modal" aria-label="Close">×</button>
        <p class="eyebrow">Continue with Redwood Electric</p>
        <h2 id="lead-title">How should we reach you?</h2>
        <p class="hint">We’ll only use this if you want to talk about the ${V(z(e))} example (${V(r)}).</p>
        <form class="lead-form" data-action="lead-submit">
          <label>Name
            <input name="name" required autocomplete="name" value="${V(t.name)}" />
          </label>
          <label>Email
            <input name="email" type="email" required autocomplete="email" value="${V(t.email)}" />
          </label>
          <label>Phone
            <input name="phone" type="tel" required autocomplete="tel" value="${V(t.phone)}" />
          </label>
          <label>Optional note
            <textarea name="note" rows="3" placeholder="Gate code, preferred days, anything we should know">${V(t.note)}</textarea>
          </label>
          ${n?`<div class="lead-done">
                  <p>Your email app should be opening a message to <strong>${d}</strong>.</p>
                  <p class="fine">If nothing opened, email that address and paste your selections. This draft does not send mail by itself.</p>
                </div>`:`<button type="submit" class="btn btn-copper">Open email to Redwood Electric</button>
                 <p class="fine">Opens a prefilled <code>mailto:</code> to ${d}. A real form backend (Formspree, etc.) can replace this later.</p>`}
        </form>
      </div>
    </div>
  `}function I(e){return e.route===`cameras`?!!e.cameras.packageId:e.route===`theater`?!!e.theater.packageId:e.route===`network`?e.network.rack===!0||e.network.mesh===!0:e.route===`blinds`&&!!(e.blinds.type&&e.blinds.count)}function L(e,t){let n=R(t),r=t.theater.packageId?v(T(t.theater)):`—`;e.querySelectorAll(`.total-figure`).forEach(e=>{e.textContent=r}),e.querySelectorAll(`.range-figure, .proposal-total`).forEach(e=>{n&&(e.textContent=n)});let i=B(t);e.querySelectorAll(`ul.lines`).forEach(e=>{e.innerHTML=i.map(e=>`<li><span>${V(e.label)}</span><strong>${V(e.value)}</strong></li>`).join(``)})}function R(e){return e.route===`cameras`?k(E(e.cameras)):e.route===`theater`?v(T(e.theater)):e.route===`network`?k(D(e.network)):e.route===`blinds`?k(O(e.blinds)):``}function z(e){return b(e.route)?.title||`package`}function B(e){if(e.route===`cameras`){let t=x(e.cameras.packageId);return t?[{label:t.name,value:`${t.cameras} cameras · ${k(E(e.cameras))}`}]:[]}if(e.route===`theater`)return w(e.theater).map(e=>({label:e.name,value:v(e.price)}));if(e.route===`network`){let t=[];e.network.rack&&t.push({label:`Data rack`,value:`Yes`}),e.network.mesh&&t.push({label:`Whole-home coverage`,value:`Yes`}),e.network.plansName&&t.push({label:`Plans`,value:`Customer has plans to send`});let n=D(e.network);return n&&t.push({label:`Example range`,value:k(n)}),t}if(e.route===`blinds`){let t=O(e.blinds);return[{label:`Type`,value:t?.type||e.blinds.type},{label:`Windows`,value:String(e.blinds.count)},{label:`Size`,value:e.blinds.size},{label:`Example range`,value:k(t)}]}return[]}function V(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function H(e){let t=[`Category: ${b(e.route)?.title||e.route}`,`Site mode: ${e.mode}`,``];if(e.route===`cameras`){let n=x(e.cameras.packageId),r=E(e.cameras);t.push(`Package: ${n?.name||`not selected`}`),n&&t.push(`Cameras (example): ${n.cameras}`),r&&t.push(`Example ballpark: ${k(r)}`)}if(e.route===`theater`){let n=w(e.theater);n.length||t.push(`No theater package selected.`);for(let e of n)t.push(`• ${e.name} (${e.detail}) — ${v(e.price)} example`);n.length&&t.push(`Example total: ${v(T(e.theater))}`)}if(e.route===`network`){t.push(`Data rack: ${U(e.network.rack)}`),t.push(`Whole-home / mesh coverage: ${U(e.network.mesh)}`),e.network.plansName?t.push(`Customer has plans to send: ${e.network.plansName}`):t.push(`No plans uploaded in the draft form.`);let n=D(e.network);n&&t.push(`Example ballpark: ${k(n)}`),t.push(`Note: a firm quote needs a site walk and (if available) floor plans.`)}if(e.route===`blinds`){let n=O(e.blinds);t.push(`Shade type: ${e.blinds.type||`not selected`}`),t.push(`Approx. windows: ${e.blinds.count}`),t.push(`Typical size: ${e.blinds.size}`),n&&t.push(`Example ballpark: ${k(n)}`)}return t.push(``),t.push(`These are draft / example prices from the Redwood Electric website — not a contract.`),t.join(`
`)}function U(e){return e===!0?`Yes`:e===!1?`No`:`Not answered`}function de({name:e,email:t,phone:n,note:r,state:i}){let a=`Redwood Electric inquiry — ${b(i.route)?.title||`website`} (draft)`,o=[`New inquiry from the draft Redwood Electric site.`,``,`Name: ${e}`,`Email: ${t}`,`Phone: ${n}`,`Note: ${r||`(none)`}`,``,H(i)].join(`
`);return`mailto:${d}?subject=${encodeURIComponent(a)}&body=${encodeURIComponent(o)}`}var W=document.querySelector(`#app`),G=n(),K={name:``,email:``,phone:``,note:``},q=!1,J=!1,Y=0;fe(),Z(),window.addEventListener(`hashchange`,pe),W.addEventListener(`click`,he),W.addEventListener(`input`,ge),W.addEventListener(`change`,$),W.addEventListener(`submit`,_e);function fe(){let{path:e,params:t}=i();G.route=a(e),(t.get(`mode`)===`view`||t.toString())&&o(G,t),location.hash||u(G.route,new URLSearchParams,!0)}function pe(){let{path:e,params:t}=i(),n=a(e);if(t.get(`mode`)===`view`){G=o(me(),t),G.route=n,q=!1,J=!1,Z();return}G.mode===`view`&&t.get(`mode`)!==`view`&&(G.mode=`customer`),n!==G.route&&(G.route=n,G.qualify.yes=null,q=!1,J=!1),X(),Z()}function me(){let e={...n(),mode:`view`};return e.qualify={yes:null},e}function X(){r(G)}function Z(){W.innerHTML=ne(G),q&&G.mode===`customer`&&(W.insertAdjacentHTML(`beforeend`,F(G,K,J)),W.querySelector(`.lead-form input`)?.focus())}function Q(e){G.toast=e,Z(),clearTimeout(Y),Y=window.setTimeout(()=>{G.toast=``,Z()},3200)}function he(e){let t=e.target.closest(`[data-action="close-modal"]`);if(t&&!e.target.closest(`[data-modal]`)){q=!1,J=!1,Z();return}if(t&&e.target.matches(`.modal-close, [data-action="close-modal"]`)&&!e.target.matches(`.modal-backdrop`)){q=!1,J=!1,Z();return}let n=e.target.closest(`[data-action]`);if(!n)return;let r=n.dataset.action;if(r===`go-home`){e.preventDefault(),G.route=`home`,G.qualify.yes=null,q=!1,u(`home`,new URLSearchParams),X(),Z();return}if(r===`go-cat`){e.preventDefault(),G.route=n.dataset.cat,G.qualify.yes=null,q=!1,u(G.route,new URLSearchParams),X(),Z();return}if(r===`set-mode`){G.mode=n.dataset.mode,G.qualify.yes=null,q=!1,X(),Z();return}if(r===`camera-pkg`){G.cameras.packageId=n.dataset.id,G.qualify.yes=null,X(),Z();return}if(r===`theater-pkg`){G.theater.packageId=n.dataset.id,delete G.theater.overrides.pkg,G.qualify.yes=null,X(),Z();return}if(r===`theater-addon`){let e=n.dataset.id,t=G.theater.addons.includes(e);G.theater.addons=t?G.theater.addons.filter(t=>t!==e):[...G.theater.addons,e],X(),Z();return}if(r===`network-rack`){G.network.rack=n.dataset.value===`yes`,G.qualify.yes=null,X(),Z();return}if(r===`network-mesh`){G.network.mesh=n.dataset.value===`yes`,G.qualify.yes=null,X(),Z();return}if(r===`blinds-type`){G.blinds.type=n.dataset.id,G.qualify.yes=null,X(),Z();return}if(r===`blinds-count`){let e=G.blinds.count+Number(n.dataset.delta);G.blinds.count=Math.min(40,Math.max(1,e)),X(),Z();return}if(r===`blinds-size`){G.blinds.size=n.dataset.id,X(),Z();return}if(r===`qualify`){G.qualify.yes=n.dataset.value===`yes`,q=G.qualify.yes===!0,J=!1,X(),Z();return}if(r===`share-preview`){e.preventDefault();let t=l(G);ve(t).then(()=>Q(`Preview link copied — opening view-only`)).catch(()=>Q(`Could not copy — opening view-only`)),location.hash=t.slice(t.indexOf(`#`));return}}function ge(e){let t=e.target,n=t.dataset.action;if(n===`override-theater-pkg`){G.theater.overrides.pkg=t.value===``?0:Number(t.value),X(),L(W,G);return}if(n===`override-addon`){G.theater.overrides[t.dataset.id]=t.value===``?0:Number(t.value),X(),L(W,G);return}n===`override-quote`&&(G[t.dataset.field].quoteOverride=t.value,X(),L(W,G))}function $(e){let t=e.target;if(t.dataset.action===`plans-file`){let e=t.files?.[0];G.network.plansName=e?e.name:``,X(),Z()}}function _e(e){let t=e.target;if(!t.matches(`.lead-form`))return;e.preventDefault();let n=new FormData(t);if(K={name:String(n.get(`name`)||``).trim(),email:String(n.get(`email`)||``).trim(),phone:String(n.get(`phone`)||``).trim(),note:String(n.get(`note`)||``).trim()},!K.name||!K.email||!K.phone)return;let r=de({...K,state:G});window.location.href=r,J=!0,Z()}async function ve(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}let t=document.createElement(`textarea`);t.value=e,document.body.append(t),t.select(),document.execCommand(`copy`),t.remove()}document.addEventListener(`keydown`,e=>{e.key===`Escape`&&q&&(q=!1,J=!1,Z())});