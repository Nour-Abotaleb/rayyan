"use client";
import { useState } from "react";
import Image from "next/image";
import CardBg from "./CardBg";
import centeredImg from "@src/assets/dashboard/centered-img.svg";
import healthAssistantCard from "@src/assets/dashboard/health-assistant-card.svg";

const companies = [
  "Amsterdam",
  "SAVANNAH",
  "MILANO",
  "Luminous",
  "Luminous",
  "Luminous",
  "Luminous",
] as const;
const filters = ["Technical", "Visualization", "Financial"] as const;

export default function HomeSecondSection() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("Visualization");
  return (
    <section className="pt-12 pb-10 md:pt-16 md:pb-14">
      <div className="mx-auto flex w-[95%] md:max-w-5xl flex-col items-center text-center">
        <p className="text-base md:text-lg font-semibold text-[#656769]">
          Trusted by 7,000+ top startups, freelancers and studios
        </p>
        {/* 
        <div className="mt-4 md:mt-6 lg:mt-8 flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-8 gap-y-2 text-lg font-semibold text-[#6A6C6A]">
          {companies.map((company) => (
          {companies.map((company, idx) => (
            <span key={company}>{company}</span>
            <span key={`${company}-${idx}`}>{company}</span>
          ))}
        </div> */}
        {/* --- INFINITE SLIDER START --- */}
        <div className="relative mt-8 w-full overflow-hidden">
          {/* Gradients to fade edges (Optional but looks professional) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F9F9F9] to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F9F9F9] to-transparent"></div>

          <div className="flex w-max animate-infinite-scroll items-center gap-10">
            {/* Render list twice for seamless looping */}
            {[...companies, ...companies].map((company, idx) => (
              <span
                key={`${company}-${idx}`}
                className="text-sm font-semibold text-[#6A6C6A] md:text-lg"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
        {/* --- INFINITE SLIDER END --- */}

        {/* second section header */}
        <p className="mt-16 text-sm md:text-base font-semibold text-[#656769] md:mt-20 lg:mt-24">
          Stay in Control of Your Records
        </p>
        <h2 className="mt-2 mb-6 lg:mb-8 max-w-4xl text-base md:text-2xl font-semibold leading-snug text-[#1A1615] lg:text-3xl">
          Easily access, track, and manage your documents from anywhere with a
          clean and intuitive interface.
        </h2>

        {/* 2. Modified Content Area to replicate image structure */}
        <div className="relative mt-16 w-full min-h-[345px] overflow-hidden rounded-[24px] bg-[#F2F2F2] p-2.5 sm:min-h-0 sm:p-4 md:mt-2 md:p-6">
          {/* Flatter box on small screens so the mock doesn’t dominate the viewport */}
          <div className="relative aspect-[1.95/1] min-h-[180px] p-2 sm:p-4 md:aspect-[1.56/1] md:min-h-0 md:p-6">
            {/* The RFP Bid Progress Card component */}
            <div className="absolute right-0 top-0 z-20 flex w-[min(64vw,190px)] flex-col rounded-2xl px-1.5 pt-1.5 sm:max-w-[240px] sm:px-3 sm:pt-3 md:w-[300px] md:max-w-[300px] lg:px-4 lg:pt-4">
              <CardBg
                className="absolute inset-0 z-0"
                preserveAspectRatio="xMidYMid meet"
              />
              {/* Header: Title and Edit Icon */}
              <div className="flex items-start justify-between relative z-10">
                <h4 className="text-[11px] font-semibold text-[#1B1F24] sm:text-sm lg:text-base">
                  RFP Bid Progress
                </h4>
                {/* 3. Replicating the Edit Icon placement */}
                <button className="absolute rounded-full bg-white/60 p-1.5 -right-1.5 -top-2 sm:p-2 md:-right-4.5 md:-top-4.5 md:p-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#515459] w-4 h-4 md:w-5 md:h-5"
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
                <span className="font-mono text-lg font-semibold tracking-tighter text-[#1B1F24] sm:text-2xl md:text-3xl">
                  <span className="text-base font-normal sm:text-2xl">%</span>32
                </span>
                <p className="mt-1 text-[10px] font-medium text-[#515459] sm:text-sm">
                  Completed
                </p>
              </div>

              {/* Progress Bar and Labels */}
              <div className="mt-2 sm:mt-4 relative z-10">
                <div className="h-3 w-full rounded-full bg-[#58A19A]/16 sm:h-4">
                  {/* 5. Matching the progress bar width (32%) and color */}
                  <div className="h-full w-[32%] rounded-full bg-[#58A19A]"></div>
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

          {/* Filter Buttons moved inside/below the card section */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[#AFAFAF]/25 p-1.5 md:bottom-6 z-10">
            {filters.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className={`rounded-full px-2 md:px-4 py-[7.9px] md:py-[9.9px] text-xs font-semibold transition ${
                  activeFilter === label
                    ? "bg-[#58A19A] text-white"
                    : "bg-white/30 border border-white/25 text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
