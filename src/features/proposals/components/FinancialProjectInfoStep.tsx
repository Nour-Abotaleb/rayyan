"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { documentsService, type Document as ApiDocument } from "@/lib/api/documents.service";
import { useLanguage } from "@/contexts/LanguageContext";
import PersonIcon from "@/icons/PersonIcon";
import DropzoneUploadIcon from "@/icons/DropzoneUploadIcon";
import DateInput from "@/features/proposals/components/sections/DateInput";
import SectorIcon from "@/icons/SectorIcon";
import LanguageSelector from "@/components/LanguageSelector";
import DropdownSelect from "@/components/DropdownSelect";
import pdfIcon from "@src/assets/dashboard/pdf.svg";

// ── Icons ────────────────────────────────────────────────────────────────────

function TaxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 7L13 7M21 17L13 17M8 7C8 8.10457 7.10457 9 6 9C4.89543 9 4 8.10457 4 7C4 5.89543 4.89543 5 6 5C7.10457 5 8 5.89543 8 7ZM8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17C4 15.8954 4.89543 15 6 15C7.10457 15 8 15.8954 8 17Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Reusable field components ────────────────────────────────────────────────

function RfpUploadSection({
  label,
  onFilesChange,
  onDocIdsChange,
}: {
  label: string;
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
        {label} <span>*</span>
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
            onDrop={(e) => { e.preventDefault(); const files = Array.from(e.dataTransfer.files); if (files.length) { const next = [...selectedFiles, ...files]; setSelectedFiles(next); onFilesChange(next); } }}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full text-primary"
              style={{ overflow: "visible" }}
            >
              <rect
                x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11"
                fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6"
              />
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
  type,
  error,
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
  type?: string;
  error?: string;
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
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type={type ?? "text"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD] ${error ? "border-red-400 focus:ring-red-300" : "focus:ring-primary/20"}`}
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
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function NumberSpinnerField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  function adjust(delta: number) {
    const n = parseInt(value || "0", 10);
    onChange(String(Math.max(0, n + delta)));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} <span>*</span>
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            min={0}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
            <SectorIcon />
          </span>
        </div>
        <div className="input-style flex h-[44px] w-[44px] shrink-0 flex-col items-center justify-center rounded-full text-input-icon overflow-hidden">
          <button
            type="button"
            onClick={() => adjust(1)}
            aria-label="Increase"
            className="flex h-[14px] w-full cursor-pointer items-center justify-center hover:text-primary transition-colors"
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 6.5L6 1.5L11 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => adjust(-1)}
            aria-label="Decrease"
            className="flex h-[14px] w-full cursor-pointer items-center justify-center hover:text-primary transition-colors"
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Step component ───────────────────────────────────────────────────────────

export interface ProjectInfoStepData {
  rfpMode: "upload" | "none";
  rfpFiles: File[];
  rfpDocIds: string[];
  clientName: string;
  projectName: string;
  numDeliverables: number;
  boqType: string;
  projectType: string;
  sectorIndustry: string;
  language: string;
  taxRate: number;
  startDate: string;
  endDate: string;
  terms: string;
}

export default function FinancialProjectInfoStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (data: ProjectInfoStepData) => void;
}) {
  const { t, dir } = useLanguage();
  const fp = t.dashboard.financialProposal;
  const f = fp.form;

  const [rfpFiles, setRfpFiles] = useState<File[]>([]);
  const [rfpDocIds, setRfpDocIds] = useState<string[]>([]);
  const [form, setForm] = useState({
    clientName: "",
    projectName: "",
    numDeliverables: "",
    boqType: "",
    projectType: "",
    sectorIndustry: "",
    proposalLanguage: "",
    taxRate: "",
    startDate: "",
    endDate: "",
    terms: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(key: keyof typeof form) {
    return (v: string) => {
      setForm((s) => ({ ...s, [key]: v }));
      if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
    };
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.clientName.trim())        e.clientName        = "Required";
    if (!form.projectName.trim())       e.projectName       = "Required";
    if (!form.numDeliverables || Number(form.numDeliverables) < 1) e.numDeliverables = "Required";
    if (!form.boqType.trim())           e.boqType           = "Required";
    if (!form.projectType.trim())       e.projectType       = "Required";
    if (!form.sectorIndustry.trim())    e.sectorIndustry    = "Required";
    if (!form.proposalLanguage.trim())  e.proposalLanguage  = "Required";
    if (!form.taxRate || Number(form.taxRate) <= 0) e.taxRate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
      <RfpUploadSection label={f.rfpDocumentsLabel} onFilesChange={setRfpFiles} onDocIdsChange={setRfpDocIds} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          label={f.clientNameLabel}
          required
          placeholder={f.clientNamePlaceholder}
          icons={<PersonIcon size={20} />}
          value={form.clientName}
          onChange={set("clientName")}
          error={errors.clientName}
        />
        <InputField
          label={f.projectNameLabel}
          required
          placeholder={f.projectNamePlaceholder}
          icons={<PersonIcon size={20} />}
          value={form.projectName}
          onChange={set("projectName")}
          error={errors.projectName}
        />

        <div className="flex flex-col gap-1.5">
          <NumberSpinnerField
            label={f.numDeliverablesLabel}
            placeholder={f.numDeliverablesPlaceholder}
            value={form.numDeliverables}
            onChange={set("numDeliverables")}
          />
          {errors.numDeliverables && <p className="text-xs text-red-500">{errors.numDeliverables}</p>}
        </div>
        <DropdownSelect
          label={f.boqTypeLabel}
          required
          placeholder={f.boqTypePlaceholder}
          icon={<SectorIcon />}
          optionType="boq-type"
          value={form.boqType}
          onChange={set("boqType")}
          error={errors.boqType}
        />

        <DropdownSelect
          label={f.projectTypeLabel}
          required
          placeholder={f.projectTypePlaceholder}
          icon={<SectorIcon />}
          optionType="project-type"
          value={form.projectType}
          onChange={set("projectType")}
          error={errors.projectType}
        />
        <DropdownSelect
          label={f.sectorIndustryLabel}
          required
          placeholder={f.sectorIndustryPlaceholder}
          icon={<SectorIcon />}
          optionType="sector-industry"
          value={form.sectorIndustry}
          onChange={set("sectorIndustry")}
          error={errors.sectorIndustry}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-[550] text-black dark:text-white">
            {f.proposalLanguageLabel} <span>*</span>
          </label>
          <LanguageSelector value={form.proposalLanguage} onChange={set("proposalLanguage")} />
          {errors.proposalLanguage && <p className="text-xs text-red-500">{errors.proposalLanguage}</p>}
        </div>
        <InputField
          label={f.taxConfigLabel}
          required
          placeholder={f.taxRatePlaceholder}
          icons={<TaxIcon />}
          value={form.taxRate}
          onChange={set("taxRate")}
          type="number"
          error={errors.taxRate}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-[550] text-black dark:text-white">
            {f.startDateLabel} <span className="font-[550]">({f.optionalLabel})</span>
          </label>
          <DateInput value={form.startDate} onChange={set("startDate")} placeholder={f.datePlaceholder} isRtl={dir === "rtl"} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-[550] text-black dark:text-white">
            {f.endDateLabel} <span className="font-[550]">({f.optionalLabel})</span>
          </label>
          <DateInput value={form.endDate} onChange={set("endDate")} placeholder={f.datePlaceholder} isRtl={dir === "rtl"} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm md:text-base font-[550] text-black dark:text-white">
          {f.termsLabel}{" "}
          <span className="font-[550] text-black dark:text-white">({f.optionalLabel})</span>
        </label>
        <textarea
          placeholder={f.termsPlaceholder}
          rows={7}
          value={form.terms}
          onChange={(e) => set("terms")(e.target.value)}
          className="input-style w-full rounded-2xl px-4 py-3.5 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
        />
      </div>

      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white bg-white/50 px-3 py-2.5 text-sm font-normal text-black hover:opacity-80 transition-opacity cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {fp.actions.prevReadiness}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!validate()) return;
            onNext({
              rfpMode: rfpFiles.length || rfpDocIds.length ? "upload" : "none",
              rfpFiles,
              rfpDocIds,
              clientName: form.clientName,
              projectName: form.projectName,
              numDeliverables: Number(form.numDeliverables) || 0,
              boqType: form.boqType,
              projectType: form.projectType,
              sectorIndustry: form.sectorIndustry,
              language: form.proposalLanguage || "",
              taxRate: Number(form.taxRate) || 0,
              startDate: form.startDate,
              endDate: form.endDate,
              terms: form.terms,
            });
          }}
          className="cursor-pointer rounded-full bg-primary px-3 py-2.5 text-sm font-normal text-white transition-colors hover:bg-primary-dark dark:text-black"
        >
          {fp.actions.nextDeliverables}
        </button>
      </div>
    </main>
  );
}
