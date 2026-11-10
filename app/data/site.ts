/**
 * All homepage copy lives here. Numbers are taken from your existing content
 * (experience, the go-rbac-api repo, the Qwen field report) — swap in real
 * figures such as years of experience whenever you like.
 */

export const site = {
  name: "Mohammad Khosrotabar",
  firstName: "Mohammad",
  handle: "khosrotabar",
  role: "Full-Stack Developer",
  email: "mh.khosrotabar75@gmail.com",
  url: "https://khosrotabar.dev",
  location: "Remote — working with teams worldwide",
  intro:
    "I build web applications, Go backend APIs, dashboards, internal tools and SaaS MVPs with Go, React, Next.js, TypeScript and PostgreSQL — practical software that is secure, observable and easy to maintain.",
  tagline: "Go backends · Next.js · Dashboards · SaaS MVPs",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/khosrotabar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammad-khosrotabar" },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Articles", href: "/articles" },
];

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const headlineStats: Stat[] = [
  { value: 3, label: "Product teams shipped for" },
  { value: 15, suffix: "+", label: "Technologies in production" },
  { value: 16, label: "Features in my RBAC service" },
  { value: 50, suffix: " tok/s", label: "Self-hosted coding agent" },
];

export const brandStrip = {
  label: "Built for teams in fintech, AI and e-commerce",
  items: [
    "Arzesh Afarin Atlas",
    "Fintech portals",
    "Roshan",
    "AI-driven products",
    "OABeans",
    "E-commerce operations",
    "Go RBAC API",
    "Internal tools",
  ],
};

export const about = {
  title: "Your full-stack product engineer",
  paragraphs: [
    "I’m Mohammad Khosrotabar, a full-stack developer who builds practical web applications, dashboards, backend APIs and internal tools. I work across React, Next.js and TypeScript on the frontend and Go, PostgreSQL and Redis on the backend.",
    "What I care about most is the part users never see: authentication, authorization and RBAC, middleware, audit logging and observability. I turn business requirements into software that is reliable, maintainable and pleasant to use — and I document it so your team can run it without me.",
  ],
  card: {
    title: "Why work with me?",
    description:
      "Partner with a developer who owns the whole stack — from the database schema to the dashboard your team uses every day.",
    highlights: [
      "Go backend & API design",
      "Auth, sessions & RBAC done right",
      "React & Next.js frontends",
      "PostgreSQL data modeling",
      "Observability built in",
      "Clear, written communication",
    ],
  },
};

export type ServiceIcon = "web" | "api" | "security" | "dashboard" | "mvp" | "automation";

export const services: {
  title: string;
  tag: string;
  icon: ServiceIcon;
  description: string;
}[] = [
  {
    title: "Full-Stack Web Development",
    tag: "Web apps",
    icon: "web",
    description:
      "Responsive, maintainable web applications with clean frontend architecture in React and Next.js, backed by practical, well-tested backend integrations.",
  },
  {
    title: "Go Backend APIs",
    tag: "APIs",
    icon: "api",
    description:
      "Structured REST and gRPC APIs, middleware, PostgreSQL data models, OpenAPI docs and production-minded service design with logs, metrics and tracing.",
  },
  {
    title: "Authentication & Authorization",
    tag: "Security",
    icon: "security",
    description:
      "Login and session flows, JWT, service-to-service authentication and role-based access control that fails closed — with audit logs for every decision.",
  },
  {
    title: "Dashboards & Admin Panels",
    tag: "Dashboards",
    icon: "dashboard",
    description:
      "Internal tools, analytics views, admin workflows and role-based interfaces built for clarity and speed, so operators get answers instead of tables.",
  },
  {
    title: "SaaS MVP Development",
    tag: "MVPs",
    icon: "mvp",
    description:
      "Focused product builds that turn early requirements into a testable SaaS experience — auth, billing-ready data models and a dashboard — without unnecessary complexity.",
  },
  {
    title: "Internal Tools & Automation",
    tag: "Automation",
    icon: "automation",
    description:
      "Automation workflows, database integrations and back-office tools that remove repetitive manual work from operations teams.",
  },
];

/** Logos come from simple-icons (see components/sections/tech-orbit.tsx). */
export const stackLabels = [
  "Go",
  "PostgreSQL",
  "Redis",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Docker",
  "Prometheus",
  "JWT",
  "GitHub",
  "Vercel",
];

export type WorkItem = {
  slug?: string;
  href?: string;
  title: string;
  category: string;
  excerpt: string;
  stack: string[];
  stat?: { value: string; label: string };
  concept?: boolean;
};

export const work: WorkItem[] = [
  {
    slug: "go-rbac-api",
    href: "/work/go-rbac-api",
    title: "Go RBAC API — a reusable authorization service",
    category: "Backend & Security",
    excerpt:
      "A centralized RBAC service that any backend can ask one question: can this user perform this action on this resource? REST and gRPC APIs, service-to-service auth, local sessions, audit logs and a Go client SDK.",
    stack: ["Go", "PostgreSQL", "gRPC", "REST APIs", "OpenAPI", "Docker"],
    stat: { value: "1 Authorize call", label: "replaces per-service permission checks" },
  },
  {
    href: "/articles/local-ai-coding-agent-qwen",
    title: "A 50-token/s AI coding agent for $0.08 an hour",
    category: "AI & Infrastructure",
    excerpt:
      "Qwen3.8-27B on a rented RTX 3090 driving a real coding agent: GPU choice, context limits, Ollama, harnesses, fine-tuning failures and cost — measured, not guessed.",
    stack: ["Ollama", "Qwen", "RTX 3090", "OpenCode", "Coding agents"],
    stat: { value: "≈ 40–50 tok/s", label: "with ~96K context at $0.08/hour" },
  },
  {
    title: "SaaS Admin Dashboard",
    category: "Dashboard",
    excerpt:
      "A modern dashboard for managing users, analytics and business data — role-aware navigation, data tables that stay fast and charts that answer real questions.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "RBAC"],
    concept: true,
  },
  {
    title: "Full-Stack SaaS MVP",
    category: "Full-Stack",
    excerpt:
      "A complete web product combining a Next.js frontend, Go backend APIs, authentication and dashboard features — the starting point I use to get MVPs in front of users quickly.",
    stack: ["React", "Next.js", "Go", "PostgreSQL"],
    concept: true,
  },
];

export const profiles = [
  { label: "GitHub", detail: "@khosrotabar", href: "https://github.com/khosrotabar" },
  {
    label: "LinkedIn",
    detail: "Career & experience",
    href: "https://www.linkedin.com/in/mohammad-khosrotabar",
  },
  { label: "Articles", detail: "Field reports", href: "/articles" },
  { label: "Email", detail: "Start a conversation", href: `mailto:${site.email}` },
];

export const processSteps = [
  {
    index: "01",
    title: "Understand the goal",
    description:
      "A short call to understand the business goal, the constraints, and what success actually looks like for your users.",
    detail:
      "You get a written summary of the scope, the risks I see and the questions that still need answers — before any code is written.",
  },
  {
    index: "02",
    title: "Scope & milestones",
    description:
      "I map the data model, the API boundaries, auth and roles, and every third-party integration up front.",
    detail:
      "Work is broken into milestones you can review and sign off one by one, so you always know what ships next.",
  },
  {
    index: "03",
    title: "Build, test & report",
    description:
      "Clean, typed code on a staging environment you can click through at any time, with tests running on every change.",
    detail:
      "Validation, error handling, access checks and logging are built in from day one — not retrofitted at the end.",
  },
  {
    index: "04",
    title: "Deliver & support",
    description:
      "Deployment, a performance pass, documentation and a walkthrough so your team can run it confidently.",
    detail: "After launch I stay available for improvements, monitoring and the next round of features.",
  },
];

export const capabilities: {
  tag: string;
  title: string;
  description: string;
  span: "wide" | "normal" | "full";
  metric?: Stat;
}[] = [
  {
    tag: "Go",
    title: "Backend services in Go",
    description:
      "REST and gRPC APIs with Echo, structured logging with Zap, OpenTelemetry tracing and Prometheus metrics — services that explain themselves in production.",
    span: "wide",
    metric: { value: 2, label: "API protocols per service: REST + gRPC" },
  },
  {
    tag: "Security",
    title: "Auth & access control",
    description:
      "Sessions, JWT, hashed service keys and RBAC that fails closed: 401 when unauthenticated, 403 when denied, 503 when RBAC is unreachable.",
    span: "normal",
    metric: { value: 3, label: "explicit failure codes" },
  },
  {
    tag: "Frontend",
    title: "React & Next.js interfaces",
    description:
      "Responsive, accessible interfaces for fintech portals and AI-driven products, tested with Jest and Cypress.",
    span: "normal",
  },
  {
    tag: "Data",
    title: "PostgreSQL & Redis",
    description:
      "Relational models with partial unique indexes and soft deletes, versioned migrations, and Redis where latency matters.",
    span: "wide",
    metric: { value: 5, label: "versioned migrations in go-rbac-api" },
  },
  {
    tag: "AI",
    title: "Self-hosted AI tooling",
    description:
      "Running open models with Ollama on rented GPUs, wiring them into coding agents and measuring throughput, context and cost before recommending anything.",
    span: "full",
    metric: { value: 0.08, decimals: 2, prefix: "$", suffix: "/h", label: "GPU cost for a 40–50 tok/s agent" },
  },
];

export const domains = {
  stats: [
    { value: 3, label: "Companies" },
    { value: 3, label: "Industries: fintech · AI · e-commerce" },
    { value: 15, suffix: "+", label: "Technologies in production" },
  ] as Stat[],
  items: [
    "Fintech web applications",
    "Internal portals",
    "Backend APIs",
    "Authentication flows",
    "Authorization & RBAC",
    "Prometheus metrics",
    "Redis caching",
    "PostgreSQL schemas",
    "AI product interfaces",
    "Responsive frontends",
    "Jest test suites",
    "Cypress end-to-end tests",
    "Design systems in Sass",
    "Next.js applications",
    "TypeScript codebases",
    "gRPC services",
    "E-commerce websites",
    "Automation workflows",
    "MySQL integrations",
    "Back-office tools",
    "OpenAPI documentation",
    "Go client SDKs",
    "Audit logging",
    "Self-hosted LLM agents",
  ],
};

export const experience: {
  role: string;
  company: string;
  location?: string;
  period?: string;
  description: string;
  achievements: string[];
  skills: string[];
}[] = [
  {
    role: "Full-Stack Developer",
    company: "Arzesh Afarin Atlas",
    description:
      "Building fintech web applications, internal portals, backend APIs, and authentication and authorization flows.",
    achievements: [
      "Built fintech web applications and internal portals end to end",
      "Designed backend APIs in Go backed by PostgreSQL and Redis",
      "Implemented JWT authentication and role-based access control",
      "Added Prometheus metrics so services can be observed in production",
    ],
    skills: ["React", "Next.js", "TypeScript", "Go", "PostgreSQL", "Redis", "JWT", "RBAC", "Prometheus"],
  },
  {
    role: "Frontend Developer",
    company: "Roshan",
    description:
      "Built responsive frontend applications and interfaces for AI-driven products.",
    achievements: [
      "Shipped responsive interfaces for AI-driven products",
      "Built with React, Next.js and TypeScript",
      "Styled with Tailwind CSS and Sass",
      "Covered features with Jest unit tests and Cypress end-to-end tests",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Sass", "Jest", "Cypress"],
  },
  {
    role: "Web Developer",
    company: "OABeans",
    description:
      "Developed websites, automation workflows, MySQL integrations and internal tools for e-commerce operations.",
    achievements: [
      "Developed e-commerce websites",
      "Automated repetitive operational workflows",
      "Integrated MySQL data into day-to-day tools",
      "Built internal tools for the operations team",
    ],
    skills: ["PHP", "JavaScript", "HTML", "CSS", "MySQL"],
  },
];

export const principles = [
  {
    title: "Fail closed",
    source: "Go RBAC API",
    content:
      "Authorization should fail closed. If the RBAC service is unreachable, the answer is a 503 — never a silent allow.",
  },
  {
    title: "Hash what you store",
    source: "Security",
    content:
      "Service keys, sessions and passwords are stored hashed, and a plain service key is shown exactly once. A leaked database should not be a leaked system.",
  },
  {
    title: "Separate concerns",
    source: "Architecture",
    content:
      "Knowing who you are and knowing what you may do are different questions. Keep authentication and authorization apart and both get simpler.",
  },
  {
    title: "Measure it",
    source: "Field reports",
    content:
      "Benchmarks, tokens per second and cost per hour beat opinions. I measure before I recommend a tool, a model or an architecture.",
  },
  {
    title: "Make progress visible",
    source: "Process",
    content:
      "Ship in milestones you can click through on staging, so progress is obvious long before launch day — and surprises surface early.",
  },
  {
    title: "Make it usable",
    source: "Developer experience",
    content:
      "OpenAPI docs, a Postman collection, a smoke test and a client SDK turn a service into something other teams actually adopt.",
  },
];

export const terminalLines = [
  {
    prompt: "make test",
    output: "ok  pkg/apikey · ok  pkg/session · ok  pkg/password · ok  pkg/rbacclient",
  },
  {
    prompt: "docker compose up -d && make smoke",
    output: "ok: health · ok: service auth · ok: authorize\nSmoke test passed.",
  },
  {
    prompt: "grpcurl -plaintext localhost:9090 rbac.v1.RBACService/Authorize",
    output: '{ "allowed": true, "reason": "permission granted through role" }',
  },
  {
    prompt: "ollama run qwen3.8:27b",
    output: "≈ 45 tok/s · ~96K context · RTX 3090 at $0.08/h",
  },
];

export const contact = {
  title: "Let’s build something useful",
  description:
    "Available for remote freelance, contract and project-based work. Tell me what you’re building — I’ll reply with questions, a plan and an honest estimate.",
  checklist: [
    "Free first call and scope review",
    "Clear milestones and transparent pricing",
    "Regular progress updates on staging",
    "Documentation and post-launch support",
  ],
  faqs: [
    {
      q: "What kind of projects do you take on?",
      a: "Web applications, Go backend APIs, dashboards and admin panels, internal tools and SaaS MVPs — usually where the backend, the data model and the interface all need to work together.",
    },
    {
      q: "Do you work remotely and with which engagement models?",
      a: "Yes. I work remotely on freelance, contract and project-based engagements, and I’m comfortable joining an existing team or owning a build end to end.",
    },
    {
      q: "Can you work on an existing codebase?",
      a: "Absolutely. I start by reading the code and the data model, then propose the smallest set of changes that solves the problem — whether that’s a new API, an auth overhaul or a performance pass.",
    },
    {
      q: "How do we get started?",
      a: "Send a message with a few lines about your product and timeline. We’ll have a short call, I’ll send a written scope with milestones, and work starts once you’re happy with it.",
    },
  ],
};
