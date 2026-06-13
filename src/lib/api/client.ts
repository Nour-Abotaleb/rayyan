import { API_BASE_URL } from "@/lib/api/config";
import { API_TOKEN_STORAGE_KEY } from "@/lib/auth/api-token-storage";

let _onUnauthorized: (() => void) | null = null;
let _handlingUnauthorized = false;

export function setUnauthorizedHandler(fn: () => void): void {
  _onUnauthorized = fn;
}

export type ApiResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: string; status: number; fields?: Record<string, string | null> };

function bearerHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  try {
    const token =
      window.localStorage.getItem(API_TOKEN_STORAGE_KEY) ??
      window.sessionStorage.getItem(API_TOKEN_STORAGE_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  options?: { auth?: boolean },
): Promise<ApiResult<T>> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const useAuth = options?.auth !== false;

  const isFormData = init.body instanceof FormData;

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: {
        // Let the browser set Content-Type automatically for FormData (includes boundary)
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(useAuth ? bearerHeaders() : {}),
        ...(init.headers as Record<string, string>),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: message, status: 0 };
  }

  if (!res.ok) {
    let error = res.statusText;
    let fields: Record<string, string | null> | undefined;
    try {
      const body = await parseJson<{ message?: string; error?: string; fields?: Record<string, string | null> }>(res);
      error = body?.message ?? body?.error ?? error;
      if (body?.fields) fields = body.fields;
    } catch {
      // keep statusText
    }
    if (res.status === 401 && !_handlingUnauthorized && _onUnauthorized) {
      _handlingUnauthorized = true;
      _onUnauthorized();
      setTimeout(() => { _handlingUnauthorized = false; }, 5000);
    }
    return { ok: false, error, status: res.status, fields };
  }

  const data = (await parseJson<T>(res)) as T;
  return { ok: true, data, status: res.status };
}

export const api = {
  get<T>(
    path: string,
    init?: RequestInit,
    options?: { auth?: boolean },
  ) {
    return apiRequest<T>(path, { method: "GET", ...init }, options);
  },
  post<T>(
    path: string,
    body: unknown,
    init?: RequestInit,
    options?: { auth?: boolean },
  ) {
    return apiRequest<T>(
      path,
      { method: "POST", body: JSON.stringify(body), ...init },
      options,
    );
  },
  put<T>(
    path: string,
    body: unknown,
    init?: RequestInit,
    options?: { auth?: boolean },
  ) {
    return apiRequest<T>(
      path,
      { method: "PUT", body: JSON.stringify(body), ...init },
      options,
    );
  },
} as const;
