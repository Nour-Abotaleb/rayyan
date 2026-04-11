import Image from "next/image";
import heroImage from "@src/assets/dashboard/hero.png";
import heroDarkImage from "@src/assets/dashboard/hero-dark.png";
import spinnerImg from "@src/assets/dashboard/spinner.png";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-stretch overflow-x-clip bg-screen dark:bg-screen-dark lg:min-h-[calc(100dvh-4.5rem)] lg:flex-row lg:items-stretch lg:overflow-x-visible lg:overflow-y-visible">
      {/* Spinner (auth only) */}
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

      <div className="relative z-0 w-full ps-6 pt-1.5 lg:w-[45%]">
        <section className="flex w-full flex-col rounded-2xl border border-white bg-gradient-to-br from-white/40 from-[65%] to-[#D9FFFA] lg:w-[calc(100%+2.5rem)] lg:max-w-none">
          <SignUpForm />
        </section>
      </div>

      <section className="relative z-10 order-2 w-full px-4 pb-8 pt-4 lg:order-none lg:min-h-0 lg:w-[55%] lg:self-stretch lg:p-0">
        <div className="relative min-h-[45vh] w-full overflow-hidden rounded-2xl lg:h-full lg:min-h-0 lg:rounded-none">
          <Image
            src={heroImage}
            alt="Rayyan hero"
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-contain object-top dark:hidden"
            priority
          />
          <Image
            src={heroDarkImage}
            alt="Rayyan hero"
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="hidden object-contain object-top dark:block"
            priority
          />
        </div>
      </section>
    </div>
  );
}
