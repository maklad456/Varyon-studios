export type CaseStudy = {
  slug: string;
  name: string;
  tag: string;
  problem: string;
  approach: string;
  outcome: string;
};

export type BeforeAfterItem = {
  label: string;
  format: string;
  beforeSrc: string;
  afterSrc: string;
};

export const heroLogos = [
  "Woodworkers",
  "Zee Plexiglass Designs",
  "Discovery Homes",
];

export const challengeLeft = [
  "Hauling products, booking studios, coordinating teams.",
  "Paying for locations, models, sets and post-production.",
  "Inconsistent quality between campaigns and seasons.",
  "Studio shots that look good but don’t actually sell the feeling of the product.",
];

export const challengeRight = [
  "You send a few good mobile photos or references.",
  "We design the scenes: interiors, models, locations, impossible angles.",
  "You get cinematic images and videos ready for your website, ads and socials.",
  "Zero logistics. Lower cost. Ideas that would be impossible or too expensive to film in real life.",
];

export const capabilities = [
  {
    title: "Product-only on clean backgrounds",
    body: "Perfectly lit, high-consistency imagery for PDPs, marketplaces and configurators.",
  },
  {
    title: "Lifestyle & in-use scenes",
    body: "Scenes that sell the feeling of owning your product, not just the object itself.",
  },
  {
    title: "On-model fashion & people shots",
    body: "Human storytelling without casting, travel or wardrobe headaches.",
  },
  {
    title: "CGI / impossible angles & locations",
    body: "Gravity-defying hero shots, cutaways and exploded views your competitors can’t film.",
  },
  {
    title: "Detail & macro shots",
    body: "Bring textures, stitching and material stories to life for discerning buyers.",
  },
  {
    title: "Cinematic campaign videos",
    body: "Launch films and loops built for paid social, retail screens and immersive websites.",
  },
];

export const processSteps = [
  {
    title: "Brief & strategy",
    body: "You tell us who you’re selling to, where assets will live, and what feels \"on brand\". We study your market and what leading players in your category are doing.",
  },
  {
    title: "Scene design & generation",
    body: "We design interiors, models, locations and camera angles that sell the product feeling. Every pixel is reviewed so nothing looks AI plasticky.",
  },
  {
    title: "Refine & deliver",
    body: "We iterate on your favourite directions and deliver full-res assets, ready for your website, ads manager or content calendar.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "woodworkers",
    name: "Woodworkers",
    tag: "Home furniture & electrical",
    problem:
      "Needed lifestyle images and installation shots for electrical panel covers and decor pieces across Egypt and international markets.",
    approach:
      "Designed interiors tailored to different audiences, created open/closed panel shots, installation visuals and detail macros.",
    outcome:
      "A full library of visuals that feel premium, on-brand and consistent across two websites.",
  },
  {
    slug: "zee-plexiglass",
    name: "Zee Plexiglass Designs",
    tag: "Home accessories / e-commerce",
    problem:
      "200+ plexiglass products and 1,500+ images needed. Logistics and studio costs made a traditional shoot unrealistic.",
    approach:
      "Built modern interiors inspired by Gigi Abdelhamid’s style, generated missing product variations and multiple lifestyle views per SKU.",
    outcome:
      "A catalogue that finally matches the brand’s taste — without ever shipping products to a studio.",
  },
  {
    slug: "discovery-homes",
    name: "Discovery Homes",
    tag: "Modular homes",
    problem:
      "Needed to show modular homes that hadn’t been built yet, in different finishes, locations and furnishing styles.",
    approach:
      "Turned 2D floor plans into interior/exterior visuals, delivered multiple finishing styles and exterior environments with people enjoying the spaces.",
    outcome:
      "A launch-ready visual library that would have cost a fortune to build and shoot physically.",
  },
];

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    label: "Coffee table",
    format: "Website hero",
    beforeSrc: "/media/before-after/before-1.jpg",
    afterSrc: "/media/before-after/after-1.jpg",
  },
  {
    label: "Modular lighting",
    format: "Paid social carousel",
    beforeSrc: "/media/before-after/before-2.jpg",
    afterSrc: "/media/before-after/after-2.jpg",
  },
  {
    label: "Kitchen appliance",
    format: "Product detail page",
    beforeSrc: "/media/before-after/before-3.jpg",
    afterSrc: "/media/before-after/after-3.jpg",
  },
];

export const faqItems = [
  {
    question: "Will people be able to tell it’s AI?",
    answer:
      "Not if it’s done right. We focus on lighting, scale, realism and brand feel so the images look like high-end photography, not filters.",
  },
  {
    question: "What do you need from us to start?",
    answer:
      "A few mobile photos of your products, a short brief about your brand and audience, and where the content will live. We handle the rest.",
  },
  {
    question: "How fast can we get the first sample?",
    answer:
      "For qualified brands, we deliver a free sample concept very quickly so you can see the direction before committing.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Simple per-image or per-video base rates, with aggressive discounts past 300+ and 1,000+ images. Videos are scoped based on scenes and complexity.",
  },
  {
    question: "Can you match our existing brand guidelines?",
    answer:
      "Yes. We work with your fonts, palettes, target markets and existing campaigns so nothing feels off when you swap in the new visuals.",
  },
];

export const discoveryHoverPills = [
  "Launch calendars",
  "SKU libraries",
  "Campaign beats",
  "Retail moments",
  "DTC drops",
  "Product storytelling",
];
