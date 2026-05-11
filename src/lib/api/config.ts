/**
 * Remote API base URL (no trailing slash).
 * Override with `NEXT_PUBLIC_API_BASE_URL` for other environments.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://demo.togaar.com/api";
