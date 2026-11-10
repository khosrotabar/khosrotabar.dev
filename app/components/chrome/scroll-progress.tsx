"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = bar.current;
    if (!element) return;
    gsap.set(element, { scaleX: 0, transformOrigin: "left center" });
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(element, { scaleX: self.progress }),
      onRefresh: (self) => gsap.set(element, { scaleX: self.progress }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[96] h-px bg-white/5">
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-primary via-primary to-primary/40" />
    </div>
  );
}
