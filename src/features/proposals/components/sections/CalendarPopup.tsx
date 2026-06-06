"use client";

import { useEffect, useRef, useState } from "react";

const RTL_DAY_ORDER = [6, 5, 4, 3, 2, 1, 0];
const LTR_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const RTL_DAY_NAMES = ["س", "ج", "خ", "أر", "ث", "إث", "أح"];
const LTR_DAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function CalendarPopup({
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

  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? todayDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? todayDate.getMonth());

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
    { month: "long", year: "numeric" },
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
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) onClose();
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

      <div className="mb-1 grid grid-cols-7">
        {dayNames.map((d, i) => (
          <div key={i} className="py-1 text-center text-[10px] font-medium text-black/30 dark:text-white/30">
            {d}
          </div>
        ))}
      </div>

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
