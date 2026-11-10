import { ArrowUpRight, CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { caseStudies } from "../data/case-studies";
import { work } from "../data/site";

export const metadata: Metadata = {
  title: "Work & case studies",
  description:
    "Case studies and selected projects by Mohammad Khosrotabar: Go backend services, authorization, dashboards, SaaS MVPs and self-hosted AI tooling.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  const others = work.filter((item) => !caseStudies.some((study) => item.href === `/work/${study.slug}`));

  return (
    <main id="top" className="relative pt-28 md:pt-36">
      <section className="relative pb-20 md:pb-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Work"
            title="Case studies & selected projects"
            description="Deep dives into how things were built — the problem, the decisions, the code and the results."
          />

          <Reveal stagger={0.08} y={24} className="mt-12 grid gap-5">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                data-reveal-item
                data-cursor="hover"
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                    Case study · {study.category}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-snug md:text-3xl">{study.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{study.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {study.stack.slice(0, 7).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-medium text-primary">
                  <CircleCheck className="size-3.5" />
                  {study.stats[0]?.value} {study.stats[0]?.label}
                </p>
              </Link>
            ))}
          </Reveal>

          <h2 className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">More projects</h2>
          <Reveal stagger={0.08} y={20} className="mt-5 grid gap-4 sm:grid-cols-2">
            {others.map((item) => {
              const body = (
                <>
                  <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                    {item.concept ? `Concept · ${item.category}` : item.category}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              );
              const className =
                "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40";
              return item.href ? (
                <Link key={item.title} href={item.href} data-reveal-item data-cursor="hover" className={className}>
                  {body}
                </Link>
              ) : (
                <div key={item.title} data-reveal-item className={className}>
                  {body}
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
