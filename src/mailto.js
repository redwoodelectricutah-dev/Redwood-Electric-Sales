import {
  CONTACT_EMAIL,
  categoryById,
  cameraPackage,
  formatRange,
  cameraRange,
  networkRange,
  blindsRange,
  theaterLineItems,
  theaterTotal,
  money,
} from './catalog.js'

export function inquirySummary(state) {
  const cat = categoryById(state.route)
  const lines = [
    `Category: ${cat?.title || state.route}`,
    `Site mode: ${state.mode}`,
    '',
  ]

  if (state.route === 'cameras') {
    const pkg = cameraPackage(state.cameras.packageId)
    const range = cameraRange(state.cameras)
    lines.push(`Package: ${pkg?.name || 'not selected'}`)
    if (pkg) lines.push(`Cameras (example): ${pkg.cameras}`)
    if (range) lines.push(`Example ballpark: ${formatRange(range)}`)
  }

  if (state.route === 'theater') {
    const items = theaterLineItems(state.theater)
    if (!items.length) lines.push('No theater package selected.')
    for (const item of items) {
      lines.push(`• ${item.name} (${item.detail}) — ${money(item.price)} example`)
    }
    if (items.length) lines.push(`Example total: ${money(theaterTotal(state.theater))}`)
  }

  if (state.route === 'network') {
    lines.push(`Data rack: ${yesNo(state.network.rack)}`)
    lines.push(`Whole-home / mesh coverage: ${yesNo(state.network.mesh)}`)
    if (state.network.plansName) {
      lines.push(`Customer has plans to send: ${state.network.plansName}`)
    } else {
      lines.push('No plans uploaded in the draft form.')
    }
    const range = networkRange(state.network)
    if (range) lines.push(`Example ballpark: ${formatRange(range)}`)
    lines.push('Note: a firm quote needs a site walk and (if available) floor plans.')
  }

  if (state.route === 'blinds') {
    const range = blindsRange(state.blinds)
    lines.push(`Shade type: ${state.blinds.type || 'not selected'}`)
    lines.push(`Approx. windows: ${state.blinds.count}`)
    lines.push(`Typical size: ${state.blinds.size}`)
    if (range) lines.push(`Example ballpark: ${formatRange(range)}`)
  }

  lines.push('')
  lines.push('These are draft / example prices from the Redwood Electric website — not a contract.')
  return lines.join('\n')
}

function yesNo(value) {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return 'Not answered'
}

export function mailtoHref({ name, email, phone, note, state }) {
  const cat = categoryById(state.route)
  const subject = `Redwood Electric inquiry — ${cat?.title || 'website'} (draft)`
  const body = [
    'New inquiry from the draft Redwood Electric site.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Note: ${note || '(none)'}`,
    '',
    inquirySummary(state),
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
