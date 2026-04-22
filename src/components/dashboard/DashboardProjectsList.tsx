"use client";

import NextLink from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { deleteProject, reorderProjects } from "@/lib/api/projects";
import { buildProjectSlug } from "@/lib/slug";
import { requestRevalidate } from "@/lib/revalidate";
import type { Project } from "@/types/project";
import { ConfirmModal } from "./ConfirmModal";
import { useMyProjects } from "./useMyProjects";

export function DashboardProjectsList() {
  const { state, setProjects, reload } = useMyProjects();
  const { getIdToken, idToken } = useAuth();
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [busy, setBusy] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const types = useMemo(() => {
    if (state.status !== "ready") return ["All"];
    const set = new Set<string>();
    for (const p of state.projects) set.add(p.type);
    return ["All", ...Array.from(set).sort()];
  }, [state]);

  const projects = state.status === "ready" ? state.projects : [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.subtitle?.toLowerCase().includes(q) ?? false) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, typeFilter, query]);

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      if (state.status !== "ready") return;

      const prev = state.projects;
      const oldIndex = prev.findIndex((p) => p.id === Number(active.id));
      const newIndex = prev.findIndex((p) => p.id === Number(over.id));
      if (oldIndex < 0 || newIndex < 0) return;

      const moved = arrayMove(prev, oldIndex, newIndex).map((p, i) => ({
        ...p,
        displayOrder: i,
      }));
      setProjects(moved);

      try {
        const token = idToken ?? (await getIdToken());
        if (!token) throw new Error("Not signed in.");
        await reorderProjects(
          token,
          moved.map((p) => ({ id: p.id, displayOrder: p.displayOrder })),
        );
        await requestRevalidate({ idToken: token });
        toast.success("Order updated");
      } catch (err) {
        setProjects(prev);
        toast.error(
          err instanceof Error ? err.message : "Failed to reorder projects.",
        );
      }
    },
    [state, setProjects, getIdToken, idToken],
  );

  const onConfirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      const token = idToken ?? (await getIdToken());
      if (!token) throw new Error("Not signed in.");
      await deleteProject(token, deleteTarget.id);
      if (state.status === "ready") {
        setProjects(state.projects.filter((p) => p.id !== deleteTarget.id));
      }
      const slug = buildProjectSlug(deleteTarget.title, deleteTarget.id);
      await requestRevalidate({
        idToken: token,
        slugPaths: [`/projects/${slug}`],
      });
      toast.success(`“${deleteTarget.title}” deleted.`);
      setDeleteTarget(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete project.",
      );
    } finally {
      setBusy(false);
    }
  }, [deleteTarget, getIdToken, idToken, setProjects, state]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
            Dashboard
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Projects
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void reload()}
            className="inline-flex h-10 items-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-text hover:bg-surface-muted"
          >
            Refresh
          </button>
          <NextLink
            href="/dashboard/projects/new"
            className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90"
          >
            New project
          </NextLink>
        </div>
      </header>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-elevated p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              aria-pressed={typeFilter === t}
              className={
                typeFilter === t
                  ? "rounded-sm border border-transparent bg-text px-3 py-1.5 text-xs font-medium text-bg"
                  : "rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted hover:text-text"
              }
            >
              {t}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text placeholder:text-text-subtle focus:outline-none focus-visible:border-border-strong sm:w-60"
        />
      </div>

      {state.status === "loading" ? (
        <p className="text-sm text-text-muted">Loading projects…</p>
      ) : null}

      {state.status === "error" ? (
        <p className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      ) : null}

      {state.status === "ready" && projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-bg-elevated p-10 text-center">
          <p className="text-sm text-text-muted">No projects yet.</p>
          <NextLink
            href="/dashboard/projects/new"
            className="mt-3 inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90"
          >
            Create your first project
          </NextLink>
        </div>
      ) : null}

      {state.status === "ready" && projects.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={filtered.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-2">
              {filtered.map((p) => (
                <SortableRow
                  key={p.id}
                  project={p}
                  onDelete={() => setDeleteTarget(p)}
                />
              ))}
            </ul>
          </SortableContext>
          {typeFilter !== "All" || query.trim() ? (
            <p className="mt-3 text-xs text-text-subtle">
              Tip: clear filters to drag-reorder across all projects. Reordering
              is persisted across the full list.
            </p>
          ) : null}
        </DndContext>
      ) : null}

      <ConfirmModal
        open={deleteTarget !== null}
        title={`Delete “${deleteTarget?.title ?? ""}”?`}
        description="This permanently removes the project and its images from the dashboard. Public site updates on next revalidate."
        confirmLabel="Delete"
        danger
        busy={busy}
        onConfirm={onConfirmDelete}
        onClose={() => !busy && setDeleteTarget(null)}
      />
    </div>
  );
}

function SortableRow({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border border-border bg-bg-elevated p-3 sm:p-4"
    >
      <button
        type="button"
        aria-label={`Drag ${project.title}`}
        {...attributes}
        {...listeners}
        className="inline-flex h-9 w-9 shrink-0 cursor-grab items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:text-text active:cursor-grabbing"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="9" cy="6" r="1" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="9" cy="18" r="1" />
          <circle cx="15" cy="6" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="15" cy="18" r="1" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <h3 className="truncate font-medium text-text">{project.title}</h3>
          <span className="rounded-sm border border-border bg-surface px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-text-subtle">
            {project.type}
          </span>
          {!project.isVisible ? (
            <span className="rounded-sm border border-warning/40 bg-warning/10 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-warning">
              Hidden
            </span>
          ) : null}
        </div>
        {project.subtitle ? (
          <p className="truncate text-xs text-text-muted">{project.subtitle}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <NextLink
          href={`/projects/${buildProjectSlug(project.title, project.id)}`}
          className="hidden h-9 items-center rounded-md border border-border bg-surface px-3 text-xs font-medium text-text-muted hover:text-text sm:inline-flex"
        >
          View
        </NextLink>
        <NextLink
          href={`/dashboard/projects/${project.id}/edit`}
          className="inline-flex h-9 items-center rounded-md border border-border bg-surface px-3 text-xs font-medium text-text hover:bg-surface-muted"
        >
          Edit
        </NextLink>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-9 items-center rounded-md border border-danger/40 bg-danger/10 px-3 text-xs font-medium text-danger hover:bg-danger/20"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
