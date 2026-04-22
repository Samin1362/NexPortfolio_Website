"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export function RedirectIfAuthed({
  children,
  to = "/dashboard",
}: {
  children: React.ReactNode;
  to?: string;
}) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "signed-in") router.replace(to);
  }, [status, router, to]);

  return <>{children}</>;
}
