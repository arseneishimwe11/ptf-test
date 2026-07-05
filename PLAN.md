# PLAN — Build Plan (updated for DESIGN_DNA v2)

Stack (locked): Next 15.5 (App Router) · TypeScript · Tailwind v4 · Framer Motion 12
· GSAP 3 + ScrollTrigger · Lenis · React Three Fiber 9 (hero shader only) ·
`next/font` (**Archivo variable + JetBrains Mono** — Fraunces & Space Grotesk
dropped after the real audit showed the genre is grotesk-first; see
DESIGN_DNA v2 §0).

> **v2 note:** the type system is now one grotesk (Archivo 100–900) for
> display/UI/body + JetBrains Mono promoted to a full instrument-panel layer.
> Sections alternate **paper/dark bands** (`.band-paper` / `.band-dark` in
> globals.css re-declare the semantic color tokens, so `text-ink`/`bg-surface`
> flip automatically). Accent is signal orange-red `#ff471a`. The custom
> cursor was **removed** (0/9 references had one). The hero is `position:
> sticky` and the next band scrolls over it (observed on Lyniq). Build stays
> green: `pnpm build` needs font fetch, so run it with
> `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=<proxy CA>` behind an egress proxy.

## Page section order (single page)

1. Preloader (overlay, once per session)
2. Nav (fixed)
3. Hero — `#top`
4. About — `#about`
5. Selected Work — `#work`
6. Skills / Process — `#skills`
7. Testimonials — `#testimonials` (inside proof arc, kept light)
8. Contact — `#contact`
9. Footer

## Component tree

```
app/layout.tsx            Archivo+JetBrains fonts + metadata + <SmoothScroll> + <Preloader gate>
app/page.tsx              <Nav/> <main> <Hero/> <About/> <Work/> <Skills/> <Testimonials/> <Contact/> </main> <Footer/>
app/globals.css           @theme tokens (dark) + .band-paper overrides, band utils, named easings, type system, marquee/roll/caret keyframes, reduced-motion + a11y

components/
  providers/SmoothScroll.tsx   Lenis + gsap.ticker bridge; ScrollTrigger sync; anchors
  providers/LoaderContext.tsx  loaderDone flag → hero waits for wipe
  shell/Preloader.tsx          accent splash + wordmark + mono counter + upward wipe
  shell/Nav.tsx                mono 0N/ indexed links, availability pill, glass-on-scroll, hide-on-down
  shell/Footer.tsx             ghost wordmark + blinking terminal underscore, local time, back-to-top
  sections/Hero.tsx            sticky pin, uppercase statement (accent line), mono meta w/ live time
  sections/HeroCanvas.tsx      R3F single-hue flow-field shader (dynamic, ssr:false; pause-by-scroll)
  sections/About.tsx           WordReveal manifesto, sticky portrait, stats, experience rows (paper)
  sections/Work.tsx            sticky-stack project cards (GSAP scrub) (paper)
  sections/ProjectCard.tsx     hue cover + glass caption bar + case-study meta; next/image-ready
  sections/Skills.tsx          dark bento (// NN kickers) + tech marquee + process steps 01–04
  sections/Testimonials.tsx    grotesk pull-quotes, hairline cards (paper)
  sections/Contact.tsx         dark showpiece CTA, oversized email link (accent line)
  ui/Eyebrow.tsx  ui/Reveal.tsx  ui/SplitLines.tsx  ui/WordReveal.tsx  ui/Marquee.tsx  ui/CountUp.tsx  ui/MagneticButton.tsx
                               (Cursor.tsx removed — 0/9 refs had a custom cursor)

content/site-data.ts      single typed schema, all dummy content, // TODO markers (unchanged)
lib/media.ts              useMedia / useReducedMotion / usePointerFine hooks
```

## Per-component spec — role · motion · breakpoints

| Component | Does | Motion | 1440 → 834 → 390 |
| --- | --- | --- | --- |
| **Preloader** | Brand moment; masks font/shader warm-up. Skipped after first view (sessionStorage) & under reduced motion | Mono counter 000→100 (eased ~1.4s), wordmark fade; exit = two stacked panels wipe up with `expo.inOut`; fires `loaderDone` | identical; type scales down |
| **SmoothScroll** | Lenis inertia; drives `ScrollTrigger.update` via `gsap.ticker`; anchor clicks → `lenis.scrollTo` | — (infrastructure) | disabled under reduced motion; native scroll on touch (Lenis `syncTouch` off) |
| **Cursor** | Studio signature; communicates interactivity | Dot follows raw; ring on `useSpring` lag; over `[data-cursor="view"]` ring grows to pill "View"; over links scales 1.6× | pointer-fine only (hidden on touch/tablet); off under reduced motion |
| **Nav** | Orientation + wayfinding | Slides out on scroll-down, back on scroll-up (transform); ground fades to glass blur after 48px; active link underline (layoutId) | full links → same → wordmark + menu button opening full-screen sheet (stagger links) |
| **Hero** | The statement. Name, role line, huge two-line headline, meta row (location/availability), scroll cue | Waits for `loaderDone`: lines mask-reveal upward (stagger 90ms, `expo.out`); meta row fades up last; GSAP scrub: headline drifts −8vh & canvas dims as you leave hero | 2-line display at `clamp` sizes; meta row wraps; scroll cue hidden at 390 |
| **HeroCanvas** | Ambient depth without stock assets | Original GLSL fbm flow-field, warm-black + amber glow, slow drift + pointer influence; DPR ≤ 1.5; `frameloop` paused when off-screen; static radial-gradient fallback (no WebGL / reduced motion) | identical; pointer influence off on touch |
| **About** | Human proof: bio, 3 stats, 4 experience rows | Portrait block parallax (GSAP scrub ±6%); bio paragraphs `Reveal` stagger; stats `CountUp` on view; rows reveal with hairline draw | 2-col (5/7) → stacked, portrait 60vw → full-width |
| **Work** | 5 case studies, curated feel | Cards `position:sticky` stack; GSAP scrub scales outgoing card 1→0.94 + dims as next covers it; cover gradient slow-pans on hover; `data-cursor="view"` | full cards → same, shorter → non-sticky vertical list (plain cards) at 390 |
| **Skills** | Capability map + method | Bento tiles reveal in grid stagger; tech `Marquee` (CSS keyframes, pauses on hover/reduced-motion); process steps 01–04 slide in sequentially | 4-col bento → 2-col → 1-col; marquee speed constant |
| **Testimonials** | Trust; deliberately quiet | Serif quotes fade/rise once; no carousel, no autoplay | 2-up + 1 wide → stacked |
| **Contact** | Single job: start a conversation | Headline `SplitLines` reveal; email link hover = fill-slide + arrow nudge; availability badge pulses (opacity only) | email at `clamp(2rem,6vw,5rem)`; stacks |
| **Footer** | Editorial close | Giant wordmark clipped at baseline, slight parallax rise; local-time ticker (1s interval, text only) | wordmark scales via `clamp`; meta stacks |

## Motion budget & rules (from DESIGN_DNA)

- `transform`/`opacity` only; no animated layout properties, no `filter` scrubs.
- One WebGL context (hero); everything else CSS/JS transforms.
- All reveals `once: true`; triggers at 75–85% viewport so text is at rest when read.
- Reduced motion ⇒ no Lenis, no pin/scrub, no marquee drift, no cursor, no shader,
  no counters; opacity-only ≤200ms fades; everything visible without JS-driven state.

## Implementation order (Phase 5)

globals/tokens+fonts → content schema → SmoothScroll/LoaderContext → Preloader →
Cursor → Nav → Hero(+Canvas) → About → Work → Skills → Testimonials → Contact →
Footer → polish pass (focus states, metadata, perf). `pnpm dev` stays green after
each step; `pnpm build` gate before commit.
