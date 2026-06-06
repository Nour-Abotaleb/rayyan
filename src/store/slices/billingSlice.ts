import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BillingPlansResponse, InvoicesResponse } from "@/lib/api/billing.service";

export interface BillingState {
  plans: BillingPlansResponse["plans"];
  currentPlanId: string | null;
  invoices: InvoicesResponse["invoices"];
  invoicesTotal: number;
  plansLoading: boolean;
  invoicesLoading: boolean;
  error: string | null;
}

const initialState: BillingState = {
  plans: [],
  currentPlanId: null,
  invoices: [],
  invoicesTotal: 0,
  plansLoading: false,
  invoicesLoading: false,
  error: null,
};

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    billingLoading(state) {
      state.plansLoading = true;
      state.error = null;
    },
    invoicesLoading(state) {
      state.invoicesLoading = true;
      state.error = null;
    },
    billingPlansSuccess(state, action: PayloadAction<BillingPlansResponse>) {
      state.plansLoading = false;
      state.plans = action.payload.plans;
      state.currentPlanId = action.payload.currentPlanId;
      state.error = null;
    },
    invoicesSuccess(state, action: PayloadAction<InvoicesResponse>) {
      state.invoicesLoading = false;
      state.invoices = action.payload.invoices;
      state.invoicesTotal = action.payload.total;
      state.error = null;
    },
    billingFailure(state, action: PayloadAction<string>) {
      state.plansLoading = false;
      state.invoicesLoading = false;
      state.error = action.payload;
    },
  },
});

export const { billingLoading, invoicesLoading, billingPlansSuccess, invoicesSuccess, billingFailure } =
  billingSlice.actions;

export default billingSlice.reducer;
