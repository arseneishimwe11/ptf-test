# Majd — majd-portfolio.framer.website

> **Observed 2026-07-05.** Evidence: `research/majd/*.png` +
> `research/majd/audit.json`. Replaces marketplace-guess notes.
> The closest reference to our brief: a solo **software engineer** one-pager.

**Page:** 7,798px at 1440w (≈8.7 viewports) — the shortest, most focused
reference.

## Palette (computed)
- Ground: **warm off-white `#faf7f3`** (cream) with a subtle noise/grain
  texture. Ink `#111111`. Hairlines: `#000000 @0.1`.
- Dark blocks: `#111111` (footer, testimonial cards, nav pill, buttons).
- **No hue accent at all** — the palette is strictly cream/ink; color
  arrives only through project-cover artwork (green/purple/pink/blue
  covers) and tiny chrome-gradient 3D sparkle decorations in the hero.
- Muted text = ink @0.5.

## Typography (loaded + computed)
- **Single family: Archivo** — 300/400/500/600/700/800 all loaded.
  Body 16px Archivo 400/500. h3 32px/38.4 −2%.
- Display: **h1 174px Archivo 800 UPPERCASE, lh 0.9, ls −2%**
  ("SOFTWARE ENGINEER" on two centered lines).
- Footer ghost wordmark "MAJD" **417px Archivo 700, ls −2%**, clipped by
  the page bottom.
- "©2026" 68px Archivo 600. Meta labels like "/CREATING SINCE 2021" are
  Archivo with slashes, not a mono face.

## Layout & rhythm
- **Nav = floating centered pill** (`#111`, pill radius, 35px tall,
  `position: fixed`): "Majd" + "…" menu dot button. Persists over all
  sections.
- Hero (100vh): giant centered 2-line uppercase headline; sticky portrait
  photo (b/w, small rectangle) bottom-center; "©2026" bottom-left;
  "/CREATING SINCE 2021" bottom-right; two small 3D chrome sparkle/bolt
  shapes flank the headline (the only decoration).
- **Sticky-avatar double section**: "Sticky Avatar Wrap" (1800px) keeps the
  portrait pinned while hero hands off to the bio ("Hey!" + 2-col
  bio/CTA "Get Started ↗").
- **Word-reveal statement** (~1350px scroll region): a 4-line paragraph
  where words tint from ink@0.1 → ink as you scroll (scroll-linked color
  fill, "From idea to launch…").
- Services: h2 + **4 hairline rows** (Website Migration / Framer Templates /
  Frontend Development / Product Consulting), each row with small
  tag-links right (Web Migration · Optimization · Framer Rebuild).
- Featured Projects: 2×2 grid of cards — each a full-color cover mock
  (rounded 20px) on the cream ground, name + one-line meta below,
  "View All Work ↗" top-right.
- Testimonials: 4-up row of `#111` dark cards (rounded 20px), small
  avatars, quote, name/role.
- Thoughts (blog): 2 photo cards + 1 dark CTA card.
- "Let's talk." + contact form (dark rounded panel right, statement left).
- Footer `#111`: "Scaling Start-ups for Growth." + /Quick links pills +
  /Contact, giant ghost "MAJD" behind.
- Section padding: **120px** standard (Projects/Testimonials/Contact padT
  120; footer padT 120/padB 300). Radii: **20px cards / 8px small / big
  pills** (226/371px measured on pill shapes).

## Motion
- **Lenis confirmed** (class on html). No GSAP/THREE/canvas/video.
- Entrance: long soft ease-out reveals — baked curves 1600ms & 2800ms
  (reaching ~50% value at ~18% time, ~95% at 50% — expo-out family),
  delays 0/250/1000/1400ms. Headline lines rise+fade sequentially, then
  meta fades.
- Scroll: word-by-word color reveal (scroll-linked, not triggered);
  sticky portrait handoff; gentle whole-card rises at ~75% viewport.
- **Hover: rolling-text links** (`.rolling-text-inner-rs` duplicate-line
  slide) on nav/links; `color 0.3s linear` (×27) on links;
  `background/box-shadow 0.2s cubic-bezier(0.44,0,0.56,1)` on buttons.
- No custom cursor. No loader (page enters directly with the reveals).

## What we take
- Proof that **cream + ink + one family at many weights** reads premium
  with zero hue accent — typography does all the work.
- The sticky-portrait hero→bio handoff.
- Scroll-linked word-reveal statement (our manifesto moment).
- Hairline service rows with per-row tag chips.
- Floating pill nav (persists, tiny footprint).
- Ghost clipped wordmark footer.

## What we skip
- Chrome 3D sparkle decorations (stock-ish trinkets; our assets must be
  self-generated).
- Framer-templates positioning/copy.
