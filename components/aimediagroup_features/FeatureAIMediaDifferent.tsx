"use client";

import { AIMGCardCluster } from "./AIMGCardCluster";
import { AIMGVideoBand } from "./AIMGVideoBand";
import { AIMGCapabilitiesGrid } from "./AIMGCapabilitiesGrid";
import { AIMGFaqAccordion } from "./AIMGFaqAccordion";

export default function FeatureAIMediaDifferent() {
  return (
    <section
      id="feature-aimediagroup-different"
      className="w-full bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] space-y-16 px-6 md:px-10 lg:px-12 md:space-y-20">
        <AIMGCardCluster />
        <AIMGVideoBand />
        <AIMGCapabilitiesGrid />
        <AIMGFaqAccordion />
      </div>
    </section>
  );
}



