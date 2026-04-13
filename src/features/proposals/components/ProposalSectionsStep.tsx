"use client";

import { useState } from "react";
import Image from "next/image";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import step2Bg from "@src/assets/dashboard/step2-bg.svg";
import CloseIcon from "@/icons/CloseIcon";

// ── Icons ──────────────────────────────────────────────────────────
function DocIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        opacity="0.4"
        d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
        fill="#488981"
      />
      <path
        d="M15.7997 2.21048C15.3897 1.80048 14.6797 2.08048 14.6797 2.65048V6.14048C14.6797 7.60048 15.9197 8.81048 17.4297 8.81048C18.3797 8.82048 19.6997 8.82048 20.8297 8.82048C21.3997 8.82048 21.6997 8.15048 21.2997 7.75048C19.8597 6.30048 17.2797 3.69048 15.7997 2.21048Z"
        fill="#488981"
      />
      <path
        d="M11.5275 12.47L9.5275 10.47C9.5175 10.46 9.5075 10.46 9.5075 10.45C9.4475 10.39 9.3675 10.34 9.2875 10.3C9.2775 10.3 9.2775 10.3 9.2675 10.3C9.1875 10.27 9.1075 10.26 9.0275 10.25C8.9975 10.25 8.9775 10.25 8.9475 10.25C8.8875 10.25 8.8175 10.27 8.7575 10.29C8.7275 10.3 8.7075 10.31 8.6875 10.32C8.6075 10.36 8.5275 10.4 8.4675 10.47L6.4675 12.47C6.1775 12.76 6.1775 13.24 6.4675 13.53C6.7575 13.82 7.2375 13.82 7.5275 13.53L8.2475 12.81V17C8.2475 17.41 8.5875 17.75 8.9975 17.75C9.4075 17.75 9.7475 17.41 9.7475 17V12.81L10.4675 13.53C10.6175 13.68 10.8075 13.75 10.9975 13.75C11.1875 13.75 11.3775 13.68 11.5275 13.53C11.8175 13.24 11.8175 12.76 11.5275 12.47Z"
        fill="#488981"
      />
    </svg>
  );
}

function EnterTextIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1.16211 3.46V2.57917C1.16211 1.98417 1.64628 1.5 2.24128 1.5H9.77794C10.3729 1.5 10.8571 1.98417 10.8571 2.57917V3.46"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.00684 10.5592V1.9375"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.02441 10.5586H7.27941"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.97949 6.03125H12.0687C12.4945 6.03125 12.8387 6.37542 12.8387 6.80125V7.26792"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.37891 12.5018V6.3418"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.12988 12.5H10.6265"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadFileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5.25033 12.8327H8.75033C11.667 12.8327 12.8337 11.666 12.8337 8.74935V5.24935C12.8337 2.33268 11.667 1.16602 8.75033 1.16602H5.25033C2.33366 1.16602 1.16699 2.33268 1.16699 5.24935V8.74935C1.16699 11.666 2.33366 12.8327 5.25033 12.8327Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 5.54687L7 3.79688L8.75 5.54687"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 3.79688V8.46354"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9.63086C5.76917 10.3892 8.23083 10.3892 10.5 9.63086"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FromRFPIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M4.66699 1.16602V2.91602"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33301 1.16602V2.91602"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.08301 6.41602H8.74967"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.08301 8.75H6.99967"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 12.8327H5.25C2.33333 12.8327 1.75 11.631 1.75 9.22768V5.62852C1.75 2.88685 2.72417 2.15185 4.66667 2.04102H9.33333C11.2758 2.14602 12.25 2.88685 12.25 5.62852V9.33268"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.25 9.33398L8.75 12.834V11.084C8.75 9.91732 9.33333 9.33398 10.5 9.33398H12.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ComponentsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 5.15V8.85C22 11.1 21.1 12 18.85 12H16.15C13.9 12 13 11.1 13 8.85V5.15C13 2.9 13.9 2 16.15 2H18.85C21.1 2 22 2.9 22 5.15Z"
        stroke="#A0A3BD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 15.15V18.85C11 21.1 10.1 22 7.85 22H5.15C2.9 22 2 21.1 2 18.85V15.15C2 12.9 2.9 12 5.15 12H7.85C10.1 12 11 12.9 11 15.15Z"
        stroke="#A0A3BD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
        stroke="#A0A3BD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75"
        stroke="#A0A3BD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────
const sections = [
  {
    title: "Project Deliverables",
    description:
      "AI will automatically extract Project Deliverables Assessment from your uploaded RFP documents",
  },
  {
    title: "Project Timeline",
    description:
      "AI will automatically extract Project Timeline Assessment from your uploaded RFP documents",
  },
  {
    title: "Proposed Team",
    description:
      "AI will automatically extract Proposed Team Assessment from your uploaded RFP documents",
  },
];

const initialChips = ["Proposal Title", "Proposal Title", "Proposal Title"];

// ── Component ──────────────────────────────────────────────────────
export default function ProposalSectionsStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [chips, setChips] = useState(initialChips);
  const step2BgUrl = typeof step2Bg === "string" ? step2Bg : step2Bg.src;

  return (
    <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/30 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
      {/* Section cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((card) => (
          <div key={card.title} className="flex flex-col gap-3">
            <section className="relative flex flex-col gap-3 overflow-hidden p-3 backdrop-blur-sm aspect-316/274">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-no-repeat opacity-100 dark:opacity-15"
                style={{
                  backgroundImage: `url(${step2BgUrl})`,
                  backgroundPosition: "top center",
                  backgroundSize: "100% 100%",
                }}
              />

              <div className="relative z-10 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-black dark:text-white">
                  {card.title}
                </h3>

                <div className="flex flex-1 items-stretch mt-2">
                  <div className="flex shrink-0 items-stretch">
                    <div className="flex w-12 items-center justify-center bg-white dark:bg-[#0D0D0D] rounded-tl-lg rounded-bl-lg border border-[#8DB7B6]/40 min-w-21">
                      <DocIcon size={34} />
                    </div>
                  </div>
                  <p className="text-xs font-light leading-relaxed text-black dark:text-white rounded-tr-lg rounded-br-lg border border-[#8DB7B6]/40 bg-[#EBF3F2] dark:bg-[#162422] px-2 py-1">
                    {card.description}
                  </p>
                </div>
              </div>
            </section>

            <div className="flex w-full items-center gap-2">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white bg-white/50 p-2 text-xs font-normal text-black transition-colors hover:bg-[#F6F4F0] dark:border-[#0D0D0D] dark:bg-[#0D0D0D]/50 dark:text-white dark:hover:bg-[#141414] cursor-pointer"
              >
                <EnterTextIcon />
                Enter Text
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white bg-white/50 p-2 text-xs font-normal text-black transition-colors hover:bg-[#F6F4F0] dark:border-[#0D0D0D] dark:bg-[#0D0D0D]/50 dark:text-white dark:hover:bg-[#141414] cursor-pointer"
              >
                <UploadFileIcon />
                Upload File
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary p-2 text-xs font-normal text-white transition-colors hover:bg-primary-dark dark:bg-[#519A91] dark:text-black cursor-pointer"
              >
                <FromRFPIcon />
                From RFP
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proposal Components */}
      <div>
        <div className="flex items-center justify-between gap-4 pt-4 pb-2">
          <h3 className="text-sm font-bold text-black dark:text-white tracking-wide">
            Proposal Components
          </h3>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <div className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-black  dark:text-zinc-100">
              <div className="flex flex-wrap items-center gap-2">
                {chips.map((t, idx) => (
                  <span
                    key={`${t}-${idx}`}
                    className="inline-flex items-center gap-2"
                  >
                    <span className="inline-flex items-center rounded-full bg-[#E4ECEE] px-3 py-1.5 text-xs font-normal text-black dark:bg-[#1B272B] dark:text-white">
                      {t}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setChips((prev) => prev.filter((_, j) => j !== idx))
                      }
                      className="-ms-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E4ECEE] text-sm leading-none text-black transition-colors hover:text-black dark:bg-[#1B272B] dark:text-white dark:hover:text-white cursor-pointer"
                      aria-label="Remove"
                    >
                      <CloseIcon size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center gap-1 text-input-icon">
              <ComponentsIcon />
            </span>
          </div>

          <button
            type="button"
            className="input-style flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-input-icon transition-colors cursor-pointer"
            aria-label="Open"
          >
            <ArrowDownCircleIcon size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          className="rounded-full border border-white bg-white/50 px-3 py-2.5 text-sm font-normal text-black dark:text-white cursor-pointer"
          onClick={onBack}
        >
          Previous: Basic Info
        </button>
        <button
          className="cursor-pointer rounded-full bg-primary px-3 py-2.5 text-sm font-normal text-white transition-colors hover:bg-primary-dark dark:text-black"
          onClick={onNext}
        >
          Next: Sections
        </button>
      </div>
    </main>
  );
}
