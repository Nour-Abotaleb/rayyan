import Image from "next/image";
import Link from "next/link";
import tool1Img from "@src/assets/dashboard/technical-section-img.png";

interface CapabilityRowProps {
  eyebrow: string;
  title: string;
  description: string;
  tags: readonly string[];
  image: typeof tool1Img;
  imageFirst?: boolean;
}

function CapabilityRow({
  eyebrow,
  title,
  description,
  tags,
  image,
  imageFirst = false,
}: CapabilityRowProps) {
  const imageBlock = (
    <div className="">
      <Image src={image} alt={title} className="h-auto w-full rounded-xl object-cover" />
    </div>
  );

  const textBlock = (
    <div className="flex flex-col h-full">
      <p className="text-sm md:text-base font-semibold uppercase tracking-[0.04em] text-[#656769]">
        {eyebrow}
      </p>
      <h3 className="mt-1 text-xl md:text-2xl max-w-md font-semibold leading-snug text-[#1A1615]">
        {title}
      </h3>
      <p className="mt-4 max-w-md text-sm leading-6 text-[#656769]">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-4">
        <Link
          href="/dashboard/proposals/new"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark tracking-[1px]"
        >
          Create First Proposal
        </Link>
        <button
          type="button"
          className="text-sm px-5 py-2 rounded-full font-medium text-black bg-[#F0F0F0]/50 border border-[#F0F0F0] transition-colors hover:text-primary tracking-[1px]"
        >
          Watch Demo
        </button>
      </div>
    {/* Tags */}
      <div className="mt-auto grid grid-cols-2 gap-2 md:gap-6 max-w-md">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#E4E2E2] px-3 py-2 text-sm text-[#1A1615] text-center flex items-center justify-center gap-3 text-nowrap"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12H20.25" stroke="#1A1615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6H20.25" stroke="#1A1615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18H20.25" stroke="#1A1615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.75 6L5.25 7.5L8.25 4.5" stroke="#1A1615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.75 12L5.25 13.5L8.25 10.5" stroke="#1A1615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.75 18L5.25 19.5L8.25 16.5" stroke="#1A1615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid items-start gap-8 md:gap-12 lg:grid-cols-2 lg:gap-18">
      {imageFirst ? imageBlock : textBlock}
      {imageFirst ? textBlock : imageBlock}
    </div>
  );
}

export default function HomeCapabilitiesSection() {
  return (
    <section className="layout-shell-x py-14 lg:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 md:gap-18">
        <CapabilityRow
          imageFirst
          eyebrow="Technical Power"
          title="Master Every RFP with Intelligent Insights"
          description="Rayyan doesn't just read; it comprehends. Our AI dives deep into complex RFP documents to extract hidden requirements and build a tailored technical methodology that hits every mark—saving you weeks of manual drafting."
          tags={["Smart RFP Extraction", "Custom Methodology", "Scope Alignment", "AI-Powered Drafting"]}
          image={tool1Img}
        />

        <CapabilityRow
          eyebrow="Professional Outputs"
          title="Impressive Financials, Delivered in Seconds"
          description="Move beyond basic spreadsheets. With our advanced BOQ engine and automated visualizations, you can generate stunning financial tables and interactive charts that build immediate trust."
          tags={["Advanced BOQ Engine", "Dynamic Analytics", "Precise Timelines", "One-Click PDF Export"]}
          image={tool1Img}
        />
      </div>
    </section>
  );
}
