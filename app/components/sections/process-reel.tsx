"use client";

import { useRef, useState } from "react";
import { processSteps } from "../../data/site";
import { cn } from "../../lib/cn";
import { gsap, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import { SectionHeading } from "../ui/section-heading";

/** Desktop: the section pins and the four steps scroll horizontally. Mobile: a simple stack. */
export function ProcessReel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const sectionEl = section.current;
      const trackEl = track.current;
      if (!sectionEl || !trackEl || prefersReducedMotion() || !window.matchMedia("(min-width: 768px)").matches) return;
      const panels = gsap.utils.toArray<HTMLElement>("[data-reel-panel]", trackEl);
      if (panels.length < 2) return;
      const steps = panels.length - 1;
      const slot = 1 / steps;
      const enter = 0.6 * slot;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${steps * window.innerWidth}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.round(self.progress * steps)),
        },
      });
      timeline.to(trackEl, { x: () => -(steps * window.innerWidth), duration: 1, ease: "none" }, 0);
      panels.forEach((panel, index) => {
        if (index === 0) return;
        const content = panel.querySelector("[data-reel-content]");
        if (content) {
          timeline.fromTo(
            content,
            { yPercent: 9, opacity: 0.5 },
            { yPercent: 0, opacity: 1, ease: "power2.out", duration: enter },
            index * slot - enter,
          );
        }
      });
      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: section },
  );

  return (
    <section
      id="process"
      data-portrait-hide
      ref={section}
      className="relative scroll-mt-20 overflow-hidden border-t border-border py-20 md:flex md:h-screen md:flex-col md:justify-center md:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="How I work"
          title="Four steps, no surprises"
          description="A process built to remove ambiguity: you always know what is being built, what it costs, and when it lands."
        />
      </div>
      <div className="mt-10 md:mt-14 md:overflow-hidden">
        <div ref={track} className="flex flex-col gap-5 px-5 md:w-max md:flex-row md:gap-0 md:px-0">
          {processSteps.map((step, index) => (
            <article
              key={step.index}
              data-reel-panel
              className="md:flex md:w-screen md:shrink-0 md:items-center md:justify-center md:px-8"
            >
              <div
                data-reel-content
                className={cn(
                  "w-full rounded-2xl border border-border bg-card p-6 md:max-w-2xl md:p-10",
                  active === index && "md:border-primary/30",
                )}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-4xl font-bold text-primary/25 md:text-6xl">{step.index}</span>
                  <h3 className="font-display text-xl font-semibold md:text-3xl">{step.title}</h3>
                </div>
                <p className="mt-5 text-pretty leading-relaxed text-foreground/90 md:text-lg">{step.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 hidden w-full max-w-6xl items-center gap-3 px-5 md:flex md:px-8">
        {processSteps.map((step, index) => (
          <div key={step.index} className="flex flex-1 items-center gap-3">
            <span
              className={cn("h-px flex-1 transition-colors duration-500", index <= active ? "bg-primary" : "bg-border")}
            />
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-widest transition-colors duration-500",
                index <= active ? "text-primary" : "text-muted-foreground/50",
              )}
            >
              {step.index}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
