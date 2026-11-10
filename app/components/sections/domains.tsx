"use client";

import { useRef } from "react";
import { domains, type Stat } from "../../data/site";
import { useCountUp } from "../../hooks/use-count-up";
import { gsap, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import { PortraitMarker } from "../ui/portrait-marker";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const columns = [domains.items.slice(0, 8), domains.items.slice(8, 16), domains.items.slice(16)];
const drift = [-46, -18, -64];

function DomainStat({ stat }: { stat: Stat }) {
  const ref = useCountUp<HTMLParagraphElement>(stat);
  return (
    <div className="bg-card px-5 py-6 text-center">
      <p ref={ref} className="font-display text-3xl font-bold tracking-tight text-primary">
        {`${stat.prefix ?? ""}${stat.value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ""}`}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
    </div>
  );
}

/** "Clients" section from the reference, re-cast as the domains and things I've built. */
export function Domains() {
  const section = useRef<HTMLElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !window.matchMedia("(min-width: 768px)").matches) return;
      const tweens = columnRefs.current.map((column, index) =>
        column
          ? gsap.fromTo(
              column,
              { y: 0 },
              {
                y: drift[index] ?? -30,
                ease: "none",
                scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: true },
              },
            )
          : null,
      );
      return () =>
        tweens.forEach((tween) => {
          tween?.scrollTrigger?.kill();
          tween?.kill();
        });
    },
    { scope: section },
  );

  return (
    <section id="domains" ref={section} className="relative scroll-mt-20 overflow-hidden border-t border-border py-20 md:py-28">
      <PortraitMarker />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Where I’ve shipped"
          title="Products & teams I’ve built for"
          description="Fintech portals, AI-driven products and e-commerce operations — here is what that work actually consisted of."
        />
        <Reveal
          stagger={0.1}
          y={20}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
        >
          {domains.stats.map((stat) => (
            <div key={stat.label} data-reveal-item>
              <DomainStat stat={stat} />
            </div>
          ))}
        </Reveal>
        <Reveal stagger={0.015} y={12} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-3 md:py-8">
          {columns.map((column, index) => (
            <div
              key={column[0]}
              ref={(element) => {
                columnRefs.current[index] = element;
              }}
              className="flex flex-col gap-3"
            >
              {column.map((item) => (
                <span
                  key={item}
                  data-reveal-item
                  className="rounded-full border border-border bg-card/60 px-3.5 py-2 text-center text-xs text-foreground/80 transition-colors duration-300 hover:border-primary/40 hover:text-foreground sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
