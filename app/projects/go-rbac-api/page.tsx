import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../components/footer";

export const metadata: Metadata = {
  title: "Go RBAC API — Reusable Authorization Service",
  description:
    "A case study of a production-oriented authorization service built with Go, PostgreSQL, REST, gRPC, audit logging, and a reusable Go client SDK.",
  alternates: {
    canonical: "/projects/go-rbac-api",
  },
};

const features = [
  "REST API",
  "gRPC API",
  "PostgreSQL persistence",
  "Service-to-service authentication",
  "Local session login, refresh, and logout",
  "External identity sync",
  "Role and permission management",
  "User-role assignment",
  "Role-permission assignment",
  "Authorization decision API",
  "Audit logging",
  "OpenAPI / Swagger documentation",
  "Postman collection",
  "Smoke test script",
  "Reusable Go client SDK",
  "Example billing service integration",
];

const securityDecisions = [
  "Service keys are hashed in the database.",
  "Plain service keys are returned only once.",
  "Passwords are hashed.",
  "Sessions are opaque and hashed.",
  "The billing service fails closed.",
  "Missing authentication returns 401.",
  "Permission denied returns 403.",
  "RBAC unavailable returns 503.",
  "Service keys are never exposed to frontend clients.",
];

const technologies = [
  "Go",
  "Echo",
  "gRPC",
  "PostgreSQL",
  "GORM",
  "Docker",
  "OpenAPI",
  "Swagger UI",
  "Postman",
  "Zap",
  "OpenTelemetry",
];

const architecture = [
  { label: "Client / Frontend", detail: "User interaction" },
  { label: "Billing Service", detail: "Business logic" },
  { label: "RBAC Service", detail: "Authorization decisions" },
  { label: "PostgreSQL", detail: "Roles, policies & audit data" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
      {children}
    </p>
  );
}

export default function GoRbacApiCaseStudy() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/85 backdrop-blur-xl">
        <nav
          aria-label="Case study navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <Link href="/" className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-lg border border-cyan-300/35 bg-cyan-300/10 text-sm font-bold text-cyan-100 transition-colors group-hover:border-cyan-200"
            >
              MK
            </span>
            <span className="hidden text-sm font-semibold text-white sm:block">
              Mohammad Khosrotabar
            </span>
          </Link>
          <Link
            href="/#projects"
            className="rounded-lg border border-cyan-300/35 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-300/10"
          >
            Back to Projects
          </Link>
        </nav>
      </header>

      <main>
        <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_80%_8%,rgba(45,212,191,0.14),transparent_30%),linear-gradient(180deg,#08111f_0%,#0f172a_72%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(125,211,252,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.55)_1px,transparent_1px)] [background-size:48px_48px]"
          />

          <div className="mx-auto max-w-5xl">
            <p className="mb-5 inline-flex rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              Backend Engineering Case Study
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Go RBAC API — Reusable Authorization Service
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
              A production-oriented RBAC and authorization service built with
              Go, PostgreSQL, REST, gRPC, service-to-service authentication,
              local sessions, audit logging, OpenAPI docs, and a reusable Go
              client SDK.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/khosrotabar/go-rbac-api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-base font-semibold text-slate-950 transition-colors hover:bg-cyan-200"
              >
                View on GitHub
              </a>
              <Link
                href="/#projects"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-cyan-200 hover:bg-white/10"
              >
                Back to Projects
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-950/45 px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <article className="rounded-lg border border-white/10 bg-[#0b1424] p-6 sm:p-8">
              <SectionLabel>01 / Overview</SectionLabel>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Centralized authorization for backend systems
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
                <p>
                  Go RBAC API is a reusable authorization service designed for
                  backend and microservice systems. Instead of implementing role
                  and permission checks inside every service, external services
                  can delegate authorization decisions to a centralized RBAC
                  service through REST or gRPC.
                </p>
                <p>
                  The project includes role and permission management,
                  user-role and role-permission assignment, service-to-service
                  authentication, local session support, external identity sync,
                  audit logging, Swagger/OpenAPI documentation, Postman tests,
                  smoke tests, and an example billing microservice.
                </p>
              </div>
            </article>

            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <SectionLabel>02 / Problem</SectionLabel>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Authorization becomes fragmented quickly
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
                <p>
                  Authorization logic can become difficult to maintain when
                  every backend service implements its own role checks,
                  permission naming, audit behavior, and access rules.
                </p>
                <p>
                  Identity providers such as Keycloak are powerful, but complex
                  RBAC customization can be difficult to configure and operate
                  across multiple services.
                </p>
                <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
                  <p className="text-sm font-semibold text-cyan-100">
                    The core authorization question
                  </p>
                  <p className="mt-2 font-mono text-base text-white">
                    Can this user perform this action on this resource?
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div>
                <SectionLabel>03 / Solution</SectionLabel>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  One service for consistent access decisions
                </h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
                <p>
                  I built a centralized RBAC service in Go that exposes both
                  REST and gRPC APIs. External services authenticate themselves
                  using service credentials, then call the RBAC service to sync
                  identities, introspect local sessions, and authorize user
                  actions.
                </p>
                <p>
                  The service can work with local users or integrate with
                  external identity providers like Keycloak by storing external
                  provider subjects and syncing user identities.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <SectionLabel>04 / Key Features</SectionLabel>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex min-h-20 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-cyan-300"
                    />
                    <span className="text-sm font-medium leading-6 text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-950/45 px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>05 / Architecture</SectionLabel>
            <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-stretch lg:gap-4">
              {architecture.map((node, index) => (
                <div
                  key={node.label}
                  className="contents lg:flex lg:flex-1 lg:items-center lg:gap-4"
                >
                  <div className="flex min-h-32 flex-1 flex-col justify-center rounded-lg border border-cyan-300/20 bg-[#0b1424] p-5 text-center shadow-lg shadow-cyan-950/10">
                    <p className="font-semibold text-white">{node.label}</p>
                    <p className="mt-2 text-sm text-slate-400">{node.detail}</p>
                  </div>
                  {index < architecture.length - 1 ? (
                    <div
                      aria-hidden="true"
                      className="flex h-2 items-center justify-center text-2xl text-cyan-300 lg:h-auto lg:w-8 lg:shrink-0"
                    >
                      <span className="rotate-90 lg:rotate-0">→</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <p className="max-w-4xl text-base leading-8 text-slate-300">
                External services do not access the RBAC database directly.
                They communicate with the RBAC service through its REST or gRPC
                APIs, either directly or through the reusable Go client SDK.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionLabel>06 / Security Decisions</SectionLabel>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Explicit boundaries and fail-closed behavior
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {securityDecisions.map((decision) => (
                  <div
                    key={decision}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-300/15 text-xs text-emerald-200"
                      >
                        ✓
                      </span>
                      <p className="text-sm leading-6 text-slate-200">
                        {decision}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:pt-1">
              <SectionLabel>07 / Tech Stack</SectionLabel>
              <div className="rounded-lg border border-cyan-300/20 bg-[#0b1424] p-6 sm:p-8">
                <div className="flex flex-wrap gap-3">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-white/10 bg-slate-950/45 px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl rounded-lg border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(11,20,36,0.92))] p-7 sm:p-10">
            <SectionLabel>08 / Result</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
              A reusable foundation for authorization
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
              The final result is a reusable authorization foundation that can
              be integrated into multiple backend services. A service only
              needs to ask the RBAC API whether a user is allowed to perform an
              action, instead of duplicating authorization logic internally.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/khosrotabar/go-rbac-api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-base font-semibold text-slate-950 transition-colors hover:bg-cyan-200"
              >
                GitHub
              </a>
              <Link
                href="/#projects"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-cyan-200 hover:bg-white/10"
              >
                Back to Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
