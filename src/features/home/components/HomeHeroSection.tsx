"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import heroPreview from "@src/assets/dashboard/home-img.png";
import heroBg from "@src/assets/dashboard/home-hero.png";
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import MenuIcon from "@/icons/MenuIcon";
import CloseIcon from "@/icons/CloseIcon";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Language, languages } from "@/lib/i18n";

export default function HomeHeroSection() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
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
      className="relative overflow-hidden pt-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <div className="layout-shell-x mx-auto flex w-full flex-col items-center pb-10 md:pb-14">
        <div className="mx-auto w-full max-w-[95%] py-1.5 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-3 pb-2 md:pb-0">
            <span className="font-abril text-2xl text-primary md:text-3xl">
              RAYYAN
            </span>

            {/* Full bar — same breakpoint as dashboard navbar (`lg`) */}
            <div className="hidden items-center justify-center gap-3 lg:flex">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full border border-white bg-white/50 px-[6px] py-[2.5px] dark:bg-white/8 dark:border-white/25">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:bg-white/8 dark:border-white/25 dark:text-white dark:hover:text-primary-light"
                >
                  <TranslateIcon size={20} />
                </button>
              </div>
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

            {/* Same round “glass” control as language + theme row */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary lg:hidden dark:bg-white/8 dark:border-white/25 dark:text-white dark:hover:text-primary-light"
            >
              {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="flex flex-col gap-4 border-t border-zinc-200/80 pb-5 pt-4 lg:hidden dark:border-zinc-400/80">
              <div className="flex flex-wrap items-center gap-3 px-3">
                <div className="flex items-center gap-1 rounded-full border border-white bg-white/50 px-[7px] py-[2.5px] dark:bg-white/8 dark:border-white/25">
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
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:bg-white/8 dark:border-white/25 dark:text-white dark:hover:text-primary-light"
                >
                  <TranslateIcon size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-2 px-3">
                <Link
                  href="#"
                  className="rounded-full bg-[#58A19A] px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white bg-white/50 px-5 py-2.5 text-center text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Login Now
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#1A1615] md:text-6xl lg:text-7xl">
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
