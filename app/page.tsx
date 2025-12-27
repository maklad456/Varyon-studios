import { HeroSection } from "@/components/home/HeroSection";
import { ChallengeSplit } from "@/components/home/ChallengeSplit";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { LibraryTeaserSection } from "@/components/home/LibraryTeaserSection";
import { NewGenerationSection } from "@/components/home/NewGenerationSection";
import { DiscoveryCallSection } from "@/components/home/DiscoveryCallSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="bg-vs-bgLight">
      <HeroSection />
      <ChallengeSplit />
      <CapabilitiesSection />
      <ProcessSection />
      <LibraryTeaserSection />
      <DiscoveryCallSection />
      <NewGenerationSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
