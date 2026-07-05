import { workSteps } from "../data/portfolio";
import { SectionHeading } from "./section-heading";

export function HowIWork() {
  return (
    <section id="process" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How I Work"
          title="A simple process for remote collaboration."
        />

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="mb-8 inline-flex size-10 items-center justify-center rounded-lg bg-cyan-300 text-sm font-bold text-slate-950">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold text-white">{step}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
