"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { headlineStats, site, type Stat } from "../../data/site";
import { useCountUp } from "../../hooks/use-count-up";
import { useMagnetic } from "../../hooks/use-magnetic";
import { gsap, INTRO_DONE_EVENT, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import { useSmoothScroll } from "../chrome/smooth-scroll";

const PortraitDisplacement = dynamic(
  () => import("../three/portrait-displacement").then((mod) => mod.PortraitDisplacement),
  { ssr: false },
);

function HeroStat({ stat, enabled }: { stat: Stat; enabled: boolean }) {
  const ref = useCountUp({ ...stat, enabled });
  return (
    <div data-hero-stat className="bg-card px-5 py-6">
      <dt className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        <span ref={ref}>{`${stat.prefix ?? ""}${stat.value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ""}`}</span>
      </dt>
      <dd className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</dd>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const magnetic = useMagnetic<HTMLAnchorElement>(0.18);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const done = () => setIntroDone(true);
    if (!document.documentElement.classList.contains("preload")) {
      const id = window.requestAnimationFrame(done);
      return () => window.cancelAnimationFrame(id);
    }
    window.addEventListener(INTRO_DONE_EVENT, done);
    const fallback = window.setTimeout(done, 8000);
    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, done);
      window.clearTimeout(fallback);
    };
  }, []);

  // Hide everything until the curtain lifts.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set("[data-hero-line]", { yPercent: 115, opacity: 0 });
      gsap.set(["[data-hero-pill]", "[data-hero-copy]", "[data-hero-cta]", "[data-hero-stat]", "[data-hero-portrait]"], {
        opacity: 0,
        y: 18,
      });
      return () => {
        gsap.set(
          ["[data-hero-line]", "[data-hero-pill]", "[data-hero-copy]", "[data-hero-cta]", "[data-hero-stat]", "[data-hero-portrait]"],
          { clearProps: "all" },
        );
      };
    },
    { scope: root },
  );

  // Intro choreography.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !introDone) return;
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .to("[data-hero-pill]", { opacity: 1, y: 0, duration: 0.55 }, 0)
        .to("[data-hero-line]", { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12 }, 0.1)
        .to("[data-hero-portrait]", { opacity: 1, y: 0, duration: 1.1 }, 0.25)
        .to("[data-hero-copy]", { opacity: 1, y: 0, duration: 0.7 }, 0.55)
        .to("[data-hero-cta]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, 0.7)
        .to("[data-hero-stat]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.85);
      return () => timeline.kill();
    },
    { scope: root, dependencies: [introDone] },
  );

  // Desktop: the mark flies between the dashed markers placed in later sections,
  // shrinking to half size, and fades out over sections marked data-portrait-hide.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const flyer = root.current?.querySelector<HTMLElement>("[data-portrait-fly]");
    if (!flyer) return;
    let context: gsap.Context | undefined;
    let debounce: number | undefined;
    const media = gsap.matchMedia();

    const build = () => {
      context?.revert();
      context = gsap.context(() => {
        const markers = gsap.utils.toArray<HTMLElement>("[data-portrait-marker]");
        if (!markers.length) return;
        const scrollY = window.scrollY;
        const origin = flyer.getBoundingClientRect();
        const originX = origin.left + origin.width / 2;
        const originY = origin.top + origin.height / 2 + scrollY;
        const vh = window.innerHeight;
        const stops = [
          { x: 0, y: 0, scroll: 0 },
          ...markers.map((marker) => {
            const rect = marker.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2 + scrollY;
            return {
              x: rect.left + rect.width / 2 - originX,
              y: centerY - originY,
              scroll: Math.max(0, centerY - vh / 2),
            };
          }),
        ];
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            start: 0,
            end: () => stops[stops.length - 1].scroll + 0.35 * vh,
            // Generous scrub smoothing gives the flight weight and inertia instead of tracking the wheel 1:1.
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        });
        // Each leg glides on eased curves: y and x use different easings so the path arcs,
        // the mark banks gently toward its direction of travel, dips in scale mid-flight
        // and settles softly into the next dashed frame.
        for (let i = 1; i < stops.length; i++) {
          const from = stops[i - 1];
          const to = stops[i];
          const distance = to.scroll - from.scroll;
          const pad = Math.min(0.2 * vh, 0.18 * distance);
          const start = from.scroll + (i === 1 ? 0 : pad);
          const duration = Math.max(start + 1, to.scroll - pad) - start;
          const half = duration / 2;
          const bank = gsap.utils.clamp(-9, 9, (to.x - from.x) / 70);

          timeline.to(flyer, { y: to.y, ease: "sine.inOut", duration }, start);
          timeline.to(flyer, { x: to.x, ease: "power2.inOut", duration }, start);
          if (i === 1) {
            timeline.to(flyer, { scale: 0.5, ease: "power2.inOut", duration }, start);
          } else {
            timeline.to(flyer, { scale: 0.43, ease: "sine.out", duration: half }, start);
            timeline.to(flyer, { scale: 0.5, ease: "sine.in", duration: half }, start + half);
          }
          timeline.to(flyer, { rotation: bank, ease: "sine.out", duration: half }, start);
          timeline.to(flyer, { rotation: 0, ease: "sine.inOut", duration: half }, start + half);
        }

        gsap.utils
          .toArray<HTMLElement>("[data-portrait-hide]")
          .map((section) => {
            const rect = (section.closest(".pin-spacer") ?? section).getBoundingClientRect();
            return { top: rect.top + scrollY, bottom: rect.bottom + scrollY };
          })
          .sort((a, b) => a.top - b.top)
          .reduce<{ top: number; bottom: number }[]>((merged, range) => {
            const last = merged[merged.length - 1];
            if (last && range.top - last.bottom < 0.5 * vh) last.bottom = Math.max(last.bottom, range.bottom);
            else merged.push({ ...range });
            return merged;
          }, [])
          .forEach((range) => {
            const fadeOutStart = Math.max(0, range.top - 0.85 * vh);
            const fadeOutEnd = Math.max(fadeOutStart + 1, range.top - 0.35 * vh);
            const fadeInStart = Math.max(fadeOutEnd + 1, range.bottom - 0.85 * vh);
            const fadeInEnd = Math.max(fadeInStart + 1, range.bottom - 0.25 * vh);
            timeline.to(flyer, { opacity: 0, ease: "sine.inOut", duration: fadeOutEnd - fadeOutStart }, fadeOutStart);
            timeline.to(flyer, { opacity: 1, ease: "sine.inOut", duration: fadeInEnd - fadeInStart }, fadeInStart);
          });

        timeline.add(() => {}, stops[stops.length - 1].scroll + 0.35 * vh);
      });
    };

    let lastSize = "";
    const schedule = () => {
      const size = `${window.innerWidth}x${document.body.scrollHeight}`;
      if (size === lastSize) return;
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        lastSize = `${window.innerWidth}x${document.body.scrollHeight}`;
        build();
      }, 200);
    };

    media.add("(min-width: 1024px)", () => {
      lastSize = `${window.innerWidth}x${document.body.scrollHeight}`;
      build();
      window.addEventListener("resize", schedule);
      window.addEventListener("load", schedule);
      const observer = new ResizeObserver(schedule);
      observer.observe(document.body);
      return () => {
        window.removeEventListener("resize", schedule);
        window.removeEventListener("load", schedule);
        observer.disconnect();
        window.clearTimeout(debounce);
        context?.revert();
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative z-20 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p
              data-hero-pill
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for new projects
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
              <span className="line-mask">
                <span data-hero-line className="block">
                  Hi, I&apos;m {site.firstName}.
                </span>
              </span>
              <span className="line-mask mt-1">
                <span data-hero-line className="block text-muted-foreground">
                  I build Go APIs and Next.js apps <span className="text-primary">that hold up in production.</span>
                </span>
              </span>
            </h1>
            <p
              data-hero-copy
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {site.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                ref={magnetic}
                data-hero-cta
                data-cursor="hover"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo("#contact");
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_38px_-8px_var(--primary)]"
              >
                Start your project
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                data-hero-cta
                data-cursor="hover"
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo("#work");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                View selected work
              </a>
            </div>
            <div data-hero-cta className="mt-10 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              {site.tagline}
            </div>
          </div>

          <div data-hero-portrait className="relative">
            <div data-portrait-fly className="will-change-transform">
              <PortraitDisplacement className="mx-auto max-w-md" />
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {headlineStats.map((stat) => (
            <HeroStat key={stat.label} stat={stat} enabled={introDone} />
          ))}
        </dl>
      </div>
    </section>
  );
}
