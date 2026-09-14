const STORAGE_KEY = 'redwood-electric-draft-v1'

export function defaultState() {
  return {
    mode: 'customer',
    route: 'home',
    cameras: { packageId: null, quoteOverride: '' },
    theater: { packageId: null, addons: [], overrides: {} },
    network: { rack: null, mesh: null, plansName: '', quoteOverride: '' },
    blinds: { type: null, count: 4, size: 'standard', quoteOverride: '' },
    qualify: { yes: null },
    toast: '',
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const saved = JSON.parse(raw)
    return {
      ...defaultState(),
      ...saved,
      cameras: { ...defaultState().cameras, ...saved.cameras },
      theater: { ...defaultState().theater, ...saved.theater, addons: saved.theater?.addons || [] },
      network: { ...defaultState().network, ...saved.network },
      blinds: { ...defaultState().blinds, ...saved.blinds },
      qualify: { yes: null },
    }
  } catch {
    return defaultState()
  }
}

export function saveState(state) {
  if (state.mode === 'view') return
  const { toast, ...rest } = state
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rest))
}

export function parseLocation() {
  const raw = (location.hash || '#/').slice(1)
  const [pathPart, queryPart] = raw.split('?')
  const path = pathPart.replace(/^\//, '') || 'home'
  const params = new URLSearchParams(queryPart || '')
  return { path, params }
}

export function routeFromPath(path) {
  if (['home', 'cameras', 'theater', 'network', 'blinds'].includes(path)) return path
  return 'home'
}

export function applyShareParams(state, params) {
  const mode = params.get('mode')
  if (mode === 'view' || mode === 'bid' || mode === 'customer') state.mode = mode

  const cat = params.get('cat')
  if (cat) state.route = routeFromPath(cat)

  if (state.route === 'cameras') {
    state.cameras.packageId = params.get('pkg') || state.cameras.packageId
    if (params.has('op')) state.cameras.quoteOverride = params.get('op')
  }

  if (state.route === 'theater') {
    state.theater.packageId = params.get('pkg') || state.theater.packageId
    const addons = (params.get('a') || '').split(',').filter(Boolean)
    if (params.has('a')) state.theater.addons = addons
    if (params.has('op')) state.theater.overrides.pkg = Number(params.get('op'))
    const oa = params.get('oa') || ''
    if (oa) {
      for (const pair of oa.split(',')) {
        const [id, price] = pair.split(':')
        if (id && price) state.theater.overrides[id] = Number(price)
      }
    }
  }

  if (state.route === 'network') {
    if (params.has('rack')) state.network.rack = params.get('rack') === '1'
    if (params.has('mesh')) state.network.mesh = params.get('mesh') === '1'
    if (params.has('plans')) state.network.plansName = params.get('plans') === '1' ? 'plans-on-file.pdf' : ''
    if (params.has('op')) state.network.quoteOverride = params.get('op')
  }

  if (state.route === 'blinds') {
    if (params.has('type')) state.blinds.type = params.get('type')
    if (params.has('n')) state.blinds.count = Math.max(1, Number(params.get('n')) || 1)
    if (params.has('size')) state.blinds.size = params.get('size')
    if (params.has('op')) state.blinds.quoteOverride = params.get('op')
  }

  return state
}

export function shareParams(state) {
  const params = new URLSearchParams()
  params.set('mode', 'view')
  params.set('cat', state.route)

  if (state.route === 'cameras') {
    if (state.cameras.packageId) params.set('pkg', state.cameras.packageId)
    if (state.cameras.quoteOverride) params.set('op', String(state.cameras.quoteOverride))
  }

  if (state.route === 'theater') {
    if (state.theater.packageId) params.set('pkg', state.theater.packageId)
    if (state.theater.addons.length) params.set('a', state.theater.addons.join(','))
    if (state.theater.overrides.pkg) params.set('op', String(state.theater.overrides.pkg))
    const oa = Object.entries(state.theater.overrides)
      .filter(([id, price]) => id !== 'pkg' && price)
      .map(([id, price]) => `${id}:${price}`)
    if (oa.length) params.set('oa', oa.join(','))
  }

  if (state.route === 'network') {
    if (state.network.rack === true) params.set('rack', '1')
    if (state.network.rack === false) params.set('rack', '0')
    if (state.network.mesh === true) params.set('mesh', '1')
    if (state.network.mesh === false) params.set('mesh', '0')
    if (state.network.plansName) params.set('plans', '1')
    if (state.network.quoteOverride) params.set('op', String(state.network.quoteOverride))
  }

  if (state.route === 'blinds') {
    if (state.blinds.type) params.set('type', state.blinds.type)
    params.set('n', String(state.blinds.count))
    if (state.blinds.size) params.set('size', state.blinds.size)
    if (state.blinds.quoteOverride) params.set('op', String(state.blinds.quoteOverride))
  }

  return params
}

export function shareHash(state) {
  const path = state.route === 'home' ? 'home' : state.route
  return `#/${path}?${shareParams(state).toString()}`
}

export function shareUrl(state) {
  return `${location.origin}${location.pathname}${shareHash(state)}`
}

export function writeHash(route, params, replace = false) {
  let hash = `#/${route}`
  const qs = params instanceof URLSearchParams ? params.toString() : ''
  if (qs) hash += `?${qs}`
  if (replace) history.replaceState(null, '', hash)
  else location.hash = hash
}
