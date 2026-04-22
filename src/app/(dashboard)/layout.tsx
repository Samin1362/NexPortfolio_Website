import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RequireAuth>
        <DashboardShell>{children}</DashboardShell>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          theme="system"
          toastOptions={{
            classNames: {
              toast:
                "!rounded-md !border !border-border !bg-bg-elevated !text-sm !text-text",
            },
          }}
        />
      </RequireAuth>
    </AuthProvider>
  );
}
