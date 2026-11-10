"use client";

import { Power, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { cn } from "../../lib/cn";
import {
  authorize,
  permissions,
  rolePermissions,
  roles,
  userRoles,
  users,
  type Decision,
  type NodeKind,
  type PermId,
  type UserId,
} from "./rbac-model";

/* ------------------------------------------------------------------ types */

type GraphNode = {
  id: string;
  label: string;
  kind: NodeKind;
  col: number;
  row: number;
  rows: number;
  ax: number; // anchor
  ay: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  seed: number;
  pulse: number; // 0..1 highlight when a packet passes
};

type Point = { x: number; y: number };

type Packet = {
  hops: string[]; // node ids; "gate:<user>" is a virtual stop between users and roles
  decision: Decision;
  user: UserId;
  perm: PermId;
  t: number; // progress in hops (0 .. hops.length - 1)
  trail: Point[];
};

type Flash = { at: Point | string; color: string; label: string; born: number };

type LogEntry = {
  id: number;
  time: string;
  user: UserId;
  perm: PermId;
  decision: Decision;
};

/* --------------------------------------------------------------- palette */

const C = {
  fg: "#eff2f4",
  muted: "#93999e",
  card: "#121518",
  line: "rgba(255,255,255,0.09)",
  primary: "#51e57e",
  teal: "#00b5b6",
  red: "#fa6863",
  amber: "#dba400",
};

const kindColor: Record<NodeKind, string> = { user: C.fg, role: C.teal, perm: C.primary };
const statusColor = (decision: Decision) =>
  decision.status === 200 ? C.primary : decision.status === 403 ? C.red : C.amber;
const statusLabel = (decision: Decision) =>
  decision.status === 200 ? "200 ALLOW" : decision.status === 403 ? "403 DENY" : "503 FAIL CLOSED";

const graphItems: { id: string; label: string; kind: NodeKind }[] = [
  ...users.map((u) => ({ id: u.id, label: u.label, kind: "user" as const })),
  ...roles.map((r) => ({ id: r.id, label: r.label, kind: "role" as const })),
  ...permissions.map((p) => ({ id: p.id, label: p.label, kind: "perm" as const })),
];

function rgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;
}

const edges: [string, string][] = [
  ...users.flatMap((u) => userRoles[u.id].map((r) => [u.id, r] as [string, string])),
  ...roles.flatMap((r) => rolePermissions[r.id].map((p) => [r.id, p] as [string, string])),
];

function buildNodes(): GraphNode[] {
  const make = (
    list: readonly { id: string; label: string }[],
    kind: NodeKind,
    col: number,
  ): GraphNode[] =>
    list.map((item, row) => ({
      id: item.id,
      label: item.label,
      kind,
      col,
      row,
      rows: list.length,
      ax: 0,
      ay: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      w: 80,
      h: 26,
      seed: Math.random() * 1000,
      pulse: 0,
    }));
  return [...make(users, "user", 0), ...make(roles, "role", 1), ...make(permissions, "perm", 2)];
}

function bezier(a: Point, b: Point, t: number): Point {
  const mx = (a.x + b.x) / 2;
  const u = 1 - t;
  // cubic with horizontal tangents: a -> (mx, a.y) -> (mx, b.y) -> b
  return {
    x: u * u * u * a.x + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * b.x,
    y: u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y,
  };
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/* ------------------------------------------------------------- log store */

type LogState = { log: LogEntry[]; stats: { allow: number; deny: number; closed: number } };

/**
 * Decisions are published from the render loop. Only the log and the counters subscribe,
 * so a new audit line never re-renders the canvas widget around them.
 */
function createLogStore() {
  let state: LogState = { log: [], stats: { allow: 0, deny: 0, closed: 0 } };
  const listeners = new Set<() => void>();
  return {
    get: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    push(entry: LogEntry) {
      const { status } = entry.decision;
      state = {
        log: [entry, ...state.log].slice(0, LOG_ROWS),
        stats: {
          allow: state.stats.allow + (status === 200 ? 1 : 0),
          deny: state.stats.deny + (status === 403 ? 1 : 0),
          closed: state.stats.closed + (status === 503 ? 1 : 0),
        },
      };
      listeners.forEach((listener) => listener());
    },
  };
}

type LogStore = ReturnType<typeof createLogStore>;
const LOG_ROWS = 5;

function useLogState(store: LogStore) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

function Counters({ store }: { store: LogStore }) {
  const { stats } = useLogState(store);
  return (
    <div className="ml-auto flex items-center gap-3 font-mono text-[10px] tabular-nums">
      <span className="text-primary">{stats.allow} allow</span>
      <span className="text-chart-5">{stats.deny} deny</span>
      <span className="text-chart-4">{stats.closed} 503</span>
    </div>
  );
}

const statusClass = (decision: Decision) =>
  decision.status === 200 ? "text-primary" : decision.status === 403 ? "text-chart-5" : "text-chart-4";

/** Fixed height, one line per entry: new lines slide in without ever resizing the page. */
function AuditLog({ store }: { store: LogStore }) {
  const { log } = useLogState(store);
  return (
    <ol
      aria-live="polite"
      className="relative overflow-hidden font-mono text-[10.5px] sm:text-[11px]"
      style={{ height: `${LOG_ROWS * 1.375}rem` }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {log.map((entry) => (
          <motion.li
            key={entry.id}
            layout="position"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[1.375rem] items-center gap-x-2 overflow-hidden whitespace-nowrap"
          >
            <span className="shrink-0 text-muted-foreground/60">{entry.time}</span>
            <span className="shrink-0 text-foreground/90">
              {entry.user} → {entry.perm}
            </span>
            <span className={cn("shrink-0", statusClass(entry.decision))}>{statusLabel(entry.decision)}</span>
            <span className="hidden min-w-0 truncate text-muted-foreground sm:inline">
              {entry.decision.reason}
              {entry.decision.status === 200 ? ` (${entry.decision.role})` : ""}
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
      {log.length === 0 ? (
        <li className="flex h-[1.375rem] items-center text-muted-foreground/60">waiting for the first request…</li>
      ) : null}
    </ol>
  );
}

/* ---------------------------------------------------------------- component */

export function AuthGraph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pillRefs = useRef(new Map<string, HTMLDivElement>());
  const nodesRef = useRef<GraphNode[]>(buildNodes());
  const packetsRef = useRef<Packet[]>([]);
  const flashesRef = useRef<Flash[]>([]);
  const onlineRef = useRef(true);
  const reducedRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const logIdRef = useRef(0);

  const [online, setOnline] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserId>("bob");
  const [selectedPerm, setSelectedPerm] = useState<PermId>("invoices:create");
  const [store] = useState(createLogStore);
  const reduced = useReducedMotion();
  const selectedUserRef = useRef<UserId>("bob");

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    reducedRef.current = reduced === true;
  }, [reduced]);

  useEffect(() => {
    onlineRef.current = online;
  }, [online]);

  const record = useCallback((packet: Packet) => {
    const { decision } = packet;
    const now = new Date();
    const time = now.toTimeString().slice(0, 8);
    store.push({ id: ++logIdRef.current, time, user: packet.user, perm: packet.perm, decision });
  }, [store]);

  const fire = useCallback(
    (user: UserId, perm: PermId) => {
      const decision = authorize(user, perm, onlineRef.current);
      const hops =
        decision.status === 200
          ? [user, decision.role, perm]
          : decision.status === 403
            ? [user, decision.role ?? `gate:${user}`]
            : [user, `gate:${user}`];
      const packet: Packet = { hops, decision, user, perm, t: 0, trail: [] };
      if (reducedRef.current) {
        packet.t = hops.length - 1;
        flashesRef.current.push({
          at: hops[hops.length - 1],
          color: statusColor(decision),
          label: statusLabel(decision),
          born: performance.now(),
        });
        record(packet);
        return;
      }
      packetsRef.current.push(packet);
    },
    [record],
  );

  const interact = () => {
    lastInteractionRef.current = performance.now();
  };

  /* --------------------------------------------------------- render loop */
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = nodesRef.current;
    const pills = pillRefs.current;
    const pillStyle = new Map<string, string>();
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim() || "monospace";
    let width = 0;
    let height = 0;
    let small = false;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let hovered: GraphNode | null = null;
    let backdrop: HTMLCanvasElement | null = null;
    let dragging: { node: GraphNode; dx: number; dy: number; startX: number; startY: number; moved: boolean } | null =
      null;
    const pointer = { x: -999, y: -999 };

    const layout = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      small = width < 560;
      // Supersample (>= 2x) so thin lines and moving packets stay smooth on 1x screens too.
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      backdrop = document.createElement("canvas");
      backdrop.width = canvas.width;
      backdrop.height = canvas.height;
      const bctx = backdrop.getContext("2d");
      if (bctx) {
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        bctx.fillStyle = "rgba(255,255,255,0.05)";
        const step = small ? 18 : 22;
        for (let gx = step / 2; gx < width; gx += step) {
          for (let gy = step / 2; gy < height; gy += step) bctx.fillRect(gx, gy, 1, 1);
        }
      }
      ctx.font = `500 ${small ? 10 : 12}px ${mono}`;
      const cols = small ? [0.16, 0.5, 0.82] : [0.15, 0.48, 0.82];
      const top = small ? 46 : 56;
      const bottom = small ? 18 : 26;
      for (const n of nodes) {
        const el = pills.get(n.id);
        n.h = small ? 22 : 28;
        if (el) {
          el.style.fontSize = `${small ? 10 : 12}px`;
          el.style.height = `${n.h}px`;
          el.style.lineHeight = `${n.h - 2}px`;
          el.style.padding = `0 ${small ? 8 : 12}px`;
          el.style.visibility = "visible";
          n.w = el.offsetWidth;
        } else {
          n.w = ctx.measureText(n.label).width + (small ? 16 : 24);
        }
        n.ax = cols[n.col] * width;
        n.ay = top + ((n.row + 0.5) * (height - top - bottom)) / n.rows;
        if (n.x === 0 && n.y === 0) {
          n.x = n.ax;
          n.y = n.ay;
        }
      }
    };

    const anchorOf = (id: string): Point => {
      if (id.startsWith("gate:")) {
        const user = byId.get(id.slice(5));
        const roleCol = nodes.find((n) => n.kind === "role");
        const x = user && roleCol ? (user.x + user.w / 2 + (roleCol.x - roleCol.w / 2)) / 2 : width / 3;
        return { x, y: user?.y ?? height / 2 };
      }
      const n = byId.get(id);
      return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
    };
    const outPort = (id: string): Point => {
      const n = byId.get(id);
      return n ? { x: n.x + n.w / 2, y: n.y } : anchorOf(id);
    };
    const inPort = (id: string): Point => {
      const n = byId.get(id);
      return n ? { x: n.x - n.w / 2, y: n.y } : anchorOf(id);
    };

    const connected = (node: GraphNode) => {
      const set = new Set<string>([node.id]);
      const walk = (id: string, dir: 1 | -1) => {
        for (const [a, b] of edges) {
          const next = dir === 1 ? (a === id ? b : null) : b === id ? a : null;
          if (next && !set.has(next)) {
            set.add(next);
            walk(next, dir);
          }
        }
      };
      walk(node.id, 1);
      walk(node.id, -1);
      return set;
    };

    const hit = (x: number, y: number) =>
      [...nodes].reverse().find((n) => Math.abs(x - n.x) <= n.w / 2 + 4 && Math.abs(y - n.y) <= n.h / 2 + 4) ?? null;

    const drawCurve = (a: Point, b: Point) => {
      const mx = (a.x + b.x) / 2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(mx, a.y, mx, b.y, b.x, b.y);
      ctx.stroke();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      const calm = reducedRef.current;

      // physics: springs toward a gently drifting anchor
      for (const n of nodes) {
        n.pulse = Math.max(0, n.pulse - dt * 1.6);
        if (dragging?.node === n) continue;
        const driftX = calm ? 0 : Math.sin(t * 0.6 + n.seed) * 4;
        const driftY = calm ? 0 : Math.cos(t * 0.8 + n.seed * 1.3) * 5;
        const ax = (n.ax + driftX - n.x) * 0.055;
        const ay = (n.ay + driftY - n.y) * 0.055;
        n.vx = (n.vx + ax) * 0.86;
        n.vy = (n.vy + ay) * 0.86;
        n.x += n.vx;
        n.y += n.vy;
      }

      ctx.clearRect(0, 0, width, height);

      // dotted backdrop (pre-rendered once per resize)
      if (backdrop) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(backdrop, 0, 0);
        ctx.restore();
      }

      // column titles
      ctx.font = `500 ${small ? 9 : 10}px ${mono}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const titles = ["USERS", "ROLES", "PERMISSIONS"];
      titles.forEach((title, col) => {
        const n = nodes.find((node) => node.col === col);
        if (!n) return;
        ctx.fillStyle = C.muted;
        ctx.globalAlpha = 0.7;
        ctx.fillText(title, n.ax, small ? 20 : 24);
        ctx.globalAlpha = 1;
      });

      // edges
      const focus = hovered ?? dragging?.node ?? null;
      const lit = focus ? connected(focus) : null;
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const on = lit ? lit.has(a) && lit.has(b) : false;
        ctx.strokeStyle = on ? "rgba(81,229,126,0.55)" : lit ? "rgba(255,255,255,0.04)" : C.line;
        ctx.lineWidth = on ? 1.5 : 1;
        drawCurve(outPort(a), inPort(b));
      }

      // RBAC gate line between users and roles: shows state at a glance
      const firstRole = nodes.find((n) => n.kind === "role");
      const firstUser = nodes.find((n) => n.kind === "user");
      if (firstRole && firstUser) {
        const gx = (firstUser.ax + firstUser.w / 2 + firstRole.ax - firstRole.w / 2) / 2;
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = onlineRef.current ? "rgba(81,229,126,0.18)" : "rgba(219,164,0,0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gx, small ? 36 : 42);
        ctx.lineTo(gx, height - 10);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = `500 ${small ? 8 : 9}px ${mono}`;
        ctx.fillStyle = onlineRef.current ? "rgba(81,229,126,0.7)" : C.amber;
        ctx.fillText(onlineRef.current ? "RBAC ●" : "RBAC ✕", gx, height - (small ? 6 : 10) - 2);
      }

      // packets
      const done: Packet[] = [];
      for (const p of packetsRef.current) {
        const segments = p.hops.length - 1;
        p.t = Math.min(segments, p.t + dt * 1.55);
        const seg = Math.min(segments - 1, Math.floor(p.t));
        const local = easeInOut(p.t - seg);
        const a = seg === 0 ? outPort(p.hops[0]) : outPort(p.hops[seg]);
        const b = inPort(p.hops[seg + 1]);
        const pos = bezier(a, b, local);
        p.trail.push(pos);
        if (p.trail.length > 18) p.trail.shift();
        const color = p.t >= segments - 0.35 ? statusColor(p.decision) : C.primary;

        ctx.lineCap = "round";
        for (let i = 1; i < p.trail.length; i++) {
          ctx.strokeStyle = color;
          ctx.globalAlpha = (i / p.trail.length) * 0.6;
          ctx.lineWidth = (i / p.trail.length) * 3;
          ctx.beginPath();
          ctx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y);
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        const passing = byId.get(p.hops[Math.round(p.t)]);
        if (passing && Math.abs(p.t - Math.round(p.t)) < 0.08) passing.pulse = 1;

        if (p.t >= segments) done.push(p);
      }
      if (done.length) {
        packetsRef.current = packetsRef.current.filter((p) => !done.includes(p));
        for (const p of done) {
          flashesRef.current.push({
            at: p.hops[p.hops.length - 1],
            color: statusColor(p.decision),
            label: statusLabel(p.decision),
            born: now,
          });
          record(p);
        }
      }

      // nodes: real DOM layers moved with sub-pixel transforms (canvas text snaps to whole pixels)
      for (const n of nodes) {
        const el = pills.get(n.id);
        if (!el) continue;
        const accent = kindColor[n.kind];
        const emphasised = lit ? lit.has(n.id) : true;
        const lift = n === hovered || n === dragging?.node ? 1 : 0;
        el.style.transform = `translate3d(${(n.x - n.w / 2).toFixed(2)}px, ${(n.y - n.h / 2).toFixed(2)}px, 0)`;
        const glow = Math.max(n.pulse, lift * 0.6);
        const key = `${emphasised ? 1 : 0}|${glow.toFixed(2)}|${lift}`;
        if (pillStyle.get(n.id) !== key) {
          pillStyle.set(n.id, key);
          el.style.opacity = emphasised ? "1" : "0.4";
          el.style.borderColor = rgba(accent, (emphasised ? 0.45 : 0.2) + n.pulse * 0.5 + lift * 0.3);
          el.style.boxShadow = glow > 0.01 ? `0 0 ${(18 * glow).toFixed(1)}px ${rgba(accent, 0.55 * glow)}` : "none";
        }
      }

      // flashes: expanding ring + status label
      flashesRef.current = flashesRef.current.filter((f) => now - f.born < 1500);
      for (const f of flashesRef.current) {
        const age = (now - f.born) / 1000;
        const at = typeof f.at === "string" ? anchorOf(f.at) : f.at;
        const ring = Math.min(1, age / 0.9);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = 1 - ring;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(at.x, at.y, 10 + ring * 34, 0, Math.PI * 2);
        ctx.stroke();
        const fade = Math.min(1, Math.max(0, 1.5 - age) / 0.5);
        ctx.globalAlpha = fade;
        ctx.font = `700 ${small ? 10 : 11}px ${mono}`;
        ctx.fillStyle = f.color;
        ctx.fillText(f.label, at.x, at.y - 28);
        ctx.globalAlpha = 1;
      }
      ctx.font = `500 ${small ? 10 : 12}px ${mono}`;

      canvas.style.cursor = dragging ? "grabbing" : hovered ? "grab" : "default";
    };

    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onDown = (event: PointerEvent) => {
      const p = local(event);
      const node = hit(p.x, p.y);
      if (!node) return;
      lastInteractionRef.current = performance.now();
      dragging = { node, dx: node.x - p.x, dy: node.y - p.y, startX: p.x, startY: p.y, moved: false };
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      const p = local(event);
      pointer.x = p.x;
      pointer.y = p.y;
      if (dragging) {
        const n = dragging.node;
        if (Math.hypot(p.x - dragging.startX, p.y - dragging.startY) > 5) dragging.moved = true;
        const nx = p.x + dragging.dx;
        const ny = p.y + dragging.dy;
        n.vx = nx - n.x;
        n.vy = ny - n.y;
        n.x = nx;
        n.y = ny;
        return;
      }
      hovered = hit(p.x, p.y);
    };
    const onUp = (event: PointerEvent) => {
      if (!dragging) return;
      const { node, moved } = dragging;
      dragging = null;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      if (moved) return; // a fling: velocity carries it, the spring brings it home
      if (node.kind === "user") {
        setSelectedUser(node.id as UserId);
        const perm = permissions[Math.floor(Math.random() * permissions.length)].id;
        setSelectedPerm(perm);
        fire(node.id as UserId, perm);
      } else if (node.kind === "perm") {
        setSelectedPerm(node.id as PermId);
        fire(selectedUserRef.current, node.id as PermId);
      }
    };
    const onLeave = () => {
      hovered = null;
    };

    layout();
    raf = requestAnimationFrame(frame);
    const resize = new ResizeObserver(layout);
    resize.observe(stage);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(stage);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    // self-running demo until someone interacts
    const demo = window.setInterval(() => {
      if (!visible || document.hidden || reducedRef.current) return;
      if (performance.now() - lastInteractionRef.current < 9000) return;
      if (packetsRef.current.length > 2) return;
      const user = users[Math.floor(Math.random() * users.length)].id;
      const perm = permissions[Math.floor(Math.random() * permissions.length)].id;
      fire(user, perm);
    }, 2300);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(demo);
      resize.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [fire, record]);

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors sm:text-[11px]",
      active
        ? "border-primary/60 bg-primary/10 text-primary"
        : "border-border bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
    );

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-border bg-card/40 [contain:layout_paint]">
      {/* window bar */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-chart-4/70" />
        <span className="size-2.5 rounded-full bg-primary/70" />
        <span className="ml-1 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
          go-rbac-api · live model
        </span>
        <Counters store={store} />
      </div>

      {/* graph */}
      <div ref={stageRef} className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_45%,oklch(0.82_0.19_150/0.10),transparent_70%)]"
        />
        <canvas
          ref={canvasRef}
          data-cursor="hover"
          data-cursor-text="Drag"
          role="img"
          aria-label="Interactive graph of users, roles and permissions. Requests travel through it and are allowed, denied, or fail closed."
          className="absolute inset-0 h-full w-full touch-pan-y"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {graphItems.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) pillRefs.current.set(item.id, el);
                else pillRefs.current.delete(item.id);
              }}
              className="invisible absolute left-0 top-0 whitespace-nowrap rounded-full border bg-card font-mono font-medium will-change-transform [backface-visibility:hidden]"
              style={{ color: item.kind === "user" ? C.fg : kindColor[item.kind], borderColor: rgba(kindColor[item.kind], 0.45) }}
            >
              {item.label}
            </div>
          ))}
        </div>
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 size-4 border-l border-t border-primary/40" />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 size-4 border-b border-r border-primary/40"
        />
      </div>

      {/* controls */}
      <div className="space-y-3 border-t border-border px-4 py-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">who</span>
          {users.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                interact();
                setSelectedUser(u.id);
              }}
              className={chip(selectedUser === u.id)}
            >
              {u.id}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">can?</span>
          {permissions.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                interact();
                setSelectedPerm(p.id);
              }}
              className={chip(selectedPerm === p.id)}
            >
              {p.id}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            data-cursor="hover"
            onClick={() => {
              interact();
              fire(selectedUser, selectedPerm);
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-8px_var(--primary)]"
          >
            Authorize
            <Send className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={online}
            data-cursor="hover"
            onClick={() => {
              interact();
              setOnline((value) => !value);
            }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
              online
                ? "border-border text-muted-foreground hover:border-chart-4/50 hover:text-chart-4"
                : "border-chart-4/50 bg-chart-4/10 text-chart-4",
            )}
          >
            <Power className="size-3.5" />
            {online ? "Take RBAC offline" : "Bring RBAC back"}
          </button>
        </div>
      </div>

      {/* audit log */}
      <div className="border-t border-border bg-[#0a0e0f] px-4 py-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">audit_logs</p>
        <AuditLog store={store} />
      </div>
    </div>
  );
}
