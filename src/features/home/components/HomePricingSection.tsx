"use client"
import Link from "next/link";
import { useState } from "react";

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

const plans: readonly Plan[] = [
  {
    name: "Dreelo Basic",
    tier: "Free",
    price: "",
    description: "For solo users with light needs.",
    features: ["Unlimited projects", "Unlimited clients", "Time tracking", "CRM", "1/5 AI bid help"],
    cta: "Try FreeNow",
    href: "/signup",
  },
  {
    name: "Dreelo Premium",
    tier: "Dreelio Premium",
    price: "$189/mo",
    description: "For pro solo and agile teams.",
    features: [
      "Everything in Basic",
      "Unlimited payments",
      "Expense tracking",
      "Income tracking",
      "Shared client view",
    ],
    cta: "Get started",
    href: "/signup",
    highlighted: true,
    badge: "Save 25%",
  },
  {
    name: "Dreelo Enterprise",
    tier: "Flexible",
    price: "",
    description: "For teams scaling high-value bids.",
    features: [
      "Everything in Premium",
      "Custom role layouts",
      "Advanced automation",
      "Budget integrations",
      "Forecasting",
    ],
    cta: "Contact sales",
    href: "/login",
  },
];

const companies = ["Amsterdam", "SAVANNAH", "MILANO", "Luminous", "Vector"] as const;
const filters = ["Annually", "Monthly"] as const;
export default function HomePricingSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Annually");
  return (
    <section className="layout-shell-x py-14 lg:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-base font-semibold text-[#656769]">
            Built for Proposal Professionals.
          </p>
          <h3 className="mx-auto mt-2 max-w-xl text-2xl font-semibold leading-snug text-[#1A1615]">
            Empowering your team with the tools needed to win complex government
            tenders.
          </h3>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-12 items-end">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-3xl p-5 relative flex flex-col justify-between ${
                plan.highlighted
                  ? "border-4 border-[#58A19A] bg-gradient-to-b from-[#50AED4]/30 to-[#58A19A]/15"
                  : "bg-white"
              }`}
            >
              {plan.highlighted ? (
                  <div className="mb-2 flex items-center justify-center gap-2 rounded-full bg-white p-1">
                    {filters.map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setActiveFilter(label)}
                        className={`rounded-full px-4 md:px-6 lg:px-9 py-2.5 text-sm font-semibold transition ${
                          activeFilter === label
                            ? "bg-[#58A19A]/15 text-[#1A1615]"
                            : "bg-white text-[#1A1615]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#453F3D]">{plan.name}</p>
                )}
              <div className="mt-2 flex items-center gap-2">
                <h4   className={`
                  font-semibold
                  ${plan.highlighted 
                    ? "text-sm text-[#453F3D]" 
                    : "text-2xl lg:text-3xl text-[#1A1615]"}
                `}>
                  {plan.tier}
                </h4>
                {plan.badge && (
                  <span className="rounded-full bg-[#EAF3ED] px-5 py-1 text-[10px] font-semibold text-[#00A82D] border border-[#00A82D]">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-2xl lg:text-3xl font-semibold text-[#1A1615]">
                {plan.price}
              </p>
              <p className="mt-4 lg:mt-6 text-sm text-[#453F3D]">
                {plan.description}
              </p>

              <ul className="mt-4 space-y-3 lg:space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-[#453F3D] flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12.75L9.75 16.5L18.75 7.5" stroke="#1A1615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                     {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-5 md:mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-3 lg:py-3.5 text-sm tracking-[0.5px] font-[550] transition-colors ${
                  plan.highlighted
                    ? "bg-[#58A19A] text-white hover:bg-primary-dark"
                    : "bg-[#58A19A]/15 text-[#1A1615]"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>

        <div className="pt-16 pb-10 md:pt-24 md:pb-14 text-center">
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
        </div>
      </div>
    </section>
  );
}
