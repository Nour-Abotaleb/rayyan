import DashboardNavbar from "@/components/layout/DashboardNavbar";

// TODO: replace with real auth session
const mockUser = {
  name: "Ahmed Mohamed",
  email: "ahmed23@gmail.com",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-screen dark:bg-screen-dark">
      <DashboardNavbar user={mockUser} />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
