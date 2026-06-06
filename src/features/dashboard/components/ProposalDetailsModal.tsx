"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProposals } from "@/hooks/useProposals";
import CloseIcon from "@/icons/CloseIcon";
import PersonIcon from "@/icons/PersonIcon";
import DateCalendarIcon from "@/icons/DateCalendarIcon";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import DropdownSelect from "@/components/DropdownSelect";
import arFlag from "@src/assets/dashboard/ar.svg";
import enFlag from "@src/assets/dashboard/en.svg";
import pdfIcon from "@src/assets/dashboard/pdf.svg";
import { useOptions } from "@/hooks/useOptions";
import { documentsService, type Document as ApiDocument } from "@/lib/api/documents.service";

// ── Inline icons ──────────────────────────────────────────────────────

function MonitorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.96875 22H14.9688C19.9688 22 21.9688 20 21.9688 15V9C21.9688 4 19.9688 2 14.9688 2H8.96875C3.96875 2 1.96875 4 1.96875 9V15C1.96875 20 3.96875 22 8.96875 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.96875 12.7001L7.96875 12.6801C8.71875 12.6801 9.55875 13.2501 9.83875 13.9501L10.9787 16.8301C11.2387 17.4801 11.6487 17.4801 11.9087 16.8301L14.1987 11.0201C14.4187 10.4601 14.8287 10.4401 15.1087 10.9701L16.1487 12.9401C16.4587 13.5301 17.2587 14.0101 17.9187 14.0101H21.9788"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M18.32 11.9999C20.92 11.9999 22 10.9999 21.04 7.71994C20.39 5.50994 18.49 3.60994 16.28 2.95994C13 1.99994 12 3.07994 12 5.67994V8.55994C12 10.9999 13 11.9999 15 11.9999H18.32Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0014 14.6998C19.0714 19.3298 14.6314 22.6898 9.5814 21.8698C5.7914 21.2598 2.7414 18.2098 2.1214 14.4198C1.3114 9.38977 4.6514 4.94977 9.2614 4.00977"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5.24935 12.8334H8.74935C11.666 12.8334 12.8327 11.6667 12.8327 8.75008V5.25008C12.8327 2.33341 11.666 1.16675 8.74935 1.16675H5.24935C2.33268 1.16675 1.16602 2.33341 1.16602 5.25008V8.75008C1.16602 11.6667 2.33268 12.8334 5.24935 12.8334Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 5.54761L7 3.79761L8.75 5.54761"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 3.79761V8.46427"
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

function DatabaseIcon({ active }: { active?: boolean }) {
  const stroke = active ? "white" : "currentColor";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M4.66602 1.16675V2.91675"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33398 1.16675V2.91675"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.08398 6.41675H8.75065"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.08398 8.75H7.00065"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 12.8334H5.25C2.33333 12.8334 1.75 11.6317 1.75 9.22842V5.62925C1.75 2.88758 2.72417 2.15258 4.66667 2.04175H9.33333C11.2758 2.14675 12.25 2.88758 12.25 5.62925V9.33342"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.25 9.33325L8.75 12.8333V11.0833C8.75 9.91659 9.33333 9.33325 10.5 9.33325H12.25Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RfpUploadIcon({ active }: { active?: boolean }) {
  const stroke = active ? "white" : "currentColor";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5.24935 12.8334H8.74935C11.666 12.8334 12.8327 11.6667 12.8327 8.75008V5.25008C12.8327 2.33341 11.666 1.16675 8.74935 1.16675H5.24935C2.33268 1.16675 1.16602 2.33341 1.16602 5.25008V8.75008C1.16602 11.6667 2.33268 12.8334 5.24935 12.8334Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 5.54761L7 3.79761L8.75 5.54761"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 3.79761V8.46427"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9.63086C5.76917 10.3892 8.23083 10.3892 10.5 9.63086"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AddManualIcon({ active }: { active?: boolean }) {
  const stroke = active ? "white" : "currentColor";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M4.66602 7H9.33268"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 9.33341V4.66675"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.24935 12.8334H8.74935C11.666 12.8334 12.8327 11.6667 12.8327 8.75008V5.25008C12.8327 2.33341 11.666 1.16675 8.74935 1.16675H5.24935C2.33268 1.16675 1.16602 2.33341 1.16602 5.25008V8.75008C1.16602 11.6667 2.33268 12.8334 5.24935 12.8334Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DropzoneUploadIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path
        d="M14.834 13.8333L10.834 9.83325L6.83399 13.8333M10.834 9.83325V18.8333M18.834 14.5761C20.0555 13.5673 20.834 12.0412 20.834 10.3333C20.834 7.29569 18.3716 4.83325 15.334 4.83325C15.1155 4.83325 14.911 4.71925 14.8001 4.53099C13.496 2.31809 11.0884 0.833252 8.33399 0.833252C4.19185 0.833252 0.833984 4.19112 0.833984 8.33325C0.833984 10.3994 1.66943 12.2703 3.02093 13.6268"
        stroke="#488981"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface UploadDoc { id: string; name: string; size?: string; }

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function mapFilesToDocs(files: File[], prefix = "upload"): UploadDoc[] {
  const stamp = Date.now();
  return files.map((file, index) => ({
    id: `${prefix}-${stamp}-${index}`,
    name: file.name,
    size: formatFileSize(file.size),
  }));
}

// ── Field wrapper ─────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black dark:text-white">
        {label}
        {required && (
          <span className="ms-0.5 text-black dark:text-white"> *</span>
        )}
      </label>
      {children}
    </div>
  );
}

// ── Input with trailing icon ──────────────────────────────────────────

function InputWithIcon({
  placeholder,
  icon,
  value,
  onChange,
}: {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm font-[300] text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
      />
      <span className="pointer-events-none absolute end-3 text-[#A0A3BD]">
        {icon}
      </span>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────

interface ProposalDetailsModalProps {
  onClose: () => void;
  prompt?: string;
  initialFiles?: File[];
  proposalType?: string;
}

export default function ProposalDetailsModal({
  onClose,
  prompt = "",
  initialFiles = [],
  proposalType,
}: ProposalDetailsModalProps) {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const m = t.dashboard.proposalDetailsModal;
  const { generateProposal, generating } = useProposals();

  const [rfpMode, setRfpMode] = useState<"none" | "upload" | "manual">(
    "manual",
  );
  const [rfpTab, setRfpTab] = useState<"system" | "database">("system");
  const [rfpFiles, setRfpFiles] = useState<File[]>([]);
  const [rfpDbSelected, setRfpDbSelected] = useState<Set<string>>(new Set());
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [language, setLanguage] = useState("");
  const [sector, setSector] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [docsMode, setDocsMode] = useState<"database" | "manual">("database");
  const [localDocs, setLocalDocs] = useState<UploadDoc[]>(() => mapFilesToDocs(initialFiles, "attached"));
  const [companyDbDocs, setCompanyDbDocs] = useState<ApiDocument[]>([]);
  const [companyDbLoading, setCompanyDbLoading] = useState(false);
  const [rfpDbDocs, setRfpDbDocs] = useState<ApiDocument[]>([]);
  const [rfpDbLoading, setRfpDbLoading] = useState(false);
  const [companyDocFiles, setCompanyDocFiles] = useState<File[]>([...initialFiles]);
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rfpFileInputRef = useRef<HTMLInputElement>(null);
  const hasDocs = companyDbDocs.length > 0 || localDocs.length > 0;

  useEffect(() => {
    if (rfpMode !== "upload" || rfpTab !== "database") return;
    if (rfpDbDocs.length || rfpDbLoading) return;
    setRfpDbLoading(true);
    documentsService.getDocuments("rfp").then((res) => {
      if (res.ok) setRfpDbDocs(res.data.documents);
      setRfpDbLoading(false);
    });
  }, [rfpMode, rfpTab]);

  useEffect(() => {
    if (docsMode !== "database") return;
    if (companyDbDocs.length || companyDbLoading) return;
    setCompanyDbLoading(true);
    documentsService.getDocuments("company_doc").then((res) => {
      if (res.ok) setCompanyDbDocs(res.data.documents);
      setCompanyDbLoading(false);
    });
  }, [docsMode]);

  async function handleDone() {
    const res = await generateProposal({
      prompt,
      promptFiles: initialFiles,
      proposalType,
      rfpMode: rfpMode === "manual" ? "manual" : rfpMode === "upload" ? "upload" : "none",
      rfpFiles: rfpTab === "system" ? rfpFiles : undefined,
      rfpDocIds: rfpTab === "database" ? Array.from(rfpDbSelected) : undefined,
      clientName,
      projectName,
      language,
      sector,
      startDate,
      endDate,
      companyDocFiles,
      companyDocIds: Array.from(selectedDocs),
    });
    if (res.ok) {
      onClose();
      router.push(`/dashboard/proposals?generated=${res.data.proposalId}`);
    }
  }

  const arFlagSrc = typeof arFlag === "string" ? arFlag : (arFlag as { src: string }).src;
  const enFlagSrc = typeof enFlag === "string" ? enFlag : (enFlag as { src: string }).src;
  const pdfIconSrc = typeof pdfIcon === "string" ? pdfIcon : (pdfIcon as { src: string }).src;

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { options: langOptions, loading: langLoading } = useOptions("proposal-language");

  useEffect(() => {
    if (!langOpen) return;
    function handle(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [langOpen]);

  function toggleDoc(id: string) {
    setSelectedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setCompanyDocFiles((prev) => [...prev, ...files]);
    setLocalDocs((prev) => [...mapFilesToDocs(files), ...prev]);
    event.target.value = "";
  }

  return (
    <div
      className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/50 p-4 dark:bg-[rgba(85,85,85,0.7)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        dir={dir}
        className="relative w-full max-w-[900px] max-h-[94vh] overflow-y-auto scrollbar-hide rounded-2xl bg-gradient-to-r from-[#F8F8F8] from-[70%] to-[#E5EEED] shadow-xl dark:bg-[#1A1A1A]"
      >
        <div className="px-6 py-4">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">
                {m.title}
              </h2>
              <p className="mt-0.5 text-xs text-black/50 dark:text-white/50">
                {m.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white bg-white/50 text-[#737373] hover:opacity-70 cursor-pointer dark:bg-white/10 dark:text-white/60"
              aria-label={t.contact.closeMenu}
            >
              <CloseIcon size={16} />
            </button>
          </div>

          {/* RFP row */}
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-semibold text-black dark:text-white">
              {m.rfpLabel}
            </span>
            <div className="flex items-center gap-2">
              <input
                ref={rfpFileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  if (files.length) setRfpFiles((prev) => [...prev, ...files]);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setRfpMode(rfpMode === "upload" ? "none" : "upload")
                }
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium cursor-pointer transition-colors ${
                  rfpMode === "upload"
                    ? "bg-primary text-white hover:opacity-90"
                    : "border border-white bg-white/50 text-black hover:border-primary hover:text-primary dark:border-white/10/20 dark:bg-white/5 dark:text-white"
                }`}
              >
                <RfpUploadIcon active={rfpMode === "upload"} />
                {m.uploadRfp}
              </button>
              <button
                type="button"
                onClick={() =>
                  setRfpMode(rfpMode === "manual" ? "none" : "manual")
                }
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium cursor-pointer transition-colors ${
                  rfpMode === "manual"
                    ? "bg-primary text-white hover:opacity-90"
                    : "border border-white bg-white/50 text-black hover:border-primary hover:text-primary dark:border-white/10/20 dark:bg-white/5 dark:text-white"
                }`}
              >
                <AddManualIcon active={rfpMode === "manual"} />
                {m.addManual}
              </button>
            </div>
          </div>

          {/* RFP Upload panel (tabs + dropzone) */}
          {rfpMode === "upload" && (
            <div className="mb-4">
              {/* Tabs */}
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setRfpTab("system")}
                  className={`flex-1 py-2.5 text-center text-sm font-semibold tracking-wide cursor-pointer transition-colors ${
                    rfpTab === "system"
                      ? "border-b-2 border-primary text-black"
                      : "text-[#939393] hover:text-black/70"
                  }`}
                >
                  {m.fromSystem}
                </button>
                <button
                  type="button"
                  onClick={() => setRfpTab("database")}
                  className={`flex-1 py-2.5 text-center text-sm font-semibold tracking-wide cursor-pointer transition-colors ${
                    rfpTab === "database"
                      ? "border-b-2 border-primary text-black"
                      : "text-[#939393] hover:text-black/70"
                  }`}
                >
                  {m.fromDatabase}
                </button>
              </div>

              {/* From System dropzone */}
              {rfpTab === "system" && (
                <div
                  className="relative mt-3 flex flex-col items-center justify-center gap-2 rounded-xl py-3 text-center"
                  style={{
                    background:
                      "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)",
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    if (files.length) setRfpFiles((prev) => [...prev, ...files]);
                  }}
                >
                  <svg className="pointer-events-none absolute inset-0 h-full w-full text-[#488981]" style={{ overflow: "visible" }}>
                    <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
                  </svg>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
                    <DropzoneUploadIcon />
                  </span>
                  <p className="text-xs text-black/60 dark:text-white/50">
                    {t.dashboard.newProposal.upload.dragDropLabel}
                  </p>
                  <button
                    type="button"
                    onClick={() => rfpFileInputRef.current?.click()}
                    className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white hover:opacity-90 cursor-pointer"
                  >
                    {t.dashboard.newProposal.upload.browseFiles}
                  </button>
                  <p className="text-[10px] text-black/40 dark:text-white/30">
                    {t.dashboard.newProposal.upload.fileTypes}
                  </p>
                </div>
              )}

              {/* From Database */}
              {rfpTab === "database" && (
                <div className="mt-3">
                  {rfpDbLoading ? (
                    <div className="flex justify-center py-6">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                  ) : rfpDbDocs.length === 0 ? (
                    <p className="py-4 text-center text-xs text-black/40 dark:text-white/30">No RFP documents found.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {rfpDbDocs.map((doc) => (
                        <label
                          key={doc.id}
                          className="flex cursor-pointer items-center gap-2 rounded-[12px] bg-white p-3 hover:border-primary/40 dark:border-white/10 dark:bg-white/5"
                        >
                          <Image src={pdfIconSrc} alt="PDF" width={36} height={36} className="shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-black dark:text-white">{doc.name}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={rfpDbSelected.has(doc.id)}
                            onChange={() => setRfpDbSelected((prev) => {
                              const next = new Set(prev);
                              next.has(doc.id) ? next.delete(doc.id) : next.add(doc.id);
                              return next;
                            })}
                            className="size-4 shrink-0 accent-primary cursor-pointer"
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Form grid */}
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${rfpMode === "upload" ? "hidden" : ""}`}
          >
            {/* Client Name */}
            <Field label={m.clientNameLabel} required>
              <InputWithIcon
                placeholder={m.clientNamePlaceholder}
                icon={<PersonIcon size={20} />}
                value={clientName}
                onChange={setClientName}
              />
            </Field>

            {/* Project Name */}
            <Field label={m.projectNameLabel} required>
              <InputWithIcon
                placeholder={m.projectNamePlaceholder}
                icon={<MonitorIcon />}
                value={projectName}
                onChange={setProjectName}
              />
            </Field>

            {/* Proposal Language */}
            <Field label={m.proposalLanguageLabel} required>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage("ar")}
                    className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white px-3 py-2.5 text-xs cursor-pointer"
                  >
                    <Image src={arFlagSrc} alt="AR" width={20} height={20} className="rounded-full" />
                    <span className="text-black dark:text-white">{m.arabic}</span>
                    <span className={`ms-auto flex size-4 items-center justify-center rounded-full border-2 ${language === "ar" ? "border-primary" : "border-[#D0D5DD]"}`}>
                      {language === "ar" && <span className="size-2 rounded-full bg-primary" />}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white px-3 py-2.5 text-xs cursor-pointer"
                  >
                    <Image src={enFlagSrc} alt="EN" width={20} height={20} className="rounded-full" />
                    <span className="text-black dark:text-white">{m.english}</span>
                    <span className={`ms-auto flex size-4 items-center justify-center rounded-full border-2 ${language === "en" ? "border-primary" : "border-[#D0D5DD]"}`}>
                      {language === "en" && <span className="size-2 rounded-full bg-primary" />}
                    </span>
                  </button>
                  {language && language !== "ar" && language !== "en" && (
                    <button type="button" className="flex flex-1 items-center gap-1.5 rounded-[12px] bg-white px-3 py-2.5 text-xs cursor-pointer">
                      <span className="text-black dark:text-white">{language}</span>
                      <span className="ms-auto flex size-4 items-center justify-center rounded-full border-2 border-primary">
                        <span className="size-2 rounded-full bg-primary" />
                      </span>
                    </button>
                  )}
                </div>
                <div className="relative shrink-0" ref={langRef}>
                  <button
                    type="button"
                    onClick={() => setLangOpen((o) => !o)}
                    className="input-style flex h-[44px] w-[44px] items-center justify-center rounded-full text-input-icon transition-colors cursor-pointer"
                    aria-label="Open language options"
                  >
                    <ArrowDownCircleIcon size={20} />
                  </button>
                  {langOpen && (
                    <div className="absolute end-0 top-full z-50 mt-2 min-w-44 max-h-52 overflow-y-auto rounded-xl border border-black/8 bg-white dark:bg-[#1A1A1A] shadow-lg">
                      {langLoading ? (
                        <div className="flex items-center justify-center py-3">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                      ) : langOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setLanguage(opt); setLangOpen(false); }}
                          className={`w-full px-4 py-2.5 text-start text-xs transition-colors hover:bg-primary/8 dark:hover:bg-white/5 ${
                            language === opt ? "font-semibold text-primary dark:text-[#519A91]" : "text-black/70 dark:text-white/60"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Field>

            {/* Sector / Industry */}
            <DropdownSelect
              label={m.sectorIndustryLabel}
              required
              placeholder={m.sectorIndustryPlaceholder}
              icon={<SectorIcon />}
              optionType="sector-industry"
              value={sector}
              onChange={setSector}
            />

            {/* Start Date */}
            <Field label={m.startDateLabel}>
              <InputWithIcon
                placeholder={m.datePlaceholder}
                icon={<DateCalendarIcon size={20} />}
                value={startDate}
                onChange={setStartDate}
              />
            </Field>

            {/* End Date */}
            <Field label={m.endDateLabel}>
              <InputWithIcon
                placeholder={m.datePlaceholder}
                icon={<DateCalendarIcon size={20} />}
                value={endDate}
                onChange={setEndDate}
              />
            </Field>
          </div>

          {/* Company Documents */}
          <div className="mt-6">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFilesSelected}
            />
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-black dark:text-white text-nowrap">
                {m.companyDocumentsLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDocsMode("manual")}
                  className={`flex items-center gap-0.5 md:gap-1.5 rounded-full px-3 py-2.5 text-xs font-medium cursor-pointer transition-colors text-nowrap ${
                    docsMode === "manual"
                      ? "bg-primary text-white hover:opacity-90"
                      : "border border-white bg-white/50 text-black hover:border-primary hover:text-primary dark:border-white/10/20 dark:bg-white/5 dark:text-white"
                  }`}
                >
                  <UploadIcon />
                  {m.uploadManual}
                </button>
                <button
                  type="button"
                  onClick={() => setDocsMode("database")}
                  className={`flex items-center gap-0.5 md:gap-1.5 rounded-full px-3 py-2.5 text-xs font-medium cursor-pointer transition-colors text-nowrap ${
                    docsMode === "database"
                      ? "bg-primary text-white hover:opacity-90"
                      : "border border-white bg-white/50 text-black hover:border-primary hover:text-primary dark:border-white/10/20 dark:bg-white/5 dark:text-white"
                  }`}
                >
                  <DatabaseIcon active={docsMode === "database"} />
                  {m.uploadFromDatabase}
                </button>
              </div>
            </div>

            {/* Manual upload dropzone */}
            {docsMode === "manual" && (
              <div
                className="relative flex flex-col items-center justify-center gap-2 rounded-xl py-3 text-center"
                style={{
                  background:
                    "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  if (files.length) {
                    setCompanyDocFiles((prev) => [...prev, ...files]);
                    setLocalDocs((prev) => [...mapFilesToDocs(files), ...prev]);
                    setDocsMode("database");
                  }
                }}
              >
                <svg className="pointer-events-none absolute inset-0 h-full w-full text-[#488981]" style={{ overflow: "visible" }}>
                  <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
                </svg>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
                  <DropzoneUploadIcon />
                </span>
                <p className="text-xs text-black/60 dark:text-white/50">
                  {t.dashboard.newProposal.upload.dragDropLabel}
                </p>
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white hover:opacity-90 cursor-pointer"
                >
                  {t.dashboard.newProposal.upload.browseFiles}
                </button>
                <p className="text-[10px] text-black/40 dark:text-white/30">
                  {t.dashboard.newProposal.upload.fileTypes}
                </p>
              </div>
            )}

            {/* Document grid */}
            {docsMode === "database" && (
              companyDbLoading ? (
                <div className="flex justify-center py-6">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : !hasDocs ? (
                <p className="py-4 text-center text-xs text-black/40 dark:text-white/30">No company documents found.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[...companyDbDocs, ...localDocs].map((doc) => (
                    <label
                      key={doc.id}
                      className="flex cursor-pointer items-center gap-2 rounded-[12px] bg-white p-3 hover:border-primary/40 dark:border-white/10 dark:bg-white/5"
                    >
                      <Image
                        src={pdfIconSrc}
                        alt="PDF"
                        width={36}
                        height={36}
                        className="shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-black dark:text-white">
                          {doc.name}
                        </p>
                        {"size" in doc && doc.size && (
                          <p className="text-xs text-[#6B7280]">{doc.size}</p>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedDocs.has(doc.id)}
                        onChange={() => toggleDoc(doc.id)}
                        className="size-4 shrink-0 accent-primary cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={generating}
              className="rounded-full px-5 py-2.5 text-sm font-medium bg-white/50 border border-white text-black hover:opacity-70 cursor-pointer dark:text-white disabled:opacity-40"
            >
              {m.cancel}
            </button>
            <button
              type="button"
              onClick={handleDone}
              disabled={generating}
              className="rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 cursor-pointer disabled:opacity-40 flex items-center gap-2"
            >
              {generating && (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {m.done}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
