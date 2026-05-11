import { SignJWT } from "jose";
import { AUTH_SECRET } from "@/lib/auth/constants";

const secret = new TextEncoder().encode(AUTH_SECRET);

/** App session JWT for HttpOnly cookie (middleware + `getSession`). */
export async function mintSessionJwt(email: string, remember: boolean) {
  const normalized = email.trim().toLowerCase();
  return new SignJWT({ role: "user", email: normalized })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(remember ? "30d" : "7d")
    .setSubject(normalized)
    .sign(secret);
}
