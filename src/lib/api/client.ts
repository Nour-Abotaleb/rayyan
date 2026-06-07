import { API_BASE_URL } from "@/lib/api/config";
import { API_TOKEN_STORAGE_KEY } from "@/lib/auth/api-token-storage";

export type ApiResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: string; status: number };

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
    try {
      const body = (await parseJson<{ message?: string; error?: string }>(
        res,
      )) as {
        message?: string;
        error?: string;
      };
      error = body?.message ?? body?.error ?? error;
    } catch {
      // keep statusText
    }
    return { ok: false, error, status: res.status };
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
