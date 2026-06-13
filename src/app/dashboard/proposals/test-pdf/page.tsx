"use client";

import { useState } from "react";
import ProposalPreview, { SAMPLE_DATA_MAP } from "@/features/proposals/components/ProposalPreview";

const TYPES = ["Technical", "Financial", "Visualization"] as const;

export default function TestPdfPage() {
  const [type, setType] = useState<keyof typeof SAMPLE_DATA_MAP>("Technical");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      {/* Type switcher — hidden on print */}
      <div className="print:hidden sticky top-0 z-10 flex items-center justify-center gap-2 border-b border-black/10 bg-white/80 py-3 backdrop-blur dark:border-white/10 dark:bg-[#0d0d0d]/80">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              type === t
                ? "bg-[#1C4D3E] text-white"
                : "bg-black/5 text-black/60 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ProposalPreview data={SAMPLE_DATA_MAP[type]} />
    </div>
  );
}
