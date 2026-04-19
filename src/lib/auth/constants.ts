/** HttpOnly cookie storing the signed session JWT */
export const SESSION_COOKIE = "rayyan_session";

/**
 * HS256 signing secret. Set `AUTH_SECRET` in production (long random string).
 */
export const AUTH_SECRET =
  process.env.AUTH_SECRET ?? "rayyan-local-dev-secret-key-min-32-chars!";
