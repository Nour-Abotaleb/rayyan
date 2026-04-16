 'use client'

import Image from "next/image";
import Link from "next/link";
import heroPreview from "@src/assets/dashboard/home-img.png";
import heroBg from "@src/assets/dashboard/home-hero.png";
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Language, languages } from "@/lib/i18n";

export default function HomeHeroSection() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  function cycleLanguage() {
    const idx = languages.findIndex((l) => l.code === lang);
    const next = languages[(idx + 1) % languages.length];
    setLang(next.code as Language);
  }

  return (
    <section 
      className="relative overflow-hidden pt-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >

      <div className="layout-shell-x mx-auto flex w-full flex-col items-center pb-10 md:pb-14">
        {/* <div className="w-full max-w-5xl rounded-full bg-white/25 px-3 py-2.5 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-3">
            <span className="font-abril text-lg text-primary md:text-xl">RAYYAN</span>
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-full bg-white/50 dark:bg-white/8 dark:border dark:border-white/25 px-[7px] py-[2.5px]">
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
                      : "text-zinc-900 hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
                  }`}
                >
                  <MoonIcon size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={cycleLanguage}
                aria-label={t.nav.language}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
              >
                <TranslateIcon size={20} />
              </button>
            </div>
            <Link
              href="/login"
              className="rounded-full bg-[#1A1615] px-4 py-2.5 text-sm font-medium text-white"
            >
              Try Dreelio free
            </Link>
          </div>
        </div> */}
        <div className="w-full max-w-[95%] mx-auto py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-3">
            <span className="font-abril text-lg text-primary md:text-xl lg:text-2xl">RAYYAN</span>
            <div className="flex items-center justify-center gap-3">
              <div className="hidden items-center gap-2 md:flex">
                <div className="flex items-center gap-1 rounded-full bg-white/50 dark:bg-white/8 border border-white dark:border-white/25 px-[6px] py-[2.5px]">
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
                        : "text-zinc-900 hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
                    }`}
                  >
                    <MoonIcon size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={cycleLanguage}
                  aria-label={t.nav.language}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 border border-white dark:border-white/25 dark:hover:text-primary-light"
                >
                  <TranslateIcon size={20} />
                </button>
              </div>
              <span></span>
              <Link
                href="#"
                className="rounded-full bg-[#58A19A] px-5 py-[10.5px] text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Contact Us
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white bg-white/50 px-5 py-[10.5px] text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
              >
                Login Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1A1615] md:text-7xl">
            All Your Documents.
            <br />
            One Smart Platform
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm text-[#453F3D] md:text-2xl/8">
            Upload, analyze, and manage your files with intelligent tools
            designed to simplify your workflow and boost productivity.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white bg-white/50 px-7 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-10 w-full max-w-5xl p-2 md:mt-14">
          <div className="">
            <Image
              src={heroPreview}
              alt="Dashboard preview"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}