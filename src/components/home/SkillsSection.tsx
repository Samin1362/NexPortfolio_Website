import { Container, Heading, Section, Text } from "@/components/ui";
import { skillsData } from "@/content/skills";

export function SkillsSection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-10">
          <header className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
              Skills
            </span>
            <Heading level={2}>What I bring to the table</Heading>
            <Text tone="muted">
              A focused stack, kept deliberately small so I can go deep and
              ship quickly.
            </Text>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skillsData.map((group) => (
              <article
                key={group.category}
                className="flex flex-col gap-4 rounded-lg border border-border bg-bg-elevated p-6"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-text">
                    {group.category}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {group.description}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <li
                      key={s.name}
                      className="rounded-sm border border-border bg-surface px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-text-muted"
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
  );
}
