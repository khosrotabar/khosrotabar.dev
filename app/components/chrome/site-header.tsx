"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { nav, site } from "../../data/site";
import { cn } from "../../lib/cn";
import { ScrollTrigger, useGSAP } from "../../lib/gsap";
import { Logo } from "../ui/logo";
import { useSmoothScroll } from "./smooth-scroll";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);
  const { scrollTo } = useSmoothScroll();
  const isHome = usePathname() === "/";
  const base = isHome ? "" : "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 240);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    if (!isHome) return;
    const triggers: ScrollTrigger[] = [];
    nav.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (!section) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(href);
          },
        }),
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, [isHome]);

  const go = (href: string) => (event: MouseEvent) => {
    setOpen(false);
    if (isHome) {
      event.preventDefault();
      scrollTo(href);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href={`${base}#top`} data-cursor="hover" onClick={go("#top")} className="group flex items-center gap-2.5">
          <Logo className="transition-transform duration-300 group-hover:scale-105" />
          <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            {site.handle}
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={`${base}${item.href}`}
              data-cursor="hover"
              onClick={go(item.href)}
              aria-current={active === item.href ? "true" : undefined}
              className={cn(
                "relative rounded-md px-2.5 py-2 text-sm transition-colors duration-300",
                active === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {active === item.href ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-2 -bottom-0.5 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={`${base}#contact`}
            data-cursor="hover"
            onClick={go("#contact")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-8px_var(--primary)]"
          >
            Start a project
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-9 place-items-center rounded-md border border-border text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={`${base}${item.href}`}
                  onClick={go(item.href)}
                  className={cn(
                    "rounded-md px-3 py-3 text-base transition-colors",
                    active === item.href ? "text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`${base}#contact`}
                onClick={go("#contact")}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                Start a project
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
