"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import FilterIcon from "@/icons/FilterIcon";
import SearchIcon from "@/icons/SearchIcon";
import DatabaseFileCard from "./DatabaseFileCard";
import type { Document } from "@/lib/api/documents.service";

type SortOption = "newest" | "oldest" | "az" | "za";

const sortLabels: Record<SortOption, string> = {
  newest: "Newest First",
  oldest: "Oldest First",
  az: "A → Z",
  za: "Z → A",
};

function parseDMY(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

interface DatabaseFilesGridProps {
  items: Document[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function DatabaseFilesGrid({ items, loading, onDelete }: DatabaseFilesGridProps) {
  const { t } = useLanguage();
  const db = t.dashboard.database;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const processed = items
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "newest") return parseDMY(b.date) - parseDMY(a.date);
      if (sort === "oldest") return parseDMY(a.date) - parseDMY(b.date);
      if (sort === "az") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-black dark:text-white">
          {db.allFilesTitle}
        </h2>

        <div className="flex items-center gap-2">
          {/* Filter */}
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
          <div className="flex items-center overflow-hidden rounded-full border border-white dark:border-white/10 bg-linear-to-r from-white/35 to-white dark:bg-linear-to-r dark:from-white/15 dark:to-white/20 min-w-56 lg:min-w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={db.searchPlaceholder}
              className="flex-1 py-2 ps-4 text-[13px] text-zinc-700 dark:text-zinc-100 placeholder:text-[#A9A9A9] focus:outline-none bg-transparent"
            />
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary dark:bg-[#519A91] border border-white dark:border-[#0D0D0D] text-white dark:text-[#0D0D0D] me-0.5"
            >
              <SearchIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : processed.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <SearchIcon size={28} className="text-primary/40" />
          <p className="text-sm font-semibold text-black/50 dark:text-zinc-400">No files found</p>
          <p className="text-xs text-black/35 dark:text-zinc-500">Upload files above or try a different search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processed.map((file) => (
            <DatabaseFileCard
              key={file.id}
              id={file.id}
              date={file.date ?? ""}
              title={file.name}
              category={file.category}
              onView={() => window.open(file.url, "_blank", "noopener,noreferrer")}
              onDelete={() => onDelete(file.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
