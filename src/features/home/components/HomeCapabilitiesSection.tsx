"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import tool1Img from "@src/assets/dashboard/technical-section-img.png";
import tool2Img from "@src/assets/dashboard/technical-section-img-2.png";

interface CapabilityRowProps {
  eyebrow: string;
  title: string;
  description: string;
  tags: readonly string[];
  // image: typeof tool1Img;
  image: StaticImageData;
  imageFirst?: boolean;
}

function CapabilityRow({
  eyebrow,
  title,
  description,
  tags,
  image,
  imageFirst = false,
}: CapabilityRowProps) {
  const { t } = useLanguage();
  const imageBlock = (
    <div className="relative w-full md:h-full md:min-h-0">
      <Image
        src={image}
        alt={title}
        className="h-auto w-full rounded-xl object-cover ring-1 ring-transparent md:h-full md:min-h-[240px] md:w-full dark:ring-white/10"
      />
    </div>
  );

  const textBlock = (
    <div className="flex min-h-0 flex-col items-center justify-center md:h-full md:min-h-0 md:items-start md:justify-start">
      <div className="flex w-full flex-col items-center md:items-start md:shrink-0">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.04em] text-[#656769] md:text-base md:text-start dark:text-[#9CA3AF]">
          {eyebrow}
        </p>
        <h3 className="mt-1 max-w-md text-center text-xl font-semibold leading-snug text-[#1A1615] md:text-start md:text-2xl dark:text-white">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-center text-sm leading-6 text-[#656769] md:text-start dark:text-[#9CA3AF]">
          {description}
        </p>

        <div className="mt-6 mb-6 flex items-center justify-center gap-4 md:mb-0 md:justify-start md:shrink-0">
          <Link
            href="/dashboard/proposals/new"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark md:tracking-[1px] dark:bg-[#519A91] dark:hover:bg-primary-dark"
          >
            {t.home.capabilities.createFirstProposal}
          </Link>
          <button
            type="button"
            className="rounded-full border border-[#F0F0F0] bg-[#F0F0F0]/50 px-5 py-2 text-sm font-medium text-black transition-colors hover:text-primary md:tracking-[1px] dark:border-white/20 dark:bg-white/8 dark:text-white dark:hover:bg-white/15 dark:hover:text-primary-light"
          >
            {t.home.capabilities.watchDemo}
          </button>
        </div>
      </div>
    {/* Tags */}
      <div className="mt-6 grid max-w-md grid-cols-2 justify-items-stretch gap-2 md:mt-auto md:w-full md:shrink-0 md:gap-4 lg:gap-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center justify-center gap-1 lg:gap-3 text-nowrap rounded-full border border-[#E4E2E2] px-3 py-2 text-center text-xs lg:text-sm text-[#1A1615] dark:border-white/15 dark:bg-white/[0.06] dark:text-zinc-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-[#1A1615] dark:text-zinc-400 w-4 h-4 md:w-5 md:h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 6H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 18H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.75 6L5.25 7.5L8.25 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.75 12L5.25 13.5L8.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.75 18L5.25 19.5L8.25 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-stretch md:gap-6 lg:gap-18">
      {/* Mobile: always text → image; md+: `order` restores image-left / image-right */}
      <div
        className={`flex w-full max-w-md min-h-0 flex-col md:max-w-none md:h-full ${imageFirst ? "md:order-2" : "md:order-1"}`}
      >
        {textBlock}
      </div>
      <div
        className={`flex w-full max-w-md min-h-0 flex-col md:max-w-none md:h-full ${imageFirst ? "md:order-1" : "md:order-2"}`}
      >
        {imageBlock}
      </div>
    </div>
  );
}

export default function HomeCapabilitiesSection() {
  const { t } = useLanguage();
  const row1 = t.home.capabilities.technicalRow;
  const row2 = t.home.capabilities.outputsRow;

  return (
    <section className="layout-shell-x py-14 lg:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-14 md:max-w-5xl md:gap-18 md:items-stretch">
        <CapabilityRow
          imageFirst
          eyebrow={row1.eyebrow}
          title={row1.title}
          description={row1.description}
          tags={row1.tags}
          image={tool1Img}
        />

        <CapabilityRow
          eyebrow={row2.eyebrow}
          title={row2.title}
          description={row2.description}
          tags={row2.tags}
          image={tool2Img}
        />
      </div>
    </section>
  );
}
