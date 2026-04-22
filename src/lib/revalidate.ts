const DEFAULT_PATHS = ["/", "/projects"] as const;

export type RevalidateOptions = {
  paths?: string[];
  idToken?: string | null;
  slugPaths?: string[];
};

export async function requestRevalidate(
  options: RevalidateOptions = {},
): Promise<void> {
  const body = {
    paths: [...(options.paths ?? DEFAULT_PATHS), ...(options.slugPaths ?? [])],
  };
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.idToken) headers.Authorization = `Bearer ${options.idToken}`;

  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } catch {
    // best-effort; the next scheduled revalidate will still fire
  }
}
