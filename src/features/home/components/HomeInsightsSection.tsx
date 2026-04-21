"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import insightsImage from "@src/assets/dashboard/insights-section-img.png";
import tool1 from "@src/assets/dashboard/tool1.png";
import tool2 from "@src/assets/dashboard/tool2.png";
import tool3 from "@src/assets/dashboard/tool3.png";

export default function HomeInsightsSection() {
  const { t } = useLanguage();

  const miniCards = useMemo(() => {
    const images = [tool3, tool2, tool1] as const;
    return t.home.insights.miniArticles.map((article, index) => ({
      title: article.title,
      badge: article.badge,
      image: images[index] ?? tool1,
    }));
  }, [t]);

  return (
    <section className="layout-shell-x pb-10 md:pb-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold text-[#656769] md:text-base dark:text-[#9CA3AF]">
            {t.home.insights.eyebrow}
          </p>
          <h3 className="mx-auto mt-2 max-w-xl text-base font-semibold leading-snug text-[#1A1615] sm:text-lg md:text-2xl dark:text-white">
            {t.home.insights.sectionTitle}
          </h3>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-transparent bg-white/70 p-3 dark:border-white/10 dark:bg-[#141414]">
          <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:gap-8">
            {/* Left Image */}
            <div className="w-full overflow-hidden rounded-2xl md:w-[50%]">
              <Image
                src={insightsImage}
                alt={t.home.insights.featuredImageAlt}
                className="h-full w-full object-cover ring-1 ring-transparent dark:ring-white/10"
              />
            </div>

            {/* Right Content */}
            <div className="h-full w-full ps-4 md:w-[50%]">
              <span className="inline-block rounded-full bg-[#58A19A] px-3 py-2 text-xs font-semibold text-white dark:bg-[#519A91]">
                {t.home.insights.featuredPost}
              </span>

              <h4 className="mt-3 max-w-xl text-xl font-semibold leading-snug text-[#1A1615] md:text-2xl lg:text-3xl dark:text-white">
                {t.home.insights.featuredArticleTitle}
              </h4>

              <p className="mt-3 pb-12 text-sm leading-relaxed text-[#656769] md:pb-18 md:text-base dark:text-[#9CA3AF]">
                {t.home.insights.featuredArticleBody}
              </p>

              <div className="mt-6 flex items-center justify-between pe-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300 md:h-9 md:w-9 lg:h-10 lg:w-10 dark:border-white/15 dark:bg-zinc-600" />
                  <div>
                    <p className="text-sm font-semibold text-[#1A1615] dark:text-white">
                      {t.home.insights.authorName}
                    </p>
                    <p className="text-xs text-[#757170] dark:text-[#9CA3AF]">
                      {t.home.insights.authorRole}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#C9502E] px-3 py-2 text-[10px] font-semibold text-white lg:px-4">
                  {t.home.insights.featuredBadge}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {miniCards.map((card) => (
            <article key={card.title}>
              <Image
                src={card.image}
                alt={card.title}
                className="h-[210px] w-full rounded-2xl object-cover ring-1 ring-transparent md:h-auto dark:ring-white/10"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-lg font-semibold text-[#1A1615] md:text-xl dark:text-white">
                  {card.title}
                </p>
                <span className="rounded-full bg-[#156CC2] px-2 py-1.5 text-xs font-semibold tracking-[0.2px] text-white dark:bg-[#2563eb]">
                  {card.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
