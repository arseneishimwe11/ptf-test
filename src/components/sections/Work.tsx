"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/content/site-data";
import { useMedia, useReducedMotion } from "@/lib/media";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky-stack case studies (the Lyniq sticky-scroll idea, rebuilt):
 * each card pins below the nav; as the next one slides over, the outgoing
 * card scales to 0.94 and a black overlay fades in over it (card stays opaque).
 * Mobile (<768px) and reduced motion get a plain stacked list.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const desktop = useMedia("(min-width: 768px)", true);
  const { work } = siteData;
  const stacked = desktop && !reduced;

  useGSAP(
    () => {
      if (!stacked || !root.current) return;
      const wrappers = gsap.utils.toArray<HTMLElement>("[data-card-wrapper]");
      wrappers.forEach((wrapper, i) => {
        if (i === wrappers.length - 1) return;
        // One timeline per outgoing card, scrubbed with a little smoothing so
        // the motion eases instead of tracking every wheel tick.
        // The card itself stays fully opaque (no opacity/filter on it, which
        // caused bleed-through and flicker); a black overlay fades in instead.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrappers[i + 1],
            start: "top bottom",
            end: "top 12%",
            scrub: 0.6,
          },
        });
        tl.to(wrapper.querySelector("[data-card]"), { scale: 0.94, ease: "none" }, 0).to(
          wrapper.querySelector("[data-dim]"),
          { opacity: 0.55, ease: "power1.in" },
          0,
        );
      });
    },
    { scope: root, dependencies: [stacked] },
  );

  return (
    <section ref={root} id="work" className="band-dark section-pad">
      <div className="container-site">
        <Eyebrow index="02">{work.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="heading mb-16 max-w-2xl text-4xl md:text-6xl">
            {work.heading}
          </h2>
        </Reveal>
      </div>

      <div className="container-site">
        {work.projects.map((project, i) => (
          <div
            key={project.slug}
            data-card-wrapper
            className={
              stacked
                ? "group sticky top-[10vh] mb-[9vh]"
                : "group mb-8"
            }
            style={stacked ? { zIndex: i + 1, height: "max(80vh, 640px)" } : undefined}
          >
            <div data-card className="relative h-full origin-top will-change-transform">
              <ProjectCard project={project} index={i} />
              {stacked && (
                <div
                  aria-hidden
                  data-dim
                  className="pointer-events-none absolute inset-0 rounded-card bg-black opacity-0 will-change-[opacity]"
                />
              )}
            </div>
          </div>
        ))}
        {/* spacer so the last pinned card releases cleanly */}
        {stacked && <div aria-hidden className="h-[6vh]" />}
      </div>
    </section>
  );
}
