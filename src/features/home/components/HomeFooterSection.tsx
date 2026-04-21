"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import codgooLogo from "@src/assets/dashboard/codgoo-logo.svg";

export default function HomeFooterSection() {
  const { t } = useLanguage();

  const pagesLinks = useMemo(
    () =>
      [
        { label: t.home.footer.linkHome, href: "/" },
        { label: t.home.footer.linkFeatures, href: "/dashboard" },
        { label: t.home.footer.linkPricing, href: "/signup" },
      ] as const,
    [t],
  );

  const infoLinks = useMemo(
    () =>
      [
        { label: t.home.footer.linkTechnical, href: "/login" },
        { label: t.home.footer.linkFinancial, href: "/" },
        { label: t.home.footer.linkVisualization, href: "/" },
      ] as const,
    [t],
  );

  return (
    <footer className="layout-shell-x pb-8 pt-3">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#757372]/15 bg-white/25 px-6 py-6 md:px-8 lg:pb-12 dark:border-white/10 dark:bg-[#141414]/90">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-[3fr_1.2fr] pb-12">
          <div>
            <Link
              href="/"
              className="font-abril text-2xl text-primary md:text-3xl dark:text-primary-light"
              aria-label={t.home.footer.linkHome}
            >
              RAYYAN
            </Link>
            <p className="mt-2 text-sm leading-5 text-[#453F3D] md:max-w-md dark:text-[#9CA3AF]">
              {t.home.footer.tagline}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <ul className="mt-2 space-y-1.5">
                {pagesLinks.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      className="text-sm text-[#1A1615] hover:text-primary dark:text-zinc-200 dark:hover:text-primary-light"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ul className="mt-2 space-y-1.5">
                {infoLinks.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      className="text-sm text-[#1A1615] hover:text-primary dark:text-zinc-200 dark:hover:text-primary-light"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-[#757170]/15 pt-3 text-sm text-[#453F3D] dark:border-white/10 dark:text-[#9CA3AF]">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2">
            <p className="text-nowrap">{t.home.footer.copyright}</p>
            <p className="flex items-center gap-1">
              {t.home.footer.builtIn}
              <Image src={codgooLogo} alt={t.home.footer.codgooLogoAlt} className="w-16 md:w-20" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
