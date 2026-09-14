# Redwood Electric — draft site

First-pass, mobile-friendly estimator for **Redwood Electric** (Utah County electrical / low-voltage). James can click through customer and bid/sales flows, then swap photos and firm prices later.

This is a **rough draft**. Every dollar amount is an example placeholder, labeled as such. It is not a quote.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the app at **http://127.0.0.1:43147**.

```bash
npm run build
npm run preview
```

Static files land in `dist/`. Deploy that folder to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3). Hash URLs mean no server rewrite rules are required.

## What you can do

**Home** — Customer vs Bid / Sales toggle and four category tiles:

1. Security cameras
2. Home theaters
3. Data rack & internet systems
4. Power blinds

**Customer mode** — configure a package → see an example ballpark → *“Is this price something you want to move forward with?”* → only **Yes** opens the lead form (name, email, phone required). Submit uses `mailto:redwoodelectricutah@gmail.com` with a prefilled summary. The UI says it **opens email**; it does not pretend a server sent anything.

**Bid / Sales mode** — same categories, editable example prices, line items, and **Share preview**. That copies a view-only link (config encoded in the URL hash) and opens the locked preview. Last working draft is also stored in `localStorage` on this browser.

**View-only** — selections, mock visuals, line items, and total. No editing. No lead form required.

### Category depth

| Category | Draft behavior |
| --- | --- |
| Cameras | Three example packages and a coverage mock |
| Home theaters | Bronze / Silver / Gold, add-on toggles that light up a layered room mock, running total |
| Data rack & internet | Plain-language Yes/No (rack, whole-home coverage), optional PDF filename, reminder that plans are needed for a firm quote |
| Power blinds | Blackout vs light-filtering, window count, size chips, range |

## Tweak these first

- Example prices and copy: [`src/catalog.js`](src/catalog.js)
- Colors / layout: [`src/style.css`](src/style.css)
- Visual mocks are CSS placeholders marked **Photo later / Photo placeholder** so real job photos can drop in

## Draft vs next

**Draft (now)**

- CSS “photo” tiles and theater/rack/window mocks
- Placeholder prices
- `mailto:` lead capture + on-page honesty about what it does
- Share links via hash + `localStorage`

**Next (not built)**

- Real install photos (swap the labeled placeholders)
- Firm prices after James reviews
- A real form backend (Formspree, Netlify Forms, or a small API) instead of `mailto:`
- File upload that actually sends plans (this draft only notes the filename)
- Optional auth if bid mode should stay private

## Brand

Forest header `#1a2e24`, copper `#c45c2a`, warm paper backgrounds. Persistent **ROUGH DRAFT** banner. Safe-area padding for notched phones.
