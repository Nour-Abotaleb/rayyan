"use client";

import { useState } from "react";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import CalendarPopup from "./CalendarPopup";

export default function DateInput({
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
