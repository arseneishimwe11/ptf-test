"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/media";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  className?: string;
  /** Vertical travel in px (ignored under reduced motion). */
  y?: number;
}

/**
 * One reveal grammar for the whole site (the "transitions" decision in
 * DESIGN_DNA): rise + fade, once, triggered before the eye arrives.
 * Reduced motion ⇒ children render static and fully visible.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1.04, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
