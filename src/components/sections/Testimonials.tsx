"use client";

import { motion } from "framer-motion";
import { siteData } from "@/content/site-data";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/media";

/**
 * Recognition milestones (real, verifiable facts, not quotes).
 * Deliberately quiet (the Hanza/Lyniq lesson) but with the Majd flourish:
 * each card flips up on reveal (rotateX about its top edge) rather than a
 * plain fade. Grotesk pull-quotes, hairline rules, one reveal each — no
 * carousel, no autoplay. Reduced motion ⇒ a plain opacity fade.
 */
export default function Testimonials() {
  const { recognition } = siteData;
  const reduced = useReducedMotion();

  return (
    <section id="recognition" className="band-paper section-pad">
      <div className="container-site">
        <Eyebrow index="04">{recognition.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="heading mb-16 max-w-xl text-4xl md:text-5xl">
            {recognition.heading}
          </h2>
        </Reveal>

        <div
          className="grid gap-3 lg:grid-cols-3"
          style={{ perspective: "1400px" }}
        >
          {recognition.items.map((t, i) => (
            <motion.figure
              key={t.name}
              className="flex h-full flex-col justify-between gap-10 rounded-card border border-line bg-surface p-8"
              style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              initial={
                reduced ? { opacity: 0 } : { opacity: 0, rotateX: -78, y: 28 }
              }
              whileInView={
                reduced ? { opacity: 1 } : { opacity: 1, rotateX: 0, y: 0 }
              }
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{
                duration: 0.85,
                delay: 0.12 * i,
                ease: [0.16, 1.04, 0.32, 0.98],
              }}
            >
              <p className="quote text-xl text-ink md:text-2xl">{t.text}</p>
              <figcaption className="hairline pt-5">
                <p className="text-sm text-ink">{t.name}</p>
                <p className="mt-1 font-mono text-xs tracking-[0.12em] text-muted">
                  {t.detail}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
