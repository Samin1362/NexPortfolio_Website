import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type LinkVariant = "default" | "muted" | "underline";

const variantMap: Record<LinkVariant, string> = {
  default: "text-text hover:text-accent transition-colors",
  muted: "text-text-muted hover:text-text transition-colors",
  underline:
    "text-text underline underline-offset-4 decoration-border-strong hover:decoration-accent transition-colors",
};

type NextLinkProps = ComponentProps<typeof NextLink>;

export interface LinkProps extends Omit<NextLinkProps, "href"> {
  href: string;
  variant?: LinkVariant;
  external?: boolean;
}

export function Link({
  href,
  variant = "default",
  external,
  className,
  ...props
}: LinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(variantMap[variant], className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <NextLink
      href={href}
      className={cn(variantMap[variant], className)}
      {...props}
    />
  );
}
