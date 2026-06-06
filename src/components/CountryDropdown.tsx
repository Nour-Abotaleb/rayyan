"use client";

import { useEffect, useRef, useState } from "react";

export interface Country {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: "SA", name: "Saudi Arabia",   dial: "+966", flag: "SA" },
  { code: "AE", name: "UAE",            dial: "+971", flag: "AE" },
  { code: "KW", name: "Kuwait",         dial: "+965", flag: "KW" },
  { code: "QA", name: "Qatar",          dial: "+974", flag: "QA" },
  { code: "BH", name: "Bahrain",        dial: "+973", flag: "BH" },
  { code: "OM", name: "Oman",           dial: "+968", flag: "OM" },
  { code: "JO", name: "Jordan",         dial: "+962", flag: "JO" },
  { code: "EG", name: "Egypt",          dial: "+20",  flag: "EG" },
  { code: "LB", name: "Lebanon",        dial: "+961", flag: "LB" },
  { code: "IQ", name: "Iraq",           dial: "+964", flag: "IQ" },
  { code: "SY", name: "Syria",          dial: "+963", flag: "SY" },
  { code: "YE", name: "Yemen",          dial: "+967", flag: "YE" },
  { code: "MA", name: "Morocco",        dial: "+212", flag: "MA" },
  { code: "TN", name: "Tunisia",        dial: "+216", flag: "TN" },
  { code: "DZ", name: "Algeria",        dial: "+213", flag: "DZ" },
  { code: "LY", name: "Libya",          dial: "+218", flag: "LY" },
  { code: "SD", name: "Sudan",          dial: "+249", flag: "SD" },
  { code: "TR", name: "Turkey",         dial: "+90",  flag: "TR" },
  { code: "PK", name: "Pakistan",       dial: "+92",  flag: "PK" },
  { code: "IN", name: "India",          dial: "+91",  flag: "IN" },
  { code: "US", name: "United States",  dial: "+1",   flag: "US" },
  { code: "GB", name: "United Kingdom", dial: "+44",  flag: "GB" },
  { code: "DE", name: "Germany",        dial: "+49",  flag: "DE" },
  { code: "FR", name: "France",         dial: "+33",  flag: "FR" },
  { code: "IT", name: "Italy",          dial: "+39",  flag: "IT" },
  { code: "ES", name: "Spain",          dial: "+34",  flag: "ES" },
  { code: "CA", name: "Canada",         dial: "+1",   flag: "CA" },
  { code: "AU", name: "Australia",      dial: "+61",  flag: "AU" },
  { code: "JP", name: "Japan",          dial: "+81",  flag: "JP" },
  { code: "CN", name: "China",          dial: "+86",  flag: "CN" },
];

export function getFlagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");
}

function SearchInputIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9299 20.6898L22.0099 23.0098"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CountryDropdown({
  selected,
  onSelect,
  onClose,
}: {
  selected: Country;
  onSelect: (c: Country) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
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

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search),
  );

  return (
    <div
      ref={wrapRef}
      className="absolute start-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-[#1e1e1e] dark:shadow-black/50"
    >
      <div className="relative border-b border-black/5 p-2 dark:border-white/10">
        <span className="pointer-events-none absolute inset-y-0 start-5 flex items-center text-[#A0A3BD]">
          <SearchInputIcon />
        </span>
        <input
          autoFocus
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search country..."
          className="w-full rounded-xl bg-black/5 py-2 ps-7 pe-3 text-xs text-black placeholder:text-[#A0A3BD] focus:outline-none dark:bg-white/10 dark:text-white"
        />
      </div>
      <ul className="max-h-56 overflow-y-auto py-1">
        {filtered.length === 0 ? (
          <li className="px-4 py-3 text-xs text-[#A0A3BD]">No results</li>
        ) : (
          filtered.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => { onSelect(c); onClose(); }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/[0.08] cursor-pointer ${
                  selected.code === c.code
                    ? "text-primary font-medium"
                    : "text-black dark:text-white"
                }`}
              >
                <span className="text-xl leading-none">{getFlagEmoji(c.flag)}</span>
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
                <span className="shrink-0 text-xs text-[#A0A3BD]">{c.dial}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
