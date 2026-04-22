"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useAuth } from "./AuthProvider";
import { authFieldClass, authFieldLabel } from "./authStyles";

function mapAuthError(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Invalid email or password.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again in a few minutes.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      default:
        return error.message;
    }
  }
  return "Something went wrong. Please try again.";
}

export function LoginForm() {
  const { login, status } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/dashboard");
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  const disabled = submitting || status === "unconfigured";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className={authFieldLabel}>Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={disabled}
          className={authFieldClass}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={authFieldLabel}>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={6}
          disabled={disabled}
          className={authFieldClass}
        />
      </label>

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}

      {status === "unconfigured" ? (
        <p className="text-sm text-warning">
          Firebase is not configured. Set <code>NEXT_PUBLIC_FIREBASE_*</code>
          env vars.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
