import { getSession, sessionUserDisplay } from "@/lib/auth/get-session";
import OverviewPage from "@/features/dashboard/components/OverviewPage";

export default async function Dashboard() {
  const session = await getSession();
  const name = session ? sessionUserDisplay(session).name : "";
  return <OverviewPage userName={name} />;
}
