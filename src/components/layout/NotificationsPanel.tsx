"use client";

import { useRef } from "react";
import NotificationIcon from "@/icons/NotificationIcon";
import {
  isNotificationUnread,
  type NotificationItem,
} from "@/lib/api/notifications.service";

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

const unreadRowClass = "bg-[#ECFDF5] dark:bg-[#022C22]";
const readRowClass = "bg-white dark:bg-zinc-900";

export default function NotificationsPanel({
  open,
  onToggle,
  onClose,
  notifications,
  loading,
  error,
  unreadCount,
  onMarkRead,
  onRetry,
  dir,
  lang,
  t,
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  notifications: NotificationItem[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
  onMarkRead: (n: NotificationItem) => void;
  onRetry: () => void;
  dir: string;
  lang: string;
  t: { title: string; loading: string; empty: string; loadError: string; retry: string; toggleLabel: string };
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={
          unreadCount > 0
            ? `${t.toggleLabel} (${unreadCount})`
            : t.toggleLabel
        }
        onClick={onToggle}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/50 p-2 text-zinc-900 transition-colors hover:text-primary dark:text-white dark:bg-white/8 dark:border dark:border-white/10 dark:hover:text-primary-light cursor-pointer"
      >
        <NotificationIcon size={20} />
        {unreadCount > 0 && (
          <span
            className="absolute top-0.5 end-1 flex min-h-[16px] min-w-[16px] shrink-0 items-center justify-center rounded-full bg-[#C10000] px-[4px] text-[10px] font-semibold tabular-nums leading-none text-white"
            aria-hidden
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          dir={dir}
          aria-label={t.title}
          className="absolute end-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40"
        >
          <div className="border-b border-zinc-200 px-3 py-2.5 dark:border-zinc-800">
            <h2 className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {t.title}
            </h2>
          </div>
          <div className="max-h-86 overflow-y-auto">
            {error && notifications.length > 0 && (
              <div className="flex items-center justify-between gap-2 border-b border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
                <span className="min-w-0">{t.loadError}</span>
                <button
                  type="button"
                  onClick={onRetry}
                  className="shrink-0 rounded-full bg-red-800 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-red-900 dark:bg-red-700 dark:hover:bg-red-600"
                >
                  {t.retry}
                </button>
              </div>
            )}
            {loading && notifications.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                {t.loading}
              </p>
            ) : error && notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-3 py-8">
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                  {t.loadError}
                </p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  {t.retry}
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                {t.empty}
              </p>
            ) : (
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {notifications.map((n) => {
                  const unread = isNotificationUnread(n);
                  return (
                    <li key={n.id}>
                      <div
                        role={unread ? "button" : undefined}
                        tabIndex={unread ? 0 : undefined}
                        className={`w-full px-3 py-3 text-start outline-none transition-colors duration-150 ${
                          unread
                            ? `${unreadRowClass} cursor-pointer hover:opacity-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900`
                            : readRowClass
                        }`}
                        onClick={unread ? () => onMarkRead(n) : undefined}
                        onKeyDown={
                          unread
                            ? (e) => {
                                if (e.key !== "Enter" && e.key !== " ") return;
                                e.preventDefault();
                                onMarkRead(n);
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-start gap-2">
                          <p className={`text-sm font-semibold text-zinc-900 dark:text-zinc-100 ${unread ? "" : "opacity-80"}`}>
                            {n.title}
                          </p>
                        </div>
                        <p className="mt-1 line-clamp-3 text-xs text-zinc-600 dark:text-zinc-300">
                          {n.message}
                        </p>
                        <p className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-500">
                          {formatNotificationTime(n.created_at, lang)}
                        </p>
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
  );
}
