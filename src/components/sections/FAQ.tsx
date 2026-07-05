"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteData } from "@/content/site-data";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/media";

/**
 * Accordion FAQ (the Lyniq treatment): giant heading, hairline-ruled rows
 * with a mono index and an accent "+" that rotates to a "×" on open. One row
 * open at a time; answers expand with a height reveal (opacity-only under
 * reduced motion).
 */
export default function FAQ() {
  const { faq } = siteData;
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="band-paper section-pad">
      <div className="container-site">
        <Eyebrow index="05">{faq.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="heading mb-16 max-w-2xl text-4xl md:text-6xl">
            {faq.heading}
          </h2>
        </Reveal>

        <ul>
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-t border-line last:border-b">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-5 py-7 text-left sm:gap-8"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="heading flex-1 text-xl md:text-2xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`shrink-0 text-2xl text-accent transition-transform duration-300 ease-[cubic-bezier(0.44,0,0.56,1)] ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      className="overflow-hidden"
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={
                        reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }
                      }
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1.04, 0.32, 0.98] }}
                    >
                      <p className="max-w-2xl pb-7 pl-9 leading-relaxed text-muted sm:pl-12">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
