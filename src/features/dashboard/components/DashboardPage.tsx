"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import LeftPanel from "./LeftPanel";
import StatsCards from "./StatsCards";
import DocumentsSection from "./DocumentsSection";
import ProposalsTable from "./ProposalsTable";

// TODO: replace with real session data
const mockUser = { name: "Ahmed" };

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="layout-shell-x scrollbar-hide flex h-full min-h-0 flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto md:gap-6 lg:flex-row lg:items-stretch lg:overflow-hidden">
      {/* Left dark panel */}
      <LeftPanel />

      {/* Main content — only this column scrolls on desktop */}
      <main className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-6 lg:overflow-y-auto py-4">
        {/* Welcome */}
        <div className="hidden lg:block">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black dark:text-white tracking-wide">
            {t.dashboard.overview.welcomeBack}, {mockUser.name}
          </h1>
          <p className="mt-1 text-sm text-paragraph dark:text-[#656769] tracking-wide font-light">
            {t.dashboard.overview.welcomeSubtitle}
          </p>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Document uploads */}
        <DocumentsSection />

        {/* Proposals list */}
        <ProposalsTable />
      </main>
    </div>
  );
}
