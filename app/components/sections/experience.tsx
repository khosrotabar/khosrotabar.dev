"use client";

import { CircleCheck } from "lucide-react";
import { useRef } from "react";
import { experience } from "../../data/site";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = timelineRef.current;
      const progress = progressRef.current;
      if (!timeline || !progress) return;
      if (prefersReducedMotion()) {
        gsap.set(progress, { scaleY: 1 });
        return;
      }
      const line = gsap.fromTo(
        progress,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: timeline, start: "top 70%", end: "bottom 75%", scrub: true },
        },
      );
      const milestones = gsap.utils.toArray<HTMLElement>("[data-milestone]", timeline);
      gsap.set(milestones, { scale: 0.3, opacity: 0 });
      const pops = milestones.map((milestone) =>
        ScrollTrigger.create({
          trigger: milestone,
          start: "top 85%",
          once: true,
          onEnter: () => gsap.to(milestone, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2.2)" }),
        }),
      );
      return () => {
        line.scrollTrigger?.kill();
        line.kill();
        pops.forEach((pop) => pop.kill());
        gsap.set(milestones, { clearProps: "all" });
      };
    },
    { scope: timelineRef },
  );

  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Shipping across fintech, AI and e-commerce"
          description="From e-commerce operations to AI product frontends to fintech backends — each role pushed me further down the stack."
        />
      </div>
      <div ref={timelineRef} className="relative mx-auto mt-12 max-w-4xl px-5 md:px-8">
        <div aria-hidden className="absolute bottom-4 left-[1.7rem] top-4 w-px bg-border md:left-[2.2rem]" />
        <div
          ref={progressRef}
          aria-hidden
          className="absolute bottom-4 left-[1.7rem] top-4 w-px origin-top bg-gradient-to-b from-primary via-primary to-primary/20 md:left-[2.2rem]"
        />
        <ol className="space-y-6">
          {experience.map((job) => (
            <li key={`${job.role}-${job.company}`} className="relative pl-14 md:pl-24">
              <span
                aria-hidden
                data-milestone
                className="absolute left-[1.7rem] top-9 z-10 grid size-3 -translate-x-1/2 place-items-center rounded-full border-2 border-primary bg-background md:left-[2.2rem]"
              >
                <span className="size-1 rounded-full bg-primary" />
              </span>
              <Reveal y={30}>
                <article className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/30 md:p-8">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                      <p className="mt-1 text-sm text-primary">{job.company}</p>
                      {job.location ? <p className="mt-0.5 text-sm text-muted-foreground">{job.location}</p> : null}
                    </div>
                    {job.period ? (
                      <span className="inline-flex h-fit shrink-0 items-center rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
                        {job.period}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{job.description}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {job.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2 text-sm text-foreground/90">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
