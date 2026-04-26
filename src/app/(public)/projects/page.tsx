import type { Metadata } from "next";
import { Container, Heading, Section, Text } from "@/components/ui";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { listProjectsSafe } from "@/lib/api/projects";
import { deriveProjectTypes } from "@/content/projectsFallback";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected full-stack and frontend projects — case studies, tech stacks, and live demos.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description:
      "Selected full-stack and frontend projects — case studies, tech stacks, and live demos.",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const { projects, usedFallback } = await listProjectsSafe({
    revalidate: 3600,
  });
  const types = deriveProjectTypes(projects);

  return (
    <Section spacing="md">
      <Container>
        <div className="flex flex-col gap-8">
          <header className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
              Work
            </span>
            <Heading level={1}>Projects</Heading>
            <Text tone="muted">
              A collection of things I&apos;ve built — mostly full-stack apps
              with an emphasis on clean data models, performance, and
              shippable UI.
            </Text>
            {usedFallback ? (
              <Text size="sm" tone="muted">
                Showing a cached selection. Live data will be loaded once the
                backend is reachable.
              </Text>
            ) : null}
          </header>

          <ProjectFilter projects={projects} types={types} />
        </div>
      </Container>
    </Section>
  );
}
