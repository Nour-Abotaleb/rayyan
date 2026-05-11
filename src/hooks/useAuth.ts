"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/store";
import {
  authFailure,
  clearError,
  loginSuccess,
  logout as logoutAction,
  registerSuccess,
  setLoading,
} from "@/store/slices/authSlice";
import {
  authService,
  type LoginRequest,
  type RegisterRequest,
} from "@/lib/api/auth.service";
import { clearApiToken, persistApiToken } from "@/lib/auth/api-token-storage";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, token, loading, error } = useSelector((s: RootState) => s.auth);

  const login = useCallback(
    async (body: LoginRequest) => {
      dispatch(setLoading());
      const res = await authService.login(body);
      if (!res.ok) {
        dispatch(authFailure(res.error));
        return { ok: false as const, error: res.error };
      }

      const sessionRes = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: res.data.user.email,
          remember: Boolean(body.remember),
        }),
      });
      if (!sessionRes.ok) {
        let msg = "Session could not be created";
        try {
          const j = (await sessionRes.json()) as { error?: string };
          if (j?.error) msg = j.error;
        } catch {
          // ignore
        }
        dispatch(authFailure(msg));
        return { ok: false as const, error: msg };
      }

      persistApiToken(res.data.token, Boolean(body.remember));
      dispatch(
        loginSuccess({ user: res.data.user, token: res.data.token }),
      );
      return { ok: true as const };
    },
    [dispatch],
  );

  const register = useCallback(
    async (body: RegisterRequest) => {
      dispatch(setLoading());
      const res = await authService.register(body);
      if (!res.ok) {
        dispatch(authFailure(res.error));
        return { ok: false as const, error: res.error };
      }
      dispatch(registerSuccess());
      return { ok: true as const, userId: res.data.userId };
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // continue clearing local session
    }
    await fetch("/api/auth/logout", { method: "POST" });
    clearApiToken();
    dispatch(logoutAction());
    router.replace("/login");
    router.refresh();
  }, [dispatch, router]);

  const clear = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
    clearError: clear,
  };
}
