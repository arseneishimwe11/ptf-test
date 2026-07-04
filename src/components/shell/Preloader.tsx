"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { siteData } from "@/content/site-data";
import { useLoader } from "@/components/providers/LoaderContext";
import { useReducedMotion } from "@/lib/media";

const SEEN_KEY = "av-loader-seen";

/**
 * Splash → hero handoff as one choreographed sequence (the Lyniq idea):
 * a mono counter runs 000→100, the wordmark sits beneath it, then two
 * stacked panels wipe upward and the hero's masked lines inherit the beat.
 * Shown once per session; skipped entirely under reduced motion.
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
      duration: 1.5,
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
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-hidden
          exit={{ transition: { duration: 0 } }}
        >
          {/* two stacked panels — the wipe */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-surface"
            exit={reduced ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-surface"
            exit={reduced ? { opacity: 0 } : { y: "100%" }}
            transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span
              ref={counterRef}
              className="tabular font-mono text-6xl tracking-tight text-ink md:text-7xl"
            >
              000
            </span>
            <span className="eyebrow">{siteData.identity.name}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
