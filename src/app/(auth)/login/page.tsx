import type { Metadata } from "next";
import NextLink from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="flex flex-col gap-6 rounded-lg border border-border bg-bg-elevated p-6 sm:p-8">
      <header className="flex flex-col gap-1.5">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-text">
          Sign in
        </h1>
        <p className="text-sm text-text-muted">
          Access the dashboard to manage your projects.
        </p>
      </header>

      <LoginForm />

      <p className="text-center text-sm text-text-muted">
        Don&apos;t have an account?{" "}
        <NextLink href="/register" className="text-text hover:text-accent">
          Register
        </NextLink>
      </p>
    </section>
  );
}
