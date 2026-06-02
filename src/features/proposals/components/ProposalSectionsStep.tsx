"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import PersonIcon from "@/icons/PersonIcon";
import CloseIcon from "@/icons/CloseIcon";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";

function UploadFileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.25033 12.8327H8.75033C11.667 12.8327 12.8337 11.666 12.8337 8.74935V5.24935C12.8337 2.33268 11.667 1.16602 8.75033 1.16602H5.25033C2.33366 1.16602 1.16699 2.33268 1.16699 5.24935V8.74935C1.16699 11.666 2.33366 12.8327 5.25033 12.8327Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.25 5.54687L7 3.79688L8.75 5.54687" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 3.79688V8.46354" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 9.63086C5.76917 10.3892 8.23083 10.3892 10.5 9.63086" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ComponentsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 5.15V8.85C22 11.1 21.1 12 18.85 12H16.15C13.9 12 13 11.1 13 8.85V5.15C13 2.9 13.9 2 16.15 2H18.85C21.1 2 22 2.9 22 5.15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 15.15V18.85C11 21.1 10.1 22 7.85 22H5.15C2.9 22 2 21.1 2 18.85V15.15C2 12.9 2.9 12 5.15 12H7.85C10.1 12 11 12.9 11 15.15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const WEEKS = [
  { label: "Week 1", range: "9 – 15 OCT",      days: [9,10,11,12,13,14,15] },
  { label: "Week 2", range: "16 – 22 OCT",     days: [16,17,18,19,20,21,22] },
  { label: "Week 3", range: "23 – 29 OCT",     days: [23,24,25,26,27,28,29] },
  { label: "Week 4", range: "30 OCT – 5 NOV",  days: [30,31,1,2,3,4,5] },
  { label: "Week 5", range: "6 – 12 NOV",      days: [6,7,8,9,10,11,12] },
  { label: "Week 6", range: "13 – 19 NOV",     days: [13,14,15,16,17,18,19] },
];

// Flatten to individual day columns; last 2 days of each week are "weekend" (colored)
const FLAT_DAYS = WEEKS.flatMap((w, wi) =>
  w.days.map((d, di) => ({ day: d, weekIdx: wi, dayInWeek: di, isWeekend: di >= 5 }))
);

const MONTH_GROUPS = [
  { label: "October 2024", span: 28 },
  { label: "November 2024", span: 14 },
];

const GANTT_ROWS = 5;

export default function ProposalSectionsStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { t } = useLanguage();
  const s = t.dashboard.newProposal.sections;
  const actions = t.dashboard.newProposal.actions;

  const [cardTitle, setCardTitle] = useState("");
  const [projectPeriod, setProjectPeriod] = useState("");

  const defaultChip = s.proposalTitleChip;
  const [sectionChips, setSectionChips] = useState<string[][]>([
    [defaultChip, defaultChip, defaultChip],
    [defaultChip, defaultChip, defaultChip],
    [defaultChip, defaultChip, defaultChip],
  ]);

  const optionalSections = [
    s.adminComplianceTitle,
    s.technicalMethodologyTitle,
    s.managementResourcesTitle,
  ];

  function removeChip(si: number, ci: number) {
    setSectionChips((prev) =>
      prev.map((row, ri) => (ri === si ? row.filter((_, j) => j !== ci) : row))
    );
  }

  return (
    <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">

      {/* Timeline */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-base font-semibold text-black dark:text-white">
            {s.createTimelineTitle}
          </h3>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-white bg-white/50 px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer"
          >
            <UploadFileIcon />
            {s.actions.uploadFile}
          </button>
        </div>

        {/* Gantt chart */}
        <div className="relative rounded-xl text-black/15 dark:text-white/10">
          {/* Custom dash border — longer dashes, wider gaps */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
            <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none"
              stroke="currentColor" strokeWidth="1" strokeDasharray="12 7" />
          </svg>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full border-collapse text-xs" style={{ tableLayout: "fixed" }}>
            <colgroup>
              {FLAT_DAYS.map((_, i) => (
                <col key={i} style={{ minWidth: 20 }} />
              ))}
            </colgroup>
            <thead>
              {/* Month row */}
              <tr className="border-b border-black/10 bg-primary/[0.03] dark:border-white/10 dark:bg-primary/[0.06]">
                {MONTH_GROUPS.map((m) => (
                  <th
                    key={m.label}
                    colSpan={m.span}
                    className="border-e border-black/10 px-2 py-3 text-center text-[10px] font-semibold text-black/40 dark:border-white/10 dark:text-white/35 last:border-e-0"
                  >
                    {m.label}
                  </th>
                ))}
              </tr>
              {/* Week row — each spans 7 day-columns */}
              <tr className="border-b border-black/10 dark:border-white/10">
                {WEEKS.map((w) => (
                  <th
                    key={w.label}
                    colSpan={7}
                    className="border-e border-black/10 px-2 py-2 dark:border-white/10 last:border-e-0"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-semibold text-black/60 dark:text-white/60">{w.label}</span>
                      <span className="text-[9px] text-black/30 dark:text-white/25 whitespace-nowrap">{w.range}</span>
                    </div>
                  </th>
                ))}
              </tr>
              {/* Days row — individual day columns */}
              <tr>
                {FLAT_DAYS.map(({ day, isWeekend }, i) => (
                  <td
                    key={i}
                    className={`py-1.5 text-center text-[8px] text-black/25 dark:text-white/20 ${isWeekend ? "bg-primary/[0.02]" : ""}`}
                  >
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: GANTT_ROWS }).map((_, row) => (
                <tr key={row}>
                  {FLAT_DAYS.map(({ isWeekend }, i) => (
                    <td
                      key={i}
                      className={`h-16 ${isWeekend ? "bg-primary/[0.02]" : ""}`}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      {/* Add Card + Project Period */}
      <div className="flex items-end gap-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-black dark:text-white">
            {s.addCardLabel} <span>*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={s.cardTitlePlaceholder}
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
            />
            <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-input-icon">
              <PersonIcon size={20} />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-black dark:text-white">
            {s.projectPeriodLabel} <span>*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={s.projectPeriodPlaceholder}
              value={projectPeriod}
              onChange={(e) => setProjectPeriod(e.target.value)}
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
            />
            <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-input-icon">
              <DateCalendarIcon size={20} />
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mb-px flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-primary text-white cursor-pointer hover:opacity-90 transition-opacity"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Optional Sections */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm md:text-base font-semibold text-black dark:text-white">
          {s.optionalSectionsTitle}
        </h3>

        {optionalSections.map((title, si) => (
          <div key={title} className="flex flex-col gap-2">
            <h4 className="text-sm md:text-[15px] font-semibold text-black/90 dark:text-white">
              {title}
            </h4>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="input-style w-full rounded-[44px] py-3 ps-4 pe-11 text-sm font-[300] text-black dark:text-zinc-100">
                  <div className="flex flex-wrap items-center gap-2">
                    {sectionChips[si].map((chip, ci) => (
                      <span
                        key={ci}
                        className="inline-flex items-center gap-2"
                      >
                        <span className="inline-flex items-center rounded-full bg-[#E4ECEE] px-3 py-1.5 text-xs font-normal text-black dark:bg-[#1B272B] dark:text-white">
                          {chip}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeChip(si, ci)}
                          className="-ms-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E4ECEE] text-sm leading-none text-black hover:opacity-70 dark:bg-[#1B272B] dark:text-white cursor-pointer"
                          aria-label={s.removeChipAriaLabel}
                        >
                          <CloseIcon size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                  <ComponentsIcon />
                </span>
              </div>
              <button
                type="button"
                className="input-style flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-input-icon transition-colors cursor-pointer hover:opacity-70"
              >
                <ArrowDownCircleIcon size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          className="rounded-full border border-white bg-white/50 px-3 py-2.5 text-sm font-normal text-black dark:border-white/10 dark:bg-white/5 dark:text-white cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onBack}
        >
          {actions.previousBasicInfo}
        </button>
        <button
          className="cursor-pointer rounded-full bg-primary px-3 py-2.5 text-sm font-normal text-white transition-colors hover:bg-primary-dark dark:text-black"
          onClick={onNext}
        >
          {actions.nextUpload}
        </button>
      </div>
    </main>
  );
}
