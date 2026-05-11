import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { mintSessionJwt } from "@/lib/auth/mint-session-jwt";

/**
 * Sets HttpOnly session cookie after successful remote login.
 * Must match `getSession()` / `middleware` JWT shape (`role` + `email`).
 */
export async function POST(request: Request) {
  let body: { email?: string; remember?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const remember = Boolean(body.remember);
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  const sessionJwt = await mintSessionJwt(email, remember);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, sessionJwt, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
  });
  return res;
}
