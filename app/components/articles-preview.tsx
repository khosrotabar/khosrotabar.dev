import Link from "next/link";
import { articles } from "../data/articles";
import { SectionHeading } from "./section-heading";

export function ArticlesPreview() {
  const article = articles.find((item) => item.featured) ?? articles[0];

  return (
    <section id="articles" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Writing / Experiments"
          title="Notes from building, breaking, and shipping"
          description="Practical engineering field notes: real setups, honest failures, measured tradeoffs, and enough detail to reproduce the work."
        />

        <Link
          href={article.href}
          className="group relative block overflow-hidden rounded-xl border border-white/10 bg-[#0b1424] p-6 outline-none transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 focus-visible:ring-2 focus-visible:ring-cyan-300 sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.16),transparent_32%),linear-gradient(120deg,transparent_45%,rgba(255,255,255,0.025))]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-cyan-200">
                  Featured
                </span>
                <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime}</span>
              </div>
              <h3 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {article.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {article.excerpt}
              </p>
            </div>

            <div className="lg:text-right">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan-200">
                Read the field report
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-6 text-center">
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-300/30 px-5 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-300/10"
          >
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}

