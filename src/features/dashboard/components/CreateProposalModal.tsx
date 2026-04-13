"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import popupHero from "@src/assets/dashboard/popup-hero.svg";
import popupIcons from "@src/assets/dashboard/popup-icons.svg";
import PopupBgTexture from "@/features/dashboard/components/PopupBgTexture";
import ChipIcon from "@/icons/ChipIcon";
import ArrowUpRightIcon from "@/icons/ArrowUpRightIcon";
import CloseIcon from "@/icons/CloseIcon";

interface ProposalType {
  title: string;
  description: string;
  tone: "primary" | "secondary" | "tertiary";
}

const proposalTypes: ProposalType[] = [
  {
    title: "Technical Proposal",
    description:
      "Formulating the artistic concept, scope of work, and implementation plan using artificial intelligence.",
    tone: "primary",
  },
  {
    title: "Visualization",
    description:
      "Visualize your data effortlessly and uncover insights that drive smarter decisions.",
    tone: "secondary",
  },
  {
    title: "Financial Proposal",
    description:
      "Create clear, structured financial proposals that align with your business goals.",
    tone: "tertiary",
  },
];

/** PopupBgTexture uses `currentColor` — white in light, #2A2A2A in dark */
const popupTextureTint = "text-white dark:text-[#2A2A2A]";

const toneStyles: Record<
  ProposalType["tone"],
  { arrowBg: string; chipBg: string; chipText: string }
> = {
  primary: {
    arrowBg: "bg-primary",
    chipBg: "bg-primary/10",
    chipText: "text-primary",
  },
  secondary: {
    arrowBg: "bg-secondary",
    chipBg: "bg-secondary/10",
    chipText: "text-secondary",
  },
  tertiary: {
    arrowBg: "bg-tertiary",
    chipBg: "bg-tertiary/10",
    chipText: "text-tertiary",
  },
};

interface CreateProposalModalProps {
  onClose: () => void;
}

export default function CreateProposalModal({
  onClose,
}: CreateProposalModalProps) {
  const router = useRouter();
  const fullHeroTextLine1 = "Transform Your Ideas into";
  const fullHeroTextLine2 = "Professional Proposals in Minutes";
  const [heroLine1, setHeroLine1] = useState("");
  const [heroLine2, setHeroLine2] = useState("");

  useEffect(() => {
    let i = 0;
    setHeroLine1("");
    setHeroLine2("");
    const totalLen = fullHeroTextLine1.length + fullHeroTextLine2.length;
    const id = window.setInterval(() => {
      i += 1;
      const l1Count = Math.min(i, fullHeroTextLine1.length);
      const l2Count = Math.max(0, i - fullHeroTextLine1.length);
      setHeroLine1(fullHeroTextLine1.slice(0, l1Count));
      setHeroLine2(fullHeroTextLine2.slice(0, l2Count));
      if (i >= totalLen) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, []);

  function handleSelect() {
    onClose();
    router.push("/dashboard/proposals/new");
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/50 dark:bg-[rgba(85,85,85,0.7)] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div className="relative isolate w-full max-w-[900px] max-h-[90vh] overflow-auto scrollbar-hide rounded-3xl bg-[var(--modal-surface)]">
        <div className="scrollbar-hide relative z-10 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-black dark:text-white tracking-wide">
                Proposal Type
              </h2>
              <p className="mt-1 text-sm md:text-base text-black/60 dark:text-white/60 tracking-wide font-extralight">
                Choose your proposal type to start your journey of excellence in
                a few simple steps.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-0 bg-white/50 p-0 text-zinc-400 touch-manipulation [-webkit-tap-highlight-color:transparent] dark:border dark:border-[#0D0D0D] dark:bg-[#0D0D0D]/50 hover:opacity-50 cursor-pointer"
              aria-label="Close"
            >
              <CloseIcon
                size={22}
                className="pointer-events-none text-[#737373]"
              />
            </button>
          </div>

          {/* Hero image */}
          <div className="relative mb-6 h-44 w-full overflow-hidden rounded-2xl">
            <Image
              src={popupHero}
              alt="Proposal hero"
              fill
              className="object-contain object-center"
              priority
            />
            <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6 text-center">
              <div className="text-base font-medium text-white md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                <p>{heroLine1}</p>
                <p>{heroLine2}</p>
              </div>
            </div>
            <Image
              src={popupIcons}
              alt=""
              aria-hidden
              fill
              className="z-20 object-contain object-center opacity-0 animate-[fadeIn_2.4s_ease-in_forwards]"
              priority
            />
          </div>

          {/* Proposal type cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {proposalTypes.map((type) => (
              <button
                key={type.title}
                onClick={handleSelect}
                aria-label={`Select ${type.title}`}
                className="group relative w-full overflow-visible rounded-2xl p-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
              >
                <div
                  className={`pointer-events-none absolute inset-0 -z-0 overflow-hidden rounded-2xl opacity-40 dark:opacity-35 ${popupTextureTint}`}
                >
                  <PopupBgTexture className="h-full w-full" />
                </div>

                {/* Arrow icon — outside card image (top right) */}
                <div
                  className={`pointer-events-none absolute right-0 md:-right-[3px] top-3 md:top-[1px] z-20 flex h-11 w-11 md:h-[52px] md:w-[52px] items-center justify-center rounded-full text-white cursor-pointer ${toneStyles[type.tone].arrowBg}`}
                  aria-hidden="true"
                >
                  <ArrowUpRightIcon size={20} />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  {/* Chip icon */}
                  <div
                    className={`flex h-12 w-12 md:h-13 md:w-13 items-center justify-center rounded-full ${toneStyles[type.tone].chipBg} ${toneStyles[type.tone].chipText}`}
                  >
                    <ChipIcon size={30} />
                  </div>

                  {/* Text */}
                  <div className="mt-2">
                    <h3 className="text-base font-semibold text-black dark:text-white/80 tracking-wide">
                      {type.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-paragraph dark:text-white/60 font-light">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
