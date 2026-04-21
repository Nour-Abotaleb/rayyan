"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Plan = {
  name: string;
  tier: string;
  price: string;
  description: string;
  features: readonly string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
};

const PLAN_UI = [
  { href: "/signup" as const },
  { href: "/signup" as const, highlighted: true as const },
  { href: "/login" as const },
] as const;

const companies = ["Amsterdam", "SAVANNAH", "MILANO", "Luminous", "Vector"] as const;

type BillingCycle = "annual" | "monthly";

export default function HomePricingSection() {
  const { t } = useLanguage();

  const plans = useMemo((): readonly Plan[] => {
    return t.home.pricing.plans.map((plan, index) => {
      const ui = PLAN_UI[index];
      const badge = "badge" in plan ? plan.badge : undefined;
      return {
        ...plan,
        ...ui,
        ...(badge !== undefined ? { badge } : {}),
      };
    });
  }, [t]);

  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");
  const pricingTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = pricingTrackRef.current;
    if (!track) return;

    const centerTrackOnMobile = () => {
      if (window.innerWidth >= 768) return;
      const centeredScrollLeft = (track.scrollWidth - track.clientWidth) / 2;
      track.scrollTo({ left: Math.max(0, centeredScrollLeft), behavior: "auto" });
    };

    centerTrackOnMobile();
    window.addEventListener("resize", centerTrackOnMobile);
    return () => window.removeEventListener("resize", centerTrackOnMobile);
  }, []);

  return (
    <section className="layout-shell-x py-10 lg:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold text-[#656769] md:text-base dark:text-[#9CA3AF]">
            {t.home.marketing.eyebrow}
          </p>
          <h3 className="mx-auto mt-2 max-w-xl text-base font-semibold leading-snug text-[#1A1615] sm:text-lg md:text-2xl dark:text-white">
            {t.home.marketing.governmentTendersTitle}
          </h3>
        </div>

        <div
          ref={pricingTrackRef}
          className="mt-8 max-w-full overflow-x-auto scroll-smooth px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:px-0 lg:mt-12"
        >
          <div className="flex items-end gap-2.5 snap-x snap-proximity md:grid md:grid-cols-3 md:gap-5">
            {plans.map((plan) => (
              <div key={plan.name} className="min-w-0 flex-[0_0_74%] snap-center md:flex-none">
                <article
                  className={`relative flex h-full flex-col justify-between rounded-3xl p-5 ${
                    plan.highlighted
                      ? "border-4 border-[#58A19A] bg-gradient-to-b from-[#50AED4]/30 to-[#58A19A]/15 dark:border-[#519A91] dark:from-[#50AED4]/15 dark:to-[#519A91]/12"
                      : "border border-transparent bg-white dark:border-white/10 dark:bg-[#141414]"
                  }`}
                >
              {plan.highlighted ? (
                  <div className="mb-2 flex items-center justify-center gap-2 rounded-full bg-white p-1 dark:border dark:border-white/10 dark:bg-[#141414]">
                    {(
                      [
                        { key: "annual" as const, label: t.home.pricing.filterAnnually },
                        { key: "monthly" as const, label: t.home.pricing.filterMonthly },
                      ] as const
                    ).map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setBillingCycle(key)}
                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition md:px-6 lg:px-9 ${
                          billingCycle === key
                            ? "bg-[#58A19A]/15 text-[#1A1615] dark:bg-[#519A91]/25 dark:text-white"
                            : "bg-white text-[#1A1615] dark:bg-white/8 dark:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#453F3D] dark:text-[#9CA3AF]">{plan.name}</p>
                )}
              <div className="mt-2 flex items-center gap-2">
                <h4
                  className={`
                  font-semibold
                  ${plan.highlighted
                    ? "text-sm text-[#453F3D] dark:text-zinc-200"
                    : "text-2xl text-[#1A1615] lg:text-3xl dark:text-white"}
                `}
                >
                  {plan.tier}
                </h4>
                {plan.badge && (
                  <span className="text-nowrap rounded-full border border-[#00A82D] bg-[#EAF3ED] px-5 py-1 text-[10px] font-semibold text-[#00A82D] dark:border-[#22c55e]/50 dark:bg-[#00A82D]/15 dark:text-[#4ade80]">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-nowrap text-2xl font-semibold text-[#1A1615] lg:text-3xl dark:text-white">
                {plan.price}
              </p>
              <p className="mt-4 text-sm text-[#453F3D] lg:mt-6 dark:text-[#9CA3AF]">
                {plan.description}
              </p>

              <ul className="mt-4 space-y-3 lg:space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[#453F3D] dark:text-[#9CA3AF]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-[#1A1615] dark:text-zinc-200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12.75L9.75 16.5L18.75 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-[550] tracking-[0.5px] transition-colors md:mt-7 lg:py-3.5 ${
                  plan.highlighted
                    ? "bg-[#58A19A] text-white hover:bg-primary-dark dark:bg-[#519A91] dark:hover:bg-primary-dark"
                    : "bg-[#58A19A]/15 text-[#1A1615] dark:bg-[#519A91]/20 dark:text-white dark:hover:bg-[#519A91]/30"
                }`}
              >
                {plan.cta}
              </Link>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-16 pb-10 md:pt-24 md:pb-14 text-center">
        <p className="text-lg font-semibold text-[#656769] dark:text-[#9CA3AF]">
          {t.home.marketing.trustedBy}
        </p>
        {/* --- INFINITE SLIDER START --- */}
        <div className="relative mt-8 w-full overflow-hidden">
          {/* Gradients to fade edges (Optional but looks professional) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F9F9F9] to-transparent dark:from-[#161616]"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F9F9F9] to-transparent dark:from-[#161616]"></div>

          <div className="flex w-max animate-infinite-scroll items-center gap-10">
            {/* Render list twice for seamless looping */}
            {[...companies, ...companies].map((company, idx) => (
              <span
                key={`${company}-${idx}`}
                className="text-sm font-semibold text-[#6A6C6A] md:text-lg dark:text-[#9CA3AF]"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
