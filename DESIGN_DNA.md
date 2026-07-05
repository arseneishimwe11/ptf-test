# DESIGN DNA — v2, rebuilt from the real audit

> Output of Phase 2, **rewritten 2026-07-05** after the live capture of all
> nine references (see `research/README.md` + `research/<site>/audit.json`).
> v1 was synthesized from marketplace listings while the network was blocked;
> several of its foundational guesses were wrong. This version is grounded in
> measured hex values, loaded typefaces, and `getAnimations()` timings.
> It is still a *decision document*: what the site does, which observed
> evidence motivates it, and how the idea is re-made original.

---

## 0. What the evidence overturned (change log vs the current build)

| # | Current build (v1 guess) | Observed reality | v2 decision |
| --- | --- | --- | --- |
| 1 | **Fraunces serif display** + Space Grotesk UI | Zero serif-led display in genre. Favorites run ONE grotesk at many weights with tight tracking: Inter 500–700 @ −4…−7% (Lyniq/Platform/Sensoria), Archivo 300–800 (Majd), lh 0.8–1.0 | **Drop Fraunces + Space Grotesk. One family: Archivo (variable 100–900)** for display/UI/body, uppercase display statements, tracking −2%→−6% scaling with size. This is the single biggest fix for the "generic typography" problem. |
| 2 | JetBrains Mono "eyebrows" only | Mono is a full **instrument-panel system**: Geist Mono meta rows (Hanza), `/01` indexed nav (Davies), local-time + availability readouts, `CLIENT/YEAR` tables, ruler ticks (Sensoria) | **Keep JetBrains Mono, promote it**: indexed nav links, availability pill, local-time footer readout, `/NN` section indices, stat units. The "software engineer" personality layer. |
| 3 | Uniform warm near-black `#0C0B09` page | Grounds split light/dark and **alternate within a page**. Lyniq ⭐ = white body + dark bands; Majd (engineer ref) = cream `#faf7f3` + ink | **Alternating grounds**: dark hero + dark accents bands + dark footer bookend a warm-paper body. Dark: `#0f0e0c`; paper: `#f4f2ed`. |
| 4 | Burnt amber `#E8642C` accent | 5 of 9 accents are hot red-orange (`#f9452d` Lyniq, `#ff6044`, `#f3500f`, `#fa6e43`); used loud (whole loader screen, button fills), not "burnt" | **Signal orange-red `#ff471a`** (hotter, louder than amber; distinct hex from every reference). Used Lyniq-style: loader ground, accent words inside the display headline, arrows, indices, active states. |
| 5 | Custom cursor (dot + trailing ring) | **Zero of nine references has a custom cursor** — native cursor everywhere | **Delete `Cursor.tsx`.** Not genre furniture after all; effort moves to hovers that were actually observed (rolling-text links, arrow-slide CTAs). |
| 6 | Loader counts 00→100, dark ground | Lyniq's loader is a **solid accent-red screen** with the wordmark, ~1.4s, wipe exit easing `cubic-bezier(.96,-.02,.38,1.01)`; Sensoria gates all hero anims to ~1.5s | **Loader = full accent `#ff471a` screen**, wordmark + mono tagline, tiny mono counter bottom-right (instrument texture), vertical wipe exit ~1s on an anticipation-settle curve; hero entrance keys off its end. Shown once per session (kept). |
| 7 | Generic 0.2s ease-out hovers, `--ease-out-expo` everywhere | Measured house styles: hovers `0.3s cubic-bezier(.44,0,.56,1)` (Lyniq/ClearPath/Jayden); entrances are decel-overshoot `cubic-bezier(0,1.03,.56,1)` 0.7–1.4s (Platform), `(0,1.07,.25,.98)` 1.7s (Sensoria), 450ms springs @ exact 100ms steps (Jayden) | **Three named easings** (§3): `--ease-hover` sine-in-out 0.3s; `--ease-enter` decel + ~4% overshoot; `--ease-wipe` anticipation-settle for the loader/hero handoff. 100ms stagger grid. |
| 8 | Section padding 96–160px | Measured convergence: **120px standard** (Majd/Davies/Platform/Sensoria), 160–220px for showpieces (Lyniq, ClearPath) | **120px base / 176px showpiece** desktop rhythm. |
| 9 | Radius 2/8/20/999 | Pills 50–999px for buttons/tags on ~all sites; cards split sharp (Platform 2–8) vs round (Jayden 24, Majd 20) | Keep the family, re-tune: **999 pills / 14px media cards / 8px data tiles / 2px ticks**. |
| 10 | Hero: two-line serif statement, ambient shader | Genre hero = **giant uppercase grotesk knocked out over one ambient layer** + mono meta + right-aligned capability list (Majd scale, Lyniq layout, Jayden/Davies one-hue canvas ambience) | Keep the R3F flow-field shader (one place, hero only) but **retint to a single accent-hue field on near-black**, put a 2-line uppercase Archivo 800 statement over it with accent keywords inline (Platform device), capability list right, mono meta row bottom. |
| 11 | (not in v1) | **Sticky/pin choreography is the genre's scroll signature** — Lyniq pins its hero under the next section; Portavia pins 100vh panels; Davies pins service cards; Majd pins the portrait | **Hero pins** (next band slides over it) + Work keeps its sticky-stack cards (now evidence-backed). |
| 12 | (not in v1) | **Majd's scroll-linked word-reveal** statement (ink@0.1 → ink per word) | Add one **manifesto word-reveal** as the About lead. |
| 13 | Lenis assumed nice-to-have | **Lenis 1.3.23 on 9/9 sites**; no GSAP/THREE globals anywhere | Lenis confirmed as spine. We keep GSAP/R3F in the stack (they implement what Framer sites fake with runtime components), but motion defaults follow the measured Framer-Motion-style curves. |

Unchanged on purpose: tech stack (Next.js 15 / Tailwind v4 / Framer Motion /
GSAP / Lenis / R3F), component architecture (`providers/shell/sections/ui`),
all content in `src/content/site-data.ts`, and the accessibility scaffolding
(reduced-motion theme, keyboard nav, focus-visible, semantic landmarks).
`Cursor.tsx` is deleted (change #5) — a component removal, not a
restructuring; its a11y risk goes with it.

---

## 1. Feature matrix — who does each thing best (observed)

| Section / system | Best reference (observed) | What was actually seen | Verdict for our site |
| --- | --- | --- | --- |
| **Loader** | Lyniq ⭐ | Solid `#f9452d` screen, Bebas wordmark + tagline, ≤1.5s, wipe whose easing the hero inherits | **Adapt** on our accent + Archivo wordmark + mono counter. |
| **Hero ambience** | Jayden / Davies / Platform | One-hue canvas (orange smoke / green video / particle field) behind giant type — never multi-color, never busy | **Keep our GLSL flow-field**, retinted to accent-on-dark, DPR-capped, paused off-screen. |
| **Hero type** | Majd (scale) + Platform (accent words) | 174px Archivo 800 uppercase 2-liner; orange keywords inline in a 100px Inter Display statement | **Synthesize**: uppercase Archivo 800 ~9vw, accent-colored verbs, lh 0.9, ls −4%. |
| **Hero pin** | Lyniq | `section[Hero]` sticky; stats band scrolls over it | **Adopt** (CSS sticky, zero JS). |
| **Nav** | Majd (pill) / Jayden (availability) / Davies (indices) | Floating pill that persists; `● Available` chip; `01 /` indexed links | **Keep our fixed slim glass bar** (better wayfinding than the genre's scroll-away navs) but restyle: indexed mono links, availability pill, hide-on-scroll-down stays. |
| **Stats** | Lyniq / Sensoria | Count-up numerals (captured mid-count), hairline top rules, unit superscripts | **Keep CountUp**, restyle with hairlines + mono units. |
| **About** | Majd | Sticky portrait handoff + word-reveal manifesto + hairline experience rows | **Adapt** — portrait stays a generated composition; manifesto word-reveal added. |
| **Work** | Lyniq (stack) + Jayden (card) + Davies (pin) | Pinned/stacked full-width cards; glass caption bar; per-project cover | **Keep sticky-stack cards**; caption bar goes glass; covers stay generated gradients/noise per-project hue. |
| **Skills / stack** | Platform | `#212225` bento tiles, 1px borders, 2–8px corners, `//` labels | **Adapt** bento on dark band with sharp tiles + mono labels; marquee divider (Davies-style glyph ticker) retained. |
| **Testimonials** | Hanza / Lyniq | Hairline-ruled cells, mixed light/dark cards, no carousel | **Keep** two large quotes, hairline rules, scroll-reveal only. |
| **Contact** | Davies / Majd | One statement + one action; terminal readouts nearby | **Keep** full-viewport CTA, oversized email link with rolling-text hover. |
| **Footer** | Majd / Lyniq / Hanza | Giant clipped ghost wordmark + tiny meta/link rows; local time | **Keep** ghost `AV_` wordmark (now with Davies underscore-cursor), mono colophon + local-time readout. |
| **Wayfinding texture** | Hanza / Davies / Sensoria | Mono labels, `/NN` indices, live readouts, ruler ticks | **Adopt** across all sections (Eyebrow component grows into this). |
| **Reduced motion** | ClearPath (measured) | `cubic-bezier(.4,0,.2,1)` 600ms+, opacity-first, zero overshoot/pins | **Keep** as the reduced-motion envelope, now with real numbers. |

---

## 2. Design tokens (v2 — replaces globals.css `@theme` values)

**Grounds & ink**
- `--color-ground: #0f0e0c` (dark band ground: hero, skills, footer)
- `--color-raised: #1b1916` / `--color-line-dark: rgba(244,242,237,.12)`
- `--color-paper: #f4f2ed` (body sections: about, work, testimonials)
- `--color-ink: #101010` (on paper) / `--color-ink-inverse: #f4f2ed` (on dark)
- `--color-muted: #5f5b52` (on paper, ≥4.5:1) / `rgba(244,242,237,.64)` on dark
  (Davies' `#666`-on-black fails WCAG — we don't copy that.)
- `--color-accent: #ff471a`; `--color-accent-soft: rgba(255,71,26,.12)`
- Per-project cover hues derive from accent by hue rotation (unchanged idea).

**Type** (all `next/font`, self-hosted)
- `--font-sans: Archivo` (variable, wght 100–900) — display, UI, body.
- `--font-mono: JetBrains Mono` — instrument layer only.
- Scale: display 9vw/0.9 cap 800 ls −0.04em (uppercase);
  h2 clamp(40–64px)/1.0 wght 700 ls −0.03em; h3 24–28px/1.2 wght 600
  ls −0.02em; body 16–17px/1.6 wght 450 ls −0.01em; mono labels 11–12px
  ls +0.08em uppercase.

**Shape & space**
- Radii: `--radius-pill: 999px` (buttons, tags, availability chip),
  `--radius-card: 14px` (media/work cards), `--radius-tile: 8px` (bento
  tiles), `--radius-tick: 2px` (rules, mini-bars).
- Section rhythm: `py-[120px]` base, `py-[176px]` showpiece (hero-adjacent,
  contact); 12-col grid, 24px gutter, max-w 1400px, 32px page margins.
- Hairlines everywhere borders appear: 1px at 12% ink alpha.

**Easing & timing** (named, measured-derived, not copied verbatim)
- `--ease-hover: cubic-bezier(0.44, 0, 0.56, 1)` @ 0.3s — color/bg/underline.
- `--ease-enter: cubic-bezier(0.16, 1.04, 0.32, 0.98)` @ 0.7–1.1s — entrances,
  ~4% overshoot then settle (Platform/Sensoria family).
- `--ease-wipe: cubic-bezier(0.92, -0.02, 0.38, 1)` @ 1.0s — loader exit &
  hero headline rise (anticipation → settle, Lyniq family).
- Stagger grid: **100ms steps** (Jayden/Platform), max 6 steps then group.
- Reduced motion: everything collapses to opacity 0→1 @ 600ms
  `cubic-bezier(0.4, 0, 0.2, 1)` (ClearPath envelope), no transform, no pin,
  no marquee, shader replaced by static gradient.

---

## 3. Motion philosophy (v2)

**Confident, gated, then quiet.** The measured genre doesn't animate
everything — it spends motion in three places: a gated entrance (loader →
cascade), scroll-linked pinning, and micro-hovers. Between those, content
holds still.

1. **Gate**: loader (accent screen) ends in a wipe; hero elements cascade in
   on `--ease-enter` at 100ms steps, longest item ≤1.1s. Nothing else on the
   page animates until scrolled to.
2. **Scroll**: hero pins under the stats band; work cards stack; manifesto
   words fill; stats count up. All scroll-*linked* (reversible, no
   re-trigger), reveals fire once at 75–85% viewport and never re-animate.
3. **Hover**: 0.3s `--ease-hover` color/fill; rolling-text on nav/links;
   arrow-slide on CTAs. No scale-tilt cards, no magnetic gimmicks beyond the
   existing MagneticButton (kept, it matches the genre's button feel).
4. **Budget**: transform/opacity only; one WebGL context, DPR ≤1.5, paused
   off-screen (unchanged); 60fps mid-tier laptop or the effect is cut.

---

## 4. Section-by-section deltas (what Phase 3–5 must touch)

- `globals.css` — full token swap (§2); light/dark band utilities
  (`.band-dark`, `.band-paper`); selection color accent-on-paper flips to
  paper-on-accent.
- `layout.tsx` — fonts: Archivo variable + JetBrains Mono (drop Fraunces,
  Space Grotesk).
- `Preloader.tsx` — accent ground, Archivo wordmark, mono counter
  bottom-right, wipe exit on `--ease-wipe`; duration ~1.4s + 1.0s exit.
- `Nav.tsx` — restyle: mono indexed links (`01 /Work`…), availability pill
  (green dot), glass ground only after scroll; keep hide/reveal behavior.
- `Cursor.tsx` — **delete**; remove provider usage.
- `Hero.tsx` / `HeroCanvas.tsx` — dark band; shader retint (accent hue
  field, near-black base); uppercase 2-line Archivo 800 statement with
  accent verbs; capability list right; mono meta row (location, local time,
  availability, scroll cue); `position: sticky` pin under next section.
- `About.tsx` — paper band; manifesto word-reveal lead (scroll-linked);
  sticky generated portrait; hairline experience rows (keep data).
- `Work.tsx` / `ProjectCard.tsx` — paper band; sticky-stack retained; card
  radius 14; glass caption bar (blur + 10% ink) with mono index/date pill.
- `Skills.tsx` — dark band; Platform-style bento (tile radius 8, 1px lines,
  `//` mono labels); Marquee divider stays (glyph ticker, accent separators).
- `Testimonials.tsx` — paper band; hairline-ruled two-quote layout (keep
  copy).
- `Contact.tsx` — dark or accent-tinted showpiece (176px rhythm); oversized
  email with rolling-text hover.
- `Footer.tsx` — ghost clipped `AV_` wordmark with underscore block-cursor
  blink (subtle, reduced-motion-off); mono colophon + local-time readout.
- `Reveal/SplitLines/CountUp/Eyebrow/Marquee/MagneticButton` — retimed to §2
  easings; Eyebrow grows `/NN` index + mono treatment.

## 5. Originality notes (unchanged rules, restated)

- No reference code, assets, or copy is used. Screenshots in `research/` are
  evidence, not assets. Every visual asset remains self-generated: GLSL
  shader (original), project covers (CSS/SVG gradient+noise), portrait
  (CSS composition), icons (hand-drawn inline SVG).
- Idioms adopted (loader gate, pinned hero, sticky stack, mono instrument
  labels, ghost wordmark, rolling links) are genre furniture observed across
  multiple independent sites; every implementation is written from scratch
  in React/Framer Motion/GSAP. Easing values are re-derived family members,
  not verbatim copies, except where a curve is generic (`0.44/0/0.56/1` is
  a standard sine-in-out).
- Fictional persona "Adrian Vale" and all copy in `site-data.ts` stay as-is.
