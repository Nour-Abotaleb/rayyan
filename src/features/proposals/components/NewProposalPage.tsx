"use client";

import PersonIcon from "@/icons/PersonIcon";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import TranslateIcon from "@/icons/TranslateIcon";

const steps = [
  {
    number: 1,
    title: "Basic Info",
    subtitle: "Tell us who you are to get started.",
  },
  {
    number: 2,
    title: "Personal information",
    subtitle: "Tell us who you are to get started.",
  },
  {
    number: 3,
    title: "Upload",
    subtitle: "Tell us who you are to get started.",
  },
  {
    number: 4,
    title: "Personal information",
    subtitle: "Tell us who you are to get started.",
  },
];

const ACTIVE_STEP = 1;
const PROGRESS = 25;

function InputField({
  label,
  required,
  optional,
  placeholder,
  icons,
  endButton,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder: string;
  icons: React.ReactNode;
  endButton?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
        {label} {required && <span className="">*</span>}
        {optional && (
          <span className="font-normal text-zinc-400"> (Optional)</span>
        )}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder}
            className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-zinc-800 placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
          />
          <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center gap-1 text-input-icon">
            {icons}
          </span>
        </div>

        {endButton && (
          <button
            type="button"
            className="input-style flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-input-icon transition-colors"
            aria-label="Open"
          >
            {endButton}
          </button>
        )}
      </div>
    </div>
  );
}

export default function NewProposalPage() {
  return (
    <div className="layout-shell-x flex h-full min-h-0 flex-1 flex-col gap-6 overflow-x-hidden py-4 lg:flex-row lg:items-stretch lg:overflow-hidden">
      {/* Left stepper — fixed column height, does not scroll (same pattern as dashboard + LeftPanel) */}
      <aside className="hidden shrink-0 overflow-hidden rounded-[24px] border border-[#F1F2F9] bg-white px-7 py-9 shadow-[0px_1px_8px_0px_rgba(25,33,61,0.06)] dark:border-[#171717] dark:bg-[#0D0D0D] lg:flex lg:h-full lg:min-h-0 lg:max-h-full lg:w-82 lg:flex-col lg:self-stretch">
        <h2 className="text-lg md:text-xl font-bold text-black dark:text-white">
          Create a New Proposal
        </h2>
        <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-[#666666] whitespace-pre-line">
          just add your details and let the system do the rest.
        </p>

        {/* Progress bar */}
        <div className="mt-2.5 flex items-center gap-3 border-b border-[#F1F2F9] dark:border-[#171717] pb-5">
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#E3EBEA] dark:bg-[#1F2B29] p-0.5">
            <div
              className="h-full rounded-full bg-primary dark:bg-[#519A91] transition-all"
              style={{ width: `${PROGRESS}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-semibold text-black dark:text-white">
            {PROGRESS}%
          </span>
        </div>

        {/* Steps */}
        <div className="mt-8 flex flex-col">
          {steps.map((step, idx) => {
            const isCompleted = step.number < ACTIVE_STEP;
            const isActive = step.number === ACTIVE_STEP;

            return (
              <div key={step.number}>
                <div className="flex items-start gap-4">
                  {/* Number badge */}
                  {isActive ? (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-b from-[#8DB7B6] to-primary text-sm font-bold text-white dark:text-black border border-[#F6F4F0] dark:border-[#191919]">
                      {step.number}
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E4ECEE] text-sm font-bold text-black dark:text-white border-0.5 border-[#F6F4F0] dark:border-[#1B272B] dark:bg-[#0D0D0D]">
                      {step.number}
                    </div>
                  )}

                  {/* Text */}
                  <div className="pt-1">
                    <p className="text-sm font-bold text-black dark:text-white tracking-wide">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs font-light text-[#666666] tracking-wide">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="ms-4.25 my-2 flex flex-col">
                    <div
                      className={[
                        "h-10 w-0.5 rounded-full",
                        isCompleted
                          ? "bg-linear-to-b from-[#8DB7B6] to-primary dark:bg-[#519A91]"
                          : "",
                        isActive
                          ? "bg-linear-to-b from-primary from-50% to-[#E4ECEE] to-50% dark:from-[#519A91] dark:to-[#1B272B] rounded-full"
                          : "",
                        !isCompleted && !isActive
                          ? "bg-[#E4ECEE] dark:bg-[#1B272B]"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Scrollport for the right column only (not on <main>); left aside stays out of this flow */}
      <div className="scrollbar-hide flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA] p-3 md:p-6 dark:border-white/30 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/15">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InputField
              label="Client Name"
              required
              placeholder="ex: Ahmed Adel"
              icons={<PersonIcon size={20} />}
            />
            <InputField
              label="Sector/Industry"
              required
              placeholder="ex: Ahmed Adel"
              icons={<PersonIcon size={18} />}
              endButton={<ArrowDownCircleIcon size={20} />}
            />
            <InputField
              label="Proposal Type"
              required
              placeholder="ex: Ahmed Adel"
              icons={<PersonIcon size={20} />}
            />
            <InputField
              label="Proposal Language"
              required
              placeholder="ex: English"
              icons={<TranslateIcon size={20} />}
              endButton={<ArrowDownCircleIcon size={20} />}
            />
            <InputField
              label="Start Date"
              optional
              placeholder="ex: mm/dd/yyyy"
              icons={<DateCalendarIcon size={20} />}
            />
            <InputField
              label="End Date"
              optional
              placeholder="ex: mm/dd/yyyy"
              icons={<DateCalendarIcon size={20} />}
            />
          </div>

          {/* Additional Details */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
              Additional Details{" "}
              <span className="font-normal text-zinc-400">(Optional)</span>
            </label>
            <textarea
              placeholder="Any Additional context or requirements..."
              rows={5}
              className="input-style w-full rounded-2xl px-4 py-3.5 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
            />
          </div>

          {/* Next button */}
          <div className="flex justify-end mt-2">
            <button className="rounded-full bg-primary px-3 py-1.5 text-sm md:text-base font-normal text-white dark:text-black transition-colors hover:bg-primary-dark cursor-pointer">
              Next: Sections
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
