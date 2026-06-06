"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import PersonIcon from "@/icons/PersonIcon";
import CloseIcon from "@/icons/CloseIcon";
import ChipDropdownButton from "@/components/ChipDropdownButton";
import pdfIcon from "@src/assets/dashboard/pdf.svg";

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

const GANTT_ROWS = 5;

// Get Monday of the week containing `date`
function getMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  return d;
}

// Get Sunday of the week containing `date`
function getSunday(date: Date): Date {
  const mon = getMonday(date);
  mon.setDate(mon.getDate() + 6);
  return mon;
}

function formatWeekRange(days: Date[]): string {
  const first = days[0];
  const last = days[days.length - 1];
  const fm = first.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const lm = last.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  return fm === lm ? `${first.getDate()} – ${last.getDate()} ${fm}` : `${first.getDate()} ${fm} – ${last.getDate()} ${lm}`;
}

function fmtGanttDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

interface GanttCard { id: number; title: string; from: string; to: string; row: number; }

// RTL: week starts Saturday; LTR: week starts Monday
const RTL_DAY_ORDER = [6, 5, 4, 3, 2, 1, 0];
const LTR_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const RTL_DAY_NAMES = ["س", "ج", "خ", "أر", "ث", "إث", "أح"];
const LTR_DAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function CalendarPopup({
  value,
  onChange,
  onClose,
  isRtl,
}: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  isRtl: boolean;
}) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const selected = value ? new Date(value + "T00:00:00") : null;

  const [viewYear, setViewYear] = useState(
    selected?.getFullYear() ?? todayDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selected?.getMonth() ?? todayDate.getMonth()
  );

  const dayOrder = isRtl ? RTL_DAY_ORDER : LTR_DAY_ORDER;
  const dayNames = isRtl ? RTL_DAY_NAMES : LTR_DAY_NAMES;
  const weekendDays = isRtl ? [5, 6] : [0, 6];

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const offset = dayOrder.indexOf(firstDayOfMonth);

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    isRtl ? "ar-SA" : "en-US",
    { month: "long", year: "numeric" }
  );

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  function selectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    onChange(iso);
    onClose();
  }

  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  return (
    <div
      ref={wrapRef}
      className="absolute z-50 mt-2 w-72 rounded-2xl bg-white p-4 shadow-xl dark:bg-[#1e1e1e] dark:shadow-black/50"
      style={{ [isRtl ? "right" : "left"]: 0, top: "100%" }}
    >
      {/* Month navigation */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={isRtl ? nextMonth : prevMonth}
          className="flex h-7 w-7 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/5 dark:text-white/40 dark:hover:bg-white/10 cursor-pointer"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-black dark:text-white">{monthLabel}</span>
        <button
          type="button"
          onClick={isRtl ? prevMonth : nextMonth}
          className="flex h-7 w-7 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/5 dark:text-white/40 dark:hover:bg-white/10 cursor-pointer"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day name headers */}
      <div className="mb-1 grid grid-cols-7">
        {dayNames.map((d, i) => (
          <div key={i} className="py-1 text-center text-[10px] font-medium text-black/30 dark:text-white/30">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const jsDay = new Date(viewYear, viewMonth, day).getDay();
          const isWeekend = weekendDays.includes(jsDay);
          const isSelected =
            selected &&
            selected.getFullYear() === viewYear &&
            selected.getMonth() === viewMonth &&
            selected.getDate() === day;
          const isToday =
            todayDate.getFullYear() === viewYear &&
            todayDate.getMonth() === viewMonth &&
            todayDate.getDate() === day;
          return (
            <button
              key={i}
              type="button"
              onClick={() => selectDay(day)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-xl text-xs font-medium transition-colors cursor-pointer
                ${isSelected
                  ? "bg-primary text-white"
                  : isToday
                  ? "bg-primary/10 text-primary font-semibold"
                  : isWeekend
                  ? "text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateInput({
  value,
  onChange,
  placeholder,
  isRtl,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  isRtl: boolean;
}) {
  const [open, setOpen] = useState(false);
  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString(isRtl ? "ar-SA" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : placeholder;

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input-style w-full flex items-center justify-between gap-2 rounded-[44px] px-4 py-3.5 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className={`text-sm truncate ${value ? "text-black dark:text-white/80" : "text-input-icon"}`}>
          {displayValue}
        </span>
        <DateCalendarIcon size={18} className="shrink-0 text-input-icon" />
      </button>
      {open && (
        <CalendarPopup
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
          isRtl={isRtl}
        />
      )}
    </div>
  );
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

    // Start from Monday of the week containing the first card date (or today if no cards)
    let anchor = new Date(today.getFullYear(), today.getMonth(), 1);
    if (ganttCards.length > 0) {
      const earliest = ganttCards.reduce((min, c) => {
        const d = new Date(c.from + "T00:00:00");
        return d < min ? d : min;
      }, new Date(ganttCards[0].from + "T00:00:00"));
      if (earliest < anchor) anchor = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
    }

    // Always exactly 6 weeks starting from that Monday
    const start = getMonday(anchor);
    const allDays: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      allDays.push(d);
    }

    const totalCols = allDays.length;

    // Group into weeks of 7
    const weeks: { label: string; range: string; days: Date[] }[] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      const chunk = allDays.slice(i, i + 7);
      weeks.push({ label: `Week ${weeks.length + 1}`, range: formatWeekRange(chunk), days: chunk });
    }

    // Flat day descriptors (same shape as old FLAT_DAYS)
    const flatDays = weeks.flatMap((w, wi) =>
      w.days.map((d, di) => ({ day: d.getDate(), weekIdx: wi, dayInWeek: di, isWeekend: di >= 5, date: d }))
    );

    // Month groups for header
    const monthGroups: { label: string; span: number }[] = [];
    for (const fd of flatDays) {
      const label = fd.date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      if (!monthGroups.length || monthGroups[monthGroups.length - 1].label !== label)
        monthGroups.push({ label, span: 1 });
      else
        monthGroups[monthGroups.length - 1].span++;
    }

    // Weekend gradient for single-td body rows
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

  const [timelineFiles, setTimelineFiles] = useState<{ name: string; size: string }[]>([]);
  const [timelineFileObjects, setTimelineFileObjects] = useState<File[]>([]);
  const timelineFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openMenuId === null) return;
    function close() { setOpenMenuId(null); }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openMenuId]);

  function handleTimelineUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setTimelineFiles((prev) => [
      ...prev,
      ...files.map((f) => ({
        name: f.name.replace(/\.[^.]+$/, ""),
        size: f.size < 1024 * 1024
          ? `${(f.size / 1024).toFixed(1)}KB`
          : `${(f.size / (1024 * 1024)).toFixed(1)}MB`,
      })),
    ]);
    setTimelineFileObjects((prev) => [...prev, ...files]);
    e.target.value = "";
  }

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

  const sectionEndpoints = [
    "admin-compliance",
    "technical-methodology",
    "management-resources",
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

        {/* Gantt chart */}
        <div className="relative rounded-xl text-black/15 dark:text-white/10">
          {/* Custom dash border — longer dashes, wider gaps */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
            <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none"
              stroke="currentColor" strokeWidth="1" strokeDasharray="12 7" />
          </svg>
        <div className="rounded-xl">
          <table className="w-full border-collapse text-xs" style={{ tableLayout: "fixed" }}>
            <colgroup>
              {ganttData.flatDays.map((_, i) => (
                <col key={i} />
              ))}
            </colgroup>
            <thead>
              {/* Month row */}
              <tr className="border-b border-black/10 bg-primary/[0.03] dark:border-white/10 dark:bg-primary/[0.06]">
                {ganttData.monthGroups.map((m) => (
                  <th
                    key={m.label}
                    colSpan={m.span}
                    className="border-e border-black/10 px-2 py-3 text-center text-[10px] font-semibold text-black/40 dark:border-white/10 dark:text-white/35 last:border-e-0"
                  >
                    {m.label}
                  </th>
                ))}
              </tr>
              {/* Week row */}
              <tr className="border-b border-black/10 dark:border-white/10">
                {ganttData.weeks.map((w) => (
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
              {/* Days row */}
              <tr>
                {ganttData.flatDays.map(({ day, isWeekend, dayInWeek }, i) => (
                  <td
                    key={i}
                    className={`py-1.5 text-center text-[8px] text-black/25 dark:text-white/20 ${isWeekend ? "bg-primary/[0.02]" : ""}`}
                    style={{
                      ...(dayInWeek === 5 && { borderLeft: "1px solid rgba(72,137,129,0.3)" }),
                      ...(dayInWeek === 6 && { borderRight: "1px solid rgba(72,137,129,0.3)" }),
                    }}
                  >
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: GANTT_ROWS }).map((_, rowIdx) => {
                const rowCards = ganttCards.filter((c) => c.row === rowIdx);
                return (
                  <tr key={rowIdx}>
                    <td
                      colSpan={ganttData.totalCols}
                      className="relative h-16 p-0"
                      style={{ background: ganttData.weekendBg }}
                    >
                      {/* Weekend vertical border lines */}
                      {Array.from({ length: ganttData.weeks.length }, (_, wi) => [
                        <div key={`wl${wi}`} className="absolute inset-y-0 w-px pointer-events-none" style={{ left: `${((wi * 7 + 5) / ganttData.totalCols) * 100}%`, background: "rgba(0,0,0,0.04)" }} />,
                        <div key={`wr${wi}`} className="absolute inset-y-0 w-px pointer-events-none" style={{ left: `${((wi * 7 + 7) / ganttData.totalCols) * 100}%`, background: "rgba(0,0,0,0.04)" }} />,
                      ])}
                      {rowCards.map((card) => {
                        const startCol = ganttData.dateToCol(card.from);
                        const endCol = ganttData.dateToCol(card.to);
                        const left = `${(startCol / ganttData.totalCols) * 100}%`;
                        const width = `${((endCol - startCol + 1) / ganttData.totalCols) * 100}%`;
                        return (
                          <div
                            key={card.id}
                            className="absolute inset-y-2 flex items-center gap-1.5 px-2"
                            style={{
                              left,
                              width,
                              background: "rgba(88,161,154,0.12)",
                              borderLeft: "3px solid #58A19A",
                              borderRadius: 4,
                            }}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-black dark:text-white leading-tight">{card.title}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0">
                                  <g clipPath="url(#gc)">
                                    <mask id="gm" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                      <path d="M13.1694 0H0V13.1694H13.1694V0Z" fill="white"/>
                                    </mask>
                                    <g mask="url(#gm)">
                                      <path d="M11.3859 7.27057C11.3859 9.92091 9.23487 12.0719 6.58454 12.0719C3.9342 12.0719 1.7832 9.92091 1.7832 7.27057C1.7832 4.62024 3.9342 2.46924 6.58454 2.46924C9.23487 2.46924 11.3859 4.62024 11.3859 7.27057Z" stroke="#58A19A" strokeWidth="0.878" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M6.584 4.39014V7.13376" stroke="#58A19A" strokeWidth="0.878" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M4.9375 1.09766H8.22984" stroke="#58A19A" strokeWidth="0.878" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                  </g>
                                  <defs><clipPath id="gc"><rect width="13.1694" height="13.1694" fill="white"/></clipPath></defs>
                                </svg>
                                <p className="text-xs text-black leading-tight truncate">
                                  <span className="text-[#7D7D7D]">From</span> {fmtGanttDate(card.from)} · <span className="text-[#7D7D7D]">To</span> {fmtGanttDate(card.to)}
                                </p>
                              </div>
                            </div>
                            <div className="relative shrink-0">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === card.id ? null : card.id); }}
                                className="flex h-6 w-4 items-center justify-center cursor-pointer hover:opacity-70 transition-opacity text-black dark:text-white"
                              >
                                <svg width="4" height="17" viewBox="0 0 4 17" fill="none">
                                  <path d="M0 14.8155C0 14.379 0.173435 13.9602 0.482153 13.6515C0.79087 13.3428 1.20958 13.1694 1.64617 13.1694C2.08276 13.1694 2.50147 13.3428 2.81019 13.6515C3.11891 13.9602 3.29234 14.379 3.29234 14.8155C3.29234 15.2521 3.11891 15.6708 2.81019 15.9796C2.50147 16.2883 2.08276 16.4617 1.64617 16.4617C1.20958 16.4617 0.79087 16.2883 0.482153 15.9796C0.173435 15.6708 0 15.2521 0 14.8155ZM0 8.23086C0 7.79427 0.173435 7.37556 0.482153 7.06684C0.79087 6.75812 1.20958 6.58469 1.64617 6.58469C2.08276 6.58469 2.50147 6.75812 2.81019 7.06684C3.11891 7.37556 3.29234 7.79427 3.29234 8.23086C3.29234 8.66745 3.11891 9.08616 2.81019 9.39488C2.50147 9.7036 2.08276 9.87703 1.64617 9.87703C1.20958 9.87703 0.79087 9.7036 0.482153 9.39488C0.173435 9.08616 0 8.66745 0 8.23086ZM0 1.64617C0 1.20958 0.173435 0.79087 0.482153 0.482153C0.79087 0.173435 1.20958 0 1.64617 0C2.08276 0 2.50147 0.173435 2.81019 0.482153C3.11891 0.79087 3.29234 1.20958 3.29234 1.64617C3.29234 2.08276 3.11891 2.50147 2.81019 2.81019C2.50147 3.11891 2.08276 3.29234 1.64617 3.29234C1.20958 3.29234 0.79087 3.11891 0.482153 2.81019C0.173435 2.50147 0 2.08276 0 1.64617Z" fill="currentColor"/>
                                </svg>
                              </button>
                              {openMenuId === card.id && (
                                <div
                                  className="absolute z-[9999] end-0 top-full mt-1 w-28 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-[#1e1e1e]"
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCardTitle(card.title);
                                      setPeriodFrom(card.from);
                                      setPeriodTo(card.to);
                                      setGanttCards((prev) => prev.filter((c) => c.id !== card.id));
                                      setOpenMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/10 cursor-pointer"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.04 3.02L8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.57-1.36-4.93 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setGanttCards((prev) => prev.filter((c) => c.id !== card.id));
                                      setOpenMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
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
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
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
          <PlusIcon />
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
                aria-label="Remove file"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4ZM16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59L14.59 8L16 9.41L13.41 12L16 14.59Z" fill="#858585"/>
                  <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#858585"/>
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
              <ChipDropdownButton
                optionType={sectionEndpoints[si]}
                activeChips={sectionChips[si]}
                onAdd={(chip) =>
                  setSectionChips((prev) =>
                    prev.map((row, ri) =>
                      ri === si && !row.includes(chip) ? [...row, chip] : row
                    )
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
              timelineFiles: timelineFileObjects,
              sections: optionalSections.map((title, i) => ({ title, chips: sectionChips[i] })),
            })
          }
        >
          {actions.nextUpload}
        </button>
      </div>
    </main>
  );
}
