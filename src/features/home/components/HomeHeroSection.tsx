import Image from "next/image";
import Link from "next/link";
import heroPreview from "@src/assets/dashboard/home-img.png";
// Added the background image import
import heroBg from "@src/assets/dashboard/home-hero.png"; 

const navLinks = ["Features", "Pricing", "About", "Contact", "Blog"];

export default function HomeHeroSection() {
  return (
    <section 
      className="relative overflow-hidden pt-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >

      <div className="layout-shell-x mx-auto flex w-full max-w-6xl flex-col items-center pb-10 md:pb-14">
        <div className="w-full max-w-4xl rounded-full bg-white/25 px-3 py-3 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-3">
            <span className="font-abril text-lg text-primary md:text-xl">RAYYAN</span>
            <nav className="hidden items-center gap-5 lg:gap-8 text-sm text-[#1A1615] md:flex">
              {navLinks.map((label, idx) => (
                <button
                  key={`${label}-${idx}`}
                  type="button"
                  className="transition-colors hover:text-primary"
                >
                  {label}
                </button>
              ))}
            </nav>
            <Link
              href="/login"
              className="rounded-full bg-[#1A1615] px-4 py-2.5 text-sm font-medium text-white"
            >
              Try Dreelio free
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1A1615] md:text-7xl">
            All Your Documents.
            <br />
            One Smart Platform
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm text-[#453F3D] md:text-2xl/8">
            Upload, analyze, and manage your files with intelligent tools
            designed to simplify your workflow and boost productivity.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white bg-white/50 px-7 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mt-10 w-full max-w-5xl p-2 md:mt-14">
          <div className="">
            <Image
              src={heroPreview}
              alt="Dashboard preview"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}