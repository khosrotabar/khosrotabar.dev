"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "../lib/gsap";

export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !isFinePointer()) return;

    const toX = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
    const toY = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      toX((event.clientX - (rect.left + rect.width / 2)) * strength);
      toY((event.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      toX(0);
      toY(0);
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(element);
      gsap.set(element, { x: 0, y: 0 });
    };
  }, [strength]);

  return ref;
}
