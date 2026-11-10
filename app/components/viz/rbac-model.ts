/** Tiny model of the go-rbac-api decision path used by the interactive graph. */

export type NodeKind = "user" | "role" | "perm";

export const users = [
  { id: "alice", label: "alice" },
  { id: "bob", label: "bob" },
  { id: "carol", label: "carol" },
  { id: "ci-bot", label: "ci-bot · svc" },
] as const;

export const roles = [
  { id: "admin", label: "admin" },
  { id: "billing-editor", label: "billing-editor" },
  { id: "viewer", label: "viewer" },
] as const;

export const permissions = [
  { id: "invoices:create", label: "invoices:create" },
  { id: "invoices:read", label: "invoices:read" },
  { id: "reports:export", label: "reports:export" },
  { id: "users:manage", label: "users:manage" },
] as const;

export type UserId = (typeof users)[number]["id"];
export type RoleId = (typeof roles)[number]["id"];
export type PermId = (typeof permissions)[number]["id"];

export const userRoles: Record<UserId, RoleId[]> = {
  alice: ["admin"],
  bob: ["billing-editor"],
  carol: ["viewer"],
  "ci-bot": ["viewer"],
};

export const rolePermissions: Record<RoleId, PermId[]> = {
  admin: ["invoices:create", "invoices:read", "reports:export", "users:manage"],
  "billing-editor": ["invoices:create", "invoices:read"],
  viewer: ["invoices:read", "reports:export"],
};

export type Decision =
  | { status: 200; allowed: true; role: RoleId; reason: string }
  | { status: 403; allowed: false; role: RoleId | null; reason: string }
  | { status: 503; allowed: false; role: null; reason: string };

/** Same contract as the billing middleware: 503 when RBAC is down, 403 when denied, else allow. */
export function authorize(user: UserId, perm: PermId, online: boolean): Decision {
  if (!online) return { status: 503, allowed: false, role: null, reason: "authorization service unavailable" };
  const granting = userRoles[user].find((role) => rolePermissions[role].includes(perm));
  if (granting) return { status: 200, allowed: true, role: granting, reason: "permission granted through role" };
  return { status: 403, allowed: false, role: userRoles[user][0] ?? null, reason: "permission denied" };
}
