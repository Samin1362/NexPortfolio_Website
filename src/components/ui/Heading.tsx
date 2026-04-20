import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const sizeByLevel: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-5xl lg:text-6xl",
  2: "text-3xl md:text-4xl",
  3: "text-2xl md:text-3xl",
  4: "text-xl md:text-2xl",
  5: "text-lg md:text-xl",
  6: "text-base md:text-lg",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  serif?: boolean;
  balance?: boolean;
}

export function Heading({
  level = 2,
  as,
  serif = true,
  balance = true,
  className,
  ...props
}: HeadingProps) {
  const Tag = (as ?? (`h${level}` as const)) as "h1";
  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-text",
        serif ? "font-[family-name:var(--font-display)]" : "font-sans",
        sizeByLevel[level],
        balance && "text-balance",
        className,
      )}
      style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}
      {...props}
    />
  );
}
