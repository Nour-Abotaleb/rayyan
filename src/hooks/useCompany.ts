"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  companyFailure,
  companyLoading,
  companySaving,
  companySuccess,
} from "@/store/slices/companySlice";
import { companyService, type UpdateCompanyPayload } from "@/lib/api/company.service";

export function useCompany() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((s: RootState) => s.company);

  const fetchCompany = useCallback(async () => {
    dispatch(companyLoading());
    const res = await companyService.getCompany();
    if (!res.ok) {
      dispatch(companyFailure(res.error));
      return { ok: false as const, error: res.error };
    }
    dispatch(companySuccess(res.data));
    return { ok: true as const, data: res.data };
  }, [dispatch]);

  const updateCompany = useCallback(async (payload: UpdateCompanyPayload) => {
    dispatch(companySaving());
    const res = await companyService.updateCompany(payload);
    if (!res.ok) {
      dispatch(companyFailure(res.error));
      return { ok: false as const, error: res.error };
    }
    dispatch(companySuccess(res.data));
    return { ok: true as const, data: res.data };
  }, [dispatch]);

  return {
    company: data,
    loading,
    error,
    fetchCompany,
    updateCompany,
  };
}
