"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { useDeviceCapability } from "../../hooks/use-device-capability";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../lib/gsap";

type SmoothScrollApi = {
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const DEFAULT_OFFSET = -80;
const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

function nativeScrollTo(target: string | HTMLElement, offset = DEFAULT_OFFSET) {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!(element instanceof HTMLElement)) return;
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY + offset,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const capable = useDeviceCapability();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!capable) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.6 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [capable]);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready
      .then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      })
      .catch(() => undefined);

    // Late layout changes (lazy 3D stages, fallbacks, images) shift every trigger below them;
    // re-measure once the page height settles.
    let timer: number | undefined;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const height = document.body.scrollHeight;
        if (Math.abs(height - lastHeight) < 2) return;
        lastHeight = height;
        ScrollTrigger.refresh();
        lastHeight = document.body.scrollHeight;
      }, 250);
    });
    observer.observe(document.body);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement, offset = DEFAULT_OFFSET) => {
    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!(element instanceof HTMLElement)) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(element, { offset, duration: 1.2 });
      return;
    }
    nativeScrollTo(element, offset);
  }, []);
  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);
  const value = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll(): SmoothScrollApi {
  const context = useContext(SmoothScrollContext);
  return useMemo(
    () => context ?? { scrollTo: nativeScrollTo, stop: () => undefined, start: () => undefined },
    [context],
  );
}
