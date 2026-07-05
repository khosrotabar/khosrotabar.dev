import { services } from "../data/portfolio";
import { SectionHeading } from "./section-heading";

export function Services() {
  return (
    <section id="services" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Focused development for practical business software."
          description="From product-facing web apps to internal systems, I help teams ship clear, reliable software without unnecessary noise."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-cyan-300/35 hover:bg-white/[0.07]"
            >
              <div
                aria-hidden="true"
                className="mb-5 h-1.5 w-14 rounded-full bg-cyan-300"
              />
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
