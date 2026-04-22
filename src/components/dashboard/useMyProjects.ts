"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { listMyProjects } from "@/lib/api/projects";
import type { Project } from "@/types/project";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; projects: Project[] }
  | { status: "error"; message: string };

export function useMyProjects() {
  const { idToken, status: authStatus, getIdToken } = useAuth();
  const [state, setState] = useState<State>({ status: "idle" });

  const load = useCallback(async () => {
    const token = idToken ?? (await getIdToken());
    if (!token) return;
    setState({ status: "loading" });
    try {
      const projects = await listMyProjects(token);
      projects.sort((a, b) => a.displayOrder - b.displayOrder);
      setState({ status: "ready", projects });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to load projects.",
      });
    }
  }, [idToken, getIdToken]);

  useEffect(() => {
    if (authStatus !== "signed-in") return;
    void load();
  }, [authStatus, load]);

  const setProjects = useCallback((next: Project[]) => {
    setState({ status: "ready", projects: next });
  }, []);

  return { state, reload: load, setProjects };
}
