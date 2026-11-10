"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "../../lib/gsap";

/** Infinite marquee that speeds up with scroll velocity and pauses on hover. */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className,
  trackClassName,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = root.current;
      const element = track.current;
      if (!container || !element || prefersReducedMotion()) return;

      gsap.set(element, { xPercent: reverse ? -50 : 0 });
      const loop = gsap.to(element, {
        xPercent: reverse ? 0 : -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
      const velocity = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          const scale = 1 + Math.min(Math.abs(v) / 320, 3);
          gsap.to(loop, { timeScale: (v < 0 ? -1 : 1) * scale, duration: 0.45, overwrite: true });
        },
      });
      const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.3 });
      const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.3 });
      container.addEventListener("pointerenter", pause);
      container.addEventListener("pointerleave", resume);

      return () => {
        velocity.kill();
        loop.kill();
        container.removeEventListener("pointerenter", pause);
        container.removeEventListener("pointerleave", resume);
      };
    },
    { scope: root, dependencies: [speed, reverse] },
  );

  return (
    <div ref={root} className={cn("group relative overflow-hidden", className)}>
      <div ref={track} className={cn("flex w-max items-center", trackClassName)}>
        {children}
        <span aria-hidden className="flex items-center">
          {children}
        </span>
      </div>
    </div>
  );
}
