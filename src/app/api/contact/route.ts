import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (asString(body.website).length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const message = asString(body.message);

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid name." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 160) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { success: false, message: "Message must be 10–4000 characters." },
      { status: 400 },
    );
  }

  console.log("[contact] new message", {
    name,
    email,
    length: message.length,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
