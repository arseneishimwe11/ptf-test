"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/media";

interface CountUpProps {
  to: number;
  suffix?: string;
  className?: string;
}

/**
 * Instrument-readout stat (the Sensoria idea): counts up once when scrolled
 * into view, tabular numerals so digits don't jitter. Reduced motion ⇒ the
 * final value renders immediately.
 */
export default function CountUp({ to, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, to, suffix]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {reduced ? `${to}${suffix}` : `0${suffix}`}
    </span>
  );
}
