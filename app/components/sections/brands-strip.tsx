import { brandStrip } from "../../data/site";
import { Marquee } from "../ui/marquee";

export function BrandsStrip() {
  return (
    <section aria-label="Teams and products" className="relative border-y border-border bg-card/30 py-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {brandStrip.label}
        </p>
      </div>
      <Marquee className="mask-fade-x mt-8">
        {brandStrip.items.map((item) => (
          <span
            key={item}
            className="mx-6 whitespace-nowrap font-display text-lg font-semibold text-muted-foreground/70 transition-colors duration-300 hover:text-primary"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
