import { z } from "zod";

const optionalTrimmedString = z.preprocess(
  (val) =>
    val === null || val === undefined || (typeof val === "string" && val.trim() === "")
      ? undefined
      : val,
  z.string().optional()
);

const optionalInt = z.preprocess(
  (val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    if (typeof val === "number" && Number.isNaN(val)) return undefined;
    return val;
  },
  z.number().int().optional()
);

export const FurnitureInfoRowSchema = z.object({
  labelKa: optionalTrimmedString,
  labelEn: optionalTrimmedString,
  valueKa: optionalTrimmedString,
  valueEn: optionalTrimmedString,
});

export const FurnitureInfoSectionSchema = z.object({
  titleKa: optionalTrimmedString,
  titleEn: optionalTrimmedString,
  rows: z.array(FurnitureInfoRowSchema).optional(),
});

export const BaseProductSchema = z.object({
  titleEn: z.string(),
  titleKa: z.string(),
  categoryEn: z.string(),
  categoryKa: z.string(),
  secondtext: z.string(),
  secondtextEn: z.string(),
  images: z.array(z.string()),
  type: z.enum(['MATTRESS', 'PILLOW', 'QUILT', 'PAD', 'FURNITURE']),
  featureIds: z.array(z.string()).optional(),
  infoSections: z.array(FurnitureInfoSectionSchema).optional(),
  size3: optionalTrimmedString,
  size4: optionalTrimmedString,
  sizes: z.array(z.string()).optional(),
});

// Mattress-specific schema
export const MattressSchema = z.object({
  height: z.string(),
  size1: optionalTrimmedString,
  size2: optionalTrimmedString,
  firmnessLevel: z.coerce.number().int().min(0).max(5),
  descriptionEn: z.string(),
  descriptionKa: z.string(),
  springTech: z.boolean(),
  orthopaedic: z.boolean(),
  superSoftFoam: z.boolean(),
  visconFabric: z.boolean(),
  graphiteViscoFoam: z.boolean(),
  carbonYarnTechnologyPillowTopMattress: z.boolean(),
  middleComfortLayer: z.boolean(),
  visconFabricSoftComfortLayer: z.boolean(),
  copperViscoLayer: z.boolean(),
  cncFoamTechnology: z.boolean(),
  softComfortLayer: z.boolean(),
  firmComfortLayer: z.boolean(),
  aloeveraFabric: z.boolean(),
  breathable: z.boolean(),
  doubleSided: z.boolean(),
  knitte: z.boolean(),
  wool: z.boolean(),
  visco: z.boolean(),
  dns: z.boolean(),
  latex: z.boolean(),
  washable: z.boolean(),
  coconutLayer: z.boolean(),
  minitext: z.string(),
  minitextEn: z.string(),
});

// Pad-specific schema
export const PadSchema = z.object({
  firmness: z.string(),
  firmnessEn: z.string(),
  height: z.string(),
  descriptionEn: z.string(),
  descriptionKa: z.string(),
  springTech: z.boolean(),
  orthopaedic: z.boolean(),
  breathable: z.boolean(),
  doubleSided: z.boolean(),
  knitte: z.boolean(),
  wool: z.boolean(),
  visco: z.boolean(),
  dns: z.boolean(),
  latex: z.boolean(),
  washable: z.boolean(),
  coconutLayer: z.boolean(),
  minitext: z.string(),
  minitextEn: z.string(),
});

// Pillow-specific schema
export const PillowSchema = z.object({
  size: optionalTrimmedString,
  weight: optionalInt,
  outerFabric: z.string(),
  filling: z.string(),
  packaging: z.string(),
  care: z.string().optional(),
  outerFabricEn: z.string(),
  fillingEn: z.string(),
  packagingEn: z.string(),
  careEn: z.string().optional(),
  minitext: z.string(),
  minitextEn: z.string(),
});

// Quilt-specific schema
export const QuiltSchema = z.object({
  size1: optionalTrimmedString,
  size2: optionalTrimmedString,
  fabric: optionalTrimmedString,
  fabricEn: optionalTrimmedString,
  filling: optionalTrimmedString,
  fillingEn: optionalTrimmedString,
  weight: optionalTrimmedString,
  minitext: z.string(),
  minitextEn: z.string(),
  descriptionKa: z.string(),
  descriptionEn: z.string(),
  packaging: optionalTrimmedString,
  packagingEn: optionalTrimmedString,
  care: optionalTrimmedString,
  careEn: optionalTrimmedString,
});

export const FurnitureSchema = z.object({
  descriptionKa: optionalTrimmedString,
  descriptionEn: optionalTrimmedString,
  size1: optionalTrimmedString,
  size2: optionalTrimmedString,
  size3: optionalTrimmedString,
  size4: optionalTrimmedString,
  sizes: z.array(z.string()).optional(),
});

export const ProductSchema = z.discriminatedUnion("type", [
  BaseProductSchema.extend(MattressSchema.shape).extend({ type: z.literal("MATTRESS") }),
  BaseProductSchema.extend(PillowSchema.shape).extend({ type: z.literal("PILLOW") }),
  BaseProductSchema.extend(QuiltSchema.shape).extend({ type: z.literal("QUILT") }),
  BaseProductSchema.extend(PadSchema.shape).extend({ type: z.literal("PAD") }),
  BaseProductSchema.extend(FurnitureSchema.shape).extend({
    type: z.literal("FURNITURE"),
    titleEn: z.string().min(1),
    titleKa: z.string().min(1),
    images: z.array(z.string()).min(1),
    secondtext: z.string().optional(),
    secondtextEn: z.string().optional(),
  }),
]);


const withId = {
  id: z.string().min(1),
};

export const updateProductSchema = z.discriminatedUnion("type", [
  BaseProductSchema.extend(MattressSchema.shape)
    .extend({ type: z.literal("MATTRESS") })
    .extend(withId),

  BaseProductSchema.extend(PillowSchema.shape)
    .extend({ type: z.literal("PILLOW") })
    .extend(withId),

  BaseProductSchema.extend(QuiltSchema.shape)
    .extend({ type: z.literal("QUILT") })
    .extend(withId),

  BaseProductSchema.extend(PadSchema.shape)
    .extend({ type: z.literal("PAD") })
    .extend(withId),

  BaseProductSchema.extend(FurnitureSchema.shape)
    .extend({
      type: z.literal("FURNITURE"),
      titleEn: z.string().min(1),
      titleKa: z.string().min(1),
      images: z.array(z.string()).min(1),
      secondtext: z.string().optional(),
      secondtextEn: z.string().optional(),
    })
    .extend(withId),
]);