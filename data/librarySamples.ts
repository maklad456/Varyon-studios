/**
 * Library Samples Data
 * 
 * Single source of truth for all library sample data.
 * All image paths point to WebP files in /samples/.../*.webp
 * 
 * Run `npm run samples:webp` after adding new images to convert to WebP.
 */

export type LibraryChapter = {
  id: string;
  name: string;
  before: string;
  after: string[];
};

export type LibrarySample = {
  slug: string;
  name: string;
  industry: string;
  categories: string[];
  blurb: string;
  description: string;
  coverImage: string;
  before: string;
  after: string[];
  // For brands with multiple chapters (like Lillyhome)
  chapters?: LibraryChapter[];
  // After image aspect ratio: "4:5" (default) or "1:1" (square like Anetos)
  afterAspectRatio?: "4:5" | "1:1";
  // Layout variant for this sample: "A", "B", "C", "D", or "E"
  layout?: "A" | "B" | "C" | "D" | "E";
};

export const librarySamples: LibrarySample[] = [
  {
    slug: "woodstreet",
    name: "Wood Street",
    industry: "Home Furniture",
    categories: ["Home Furniture", "Home Decor", "Outdoor Furniture"],
    blurb: "Furniture maker celebrating natural wood with handcrafted, customizable pieces.",
    description: "Wood Street's navigation lists categories for living room, bedroom, dining room, outdoor, and home décor & accessories, offering items like buffets, chairs, storage units, TV units and coffee tables. Their philosophy centers on crafting pieces that bring nature indoors, highlighting wood's textures and grain and allowing customization to suit client vision.",
    coverImage: "/samples/woodstreet/after/01.webp",
    before: "/samples/woodstreet/before.webp",
    after: [
      "/samples/woodstreet/after/01.webp",
      "/samples/woodstreet/after/02.webp",
      "/samples/woodstreet/after/03.webp",
      "/samples/woodstreet/after/04.webp",
    ],
  },
  {
    slug: "drowsy",
    name: "Drowzy",
    industry: "Home Furniture",
    categories: ["Home Furniture", "Home Decor", "Lighting", "Rugs", "Serveware & Tabletop"],
    blurb: "Homegrown Egyptian brand offering trendy, customizable home furniture and decor pieces.",
    description: "Drowzy sells furniture (sofas, seating, TV units, side and coffee tables) alongside decor items like vases, cushions, scented candles, wall hangings and lamps, plus rugs, trays and bowls. Founded by two architects, Drowzy aims to provide stylish yet affordable home accents and invites customers to customize colors and materials for accent pieces.",
    coverImage: "/samples/drowsy/after/01.webp",
    before: "/samples/drowsy/before.webp",
    after: [
      "/samples/drowsy/after/01.webp",
      "/samples/drowsy/after/02.webp",
      "/samples/drowsy/after/03.webp",
      "/samples/drowsy/after/04.webp",
    ],
    layout: "B",
  },
  {
    slug: "growpro",
    name: "GrowPro",
    industry: "Gardening & Urban Farming",
    categories: ["Gardening & Urban Farming", "Seeds & Growing Supplies", "Garden Supplies & Tools"],
    blurb: "Urban farming brand empowering communities to grow fresh, organic produce.",
    description: "GrowPro's shop covers seeds, seedlings, indoor and outdoor plants, soil substitutes, compost & fertilizers, pots & containers, tools and pest management. Beyond products, it offers workshops and urban farming resources, aiming to make urban farming accessible and sustainable while fostering community connections.",
    coverImage: "/samples/growpro/after/01.webp",
    before: "/samples/growpro/before.webp",
    after: [
      "/samples/growpro/after/01.webp",
      "/samples/growpro/after/02.webp",
      "/samples/growpro/after/03.webp",
      "/samples/growpro/after/04.webp",
    ],
  },
  {
    slug: "homehive",
    name: "Home Hive",
    industry: "Kitchenware & Cookware",
    categories: ["Kitchenware & Cookware", "Tableware & Drinkware", "Home Decor", "Home Accessories"],
    blurb: "Marketplace focusing on stylish yet affordable kitchen and home essentials.",
    description: "Home Hive's menu reveals \"Everyday Essentials\" covering dining ware, cookware, cups & mugs and wooden home items, with collections for dinner sets and new arrivals. Their home décor section features lamps and decorative pieces, and the company's mission is to supply a diverse range of kitchenware at competitive prices and become a premier kitchenware marketplace in Egypt.",
    coverImage: "/samples/homehive/after/01.webp",
    before: "/samples/homehive/before.webp",
    after: [
      "/samples/homehive/after/01.webp",
      "/samples/homehive/after/02.webp",
      "/samples/homehive/after/03.webp",
      "/samples/homehive/after/04.webp",
    ],
  },
  {
    slug: "kanso-living",
    name: "Kanso Living",
    industry: "Home Furniture",
    categories: ["Home Furniture", "Home Decor", "Lighting", "Tableware & Serveware"],
    blurb: "Minimalist home brand inspired by Japanese \"Kanso\" aesthetics and handcrafted woodwork.",
    description: "Kanso Living sells cane chairs, beech-wood seating and consoles, dining tables, cabinets and coffee tables. Its collection includes lighting, mirrors, wooden tableware and ceramic vases; the brand promotes simplicity and purity, offering handmade pieces that help customers achieve minimalist interiors.",
    coverImage: "/samples/kanso-living/after/01.webp",
    before: "/samples/kanso-living/before.webp",
    after: [
      "/samples/kanso-living/after/01.webp",
      "/samples/kanso-living/after/02.webp",
      "/samples/kanso-living/after/03.webp",
      "/samples/kanso-living/after/04.webp",
    ],
  },
  {
    slug: "lillyhome",
    name: "Lilly Home",
    industry: "Home Textiles",
    categories: ["Home Textiles", "Home Decor", "Lifestyle & Apparel", "Fragrance"],
    blurb: "Egyptian brand crafting home textiles, decor and clothing from premium Egyptian cotton.",
    description: "Lilly Home's \"Shop\" menu spans bedroom items (bedsheets, duvet covers, quilts, blankets), bathroom textiles (towels, bathrobes, bath mats), dining linens, and living products like furniture, rugs, trays, baskets and decorations. It also offers \"Lilly Wear\" accessories, lounge wear, beach wear, nightwear and footwear, plus fragrances and gift cards; their mission is to honor Egyptian cotton and craft quality home products that evoke comfort and storytelling.",
    coverImage: "/samples/lillyhome/after-1/01.webp",
    before: "/samples/lillyhome/before-1.webp",
    after: [
      "/samples/lillyhome/after-1/01.webp",
      "/samples/lillyhome/after-1/02.webp",
      "/samples/lillyhome/after-1/03.webp",
      "/samples/lillyhome/after-1/04.webp",
    ],
    chapters: [
      {
        id: "chapter-1",
        name: "Chapter 1: Cozy Evenings",
        before: "/samples/lillyhome/before-1.webp",
        after: [
          "/samples/lillyhome/after-1/01.webp",
          "/samples/lillyhome/after-1/02.webp",
          "/samples/lillyhome/after-1/03.webp",
          "/samples/lillyhome/after-1/04.webp",
        ],
      },
      {
        id: "chapter-2",
        name: "Chapter 2: Bright Mornings",
        before: "/samples/lillyhome/before-2.webp",
        after: [
          "/samples/lillyhome/after-2/01.webp",
          "/samples/lillyhome/after-2/02.webp",
          "/samples/lillyhome/after-2/03.webp",
          "/samples/lillyhome/after-2/04.webp",
        ],
      },
    ],
  },
  {
    slug: "masthal",
    name: "Mashtal Egypt",
    industry: "Gardening & Plants",
    categories: ["Gardening & Plants", "Seeds & Growing Supplies", "Garden Supplies & Tools"],
    blurb: "Comprehensive gardening marketplace supplying everything from plants to tools.",
    description: "Mashtal offers a vast plant selection (indoor plants, trees, shrubs, succulents and more), seeds (vegetable, herb, fruit), and themed plant sets. It also sells pots and planters, garden supplies (soils, fertilizers, tools, irrigation, pest control) and gift cards, striving to make gardening accessible for novices and professionals while supporting sustainability and local craftsmen.",
    coverImage: "/samples/masthal/after/01.webp",
    before: "/samples/masthal/before.webp",
    after: [
      "/samples/masthal/after/01.webp",
      "/samples/masthal/after/02.webp",
      "/samples/masthal/after/03.webp",
      "/samples/masthal/after/04.webp",
    ],
  },
  {
    slug: "mesh-mesh",
    name: "Mesh-Mesh",
    industry: "Luxury Fashion Accessories",
    categories: ["Luxury Fashion Accessories", "Handbags & Clutches", "Wearable Art"],
    blurb: "Innovative fashion brand turning digital sculptures into wearable art.",
    description: "Mesh-Mesh offers sculptural bags such as the Alhambra Bag and Sarāb Clutch, with each piece 3D-printed, hand-polished and dyed to blur the line between art and accessory. Its name reflects both the digital 'mesh' used in CAD and an Egyptian proverb meaning a chase after something elusive; the brand uses next-generation technology to create surreal forms unattainable by traditional methods.",
    coverImage: "/samples/mesh-mesh/after/01.webp",
    before: "/samples/mesh-mesh/before.webp",
    after: [
      "/samples/mesh-mesh/after/01.webp",
      "/samples/mesh-mesh/after/02.webp",
      "/samples/mesh-mesh/after/03.webp",
      "/samples/mesh-mesh/after/04.webp",
    ],
  },
  {
    slug: "nota-inspired-perfumes",
    name: "NOTA Perfumes",
    industry: "Fragrance",
    categories: ["Fragrance", "Beauty & Personal Care"],
    blurb: "Fragrance house providing affordable inspired perfumes for him and her.",
    description: "NOTA sells perfumes categorized \"For Her\", \"For Him\", and bundles, with a tagline inviting customers to explore enchanting aromas. The brand highlights best-selling scents, gift sets and promotional offers while emphasizing value and free delivery above a spending threshold.",
    coverImage: "/samples/nota-inspired-perfumes/after/01.webp",
    before: "/samples/nota-inspired-perfumes/before.webp",
    after: [
      "/samples/nota-inspired-perfumes/after/01.webp",
      "/samples/nota-inspired-perfumes/after/02.webp",
      "/samples/nota-inspired-perfumes/after/03.webp",
      "/samples/nota-inspired-perfumes/after/04.webp",
    ],
  },
  {
    slug: "rustic",
    name: "Rustic Egypt",
    industry: "Wellness",
    categories: ["Wellness", "Lifestyle", "Home Essentials"],
    blurb: "Wellness-driven lifestyle goods across sleep, kitchen, and bath.",
    description: "Rustic positions wellness as a lifestyle, spanning product lines across rest, kitchen, and bathroom essentials. Their catalog mixes practical self-care items with home-friendly lifestyle goods.",
    coverImage: "/samples/rustic/after/01.webp",
    before: "/samples/rustic/before.png",
    after: [
      "/samples/rustic/after/01.webp",
      "/samples/rustic/after/02.webp",
      "/samples/rustic/after/03.webp",
      "/samples/rustic/after/04.webp",
    ],
  },
  {
    slug: "tajaleyat",
    name: "Tajaleyat",
    industry: "Islamic Art",
    categories: ["Islamic Art", "Wall Art & Home Decor"],
    blurb: "Art studio crafting spiritual Islamic paintings with ancient techniques.",
    description: "Tajaleyat creates modern Islamic and brass paintings that blend Arabic calligraphy, gold leaf and ornate motifs. Their handcrafted pieces aim to bring the beauty and blessings of Islamic artistry into homes, combining spiritual significance with traditional craftsmanship.",
    coverImage: "/samples/tajaleyat/after/01.webp",
    before: "/samples/tajaleyat/before.webp",
    after: [
      "/samples/tajaleyat/after/01.webp",
      "/samples/tajaleyat/after/02.webp",
      "/samples/tajaleyat/after/03.webp",
      "/samples/tajaleyat/after/04.webp",
    ],
  },
  {
    slug: "anetos",
    name: "Anetos",
    industry: "Streetwear & Apparel",
    categories: ["Streetwear & Apparel", "Athleisure", "Youth Fashion"],
    blurb: "Egyptian streetwear label delivering comfy, expressive apparel for youth.",
    description: "Anetos' shop includes categories for jackets, off-shoulder tops, crew-neck knits, sweatpants, hoodies and puffer jackets, with collections showcasing hooded zip jackets, off-shoulder tees and joggers. Born from a bedroom dream to offer accessible alternatives to overpriced streetwear, the brand focuses on comfort and authenticity, releasing seasonal drops and aiming to share Egyptian creativity with the world.",
    coverImage: "/samples/anetos/after/01.webp",
    before: "/samples/anetos/before.webp",
    after: [
      "/samples/anetos/after/01.webp",
      "/samples/anetos/after/02.webp",
      "/samples/anetos/after/03.webp",
      "/samples/anetos/after/04.webp",
    ],
    afterAspectRatio: "1:1",
  },
];

// Helper function to get a sample by slug
export function getLibrarySampleBySlug(slug: string): LibrarySample | undefined {
  return librarySamples.find((sample) => sample.slug === slug);
}

// Get all unique industries
export function getLibraryIndustries(): string[] {
  return [...new Set(librarySamples.map((s) => s.industry))];
}

// Get all unique categories
export function getLibraryCategories(): string[] {
  return [...new Set(librarySamples.flatMap((s) => s.categories))];
}

