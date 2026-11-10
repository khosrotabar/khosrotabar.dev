"use client";

import { capabilities, type Stat } from "../../data/site";
import { useCountUp } from "../../hooks/use-count-up";
import { useSpotlight } from "../../hooks/use-spotlight";
import { cn } from "../../lib/cn";
import { PortraitMarker } from "../ui/portrait-marker";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const spans = { wide: "md:col-span-2", normal: "md:col-span-1", full: "md:col-span-3" } as const;

function Metric({ metric }: { metric: Stat }) {
  const ref = useCountUp(metric);
  return (
    <div className="mt-6 flex items-baseline gap-2 border-t border-border pt-4">
      <span ref={ref} className="font-display text-3xl font-bold tracking-tight text-primary">
        {`${metric.prefix ?? ""}${metric.value.toFixed(metric.decimals ?? 0)}${metric.suffix ?? ""}`}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{metric.label}</span>
    </div>
  );
}

function CapabilityCard({ capability }: { capability: (typeof capabilities)[number] }) {
  const spotlight = useSpotlight<HTMLElement>();
  return (
    <article
      ref={spotlight}
      data-reveal-item
      className={cn(
        "spotlight group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/35 md:p-7",
        spans[capability.span],
      )}
    >
      <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
        {capability.tag}
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold md:text-xl">{capability.title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
      {capability.metric ? <Metric metric={capability.metric} /> : null}
    </article>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <PortraitMarker side="left" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          className="ml-auto text-right"
          eyebrow="Capabilities"
          title="What I’m actually responsible for"
          description="The work that tends to land on my desk — and the numbers that come out of it."
        />
        <Reveal stagger={0.07} y={26} className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.title} capability={capability} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
