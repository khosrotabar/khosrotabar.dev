"use client";

import { Hand, ScrollText, ShieldCheck } from "lucide-react";
import { AuthGraph } from "../viz/auth-graph";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const notes = [
  {
    icon: ShieldCheck,
    title: "Fails closed",
    detail: "Take RBAC offline and nothing gets through — a 503, never a silent allow.",
  },
  {
    icon: ScrollText,
    title: "Every decision audited",
    detail: "Each allow and deny lands in the log with its reason, like the real audit table.",
  },
  {
    icon: Hand,
    title: "Elastic graph",
    detail: "Grab any node and fling it; tap a user or a permission to send a request.",
  },
];

/** A live, playable model of the go-rbac-api decision path. */
export function Interactive() {
  return (
    <section id="interactive" data-portrait-hide className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Live system"
              title="Watch a request get authorized"
              description="A working model of my Go RBAC service. Users inherit roles, roles grant permissions, and every request gets a decision and an audit line. Pick who is asking and for what — or take RBAC offline and watch it fail closed."
            />
            <Reveal y={14} delay={0.15}>
              <dl className="mt-8 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border font-mono text-[10px] uppercase tracking-widest">
                <div className="bg-card px-3 py-3">
                  <dt className="text-muted-foreground">Allowed</dt>
                  <dd className="mt-1 text-sm text-primary">200</dd>
                </div>
                <div className="bg-card px-3 py-3">
                  <dt className="text-muted-foreground">Denied</dt>
                  <dd className="mt-1 text-sm text-chart-5">403</dd>
                </div>
                <div className="bg-card px-3 py-3">
                  <dt className="text-muted-foreground">RBAC down</dt>
                  <dd className="mt-1 text-sm text-chart-4">503</dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <Reveal y={34} className="min-w-0">
            <AuthGraph />
          </Reveal>
        </div>
        <Reveal stagger={0.08} y={16} className="mt-8 grid gap-4 sm:grid-cols-3">
          {notes.map((note) => (
            <div key={note.title} data-reveal-item className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <note.icon className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">{note.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{note.detail}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
