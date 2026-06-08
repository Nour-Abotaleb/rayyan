"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { ProjectInfoStepData } from "@/features/proposals/components/FinancialProjectInfoStep";
import type { DeliverablesStepData } from "@/features/proposals/components/FinancialDeliverablesStep";
import type { PaymentTermsStepData } from "@/features/proposals/components/FinancialPaymentTermsStep";

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtCurrency(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base md:text-lg font-bold text-black dark:text-white">{children}</h2>
      <hr className="border-black/10 dark:border-white/10" />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-semibold text-black dark:text-white/40">{label}:</span>
      <span className="text-sm text-black dark:text-white">{value || "—"}</span>
    </div>
  );
}

export default function FinancialFinalReviewStep({
  projectInfo,
  deliverable,
  paymentTerms,
  onBack,
  onSubmit,
  loading = false,
}: {
  projectInfo: ProjectInfoStepData | null;
  deliverable: DeliverablesStepData | null;
  paymentTerms: PaymentTermsStepData[] | null;
  onBack: () => void;
  onSubmit: () => void;
  loading?: boolean;
}) {
  const { t } = useLanguage();
  const fp = t.dashboard.financialProposal;
  const actions = t.dashboard.newProposal.actions;

  const periodLabel = projectInfo
    ? [
        projectInfo.startDate ? fmtDate(projectInfo.startDate) : null,
        projectInfo.endDate ? fmtDate(projectInfo.endDate) : null,
      ]
        .filter(Boolean)
        .join(" – ") || "—"
    : "—";

  const subtotal = deliverable
    ? (deliverable.unitPrice * deliverable.quantity) +
      deliverable.salaryCosts +
      (deliverable.toolsCosts ?? 0) +
      (deliverable.otherExpenses ?? 0)
    : 0;
  const taxAmount = subtotal * ((projectInfo?.taxRate ?? 0) / 100);
  const total = subtotal + taxAmount;

  const totalPercentage = (paymentTerms ?? []).reduce((s, t) => s + t.percentage, 0);

  return (
    <main className="flex flex-col gap-6 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">

      {/* ── Project Identity Summary ───────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Project Identity Summary</SectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <Field label="Client Name"       value={projectInfo?.clientName ?? ""} />
          <Field label="Project Name"      value={projectInfo?.projectName ?? ""} />
          <Field label="Project Type"      value={projectInfo?.projectType ?? ""} />
          <Field label="BOQ Type"          value={projectInfo?.boqType ?? ""} />
          <Field label="Sector"            value={projectInfo?.sectorIndustry ?? ""} />
          <Field label="Language"          value={projectInfo?.language ?? ""} />
          <Field label="Tax Rate"          value={projectInfo?.taxRate ? `${projectInfo.taxRate}%` : "—"} />
          <Field label="Project Period"    value={periodLabel} />
        </div>
        {projectInfo?.terms && (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-black dark:text-white/40">Terms:</span>
            <span className="text-sm text-black dark:text-white">{projectInfo.terms}</span>
          </div>
        )}
      </div>

      {/* ── Deliverable ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Deliverable</SectionTitle>
        {!deliverable ? (
          <p className="text-sm text-black/40 dark:text-white/30">No deliverable added.</p>
        ) : (
          <div className="rounded-xl border border-[#E7E7E7] bg-[#f9f9f9] px-4 py-4 dark:border-white/10 dark:bg-white/5 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              <Field label="Service Catalog" value={deliverable.serviceCatalog} />
              <Field label="Name"            value={deliverable.name} />
              <Field label="Due Date"        value={fmtDate(deliverable.dueDate)} />
              <Field label="Quantity"        value={String(deliverable.quantity)} />
            </div>
            <hr className="border-black/10 dark:border-white/10" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Unit Price"      value={`$${fmtCurrency(deliverable.unitPrice)}`} />
              <Field label="Salary Costs"    value={`$${fmtCurrency(deliverable.salaryCosts)}`} />
              {deliverable.toolsCosts != null && (
                <Field label="Tools Costs"   value={`$${fmtCurrency(deliverable.toolsCosts)}`} />
              )}
              {deliverable.otherExpenses != null && (
                <Field label="Other Expenses" value={`$${fmtCurrency(deliverable.otherExpenses)}`} />
              )}
            </div>
            <div className="flex justify-end gap-6 border-t border-black/10 pt-3 dark:border-white/10">
              <div className="text-end">
                <p className="text-xs text-black/40 dark:text-white/35">Subtotal</p>
                <p className="text-sm font-semibold text-black dark:text-white">${fmtCurrency(subtotal)}</p>
              </div>
              <div className="text-end">
                <p className="text-xs text-black/40 dark:text-white/35">Tax ({projectInfo?.taxRate ?? 0}%)</p>
                <p className="text-sm font-semibold text-black dark:text-white">${fmtCurrency(taxAmount)}</p>
              </div>
              <div className="text-end">
                <p className="text-xs text-black/40 dark:text-white/35">Total</p>
                <p className="text-base font-bold text-primary">${fmtCurrency(total)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Payment Terms ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Payment Terms</SectionTitle>
        {!paymentTerms?.length ? (
          <p className="text-sm text-black/40 dark:text-white/30">No payment terms added.</p>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-black/8 dark:divide-white/10">
              {paymentTerms.map((term, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="text-sm text-black dark:text-white">{term.description || "—"}</span>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
                    {term.percentage}%
                  </span>
                </div>
              ))}
            </div>
            {totalPercentage !== 100 && (
              <p className="text-xs text-amber-500">
                Note: payment terms total {totalPercentage}% (should be 100%).
              </p>
            )}
          </>
        )}
      </div>

      {/* ── Navigation ─────────────────────────────────────────────── */}
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
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-normal text-white hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed dark:text-black"
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
