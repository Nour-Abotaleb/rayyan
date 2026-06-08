"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface Toast {
  id: number;
  message: string;
  type: "error" | "success" | "info";
  fields?: Record<string, string | null>;
}

interface ToastContextValue {
  addToast: (message: string, type?: Toast["type"], fields?: Record<string, string | null>) => void;
}

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

function camelToLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

const CONFIG = {
  error: {
    bar: "bg-red-500",
    icon: "text-red-500",
    iconBg: "bg-red-50 dark:bg-red-500/10",
    badge: "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4M12 15.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  success: {
    bar: "bg-green-500",
    icon: "text-green-500",
    iconBg: "bg-green-50 dark:bg-green-500/10",
    badge: "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  info: {
    bar: "bg-blue-500",
    icon: "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 11v5M12 7.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
} as const;

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const cfg = CONFIG[toast.type];
  const fieldEntries = Object.entries(toast.fields ?? {}).filter(([, v]) => v !== null);

  return (
    <div className="pointer-events-auto relative w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5 dark:bg-[#1c1c1c] dark:ring-white/8">
      {/* colour bar */}
      <div className={`absolute inset-x-0 top-0 h-1 ${cfg.bar}`} />

      <div className="flex items-start gap-3 px-4 pb-4 pt-5">
        {/* icon */}
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cfg.iconBg} ${cfg.icon}`}>
          {cfg.svg}
        </div>

        {/* body */}
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-black dark:text-white">{toast.message}</p>

          {fieldEntries.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {fieldEntries.map(([k, v]) => (
                <span key={k} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.badge}`}>
                  {camelToLabel(k)}: {v}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 cursor-pointer rounded-full p-1 text-black/25 transition-colors hover:bg-black/5 hover:text-black/60 dark:text-white/25 dark:hover:bg-white/5 dark:hover:text-white/60"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "error", fields?: Record<string, string | null>) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type, fields }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[99999] flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div key={toast.id} className="w-full max-w-md">
            <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
