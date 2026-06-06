import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Proposal, ProposalType } from "@/lib/api/proposals.service";

export interface ProposalsState {
  items: Proposal[];
  total: number;
  page: number;
  limit: number;
  activeTab: ProposalType | "ALL";
  search: string;
  loading: boolean;
  generating: boolean;
  error: string | null;
}

const initialState: ProposalsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 20,
  activeTab: "ALL",
  search: "",
  loading: false,
  generating: false,
  error: null,
};

const proposalsSlice = createSlice({
  name: "proposals",
  initialState,
  reducers: {
    proposalsLoading(state) {
      state.loading = true;
      state.error = null;
    },
    proposalsGenerating(state) {
      state.generating = true;
      state.error = null;
    },
    proposalsSuccess(state, action: PayloadAction<{ items: Proposal[]; total: number; page: number; limit: number }>) {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.error = null;
    },
    proposalsDeleteSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
      state.total = Math.max(0, state.total - 1);
    },
    proposalsGenerateSuccess(state) {
      state.generating = false;
      state.error = null;
    },
    proposalsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.generating = false;
      state.error = action.payload;
    },
    setActiveTab(state, action: PayloadAction<ProposalType | "ALL">) {
      state.activeTab = action.payload;
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const {
  proposalsLoading,
  proposalsGenerating,
  proposalsSuccess,
  proposalsDeleteSuccess,
  proposalsGenerateSuccess,
  proposalsFailure,
  setActiveTab,
  setSearch,
  setPage,
} = proposalsSlice.actions;

export default proposalsSlice.reducer;
