import { redirect } from "next/navigation";
import { getSession, sessionUserDisplay } from "@/lib/auth/get-session";
import SettingsPage from "@/features/settings/components/SettingsPage";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = sessionUserDisplay(session);
  return <SettingsPage user={user} />;
}
