# Adrian Vale — Premium Portfolio Template

A cinematic, single-page-scroll portfolio for a software engineer, built as a
**template**: every word on the page is realistic dummy content that lives in
one typed file, ready to be swapped for real data.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 ·
Framer Motion · GSAP + ScrollTrigger · Lenis · React Three Fiber (one GLSL
shader, hero only) · `next/font` (Fraunces / Space Grotesk / JetBrains Mono).

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (static, Vercel-ready zero-config)
pnpm start
```

## Swap in real content — the only file you need

Everything rendered on the page comes from **`src/content/site-data.ts`**.
Every field carries a `// TODO: replace with real content` marker. Edit that
one file to change:

| Block | What it controls |
| --- | --- |
| `identity` | name, role, location, availability, email, `<title>`/meta |
| `nav` | link labels + CTA |
| `hero` | eyebrow, the two headline lines, subline |
| `about` | heading, bio paragraphs, the 3 count-up stats, experience rows |
| `work.projects` | the 5 case-study cards (title, tagline, description, year, role, stack chips, outcome line, cover hue) |
| `skills` | bento tiles, marquee technology list, 4 process steps |
| `testimonials` | quotes, names, titles |
| `contact` | headline lines, body, social links |
| `footer` | colophon + tech note |

### Replacing placeholder images

There are **no image files** in the template — covers and the portrait are
generated gradient + noise compositions (marked `[PLACEHOLDER IMAGE]` in
code comments):

- **Project covers** — set `image: "/covers/my-shot.jpg"` on a project in
  `site-data.ts` and drop the file in `public/`; `ProjectCard` automatically
  switches from the generated gradient to `next/image`. Until then, tweak the
  `hue` field (degrees, 0–360) to re-tint the generated cover per project.
- **Portrait** — `src/components/sections/About.tsx`, the block marked
  `[PLACEHOLDER IMAGE]`; swap the gradient `div` for a `next/image` with the
  same 4:5 aspect wrapper.

## Where things live

```
src/
  app/               layout (fonts/meta), page (section order), globals.css (design tokens)
  content/           site-data.ts — ALL copy, typed
  components/
    providers/       Lenis smooth-scroll bridge, preloader→hero handoff context
    shell/           Preloader, Cursor, Nav, Footer
    sections/        Hero (+HeroCanvas shader), About, Work, ProjectCard,
                     Skills, Testimonials, Contact
    ui/              Reveal, SplitLines, Eyebrow, Marquee, CountUp, MagneticButton
  lib/               SSR-safe media-query hooks
```

Design decisions (palette, type, motion philosophy) are documented in
`DESIGN_DNA.md`; the build plan in `PLAN.md`; reference research in
`research/` (see its README for the audit methodology note).

## Motion & accessibility contract

- All animation is `transform`/`opacity` only; reveals fire once, before the
  eye arrives; nothing re-animates on scroll-up.
- One WebGL context (hero flow-field), DPR-capped at 1.5, paused off-screen,
  code-split so it never blocks first paint.
- `prefers-reduced-motion` is a first-class fallback: no smooth-scroll
  hijack, no shader, no cursor, no marquee drift, no pinned cards — short
  opacity fades only, everything readable and complete.
- Keyboard: skip-link, logical tab order, visible `:focus-visible` rings.
  The custom cursor is additive — the native cursor is never hidden.
- Preloader runs once per session (`sessionStorage`) and is skipped under
  reduced motion.

## Theming quick reference

Design tokens are CSS variables in `src/app/globals.css` under `@theme`:
ground `#0C0B09`, ink `#EDE8DF`, muted `#8A8578`, accent `#E8642C`, radius
scale 2/20px, and the three font families. Change the accent once and the
cursor, links, badges, marquee glyphs, and cover tints all follow.
