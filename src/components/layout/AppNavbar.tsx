"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function AppNavbar() {
  const pathname = usePathname();

  // Dashboard routes use `src/app/dashboard/layout.tsx` (DashboardNavbar)
  if (pathname?.startsWith("/dashboard")) return null;
  // Marketing pages with hero sections provide their own navbar
  if (pathname === "/" || pathname === "/home" || pathname === "/contact") {
    return null;
  }
  // Auth flows that use full-bleed layout without global header
  if (pathname === "/forgot-password" || pathname === "/reset-password") {
    return null;
  }

  return <Navbar />;
}
