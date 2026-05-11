"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import PersonIcon from "@/icons/PersonIcon";
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
  const { logout, loading: authLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchInputId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setNotificationsOpen(false);
      setSearchExpanded(false);
      setSearchQuery("");
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    if (!searchExpanded) return;
    function onPointerDown(event: MouseEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchExpanded(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [searchExpanded]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "k" && event.key !== "K") return;
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      setSearchExpanded(true);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchExpanded) return;
    const id = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [searchExpanded]);

  async function handleLogout() {
    if (authLoading) return;
    setMenuOpen(false);
    setNotificationsOpen(false);
    await logout();
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

      <div
        ref={searchRef}
        className={`flex h-10 shrink-0 items-stretch overflow-hidden rounded-full border transition-[width] duration-300 ease-out motion-reduce:transition-none ${
          searchExpanded
            ? "w-[min(17rem,calc(100vw-10rem))] border-zinc-200 bg-white/60 dark:border-zinc-600 dark:bg-zinc-900"
            : "w-10 border-transparent bg-white/50 dark:border-white/25 dark:bg-white/8"
        }`}
      >
        {searchExpanded ? (
          <form
            role="search"
            className="flex min-w-0 flex-1 items-center ps-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              id={searchInputId}
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.dashboard.search.placeholder}
              aria-label={t.dashboard.search.placeholder}
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
            <button
              type="button"
              aria-label={t.dashboard.search.ariaClose}
              className="me-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90"
              onClick={() => setSearchExpanded(false)}
            >
              <SearchIcon size={18} className="text-white" />
            </button>
          </form>
        ) : (
          <button
            type="button"
            aria-label={t.dashboard.search.ariaCollapsed}
            aria-expanded={searchExpanded}
            onClick={() => setSearchExpanded((open) => !open)}
            className="flex h-full w-full items-center justify-center p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:hover:text-primary-light"
          >
            <SearchIcon size={20} />
          </button>
        )}
      </div>

      <div ref={notificationsRef} className="relative">
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={notificationsOpen}
          aria-label={t.dashboard.notifications.toggleLabel}
          onClick={() => {
            setMenuOpen(false);
            setNotificationsOpen((v) => !v);
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light"
        >
          <NotificationIcon size={20} />
          <span className="absolute left-[12.7px] top-3 h-[5px] w-[5px] rounded-full bg-[#C10000]" />
        </button>

        {notificationsOpen && (
          <div
            role="dialog"
            aria-label={t.dashboard.notifications.title}
            className="absolute end-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40"
          >
            <div className="border-b border-zinc-100 px-3 py-2.5 dark:border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t.dashboard.notifications.title}
              </h2>
            </div>
            <div className="max-h-72 overflow-y-auto px-3 py-8">
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                {t.dashboard.notifications.empty}
              </p>
            </div>
          </div>
        )}
      </div>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => {
            setNotificationsOpen(false);
            setMenuOpen((v) => !v);
          }}
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
            className="absolute end-0 mt-2 min-w-[11.5rem] overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <Link
              href="/dashboard/settings"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                setNotificationsOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <PersonIcon size={18} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
              {t.dashboard.userMenu.profile}
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={authLoading}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#C10000] transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-zinc-800"
            >
              {authLoading
                ? t.dashboard.userMenu.loggingOut
                : t.dashboard.userMenu.logout}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
