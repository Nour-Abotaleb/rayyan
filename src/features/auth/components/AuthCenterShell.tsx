import Image from "next/image";
import spinnerImg from "@src/assets/dashboard/spinner.png";

/** Centered auth card (forgot / reset): same visual treatment as login form panel, no hero. */
export default function AuthCenterShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-x-clip bg-screen px-4 py-8 pb-10 dark:bg-screen-dark md:min-h-dvh md:flex-1 md:px-6 lg:overflow-x-visible lg:overflow-y-visible">
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

      <div className="relative z-0 w-full max-w-xl shrink-0 lg:w-[45%] lg:max-w-2xl">
        <section className="flex w-full flex-col rounded-2xl border border-white bg-linear-to-br from-white/35 from-65% to-[#D9FFFA]/50 dark:border-white/30 dark:bg-linear-to-br dark:from-white/5 dark:from-65% dark:to-[#D9FFFA]/50/15">
          {children}
        </section>
      </div>
    </div>
  );
}
