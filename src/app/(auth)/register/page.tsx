import type { Metadata } from "next";
import NextLink from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <section className="flex flex-col gap-6 rounded-lg border border-border bg-bg-elevated p-6 sm:p-8">
      <header className="flex flex-col gap-1.5">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-text">
          Create account
        </h1>
        <p className="text-sm text-text-muted">
          Accounts are restricted — only the portfolio owner should register.
        </p>
      </header>

      <RegisterForm />

      <p className="text-center text-sm text-text-muted">
        Already have an account?{" "}
        <NextLink href="/login" className="text-text hover:text-accent">
          Sign in
        </NextLink>
      </p>
    </section>
  );
}
