import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-brand-foreground border-transparent hover:opacity-90",
  secondary:
    "bg-surface text-text border-border hover:bg-surface-muted",
  ghost:
    "bg-transparent text-text border-transparent hover:bg-surface",
  link:
    "bg-transparent text-text border-transparent underline underline-offset-4 hover:text-accent px-0 h-auto",
  danger:
    "bg-danger text-white border-transparent hover:opacity-90",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-sm",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-12 px-6 text-base rounded-md",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 border font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variantMap[variant],
        variant !== "link" && sizeMap[size],
        className,
      )}
      {...props}
    />
  );
}
