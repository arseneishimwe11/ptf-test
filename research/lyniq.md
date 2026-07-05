# Lyniq ⭐ — lyniq.framer.website (favorite — studied closest)

> **Observed 2026-07-05** via headless Chromium at 1440/834/390. Evidence:
> `research/lyniq/*.png` + `research/lyniq/audit.json` (computed styles,
> Web Animations API timings, network log). This replaces the earlier
> marketplace-listing guesses — several of them were wrong.

**Page:** 16,023px tall at 1440w (≈17.8 viewports). Single long homepage.

## Palette (computed, frequency-ranked)
- **Ground is WHITE, not dark** (the old note guessed "deep near-black" —
  wrong). Body sections: `#ffffff` (×91), light gray cards `#f5f5f5`.
- Ink: `#0b0b0c` / `#0c0c0c` (near-black, neutral — not warm), secondary at
  60% and 40% alpha of the same ink.
- **Accent: `#f9452d`** — vivid red-orange. Used for: the entire preloader
  screen, link arrows (↳ / →), tag numerals `{01}`, pricing toggle, "Most
  popular" chip, star ratings, one testimonial card gradient. It even
  appears in the template's own copy ("Fix button color: #F9452D").
- Contrast blocks: `#0c0c0c` dark sections (services list, some cards),
  `#323232` gray-dark. One lime `#d2ff37` detail. White at 0.2–0.6 alpha for
  text on dark.
- Rhythm = **white ground, dark contrast bands, one loud accent** —
  alternating light/dark sections, not a uniformly dark site.

## Typography (loaded + computed)
- **Everything is Inter** — 500 (×306), 600 (×99), 700 (×22). No serif
  anywhere on the page.
- **Bebas Neue 400** (condensed caps) for the wordmark "LYNIQ®" only —
  loader, nav logo, footer (49px, lh 0.85, ls −4%).
- Geist 500 + Fragment Mono referenced by components but barely used.
- Fonts served from framerusercontent.com + fontshare + gstatic (Geist).
- **Signature: aggressive negative tracking that scales with size**:
  16px body → ls −0.64px (−4%); h2 46px/50.6 → ls −3.22px (−7%);
  hero display "Digital" **427px Inter 700, lh 0.8, ls −6%**.
- h3 26px/33.8 −4%. Stats numerals ~140px. Meta/labels 16px Inter 500.
- h2 scale: 46px; section statements up to ~120px ("Flexible pricing",
  "FAQ" ~200px+).

## Layout & rhythm (measured)
- Hero: full-viewport (900px) full-bleed duotone/chromatic photo (red/cyan),
  knocked-out white display headline "Digital Design Studio" broken over two
  staggered lines, bottom-left aligned; services list (UX/UI Design /
  Development / Brand Identity Design / Ongoing Support) right-aligned;
  "©19-24" label; small intro paragraph bottom-left. Nav: logo left,
  ABOUT / PROJECTS (17) / CONTACT center, MENU + hamburger right.
- Section flow: Hero → **stats band** (white; 4 numerals w/ hairline top
  rules, count-up: captured "15+/80%" mid-count vs "16+/89%" settled) →
  **giant statement band** ("From ordinary to extraordinary", dark image
  block behind text) → showreel block w/ play button → benefits cards
  (4-up, mixed white/dark/red/photo cards) → **Work** ("Proven results,
  stunning designs" + ghost watermark text behind) with 2-col asymmetric
  project grid (image cards + title + one-line desc + pill tags
  BRANDING/WEB DESIGN…) → "→ All cases (17)" → **Services** (dark `#0c0c0c`:
  giant list Branding / Development / Websites / Design support with
  `{01}`–`{04}` red indices; active row white, inactive rows ~20% gray;
  sticky image thumbnail left; "↳ See pricing") → pull-quote testimonial
  (b/w portrait + large quote + name/role) → logo strip (hairline-ruled
  cells) → "Meet our team" full-bleed photo band w/ stat readouts → pricing
  (3 cards on `#f5f5f5`, monthly/annual pill toggle, red CTA on featured) →
  "Our process" (sticky heading left; numbered 01–04 hairline rows right)
  → "Success stories" (4 mixed cards: white/photo/dark/light) → FAQ
  (giant heading, accordion with red + icons) → Latest Insights (blog
  cards) → **footer**: dark CTA band ("Let's bring your vision to life" +
  form) then white lower footer with giant LYNIQ® wordmark, "Stay
  connected" newsletter, link columns.
- Section padding: 160–220px (Numbers: padT 160/padB 220; Benefits: padT
  200/padB 160; Work: padB 160). Content max ~1368px (36px side margins).
- **Radius scale: 50px pills everywhere** (×63: buttons, tags, toggle),
  perfect circles (avatars, icon buttons), cards 10–16px. No 2xl-card look —
  pills + near-square cards.

## Motion (Web Animations API + computed)
- **Preloader:** full-screen solid `#f9452d` with white Bebas "LYNIQ®" +
  "Digital design studio". Logo animates with
  `cubic-bezier(0.96, -0.02, 0.38, 1.01)` over 1000ms (slight anticipation
  dip, fast middle, settle) — then the red screen exits and hero enters.
- **Entrance choreography:** staggered fade+rise pairs (opacity+transform
  always animated together). Measured delays: 400 / 600 / 1330 / 1350 /
  1500 / 1700 / 1750ms; durations 360–1320ms. Framer bakes eases into
  dense linear() keyframes (springs sampled per-frame).
- **Hero pins:** `section[Hero]` is `position: sticky` (z:1) — the stats
  band scrolls up **over** the hero. The statement band's heading is sticky
  too (scroll-linked image/text overlap).
- Count-up stats on scroll into view.
- **Hovers:** `color 0.3s cubic-bezier(0.44, 0, 0.56, 1)` (≈ sine in-out)
  ×13; `background/box-shadow 0.3s` same curve; 0.4s variant on some.
- **Smooth scroll: Lenis 1.3.23 confirmed** — `lenis.css` loaded from
  unpkg; `lenis` class on html. No GSAP, no THREE, no canvas, no video on
  the homepage. All motion is Framer Motion (`motion.mjs` chunk) +
  scroll-linked stickiness.
- Nav is `position: relative` — it scrolls away; the fullscreen MENU
  overlay (red panels, "Wrapper Top/Bottom" `#f9452d` slabs 2× viewport)
  handles wayfinding from deep in the page. A fixed full-viewport
  `pointer-events:none` div (z 9999) hosts overlay/transition chrome.
- No custom cursor (link cursor: pointer, body: auto — the old "custom
  cursor" guess was wrong).

## What we take (for a solo-engineer portfolio, rebuilt from scratch)
- Loader → hero as one choreographed sequence on the accent color; the
  wipe easing (anticipation → settle) reused for hero text rise.
- Sticky hero that the first content band slides over (cheap, powerful).
- Alternating white/dark section rhythm with ONE loud accent.
- Services/skills as a giant dim-list with red indices + active-row
  highlight.
- Tight-tracked huge Inter-style display type; hairline-ruled stats with
  count-up.
- Pill radius language (buttons/tags) against square-ish media cards.
- Lenis + 0.3s sine-in-out micro-transitions.

## What we skip
- Stock photography everywhere (our IP rule: generated assets only).
- Pricing/FAQ/blog/team (agency furniture, not solo-portfolio).
- Multi-page CMS + page transitions (single page).
