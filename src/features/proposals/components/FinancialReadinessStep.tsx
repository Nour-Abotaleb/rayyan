"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinancialReadinessStep({ onPass }: { onPass: () => void }) {
  const { t } = useLanguage();
  const r = t.dashboard.financialProposal.readiness;

  const [checked, setChecked] = useState<boolean[]>(
    Array(r.questions.length).fill(false),
  );
  const [failed, setFailed] = useState(false);

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
    setFailed(false);
  }

  function handleCheck() {
    if (checked.filter(Boolean).length >= 6) {
      onPass();
    } else {
      setFailed(true);
    }
  }

  return (
    <div className="layout-shell-x scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto py-6">
      <div className="w-full">
        <div className="rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/10 p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
          <div className="mb-6">
            <h1 className="text-base font-bold text-black dark:text-white">{r.title}</h1>
            <p className="mt-1 text-sm text-[#666666]">{r.subtitle}</p>
          </div>

          <div className="flex flex-col gap-3">
            {r.questions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl bg-white px-5 py-4 text-left transition-colors dark:bg-white/8 dark:hover:bg-white/10"
              >
                <span className="text-sm md:text-[15px] text-[#666666] dark:text-white/70">{q}</span>
                <span
                  className={`flex size-4.5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    checked[i]
                      ? "border-primary bg-primary"
                      : "border-[#667085] bg-white dark:border-white/20 dark:bg-transparent"
                  }`}
                >
                  {checked[i] && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              </button>
            ))}
          </div>

          {failed && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-900/20">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">{r.failTitle}</p>
              <p className="mt-0.5 text-xs text-red-500 dark:text-red-300">{r.failMessage}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleCheck}
              className="cursor-pointer rounded-full bg-primary px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:text-black"
            >
              {r.checkBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
