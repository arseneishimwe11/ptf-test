# Davies — davies.framer.website

> **Observed 2026-07-05.** Evidence: `research/davies/*.png` +
> `research/davies/audit.json`. Replaces marketplace-guess notes.

**Page:** 15,841px at 1440w. One-page personal portfolio, the "bold
tech-brutalist" reference.

## Palette (computed)
- Ground: **black `#000000`**; ink white; secondary `#666666` (×272 — the
  dominant text color!) — Davies runs *low-contrast gray on black* for
  everything non-headline.
- **Accent `#07c42c`** (vivid signal green, ×44 text + ×6 bg) — hero is a
  full green band (video-tinted), green cursor-block after the wordmark,
  green labels.
- White cards/chips at 0.16 alpha for glass panels.

## Typography (loaded + computed)
- **Single family: Figtree 500/400** (rounded-geometric grotesk).
- Display: "DAVIES_" wordmark **200px, lh 0.81, ls −3%** with literal
  underscore + green block cursor (terminal metaphor); h1 72px/80 −3%;
  h3 "Selected Work" 96px/108 −3%.
- **Micro-labels: 8px uppercase** (`01 /`) — extreme small/large contrast.
  Meta readouts: `DAVIES@GMAIL.COM`, `CUP 00:17:25` (running timer),
  `AVAILABLE FOR WORK` with green dot, `© 2026`.

## Layout & rhythm
- Nav (116px, relative): D-mark; `01 / WORKS  02 / SERVICES  03 / ABOUT
  04 / CONTACT` indexed links; email + running-timer readout; MENU.
- Hero (~750px): **full-bleed video background** tinted green; top-left
  list of the 3 hero variants (`01 / WATER WAVE`, `02 / GRIDWAVE`,
  `03 / LIGHT TUNNEL` — template ships 3 generative hero videos);
  `● AVAILABLE FOR WORK` readout; giant "DAVIES_" bottom-left; intro
  paragraph + "START A PROJECT" outline button right.
- **Marquee divider**: "Selected Work ⬤" giant outline/solid text with
  wireframe-globe glyphs scrolling horizontally.
- Works (3,060px): large project blocks. Featured Templates: 480px row
  of cards.
- **Services (2,310px): sticky stacked cards** — "Scroll Animation
  Container" → each service (01/02/03) is a full-width card with a
  blurred BG image (`bg #000 @0.56` overlay) that pins and gets covered
  by the next (measured sticky stack, 770px cards, 120px pad).
- About → contact → footer with big type.
- **Radii: 10/8px** small; 100% circles; a few 40–50px pills. Squared,
  technical feel. 120px section padding.
- 2 small canvases (416×618) — generative panels; 5 `<video>` elements
  total (hero variants + service backgrounds).

## Motion
- **Lenis confirmed.** No GSAP/THREE globals (videos carry the ambience).
- Entrance: 600ms fades — `cubic-bezier(0.44, 0, 0.56, 1)` + a linear
  0→1 (`cubic-bezier(0,0,1,1)`) variant; delays 0/50/350ms; 760ms items.
  Quick and quiet — the video does the drama.
- **Sticky-stack services** is the big scroll signature (pin + cover).
- Running timer readout (CUP 00:17:25) ticks live — instrument-panel
  texture.
- Hovers: minimal; outline buttons fill; `transition 0s` snaps on chips.
- No loader; no custom cursor.

## What we take
- **Terminal/instrument identity for an engineer**: wordmark with
  underscore + block cursor, indexed nav links (`01 /`), live readouts
  (email, timer, availability) — this is the strongest "software person"
  signal in the whole set.
- Sticky-stack cards (services→ our work section candidate; Lyniq pins
  hero, Davies pins cards — same primitive).
- Signal-color-on-black discipline: ONE loud hue, gray for everything
  secondary.
- Giant marquee divider with glyphs.
- The 8px↔200px type-scale confidence.

## What we skip
- Video backgrounds (IP rule) — our WebGL shader replaces them.
- Low-contrast `#666`-on-black body text (fails WCAG; we keep muted text
  ≥ 4.5:1).
