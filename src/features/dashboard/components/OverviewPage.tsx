"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import LeftPanel from "./LeftPanel";
// import StatsCards from "./StatsCards";
import ProposalsTable from "./ProposalsTable";
import DocumentsSection from "./DocumentsSection";

export default function OverviewPage({ userName }: { userName: string }) {
  const { t } = useLanguage();

  return (
    <div className="layout-shell-x flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row lg:gap-4">
      <LeftPanel />
      <div className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-black dark:text-white">
            {t.dashboard.overview.welcomeBack}, {userName}
          </h1>
          <p className="mt-1 text-sm md:text-base text-black/60 dark:text-white/60">
            {t.dashboard.overview.welcomeSubtitle}
          </p>
        </div>
        {/* <StatsCards /> */}
        <DocumentsSection />
        <ProposalsTable />
      </div>
    </div>
  );
}
