import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Document } from "@/lib/api/documents.service";

interface CategoryState {
  items: Document[];
  total: number;
  loading: boolean;
  error: string | null;
}

const emptyCategory = (): CategoryState => ({
  items: [],
  total: 0,
  loading: false,
  error: null,
});

export interface DocumentsState {
  team: CategoryState;
  cv: CategoryState;
}

const initialState: DocumentsState = {
  team: emptyCategory(),
  cv: emptyCategory(),
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    teamLoading(state) {
      state.team.loading = true;
      state.team.error = null;
    },
    teamSuccess(state, action: PayloadAction<{ items: Document[]; total: number }>) {
      state.team.loading = false;
      state.team.items = action.payload.items;
      state.team.total = action.payload.total;
      state.team.error = null;
    },
    teamFailure(state, action: PayloadAction<string>) {
      state.team.loading = false;
      state.team.error = action.payload;
    },
    cvLoading(state) {
      state.cv.loading = true;
      state.cv.error = null;
    },
    cvSuccess(state, action: PayloadAction<{ items: Document[]; total: number }>) {
      state.cv.loading = false;
      state.cv.items = action.payload.items;
      state.cv.total = action.payload.total;
      state.cv.error = null;
    },
    cvFailure(state, action: PayloadAction<string>) {
      state.cv.loading = false;
      state.cv.error = action.payload;
    },
  },
});

export const {
  teamLoading,
  teamSuccess,
  teamFailure,
  cvLoading,
  cvSuccess,
  cvFailure,
} = documentsSlice.actions;

export default documentsSlice.reducer;
