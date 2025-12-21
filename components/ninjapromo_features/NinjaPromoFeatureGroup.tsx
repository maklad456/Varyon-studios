"use client";

import { NinjaPromoNewGenerationBand } from "./NinjaPromoNewGenerationBand";
import { NinjaPromoChallengesBand } from "./NinjaPromoChallengesBand";
import { NinjaPromoIndustryBand } from "./NinjaPromoIndustryBand";

export function NinjaPromoFeatureGroup() {
  return (
    <section id="ninjapromo-features" className="bg-white py-16">
      <div className="mx-auto max-w-[1200px] space-y-24 px-4 sm:px-6 lg:px-8">
        <NinjaPromoNewGenerationBand />
        <NinjaPromoChallengesBand />
        <NinjaPromoIndustryBand />
      </div>
    </section>
  );
}



