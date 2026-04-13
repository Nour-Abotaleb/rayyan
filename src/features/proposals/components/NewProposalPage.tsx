"use client";

import PersonIcon from "@/icons/PersonIcon";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import { useMemo, useState } from "react";
import ProposalStepsSidebar from "@/features/proposals/components/ProposalStepsSidebar";
import ProposalSectionsStep from "@/features/proposals/components/ProposalSectionsStep";
import ProposalUploadStep from "@/features/proposals/components/ProposalUploadStep";

const steps = [
  {
    number: 1,
    title: "Basic Info",
    subtitle: "Tell us who you are to get started.",
  },
  {
    number: 2,
    title: "Sections",
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

function InputField({
  label,
  required,
  optional,
  placeholder,
  icons,
  endButton,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder: string;
  icons: React.ReactNode;
  endButton?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} {required && <span className="">*</span>}
        {optional && (
          <span className="font-[550] text-black dark:text-white"> (Optional)</span>
        )}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
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
  const [activeStep, setActiveStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({
    clientName: "",
    sectorIndustry: "",
    proposalType: "",
    proposalLanguage: "",
    startDate: "",
    endDate: "",
    additionalDetails: "",
  });

  const progress = useMemo(() => {
    const pct = Math.round((activeStep / steps.length) * 100);
    return Math.min(100, Math.max(0, pct));
  }, [activeStep]);

  const canGoNextFromStep1 = useMemo(() => {
    return (
      basicInfo.clientName.trim().length > 0 &&
      basicInfo.sectorIndustry.trim().length > 0 &&
      basicInfo.proposalType.trim().length > 0 &&
      basicInfo.proposalLanguage.trim().length > 0
    );
  }, [basicInfo]);

  return (
    <div className="layout-shell-x flex h-full min-h-0 flex-1 flex-col gap-3 overflow-x-hidden md:gap-6 lg:flex-row lg:items-stretch lg:overflow-hidden">
      {/* Left stepper — fixed column height, does not scroll (same pattern as dashboard + LeftPanel) */}
      <ProposalStepsSidebar
        title="Create a New Proposal"
        description={"just add your details and let the system do the rest."}
        steps={steps}
        activeStep={activeStep}
        progress={progress}
      />

      {/* Scrollport for the right column only (not on <main>); left aside stays out of this flow */}
      <div className="scrollbar-hide flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-y-auto py-4">
        {activeStep === 1 && (
          <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/30 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField
                label="Client Name"
                required
                placeholder="ex: Ahmed Adel"
                icons={<PersonIcon size={20} />}
                value={basicInfo.clientName}
                onChange={(v) => setBasicInfo((s) => ({ ...s, clientName: v }))}
              />
              <InputField
                label="Sector/Industry"
                required
                placeholder="ex: Construction"
                icons={<PersonIcon size={18} />}
                endButton={<ArrowDownCircleIcon size={20} />}
                value={basicInfo.sectorIndustry}
                onChange={(v) =>
                  setBasicInfo((s) => ({ ...s, sectorIndustry: v }))
                }
              />
              <InputField
                label="Proposal Type"
                required
                placeholder="ex: Technical Proposal"
                icons={<PersonIcon size={20} />}
                value={basicInfo.proposalType}
                onChange={(v) =>
                  setBasicInfo((s) => ({ ...s, proposalType: v }))
                }
              />
              <InputField
                label="Proposal Language"
                required
                placeholder="ex: English"
                icons={<TranslateIcon size={20} />}
                endButton={<ArrowDownCircleIcon size={20} />}
                value={basicInfo.proposalLanguage}
                onChange={(v) =>
                  setBasicInfo((s) => ({ ...s, proposalLanguage: v }))
                }
              />
              <InputField
                label="Start Date"
                optional
                placeholder="ex: mm/dd/yyyy"
                icons={<DateCalendarIcon size={20} />}
                value={basicInfo.startDate}
                onChange={(v) => setBasicInfo((s) => ({ ...s, startDate: v }))}
              />
              <InputField
                label="End Date"
                optional
                placeholder="ex: mm/dd/yyyy"
                icons={<DateCalendarIcon size={20} />}
                value={basicInfo.endDate}
                onChange={(v) => setBasicInfo((s) => ({ ...s, endDate: v }))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm md:text-base font-[550] text-black dark:text-white">
                Additional Details{" "}
                <span className="font-[550] text-black dark:text-white">(Optional)</span>
              </label>
              <textarea
                placeholder="Any Additional context or requirements..."
                rows={6}
                value={basicInfo.additionalDetails}
                onChange={(e) =>
                  setBasicInfo((s) => ({
                    ...s,
                    additionalDetails: e.target.value,
                  }))
                }
                className="input-style w-full rounded-2xl px-4 py-3.5 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
              />
            </div>

            <div className="mt-2 flex justify-end">
              <button
                className="cursor-pointer rounded-full bg-primary px-3 py-2.5 text-sm font-normal text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 dark:text-black"
                disabled={!canGoNextFromStep1}
                onClick={() => setActiveStep(2)}
              >
                Next: Sections
              </button>
            </div>
          </main>
        )}

        {activeStep === 2 && (
          <ProposalSectionsStep
            onBack={() => setActiveStep(1)}
            onNext={() => setActiveStep(3)}
          />
        )}

        {activeStep === 3 && (
          <ProposalUploadStep
            onBack={() => setActiveStep(2)}
            onNext={() => setActiveStep(4)}
          />
        )}
      </div>
    </div>
  );
}
