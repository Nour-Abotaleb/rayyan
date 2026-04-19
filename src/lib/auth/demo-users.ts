export type DemoUser = {
  email: string;
};

const DEMO_USERS: Record<string, { password: string }> = {
  "user@example.com": { password: "123456" },
};

/** Demo-only credentials — replace with real auth later */
export function authenticateDemoUser(
  emailRaw: string,
  password: string,
): DemoUser | null {
  const email = emailRaw.trim().toLowerCase();
  const row = DEMO_USERS[email];
  if (!row || row.password !== password) return null;
  return { email };
}
