import NextLink from "next/link";
import { Container, Heading, Section, Text } from "@/components/ui";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import type { Project } from "@/types/project";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <Section spacing="md">
      <Container>
        <div className="flex flex-col gap-10">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex max-w-2xl flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
                Selected work
              </span>
              <Heading level={2}>Featured projects</Heading>
              <Text tone="muted">
                A slice of recent work. Case studies live on individual project
                pages.
              </Text>
            </div>
            <NextLink
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-accent"
            >
              See all projects
              <span aria-hidden="true">→</span>
            </NextLink>
          </header>

          <ProjectGrid projects={featured} />
        </div>
      </Container>
    </Section>
  );
}
