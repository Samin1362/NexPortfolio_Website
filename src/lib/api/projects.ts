import { apiFetch, authedFetch } from "./client";
import {
  mapProject,
  unmapProjectInput,
  type Project,
  type ProjectCreateInput,
  type ProjectUpdateInput,
  type RawProject,
  type ReorderItem,
} from "@/types/project";
import type { FetchOptions } from "@/types/api";
import { projectsFallback } from "@/content/projectsFallback";

type ListResponse = { projects: RawProject[] };
type SingleResponse = { project: RawProject };

const DEFAULT_LIST_REVALIDATE = 600;
const DEFAULT_DETAIL_REVALIDATE = 3600;

export async function listProjects(
  options: FetchOptions = {},
): Promise<Project[]> {
  const res = await apiFetch<ListResponse>(
    "/api/projects",
    { method: "GET" },
    { revalidate: DEFAULT_LIST_REVALIDATE, ...options },
  );
  return (res.projects ?? []).map(mapProject);
}

export async function getProject(
  id: number,
  options: FetchOptions = {},
): Promise<Project> {
  const res = await apiFetch<SingleResponse>(
    `/api/projects/${id}`,
    { method: "GET" },
    { revalidate: DEFAULT_DETAIL_REVALIDATE, ...options },
  );
  return mapProject(res.project);
}

export async function listProjectsSafe(
  options: FetchOptions = {},
): Promise<{ projects: Project[]; usedFallback: boolean }> {
  try {
    const projects = await listProjects(options);
    return { projects, usedFallback: false };
  } catch (error) {
    console.warn(
      "listProjectsSafe: backend unreachable — using bundled fallback",
      error,
    );
    return { projects: projectsFallback, usedFallback: true };
  }
}

export async function getProjectSafe(
  id: number,
  options: FetchOptions = {},
): Promise<Project | null> {
  try {
    return await getProject(id, options);
  } catch {
    const local = projectsFallback.find((p) => p.id === id);
    return local ?? null;
  }
}

export async function listMyProjects(
  token: string,
  options: FetchOptions = {},
): Promise<Project[]> {
  const res = await authedFetch<ListResponse>(
    "/api/projects/my",
    token,
    { method: "GET", cache: "no-store" },
    options,
  );
  return (res.projects ?? []).map(mapProject);
}

export async function createProject(
  token: string,
  input: ProjectCreateInput,
): Promise<Project> {
  const res = await authedFetch<SingleResponse>(
    "/api/projects",
    token,
    {
      method: "POST",
      body: JSON.stringify(unmapProjectInput(input)),
    },
  );
  return mapProject(res.project);
}

export async function updateProject(
  token: string,
  id: number,
  input: ProjectUpdateInput,
): Promise<Project> {
  const res = await authedFetch<SingleResponse>(
    `/api/projects/${id}`,
    token,
    {
      method: "PUT",
      body: JSON.stringify(unmapProjectInput(input)),
    },
  );
  return mapProject(res.project);
}

export async function deleteProject(
  token: string,
  id: number,
): Promise<void> {
  await authedFetch<{ message: string }>(`/api/projects/${id}`, token, {
    method: "DELETE",
  });
}

export async function reorderProjects(
  token: string,
  items: ReorderItem[],
): Promise<void> {
  await authedFetch<{ message: string }>("/api/projects/reorder", token, {
    method: "PATCH",
    body: JSON.stringify({
      items: items.map((i) => ({ id: i.id, display_order: i.displayOrder })),
    }),
  });
}
