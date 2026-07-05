/**
 * Phase 1 capture (the version that actually ran on 2026-07-05).
 * Usage: node research/capture.mjs [site1,site2,...]   (default: all)
 * Requires `playwright` importable; set CHROMIUM_PATH to reuse a
 * preinstalled browser. Per site it saves, under research/<site>/:
 * loader shots, scroll-step shots, full-page shots at 3 widths, and a
 * deep audit.json (fonts, colors, radii, easings via getAnimations,
 * section rhythm, nav behavior, hover probes, network hints).
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_ROOT = path.dirname(fileURLToPath(import.meta.url));

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

const only = process.argv[2] ? process.argv[2].split(",") : null;

// ---------- in-page snippets ----------

const sampleAnimations = () => {
  const anims = document.getAnimations({ subtree: true }).slice(0, 120);
  return anims.map((a) => {
    let t = {};
    try { t = a.effect.getTiming(); } catch {}
    let target = "";
    try {
      const el = a.effect.target;
      target = el
        ? `${el.tagName.toLowerCase()}${el.dataset.framerName ? `[${el.dataset.framerName}]` : ""}.${String(el.className).slice(0, 40)}`
        : "";
    } catch {}
    let kf = [];
    try {
      kf = a.effect.getKeyframes().map((k) => {
        const { offset, easing, composite, computedOffset, ...props } = k;
        return { offset: offset ?? computedOffset, easing, props: Object.keys(props).join(",") };
      }).slice(0, 6);
    } catch {}
    return {
      type: a.constructor.name,
      playState: a.playState,
      duration: t.duration,
      delay: t.delay,
      easing: t.easing,
      iterations: t.iterations === Infinity ? "inf" : t.iterations,
      target,
      keyframes: kf,
    };
  });
};

const fullAudit = () => {
  const freq = (map, key) => map.set(key, (map.get(key) || 0) + 1);
  const toHex = (rgb) => {
    const m = rgb.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if (!m) return rgb;
    const h = (n) => Math.round(+n).toString(16).padStart(2, "0");
    const a = m[4] !== undefined ? +m[4] : 1;
    return `#${h(m[1])}${h(m[2])}${h(m[3])}${a < 1 ? ` @${a}` : ""}`;
  };
  const colors = new Map(), bgs = new Map(), fonts = new Map(), radii = new Map(), transitions = new Map();
  const els = [...document.querySelectorAll("body *")];
  for (const el of els) {
    const cs = getComputedStyle(el);
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText && cs.color) freq(colors, toHex(cs.color));
    if (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)") freq(bgs, toHex(cs.backgroundColor));
    if (hasText) freq(fonts, `${cs.fontFamily.split(",")[0].replace(/"/g, "")} ${cs.fontWeight}`);
    if (cs.borderRadius && cs.borderRadius !== "0px") freq(radii, cs.borderRadius);
    if (cs.transitionDuration !== "0s" || cs.transitionProperty !== "all")
      freq(transitions, `${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}`.slice(0, 120));
  }
  const top = (map, n) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${k} ×${v}`);

  const loadedFonts = [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.style} (${f.status})`);

  const typeSample = {};
  for (const sel of ["h1", "h2", "h3", "h4", "p", "a", "nav a", "button", "[data-framer-name*='eyebrow' i]", "footer"]) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const cs = getComputedStyle(el);
    typeSample[sel] = {
      font: cs.fontFamily.split(",")[0].replace(/"/g, ""),
      size: cs.fontSize, weight: cs.fontWeight, lh: cs.lineHeight,
      ls: cs.letterSpacing, tt: cs.textTransform, color: cs.color,
      text: (el.textContent || "").trim().slice(0, 80),
    };
  }
  // biggest text on the page = display type
  let biggest = null;
  for (const el of els) {
    const cs = getComputedStyle(el);
    const sz = parseFloat(cs.fontSize);
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText && (!biggest || sz > biggest.px)) {
      biggest = { px: sz, font: cs.fontFamily.split(",")[0].replace(/"/g, ""), weight: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing, text: el.textContent.trim().slice(0, 90) };
    }
  }

  const sections = [...document.querySelectorAll("[data-framer-name], section")]
    .map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        name: el.dataset.framerName || el.tagName.toLowerCase(),
        y: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width),
        padT: cs.paddingTop, padB: cs.paddingBottom, maxW: cs.maxWidth, bg: toHex(cs.backgroundColor),
      };
    })
    .filter((s) => s.h > 250 && s.w > innerWidth * 0.5)
    .slice(0, 30);

  const nav = document.querySelector("header, nav, [data-framer-name*='nav' i], [data-framer-name*='header' i]");
  const navInfo = nav ? (() => {
    const cs = getComputedStyle(nav);
    return { name: nav.dataset?.framerName, position: cs.position, top: cs.top, bg: toHex(cs.backgroundColor), backdrop: cs.backdropFilter, h: Math.round(nav.getBoundingClientRect().height), transform: cs.transform, transition: cs.transition.slice(0, 140) };
  })() : null;

  const fixed = els.filter((el) => {
    const cs = getComputedStyle(el);
    return (cs.position === "fixed" || cs.position === "sticky") && el.getBoundingClientRect().height > 4;
  }).slice(0, 25).map((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), name: el.dataset?.framerName, pos: cs.position, z: cs.zIndex, size: `${Math.round(r.width)}x${Math.round(r.height)}`, pe: cs.pointerEvents, mix: cs.mixBlendMode };
  });

  let hoverRules = [];
  try {
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      for (const rule of rules) {
        if (rule.selectorText?.includes(":hover")) hoverRules.push(`${rule.selectorText.slice(0, 80)} { ${rule.style.cssText.slice(0, 160)} }`);
      }
    }
  } catch {}

  const html = document.documentElement;
  return {
    title: document.title,
    desc: document.querySelector("meta[name=description]")?.content,
    bodyBg: toHex(getComputedStyle(document.body).backgroundColor),
    htmlBg: toHex(getComputedStyle(html).backgroundColor),
    scrollHeight: document.body.scrollHeight,
    textColors: top(colors, 20),
    backgrounds: top(bgs, 25),
    fonts: top(fonts, 25),
    loadedFonts,
    radii: top(radii, 20),
    transitions: top(transitions, 25),
    typeSample,
    biggestText: biggest,
    sections,
    nav: navInfo,
    fixedEls: fixed,
    hoverRules: hoverRules.slice(0, 30),
    hints: {
      canvas: [...document.querySelectorAll("canvas")].map((c) => `${c.width}x${c.height}`),
      video: document.querySelectorAll("video").length,
      lenis: !!(window.Lenis || html.classList.contains("lenis") || document.querySelector("[class*=lenis]")),
      gsap: !!window.gsap, scrollTrigger: !!window.ScrollTrigger, three: !!window.THREE,
      framerGlobals: Object.keys(window).filter((k) => /framer|__framer/i.test(k)).slice(0, 10),
      scrollBehavior: getComputedStyle(html).scrollBehavior,
      bodyCursor: getComputedStyle(document.body).cursor,
      linkCursor: document.querySelector("a") ? getComputedStyle(document.querySelector("a")).cursor : null,
    },
  };
};

// ---------- runner ----------

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
  // Some MITM egress proxies reset on Chrome's TLS1.3 ClientHello; capping
  // the browser<->proxy leg to TLS1.2 keeps cert verification on while
  // avoiding the reset. Harmless without a proxy.
  args: process.env.HTTPS_PROXY ? ["--ssl-version-max=tls1.2"] : [],
});

for (const [name, url] of Object.entries(SITES)) {
  if (only && !only.includes(name)) continue;
  const dir = path.join(OUT_ROOT, name);
  await mkdir(dir, { recursive: true });
  const report = { url, capturedAt: new Date().toISOString(), network: {}, breakpoints: {} };

  for (const bp of BREAKPOINTS) {
    const desktop = bp.name.startsWith("desktop");
    const ctx = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: 1,
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    });
    const page = await ctx.newPage();
    const reqs = { scripts: new Set(), fonts: new Set(), other: new Set() };
    page.on("response", (res) => {
      const u = res.url();
      if (/\.m?js(\?|$)/.test(u)) reqs.scripts.add(u);
      else if (/\.(woff2?|ttf|otf)(\?|$)/.test(u)) reqs.fonts.add(u);
      else if (/lenis|gsap|three|spline|lottie/i.test(u)) reqs.other.add(u);
    });

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });

      if (desktop) {
        // loader / entrance phase
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(dir, `loader-0.png`) }).catch(() => {});
        const earlyAnims = await page.evaluate(sampleAnimations).catch(() => []);
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(dir, `loader-1.png`) }).catch(() => {});
        const heroAnims = await page.evaluate(sampleAnimations).catch(() => []);
        report.entranceAnimations = { at400ms: earlyAnims, at1200ms: heroAnims };
      }

      await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
      await page.waitForTimeout(desktop ? 2500 : 1500);

      if (desktop) {
        await page.screenshot({ path: path.join(dir, `hero-${bp.name}.png`) });
        // scroll steps
        const total = await page.evaluate(() => document.body.scrollHeight);
        let step = 0;
        const inc = Math.round(bp.height * 0.85);
        const midAnims = [];
        for (let y = inc; y < total && step < 16; y += inc) {
          await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
          await page.waitForTimeout(1200);
          await page.screenshot({ path: path.join(dir, `scroll-${String(++step).padStart(2, "0")}.png`) });
          if (step === 2 || step === 5) {
            const a = await page.evaluate(sampleAnimations).catch(() => []);
            midAnims.push({ step, anims: a.filter((x) => x.playState === "running").slice(0, 30) });
          }
        }
        report.scrollAnimations = midAnims;
        // nav state mid-page
        report.navScrolled = await page.evaluate(() => {
          const nav = document.querySelector("header, nav, [data-framer-name*='nav' i], [data-framer-name*='header' i]");
          if (!nav) return null;
          const cs = getComputedStyle(nav);
          const r = nav.getBoundingClientRect();
          return { visibleTop: r.top, bg: cs.backgroundColor, backdrop: cs.backdropFilter, transform: cs.transform };
        }).catch(() => null);

        // hover probe on a nav link and a project-ish card
        const hoverProbe = async (sel) => {
          const el = page.locator(sel).first();
          if ((await el.count()) === 0) return null;
          const before = await el.evaluate((e) => { const c = getComputedStyle(e); return { color: c.color, bg: c.backgroundColor, transform: c.transform, transition: c.transition.slice(0, 140) }; }).catch(() => null);
          await el.hover({ timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(600);
          const after = await el.evaluate((e) => { const c = getComputedStyle(e); return { color: c.color, bg: c.backgroundColor, transform: c.transform }; }).catch(() => null);
          return { before, after };
        };
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.waitForTimeout(800);
        report.hoverNavLink = await hoverProbe("nav a, header a").catch(() => null);
        await page.screenshot({ path: path.join(dir, `hover-nav.png`) }).catch(() => {});

        report.audit = await page.evaluate(fullAudit).catch((e) => ({ error: e.message }));
      }

      // full page (scrolled through already on desktop; for others scroll through quickly to trigger lazy loads)
      if (!desktop) {
        await page.evaluate(async () => {
          const total = document.body.scrollHeight;
          for (let y = 0; y < total; y += innerHeight) { scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 250)); }
          scrollTo({ top: 0, behavior: "instant" });
        });
        await page.waitForTimeout(800);
        report.breakpoints[bp.name] = await page.evaluate(() => {
          const h1 = document.querySelector("h1");
          const cs = h1 ? getComputedStyle(h1) : null;
          return { h1size: cs?.fontSize, h1lh: cs?.lineHeight, scrollHeight: document.body.scrollHeight };
        }).catch(() => null);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(dir, `${bp.name}-full.png`), fullPage: true, timeout: 45_000 }).catch((e) => console.error(`  fullpage fail ${name}@${bp.name}: ${e.message}`));

      report.network[bp.name] = { scripts: [...reqs.scripts].slice(0, 25), fonts: [...reqs.fonts].slice(0, 25), other: [...reqs.other] };
      console.log(`✓ ${name} @ ${bp.name}`);
    } catch (err) {
      console.error(`✗ ${name} @ ${bp.name}: ${err.message}`);
    } finally {
      await ctx.close();
    }
  }
  await writeFile(path.join(dir, "audit.json"), JSON.stringify(report, null, 2));
  console.log(`  audit.json written for ${name}`);
}

await browser.close();
console.log("DONE");
