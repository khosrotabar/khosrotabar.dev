export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-5 pb-10 pt-10 sm:px-8 sm:pb-10 sm:pt-12"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_80%_8%,rgba(45,212,191,0.14),transparent_30%),linear-gradient(180deg,#08111f_0%,#0f172a_58%,#111827_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(125,211,252,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.55)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 inline-flex rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-base font-semibold text-cyan-100">
            Full-Stack Developer | Go, React, Next.js, PostgreSQL
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Building web apps, backend APIs, dashboards, and SaaS MVPs.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            I&apos;m Mohammad Khosrotabar, a Full-Stack Developer focused on Go
            Backend, React, Next.js, TypeScript, PostgreSQL, and
            production-ready web products.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-base font-semibold text-slate-950 transition-colors hover:bg-cyan-200"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-cyan-200 hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-lg lg:mx-0 lg:block">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-md border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-400" />
                <span className="size-3 rounded-full bg-amber-300" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-4 font-mono text-sm text-slate-300">
                <p>
                  <span className="text-cyan-300">type</span>{" "}
                  Product = &quot;API&quot; | &quot;Dashboard&quot; |
                  &quot;SaaS MVP&quot;;
                </p>
                <p>
                  <span className="text-teal-300">build</span>({`{`}{" "}
                  frontend: &quot;Next.js&quot;, backend: &quot;Go&quot; {`}`})
                </p>
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  {["Auth", "RBAC", "REST", "PostgreSQL"].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-cyan-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
