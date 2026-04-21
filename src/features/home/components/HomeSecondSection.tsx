"use client";
import { useState } from "react";
import Image from "next/image";
import CardBg from "./CardBg";
import centeredImg from "@src/assets/dashboard/centered-img.svg";
import healthAssistantCard from "@src/assets/dashboard/health-assistant-card.svg";
import { useLanguage } from "@/contexts/LanguageContext";

const companies = [
  "Amsterdam",
  "SAVANNAH",
  "MILANO",
  "Luminous",
  "Luminous",
  "Luminous",
  "Luminous",
] as const;
const filterKeys = ["technical", "visualization", "financial"] as const;
type FilterKey = (typeof filterKeys)[number];

export default function HomeSecondSection() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("visualization");

  const filterLabel: Record<FilterKey, string> = {
    technical: t.home.secondSection.filterTechnical,
    visualization: t.home.secondSection.filterVisualization,
    financial: t.home.secondSection.filterFinancial,
  };

  return (
    <section className="pt-12 pb-10 md:pt-16 md:pb-14">
      <div className="mx-auto flex w-[95%] md:max-w-5xl flex-col items-center text-center">
        <p className="text-base font-semibold text-[#656769] md:text-lg dark:text-[#9CA3AF]">
          {t.home.marketing.trustedBy}
        </p>
        {/* 
        <div className="mt-4 md:mt-6 lg:mt-8 flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-8 gap-y-2 text-lg font-semibold text-[#6A6C6A]">
          {companies.map((company) => (
          {companies.map((company, idx) => (
            <span key={company}>{company}</span>
            <span key={`${company}-${idx}`}>{company}</span>
          ))}
        </div> */}
        {/* --- INFINITE SLIDER START — dir=ltr keeps translateX marquee seamless in RTL --- */}
        <div className="relative mt-8 w-full overflow-hidden" dir="ltr">
          <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-r from-[#F9F9F9] to-transparent dark:from-[#161616]" />
          <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-l from-[#F9F9F9] to-transparent dark:from-[#161616]" />

          <div className="flex w-max animate-infinite-scroll items-center gap-10">
            {/* Render list twice for seamless looping */}
            {[...companies, ...companies].map((company, idx) => (
              <span
                key={`${company}-${idx}`}
                className="text-sm font-semibold text-[#6A6C6A] md:text-lg dark:text-[#9CA3AF]"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
        {/* --- INFINITE SLIDER END --- */}

        {/* second section header */}
        <p className="mt-16 text-sm font-semibold text-[#656769] md:mt-20 md:text-base lg:mt-24 dark:text-[#9CA3AF]">
          {t.home.secondSection.recordsEyebrow}
        </p>
        <h2 className="mt-2 mb-6 max-w-4xl text-base font-semibold leading-snug text-[#1A1615] md:text-2xl lg:mb-8 lg:text-3xl dark:text-white">
          {t.home.secondSection.recordsHeading}
        </h2>

        {/* 2. Modified Content Area to replicate image structure */}
        {/* Extra padding-inline-end + top so RFP card + edit stay inside rounded clip */}
        <div className="relative mt-2 w-full min-h-[345px] overflow-hidden rounded-[24px] border border-transparent bg-[#F2F2F2] p-2.5 pb-4 pe-5 pt-4 ps-4 sm:min-h-0 sm:p-5 md:mt-2 md:pb-6 md:pe-10 md:ps-6 md:pt-5 dark:border-white/10 dark:bg-[#141414]">
          {/* Flatter box on small screens so the mock doesn’t dominate the viewport */}
          <div className="relative aspect-[1.95/1] min-h-[180px] p-2 sm:p-4 md:aspect-[1.56/1] md:min-h-0 md:p-6">
            {/* RFP card — physical right; CardBg mirrored in RTL so notch aligns with edit */}
            <div className="absolute right-4 top-2 z-20 flex w-[min(64vw,190px)] flex-col overflow-visible rounded-2xl px-2 pt-1.5 sm:right-3 sm:top-3 sm:max-w-[240px] sm:px-3 sm:pt-3 md:right-5 md:top-4 md:w-[300px] md:max-w-[300px] lg:px-4 lg:pt-4">
              <CardBg
                className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-center rtl:scale-x-[-1] dark:[&_path]:fill-white/[0.12]"
                preserveAspectRatio="xMidYMid meet"
              />
              {/* Header: Title and Edit Icon */}
              <div className="relative z-10 flex items-start justify-between gap-2 pt-1 pr-14 sm:pr-16 md:pr-[4.5rem]">
                <h4 className="min-w-0 flex-1 text-start text-[11px] font-semibold leading-snug text-[#1B1F24] sm:text-sm lg:text-base dark:text-white">
                  {t.home.secondSection.rfpBidProgress}
                </h4>
                {/* Physical top-right of card (card sits on physical right); inset avoids overflow clip */}
                <button
                  type="button"
                  className="absolute right-2 top-2 z-20 rounded-full bg-white/60 p-1.5 sm:right-2.5 sm:top-2.5 sm:p-2 md:right-3 md:top-3 md:p-3 dark:border dark:border-white/15 dark:bg-white/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-[#515459] md:h-5 md:w-5 dark:text-zinc-400"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Stat */}
              <div className="mt-2 text-center relative z-10">
                {/* 4. Replicating the specific font style and % placement */}
                <span className="font-mono text-lg font-semibold tracking-tighter text-[#1B1F24] sm:text-2xl md:text-3xl dark:text-white">
                  <span className="text-base font-normal sm:text-2xl">%</span>32
                </span>
                <p className="mt-1 text-[10px] font-medium text-[#515459] sm:text-sm dark:text-[#656769]">
                  {t.home.secondSection.completed}
                </p>
              </div>

              {/* Progress Bar and Labels */}
              <div className="mt-2 sm:mt-4 relative z-10">
                <div className="h-3 w-full rounded-full bg-[#58A19A]/16 sm:h-4 dark:bg-[#519A91]/25">
                  {/* 5. Matching the progress bar width (32%) and color */}
                  <div className="h-full w-[32%] rounded-full bg-[#58A19A] dark:bg-[#519A91]"></div>
                </div>
                {/* <div className="mt-2 flex items-center justify-between text-xs text-[#515459]">
                  <span>65 kg</span>
                  <span>75 kg</span>
                </div> */}
              </div>
            </div>
            {/* 2. CENTER IMAGE */}
            <div className="absolute -bottom-28 md:-bottom-0 inset-0 z-10 flex items-center justify-center px-1 pt-3 sm:pt-0">
              <Image
                src={centeredImg}
                alt="center"
                sizes="(max-width: 640px) min(85vw, 260px), (max-width: 1024px) 320px, 550px"
                className="h-auto w-[min(70vw,210px)] max-h-[34vh] object-contain sm:w-[300px] sm:max-h-none sm:max-w-[300px] md:w-[370px] md:max-w-[370px] lg:w-[min(92%,550px)] lg:max-w-[500px] rounded-2xl"
              />
            </div>

            {/* 3. BOTTOM LEFT IMAGE */}
            <div className="absolute -bottom-38 -left-2 md:z-10 max-w-[40vw] overflow-hidden sm:-bottom-6 sm:-left-6 sm:max-w-none z-0">
              <Image
                src={healthAssistantCard}
                alt="bottom"
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 220px, 280px"
                className="h-auto w-full max-w-[130px] rounded-tr-2xl sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px]"
              />
            </div>
          </div>

          {/* Filter Buttons — rtl: extra horizontal padding for Arabic labels; rounded-full preserved */}
          <div className="absolute bottom-4 left-1/2 z-10 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[#AFAFAF]/25 p-1.5 md:bottom-6 dark:bg-white/10">
            {filterKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                className={`whitespace-nowrap rounded-full px-2 py-[7.9px] text-xs font-semibold transition md:px-4 md:py-[9.9px] rtl:px-4 rtl:md:px-7 ${
                  activeFilter === key
                    ? "bg-[#58A19A] text-white dark:bg-[#519A91]"
                    : "border border-white/25 bg-white/30 text-black dark:border-white/20 dark:bg-white/8 dark:text-white"
                }`}
              >
                {filterLabel[key]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
