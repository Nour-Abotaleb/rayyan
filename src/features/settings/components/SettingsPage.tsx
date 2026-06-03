"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PersonalProfileTab from "./PersonalProfileTab";
import CompanyManagementTab from "./CompanyManagementTab";
import BillingPlansTab from "./BillingPlansTab";

type Tab = "personal" | "company" | "billing";

export default function SettingsPage({
  user,
}: {
  user: { name: string; email: string; avatar?: string };
}) {
  const { t } = useLanguage();
  const s = t.dashboard.settings;
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  const tabs: { key: Tab; label: string }[] = [
    { key: "personal", label: s.tabs.personalProfile },
    { key: "company", label: s.tabs.companyManagement },
    { key: "billing", label: s.tabs.billingPlans },
  ];

  return (
    <div className="layout-shell-x scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto pb-6 md:px-16">
      {/* Tab bar */}
      <div className="flex w-fit items-center border-b border-black/15 dark:border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`-mb-px pb-3 px-4 text-sm md:text-base font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-[2px] border-primary dark:border-[#519A91] dark:text-[#519A91]"
                : "text-black/80 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "personal" && <PersonalProfileTab user={user} />}
        {activeTab === "company" && <CompanyManagementTab />}
        {activeTab === "billing" && <BillingPlansTab />}
      </div>
    </div>
  );
}
