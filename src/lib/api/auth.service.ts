import { api } from "@/lib/api/client";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  profile_image: string | null;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface LogoutResponse {
  message?: string;
}

export interface ForgotPasswordResponse {
  message: string;
  token?: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const authService = {
  register(body: RegisterRequest) {
    return api.post<RegisterResponse>("/auth/register", body, undefined, {
      auth: false,
    });
  },

  login(body: LoginRequest) {
    return api.post<LoginResponse>("/auth/login", body, undefined, {
      auth: false,
    });
  },

  logout() {
    return api.post<LogoutResponse>("/auth/logout", {}, undefined, {
      auth: true,
    });
  },

  forgotPassword(body: { email: string }) {
    return api.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      body,
      undefined,
      { auth: false },
    );
  },

  resetPassword(body: ResetPasswordRequest) {
    return api.post<ResetPasswordResponse>(
      "/auth/reset-password",
      body,
      undefined,
      { auth: false },
    );
  },
};
