import {
  CATEGORIES,
  CAMERA_PACKAGES,
  THEATER_PACKAGES,
  THEATER_ADDONS,
  BLIND_TYPES,
  BLIND_SIZES,
  CONTACT_EMAIL,
  categoryById,
  cameraPackage,
  theaterPackage,
  money,
  formatRange,
  cameraRange,
  networkRange,
  blindsRange,
  theaterLineItems,
  theaterTotal,
} from './catalog.js'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`

export function renderApp(state) {
  return `
    ${renderHeader(state)}
    <main class="main">
      ${state.route === 'home' ? renderHome(state) : renderCategory(state)}
    </main>
    ${renderFooter()}
    ${state.toast ? `<div class="toast" role="status">${escapeHtml(state.toast)}</div>` : ''}
  `
}

function renderHeader(state) {
  const locked = state.mode === 'view'
  return `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="#/home" data-action="go-home">
          <span class="brand-mark" aria-hidden="true">
            <img class="brand-logo" src="${LOGO_SRC}" alt="" width="1280" height="1024" />
          </span>
          <span class="brand-text">
            <span class="brand-name">Redwood Electric</span>
            <span class="brand-sub">Utah County · electrical &amp; low-voltage</span>
          </span>
        </a>
        ${
          locked
            ? `<span class="view-pill">View-only preview</span>`
            : `<div class="mode-switch" role="group" aria-label="Site mode">
                <button type="button" class="${state.mode === 'customer' ? 'is-on' : ''}" data-action="set-mode" data-mode="customer">Customer</button>
                <button type="button" class="${state.mode === 'bid' ? 'is-on' : ''}" data-action="set-mode" data-mode="bid">Bid / Sales</button>
              </div>`
        }
      </div>
      <p class="draft-banner">ROUGH DRAFT — example prices only, not a quote</p>
    </header>
  `
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p>Redwood Electric · Utah County, Utah</p>
      <p class="fine">${CONTACT_EMAIL} · This page is a first-pass sales draft. Photos and firm prices come later.</p>
    </footer>
  `
}

function renderHome(state) {
  const bid = state.mode === 'bid'
  return `
    <section class="home">
      <div class="home-intro">
        <p class="eyebrow">Draft estimator</p>
        <h1>${bid ? 'Build a package James can share.' : 'See an example ballpark, then decide if you want to talk.'}</h1>
        <p class="lede">${
          bid
            ? 'Pick a category, adjust example prices if you want, then generate a view-only preview link for a homeowner or GC.'
            : 'Four common jobs. Tap one, configure a simple package, and we’ll ask if the example range is something you want to move forward with before we take your name.'
        }</p>
      </div>
      <div class="tile-grid">
        ${CATEGORIES.map((cat) => renderTile(cat)).join('')}
      </div>
    </section>
  `
}

function renderTile(cat) {
  return `
    <a class="tile tile-${cat.id}" href="#/${cat.id}" data-action="go-cat" data-cat="${cat.id}">
      <div class="tile-art" aria-hidden="true">${tileArt(cat.id)}</div>
      <div class="tile-copy">
        <span class="photo-tag">${escapeHtml(cat.photoLabel)}</span>
        <h2>${escapeHtml(cat.title)}</h2>
        <p>${escapeHtml(cat.blurb)}</p>
      </div>
    </a>
  `
}

function tileArt(id) {
  if (id === 'cameras') {
    return `
      <div class="art-house">
        <div class="art-roof"></div>
        <div class="art-wall"></div>
        <span class="art-cam c1"></span>
        <span class="art-cam c2"></span>
        <span class="art-cam c3"></span>
      </div>`
  }
  if (id === 'theater') {
    return `
      <div class="art-cinema">
        <div class="art-screen"></div>
        <div class="art-glow"></div>
        <div class="art-seats"></div>
      </div>`
  }
  if (id === 'network') {
    return `
      <div class="art-rack">
        <span></span><span></span><span></span><span></span>
      </div>`
  }
  return `
    <div class="art-window">
      <div class="art-slat"></div>
      <div class="art-slat"></div>
      <div class="art-slat"></div>
      <div class="art-slat"></div>
    </div>`
}

function renderCategory(state) {
  const cat = categoryById(state.route)
  const locked = state.mode === 'view'
  return `
    <section class="category">
      <nav class="crumb">
        <a href="#/home" data-action="go-home">Home</a>
        <span aria-hidden="true">/</span>
        <span>${escapeHtml(cat.title)}</span>
      </nav>
      <header class="cat-head">
        <div>
          <p class="eyebrow">${locked ? 'Shared preview' : state.mode === 'bid' ? 'Bid / sales' : 'Customer path'}</p>
          <h1>${escapeHtml(cat.title)}</h1>
          <p class="lede">${escapeHtml(cat.blurb)}</p>
        </div>
        ${
          state.mode === 'bid'
            ? `<button type="button" class="btn btn-copper" data-action="share-preview">Share preview</button>`
            : ''
        }
      </header>
      ${state.route === 'cameras' ? renderCameras(state) : ''}
      ${state.route === 'theater' ? renderTheater(state) : ''}
      ${state.route === 'network' ? renderNetwork(state) : ''}
      ${state.route === 'blinds' ? renderBlinds(state) : ''}
      ${renderOutcome(state)}
    </section>
  `
}

function renderCameras(state) {
  const selected = state.cameras.packageId
  const pkg = cameraPackage(selected)
  const locked = state.mode === 'view'
  return `
    <div class="split">
      <div class="visual visual-cameras" data-pkg="${selected || 'none'}">
        <span class="photo-tag">Photo placeholder — house + camera coverage</span>
        ${tileArt('cameras')}
        <p class="visual-caption">${pkg ? `${pkg.cameras} cameras in this example package` : 'Pick a package to preview coverage'}</p>
      </div>
      <div class="stack">
        <h2 class="section-title">Example packages</h2>
        <div class="pkg-list">
          ${CAMERA_PACKAGES.map((p) => {
            const on = selected === p.id
            return `
              <button type="button" class="pkg-card ${on ? 'is-on' : ''}" data-action="camera-pkg" data-id="${p.id}" ${locked ? 'disabled' : ''}>
                <span class="pkg-name">${escapeHtml(p.name)}</span>
                <span class="pkg-spec">${p.cameras} cameras</span>
                <span class="pkg-detail">${escapeHtml(p.detail)}</span>
                <span class="pkg-price">${formatRange({ low: p.low, high: p.high })} <em>example</em></span>
              </button>`
          }).join('')}
        </div>
        ${bidOverride(state, 'cameras', 'Quoted number (optional)')}
      </div>
    </div>
  `
}

function renderTheater(state) {
  const selected = state.theater.packageId
  const pkg = theaterPackage(selected)
  const locked = state.mode === 'view'
  const addons = state.theater.addons.join(' ')
  return `
    <div class="theater-layout">
      <div class="stage" data-pkg="${selected || 'none'}" data-addons="${escapeHtml(addons)}">
        <span class="photo-tag">Photo placeholder — layered theater mock (swap later)</span>
        <div class="stage-room">
          <div class="stage-ceiling"></div>
          <div class="stage-beam"></div>
          <div class="stage-backwall">
            <div class="stage-backlight"></div>
            <div class="stage-screen"><span>${pkg?.projector ? 'Projector screen' : selected ? 'TV' : 'Pick a package'}</span></div>
          </div>
          <div class="stage-pillar left"><div class="led"></div></div>
          <div class="stage-pillar right"><div class="led"></div></div>
          <div class="stage-sconce left"></div>
          <div class="stage-sconce right"></div>
          <div class="stage-speakers ${selected || 'none'}"></div>
          <div class="stage-floor"></div>
        </div>
      </div>

      <div class="stack">
        <h2 class="section-title">Packages</h2>
        <div class="pkg-list pkg-list-3">
          ${THEATER_PACKAGES.map((p) => {
            const on = selected === p.id
            return `
              <button type="button" class="pkg-card ${on ? 'is-on' : ''}" data-action="theater-pkg" data-id="${p.id}" ${locked ? 'disabled' : ''}>
                <span class="pkg-name">${escapeHtml(p.name)}</span>
                <span class="pkg-spec">${escapeHtml(p.spec)}</span>
                <span class="pkg-detail">${escapeHtml(p.detail)}</span>
                <span class="pkg-price">${money(p.price)} <em>example</em></span>
              </button>`
          }).join('')}
        </div>
        ${
          state.mode === 'bid' && selected
            ? `<label class="override">Package price override
                <input type="number" inputmode="numeric" data-action="override-theater-pkg" value="${state.theater.overrides.pkg ?? pkg.price}" />
              </label>`
            : ''
        }

        <h2 class="section-title">Add-ons</h2>
        <p class="hint">One-tap add. They overlay on the room mock above.</p>
        <div class="addon-list">
          ${THEATER_ADDONS.map((a) => {
            const on = state.theater.addons.includes(a.id)
            const price = Number(state.theater.overrides[a.id] ?? a.price)
            return `
              <div class="addon-row ${on ? 'is-on' : ''}">
                <button type="button" class="addon-btn" data-action="theater-addon" data-id="${a.id}" ${locked || !selected ? 'disabled' : ''}>
                  <span class="addon-check" aria-hidden="true">${on ? '✓' : '+'}</span>
                  <span>
                    <strong>${escapeHtml(a.name)}</strong>
                    <small>${escapeHtml(a.detail)}</small>
                  </span>
                  <span class="addon-price">${money(a.price)}</span>
                </button>
                ${
                  state.mode === 'bid'
                    ? `<input type="number" class="addon-override" inputmode="numeric" data-action="override-addon" data-id="${a.id}" value="${price}" ${locked ? 'disabled' : ''} aria-label="${escapeHtml(a.name)} price override" />`
                    : ''
                }
              </div>`
          }).join('')}
        </div>
      </div>
    </div>
    <aside class="total-bar" aria-live="polite">
      <div>
        <p class="eyebrow">Running example total</p>
        <p class="total-figure">${selected ? money(theaterTotal(state.theater)) : '—'}</p>
      </div>
      <p class="fine">Placeholder numbers. Not a quote.</p>
    </aside>
  `
}

function renderNetwork(state) {
  const locked = state.mode === 'view'
  return `
    <div class="split">
      <div class="network-visuals">
        <div class="visual visual-rack ${state.network.rack ? 'is-on' : ''}">
          <span class="photo-tag">Photo placeholder — data rack</span>
          ${tileArt('network')}
          <p class="visual-caption">Structured rack, patch panel, clean power</p>
        </div>
        <div class="visual visual-heat ${state.network.mesh ? 'is-on' : ''}">
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
        ${yesNoRow('network-rack', 'Want a data rack?', 'A closet or garage cabinet where internet, cameras, and AV can live.', state.network.rack, locked)}
        ${yesNoRow('network-mesh', 'Want whole-home coverage?', 'Phones and TVs work in bedrooms, basement, and yard without hunting for signal.', state.network.mesh, locked)}
        <label class="file-field">
          <span>Optional: upload PDF plans</span>
          <input type="file" accept="application/pdf,.pdf" data-action="plans-file" ${locked ? 'disabled' : ''} />
          <small>${
            state.network.plansName
              ? `Noted for the email: ${escapeHtml(state.network.plansName)} (file stays on this device — we do not upload it).`
              : 'Draft only remembers the filename so the email can say you have plans to send.'
          }</small>
        </label>
        ${bidOverride(state, 'network', 'Quoted number (optional)')}
      </div>
    </div>
  `
}

function renderBlinds(state) {
  const locked = state.mode === 'view'
  const type = state.blinds.type
  return `
    <div class="split">
      <div class="visual visual-blinds" data-type="${type || 'none'}">
        <span class="photo-tag">Photo placeholder — ${type === 'blackout' ? 'blackout shades' : type === 'filter' ? 'light-filtering shades' : 'powered window'}</span>
        <div class="blind-window">
          <div class="blind-slats"></div>
        </div>
        <p class="visual-caption">${type ? BLIND_TYPES.find((t) => t.id === type).name : 'Pick a shade type'}</p>
      </div>
      <div class="stack">
        <h2 class="section-title">Shade type</h2>
        <div class="pkg-list">
          ${BLIND_TYPES.map((t) => {
            const on = type === t.id
            return `
              <button type="button" class="pkg-card ${on ? 'is-on' : ''}" data-action="blinds-type" data-id="${t.id}" ${locked ? 'disabled' : ''}>
                <span class="pkg-name">${escapeHtml(t.name)}</span>
                <span class="pkg-detail">${escapeHtml(t.detail)}</span>
              </button>`
          }).join('')}
        </div>
        <h2 class="section-title">About how many windows?</h2>
        <div class="stepper">
          <button type="button" data-action="blinds-count" data-delta="-1" ${locked ? 'disabled' : ''} aria-label="Fewer windows">−</button>
          <span>${state.blinds.count}</span>
          <button type="button" data-action="blinds-count" data-delta="1" ${locked ? 'disabled' : ''} aria-label="More windows">+</button>
        </div>
        <h2 class="section-title">Typical size</h2>
        <div class="chip-row">
          ${BLIND_SIZES.map(
            (s) => `
            <button type="button" class="chip ${state.blinds.size === s.id ? 'is-on' : ''}" data-action="blinds-size" data-id="${s.id}" ${locked ? 'disabled' : ''}>
              ${escapeHtml(s.name)}<small>${escapeHtml(s.hint)}</small>
            </button>`,
          ).join('')}
        </div>
        ${bidOverride(state, 'blinds', 'Quoted number (optional)')}
      </div>
    </div>
  `
}

function yesNoRow(action, title, detail, value, locked) {
  return `
    <div class="yn">
      <div>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(detail)}</p>
      </div>
      <div class="yn-btns">
        <button type="button" class="${value === true ? 'is-on' : ''}" data-action="${action}" data-value="yes" ${locked ? 'disabled' : ''}>Yes</button>
        <button type="button" class="${value === false ? 'is-on' : ''}" data-action="${action}" data-value="no" ${locked ? 'disabled' : ''}>No</button>
      </div>
    </div>
  `
}

function bidOverride(state, field, label) {
  if (state.mode !== 'bid') return ''
  const value = state[field].quoteOverride || ''
  return `
    <label class="override">${escapeHtml(label)}
      <input type="number" inputmode="numeric" data-action="override-quote" data-field="${field}" value="${escapeHtml(String(value))}" placeholder="Leave blank to keep the range" />
    </label>
  `
}

function renderOutcome(state) {
  const ready = isReady(state)
  const range = currentRange(state)
  const locked = state.mode === 'view'
  const bid = state.mode === 'bid'

  if (!ready) {
    return `<div class="outcome muted-card"><p>Select the options above to see an example ballpark.</p></div>`
  }

  const lines = lineSummary(state)

  if (locked) {
    return `
      <section class="proposal">
        <h2>Example proposal</h2>
        <ul class="lines">${lines.map((l) => `<li><span>${escapeHtml(l.label)}</span><strong>${escapeHtml(l.value)}</strong></li>`).join('')}</ul>
        <p class="proposal-total">${escapeHtml(range)}</p>
        <p class="fine">View-only share — editing is locked. Example prices, not a contract.</p>
      </section>
    `
  }

  if (bid) {
    return `
      <section class="outcome">
        <div class="range-card">
          <p class="eyebrow">Package total (example)</p>
          <p class="range-figure">${escapeHtml(range)}</p>
          <ul class="lines">${lines.map((l) => `<li><span>${escapeHtml(l.label)}</span><strong>${escapeHtml(l.value)}</strong></li>`).join('')}</ul>
        </div>
        <p class="hint">Share opens a locked preview with this configuration in the URL (and a copy stays in this browser).</p>
        <button type="button" class="btn btn-copper" data-action="share-preview">Share preview with contractor</button>
      </section>
    `
  }

  if (state.qualify.yes === false) {
    return `
      <section class="outcome">
        <div class="range-card">
          <p class="eyebrow">Example ballpark</p>
          <p class="range-figure">${escapeHtml(range)}</p>
        </div>
        <div class="qualify-box">
          <p>No problem. These numbers are only a starting point — we can reshape the package.</p>
          <a class="btn btn-ghost" href="#/home" data-action="go-home">Browse another category</a>
        </div>
      </section>
    `
  }

  return `
    <section class="outcome">
      <div class="range-card">
        <p class="eyebrow">Example ballpark</p>
        <p class="range-figure">${escapeHtml(range)}</p>
        <ul class="lines">${lines.map((l) => `<li><span>${escapeHtml(l.label)}</span><strong>${escapeHtml(l.value)}</strong></li>`).join('')}</ul>
        ${state.route === 'network' ? `<p class="fine">A firm quote needs a site walk${state.network.plansName ? ' plus the plans you noted' : ' — send plans if you have them'}.</p>` : ''}
      </div>
      <div class="qualify-box">
        <p>Is this price something you want to move forward with?</p>
        <div class="yn-btns">
          <button type="button" class="btn btn-copper" data-action="qualify" data-value="yes">Yes — continue</button>
          <button type="button" class="btn btn-ghost" data-action="qualify" data-value="no">Not right now</button>
        </div>
      </div>
    </section>
  `
}

export function renderLeadModal(state, form, openedEmail) {
  const range = currentRange(state)
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="lead-title" data-modal>
        <button type="button" class="modal-close" data-action="close-modal" aria-label="Close">×</button>
        <p class="eyebrow">Continue with Redwood Electric</p>
        <h2 id="lead-title">How should we reach you?</h2>
        <p class="hint">We’ll only use this if you want to talk about the ${escapeHtml(formatRangeLabel(state))} example (${escapeHtml(range)}).</p>
        <form class="lead-form" data-action="lead-submit">
          <label>Name
            <input name="name" required autocomplete="name" value="${escapeHtml(form.name)}" />
          </label>
          <label>Email
            <input name="email" type="email" required autocomplete="email" value="${escapeHtml(form.email)}" />
          </label>
          <label>Phone
            <input name="phone" type="tel" required autocomplete="tel" value="${escapeHtml(form.phone)}" />
          </label>
          <label>Optional note
            <textarea name="note" rows="3" placeholder="Gate code, preferred days, anything we should know">${escapeHtml(form.note)}</textarea>
          </label>
          ${
            openedEmail
              ? `<div class="lead-done">
                  <p>Your email app should be opening a message to <strong>${CONTACT_EMAIL}</strong>.</p>
                  <p class="fine">If nothing opened, email that address and paste your selections. This draft does not send mail by itself.</p>
                </div>`
              : `<button type="submit" class="btn btn-copper">Open email to Redwood Electric</button>
                 <p class="fine">Opens a prefilled <code>mailto:</code> to ${CONTACT_EMAIL}. A real form backend (Formspree, etc.) can replace this later.</p>`
          }
        </form>
      </div>
    </div>
  `
}

function isReady(state) {
  if (state.route === 'cameras') return Boolean(state.cameras.packageId)
  if (state.route === 'theater') return Boolean(state.theater.packageId)
  if (state.route === 'network') return state.network.rack === true || state.network.mesh === true
  if (state.route === 'blinds') return Boolean(state.blinds.type && state.blinds.count)
  return false
}

export function paintLivePrices(root, state) {
  const range = currentRange(state)
  const theaterText = state.theater.packageId ? money(theaterTotal(state.theater)) : '—'
  root.querySelectorAll('.total-figure').forEach((el) => {
    el.textContent = theaterText
  })
  root.querySelectorAll('.range-figure, .proposal-total').forEach((el) => {
    if (range) el.textContent = range
  })
  const lines = lineSummary(state)
  root.querySelectorAll('ul.lines').forEach((ul) => {
    ul.innerHTML = lines
      .map((item) => `<li><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></li>`)
      .join('')
  })
}

function currentRange(state) {
  if (state.route === 'cameras') return formatRange(cameraRange(state.cameras))
  if (state.route === 'theater') return money(theaterTotal(state.theater))
  if (state.route === 'network') return formatRange(networkRange(state.network))
  if (state.route === 'blinds') return formatRange(blindsRange(state.blinds))
  return ''
}

function formatRangeLabel(state) {
  return categoryById(state.route)?.title || 'package'
}

function lineSummary(state) {
  if (state.route === 'cameras') {
    const pkg = cameraPackage(state.cameras.packageId)
    return pkg ? [{ label: pkg.name, value: `${pkg.cameras} cameras · ${formatRange(cameraRange(state.cameras))}` }] : []
  }
  if (state.route === 'theater') {
    return theaterLineItems(state.theater).map((item) => ({
      label: item.name,
      value: money(item.price),
    }))
  }
  if (state.route === 'network') {
    const rows = []
    if (state.network.rack) rows.push({ label: 'Data rack', value: 'Yes' })
    if (state.network.mesh) rows.push({ label: 'Whole-home coverage', value: 'Yes' })
    if (state.network.plansName) rows.push({ label: 'Plans', value: 'Customer has plans to send' })
    const range = networkRange(state.network)
    if (range) rows.push({ label: 'Example range', value: formatRange(range) })
    return rows
  }
  if (state.route === 'blinds') {
    const range = blindsRange(state.blinds)
    return [
      { label: 'Type', value: range?.type || state.blinds.type },
      { label: 'Windows', value: String(state.blinds.count) },
      { label: 'Size', value: state.blinds.size },
      { label: 'Example range', value: formatRange(range) },
    ]
  }
  return []
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
