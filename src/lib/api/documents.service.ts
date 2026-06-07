import { api, apiRequest } from "@/lib/api/client";
import { API_BASE_URL } from "@/lib/api/config";
import { API_TOKEN_STORAGE_KEY } from "@/lib/auth/api-token-storage";

export type DocumentCategory =
  | "company_profile"
  | "cvResume"
  | "team"
  | "rfp"
  | "company_doc"
  | "boq"
  | "portfolio"
  | "certifications";

export interface Document {
  id: string;
  title: string;
  description: string;
  name: string;
  size: string;
  date: string;
  type: string;
  category: string;
  url: string;
}

export interface DocumentsResponse {
  documents: Document[];
  total: number;
}

export const documentsService = {
  getDocuments(category?: DocumentCategory) {
    const qs = category ? `?category=${category}` : "";
    return api.get<DocumentsResponse>(`/documents${qs}`);
  },

  uploadDocument(category: DocumentCategory, files: File[]) {
    const form = new FormData();
    form.append("category", category);
    files.forEach((f) => form.append("files", f));
    return apiRequest<DocumentsResponse>("/documents/upload", { method: "POST", body: form });
  },

  deleteDocument(id: string) {
    return apiRequest<{ ok: boolean }>(`/documents/${id}`, { method: "DELETE" });
  },

  async viewDocument(id: string): Promise<void> {
    const token =
      window.localStorage.getItem(API_TOKEN_STORAGE_KEY) ??
      window.sessionStorage.getItem(API_TOKEN_STORAGE_KEY);
    const res = await fetch(`${API_BASE_URL}/documents/${id}/view`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  },
};
