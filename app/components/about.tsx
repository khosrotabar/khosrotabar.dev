import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="bg-slate-950/45 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="About" title="Built around useful software." />
        <div className="rounded-lg border border-white/10 bg-[#0b1424] p-6 sm:p-8">
          <p className="text-base leading-8 text-slate-300 sm:text-lg">
            I&apos;m a Full-Stack Developer focused on building practical web
            applications, dashboards, backend APIs, and internal tools. I have
            experience with React, Next.js, TypeScript, Go, PostgreSQL, REST
            APIs, authentication, authorization, RBAC, middleware, audit
            logging, and observability. I enjoy turning business requirements
            into reliable, maintainable, and user-friendly software.
          </p>
        </div>
      </div>
    </section>
  );
}
