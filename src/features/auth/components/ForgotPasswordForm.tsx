"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/lib/api/auth.service";
import EmailIcon from "@/icons/EmailIcon";

export default function ForgotPasswordForm() {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);
    const res = await authService.forgotPassword({ email });
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    const token = res.data.token?.trim();
    if (token) {
      router.replace(`/reset-password?token=${encodeURIComponent(token)}`);
      return;
    }
    setSuccessMessage(res.data.message);
  }

  return (
    <div className="mb-6 flex min-w-0 flex-col px-4 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14">
      <div className="mb-8">
        <h1 className="font-abril font-medium text-primary text-center text-3xl lg:text-4xl mb-6">{t.auth.brandName}</h1>
        <h1 className="text-xl font-semibold leading-snug text-black md:text-2xl lg:text-3xl">
          {t.auth.forgotPasswordTitle}{" "}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paragraph md:text-base">
          {t.auth.forgotPasswordSubtitle}
        </p>
      </div>

      {successMessage ? (
        <div className="flex flex-col gap-6" dir={dir}>
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
            {successMessage}
          </p>
          <Link
            href="/reset-password"
            className="w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary/40 dark:text-black"
          >
            {t.auth.forgotPasswordContinue}
          </Link>
          <Link
            href="/login"
            className="text-center text-sm font-semibold text-primary hover:underline dark:text-primary-light"
          >
            {t.auth.backToLogin}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir={dir}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 md:text-base">
              {t.auth.email} <span>*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.auth.emailPlaceholder}
                required
                autoComplete="email"
                className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
              />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                <EmailIcon size={20} />
              </span>
            </div>
          </div>

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
            {loading ? t.auth.loading : t.auth.forgotPasswordSubmit}
          </button>

          <Link
            href="/login"
            className="text-center text-sm font-semibold text-primary hover:underline dark:text-primary-light"
          >
            {t.auth.backToLogin}
          </Link>
        </form>
      )}
    </div>
  );
}
