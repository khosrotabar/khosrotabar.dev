import { navItems } from "../data/portfolio";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/85 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a href="#" className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-lg border border-cyan-300/35 bg-cyan-300/10 text-sm font-bold text-cyan-100 transition-colors group-hover:border-cyan-200"
          >
            MK
          </span>
          <span className="hidden text-sm font-semibold text-white sm:block">
            Mohammad Khosrotabar
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-lg border border-cyan-300/35 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-300/10"
        >
          Let&apos;s talk
        </a>
      </nav>
    </header>
  );
}
