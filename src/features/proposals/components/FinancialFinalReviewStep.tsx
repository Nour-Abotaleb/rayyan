"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const TIMELINE_PHASES = [
  { label: "Discovery Phase", sub: "3-4 days", flex: false, width: "12%", color: "#FFFFFF" },
  { label: "Design System", sub: "3-4 days", flex: false, width: "12%", color: "#FFFFFF" },
  { label: "Dashboard Design", sub: "15 weeks", flex: true, width: undefined, color: "#FFFFFF" },
  { label: "Handover", sub: "", flex: false, width: "110px", color: "#FFFFFF" },
];

const DATE_MARKERS: { label: string; left?: string; right?: string }[] = [
  { label: "13 . Feb", left: "0%" },
  { label: "16 . Feb", left: "12%" },
  { label: "20 . Feb", left: "24%" },
  { label: "5 . April", right: "110px" },
];

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

export default function FinancialFinalReviewStep({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const { t } = useLanguage();
  const fp = t.dashboard.financialProposal;
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
          <p className="text-sm md:text-base text-black dark:text-white/80">As requested by [name], [role]</p>
          <p className="mt-1 text-[13px] leading-relaxed text-black/90 dark:text-white/50">
            It was great speaking with you about [project title]. Here you should add the things you spoke in the first call — scope, needs, key points, user or business needs and goals. They have to know that they had been heard, understood and also you&apos;re the best option for their project. Keep it brief.
          </p>
          <p className="text-[13px] leading-relaxed text-black/90 dark:text-white/50">
            Below, you&apos;ll find the timeline and the price to complete your project.
          </p>
        </div>

        {/* Project Timeline */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base md:text-lg font-semibold text-black dark:text-white">Project Timeline</h2>

          <hr className="border-black/10 dark:border-white/10" />

          <div className="flex flex-col gap-1">
            {/* Date markers */}
            <div className="relative h-5 w-full">
              {DATE_MARKERS.map((m) => (
                <span
                  key={m.label}
                  className="absolute top-0 text-xs font-medium text-[#808080]"
                  style={{ left: m.left, right: m.right }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Timeline bar */}
            <div className="flex h-14 w-full gap-1.5">
              {TIMELINE_PHASES.map((ph) => (
                <div
                  key={ph.label}
                  className="flex flex-col justify-center gap-0.5 overflow-hidden px-2"
                  style={{
                    flex: ph.flex ? 1 : undefined,
                    width: ph.flex ? undefined : ph.width,
                    flexShrink: 0,
                    background: ph.color,
                  }}
                >
                  <span className="truncate text-xs font-semibold text-black dark:text-white">
                    {ph.label}
                  </span>
                  {ph.sub && (
                    <span className="truncate text-xs text-[#808080]">{ph.sub}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="flex justify-end border-t border-black/10 pt-3 dark:border-white/10">
            <div className="text-end">
              <p className="text-base md:text-lg font-bold text-black dark:text-white">12 Weeks</p>
              <p className="text-xs text-[#808080]">Timeline</p>
            </div>
          </div>
        </div>

        {/* Project Price */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base md:text-lg font-semibold text-black dark:text-white">Project Price</h2>

          <hr className="border-black/10 dark:border-white/10" />

          <div className="flex flex-col gap-3">
            {PRICE_PHASES.map((ph, i) => (
              <div
                key={ph.phase}
                className={`flex flex-col gap-6 ${i < PRICE_PHASES.length - 1 ? "border-b border-black/10 pb-3 dark:border-white/10" : ""}`}
              >
                {ph.items.map((item) => (
                  <div key={item.num + item.name} className="flex items-start gap-3">
                    <div className="w-28 shrink-0 pt-0.5 min-w-[150px]">
                      {ph.items.indexOf(item) === 0 && (
                        <span className="text-[15px] font-medium text-black dark:text-white text-nowrap">{ph.phase}</span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 items-start gap-2">
                      <span className="mt-0.5 shrink-0 text-xs text-black dark:text-white/60">{item.num}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-black dark:text-white">{item.name}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#808080]">{item.desc}</p>
                      </div>
                    </div>
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
          {fp.actions.prevPaymentTerms}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-normal text-white hover:opacity-90 transition-opacity cursor-pointer dark:text-black"
        >
          {actions.createProposal}
        </button>
      </div>
    </main>
  );
}