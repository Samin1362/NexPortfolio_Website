import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Badge, Container, Heading, Section, Text } from "@/components/ui";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CopyField } from "@/components/projects/CopyField";
import { getProjectSafe, listProjectsSafe } from "@/lib/api/projects";
import { buildProjectSlug, extractIdFromSlug } from "@/lib/slug";
import { siteConfig } from "@/lib/site";
import { jsonLdScriptProps, projectSchema } from "@/lib/seo/jsonLd";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { projects } = await listProjectsSafe({ revalidate: 3600 });
  return projects.map((p) => ({ slug: buildProjectSlug(p.title, p.id) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  if (id == null) return { title: "Project not found" };
  const project = await getProjectSafe(id, { revalidate: 3600 });
  if (!project) return { title: "Project not found" };

  const canonical = `/projects/${buildProjectSlug(project.title, project.id)}`;
  const title = `${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""}`;
  const description =
    project.description ?? `${project.title} · ${project.type}`;
  const ogImage = project.images[0];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  if (id == null) notFound();

  const [project, list] = await Promise.all([
    getProjectSafe(id, { revalidate: 3600 }),
    listProjectsSafe({ revalidate: 3600 }),
  ]);

  if (!project) notFound();

  const related = list.projects
    .filter((p) => p.id !== project.id && p.type === project.type)
    .slice(0, 3);

  const canonicalUrl = `${siteConfig.url}/projects/${buildProjectSlug(project.title, project.id)}`;
  const schema = projectSchema({
    title: project.title,
    description: project.description,
    url: canonicalUrl,
    image: project.images[0] ?? null,
    techStack: project.techStack,
    datePublished: project.createdAt,
  });

  return (
    <>
      <script {...jsonLdScriptProps(schema)} />

      <Section spacing="lg">
        <Container>
          <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <NextLink
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text"
              >
                <span aria-hidden="true">←</span> All projects
              </NextLink>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline">{project.type}</Badge>
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-mono)] text-xs text-text-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Heading level={1}>{project.title}</Heading>
              {project.subtitle ? (
                <Text size="lg" tone="muted">
                  {project.subtitle}
                </Text>
              ) : null}
            </header>

            <ProjectGallery images={project.images} title={project.title} />

            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              <div className="flex flex-col gap-8">
                {project.description ? (
                  <section>
                    <Heading level={2} className="mb-3 text-xl">
                      Overview
                    </Heading>
                    <Text tone="muted">{project.description}</Text>
                  </section>
                ) : null}

                {project.features.length > 0 ? (
                  <section>
                    <Heading level={2} className="mb-3 text-xl">
                      Key features
                    </Heading>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 text-sm text-text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>

              <aside className="flex flex-col gap-6">
                {project.techStack.length > 0 ? (
                  <section className="rounded-lg border border-border bg-bg-elevated p-5">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
                      Tech stack
                    </h2>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.techStack.map((t) => (
                        <li
                          key={t}
                          className="rounded-sm border border-border bg-surface px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {(project.links.live ||
                  project.links.frontend ||
                  project.links.backend ||
                  project.links.github) && (
                  <section className="rounded-lg border border-border bg-bg-elevated p-5">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
                      Links
                    </h2>
                    <ul className="flex flex-col gap-2 text-sm">
                      {project.links.live ? (
                        <li>
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text hover:text-accent"
                          >
                            Live demo ↗
                          </a>
                        </li>
                      ) : null}
                      {project.links.frontend ? (
                        <li>
                          <a
                            href={project.links.frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-text"
                          >
                            Frontend repo ↗
                          </a>
                        </li>
                      ) : null}
                      {project.links.backend ? (
                        <li>
                          <a
                            href={project.links.backend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-text"
                          >
                            Backend repo ↗
                          </a>
                        </li>
                      ) : null}
                      {project.links.github ? (
                        <li>
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-text"
                          >
                            Source ↗
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </section>
                )}

                {project.credentials ? (
                  <section className="rounded-lg border border-border bg-bg-elevated p-5">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
                      Demo credentials
                    </h2>
                    <div className="flex flex-col gap-3">
                      {project.credentials.email ? (
                        <CopyField
                          label="Email"
                          value={project.credentials.email}
                        />
                      ) : null}
                      {project.credentials.password ? (
                        <CopyField
                          label="Password"
                          value={project.credentials.password}
                        />
                      ) : null}
                      {project.credentials.note ? (
                        <p className="text-xs text-text-subtle">
                          {project.credentials.note}
                        </p>
                      ) : null}
                    </div>
                  </section>
                ) : null}
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section spacing="lg">
          <Container>
            <div className="flex flex-col gap-6">
              <Heading level={2} className="text-xl">
                Related projects
              </Heading>
              <ProjectGrid projects={related} />
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
