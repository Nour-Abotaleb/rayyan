"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import MenuIcon from "@/icons/MenuIcon";
import CloseIcon from "@/icons/CloseIcon";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Language, languages } from "@/lib/i18n";

export default function HomeContactHeroSection() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t, dir } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 1024px)").matches
      ) {
        setMobileOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function cycleLanguage() {
    const idx = languages.findIndex((l) => l.code === lang);
    const next = languages[(idx + 1) % languages.length];
    setLang(next.code as Language);
  }

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat pt-4 bg-gradient-to-b from-[#488981]/80 via-[#50AED4]/50 to-[#51D1B8]/0"
    >
      <div className="layout-shell-x mx-auto flex w-full flex-col items-center pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-[95%] py-1.5 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-3 pb-2 md:pb-0">
            <Link
              href="/"
              className="font-abril text-2xl text-primary dark:text-primary-light md:text-3xl"
              aria-label={t.home.footer.linkHome}
            >
              RAYYAN
            </Link>

            <div className="hidden items-center justify-center gap-3 lg:flex">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full border border-white bg-white/50 px-[6px] py-[2.5px] dark:border-white/25 dark:bg-white/8">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={t.nav.lightMode}
                    className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
                      theme === "light"
                        ? "bg-primary text-white"
                        : "text-zinc-900 hover:text-primary dark:text-white"
                    }`}
                  >
                    <SunIcon size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={t.nav.darkMode}
                    className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
                      theme === "dark"
                        ? "bg-primary text-white"
                        : "text-zinc-900 hover:text-primary dark:border dark:border-white/25 dark:bg-white/8 dark:text-white dark:hover:text-primary-light"
                    }`}
                  >
                    <MoonIcon size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={cycleLanguage}
                  aria-label={t.nav.language}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:border-white/25 dark:bg-white/8 dark:text-white dark:hover:text-primary-light"
                >
                  <TranslateIcon size={20} />
                </button>
              </div>

              <Link
                href="/contact"
                className="rounded-full border border-white bg-white/50 px-5 py-[10.5px] text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
              >
                {t.contact.contactUs}
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white bg-white/50 px-5 py-[10.5px] text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
              >
                {t.contact.loginNow}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? t.contact.closeMenu : t.contact.openMenu}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary md:h-12 md:w-12 lg:hidden dark:border-white/25 dark:bg-white/8 dark:text-white dark:hover:text-primary-light"
            >
              {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="flex flex-col gap-4 border-t border-zinc-200/80 pb-5 pt-4 lg:hidden dark:border-zinc-400/80">
              <div className="flex flex-wrap items-center gap-3 px-3">
                <div className="flex items-center gap-1 rounded-full border border-white bg-white/50 px-[7px] py-[2.5px] dark:border-white/25 dark:bg-white/8">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={t.nav.lightMode}
                    className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
                      theme === "light"
                        ? "bg-primary text-white"
                        : "text-zinc-900 hover:text-primary dark:text-white"
                    }`}
                  >
                    <SunIcon size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={t.nav.darkMode}
                    className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
                      theme === "dark"
                        ? "bg-primary text-white"
                        : "text-zinc-900 hover:text-primary dark:border dark:border-white/25 dark:bg-white/8 dark:text-white dark:hover:text-primary-light"
                    }`}
                  >
                    <MoonIcon size={18} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={cycleLanguage}
                  aria-label={t.nav.language}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:border-white/25 dark:bg-white/8 dark:text-white dark:hover:text-primary-light"
                >
                  <TranslateIcon size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-2 px-3">
                <Link
                  href="/contact"
                  className="rounded-full  border border-white bg-white/50 px-5 py-2.5 text-center text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.contact.contactUs}
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white bg-white/50 px-5 py-2.5 text-center text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.contact.loginNow}
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 w-full text-center md:mt-16">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#1A1615] dark:text-white md:text-6xl lg:text-7xl">
            {t.contact.heroTitleLine1}
            <br />
            {t.contact.heroTitleLine2}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#453F3D] dark:text-zinc-400 md:text-base">
            {t.contact.heroSubtitle}
          </p>

          <div
            className={
              theme === "dark"
                ? "mx-auto mt-8 w-full max-w-xl rounded-2xl border border-white/30 bg-linear-to-br from-white/5 from-65% to-[#D9FFFA]/50/15 p-4 md:p-6"
                : "mx-auto mt-8 w-full max-w-xl rounded-[20px] border border-white bg-gradient-to-br from-[#FFFFFF]/35 from-[70%] to-[#D9FFFA77] p-4 md:p-6"
            }
          >
            <form
              dir={dir}
              className={
                theme === "dark"
                  ? "flex flex-col gap-5 text-start"
                  : "space-y-3 text-start"
              }
            >
              <div className={theme === "dark" ? "flex flex-col gap-1.5" : undefined}>
                <label
                  htmlFor="contact-full-name"
                  className={
                    theme === "dark"
                      ? "text-sm font-semibold text-zinc-300 md:text-base"
                      : "mb-1 block text-sm font-medium text-[#1A1615]"
                  }
                >
                  {t.contact.fullName}
                </label>
                <input
                  id="contact-full-name"
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  className={
                    theme === "dark"
                      ? "input-style w-full rounded-[44px] py-3.5 ps-4 pe-4 text-sm text-zinc-100 placeholder:text-[#A0A3BD] focus:outline-none focus:ring-1 focus:ring-primary/20"
                      : "w-full rounded-full border border-[#E6E6E6]/40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.245),rgba(255,255,255,0.7))] px-4 py-3 text-sm text-[#1A1615] outline-none placeholder:text-[#98A1A6] transition-colors focus:border-primary"
                  }
                />
              </div>

              <div className={theme === "dark" ? "flex flex-col gap-1.5" : undefined}>
                <label
                  htmlFor="contact-email"
                  className={
                    theme === "dark"
                      ? "text-sm font-semibold text-zinc-300 md:text-base"
                      : "mb-1 block text-sm font-medium text-[#1A1615]"
                  }
                >
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  className={
                    theme === "dark"
                      ? "input-style w-full rounded-[44px] py-3.5 ps-4 pe-4 text-sm text-zinc-100 placeholder:text-[#A0A3BD] focus:outline-none focus:ring-1 focus:ring-primary/20"
                      : "w-full rounded-full border border-[#E6E6E6]/40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.245),rgba(255,255,255,0.7))] px-4 py-3 text-sm text-[#1A1615] outline-none placeholder:text-[#98A1A6] transition-colors focus:border-primary"
                  }
                />
              </div>

              <div className={theme === "dark" ? "flex flex-col gap-1.5" : undefined}>
                <label
                  htmlFor="contact-message"
                  className={
                    theme === "dark"
                      ? "text-sm font-semibold text-zinc-300 md:text-base"
                      : "mb-1 block text-sm font-medium text-[#1A1615]"
                  }
                >
                  {t.contact.yourMessage}
                </label>
                <textarea
                  id="contact-message"
                  rows={8}
                  placeholder={t.contact.messagePlaceholder}
                  className={
                    theme === "dark"
                      ? "input-style w-full resize-none rounded-2xl px-4 py-3 text-sm text-zinc-100 placeholder:text-[#A0A3BD] focus:outline-none focus:ring-1 focus:ring-primary/20"
                      : "w-full resize-none rounded-2xl border border-[#E6E6E6]/40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.245),rgba(255,255,255,0.7))] px-4 py-3 text-sm text-[#1A1615] outline-none placeholder:text-[#98A1A6] transition-colors focus:border-primary"
                  }
                />
              </div>

              <button
                type="submit"
                className={
                  theme === "dark"
                    ? "mt-1 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-primary py-3.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary/40"
                    : "mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#58A19A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark md:mt-6"
                }
              >
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
