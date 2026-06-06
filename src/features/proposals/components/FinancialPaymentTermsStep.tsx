"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PersonIcon from "@/icons/PersonIcon";
import CloseIcon from "@/icons/CloseIcon";

// ── Icons ────────────────────────────────────────────────────────────────────

function SectorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18.32 11.9999C20.92 11.9999 22 10.9999 21.04 7.71994C20.39 5.50994 18.49 3.60994 16.28 2.95994C13 1.99994 12 3.07994 12 5.67994V8.55994C12 10.9999 13 11.9999 15 11.9999H18.32Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.0014 14.6998C19.0714 19.3298 14.6314 22.6898 9.5814 21.8698C5.7914 21.2598 2.7414 18.2098 2.1214 14.4198C1.3114 9.38977 4.6514 4.94977 9.2614 4.00977" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Reusable field components ────────────────────────────────────────────────

function InputField({
  label,
  required,
  placeholder,
  icons,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  icons: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} {required && <span>*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
        />
        <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
          {icons}
        </span>
      </div>
    </div>
  );
}

function NumberSpinnerField({
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  function adjust(delta: number) {
    const n = parseFloat(value || "0");
    onChange(String(Math.max(0, Math.round((n + delta) * 10) / 10)));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} {required && <span>*</span>}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            min={0}
            max={100}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
            <SectorIcon />
          </span>
        </div>
        <div className="input-style flex h-[44px] w-[44px] shrink-0 flex-col items-center justify-center rounded-full text-input-icon overflow-hidden">
          <button
            type="button"
            onClick={() => adjust(1)}
            aria-label="Increase"
            className="flex h-[14px] w-full cursor-pointer items-center justify-center hover:text-primary transition-colors"
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 6.5L6 1.5L11 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => adjust(-1)}
            aria-label="Decrease"
            className="flex h-[14px] w-full cursor-pointer items-center justify-center hover:text-primary transition-colors"
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Step component ───────────────────────────────────────────────────────────

type PaymentTerm = { id: number; description: string; percentage: string };

export interface PaymentTermsStepData {
  description: string;
  percentage: number;
}

export default function FinancialPaymentTermsStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (data: PaymentTermsStepData[]) => void;
}) {
  const { t } = useLanguage();
  const fp = t.dashboard.financialProposal;
  const f = fp.step3Form;

  const [terms, setTerms] = useState<PaymentTerm[]>([
    { id: 1, description: "", percentage: "" },
  ]);
  const [nextId, setNextId] = useState(2);

  function addTerm() {
    setTerms((prev) => [...prev, { id: nextId, description: "", percentage: "" }]);
    setNextId((n) => n + 1);
  }

  function removeTerm(id: number) {
    setTerms((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTerm(id: number, field: keyof Omit<PaymentTerm, "id">, value: string) {
    setTerms((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }

  return (
    <main className="flex flex-col gap-4 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
      {/* Add button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addTerm}
          className="cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity dark:text-black"
        >
          {f.addPaymentTerm}
        </button>
      </div>

      {/* Payment term cards */}
      <div className="flex flex-col gap-4">
        {terms.map((term) => (
          <div
            key={term.id}
            className="relative rounded-2xl border border-white bg-white/50 p-6 dark:border-white/10 dark:bg-white/5"
          >
            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeTerm(term.id)}
              aria-label="Remove"
              className="absolute end-3 top-3 flex size-7 cursor-pointer items-center justify-center rounded-full text-[#737373] hover:text-black/80 dark:hover:text-white transition-colors"
            >
              <CloseIcon size={20} />
            </button>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pr-8 mt-6">
              <InputField
                label={f.paymentDescLabel}
                required
                placeholder={f.paymentDescPlaceholder}
                icons={<PersonIcon size={20} />}
                value={term.description}
                onChange={(v) => updateTerm(term.id, "description", v)}
              />
              <NumberSpinnerField
                label={f.percentageLabel}
                required
                placeholder={f.percentagePlaceholder}
                value={term.percentage}
                onChange={(v) => updateTerm(term.id, "percentage", v)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white bg-white/50 px-3 py-2.5 text-sm font-normal text-black hover:opacity-80 transition-opacity cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {fp.actions.prevDeliverables}
        </button>
        <button
          type="button"
          onClick={() =>
            onNext(
              terms.map(({ description, percentage }) => ({
                description,
                percentage: Number(percentage) || 0,
              })),
            )
          }
          className="cursor-pointer rounded-full bg-primary px-3 py-2.5 text-sm font-normal text-white transition-colors hover:bg-primary-dark dark:text-black"
        >
          {fp.actions.nextFinalReview}
        </button>
      </div>
    </main>
  );
}
