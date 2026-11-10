import { cn } from "../../lib/cn";

/* eslint-disable @next/next/no-img-element */
export function Logo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <img
      src="/logo.svg"
      alt="Mohammad Khosrotabar logo"
      width={size}
      height={size}
      className={cn("rounded-[10px]", className)}
    />
  );
}
