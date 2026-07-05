import { techStack } from "../data/portfolio";
import { SectionHeading } from "./section-heading";

export function TechStack() {
  return (
    <section id="tech-stack" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I use to build dependable web products."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {techStack.map((group) => (
            <article
              key={group.category}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {group.category}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 ring-1 ring-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
