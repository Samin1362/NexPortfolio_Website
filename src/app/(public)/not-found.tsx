import type { Metadata } from "next";
import {
  Container,
  Heading,
  Link,
  Section,
  Text,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
          <span className="font-[family-name:var(--font-display)] text-6xl font-semibold tracking-tight text-text-muted">
            404
          </span>
          <Heading level={1}>Page not found.</Heading>
          <Text tone="muted" size="lg">
            The page you were looking for may have been moved or no longer
            exists. Try one of the links below.
          </Text>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
            <li>
              <Link href="/" className="text-text hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-text hover:text-accent">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-text hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-text hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
