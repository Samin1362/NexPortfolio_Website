import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant =
  | "default"
  | "outline"
  | "accent"
  | "success"
  | "warning"
  | "danger";

const variantMap: Record<BadgeVariant, string> = {
  default: "bg-surface text-text border-border",
  outline: "bg-transparent text-text border-border-strong",
  accent: "bg-accent text-accent-foreground border-transparent",
  success: "bg-transparent text-success border-success/40",
  warning: "bg-transparent text-warning border-warning/40",
  danger: "bg-transparent text-danger border-danger/40",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium leading-none",
        variantMap[variant],
        className,
      )}
      {...props}
    />
  );
}
