import { api } from "@/lib/api/client";
import { API_BASE_URL } from "@/lib/api/config";

export interface BillingPlan {
  id: string;
  name: string;
  tier: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  active: boolean;
  renewalDate: string | null;
}

export interface BillingPlansResponse {
  plans: BillingPlan[];
  currentPlanId: string;
}

export interface Invoice {
  id: string;
  plan: string;
  date: string;
  period: string;
  status: "Paid" | "Pending" | "Failed";
}

export interface InvoicesResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  limit: number;
}

export const billingService = {
  getPlans() {
    return api.get<BillingPlansResponse>("/billing/plans");
  },

  getInvoices(page: number, limit: number) {
    return api.get<InvoicesResponse>(`/billing/invoices?page=${page}&limit=${limit}`);
  },

  async downloadInvoice(id: string): Promise<void> {
    const { API_TOKEN_STORAGE_KEY } = await import("@/lib/auth/api-token-storage");
    const token =
      window.localStorage.getItem(API_TOKEN_STORAGE_KEY) ??
      window.sessionStorage.getItem(API_TOKEN_STORAGE_KEY);
    const res = await fetch(`${API_BASE_URL}/billing/invoices/${id}/download`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
