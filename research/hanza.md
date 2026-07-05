# Hanza — hanza-template.framer.website

> **Observed 2026-07-05.** Evidence: `research/hanza/*.png` +
> `research/hanza/audit.json`. Replaces marketplace-guess notes.

**Page:** 16,340px at 1440w. Solo designer positioning ("HANZA NOVÁK,
Designer & Framer Expert, Prague").

## Palette (computed)
- Ground: white/`#fcfcfc`/`#f3f3f3` panels; ink `#121212` (+60% alpha
  muted). Dark hero + dark bands `#121212`/`#191919`.
- **Accent `#ff6044`** (orange-red) — used *hard*: ×125 backgrounds
  (buttons, arrow blocks, small square bullets, chips).
- Neutral grays for hairline grid borders (`#e8e8e8`).

## Typography (loaded + computed)
- **Zalando Sans 500** (×822 — body, headings, everything) + 400.
- **Geist Mono 500** (×109) for meta labels: `PROFESSION`, `LOCATION`,
  `CLIENT`, `YEAR`, `/01`-index eyebrows, local-time readout, `/HANZA`
  suffixes on CTAs. The mono-label system is Hanza's signature.
- **UPPERCASE-heavy**: h2 80px/72 (lh 0.9) ls −3% uppercase
  ("CASE STUDIES."), labels 12–14px uppercase.
- Display trailing period tic ("CASE STUDIES**.**").

## Layout & rhythm
- **Swiss/technical editorial grid**: hairline-ruled columns visible
  everywhere; content sits in bordered cells; numbered eyebrows
  (red square bullet + `02 PORTFOLIO`).
- Nav row (98px): dotted-grid MENU icon + HANZA® left; `02:15 AM LOCAL
  TIME` mono center; avatar + "START PROJECT /HANZA" black CTA with red
  arrow block right.
- Hero (100vh): full-bleed b/w video background (2 `<video>`s on page) +
  noise overlay layer + 0.2 dark overlay; small white statement paragraph
  right-of-center ("I HELP FOUNDERS AND GROWING BRANDS…"); `/01 WEB
  DESIGN /02 WEBSITE DEVELOPMENT /03 MOTION` list right; giant knocked-out
  "HANZA®" wordmark pinned to the bottom edge, clipped; trust row
  bottom-left (avatars, `4.92/5`, red squares as stars, `TRUSTED BY 122+
  FOUNDERS`).
- About: light `#fcfcfc` editorial grid — portrait cell w/ "GET IN TOUCH
  /HANZA" bar, name + PROFESSION/LOCATION mono rows, stats cells (`48+`),
  section statement.
- Portfolio: giant "CASE STUDIES." then full-bleed case bands with mono
  CLIENT/YEAR meta rows.
- Services/pricing/process/FAQ/contact continue the same cell grammar
  (16k page = agency-depth sections).
- **Radii: 500px pills or 0** — sharp rectangles + occasional pill; cards
  are square-cornered (10px max on small elements).
- Section padding ~80px + the grid's own borders (denser than Lyniq/Majd).

## Motion
- **Lenis 1.3.23 confirmed** (unpkg css + html class). 2 background
  videos; no canvas/THREE/GSAP.
- Entrance: 400ms `cubic-bezier(0.44, 0, 0.56, 1)` fades at delays
  1200/1400ms (after video settles). Restrained — hero is mostly video +
  type, not choreography.
- Scroll reveals: soft rises on cells; the wordmark stays pinned at hero
  bottom (sticky).
- Hovers: arrow-block slides on CTA bars; several snap (0s) state changes;
  rolling arrows.
- No loader, no custom cursor.

## What we take
- **Mono-label metadata system** (eyebrows, readouts, `/NN` indices,
  local-time) — instrument-panel texture for an engineer's portfolio.
- Giant bottom-pinned clipped wordmark in the hero.
- Hairline cell grid as section skeleton (denser info without clutter).
- Noise overlay on media.
- Red square bullet as a repeated micro-mark.

## What we skip
- Video backgrounds (IP rule: self-generated assets; we use shader/canvas).
- The full agency page depth (pricing/FAQ) — solo scope.
