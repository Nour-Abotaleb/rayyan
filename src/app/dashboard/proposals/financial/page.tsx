import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";
import FinancialProposalPage from "@/features/proposals/components/FinancialProposalPage";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <FinancialProposalPage />;
}
