import type { Metadata } from "next";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import Navbar from "@/components/layout/Navbar";
import spinnerImg from "@src/assets/dashboard/spinner.png";

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
        {/* Outside AppProviders so z-index isn’t trapped by client layout stacking */}
        <div
          className="pointer-events-none fixed left-0 top-0 z-[10000] w-[200px] sm:w-[260px] md:w-[320px] lg:w-[380px] max-w-[58vw]"
          aria-hidden
        >
          <Image
            src={spinnerImg}
            alt=""
            width={600}
            height={600}
            className="h-auto w-full object-contain"
            priority
            sizes="(max-width: 640px) 58vw, (max-width: 1024px) 260px, 380px"
          />
        </div>
        <AppProviders>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
