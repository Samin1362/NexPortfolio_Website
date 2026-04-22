import type { Metadata } from "next";
import NextLink from "next/link";
import { Container, Heading, Section, Text } from "@/components/ui";
import { bioContent } from "@/content/bio";
import { educationData } from "@/content/education";
import { skillsData } from "@/content/skills";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, experience, education, and the stack I work with day-to-day.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "Background, experience, education, and the stack I work with day-to-day.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="flex max-w-3xl flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
              About
            </span>
            <Heading level={1}>
              A short story of how I got here — and where I&apos;m going.
            </Heading>
            <div className="flex flex-col gap-4">
              {bioContent.intro.map((paragraph) => (
                <Text key={paragraph} size="lg" tone="muted">
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="flex flex-col gap-6">
            <Heading level={2} className="text-xl">
              Experience
            </Heading>
            <ol className="flex flex-col gap-4">
              {bioContent.experience.map((exp) => (
                <li
                  key={`${exp.org}-${exp.start}`}
                  className="grid gap-3 rounded-lg border border-border bg-bg-elevated p-6 md:grid-cols-[180px_1fr] md:gap-8"
                >
                  <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-text-subtle">
                    {exp.start} — {exp.end}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-text">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-text-muted">{exp.org}</p>
                    <p className="mt-1 text-sm text-text-muted">
                      {exp.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="flex flex-col gap-6">
            <Heading level={2} className="text-xl">
              Education
            </Heading>
            <ol className="flex flex-col gap-4">
              {educationData.map((item) => (
                <li
                  key={`${item.school}-${item.start}`}
                  className="grid gap-3 rounded-lg border border-border bg-bg-elevated p-6 md:grid-cols-[180px_1fr] md:gap-8"
                >
                  <div className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-text-subtle">
                    {item.start} — {item.end}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-text">
                      {item.degree} in {item.field}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {item.schoolUrl ? (
                        <a
                          href={item.schoolUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-text"
                        >
                          {item.school}
                        </a>
                      ) : (
                        item.school
                      )}
                      {" · "}
                      {item.location}
                      {item.gpa ? ` · GPA ${item.gpa}` : ""}
                    </p>
                    {item.focus ? (
                      <p className="text-sm text-text-muted">{item.focus}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="flex flex-col gap-6">
            <Heading level={2} className="text-xl">
              Skills
            </Heading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {skillsData.map((group) => (
                <article
                  key={group.category}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-bg-elevated p-5"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-text">
                      {group.category}
                    </h3>
                    <p className="mt-0.5 text-sm text-text-muted">
                      {group.description}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <li
                        key={s.name}
                        className="rounded-sm border border-border bg-surface px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-text-muted"
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {bioContent.certifications.length > 0 ? (
        <Section spacing="md">
          <Container>
            <div className="flex flex-col gap-4">
              <Heading level={2} className="text-xl">
                Certifications
              </Heading>
              <ul className="flex flex-col gap-2">
                {bioContent.certifications.map((c) => (
                  <li
                    key={c}
                    className="rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-text-muted"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="lg">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-bg-elevated p-6">
            <Text tone="muted">
              Want the short version? Grab my CV or reach out directly.
            </Text>
            <div className="flex flex-wrap gap-3">
              <a
                href={bioContent.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-text hover:bg-surface-muted"
              >
                Download CV
              </a>
              <NextLink
                href="/contact"
                className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90"
              >
                Contact {siteConfig.name.split(" ")[0]}
              </NextLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
