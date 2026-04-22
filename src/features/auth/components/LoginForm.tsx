"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import EmailIcon from "@/icons/EmailIcon";
import EyeIcon from "@/icons/EyeIcon";
import EyeOffIcon from "@/icons/EyeOffIcon";
import GoogleIcon from "@/icons/GoogleIcon";

export default function LoginForm() {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
        credentials: "include",
      });
      const data = (await res.json()) as { redirectTo?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? t.auth.signInFailed);
        return;
      }
      if (data.redirectTo) {
        router.push(data.redirectTo);
        router.refresh();
        return;
      }
      setError(t.auth.signInFailed);
    } catch {
      setError(t.auth.networkErrorTryAgain);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-6 flex min-w-0 flex-1 flex-col px-4 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-16">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-black">
          {t.auth.welcomeBack}{" "}
          <span className="font-medium text-primary font-abril">
            {t.auth.brandName}
          </span>
        </h1>
        <p className="mt-3 max-w-sm text-sm md:text-base leading-relaxed text-paragraph">
          {t.auth.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir={dir}>
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
            {t.auth.email} <span className="">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth.emailPlaceholder}
              required
              className="w-full rounded-[44px] input-style py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
            />
            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
              <EmailIcon size={20} />
            </span>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
            {t.auth.password} <span className="">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.passwordPlaceholder}
              required
              className="w-full rounded-[44px] input-style py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-zinc-100 dark:placeholder:text-[#A0A3BD]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 end-4 flex items-center text-input-icon hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </p>
        ) : null}

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-paragraph dark:text-[#757575]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-[#A2A2A2] accent-primary dark:border-[#A2A2A2] text-[#A2A2A2] dark:text-white dark:bg-transparent"
            />
            {t.auth.rememberMe}
          </label>
          <button
            type="button"
            className="text-sm font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary-light"
          >
            {t.auth.forgotPassword}
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full cursor-pointer rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary/40 disabled:opacity-60 dark:text-black"
        >
          {loading ? t.auth.loading : t.auth.login}
        </button>

        {/* Google sign in */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-full border border-white bg-white/50 py-3 text-sm font-medium text-black dark:border-[#0D0D0D] dark:bg-[#0D0D0D] dark:text-white cursor-pointer"
        >
          <GoogleIcon size={20} />
          {t.auth.signInWithGoogle}
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm text-paragraph tracking-wide dark:text-[#757575]">
          {t.auth.noAccount}{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline dark:text-primary-light"
          >
            {t.auth.signUp}
          </Link>
        </p>
      </form>
    </div>
  );
}
