import type { Metadata } from "next";
import { EditProjectClient } from "@/components/dashboard/EditProjectClient";

export const metadata: Metadata = {
  title: "Edit project",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number.parseInt(id, 10);
  return <EditProjectClient id={numericId} />;
}
