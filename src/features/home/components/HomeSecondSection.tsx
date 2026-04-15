"use client"
import { useState } from "react";
import CardBg from "./CardBg"

const companies = ["Amsterdam", "SAVANNAH", "MILANO", "Luminous", "Luminous", "Luminous", "Luminous"] as const;
const filters = ["Technical", "Visualization", "Financial"] as const;

export default function HomeSecondSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Visualization");
  return (
    <section className="pt-12 pb-10 md:pt-16 md:pb-14">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <p className="text-lg font-semibold text-[#656769]">
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
                className="text-base font-semibold text-[#6A6C6A] md:text-lg"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
        {/* --- INFINITE SLIDER END --- */}

      {/* second section header */}
      <p className="mt-10 text-base font-semibold text-[#656769] md:mt-20 lg:mt-24">
          Stay in Control of Your Records
        </p>
        <h2 className="mt-2 max-w-4xl text-2xl font-semibold leading-snug text-[#1A1615] md:text-3xl">
          Easily access, track, and manage your documents from anywhere with a
          clean and intuitive interface.
        </h2>

        {/* 2. Modified Content Area to replicate image structure */}
        <div className="relative mt-7 w-full rounded-[24px] bg-[#F2F2F2] p-4 md:p-6">
          
          {/* Main Card Container with height matching image aspect ratio */}
          <div className="relative aspect-[1.8/1] p-6">
            
            {/* The RFP Bid Progress Card component */}
            <div className="relative w-full max-w-[280px] flex-col p-4 text-left">
            <CardBg 
                className="absolute inset-0 z-0 backdrop-blur-sm" 
                preserveAspectRatio="none" 
              />
              {/* Header: Title and Edit Icon */}
              <div className="flex items-start justify-between relative z-10">
                <h4 className="text-blase font-semibold text-[#1B1F24]">
                  RFP Bid Progress
                </h4>
                {/* 3. Replicating the Edit Icon placement */}
                <button className="absolute -right-4.5 -top-4.5 rounded-full bg-white/60 p-3">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#515459]"
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
                <span className="font-mono text-3xl font-semibold tracking-tighter text-[#1B1F24]">
                  <span className="text-2xl font-normal">%</span>32
                </span>
                <p className="mt-1 text-sm font-medium text-[#515459]">
                  Completed
                </p>
              </div>

              {/* Progress Bar and Labels */}
              <div className="mt-4 relative z-10">
                <div className="h-4 w-full rounded-full bg-[#58A19A]/16">
                  {/* 5. Matching the progress bar width (32%) and color */}
                  <div className="h-full w-[32%] rounded-full bg-[#58A19A]"></div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#515459]">
                  <span>65 kg</span>
                  <span>75 kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Buttons moved inside/below the card section */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[#AFAFAF]/25 p-1.5 md:bottom-6">
            {filters.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className={`rounded-full px-4 py-[9.9px] text-xs font-semibold transition ${
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
