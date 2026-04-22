import type { Metadata } from "next";
import { ProjectForm } from "@/components/dashboard/ProjectForm";

export const metadata: Metadata = {
  title: "New project",
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return <ProjectForm />;
}
