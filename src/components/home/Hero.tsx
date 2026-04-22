import NextLink from "next/link";
import { Badge, Container, Heading, Section, Text } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import { bioContent } from "@/content/bio";

export function Hero() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <div
          className="hero-gradient absolute inset-[-20%] blur-3xl"
          style={{
            background:
              "radial-gradient(40% 40% at 20% 30%, color-mix(in oklab, var(--accent) 40%, transparent) 0%, transparent 60%), radial-gradient(40% 40% at 80% 70%, color-mix(in oklab, var(--focus-ring) 35%, transparent) 0%, transparent 60%)",
          }}
        />
      </div>

      <Container>
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <Badge variant="outline" className="uppercase tracking-[0.12em]">
            <span
              aria-hidden="true"
              className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-success"
            />
            Open to new work
          </Badge>

          <Heading level={1} className="leading-[1.05]">
            Hi, I&apos;m {siteConfig.name}.
            <span className="mt-2 block text-text-muted">
              I build {siteConfig.role.toLowerCase()} applications people
              actually enjoy using.
            </span>
          </Heading>

          <Text size="lg" tone="muted" className="max-w-2xl">
            {siteConfig.shortBio}
          </Text>

          <div className="mt-2 flex flex-wrap gap-3">
            <NextLink
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              View projects →
            </NextLink>
            <a
              href={bioContent.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 text-sm font-medium text-text transition-colors hover:bg-surface-muted"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Download CV
            </a>
            <NextLink
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-transparent px-5 text-sm font-medium text-text-muted underline underline-offset-4 transition-colors hover:text-text"
            >
              Get in touch
            </NextLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
