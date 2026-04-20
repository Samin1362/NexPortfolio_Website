import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextTone = "default" | "muted" | "subtle";

const sizeMap: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const toneMap: Record<TextTone, string> = {
  default: "text-text",
  muted: "text-text-muted",
  subtle: "text-text-subtle",
};

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  tone?: TextTone;
  as?: "p" | "span" | "div";
}

export function Text({
  size = "base",
  tone = "default",
  as: Tag = "p",
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        "leading-relaxed",
        sizeMap[size],
        toneMap[tone],
        className,
      )}
      {...props}
    />
  );
}
