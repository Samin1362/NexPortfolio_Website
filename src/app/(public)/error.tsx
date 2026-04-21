"use client";

import { useEffect } from "react";
import { Button, Container, Heading, Section, Text } from "@/components/ui";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public route error:", error);
  }, [error]);

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-subtle">
            Error
          </span>
          <Heading level={1}>Something went wrong.</Heading>
          <Text tone="muted" size="lg">
            An unexpected error occurred while loading this page. Try again, or
            head back home.
          </Text>
          {error.digest ? (
            <Text size="sm" tone="subtle" className="font-mono">
              Reference: {error.digest}
            </Text>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button onClick={() => reset()}>Try again</Button>
            <Button
              variant="ghost"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Go home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
