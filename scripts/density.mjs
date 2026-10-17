// Frame density probe — the half of the layout budget `npm run check` cannot see.
//
// `check` guards the failures that OVERFLOW. This measures the opposite failure: a frame that builds
// green, reads correctly, and leaves half its pane empty. It drives the running dev server in capture
// mode, so it measures exactly the frame the recorder captures, at the 1920×1080 the videos are cut at
// (slide pane 806px wide → zoom 1, so rendered px are design px).
//
// Targets are CLAUDE.md's "Density targets" table. They are targets, not thresholds — a deliberately
// sparse board can sit under them — so a flag is a prompt to look, and the run exits 0 unless
// --strict is passed.
//
//   npm run dev                       # in one terminal
//   npm run density                   # every course
//   npm run density -- problem-framing --strict
//
// Env: BASE (default http://127.0.0.1:5173/), CHROME (a Chromium binary — puppeteer's own download
// is skipped in the cloud sessions, where it lives at /opt/pw-browsers). Screenshots land in
// .tmp/density/<slug>.png — look at them: nothing here sees an edge label sitting on a card.
import { mkdirSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'

const SLIDE_MIN = 0.8 // below this the right half reads empty
const SLIDE_MAX = 0.95 // above this the last line risks clipping in a short review window
const BIND_MIN = 0.85 // the board should reach the pane edge it is limited by
const AREA_MIN = 0.55 // w × h of the board over w × h of the pane

const args = process.argv.slice(2)
const strict = args.includes('--strict')
const only = args.filter((a) => !a.startsWith('--'))
const BASE = process.env.BASE ?? 'http://127.0.0.1:5173/'
const OUT = '.tmp/density'
mkdirSync(OUT, { recursive: true })

// A course is a folder under src/content — the same convention the wav check relies on.
const courses = readdirSync('src/content')
  .filter((d) => statSync(join('src/content', d)).isDirectory())
  .filter((d) => !only.length || only.includes(d))

const defaultChrome = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const executablePath = process.env.CHROME ?? (existsSync(defaultChrome) ? defaultChrome : undefined)
const browser = await puppeteer.launch({ executablePath, args: ['--no-sandbox', '--no-proxy-server'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

const url = (hash) => `${BASE}?capture=1#/${hash}`
const settle = () => new Promise((r) => setTimeout(r, 700)) // fitView animates after mount

/** Everything worth knowing about the frame on screen, in viewport px. */
const measure = () =>
  page.evaluate(() => {
    const box = (el) => el && el.getBoundingClientRect()
    const panel = box(document.querySelector('.slide-panel'))
    const scaler = box(document.querySelector('.slide-panel__scaler'))
    const pane = box(document.querySelector('.scene-area')) ?? box(document.querySelector('.react-flow'))
    const brow = box(document.querySelector('.reel-head__eyebrow'))
    const nodes = [...document.querySelectorAll('.react-flow__node')].map(box)
    const u = nodes.reduce(
      (a, r) => ({ l: Math.min(a.l, r.left), t: Math.min(a.t, r.top), r: Math.max(a.r, r.right), b: Math.max(a.b, r.bottom) }),
      { l: Infinity, t: Infinity, r: -Infinity, b: -Infinity },
    )
    const hit = (a, b) => a && b && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom
    return {
      slide: panel && scaler ? scaler.height / panel.height : 0,
      w: nodes.length ? (Math.min(u.r, pane.right) - Math.max(u.l, pane.left)) / pane.width : 0,
      h: nodes.length ? (Math.min(u.b, pane.bottom) - Math.max(u.t, pane.top)) / pane.height : 0,
      eyebrow: nodes.some((r) => hit(r, brow)),
      nodes: nodes.length,
    }
  })

const rows = []
for (const course of courses) {
  await page.goto(url(course), { waitUntil: 'networkidle0' })
  const plan = await page.evaluate(() => window.__scene?.plan() ?? [])
  for (const { slug } of plan) {
    await page.goto(url(slug), { waitUntil: 'networkidle0' })
    await page.waitForSelector('.react-flow__node', { timeout: 5000 }).catch(() => {})
    await settle()
    const m = await measure()
    await page.screenshot({ path: join(OUT, `${slug}.png`) })
    const flags = []
    if (m.slide < SLIDE_MIN) flags.push('slide thin')
    if (m.slide > SLIDE_MAX) flags.push('slide tall')
    if (Math.max(m.w, m.h) < BIND_MIN) flags.push('board short of edge')
    if (m.w * m.h < AREA_MIN) flags.push('board area')
    if (m.eyebrow) flags.push('under eyebrow')
    if (!m.nodes) flags.push('no scene')
    rows.push({ slug, ...m, flags })
  }
}
await browser.close()

const pct = (x) => `${Math.round(x * 100)}%`.padStart(5)
const w = Math.max(4, ...rows.map((r) => r.slug.length))
console.log(`${'slug'.padEnd(w)}  slide   bind   area  flags`)
for (const r of rows) {
  console.log(`${r.slug.padEnd(w)}  ${pct(r.slide)}  ${pct(Math.max(r.w, r.h))}  ${pct(r.w * r.h)}  ${r.flags.join(', ') || '✓'}`)
}
const flagged = rows.filter((r) => r.flags.length).length
console.log(`\n${rows.length} frame(s), ${flagged} flagged · targets: slide ${pct(SLIDE_MIN).trim()}–${pct(SLIDE_MAX).trim()}, bind ≥${pct(BIND_MIN).trim()}, area ≥${pct(AREA_MIN).trim()} · screenshots in ${OUT}/`)
if (strict && flagged) process.exit(1)
