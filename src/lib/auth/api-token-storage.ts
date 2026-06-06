/** Key for Bearer token used by `src/lib/api/client.ts` after login */
export const API_TOKEN_STORAGE_KEY = "rayyan_token";

export function persistApiToken(token: string, _remember?: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(API_TOKEN_STORAGE_KEY);
    window.localStorage.setItem(API_TOKEN_STORAGE_KEY, token);
  } catch {
    // storage unavailable
  }
}

export function clearApiToken() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(API_TOKEN_STORAGE_KEY);
    window.sessionStorage.removeItem(API_TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
}
