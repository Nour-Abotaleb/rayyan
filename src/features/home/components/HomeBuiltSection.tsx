"use client"
import Image from "next/image";
import { useState } from "react";
import icon1 from "@src/assets/dashboard/icon1.svg";
import icon2 from "@src/assets/dashboard/icon2.svg";
import icon3 from "@src/assets/dashboard/icon3.svg";
import icon4 from "@src/assets/dashboard/icon4.svg";
import icon5 from "@src/assets/dashboard/icon5.svg";
import icon6 from "@src/assets/dashboard/icon6.svg";

const bottomCards = [
  {
    title: "Technical Approach Mastery",
    description:
      "Automatically generate rich technical methodologies based on bid requirements and scoring criteria.",
    icon: icon1,
  },
  {
    title: "Smart Resource Mapping",
    description:
      "Structure teams by role and cost while balancing effort and timeline for every section.",
    icon: icon2,
  },
  {
    title: "Zero-Error Compliance",
    description:
      "Cross-check your proposal against all mandatory RFP clauses before submission.",
    icon: icon3,
  },

] as const;

const colors = [
  { color: "#614A44" },
  { color: "#757170" },
  { color: "#F6C701" },
  { color: "#FB7F00" },
  { color: "#00A82D" },
  { color: "#3286FB" },
  {
    color: "#F1EBE5",
    icon: (
      <svg width="15" height="20" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.65987 19.5056C9.49248 19.5056 11.25 18.7776 12.5459 17.4817C13.8417 16.1858 14.5697 14.4282 14.5697 12.5956C14.5697 10.6213 13.5826 8.74579 11.6084 7.16638C9.63412 5.58696 8.15343 3.21784 7.65987 0.75C7.16631 3.21784 5.68562 5.58696 3.71137 7.16638C1.73712 8.74579 0.75 10.6213 0.75 12.5956C0.74987 13.5031 0.928498 14.4017 1.27571 15.2401C1.62291 16.0785 2.1319 16.8403 2.77356 17.482C3.41523 18.1236 4.17704 18.6326 5.01544 18.9798C5.85384 19.327 6.75242 19.5057 7.65987 19.5056Z" stroke="#453F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    color: "#F1EBE5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.2498 11.7921C16.8303 10.4812 15.9359 9.24627 14.5697 8.15351C12.5955 6.5741 11.1148 4.20497 10.6212 1.73713C10.4406 2.62161 10.1474 3.47943 9.74862 4.28986M0.75 0.75L20.4925 20.4927M7.45752 7.45956C7.20712 7.70322 6.94522 7.9348 6.67275 8.15351C4.6985 9.73293 3.71137 11.6085 3.71137 13.5828C3.71179 14.7398 4.00267 15.8783 4.55736 16.8938C5.11206 17.9093 5.9128 18.7692 6.88618 19.3948C7.85956 20.0204 8.97441 20.3917 10.1285 20.4745C11.2826 20.5573 12.4391 20.3491 13.4918 19.8688C14.9012 19.2253 16.0533 18.1267 16.7631 16.7495" stroke="#453F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];
export default function HomeBuiltSection() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  return (
    <section className="layout-shell-x py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-base font-semibold text-[#656769]">
            Built for Proposal Professionals.
          </p>
          <h3 className="mx-auto mt-2 max-w-xl text-2xl font-semibold leading-snug text-[#1A1615]">
            Empowering your team with the tools needed to win complex
            government tenders.
          </h3>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">

          {/* LEFT CARD */}
          <div className="rounded-3xl bg-[#58A19A]/16 p-6 flex flex-col justify-between">
            
            <h4 className="text-lg font-semibold text-[#1A1615] max-w-xs">
              Smart, flexible, and built for your unique bid structure.
            </h4>

            {/* UI BOX */}
            <div className="mt-6 md:mt-24 space-y-4">
              
              {/* Colors */}
              <div className="flex items-center gap-2 rounded-2xl bg-white border border-[#E4E2E2] p-3.5 w-full justify-center">
                {colors.map((item, i) => (
                  <div
                    key={i}
                    className="relative h-9 w-9 md:h-10 md:w-10 border-2 border-white rounded-full -ms-4 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon && item.icon}
                  </div>
                ))}
              </div>

             <div className="grid grid-cols-[2.5fr_1fr] gap-6">
              {/* Toggle */}
              <div className="flex items-center justify-between rounded-2xl bg-white border border-[#E4E2E2] p-3.5 w-full">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-10 rounded-full bg-[#00A82D]/15 border border-[#00A82D] relative">
                    <div className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-[#00A82D]" />
                  </div>
                  <span className="text-sm text-[#1C1C1C]">
                    Hide Dreelio branding
                  </span>
                </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white border border-[#E4E2E2] p-1.5 w-full">
                  
                  {/* SUN */}
                  <button
                    onClick={() => setMode("dark")}
                    className={`h-10 w-12 flex items-center justify-center rounded-xl transition
                      ${mode === "dark" ? "bg-[#F1EBE5] border border-[#E4E2E2]" : "bg-transparent"}
                    `}
                  >
              
                    {/* Moon SVG */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1A1615"
                      strokeWidth="1.5"
                    >
                      <path d="M21 12.79A9 9 0 0111.21 3 
                              7 7 0 1021 12.79z" />
                    </svg>
                  </button>

                  {/* MOON */}
                  <button
                    onClick={() => setMode("light")}
                    className={`h-10 w-12 flex items-center justify-center rounded-xl transition
                      ${mode === "light" ? "bg-[#F1EBE5] border border-[#E4E2E2]" : "bg-transparent"}
                    `}
                  >
                          {/* Sun SVG */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1A1615"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  </button>

                </div>
            </div>
              {/* Description */}
              <p className="mt-6 text-sm text-[#656769] leading-relaxed max-w-sm">
                Tailor every proposal to the specific requirements of the RFP. From Technical Methodologies to Cybersecurity and Sustainability plans—Rayyan adapts to your firm’s identity and the client’s standards.
              </p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-3xl bg-[#58A19A]/16 p-6 flex flex-col justify-between overflow-hidden">
            <h4 className="text-lg font-semibold text-[#1A1615] max-w-xs">
              Extract intelligence directly from your RFP documents.
            </h4>

            {/* ICON ROWS CONTAINER */}
            <div
              className="mt-8 md:mt-24 space-y-4"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              }}
            >
                {/* LEFT FADE */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#EAF4F3] to-transparent z-10" />

                {/* RIGHT FADE */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#EAF4F3] to-transparent z-10" />

              {/* ROW 1: Slides Left */}
              <div className="relative flex overflow-hidden">
                <div className="flex animate-infinite-scroll w-max gap-4 whitespace-nowrap">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      {[icon1, icon2, icon3, icon4, icon5, icon6].map((icon, idx) => (
                        <Image key={idx} src={icon} alt="icon" className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* ROW 2: Slides Right (Reverse) */}
              <div className="relative flex overflow-hidden">
                <div className="flex animate-infinite-scroll-reverse w-max gap-4 whitespace-nowrap">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      {[icon6, icon5, icon4, icon3, icon2, icon1].map((icon, idx) => (
                        <Image key={idx} src={icon} alt="icon" className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
            </div>

            {/* Description */}
            <p className="mt-6 text-sm text-[#656769] leading-relaxed max-w-sm">
              Stop manual data entry. Our AI automatically scans your tender documents to identify deliverables, mandatory timelines, and team requirements in seconds—so you can focus on strategy.
            </p>
          </div>

        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {bottomCards.map((card) => (
            <article key={card.title} className="rounded-3xl bg-[#58A19A]/15 p-4 md:p-5 lg:p-7">
              <div className="bg-white w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center">
                <span className="bg-[#1A1615] w-4 md:w-5 h-4 md:h-5"></span>
              </div>
              <h5 className="mt-3 text-base font-semibold text-[#1A1615]">
                {card.title}
              </h5>
              <p className="mt-6 text-sm leading-5 text-[#656769]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
