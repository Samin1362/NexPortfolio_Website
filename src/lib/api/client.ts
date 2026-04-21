import type { ApiBody, FetchOptions } from "@/types/api";

const DEFAULT_BASE_URL = "http://localhost:5000";

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? DEFAULT_BASE_URL
  );
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const base = getBaseUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildNextConfig(options: FetchOptions | undefined) {
  const next: { revalidate?: number | false; tags?: string[] } = {};
  if (options?.revalidate !== undefined) next.revalidate = options.revalidate;
  if (options?.tags) next.tags = options.tags;
  return Object.keys(next).length ? next : undefined;
}

async function parseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  options: FetchOptions = {},
): Promise<T> {
  const next = buildNextConfig(options);
  const headers = new Headers(init.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(buildUrl(path), {
    ...init,
    headers,
    signal: options.signal ?? init.signal,
    ...(next ? { next } : {}),
  });

  const body = (await parseBody(res)) as ApiBody<T> | null;

  if (!res.ok) {
    const message =
      (body && typeof body === "object" && "message" in body
        ? (body as { message?: string }).message
        : undefined) ?? `Request failed (${res.status})`;
    throw new ApiError(message, res.status, body);
  }

  if (body && typeof body === "object" && "success" in body && !body.success) {
    throw new ApiError(
      (body as { message?: string }).message ?? "Request failed",
      res.status,
      body,
    );
  }

  return body as T;
}

export async function authedFetch<T>(
  path: string,
  token: string,
  init: RequestInit = {},
  options: FetchOptions = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  return apiFetch<T>(path, { ...init, headers }, options);
}
