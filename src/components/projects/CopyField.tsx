"use client";

import { useState } from "react";

export function CopyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — clipboard permission denied
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-subtle">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2">
        <code className="flex-1 truncate font-[family-name:var(--font-mono)] text-sm text-text">
          {value}
        </code>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label}`}
          className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-bg px-2 py-1 text-xs font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
