import { apiRequest } from "@/lib/api/client";

export interface VisualizationDeveloper {
  name: string;
  position: string;
}

export interface VisualizationSkill {
  name: string;
  description: string;
  level: number; // 0–100
}

export interface VisualizationPhase {
  title: string;
  duration: string;
  description: string;
}

export interface VisualizationProposalPayload {
  // Basic info
  clientName?: string;
  projectName?: string;
  sectorIndustry?: string;
  language?: string;
  startDate?: string;
  endDate?: string;
  // Team Structure
  projectManager: string;
  technicalLead: string;
  developers: VisualizationDeveloper[];
  // Skillset Visualization
  skills: VisualizationSkill[];
  // Project Timeline
  phases: VisualizationPhase[];
}

export interface CreateProposalResponse {
  jobId: string;
  estimatedSeconds: number;
  message: string;
}

export interface JobStatusResponse {
  status: "pending" | "processing" | "completed" | "failed";
  proposalId?: string;
  message?: string;
}

export const visualizationProposalService = {
  createProposal(payload: VisualizationProposalPayload) {
    const form = new FormData();
    if (payload.clientName) form.append("clientName", payload.clientName);
    if (payload.projectName) form.append("projectName", payload.projectName);
    if (payload.sectorIndustry) form.append("sectorIndustry", payload.sectorIndustry);
    if (payload.language) form.append("language", payload.language);
    if (payload.startDate) form.append("startDate", payload.startDate);
    if (payload.endDate) form.append("endDate", payload.endDate);
    form.append("projectManager", payload.projectManager);
    form.append("technicalLead", payload.technicalLead);
    form.append("developers", JSON.stringify(payload.developers));
    form.append("skills", JSON.stringify(payload.skills));
    form.append("phases", JSON.stringify(payload.phases));

    return apiRequest<CreateProposalResponse>("/proposals/visualization", {
      method: "POST",
      body: form,
    });
  },

  getJobStatus(jobId: string) {
    return apiRequest<JobStatusResponse>(`/proposals/generate/${jobId}/status`);
  },
};
