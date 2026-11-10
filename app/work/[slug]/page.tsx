import { ArrowRight, ArrowUpRight, Check, ChevronRight, CircleCheck, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "../../components/ui/reveal";
import { caseStudies, getCaseStudy } from "../../data/case-studies";
import { site } from "../../data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: study.metaTitle,
    description: study.excerpt,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.metaTitle, description: study.excerpt, url: `/work/${study.slug}`, type: "article" },
  };
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-14 scroll-mt-24 md:mt-20">
      <Reveal y={16} duration={0.6}>
        <h2 id={`${id}-h`} className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <main id="top" className="relative pt-28 md:pt-32">
      <article className="mx-auto max-w-4xl px-5 pb-20 md:px-8 md:pb-28">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3" />
            <li>
              <Link className="hover:text-primary" href="/work">
                Work
              </Link>
            </li>
            <ChevronRight aria-hidden className="size-3" />
            <li aria-current="page" className="text-foreground/80">
              {study.category}
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <Reveal y={18}>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
              {study.category}
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance md:text-5xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">{study.excerpt}</p>
          </Reveal>
          <Reveal y={18} delay={0.08}>
            <dl className="mt-8 grid gap-4 border-y border-border py-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Client</dt>
                <dd className="mt-1 text-foreground/90">{study.client}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">My role</dt>
                <dd className="mt-1 text-foreground/90">{study.role}</dd>
              </div>
            </dl>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-card px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
            {study.links.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {study.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </Reveal>
        </header>

        <Reveal
          stagger={0.07}
          y={18}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4"
        >
          {study.stats.map((stat) => (
            <div key={stat.label} data-reveal-item className="bg-card px-5 py-6">
              <p className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </Reveal>

        <Section id="challenge" title="The challenge">
          <Reveal y={16} className="space-y-4 text-pretty leading-relaxed text-foreground/85">
            {study.challenge.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>{paragraph}</p>
            ))}
            {study.question ? (
              <div className="!mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary">The core question</p>
                <p className="mt-2 font-mono text-base text-foreground">{study.question}</p>
              </div>
            ) : null}
          </Reveal>
        </Section>

        <Section id="solution" title="What I built">
          <Reveal as="ol" stagger={0.06} y={18} className="grid gap-4 sm:grid-cols-2">
            {study.solution.map((item, index) => (
              <li key={item.title} data-reveal-item className="rounded-xl border border-border bg-card p-5">
                <span className="font-mono text-[11px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </Reveal>
        </Section>

        {study.architecture ? (
          <Section id="architecture" title="Architecture">
            <Reveal stagger={0.08} y={16} className="flex flex-col gap-3 md:flex-row md:items-stretch">
              {study.architecture.map((node, index) => (
                <div key={node.label} data-reveal-item className="flex flex-1 flex-col items-center gap-3 md:flex-row">
                  <div className="flex w-full flex-1 flex-col justify-center rounded-xl border border-border bg-card p-5 text-center">
                    <p className="font-display text-sm font-semibold">{node.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">{node.detail}</p>
                  </div>
                  {index < (study.architecture?.length ?? 0) - 1 ? (
                    <ArrowRight aria-hidden className="size-4 shrink-0 rotate-90 text-primary md:rotate-0" />
                  ) : null}
                </div>
              ))}
            </Reveal>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              External services never touch the RBAC database directly — they talk to the service over REST or gRPC,
              either directly or through the Go client SDK.
            </p>
          </Section>
        ) : null}

        <Section id="decisions" title="Key decisions and why">
          <ul className="space-y-4">
            {study.decisions.map((decision) => (
              <Reveal as="li" key={decision.title} y={14} className="border-l-2 border-primary/50 pl-5">
                <h3 className="font-display text-base font-semibold">{decision.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{decision.description}</p>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section id="code" title="Code from the build">
          <div className="space-y-8">
            {study.code.map((snippet) => (
              <Reveal as="figure" key={snippet.title} y={18}>
                <figcaption className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-display text-sm font-semibold">{snippet.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {snippet.language}
                  </span>
                </figcaption>
                <pre
                  tabIndex={0}
                  data-lenis-prevent
                  className="overflow-x-auto rounded-xl border border-border bg-background p-4 font-mono text-[12.5px] leading-relaxed text-foreground/90"
                >
                  <code>{snippet.code}</code>
                </pre>
                <p className="mt-2 text-sm text-muted-foreground">{snippet.note}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="results" title="Results">
          <Reveal as="ul" stagger={0.06} y={12} className="space-y-3">
            {study.results.map((result) => (
              <li key={result} data-reveal-item className="flex items-start gap-3 text-foreground/90">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </span>
                <span className="leading-relaxed">{result}</span>
              </li>
            ))}
          </Reveal>
        </Section>

        <Section id="faq" title="Questions people ask">
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {study.faqs.map((faq) => (
              <details key={faq.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-start gap-3 font-medium [&::-webkit-details-marker]:hidden">
                  <Plus className="mt-1 size-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                  {faq.q}
                </summary>
                <p className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Reveal y={24}>
          <aside className="mt-14 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:mt-20 md:p-8">
            <h2 className="font-display text-xl font-bold md:text-2xl">Need something like this?</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Tell me what you&apos;re working with and I&apos;ll reply with questions, a plan and an honest estimate.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_34px_-8px_var(--primary)]"
              >
                Start your project
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary"
              >
                {site.email}
              </a>
            </div>
          </aside>
        </Reveal>

        {study.related.length ? (
          <Section id="related" title="Related work">
            <div className="grid gap-4 sm:grid-cols-2">
              {study.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.stat ? (
                    <p className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-medium text-primary">
                      <CircleCheck className="size-3.5" />
                      {item.stat}
                    </p>
                  ) : null}
                  <ArrowUpRight className="absolute right-6 top-6 size-4 text-muted-foreground/0 transition-all duration-300 group-hover:text-primary" />
                </Link>
              ))}
            </div>
            <Link href="/work" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              All work <ArrowRight className="size-4" />
            </Link>
          </Section>
        ) : null}
      </article>
    </main>
  );
}
