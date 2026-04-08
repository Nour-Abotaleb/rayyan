"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import EmailIcon from "@/icons/EmailIcon";
import EyeIcon from "@/icons/EyeIcon";
import EyeOffIcon from "@/icons/EyeOffIcon";
import GoogleIcon from "@/icons/GoogleIcon";

export default function LoginForm() {
  const { t, dir } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to auth
  }

  return (
    <div className="mb-6 flex flex-1 flex-col py-12 md:py-14 px-8 sm:px-12 lg:px-16">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          {t.auth.welcomeBack}{" "}
          <span className="font-medium text-primary font-abril">
            {t.auth.brandName}
          </span>
        </h1>
        <p className="mt-3 max-w-sm text-sm md:text-base leading-relaxed text-paragraph dark:text-zinc-400">
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
              className="w-full rounded-[44px] input-style py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
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
              className="w-full rounded-[44px] input-style py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 end-4 flex items-center text-input-icon hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-paragraph dark:text-zinc-400">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 accent-primary dark:border-zinc-600"
            />
            {t.auth.rememberMe}
          </label>
          <button
            type="button"
            className="text-sm font-bold text-zinc-800 hover:text-primary dark:text-zinc-300 dark:hover:text-primary-light"
          >
            {t.auth.forgotPassword}
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white dark:text-zinc-800 transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
        >
          {t.auth.login}
        </button>

        {/* Google sign in */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-full border border-white bg-white/50 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-screen dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <GoogleIcon size={20} />
          {t.auth.signInWithGoogle}
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm text-paragraph tracking-wide dark:text-zinc-400">
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
