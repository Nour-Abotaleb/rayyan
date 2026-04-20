import Image from "next/image";
import insightsImage from "@src/assets/dashboard/insights-section-img.png";
import tool1 from "@src/assets/dashboard/tool1.png";
import tool2 from "@src/assets/dashboard/tool2.png";
import tool3 from "@src/assets/dashboard/tool3.png";

const miniCards = [
  {
    title: "Top 5 Features Every Technical Proposal Needs",
    image: tool3,
    badge: "VIDEO",
  },
  {
    title: "Mastering BOQ Accuracy: A Guide to Precision",
    image: tool2,
    badge: "NEW",
  },
  {
    title: "RFP Compliance: How to Avoid Rejections",
    image: tool1,
    badge: "TIPS",
  },
] as const;

export default function HomeInsightsSection() {
  return (
    <section className="layout-shell-x pb-10 md:pb-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-sm md:text-base font-semibold text-[#656769]">
            Bid Insights &amp; Strategies
          </p>
          <h3 className="mx-auto mt-2 max-w-xl text-base sm:text-lg md:text-2xl font-semibold leading-snug text-[#1A1615]">
            Master the art of tendering with our expert guides and AI-driven
            procurement strategies.
          </h3>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white/70 p-3">
        <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-center">

        {/* Left Image */}
        <div className="w-full md:w-[50%] overflow-hidden rounded-2xl">
          <Image
            src={insightsImage}
            alt="Featured article"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-[50%] ps-4 h-full">
          {/* Badge */}
          <span className="inline-block rounded-full bg-[#58A19A] px-3 py-2 text-xs font-semibold text-white">
            FEATURED POST
          </span>

          {/* Title */}
          <h4 className="mt-3 max-w-xl text-xl md:text-2xl lg:text-3xl font-semibold text-[#1A1615] leading-snug">
            The Future of Government Tendering in 2026
          </h4>

          {/* Description */}
          <p className="mt-3 text-sm md:text-base text-[#656769] leading-relaxed pb-12 md:pb-18">
            Discover how AI is reshaping technical methodologies and how your firm can maintain a competitive edge in a rapidly evolving digital procurement landscape.
          </p>

          {/* Author */}
          <div className="mt-6 flex items-center justify-between pe-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 border-2 border-white rounded-full bg-gray-300" />
              <div>
                <p className="text-sm font-semibold text-[#1A1615]">
                  Martha Punla
                </p>
                <p className="text-xs text-[#757170]">
                  VP Marketing, Meta
                </p>
              </div>
            </div>

            <span className="rounded-full bg-[#C9502E] px-3 lg:px-4 py-2 text-[10px] font-semibold text-white">
              FEATURED
            </span>
          </div>
        </div>

      </div>
    </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {miniCards.map((card) => (
            <article key={card.title} className="">
              <Image
                src={card.image}
                alt={card.title}
                className="h-[210px] md:h-auto w-full rounded-2xl object-cover"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-lg md:text-xl font-semibold text-[#1A1615]">{card.title}</p>
                <span className="rounded-full bg-[#156CC2] px-2 py-1.5 text-xs font-semibold text-white tracking-[0.2px]">
                  {card.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
