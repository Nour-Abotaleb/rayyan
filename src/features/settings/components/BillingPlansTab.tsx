"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DownloadIcon from "@/icons/DownloadIcon";
import FormatWithCurrency from "@/components/FormatWithCurrency";

type Status = "Paid" | "Pending" | "Failed";

const MOCK_INVOICES = [
  { id: "#INV-2026-001", date: "20 Nov 2026", plan: "Pro Plan", amount: 49.00, period: "2 hours ago", status: "Paid" as Status },
  { id: "#INV-2026-001", date: "20 Nov 2026", plan: "Pro Plan", amount: 49.00, period: "2 hours ago", status: "Pending" as Status },
  { id: "#INV-2026-001", date: "20 Nov 2026", plan: "Pro Plan", amount: 49.00, period: "2 hours ago", status: "Failed" as Status },
  { id: "#INV-2026-001", date: "20 Nov 2026", plan: "Pro Plan", amount: 49.00, period: "2 hours ago", status: "Paid" as Status },
];

const TOTAL = 240;
const PER_PAGE = 4;

function FilterIcon() {
  return (
    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.08333 7V5.83333H6.41667V7H4.08333ZM1.75 4.08333V2.91667H8.75V4.08333H1.75ZM0 1.16667V0H10.5V1.16667H0Z" fill="#21665F"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M6 12.75L9.75 16.5L18.75 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d={dir === "left" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

const STATUS_STYLES: Record<Status, string> = {
  Paid: "bg-[#15803D]/10 text-[#006259] dark:bg-[#2E7D32]/20 dark:text-[#81c784]",
  Pending: "bg-[#FFF8E1] text-[#F57F17] dark:bg-[#F57F17]/20 dark:text-[#ffcc02]",
  Failed: "bg-[#FFEBEE] text-[#C62828] dark:bg-[#C62828]/20 dark:text-[#ef9a9a]",
};

const STATUS_DOT: Record<Status, string> = {
  Paid: "bg-[#006259] dark:bg-[#81c784]",
  Pending: "bg-[#F57F17] dark:bg-[#ffcc02]",
  Failed: "bg-[#C62828] dark:bg-[#ef9a9a]",
};

export default function BillingPlansTab() {
  const { t } = useLanguage();
  const s = t.dashboard.settings.billingPlans;
  const initialActive = s.plans.findIndex((p) => p.active);
  const [activePlan, setActivePlan] = useState(initialActive >= 0 ? initialActive : 0);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(TOTAL / PER_PAGE);

  const cardBg = "rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15";

  return (
    <div className={`${cardBg} flex flex-col gap-6`}>
      {/* Plan cards */}
      <div className="flex flex-wrap items-end gap-4">
        {s.plans.map((plan, idx) => {
          const isActive = activePlan === idx;
          return (
            <article
              key={plan.name}
              onClick={() => setActivePlan(idx)}
              className={`w-full md:max-w-xs flex flex-col justify-between rounded-3xl border cursor-pointer transition-all ${
                isActive
                  ? "px-5 pt-6 pb-5 min-h-[440px] border-[#58A19A] bg-gradient-to-b from-[#50AED4]/30 to-[#58A19A]/15 dark:border-[#519A91] dark:from-[#50AED4]/15 dark:to-[#519A91]/12"
                  : "p-5 min-h-[440px] border-transparent bg-white hover:border-[#58A19A]/30 dark:bg-[#141414]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-[#453F3D] dark:text-[#9CA3AF]">{plan.name}</p>
                  {"renewalDate" in plan && plan.renewalDate && (
                    <span className="rounded-full border border-[#00A82D] bg-[#EAF3ED] px-3 py-1 text-[10px] font-semibold text-[#00A82D] dark:border-[#22c55e]/50 dark:bg-[#00A82D]/15 dark:text-[#4ade80]">
                      {plan.renewalDate}
                    </span>
                  )}
                </div>
                {plan.tier && (
                  <p className={`mt-2 font-semibold ${plan.price ? "text-2xl text-[#1A1615] dark:text-white" : "text-3xl text-[#1A1615] dark:text-white"}`}>
                    {plan.tier}
                  </p>
                )}
                {plan.price && (
                  <p className="mt-0.5 text-2xl font-semibold text-[#1A1615] dark:text-white">
                    <FormatWithCurrency amount={plan.price} iconSize={28} />
                  </p>
                )}
                <p className="mt-3 text-sm text-[#453F3D] dark:text-[#9CA3AF]">{plan.description}</p>
                <ul className="mt-4 space-y-4.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#453F3D] dark:text-[#9CA3AF]">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActivePlan(idx); }}
                className={`mt-12 w-full rounded-full px-4 py-3 text-sm font-[550] tracking-[0.5px] transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#58A19A] text-white hover:opacity-90 dark:bg-[#519A91]"
                    : "bg-[#58A19A]/15 text-[#1A1615] hover:bg-[#58A19A]/25 dark:bg-[#519A91]/20 dark:text-white dark:hover:bg-[#519A91]/30"
                }`}
              >
                {plan.cta}
              </button>
            </article>
          );
        })}
      </div>

      {/* Billing History */}
      <div className="rounded-2xl bg-white p-4 dark:bg-white/5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-black dark:text-white">{s.billingHistory}</h3>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-[#EEEEEE] px-4 py-2 text-[13px] font-medium text-[#21665F] transition-colors hover:bg-primary/5 cursor-pointer dark:bg-white/5"
          >
            <FilterIcon />
            {s.filter}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8F8F8] dark:bg-white/5">
                {[s.colInvoiceId, s.colIssueDate, s.colPlan, s.colAmount, s.colBillingPeriod, s.colStatus, s.colActions].map((col) => (
                  <th key={col} className="px-3 py-3 text-[13.5px] font-semibold tracking-wider text-[#586064] dark:text-white/90 uppercase first:rounded-s-lg last:rounded-e-lg last:text-center">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_INVOICES.map((inv, i) => (
                <tr key={i}>
                  <td className="py-4 pe-4 text-sm text-black dark:text-white/80">{inv.id}</td>
                  <td className="py-4 pe-4 text-sm text-black dark:text-white/80">{inv.date}</td>
                  <td className="py-4 pe-4 text-sm text-black dark:text-white/80">{inv.plan}</td>
                  <td className="py-4 pe-4 text-sm text-black dark:text-white/80"><FormatWithCurrency amount={inv.amount.toFixed(2)} /></td>
                  <td className="py-4 pe-4 text-sm text-[#808080] dark:text-white/80">{inv.period}</td>
                  <td className="py-4 pe-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[inv.status]}`}>
                      <span className={`size-1.5 rounded-full ${STATUS_DOT[inv.status]}`} />
                      {s[`status${inv.status}` as "statusPaid" | "statusPending" | "statusFailed"]}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <button type="button" className="transition-colors text-primary dark:text-white cursor-pointer">
                      <DownloadIcon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[13px] text-[#3F4947] dark:text-gray-400">
            {s.showing} {(page - 1) * PER_PAGE + 1} {s.to} {Math.min(page * PER_PAGE, TOTAL)} {s.of} {TOTAL} {s.results}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex size-8 items-center justify-center rounded-[12px] border border-[#BFC9C6] dark:border-white/80 text-[#1A1C1C] dark:text-white/90 transition-colors hover:border-primary hover:text-primary disabled:opacity-40 cursor-pointer dark:border-white/10 dark:hover:border-white dark:hover:text-white"
            >
              <ChevronIcon dir="left" />
            </button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex size-8 items-center justify-center rounded-[12px] text-xs font-medium transition-colors cursor-pointer ${
                  page === p
                    ? "bg-primary text-white dark:text-black"
                    : "border border-[#BFC9C6] dark:border-white/60 text-[#1A1C1C] dark:text-white/70 text-[#1A1C1C] hover:border-primary dark:hover:border-white dark:hover:text-white hover:text-primary"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex size-8 items-center justify-center rounded-[12px] border border-[#BFC9C6] dark:border-white/80 text-[#1A1C1C] dark:text-white/90 transition-colors hover:border-primary dark:hover:border-white dark:hover:text-white hover:text-primary disabled:opacity-40 cursor-pointer dark:border-white/10"
            >
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
