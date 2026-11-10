"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { articles } from "../../data/articles";
import { useSpotlight } from "../../hooks/use-spotlight";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  const spotlight = useSpotlight<HTMLElement>();
  return (
    <article
      ref={spotlight}
      data-reveal-item
      className="spotlight group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 md:p-8"
    >
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {article.featured ? (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] text-primary">Featured</span>
        ) : null}
        <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
        <span aria-hidden>·</span>
        <span>{article.readingTime}</span>
      </div>
      <h3 className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug md:text-3xl">
        <Link href={article.href} data-cursor="hover" className="after:absolute after:inset-0 after:content-['']">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{article.excerpt}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
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
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Read the field report
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export function Writing() {
  return (
    <section id="articles" data-portrait-hide className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Field notes"
            title="Notes from building, breaking and shipping"
            description="Real setups, honest failures and measured trade-offs — with enough detail to reproduce the work."
          />
          <Link
            href="/articles"
            data-cursor="hover"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            All articles
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <Reveal stagger={0.08} y={24} className="mt-12 grid gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
