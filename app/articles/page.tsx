import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
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
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:px-8 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.13),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.1),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Writing / Experiments
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
              Notes from building, breaking, and shipping.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
              Field notes from real engineering work: experiments, benchmarks,
              failures, and implementation details that are useful beyond the demo.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="latest-articles">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Field reports
                </p>
                <h2 id="latest-articles" className="mt-2 text-3xl font-semibold text-white">
                  Latest articles
                </h2>
              </div>
              <span className="hidden font-mono text-xs text-slate-500 sm:block">
                {String(articles.length).padStart(2, "0")} published
              </span>
            </div>

            <div className="grid gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={article.href}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1424] p-6 outline-none transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 focus-visible:ring-2 focus-visible:ring-cyan-300 sm:p-8 lg:p-10"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(34,211,238,0.17),transparent_28%),linear-gradient(115deg,transparent_48%,rgba(255,255,255,0.025))]" />
                  <div className="relative grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {article.featured ? (
                          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-cyan-200">
                            Featured
                          </span>
                        ) : null}
                        <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
                        <span aria-hidden="true">·</span>
                        <span>{article.readingTime}</span>
                      </div>
                      <h3 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
                        {article.title}
                      </h3>
                      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        {article.excerpt}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="mt-7 inline-flex items-center gap-2 font-semibold text-cyan-200">
                        Read article
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

