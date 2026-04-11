"use client";

import { useState } from "react";
import Image from "next/image";
import cardBg from "@src/assets/dashboard/card-bg.png";
import leftPanelBg from "@src/assets/dashboard/left-panel-bg.png";
import leftPanelBgMobile from "@src/assets/dashboard/left-panel-bg-mobile.png";
import card1 from "@src/assets/dashboard/card-1.svg";
import card2 from "@src/assets/dashboard/card-2.svg";
import CreateProposalModal from "./CreateProposalModal";

interface CardItem {
  title: string;
  description: string;
  illustration: typeof card1;
}

const cards: CardItem[] = [
  {
    title: "Create Your\nNew Proposal",
    description: "Add details, let RAYAN do the rest",
    illustration: card1,
  },
  {
    title: "Create Your\nCompany Profile",
    description: "Just add your details and let the system do the rest.",
    illustration: card2,
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
        <Image
          src={cardBg}
          alt=""
          fill
          className="object-fill"
          priority
        />

        <div className="absolute inset-0 p-5">
          <div className="w-[55%]">
            <h3 className="whitespace-pre-line text-xl md:text-2xl font-semibold leading-snug text-white">
              {card.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#CCCCCC]">
              {card.description}
            </p>
          </div>

          <div className="absolute bottom-0 right-0 h-4/5 w-[45%]">
            <Image
              src={card.illustration}
              alt=""
              fill
              className="object-contain object-bottom-right"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCreateClick}
        className="relative z-20 -mt-10.5 flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-normal text-white transition-colors hover:bg-primary-dark"
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
      {/* Mobile — one leftPanelBg per card, horizontal snap scroll */}
      <aside className="relative z-10 m-3 w-full shrink-0 lg:hidden">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Promotional cards"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative flex min-h-0 shrink-0 snap-center flex-col overflow-hidden rounded-2xl flex-[0_0_88%] sm:flex-[0_0_90%]"
            >
              <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl">
                <Image
                  src={leftPanelBgMobile}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(max-width:640px) 88vw, 90vw"
                  priority={i === 0}
                />
              </div>
              <div className="relative z-10 flex flex-col gap-5 px-4 py-6">
                <CardBlock card={card} onCreateClick={openModal} />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Desktop — single panel background, stacked cards */}
      <aside className="relative z-10 m-3 hidden w-94 shrink-0 flex-col justify-start overflow-hidden rounded-2xl px-4 py-6 lg:flex lg:sticky lg:top-[4.5rem] lg:self-start lg:h-[calc(100dvh-4.5rem-1.5rem)]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
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
