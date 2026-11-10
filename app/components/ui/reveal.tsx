"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "../../lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  /** When set, children marked `data-reveal-item` animate in sequence. */
  stagger?: number;
};

export function Reveal({
  children,
  className,
  as = "div",
  y = 26,
  x = 0,
  delay = 0,
  duration = 0.8,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;
      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>("[data-reveal-item]", element)
        : [element];
      if (!targets.length) return;

      gsap.set(targets, { y, x, opacity: 0 });
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power3.out",
            stagger: stagger ?? 0,
            overwrite: true,
          });
        },
      });
      return () => trigger.kill();
    },
    { scope: ref, dependencies: [y, x, delay, duration, stagger] },
  );

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
