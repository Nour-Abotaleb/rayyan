"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { documentsService, type Document as ApiDocument } from "@/lib/api/documents.service";
import { useLanguage } from "@/contexts/LanguageContext";
import pdfIcon from "@src/assets/dashboard/pdf.svg";
import PersonIcon from "@/icons/PersonIcon";
import DropdownSelect from "@/components/DropdownSelect";


interface Member {
  id: number;
  name: string;
  role: string;
  yearsOfExperience: string;
  keySkills: string;
  cvFile: File | null;
}

export interface UploadStepData {
  mode: "manual" | "database";
  members: Omit<Member, "id">[];
  cvDocIds: string[];
  cvDocs: { id: string; name: string }[];
}

function UploadManualIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.24935 12.8332H8.74935C11.666 12.8332 12.8327 11.6665 12.8327 8.74984V5.24984C12.8327 2.33317 11.666 1.1665 8.74935 1.1665H5.24935C2.33268 1.1665 1.16602 2.33317 1.16602 5.24984V8.74984C1.16602 11.6665 2.33268 12.8332 5.24935 12.8332Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.25 5.54736L7 3.79736L8.75 5.54736" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 3.79736V8.46403" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 9.63086C5.76917 10.3892 8.23083 10.3892 10.5 9.63086" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UploadDbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4.66602 1.1665V2.9165" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33398 1.1665V2.9165" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.08398 6.4165H8.75065" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.08398 8.75H7.00065" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.75 12.8332H5.25C2.33333 12.8332 1.75 11.6315 1.75 9.22817V5.629C1.75 2.88734 2.72417 2.15234 4.66667 2.0415H9.33333C11.2758 2.1465 12.25 2.88734 12.25 5.629V9.33317" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.25 9.3335L8.75 12.8335V11.0835C8.75 9.91683 9.33333 9.3335 10.5 9.3335H12.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RoleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8.96875 22H14.9688C19.9688 22 21.9688 20 21.9688 15V9C21.9688 4 19.9688 2 14.9688 2H8.96875C3.96875 2 1.96875 4 1.96875 9V15C1.96875 20 3.96875 22 8.96875 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.96875 12.7001L7.96875 12.6801C8.71875 12.6801 9.55875 13.2501 9.83875 13.9501L10.9787 16.8301C11.2387 17.4801 11.6487 17.4801 11.9087 16.8301L14.1987 11.0201C14.4187 10.4601 14.8287 10.4401 15.1087 10.9701L16.1487 12.9401C16.4587 13.5301 17.2587 14.0101 17.9187 14.0101H21.9788" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21.6668 14.3L21.2668 19.3C21.1168 20.83 20.9968 22 18.2868 22H5.70684C2.99684 22 2.87684 20.83 2.72684 19.3L2.32684 14.3C2.24684 13.47 2.50684 12.7 2.97684 12.11C2.98684 12.1 2.98684 12.1 2.99684 12.09C3.54684 11.42 4.37684 11 5.30684 11H18.6868C19.6168 11 20.4368 11.42 20.9768 12.07C20.9868 12.08 20.9968 12.09 20.9968 12.1C21.4868 12.69 21.7568 13.46 21.6668 14.3Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
      <path d="M3.5 11.4303V6.28027C3.5 2.88027 4.35 2.03027 7.75 2.03027H9.02C10.29 2.03027 10.58 2.41027 11.06 3.05027L12.33 4.75027C12.65 5.17027 12.84 5.43027 13.69 5.43027H16.24C19.64 5.43027 20.49 6.28027 20.49 9.68027V11.4703" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.42969 17H14.5697" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SkillsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18.32 12.0002C20.92 12.0002 22 11.0002 21.04 7.72018C20.39 5.51018 18.49 3.61018 16.28 2.96018C13 2.00018 12 3.08018 12 5.68018V8.56018C12 11.0002 13 12.0002 15 12.0002H18.32Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.0014 14.6998C19.0714 19.3298 14.6314 22.6898 9.5814 21.8698C5.7914 21.2598 2.7414 18.2098 2.1214 14.4198C1.3114 9.38977 4.6514 4.94977 9.2614 4.00977" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DropzoneUploadIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M14.834 13.8333L10.834 9.83325L6.83399 13.8333M10.834 9.83325V18.8333M18.834 14.5761C20.0555 13.5673 20.834 12.0412 20.834 10.3333C20.834 7.29569 18.3716 4.83325 15.334 4.83325C15.1155 4.83325 14.911 4.71925 14.8001 4.53099C13.496 2.31809 11.0884 0.833252 8.33399 0.833252C4.19185 0.833252 0.833984 4.19112 0.833984 8.33325C0.833984 10.3994 1.66943 12.2703 3.02093 13.6268" stroke="#488981" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MemberDropzone({ label, onFileChange }: { label: string; onFileChange: (file: File | null) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  function handleFile(f: File | null) {
    setFile(f);
    onFileChange(f);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-[550] text-black dark:text-white">
        {label} <span>*</span>
      </label>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt,.jpg,.png"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-white bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <Image src={pdfIcon} alt="PDF" width={36} height={36} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-black dark:text-white">{file.name.replace(/\.[^.]+$/, "")}</p>
            <p className="text-xs text-black/40 dark:text-white/35">
              {file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)}KB` : `${(file.size / (1024 * 1024)).toFixed(1)}MB`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleFile(null)}
            className="shrink-0 cursor-pointer text-black/40 hover:text-red-500 transition-colors dark:text-white/40"
            aria-label="Remove file"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className="relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 text-center cursor-pointer"
          style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full text-primary" style={{ overflow: "visible" }}>
            <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
          </svg>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
            <DropzoneUploadIcon />
          </span>
          <p className="text-xs text-black/60 dark:text-white/50">Drag and drop files here or</p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
            className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-white hover:opacity-90 cursor-pointer"
          >
            Browse Files
          </button>
          <p className="text-[10px] text-black/40 dark:text-white/30">(PDF, DOCX, DOC, TXT, JPG, PNG)</p>
        </div>
      )}
    </div>
  );
}

function MemberForm({
  index,
  member,
  onChange,
  onCvChange,
  showCv = true,
}: {
  index: number;
  member: Member;
  onChange: (id: number, field: keyof Omit<Member, "id" | "cvFile">, value: string) => void;
  onCvChange: (id: number, file: File | null) => void;
  showCv?: boolean;
}) {
  const { t } = useLanguage();
  const u = t.dashboard.newProposal.upload;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-black dark:text-white">
        {u.memberLabel} {index + 1}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-[550] text-black dark:text-white">
            {u.nameLabel} <span>*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={u.namePlaceholder}
              value={member.name}
              onChange={(e) => onChange(member.id, "name", e.target.value)}
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
            />
            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
              <PersonIcon size={18} />
            </span>
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-[550] text-black dark:text-white">
            {u.roleLabel} <span>*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={u.rolePlaceholder}
              value={member.role}
              onChange={(e) => onChange(member.id, "role", e.target.value)}
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
            />
            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
              <RoleIcon />
            </span>
          </div>
        </div>

        {/* Years of Experience */}
        <DropdownSelect
          label={u.yearsOfExperienceLabel}
          required
          placeholder={u.yearsOfExperiencePlaceholder}
          icon={<ExperienceIcon />}
          optionType="years-of-experience"
          value={member.yearsOfExperience}
          onChange={(v) => onChange(member.id, "yearsOfExperience", v)}
        />

        {/* Key Skills */}
        <DropdownSelect
          label={u.keySkillsLabel}
          required
          placeholder={u.keySkillsPlaceholder}
          icon={<SkillsIcon />}
          optionType="key-skills"
          value={member.keySkills}
          onChange={(v) => onChange(member.id, "keySkills", v)}
        />
      </div>

      {/* CV/Resume dropzone */}
      {showCv && <MemberDropzone label={u.cvResumeLabel} onFileChange={(f) => onCvChange(member.id, f)} />}
    </div>
  );
}

export default function ProposalUploadStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (data: UploadStepData) => void;
}) {
  const { t } = useLanguage();
  const u = t.dashboard.newProposal.upload;
  const actions = t.dashboard.newProposal.actions;

  const [tab, setTab] = useState<"manual" | "database">("manual");
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "", role: "", yearsOfExperience: "", keySkills: "", cvFile: null },
  ]);
  const [selectedCvs, setSelectedCvs] = useState<string[]>([]);
  const [cvDocs, setCvDocs] = useState<ApiDocument[]>([]);
  const [cvLoading, setCvLoading] = useState(false);

  useEffect(() => {
    if (tab !== "database") return;
    if (cvDocs.length || cvLoading) return;
    setCvLoading(true);
    documentsService.getDocuments("cvResume").then((res) => {
      if (res.ok) setCvDocs(res.data.documents);
      setCvLoading(false);
    });
  }, [tab]);

  function updateMember(id: number, field: keyof Member, value: string) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  }

  function addMember() {
    setMembers((prev) => [
      ...prev,
      { id: Date.now(), name: "", role: "", yearsOfExperience: "", keySkills: "", cvFile: null },
    ]);
  }

  function updateMemberCv(id: number, file: File | null) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, cvFile: file } : m)));
  }

  function toggleCv(id: string) {
    setSelectedCvs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <main className="flex flex-col gap-6 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-black dark:text-white">
          {u.teamMembersTitle}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab("manual")}
            className={`flex items-center gap-0.5 md:gap-1.5 rounded-full px-3 py-2.5 text-xs font-medium transition-colors cursor-pointer text-nowrap ${
              tab === "manual"
                ? "bg-primary text-white hover:opacity-90"
                : "border border-white bg-white/50 text-black hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
            }`}
          >
            <UploadManualIcon />
            {u.uploadManual}
          </button>
          <button
            type="button"
            onClick={() => setTab("database")}
            className={`flex items-center gap-0.5 md:gap-1.5 rounded-full px-3 py-2.5 text-xs font-medium transition-colors cursor-pointer text-nowrap ${
              tab === "database"
                ? "bg-primary text-white hover:opacity-90"
                : "border border-white bg-white/50 text-black hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
            }`}
          >
            <UploadDbIcon />
            {u.uploadFromDatabase}
          </button>
        </div>
      </div>

      {/* Manual tab */}
      {tab === "manual" && (
        <>
          <div className="flex flex-col gap-8">
            {members.map((member, i) => (
              <MemberForm
                key={member.id}
                index={i}
                member={member}
                onChange={updateMember}
                onCvChange={updateMemberCv}
                showCv
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addMember}
            className="w-full rounded-full bg-primary py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer dark:text-black"
          >
            {u.addNewMember}
          </button>
        </>
      )}

      {/* Database tab */}
      {tab === "database" && (
        <>
          {/* CV database selector */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-black dark:text-white">
              {u.selectCvResume}
            </h3>
            {cvLoading ? (
              <div className="flex justify-center py-6">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : cvDocs.length === 0 ? (
              <p className="py-4 text-center text-xs text-black/40 dark:text-white/30">No CV documents found.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {cvDocs.map((cv) => (
                  <label
                    key={cv.id}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5"
                  >
                    <Image src={pdfIcon} alt="PDF" width={40} height={40} className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-black dark:text-white">{cv.name}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedCvs.includes(cv.id)}
                      onChange={() => toggleCv(cv.id)}
                      className="size-4 shrink-0 accent-primary cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white bg-white/50 px-4 py-2.5 text-sm font-normal text-black hover:opacity-80 transition-opacity cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {actions.previousSections}
        </button>
        <button
          type="button"
          onClick={() =>
            onNext({
              mode: tab,
              members: members.map(({ name, role, yearsOfExperience, keySkills, cvFile }) => ({
                name, role, yearsOfExperience, keySkills, cvFile,
              })),
              cvDocIds: selectedCvs,
              cvDocs: cvDocs
                .filter((d) => selectedCvs.includes(d.id))
                .map(({ id, name }) => ({ id, name })),
            })
          }
          className="rounded-full bg-primary px-4 py-2.5 text-sm font-normal text-white hover:opacity-90 transition-colors cursor-pointer dark:text-black"
        >
          {actions.nextPersonalInformation}
        </button>
      </div>
    </main>
  );
}
