"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PersonIcon from "@/icons/PersonIcon";
import DropdownSelect from "@/components/DropdownSelect";
import DateInput from "@/features/proposals/components/sections/DateInput";

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
  type,
  error,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  icons: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-base font-[550] text-black dark:text-white">
        {label} {required && <span>*</span>}
      </label>
      <div className="relative">
        <input
          type={type ?? "text"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD] ${error ? "border-red-400 focus:ring-red-300" : "focus:ring-primary/20"}`}
        />
        <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center gap-1 text-input-icon">
          {icons}
        </span>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function NumberSpinnerField({
  label,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  function adjust(delta: number) {
    const n = parseInt(value || "0", 10);
    onChange(String(Math.max(0, n + delta)));
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

export interface DeliverablesStepData {
  serviceCatalog: string;
  name: string;
  dueDate: string;
  quantity: number;
  unitPrice: number;
  salaryCosts: number;
  toolsCosts?: number;
  otherExpenses?: number;
}

export default function FinancialDeliverablesStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (data: DeliverablesStepData) => void;
}) {
  const { t, dir } = useLanguage();
  const fp = t.dashboard.financialProposal;
  const f = fp.step2Form;

  const [form, setForm] = useState({
    serviceCatalog: "",
    deliverableName: "",
    dueDate: "",
    quantity: "",
    unitPrice: "",
    salaryCosts: "",
    toolsCosts: "",
    otherExpenses: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(key: keyof typeof form) {
    return (v: string) => {
      setForm((s) => ({ ...s, [key]: v }));
      if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
    };
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.serviceCatalog.trim())  e.serviceCatalog  = "Required";
    if (!form.deliverableName.trim()) e.deliverableName = "Required";
    if (!form.dueDate.trim())         e.dueDate         = "Required";
    if (!form.quantity || Number(form.quantity) < 1)    e.quantity    = "Required";
    if (!form.unitPrice || Number(form.unitPrice) <= 0) e.unitPrice   = "Required";
    if (!form.salaryCosts || Number(form.salaryCosts) <= 0) e.salaryCosts = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <main className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
      {/* Service Catalog — full width */}
      <DropdownSelect
        label={f.serviceCatalogLabel}
        required
        placeholder={f.serviceCatalogPlaceholder}
        icon={<SectorIcon />}
        optionType="service-catalog"
        value={form.serviceCatalog}
        onChange={set("serviceCatalog")}
        error={errors.serviceCatalog}
      />

      {/* 3-column row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <InputField
          label={f.deliverableNameLabel}
          required
          placeholder={f.deliverableNamePlaceholder}
          icons={<PersonIcon size={20} />}
          value={form.deliverableName}
          onChange={set("deliverableName")}
          error={errors.deliverableName}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm md:text-base font-[550] text-black dark:text-white">
            {f.dueDateLabel} <span>*</span>
          </label>
          <DateInput value={form.dueDate} onChange={set("dueDate")} placeholder={f.dueDatePlaceholder} isRtl={dir === "rtl"} />
          {errors.dueDate && <p className="text-xs text-red-500">{errors.dueDate}</p>}
        </div>
        <InputField
          label={f.quantityLabel}
          required
          placeholder={f.quantityPlaceholder}
          icons={<PersonIcon size={20} />}
          value={form.quantity}
          onChange={set("quantity")}
          error={errors.quantity}
        />
      </div>

      {/* 2-column row — required price fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <NumberSpinnerField
            label={f.unitPriceLabel}
            required
            placeholder={f.unitPricePlaceholder}
            value={form.unitPrice}
            onChange={set("unitPrice")}
          />
          {errors.unitPrice && <p className="text-xs text-red-500">{errors.unitPrice}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <NumberSpinnerField
            label={f.salaryCostsLabel}
            required
            placeholder={f.salaryCostsPlaceholder}
            value={form.salaryCosts}
            onChange={set("salaryCosts")}
          />
          {errors.salaryCosts && <p className="text-xs text-red-500">{errors.salaryCosts}</p>}
        </div>
      </div>

      {/* 2-column row — optional cost fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <NumberSpinnerField
          label={f.toolsCostsLabel}
          placeholder={f.toolsCostsPlaceholder}
          value={form.toolsCosts}
          onChange={set("toolsCosts")}
        />
        <NumberSpinnerField
          label={f.otherExpensesLabel}
          placeholder={f.otherExpensesPlaceholder}
          value={form.otherExpenses}
          onChange={set("otherExpenses")}
        />
      </div>

      <div className="mt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white bg-white/50 px-3 py-2.5 text-sm font-normal text-black hover:opacity-80 transition-opacity cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {fp.actions.prevProjectInfo}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!validate()) return;
            onNext({
              serviceCatalog: form.serviceCatalog,
              name: form.deliverableName,
              dueDate: form.dueDate,
              quantity: Number(form.quantity) || 0,
              unitPrice: Number(form.unitPrice) || 0,
              salaryCosts: Number(form.salaryCosts) || 0,
              toolsCosts: form.toolsCosts ? Number(form.toolsCosts) : undefined,
              otherExpenses: form.otherExpenses ? Number(form.otherExpenses) : undefined,
            });
          }}
          className="cursor-pointer rounded-full bg-primary px-3 py-2.5 text-sm font-normal text-white transition-colors hover:bg-primary-dark dark:text-black"
        >
          {fp.actions.nextPaymentTerms}
        </button>
      </div>
    </main>
  );
}
