import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionSpacing = "sm" | "md" | "lg";

const spacingMap: Record<SectionSpacing, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  as?: "section" | "div" | "article";
}

export function Section({
  className,
  spacing = "lg",
  as: Tag = "section",
  ...props
}: SectionProps) {
  return <Tag className={cn(spacingMap[spacing], className)} {...props} />;
}
