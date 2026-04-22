"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useAuth } from "./AuthProvider";
import { authFieldClass, authFieldLabel } from "./authStyles";

function mapAuthError(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "An account with that email already exists.";
      case "auth/invalid-email":
        return "That email address looks invalid.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      default:
        return error.message;
    }
  }
  return "Something went wrong. Please try again.";
}

export function RegisterForm() {
  const { register, status } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirmPassword") ?? "");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await register(email, password, name || undefined);
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
        <span className={authFieldLabel}>Name (optional)</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          disabled={disabled}
          className={authFieldClass}
        />
      </label>
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
          autoComplete="new-password"
          required
          minLength={6}
          disabled={disabled}
          className={authFieldClass}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={authFieldLabel}>Confirm password</span>
        <input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
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
        {submitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
