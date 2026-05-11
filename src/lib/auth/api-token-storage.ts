/** Key for Bearer token used by `src/lib/api/client.ts` after login */
export const API_TOKEN_STORAGE_KEY = "rayyan_token";

export function persistApiToken(token: string, remember: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(API_TOKEN_STORAGE_KEY);
    window.sessionStorage.removeItem(API_TOKEN_STORAGE_KEY);
    if (remember) window.localStorage.setItem(API_TOKEN_STORAGE_KEY, token);
    else window.sessionStorage.setItem(API_TOKEN_STORAGE_KEY, token);
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
