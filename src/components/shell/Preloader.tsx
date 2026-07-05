"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { siteData } from "@/content/site-data";
import { useLoader } from "@/components/providers/LoaderContext";
import { useReducedMotion } from "@/lib/media";

const SEEN_KEY = "av-loader-seen";

/**
 * The loader → hero handoff as one gated sequence (observed on Lyniq ⭐ and
 * Sensoria): a solid ACCENT screen holds the wordmark while a tiny mono
 * counter ticks 000→100 in the corner, then the whole panel wipes upward on
 * the anticipation-settle curve the hero entrance keys off. Shown once per
 * session; skipped entirely under reduced motion.
 */
export default function Preloader() {
  const { done, markDone } = useLoader();
  const reduced = useReducedMotion();
  // null = undecided (SSR + first client frame), then true/false.
  const [show, setShow] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const markDoneRef = useRef(markDone);
  markDoneRef.current = markDone;

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY) === "1";
    const media = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || media) {
      setShow(false);
      markDoneRef.current();
      return;
    }
    setShow(true);
    sessionStorage.setItem(SEEN_KEY, "1");
  }, []);

  useEffect(() => {
    if (show !== true) return;
    const controls = animate(0, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(v)).padStart(3, "0");
        }
      },
      onComplete: () => setExiting(true),
    });
    return () => controls.stop();
  }, [show]);

  if (done && !exiting) return null;

  return (
    <AnimatePresence onExitComplete={markDone}>
      {show === true && !exiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-accent px-[clamp(1.25rem,4vw,2rem)]"
          aria-hidden
          exit={reduced ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.92, -0.02, 0.38, 1] }}
        >
          {/* wordmark, centered */}
          <motion.span
            className="display text-[clamp(3rem,12vw,9rem)] text-[#0f0e0c]"
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1.04, 0.32, 0.98] }}
          >
            {siteData.identity.initials}
            <span className="align-top text-[0.42em]">®</span>
          </motion.span>

          {/* corner instrument readout */}
          <div className="absolute inset-x-[clamp(1.25rem,4vw,2rem)] bottom-8 flex items-end justify-between text-[#0f0e0c]">
            <span className="font-mono text-xs uppercase tracking-[0.18em] opacity-70">
              {siteData.identity.role}
            </span>
            <span className="flex items-baseline gap-1 font-mono text-sm">
              <span ref={counterRef} className="tabular">
                000
              </span>
              <span className="opacity-70">/100</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
