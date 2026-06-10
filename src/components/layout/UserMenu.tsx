"use client";

import Link from "next/link";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import PersonIcon from "@/icons/PersonIcon";

export interface UserMenuUser {
  name: string;
  email: string;
  avatar?: string;
}

export default function UserMenu({
  open,
  onToggle,
  user,
  onLogout,
  authLoading,
  t,
}: {
  open: boolean;
  onToggle: () => void;
  user: UserMenuUser;
  onLogout: () => void;
  authLoading: boolean;
  t: { profile: string; logout: string; loggingOut: string };
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onToggle}
        className="flex items-center gap-2.5 rounded-full border border-transparent bg-[#996627] py-1.5 ps-2 pe-3 transition-colors hover:bg-[#7a5120] dark:border-white/10 dark:bg-[#996627] dark:hover:bg-[#7a5120]"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
          {user.name.charAt(0)}
        </div>
        <div className="hidden flex-col text-start lg:flex">
          <span className="text-xs font-semibold text-white">{user.name}</span>
          <span className="text-[10px] font-light text-white/70">{user.email}</span>
        </div>
        <ChevronDownIcon
          size={14}
          className={`hidden text-white/70 transition-transform lg:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 min-w-[11.5rem] overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <Link
            href="/dashboard/settings"
            role="menuitem"
            onClick={onToggle}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <PersonIcon size={18} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
            {t.profile}
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            disabled={authLoading}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#C10000] transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-zinc-800"
          >
            {authLoading ? t.loggingOut : t.logout}
          </button>
        </div>
      )}
    </div>
  );
}
