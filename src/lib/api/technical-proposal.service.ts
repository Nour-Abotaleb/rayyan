import { apiRequest } from "@/lib/api/client";

export interface GanttCardItem {
  title: string;
  from: string;
  to: string;
}

export interface SectionItem {
  title: string;
  chips: string[];
}

export interface TeamMemberItem {
  name: string;
  role: string;
  yearsOfExperience: string;
  keySkills: string;
}

export interface TechnicalProposalPayload {
  // Step 1 — RFP
  rfpMode: "upload" | "none";
  rfpFiles?: File[];
  rfpDocIds?: string[];
  // Step 1 — Basic Info
  clientName: string;
  projectName: string;
  sectorIndustry: string;
  proposalType: string;
  language: string;
  startDate?: string;
  endDate?: string;
  additionalDetails?: string;
  // Step 2 — Sections
  ganttCards?: GanttCardItem[];
  timelineFiles?: File[];
  sections?: SectionItem[];
  // Step 3 — Team Members (manual upload)
  members?: TeamMemberItem[];
  memberCvFiles?: File[];
  // Step 3 — Team Members (from database)
  cvDocIds?: string[];
}

export interface CreateProposalResponse {
  proposalId: string;
  status: string;
  message: string;
}

export const technicalProposalService = {
  createProposal(payload: TechnicalProposalPayload) {
    const form = new FormData();

    form.append("rfpMode", payload.rfpMode);
    form.append("clientName", payload.clientName);
    form.append("projectName", payload.projectName);
    form.append("sectorIndustry", payload.sectorIndustry);
    form.append("proposalType", payload.proposalType);
    form.append("language", payload.language);
    if (payload.startDate) form.append("startDate", payload.startDate);
    if (payload.endDate) form.append("endDate", payload.endDate);
    if (payload.additionalDetails) form.append("additionalDetails", payload.additionalDetails);

    payload.rfpFiles?.forEach((f) => form.append("rfpFiles", f));
    payload.rfpDocIds?.forEach((id) => form.append("rfpDocIds", id));

    if (payload.ganttCards?.length) form.append("ganttCards", JSON.stringify(payload.ganttCards));
    payload.timelineFiles?.forEach((f) => form.append("timelineFiles", f));
    if (payload.sections?.length) form.append("sections", JSON.stringify(payload.sections));

    if (payload.members?.length) form.append("members", JSON.stringify(payload.members));
    payload.memberCvFiles?.forEach((f) => form.append("memberCvFiles", f));
    payload.cvDocIds?.forEach((id) => form.append("cvDocIds", id));

    return apiRequest<CreateProposalResponse>("/proposals/technical", {
      method: "POST",
      body: form,
    });
  },
};
