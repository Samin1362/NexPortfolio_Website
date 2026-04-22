import type { Metadata } from "next";
import { DashboardProjectsList } from "@/components/dashboard/DashboardProjectsList";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
};

export default function DashboardProjectsPage() {
  return <DashboardProjectsList />;
}
