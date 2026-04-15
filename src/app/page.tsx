import HomeHeroSection from "@/features/home/components/HomeHeroSection";
import HomeBuiltSection from "@/features/home/components/HomeBuiltSection";
import HomeCapabilitiesSection from "@/features/home/components/HomeCapabilitiesSection";
import HomeCommunitySection from "@/features/home/components/HomeCommunitySection";
import HomeFooterSection from "@/features/home/components/HomeFooterSection";
import HomePricingSection from "@/features/home/components/HomePricingSection";
import HomeInsightsSection from "@/features/home/components/HomeInsightsSection";
import HomeSecondSection from "@/features/home/components/HomeSecondSection";
import HomeTestimonialsSection from "@/features/home/components/HomeTestimonialsSection";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#f9f9f9]">
      <HomeHeroSection />
      <HomeSecondSection />
      <HomeCapabilitiesSection />
      <HomeBuiltSection />
      <HomeTestimonialsSection />
      <HomePricingSection />
      <div className="relative bg-gradient-to-b from-[#F9F9F9] from-[5%] via-[#C6DBD9] to-[#B7D4D1]">
        <HomeInsightsSection />
        <HomeCommunitySection />
        <HomeFooterSection />
      </div>
    </main>
  );
}
