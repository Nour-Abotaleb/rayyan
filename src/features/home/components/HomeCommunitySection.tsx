import Link from "next/link";
import Image from "next/image";
import xIcon from "@src/assets/dashboard/xicon.svg";
import youtubeIcon from "@src/assets/dashboard/youtube.svg";

export default function HomeCommunitySection() {
  return (
    <section className="layout-shell-x pb-14 pt-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* <div className="text-center">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            Built for Proposal Professionals.
          </p>
          <h3 className="mx-auto mt-2 max-w-2xl text-2xl font-semibold leading-snug text-zinc-900 md:text-3xl">
            Empowering your team with the tools needed to win complex
            government tenders.
          </h3>
        </div> */}

        {/* <div className="mx-auto mt-7 grid max-w-3xl gap-4 md:grid-cols-2">
          <article className="rounded-xl bg-white p-4">
            <div className="flex items-center justify-between">
              <Image src={xIcon} alt="X" className="h-5 w-5" />
              <span className="text-[10px] text-zinc-500">15.2K FOLLOWERS</span>
            </div>
            <h4 className="mt-3 text-lg font-semibold text-zinc-900">X/Twitter</h4>
            <p className="mt-2 text-xs text-zinc-600">
              Tips, updates and news for teams who discover better tendering with
              Rayyan inside.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-zinc-800"
            >
              Follow us
            </button>
          </article>

          <article className="rounded-xl bg-white p-4">
            <div className="flex items-center justify-between">
              <Image src={youtubeIcon} alt="YouTube" className="h-5 w-5" />
              <span className="text-[10px] text-zinc-500">10K SUBSCRIBERS</span>
            </div>
            <h4 className="mt-3 text-lg font-semibold text-zinc-900">YouTube</h4>
            <p className="mt-2 text-xs text-zinc-600">
              Tips, tutorials, and in-depth feature guides to inspire and
              enhance your drafting workflow.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-zinc-800"
            >
              Subscribe
            </button>
          </article>
        </div> */}

        <div className="mt-10 text-center">
          <h3 className="text-4xl font-semibold tracking-tight text-[#1A1615] md:text-6xl">
            All Your Documents.
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[#453F3D] leading-relaxed">
            Upload, analyze, and manage your files with intelligent tools
            designed to simplify your workflow and boost productivity.
          </p>
          {/* Buttons */}
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
      </div>
    </section>
  );
}
