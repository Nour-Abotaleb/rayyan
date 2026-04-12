"use client";

import { useState } from "react";
import SearchIcon from "@/icons/SearchIcon";
import DownloadIcon from "@/icons/DownloadIcon";
import EyeIcon from "@/icons/EyeIcon";
import Image from "next/image";
import statusBg from "@src/assets/dashboard/status-bg.png";
import ProposalTabBgSvg from "./ProposalTabBgSvg";
import ProposalCalendarIcon from "@/icons/ProposalCalendarIcon";

type Status = "Completed" | "Processing" | "Failed";

const statusStyles: Record<Status, string> = {
  Completed: "bg-[#34A853]/12 text-[#34A853]",
  Processing: "bg-[#FF5F00]/12 text-[#FF5F00]",
  Failed: "bg-[#000000]/12 text-[#000000]",
};

function formatCardDate(isoLike: string) {
  const parts = isoLike.split(/[/\-]/).map((p) => p.trim());
  if (parts.length >= 3) {
    const [a, b, c] = parts;
    return `${a.padStart(2, "0")}-${b.padStart(2, "0")}-${c}`;
  }
  return isoLike;
}

const mockProposals = [
  {
    id: 1,
    title: "Dolor sed velit rem - Sunt v...",
    desc: "just add your details and let the syst...",
    status: "Completed" as Status,
    progress: 100,
    startDate: "6/11/2025",
    endDate: "9/11/2025",
  },
  {
    id: 2,
    title: "Dolor sed velit rem - Sunt v...",
    desc: "just add your details and let the syst...",
    status: "Processing" as Status,
    progress: 63,
    startDate: "6/11/2025",
    endDate: "9/11/2025",
  },
  {
    id: 3,
    title: "Dolor sed velit rem - Sunt v...",
    desc: "just add your details and let the syst...",
    status: "Failed" as Status,
    progress: 0,
    startDate: "6/11/2025",
    endDate: "9/11/2025",
  },
];

const tabs: (Status | "ALL")[] = ["ALL", "Completed", "Processing", "Failed"];

export default function ProposalsTable() {
  const [active, setActive] = useState<Status | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = mockProposals.filter((p) => {
    const matchTab = active === "ALL" || p.status === active;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const desktopCols =
    filtered.length >= 3
      ? "lg:grid-cols-3"
      : filtered.length === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl px-5">
      {/* Active tab background — clip here only so proposal actions can extend above cards */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-100 dark:opacity-[0.15]">
        <ProposalTabBgSvg variant={active} className="h-full w-full" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mt-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 md:gap-4 lg:gap-18">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-3 lg:px-4 text-sm md:text-base font-medium transition-colors ${
                  active === tab
                    ? "text-primary"
                    : "text-black dark:text-zinc-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-linear-to-r from-white/35 to-white justify-between gap-0 overflow-hidden rounded-full border border-white min-w-52 lg:min-w-70">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here"
              className="py-2.5 ps-4 text-xs text-zinc-700 placeholder:text-[#A9A9A9] focus:outline-none dark:text-zinc-100"
            />
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary border border-white text-white">
              <SearchIcon size={16} />
            </button>
          </div>
        </div>

        {/* Proposal cards */}
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 pb-6 min-h-72 ${desktopCols}`}
        >
          {filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center gap-2 py-10 text-center">
              <SearchIcon size={32} className="text-primary/40" />
              <p className="text-sm font-semibold text-black/50 dark:text-zinc-400">
                No proposals found
              </p>
              <p className="text-xs text-black/35 dark:text-zinc-500">
                Try a different search term or filter
              </p>
            </div>
          ) : (
            filtered.map((p) => (
              <div key={p.id} className="relative lg:pt-6">
                <div className="relative">
                  <button
                    type="button"
                    className="absolute -top-0.5 right-0 z-20 flex items-center gap-1.5 rounded-full bg-primary px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark"
                  >
                    <EyeIcon size={14} />
                    View Proposal
                  </button>
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
                    <Image
                      src={statusBg}
                      alt=""
                      aria-hidden
                      fill
                      className="object-fill"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="relative z-10 flex flex-col gap-3 p-3">
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${statusStyles[p.status]}`}
                    >
                      {p.status}
                    </span>

                    {/* Title + subtitle + download (download right, circular outline) */}
                    <div className="flex gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold leading-snug text-black/80">
                          {p.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-black/60">
                          {p.desc}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Download"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4ECEE]/50 text-primary transition-colors hover:bg-primary/10"
                      >
                        <DownloadIcon size={18} />
                      </button>
                    </div>

                    {/* Progress — tooltip-style % label + centered triangle above bar */}
                    <div className="relative pt-5">
                      <div
                        className="absolute -top-2.5 flex flex-col items-center"
                        style={{
                          left: `${p.progress}%`,
                          transform:
                            p.progress <= 8
                              ? "translateX(0)"
                              : p.progress >= 92
                                ? "translateX(-100%)"
                                : "translateX(-50%)",
                        }}
                      >
                        <div className="whitespace-nowrap rounded bg-[#E3EBEA] px-1.5 py-1 w-9 text-center text-[10px] font-semibold text-primary">
                          {p.progress}%
                        </div>
                        <div
                          className="h-0 w-0 border-x-[6px] border-t-[9px] border-l-transparent border-r-transparent border-t-[#E3EBEA]"
                          aria-hidden
                        />
                      </div>
                      <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#E3EBEA] p-0.5">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer dates — calendar + DD-MM-YYYY */}
                    <div className="flex flex-wrap items-center gap-2 py-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F9] px-2.5 py-1.5 text-[10px] font-medium text-black dark:bg-zinc-800 dark:text-zinc-300">
                        <ProposalCalendarIcon
                          size={14}
                          className="shrink-0 text-black"
                        />
                        {formatCardDate(p.startDate)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F9] px-2.5 py-1.5 text-[10px] font-medium text-black dark:bg-zinc-800 dark:text-zinc-300">
                        <ProposalCalendarIcon
                          size={14}
                          className="shrink-0 text-black"
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
      </div>
    </div>
  );
}
