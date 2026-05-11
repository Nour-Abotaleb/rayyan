import { NextResponse } from "next/server";
import { authenticateDemoUser } from "@/lib/auth/demo-users";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { mintSessionJwt } from "@/lib/auth/mint-session-jwt";

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

  const sessionJwt = await mintSessionJwt(user.email, remember);

  const redirectTo = "/dashboard";

  const res = NextResponse.json({ redirectTo });
  res.cookies.set(SESSION_COOKIE, sessionJwt, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7,
  });

  return res;
}
