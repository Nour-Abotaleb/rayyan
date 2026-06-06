"use client";

import { useEffect, useRef, useState } from "react";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import { useOptions } from "@/hooks/useOptions";

export default function ChipDropdownButton({
  optionType,
  activeChips,
  onAdd,
}: {
  optionType: string;
  activeChips: string[];
  onAdd: (chip: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { options, loading } = useOptions(optionType);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input-style flex h-[44px] w-[44px] items-center justify-center rounded-full text-input-icon transition-colors cursor-pointer hover:opacity-70"
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <ArrowDownCircleIcon size={20} />
        )}
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-1 max-h-52 w-52 overflow-y-auto rounded-xl border border-white bg-white shadow-lg dark:border-white/10 dark:bg-[#1c1c1e]">
          {options.length === 0 ? (
            <p className="py-3 text-center text-xs text-black/40 dark:text-white/30">
              No options available.
            </p>
          ) : (
            options.map((opt) => {
              const selected = activeChips.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onAdd(opt)}
                  className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                    selected ? "text-primary font-medium" : "text-black dark:text-white"
                  }`}
                >
                  <span>{opt}</span>
                  {selected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
