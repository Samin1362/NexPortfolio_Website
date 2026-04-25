import NextLink from "next/link";
import { Container, Heading, Section, Text } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export function ContactCTA() {
  return (
    <Section spacing="sm">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-border bg-bg-elevated p-8 md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-40"
            style={{
              background:
                "radial-gradient(40% 60% at 10% 10%, color-mix(in oklab, var(--accent) 25%, transparent) 0%, transparent 60%), radial-gradient(40% 60% at 90% 90%, color-mix(in oklab, var(--focus-ring) 20%, transparent) 0%, transparent 60%)",
            }}
          />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-2xl flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
                Let&apos;s talk
              </span>
              <Heading level={2}>Have a project in mind?</Heading>
              <Text tone="muted">
                I&apos;m currently open to freelance work and full-time roles.
                The fastest way to reach me is email.
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <NextLink
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
              >
                Start a conversation
              </NextLink>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-5 text-sm font-medium text-text transition-colors hover:bg-surface-muted"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
