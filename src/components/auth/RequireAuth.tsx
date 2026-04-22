"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "signed-out") router.replace("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="text-sm text-text-muted">Loading…</span>
      </div>
    );
  }

  if (status === "unconfigured") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center gap-3 px-6">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-text">
          Firebase is not configured
        </h1>
        <p className="text-sm text-text-muted">
          Set the <code>NEXT_PUBLIC_FIREBASE_*</code> environment variables in
          <code> .env.local</code> and restart the dev server to enable
          authentication.
        </p>
      </div>
    );
  }

  if (status !== "signed-in") return null;
  return <>{children}</>;
}
