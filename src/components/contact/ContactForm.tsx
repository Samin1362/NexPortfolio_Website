"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
    };

    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!res.ok || !body.success) {
        setStatus({
          state: "error",
          message: body.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setStatus({
        state: "success",
        message: "Thanks — your message is on its way. I'll be in touch.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again in a moment.",
      });
    }
  }

  const submitting = status.state === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="flex flex-col gap-5"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <Field label="Your name" htmlFor="contact-name">
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          disabled={submitting}
          className={inputClass}
        />
      </Field>

      <Field label="Email" htmlFor="contact-email">
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={160}
          autoComplete="email"
          disabled={submitting}
          className={inputClass}
        />
      </Field>

      <Field label="Message" htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          disabled={submitting}
          className={cn(inputClass, "resize-y leading-relaxed")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>

        <div aria-live="polite" className="text-sm">
          {status.state === "success" ? (
            <span className="text-success">{status.message}</span>
          ) : status.state === "error" ? (
            <span className="text-danger">{status.message}</span>
          ) : null}
        </div>
      </div>
    </form>
  );
}

const inputClass =
  "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-text placeholder:text-text-subtle focus:outline-none focus-visible:border-border-strong disabled:opacity-60";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
        {label}
      </span>
      {children}
    </label>
  );
}
