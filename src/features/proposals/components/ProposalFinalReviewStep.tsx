"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { SectionsStepData } from "@/features/proposals/components/ProposalSectionsStep";

const PRICE_PHASES = [
  {
    phase: "Discovery Phase",
    items: [
      {
        num: "1-1",
        name: "Discovery Workshops",
        desc: "For each phase, add a short description. Keep it brief and add the most important key points.",
        price: 2500,
      },
    ],
  },
  {
    phase: "Design Phase",
    items: [
      {
        num: "2-1",
        name: "Design System",
        desc: "Includes a modular, scalable, and custom design system that will be used for the visual design of all of your company products.",
        price: 5000,
      },
      {
        num: "2-1",
        name: "Dashboard Design",
        desc: "Includes the cleanup, user flows, journeys, information architecture, user interface and experience for the mobile application",
        price: 17500,
      },
    ],
  },
];

const TOTAL = PRICE_PHASES.flatMap((p) => p.items).reduce((s, i) => s + i.price, 0);

export default function ProposalFinalReviewStep({
  sectionsData,
  onBack,
  onSubmit,
  loading = false,
}: {
  sectionsData: SectionsStepData | null;
  onBack: () => void;
  onSubmit: () => void;
  loading?: boolean;
}) {
  const { t } = useLanguage();
  const actions = t.dashboard.newProposal.actions;

  return (
    <main className="flex flex-col gap-6 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">

      {/* Proposal document preview */}
      <div className="flex flex-col gap-6 px-8 md:px-12">

        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">
            (Deliverable-Based) Proposal
          </h1>
          <p className="text-sm md:text-base text-black">As requested by [name], [role]</p>
          <p className="mt-1 text-[13px] leading-relaxed text-black/90 dark:text-white/50">
            It was great speaking with you about [project title]. Here you should add the things you spoke in the first call — scope, needs, key points, user or business needs and goals. They have to know that they had been heard, understood and also you're the best option for their project. Keep it brief.
          </p>
          <p className="text-[13px] leading-relaxed text-black/90 dark:text-white/50">
            Below, you&apos;ll find the timeline and the price to complete your project.
          </p>
        </div>

        {/* Project Timeline */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base md:text-lg font-semibold text-black dark:text-white">Project Timeline</h2>

          <hr className="border-black/10 dark:border-white/10" />

          {!sectionsData?.ganttCards.length ? (
            <p className="text-sm text-black/40 dark:text-white/30">No timeline milestones added.</p>
          ) : (() => {
            const cards = sectionsData.ganttCards;
            const n = cards.length;

            function daysBetween(from: string, to: string) {
              const diff = new Date(to + "T00:00:00").getTime() - new Date(from + "T00:00:00").getTime();
              return Math.max(1, Math.round(diff / 86400000));
            }

            function fmtDate(d: string) {
              return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
            }

            return (
              <div className="flex flex-col gap-1">
                {/* Date markers */}
                <div className="relative h-5 w-full">
                  {cards.map((card, i) => (
                    <span
                      key={i}
                      className="absolute top-0 text-xs font-medium text-[#808080]"
                      style={{ left: `${(i / n) * 100}%` }}
                    >
                      {fmtDate(card.from)}
                    </span>
                  ))}
                </div>

                {/* Timeline bar */}
                <div className="flex h-14 w-full gap-1.5">
                  {cards.map((card, i) => (
                    <div
                      key={i}
                      className="flex flex-1 flex-col justify-center gap-0.5 overflow-hidden px-2 bg-white"
                    >
                      <span className="truncate text-xs font-semibold text-black">{card.title}</span>
                      <span className="truncate text-xs text-[#808080]">{daysBetween(card.from, card.to)} days</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Milestone count — below the bar, right-aligned */}
          {!!sectionsData?.ganttCards.length && (
            <div className="flex justify-end border-t border-black/10 pt-3 dark:border-white/10">
              <div className="text-end">
                <p className="text-base md:text-lg font-bold text-black dark:text-white">
                  {sectionsData.ganttCards.length} {sectionsData.ganttCards.length === 1 ? "Milestone" : "Milestones"}
                </p>
                <p className="text-xs text-[#808080]">Timeline</p>
              </div>
            </div>
          )}
        </div>

        {/* Project Price */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base md:text-lg font-semibold text-black dark:text-white">Project Price</h2>

          <hr className="border-black/10 dark:border-white/10" />

          <div className="flex flex-col gap-3">
            {PRICE_PHASES.map((ph, i) => (
              <div key={ph.phase} className={`flex flex-col gap-6 ${i < PRICE_PHASES.length - 1 ? "border-b border-black/10 pb-3 dark:border-white/10" : ""}`}>
                {ph.items.map((item) => (
                  <div key={item.num + item.name} className="flex items-start gap-3">
                    {/* Phase label — only show on first item */}
                    <div className="w-28 shrink-0 pt-0.5 min-w-[150px]">
                      {ph.items.indexOf(item) === 0 && (
                        <span className="text-[15px] font-medium text-black dark:text-white text-nowrap">{ph.phase}</span>
                      )}
                    </div>
                    {/* Item */}
                    <div className="flex min-w-0 flex-1 items-start gap-2">
                      <span className="mt-0.5 shrink-0 text-xs text-black">{item.num}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-black dark:text-white">{item.name}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#808080]">{item.desc}</p>
                      </div>
                    </div>
                    {/* Price */}
                    <span className="shrink-0 text-sm font-semibold text-black dark:text-white">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-end border-t border-black/10 pt-3 dark:border-white/10">
            <div className="text-end">
              <p className="text-lg md:text-xl font-bold text-black dark:text-white">
                ${TOTAL.toLocaleString()}
              </p>
              <p className="text-xs text-[#808080]">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white bg-white/50 px-4 py-2.5 text-sm font-normal text-black hover:opacity-80 transition-opacity cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {actions.previousUpload}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-normal text-white hover:opacity-90 transition-opacity cursor-pointer dark:text-black disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
          )}
          {actions.createProposal}
        </button>
      </div>
    </main>
  );
}