"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/lib/api/auth.service";
import EyeIcon from "@/icons/EyeIcon";
import EyeOffIcon from "@/icons/EyeOffIcon";

export default function ResetPasswordForm() {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = useMemo(
    () => searchParams.get("token")?.trim() ?? "",
    [searchParams],
  );

  const [tokenInput, setTokenInput] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  const effectiveToken = tokenFromUrl || tokenInput.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setValidationError("");

    if (!effectiveToken) {
      setValidationError(t.auth.resetPasswordTokenMissing);
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationError(t.auth.resetPasswordMismatch);
      return;
    }

    setLoading(true);
    const res = await authService.resetPassword({
      token: effectiveToken,
      newPassword,
    });
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="mb-6 flex min-w-0 flex-col px-4 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14">
      <div className="mb-8">
        <h1 className="font-abril font-medium text-primary text-center text-3xl lg:text-4xl mb-6">
          {t.auth.brandName}
        </h1>
        <h1 className="text-xl font-semibold leading-snug text-black md:text-2xl lg:text-3xl">
          {t.auth.resetPasswordTitle}{" "}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paragraph md:text-base">
          {t.auth.resetPasswordSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir={dir}>
        {!tokenFromUrl ? (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 md:text-base">
              {t.auth.resetTokenLabel} <span>*</span>
            </label>
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder={t.auth.resetTokenPlaceholder}
              required
              autoComplete="off"
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-4 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 md:text-base">
            {t.auth.newPasswordLabel} <span>*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t.auth.passwordPlaceholder}
              required
              autoComplete="new-password"
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 end-4 flex items-center text-input-icon hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label={
                showPassword ? t.auth.hidePassword : t.auth.showPassword
              }
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 md:text-base">
            {t.auth.confirmPassword} <span>*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.auth.passwordPlaceholder}
              required
              autoComplete="new-password"
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute inset-y-0 end-4 flex items-center text-input-icon hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label={
                showConfirm
                  ? t.auth.hideConfirmPassword
                  : t.auth.showConfirmPassword
              }
            >
              {showConfirm ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>

        {validationError ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
            {validationError}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full cursor-pointer rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary/40 disabled:opacity-60 dark:text-black"
        >
          {loading ? t.auth.loading : t.auth.resetPasswordSubmit}
        </button>

        {/* <Link
          href="/forgot-password"
          className="text-center text-sm font-semibold text-primary hover:underline dark:text-primary-light"
        >
          {t.auth.forgotPassword}
        </Link> */}
      </form>
    </div>
  );
}
