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
    <>
      <DashboardNavbar user={mockUser} />
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
