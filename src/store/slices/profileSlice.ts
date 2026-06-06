import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileData } from "@/lib/api/profile.service";

export interface ProfileState {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileLoading(state) {
      state.loading = true;
      state.error = null;
    },
    profileSaving(state) {
      state.loading = true;
      state.error = null;
    },
    profileSuccess(state, action: PayloadAction<ProfileData>) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    profileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearProfile(state) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { profileLoading, profileSaving, profileSuccess, profileFailure, clearProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
