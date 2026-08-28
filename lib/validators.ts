import { z } from "zod";

export const BaseProductSchema = z.object({
  titleEn: z.string(),
  titleKa: z.string(),
  categoryEn: z.string(),
  categoryKa: z.string(),
  secondtext: z.string(),
  secondtextEn: z.string(),
  images: z.array(z.string()),
  type: z.enum(['MATTRESS', 'PILLOW', 'QUILT', 'PAD']),
  featureIds: z.array(z.string()).optional(),
});

// Mattress-specific schema
export const MattressSchema = z.object({
  height: z.string(),
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

const optionalNumber = z.preprocess(
  (value) =>
    value === "" || value === null || value === undefined || Number.isNaN(Number(value))
      ? undefined
      : Number(value),
  z.number().optional()
);

// Pillow-specific schema
export const PillowSchema = z.object({
  size: z.string(),
  weight: optionalNumber,
  outerFabric: z.string(),
  filling: z.string(),
  packaging: z.string(),
  care: z.string(),
  outerFabricEn: z.string(),
  fillingEn: z.string(),
  packagingEn: z.string(),
  careEn: z.string(),
  minitext: z.string(),
  minitextEn: z.string(),
});

// Quilt-specific schema
export const QuiltSchema = z.object({
  dimensions: z.string(),
  fabric: z.string(),
  fabricEn: z.string(),
  filling: z.string(),
  fillingEn: z.string(),
  weight: z.string(),
  minitext: z.string(),
  minitextEn: z.string(),
});


export const ProductSchema = z.discriminatedUnion("type", [
  BaseProductSchema.extend(MattressSchema.shape).extend({ type: z.literal("MATTRESS") }),
  BaseProductSchema.extend(PillowSchema.shape).extend({ type: z.literal("PILLOW") }),
  BaseProductSchema.extend(QuiltSchema.shape).extend({ type: z.literal("QUILT") }),
  BaseProductSchema.extend(PadSchema.shape).extend({ type: z.literal("PAD") }),
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
]);