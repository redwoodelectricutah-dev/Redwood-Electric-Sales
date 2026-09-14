import './style.css'
import { loadState, saveState, parseLocation, routeFromPath, applyShareParams, shareUrl, writeHash } from './state.js'
import { renderApp, renderLeadModal, paintLivePrices } from './views.js'
import { mailtoHref } from './mailto.js'

const app = document.querySelector('#app')

let state = loadState()
let leadForm = { name: '', email: '', phone: '', note: '' }
let showLead = false
let openedEmail = false
let toastTimer = 0

bootFromUrl()
render()
window.addEventListener('hashchange', onHashChange)
app.addEventListener('click', onClick)
app.addEventListener('input', onInput)
app.addEventListener('change', onChange)
app.addEventListener('submit', onSubmit)

function bootFromUrl() {
  const { path, params } = parseLocation()
  state.route = routeFromPath(path)
  if (params.get('mode') === 'view' || params.toString()) {
    applyShareParams(state, params)
  }
  if (!location.hash) writeHash(state.route, new URLSearchParams(), true)
}

function onHashChange() {
  const { path, params } = parseLocation()
  const next = routeFromPath(path)
  if (params.get('mode') === 'view') {
    state = applyShareParams(loadViewBase(), params)
    state.route = next
    showLead = false
    openedEmail = false
    render()
    return
  }
  if (state.mode === 'view' && params.get('mode') !== 'view') {
    state.mode = 'customer'
  }
  if (next !== state.route) {
    state.route = next
    state.qualify.yes = null
    showLead = false
    openedEmail = false
  }
  persist()
  render()
}

function loadViewBase() {
  const next = { ...loadState(), mode: 'view' }
  next.qualify = { yes: null }
  return next
}

function persist() {
  saveState(state)
}

function render() {
  app.innerHTML = renderApp(state)
  if (showLead && state.mode === 'customer') {
    app.insertAdjacentHTML('beforeend', renderLeadModal(state, leadForm, openedEmail))
    const first = app.querySelector('.lead-form input')
    first?.focus()
  }
}

function toast(message) {
  state.toast = message
  render()
  clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    state.toast = ''
    render()
  }, 3200)
}

function onClick(event) {
  const close = event.target.closest('[data-action="close-modal"]')
  if (close && !event.target.closest('[data-modal]')) {
    showLead = false
    openedEmail = false
    render()
    return
  }
  if (close && event.target.matches('.modal-close, [data-action="close-modal"]') && !event.target.matches('.modal-backdrop')) {
    showLead = false
    openedEmail = false
    render()
    return
  }

  const el = event.target.closest('[data-action]')
  if (!el) return
  const action = el.dataset.action

  if (action === 'go-home') {
    event.preventDefault()
    state.route = 'home'
    state.qualify.yes = null
    showLead = false
    writeHash('home', new URLSearchParams())
    persist()
    render()
    return
  }

  if (action === 'go-cat') {
    event.preventDefault()
    state.route = el.dataset.cat
    state.qualify.yes = null
    showLead = false
    writeHash(state.route, new URLSearchParams())
    persist()
    render()
    return
  }

  if (action === 'set-mode') {
    state.mode = el.dataset.mode
    state.qualify.yes = null
    showLead = false
    persist()
    render()
    return
  }

  if (action === 'camera-pkg') {
    state.cameras.packageId = el.dataset.id
    state.qualify.yes = null
    persist()
    render()
    return
  }

  if (action === 'theater-pkg') {
    state.theater.packageId = el.dataset.id
    delete state.theater.overrides.pkg
    state.qualify.yes = null
    persist()
    render()
    return
  }

  if (action === 'theater-addon') {
    const id = el.dataset.id
    const has = state.theater.addons.includes(id)
    state.theater.addons = has
      ? state.theater.addons.filter((item) => item !== id)
      : [...state.theater.addons, id]
    persist()
    render()
    return
  }

  if (action === 'network-rack') {
    state.network.rack = el.dataset.value === 'yes'
    state.qualify.yes = null
    persist()
    render()
    return
  }

  if (action === 'network-mesh') {
    state.network.mesh = el.dataset.value === 'yes'
    state.qualify.yes = null
    persist()
    render()
    return
  }

  if (action === 'blinds-type') {
    state.blinds.type = el.dataset.id
    state.qualify.yes = null
    persist()
    render()
    return
  }

  if (action === 'blinds-count') {
    const next = state.blinds.count + Number(el.dataset.delta)
    state.blinds.count = Math.min(40, Math.max(1, next))
    persist()
    render()
    return
  }

  if (action === 'blinds-size') {
    state.blinds.size = el.dataset.id
    persist()
    render()
    return
  }

  if (action === 'qualify') {
    state.qualify.yes = el.dataset.value === 'yes'
    showLead = state.qualify.yes === true
    openedEmail = false
    persist()
    render()
    return
  }

  if (action === 'share-preview') {
    event.preventDefault()
    const url = shareUrl(state)
    copyText(url)
      .then(() => toast('Preview link copied — opening view-only'))
      .catch(() => toast('Could not copy — opening view-only'))
    location.hash = url.slice(url.indexOf('#'))
    return
  }
}

function onInput(event) {
  const el = event.target
  const action = el.dataset.action
  if (action === 'override-theater-pkg') {
    state.theater.overrides.pkg = el.value === '' ? 0 : Number(el.value)
    persist()
    paintLivePrices(app, state)
    return
  }
  if (action === 'override-addon') {
    state.theater.overrides[el.dataset.id] = el.value === '' ? 0 : Number(el.value)
    persist()
    paintLivePrices(app, state)
    return
  }
  if (action === 'override-quote') {
    state[el.dataset.field].quoteOverride = el.value
    persist()
    paintLivePrices(app, state)
  }
}

function onChange(event) {
  const el = event.target
  if (el.dataset.action === 'plans-file') {
    const file = el.files?.[0]
    state.network.plansName = file ? file.name : ''
    persist()
    render()
  }
}

function onSubmit(event) {
  const form = event.target
  if (!form.matches('.lead-form')) return
  event.preventDefault()
  const data = new FormData(form)
  leadForm = {
    name: String(data.get('name') || '').trim(),
    email: String(data.get('email') || '').trim(),
    phone: String(data.get('phone') || '').trim(),
    note: String(data.get('note') || '').trim(),
  }
  if (!leadForm.name || !leadForm.email || !leadForm.phone) return
  const href = mailtoHref({ ...leadForm, state })
  window.location.href = href
  openedEmail = true
  render()
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const area = document.createElement('textarea')
  area.value = text
  document.body.append(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && showLead) {
    showLead = false
    openedEmail = false
    render()
  }
})
