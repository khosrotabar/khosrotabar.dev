"use client";

import { useEffect, useRef } from "react";

/** Feeds --spot-x / --spot-y to a `.spotlight` element so its glow follows the pointer. */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    element.addEventListener("pointermove", onMove, { passive: true });
    return () => element.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}
