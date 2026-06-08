"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import { useOptions } from "@/hooks/useOptions";
import arFlag from "@src/assets/dashboard/ar.svg";
import enFlag from "@src/assets/dashboard/en.svg";

const arFlagSrc = typeof arFlag === "string" ? arFlag : (arFlag as { src: string }).src;
const enFlagSrc = typeof enFlag === "string" ? enFlag : (enFlag as { src: string }).src;

export default function LanguageSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { options, loading } = useOptions("proposal-language");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const isOther = value && value !== "Arabic" && value !== "English";

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center gap-2">
        <button
          type="button"
          onClick={() => onChange("Arabic")}
          className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white dark:bg-white/5 px-3 py-2.5 text-xs cursor-pointer"
        >
          <Image src={arFlagSrc} alt="AR" width={20} height={20} className="rounded-full shrink-0" />
          <span className="text-black dark:text-white">Arabic</span>
          <span className={`ms-auto flex size-4 items-center justify-center rounded-full border-2 ${value === "Arabic" ? "border-primary" : "border-[#D0D5DD]"}`}>
            {value === "Arabic" && <span className="size-2 rounded-full bg-primary" />}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onChange("English")}
          className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white dark:bg-white/5 px-3 py-2.5 text-xs cursor-pointer"
        >
          <Image src={enFlagSrc} alt="EN" width={20} height={20} className="rounded-full shrink-0" />
          <span className="text-black dark:text-white">English</span>
          <span className={`ms-auto flex size-4 items-center justify-center rounded-full border-2 ${value === "English" ? "border-primary" : "border-[#D0D5DD]"}`}>
            {value === "English" && <span className="size-2 rounded-full bg-primary" />}
          </span>
        </button>
        {isOther && (
          <button
            type="button"
            className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white dark:bg-white/5 px-3 py-2.5 text-xs cursor-pointer"
          >
            <span className="text-black dark:text-white">{value}</span>
            <span className="ms-auto flex size-4 items-center justify-center rounded-full border-2 border-primary">
              <span className="size-2 rounded-full bg-primary" />
            </span>
          </button>
        )}
      </div>
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="input-style flex h-[44px] w-[44px] items-center justify-center rounded-full text-input-icon transition-colors cursor-pointer"
          aria-label="Open language options"
        >
          <ArrowDownCircleIcon size={20} />
        </button>
        {open && (
          <div className="absolute end-0 top-full z-50 mt-2 min-w-44 max-h-52 overflow-y-auto rounded-xl border border-black/8 bg-white dark:bg-[#1A1A1A] shadow-lg">
            {loading ? (
              <div className="flex items-center justify-center py-3">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => { onChange(opt.label); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-start text-xs transition-colors hover:bg-primary/8 dark:hover:bg-white/5 ${
                  value === opt.label ? "font-semibold text-primary dark:text-[#519A91]" : "text-black/70 dark:text-white/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
