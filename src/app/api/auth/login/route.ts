import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { authenticateDemoUser } from "@/lib/auth/demo-users";
import { AUTH_SECRET, SESSION_COOKIE } from "@/lib/auth/constants";

const secret = new TextEncoder().encode(AUTH_SECRET);

export async function POST(request: Request) {
  let body: { email?: string; password?: string; remember?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = String(body.email ?? "");
  const password = String(body.password ?? "");
  const remember = Boolean(body.remember);

  const user = authenticateDemoUser(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = await new SignJWT({
    role: "user",
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(remember ? "30d" : "7d")
    .setSubject(user.email)
    .sign(secret);

  const redirectTo = "/dashboard";

  const res = NextResponse.json({ redirectTo });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7,
  });

  return res;
}
