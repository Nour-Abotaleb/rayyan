"use client";

import { useState, type ComponentType } from "react";
import Image from "next/image";
import cardBg from "@src/assets/dashboard/card-bg.png";
import leftPanelBg from "@src/assets/dashboard/left-panel-bg.png";
import leftPanelBgMobile from "@src/assets/dashboard/left-panel-bg-mobile.png";
import Card1Illustration from "./Card1Illustration";
import Card2Illustration from "./Card2Illustration";
import CreateProposalModal from "./CreateProposalModal";

interface CardItem {
  title: string;
  description: string;
  Illustration: ComponentType<{ className?: string }>;
}

const cards: CardItem[] = [
  {
    title: "Create Your\nNew Proposal",
    description: "Add details, let RAYAN do the rest",
    Illustration: Card1Illustration,
  },
  {
    title: "Create Your\nCompany Profile",
    description: "Just add your details and let the system do the rest.",
    Illustration: Card2Illustration,
  },
];

function CardBlock({
  card,
  onCreateClick,
}: {
  card: CardItem;
  onCreateClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative z-0 h-52 w-full overflow-hidden rounded-2xl">
        <Image src={cardBg} alt="" fill className="object-fill" priority />

        <div className="absolute inset-0 p-5">
          <div className="">
            <h3 className="w-[65%] whitespace-pre-line text-xl md:text-2xl font-semibold leading-snug text-white">
              {card.title}
            </h3>
            <p className="w-[55%] mt-2 text-xs leading-relaxed text-[#CCCCCC]">
              {card.description}
            </p>
          </div>

          <div className="absolute -bottom-1 right-0 h-full w-[45%]">
            <card.Illustration className="h-full w-full" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCreateClick}
        className="relative z-20 -mt-10.5 flex w-fit items-center gap-1.5 rounded-full bg-primary dark:bg-[#519A91] px-1.5 md:px-4 py-1.5 md:py-2 text-sm font-normal text-white dark:text-black transition-colors hover:bg-primary-dark cursor-pointer"
      >
        <span className="text-base leading-none">+</span>
        Create Proposal
      </button>
    </div>
  );
}

export default function LeftPanel() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      {/* Mobile — horizontal snap; bleed matches layout-shell-x (px-3 mobile, was -mx-6 vs px-3 → page scroll) */}
      <aside className="relative z-10 my-3 min-w-0 shrink-0 max-sm:-mx-3 max-sm:w-[calc(100%+1.5rem)] sm:mx-0 sm:w-full lg:hidden">
        <div
          className="flex w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Promotional cards"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative flex min-h-0 w-[93%] max-w-[93%] flex-none shrink-0 snap-center flex-col overflow-hidden rounded-2xl sm:w-[62%] sm:max-w-[62%] md:w-[52%] md:max-w-[52%]"
            >
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <Image
                  src={leftPanelBgMobile}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 92vw, 93vw"
                  priority={i === 0}
                />
              </div>
              <div className="relative z-10 flex flex-col gap-5 px-2 lg:px-4 py-2 md:py-4 lg:py-6">
                <CardBlock card={card} onCreateClick={openModal} />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Desktop — fixed column beside scrolling main (scroll container is DashboardPage main) */}
      <aside className="scrollbar-hide relative z-10 my-3 hidden min-w-98 shrink-0 flex-col justify-start overflow-hidden rounded-2xl px-4 py-6 lg:my-0 lg:mt-4 lg:flex lg:h-[84vh] lg:min-h-0 lg:self-start lg:overflow-y-auto">
        <div className="pointer-events-none min-w-98 absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <Image
            src={leftPanelBg}
            alt=""
            fill
            className="object-cover object-center"
            sizes="384px"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col gap-5">
          {cards.map((card, i) => (
            <CardBlock key={i} card={card} onCreateClick={openModal} />
          ))}
        </div>
      </aside>

      {modalOpen && <CreateProposalModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
