import Image from "next/image";
import heroImage from "@src/assets/dashboard/hero.png";
import heroDarkImage from "@src/assets/dashboard/hero-dark.png";
import spinnerImg from "@src/assets/dashboard/spinner.png";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-stretch overflow-x-clip bg-screen pb-6 dark:bg-screen-dark md:min-h-[calc(100dvh-4.5rem)] md:flex-1 lg:flex-row lg:items-stretch lg:overflow-x-visible lg:overflow-y-visible lg:pb-0">
      {/* Spinner (auth only) */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-10000 w-50 max-w-[58vw] sm:w-65 md:w-80 lg:w-95"
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

      {/* Left — form: mobile p-4; md–lg symmetric px; lg+ only start bleed */}
      <div className="relative z-0 w-full shrink-0 p-4 md:px-6 md:pb-0 md:pt-1.5 lg:w-[45%] lg:px-0 lg:ps-6 lg:pt-1.5">
        <section className="flex min-h-min w-full flex-col rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 dark:border-white/30 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15 lg:w-[calc(100%+2.5rem)] lg:max-w-none">
          <SignUpForm />
        </section>
      </div>

      {/* Hero — md: same horizontal inset as form; lg: full-bleed column (match LoginPage) */}
      <section className="relative z-10 order-2 hidden w-full min-h-0 min-w-0 flex-1 flex-col px-4 pb-8 pt-4 md:px-6 md:flex lg:order-0 lg:w-[55%] lg:self-stretch lg:flex-none lg:p-0">
        <div className="relative min-h-0 min-w-0 w-full flex-1 overflow-hidden rounded-2xl lg:h-full lg:rounded-none">
          <Image
            src={heroImage}
            alt="Rayyan hero"
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-contain object-right-top dark:hidden"
            priority
          />
          <Image
            src={heroDarkImage}
            alt="Rayyan hero"
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="hidden object-contain object-right-top dark:block"
            priority
          />
        </div>
      </section>
    </div>
  );
}
