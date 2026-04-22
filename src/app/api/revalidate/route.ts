import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_PATHS = ["/", "/projects"] as const;

function authorized(request: Request): boolean {
  const auth = request.headers.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();
    if (token.length > 0) return true;
  }
  const secretHeader =
    request.headers.get("x-revalidate-secret") ??
    request.headers.get("x-revalidate-token");
  const expected = process.env.REVALIDATE_SECRET;
  if (expected && secretHeader && secretHeader === expected) return true;
  return false;
}

type Body = { paths?: unknown };

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  let parsed: Body = {};
  try {
    parsed = (await request.json()) as Body;
  } catch {
    parsed = {};
  }

  const raw = Array.isArray(parsed.paths) ? parsed.paths : DEFAULT_PATHS;
  const paths = raw
    .filter((p): p is string => typeof p === "string")
    .map((p) => p.trim())
    .filter((p) => p.startsWith("/") && p.length <= 1024);

  const revalidated: string[] = [];
  for (const path of paths.length ? paths : DEFAULT_PATHS) {
    revalidatePath(path);
    revalidated.push(path);
  }

  return NextResponse.json({
    success: true,
    revalidated,
    now: Date.now(),
  });
}
