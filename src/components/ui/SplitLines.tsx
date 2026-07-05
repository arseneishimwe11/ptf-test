"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/media";

interface SplitLinesProps {
  lines: readonly string[];
  className?: string;
  /**
   * Controlled mode: pass a boolean to gate playback (loader→hero handoff).
   * Omit entirely for scroll-triggered (whileInView) playback.
   */
  play?: boolean;
  /** Base delay in seconds before the first line. */
  delay?: number;
  as?: "h1" | "h2" | "p";
  /** Line indices rendered in the accent color (Platform two-tone device). */
  accentLines?: readonly number[];
}

const lineVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%" },
};

/**
 * Masked line-by-line reveal for display headlines — each line rises out of
 * its own overflow-hidden mask (the Lyniq loader→hero handoff idiom).
 *
 * Orchestration lives on the parent tag and propagates via variants: the
 * parent is what IntersectionObserver watches, because the masked spans
 * themselves start fully clipped and would never report an intersection.
 */
export default function SplitLines({
  lines,
  className,
  play,
  delay = 0,
  as: Tag = "h2",
  accentLines = [],
}: SplitLinesProps) {
  const reduced = useReducedMotion();
  const controlled = play !== undefined;
  const MotionTag = motion[Tag];
  const isAccent = (i: number) => accentLines.includes(i);

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${isAccent(i) ? "text-accent" : ""}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate={controlled ? (play ? "visible" : "hidden") : undefined}
      whileInView={controlled ? undefined : "visible"}
      viewport={
        controlled ? undefined : { once: true, margin: "0px 0px -12% 0px" }
      }
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${isAccent(i) ? "text-accent" : ""}`}
            variants={lineVariants}
            transition={{ duration: 0.9, ease: [0.16, 1.04, 0.32, 0.98] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
