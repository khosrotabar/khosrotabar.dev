"use client";

import { AppWindow, LayoutDashboard, Plus, Rocket, Server, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { services, type ServiceIcon } from "../../data/site";
import { useSpotlight } from "../../hooks/use-spotlight";
import { PortraitMarker } from "../ui/portrait-marker";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const icons: Record<ServiceIcon, LucideIcon> = {
  web: AppWindow,
  api: Server,
  security: ShieldCheck,
  dashboard: LayoutDashboard,
  mvp: Rocket,
  automation: Workflow,
};

function ServiceRow({
  index,
  service,
  open,
  onOpen,
  onToggle,
}: {
  index: number;
  service: (typeof services)[number];
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const Icon = icons[service.icon];
  const spotlight = useSpotlight();
  return (
    <div
      ref={spotlight}
      data-reveal-item
      onMouseEnter={onOpen}
      className="spotlight group relative bg-card transition-colors duration-300"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        data-cursor="hover"
        className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7"
      >
        <span className="hidden font-mono text-[11px] text-primary/60 sm:block">{String(index + 1).padStart(2, "0")}</span>
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
            open ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-background text-primary"
          }`}
        >
          <Icon className="size-5" />
        </span>
        <span className="flex flex-1 items-center justify-between gap-4">
          <span className="font-display text-base font-semibold md:text-lg">{service.title}</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:block">
            {service.tag}
          </span>
        </span>
        <Plus
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-45 text-primary" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 text-sm leading-relaxed text-muted-foreground sm:pl-[4.75rem] md:px-7 md:pl-[5.25rem]">
              {service.description}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-px bg-primary/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <PortraitMarker />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Full-stack engineering, end to end"
          description="From a single API to a complete SaaS MVP, I deliver clean, documented, production-grade software."
        />
        <Reveal
          stagger={0.07}
          y={20}
          className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border"
        >
          {services.map((service, index) => (
            <ServiceRow
              key={service.title}
              index={index}
              service={service}
              open={open === index}
              onOpen={() => {
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setOpen(index);
              }}
              onToggle={() => setOpen(open === index ? -1 : index)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
