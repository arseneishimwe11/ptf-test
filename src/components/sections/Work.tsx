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
 * card scales to 0.94 and dims (brightness filter, stays opaque), scrubbed.
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
        gsap.to(wrapper.querySelector("[data-card]"), {
          scale: 0.94,
          // Dim with a filter, not opacity: opacity made the card translucent,
          // so the stacked card underneath showed through its text.
          filter: "brightness(0.4)",
          ease: "none",
          scrollTrigger: {
            trigger: wrappers[i + 1],
            start: "top 85%",
            end: "top 15%",
            scrub: true,
          },
        });
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
            <div data-card className="h-full origin-top will-change-transform">
              <ProjectCard project={project} index={i} />
            </div>
          </div>
        ))}
        {/* spacer so the last pinned card releases cleanly */}
        {stacked && <div aria-hidden className="h-[6vh]" />}
      </div>
    </section>
  );
}
