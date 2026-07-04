# Phase 1 — Reference Research

## ⚠️ Methodology note (read first)

The build environment's network policy **blocks direct access to the reference sites**
(`*.framer.website` and `*.framer.ai` return `403` at the egress proxy for both
Playwright/curl and WebFetch). Live full-page screenshots at 1440/834/390 px and
computed-style extraction were therefore **not possible** in this session.

The audit was adapted as follows:

1. **Web search** against the Framer Marketplace listings, template-review sites
   (yoframer, framerbite, gola.supply, frameradar, templifica, etc.) and the
   template authors' own descriptions for each of the 9 sites.
2. **Genre knowledge** of the current premium Framer-portfolio idiom (dark editorial
   palettes, Lenis smooth scroll, splash preloaders, ticker marquees, sticky-stack
   case-study cards, oversized display type) to fill in interaction detail that the
   listings describe but don't name precisely.

Consequences for the notes in this folder:

- Palettes are described **qualitatively** ("near-black ink, warm off-white,
  single accent"), not as measured hex values.
- Interaction patterns are labelled *(reported)* when they come from a listing or
  review, *(typical)* when inferred from the template genre.
- There are **no screenshot PNGs**. If this repo is later opened in an environment
  with open egress, `research/capture.mjs` re-runs the originally planned
  Playwright capture (3 breakpoints + scroll increments per site) and drops PNGs
  into `research/<site>/`.

None of this changes the IP posture: the new site copies **no** code, assets, or
copywriting from any reference — only layout rhythm, motion idioms, and structural
ideas, re-synthesized from scratch.

## Files

| File | Site | Focus |
| --- | --- | --- |
| `majd.md` | majd-portfolio.framer.website | restraint, Lenis flow, conversion clarity |
| `lyniq.md` ⭐ | lyniq.framer.website | splash loader, tickers, sticky scroll, page transitions |
| `hanza.md` | hanza-template.framer.website | section hierarchy, services/testimonials structure |
| `jayden.md` | jayden-portfolio.framer.website | one-page flow, case-study depth |
| `davies.md` | davies.framer.website | one-page spacing rhythm, bold simplicity |
| `platform.md` | plat-form.framer.ai | bento modularity, dark editorial system, conversion order |
| `portavia.md` | portavia.framer.website | minimal project showcase, modular case-study layouts |
| `sensoria.md` | sensoria.framer.website | immersive dark hero, live-metric stats, sci-fi motion |
| `clearpath.md` | clearpath-template.framer.website | soft palette contrast, calm pacing (counter-reference) |
