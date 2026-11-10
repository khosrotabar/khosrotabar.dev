import type { CSSProperties } from "react";

const GUTTER = "max(1rem, calc((100% - 72rem) / 2 + 1rem))";

/**
 * Invisible-on-mobile dashed frame. On desktop the hero mark flies between these
 * markers as you scroll (see Hero).
 */
export function PortraitMarker({
  side = "right",
  top = "5rem",
  shift = "0px",
}: {
  side?: "left" | "right" | "center";
  top?: string;
  shift?: string;
}) {
  const style: CSSProperties =
    side === "center"
      ? { top, left: `calc(50% + ${shift})`, transform: "translateX(-50%)" }
      : side === "left"
        ? { top, left: `calc(${GUTTER} - ${shift})` }
        : { top, right: `calc(${GUTTER} - ${shift})` };

  return (
    <div
      aria-hidden
      data-portrait-marker
      className="pointer-events-none absolute z-0 hidden size-56 rounded-3xl border-2 border-dashed border-primary/50 lg:block"
      style={style}
    />
  );
}
