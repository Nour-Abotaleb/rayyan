import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CompanyData } from "@/lib/api/company.service";

export interface CompanyState {
  data: CompanyData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  data: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyLoading(state) {
      state.loading = true;
      state.error = null;
    },
    companySaving(state) {
      state.loading = true;
      state.error = null;
    },
    companySuccess(state, action: PayloadAction<CompanyData>) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    companyFileClear(state, action: PayloadAction<"commercialRegister" | "taxCard">) {
      state.loading = false;
      if (!state.data) return;
      if (action.payload === "commercialRegister") state.data.commercialRegisterUrl = null;
      if (action.payload === "taxCard") state.data.taxCardUrl = null;
    },
    companyFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearCompany(state) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { companyLoading, companySaving, companySuccess, companyFileClear, companyFailure, clearCompany } =
  companySlice.actions;

export default companySlice.reducer;
