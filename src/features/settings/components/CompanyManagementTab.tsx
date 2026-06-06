"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompany } from "@/hooks/useCompany";
import PersonIcon from "@/icons/PersonIcon";
import EmailIcon from "@/icons/EmailIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import WebsiteIcon from "@/icons/WebsiteIcon";
import AddressIcon from "@/icons/AddressIcon";
import companyLogoImg from "@src/assets/dashboard/company-logo.svg";

interface Country {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: "SA", name: "Saudi Arabia",   dial: "+966", flag: "SA" },
  { code: "AE", name: "UAE",            dial: "+971", flag: "AE" },
  { code: "KW", name: "Kuwait",         dial: "+965", flag: "KW" },
  { code: "QA", name: "Qatar",          dial: "+974", flag: "QA" },
  { code: "BH", name: "Bahrain",        dial: "+973", flag: "BH" },
  { code: "OM", name: "Oman",           dial: "+968", flag: "OM" },
  { code: "JO", name: "Jordan",         dial: "+962", flag: "JO" },
  { code: "EG", name: "Egypt",          dial: "+20",  flag: "EG" },
  { code: "LB", name: "Lebanon",        dial: "+961", flag: "LB" },
  { code: "IQ", name: "Iraq",           dial: "+964", flag: "IQ" },
  { code: "SY", name: "Syria",          dial: "+963", flag: "SY" },
  { code: "YE", name: "Yemen",          dial: "+967", flag: "YE" },
  { code: "MA", name: "Morocco",        dial: "+212", flag: "MA" },
  { code: "TN", name: "Tunisia",        dial: "+216", flag: "TN" },
  { code: "DZ", name: "Algeria",        dial: "+213", flag: "DZ" },
  { code: "LY", name: "Libya",          dial: "+218", flag: "LY" },
  { code: "SD", name: "Sudan",          dial: "+249", flag: "SD" },
  { code: "TR", name: "Turkey",         dial: "+90",  flag: "TR" },
  { code: "PK", name: "Pakistan",       dial: "+92",  flag: "PK" },
  { code: "IN", name: "India",          dial: "+91",  flag: "IN" },
  { code: "US", name: "United States",  dial: "+1",   flag: "US" },
  { code: "GB", name: "United Kingdom", dial: "+44",  flag: "GB" },
  { code: "DE", name: "Germany",        dial: "+49",  flag: "DE" },
  { code: "FR", name: "France",         dial: "+33",  flag: "FR" },
  { code: "IT", name: "Italy",          dial: "+39",  flag: "IT" },
  { code: "ES", name: "Spain",          dial: "+34",  flag: "ES" },
  { code: "CA", name: "Canada",         dial: "+1",   flag: "CA" },
  { code: "AU", name: "Australia",      dial: "+61",  flag: "AU" },
  { code: "JP", name: "Japan",          dial: "+81",  flag: "JP" },
  { code: "CN", name: "China",          dial: "+86",  flag: "CN" },
];

function getFlagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchInputIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.9299 20.6898L22.0099 23.0098" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M14.834 13.8333L10.834 9.83325L6.83399 13.8333M10.834 9.83325V18.8333M18.834 14.5761C20.0555 13.5673 20.834 12.0412 20.834 10.3333C20.834 7.29569 18.3716 4.83325 15.334 4.83325C15.1155 4.83325 14.911 4.71925 14.8001 4.53099C13.496 2.31809 11.0884 0.833252 8.33399 0.833252C4.19185 0.833252 0.833984 4.19112 0.833984 8.33325C0.833984 10.3994 1.66943 12.2703 3.02093 13.6268" stroke="#488981" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CountryDropdown({
  selected,
  onSelect,
  onClose,
}: {
  selected: Country;
  onSelect: (c: Country) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search),
  );

  return (
    <div
      ref={wrapRef}
      className="absolute start-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-[#1e1e1e] dark:shadow-black/50"
    >
      <div className="relative border-b border-black/5 p-2 dark:border-white/10">
        <span className="pointer-events-none absolute inset-y-0 start-5 flex items-center text-[#A0A3BD]">
          <SearchInputIcon />
        </span>
        <input
          autoFocus
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search country..."
          className="w-full rounded-xl bg-black/5 py-2 ps-7 pe-3 text-xs text-black placeholder:text-[#A0A3BD] focus:outline-none dark:bg-white/10 dark:text-white"
        />
      </div>
      <ul className="max-h-56 overflow-y-auto py-1">
        {filtered.length === 0 ? (
          <li className="px-4 py-3 text-xs text-[#A0A3BD]">No results</li>
        ) : (
          filtered.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => { onSelect(c); onClose(); }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/[0.08] cursor-pointer ${
                  selected.code === c.code
                    ? "text-primary font-medium"
                    : "text-black dark:text-white"
                }`}
              >
                <span className="text-xl leading-none">{getFlagEmoji(c.flag)}</span>
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
                <span className="shrink-0 text-xs text-[#A0A3BD]">{c.dial}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function UploadField({
  label,
  file,
  existingUrl,
  onChange,
}: {
  label: string;
  file: File | null;
  existingUrl: string | null;
  onChange: (f: File | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const s = useLanguage().t.dashboard.settings.companyManagement;
  const displayName = file ? file.name : existingUrl ? existingUrl.split("/").pop() ?? existingUrl : null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
        {label} <span>*</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt,.jpg,.png"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <div
        className="relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 text-center cursor-pointer"
        style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onChange(e.dataTransfer.files?.[0] ?? null); }}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full text-primary" style={{ overflow: "visible" }}>
          <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
        </svg>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
          <UploadIcon />
        </span>
        <p className="text-xs text-black/60 dark:text-white/50">
          {displayName ?? s.dragDropLabel}
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          className="rounded-full bg-primary px-5 py-1.5 text-xs font-medium text-white hover:opacity-90 cursor-pointer"
        >
          {s.browseFiles}
        </button>
        <p className="text-[10px] text-black/40 dark:text-white/30">{s.fileTypes}</p>
      </div>
    </div>
  );
}

export default function CompanyManagementTab() {
  const { t } = useLanguage();
  const s = t.dashboard.settings.companyManagement;
  const { company, loading, fetchCompany, updateCompany } = useCompany();

  useEffect(() => {
    if (!company) fetchCompany();
  }, [fetchCompany, company]);

  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    phone: "",
    landline: "",
    address: "",
    website: "",
  });
  const [phoneCountry, setPhoneCountry] = useState<Country>(COUNTRIES[0]);
  const [landlineCountry, setLandlineCountry] = useState<Country>(COUNTRIES[0]);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [landlineOpen, setLandlineOpen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [commercialRegisterFile, setCommercialRegisterFile] = useState<File | null>(null);
  const [taxCardFile, setTaxCardFile] = useState<File | null>(null);

  useEffect(() => {
    if (company) {
      setForm({
        companyName: company.companyName,
        companyEmail: company.companyEmail,
        phone: company.phone,
        landline: company.landline,
        address: company.address,
        website: company.website,
      });
    }
  }, [company]);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleLogoChange(file: File | null) {
    setLogoFile(file);
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  }

  function handleCancel() {
    if (company) {
      setForm({
        companyName: company.companyName,
        companyEmail: company.companyEmail,
        phone: company.phone,
        landline: company.landline,
        address: company.address,
        website: company.website,
      });
    }
    setLogoFile(null);
    setLogoPreview(null);
    setCommercialRegisterFile(null);
    setTaxCardFile(null);
  }

  async function handleSave() {
    await updateCompany({
      ...form,
      ...(logoFile ? { logo: logoFile } : {}),
      ...(commercialRegisterFile ? { commercialRegister: commercialRegisterFile } : {}),
      ...(taxCardFile ? { taxCard: taxCardFile } : {}),
    });
    setLogoFile(null);
    setLogoPreview(null);
    setCommercialRegisterFile(null);
    setTaxCardFile(null);
  }

  const logoSrc = logoPreview ?? company?.logoUrl ?? null;

  const inputClass =
    "input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]";

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-4">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full">
            {logoSrc ? (
              <Image src={logoSrc} alt={s.avatarAlt} fill className="object-cover" />
            ) : (
              <Image src={companyLogoImg} alt={s.avatarAlt} fill className="object-cover" />
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}
          </div>
          <div className="pb-1">
            <p className="text-lg font-bold text-black dark:text-white">
              {company?.companyName ?? ""}
            </p>
            <p className="text-sm text-[#808080]">{company?.companyEmail ?? ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="rounded-full border border-white bg-white/50 px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-70 cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-white disabled:opacity-40"
          >
            {s.cancel}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer dark:text-black disabled:opacity-40"
          >
            {loading ? "..." : s.save}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Company Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.companyNameLabel} <span>*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={s.companyNamePlaceholder}
                value={form.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className={inputClass}
              />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                <PersonIcon size={20} />
              </span>
            </div>
          </div>

          {/* Company Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.companyEmailLabel} <span>*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder={s.companyEmailPlaceholder}
                value={form.companyEmail}
                onChange={(e) => handleChange("companyEmail", e.target.value)}
                className={inputClass}
              />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                <EmailIcon size={20} />
              </span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.phoneLabel} <span>*</span>
            </label>
            <div className="relative">
              <div className="input-style flex items-center overflow-hidden rounded-[44px] pe-3">
                <button
                  type="button"
                  onClick={() => { setPhoneOpen((v) => !v); setLandlineOpen(false); }}
                  className="flex shrink-0 items-center gap-1.5 border-e border-black/10 px-3 py-3.5 transition-opacity hover:opacity-70 cursor-pointer dark:border-white/10"
                >
                  <span className="text-xl leading-none">{getFlagEmoji(phoneCountry.flag)}</span>
                  <ChevronDownIcon />
                </button>
                <input
                  type="tel"
                  placeholder={s.phonePlaceholder}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3.5 ps-3 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
                />
                <span className="pointer-events-none shrink-0 text-input-icon">
                  <PhoneIcon size={20} />
                </span>
              </div>
              {phoneOpen && (
                <CountryDropdown
                  selected={phoneCountry}
                  onSelect={setPhoneCountry}
                  onClose={() => setPhoneOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Landline Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.landlineLabel} <span>*</span>
            </label>
            <div className="relative">
              <div className="input-style flex items-center overflow-hidden rounded-[44px] pe-3">
                <button
                  type="button"
                  onClick={() => { setLandlineOpen((v) => !v); setPhoneOpen(false); }}
                  className="flex shrink-0 items-center gap-1.5 border-e border-black/10 px-3 py-3.5 transition-opacity hover:opacity-70 cursor-pointer dark:border-white/10"
                >
                  <span className="text-xl leading-none">{getFlagEmoji(landlineCountry.flag)}</span>
                  <ChevronDownIcon />
                </button>
                <input
                  type="tel"
                  placeholder={s.landlinePlaceholder}
                  value={form.landline}
                  onChange={(e) => handleChange("landline", e.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3.5 ps-3 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]"
                />
                <span className="pointer-events-none shrink-0 text-input-icon">
                  <PhoneIcon size={20} />
                </span>
              </div>
              {landlineOpen && (
                <CountryDropdown
                  selected={landlineCountry}
                  onSelect={setLandlineCountry}
                  onClose={() => setLandlineOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Company Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.addressLabel} <span>*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={s.addressPlaceholder}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className={inputClass}
              />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                <AddressIcon size={20} />
              </span>
            </div>
          </div>

          {/* Company Website */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.websiteLabel} <span>*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder={s.websitePlaceholder}
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className={inputClass}
              />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                <WebsiteIcon size={20} />
              </span>
            </div>
          </div>

          {/* Upload fields */}
          <div className="sm:col-span-2">
            <UploadField
              label={s.companyLogoLabel}
              file={logoFile}
              existingUrl={company?.logoUrl ?? null}
              onChange={handleLogoChange}
            />
          </div>
          <div className="sm:col-span-2">
            <UploadField
              label={s.commercialRegisterLabel}
              file={commercialRegisterFile}
              existingUrl={company?.commercialRegisterUrl ?? null}
              onChange={setCommercialRegisterFile}
            />
          </div>
          <div className="sm:col-span-2">
            <UploadField
              label={s.taxCardLabel}
              file={taxCardFile}
              existingUrl={company?.taxCardUrl ?? null}
              onChange={setTaxCardFile}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
