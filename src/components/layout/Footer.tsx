import NextLink from "next/link";
import { siteConfig } from "@/lib/site";
import { BackToTop } from "./BackToTop";

type SocialIconName = "github" | "linkedin" | "mail";

function SocialIcon({ name }: { name: SocialIconName }) {
  const common = {
    "aria-hidden": true as const,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
  };

  switch (name) {
    case "github":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.78-.25.78-.56v-2.17c-3.2.69-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.85 1.19 3.11 0 4.44-2.71 5.41-5.29 5.7.41.35.77 1.05.77 2.12v3.14c0 .31.2.67.79.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.73 18.27.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 8.98h3.96V21H3V8.98zM9.5 8.98h3.79v1.64h.05c.53-1 1.82-2.04 3.74-2.04 4 0 4.74 2.63 4.74 6.05V21h-3.96v-5.34c0-1.27-.02-2.91-1.78-2.91-1.78 0-2.05 1.39-2.05 2.82V21H9.5V8.98z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
  }
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-bg-elevated">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2">
            <NextLink
              href="/"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-text"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand text-brand-foreground text-sm font-bold"
              >
                S
              </span>
              {siteConfig.name}
            </NextLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
              {siteConfig.shortBio}
            </p>
            <ul className="mt-6 flex items-center gap-2">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      s.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:border-border-strong hover:text-text"
                  >
                    <SocialIcon name={s.icon as SocialIconName} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
              Explore
            </h2>
            <ul className="mt-4 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className="text-sm text-text-muted transition-colors hover:text-text"
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
              Connect
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <NextLink
                  href="/contact"
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  Start a conversation
                </NextLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-text-subtle">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
