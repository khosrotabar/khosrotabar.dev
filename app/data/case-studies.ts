export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  client: string;
  role: string;
  stack: string[];
  links: { label: string; href: string }[];
  stats: { value: string; label: string }[];
  challenge: string[];
  question?: string;
  solution: { title: string; description: string }[];
  architecture?: { label: string; detail: string }[];
  decisions: { title: string; description: string }[];
  code: { title: string; language: string; code: string; note: string }[];
  results: string[];
  faqs: { q: string; a: string }[];
  related: { title: string; category: string; excerpt: string; href: string; tags: string[]; stat?: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "go-rbac-api",
    category: "Backend & Security",
    title: "Go RBAC API — a reusable authorization service for microservices",
    metaTitle: "Go RBAC API — Reusable Authorization Service",
    excerpt:
      "A production-oriented RBAC and authorization service built with Go, PostgreSQL, REST, gRPC, service-to-service authentication, local sessions, audit logging, OpenAPI docs and a reusable Go client SDK.",
    client: "Open-source project",
    role: "Design, backend engineering & documentation",
    stack: ["Go", "Echo", "gRPC", "PostgreSQL", "GORM", "Docker", "OpenAPI", "Zap", "OpenTelemetry"],
    links: [{ label: "View on GitHub", href: "https://github.com/khosrotabar/go-rbac-api" }],
    stats: [
      { value: "REST + gRPC", label: "two API surfaces, one authorization model" },
      { value: "16", label: "features shipped, from sessions to an SDK" },
      { value: "1 call", label: "Authorize answers any permission question" },
      { value: "401 · 403 · 503", label: "explicit, fail-closed error contract" },
    ],
    challenge: [
      "Authorization logic becomes hard to maintain when every backend service implements its own role checks, permission naming, audit behaviour and access rules.",
      "Identity providers such as Keycloak are powerful, but complex RBAC customization can be difficult to configure and operate consistently across many services.",
      "Teams need a centralized authorization service that is easy to integrate, does not leak secrets, and keeps a record of every decision it makes.",
    ],
    question: "Can this user perform this action on this resource?",
    solution: [
      {
        title: "Centralized roles & permissions",
        description:
          "Service-aware roles and permissions stored in PostgreSQL, with user-role and role-permission assignment managed through the API.",
      },
      {
        title: "Authorization decision API",
        description:
          "A single Authorize call over REST or gRPC resolves the user, the permission and the matching role, and explains its answer with a reason.",
      },
      {
        title: "Service-to-service authentication",
        description:
          "Each calling service authenticates with its own key. Keys are hashed in the database and the plain key is returned only once.",
      },
      {
        title: "Local sessions & external identity",
        description:
          "Login, refresh and logout with opaque, hashed sessions — or sync users from an external provider such as Keycloak by provider subject.",
      },
      {
        title: "Audit logging",
        description:
          "Every authorization decision is written to an audit log, allowed or denied, without ever recording secrets.",
      },
      {
        title: "Go client SDK & billing example",
        description:
          "A reusable rbacclient package plus an example billing service that only creates invoices when RBAC returns allowed=true.",
      },
    ],
    architecture: [
      { label: "Client / Frontend", detail: "User interaction" },
      { label: "Billing Service", detail: "Business logic" },
      { label: "RBAC Service", detail: "Authorization decisions" },
      { label: "PostgreSQL", detail: "Roles, policies & audit data" },
    ],
    decisions: [
      {
        title: "Separate authentication from authorization",
        description:
          "Callers prove who they are first; RBAC only answers what they may do. External JWTs are validated by the calling service before SyncIdentity or Authorize.",
      },
      {
        title: "Fail closed, with an explicit contract",
        description:
          "The billing middleware returns 401 when authentication is missing, 403 when permission is denied and 503 when RBAC is unavailable — it never defaults to allow.",
      },
      {
        title: "Never store or expose secrets in plain text",
        description:
          "Service keys, sessions and passwords are hashed. Service keys are compared in constant time and must never reach frontend, mobile or browser clients.",
      },
      {
        title: "Make integration boring",
        description:
          "OpenAPI and Swagger UI, a Postman collection, a smoke-test script and a Go SDK mean another team can integrate without reading the source.",
      },
    ],
    code: [
      {
        title: "Fail-closed RBAC middleware (billing service)",
        language: "go",
        code: `result, err := client.Authorize(r.Context(), req)
if err != nil || result == nil {
    writeError(w, http.StatusServiceUnavailable,
        "RBAC_UNAVAILABLE", "authorization service unavailable", "")
    return
}
if !result.Allowed {
    writeError(w, http.StatusForbidden,
        "PERMISSION_DENIED", "permission denied", result.Reason)
    return
}

next.ServeHTTP(w, r)`,
        note: "If RBAC cannot answer, the request does not go through. Unavailable is a 503, never an implicit allow.",
      },
      {
        title: "Service keys: hashed at rest, compared in constant time",
        language: "go",
        code: `func Validate(plainKey string, hash string) bool {
    if plainKey == "" || hash == "" {
        return false
    }

    calculated := Hash(plainKey)
    return subtle.ConstantTimeCompare([]byte(calculated), []byte(hash)) == 1
}

func Hash(plainKey string) string {
    sum := sha256.Sum256([]byte(strings.TrimSpace(plainKey)))
    return hex.EncodeToString(sum[:])
}`,
        note: "The database only ever sees a SHA-256 digest, and ConstantTimeCompare avoids leaking information through timing.",
      },
      {
        title: "One RPC for every permission question",
        language: "proto",
        code: `package rbac.v1;

service RBACService {
  rpc Authorize(AuthorizeRequest) returns (AuthorizeResponse);
}`,
        note: "The same decision is exposed over REST for simple callers and gRPC for internal services.",
      },
    ],
    results: [
      "External services check permissions with a single Authorize call instead of duplicating role logic.",
      "Works with local users or with external identity providers through identity sync.",
      "Every decision is audited, and the service fails closed by design.",
      "Ships with OpenAPI docs, Swagger UI, a Postman collection, a smoke test and a reusable Go SDK.",
      "Provides a clean, documented foundation for RBAC across a microservice system.",
    ],
    faqs: [
      {
        q: "Why build a separate RBAC service instead of using Keycloak roles?",
        a: "Keycloak is excellent at identity, but complex, service-aware permission models are hard to customize and operate across many services. Keeping authorization in a small dedicated service makes the rules explicit, testable and auditable — and it can still sync identities from Keycloak.",
      },
      {
        q: "How does another service integrate with it?",
        a: "The service authenticates with its own service key, then calls Authorize over REST or gRPC — directly or through the pkg/rbacclient Go SDK. The billing example shows the full flow in a few lines of middleware.",
      },
      {
        q: "What happens if the RBAC service is down?",
        a: "Callers fail closed. The example middleware returns 503 RBAC_UNAVAILABLE and the protected action never runs.",
      },
      {
        q: "Is it production ready?",
        a: "It is production-oriented: hashed secrets, fail-closed behaviour, audit logs, tracing and metrics. Before production you would add TLS or mTLS between services and service-key rotation, as the security notes in the repo describe.",
      },
    ],
    related: [
      {
        title: "A 50-token/s AI coding agent for $0.08 an hour",
        category: "Field report",
        excerpt:
          "Qwen3.8-27B on a rented RTX 3090 driving a real coding agent — GPUs, context, Ollama, harnesses and cost, measured.",
        href: "/articles/local-ai-coding-agent-qwen",
        tags: ["Ollama", "Qwen", "Coding agents"],
        stat: "≈ 40–50 tok/s at $0.08/hour",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
