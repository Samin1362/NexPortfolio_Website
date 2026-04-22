import type { Metadata } from "next";
import { Container, Heading, Section, Text } from "@/components/ui";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — freelance work, collaborations, and full-time opportunities.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description: `Get in touch with ${siteConfig.name}.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
              Contact
            </span>
            <Heading level={1}>Let&apos;s build something.</Heading>
            <Text tone="muted">
              Share a brief about your project, a role you&apos;re hiring for,
              or just say hi. I read every message and reply within a couple
              of days.
            </Text>
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-elevated p-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
                  Email
                </span>
                <p className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-text hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
                  Elsewhere
                </span>
                <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {siteConfig.socials
                    .filter((s) => !s.href.startsWith("mailto:"))
                    .map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-text"
                        >
                          {s.label} ↗
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
