import HomeContactHeroSection from "@/features/home/components/HomeContactHeroSection";
import HomeCommunitySection from "@/features/home/components/HomeCommunitySection";
import HomeFooterSection from "@/features/home/components/HomeFooterSection";
import HomeTestimonialsSection from "@/features/home/components/HomeTestimonialsSection";

export default function ContactPage() {
  return (
    <main className="flex flex-col bg-[#f9f9f9] dark:bg-[#161616]">
      <HomeContactHeroSection />
      <HomeTestimonialsSection />
      <div className="relative bg-gradient-to-b from-[#F9F9F9] from-[5%] via-[#C6DBD9] to-[#B7D4D1] dark:bg-none dark:from-transparent dark:via-transparent dark:to-transparent">
        <HomeCommunitySection />
        <HomeFooterSection />
      </div>
    </main>
  );
}
