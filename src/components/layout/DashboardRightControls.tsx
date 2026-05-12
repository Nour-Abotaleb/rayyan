"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import {
  isNotificationUnread,
  listNotifications,
  markNotificationRead,
  notificationRowKey,
  type NotificationItem,
} from "@/lib/api/notifications.service";
import PersonIcon from "@/icons/PersonIcon";
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import SearchIcon from "@/icons/SearchIcon";
import NotificationIcon from "@/icons/NotificationIcon";

function formatNotificationTime(iso: string, localeCode: string) {
  try {
    const locale = localeCode === "ar" ? "ar" : "en";
    return new Date(iso).toLocaleString(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

/** Uniform highlight for unread rows — same bg for all, no accent border */
const unreadNotificationRowClass = "bg-[#ECFDF5] dark:bg-[#022C22]";

const readNotificationRowClass = "bg-white dark:bg-zinc-900";

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
  const { lang, dir, t } = useLanguage();
  const { logout, loading: authLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState<string | null>(
    null,
  );
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchInputId = useId();
  const markReadInFlight = useRef<Set<string>>(new Set());
  /** Survives refetches that return stale `is_read` until the server catches up */
  const locallyMarkedReadIds = useRef<Set<string>>(new Set());

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

  const loadNotifications = useCallback(async () => {
    setNotificationsError(null);
    setNotificationsLoading(true);
    const res = await listNotifications();
    setNotificationsLoading(false);
    if (!res.ok) {
      setNotificationsError(res.error);
      return;
    }
    const sorted = [...res.data].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    const merged = sorted.map((n) =>
      locallyMarkedReadIds.current.has(notificationRowKey(n))
        ? { ...n, is_read: 1 }
        : n,
    );
    setNotifications(merged);
  }, []);

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    if (!notificationsOpen) return;
    void loadNotifications();
  }, [notificationsOpen, loadNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter(isNotificationUnread).length,
    [notifications],
  );

  const markAsRead = useCallback(async (n: NotificationItem) => {
    if (!isNotificationUnread(n)) return;
    const key = notificationRowKey(n);
    if (markReadInFlight.current.has(key)) return;
    markReadInFlight.current.add(key);
    locallyMarkedReadIds.current.add(key);
    const previous = n;
    setNotifications((prev) =>
      prev.map((x) =>
        notificationRowKey(x) === key ? { ...x, is_read: 1 } : x,
      ),
    );
    try {
      const res = await markNotificationRead(n.id);
      if (!res.ok) {
        locallyMarkedReadIds.current.delete(key);
        setNotifications((prev) =>
          prev.map((x) => (notificationRowKey(x) === key ? previous : x)),
        );
      }
    } catch {
      locallyMarkedReadIds.current.delete(key);
      setNotifications((prev) =>
        prev.map((x) => (notificationRowKey(x) === key ? previous : x)),
      );
    } finally {
      markReadInFlight.current.delete(key);
    }
  }, []);

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
          aria-label={
            unreadCount > 0
              ? `${t.dashboard.notifications.toggleLabel} (${unreadCount})`
              : t.dashboard.notifications.toggleLabel
          }
          onClick={() => {
            setMenuOpen(false);
            setNotificationsOpen((v) => !v);
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/25 dark:hover:text-primary-light cursor-pointer"
        >
          <NotificationIcon size={20} />
          {unreadCount > 0 ? (
            <span
              className="absolute top-0.5 end-1 flex min-h-[16px] min-w-[16px] shrink-0 items-center justify-center rounded-full bg-[#C10000] px-[4px] text-[10px] font-semibold tabular-nums leading-none text-white"
              aria-hidden
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </button>

        {notificationsOpen && (
          <div
            role="dialog"
            dir={dir}
            aria-label={t.dashboard.notifications.title}
            className="absolute end-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40"
          >
            <div className="border-b border-zinc-200 px-3 py-2.5 dark:border-zinc-800">
              <h2 className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {t.dashboard.notifications.title}
              </h2>
            </div>
            <div className="max-h-86 overflow-y-auto">
              {notificationsError && notifications.length > 0 ? (
                <div className="flex items-center justify-between gap-2 border-b border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
                  <span className="min-w-0">
                    {t.dashboard.notifications.loadError}
                  </span>
                  <button
                    type="button"
                    onClick={() => void loadNotifications()}
                    className="shrink-0 rounded-full bg-red-800 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-600"
                  >
                    {t.dashboard.notifications.retry}
                  </button>
                </div>
              ) : null}
              {notificationsLoading && notifications.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  {t.dashboard.notifications.loading}
                </p>
              ) : notificationsError && notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-3 px-3 py-8">
                  <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    {t.dashboard.notifications.loadError}
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadNotifications()}
                    className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {t.dashboard.notifications.retry}
                  </button>
                </div>
              ) : notifications.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  {t.dashboard.notifications.empty}
                </p>
              ) : (
                <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {notifications.map((n) => {
                    const unread = isNotificationUnread(n);
                    const body = (
                      <>
                        <div className="flex items-start gap-2">
                          <p
                            className={`text-sm font-semibold text-zinc-900 dark:text-zinc-100 ${
                              unread ? "" : "opacity-80"
                            }`}
                          >
                            {n.title}
                          </p>
                        </div>
                        <p className="mt-1 line-clamp-3 text-xs text-zinc-600 dark:text-zinc-300">
                          {n.message}
                        </p>
                        <p className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-500">
                          {formatNotificationTime(n.created_at, lang)}
                        </p>
                      </>
                    );
                    return (
                      <li key={n.id}>
                        <div
                          role={unread ? "button" : undefined}
                          tabIndex={unread ? 0 : undefined}
                          className={`w-full px-3 py-3 text-start outline-none transition-colors duration-150 ${
                            unread
                              ? `${unreadNotificationRowClass} cursor-pointer hover:opacity-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900`
                              : readNotificationRowClass
                          }`}
                          onClick={
                            unread ? () => void markAsRead(n) : undefined
                          }
                          onKeyDown={
                            unread
                              ? (e) => {
                                  if (e.key !== "Enter" && e.key !== " ") {
                                    return;
                                  }
                                  e.preventDefault();
                                  void markAsRead(n);
                                }
                              : undefined
                          }
                        >
                          {body}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
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
              <PersonIcon
                size={18}
                className="shrink-0 text-zinc-600 dark:text-zinc-400"
              />
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
