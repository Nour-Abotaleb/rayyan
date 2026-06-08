"use client";

import { useEffect, useRef, useState } from "react";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import { useOptions } from "@/hooks/useOptions";

export default function DropdownSelect({
  label,
  required,
  optional,
  optionalLabel,
  placeholder,
  icon,
  value,
  onChange,
  optionType,
  error,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  optionType: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const { options, loading } = useOptions(optionType);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label}
        {required && <span> *</span>}
        {optional && (
          <span className="font-[550] text-black dark:text-white">
            {" "}({optionalLabel ?? "Optional"})
          </span>
        )}
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div ref={containerRef} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
          />
          <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center gap-1 text-input-icon">
            {icon}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="input-style flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-input-icon transition-colors cursor-pointer hover:opacity-70"
          aria-label="Open options"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <ArrowDownCircleIcon size={20} />
          )}
        </button>

        {open && (
          <div className="absolute top-full start-0 end-[52px] z-50 mt-1 max-h-52 overflow-y-auto rounded-xl border border-white bg-white shadow-lg dark:border-white/10 dark:bg-[#1c1c1e]">
            {options.length === 0 ? (
              <p className="py-3 text-center text-xs text-black/40 dark:text-white/30">
                No options available.
              </p>
            ) : (
              options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                    value === opt.value ? "bg-primary/10 font-medium text-primary" : "text-black dark:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
