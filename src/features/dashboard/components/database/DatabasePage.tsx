"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDatabase } from "@/hooks/useDatabase";
import type { DocumentCategory } from "@/lib/api/documents.service";
import DatabaseUploadSection from "./DatabaseUploadSection";
import DatabaseFilesGrid from "./DatabaseFilesGrid";

type DatabaseTab = "cvResume" | "projectInputs" | "portfolio";

const TAB_CATEGORIES: Record<DatabaseTab, DocumentCategory[]> = {
  cvResume: ["cv_resume"],
  projectInputs: ["rfp", "boq"],
  portfolio: ["portfolio", "certifications"],
};

export default function DatabasePage() {
  const { t } = useLanguage();
  const db = t.dashboard.database;
  const [activeTab, setActiveTab] = useState<DatabaseTab>("cvResume");

  const tabs: { key: DatabaseTab; label: string }[] = [
    { key: "cvResume", label: db.tabs.cvResume },
    { key: "projectInputs", label: db.tabs.projectInputs },
    { key: "portfolio", label: db.tabs.portfolio },
  ];

  const { items, loading, upload, deleteDoc, viewDoc } = useDatabase(TAB_CATEGORIES[activeTab]);

  const uploadSections: Record<DatabaseTab, { label: string; category: DocumentCategory }[]> = {
    cvResume: [{ label: db.uploadLabel, category: "cv_resume" }],
    projectInputs: [
      { label: db.uploadRfpLabel, category: "rfp" },
      { label: db.uploadBoqLabel, category: "boq" },
    ],
    portfolio: [
      { label: db.uploadPortfolioLabel, category: "portfolio" },
      { label: db.uploadCertificationsLabel, category: "certifications" },
    ],
  };

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
        <div className="flex flex-col gap-4">
          {uploadSections[activeTab].map(({ label, category }) => (
            <DatabaseUploadSection
              key={category}
              label={label}
              onUpload={(files) => upload(category, files)}
            />
          ))}
        </div>

        <DatabaseFilesGrid
          items={items}
          loading={loading}
          onView={viewDoc}
          onDelete={deleteDoc}
        />
      </div>
    </div>
  );
}
