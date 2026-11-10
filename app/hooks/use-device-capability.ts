"use client";

import { useEffect, useState } from "react";

/** True on desktop-class devices (fine pointer, ≥1024px, motion allowed) that get the WebGL scenes. */
export function useDeviceCapability() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const evaluate = () =>
      setCapable(!reduced.matches && !coarse.matches && window.innerWidth >= 1024);

    evaluate();
    reduced.addEventListener("change", evaluate);
    coarse.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);
    return () => {
      reduced.removeEventListener("change", evaluate);
      coarse.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return capable;
}
