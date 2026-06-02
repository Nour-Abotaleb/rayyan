"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DatabaseUploadSection from "./DatabaseUploadSection";
import DatabaseFilesGrid from "./DatabaseFilesGrid";

type DatabaseTab = "cvResume" | "projectInputs" | "portfolio";

export default function DatabasePage() {
  const { t } = useLanguage();
  const db = t.dashboard.database;
  const [activeTab, setActiveTab] = useState<DatabaseTab>("cvResume");

  const tabs: { key: DatabaseTab; label: string }[] = [
    { key: "cvResume", label: db.tabs.cvResume },
    { key: "projectInputs", label: db.tabs.projectInputs },
    { key: "portfolio", label: db.tabs.portfolio },
  ];

  return (
    <div className="layout-shell-x scrollbar-hide flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto py-4">
      {/* Tabs */}
      <div className="flex w-fit items-center border-b border-black/15 dark:border-white/10">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`pb-3 px-4 text-sm md:text-base font-medium transition-colors -mb-px ${
              activeTab === key
                ? "border-b-[2px] border-primary dark:border-[#519A91] dark:text-[#519A91]"
                : "text-black dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex flex-col gap-6">
        {activeTab === "projectInputs" ? (
          <div className="flex flex-col gap-4">
            <DatabaseUploadSection label={db.uploadRfpLabel} />
            <DatabaseUploadSection label={db.uploadBoqLabel} />
          </div>
        ) : activeTab === "portfolio" ? (
          <div className="flex flex-col gap-4">
            <DatabaseUploadSection label={db.uploadPortfolioLabel} />
            <DatabaseUploadSection label={db.uploadCertificationsLabel} />
          </div>
        ) : (
          <DatabaseUploadSection />
        )}
        <DatabaseFilesGrid />
      </div>
    </div>
  );
}
