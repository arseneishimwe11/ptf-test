"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine, useReducedMotion } from "@/lib/media";

type CursorMode = "default" | "link" | "view";

/**
 * Studio-signature cursor: a raw-tracked dot plus a spring-lagged ring.
 * The ring morphs into a "View" pill over project cards (data-cursor="view")
 * and scales over links (data-cursor="link" or any <a>/<button>).
 *
 * The native cursor is never hidden — this is an additive layer, so
 * accessibility and unstyled elements keep normal behavior. Mounted only on
 * pointer-fine devices and never under reduced motion.
 */
export default function Cursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      setMode((el?.dataset.cursor as CursorMode) ?? (el ? "link" : "default"));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* dot — raw position */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* ring — lagged, morphs per mode */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-accent/60 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ground"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: mode === "view" ? 76 : mode === "link" ? 52 : 32,
          height: mode === "view" ? 76 : mode === "link" ? 52 : 32,
          backgroundColor:
            mode === "view" ? "rgba(232,100,44,0.95)" : "rgba(232,100,44,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {mode === "view" ? "View" : null}
      </motion.div>
    </div>
  );
}
