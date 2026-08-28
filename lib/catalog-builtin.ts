import type { CatalogKind } from "@prisma/client";

export const PAD_KEYS = new Set([
  "springTech",
  "orthopaedic",
  "breathable",
  "doubleSided",
  "knitte",
  "wool",
  "visco",
  "dns",
  "latex",
  "washable",
  "coconutLayer",
]);

type BuiltinItem = {
  kind: CatalogKind;
  slug: string;
  labelKa: string;
  labelEn: string;
  image: string;
  href: string;
  legacyKey?: string;
  forMattress: boolean;
  forPad: boolean;
  sortOrder: number;
};

const HEIGHTS: BuiltinItem[] = [
  { kind: "HEIGHT", slug: "6", labelKa: "6 სიმაღლე", labelEn: "6 height", image: "/filters/6.jpg", href: "/6", forMattress: true, forPad: true, sortOrder: 1 },
  { kind: "HEIGHT", slug: "7", labelKa: "7 სიმაღლე", labelEn: "7 height", image: "/filters/7.jpg", href: "/7", forMattress: true, forPad: true, sortOrder: 2 },
  { kind: "HEIGHT", slug: "24", labelKa: "24 სიმაღლე", labelEn: "24 height", image: "/filters/25.jpg", href: "/feature/24", forMattress: true, forPad: true, sortOrder: 3 },
  { kind: "HEIGHT", slug: "25", labelKa: "25 სიმაღლე", labelEn: "25 height", image: "/filters/25.jpg", href: "/25", forMattress: true, forPad: true, sortOrder: 4 },
  { kind: "HEIGHT", slug: "26", labelKa: "26 სიმაღლე", labelEn: "26 height", image: "/filters/26.jpg", href: "/26", forMattress: true, forPad: true, sortOrder: 5 },
  { kind: "HEIGHT", slug: "27", labelKa: "27 სიმაღლე", labelEn: "27 height", image: "/filters/27.jpg", href: "/27", forMattress: true, forPad: true, sortOrder: 6 },
  { kind: "HEIGHT", slug: "28", labelKa: "28 სიმაღლე", labelEn: "28 height", image: "/filters/28.jpg", href: "/28", forMattress: true, forPad: true, sortOrder: 7 },
  { kind: "HEIGHT", slug: "29", labelKa: "29 სიმაღლე", labelEn: "29 height", image: "/filters/30.jpg", href: "/feature/29", forMattress: true, forPad: true, sortOrder: 8 },
  { kind: "HEIGHT", slug: "30", labelKa: "30 სიმაღლე", labelEn: "30 height", image: "/filters/30.jpg", href: "/30", forMattress: true, forPad: true, sortOrder: 9 },
  { kind: "HEIGHT", slug: "31", labelKa: "31 სიმაღლე", labelEn: "31 height", image: "/filters/32.jpg", href: "/feature/31", forMattress: true, forPad: true, sortOrder: 10 },
  { kind: "HEIGHT", slug: "32", labelKa: "32 სიმაღლე", labelEn: "32 height", image: "/filters/32.jpg", href: "/32", forMattress: true, forPad: true, sortOrder: 11 },
  { kind: "HEIGHT", slug: "33", labelKa: "33 სიმაღლე", labelEn: "33 height", image: "/filters/33.jpg", href: "/33", forMattress: true, forPad: true, sortOrder: 12 },
  { kind: "HEIGHT", slug: "34", labelKa: "34 სიმაღლე", labelEn: "34 height", image: "/filters/33.jpg", href: "/feature/34", forMattress: true, forPad: true, sortOrder: 13 },
];

const FEATURES: Omit<BuiltinItem, "forMattress" | "forPad">[] = [
  { kind: "FEATURE", slug: "zone", labelKa: "7 ზონიანი შეფუთული ზამბარა", labelEn: "7 Zone Pocket Spring System", image: "/filters/zone.jpg", href: "/zone", legacyKey: "springTech", sortOrder: 100 },
  { kind: "FEATURE", slug: "ort", labelKa: "ორთოპედიული", labelEn: "Orthopaedic", image: "/filters/ort.jpg", href: "/ort", legacyKey: "orthopaedic", sortOrder: 101 },
  { kind: "FEATURE", slug: "super-soft-foam", labelKa: "სუპერ რბილი ღრუბელი", labelEn: "Super Soft Foam", image: "/filters/ort.jpg", href: "/super-soft-foam", legacyKey: "superSoftFoam", sortOrder: 102 },
  { kind: "FEATURE", slug: "viscon-fabric", labelKa: "ვისკონის ქსოვილი", labelEn: "Viscon Fabric", image: "/filters/knitted.jpg", href: "/viscon-fabric", legacyKey: "visconFabric", sortOrder: 103 },
  { kind: "FEATURE", slug: "graphite-visco-foam", labelKa: "გრაფიტ ვისკო ქაფი", labelEn: "Graphite Visco Foam", image: "/filters/visco.jpg", href: "/graphite-visco-foam", legacyKey: "graphiteViscoFoam", sortOrder: 104 },
  { kind: "FEATURE", slug: "carbon-yarn-pillow-top", labelKa: "Carbon Yarn ტექნოლოგიის Pillow Top", labelEn: "Carbon Yarn Technology Pillow Top Mattress", image: "/filters/zone.jpg", href: "/carbon-yarn-pillow-top", legacyKey: "carbonYarnTechnologyPillowTopMattress", sortOrder: 105 },
  { kind: "FEATURE", slug: "middle-comfort-layer", labelKa: "საშუალო კომფორტის ფენა", labelEn: "Middle Comfort Layer", image: "/filters/ds.jpg", href: "/middle-comfort-layer", legacyKey: "middleComfortLayer", sortOrder: 106 },
  { kind: "FEATURE", slug: "viscon-soft-comfort-layer", labelKa: "Viscon Fabric რბილი კომფორტის ფენა", labelEn: "Viscon Fabric Soft Comfort Layer", image: "/filters/knitted.jpg", href: "/viscon-soft-comfort-layer", legacyKey: "visconFabricSoftComfortLayer", sortOrder: 107 },
  { kind: "FEATURE", slug: "copper-visco-layer", labelKa: "Copper Visco ფენა", labelEn: "Copper Visco Layer", image: "/filters/visco.jpg", href: "/copper-visco-layer", legacyKey: "copperViscoLayer", sortOrder: 108 },
  { kind: "FEATURE", slug: "cnc-foam-technology", labelKa: "CNC ქაფის ტექნოლოგია", labelEn: "CNC Foam Technology", image: "/filters/dns.jpg", href: "/cnc-foam-technology", legacyKey: "cncFoamTechnology", sortOrder: 109 },
  { kind: "FEATURE", slug: "soft-comfort-layer", labelKa: "რბილი კომფორტის ფენა", labelEn: "Soft Comfort Layer", image: "/filters/soft.jpg", href: "/soft-comfort-layer", legacyKey: "softComfortLayer", sortOrder: 110 },
  { kind: "FEATURE", slug: "firm-comfort-layer", labelKa: "მაგარი კომფორტის ფენა", labelEn: "Firm Comfort Layer", image: "/filters/firmcomfort.jpg", href: "/firm-comfort-layer", legacyKey: "firmComfortLayer", sortOrder: 111 },
  { kind: "FEATURE", slug: "aloevera-fabric", labelKa: "ალოე ვერას ქსოვილი", labelEn: "Aloevera Fabric", image: "/filters/aloevera.jpg", href: "/aloevera-fabric", legacyKey: "aloeveraFabric", sortOrder: 112 },
  { kind: "FEATURE", slug: "brieth", labelKa: "სუნთქვადი", labelEn: "Breathable", image: "/filters/brieth1.jpg", href: "/brieth", legacyKey: "breathable", sortOrder: 113 },
  { kind: "FEATURE", slug: "double", labelKa: "ორმხრივი", labelEn: "Double Sided", image: "/filters/ds.jpg", href: "/double", legacyKey: "doubleSided", sortOrder: 114 },
  { kind: "FEATURE", slug: "knitte", labelKa: "ნაქსოვი", labelEn: "Knitte", image: "/filters/knitted.jpg", href: "/knitte", legacyKey: "knitte", sortOrder: 115 },
  { kind: "FEATURE", slug: "wool", labelKa: "ბამბა", labelEn: "Wool", image: "/filters/wool.jpg", href: "/wool", legacyKey: "wool", sortOrder: 116 },
  { kind: "FEATURE", slug: "visco", labelKa: "ვისკო", labelEn: "Visco", image: "/filters/visco.jpg", href: "/visco", legacyKey: "visco", sortOrder: 117 },
  { kind: "FEATURE", slug: "dns", labelKa: "მაღალი საჰაერო გამტარობის DNS ღრუბელი", labelEn: "High Dns Air Ducted Support Sponge", image: "/filters/dns.jpg", href: "/dns", legacyKey: "dns", sortOrder: 118 },
  { kind: "FEATURE", slug: "latex", labelKa: "ლატექსი", labelEn: "Latex", image: "/filters/latex.jpg", href: "/latex", legacyKey: "latex", sortOrder: 119 },
  { kind: "FEATURE", slug: "wash", labelKa: "რეცხვადი ქეისი", labelEn: "Washable Zipped Case", image: "/filters/wash.jpg", href: "/wash", legacyKey: "washable", sortOrder: 120 },
  { kind: "FEATURE", slug: "coconut", labelKa: "ქოქოსის შრე", labelEn: "Coconut Layer", image: "/filters/coconut.jpg", href: "/coconut", legacyKey: "coconutLayer", sortOrder: 121 },
];

export const BUILTIN_CATALOG: BuiltinItem[] = [
  ...HEIGHTS,
  ...FEATURES.map((item) => ({
    ...item,
    forMattress: true,
    forPad: Boolean(item.legacyKey && PAD_KEYS.has(item.legacyKey)),
  })),
];
