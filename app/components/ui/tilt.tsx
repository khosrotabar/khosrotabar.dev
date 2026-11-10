"use client";

import { motion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/gsap";

/** Springy 3D tilt that follows the pointer (desktop only). */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const rotateX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });
  const enabled = useRef<boolean | null>(null);

  return (
    <motion.div
      onPointerMove={(event) => {
        if (enabled.current === null) {
          enabled.current =
            !prefersReducedMotion() && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        }
        if (!enabled.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(x * max * 2);
        rotateX.set(-y * max * 2);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("gpu", className)}
    >
      {children}
    </motion.div>
  );
}
