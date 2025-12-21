import { notFound } from "next/navigation";
import { FeatureCaseStudyAltitude } from "@/components/altitudemarketing_features/FeatureCaseStudyAltitude";
import {
  altitudeCaseStudies,
  getCaseStudyBySlug,
} from "@/data/caseStudies/altitudeCaseStudies";

interface CaseStudyPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return altitudeCaseStudies.map((study) => ({ slug: study.slug }));
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <FeatureCaseStudyAltitude caseStudy={caseStudy!} />
    </main>
  );
}



