"use client";

import { useRef } from "react";
import { site, terminalLines } from "../../data/site";
import { gsap, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

/** Commands type themselves out when the window scrolls into view. */
export function Terminal() {
  const windowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = windowRef.current;
      if (!root || prefersReducedMotion()) return;
      const prompts = gsap.utils.toArray<HTMLElement>("[data-term-prompt]", root);
      const outputs = gsap.utils.toArray<HTMLElement>("[data-term-output]", root);
      const carets = gsap.utils.toArray<HTMLElement>("[data-term-caret]", root);
      if (!prompts.length) return;
      const texts = prompts.map((prompt) => prompt.dataset.termPrompt ?? prompt.textContent ?? "");
      prompts.forEach((prompt) => {
        prompt.textContent = "";
      });
      gsap.set(outputs, { opacity: 0, y: -6 });
      gsap.set(carets, { opacity: 0 });

      const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 72%", once: true } });
      texts.forEach((text, i) => {
        timeline.to(prompts[i], { text, duration: Math.max(0.45, 0.017 * text.length), ease: "none" }, i === 0 ? 0 : ">+0.15");
        timeline.to(carets[i], { opacity: 1, duration: 0.12 }, "<");
        if (i > 0) timeline.to(carets[i - 1], { opacity: 0, duration: 0.12 }, "<");
        timeline.to(outputs[i], { opacity: 1, y: 0, duration: 0.32 }, ">+0.08");
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        prompts.forEach((prompt, i) => {
          prompt.textContent = texts[i] ?? "";
        });
        gsap.set([...outputs, ...carets], { clearProps: "all" });
      };
    },
    { scope: windowRef },
  );

  return (
    <section id="terminal" data-portrait-hide className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Under the hood"
            title="What shipping actually looks like"
            description="No hand-waving: tests, smoke checks, a real authorization call and a measured local model — the kind of work behind every project."
          />
          <Reveal y={30}>
            <div
              ref={windowRef}
              className="overflow-hidden rounded-2xl border border-border bg-[#0a0e0f] shadow-[0_40px_120px_-60px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="size-2.5 rounded-full bg-destructive/70" />
                <span className="size-2.5 rounded-full bg-chart-4/70" />
                <span className="size-2.5 rounded-full bg-primary/70" />
                <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {site.handle} — zsh
                </span>
              </div>
              <div className="space-y-4 p-5 font-mono text-[11.5px] leading-relaxed md:p-6 md:text-[13px]">
                {terminalLines.map((line) => (
                  <div key={line.prompt}>
                    <div className="flex items-start gap-2">
                      <span aria-hidden className="shrink-0 text-primary">
                        $
                      </span>
                      <span data-term-prompt={line.prompt} className="whitespace-pre-wrap break-words text-foreground/95">
                        {line.prompt}
                      </span>
                      <span
                        aria-hidden
                        data-term-caret
                        className="mt-1.5 inline-block h-3 w-1.5 shrink-0 animate-[caret_1.05s_steps(1)_infinite] bg-primary/80"
                      />
                    </div>
                    <p data-term-output className="mt-1.5 whitespace-pre-wrap break-words pl-4 text-muted-foreground">
                      {line.output}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
