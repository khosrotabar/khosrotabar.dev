"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

type CountUpOptions = {
  value: number;
  enabled?: boolean;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: (value: number) => string;
};

export function useCountUp<T extends HTMLElement = HTMLSpanElement>({
  value,
  enabled = true,
  decimals = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  format,
}: CountUpOptions) {
  const ref = useRef<T>(null);
  const formatRef = useRef(format);

  useEffect(() => {
    formatRef.current = format;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const render = (n: number) =>
      formatRef.current ? formatRef.current(n) : `${prefix}${n.toFixed(decimals)}${suffix}`;
    if (!enabled) return;

    const counter = { n: 0 };
    element.textContent = render(0);
    const tween = gsap.to(counter, {
      n: value,
      duration,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        element.textContent = render(counter.n);
      },
      onComplete: () => {
        element.textContent = render(value);
      },
    });
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 88%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
      element.textContent = render(value);
    };
  }, [value, enabled, decimals, duration, prefix, suffix]);

  return ref;
}
