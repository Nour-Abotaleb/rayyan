"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { API_TOKEN_STORAGE_KEY } from "@/lib/auth/api-token-storage";

function TokenMigrator() {
  useEffect(() => {
    try {
      const session = window.sessionStorage.getItem(API_TOKEN_STORAGE_KEY);
      if (session && !window.localStorage.getItem(API_TOKEN_STORAGE_KEY)) {
        window.localStorage.setItem(API_TOKEN_STORAGE_KEY, session);
      }
      window.sessionStorage.removeItem(API_TOKEN_STORAGE_KEY);
    } catch {}
  }, []);
  return null;
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <TokenMigrator />
            {children}
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}
