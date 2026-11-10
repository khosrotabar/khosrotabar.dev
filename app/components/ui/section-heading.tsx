"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from "../../lib/gsap";
import { Reveal } from "./reveal";

export function SplitHeading({
  text,
  as = "h2",
  className,
  stagger = 0.075,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;
      let split: SplitText | null = null;
      try {
        split = new SplitText(element, { type: "lines", mask: "lines" });
      } catch {
        return;
      }
      const lines = split.lines;
      if (!lines.length) {
        split.revert();
        return;
      }
      gsap.set(lines, { yPercent: 115, opacity: 0 });
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(lines, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            delay,
            stagger,
            ease: "power4.out",
            overwrite: true,
          });
        },
      });
      return () => {
        trigger.kill();
        split?.revert();
      };
    },
    { scope: ref, dependencies: [text, stagger, delay] },
  );

  const Tag = as;
  return (
    <Tag ref={ref} className={className} data-split-heading="">
      {text}
    </Tag>
  );
}

/** Paragraph whose words brighten as it scrolls through the viewport. */
export function ScrubText({
  children,
  className,
  fromOpacity = 0.18,
}: {
  children: ReactNode;
  className?: string;
  fromOpacity?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;
      let split: SplitText | null = null;
      try {
        split = new SplitText(element, { type: "words" });
      } catch {
        return;
      }
      const words = split.words;
      if (!words.length) {
        split.revert();
        return;
      }
      const tween = gsap.fromTo(
        words,
        { opacity: fromOpacity },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: { trigger: element, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split?.revert();
      };
    },
    { scope: ref, dependencies: [children, fromOpacity] },
  );

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: ElementType;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal y={10} duration={0.5}>
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
          <span className="inline-block h-px w-6 bg-primary/60" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitHeading
        as={as}
        text={title}
        delay={0.05}
        className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl"
      />
      {description ? (
        <Reveal y={14} delay={0.12}>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
