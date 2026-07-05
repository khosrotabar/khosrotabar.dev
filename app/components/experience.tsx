import { experience } from "../data/portfolio";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="bg-slate-950/45 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="Practical experience across fintech, AI products, and e-commerce."
          description="A concise credibility layer for the portfolio, focused on relevant work rather than a full CV."
        />

        <div className="space-y-5">
          {experience.map((item) => (
            <article
              key={`${item.role}-${item.company}`}
              className="rounded-lg border border-white/10 bg-[#0b1424] p-6 transition-colors hover:border-cyan-300/35"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-sm font-semibold text-cyan-200">
                  {item.company}
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
