"use client";

import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { documentsService, type Document as ApiDocument } from "@/lib/api/documents.service";
import PersonIcon from "@/icons/PersonIcon";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import SectorIcon from "@/icons/SectorIcon";
import DropzoneUploadIcon from "@/icons/DropzoneUploadIcon";
import DropdownSelect from "@/components/DropdownSelect";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import pdfIcon from "@src/assets/dashboard/pdf.svg";
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
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  placeholder: string;
  icons: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} {required && <span>*</span>}
        {optional && (
          <span className="font-[550] text-black dark:text-white">
            {" "}({optionalLabel ?? "Optional"})
          </span>
        )}
      </label>
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
    </div>
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

      {tab === "system" && (
        <>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileAdd} />
          <div
            className="relative mt-1 flex flex-col items-center justify-center gap-2 rounded-xl py-5 text-center cursor-pointer"
            style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files);
              if (files.length) { const next = [...selectedFiles, ...files]; setSelectedFiles(next); onFilesChange(next); }
            }}
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

export default function NewProposalPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const steps = [
    { number: 1, title: t.dashboard.newProposal.steps.basicInfoTitle, subtitle: t.dashboard.newProposal.steps.basicInfoSubtitle },
    { number: 2, title: t.dashboard.newProposal.steps.sectionsTitle, subtitle: t.dashboard.newProposal.steps.sectionsSubtitle },
    { number: 3, title: t.dashboard.newProposal.steps.uploadTitle, subtitle: t.dashboard.newProposal.steps.uploadSubtitle },
    { number: 4, title: t.dashboard.newProposal.steps.personalInformationTitle, subtitle: t.dashboard.newProposal.steps.personalInformationSubtitle },
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
      members: uploadData?.members.map(({ name, role, yearsOfExperience, keySkills }) => ({ name, role, yearsOfExperience, keySkills })),
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
      <ProposalStepsSidebar
        title={t.dashboard.newProposal.sidebar.title}
        description={t.dashboard.newProposal.sidebar.description}
        steps={steps}
        activeStep={activeStep}
        progress={progress}
      />

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
                placeholder={t.dashboard.newProposal.form.proposalTypePlaceholder}
                icons={<PersonIcon size={20} />}
                value={basicInfo.proposalType}
                onChange={(v) => setBasicInfo((s) => ({ ...s, proposalType: v }))}
              />
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-sm md:text-base font-[550] text-black dark:text-white">
                  {t.dashboard.newProposal.form.proposalLanguageLabel} <span>*</span>
                </label>
                <LanguageSelector
                  value={basicInfo.proposalLanguage}
                  onChange={(v) => setBasicInfo((s) => ({ ...s, proposalLanguage: v }))}
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
                placeholder={t.dashboard.newProposal.form.additionalDetailsPlaceholder}
                rows={7}
                value={basicInfo.additionalDetails}
                onChange={(e) => setBasicInfo((s) => ({ ...s, additionalDetails: e.target.value }))}
                className="input-style w-full rounded-2xl px-4 py-3.5 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
              />
            </div>

            <div className="mt-2 flex justify-end">
              <button
                className="cursor-pointer rounded-full bg-primary px-3 py-2.5 text-sm font-normal text-white transition-colors hover:bg-primary-dark dark:text-black"
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
