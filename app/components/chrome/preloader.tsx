"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { gsap, INTRO_DONE_EVENT, prefersReducedMotion, ScrollTrigger, useGSAP } from "../../lib/gsap";

const SESSION_KEY = "khosrotabar:intro";

/** Curtain intro: logo rises, counter runs to 100, four panels wipe upward. Once per session. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      const html = document.documentElement;
      const remember = () => {
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
      };
      const release = () => {
        html.classList.remove("preload");
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      };
      const finish = () => {
        remember();
        setVisible(false);
      };
      const seen = (() => {
        try {
          return window.sessionStorage.getItem(SESSION_KEY) === "1";
        } catch {
          return false;
        }
      })();

      if (prefersReducedMotion() || seen) {
        remember();
        release();
        finish();
        return;
      }

      const curtains = gsap.utils.toArray<HTMLElement>("[data-curtain]", element);
      const progress = { n: 0 };
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
      timeline
        .from("[data-intro-logo]", { yPercent: 120, opacity: 0, duration: 0.7 })
        .from("[data-intro-meta]", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.35")
        .to(
          progress,
          {
            n: 100,
            duration: 1.15,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(progress.n)).padStart(3, "0");
            },
          },
          "<",
        )
        .add(release, "+=0.1")
        .to("[data-intro-fade]", { opacity: 0, duration: 0.32 }, "<")
        .to(curtains, { yPercent: -100, duration: 0.85, ease: "expo.inOut", stagger: 0.07 }, "<");

      const safety = window.setTimeout(() => {
        release();
        finish();
      }, 6000);
      return () => {
        window.clearTimeout(safety);
        timeline.kill();
      };
    },
    { scope: root },
  );

  if (!visible) return null;

  return (
    <div ref={root} data-preloader aria-hidden className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} data-curtain className="h-full flex-1 border-r border-white/5 bg-background last:border-r-0" />
        ))}
      </div>
      <div className="relative grid h-full place-items-center px-6">
        <div data-intro-fade className="flex flex-col items-center">
          <div className="overflow-hidden">
            <div data-intro-logo className="gpu flex items-center gap-3">
              <img src="/logo.svg" alt="" width={48} height={48} className="size-10 md:size-12" />
              <span className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                khosrotabar<span className="text-primary">.dev</span>
              </span>
            </div>
          </div>
          <p data-intro-meta className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Crafting the experience
          </p>
          <div data-intro-meta className="mt-8 flex items-baseline gap-1 font-mono text-sm tabular-nums text-primary">
            <span ref={counter}>000</span>
            <span className="text-muted-foreground">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
