import NextLink from "next/link";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { RedirectIfAuthed } from "@/components/auth/RedirectIfAuthed";
import { siteConfig } from "@/lib/site";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RedirectIfAuthed>
        <main
          id="main-content"
          className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 py-12"
        >
          <NextLink
            href="/"
            className="mb-8 flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-text"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand text-brand-foreground text-sm font-bold"
            >
              S
            </span>
            <span>{siteConfig.name}</span>
          </NextLink>
          <div className="w-full max-w-sm">{children}</div>
        </main>
      </RedirectIfAuthed>
    </AuthProvider>
  );
}
