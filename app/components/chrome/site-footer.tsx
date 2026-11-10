"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { nav, site, socials } from "../../data/site";
import { Logo } from "../ui/logo";
import { Marquee } from "../ui/marquee";
import { Reveal } from "../ui/reveal";
import { useSmoothScroll } from "./smooth-scroll";

export function SiteFooter() {
  const { scrollTo } = useSmoothScroll();
  const isHome = usePathname() === "/";
  const base = isHome ? "" : "/";
  const go = (href: string) => (event: MouseEvent) => {
    if (!isHome) return;
    event.preventDefault();
    scrollTo(href);
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/30">
      <Marquee className="mask-fade-x border-b border-border py-8" speed={34}>
        <span className="mx-6 font-display text-3xl font-bold tracking-tight text-foreground/90 sm:text-5xl md:text-6xl">
          Let&apos;s build something<span className="text-primary"> that lasts</span>
          <span className="mx-6 text-muted-foreground/40">◆</span>
        </span>
      </Marquee>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <Reveal y={20}>
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-base font-semibold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Web applications, Go backend APIs, dashboards and SaaS MVPs — secure, observable and built to be
              maintained.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">{site.location}</p>
          </Reveal>

          <Reveal y={20} delay={0.06}>
            <nav aria-label="Footer navigation">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Navigate</p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={`${base}${item.href}`}
                      data-cursor="hover"
                      onClick={go(item.href)}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal y={20} delay={0.12}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor="hover"
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name} ({site.handle}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono">Go · React · Next.js · PostgreSQL</p>
            <button
              type="button"
              data-cursor="hover"
              onClick={() => (isHome ? scrollTo("#top", 0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Top
              <ArrowUp className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
