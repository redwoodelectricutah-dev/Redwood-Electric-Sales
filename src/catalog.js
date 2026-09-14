/**
 * Placeholder catalog for the Redwood Electric draft site.
 * Tweak copy and example prices here — nothing is a real quote.
 */

export const CONTACT_EMAIL = 'redwoodelectricutah@gmail.com'

export const CATEGORIES = [
  {
    id: 'cameras',
    title: 'Security cameras',
    blurb: 'Outdoor and indoor coverage with a simple example package.',
    photoLabel: 'Photo later: exterior camera on a Utah County home',
  },
  {
    id: 'theater',
    title: 'Home theaters',
    blurb: 'Packages, add-ons, and a running example total.',
    photoLabel: 'Photo later: finished media room',
  },
  {
    id: 'network',
    title: 'Data rack & internet',
    blurb: 'Rack, whole-home Wi‑Fi, or both — in plain language.',
    photoLabel: 'Photo later: structured media rack',
  },
  {
    id: 'blinds',
    title: 'Power blinds',
    blurb: 'Blackout or light-filtering, sized by window count.',
    photoLabel: 'Photo later: motorized living-room shades',
  },
]

export const CAMERA_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    cameras: 4,
    detail: 'Front, back, and two coverage spots. Example NVR + app access.',
    low: 2800,
    high: 4200,
  },
  {
    id: 'whole',
    name: 'Whole home',
    cameras: 8,
    detail: 'Typical two-story + driveway coverage. Example 4K mix.',
    low: 5500,
    high: 8500,
  },
  {
    id: 'property',
    name: 'Larger property',
    cameras: 12,
    detail: 'Shop, acreage, or extra buildings. Site walk usually needed.',
    low: 9000,
    high: 14000,
  },
]

export const THEATER_PACKAGES = [
  {
    id: 'bronze',
    name: 'Bronze',
    spec: '5.1 · no projector',
    detail: 'TV-based surround. Front left / center / right, surrounds, and a sub.',
    price: 9000,
  },
  {
    id: 'silver',
    name: 'Silver',
    spec: '5.2.4 · with projector',
    detail: 'Projection screen, two subs, and four Atmos height speakers.',
    price: 16000,
    projector: true,
  },
  {
    id: 'gold',
    name: 'Gold',
    spec: '7.2.4 · with projector',
    detail: 'Wider surrounds, two subs, Atmos heights, projector + screen.',
    price: 20000,
    projector: true,
  },
]

export const THEATER_ADDONS = [
  {
    id: 'led',
    name: 'LED strip in pillars',
    detail: 'Warm accent in the room columns.',
    price: 450,
  },
  {
    id: 'sconce',
    name: 'Sconce lighting',
    detail: 'Wall sconces for walk-in light, dimmable.',
    price: 650,
  },
  {
    id: 'backlight',
    name: 'Backlight behind TV / screen',
    detail: 'Bias lighting so the picture is easier on the eyes.',
    price: 350,
  },
]

export const BLIND_TYPES = [
  {
    id: 'blackout',
    name: 'Blackout',
    detail: 'Sleep rooms, media rooms, west-facing glare.',
    perWindow: { small: 320, standard: 420, large: 560 },
  },
  {
    id: 'filter',
    name: 'Light-filtering',
    detail: 'Daytime privacy without a cave. Living rooms and kitchens.',
    perWindow: { small: 260, standard: 350, large: 480 },
  },
]

export const BLIND_SIZES = [
  { id: 'small', name: 'Small', hint: '≈ under 36″ wide' },
  { id: 'standard', name: 'Standard', hint: '≈ 36–60″' },
  { id: 'large', name: 'Large / patio', hint: '≈ over 60″ or tall' },
]

export const NETWORK_RANGES = {
  rack: { low: 2500, high: 4500, label: 'Data rack + patching (example)' },
  mesh: { low: 1200, high: 2800, label: 'Whole-home Wi‑Fi (example)' },
  both: { low: 3800, high: 7200, label: 'Rack + whole-home Wi‑Fi (example)' },
}

export function money(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function moneyRange(low, high) {
  return `${money(low)}–${money(high)}`
}

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id)
}

export function cameraPackage(id) {
  return CAMERA_PACKAGES.find((p) => p.id === id)
}

export function theaterPackage(id) {
  return THEATER_PACKAGES.find((p) => p.id === id)
}

export function theaterAddon(id) {
  return THEATER_ADDONS.find((a) => a.id === id)
}

export function blindType(id) {
  return BLIND_TYPES.find((t) => t.id === id)
}

export function theaterLineItems(theater) {
  const pkg = theaterPackage(theater.packageId)
  if (!pkg) return []
  const items = [
    {
      id: 'pkg',
      name: `${pkg.name} theater`,
      detail: pkg.spec,
      price: Number(theater.overrides?.pkg ?? pkg.price),
    },
  ]
  for (const id of theater.addons) {
    const addon = theaterAddon(id)
    if (!addon) continue
    items.push({
      id,
      name: addon.name,
      detail: addon.detail,
      price: Number(theater.overrides?.[id] ?? addon.price),
    })
  }
  return items
}

export function theaterTotal(theater) {
  return theaterLineItems(theater).reduce((sum, item) => sum + item.price, 0)
}

export function cameraRange(cameras) {
  const pkg = cameraPackage(cameras.packageId)
  if (!pkg) return null
  if (cameras.quoteOverride) {
    const n = Number(cameras.quoteOverride)
    return { low: n, high: n, single: n, label: pkg.name }
  }
  return { low: pkg.low, high: pkg.high, label: pkg.name }
}

export function networkRange(network) {
  const rack = network.rack === true
  const mesh = network.mesh === true
  if (!rack && !mesh) return null
  const key = rack && mesh ? 'both' : rack ? 'rack' : 'mesh'
  const base = NETWORK_RANGES[key]
  if (network.quoteOverride) {
    const n = Number(network.quoteOverride)
    return { ...base, low: n, high: n, single: n }
  }
  return { ...base }
}

export function blindsRange(blinds) {
  const type = blindType(blinds.type)
  if (!type || !blinds.count) return null
  const size = blinds.size || 'standard'
  const each = type.perWindow[size]
  const low = Math.round(each * blinds.count * 0.9)
  const high = Math.round(each * blinds.count * 1.15)
  if (blinds.quoteOverride) {
    const n = Number(blinds.quoteOverride)
    return { low: n, high: n, single: n, each, type: type.name, size, count: blinds.count }
  }
  return { low, high, each, type: type.name, size, count: blinds.count }
}

export function formatRange(range) {
  if (!range) return ''
  if (range.single) return money(range.single)
  return moneyRange(range.low, range.high)
}
