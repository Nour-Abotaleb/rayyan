"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeCommunitySection() {
  const { t } = useLanguage();

  return (
    <section className="layout-shell-x pb-14 pt-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mt-8 md:mt-10 text-center">
          <h3 className="text-3xl font-semibold tracking-tight text-[#1A1615] md:text-5xl lg:text-6xl dark:text-white">
            {t.home.community.titleLine}
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#453F3D] dark:text-[#9CA3AF]">
            {t.home.community.subtitle}
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark dark:bg-[#519A91] dark:hover:bg-primary-dark"
            >
              {t.home.community.getStarted}
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white bg-white/50 px-7 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white dark:border-white/25 dark:bg-white/8 dark:text-white dark:hover:bg-white/15"
            >
              {t.home.community.learnMore}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
