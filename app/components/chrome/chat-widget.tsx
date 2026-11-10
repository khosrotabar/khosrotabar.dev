"use client";

import { Bell, Link2, MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site, socials } from "../../data/site";
import { cn } from "../../lib/cn";
import { Logo } from "../ui/logo";
import { ContactForm } from "./contact-form";

const tabs = [
  { id: "form", label: "Send a message", Icon: MessageSquare },
  { id: "links", label: "Connect", Icon: Link2 },
] as const;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("form");
  const [unread, setUnread] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={`Contact ${site.name}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="flex max-h-[min(44rem,calc(100dvh-6.5rem))] w-[min(26rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Logo size={36} />
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold leading-tight">{site.name}</p>
                <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Open to new projects
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                data-cursor="hover"
                className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="px-4 pt-4">
              <p className="rounded-xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground/90">
                Hi 👋 How would you like to get in touch?
              </p>
              <div role="tablist" className="mt-3 grid grid-cols-2 gap-1 rounded-full border border-border bg-background p-1">
                {tabs.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    data-cursor="hover"
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors",
                      tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
              {tab === "form" ? (
                <ContactForm compact />
              ) : (
                <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-between bg-background/40 px-4 py-3 text-sm transition-colors hover:bg-accent hover:text-primary"
                      >
                        {social.label}
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {social.href.replace(/^mailto:|^https?:\/\/(www\.)?/, "")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close contact chat" : "Open contact chat"}
        aria-expanded={open}
        onClick={() => {
          setUnread(false);
          setOpen((value) => !value);
        }}
        data-cursor="hover"
        className="relative grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/40 transition-shadow hover:shadow-[0_0_38px_-6px_var(--primary)]"
      >
        {open ? <X className="size-6" /> : <MessageSquare className="size-6" />}
        {unread && !open ? (
          <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full border-2 border-background bg-destructive text-white">
            <Bell className="size-2.5" />
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-destructive/70" />
          </span>
        ) : null}
      </button>
    </div>
  );
}
