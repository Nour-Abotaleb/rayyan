"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompany } from "@/hooks/useCompany";
import PersonIcon from "@/icons/PersonIcon";
import EmailIcon from "@/icons/EmailIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import WebsiteIcon from "@/icons/WebsiteIcon";
import AddressIcon from "@/icons/AddressIcon";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import DropzoneUploadIcon from "@/icons/DropzoneUploadIcon";
import CountryDropdown, { COUNTRIES, getFlagEmoji, type Country } from "@/components/CountryDropdown";
import companyLogoImg from "@src/assets/dashboard/company-logo.svg";

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
  const s = useLanguage().t.dashboard.settings.companyManagement;
  const fileInputRef = useRef<HTMLInputElement>(null);
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
          <DropzoneUploadIcon />
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

import { useRef } from "react";

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
  const inputClass = "input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]";

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
            <p className="text-lg font-bold text-black dark:text-white">{company?.companyName ?? ""}</p>
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

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">{s.companyNameLabel} <span>*</span></label>
            <div className="relative">
              <input type="text" placeholder={s.companyNamePlaceholder} value={form.companyName} onChange={(e) => handleChange("companyName", e.target.value)} className={inputClass} />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon"><PersonIcon size={20} /></span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">{s.companyEmailLabel} <span>*</span></label>
            <div className="relative">
              <input type="email" placeholder={s.companyEmailPlaceholder} value={form.companyEmail} onChange={(e) => handleChange("companyEmail", e.target.value)} className={inputClass} />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon"><EmailIcon size={20} /></span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">{s.phoneLabel} <span>*</span></label>
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
                <input type="tel" placeholder={s.phonePlaceholder} value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="min-w-0 flex-1 bg-transparent py-3.5 ps-3 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]" />
                <span className="pointer-events-none shrink-0 text-input-icon"><PhoneIcon size={20} /></span>
              </div>
              {phoneOpen && <CountryDropdown selected={phoneCountry} onSelect={setPhoneCountry} onClose={() => setPhoneOpen(false)} />}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">{s.landlineLabel} <span>*</span></label>
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
                <input type="tel" placeholder={s.landlinePlaceholder} value={form.landline} onChange={(e) => handleChange("landline", e.target.value)} className="min-w-0 flex-1 bg-transparent py-3.5 ps-3 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]" />
                <span className="pointer-events-none shrink-0 text-input-icon"><PhoneIcon size={20} /></span>
              </div>
              {landlineOpen && <CountryDropdown selected={landlineCountry} onSelect={setLandlineCountry} onClose={() => setLandlineOpen(false)} />}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">{s.addressLabel} <span>*</span></label>
            <div className="relative">
              <input type="text" placeholder={s.addressPlaceholder} value={form.address} onChange={(e) => handleChange("address", e.target.value)} className={inputClass} />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon"><AddressIcon size={20} /></span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">{s.websiteLabel} <span>*</span></label>
            <div className="relative">
              <input type="url" placeholder={s.websitePlaceholder} value={form.website} onChange={(e) => handleChange("website", e.target.value)} className={inputClass} />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon"><WebsiteIcon size={20} /></span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <UploadField label={s.companyLogoLabel} file={logoFile} existingUrl={company?.logoUrl ?? null} onChange={handleLogoChange} />
          </div>
          <div className="sm:col-span-2">
            <UploadField label={s.commercialRegisterLabel} file={commercialRegisterFile} existingUrl={company?.commercialRegisterUrl ?? null} onChange={setCommercialRegisterFile} />
          </div>
          <div className="sm:col-span-2">
            <UploadField label={s.taxCardLabel} file={taxCardFile} existingUrl={company?.taxCardUrl ?? null} onChange={setTaxCardFile} />
          </div>

        </div>
      </div>
    </div>
  );
}
