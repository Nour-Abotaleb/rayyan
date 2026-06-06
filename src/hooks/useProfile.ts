"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  profileFailure,
  profileLoading,
  profileSaving,
  profileSuccess,
} from "@/store/slices/profileSlice";
import { profileService, type UpdateProfilePayload } from "@/lib/api/profile.service";

export function useProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((s: RootState) => s.profile);

  const fetchProfile = useCallback(async () => {
    dispatch(profileLoading());
    const res = await profileService.getProfile();
    if (!res.ok) {
      dispatch(profileFailure(res.error));
      return { ok: false as const, error: res.error };
    }
    dispatch(profileSuccess(res.data));
    return { ok: true as const, data: res.data };
  }, [dispatch]);

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    dispatch(profileSaving());
    const res = await profileService.updateProfile(payload);
    if (!res.ok) {
      dispatch(profileFailure(res.error));
      return { ok: false as const, error: res.error };
    }
    dispatch(profileSuccess(res.data));
    return { ok: true as const, data: res.data };
  }, [dispatch]);

  return {
    profile: data,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
}
