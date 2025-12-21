export type CaseStudyMetric = {
  label: string;
  value: string;
  suffix?: string;
};

export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  industryLabel: string;
  title: string;
  summary: string;
  logoSrc?: string;
  heroImageSrc?: string;
  challenge: CaseStudySection;
  solution: CaseStudySection;
  metrics: CaseStudyMetric[];
};

export const altitudeCaseStudies: CaseStudy[] = [
  {
    slug: "daelight",
    clientName: "Daelight Solutions",
    industryLabel: "Life sciences transformation",
    title: "Rebuilding Daelight’s pipeline engine around measurable outcomes.",
    summary:
      "Varyon Studios partnered with Daelight to reposition its platform, build a content engine for regulated buyers, and design a revenue dashboard trusted by CROs and procurement teams alike.",
    challenge: {
      heading: "The Challenge",
      body: [
        "Daelight needed to move past one-off project work and become the go-to commercialization partner for pharma innovators.",
        "Sales, marketing, and product teams worked in silos; brand trust was eroding even though outcomes were strong.",
      ],
    },
    solution: {
      heading: "The Solution",
      body: [
        "Conducted stakeholder labs across R&D, go-to-market, and compliance to align language and proof points.",
        "Launched a narrative platform focused on measurable implementation wins with long-form case studies, motion design explainers, and field-ready leave-behinds.",
        "Built a live ROI cockpit connecting CRM, project management, and profitability data—unlocking weekly leadership rituals.",
        "Deployed an ABM program orchestrating pharma-specific pods across North America and EMEA, unifying outreach and experiential activations.",
      ],
    },
    metrics: [
      { label: "Revenue growth", value: "9x" },
      { label: "Enterprise wins", value: "5", suffix: "+" },
      { label: "Pipeline velocity", value: "-43%", suffix: " cycle time" },
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return altitudeCaseStudies.find((study) => study.slug === slug);
}



