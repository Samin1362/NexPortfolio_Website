import Image from "next/image";
import NextLink from "next/link";
import type { Project } from "@/types/project";
import { buildProjectSlug } from "@/lib/slug";
import { Badge } from "@/components/ui";

export function ProjectCard({ project }: { project: Project }) {
  const slug = buildProjectSlug(project.title, project.id);
  const cover = project.images[0];
  const primaryTech = project.techStack.slice(0, 4);
  const extraCount = project.techStack.length - primaryTech.length;

  return (
    <NextLink
      href={`/projects/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-elevated transition-colors hover:border-border-strong focus-visible:border-border-strong"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            project.gradient ??
            `linear-gradient(90deg, ${project.borderColor ?? "var(--color-brand)"}, transparent)`,
        }}
      />

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
        {cover ? (
          <Image
            src={cover}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-text-subtle">
            No preview
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-text">
              {project.title}
            </h3>
            {project.subtitle ? (
              <p className="mt-0.5 truncate text-sm text-text-muted">
                {project.subtitle}
              </p>
            ) : null}
          </div>
          <Badge variant="outline" className="shrink-0">
            {project.type}
          </Badge>
        </div>

        {project.description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
            {project.description}
          </p>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {primaryTech.map((t) => (
            <li
              key={t}
              className="rounded-sm border border-border bg-surface px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-text-subtle"
            >
              {t}
            </li>
          ))}
          {extraCount > 0 ? (
            <li className="rounded-sm border border-border bg-surface px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-text-subtle">
              +{extraCount}
            </li>
          ) : null}
        </ul>
      </div>
    </NextLink>
  );
}
