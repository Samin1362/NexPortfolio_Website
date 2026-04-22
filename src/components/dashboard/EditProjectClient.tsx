"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getProject } from "@/lib/api/projects";
import type { Project } from "@/types/project";
import { ProjectForm } from "./ProjectForm";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; project: Project };

export function EditProjectClient({ id }: { id: number }) {
  const { status: authStatus } = useAuth();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (authStatus !== "signed-in") return;
    if (!Number.isFinite(id)) {
      setState({ status: "error", message: "Invalid project id." });
      return;
    }
    let alive = true;
    (async () => {
      try {
        const project = await getProject(id);
        if (alive) setState({ status: "ready", project });
      } catch (err) {
        if (alive) {
          setState({
            status: "error",
            message:
              err instanceof Error ? err.message : "Failed to load project.",
          });
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [id, authStatus]);

  if (state.status === "loading") {
    return <p className="text-sm text-text-muted">Loading project…</p>;
  }
  if (state.status === "error") {
    return (
      <p className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
        {state.message}
      </p>
    );
  }

  return <ProjectForm project={state.project} />;
}
