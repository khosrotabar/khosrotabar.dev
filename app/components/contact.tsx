import { contactLinks } from "../data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-lg border border-cyan-300/25 bg-cyan-300/[0.08] p-8 text-center sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase text-cyan-200">
          Contact
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Available for remote freelance, contract, and project-based work.
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-200 hover:bg-white/10"
            >
              {link.text ?? link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
