export const navItems = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#tech-stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "Responsive, maintainable web applications with clean frontend architecture and practical backend integrations.",
  },
  {
    title: "Go Backend APIs",
    description:
      "Structured REST APIs, authentication flows, middleware, PostgreSQL data models, and production-minded service design.",
  },
  {
    title: "Dashboards & Admin Panels",
    description:
      "Internal tools, analytics views, admin workflows, and role-based interfaces built for clarity and speed.",
  },
  {
    title: "SaaS MVP Development",
    description:
      "Focused product builds that turn early requirements into testable SaaS experiences without unnecessary complexity.",
  },
];

type Project = {
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  caseStudyUrl?: string;
};

// TODO: Add links, screenshots, and case studies for the remaining concept projects.
export const projects: Project[] = [
  {
    title: "SaaS Admin Dashboard",
    description:
      "A modern dashboard concept for managing users, analytics, and business data.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Go RBAC API",
    description:
      "A reusable RBAC / authorization service built with Go, PostgreSQL, REST, gRPC, service-to-service authentication, local sessions, audit logs, OpenAPI docs, and a Go client SDK.",
    stack: ["Go", "PostgreSQL", "gRPC", "REST APIs", "RBAC", "OpenAPI"],
    githubUrl: "https://github.com/khosrotabar/go-rbac-api",
    caseStudyUrl: "/projects/go-rbac-api",
  },
  {
    title: "Full-Stack MVP",
    description:
      "A complete web product concept combining frontend, backend APIs, authentication, and dashboard features.",
    stack: ["React", "Next.js", "Go", "PostgreSQL"],
  },
];

export const techStack = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Go", "REST APIs", "PostgreSQL", "Redis", "JWT", "RBAC"],
  },
  {
    category: "Tools",
    skills: ["Docker", "Git", "GitHub", "Vercel", "Prometheus"],
  },
];

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Arzesh Afarin Atlas",
    description:
      "Building fintech web applications, internal portals, backend APIs, authentication and authorization flows using React, Next.js, TypeScript, Go, PostgreSQL, Redis, JWT, RBAC, and Prometheus.",
  },
  {
    role: "Frontend Developer",
    company: "Roshan",
    description:
      "Built responsive frontend applications and interfaces for AI-driven products using React, Next.js, TypeScript, Tailwind CSS, Sass, Jest, and Cypress.",
  },
  {
    role: "Web Developer",
    company: "OABeans",
    description:
      "Developed websites, automation workflows, MySQL integrations, and internal tools for e-commerce operations using PHP, JavaScript, HTML, CSS, and MySQL.",
  },
];

export const workSteps = [
  "Understand the business goal",
  "Define scope and milestones",
  "Build, test, and communicate progress",
  "Deliver, improve, and support",
];

export const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-khosrotabar",
  },
  {
    label: "GitHub",
    href: "https://github.com/khosrotabar",
  },
  {
    label: "Email",
    href: "mailto:mh.khosrotabar75@gmail.com",
    text: "Email",
  },
];
