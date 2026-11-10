"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { principles } from "../../data/site";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { PortraitMarker } from "../ui/portrait-marker";
import { SectionHeading } from "../ui/section-heading";

const total = principles.length;

/** The reference's draggable 3D testimonial deck, holding engineering principles instead. */
export function Principles() {
  const [index, setIndex] = useState(0);
  const animated = useReducedMotion() === false;

  const next = useCallback(() => setIndex((value) => (value + 1) % total), []);
  const prev = useCallback(() => setIndex((value) => (value - 1 + total) % total), []);

  useEffect(() => {
    if (!animated) return;
    const timer = window.setInterval(next, 5600);
    return () => window.clearInterval(timer);
  }, [animated, next, index]);

  return (
    <section id="principles" className="relative scroll-mt-20 overflow-hidden border-t border-border py-20 md:py-28">
      <PortraitMarker side="left" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          className="ml-auto text-right"
          eyebrow="Principles"
          title="How I think about software"
          description="A few rules I keep coming back to — each one learned on a real project."
        />

        <ul className="sr-only">
          {principles.map((item) => (
            <li key={item.title}>
              <blockquote>{item.content}</blockquote>
              <cite>
                {item.title}, {item.source}
              </cite>
            </li>
          ))}
        </ul>

        <div aria-hidden className="relative mt-12">
          <div className="relative h-[23rem] sm:h-[21rem] md:h-[19rem]">
            <motion.div
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              drag={animated ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -420) next();
                else if (info.offset.x > 60 || info.velocity.x > 420) prev();
              }}
            >
              {principles.map((item, i) => {
                let offset = i - index;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;
                const depth = Math.min(Math.abs(offset), 3);
                return (
                  <motion.figure
                    key={item.title}
                    animate={{
                      x: `${40 * offset}%`,
                      scale: 1 - 0.1 * depth,
                      rotateY: -16 * offset,
                      opacity: depth > 2 ? 0 : 1 - 0.28 * depth,
                      filter: `blur(${1.5 * depth}px)`,
                      zIndex: 10 - depth,
                    }}
                    transition={{ type: "spring", stiffness: 190, damping: 26 }}
                    style={{ transformPerspective: 1200 }}
                    className="absolute inset-x-0 mx-auto flex h-full w-[88%] max-w-lg flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,1)] md:w-[72%]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                        {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                      <Quote className="size-5 text-primary/30" />
                    </div>
                    <blockquote className="mt-4 flex-1 overflow-hidden text-pretty font-display text-lg leading-relaxed text-foreground/90 md:text-xl">
                      “{item.content}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                      <span className="grid size-9 place-items-center rounded-full bg-primary/15 font-mono text-sm font-semibold text-primary">
                        {item.title.charAt(0).toUpperCase()}
                      </span>
                      <span className="text-sm">
                        <span className="block font-medium">{item.title}</span>
                        <span className="font-mono text-xs text-muted-foreground">{item.source}</span>
                      </span>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous principle"
              onClick={prev}
              data-cursor="hover"
              className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              {principles.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show principle: ${item.title}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next principle"
              onClick={next}
              data-cursor="hover"
              className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
