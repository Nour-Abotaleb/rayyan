'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import shadowTopImage from '@src/assets/dashboard/shadow-top.png'

/** Top shadow only — login `/` and signup `/signup`. Bottom shadow stays global in `layout.tsx`. */
export default function AuthShadowOverlays() {
  const pathname = usePathname()
  // const show = pathname === '/login' || pathname === '/signup'
  const show =
  pathname.startsWith('/signup') ||
  pathname.startsWith('/login')
  if (!show) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 -top-20 z-50 flex justify-center"
      aria-hidden
    >
      <Image
        src={shadowTopImage}
        alt=""
        className="h-auto w-full max-w-[500px] object-contain mix-blend-multiply"
        priority
      />
    </div>
  )
}
