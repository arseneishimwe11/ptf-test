# Jayden — jayden-portfolio.framer.website

> **Observed 2026-07-05.** Evidence: `research/jayden/*.png` +
> `research/jayden/audit.json`. Replaces marketplace-guess notes.

**Page:** 14,576px at 1440w. Solo web-designer/developer one-pager —
the second-closest brief match after Majd.

## Palette (computed)
- Ground: **pure black `#000000`** with `#111111` raised panels.
- Ink: white; **secondary `#666666`** (×147 — a real mid-gray, not
  white-alpha); tertiary `#bbbbbb`/`#e0e0e0`.
- **Accent `#f3500f`** (orange-red — again!) used sparingly (×3 text) +
  an orange smoke/flame ambient visual. Success-green dot on the
  availability pill.

## Typography (loaded + computed)
- **Rajdhani 500/400/600** (a squarish, semi-condensed techy grotesk) for
  everything: h1 82px/74 ls −2.5%, h2 88px/90 ls −4%, name 24px 600.
- Poppins 400 for a few body bits; Inter Display 700 once; script
  signature "Jayden" as decorative overlay (image/lettering).
- Distinctive: techy squared letterforms + generous size steps.

## Layout & rhythm
- Nav (94px, relative — scrolls away): logo left, **"● Available for 3
  projects" pill** center, location ("San Francisco, CA / USA") right.
- **Right-edge floating dock** (fixed, pill, icon rail): Home / Works /
  Services / About / Blog / Tags / Testimonials / Contact — active section
  highlighted white as you scroll. The page's wayfinding signature.
- Hero (~950px): **`<canvas>` 1440×941 ambient background** — orange
  smoke/flow field drifting on black; centered rounded-24 portrait card
  (orange-duotone photo) with script "Jayden" signature across it; intro
  line under; social icon circles.
- Counter section: big count-up stats row.
- Experience: compact rows (role/company/dates).
- Selected Works (~2,150px): **full-width stacked project cards**
  (rounded-24) — cover image, glass blur caption bar (category, title,
  date pill, big circular arrow button).
- My Services: `#111` rounded panel (74px pad) with service rows.
- About Me → testimonials → contact → footer.
- **Radius system: 24/16/12px cards + 100px pills** (×48) + circles —
  the most rounded-friendly reference.
- Section paddings ~80px; panels carry their own 74px padding.

## Motion
- **Lenis confirmed.** 1 video, 1 canvas (hero). No GSAP/THREE globals
  (canvas is a Framer component — likely 2D particle/noise loop).
- **Entrance: 450ms baked spring with overshoot** (value 1.028 at 50%,
  settles 1.006 → snappy pop) staggered at **exact 100ms steps**:
  delays 20/120/220/320/420/520/620/720ms — an 8-element cascade
  (nav → pill → location → portrait → signature → intro → socials → dock).
- Hovers: underline-offset + color 0.4s `cubic-bezier(0.44,…)` on links;
  card arrow buttons scale.
- No loader; no custom cursor.

## What we take
- The **spring-with-overshoot entrance cascade at fixed 100ms steps** —
  measurably snappier than Lyniq/Majd's long fades; good for a
  "engineer-precision" personality.
- Right-edge dock as active-section wayfinding (our nav underline can
  borrow the active-state logic; dock itself optional).
- Availability pill with live dot in the nav.
- Glass caption bar on project cards.
- Canvas ambient tuned to one hue as the hero's only color.

## What we skip
- Script-signature overlay (photo-adjacent trope, and we have no photo).
- Poppins/Rajdhani mix — we keep one grotesk + one mono.
