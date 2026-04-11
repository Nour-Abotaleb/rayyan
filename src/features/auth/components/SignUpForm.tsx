"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import EmailIcon from "@/icons/EmailIcon";
import EyeIcon from "@/icons/EyeIcon";
import EyeOffIcon from "@/icons/EyeOffIcon";
import GoogleIcon from "@/icons/GoogleIcon";
import UserNameIcon from "@/icons/UserNameIcon";

export default function SignUpForm() {
  const { t, dir } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to auth
  }

  return (
    <div className="flex flex-1 flex-col py-8 md:py-4 px-8 sm:px-12 lg:px-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold leading-snug text-zinc-900">
          {t.auth.createAccountTitle}{" "}
          <span className="font-abril font-medium text-primary">
            {t.auth.brandName}
          </span>
        </h1>
        <p className="mt-3 max-w-sm text-sm md:text-base leading-relaxed text-paragraph">
          {t.auth.signupSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir={dir}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
            {t.auth.yourName} <span>*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.auth.namePlaceholder}
              required
              autoComplete="name"
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
              <UserNameIcon size={20} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
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
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
            <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
              <EmailIcon size={20} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
            {t.auth.password} <span>*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.passwordPlaceholder}
              required
              autoComplete="new-password"
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
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

        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-300">
            {t.auth.confirmPassword} <span>*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.auth.passwordPlaceholder}
              required
              autoComplete="new-password"
              className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-zinc-800 placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute inset-y-0 end-4 flex items-center text-input-icon hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-1 w-full cursor-pointer rounded-full bg-primary py-3.5 text-sm font-semibold text-white dark:text-zinc-800 transition-colors hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary/40"
        >
          {t.auth.signUp}
        </button>

        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white bg-white/50 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-screen dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <GoogleIcon size={20} />
          {t.auth.signInWithGoogle}
        </button>

        <p className="text-center text-sm tracking-wide text-paragraph dark:text-zinc-400">
          {t.auth.alreadyHaveAccount}{" "}
          <Link
            href="/"
            className="font-semibold text-primary hover:underline dark:text-primary-light"
          >
            {t.auth.login}
          </Link>
        </p>
      </form>
    </div>
  );
}
