"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine, useReducedMotion } from "@/lib/media";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

/**
 * Link that leans toward the pointer (Platform®'s "fluid micro-interaction"
 * feel, rebuilt from scratch). Pointer-fine devices only; static under
 * reduced motion or touch.
 */
export default function MagneticButton({
  children,
  href,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.a>
  );
}
