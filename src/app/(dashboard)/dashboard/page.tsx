import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
