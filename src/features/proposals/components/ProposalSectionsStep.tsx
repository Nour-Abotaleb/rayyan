"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import CloseIcon from "@/icons/CloseIcon";
import PlusIcon from "@/icons/PlusIcon";
import ChipDropdownButton from "@/components/ChipDropdownButton";
import DateInput from "@/features/proposals/components/sections/DateInput";
import GanttChart, { type GanttCard } from "@/features/proposals/components/sections/GanttChart";
import pdfIcon from "@src/assets/dashboard/pdf.svg";

const GANTT_ROWS = 5;

function UploadFileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.25033 12.8327H8.75033C11.667 12.8327 12.8337 11.666 12.8337 8.74935V5.24935C12.8337 2.33268 11.667 1.16602 8.75033 1.16602H5.25033C2.33366 1.16602 1.16699 2.33268 1.16699 5.24935V8.74935C1.16699 11.666 2.33366 12.8327 5.25033 12.8327Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.25 5.54687L7 3.79688L8.75 5.54687" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 3.79688V8.46354" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 9.63086C5.76917 10.3892 8.23083 10.3892 10.5 9.63086" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComponentsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 5.15V8.85C22 11.1 21.1 12 18.85 12H16.15C13.9 12 13 11.1 13 8.85V5.15C13 2.9 13.9 2 16.15 2H18.85C21.1 2 22 2.9 22 5.15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 15.15V18.85C11 21.1 10.1 22 7.85 22H5.15C2.9 22 2 21.1 2 18.85V15.15C2 12.9 2.9 12 5.15 12H7.85C10.1 12 11 12.9 11 15.15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  return d;
}

function formatWeekRange(days: Date[]): string {
  const first = days[0];
  const last = days[days.length - 1];
  const fm = first.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const lm = last.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  return fm === lm
    ? `${first.getDate()} – ${last.getDate()} ${fm}`
    : `${first.getDate()} ${fm} – ${last.getDate()} ${lm}`;
}

export interface SectionsStepData {
  ganttCards: { title: string; from: string; to: string }[];
  timelineFiles: File[];
  sections: { title: string; chips: string[] }[];
}

export default function ProposalSectionsStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (data: SectionsStepData) => void;
}) {
  const { t, dir } = useLanguage();
  const isRtl = dir === "rtl";
  const s = t.dashboard.newProposal.sections;
  const actions = t.dashboard.newProposal.actions;

  const [cardTitle, setCardTitle] = useState("");
  const [periodFrom, setPeriodFrom] = useState("");
  const [periodTo, setPeriodTo] = useState("");
  const [ganttCards, setGanttCards] = useState<GanttCard[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const ganttData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let anchor = new Date(today.getFullYear(), today.getMonth(), 1);
    if (ganttCards.length > 0) {
      const earliest = ganttCards.reduce((min, c) => {
        const d = new Date(c.from + "T00:00:00");
        return d < min ? d : min;
      }, new Date(ganttCards[0].from + "T00:00:00"));
      if (earliest < anchor) anchor = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
    }

    const start = getMonday(anchor);
    const allDays: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      allDays.push(d);
    }

    const totalCols = allDays.length;
    const weeks: { label: string; range: string; days: Date[] }[] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      const chunk = allDays.slice(i, i + 7);
      weeks.push({ label: `Week ${weeks.length + 1}`, range: formatWeekRange(chunk), days: chunk });
    }

    const flatDays = weeks.flatMap((w, wi) =>
      w.days.map((d, di) => ({ day: d.getDate(), weekIdx: wi, dayInWeek: di, isWeekend: di >= 5, date: d })),
    );

    const monthGroups: { label: string; span: number }[] = [];
    for (const fd of flatDays) {
      const label = fd.date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      if (!monthGroups.length || monthGroups[monthGroups.length - 1].label !== label)
        monthGroups.push({ label, span: 1 });
      else
        monthGroups[monthGroups.length - 1].span++;
    }

    const weekendBg = `linear-gradient(to right, ${weeks.map((_, wi) => {
      const s = ((wi * 7 + 5) / totalCols * 100).toFixed(3);
      const e = ((wi * 7 + 7) / totalCols * 100).toFixed(3);
      return `transparent ${s}%,rgba(72,137,129,0.02) ${s}%,rgba(72,137,129,0.02) ${e}%,transparent ${e}%`;
    }).join(",")})`;

    function dateToCol(dateStr: string) {
      const d = new Date(dateStr + "T00:00:00");
      const days = Math.round((d.getTime() - start.getTime()) / 864e5);
      return Math.max(0, Math.min(days, totalCols - 1));
    }

    return { weeks, flatDays, monthGroups, weekendBg, totalCols, dateToCol };
  }, [ganttCards]);

  const [timelineFiles, setTimelineFiles] = useState<{ file: File; name: string; size: string }[]>([]);
  const timelineFileRef = useRef<HTMLInputElement>(null);

  function handleTimelineUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setTimelineFiles((prev) => [
      ...prev,
      ...files.map((f) => ({
        file: f,
        name: f.name.replace(/\.[^.]+$/, ""),
        size: f.size < 1024 * 1024
          ? `${(f.size / 1024).toFixed(1)}KB`
          : `${(f.size / (1024 * 1024)).toFixed(1)}MB`,
      })),
    ]);
    e.target.value = "";
  }

  const [sectionChips, setSectionChips] = useState<string[][]>([[], [], []]);

  const optionalSections = [
    s.adminComplianceTitle,
    s.technicalMethodologyTitle,
    s.managementResourcesTitle,
  ];

  const sectionEndpoints = ["admin-compliance", "technical-methodology", "management-resources"];

  function removeChip(si: number, ci: number) {
    setSectionChips((prev) =>
      prev.map((row, ri) => (ri === si ? row.filter((_, j) => j !== ci) : row)),
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
            onClick={() => timelineFileRef.current?.click()}
            className="flex items-center gap-1.5 rounded-full border border-white bg-white/50 px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer"
          >
            <UploadFileIcon />
            {s.actions.uploadFile}
          </button>
          <input
            ref={timelineFileRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleTimelineUpload}
          />
        </div>

        <GanttChart
          ganttData={ganttData}
          ganttCards={ganttCards}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          setGanttCards={setGanttCards}
          setCardTitle={setCardTitle}
          setPeriodFrom={setPeriodFrom}
          setPeriodTo={setPeriodTo}
          ganttRows={GANTT_ROWS}
        />
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
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-black dark:text-white">
            {s.projectPeriodLabel} <span>*</span>
          </label>
          <div className="flex gap-2">
            <DateInput value={periodFrom} onChange={setPeriodFrom} placeholder={isRtl ? "من" : "From"} isRtl={isRtl} />
            <DateInput value={periodTo} onChange={setPeriodTo} placeholder={isRtl ? "إلى" : "To"} isRtl={isRtl} />
          </div>
        </div>

        <button
          type="button"
          disabled={!cardTitle || !periodFrom || !periodTo}
          onClick={() => {
            setGanttCards((prev) => [
              ...prev,
              { id: Date.now(), title: cardTitle, from: periodFrom, to: periodTo, row: prev.length % GANTT_ROWS },
            ]);
            setCardTitle("");
            setPeriodFrom("");
            setPeriodTo("");
          }}
          className="mb-px flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-primary text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <PlusIcon size={20} />
        </button>
      </div>

      {/* Uploaded timeline files */}
      {timelineFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          {timelineFiles.map((file, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/60 px-4 py-3 dark:bg-white/5" style={{ border: "1px solid #E7E7E788", borderRadius: 12 }}>
              <Image src={pdfIcon} alt="PDF" width={36} height={36} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-black dark:text-white">{file.name}</p>
                <p className="text-xs text-[#6B7280]">{file.size}</p>
              </div>
              <button
                type="button"
                onClick={() => setTimelineFiles((prev) => prev.filter((_, j) => j !== i))}
                className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Remove timeline file"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4ZM16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59L14.59 8L16 9.41L13.41 12L16 14.59Z" fill="#858585" />
                  <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#858585" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

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
                <div className="input-style flex h-[44px] w-full items-center overflow-x-auto rounded-[44px] ps-4 pe-11 text-sm font-[300] text-black dark:text-zinc-100">
                  <div className="flex flex-nowrap items-center gap-2">
                    {sectionChips[si].map((chip, ci) => (
                      <span key={ci} className="inline-flex items-center gap-2">
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
              <ChipDropdownButton
                optionType={sectionEndpoints[si]}
                activeChips={sectionChips[si]}
                onAdd={(chip) =>
                  setSectionChips((prev) =>
                    prev.map((row, ri) => ri === si && !row.includes(chip) ? [...row, chip] : row),
                  )
                }
              />
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
          onClick={() =>
            onNext({
              ganttCards: ganttCards.map(({ title, from, to }) => ({ title, from, to })),
              timelineFiles: timelineFiles.map((f) => f.file),
              sections: optionalSections
                .map((title, i) => ({ title, chips: sectionChips[i] }))
                .filter((s) => s.chips.length > 0),
            })
          }
        >
          {actions.nextUpload}
        </button>
      </div>
    </main>
  );
}
