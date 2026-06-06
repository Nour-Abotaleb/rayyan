import { api, apiRequest } from "@/lib/api/client";

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
}

export interface UpdateProfilePayload {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  avatar?: File;
}

export const profileService = {
  getProfile() {
    return api.get<ProfileData>("/settings/profile");
  },

  updateProfile(payload: UpdateProfilePayload) {
    const form = new FormData();
    form.append("fullName", payload.fullName);
    form.append("email", payload.email);
    form.append("phone", payload.phone);
    if (payload.password) form.append("password", payload.password);
    if (payload.avatar) form.append("avatar", payload.avatar);
    return apiRequest<ProfileData>("/settings/profile", {
      method: "PUT",
      body: form,
    });
  },
};
