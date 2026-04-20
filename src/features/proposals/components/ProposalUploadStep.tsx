"use client";

import { useState } from "react";
import Step2Bg from "./Step2Bg";
import SecondRowBg from "./SecondRowBg";
import UploadCloudIcon from "@/icons/UploadCloudIcon";

type UploadCard = {
  title: string;
  required?: boolean;
};

const uploadCards: UploadCard[] = [
  { title: "RFP Documents", required: true },
  { title: "Resume Documents" },
  { title: "Team Documents" },
  { title: "Certificates & Registrations" },
  { title: "Other Supporting Documents" },
];

function UploadBox({
  title,
  required,
  variant = "default",
}: {
  title: string;
  required?: boolean;
  variant?: "default" | "compact";
}) {
  const [tab, setTab] = useState<"system" | "db">("system");
  const isCompact = variant === "compact";

  return (
    <section className="flex flex-col gap-3">
      <div
        className={[
          "relative flex min-h-0 flex-col overflow-hidden backdrop-blur-sm px-4 pt-4",
          isCompact ? "aspect-[316/274] md:aspect-[481/274]" : "aspect-[316/274] pb-4",
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-100 dark:opacity-15"
        >
          {isCompact ? (
            <SecondRowBg className="h-full w-full" />
          ) : (
            <Step2Bg className="h-full w-full" />
          )}
        </div>

        <div
          className={[
            "relative z-10 flex min-h-0 flex-1 flex-col",
            isCompact ? "pb-10 md:pb-12" : "",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-black dark:text-white">
              {title}{" "}
              {required && (
                <span className="text-black dark:text-white">*</span>
              )}
            </h3>
          </div>

          <div className="mt-3 grid w-full grid-cols-2 text-sm font-medium lg:pt-4">
            <button
              type="button"
              onClick={() => setTab("system")}
              className={[
                "relative w-full pb-2 text-center transition-colors cursor-pointer",
                tab === "system"
                  ? "text-black dark:text-white"
                  : "text-[#939393]",
              ].join(" ")}
            >
              From System
              {tab === "system" && (
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-primary" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setTab("db")}
              className={[
                "relative w-full pb-2 text-center transition-colors cursor-pointer",
                tab === "db" ? "text-black dark:text-white" : "text-[#939393]",
              ].join(" ")}
            >
              From Database
              {tab === "db" && (
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-primary" />
              )}
            </button>
          </div>

          <div className="md:mt-4 flex min-h-0 flex-1 flex-col items-center justify-center px-2 py-6 text-center sm:px-4 sm:py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/50 dark:bg-[#1B272B]/50 border border-white dark:border-white/5">
              <UploadCloudIcon className="text-primary dark:text-[#519A91]" />
            </div>
            <p className="mt-4 text-xs font-normal text-black dark:text-white">
              Drag and drop files here or{" "}
              <button
                type="button"
                className="rounded-full bg-primary dark:bg-[#519A91] px-4 py-1 ms-1 text-xs font-medium text-white transition-colors hover:bg-primary-dark dark:text-black cursor-pointer"
              >
                Browse Files
              </button>
            </p>
            <p className="mt-2 text-[10px] font-normal text-black dark:text-white">
              (PDF, DOCX, DOC, TXT, JPG, PNG)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProposalUploadStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/30 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <UploadBox
          title={uploadCards[0].title}
          required={uploadCards[0].required}
        />
        <UploadBox title={uploadCards[1].title} />
        <UploadBox title={uploadCards[2].title} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mt-4">
        <UploadBox title={uploadCards[3].title} variant="compact" />
        <UploadBox title={uploadCards[4].title} variant="compact" />
      </div>

      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          className="rounded-full border border-white bg-white/50 px-3 py-2.5 text-sm font-normal text-black dark:text-white cursor-pointer"
          onClick={onBack}
        >
          Previous: Sections
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
