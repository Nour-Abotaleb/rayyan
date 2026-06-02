"use client";

import Image from "next/image";
import { useRef, useMemo, useState } from "react";
import PersonIcon from "@/icons/PersonIcon";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import { useLanguage } from "@/contexts/LanguageContext";
import arFlag from "@src/assets/dashboard/ar.svg";
import enFlag from "@src/assets/dashboard/en.svg";
import pdfIcon from "@src/assets/dashboard/pdf.svg";
import ProposalStepsSidebar from "@/features/proposals/components/ProposalStepsSidebar";
import ProposalSectionsStep from "@/features/proposals/components/ProposalSectionsStep";
import ProposalUploadStep from "@/features/proposals/components/ProposalUploadStep";

function InputField({
  label,
  required,
  optional,
  optionalLabel,
  placeholder,
  icons,
  endButton,
  value,
  onChange,
  openAriaLabel,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  placeholder: string;
  icons: React.ReactNode;
  endButton?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  openAriaLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} {required && <span className="">*</span>}
        {optional && (
          <span className="font-[550] text-black dark:text-white">
            {" "}
            ({optionalLabel ?? "Optional"})
          </span>
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
            aria-label={openAriaLabel ?? "Open"}
          >
            {endButton}
          </button>
        )}
      </div>
    </div>
  );
}

function DropzoneUploadIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M14.834 13.8333L10.834 9.83325L6.83399 13.8333M10.834 9.83325V18.8333M18.834 14.5761C20.0555 13.5673 20.834 12.0412 20.834 10.3333C20.834 7.29569 18.3716 4.83325 15.334 4.83325C15.1155 4.83325 14.911 4.71925 14.8001 4.53099C13.496 2.31809 11.0884 0.833252 8.33399 0.833252C4.19185 0.833252 0.833984 4.19112 0.833984 8.33325C0.833984 10.3994 1.66943 12.2703 3.02093 13.6268" stroke="#488981" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const DB_MOCK_DOCS = [
  { id: "1", name: "Assets.Zip", size: "5.3MB" },
  { id: "2", name: "RFP_Brief.pdf", size: "2.1MB" },
  { id: "3", name: "Scope_Doc.docx", size: "1.4MB" },
];

function RfpUploadSection() {
  const { t } = useLanguage();
  const up = t.dashboard.newProposal.upload;
  const modal = t.dashboard.proposalDetailsModal;
  const [tab, setTab] = useState<"system" | "database">("system");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {modal.rfpLabel} Documents <span>*</span>
      </label>

      {/* Tabs */}
      <div className="flex border-b-2 border-black/10 dark:border-white/10 mb-3">
        {(["system", "database"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex-1 py-2.5 text-center text-sm font-semibold tracking-wide cursor-pointer transition-colors -mb-px ${
              tab === key
                ? "border-b-2 border-primary text-black dark:text-white"
                : "text-[#939393] hover:text-black/70 dark:hover:text-white/70"
            }`}
          >
            {key === "system" ? modal.fromSystem : modal.fromDatabase}
          </button>
        ))}
      </div>

      {/* From System — dropzone */}
      {tab === "system" && (
        <>
          <input ref={fileInputRef} type="file" multiple className="hidden" />
          <div
            className="relative mt-1 flex flex-col items-center justify-center gap-2 rounded-xl py-5 text-center cursor-pointer"
            style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full text-primary" style={{ overflow: "visible" }}>
              <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
            </svg>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
              <DropzoneUploadIcon />
            </span>
            <p className="text-xs text-black/60 dark:text-white/50">{up.dragDropLabel}</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white hover:opacity-90 cursor-pointer"
            >
              {up.browseFiles}
            </button>
            <p className="text-[10px] text-black/40 dark:text-white/30">{up.fileTypes}</p>
          </div>
        </>
      )}

      {/* From Database — file list */}
      {tab === "database" && (
        <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {DB_MOCK_DOCS.map((doc) => (
            <label key={doc.id} className="flex cursor-pointer items-center gap-2 rounded-xl bg-white p-3 dark:bg-white/5">
              <Image src={pdfIcon} alt="PDF" width={36} height={36} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-black dark:text-white">{doc.name}</p>
                <p className="text-xs text-[#6B7280]">{doc.size}</p>
              </div>
              <input type="checkbox" className="size-4 shrink-0 accent-primary cursor-pointer" />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function SectorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18.32 11.9999C20.92 11.9999 22 10.9999 21.04 7.71994C20.39 5.50994 18.49 3.60994 16.28 2.95994C13 1.99994 12 3.07994 12 5.67994V8.55994C12 10.9999 13 11.9999 15 11.9999H18.32Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.0014 14.6998C19.0714 19.3298 14.6314 22.6898 9.5814 21.8698C5.7914 21.2598 2.7414 18.2098 2.1214 14.4198C1.3114 9.38977 4.6514 4.94977 9.2614 4.00977" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LanguageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} <span>*</span>
      </label>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2">
          <button
            type="button"
            onClick={() => onChange("ar")}
            className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white dark:bg-white/5 px-3 py-2.5 text-xs cursor-pointer"
          >
            <Image src={arFlag} alt="AR" width={20} height={20} className="rounded-full shrink-0" />
            <span className="text-black dark:text-white">Arabic</span>
            <span className={`ms-auto flex size-4 items-center justify-center rounded-full border-2 ${value === "ar" ? "border-primary" : "border-[#D0D5DD]"}`}>
              {value === "ar" && <span className="size-2 rounded-full bg-primary" />}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onChange("en")}
            className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white dark:bg-white/5 px-3 py-2.5 text-xs cursor-pointer"
          >
            <Image src={enFlag} alt="EN" width={20} height={20} className="rounded-full shrink-0" />
            <span className="text-black dark:text-white">English</span>
            <span className={`ms-auto flex size-4 items-center justify-center rounded-full border-2 ${value === "en" ? "border-primary" : "border-[#D0D5DD]"}`}>
              {value === "en" && <span className="size-2 rounded-full bg-primary" />}
            </span>
          </button>
        </div>
        <button
          type="button"
          className="input-style flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-input-icon transition-colors cursor-pointer"
          aria-label="Open language options"
        >
          <ArrowDownCircleIcon size={20} />
        </button>
      </div>
    </div>
  );
}

export default function NewProposalPage() {
  const { t } = useLanguage();
  const steps = [
    {
      number: 1,
      title: t.dashboard.newProposal.steps.basicInfoTitle,
      subtitle: t.dashboard.newProposal.steps.basicInfoSubtitle,
    },
    {
      number: 2,
      title: t.dashboard.newProposal.steps.sectionsTitle,
      subtitle: t.dashboard.newProposal.steps.sectionsSubtitle,
    },
    {
      number: 3,
      title: t.dashboard.newProposal.steps.uploadTitle,
      subtitle: t.dashboard.newProposal.steps.uploadSubtitle,
    },
    {
      number: 4,
      title: t.dashboard.newProposal.steps.personalInformationTitle,
      subtitle: t.dashboard.newProposal.steps.personalInformationSubtitle,
    },
  ];
  const [activeStep, setActiveStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState({
    clientName: "",
    projectName: "",
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

  const canGoNextFromStep1 = true;

  return (
    <div className="layout-shell-x flex h-full min-h-0 flex-1 flex-col gap-3 overflow-x-hidden md:gap-6 lg:flex-row lg:items-stretch lg:overflow-hidden">
      {/* Left stepper — fixed column height, does not scroll (same pattern as dashboard + LeftPanel) */}
      <ProposalStepsSidebar
        title={t.dashboard.newProposal.sidebar.title}
        description={t.dashboard.newProposal.sidebar.description}
        steps={steps}
        activeStep={activeStep}
        progress={progress}
      />

      {/* Scrollport for the right column only (not on <main>); left aside stays out of this flow */}
      <div className="scrollbar-hide flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-y-auto pb-4 pt-1">
        {activeStep === 1 && (
          <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
            <RfpUploadSection />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InputField
                label={t.dashboard.newProposal.form.clientNameLabel}
                required
                placeholder={t.dashboard.newProposal.form.clientNamePlaceholder}
                icons={<PersonIcon size={20} />}
                value={basicInfo.clientName}
                onChange={(v) => setBasicInfo((s) => ({ ...s, clientName: v }))}
              />
              <InputField
                label={t.dashboard.newProposal.form.projectNameLabel}
                required
                placeholder={t.dashboard.newProposal.form.projectNamePlaceholder}
                icons={<PersonIcon size={20} />}
                value={basicInfo.projectName}
                onChange={(v) => setBasicInfo((s) => ({ ...s, projectName: v }))}
              />
              <InputField
                label={t.dashboard.newProposal.form.sectorIndustryLabel}
                required
                placeholder={
                  t.dashboard.newProposal.form.sectorIndustryPlaceholder
                }
                icons={<SectorIcon />}
                endButton={<ArrowDownCircleIcon size={20} />}
                openAriaLabel={t.dashboard.newProposal.actions.openAriaLabel}
                value={basicInfo.sectorIndustry}
                onChange={(v) =>
                  setBasicInfo((s) => ({ ...s, sectorIndustry: v }))
                }
              />
              <InputField
                label={t.dashboard.newProposal.form.proposalTypeLabel}
                required
                placeholder={
                  t.dashboard.newProposal.form.proposalTypePlaceholder
                }
                icons={<PersonIcon size={20} />}
                value={basicInfo.proposalType}
                onChange={(v) =>
                  setBasicInfo((s) => ({ ...s, proposalType: v }))
                }
              />
              <div className="sm:col-span-2">
                <LanguageField
                  label={t.dashboard.newProposal.form.proposalLanguageLabel}
                  value={basicInfo.proposalLanguage}
                  onChange={(v) =>
                    setBasicInfo((s) => ({ ...s, proposalLanguage: v }))
                  }
                />
              </div>
              <InputField
                label={t.dashboard.newProposal.form.startDateLabel}
                optional
                optionalLabel={t.dashboard.newProposal.form.optionalLabel}
                placeholder={t.dashboard.newProposal.form.datePlaceholder}
                icons={<DateCalendarIcon size={20} />}
                value={basicInfo.startDate}
                onChange={(v) => setBasicInfo((s) => ({ ...s, startDate: v }))}
              />
              <InputField
                label={t.dashboard.newProposal.form.endDateLabel}
                optional
                optionalLabel={t.dashboard.newProposal.form.optionalLabel}
                placeholder={t.dashboard.newProposal.form.datePlaceholder}
                icons={<DateCalendarIcon size={20} />}
                value={basicInfo.endDate}
                onChange={(v) => setBasicInfo((s) => ({ ...s, endDate: v }))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm md:text-base font-[550] text-black dark:text-white">
                {t.dashboard.newProposal.form.additionalDetailsLabel}{" "}
                <span className="font-[550] text-black dark:text-white">
                  ({t.dashboard.newProposal.form.optionalLabel})
                </span>
              </label>
              <textarea
                placeholder={
                  t.dashboard.newProposal.form.additionalDetailsPlaceholder
                }
                rows={7}
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
                {t.dashboard.newProposal.actions.nextSections}
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
