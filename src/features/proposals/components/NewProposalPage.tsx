"use client";

import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { documentsService, type Document as ApiDocument } from "@/lib/api/documents.service";
import PersonIcon from "@/icons/PersonIcon";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import DropdownSelect from "@/components/DropdownSelect";
import { useLanguage } from "@/contexts/LanguageContext";
import arFlag from "@src/assets/dashboard/ar.svg";
import enFlag from "@src/assets/dashboard/en.svg";
import pdfIcon from "@src/assets/dashboard/pdf.svg";
import { useOptions } from "@/hooks/useOptions";
import ProposalStepsSidebar from "@/features/proposals/components/ProposalStepsSidebar";
import ProposalSectionsStep, { type SectionsStepData } from "@/features/proposals/components/ProposalSectionsStep";
import ProposalUploadStep, { type UploadStepData } from "@/features/proposals/components/ProposalUploadStep";
import ProposalFinalReviewStep from "@/features/proposals/components/ProposalFinalReviewStep";
import { technicalProposalService } from "@/lib/api/technical-proposal.service";

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

function RfpUploadSection({
  onFilesChange,
  onDocIdsChange,
}: {
  onFilesChange: (files: File[]) => void;
  onDocIdsChange: (ids: string[]) => void;
}) {
  const { t } = useLanguage();
  const up = t.dashboard.newProposal.upload;
  const modal = t.dashboard.proposalDetailsModal;
  const [tab, setTab] = useState<"system" | "database">("system");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [dbDocs, setDbDocs] = useState<ApiDocument[]>([]);
  const [dbLoading, setDbLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tab !== "database") return;
    if (dbDocs.length || dbLoading) return;
    setDbLoading(true);
    documentsService.getDocuments("rfp").then((res) => {
      if (res.ok) setDbDocs(res.data.documents);
      setDbLoading(false);
    });
  }, [tab]);

  function handleFileAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const next = [...selectedFiles, ...files];
    setSelectedFiles(next);
    onFilesChange(next);
    e.target.value = "";
  }

  function toggleDoc(id: string) {
    const next = selectedDocIds.includes(id)
      ? selectedDocIds.filter((x) => x !== id)
      : [...selectedDocIds, id];
    setSelectedDocIds(next);
    onDocIdsChange(next);
  }

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
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileAdd} />
          <div
            className="relative mt-1 flex flex-col items-center justify-center gap-2 rounded-xl py-5 text-center cursor-pointer"
            style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const files = Array.from(e.dataTransfer.files); if (files.length) { const next = [...selectedFiles, ...files]; setSelectedFiles(next); onFilesChange(next); } }}
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
        dbLoading ? (
          <div className="flex justify-center py-6">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : dbDocs.length === 0 ? (
          <p className="py-4 text-center text-xs text-black/40 dark:text-white/30">No RFP documents found.</p>
        ) : (
          <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {dbDocs.map((doc) => (
              <label key={doc.id} className="flex cursor-pointer items-center gap-2 rounded-xl bg-white p-3 dark:bg-white/5">
                <Image src={pdfIcon} alt="PDF" width={36} height={36} className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-black dark:text-white">{doc.name}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedDocIds.includes(doc.id)}
                  onChange={() => toggleDoc(doc.id)}
                  className="size-4 shrink-0 accent-primary cursor-pointer"
                />
              </label>
            ))}
          </div>
        )
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
  const [open, setOpen] = useState(false);
  const { options, loading } = useOptions("proposal-language");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const isOther = value && value !== "ar" && value !== "en";

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
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full px-4 py-2.5 text-start text-xs transition-colors hover:bg-primary/8 dark:hover:bg-white/5 ${
                    value === opt ? "font-semibold text-primary dark:text-[#519A91]" : "text-black/70 dark:text-white/60"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewProposalPage() {
  const { t } = useLanguage();
  const router = useRouter();
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
  const [rfpFiles, setRfpFiles] = useState<File[]>([]);
  const [rfpDocIds, setRfpDocIds] = useState<string[]>([]);
  const [sectionsData, setSectionsData] = useState<SectionsStepData | null>(null);
  const [uploadData, setUploadData] = useState<UploadStepData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const progress = useMemo(() => {
    const pct = Math.round((activeStep / steps.length) * 100);
    return Math.min(100, Math.max(0, pct));
  }, [activeStep]);

  const canGoNextFromStep1 = true;

  async function handleSubmit() {
    setSubmitting(true);
    const res = await technicalProposalService.createProposal({
      rfpMode: rfpFiles.length || rfpDocIds.length ? "upload" : "none",
      rfpFiles,
      rfpDocIds,
      clientName: basicInfo.clientName,
      projectName: basicInfo.projectName,
      sectorIndustry: basicInfo.sectorIndustry,
      proposalType: basicInfo.proposalType,
      language: basicInfo.proposalLanguage || "",
      startDate: basicInfo.startDate || undefined,
      endDate: basicInfo.endDate || undefined,
      additionalDetails: basicInfo.additionalDetails || undefined,
      ganttCards: sectionsData?.ganttCards,
      timelineFiles: sectionsData?.timelineFiles,
      sections: sectionsData?.sections,
      members: uploadData?.members.map(({ name, role, yearsOfExperience, keySkills }) => ({
        name, role, yearsOfExperience, keySkills,
      })),
      memberCvFiles: uploadData?.members.map((m) => m.cvFile).filter(Boolean) as File[],
      cvDocIds: uploadData?.cvDocIds,
    });
    setSubmitting(false);
    if (res.ok) {
      router.push(`/dashboard/proposals?created=${res.data.proposalId}`);
    }
  }

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
            <RfpUploadSection onFilesChange={setRfpFiles} onDocIdsChange={setRfpDocIds} />
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
              <DropdownSelect
                label={t.dashboard.newProposal.form.sectorIndustryLabel}
                required
                placeholder={t.dashboard.newProposal.form.sectorIndustryPlaceholder}
                icon={<SectorIcon />}
                optionType="sector-industry"
                value={basicInfo.sectorIndustry}
                onChange={(v) => setBasicInfo((s) => ({ ...s, sectorIndustry: v }))}
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
            onNext={(data) => { setSectionsData(data); setActiveStep(3); }}
          />
        )}

        {activeStep === 3 && (
          <ProposalUploadStep
            onBack={() => setActiveStep(2)}
            onNext={(data) => { setUploadData(data); setActiveStep(4); }}
          />
        )}

        {activeStep === 4 && (
          <ProposalFinalReviewStep
            sectionsData={sectionsData}
            onBack={() => setActiveStep(3)}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        )}
      </div>
    </div>
  );
}
