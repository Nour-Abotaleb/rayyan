"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import SearchIcon from "@/icons/SearchIcon";
import NotificationIcon from "@/icons/NotificationIcon";

export interface DashboardRightControlsUser {
  name: string;
  email: string;
  avatar?: string;
}

export default function DashboardRightControls({
  theme,
  toggleTheme,
  cycleLanguage,
  navLabel,
  user,
}: {
  theme: string;
  toggleTheme: () => void;
  cycleLanguage: () => void;
  navLabel: { lightMode: string; darkMode: string; language: string };
  user: DashboardRightControlsUser;
}) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <>
      <div className="flex items-center gap-1 rounded-full bg-white/50 px-[7px] py-[2.5px] dark:bg-white/8 dark:border dark:border-white/25">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={navLabel.lightMode}
          className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
            theme === "light"
              ? "bg-primary text-white"
              : "text-zinc-900 hover:text-primary dark:text-white"
          }`}
        >
          <SunIcon size={18} />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={navLabel.darkMode}
          className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
            theme === "dark"
              ? "bg-primary text-white"
              : "text-zinc-900 hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
          }`}
        >
          <MoonIcon size={18} />
        </button>
      </div>

      <button
        type="button"
        onClick={cycleLanguage}
        aria-label={navLabel.language}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
      >
        <TranslateIcon size={20} />
      </button>

      <button
        type="button"
        aria-label="Search"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
      >
        <SearchIcon size={20} />
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
      >
        <NotificationIcon size={20} />
        <span className="absolute left-[12.7px] top-3 h-[5px] w-[5px] rounded-full bg-[#C10000]" />
      </button>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-full border border-transparent bg-white/50 py-1.5 ps-2 pe-3 transition-colors hover:bg-zinc-100 dark:border-white/25 dark:bg-white/8 dark:hover:bg-white/12"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {user.name.charAt(0)}
          </div>
          <div className="hidden flex-col text-start lg:flex">
            <span className="text-xs font-semibold text-black dark:text-zinc-100">
              {user.name}
            </span>
            <span className="text-[10px] font-light text-[#656769]">
              {user.email}
            </span>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className={`hidden text-paragraph transition-transform lg:block dark:text-zinc-400 ${
              menuOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute end-0 mt-2 min-w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-[#C10000] transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-zinc-800"
            >
              {loggingOut
                ? t.dashboard.userMenu.loggingOut
                : t.dashboard.userMenu.logout}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
