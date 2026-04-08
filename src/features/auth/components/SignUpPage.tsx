import Image from "next/image";
import heroImage from "@src/assets/dashboard/hero.png";
import heroDarkImage from "@src/assets/dashboard/hero-dark.png";
import shadowImage from "@src/assets/dashboard/shadow.png";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-stretch overflow-x-clip bg-screen dark:bg-screen-dark lg:min-h-[calc(100dvh-4.5rem)] lg:flex-row lg:items-stretch lg:overflow-x-visible lg:overflow-y-visible">
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] flex justify-center">
        <Image
          src={shadowImage}
          alt=""
          aria-hidden="true"
          className="h-auto w-full max-w-[900px] object-contain mix-blend-multiply"
          priority
        />
      </div>

      <div className="relative z-0 w-full ps-6 pt-1.5 lg:w-[45%]">
        <section className="flex w-full flex-col rounded-2xl border border-white bg-gradient-to-br from-white/40 from-[35%] to-[#D1E4E2]/50 lg:w-[calc(100%+2.5rem)] lg:max-w-none">
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
