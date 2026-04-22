import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-elevated p-10 text-center">
        <p className="text-sm text-text-muted">
          No projects match your filters.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id} className="flex">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
