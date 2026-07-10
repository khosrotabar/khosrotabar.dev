import { projects } from "../data/portfolio";
import { SectionHeading } from "./section-heading";

export function Projects() {
  return (
    <section id="projects" className="bg-slate-950/45 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Projects"
          description="A collection of real projects and production-style systems I’ve built to demonstrate frontend, backend, and full-stack engineering skills."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-lg border border-white/10 bg-[#0b1424] p-5 transition-colors hover:border-cyan-300/35"
            >
              <div
                aria-label={`${project.title} project preview`}
                className="mb-6 aspect-[16/10] rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(15,23,42,0.82)),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,24px_24px,24px_24px] p-4"
              >
                <div className="h-full rounded-md border border-cyan-200/15 bg-slate-950/55 p-3">
                  <div className="mb-3 h-3 w-24 rounded-full bg-cyan-200/50" />
                  <div className="grid h-[calc(100%-24px)] grid-cols-3 gap-2">
                    <div className="rounded bg-white/10" />
                    <div className="rounded bg-white/10" />
                    <div className="rounded bg-cyan-300/25" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  disabled
                  aria-label={`Case study coming soon for ${project.title}`}
                  className="min-h-11 flex-1 cursor-not-allowed rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-500"
                >
                  Case Study
                </button>
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} repository on GitHub`}
                    className="flex min-h-11 flex-1 items-center justify-center rounded-lg border border-cyan-300/30 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-300/10"
                  >
                    GitHub
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="min-h-11 flex-1 cursor-not-allowed rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-500"
                  >
                    GitHub
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
