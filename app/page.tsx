import Link from "next/link";
import { FeatureBrand } from "@/components/thekeenfolks_features/FeatureBrand";
import { NinjaPromoFeatureGroup } from "@/components/ninjapromo_features";
import FeatureAIMediaDifferent from "@/components/aimediagroup_features/FeatureAIMediaDifferent";
import { FeatureMetrics } from "@/components/matrixmarketing_features/FeatureMetrics";
import { altitudeCaseStudies } from "@/data/caseStudies/altitudeCaseStudies";

const daelight = altitudeCaseStudies[0];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200">
        <FeatureBrand />
      </section>

      <section className="border-b border-gray-100">
        <NinjaPromoFeatureGroup />
      </section>

      <section className="border-b border-gray-100">
        <FeatureAIMediaDifferent />
      </section>

      <section className="border-b border-gray-100">
        <FeatureMetrics />
      </section>

      <section className="border-b border-gray-100 bg-neutral_light">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Case study highlight
          </p>
          <h3 className="text-3xl font-bold text-gray-900">{daelight.title}</h3>
          <p className="text-base text-gray-600">{daelight.summary}</p>
          <Link
            href={`/case-study/${daelight.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent_orange px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-accent_orange_alt"
          >
            View Daelight story →
          </Link>
        </div>
      </section>
    </main>
  );
}
