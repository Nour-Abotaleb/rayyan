import { apiRequest } from "@/lib/api/client";

export interface DeliverableItem {
  serviceCatalog: string;
  name: string;
  dueDate: string;
  quantity: number;
  unitPrice: number;
  salaryCosts: number;
  toolsCosts?: number;
  otherExpenses?: number;
}

export interface PaymentTermItem {
  description: string;
  percentage: number;
}

export interface FinancialProposalPayload {
  // Step 1 — RFP
  rfpMode: "upload" | "none";
  rfpFiles?: File[];
  rfpDocIds?: string[];
  // Step 1 — Project Info
  clientName: string;
  projectName: string;
  numDeliverables: number;
  boqType: string;
  projectType: string;
  sectorIndustry: string;
  language: string;
  taxRate: number;
  startDate?: string;
  endDate?: string;
  terms?: string;
  // Step 2 — Deliverables
  deliverables: DeliverableItem[];
  // Step 3 — Payment Terms
  paymentTerms: PaymentTermItem[];
}

export interface CreateProposalResponse {
  jobId: string;
  estimatedSeconds: number;
  message: string;
}

export const financialProposalService = {
  createProposal(payload: FinancialProposalPayload) {
    const form = new FormData();
    form.append("rfpMode", payload.rfpMode);
    form.append("clientName", payload.clientName);
    form.append("projectName", payload.projectName);
    form.append("numDeliverables", String(payload.numDeliverables));
    form.append("boqType", payload.boqType);
    form.append("projectType", payload.projectType);
    form.append("sectorIndustry", payload.sectorIndustry);
    form.append("language", payload.language);
    form.append("taxRate", String(payload.taxRate));
    if (payload.startDate) form.append("startDate", payload.startDate);
    if (payload.endDate) form.append("endDate", payload.endDate);
    if (payload.terms) form.append("terms", payload.terms);
    payload.rfpFiles?.forEach((f) => form.append("rfpFiles", f));
    payload.rfpDocIds?.forEach((id) => form.append("rfpDocIds", id));
    form.append("deliverables", JSON.stringify(payload.deliverables));
    form.append("paymentTerms", JSON.stringify(payload.paymentTerms));
    return apiRequest<CreateProposalResponse>("/proposals/financial", {
      method: "POST",
      body: form,
    });
  },
};
