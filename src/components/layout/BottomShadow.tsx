'use client'

import Image from "next/image"
import { usePathname } from "next/navigation";
import shadowBottomImage from "@src/assets/dashboard/shadow-bottom.png";

export default function BottomShadow() {
  const pathname = usePathname()

  const show =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup')

  if (!show) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center"
      aria-hidden
    >
      <Image
        src={shadowBottomImage}
        alt=""
        className="h-auto w-full max-w-[1200px] object-contain mix-blend-multiply"
        priority
      />
    </div>
  )
}