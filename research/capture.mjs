/**
 * Phase 1 capture script — run in an environment with open egress:
 *   node research/capture.mjs
 *
 * Requires: `npm i -D playwright` (or a preinstalled Chromium via
 * PLAYWRIGHT_BROWSERS_PATH). Captures, per reference site:
 *   - full-page screenshots at 1440 / 834 / 390 px widths
 *   - viewport-step scroll shots (desktop) to catch scroll-triggered reveals
 *   - a JSON dump of detected fonts, colors, border-radii, and library hints
 *
 * NOTE: this could not be executed in the original build session — the
 * sandbox's network policy returned 403 for *.framer.website / *.framer.ai.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITES = {
  majd: "https://majd-portfolio.framer.website/",
  lyniq: "https://lyniq.framer.website/",
  hanza: "https://hanza-template.framer.website/",
  jayden: "https://jayden-portfolio.framer.website/",
  davies: "https://davies.framer.website/",
  platform: "https://plat-form.framer.ai/",
  portavia: "https://portavia.framer.website/",
  sensoria: "https://sensoria.framer.website/",
  clearpath: "https://clearpath-template.framer.website/",
};

const BREAKPOINTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-834", width: 834, height: 1112 },
  { name: "mobile-390", width: 390, height: 844 },
];

const audit = () => {
  const colors = new Set();
  const fonts = new Set();
  const radii = new Set();
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.color) colors.add(cs.color);
    if (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)")
      colors.add(cs.backgroundColor);
    fonts.add(`${cs.fontFamily} · ${cs.fontWeight}`);
    if (cs.borderRadius !== "0px") radii.add(cs.borderRadius);
  }
  return {
    title: document.title,
    colors: [...colors].slice(0, 60),
    fonts: [...fonts].slice(0, 40),
    radii: [...radii].slice(0, 30),
    hints: {
      canvas: document.querySelectorAll("canvas").length,
      lenis: !!(window.Lenis || document.documentElement.classList.contains("lenis")),
      gsap: !!window.gsap,
      three: !!window.THREE,
      scripts: [...document.scripts].map((s) => s.src).filter(Boolean).slice(0, 20),
    },
  };
};

const browser = await chromium.launch();
for (const [name, url] of Object.entries(SITES)) {
  const dir = path.join("research", name);
  await mkdir(dir, { recursive: true });
  for (const bp of BREAKPOINTS) {
    const page = await browser.newPage({ viewport: { width: bp.width, height: bp.height } });
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      await page.waitForTimeout(3_000); // let splash screens finish
      await page.screenshot({ path: path.join(dir, `${bp.name}-full.png`), fullPage: true });
      if (bp.name.startsWith("desktop")) {
        const total = await page.evaluate(() => document.body.scrollHeight);
        let step = 0;
        for (let y = 0; y < total; y += bp.height) {
          await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
          await page.waitForTimeout(1_200); // allow scroll-triggered reveals to play
          await page.screenshot({ path: path.join(dir, `${bp.name}-scroll-${step++}.png`) });
        }
        await writeFile(path.join(dir, "audit.json"), JSON.stringify(await page.evaluate(audit), null, 2));
      }
      console.log(`✓ ${name} @ ${bp.name}`);
    } catch (err) {
      console.error(`✗ ${name} @ ${bp.name}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
}
await browser.close();
