import { api, apiRequest } from "@/lib/api/client";
import { API_BASE_URL } from "@/lib/api/config";
import { API_TOKEN_STORAGE_KEY } from "@/lib/auth/api-token-storage";

export type ProposalStatus = "Completed" | "Processing" | "Failed";
export type ProposalType = "Technical" | "Financial" | "Visualization";

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: ProposalStatus;
  type: ProposalType;
  progress: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface ProposalDetail extends Proposal {
  clientName: string;
  projectName: string;
  proposalLanguage: string;
  sectorIndustry: string;
  additionalDetails: string;
  generatedContent: string;
  sections: unknown[];
  documents: unknown[];
  updatedAt: string;
}

export interface ProposalsResponse {
  proposals: Proposal[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Payload collected from DashboardPage prompt + ProposalDetailsModal.
 * Sent as multipart/form-data because it may include files.
 */
export interface GenerateProposalPayload {
  // From DashboardPage prompt box
  prompt: string;
  promptFiles?: File[];           // files attached via the attach button
  proposalType?: string;          // chip selection: "technical" | "financial" | "visualization"

  // RFP section (ProposalDetailsModal)
  rfpMode: "upload" | "manual" | "none";
  rfpFiles?: File[];              // uploaded from system (rfpMode === "upload", from system tab)
  rfpDocIds?: string[];           // selected from database (rfpMode === "upload", from database tab)

  // Basic info fields (ProposalDetailsModal)
  clientName: string;
  projectName: string;
  language: string;
  sector: string;
  startDate: string;
  endDate: string;

  // Company documents (ProposalDetailsModal)
  companyDocFiles?: File[];       // uploaded manually
  companyDocIds?: string[];       // selected from database
}

export interface GenerateProposalResponse {
  jobId: string;
  estimatedSeconds: number;
  message: string;
}

export interface JobStatusResponse {
  status: "pending" | "processing" | "completed" | "failed";
  proposalId?: string;
  message?: string;
}

export const proposalsService = {
  getProposals(params?: {
    page?: number;
    limit?: number;
    type?: ProposalType | "ALL";
    search?: string;
  }) {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.type && params.type !== "ALL") q.set("type", params.type);
    if (params?.search) q.set("search", params.search);
    const qs = q.toString();
    return api.get<ProposalsResponse>(`/proposals${qs ? `?${qs}` : ""}`);
  },

  generateProposal(payload: GenerateProposalPayload) {
    const form = new FormData();

    form.append("prompt", payload.prompt);
    if (payload.proposalType) form.append("proposalType", payload.proposalType);
    form.append("rfpMode", payload.rfpMode);
    form.append("clientName", payload.clientName);
    form.append("projectName", payload.projectName);
    form.append("language", payload.language);
    form.append("sector", payload.sector);
    form.append("startDate", payload.startDate);
    form.append("endDate", payload.endDate);

    payload.promptFiles?.forEach((f) => form.append("promptFiles", f));
    payload.rfpFiles?.forEach((f) => form.append("rfpFiles", f));
    payload.rfpDocIds?.forEach((id) => form.append("rfpDocIds", id));
    payload.companyDocFiles?.forEach((f) => form.append("companyDocFiles", f));
    payload.companyDocIds?.forEach((id) => form.append("companyDocIds", id));

    return apiRequest<GenerateProposalResponse>("/proposals/generate", {
      method: "POST",
      body: form,
    });
  },

  getJobStatus(jobId: string) {
    return apiRequest<JobStatusResponse>(`/proposals/generate/${jobId}/status`);
  },

  getProposal(id: string) {
    return api.get<ProposalDetail>(`/proposals/${id}`);
  },

  deleteProposal(id: string) {
    return apiRequest<{ ok: boolean }>(`/proposals/${id}`, { method: "DELETE" });
  },

  async downloadProposal(id: string): Promise<void> {
    const token =
      window.localStorage.getItem(API_TOKEN_STORAGE_KEY) ??
      window.sessionStorage.getItem(API_TOKEN_STORAGE_KEY);
    const res = await fetch(`${API_BASE_URL}/proposals/${id}/download`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `proposal-${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
