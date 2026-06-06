"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProfile } from "@/hooks/useProfile";
import PersonIcon from "@/icons/PersonIcon";
import EmailIcon from "@/icons/EmailIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import LockIcon from "@/icons/LockIcon";
import EyeIcon from "@/icons/EyeIcon";
import EyeOffIcon from "@/icons/EyeOffIcon";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import DropzoneUploadIcon from "@/icons/DropzoneUploadIcon";
import CountryDropdown, { COUNTRIES, getFlagEmoji, type Country } from "@/components/CountryDropdown";
import avatarImg from "@src/assets/dashboard/avatar.svg";

export default function PersonalProfileTab({
  user,
}: {
  user: { name: string; email: string; avatar?: string };
}) {
  const { t } = useLanguage();
  const s = t.dashboard.settings.personalProfile;
  const { profile, loading, fetchProfile, updateProfile } = useProfile();

  useEffect(() => {
    if (!profile) fetchProfile();
  }, [fetchProfile, profile]);

  const [form, setForm] = useState({
    fullName: user.name,
    email: user.email,
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone ?? "",
      }));
    }
  }, [profile]);

  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileSelect(file: File | null) {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function handleCancel() {
    if (profile) {
      setForm({ fullName: profile.fullName, email: profile.email, phone: profile.phone ?? "", password: "" });
    }
    setAvatarFile(null);
    setAvatarPreview(null);
  }

  async function handleSave() {
    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      ...(form.password ? { password: form.password } : {}),
      ...(avatarFile ? { avatar: avatarFile } : {}),
    };
    await updateProfile(payload);
    setAvatarFile(null);
    setForm((prev) => ({ ...prev, password: "" }));
  }

  const avatarSrc = avatarPreview ?? profile?.avatarUrl ?? user.avatar ?? null;
  const displayName = profile?.fullName ?? user.name;
  const displayEmail = profile?.email ?? user.email;
  const inputClass = "input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm font-[300] text-[#A0A3BD] placeholder:font-[300] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD] dark:placeholder:text-[#A0A3BD]";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-4">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full">
            {avatarSrc ? (
              <Image src={avatarSrc} alt={s.avatarAlt} fill className="object-cover" />
            ) : (
              <Image src={avatarImg} alt={s.avatarAlt} fill className="object-cover" />
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}
          </div>
          <div className="pb-1">
            <p className="text-lg font-bold text-black dark:text-white">{displayName}</p>
            <p className="text-sm text-[#808080]">{displayEmail}</p>
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

      <div className="flex flex-col gap-5 rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 p-3 md:p-6 dark:border-white/10 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.fullNameLabel} <span>*</span>
            </label>
            <div className="relative">
              <input type="text" placeholder={s.fullNamePlaceholder} value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className={inputClass} />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                <PersonIcon size={20} />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.emailLabel} <span>*</span>
            </label>
            <div className="relative">
              <input type="email" placeholder={s.emailPlaceholder} value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} />
              <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                <EmailIcon size={20} />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.phoneLabel} <span>*</span>
            </label>
            <div className="relative">
              <div className="input-style flex items-center overflow-hidden rounded-[44px] pe-3">
                <button
                  type="button"
                  onClick={() => setCountryOpen((v) => !v)}
                  className="flex shrink-0 items-center gap-1.5 border-e border-black/10 px-3 py-3.5 transition-opacity hover:opacity-70 cursor-pointer dark:border-white/10"
                >
                  <span className="text-xl leading-none">{getFlagEmoji(selectedCountry.flag)}</span>
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
              {countryOpen && (
                <CountryDropdown
                  selected={selectedCountry}
                  onSelect={setSelectedCountry}
                  onClose={() => setCountryOpen(false)}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.passwordLabel} <span>*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={s.passwordPlaceholder}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                aria-label={showPassword ? s.hidePassword : s.showPassword}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 end-4 flex items-center text-input-icon hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm md:text-[15px] font-[550] text-black dark:text-white">
              {s.changeImageLabel} <span>*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.png,.pdf,.docx,.doc,.txt"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
            />
            <div
              className="relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 text-center cursor-pointer"
              style={{ background: "linear-gradient(to top, #FFFFFF66 0%, #48898120 100%)" }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files?.[0] ?? null); }}
            >
              <svg className="pointer-events-none absolute inset-0 h-full w-full text-primary" style={{ overflow: "visible" }}>
                <rect x="0.5" y="0.5" width="99.8%" height="99.8%" rx="11" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
              </svg>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/50 text-primary">
                <DropzoneUploadIcon />
              </span>
              <p className="text-xs text-black/60 dark:text-white/50">
                {avatarFile ? avatarFile.name : s.dragDropLabel}
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

        </div>
      </div>
    </div>
  );
}
