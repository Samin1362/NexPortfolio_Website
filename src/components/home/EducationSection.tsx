import { Container, Heading, Section, Text } from "@/components/ui";
import { educationData } from "@/content/education";

export function EducationSection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-10">
          <header className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
              Education
            </span>
            <Heading level={2}>Where I studied</Heading>
            <Text tone="muted">
              Formal training that shaped how I think about systems, data, and
              software design.
            </Text>
          </header>

          <ol className="flex flex-col gap-6">
            {educationData.map((item) => (
              <li
                key={`${item.school}-${item.start}`}
                className="grid gap-4 rounded-lg border border-border bg-bg-elevated p-6 md:grid-cols-[180px_1fr] md:gap-8"
              >
                <div className="flex flex-col gap-1 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-text-subtle">
                  <span>
                    {item.start} — {item.end}
                  </span>
                  <span>{item.location}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-text">
                    {item.degree} in {item.field}
                  </h3>
                  {item.focus ? (
                    <p className="text-sm text-text-muted">{item.focus}</p>
                  ) : null}
                  <p className="text-sm text-text">
                    {item.schoolUrl ? (
                      <a
                        href={item.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text hover:text-accent"
                      >
                        {item.school}
                      </a>
                    ) : (
                      item.school
                    )}
                    {item.gpa ? (
                      <span className="ml-3 text-text-muted">
                        GPA {item.gpa}
                      </span>
                    ) : null}
                  </p>
                  {item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-2 flex flex-col gap-1.5 text-sm text-text-muted">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-text-subtle"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
