import type { Metadata } from "next";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Link,
  Section,
  Text,
} from "@/components/ui";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const surfaceTokens = [
  "bg",
  "bg-elevated",
  "surface",
  "surface-muted",
] as const;

const textTokens = ["text", "text-muted", "text-subtle"] as const;

const statusTokens = [
  { name: "brand", bg: "bg-brand", fg: "text-brand-foreground" },
  { name: "accent", bg: "bg-accent", fg: "text-accent-foreground" },
  { name: "success", bg: "bg-success", fg: "text-white" },
  { name: "warning", bg: "bg-warning", fg: "text-black" },
  { name: "danger", bg: "bg-danger", fg: "text-white" },
];

export default function DesignPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Container size="xl">
        <Section spacing="md">
          <div className="mb-12 flex items-start justify-between gap-6">
            <div className="space-y-2">
              <Text tone="muted" size="sm">
                Phase 1 · Review
              </Text>
              <Heading level={1}>Design System</Heading>
              <Text tone="muted" size="lg" className="max-w-2xl">
                Tokens, typography, and primitive components. Use this page to
                verify both themes look balanced before building public pages.
              </Text>
            </div>
            <ThemeToggle />
          </div>

          {/* --- Colors -------------------------------------------------- */}
          <div className="space-y-4">
            <Heading level={3}>Surfaces &amp; Borders</Heading>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {surfaceTokens.map((t) => (
                <div
                  key={t}
                  className={`rounded-md border border-border p-4 bg-${t}`}
                >
                  <Text size="sm" tone="muted">
                    bg-{t}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <Heading level={3}>Text tones</Heading>
            <div className="space-y-2 rounded-md border border-border bg-bg-elevated p-6">
              {textTokens.map((t) => (
                <Text key={t} className={`text-${t}`}>
                  The quick brown fox jumps over the lazy dog. ({t})
                </Text>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <Heading level={3}>Status colors</Heading>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {statusTokens.map((s) => (
                <div
                  key={s.name}
                  className={`rounded-md px-4 py-6 ${s.bg} ${s.fg}`}
                >
                  <Text size="sm" className="font-medium">
                    {s.name}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* --- Typography ---------------------------------------------- */}
        <Section spacing="md">
          <Heading level={3} className="mb-8">
            Typography
          </Heading>
          <div className="space-y-6 rounded-md border border-border bg-bg-elevated p-8">
            <Heading level={1}>Display heading, level 1</Heading>
            <Heading level={2}>Section heading, level 2</Heading>
            <Heading level={3}>Sub-section, level 3</Heading>
            <Heading level={4} serif={false}>
              Sans heading, level 4
            </Heading>
            <Text size="lg">
              Large body text for leads and introductions. Generous line-height
              for comfortable reading on any device.
            </Text>
            <Text>
              Default body text for paragraphs. The quick brown fox jumps over
              the lazy dog. Uses the Inter variable font with a fluid clamp
              size.
            </Text>
            <Text tone="muted" size="sm">
              Muted caption text — for metadata, timestamps, and secondary
              information.
            </Text>
            <code className="inline-block rounded-sm bg-surface px-2 py-1 font-[family-name:var(--font-mono)] text-sm text-text">
              const mono = &quot;Geist Mono&quot;;
            </code>
          </div>
        </Section>

        {/* --- Buttons ------------------------------------------------- */}
        <Section spacing="md">
          <Heading level={3} className="mb-8">
            Buttons
          </Heading>
          <div className="space-y-6 rounded-md border border-border bg-bg-elevated p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link style</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Section>

        {/* --- Badges -------------------------------------------------- */}
        <Section spacing="md">
          <Heading level={3} className="mb-8">
            Badges
          </Heading>
          <div className="flex flex-wrap gap-2 rounded-md border border-border bg-bg-elevated p-8">
            <Badge>default</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="accent">accent</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="danger">danger</Badge>
          </div>
        </Section>

        {/* --- Cards --------------------------------------------------- */}
        <Section spacing="md">
          <Heading level={3} className="mb-8">
            Cards
          </Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Heading level={4} serif={false}>
                  Standard card
                </Heading>
                <Text tone="muted" size="sm">
                  Default padding, no hover state.
                </Text>
              </CardHeader>
              <CardBody>
                <Text size="sm">
                  Compose card content with any combination of heading, body,
                  and footer.
                </Text>
              </CardBody>
            </Card>

            <Card interactive>
              <CardHeader>
                <Heading level={4} serif={false}>
                  Interactive
                </Heading>
                <Text tone="muted" size="sm">
                  Hovers to the surface color.
                </Text>
              </CardHeader>
              <CardBody>
                <Text size="sm">
                  Use for clickable previews like project cards and list rows.
                </Text>
              </CardBody>
              <CardFooter>
                <Button variant="link">Read more →</Button>
              </CardFooter>
            </Card>

            <Card padding="lg" className="bg-surface">
              <CardHeader>
                <Badge variant="accent">New</Badge>
                <Heading level={4} serif={false}>
                  Emphasis
                </Heading>
              </CardHeader>
              <CardBody>
                <Text size="sm">
                  Cards can layer on surface tints for a subtle hierarchy.
                </Text>
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* --- Links & focus ------------------------------------------- */}
        <Section spacing="md">
          <Heading level={3} className="mb-8">
            Links &amp; focus
          </Heading>
          <div className="space-y-4 rounded-md border border-border bg-bg-elevated p-8">
            <Text>
              Internal:{" "}
              <Link href="/design">back to design review</Link>
            </Text>
            <Text>
              Muted:{" "}
              <Link href="/design" variant="muted">
                muted variant
              </Link>
            </Text>
            <Text>
              Underline:{" "}
              <Link href="/design" variant="underline">
                underline variant
              </Link>
            </Text>
            <Text>
              External:{" "}
              <Link href="https://nextjs.org">nextjs.org</Link>
            </Text>
            <Text tone="muted" size="sm">
              Tab through these to verify the focus ring is visible in both
              themes.
            </Text>
          </div>
        </Section>

        {/* --- Radii / shadow ------------------------------------------ */}
        <Section spacing="md">
          <Heading level={3} className="mb-8">
            Radius &amp; shadow
          </Heading>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((r) => (
              <div
                key={r}
                className={`border border-border bg-surface p-4 text-center rounded-${r}`}
              >
                <Text size="xs" tone="muted">
                  radius-{r}
                </Text>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md border border-border bg-bg-elevated p-6 shadow-sm">
              <Text size="sm">shadow-sm</Text>
            </div>
            <div className="rounded-md border border-border bg-bg-elevated p-6 shadow-md">
              <Text size="sm">shadow-md</Text>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
