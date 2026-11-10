"use client";

import { Check } from "lucide-react";
import { about } from "../../data/site";
import { useSpotlight } from "../../hooks/use-spotlight";
import { PortraitMarker } from "../ui/portrait-marker";
import { Reveal } from "../ui/reveal";
import { ScrubText, SectionHeading } from "../ui/section-heading";
import { Tilt } from "../ui/tilt";

export function About() {
  const spotlight = useSpotlight();
  return (
    <section id="about" className="relative scroll-mt-20 py-20 md:py-28">
      <PortraitMarker side="right" top="4rem" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="About" title={about.title} />
            <div className="mt-7 space-y-5">
              {about.paragraphs.map((paragraph) => (
                <ScrubText key={paragraph.slice(0, 24)} className="text-pretty leading-relaxed text-foreground/90">
                  {paragraph}
                </ScrubText>
              ))}
            </div>
          </div>
          {/* On desktop the card sits below the portrait frame so the flying face never covers it. */}
          <Reveal y={34} className="lg:pt-48">
            <Tilt>
              <div ref={spotlight} className="spotlight rounded-2xl border border-border bg-card p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold">{about.card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{about.card.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {about.card.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="size-3" />
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
