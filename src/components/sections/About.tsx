"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/content/site-data";
import { useReducedMotion } from "@/lib/media";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { about } = siteData;

  // Gentle counter-parallax on the portrait — depth, not distraction.
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-portrait]",
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} id="about" className="section-pad">
      <div className="container-site">
        <Eyebrow>{about.eyebrow}</Eyebrow>

        <div className="grid gap-16 md:grid-cols-12">
          {/* Portrait — generated composition. [PLACEHOLDER IMAGE]: swap for a
              real photo via next/image; keep the 4:5 ratio. */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface">
                <div
                  data-portrait
                  className="cover-gradient cover-noise absolute -inset-y-[8%] inset-x-0"
                  style={{ "--cover-hue": 18 } as React.CSSProperties}
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="eyebrow">
                    {siteData.identity.name} — {siteData.identity.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <h2 className="display max-w-xl text-4xl md:text-6xl">
                {about.heading}
              </h2>
            </Reveal>

            <div className="mt-10 max-w-xl space-y-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * (i + 1)}>
                  <p className="leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {about.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.08 * i}>
                  <div className="hairline pt-5">
                    <dd className="display text-5xl text-ink">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>

            <div className="mt-16">
              <Reveal>
                <h3 className="eyebrow mb-6">Experience</h3>
              </Reveal>
              <ol>
                {about.experience.map((job, i) => (
                  <Reveal key={job.company} delay={0.06 * i}>
                    <li className="hairline grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                      <div>
                        <p className="text-ink">
                          {job.role}
                          <span className="text-muted"> · {job.company}</span>
                        </p>
                        <p className="mt-1 text-sm text-muted">{job.note}</p>
                      </div>
                      <p className="font-mono text-xs tracking-[0.15em] text-muted sm:pt-1">
                        {job.period}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
