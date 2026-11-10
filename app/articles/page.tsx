import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { articles } from "../data/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Engineering experiments, implementation notes, benchmarks, and lessons from building software and self-hosted AI systems.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles | Mohammad Khosrotabar",
    description:
      "Real engineering experiments, implementation notes, benchmarks, and lessons from building and shipping.",
    url: "/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  return (
    <main id="top" className="relative pt-28 md:pt-36">
      <section className="relative pb-20 md:pb-28" aria-labelledby="latest-articles">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              as="h1"
              eyebrow="Writing / Experiments"
              title="Notes from building, breaking, and shipping."
              description="Field notes from real engineering work: experiments, benchmarks, failures, and implementation details that are useful beyond the demo."
            />
            <span className="font-mono text-xs text-muted-foreground">
              {String(articles.length).padStart(2, "0")} published
            </span>
          </div>

          <h2 id="latest-articles" className="sr-only">
            Latest articles
          </h2>
          <Reveal stagger={0.08} y={24} className="mt-12 grid gap-5">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={article.href}
                data-reveal-item
                data-cursor="hover"
                className="group relative grid gap-8 rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8 lg:grid-cols-[1fr_16rem] lg:items-end"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {article.featured ? (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] text-primary">Featured</span>
                    ) : null}
                    <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
                    <span aria-hidden>·</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug md:text-4xl">
                    {article.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {article.excerpt}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read article
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
