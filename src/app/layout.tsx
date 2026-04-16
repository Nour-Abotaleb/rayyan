import type { Metadata } from "next";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import "./globals.css";
// import shadowBottomImage from "@src/assets/dashboard/shadow-bottom.png";
import BottomShadow from "@/components/layout/BottomShadow";
import AppProviders from "@/providers/AppProviders";
import AppNavbar from "@/components/layout/AppNavbar";
import AuthShadowOverlays from "@/components/layout/AuthShadowOverlays";

const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rayyan",
  description:
    "Design professional proposals that win top tenders with intelligence and precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${abrilFatface.variable} h-full bg-screen dark:bg-screen-dark`}
      suppressHydrationWarning
    >
      <body
        className="flex h-full min-h-full flex-col bg-inherit text-zinc-900 antialiased dark:text-zinc-100"
        suppressHydrationWarning
      >
        <AuthShadowOverlays />
        {/* <div
          className="pointer-events-none fixed inset-x-0 -bottom-16 z-[9999] flex translate-y-6 justify-center"
          aria-hidden
        >
          <Image
            src={shadowBottomImage}
            alt=""
            className="h-auto w-full max-w-[1200px] object-contain mix-blend-multiply"
            priority
          />
        </div> */}
        <BottomShadow />
        <AppProviders>
          <AppNavbar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
