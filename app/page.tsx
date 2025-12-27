import { HeroSection } from "@/components/home/HeroSection";
import { ChallengeSplit } from "@/components/home/ChallengeSplit";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { VideoCapabilitySection } from "@/components/home/VideoCapabilitySection";
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
      <div className="snapStop">
        <HeroSection />
      </div>
      <div className="snapStop">
        <ChallengeSplit />
      </div>
      <div className="snapStop">
        <CapabilitiesSection />
      </div>
      <div className="snapStop">
        <VideoCapabilitySection />
      </div>
      <div className="snapStop">
        <ProcessSection />
      </div>
      <div className="snapStop">
        <LibraryTeaserSection />
      </div>
      <div className="snapStop">
        <DiscoveryCallSection />
      </div>
      <div className="snapStop">
        <FaqSection />
      </div>
      <div className="snapStop">
        <FinalCtaSection />
      </div>
    </div>
  );
}
