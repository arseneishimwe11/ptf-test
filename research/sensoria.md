# Sensoria — sensoria.framer.website

> **Observed 2026-07-05.** Evidence: `research/sensoria/*.png` +
> `research/sensoria/audit.json`. Replaces marketplace-guess notes.

**Page:** 12,572px at 1440w. AI beauty product landing — the "immersive
dark" ambience reference.

## Palette (computed)
- Ground `#111111` / panels `#0a0a0a`; white cards for contrast sections.
- Ink white (+0.8 alpha muted).
- **Accent `#f5699c`** (orchid pink) ×21 text / ×11 bg — used for links,
  chips, pricing highlights.
- Color otherwise arrives via the vivid hero/section photography.

## Typography (loaded + computed)
- **Inter Display 500/700** for structure: h1 "SENSORIA" **190px/1.0
  UPPERCASE ls −4%** (letters clip/blend the imagery behind); h2 80px/1.0
  uppercase −4%.
- **Instrument Serif 400 (+italic)** as the editorial counter-voice:
  serif wordmark, 28px serif leads — a serif/grotesk pairing used
  sparingly (×11 vs ×191 Inter Display).
- Instrument-panel details: vertical ruler tick marks with "© 2026" and
  "18'" readouts on the hero's right edge.

## Layout & rhythm
- Hero (900px): full-bleed vivid photo + **1728×1080 canvas** layered on
  it (WebGL/2D distortion-flow effect over the image); "Intelligent
  neuro-beauty" label; giant knocked-out wordmark bottom; paragraph left;
  ruler ticks right. 2 videos further down.
- Flow: Hero → About (padT 200/padB 120) → Analysis(1252) →
  Concept(3292 — tall scroll-driven feature run) → Visual(1276) →
  Spacing(864) → How it Works(983) → Results(904) → Pricing(1315) →
  FAQ(950) → Finish/footer (sticky 900px end-cap named "Finish").
- **120px standard section padding** (measured on 7 sections) with 200px
  for the first.
- Radii: 100px pills (×61) + 16px cards (×47) + 12px small.

## Motion (measured)
- **A real loader-gated entrance**: all hero animations start at delays
  **1500–1800ms** (loader plays first), durations 1200–1700ms, easing
  `cubic-bezier(0, 1.07, 0.25, 0.98)` — strong decel with 7% overshoot —
  plus baked 1200ms expo-out curves. The wordmark rises with the
  overshoot; labels fade after.
- Hovers: `color 0.4s cubic-bezier(0.44, 0, 0.56, 1)` (slower, softer
  than Lyniq's 0.3s — matches the languid mood).
- **Lenis confirmed.** Canvas ambience + 2 videos; no GSAP/THREE globals.
- No custom cursor.

## What we take
- The **loader-gated hero** timing model: nothing enters until the
  loader hands off, then a 300ms-spread cascade of 1.2–1.7s decel-
  overshoot reveals. (Lyniq confirms the same pattern at different
  speeds.)
- Giant knocked-out wordmark whose letterforms interact with the ambient
  layer behind (ours: shader shows through text via blend/clip).
- Ruler-tick instrument details on viewport edges.
- 120px section rhythm on dark.

## What we skip
- Photography-driven color (IP rule: generated assets only).
- Pink accent, beauty tone, pricing/FAQ.
