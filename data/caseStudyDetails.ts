export type CaseStudyDetail = {
  slug: string;
  summary: string;
  problem: string;
  whatWeDid: string;
  deliverables: string;
  outcome: string;
  imagePlaceholders: string[];
};

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "discovery-homes": {
    slug: "discovery-homes",
    summary:
      "Discovery Homes needed buyers to feel a home that didn't physically exist yet. We built a launch-ready visual library from floor plans + early renders, then expanded it into photoreal spaces, finishes, locations, and real-life moments.",
    problem:
      "Discovery Homes needed to sell multiple modular models and custom builds before construction. They had floor plans and a small set of early renders, but needed visuals that communicated:\n- real interior flow (kitchen, living, bedrooms, loft/mezzanine)\n- finish and style options buyers could choose from\n- believable exterior placement (mountains, lakes, resort-style settings)\n- people enjoying the space (to create scale + lifestyle context)",
    whatWeDid:
      "1) Visual system (so everything feels like one premium shoot)\nWe defined a consistent visual language: lighting rules, styling taste, camera behavior, and \"reality constraints\" so the library stays coherent even across different models, finishes, and environments.\n\n2) Floor plan → believable spaces\nWe translated 2D plans into interiors/exteriors with accurate proportions and livability—then refined them through human finishing so materials, shadows, and reflections read as real.\n\n3) Render → realism upgrade (when client renders existed)\nFor models that already had renders, we used them as a base and pushed them toward photoreal: improved materials, added natural imperfections, and inserted real-life elements (props + people) without breaking the architecture.\n\n4) Location + lifestyle scenarios\nWe produced multiple exterior worlds (mountains, modern compounds, nature-facing lots) and interior styling variations so buyers can instantly imagine ownership.",
    deliverables:
      "- Web-ready hero visuals (multiple angles + key rooms)\n- Finish/style variants per model (so sales can match the customer's choices)\n- Interior/exterior sets + community/compound concepts (multi-unit scenes)\n- People-in-space variants for warmth, scale, and trust\n- Optimized exports for web + listings + ads (poster-friendly, fast-loading)",
    outcome:
      "A launch-ready library that sells homes before build, makes finishes understandable, and reduces friction in buyer imagination while keeping architectural credibility intact.",
    imagePlaceholders: [
      "Exterior world (mountain setting) — 4:5 placeholder",
      "Interior kitchen — 4:5 placeholder",
      "Interior living — 4:5 placeholder",
      "Loft/mezzanine — 4:5 placeholder",
      "Compound concept (multi-unit) — 4:5 placeholder",
      "Finish variants — 4:5 placeholder",
    ],
  },
  "zee-plexiglass-designs": {
    slug: "zee-plexiglass-designs",
    summary:
      "Zee had 200+ plexiglass products and needed a massive image library — but studio logistics and reshooting every size/color/finish was unrealistic. We built a scalable system that generated lifestyle + studio-ready visuals and created missing variants from limited source frames.",
    problem:
      "- 200+ SKUs with multiple sizes and finishes\n- 2,000+ images needed to keep the store consistent and conversion-ready\n- Traditional studio shooting would require shipping, staging, and reshooting every variant\n- Many products didn't have clean \"starting frames\" online, and some variants didn't exist visually at all",
    whatWeDid:
      "1) Built a consistent interior world (brand taste)\nWe created modern, quiet-luxury interiors inspired by Gigi Abdelhamid–style spaces: warm neutrals, premium surfaces, and clean styling so the product remains the hero.\n\n2) Variant expansion (the \"matrix\")\nWhen only one good image existed for a product, we used it to reliably generate:\n- additional sizes (same design, correct proportions)\n- finish/color variants (white/black/clear; metallic gold/silver; matte vs reflective where applicable)\n- multiple angles + placements per variant\nThis turned \"1 usable starting frame\" into a full SKU-ready set.\n\n3) Solved missing or weak inputs with smart sourcing\nWhen the website didn't have a workable base image, we used quick phone shots as inputs, then rebuilt the product cleanly through the pipeline and finished it to match the system.\n\n4) Human finishing for realism + fidelity\nEvery output was cleaned and optimized so edges, reflections, material density, and proportions stay consistent across the catalog.",
    deliverables:
      "- Large-scale product library built for web conversion (lifestyle + clean shots + select studio shots)\n- Variant coverage across sizes and finishes (without reshooting every SKU)\n- Consistent \"one photoshoot\" look across hundreds of products\n- Web-optimized outputs for PDPs, collections, and banners",
    outcome:
      "A catalog that matches the brand's taste at scale — delivered without shipping products to a studio, and without the cost of producing physical variants.",
    imagePlaceholders: [
      "Quiet-luxury lifestyle scene — 4:5 placeholder",
      "Studio shot — 4:5 placeholder",
      "Variant grid (sizes/colors) — 4:5 placeholder",
      "Close-up detail (edge/knob) — 4:5 placeholder",
      "PDP hero shot — 4:5 placeholder",
    ],
  },
  woodworkers: {
    slug: "woodworkers",
    summary:
      "Woodworkers needed visuals that sell across multiple product types: electrical panel covers, wall art, and detailed world maps with accessories. We produced lifestyle scenes that match buyer intent + created installation visuals to remove friction.",
    problem:
      "- Wide product range with different buyer intents (decor vs functional covers vs hobby/collector pieces)\n- Needed premium lifestyle visuals and clear installation guidance\n- Must work for Egypt audiences and international shoppers (different rooms, tastes, and \"use cases\")",
    whatWeDid:
      "1) Buyer-intent scene design (not random lifestyle)\nWe designed each setup around who buys it and where it belongs, so customers instantly imagine it in their own space.\n\n2) Category coverage with one cohesive system\nWe kept consistent styling rules across categories while tailoring each product to its natural environment (living rooms, offices, gaming corners, travel corners).\n\n3) Installation visuals (reduce objections)\nFor products like electrical panel covers and complex installs (including maps), we translated the installation process into clear, step-by-step visuals: positioning, mounting logic, and final finish.\n\n4) Detail + \"how it's used\" shots\nFor world maps, we added usage storytelling (pins, travel tracking) so the product reads as a long-term personal object—not just wall decor.",
    deliverables:
      "- Lifestyle image sets across key categories (panel covers, world maps, wall art, rustic art pieces)\n- Open/closed + detail macros where relevant\n- Installation visuals designed to reduce hesitation\n- A cohesive library that still feels varied across rooms and audiences",
    outcome:
      "A consistent premium library that sells, explains, and reduces buyer hesitation—across a wide catalog and multiple audiences.",
    imagePlaceholders: [
      "Electrical panel cover — closed state — 4:5 placeholder",
      "Electrical panel cover — open state — 4:5 placeholder",
      "Installation step — 4:5 placeholder",
      "World map hero — 4:5 placeholder",
      "World map pins usage — 4:5 placeholder",
      "Wall art lifestyle — 4:5 placeholder",
      "Rustic art piece — 4:5 placeholder",
      "Gaming-themed wall art scene — 4:5 placeholder",
    ],
  },
  mehos: {
    slug: "mehos",
    summary:
      "Mehos wanted buyers to feel the scent and results through the screen. We built a world-per-product system and delivered a full campaign pack: videos, product worlds, web banners, and carousel designs.",
    problem:
      "- Needed a premium visual identity across website + social\n- Each scent/mood needed its own world (not a generic template)\n- Required both persuasion (storytelling) and clarity (how-to + results)\n- Revision cycles were high because the taste bar was extremely specific",
    whatWeDid:
      "1) World-per-product visual system\nEach product got a distinct world built from:\n- color environment + props that communicate scent/mood\n- consistent lighting and composition rules to keep the brand cohesive\n- sensory cues (texture, softness, freshness) without looking artificial\n\n2) 4-shot image structure per item\nFor each product/bundle we produced a repeatable set:\n- Product in its world (hero lifestyle)\n- Texture / smear / dollop shot\n- Model smiling holding product\n- Scrub on skin / results visual\n\n3) Video campaign production (10 videos)\n- 3 storytelling videos (emotion + transformation)\n- 5 ASMR videos (texture, sound, sensory satisfaction)\n- 2 educational videos (how/when to use, friction reduction)\nPlus: on-brand images for carousel posts to match the video campaign.\n\n4) Human finishing + delivery optimization\nWe refined realism, skin texture, lighting continuity, and export formats for web/social.",
    deliverables:
      "- Images: 168+ product-world visuals + website hero/collection visuals\n- Videos: 10 campaign videos (storytelling + ASMR + educational)\n- Social-ready carousel designs + consistent sizing/exports",
    outcome:
      "A cohesive campaign system that makes Mehos feel tangible: you can sense the product through the visuals, understand usage, and trust the results.",
    imagePlaceholders: [
      "Lavender world — 4:5 placeholder",
      "Texture smear shot — 4:5 placeholder",
      "Model holding product — 4:5 placeholder",
      "Scrub on skin/results — 4:5 placeholder",
      "Website hero banner crop — placeholder",
      "ASMR frame — placeholder",
      "Storytelling frame — placeholder",
      "Educational frame — placeholder",
    ],
  },
};
