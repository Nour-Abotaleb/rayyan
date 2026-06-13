"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPdfBanner() {
  const [dismissed, setDismissed] = useState(false);
  const router = useRouter();

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-center px-4 py-2.5 rounded-2xl bg-[#1C4D3E]/8 border border-[#1C4D3E]/20 dark:bg-[#488981]/10 dark:border-[#488981]/20 mx-auto w-fit max-w-full">
      <div className="flex flex-1 items-center justify-center gap-3 flex-wrap">
        {/* icon */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1C4D3E]/10 text-[#1C4D3E] dark:bg-[#488981]/20 dark:text-[#488981]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
        </div>

        <p className="text-sm font-medium text-[#1C4D3E] dark:text-[#488981]">
          PDF proposal preview is ready — test all three proposal types before the API goes live.
        </p>

        <button
          type="button"
          onClick={() => router.push("/dashboard/proposals/test-pdf")}
          className="shrink-0 rounded-full bg-[#1C4D3E] px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-80 cursor-pointer dark:bg-[#488981] dark:text-black"
        >
          Test PDF
        </button>
      </div>

      {/* dismiss */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="ml-3 shrink-0 cursor-pointer rounded-full p-1 text-[#1C4D3E]/40 transition-colors hover:bg-[#1C4D3E]/10 hover:text-[#1C4D3E] dark:text-[#488981]/40 dark:hover:bg-[#488981]/10 dark:hover:text-[#488981]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
