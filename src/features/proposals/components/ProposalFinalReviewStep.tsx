"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SectionsStepData } from "@/features/proposals/components/ProposalSectionsStep";
import type { UploadStepData } from "@/features/proposals/components/ProposalUploadStep";
import pdfIcon from "@src/assets/dashboard/pdf.svg";

interface BasicInfo {
  clientName: string;
  projectName: string;
  sectorIndustry: string;
  proposalType: string;
  proposalLanguage: string;
  startDate: string;
  endDate: string;
  additionalDetails: string;
}

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function monthsBetween(from: string, to: string) {
  if (!from || !to) return null;
  const a = new Date(from + "T00:00:00");
  const b = new Date(to + "T00:00:00");
  return Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()));
}

function weeksBetween(from: string, to: string) {
  const days = Math.max(1, Math.round(
    (new Date(to + "T00:00:00").getTime() - new Date(from + "T00:00:00").getTime()) / 86400000,
  ));
  return Math.ceil(days / 7);
}

function fmtFileSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)}KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// ── Section separator ─────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base md:text-lg font-bold text-black dark:text-white">{children}</h2>
      <hr className="border-black/10 dark:border-white/10" />
    </div>
  );
}

// ── Label / value pair ────────────────────────────────────────────────────────
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-semibold text-black dark:text-white/40">{label}:</span>
      <span className="text-sm text-black dark:text-white">{value || "—"}</span>
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
      aria-label="Remove attachment"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path opacity="0.3" d="M12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4ZM16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59L14.59 8L16 9.41L13.41 12L16 14.59Z" fill="#858585" />
        <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#858585" />
      </svg>
    </button>
  );
}

export default function ProposalFinalReviewStep({
  basicInfo,
  sectionsData,
  uploadData,
  onBack,
  onSubmit,
  onRemoveTimelineFile,
  onRemoveMemberCv,
  onRemoveCvDoc,
  loading = false,
}: {
  basicInfo: BasicInfo;
  sectionsData: SectionsStepData | null;
  uploadData: UploadStepData | null;
  onBack: () => void;
  onSubmit: () => void;
  onRemoveTimelineFile?: (index: number) => void;
  onRemoveMemberCv?: (memberIndex: number) => void;
  onRemoveCvDoc?: (docId: string) => void;
  loading?: boolean;
}) {
  const { t } = useLanguage();
  const actions = t.dashboard.newProposal.actions;

  const months = monthsBetween(basicInfo.startDate, basicInfo.endDate);
  const periodLabel = basicInfo.startDate || basicInfo.endDate
    ? [
        basicInfo.startDate ? fmtDate(basicInfo.startDate) : null,
        basicInfo.endDate   ? fmtDate(basicInfo.endDate)   : null,
      ].filter(Boolean).join(" – ") + (months ? ` (${months} Months)` : "")
    : "—";

  const allChips = (sectionsData?.sections ?? []).flatMap((s) => s.chips);

  return (
    <main className="flex flex-col gap-6 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">

      {/* ── Project Identity Summary ──────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Project Identity Summary</SectionTitle>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <Field label="Project Name" value={basicInfo.projectName} />
          <Field label="Client Name" value={basicInfo.clientName} />
          <Field label="Project Type" value={basicInfo.proposalType} />
          <Field label="Sector" value={basicInfo.sectorIndustry} />
          <Field label="Proposal Language" value={basicInfo.proposalLanguage} />
          <Field label="Project Period" value={periodLabel} />
        </div>

        {allChips.length > 0 && (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-black dark:text-white/40">Selected Sections:</span>
            <span className="text-sm text-black dark:text-white">{allChips.join(", ")}</span>
          </div>
        )}
      </div>

      {/* ── Project Timeline ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Project Timeline</SectionTitle>

        {!sectionsData?.ganttCards.length ? (
          <p className="text-sm text-black/40 dark:text-white/30">No timeline milestones added.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectionsData.ganttCards.map((card, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-md border border-[#E7E7E7] bg-[#f9f9f9] px-4 py-3 dark:border-white/10 dark:bg-white/5"
              >
                {/* <span className="text-sm font-semibold text-primary">Phase {i + 1}:</span> */}
                <p className="text-sm font-semibold text-black dark:text-white leading-snug">{card.title}</p>
                <p className="text-xs text-black/45 dark:text-white/40">
                  <span className="font-semibold">Duration:</span> {weeksBetween(card.from, card.to)} Weeks
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline file attachments */}
      {!!sectionsData?.timelineFiles.length && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-black/50 dark:text-white/40">Timeline Attachments:</span>
          <div className="flex flex-col gap-2">
            {sectionsData.timelineFiles.map((file, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-[#E7E7E7] bg-white px-3 py-2 dark:border-white/10 dark:bg-white/5">
                <Image src={pdfIcon} alt="file" width={28} height={28} className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-black dark:text-white">{file.name.replace(/\.[^.]+$/, "")}</p>
                  <p className="text-[10px] text-black/40 dark:text-white/35">{fmtFileSize(file.size)}</p>
                </div>
                {onRemoveTimelineFile && <RemoveButton onClick={() => onRemoveTimelineFile(i)} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Project Team & Assets ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Project Team &amp; Assets</SectionTitle>

        {/* Database CV attachments */}
        {uploadData?.mode === "database" && !!uploadData.cvDocs?.length && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-black/50 dark:text-white/40">CV Attachments (from database):</span>
            <div className="flex flex-col gap-2">
              {uploadData.cvDocs.map((doc) => (
                <div key={doc.id} className="flex items-center gap-2 rounded-lg border border-[#E7E7E7] bg-white px-3 py-2 dark:border-white/10 dark:bg-white/5">
                  <Image src={pdfIcon} alt="file" width={28} height={28} className="shrink-0" />
                  <p className="truncate text-xs font-medium text-black dark:text-white flex-1">{doc.name}</p>
                  {onRemoveCvDoc && <RemoveButton onClick={() => onRemoveCvDoc(doc.id)} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {!uploadData?.members.length ? (
          <p className="text-sm text-black/40 dark:text-white/30">No team members added.</p>
        ) : (
          <div className="flex flex-col divide-y divide-black/8 dark:divide-white/10">
            {uploadData.members.map((member, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-4 first:pt-0 last:pb-0">
                {/* Member label */}
                <span className="pt-0.5 text-sm font-semibold text-black dark:text-white/50 whitespace-nowrap">
                  Member {i + 1}:
                </span>

                <div className="flex flex-col gap-3">
                  {/* Name / Role / Experience row */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-black dark:text-white/35">Name:</span>
                      <span className="text-sm text-black dark:text-white">{member.name || "—"}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-black dark:text-white/35">Role:</span>
                      <span className="text-sm text-black dark:text-white">{member.role || "—"}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-black dark:text-white/35">Experience:</span>
                      <span className="text-sm text-black dark:text-white">
                        {member.yearsOfExperience ? `${member.yearsOfExperience} Years` : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Key Skills */}
                  {member.keySkills && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-black dark:text-white/35">Key Skills:</span>
                      <span className="text-sm text-black dark:text-white">{member.keySkills}</span>
                    </div>
                  )}

                  {/* CV Attachment */}
                  {member.cvFile && (
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-black dark:text-white/35">Attachment:</span>
                      <div className="flex items-center gap-2 rounded-lg border border-[#E7E7E7] bg-white px-3 py-3 dark:border-white/10 dark:bg-white/5">
                        <Image src={pdfIcon} alt="PDF" width={28} height={28} className="shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-black dark:text-white">
                            {member.cvFile.name.replace(/\.[^.]+$/, "")}
                          </p>
                          <p className="text-[10px] text-black/40 dark:text-white/35">
                            {fmtFileSize(member.cvFile.size)}
                          </p>
                        </div>
                        {onRemoveMemberCv && <RemoveButton onClick={() => onRemoveMemberCv(i)} />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white bg-white/50 px-4 py-2.5 text-sm font-normal text-black hover:opacity-80 transition-opacity cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {actions.previousUpload}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-normal text-white hover:opacity-90 transition-opacity cursor-pointer dark:text-black disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
          )}
          {actions.createProposal}
        </button>
      </div>
    </main>
  );
}
