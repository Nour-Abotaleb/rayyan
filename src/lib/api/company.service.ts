import { api, apiRequest } from "@/lib/api/client";

export interface CompanyData {
  companyName: string;
  companyEmail: string;
  phone: string;
  landline: string;
  address: string;
  website: string;
  logoUrl: string | null;
  commercialRegisterUrl: string | null;
  taxCardUrl: string | null;
}

export interface UpdateCompanyPayload {
  companyName: string;
  companyEmail: string;
  phone: string;
  landline: string;
  address: string;
  website: string;
  logo?: File;
  commercialRegister?: File;
  taxCard?: File;
}

export const companyService = {
  getCompany() {
    return api.get<CompanyData>("/settings/company");
  },

  updateCompany(payload: UpdateCompanyPayload) {
    const hasFiles = payload.logo || payload.commercialRegister || payload.taxCard;

    if (hasFiles) {
      const form = new FormData();
      form.append("companyName", payload.companyName);
      form.append("companyEmail", payload.companyEmail);
      form.append("phone", payload.phone);
      form.append("landline", payload.landline);
      form.append("address", payload.address);
      form.append("website", payload.website);
      if (payload.logo) form.append("logo", payload.logo);
      if (payload.commercialRegister) form.append("commercialRegister", payload.commercialRegister);
      if (payload.taxCard) form.append("taxCard", payload.taxCard);
      return apiRequest<CompanyData>("/settings/company", { method: "PUT", body: form });
    }

    return api.put<CompanyData>("/settings/company", {
      companyName: payload.companyName,
      companyEmail: payload.companyEmail,
      phone: payload.phone,
      landline: payload.landline,
      address: payload.address,
      website: payload.website,
    });
  },
};
