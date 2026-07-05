# ClearPath — clearpath-template.framer.website

> **Observed 2026-07-05.** Evidence: `research/clearpath/*.png` +
> `research/clearpath/audit.json`. Replaces marketplace-guess notes.
> The **counter-reference**: the calm, soft end of the spectrum.

**Page:** 17,014px at 1440w. Therapy/coaching landing.

## Palette (computed)
- Ground white/`#fafafa`; ink **`#2e3231`** (deep slate-green, not black)
  with `#535956` secondary.
- **Accent `#7fa69b`** (sage green) ×46 text / ×24 bg (+20% alpha tints).
- Soft blurred sage/cream photography carries the hero; noise layer
  ("Noize") over it.

## Typography (loaded + computed)
- **Display: Crimson Text 400** (old-style serif): h1 **136px/0.9
  ls −4%** ("A Path That Shapes Your Future."), h3 36px serif.
- **Body/UI: Inter 400/500/600**: 16px/1.7 body (the airiest line-height
  in the set), 44px/1.2 h2 statements.
- **Letter-spaced uppercase micro-labels** on nav/CTAs ("BOOK A SESSION",
  "START YOUR JOURNEY" with trailing dot).
- Giant serif numerals (227px "1") for step indices.

## Layout & rhythm
- Nav: absolute over hero, spaced-caps links, white pill CTA.
- Hero (900px): soft full-bleed photo, serif 3-line statement left,
  paragraph + pill CTA right, **hand-drawn thin line curve** ("Long
  Line"/"Animated Lines" containers — SVG paths that draw across the
  hero) + "Circles Container" decorative rings.
- Flow: Hero → Toggle demo(1400) → Services cards(640) → Philosophy(630,
  padT 200) → Story A(1022, padT 200/padB 160) → … → FAQ → footer.
- Section padding 160–200px — the airiest rhythm measured.
- **Radii: 999px pills everywhere (×115)** + 16px cards — the roundest
  reference.

## Motion (measured)
- Entrance: the **longest, softest cascade** — durations 600–2000ms,
  delays 0–1200ms, easings `cubic-bezier(0.2, 0, 0.2, 1)` and
  `cubic-bezier(0.4, 0, 0.2, 1)` (material-style standard curves — no
  overshoot anywhere) + 1600ms sine-in-out fades.
- SVG line-draw animation across the hero (the drawn path is the motion
  signature).
- Hovers: 0.3–0.4s sine-in-out on color/underline/background — nothing
  faster than 300ms on the whole page.
- **Lenis confirmed.** No canvas, no video, no GSAP/THREE.
- No loader, no custom cursor.

## What we take
- The **reduced-motion blueprint**, now with real numbers: material
  standard curves (0.4, 0, 0.2, 1), 600ms+ opacity-first reveals, zero
  overshoot, zero pinning — our `prefers-reduced-motion` theme copies
  this envelope so "calm" still reads designed.
- 160–200px breathing room as the upper bound of section rhythm.
- Ink that isn't black (`#2e3231` slate) — softens long reading.

## What we skip
- Serif-led display voice, sage palette, wellness tone (wrong genre for
  an engineer's portfolio — but the *envelope* transfers).
