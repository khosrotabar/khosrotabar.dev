"use client";

import { ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { profiles, work, type WorkItem } from "../../data/site";
import { caseStudies } from "../../data/case-studies";
import { useSpotlight } from "../../hooks/use-spotlight";
import { gsap, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import { PortraitMarker } from "../ui/portrait-marker";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

function WorkCard({ item, index, total }: { item: WorkItem; index: number; total: number }) {
  const spotlight = useSpotlight<HTMLElement>();
  return (
    <article
      ref={spotlight}
      className="spotlight group relative flex min-h-[19rem] flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_-18px_60px_-40px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-primary/40 md:min-h-[21rem] md:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          {item.category}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground/60">
          {item.concept ? "Concept · " : ""}
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold leading-snug md:text-2xl">
        {item.href ? (
          <Link href={item.href} data-cursor="hover" className="after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        ) : (
          item.title
        )}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">{item.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {item.stack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      {item.stat ? (
        <p className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-medium text-primary">
          <CircleCheck className="size-3.5" />
          {item.stat.value} {item.stat.label}
        </p>
      ) : (
        <p className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-medium text-muted-foreground">
          <CircleCheck className="size-3.5" />
          Concept build — full case study coming soon
        </p>
      )}
      {item.href ? (
        <ArrowUpRight className="absolute right-6 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/0 transition-all duration-300 group-hover:right-5 group-hover:text-primary md:right-8 md:group-hover:right-7" />
      ) : null}
    </article>
  );
}

export function Work() {
  const stack = useRef<HTMLDivElement>(null);

  // Desktop: cards stick and stack; each one recedes as the next slides over it.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !window.matchMedia("(min-width: 1024px)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]", stack.current);
      if (cards.length < 2) return;
      const tweens = cards.flatMap((card, index) => {
        const next = cards[index + 1];
        if (!next) return [];
        return [
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.45,
            filter: "blur(2px)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 25%", scrub: true },
          }),
        ];
      });
      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
        gsap.set(cards, { clearProps: "all" });
      };
    },
    { scope: stack },
  );

  return (
    <section id="work" className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <PortraitMarker />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects that solve real problems"
          description="Backend services, field reports and product builds — each one shipped, measured and documented."
        />
      </div>
      <div ref={stack} className="mx-auto mt-12 max-w-4xl px-5 md:px-8">
        {work.map((item, index) => (
          <div key={item.title} data-work-card className="gpu mb-5 lg:sticky lg:mb-6" style={{ top: `${88 + 12 * index}px` }}>
            <WorkCard item={item} index={index} total={work.length} />
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mt-8 flex justify-center">
          <Link
            href="/work"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            Browse {caseStudies.length === 1 ? "the case study" : `all ${caseStudies.length} case studies`}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <Reveal
          stagger={0.08}
          y={18}
          className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {profiles.map((profile) => (
            <a
              key={profile.label}
              data-reveal-item
              href={profile.href}
              target={profile.href.startsWith("http") ? "_blank" : undefined}
              rel={profile.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-cursor="hover"
              className="group flex items-center justify-between bg-card px-5 py-5 transition-colors hover:bg-accent"
            >
              <div>
                <p className="font-display text-base font-semibold">{profile.label}</p>
                <p className="font-mono text-xs text-primary">{profile.detail}</p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
