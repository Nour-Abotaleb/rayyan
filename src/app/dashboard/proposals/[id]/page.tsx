"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { proposalsService } from "@/lib/api/proposals.service";
import ProposalPreview, { type ProposalPreviewData } from "@/features/proposals/components/ProposalPreview";

const POLL_INTERVAL = 4000;
const MAX_POLLS = 60; // 4 min max

export default function ProposalViewPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ProposalPreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);
  const pollCount = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function attempt() {
      const res = await proposalsService.getParsedData(id);

      if (cancelled) return;

      if (res.ok) {
        setData(mapToPreview(id, res.data));
        setPolling(false);
        return;
      }

      // 404 means proposal not ready yet — keep polling
      if (res.status === 404) {
        pollCount.current += 1;
        if (pollCount.current >= MAX_POLLS) {
          setError("Proposal data is taking too long. Please try again later.");
          setPolling(false);
          return;
        }
        timerRef.current = setTimeout(attempt, POLL_INTERVAL);
        return;
      }

      // Any other error — stop
      setError(res.error ?? "Failed to load proposal.");
      setPolling(false);
    }

    attempt();

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id]);

  if (polling && !data) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1C4D3E] border-t-transparent" />
        <p className="text-sm font-medium text-black/50 dark:text-white/50">
          Generating proposal preview…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2">
        <p className="text-sm font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      {data && <ProposalPreview data={data} />}
    </div>
  );
}

// Maps the raw API response to the ProposalPreviewData shape.
// Adjust field names once the real API response is confirmed.
function mapToPreview(id: string, raw: Record<string, unknown>): ProposalPreviewData {
  // teamStructure — object with projectManager, technicalLead, developers[]
  const ts = raw.teamStructure as Record<string, unknown> | undefined;
  const teamStructure = ts
    ? {
        projectManager: str(ts.projectManager) ?? "",
        technicalLead:  str(ts.technicalLead)  ?? "",
        developers:     Array.isArray(ts.developers) ? ts.developers as { name: string; position: string }[] : [],
      }
    : undefined;

  return {
    id,
    title:            str(raw.title)            ?? str(raw.proposalTitle)   ?? "Proposal",
    clientName:       str(raw.clientName)        ?? str(raw.client)          ?? "",
    projectName:      str(raw.projectName)       ?? str(raw.project)         ?? "",
    sector:           str(raw.sector)            ?? str(raw.sectorIndustry)  ?? "",
    language:         str(raw.language)          ?? str(raw.proposalLanguage)?? "English",
    startDate:        str(raw.startDate)         ?? "",
    endDate:          str(raw.endDate)           ?? "",
    type:             proposalType(raw.type)     ?? "Technical",
    preparedBy:       str(raw.preparedBy)        ?? str(raw.companyName)     ?? undefined,
    companyName:      str(raw.companyName)                                   ?? undefined,
    executiveSummary: str(raw.executiveSummary)  ?? str(raw.summary)         ?? undefined,
    generatedContent: str(raw.generatedContent)                              ?? undefined,
    // Technical
    sections:         arr(raw.sections),
    team:             arr(raw.team),
    ganttCards:       arr(raw.ganttCards),
    milestones:       arr(raw.milestones),
    additionalDetails: str(raw.additionalDetails)                            ?? undefined,
    // Financial
    deliverables:     arr(raw.deliverables),
    paymentTerms:     arr(raw.paymentTerms),
    totalAmount:      num(raw.totalAmount)       ?? num(raw.total)           ?? undefined,
    currency:         str(raw.currency)                                      ?? "SAR",
    taxRate:          num(raw.taxRate)                                       ?? undefined,
    boqType:          str(raw.boqType)                                       ?? undefined,
    projectType:      str(raw.projectType)                                   ?? undefined,
    terms:            str(raw.terms)                                         ?? undefined,
    // Visualization
    teamStructure,
    skillset:         arr(raw.skillset),
    phases:           arr(raw.phases),
  };
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v ? v : undefined;
}

function num(v: unknown): number | undefined {
  return typeof v === "number" ? v : undefined;
}

function arr<T>(v: unknown): T[] | undefined {
  return Array.isArray(v) && v.length > 0 ? (v as T[]) : undefined;
}

function proposalType(v: unknown): ProposalPreviewData["type"] | undefined {
  if (v === "Technical" || v === "Financial" || v === "Visualization") return v;
  return undefined;
}
