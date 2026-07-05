export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  scent: string;
  notes: string[];
  description: string;
  image: string;
  images: string[];
  collection: "Signature" | "Limited";
  burnTime: string;
  weight: string;
  isFeatured?: boolean;
}

const BASE = "https://images.unsplash.com";

export const products: Product[] = [
  {
    id: "rio-noche",
    slug: "rio-noche",
    name: "Río Noche",
    price: 28,
    scent: "Cedarwood · Black Pepper · Amber Resin",
    notes: ["Cedarwood", "Black Pepper", "Amber Resin", "Dry Earth"],
    description:
      "A deep, unhurried scent inspired by late summer nights beside the river. The cedar breathes through smoke and warmth, grounded by the slow burn of amber.",
    image: `${BASE}/photo-1561212856-44e9bae482aa?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1561212856-44e9bae482aa?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1708382981950-b4d56654bcaa?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Signature",
    burnTime: "50–55 hours",
    weight: "8 oz",
    isFeatured: true,
  },
  {
    id: "polvo-de-canela",
    slug: "polvo-de-canela",
    name: "Polvo de Canela",
    price: 28,
    scent: "Cinnamon Bark · Clove · Vanilla Smoke",
    notes: ["Cinnamon Bark", "Clove", "Vanilla Smoke", "Dark Rum"],
    description:
      "Warm, spiced, and a little dangerous. The kind of kitchen your grandmother had on a cold morning — but at night, with a glass of something.",
    image: `${BASE}/photo-1601922046210-41e129a3e64a?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1601922046210-41e129a3e64a?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1561212856-44e9bae482aa?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Signature",
    burnTime: "50–55 hours",
    weight: "8 oz",
    isFeatured: true,
  },
  {
    id: "tierra-santa",
    slug: "tierra-santa",
    name: "Tierra Santa",
    price: 28,
    scent: "Sage · Copal · Desert Stone",
    notes: ["White Sage", "Copal Resin", "Desert Stone", "Palo Santo"],
    description:
      "Smoke and earth from the high desert. Copal resin burning on stone, the smell of sage after a brief rain. Clean and a little sacred.",
    image: `${BASE}/photo-1528351655744-27cc30462816?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1528351655744-27cc30462816?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1601922046210-41e129a3e64a?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Signature",
    burnTime: "50–55 hours",
    weight: "8 oz",
    isFeatured: true,
  },
  {
    id: "lluvia-de-marzo",
    slug: "lluvia-de-marzo",
    name: "Lluvia de Marzo",
    price: 32,
    scent: "Petrichor · Iris · Rain Cedar",
    notes: ["Petrichor", "Iris Root", "Rain Cedar", "Vetiver"],
    description:
      "The scent of the first rain of the year. Cool, mineral, and green — petrichor rising off hot pavement with iris and cedar coming through behind.",
    image: `${BASE}/photo-1476900164809-ff19b8ae5968?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1476900164809-ff19b8ae5968?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1528351655744-27cc30462816?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Limited",
    burnTime: "55–60 hours",
    weight: "9 oz",
  },
  {
    id: "flor-de-noche",
    slug: "flor-de-noche",
    name: "Flor de Noche",
    price: 32,
    scent: "Jasmine · Sandalwood · White Musk",
    notes: ["Night Jasmine", "Sandalwood", "White Musk", "Warm Amber"],
    description:
      "Blooms that only open at night — the kind you smell before you see them. Full jasmine on a sandalwood base, soft as skin in warm air.",
    image: `${BASE}/photo-1489101960932-eb71762e6bc8?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1489101960932-eb71762e6bc8?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1476900164809-ff19b8ae5968?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Limited",
    burnTime: "55–60 hours",
    weight: "9 oz",
  },
  {
    id: "humo-dulce",
    slug: "humo-dulce",
    name: "Humo Dulce",
    price: 36,
    scent: "Smoked Bourbon · Dark Honey · Fig",
    notes: ["Smoked Bourbon", "Dark Honey", "Fig", "Charred Oak"],
    description:
      "Slow-burn. The last two fingers in a glass of bourbon beside a fire that's been going all night. Rich, smoky, and unapologetically itself.",
    image: `${BASE}/photo-1537948756265-406a522f1a45?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1537948756265-406a522f1a45?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1489101960932-eb71762e6bc8?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Limited",
    burnTime: "60–65 hours",
    weight: "10 oz",
  },
  {
    id: "la-quietud",
    slug: "la-quietud",
    name: "La Quietud",
    price: 28,
    scent: "Lavender · Chamomile · Beeswax",
    notes: ["Lavender", "Chamomile", "Beeswax", "Linen"],
    description:
      "The smell of a made bed in a quiet room. Not a spa — a home. Lavender and chamomile on warm beeswax, without the sweetness you expect.",
    image: `${BASE}/photo-1514436598301-27a65f40469f?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1514436598301-27a65f40469f?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1537948756265-406a522f1a45?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Signature",
    burnTime: "50–55 hours",
    weight: "8 oz",
  },
  {
    id: "medianoche",
    slug: "medianoche",
    name: "Medianoche",
    price: 36,
    scent: "Tobacco · Oud · Black Vanilla",
    notes: ["Tobacco Leaf", "Oud", "Black Vanilla", "Dark Amber"],
    description:
      "It's 2am and the candle is still burning. Deep tobacco and oud pushed through black vanilla — complex, grown-up, and not for everyone.",
    image: `${BASE}/photo-1512845369876-26d81a677daf?auto=format&fit=crop&w=800&q=80`,
    images: [
      `${BASE}/photo-1512845369876-26d81a677daf?auto=format&fit=crop&w=1000&q=85`,
      `${BASE}/photo-1514436598301-27a65f40469f?auto=format&fit=crop&w=1000&q=85`,
    ],
    collection: "Limited",
    burnTime: "60–65 hours",
    weight: "10 oz",
  },
];

export const featuredProducts = products.filter((p) => p.isFeatured);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}
