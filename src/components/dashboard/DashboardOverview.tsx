"use client";

import NextLink from "next/link";
import { useMemo } from "react";
import { useMyProjects } from "./useMyProjects";
import type { Project } from "@/types/project";

export function DashboardOverview() {
  const { state } = useMyProjects();

  const summary = useMemo(() => {
    if (state.status !== "ready") return null;
    const total = state.projects.length;
    const visible = state.projects.filter((p) => p.isVisible).length;
    const byType = new Map<string, number>();
    for (const p of state.projects) {
      byType.set(p.type, (byType.get(p.type) ?? 0) + 1);
    }
    const recent = [...state.projects]
      .filter((p) => p.updatedAt || p.createdAt)
      .sort((a, b) => {
        const ta = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime();
        const tb = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime();
        return tb - ta;
      })
      .slice(0, 5);
    return { total, visible, byType, recent };
  }, [state]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
            Dashboard
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            Overview
          </h1>
        </div>
        <div className="flex gap-2">
          <NextLink
            href="/dashboard/projects"
            className="inline-flex h-10 items-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-text hover:bg-surface-muted"
          >
            Manage projects
          </NextLink>
          <NextLink
            href="/dashboard/projects/new"
            className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90"
          >
            New project
          </NextLink>
        </div>
      </header>

      {state.status === "loading" ? (
        <p className="text-sm text-text-muted">Loading your projects…</p>
      ) : null}

      {state.status === "error" ? (
        <p className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      ) : null}

      {summary ? (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total projects" value={summary.total} />
            <StatCard label="Visible on site" value={summary.visible} />
            <StatCard
              label="Hidden / drafts"
              value={summary.total - summary.visible}
            />
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
            <ByTypeCard
              items={Array.from(summary.byType.entries()).sort(
                (a, b) => b[1] - a[1],
              )}
            />
            <RecentEditsCard projects={summary.recent} />
          </section>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
        {label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-text">
        {value}
      </p>
    </div>
  );
}

function ByTypeCard({ items }: { items: [string, number][] }) {
  const max = items.reduce((m, [, n]) => Math.max(m, n), 1);
  return (
    <div className="rounded-lg border border-border bg-bg-elevated p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
        By type
      </h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-text-muted">No projects yet.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map(([type, count]) => (
            <li key={type} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text">{type}</span>
                <span className="font-[family-name:var(--font-mono)] text-xs text-text-muted">
                  {count}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RecentEditsCard({ projects }: { projects: Project[] }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
        Recent edits
      </h2>
      {projects.length === 0 ? (
        <p className="mt-3 text-sm text-text-muted">No edits yet.</p>
      ) : (
        <ul className="mt-3 flex flex-col divide-y divide-border">
          {projects.map((p) => {
            const ts = p.updatedAt ?? p.createdAt;
            return (
              <li
                key={p.id}
                className="flex items-center justify-between py-2.5"
              >
                <div className="min-w-0 pr-3">
                  <NextLink
                    href={`/dashboard/projects/${p.id}/edit`}
                    className="truncate text-sm font-medium text-text hover:text-accent"
                  >
                    {p.title}
                  </NextLink>
                  <p className="truncate text-xs text-text-muted">{p.type}</p>
                </div>
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-[11px] text-text-subtle">
                  {ts ? new Date(ts).toLocaleDateString() : "—"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
