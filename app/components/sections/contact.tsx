"use client";

import { ArrowUpRight, Check, Mail, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { contact, site } from "../../data/site";
import { useMagnetic } from "../../hooks/use-magnetic";
import { useSpotlight } from "../../hooks/use-spotlight";
import { GithubIcon, LinkedinIcon } from "../chrome/brand-icons";
import { ContactForm } from "../chrome/contact-form";
import { PortraitMarker } from "../ui/portrait-marker";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const channels = [
  {
    label: "LinkedIn",
    detail: "linkedin.com/in/mohammad-khosrotabar",
    href: "https://www.linkedin.com/in/mohammad-khosrotabar",
    Icon: LinkedinIcon,
  },
  { label: "GitHub", detail: "github.com/khosrotabar", href: "https://github.com/khosrotabar", Icon: GithubIcon },
  { label: "Email", detail: site.email, href: `mailto:${site.email}`, Icon: Mail },
];

export function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const magnetic = useMagnetic<HTMLAnchorElement>(0.16);
  const formCard = useSpotlight();
  const linksCard = useSpotlight();
  const faqCard = useSpotlight();

  return (
    <section id="contact" className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <PortraitMarker />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Contact" title={contact.title} description={contact.description} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal y={30}>
            <div ref={formCard} className="spotlight h-full rounded-2xl border border-border bg-card p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold">Start your project</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell me about your product and let&apos;s discuss how I can help you ship it.
              </p>
              <Reveal stagger={0.08} y={14} className="mt-6 space-y-3">
                {contact.checklist.map((item) => (
                  <div key={item} data-reveal-item className="flex items-center gap-2.5 text-sm text-foreground/90">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </div>
                ))}
              </Reveal>
              <div className="mt-8 border-t border-border pt-6">
                <ContactForm />
                <p className="mt-4 text-xs text-muted-foreground">
                  Prefer email?{" "}
                  <a
                    ref={magnetic}
                    href={`mailto:${site.email}`}
                    data-cursor="hover"
                    className="inline-block text-primary underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal y={30} delay={0.05}>
            <div ref={linksCard} className="spotlight flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold">Find me online</h3>
              <p className="mt-2 mb-6 text-sm text-muted-foreground">
                See the code, the career history and the write-ups — then say hello wherever suits you.
              </p>
              <div className="grid flex-1 content-start gap-3">
                {channels.map(({ label, detail, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor="hover"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-background/50 px-4 py-4 transition-colors hover:border-primary/40"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-semibold">{label}</span>
                      <span className="block truncate font-mono text-xs text-muted-foreground">{detail}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  Available now
                </p>
                <p className="mt-2 text-sm text-foreground/90">
                  Remote freelance, contract and project-based work — {site.location.toLowerCase()}.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal y={30} delay={0.08} className="lg:col-span-2">
            <div ref={faqCard} className="spotlight h-full rounded-2xl border border-border bg-card p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold">Frequently asked</h3>
              <div className="mt-6 divide-y divide-border">
                {contact.faqs.map((faq, index) => {
                  const open = openFaq === index;
                  return (
                    <div key={faq.q} className="py-1 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : index)}
                        aria-expanded={open}
                        data-cursor="hover"
                        className="flex w-full items-start gap-3 py-3 text-left"
                      >
                        <Plus
                          className={`mt-1 size-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                        />
                        <span className="flex-1 font-medium text-foreground">{faq.q}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-4 pl-7 pr-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
