# DESIGN DNA — Synthesis for the New Portfolio

> Output of Phase 2. Sources: `research/*.md` (adapted audit — see
> `research/README.md` for the network-policy caveat). Everything below is a
> *decision document*: what the new site does, which reference inspired it, and
> how the idea is re-made original.

---

## 1. Feature matrix — who does each thing best

| Section / system | Best reference | Why | Verdict for new site |
| --- | --- | --- | --- |
| **Loading screen** | **Lyniq** ⭐ | Splash → hero is one choreographed handoff, not two unrelated animations | **Adapt.** Counter (00→100) + name wordmark; exit is a two-panel vertical wipe whose easing curve the hero entrance inherits. Shown once per session. |
| **Nav** | Lyniq / Platform® | Slim fixed bar that recedes; content is the star | **Adapt.** Fixed top bar, glass-blur ground on scroll, hide-on-scroll-down / reveal-on-scroll-up. Active-section underline driven by scroll position. |
| **Hero** | **Sensoria** (ambience) + **Davies** (type scale) | Full-viewport ambient motion behind a huge, confident statement | **Synthesize.** Original GLSL flow-field shader (R3F) as ambient ground — no video, no stock. Oversized two-line display headline with per-line mask-reveal; instrument-style meta row (location, availability, scroll cue). |
| **About** | **Jayden** | Résumé data as design: story + experience rows in one flow | **Adapt.** Two-column: sticky portrait placeholder (generated gradient/noise) + bio; experience timeline as hairline-ruled rows; count-up stats (Sensoria's readout idea). |
| **Work / projects** | **Lyniq** (sticky scroll) + **Portavia** (modular cards) | Pinned/stacking case-study cards make 5 projects feel curated | **Synthesize.** Stacking sticky cards: each project card pins and the next slides over it with a slight scale/dim of the outgoing card. Per-project accent tint in a generated gradient "cover." Alternating layout accents (Portavia's modularity) inside a consistent card grammar (Hanza). |
| **Skills / stack** | **Platform®** | Bento grammar = density without clutter | **Adapt.** Bento grid of mixed-size tiles (core stack, tooling, currently-learning, principles) + a Lyniq-style infinite marquee of technologies as the section's divider. |
| **Process** | Platform® (order), Hanza (clarity) | Numbered steps read as method, build trust | **Adapt.** Horizontal-feel numbered steps (01–04) with staggered reveal; merged into the Skills section's rhythm rather than a separate heavy block. |
| **Testimonials** | Hanza | Social proof without carousel gimmicks | **Adapt.** Two–three large serif pull-quotes with hairline rules; scroll-reveal only. No autoplay carousel (motion must earn its place; autoplay doesn't). |
| **Contact** | Davies | One clear job: the CTA is the section | **Adapt.** Full-viewport "Let's build something" statement with oversized email link (hover: slide-fill), social row, availability badge. |
| **Footer** | Lyniq / Platform® | Editorial close: big wordmark, tiny meta | **Adapt.** Oversized clipped wordmark, back-to-top, colophon line ("Design & code: [name]"), local-time readout. |
| **Cursor** | Lyniq (genre signature) | Custom cursor sells "studio build" instantly | **Original build.** Dot + trailing ring (spring-lagged); ring morphs to "view" label over project cards, scales over links. Pointer-fine devices only; native cursor never hidden for a11y-critical elements; disabled under reduced motion. |
| **Transitions** | Lyniq | Fluid continuity between views | **Translate.** No pages → continuity handled by scroll choreography: section eyebrows animate in identically everywhere (one reveal grammar), Lenis gives inertial glue. |
| **Smooth scroll** | Majd | Lenis is the single biggest "feel" upgrade | **Adopt** Lenis; anchor nav routed through it; disabled under reduced motion. |
| **Ambient/WebGL** | Sensoria (mood), Platform® (restraint) | Ambience belongs in exactly one place | **One shader, one place**: hero background only. DPR-capped, paused off-screen and under reduced motion; static gradient fallback. |
| **Reduced-motion fallback** | **ClearPath** (counter-reference) | Calm can still feel designed | Opacity-only micro-fades, no parallax/pin/marquee/shader/cursor; layout and hierarchy carry the design. |

## 2. Per-section originality notes

- **No reference code, assets, or copy is reused.** Every visual asset is
  generated: shader (original GLSL), project covers (CSS/SVG gradients + noise),
  portrait (CSS composition), icons (hand-drawn inline SVG paths).
- The loader counter, stacking work cards, marquee, and cursor are rebuilt from
  first principles in React/GSAP/Framer Motion — idioms, not implementations,
  are borrowed. Idioms (preloaders, marquees, sticky stacks, custom cursors)
  are genre furniture used across dozens of studios, not any one template's IP.
- Copywriting is written fresh for a fictional-but-plausible software engineer
  ("Adrian Vale") with specific, invented projects and metrics.

## 3. Motion philosophy

**Maximal where it orients, silent where it informs.**

This site commits to the cinematic end of the spectrum — shader-driven hero,
choreographed loader, pinned work cards, custom cursor, parallax accents — but
every effect must pass three gates:

1. **Purpose** — it must orient (where am I?), continue (what's next?), or
   confirm (did that register?). Decoration alone fails the gate. This is why
   there's no autoplay carousel and no tilt-on-hover cards.
2. **Readability** — text never moves while being read. Reveals finish before
   the eye arrives (trigger points sit at 75–85% viewport); nothing re-animates
   on scroll-up.
3. **Performance** — `transform`/`opacity` only; no layout-property animation.
   One WebGL context, DPR ≤ 1.5, paused when off-screen. 60fps on a mid-tier
   laptop is the budget; any effect that can't hold it gets cut, not throttled.

`prefers-reduced-motion` is a first-class theme, not an off-switch: fades stay
(≤200ms, opacity only), everything spatial goes, and the ClearPath-calm result
must still look intentionally designed.

## 4. Design tokens (decided)

- **Ground:** warm near-black `#0C0B09`; raised surfaces `#161411` / `#1E1B17`.
- **Ink:** warm off-white `#EDE8DF`; muted `#8A8578`.
- **Accent:** burnt amber `#E8642C` (links, cursor ring, project tints derive
  from it via hue rotation per project).
- **Type:** `Fraunces` (display serif, opsz axis — cinematic statements) +
  `Space Grotesk` (grotesk — UI, body, micro-labels) + `JetBrains Mono`
  (readouts, eyebrows) via `next/font`.
- **Radius scale:** 2 / 8 / 20 / 999. **Section rhythm:** 96–160px desktop
  vertical padding; 12-col grid, 24px gutter, max-width 1440px.
- Warm-black + amber + serif/grotesk/mono triad appears in none of the nine
  references — the palette is the clearest originality marker.
