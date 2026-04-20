import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  label?: string;
}

export function Icon({
  size = 16,
  label,
  className,
  children,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn("shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  );
}
