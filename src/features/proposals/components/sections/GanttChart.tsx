"use client";

import { useEffect } from "react";

export interface GanttCard {
  id: number;
  title: string;
  from: string;
  to: string;
  row: number;
}

interface GanttData {
  weeks: { label: string; range: string; days: Date[] }[];
  flatDays: { day: number; weekIdx: number; dayInWeek: number; isWeekend: boolean; date: Date }[];
  monthGroups: { label: string; span: number }[];
  weekendBg: string;
  totalCols: number;
  dateToCol: (dateStr: string) => number;
}

function fmtGanttDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GanttChart({
  ganttData,
  ganttCards,
  openMenuId,
  setOpenMenuId,
  setGanttCards,
  setCardTitle,
  setPeriodFrom,
  setPeriodTo,
  ganttRows,
}: {
  ganttData: GanttData;
  ganttCards: GanttCard[];
  openMenuId: number | null;
  setOpenMenuId: (id: number | null) => void;
  setGanttCards: React.Dispatch<React.SetStateAction<GanttCard[]>>;
  setCardTitle: (v: string) => void;
  setPeriodFrom: (v: string) => void;
  setPeriodTo: (v: string) => void;
  ganttRows: number;
}) {
  useEffect(() => {
    if (openMenuId === null) return;
    function close() { setOpenMenuId(null); }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openMenuId, setOpenMenuId]);

  return (
    <div className="relative rounded-xl text-black/15 dark:text-white/10">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none"
          stroke="currentColor" strokeWidth="1" strokeDasharray="12 7" />
      </svg>
      <div className="overflow-x-auto rounded-xl scrollbar-hide">
        <table className="border-collapse text-xs" style={{ tableLayout: "fixed", minWidth: 700 }}>
          <colgroup>
            {ganttData.flatDays.map((_, i) => <col key={i} />)}
          </colgroup>
          <thead>
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
            {Array.from({ length: ganttRows }).map((_, rowIdx) => {
              const rowCards = ganttCards.filter((c) => c.row === rowIdx);
              return (
                <tr key={rowIdx}>
                  <td
                    colSpan={ganttData.totalCols}
                    className="relative h-16 p-0"
                    style={{ background: ganttData.weekendBg }}
                  >
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
                          style={{ left, width, background: "rgba(88,161,154,0.12)", borderLeft: "3px solid #58A19A", borderRadius: 4 }}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-black dark:text-white leading-tight">{card.title}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0">
                                <g clipPath="url(#gc)">
                                  <mask id="gm" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                                    <path d="M13.1694 0H0V13.1694H13.1694V0Z" fill="white" />
                                  </mask>
                                  <g mask="url(#gm)">
                                    <path d="M11.3859 7.27057C11.3859 9.92091 9.23487 12.0719 6.58454 12.0719C3.9342 12.0719 1.7832 9.92091 1.7832 7.27057C1.7832 4.62024 3.9342 2.46924 6.58454 2.46924C9.23487 2.46924 11.3859 4.62024 11.3859 7.27057Z" stroke="#58A19A" strokeWidth="0.878" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.584 4.39014V7.13376" stroke="#58A19A" strokeWidth="0.878" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.9375 1.09766H8.22984" stroke="#58A19A" strokeWidth="0.878" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                  </g>
                                </g>
                                <defs><clipPath id="gc"><rect width="13.1694" height="13.1694" fill="white" /></clipPath></defs>
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
                                <path d="M0 14.8155C0 14.379 0.173435 13.9602 0.482153 13.6515C0.79087 13.3428 1.20958 13.1694 1.64617 13.1694C2.08276 13.1694 2.50147 13.3428 2.81019 13.6515C3.11891 13.9602 3.29234 14.379 3.29234 14.8155C3.29234 15.2521 3.11891 15.6708 2.81019 15.9796C2.50147 16.2883 2.08276 16.4617 1.64617 16.4617C1.20958 16.4617 0.79087 16.2883 0.482153 15.9796C0.173435 15.6708 0 15.2521 0 14.8155ZM0 8.23086C0 7.79427 0.173435 7.37556 0.482153 7.06684C0.79087 6.75812 1.20958 6.58469 1.64617 6.58469C2.08276 6.58469 2.50147 6.75812 2.81019 7.06684C3.11891 7.37556 3.29234 7.79427 3.29234 8.23086C3.29234 8.66745 3.11891 9.08616 2.81019 9.39488C2.50147 9.7036 2.08276 9.87703 1.64617 9.87703C1.20958 9.87703 0.79087 9.7036 0.482153 9.39488C0.173435 9.08616 0 8.66745 0 8.23086ZM0 1.64617C0 1.20958 0.173435 0.79087 0.482153 0.482153C0.79087 0.173435 1.20958 0 1.64617 0C2.08276 0 2.50147 0.173435 2.81019 0.482153C3.11891 0.79087 3.29234 1.20958 3.29234 1.64617C3.29234 2.08276 3.11891 2.50147 2.81019 2.81019C2.50147 3.11891 2.08276 3.29234 1.64617 3.29234C1.20958 3.29234 0.79087 3.11891 0.482153 2.81019C0.173435 2.50147 0 2.08276 0 1.64617Z" fill="currentColor" />
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
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M16.04 3.02L8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.57-1.36-4.93 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setGanttCards((prev) => prev.filter((c) => c.id !== card.id)); setOpenMenuId(null); }}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  );
}
