import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { AUTH_SECRET, SESSION_COOKIE } from "@/lib/auth/constants";

const secret = new TextEncoder().encode(AUTH_SECRET);

export type Session = {
  email: string;
};

function formatDisplayName(email: string): string {
  const local = email.split("@")[0] ?? email;
  const words = local.split(/[._-]+/).filter(Boolean);
  if (words.length === 0) return email;
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function sessionUserDisplay(session: Session) {
  return {
    name: formatDisplayName(session.email),
    email: session.email,
  };
}

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    const email = String(payload.email ?? "");
    const role = payload.role as string;
    if (!email || role !== "user") return null;
    return { email };
  } catch {
    return null;
  }
}
