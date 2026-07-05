# Phase 1 — Reference Research (real audit)

## Methodology

Captured **2026-07-05** with headless Chromium (Playwright) against the live
sites — this replaces the earlier adapted audit that was blocked by network
policy. Per site:

- Full-page screenshots at **1440 / 834 / 390 px** (`<bp>-full.png`).
- **Scroll-increment screenshots** at 0.85-viewport steps on desktop
  (`scroll-NN.png`), 1.2s settle per step to let scroll reveals play.
- Early-load shots at ~400ms/~1200ms to catch preloaders (`loader-*.png`).
- `audit.json`: computed styles swept over every element (text colors,
  backgrounds, font-family×weight, border radii, transition signatures —
  frequency-ranked and hex-converted), `document.fonts` (actually-loaded
  typefaces), heading type samples, biggest display text, section geometry
  (y/height/padding/bg via `data-framer-name`), nav state at top + scrolled,
  fixed/sticky elements, hover-probe before/after, entrance animations via
  `document.getAnimations()` (durations, delays, easings, keyframe props),
  and the network log (font files, script chunks, library hits).

Capture script: `capture.mjs` (in this folder). Notes in `<site>.md` are
rewritten from this evidence; anything still uncertain is marked as such.

## Cross-cutting findings (all 9 sites)

- **Lenis 1.3.23 on every single site** (unpkg CSS + `lenis` class) — the
  genre's smooth-scroll is universal, not optional.
- **No GSAP, no THREE anywhere.** All motion is Framer Motion + CSS
  sticky/scroll-linking. Ambience comes from `<canvas>` 2D/WebGL components
  (Jayden, Platform, Sensoria, Davies×small) or `<video>` loops (Hanza,
  Davies, Platform, Sensoria) — never a heavy 3D stack.
- **5 of 9 accents are red/orange**: Lyniq `#f9452d`, Hanza `#ff6044`,
  Jayden `#f3500f`, Platform `#fa6e43` (+ Davies green `#07c42c`,
  Portavia indigo `#5e67e6`, Sensoria pink `#f5699c`, ClearPath sage
  `#7fa69b`, Majd none).
- **Grounds split light/dark**, not all-dark: white/cream (Lyniq body, Majd,
  Hanza, Portavia, ClearPath) vs black/near-black (Jayden, Davies, Platform,
  Sensoria). Several alternate light↔dark bands within one page.
- **Type is grotesk-first everywhere**: Inter/Inter Display (Lyniq,
  Platform, Sensoria), Archivo (Majd), Zalando Sans+Geist Mono (Hanza),
  Rajdhani (Jayden), Figtree (Davies), Antonio+Inter (Portavia). Serif
  appears only as counter-voice (Instrument Serif at Sensoria, Crimson Text
  at ClearPath). **Universal: negative tracking that scales with size**
  (−2% body-large → −7% display) and lh 0.8–1.0 on display.
- **Sticky/pin choreography is the genre's scroll signature**: Lyniq pins
  its hero under the next section; Portavia pins three 100vh panels;
  Davies pins stacked service cards; Majd pins the portrait across two
  sections; Hanza pins the hero wordmark.
- **Entrance timing models**: loader-gated cascade (Lyniq red splash
  1.0–1.75s; Sensoria 1.5s gate then 1.2–1.7s decel-overshoot reveals) vs
  immediate stagger (Jayden 450ms spring pops at exact 100ms steps;
  Platform 0.7–1.4s overshoot beziers, ~100ms steps; Majd long 1.6–2.8s
  expo-out fades; ClearPath 0.6–2s material-curve calm).
- **Hover baseline**: 0.2–0.4s `cubic-bezier(0.44, 0, 0.56, 1)` (sine-ish
  in-out) on color/background; rolling-text links (Majd); arrow-block
  slides (Hanza).
- **No custom cursors anywhere** (old assumption wrong) — cursor stays
  native across all 9.
- **Instrument-panel metadata** is the recurring texture: mono/uppercase
  micro-labels, `/01` indices, local-time + availability readouts (Hanza,
  Davies), ruler ticks (Sensoria), `©` year marks (Majd, Davies, Sensoria).
- Radius languages: pills (50–999px) for buttons/tags almost everywhere;
  cards split sharp (Platform 2–8px, Hanza 0) vs rounded (Jayden 24px,
  Majd 20px, Sensoria 16px).
- Section rhythm: **120px standard padding** (Majd, Davies, Platform,
  Sensoria), stretching to 160–220px (Lyniq, ClearPath).

## Files

| File | Site | One-line real identity |
| --- | --- | --- |
| `lyniq.md` ⭐ | lyniq.framer.website | white ground + red `#f9452d`, all-Inter, red splash loader, pinned hero, pill language |
| `majd.md` | majd-portfolio.framer.website | cream `#faf7f3` + ink, all-Archivo, sticky portrait, word-reveal, no accent |
| `hanza.md` | hanza-template.framer.website | Swiss hairline grid, Zalando Sans + Geist Mono labels, `#ff6044`, video hero |
| `jayden.md` | jayden-portfolio.framer.website | black + `#f3500f`, Rajdhani, canvas smoke hero, 100ms spring cascade, dock nav |
| `davies.md` | davies.framer.website | black + signal green `#07c42c`, Figtree, terminal wordmark `DAVIES_`, readouts |
| `platform.md` | plat-form.framer.ai | `#161719`+`#212225` bento, Inter Display 500 @ −5%, orange keywords, overshoot eases |
| `portavia.md` | portavia.framer.website | white + indigo, Antonio caps + Inter 300, 3×100vh sticky stack, glass nav |
| `sensoria.md` | sensoria.framer.website | `#111` + pink, Inter Display 190px + Instrument Serif, loader-gated overshoot hero |
| `clearpath.md` | clearpath-template.framer.website | sage + Crimson Text serif, 999px pills, material-curve calm (reduced-motion blueprint) |

## IP posture (unchanged)

The new site copies **no** code, assets, or copywriting from any reference —
only layout rhythm, motion idioms, and structural ideas, re-synthesized from
scratch. Screenshots here are research evidence, not assets; nothing from
them ships.
