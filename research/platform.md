# Platform® — plat-form.framer.ai

> **Observed 2026-07-05.** Evidence: `research/platform/*.png` +
> `research/platform/audit.json`. Replaces marketplace-guess notes.

**Page:** 21,423px at 1440w — the longest reference (SaaS landing, not a
portfolio).

## Palette (computed)
- Ground `#161719` (cool near-black); **raised cards `#212225`** (×654 —
  the bento system is literally the most common background on the page);
  borders/`#2c2c2f`/`#434346`.
- Ink: warm off-white **`#e3dbd8`** for headings (×149), `#c0c0c0` body
  (×180), `#888891` muted.
- **Accent `#fa6e43`** (orange — the 4th reference with a red/orange
  accent) ×150 backgrounds + ×32 text; used inline *inside* headlines
  ("to **build, run,** and **scale**" with the verbs in orange).

## Typography (loaded + computed)
- **Inter Display 400/500/600/700** exclusively (+ Inter 400 italic).
- Display: h1 **100px/90 (lh 0.9) ls −5%**, weight 500 (not bold — the
  refined look comes from mid-weight + tight tracking at huge size).
- Em-dash prefix on statements ("— The smarter way…"), `//`-prefixed
  labels ("// Latest Release"). Stat readouts with superscript % units.
- h2 28px/33.6 −4%.

## Layout & rhythm
- Hero: 1440×900 **particle-field canvas** (drifting bokeh/star dots on
  black) behind a left-aligned 3-line statement with orange keywords;
  small "You innovate, we automate." vertical-rule label left; stat row
  under CTA (`97.8% Uptime / +10.9% Performance`); "Neural Network //
  Latest Release" card right; orange "Book a Demo" button.
- Flow: Hero(900) → Intro(1080, statement) → Work(2460, featured product
  cards w/ project videos 764px) → Services(1688) → Process(1700, step
  cards) → Analytics(1980) → Pricing → Testimonials → Contact → Footer.
- **Bento discipline**: everything is a `#212225` card; **radius 2px
  (×144) and 8px (×142)** — sharp, technical corners, not rounded; 1px
  borders; consistent gaps. 120px section padding.
- 2 canvases (hero particles + 993×420 analytics viz), 4 videos (project
  covers), **Lenis confirmed**.

## Motion (measured)
- **The overshoot house style**: `cubic-bezier(0, 1.03, 0.56, 1)` at
  700/1000/1200ms — fast launch, slight overshoot, long settle. Plus
  `cubic-bezier(0.01, 1.04, 0.5, 0.96)` 1400ms and
  `cubic-bezier(0.6, 0, 0.38, 1.01)` 1000ms (in-out with settle) and a
  2000ms baked spring (value 1.0095 at 50%).
- Entrance cascade delays 0→1100ms in ~100ms steps; hero elements pop in
  sequence (headline lines → label → stats → cards at 250ms each).
- Hovers: `opacity 0.2s ease-in-out` (×40 — the standard hover), snap
  state changes on cards.
- No loader; no custom cursor. Nav relative (scrolls away), hamburger
  opens overlay.

## What we take
- **Raised-card token system**: ground + one card color + 1px border —
  the whole site builds from three surfaces. Perfect for a skills bento.
- Accent-keyword-inside-headline device (orange verbs) — great for an
  engineer's hero statement.
- The overshoot easing family (fast out, 1–3% overshoot, settle) as our
  "confident" entrance signature, with Jayden's 100ms stagger.
- `//` mono-flavored labels; stat readouts with unit superscripts.
- Sharp 2–8px radii for data-ish cards (vs pill CTAs).

## What we skip
- SaaS sections (pricing/analytics/demo CTAs).
- Particle hero (we have our own shader direction; theirs is bokeh dots).
