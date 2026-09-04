export type Article = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  publishedAt: string;
  publishedLabel: string;
  readingTime: string;
  tags: string[];
  featured: boolean;
};

export const articles: Article[] = [
  {
    id: "local-ai-coding-agent-qwen",
    title: "A 50-Token/s AI Coding Agent for $0.08/Hour",
    excerpt:
      "I ran Qwen3.8-27B on a rented RTX 3090 for about eight cents an hour and got roughly 40–50 tok/s. Here is what I learned about GPUs, context, Ollama, coding agents, fine-tuning, and cost.",
    href: "/articles/local-ai-coding-agent-qwen",
    publishedAt: "2026-09-04",
    publishedLabel: "September 4, 2026",
    readingTime: "18 min read",
    tags: ["Local AI", "Qwen", "Ollama", "Coding Agents"],
    featured: true,
  },
];
