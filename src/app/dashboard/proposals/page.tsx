"use client";

import StatsCards from "@/features/dashboard/components/StatsCards";
import ProposalsTable from "@/features/dashboard/components/ProposalsTable";
import TestPdfBanner from "@/features/dashboard/components/TestPdfBanner";

export default function ProposalsPage() {
  return (
    <div className="layout-shell-x scrollbar-hide flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-4">
      <TestPdfBanner />
      <div className="rounded-2xl bg-white p-4 dark:bg-[#0D0D0D]">
        <StatsCards />
      </div>
      <ProposalsTable variant="page" />
    </div>
  );
}
