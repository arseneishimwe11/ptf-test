# Portavia — portavia.framer.website

> **Observed 2026-07-05.** Evidence: `research/portavia/*.png` +
> `research/portavia/audit.json`. Replaces marketplace-guess notes.

**Page:** 10,478px at 1440w. Free solo-designer portfolio.

## Palette (computed)
- Ground: white; ink `#303030` (soft black); panels `#f5f5f5`.
- **Accent `#5e67e6`** (indigo/periwinkle) — the only non-red/orange
  accent in the reference set. ×17 backgrounds (buttons, highlights),
  ×18 text.
- `#0bde66` green only as the availability dot.

## Typography (loaded + computed)
- **Display: Antonio 700/400 UPPERCASE** (tall condensed grotesk):
  h1 120px/1.1 −3% ("digital"), h2 60px/78 uppercase, h3 32px numbered
  uppercase ("1. ui/ux design").
- **Body: Inter 300** (×74 — genuinely light body weight) + Inter 600 for
  emphasis.
- The pairing (condensed caps display + light airy body) gives the
  fashion-editorial feel.

## Layout & rhythm
- **Nav: white @0.9 + `backdrop-filter: blur(5px)`** — the only glass
  nav measured in the set (56px slim bar, relative).
- **Sticky-stack opener**: "Sticky Wrap" 2700px = Hero → Service → About,
  each 900px (100vh), each pinning while the next slides over — the
  full-viewport panel-stack pattern.
- Hero has a "Noise BG" grain layer; 1 ambient video elsewhere.
- Featured projects: 3 × 747px **full-bleed cover bands** with gradient
  overlay + project info overlaid (rounded 20px), then footer.
- Radii: **99px pills (×41) + 20px cards (×26)**.
- Section paddings absorbed by the 100vh panels; overall page is compact
  (10.5k).

## Motion
- **Lenis confirmed.** No canvas; 1 video; no GSAP/THREE.
- No entrance animation captured at load (page presents immediately;
  motion is scroll-driven pinning).
- Hovers: `color 0.2s cubic-bezier(0.5, 0, 0.88, 0.77)` (sharp ease-in
  flavor — snappier than the 0.44/0.56 sine most others use).
- The sticky-stack + Lenis inertia carries the entire experience.

## What we take
- Confirmation that **sticky full-viewport panel stacking** works as a
  page spine, not just a work-section trick (Hero→Service→About all pin).
- Glass slim nav (blur + alpha white/dark) as the nav ground treatment.
- Condensed-caps display + light body as a *considered-and-rejected*
  typography direction (it reads fashion-first, not engineer-first).

## What we skip
- Indigo accent; light-300 body text (too faint on dark grounds).
