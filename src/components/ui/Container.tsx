import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

export function Container({
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizeMap[size], className)}
      {...props}
    />
  );
}
