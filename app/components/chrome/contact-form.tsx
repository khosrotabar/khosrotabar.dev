"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "../../data/site";

/**
 * No backend required: composes an email in the visitor's mail app.
 * Swap the submit handler for an API route / form service later if you like.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const budget = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Project inquiry${name ? ` from ${name}` : ""}`;
    const body = [message, "", budget ? `Project type: ${budget}` : "", email ? `Reply to: ${email}` : ""]
      .filter((line, index, all) => line || index < all.length - 1)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        <label className="block">
          <span className="sr-only">Your name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Your email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Project type</span>
        <select name="type" defaultValue="" className={field}>
          <option value="" disabled>
            What are you building?
          </option>
          <option>Web application</option>
          <option>Go backend / API</option>
          <option>Auth & RBAC</option>
          <option>Dashboard / admin panel</option>
          <option>SaaS MVP</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={compact ? 4 : 5}
          placeholder="A few lines about the product, the timeline and where you’re stuck…"
          className={`${field} resize-none`}
        />
      </label>
      <button
        type="submit"
        data-cursor="hover"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_38px_-8px_var(--primary)]"
      >
        {sent ? "Opening your mail app…" : "Send message"}
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
