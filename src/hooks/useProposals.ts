"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  proposalsLoading,
  proposalsGenerating,
  proposalsSuccess,
  proposalsDeleteSuccess,
  proposalsGenerateSuccess,
  proposalsFailure,
  setActiveTab,
  setSearch,
  setPage,
} from "@/store/slices/proposalsSlice";
import { proposalsService, type GenerateProposalPayload, type ProposalType } from "@/lib/api/proposals.service";

export function useProposals() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, page, limit, activeTab, search, loading, generating, error } = useSelector(
    (s: RootState) => s.proposals,
  );

  const fetchProposals = useCallback(async (params?: { page?: number; type?: ProposalType | "ALL"; search?: string }) => {
    dispatch(proposalsLoading());
    const res = await proposalsService.getProposals(params);
    if (!res.ok) {
      dispatch(proposalsFailure(res.error));
      return { ok: false as const, error: res.error };
    }
    dispatch(proposalsSuccess({ items: res.data.proposals, total: res.data.total, page: res.data.page, limit: res.data.limit }));
    return { ok: true as const, data: res.data };
  }, [dispatch]);

  const generateProposal = useCallback(async (payload: GenerateProposalPayload) => {
    dispatch(proposalsGenerating());
    const res = await proposalsService.generateProposal(payload);
    if (!res.ok) {
      dispatch(proposalsFailure(res.error));
      return { ok: false as const, error: res.error, fields: res.fields };
    }

    const { jobId } = res.data;
    const POLL_INTERVAL = 3000;
    const MAX_WAIT = 120_000;
    const deadline = Date.now() + MAX_WAIT;

    return new Promise<{ ok: true; data: { proposalId?: string } } | { ok: false; error: string; fields?: Record<string, string | null> }>((resolve) => {
      async function poll() {
        const statusRes = await proposalsService.getJobStatus(jobId);
        if (statusRes.ok) {
          const { status, proposalId } = statusRes.data;
          if (status === "completed") {
            dispatch(proposalsGenerateSuccess());
            resolve({ ok: true, data: { proposalId } });
            return;
          }
          if (status === "failed") {
            const msg = statusRes.data.message ?? "Proposal generation failed";
            dispatch(proposalsFailure(msg));
            resolve({ ok: false, error: msg });
            return;
          }
        }
        if (Date.now() >= deadline) {
          dispatch(proposalsFailure("Timed out waiting for proposal generation"));
          resolve({ ok: false, error: "timeout" });
          return;
        }
        setTimeout(poll, POLL_INTERVAL);
      }
      poll();
    });
  }, [dispatch]);

  const getProposal = useCallback((id: string) => {
    return proposalsService.getProposal(id);
  }, []);

  const deleteProposal = useCallback(async (id: string) => {
    const res = await proposalsService.deleteProposal(id);
    if (res.ok) dispatch(proposalsDeleteSuccess(id));
    return res;
  }, [dispatch]);

  const downloadProposal = useCallback((id: string) => {
    return proposalsService.downloadProposal(id);
  }, []);

  const changeTab = useCallback((tab: ProposalType | "ALL") => {
    dispatch(setActiveTab(tab));
  }, [dispatch]);

  const changeSearch = useCallback((value: string) => {
    dispatch(setSearch(value));
  }, [dispatch]);

  const changePage = useCallback((value: number) => {
    dispatch(setPage(value));
  }, [dispatch]);

  return {
    proposals: items,
    total,
    page,
    limit,
    activeTab,
    search,
    loading,
    generating,
    error,
    fetchProposals,
    getProposal,
    deleteProposal,
    generateProposal,
    downloadProposal,
    changeTab,
    changeSearch,
    changePage,
  };
}
