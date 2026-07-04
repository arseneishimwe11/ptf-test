"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/content/site-data";
import { useLoader } from "@/components/providers/LoaderContext";
import { useReducedMotion } from "@/lib/media";
import SplitLines from "@/components/ui/SplitLines";

gsap.registerPlugin(ScrollTrigger);

// WebGL is optional garnish: loaded client-side only, never blocks paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const { done } = useLoader();
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const { hero, identity } = siteData;

  // Entrance choreography gated on the preloader's exit. The animate target
  // is always defined (never undefined→object) so late `reduced`/`done`
  // updates reliably re-trigger. Reduced motion ⇒ short opacity-only fade.
  const visible = done || reduced;
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 24 },
    transition: reduced
      ? { duration: 0.2 }
      : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  // Leaving the hero: headline drifts up and the canvas dims — depth without
  // moving anything the user is still reading.
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to("[data-hero-inner]", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Ambient layer: shader when motion is allowed, still gradient when not */}
      {!reduced && <HeroCanvas />}
      <div
        aria-hidden
        className={`absolute inset-0 ${
          reduced
            ? "bg-[radial-gradient(90%_70%_at_20%_10%,rgba(232,100,44,0.12),transparent_60%),radial-gradient(80%_60%_at_85%_90%,rgba(232,100,44,0.07),transparent_55%)]"
            : "bg-gradient-to-b from-ground/40 via-transparent to-ground"
        }`}
      />

      <div data-hero-inner className="container-site relative pb-16 pt-40 md:pb-24">
        <motion.p className="eyebrow mb-8" {...entrance(0.15)}>
          {hero.eyebrow}
        </motion.p>

        <SplitLines
          as="h1"
          lines={hero.headline}
          play={done}
          delay={0.25}
          className="display text-[clamp(3rem,10.5vw,9.5rem)]"
        />

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-base leading-relaxed text-muted md:text-lg"
            {...entrance(0.65)}
          >
            {hero.subline}
          </motion.p>

          <motion.dl
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
            {...entrance(0.8)}
          >
            <div>
              <dt className="eyebrow mb-1">Location</dt>
              <dd className="text-sm">{identity.location}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Status</dt>
              <dd className="flex items-center gap-2 text-sm">
                <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                {identity.availability}
              </dd>
            </div>
            <div aria-hidden className="hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted sm:flex">
              {hero.scrollCue}
              <motion.span
                animate={reduced ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
