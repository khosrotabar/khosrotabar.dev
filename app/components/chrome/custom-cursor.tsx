"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "../../lib/gsap";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dotEl = dot.current;
    const ringEl = ring.current;
    const labelEl = label.current;
    if (!dotEl || !ringEl || !labelEl || prefersReducedMotion() || !isFinePointer()) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, opacity: 0 });

    const setDotX = gsap.quickSetter(dotEl, "x", "px");
    const setDotY = gsap.quickSetter(dotEl, "y", "px");
    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3.out" });
    const labelX = gsap.quickTo(labelEl, "x", { duration: 0.45, ease: "power3.out" });
    const labelY = gsap.quickTo(labelEl, "y", { duration: 0.45, ease: "power3.out" });
    let shown = false;

    const onMove = (event: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dotEl, ringEl, labelEl], { opacity: 1, duration: 0.3 });
      }
      setDotX(event.clientX);
      setDotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      labelX(event.clientX);
      labelY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest('a, button, [role="button"], summary, [data-cursor="hover"]');
      const text = interactive?.getAttribute("data-cursor-text") ?? "";
      if (interactive) {
        gsap.to(ringEl, {
          scale: text ? 3.4 : 1.9,
          borderColor: "oklch(0.82 0.19 150 / 0.9)",
          duration: 0.35,
        });
        gsap.to(dotEl, { scale: 0, duration: 0.25 });
        if (text) {
          labelEl.textContent = text;
          gsap.to(labelEl, { opacity: 1, duration: 0.25 });
        }
      } else {
        gsap.to(ringEl, { scale: 1, borderColor: "oklch(0.82 0.19 150 / 0.55)", duration: 0.35 });
        gsap.to(dotEl, { scale: 1, duration: 0.25 });
        gsap.to(labelEl, { opacity: 0, duration: 0.2 });
      }
    };

    const onDown = () => gsap.to(ringEl, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ringEl, { scale: 1, duration: 0.25 });
    const onLeave = () => {
      shown = false;
      gsap.to([dotEl, ringEl, labelEl], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-custom-cursor");
      gsap.killTweensOf([dotEl, ringEl, labelEl]);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={ring}
        className="absolute left-0 top-0 size-9 rounded-full border border-primary/55 opacity-0 mix-blend-difference"
      />
      <span
        ref={label}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0"
      />
      <div ref={dot} className="absolute left-0 top-0 size-1.5 rounded-full bg-primary opacity-0" />
    </div>
  );
}
