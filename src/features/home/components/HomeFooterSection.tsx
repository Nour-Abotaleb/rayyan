import Link from "next/link";
import Image from "next/image";
import codgooLogo from "@src/assets/dashboard/codgoo-logo.svg";

const pagesLinks = [
  { label: "Home Page", href: "/" },
  { label: "Features", href: "/dashboard" },
  { label: "Pricing", href: "/signup" },
  // { label: "Blog", href: "/" },
] as const;

const infoLinks = [
  { label: "Technical Proposals", href: "/login" },
  { label: "Financial Proposals", href: "/" },
  { label: "Visualization Proposals", href: "/" },
  // { label: "FAQ", href: "/" },
] as const;

export default function HomeFooterSection() {
  return (
    <footer className="layout-shell-x pb-8 pt-3">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white/25 border border-[#757372]/15 px-6 py-6 lg:pb-12 md:px-8">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-[3fr_1.2fr] pb-12">
          <div>
            <span className="font-abril text-2xl text-primary md:text-3xl">
              RAYYAN
            </span>
            <p className="mt-2 md:max-w-md text-sm leading-5 text-[#453F3D]">
            The next generation of business proposal intelligence. From document analysis to final export, experience a seamless AI workflow designed for modern enterprises.
            </p>
            {/* <div className="mt-3 flex items-center gap-2">
              <Link
                href="/"
                aria-label="X"
                className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-zinc-900"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.8125 15.75C2.502 15.75 2.25 15.498 2.25 15.1875V2.8125C2.25 2.502 2.502 2.25 2.8125 2.25H15.1875C15.498 2.25 15.75 2.502 15.75 2.8125V15.1875C15.75 15.498 15.498 15.75 15.1875 15.75H2.8125Z" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.4375 7.875V12.375" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.1875 7.875V12.375" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.4375 9.84375C8.4375 8.75625 9.31875 7.875 10.4062 7.875C11.4938 7.875 12.375 8.75625 12.375 9.84375V12.375" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.34375 5.90625C5.34375 5.4405 5.72175 5.0625 6.1875 5.0625C6.65325 5.0625 7.03125 5.4405 7.03125 5.90625C7.03125 6.372 6.65325 6.75 6.1875 6.75C5.72175 6.75 5.34375 6.372 5.34375 5.90625Z" fill="white"/>
                </svg>
              </Link>
              <Link
                href="/"
                aria-label="YouTube"
                className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-zinc-900"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_643_10977)">
                  <path d="M3.375 2.8125H6.75L14.625 15.1875H11.25L3.375 2.8125Z" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.007 10.0918L3.375 15.1873" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.6249 2.8125L9.99292 7.908" stroke="white" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_643_10977">
                  <rect width="18" height="18" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </Link>
            </div> */}
          </div>
          <div className="flex items-center justify-between">
            <div>
              {/* <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1A1615]">
                Pages
              </p> */}
              <ul className="mt-2 space-y-1.5">
                {pagesLinks.map((item) => (
                  <li key={item.label}>
                    <Link className="text-sm text-[#1A1615] hover:text-primary" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1A1615]">
                Info
              </p> */}
              <ul className="mt-2 space-y-1.5">
                {infoLinks.map((item) => (
                  <li key={item.label}>
                    <Link className="text-sm text-[#1A1615] hover:text-primary" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-[#757170]/15 pt-3 text-sm text-[#453F3D]">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2">
            <p className="text-nowrap">Copyright © 2026 Rayyan AI. All rights reserved.</p>
            <p className="flex items-center gap-1">Built in 
              <Image src={codgooLogo} alt="codgoo logo" className="w-16 md:w-20" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
