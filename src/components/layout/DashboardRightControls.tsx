"use client";

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
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import SearchIcon from "@/icons/SearchIcon";
import NotificationsPanel from "@/components/layout/NotificationsPanel";
import UserMenu, { type UserMenuUser } from "@/components/layout/UserMenu";

export interface DashboardRightControlsUser extends UserMenuUser {}

export default function DashboardRightControls({
  theme,
  toggleTheme,
  cycleLanguage,
  navLabel,
  user,
  hideUserMenu,
}: {
  theme: string;
  toggleTheme: () => void;
  cycleLanguage: () => void;
  navLabel: { lightMode: string; darkMode: string; language: string };
  user: DashboardRightControlsUser;
  hideUserMenu?: boolean;
}) {
  const { lang, dir, t } = useLanguage();
  const { logout, loading: authLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsError, setNotificationsError] = useState<string | null>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchInputId = useId();
  const markReadInFlight = useRef<Set<string>>(new Set());
  const locallyMarkedReadIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setNotificationsOpen(false);
      setSearchExpanded(false);
      setSearchQuery("");
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    if (!searchExpanded) return;
    function onPointerDown(event: MouseEvent) {
      if (!searchRef.current?.contains(event.target as Node)) setSearchExpanded(false);
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
    const id = requestAnimationFrame(() => { searchInputRef.current?.focus(); });
    return () => cancelAnimationFrame(id);
  }, [searchExpanded]);

  const loadNotifications = useCallback(async () => {
    setNotificationsError(null);
    setNotificationsLoading(true);
    const res = await listNotifications();
    setNotificationsLoading(false);
    if (!res.ok) { setNotificationsError(res.error); return; }
    const sorted = [...(Array.isArray(res.data) ? res.data : [])].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    const merged = sorted.map((n) =>
      locallyMarkedReadIds.current.has(notificationRowKey(n)) ? { ...n, is_read: 1 } : n,
    );
    setNotifications(merged);
  }, []);

  useEffect(() => { void loadNotifications(); }, [loadNotifications]);
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
      prev.map((x) => notificationRowKey(x) === key ? { ...x, is_read: 1 } : x),
    );
    try {
      const res = await markNotificationRead(n.id);
      if (!res.ok) {
        locallyMarkedReadIds.current.delete(key);
        setNotifications((prev) => prev.map((x) => notificationRowKey(x) === key ? previous : x));
      }
    } catch {
      locallyMarkedReadIds.current.delete(key);
      setNotifications((prev) => prev.map((x) => notificationRowKey(x) === key ? previous : x));
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
      {/* Theme toggle */}
      <div className="flex items-center gap-1 rounded-full bg-white/50 px-[7px] py-[2.5px] dark:bg-white/8 dark:border dark:border-white/10">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={navLabel.lightMode}
          className={`flex h-9 w-9 items-center justify-center rounded-full p-2 transition-colors ${
            theme === "light" ? "bg-primary text-white" : "text-zinc-900 hover:text-primary dark:text-white"
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
              : "text-zinc-900 hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/10 dark:hover:text-primary-light"
          }`}
        >
          <MoonIcon size={18} />
        </button>
      </div>

      {/* Language toggle */}
      <button
        type="button"
        onClick={cycleLanguage}
        aria-label={navLabel.language}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/10 dark:hover:text-primary-light"
      >
        <TranslateIcon size={20} />
      </button>

      {/* Search */}
      <div ref={searchRef} className="relative">
        {/* Desktop: inline expand */}
        <div
          className={`hidden lg:flex h-10 shrink-0 items-stretch overflow-hidden rounded-full border transition-[width] duration-300 ease-out motion-reduce:transition-none ${
            searchExpanded
              ? "w-[min(17rem,calc(100vw-10rem))] border-zinc-200 bg-white/60 dark:border-zinc-600 dark:bg-zinc-900"
              : "w-10 border-transparent bg-white/50 dark:border-white/10 dark:bg-white/8"
          }`}
        >
          {searchExpanded ? (
            <form role="search" className="flex min-w-0 flex-1 items-center ps-3" onSubmit={(e) => e.preventDefault()}>
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

        {/* Mobile: fixed icon toggle */}
        <button
          type="button"
          aria-label={searchExpanded ? t.dashboard.search.ariaClose : t.dashboard.search.ariaCollapsed}
          aria-expanded={searchExpanded}
          onClick={() => setSearchExpanded((open) => !open)}
          className={`flex lg:hidden h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            searchExpanded
              ? "border-primary bg-primary/10 text-primary dark:border-primary dark:bg-primary/20"
              : "border-transparent bg-white/50 text-zinc-900 hover:text-primary dark:border-white/10 dark:bg-white/8 dark:text-white dark:hover:text-primary-light"
          }`}
        >
          <SearchIcon size={20} />
        </button>

        {/* Mobile: absolute dropdown below icon */}
        {searchExpanded && (
          <form
            role="search"
            className="absolute end-0 top-full z-50 mt-2 flex w-72 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-1 shadow-lg lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.dashboard.search.placeholder}
              aria-label={t.dashboard.search.placeholder}
              className="min-w-0 flex-1 bg-transparent py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
            <button
              type="button"
              aria-label={t.dashboard.search.ariaClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90"
              onClick={() => setSearchExpanded(false)}
            >
              <SearchIcon size={18} className="text-white" />
            </button>
          </form>
        )}
      </div>

      {/* Notifications */}
      <NotificationsPanel
        open={notificationsOpen}
        onToggle={() => { setMenuOpen(false); setNotificationsOpen((v) => !v); }}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        loading={notificationsLoading}
        error={notificationsError}
        unreadCount={unreadCount}
        onMarkRead={markAsRead}
        onRetry={() => void loadNotifications()}
        dir={dir}
        lang={lang}
        t={t.dashboard.notifications}
      />

      {/* User menu */}
      {!hideUserMenu && (
        <UserMenu
          open={menuOpen}
          onToggle={() => { setNotificationsOpen(false); setMenuOpen((v) => !v); }}
          user={user}
          onLogout={handleLogout}
          authLoading={authLoading}
          t={t.dashboard.userMenu}
        />
      )}
    </>
  );
}
