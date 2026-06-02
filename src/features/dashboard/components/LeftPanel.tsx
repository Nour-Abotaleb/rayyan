"use client";

import { useState, type ComponentType } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import cardBg from "@src/assets/dashboard/card-bg.svg";
// import leftPanelBg from "@src/assets/dashboard/left-panel-bg.png";
// import leftPanelBgMobile from "@src/assets/dashboard/left-panel-bg-mobile.png";
import Card1Illustration from "./Card1Illustration";
import Card2Illustration from "./Card2Illustration";
import CreateProposalModal from "./CreateProposalModal";

interface CardItem {
  title: string;
  description: string;
  Illustration: ComponentType<{ className?: string }>;
  bg: string;
  onCreateClick: () => void;
}

function CardBlock({
  card,
  createProposalLabel,
  isRtl,
}: {
  card: CardItem;
  createProposalLabel: string;
  isRtl: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative z-0 h-52 w-full overflow-hidden rounded-2xl">
        <Image src={card.bg} alt="" fill className="object-fill" priority />

        <div className="absolute inset-0 p-5">
          <div className="text-left" dir="ltr" style={{ textAlign: "left" }}>
            <h3 className="w-[65%] whitespace-pre-line text-xl md:text-2xl font-semibold text-primary uppercase">
              {card.title}
            </h3>
            <p className="w-[55%] mt-2 text-xs leading-relaxed text-black dark:text-white/80">
              {card.description}
            </p>
          </div>

          <div className="absolute -bottom-3 -right-1 h-full w-[58%] max-sm:w-[52%]">
            <card.Illustration className="h-full w-full" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={card.onCreateClick}
        className={`relative z-20 -mt-10.5 flex w-fit items-center gap-1.5 rounded-full bg-primary dark:bg-[#519A91] px-2.5 py-1.5 md:py-2 text-sm font-normal text-white dark:text-black transition-colors hover:bg-primary-dark cursor-pointer ${
          isRtl ? "self-end flex-row-reverse" : "self-start"
        }`}
      >
        <span className="text-base leading-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0527 13.7499V9.58325"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0827 11.6667H7.91602"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3327 9.16675V14.1667C18.3327 17.5001 17.4993 18.3334 14.166 18.3334H5.83268C2.49935 18.3334 1.66602 17.5001 1.66602 14.1667V5.83341C1.66602 2.50008 2.49935 1.66675 5.83268 1.66675H7.08268C8.33268 1.66675 8.60768 2.03341 9.08268 2.66675L10.3327 4.33341C10.6493 4.75008 10.8327 5.00008 11.666 5.00008H14.166C17.4993 5.00008 18.3327 5.83341 18.3327 9.16675Z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeMiterlimit="10"
            />
          </svg>
        </span>
        {createProposalLabel}
      </button>
    </div>
  );
}

export default function LeftPanel() {
  const { t, dir } = useLanguage();
  const isRtl = dir === "rtl";
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const cards: CardItem[] = [
    {
      title: t.dashboard.leftPanel.createNewProposalTitle,
      description: t.dashboard.leftPanel.createNewProposalDescription,
      Illustration: Card1Illustration,
      bg: cardBg,
      onCreateClick: () => router.push("/dashboard/proposals/create"),
    },
    {
      title: t.dashboard.leftPanel.createCompanyProfileTitle,
      description: t.dashboard.leftPanel.createCompanyProfileDescription,
      Illustration: Card2Illustration,
      bg: cardBg,
      onCreateClick: () => setModalOpen(true),
    },
  ];

  return (
    <>
      {/* Mobile — horizontal snap; bleed matches layout-shell-x (px-3 mobile, was -mx-6 vs px-3 → page scroll) */}
      <aside className="relative z-10 my-3 min-w-0 shrink-0 max-sm:-mx-3 max-sm:w-[calc(100%+1.5rem)] sm:mx-0 sm:w-full lg:hidden">
        <div
          className="flex w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label={t.dashboard.leftPanel.promotionalCardsRegion}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative flex min-h-0 w-[93%] max-w-[93%] flex-none shrink-0 snap-center flex-col overflow-hidden rounded-2xl bg-white sm:w-[62%] sm:max-w-[62%] md:w-[52%] md:max-w-[52%]"
            >
              {/* <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <Image
                  src={leftPanelBgMobile}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 92vw, 93vw"
                  priority={i === 0}
                />
              </div> */}
              <div className="relative z-10 flex flex-col gap-5 px-2 lg:px-4 py-2 md:py-4 lg:py-6">
                <CardBlock
                  card={card}
                  createProposalLabel={
                    t.dashboard.leftPanel.createProposalButton
                  }
                  isRtl={isRtl}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Desktop — fixed column beside scrolling main (scroll container is DashboardPage main) */}
      <aside className="scrollbar-hide relative z-10 my-3 hidden min-w-98 shrink-0 flex-col justify-start overflow-hidden rounded-2xl bg-white dark:bg-black px-4 py-6 lg:my-0 lg:mt-4 lg:flex lg:h-[84vh] lg:min-h-0 lg:self-start lg:overflow-y-auto">
        {/* <div className="pointer-events-none min-w-98 absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <Image
            src={leftPanelBg}
            alt=""
            fill
            className="object-cover object-center"
            sizes="384px"
            priority
          />
        </div> */}
        <div className="relative z-10 flex flex-col gap-5">
          {cards.map((card, i) => (
            <CardBlock
              key={i}
              card={card}
              createProposalLabel={t.dashboard.leftPanel.createProposalButton}
              isRtl={isRtl}
            />
          ))}
        </div>
      </aside>

      {modalOpen && <CreateProposalModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
