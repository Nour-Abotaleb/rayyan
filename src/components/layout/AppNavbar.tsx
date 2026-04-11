'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'

export default function AppNavbar() {
  const pathname = usePathname()

  // Dashboard routes use `src/app/dashboard/layout.tsx` (DashboardNavbar)
  if (pathname?.startsWith('/dashboard')) return null

  return <Navbar />
}

