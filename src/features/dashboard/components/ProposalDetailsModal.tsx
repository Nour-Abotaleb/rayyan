"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProposals } from "@/hooks/useProposals";
import CloseIcon from "@/icons/CloseIcon";
import PersonIcon from "@/icons/PersonIcon";
import SectorIcon from "@/icons/SectorIcon";
import PlusIcon from "@/icons/PlusIcon";
import DropzoneUploadIcon from "@/icons/DropzoneUploadIcon";
import DropdownSelect from "@/components/DropdownSelect";
import LanguageSelector from "@/components/LanguageSelector";
import DateInput from "@/features/proposals/components/sections/DateInput";
import pdfIcon from "@src/assets/dashboard/pdf.svg";
import { documentsService, type Document as ApiDocument } from "@/lib/api/documents.service";

// ── Local icons (unique to this component) ───────────────────────────

function MonitorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M8.96875 22H14.9688C19.9688 22 21.9688 20 21.9688 15V9C21.9688 4 19.9688 2 14.9688 2H8.96875C3.96875 2 1.96875 4 1.96875 9V15C1.96875 20 3.96875 22 8.96875 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.96875 12.7001L7.96875 12.6801C8.71875 12.6801 9.55875 13.2501 9.83875 13.9501L10.9787 16.8301C11.2387 17.4801 11.6487 17.4801 11.9087 16.8301L14.1987 11.0201C14.4187 10.4601 14.8287 10.4401 15.1087 10.9701L16.1487 12.9401C16.4587 13.5301 17.2587 14.0101 17.9187 14.0101H21.9788" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.24935 12.8334H8.74935C11.666 12.8334 12.8327 11.6667 12.8327 8.75008V5.25008C12.8327 2.33341 11.666 1.16675 8.74935 1.16675H5.24935C2.33268 1.16675 1.16602 2.33341 1.16602 5.25008V8.75008C1.16602 11.6667 2.33268 12.8334 5.24935 12.8334Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.25 5.54761L7 3.79761L8.75 5.54761" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 3.79761V8.46427" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 9.63086C5.76917 10.3892 8.23083 10.3892 10.5 9.63086" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatabaseIcon({ active }: { active?: boolean }) {
  const stroke = active ? "white" : "currentColor";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4.66602 1.16675V2.91675" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33398 1.16675V2.91675" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.08398 6.41675H8.75065" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.08398 8.75H7.00065" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.75 12.8334H5.25C2.33333 12.8334 1.75 11.6317 1.75 9.22842V5.62925C1.75 2.88758 2.72417 2.15258 4.66667 2.04175H9.33333C11.2758 2.14675 12.25 2.88758 12.25 5.62925V9.33342" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.25 9.33325L8.75 12.8333V11.0833C8.75 9.91659 9.33333 9.33325 10.5 9.33325H12.25Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RfpUploadIcon({ active }: { active?: boolean }) {
  const stroke = active ? "white" : "currentColor";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.24935 12.8334H8.74935C11.666 12.8334 12.8327 11.6667 12.8327 8.75008V5.25008C12.8327 2.33341 11.666 1.16675 8.74935 1.16675H5.24935C2.33268 1.16675 1.16602 2.33341 1.16602 5.25008V8.75008C1.16602 11.6667 2.33268 12.8334 5.24935 12.8334Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.25 5.54761L7 3.79761L8.75 5.54761" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 3.79761V8.46427" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 9.63086C5.76917 10.3892 8.23083 10.3892 10.5 9.63086" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AddManualIcon({ active }: { active?: boolean }) {
  const stroke = active ? "white" : "currentColor";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4.66602 7H9.33268" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9.33341V4.66675" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.24935 12.8334H8.74935C11.666 12.8334 12.8327 11.6667 12.8327 8.75008V5.25008C12.8327 2.33341 11.666 1.16675 8.74935 1.16675H5.24935C2.33268 1.16675 1.16602 2.33341 1.16602 5.25008V8.75008C1.16602 11.6667 2.33268 12.8334 5.24935 12.8334Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────

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

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black dark:text-white">
        {label}
        {required && <span className="ms-0.5 text-black dark:text-white"> *</span>}
      </label>
      {children}
    </div>
  );
}

function InputWithIcon({ placeholder, icon, value, onChange }: { placeholder: string; icon: React.ReactNode; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm font-[300] text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
      />
      <span className="pointer-events-none absolute end-3 text-[#A0A3BD]">{icon}</span>
    </div>
  );
}

function DashedDropzone({ children, onDrop }: { children: React.ReactNode; onDrop: (files: File[]) => void }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2 rounded-xl py-3 text-center mt-2"
      style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); onDrop(Array.from(e.dataTransfer.files)); }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full text-[#488981]" style={{ overflow: "visible" }}>
        <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
      </svg>
      {children}
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

  const [rfpMode, setRfpMode] = useState<"none" | "upload" | "manual">("manual");
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

  const pdfIconSrc = typeof pdfIcon === "string" ? pdfIcon : (pdfIcon as { src: string }).src;

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
      router.push(`/dashboard/proposals${res.data.proposalId ? `?generated=${res.data.proposalId}` : ""}`);
    }
  }

  function toggleDoc(id: string) {
    setSelectedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
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
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        dir={dir}
        className="relative w-full max-w-[900px] max-h-[94vh] overflow-y-auto scrollbar-hide rounded-2xl bg-gradient-to-r from-[#F8F8F8] from-[70%] to-[#E5EEED] shadow-xl dark:bg-[#1A1A1A]"
      >
        <div className="px-6 py-4">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">{m.title}</h2>
              <p className="mt-0.5 text-xs text-black/50 dark:text-white/50">{m.subtitle}</p>
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
            <span className="text-sm font-semibold text-black dark:text-white">{m.rfpLabel}</span>
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
                onClick={() => setRfpMode(rfpMode === "upload" ? "none" : "upload")}
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
                onClick={() => setRfpMode(rfpMode === "manual" ? "none" : "manual")}
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

          {/* RFP Upload panel */}
          {rfpMode === "upload" && (
            <div className="mb-4">
              <div className="flex">
                {(["system", "database"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRfpTab(key)}
                    className={`flex-1 py-2.5 text-center text-sm font-semibold tracking-wide cursor-pointer transition-colors ${
                      rfpTab === key
                        ? "border-b-2 border-primary text-black"
                        : "text-[#939393] hover:text-black/70"
                    }`}
                  >
                    {key === "system" ? m.fromSystem : m.fromDatabase}
                  </button>
                ))}
              </div>

              {rfpTab === "system" && (
                <DashedDropzone onDrop={(files) => setRfpFiles((prev) => [...prev, ...files])}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
                    <DropzoneUploadIcon />
                  </span>
                  <p className="text-xs text-black/60 dark:text-white/50">{t.dashboard.newProposal.upload.dragDropLabel}</p>
                  <button type="button" onClick={() => rfpFileInputRef.current?.click()} className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white hover:opacity-90 cursor-pointer">
                    {t.dashboard.newProposal.upload.browseFiles}
                  </button>
                  <p className="text-[10px] text-black/40 dark:text-white/30">{t.dashboard.newProposal.upload.fileTypes}</p>
                </DashedDropzone>
              )}

              {rfpTab === "database" && (
                <div className="mt-3">
                  {rfpDbLoading ? (
                    <div className="flex justify-center py-6"><span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
                  ) : rfpDbDocs.length === 0 ? (
                    <p className="py-4 text-center text-xs text-black/40 dark:text-white/30">No RFP documents found.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {rfpDbDocs.map((doc) => (
                        <label key={doc.id} className="flex cursor-pointer items-center gap-2 rounded-[12px] bg-white p-3 hover:border-primary/40 dark:border-white/10 dark:bg-white/5">
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
          <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${rfpMode === "upload" ? "hidden" : ""}`}>
            <Field label={m.clientNameLabel} required>
              <InputWithIcon placeholder={m.clientNamePlaceholder} icon={<PersonIcon size={20} />} value={clientName} onChange={setClientName} />
            </Field>
            <Field label={m.projectNameLabel} required>
              <InputWithIcon placeholder={m.projectNamePlaceholder} icon={<MonitorIcon />} value={projectName} onChange={setProjectName} />
            </Field>
            <Field label={m.proposalLanguageLabel} required>
              <LanguageSelector value={language} onChange={setLanguage} />
            </Field>
            <DropdownSelect
              label={m.sectorIndustryLabel}
              required
              placeholder={m.sectorIndustryPlaceholder}
              icon={<SectorIcon />}
              optionType="sector-industry"
              value={sector}
              onChange={setSector}
            />
            <Field label={m.startDateLabel}>
              <DateInput value={startDate} onChange={setStartDate} placeholder={m.datePlaceholder} isRtl={dir === "rtl"} />
            </Field>
            <Field label={m.endDateLabel}>
              <DateInput value={endDate} onChange={setEndDate} placeholder={m.datePlaceholder} isRtl={dir === "rtl"} />
            </Field>
          </div>

          {/* Company Documents */}
          <div className="mt-6">
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFilesSelected} />
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-black dark:text-white text-nowrap">{m.companyDocumentsLabel}</span>
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

            {docsMode === "manual" && (
              <DashedDropzone onDrop={(files) => { setCompanyDocFiles((prev) => [...prev, ...files]); setLocalDocs((prev) => [...mapFilesToDocs(files), ...prev]); setDocsMode("database"); }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
                  <DropzoneUploadIcon />
                </span>
                <p className="text-xs text-black/60 dark:text-white/50">{t.dashboard.newProposal.upload.dragDropLabel}</p>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white hover:opacity-90 cursor-pointer">
                  {t.dashboard.newProposal.upload.browseFiles}
                </button>
                <p className="text-[10px] text-black/40 dark:text-white/30">{t.dashboard.newProposal.upload.fileTypes}</p>
              </DashedDropzone>
            )}

            {docsMode === "database" && (
              companyDbLoading ? (
                <div className="flex justify-center py-6"><span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
              ) : !hasDocs ? (
                <p className="py-4 text-center text-xs text-black/40 dark:text-white/30">No company documents found.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[...companyDbDocs, ...localDocs].map((doc) => (
                    <label key={doc.id} className="flex cursor-pointer items-center gap-2 rounded-[12px] bg-white p-3 hover:border-primary/40 dark:border-white/10 dark:bg-white/5">
                      <Image src={pdfIconSrc} alt="PDF" width={36} height={36} className="shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-black dark:text-white">{doc.name}</p>
                        {"size" in doc && doc.size && <p className="text-xs text-[#6B7280]">{doc.size}</p>}
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
              {generating && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              {m.done}
              {!generating && <PlusIcon size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
