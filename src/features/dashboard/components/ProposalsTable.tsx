"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProposals } from "@/hooks/useProposals";
import SearchIcon from "@/icons/SearchIcon";
import DownloadIcon from "@/icons/DownloadIcon";
import EyeIcon from "@/icons/EyeIcon";
import ProposalTabBgSvg from "./ProposalTabBgSvg";
import ProposalCalendarIcon from "@/icons/ProposalCalendarIcon";
import StatusBgSvg from "./StatusBgSvg";
import type { ProposalStatus, ProposalType } from "@/lib/api/proposals.service";

const statusStyles: Record<ProposalStatus, string> = {
  Completed: "bg-[#34A853]/12 text-[#34A853]",
  Processing: "bg-[#FF5F00]/12 text-[#FF5F00]",
  Failed: "bg-[#000000]/12 text-[#000000] dark:bg-white/12 dark:text-white",
};

function formatCardDate(isoLike: string) {
  const parts = isoLike.split(/[/\-]/).map((p) => p.trim());
  if (parts.length >= 3) {
    const [a, b, c] = parts;
    return `${a.padStart(2, "0")}-${b.padStart(2, "0")}-${c}`;
  }
  return isoLike;
}

const tabs: (ProposalType | "ALL")[] = [
  "ALL",
  "Technical",
  "Financial",
  "Visualization",
];

export default function ProposalsTable({
  variant = "card",
}: {
  variant?: "card" | "page";
}) {
  const router = useRouter();
  const { t, dir } = useLanguage();
  const isRtl = dir === "rtl";
  const {
    proposals,
    total,
    page,
    limit,
    loading,
    activeTab,
    search,
    fetchProposals,
    downloadProposal,
    changeTab,
    changeSearch,
    changePage,
  } = useProposals();

  const tabLabel: Record<ProposalType | "ALL", string> = {
    ALL: t.dashboard.proposals.tabs.all,
    Technical: t.dashboard.proposals.tabs.technical,
    Financial: t.dashboard.proposals.tabs.financial,
    Visualization: t.dashboard.proposals.tabs.visualization,
  };
  const statusLabelByStatus: Record<ProposalStatus, string> = {
    Completed: t.dashboard.proposals.status.completed,
    Processing: t.dashboard.proposals.status.processing,
    Failed: t.dashboard.proposals.status.failed,
  };

  useEffect(() => {
    fetchProposals({ page, type: activeTab, search });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, activeTab, search]);

  const desktopCols =
    proposals.length >= 3
      ? "lg:grid-cols-3"
      : proposals.length === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl px-3 md:px-5">
      {/* Active tab background — card variant only */}
      {variant === "card" && (
        <div className="w-full pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-100 dark:opacity-[0.15]">
          <ProposalTabBgSvg
            variant={activeTab}
            className={`h-auto w-full ${isRtl ? "scale-x-[-1]" : ""}`}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-6 mt-3">
          {/* Tabs */}
          <div
            className={`flex items-center ${
              variant === "page"
                ? "border-b border-black/15 dark:border-white/10"
                : ""
            } ${
              isRtl
                ? "gap-1 md:gap-2 lg:gap-3 xl:gap-20"
                : "gap-1 md:gap-4 lg:gap-4 xl:gap-17"
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => changeTab(tab)}
                className={`pb-3 text-sm md:text-base font-medium transition-colors ${
                  variant === "page"
                    ? activeTab === tab
                      ? "px-4 border-b-[2px] border-primary text-black dark:border-[#519A91] dark:text-[#519A91] -mb-px"
                      : "px-4 text-black dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    : activeTab === tab
                      ? "px-3 lg:px-4 text-primary dark:text-[#519A91]"
                      : "px-3 lg:px-4 text-black dark:text-zinc-100"
                }`}
              >
                {tabLabel[tab]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-linear-to-r from-white/35 to-white dark:bg-linear-to-r dark:from-white/15 dark:to-white/20 justify-between gap-0 overflow-hidden rounded-full border border-white dark:border-white/10 min-w-52 lg:min-w-70">
            <input
              value={search}
              onChange={(e) => changeSearch(e.target.value)}
              placeholder={t.dashboard.proposals.searchPlaceholder}
              className="py-2.5 ps-4 text-xs text-zinc-700 placeholder:text-[#A9A9A9] focus:outline-none dark:text-zinc-100"
            />
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary dark:bg-[#519A91] border border-white dark:border-[#0D0D0D] text-white dark:text-[#0D0D0D]">
              <SearchIcon size={16} />
            </button>
          </div>
        </div>

        {/* Proposal cards */}
        <div
          className={`grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2 pb-6 min-h-72 ${desktopCols}`}
        >
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : proposals.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center gap-2 py-10 text-center">
              <SearchIcon size={32} className="text-primary/40" />
              <p className="text-sm font-semibold text-black/50 dark:text-zinc-400">
                {t.dashboard.proposals.emptyTitle}
              </p>
              <p className="text-xs text-black/35 dark:text-zinc-500">
                {t.dashboard.proposals.emptyDescription}
              </p>
            </div>
          ) : (
            proposals.map((p) => (
              <div
                key={p.id}
                className={`relative ${variant === "page" ? "pt-6 lg:pt-9" : "pt-3 lg:pt-6"}`}
              >
                <div className="relative">
                  <div className={`absolute ${variant === "page" ? "top-0" : "top-2.5"} right-0 z-20 flex items-center gap-2`}>
                    <button
                      type="button"
                      onClick={() => router.push(`/dashboard/proposals/${p.id}`)}
                      className={`flex items-center gap-1.5 rounded-full bg-primary dark:bg-[#519A91] px-2 py-1.5 text-xs font-medium text-white dark:text-black transition-colors hover:bg-primary-dark cursor-pointer ${
                        isRtl ? "flex-row-reverse" : ""
                      }`}
                    >
                      <EyeIcon size={14} />
                      {t.dashboard.proposals.viewProposal}
                    </button>
                  </div>
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
                    <StatusBgSvg
                      className="h-full w-full text-white dark:text-[#0D0D0D]"
                      preserveAspectRatio={
                        variant === "page" ? "none" : "xMidYMid meet"
                      }
                    />
                  </div>

                  <div className="relative z-10 flex flex-col gap-3 p-3">
                    <span
                      className={`relative ${variant === "page" ? "-top-1" : "top-3"} w-fit rounded-full px-3 md:px-4 py-1 md:py-1.5 text-xs font-medium ${
                        isRtl ? "self-end" : "self-start"
                      } ${statusStyles[p.status]}`}
                    >
                      {statusLabelByStatus[p.status]}
                    </span>

                    {/* Title + subtitle + download */}
                    <div className="flex gap-3 pt-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold leading-snug text-black/80 dark:text-white/80">
                          {p.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-black/60 dark:text-white/60">
                          {p.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadProposal(p.id)}
                        aria-label={t.dashboard.proposals.downloadAriaLabel}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4ECEE]/50 dark:bg-[#1B272B]/50 border border-[#F0F0F0] dark:border-[#1C1C1C]/80 text-primary transition-colors hover:bg-primary/10"
                      >
                        <DownloadIcon size={18} />
                      </button>
                    </div>

                    {/* Progress */}
                    <div className="relative pt-5">
                      <div
                        className="absolute -top-2.5 flex flex-col items-center"
                        style={{
                          ...(isRtl
                            ? { right: `${p.progress}%` }
                            : { left: `${p.progress}%` }),
                          transform: isRtl
                            ? p.progress <= 8
                              ? "translateX(0)"
                              : p.progress >= 92
                                ? "translateX(100%)"
                                : "translateX(50%)"
                            : p.progress <= 8
                              ? "translateX(0)"
                              : p.progress >= 92
                                ? "translateX(-100%)"
                                : "translateX(-50%)",
                        }}
                      >
                        <div className="whitespace-nowrap rounded bg-[#E3EBEA] dark:bg-[#1F2B29] px-1.5 py-1 w-9 text-center text-[10px] font-semibold text-primary">
                          {p.progress}%
                        </div>
                        <div
                          className="h-0 w-0 border-x-[6px] border-t-[9px] border-l-transparent border-r-transparent border-t-[#E3EBEA] dark:border-t-[#1F2B29]"
                          aria-hidden
                        />
                      </div>
                      <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#E3EBEA] dark:bg-[#1F2B29] p-0.5">
                        <div
                          className={`h-full rounded-full bg-primary dark:bg-[#519A91] transition-all ${
                            isRtl ? "ml-auto" : ""
                          }`}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer dates */}
                    <div className="flex flex-wrap items-center gap-2 pb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F9] px-2.5 py-1.5 text-[10px] font-medium text-black dark:bg-zinc-800 dark:text-zinc-300">
                        <ProposalCalendarIcon
                          size={14}
                          className="shrink-0 text-black dark:text-white"
                        />
                        {formatCardDate(p.startDate)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F9] px-2.5 py-1.5 text-[10px] font-medium text-black dark:bg-zinc-800 dark:text-zinc-300">
                        <ProposalCalendarIcon
                          size={14}
                          className="shrink-0 text-black dark:text-white"
                        />
                        {formatCardDate(p.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination — page variant only */}
        {variant === "page" && total > limit && (
          <div className="flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
            <p className="text-xs text-black/50 dark:text-zinc-400">
              {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => changePage(page - 1)}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-black transition-opacity hover:opacity-70 disabled:opacity-30 dark:border-white/10 dark:text-white"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page * limit >= total}
                onClick={() => changePage(page + 1)}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-black transition-opacity hover:opacity-70 disabled:opacity-30 dark:border-white/10 dark:text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
