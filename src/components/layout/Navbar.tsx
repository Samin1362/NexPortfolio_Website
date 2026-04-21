"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
          : "border-transparent bg-bg",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <NextLink
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-text"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand text-brand-foreground text-sm font-bold"
          >
            S
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </NextLink>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <NextLink
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-text"
                      : "text-text-muted hover:text-text",
                  )}
                >
                  {item.label}
                </NextLink>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NextLink
            href="/contact"
            className="hidden h-9 items-center justify-center gap-2 rounded-md border border-transparent bg-brand px-4 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 md:inline-flex"
          >
            Hire me
          </NextLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:bg-surface-muted md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        hidden={!open}
        className="md:hidden"
      >
        <div className="border-t border-border bg-bg-elevated px-5 py-4 sm:px-6">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-sm px-3 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-surface text-text"
                        : "text-text-muted hover:bg-surface hover:text-text",
                    )}
                  >
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
          <NextLink
            href="/contact"
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground"
          >
            Hire me
          </NextLink>
        </div>
      </div>
    </header>
  );
}
