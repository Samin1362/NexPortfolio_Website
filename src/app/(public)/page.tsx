import {
  Badge,
  Button,
  Container,
  Heading,
  Link,
  Section,
  Text,
} from "@/components/ui";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="flex flex-col items-start gap-6">
            <Badge variant="outline">Portfolio scaffold · Phase 2</Badge>
            <Heading level={1} className="max-w-3xl">
              {siteConfig.name}
              <span className="block text-text-muted">{siteConfig.role}</span>
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              {siteConfig.shortBio}
            </Text>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
              >
                View projects →
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-5 text-sm font-medium text-text transition-colors hover:bg-surface-muted"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="rounded-lg border border-border bg-bg-elevated p-8">
            <Heading level={3} serif={false} className="mb-3">
              Under construction
            </Heading>
            <Text tone="muted">
              Real content — featured projects, skills, education, and contact —
              lands in Phase 4. This scaffold exists so the navigation, footer,
              and SEO foundation can be reviewed in both themes.
            </Text>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="secondary">Primary CTA</Button>
              <Button variant="ghost">Secondary CTA</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
