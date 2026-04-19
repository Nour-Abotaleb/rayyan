import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { getSession, sessionUserDisplay } from "@/lib/auth/get-session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = sessionUserDisplay(session);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-screen dark:bg-screen-dark">
      <DashboardNavbar user={user} />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
