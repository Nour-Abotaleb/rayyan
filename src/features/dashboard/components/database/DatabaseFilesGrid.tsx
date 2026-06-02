"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import FilterIcon from "@/icons/FilterIcon";
import SearchIcon from "@/icons/SearchIcon";
import DatabaseFileCard from "./DatabaseFileCard";

type SortOption = "newest" | "oldest" | "az" | "za";

const mockFiles = [
  { id: 1, date: "15-10-2023", title: "Dolor sed velit rem - Sunt velit dolor...", description: "just add your details and let the system do the rest." },
  { id: 2, date: "20-11-2023", title: "Project Alpha - Technical Documentation", description: "just add your details and let the system do the rest." },
  { id: 3, date: "03-01-2024", title: "Financial Summary Report Q4", description: "just add your details and let the system do the rest." },
  { id: 4, date: "08-02-2024", title: "Portfolio Showcase - Design Assets", description: "just add your details and let the system do the rest." },
  { id: 5, date: "12-03-2024", title: "CV Resume - Senior Engineer", description: "just add your details and let the system do the rest." },
  { id: 6, date: "01-04-2024", title: "Project Inputs - Phase Two", description: "just add your details and let the system do the rest." },
];

const sortLabels: Record<SortOption, string> = {
  newest: "Newest First",
  oldest: "Oldest First",
  az: "A → Z",
  za: "Z → A",
};

function parseDMY(date: string) {
  const [d, m, y] = date.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}

export default function DatabaseFilesGrid() {
  const { t } = useLanguage();
  const db = t.dashboard.database;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const processed = mockFiles
    .filter((f) => f.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "newest") return parseDMY(b.date) - parseDMY(a.date);
      if (sort === "oldest") return parseDMY(a.date) - parseDMY(b.date);
      if (sort === "az") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-black dark:text-white">
          {db.allFilesTitle}
        </h2>

        <div className="flex items-center gap-2">
          {/* Filter button + dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={() => setFilterOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full bg-[#EEEEEE] dark:bg-zinc-800 px-4 py-2 text-[13px] font-semibold text-[#21665F] dark:text-[#519A91] transition-colors hover:opacity-80"
            >
              <FilterIcon size={11} className="text-[#21665F] dark:text-[#519A91]" />
              {db.filter}
            </button>

            {filterOpen && (
              <div className="absolute end-0 top-full z-50 mt-2 min-w-36 overflow-hidden rounded-xl border border-black/8 bg-white dark:bg-[#1A1A1A] shadow-lg">
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { setSort(option); setFilterOpen(false); }}
                    className={`w-full px-4 py-2.5 text-start text-xs transition-colors hover:bg-primary/8 dark:hover:bg-white/5 ${
                      sort === option
                        ? "font-semibold text-primary dark:text-[#519A91]"
                        : "text-black/70 dark:text-white/60"
                    }`}
                  >
                    {sortLabels[option]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex items-center overflow-hidden rounded-full border border-white dark:border-white/10 bg-gradient-to-r from-[#FFFFFF] to-[#D9FFFA44]  dark:bg-gradient-to-r from-white/10 to-[#D9FFFA44] min-w-56 lg:min-w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={db.searchPlaceholder}
              className="flex-1 py-2 ps-4 text-[13px] text-zinc-700 dark:text-zinc-200 placeholder:text-[#A9A9A9] focus:outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setSearch(search)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary dark:bg-[#519A91] text-white dark:text-black me-0.5"
            >
              <SearchIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {processed.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <SearchIcon size={28} className="text-primary/40" />
          <p className="text-sm font-semibold text-black/50 dark:text-zinc-400">No files found</p>
          <p className="text-xs text-black/35 dark:text-zinc-500">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processed.map((file) => (
            <DatabaseFileCard
              key={file.id}
              date={file.date}
              title={file.title}
              description={file.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
