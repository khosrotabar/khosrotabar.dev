import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import styles from "./article.module.css";

const canonical = "/articles/local-ai-coding-agent-qwen";

export const metadata: Metadata = {
  title: "A 50-Token/s AI Coding Agent for $0.08/Hour | Qwen3.8-27B",
  description:
    "My real-world experience running Qwen3.8-27B on a rented RTX 3090 for about $0.08/hour, achieving roughly 40–50 tok/s with ~96K context—plus RTX 5090 tests, Ollama, DeepSeek Harness, OpenCode, fine-tuning failures and deployment lessons.",
  keywords: [
    "Qwen3.8-27B",
    "local AI coding agent",
    "Ollama",
    "RTX 5090 LLM",
    "self-hosted LLM",
    "DeepSeek Harness",
    "OpenCode",
  ],
  alternates: { canonical },
  openGraph: {
    title: "A 50-Token/s AI Coding Agent for $0.08/Hour | Qwen3.8-27B",
    description:
      "I ran Qwen3.8-27B on a rented RTX 3090 for about $0.08/hour and observed roughly 40–50 tok/s with ~96K configured context.",
    url: canonical,
    type: "article",
    publishedTime: "2026-09-04T00:00:00.000Z",
    authors: ["Mohammad Khosrotabar"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A 50-Token/s AI Coding Agent for $0.08/Hour | Qwen3.8-27B",
    description:
      "A real-world field report on running Qwen3.8-27B Q4 on a rented RTX 3090 for eight cents per hour.",
  },
};

function Section({
  id,
  eyebrow,
  title,
  children,
  wide = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${wide ? styles.wideColumn : styles.readingColumn}`}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={eyebrow ? "mt-3" : undefined}>{title}</h2>
      {children}
    </section>
  );
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div>
      {label ? (
        <p className="mb-[-0.75rem] font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
      ) : null}
      <pre className={styles.code} tabIndex={0}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

const benchmarks = [
  ["Terminal Bench 2.1", "73.0", "78.2", "Agentic terminal coding"],
  ["SWE-bench Pro", "61.7", "53.4", "Agentic software engineering"],
  ["NL2Repo-Bench", "42.3", "47.6", "Repository-level generation"],
  ["QwenSWEBench", "79.0", "63.8", "Software engineering"],
  ["CoWorkBench", "70.7", "68.2", "Long-horizon work"],
  ["LiveCodeBench v6", "90.3", "88.8", "Competitive coding"],
];

const gpuRows = [
  ["1× RTX 3090", "24 GB", "Q4", "~96K (also tested 128K)", "~40–50 tok/s in favorable everyday workloads"],
  ["2× RTX 3090", "48 GB aggregate", "Q4", "Larger context headroom", "~80 tok/s in one favorable real-world configuration"],
  ["1× RTX 5090", "32 GB", "Q4", "128K", "Up to ~120 tok/s in favorable workloads"],
  ["2× RTX 5090", "64 GB aggregate", "Q4", "Large-context agent work", "Used for a substantial full-app first implementation"],
  ["RTX PRO / high VRAM", "Varies", "BF16", "Large model/context headroom", "Best fit for full precision; considerably pricier"],
];

export default function QwenCodingAgentArticle() {
  return (
    <div className={`${styles.article} min-h-screen text-slate-100`}>
      <Navbar />
      <main>
        <header className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
          <div className="relative mx-auto max-w-5xl">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-200"
            >
              <span aria-hidden="true">←</span> All articles
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-cyan-200">
                Real-world local AI experiment
              </span>
              <time dateTime="2026-09-04">September 4, 2026</time>
              <span aria-hidden="true">·</span>
              <span>18 min read</span>
            </div>
            <h1 className="mt-7 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              A 50-Token/s AI Coding Agent for $0.08/Hour
            </h1>
            <p className="mt-7 max-w-4xl text-lg font-medium leading-8 text-slate-200 sm:text-2xl sm:leading-10">
              Qwen3.8-27B · 1× RTX 3090 · ~96K context · no per-token billing
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              From failed fine-tuning experiments to Ollama, GPU rentals, DeepSeek Harness,
              OpenCode, and a one-command deployment setup.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-100">
                MK
              </div>
              <div>
                <p className="font-semibold text-white">Mohammad Khosrotabar</p>
                <p className="text-sm text-slate-400">Full-Stack Developer</p>
              </div>
            </div>
          </div>
        </header>

        <div className={`${styles.wideColumn} -mt-7 relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4`}>
          {[
            ["$0.08", "per GPU hour"],
            ["40–50", "generated tok/s"],
            ["~96K", "configured context"],
            ["24 GB", "RTX 3090 VRAM"],
          ].map(([value, label]) => (
            <div key={label} className="bg-[#091321] px-5 py-6 sm:px-6">
              <p className="text-2xl font-semibold text-white sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.readingColumn} mt-5 text-center`}>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
            At my observed rental rate: <span className="text-cyan-200">~$12.80 for 160 GPU hours</span>
          </p>
        </div>

        <Section id="introduction" eyebrow="The question" title="How far can an inexpensive self-hosted coding model actually go?">
          <p className={styles.lead}>
            A few years ago, running a local or open model usually meant accepting a large
            quality or speed compromise. That is changing.
          </p>
          <p>
            I rented a single RTX 3090 for approximately $0.08 per hour and ran Qwen3.8-27B Q4
            with roughly a 96K configured context window. In favorable coding and chat
            workloads, I observed around 40–50 generated tokens per second. This was not a
            theoretical benchmark—it was a genuinely useful coding-agent setup on a consumer GPU.
          </p>

          <div className="mt-7 rounded-xl border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(11,20,36,0.82))] p-6 sm:p-7">
            <div className="grid gap-4 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              <div>
                <p className="!mt-0 text-xl font-semibold !text-white">8 hours/day</p>
              </div>
              <span className="hidden font-mono text-cyan-300 sm:block">×</span>
              <div>
                <p className="!mt-0 text-xl font-semibold !text-white">20 working days</p>
                <p className="!mt-1 text-xs uppercase tracking-[0.12em] !text-slate-500">160 hours total</p>
              </div>
              <span className="hidden font-mono text-cyan-300 sm:block">×</span>
              <div>
                <p className="!mt-0 text-xl font-semibold !text-white">$0.08/hour</p>
                <p className="!mt-1 text-2xl font-semibold !text-cyan-200">$12.80</p>
              </div>
            </div>
          </div>

          <p>
            At that rate, 160 working hours of GPU access would cost approximately $12.80.
            That is GPU rental cost, not an unlimited AI subscription: marketplace prices vary,
            the server costs money while it runs, and context and model limits still exist. I
            stop or destroy the machine when I finish. While it is running, however, there is
            no additional per-token API bill.
          </p>

          <blockquote className={styles.quote}>
            I was surprised that an eight-cent-per-hour RTX 3090 was already this useful.
          </blockquote>

          <p>
            That result led to the more interesting experiment behind this article. I tested
            Java, Go, backend work, React, Next.js, frontend interfaces, existing repositories,
            greenfield applications, coding agents, and ordinary chat and reasoning. I tried
            fine-tuning, multiple GPU configurations, Ollama, DeepSeek Harness, OpenCode, and
            disposable rentals on Clore and Vast. I also used the model on work connected to a
            large Java banking project; my Java team lead was satisfied with the result.
          </p>

          <div className={styles.callout}>
            <p>
              <strong>My observed result, not a guaranteed RTX 3090 benchmark.</strong> Active
              context, prompt length, inference runtime, host quality and power limits, CPU and
              RAM, model version, caching, and the agent workload can all change performance.
            </p>
          </div>

          <p>
            The larger story became a progression: first, how cheap can a capable setup get?
            Then, what changes when I add another 3090, move to a 5090, or pay for enough VRAM
            to run BF16? The answer was more nuanced than “local wins” or “frontier wins,” and
            it showed me that inference software, context strategy, and the coding harness shape
            the experience almost as much as the model.
          </p>
        </Section>

        <hr className={styles.rule} />

        <Section id="why-qwen" eyebrow="Model choice" title="Why a 27B model is an interesting middle ground">
          <p>
            Very small models are cheap to run, but I often feel the loss in planning,
            multi-file coding, and recovery from tool errors. Huge models bring stronger
            capability, but their memory and rental requirements rise quickly. A dense model
            around 27 billion parameters sits in a useful middle: large enough for meaningful
            reasoning and coding, but small enough to fit on accessible consumer hardware once
            quantized.
          </p>
          <p>
            Qwen3.8-27B also targets the work I care about: coding, tool use, agent execution,
            long context, frontend generation, and backend implementation. Its official model
            card specifies a native 262,144-token context window. A specification is not the
            same as a recommendation, though; later I will explain why I usually configured
            less.
          </p>
        </Section>

        <Section id="benchmarks" eyebrow="Published evidence" title="The benchmarks are surprising—with an asterisk" wide>
          <p className={styles.readingColumn}>
            The table below reproduces selected figures published by Qwen for Qwen3.8-27B and
            the Opus 4.6 Max comparison column. These results put a compact model unexpectedly
            close to—or ahead of—a much larger commercial system on several coding and agent
            tasks.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Benchmark</th>
                  <th>Qwen3.8-27B</th>
                  <th>Opus 4.6 Max</th>
                  <th>Measures</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => <td key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${styles.readingColumn} text-sm`}>
            Source: the official Qwen3.8-27B model card, accessed September 2026. Qwen notes
            that evaluation harnesses and settings differ by benchmark; for example, its
            SWE-bench Pro comparison uses a Claude Code harness for most evaluated models.
          </p>
          <div className={`${styles.callout} ${styles.readingColumn}`}>
            <p>
              <strong>Read this as vendor-published evidence, not independent proof.</strong>{" "}
              Benchmarks are sensitive to prompts, harnesses, graders, and task corrections.
              They explain why I took the model seriously; they do not prove it replaces a
              frontier coding agent in a messy repository.
            </p>
          </div>
        </Section>

        <Section id="quantization" eyebrow="Precision" title="BF16 versus Q4: the hardware economics changed completely">
          <p>
            I tested both the full BF16 model, approximately 56 GB, and a Q4_K_M quantized
            build around 17–18 GB. BF16 keeps much more numerical precision. Q4 compresses the
            model’s weights into roughly four bits per value, with some values handled more
            carefully than others. Think of it as storing a high-resolution map with fewer
            shades: it is smaller and faster to move, but it is not mathematically identical.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0b1424]/80 p-6">
              <p className={styles.eyebrow}>Q4_K_M</p>
              <p className="mt-3 text-3xl font-semibold text-white">~17–18 GB</p>
              <p>Fits accessible consumer GPUs, offers much better price/performance, and became my daily default.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0b1424]/80 p-6">
              <p className={styles.eyebrow}>BF16</p>
              <p className="mt-3 text-3xl font-semibold text-white">~56 GB</p>
              <p>Preserves more precision, but requires high-VRAM or multi-GPU hardware and raises rental cost.</p>
            </div>
          </div>
          <p>
            Q4 inevitably discards information. Yet in my practical coding workload it
            remained surprisingly capable, and the lower hardware requirement changed the
            entire cost equation. Most of the everyday results in this article came from Q4.
          </p>
        </Section>

        <Section id="fine-tuning" eyebrow="The failed path" title="My fine-tune worked—and still was the wrong answer">
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h3 className="!mt-0">Customize first</h3>
              <p>I started with Unsloth, LoRA, a custom dataset, and multiple training epochs.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3 className="!mt-0">Compatibility work</h3>
              <p>I moved through inference settings, serving frameworks, quantization approaches, and CUDA, Triton, and runtime mismatches.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3 className="!mt-0">Technically successful</h3>
              <p>The adapter trained and ran, but the practical improvement did not justify the engineering complexity. At one point inference was only about 8 tokens per second.</p>
            </div>
          </div>
          <blockquote className={styles.quote}>
            Do not fine-tune until you have proved that the base model, prompting, context,
            runtime, agent harness, and tools are insufficient.
          </blockquote>
          <p>
            For my use case, inference and tooling optimization created far more value than
            fine-tuning. Fine-tuning is useful when you can name the behavior you need, measure
            it, and show that cheaper interventions fail. I had started with the most complex
            lever before validating the simpler ones.
          </p>
        </Section>

        <Section id="ollama" eyebrow="The turning point" title="Ollama made the system boring—in the best way">
          <p>
            Ollama is a local model runner and API server. It takes care of downloading a
            model, loading it onto the GPU, applying context configuration, running inference,
            and exposing an HTTP interface. That removed an entire layer of fragile setup.
          </p>
          <p>
            Its OpenAI-compatible API was especially useful. Coding tools already understand
            that common request shape, so the rest of the system could treat my rented GPU like
            another model provider.
          </p>
          <div className={styles.diagram} aria-label="Coding agent request architecture">
            <div className={styles.diagramNode}>OpenCode / DeepSeek Harness / Chat</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>OpenAI-compatible API</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Ollama</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Qwen3.8-27B</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>GPU</div>
          </div>
        </Section>

        <Section id="bootstrap" eyebrow="Automation" title="From a fresh server to a coding endpoint in one command">
          <p>
            I packaged the working setup into an open-source repository called{" "}
            <a href="https://github.com/khosrotabar/local-ai-coding-box" target="_blank" rel="noreferrer">
              local-ai-coding-box
            </a>. The goal is simple: rent a fresh Ubuntu GPU server, clone one repository, run
            one command, and get a working coding server.
          </p>
          <CodeBlock label="Recommended Q4 setup">./bootstrap.sh 128 quant</CodeBlock>
          <CodeBlock label="Full BF16 at 128K">./bootstrap.sh 128 full</CodeBlock>
          <CodeBlock label="256K examples">{`./bootstrap.sh 256 full
./bootstrap.sh 256 quant`}</CodeBlock>
          <p>
            The first argument selects the context target: <strong>64</strong>, <strong>128</strong>,
            <strong> 256</strong>, or <strong>auto</strong>. The second selects precision.
            <strong> quant</strong> maps to the roughly 17–18 GB <code>qwen3.8:27b</code> Q4_K_M
            model; <strong>full</strong> maps to the roughly 56 GB <code>qwen3.8:27b-bf16 </code>
            model. Quant is the default, so <code>./bootstrap.sh 128</code> is equivalent to
            <code> ./bootstrap.sh 128 quant</code>.
          </p>
          <p>
            The script detects Ubuntu and the NVIDIA GPU, installs required packages and
            Ollama when necessary, writes configuration, applies the context choice, selects
            the model variant, skips an already-downloaded model, starts Ollama persistently,
            and performs health checks.
          </p>

          <h3>The systemd assumption that broke on cheap containers</h3>
          <p>
            My first version assumed every server had systemd. On Clore container hosts it hit
            a blunt error: <code>systemctl: command not found</code>. Many inexpensive GPU rentals
            are containers, not full virtual machines, so they do not run the usual service
            manager.
          </p>
          <div className={styles.callout}>
            <p><strong>The fix:</strong> if systemd exists, use it. Otherwise, run Ollama inside a persistent tmux session.</p>
            <p>That persistence matters because an SSH disconnect should not terminate the inference server halfway through an agent task.</p>
          </div>
        </Section>

        <Section id="hardware" eyebrow="Observed workloads" title="What I saw across 3090, 5090, and RTX PRO hardware" wide>
          <p className={styles.readingColumn}>
            These are real observations from my workloads, not controlled laboratory
            benchmarks. Prompt length, occupied context, model variant, GPU topology, CPU,
            RAM, provider, caching, thermals, and software version all change the result.
          </p>

          <div className="mt-12">
            <div className={styles.readingColumn}>
              <p className={styles.eyebrow}>My observed results</p>
              <h3 className="!mt-3 !text-2xl sm:!text-3xl">
                RTX 3090: the surprisingly cheap sweet spot
              </h3>
              <p>
                At the rental prices I found, the older RTX 3090 delivered the strongest
                budget story in my tests. These prices are snapshots from a marketplace, not
                fixed rates, but they show how inexpensive sustained coding inference can become
                when the model fits comfortably in consumer VRAM.
              </p>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-xl border border-cyan-300/25 bg-[linear-gradient(145deg,rgba(34,211,238,0.12),rgba(11,20,36,0.9)_58%)] p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-cyan-300/10 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] !text-cyan-300">
                        Budget configuration
                      </p>
                      <h4 className="mt-2 text-2xl font-semibold text-white">1× RTX 3090</h4>
                      <p className="!mt-1 text-sm !text-slate-400">24 GB VRAM · Qwen3.8-27B Q4</p>
                    </div>
                    <p className="!mt-0 text-right">
                      <span className="block text-2xl font-semibold text-white">$0.08</span>
                      <span className="text-xs uppercase tracking-[0.12em] text-slate-500">per hour</span>
                    </p>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
                    <div className="bg-[#081321] p-4">
                      <p className="!mt-0 text-xl font-semibold !text-white">~96K</p>
                      <p className="!mt-1 text-xs uppercase tracking-[0.1em] !text-slate-500">Configured context</p>
                    </div>
                    <div className="bg-[#081321] p-4">
                      <p className="!mt-0 text-xl font-semibold !text-white">~40–50</p>
                      <p className="!mt-1 text-xs uppercase tracking-[0.1em] !text-slate-500">Generated tok/s</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="!mt-0 text-sm !text-slate-400">160 hours × $0.08</p>
                    <p className="!mt-1 text-3xl font-semibold !text-cyan-200">$12.80 / month</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-blue-300/25 bg-[linear-gradient(145deg,rgba(59,130,246,0.13),rgba(11,20,36,0.9)_58%)] p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-blue-300/10 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] !text-blue-300">
                        More headroom
                      </p>
                      <h4 className="mt-2 text-2xl font-semibold text-white">2× RTX 3090</h4>
                      <p className="!mt-1 text-sm !text-slate-400">48 GB aggregate VRAM · Qwen3.8-27B Q4</p>
                    </div>
                    <p className="!mt-0 text-right">
                      <span className="block text-2xl font-semibold text-white">$0.18</span>
                      <span className="text-xs uppercase tracking-[0.12em] text-slate-500">per hour</span>
                    </p>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
                    <div className="bg-[#081321] p-4">
                      <p className="!mt-0 text-xl font-semibold !text-white">Larger</p>
                      <p className="!mt-1 text-xs uppercase tracking-[0.1em] !text-slate-500">Context headroom</p>
                    </div>
                    <div className="bg-[#081321] p-4">
                      <p className="!mt-0 text-xl font-semibold !text-white">~80</p>
                      <p className="!mt-1 text-xs uppercase tracking-[0.1em] !text-slate-500">Generated tok/s</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="!mt-0 text-sm !text-slate-400">160 hours × $0.18</p>
                    <p className="!mt-1 text-3xl font-semibold !text-blue-200">$28.80 / month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.callout} ${styles.readingColumn}`}>
              <p>
                <strong>The practical takeaway:</strong> for roughly $12.80 in GPU rental cost
                over 160 working hours, my single-3090 setup produced around 40–50 tok/s with
                approximately 96K configured context. At roughly $28.80 for the same 160 hours,
                my dual-3090 setup reached around 80 tok/s in one favorable configuration and
                gave me more context headroom.
              </p>
              <p>
                This is not unlimited compute. I had to stop or destroy the machine when I was
                finished to avoid paying for idle time.
              </p>
            </div>

            <div className={styles.readingColumn}>
              <p>
                Two RTX 3090s do not universally mean twice the speed. Multi-GPU results depend
                on GPU communication, model distribution, inference runtime, context size,
                prompt processing, host CPU and RAM, PCIe or NVLink topology, and current context
                utilization. The approximately 80 tok/s figure is what I observed in my setup,
                not a guarantee for every dual-3090 host.
              </p>
              <p>
                Configured context is also different from occupied context. A model configured
                for 96K or 128K can remain fast while only a small part of that window is filled.
                As an agent session accumulates files, logs, and conversation history, throughput
                can fall significantly.
              </p>
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Hardware</th><th>VRAM</th><th>Model</th><th>Context work</th><th>What I observed</th></tr>
              </thead>
              <tbody>
                {gpuRows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
          <p className={styles.readingColumn}>
            On one RTX 3090, Q4 at around 96K configured context commonly produced roughly
            40–50 generated tokens per second in favorable normal coding and chat work. I also
            tried 128K. During a very long harness session, once the context was heavily filled,
            throughput eventually fell to around 8 tokens per second.
          </p>
          <h3 className={`${styles.readingColumn} !mt-10`}>What if I want more speed?</h3>
          <p className={styles.readingColumn}>
            A single RTX 5090 rental cost me about $0.26 per hour. With 128K configured context,
            I observed peaks around 120 tokens per second in favorable workloads. Two 3090s
            brought 48 GB of aggregate VRAM and useful 128K/256K headroom, but a second GPU does
            not automatically double decoding speed: data must cross devices and synchronization
            has a cost. Two 5090s gave me far more room for autonomous work. High-VRAM RTX PRO
            hardware was the practical path to BF16, at a much higher rental price.
          </p>
        </Section>

        <Section id="context" eyebrow="Memory pressure" title="Configured context is not occupied context">
          <p>
            A model supporting 256K does not mean 256K is always the best setting. Larger
            windows reserve or permit more KV cache—the working memory the model uses to track
            previous tokens. They can consume more VRAM, make long prompts more expensive to
            process, and reduce perceived responsiveness.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="border-l-2 border-cyan-300 pl-5">
              <h3 className="!mt-0">Configured context</h3>
              <p>The maximum window available to the session.</p>
            </div>
            <div className="border-l-2 border-blue-400 pl-5">
              <h3 className="!mt-0">Occupied context</h3>
              <p>The portion currently filled by prompts, files, tool results, and responses.</p>
            </div>
          </div>
          <p>
            A model configured for 128K but using only 8K can still feel fast. The same model
            near the top of that window has much more history to process and store. My practical
            sweet spot was usually 96K–128K: enough room for serious coding without paying the
            full memory and latency cost of 256K from the start.
          </p>
        </Section>

        <Section id="cost" eyebrow="The headline math" title="Where “about $42 per month” comes from">
          <div className="mt-7 rounded-xl border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(11,20,36,0.85))] p-6 sm:p-8">
            <div className={styles.costEquation}>
              <span className={styles.costNumber}>8 hours/day</span>
              <span className={styles.costOperator}>×</span>
              <span className={styles.costNumber}>20 days</span>
              <span className={styles.costOperator}>×</span>
              <span className={styles.costNumber}>$0.26/hour</span>
              <span className={styles.costOperator}>=</span>
              <span className="text-3xl font-bold text-cyan-200">$41.60</span>
            </div>
            <p className="text-center">160 rented GPU hours in a working month, at one price I personally found.</p>
          </div>
          <p>
            There is no per-token API charge while I rent that machine. This is not literally
            unlimited compute. GPU time is finite, context and output limits still exist, and I
            pay while the server sits idle. The useful distinction is billing: a cloud API
            generally charges by tokens or requests; a self-hosted rented GPU charges primarily
            by time.
          </p>
          <h3>Destroy, rent, repeat</h3>
          <p>
            When I finish work, I destroy the server so it stops costing money. The next day I
            may rent a completely different host. Reinstalling the stack manually each time is
            tedious—that disposable-server workflow is exactly why the bootstrap repository
            became valuable.
          </p>
        </Section>

        <Section id="providers" eyebrow="Rental notes" title="Clore and Vast: two practical connection patterns">
          <h3>Clore.ai: mapped public ports</h3>
          <p>
            When creating the container, expose container port <code>11434</code> over TCP.
            Ollama listens internally at <code>localhost:11434</code>, while Clore may publish it
            on a different host and port such as <code>PUBLIC_HOST:2787</code>. An external coding
            tool would then point to <code>http://PUBLIC_HOST:PUBLIC_PORT/v1</code>.
          </p>
          <CodeBlock label="Verify on the server">{`curl http://localhost:11434/v1/models
ollama ps`}</CodeBlock>
          <p>
            The first command checks the OpenAI-compatible models endpoint. The second shows
            which model Ollama currently has loaded. Clore can be attractive because consumer
            GPUs are often inexpensive, but do not casually expose an unauthenticated model
            server to the public internet. Native Ollama does not provide the same API-key
            security model as a commercial provider. Prefer an SSH tunnel, provider firewall,
            VPN, or authenticated reverse proxy.
          </p>

          <h3>Vast.ai: tunnel the remote port to localhost</h3>
          <CodeBlock label="Run from your computer">{`ssh -p SSH_PORT root@SERVER_HOST \\
  -L 11434:localhost:11434`}</CodeBlock>
          <CodeBlock label="Then test locally">curl http://localhost:11434/v1/models</CodeBlock>
          <p>
            OpenCode or DeepSeek Harness can now use <code>http://localhost:11434/v1</code>.
            Inference still happens on the remote GPU. “localhost” is simply your end of the
            encrypted SSH tunnel, which is both convenient and safer than a bare public port.
          </p>
        </Section>

        <Section id="project-tests" eyebrow="Real work" title="Two application tests mattered more than synthetic prompts">
          <h3>A portfolio design</h3>
          <p>
            I gave Qwen a portfolio website task and it produced the site quickly. For this
            particular design task, I personally preferred Qwen’s visual result over some
            versions I had generated with ChatGPT and Claude. That is subjective, not a model
            ranking, but it made UI generation one of the strongest use cases I found—especially
            React, Next.js, Tailwind-style interfaces, landing pages, and dashboards.
          </p>
          <h3>A personal accounting application with flutter</h3>
          <p>
            With Qwen3.8-27B and one RTX 5090s, I asked for a interface, local-first
            storage, backup architecture, onboarding, accounting features, and a real application
            structure. A substantial first implementation emerged in about 80 minutes. The GPU
            rental cost for that session was approximately $0.80.
          </p>
          <div className={styles.callout}>
            <p>
              <strong>That does not mean production-ready in 80 minutes.</strong> It means a major
              working first version existed. Security review, domain validation, testing,
              accessibility, and ordinary engineering judgment were still required.
            </p>
          </div>
        </Section>

        <Section id="strengths-limits" eyebrow="The honest split" title="Where Qwen impressed me—and where Codex is still better">
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-emerald-300">Strongest experiences</p>
              <ul>
                <li>Greenfield applications and prototypes</li>
                <li>Frontend UI, React, Next.js, landing pages, and dashboards</li>
                <li>Repetitive implementation and many backend tasks</li>
                <li>High-volume developer chat</li>
              </ul>
            </div>
            <div className="rounded-xl border border-blue-300/20 bg-blue-300/[0.06] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-blue-300">I still choose Codex for</p>
              <ul>
                <li>Deep architecture and complicated refactors</li>
                <li>Difficult debugging</li>
                <li>Large, established repositories</li>
                <li>Long-horizon software engineering</li>
              </ul>
            </div>
          </div>
          <p>
            Starting from an empty directory, Qwen can move extremely quickly. In a mature
            repository it may spend a long time reading files, reconstructing architecture,
            tracing dependencies, and learning why earlier decisions exist. Sometimes that
            discovery phase approaches the time required to generate a smaller greenfield app.
          </p>
          <p>
            Consider a Keycloak-style authorization system spread across Go services: resources,
            scopes, roles, policies, permissions, synchronization, and existing business rules
            all interact. I believe Qwen could work through it. Today I would still trust Codex
            more with that depth of architecture and refactoring.
          </p>
          <blockquote className={styles.quote}>
            My workflow is not Qwen instead of Codex. It is Qwen plus Codex: cheap volume for one,
            difficult high-leverage engineering for the other.
          </blockquote>
        </Section>

        <Section id="harnesses" eyebrow="Agent tooling" title="The harness matters almost as much as the model">
          <p>
            A coding harness is the working environment around the model. It gives the model
            repository access, file reading and editing, terminal commands, search, multi-step
            behavior, persistent sessions, and context management. A strong model without those
            capabilities is still mostly a chatbot.
          </p>
          <h3>DeepSeek Harness</h3>
          <p>
            I connected DeepSeek Harness to Ollama through an OpenAI-compatible endpoint. For
            the Q4 setup, the conceptual configuration is a base URL such as
            <code> http://SERVER:PORT/v1</code> and the exact model identifier
            <code> qwen3.8:27b</code>. Through an SSH tunnel, the base URL becomes
            <code> http://localhost:11434/v1</code>.
          </p>
          <p>
            The exact identifier matters: the provider and Ollama must agree on the model name.
            I liked Harness for autonomous workflows, particularly its persistent sessions and
            context handling. Because Harness ran on my computer, its session could outlive a
            disposable rental:
          </p>
          <div className={styles.diagram} aria-label="Persistent local session across disposable GPU servers">
            <div className={styles.diagramNode}>Day 1: Local Harness session</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>GPU Server A</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Destroy A</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Day 2: Same session + Server B</div>
          </div>
          <h3>Compaction: remembering the shape, not every token</h3>
          <p>
            Long agent sessions accumulate files, terminal output, tests, logs, and messages.
            Compaction replaces older raw history with a compressed summary or checkpoint while
            retaining recent detail. It is closer to keeping meeting notes than a full transcript.
            The tradeoff is important: old facts may survive only in summarized form; the model
            does not remember every original token verbatim.
          </p>
          <div className={styles.diagram} aria-label="Context compaction flow">
            <div className={styles.diagramNode}>Old raw history</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Summary / checkpoint</div>
            <span className={styles.diagramArrow} aria-hidden="true">+</span>
            <div className={styles.diagramNode}>Recent detailed context</div>
          </div>
          <h3>Context limits are not output limits</h3>
          <p>
            I also encountered output token limits. A context limit means the conversation,
            tools, and response no longer fit in the total window. An output limit means one
            generated response becomes too large. Asking the agent to continue sometimes worked;
            sometimes it repeated part of its earlier answer. Commercial frontier coding agents
            still felt more polished in some long-horizon situations.
          </p>
          <h3>OpenCode</h3>
          <p>
            OpenCode is another open-source coding-agent environment that can connect to an
            OpenAI-compatible provider. I tested its repository tools and context management and
            found it useful, though I personally preferred DeepSeek Harness for some autonomous
            workflows. That is a workflow preference, not objective superiority. OpenCode’s
            configuration changes across versions, so check the documentation installed for your
            version instead of copying old JSON from a tutorial.
          </p>
        </Section>

        <Section id="try-it" eyebrow="Reproduce the setup" title="A beginner-friendly path to trying it yourself">
          <div className={styles.diagram} aria-label="Local coding agent connected to a rented GPU">
            <div className={styles.diagramNode}>Your laptop / desktop</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Harness / OpenCode</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Ollama /v1</div>
            <span className={styles.diagramArrow} aria-hidden="true">→</span>
            <div className={styles.diagramNode}>Qwen on rented GPU</div>
          </div>
          <ol>
            <li>Rent an Ubuntu NVIDIA GPU server and connect over SSH.</li>
            <li>Clone the setup repository and enter its directory.</li>
            <li>Run the 128K Q4 bootstrap unless you have a specific reason to choose BF16.</li>
            <li>Verify the API and loaded model.</li>
            <li>Connect your harness through a protected endpoint or SSH tunnel.</li>
          </ol>
          <CodeBlock label="Clone">{`git clone https://github.com/khosrotabar/local-ai-coding-box.git
cd local-ai-coding-box`}</CodeBlock>
          <CodeBlock label="Recommended price/performance">./bootstrap.sh 128 quant</CodeBlock>
          <CodeBlock label="Other supported choices">{`./bootstrap.sh 128 full
./bootstrap.sh 256 full
./bootstrap.sh 256 quant
./bootstrap.sh auto quant`}</CodeBlock>
          <CodeBlock label="Check the endpoint and running model">{`curl http://localhost:11434/v1/models
ollama ps`}</CodeBlock>
          <p>
            Start with Q4. BF16 makes sense when you have sufficient VRAM, specifically value
            the extra precision, and accept the extra cost. Do not begin with fine-tuning. First
            evaluate the base model, prompting, context size, agent tooling, and your actual work.
          </p>
        </Section>

        <Section id="meaning-of-local" eyebrow="Terminology" title="“Local” here really means self-hosted inference">
          <p>
            I controlled the model and inference stack, but I did not always own the physical GPU.
            Clore and Vast supplied rented hardware. That is different from a workstation under my
            desk, yet also different from a managed token API.
          </p>
          <p>
            The fundamental billing unit moved from input tokens + cached tokens + output tokens
            to primarily GPU time. That shift is powerful for sustained, high-volume work, but it
            also makes utilization my responsibility. An idle rented GPU still costs money.
          </p>
        </Section>

        <Section id="conclusion" eyebrow="What I would do today" title="The setup I would recommend—and its limits">
          <p>
            For most self-hosted coding work, I would begin with Qwen3.8-27B Q4, Ollama, roughly
            96K–128K context, and a rented RTX 3090 or RTX 5090 depending on budget. I would attach
            DeepSeek Harness or OpenCode, test genuine work, and only then consider bigger context,
            BF16, or fine-tuning.
          </p>
          <div className="my-9 rounded-xl border border-cyan-300/25 bg-[#081421] p-7 text-center sm:p-10">
            <p className={styles.eyebrow}>My favorite setup</p>
            <p className="mt-5 font-mono text-lg leading-9 text-white sm:text-2xl">
              Qwen3.8-27B Q4<br />+ Ollama<br />+ 128K context<br />+ rented RTX 5090<br />+ DeepSeek Harness / OpenCode
            </p>
          </div>
          <p>
            In favorable workloads I observed about 120 generated tokens per second on one RTX
            5090 rented for roughly $0.26 per hour. At 160 hours, that rate becomes $41.60. The
            substantial first version of my accounting app cost about $0.80 in GPU rental time.
            Those are my observed speeds and prices—not guarantees or universal benchmarks.
          </p>
          <p>
            Open-weight models are now genuinely useful for professional development. Q4 changed
            the hardware economics, Ollama simplified deployment, and coding harnesses proved nearly
            as important as the model itself. Context, GPU choice, and automation all mattered.
            Codex remains in my workflow; Qwen complements it rather than replacing it. Given how
            quickly open models are improving, this balance may keep changing faster than our tooling
            habits do.
          </p>
        </Section>

        <Section id="references" eyebrow="Sources & tools" title="References">
          <ul>
            <li><a href="https://huggingface.co/Qwen/Qwen3.8-27B" target="_blank" rel="noreferrer">Official Qwen3.8-27B model card</a> — model architecture, context, serving notes, and published benchmarks.</li>
            <li><a href="https://ollama.com/library/qwen3.8:27b" target="_blank" rel="noreferrer">Qwen3.8-27B on Ollama</a> — model package and tags.</li>
            <li><a href="https://docs.ollama.com/api/openai-compatibility" target="_blank" rel="noreferrer">Ollama OpenAI compatibility</a> — compatible endpoints and request format.</li>
            <li><a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noreferrer">DeepSeek Harness</a> — open-source agent harness and developer-preview documentation.</li>
            <li><a href="https://opencode.ai/docs" target="_blank" rel="noreferrer">OpenCode documentation</a> — installation, providers, tools, and agents.</li>
            <li><a href="https://github.com/khosrotabar/local-ai-coding-box" target="_blank" rel="noreferrer">local-ai-coding-box</a> — my reproducible Ubuntu/Ollama bootstrap.</li>
            <li><a href="https://clore.ai" target="_blank" rel="noreferrer">Clore.ai</a> and <a href="https://vast.ai" target="_blank" rel="noreferrer">Vast.ai</a> — the GPU rental marketplaces I tested.</li>
          </ul>
          <p className="!mt-10 border-t border-white/10 pt-8 text-sm !text-slate-500">
            Hardware throughput, availability, and rental pricing change frequently. Measurements
            in this article describe my own sessions and should be treated as field observations.
          </p>
        </Section>

        <div className={`${styles.readingColumn} my-20 rounded-xl border border-white/10 bg-[#0b1424] p-7 sm:p-9`}>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">Continue exploring</p>
          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold text-white">More engineering field notes are coming.</h2>
              <p className="mt-2 leading-7 text-slate-400">Frontend security, authorization systems, and practical AI experiments.</p>
            </div>
            <Link href="/articles" className="shrink-0 font-semibold text-cyan-200 hover:text-cyan-100">All articles →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
