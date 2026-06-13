"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import VisualizationTeamStep, { type TeamStepData } from "./VisualizationTeamStep";
import VisualizationSkillsetStep, { type SkillsetStepData, defaultSkillsetData } from "./VisualizationSkillsetStep";
import VisualizationTimelineStep, { type TimelineStepData } from "./VisualizationTimelineStep";
import { visualizationProposalService } from "@/lib/api/visualization-proposal.service";

type Tab = "team" | "skillset" | "timeline";

const TABS: { key: Tab; label: string }[] = [
  { key: "team", label: "Team Structure" },
  { key: "skillset", label: "Skillset Visualization" },
  { key: "timeline", label: "Project Timeline" },
];

const DEFAULT_TEAM: TeamStepData = {
  projectManager: "",
  technicalLead: "",
  developers: [{ name: "", position: "" }],
};

const DEFAULT_TIMELINE: TimelineStepData = {
  phases: [{ id: 1, title: "", duration: "", description: "" }],
};

export default function VisualizationProposalPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("team");
  const [submitting, setSubmitting] = useState(false);

  // Step data
  const [teamData, setTeamData] = useState<TeamStepData>(DEFAULT_TEAM);
  const [skillsetData, setSkillsetData] = useState<SkillsetStepData>(defaultSkillsetData);
  const [timelineData, setTimelineData] = useState<TimelineStepData>(DEFAULT_TIMELINE);

  async function handleSubmit() {
    setSubmitting(true);

    const res = await visualizationProposalService.createProposal({
      projectManager: teamData.projectManager,
      technicalLead: teamData.technicalLead,
      developers: teamData.developers.filter((d) => d.name.trim() || d.position.trim()),
      skills: skillsetData.skills.map(({ name, description, level }) => ({ name, description, level })),
      phases: timelineData.phases
        .filter((p) => p.title.trim())
        .map(({ title, duration, description }) => ({ title, duration, description })),
    });

    if (!res.ok) {
      setSubmitting(false);
      addToast(res.error || "Failed to submit proposal", "error");
      return;
    }

    const { jobId } = res.data;
    const POLL_INTERVAL = 3000;
    const MAX_WAIT = 120_000;
    const deadline = Date.now() + MAX_WAIT;

    await new Promise<void>((resolve) => {
      async function poll() {
        const statusRes = await visualizationProposalService.getJobStatus(jobId);
        if (statusRes.ok) {
          const { status, proposalId } = statusRes.data;
          if (status === "completed") {
            setSubmitting(false);
            router.push(`/dashboard/proposals${proposalId ? `?created=${proposalId}` : ""}`);
            resolve();
            return;
          }
          if (status === "failed") {
            setSubmitting(false);
            addToast(statusRes.data.message || "Proposal generation failed", "error");
            resolve();
            return;
          }
        }
        if (Date.now() >= deadline) {
          setSubmitting(false);
          addToast("Timed out. Please try again.", "error");
          resolve();
          return;
        }
        setTimeout(poll, POLL_INTERVAL);
      }
      poll();
    });
  }

  return (
    <div className="layout-shell-x flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-4">
      {/* Tab bar */}
      <div className="flex w-fit items-center border-b border-black/15 dark:border-white/10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-4 text-sm md:text-base font-medium transition-colors cursor-pointer -mb-px ${
              activeTab === tab.key
                ? "border-b-[2px] border-primary dark:border-[#519A91] dark:text-[#519A91]"
                : "text-black dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-4 md:p-6 dark:border-white/10 dark:from-white/5 dark:to-[#D9FFFA]/10">
        {activeTab === "team" && (
          <VisualizationTeamStep data={teamData} onChange={setTeamData} />
        )}
        {activeTab === "skillset" && (
          <VisualizationSkillsetStep data={skillsetData} onChange={setSkillsetData} />
        )}
        {activeTab === "timeline" && (
          <VisualizationTimelineStep data={timelineData} onChange={setTimelineData} />
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-black hover:opacity-70 transition-opacity dark:border-white/10 dark:text-white cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer dark:text-black"
        >
          {submitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
          )}
          {submitting ? "Generating…" : "Generate Proposal"}
        </button>
      </div>
    </div>
  );
}
