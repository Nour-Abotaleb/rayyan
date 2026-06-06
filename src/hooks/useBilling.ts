"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  billingFailure,
  billingLoading,
  billingPlansSuccess,
  invoicesLoading,
  invoicesSuccess,
} from "@/store/slices/billingSlice";
import { billingService } from "@/lib/api/billing.service";

export function useBilling() {
  const dispatch = useDispatch<AppDispatch>();
  const { plans, currentPlanId, invoices, invoicesTotal, plansLoading, invoicesLoading: invoicesLoadingState, error } = useSelector(
    (s: RootState) => s.billing,
  );

  const fetchPlans = useCallback(async () => {
    dispatch(billingLoading());
    const res = await billingService.getPlans();
    if (!res.ok) {
      dispatch(billingFailure(res.error));
      return { ok: false as const, error: res.error };
    }
    dispatch(billingPlansSuccess(res.data));
    return { ok: true as const, data: res.data };
  }, [dispatch]);

  const fetchInvoices = useCallback(async (page: number, limit: number) => {
    dispatch(invoicesLoading());
    const res = await billingService.getInvoices(page, limit);
    if (!res.ok) {
      dispatch(billingFailure(res.error));
      return { ok: false as const, error: res.error };
    }
    dispatch(invoicesSuccess(res.data));
    return { ok: true as const, data: res.data };
  }, [dispatch]);

  return {
    plans,
    currentPlanId,
    invoices,
    invoicesTotal,
    plansLoading,
    invoicesLoading: invoicesLoadingState,
    error,
    fetchPlans,
    fetchInvoices,
  };
}
