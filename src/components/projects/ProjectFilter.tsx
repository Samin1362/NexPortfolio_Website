"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/cn";
import { ProjectGrid } from "./ProjectGrid";

function matchesSearch(project: Project, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  if (project.title.toLowerCase().includes(q)) return true;
  if (project.subtitle?.toLowerCase().includes(q)) return true;
  if (project.description?.toLowerCase().includes(q)) return true;
  if (project.techStack.some((t) => t.toLowerCase().includes(q))) return true;
  if (project.tags.some((t) => t.toLowerCase().includes(q))) return true;
  return false;
}

export function ProjectFilter({
  projects,
  types,
}: {
  projects: Project[];
  types: string[];
}) {
  const [activeType, setActiveType] = useState<string>("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(() => {
    return projects.filter((p) => {
      const typeOk = activeType === "All" || p.type === activeType;
      return typeOk && matchesSearch(p, deferredQuery.trim());
    });
  }, [projects, activeType, deferredQuery]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by project type"
          className="flex flex-wrap gap-2"
        >
          {types.map((t) => {
            const active = t === activeType;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveType(t)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-transparent bg-text text-bg"
                    : "border-border bg-surface text-text-muted hover:border-border-strong hover:text-text",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            inputMode="search"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search projects"
            className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-text placeholder:text-text-subtle focus:outline-none focus-visible:border-border-strong"
          />
        </div>
      </div>

      <div aria-live="polite" className="text-xs text-text-subtle">
        Showing {visible.length} of {projects.length} project
        {projects.length === 1 ? "" : "s"}
      </div>

      <ProjectGrid projects={visible} />
    </div>
  );
}
