/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { z } from "zod";
import { prisma } from "../prisma";
import { ProductSchema, updateProductSchema } from "../validators";
import { writeFileSync } from "fs";

import { revalidatePath } from "next/cache";
import {
  Mattress,
  Pillow,
  Quilt,
  Pad,
  Product,
  ProductType,
  CatalogItem,
  ProductCatalogItem,
} from "@prisma/client";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { syncProductCatalog } from "@/lib/actions/catalog";

function formatError(error: any) {
  if (error.name === "ZodError") {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export async function createProduct(data: z.infer<typeof ProductSchema>) {
  try {
    if (!(await isAdminAuthenticated())) {
      return { success: false, message: "Unauthorized" };
    }

    const parsed = ProductSchema.parse(data);

    const { type } = parsed;

    const createdProduct = await prisma.product.create({
      data: {
        type,
        images: parsed.images,
        titleEn: parsed.titleEn,
        titleKa: parsed.titleKa,
        categoryEn: parsed.categoryEn,
        categoryKa: parsed.categoryKa,
        secondtext: parsed.secondtext,
        secondtextEn: parsed.secondtextEn,
      },
    });

    switch (type) {
      case "MATTRESS":
        await prisma.mattress.create({
          data: {
            id: createdProduct.id,
            height: parsed.height,
            firmnessLevel: parsed.firmnessLevel,
            descriptionEn: parsed.descriptionEn,
            descriptionKa: parsed.descriptionKa,

            breathable: parsed.breathable,
            doubleSided: parsed.doubleSided,
            springTech: parsed.springTech,
            orthopaedic: parsed.orthopaedic,
            superSoftFoam: parsed.superSoftFoam,
            visconFabric: parsed.visconFabric,
            graphiteViscoFoam: parsed.graphiteViscoFoam,
            carbonYarnTechnologyPillowTopMattress: parsed.carbonYarnTechnologyPillowTopMattress,
            middleComfortLayer: parsed.middleComfortLayer,
            visconFabricSoftComfortLayer: parsed.visconFabricSoftComfortLayer,
            copperViscoLayer: parsed.copperViscoLayer,
            cncFoamTechnology: parsed.cncFoamTechnology,
            softComfortLayer: parsed.softComfortLayer,
            firmComfortLayer: parsed.firmComfortLayer,
            aloeveraFabric: parsed.aloeveraFabric,
            knitte: parsed.knitte,
            wool: parsed.wool,
            visco: parsed.visco,
            dns: parsed.dns,
            latex: parsed.latex,
            washable: parsed.washable,
            coconutLayer: parsed.coconutLayer,
            minitext: parsed.minitext,
            minitextEn: parsed.minitextEn,
          },
        });

        break;

      case "PILLOW":
        await prisma.pillow.create({
          data: {
            size: parsed.size,
            weight: parsed.weight ?? null,
            outerFabric: parsed.outerFabric,
            filling: parsed.filling,
            packaging: parsed.packaging,
            care: parsed.care ?? "",
            outerFabricEn: parsed.outerFabricEn,
            fillingEn: parsed.fillingEn,
            packagingEn: parsed.packagingEn,
            careEn: parsed.careEn ?? "",
            minitext: parsed.minitext,
            minitextEn: parsed.minitextEn,
            product: {
              connect: { id: createdProduct.id },
            },
          },
        });

        break;

      case "QUILT":
        await prisma.quilt.create({
          data: {
            id: createdProduct.id,
            dimensions: parsed.dimensions,
            fabric: parsed.fabric,
            filling: parsed.filling,
            fabricEn: parsed.fabricEn,
            fillingEn: parsed.fillingEn,
            weight: parsed.weight,
            minitext: parsed.minitext,
            minitextEn: parsed.minitextEn,
          },
        });

        break;

      case "PAD":
        await prisma.pad.create({
          data: {
            id: createdProduct.id,
            firmness: parsed.firmness,
            firmnessEn: parsed.firmnessEn,
            height: parsed.height,
            minitext: parsed.minitext,
            minitextEn: parsed.minitextEn,
            breathable: parsed.breathable,
            doubleSided: parsed.doubleSided,

            springTech: parsed.springTech,
            orthopaedic: parsed.orthopaedic,
            descriptionEn: parsed.descriptionEn,
            descriptionKa: parsed.descriptionKa,
            knitte: parsed.knitte,
            wool: parsed.wool,
            visco: parsed.visco,
            dns: parsed.dns,
            latex: parsed.latex,
            washable: parsed.washable,
            coconutLayer: parsed.coconutLayer,
          },
        });

        break;
    }

    await syncProductCatalog(createdProduct.id, parsed.featureIds ?? []);

    revalidatePath("/admin");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    console.error("Error in createProduct:", error);
    return { success: false, message: formatError(error) };
  }
}

type CatalogAssignment = ProductCatalogItem & { item: CatalogItem };

type SingleProduct =
  | (Product & { type: "MATTRESS"; mattress: Mattress; catalogItems: CatalogAssignment[] })
  | (Product & { type: "PILLOW"; pillow: Pillow; catalogItems: CatalogAssignment[] })
  | (Product & { type: "QUILT"; quilt: Quilt; catalogItems: CatalogAssignment[] })
  | (Product & { type: "PAD"; pad: Pad; catalogItems: CatalogAssignment[] });

export async function getSingleProduct(
  id: string
): Promise<SingleProduct | null> {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return null;

  const extra =
    product.type === "MATTRESS"
      ? await prisma.mattress.findUnique({ where: { id } })
      : product.type === "PILLOW"
      ? await prisma.pillow.findUnique({ where: { id } })
      : product.type === "QUILT"
      ? await prisma.quilt.findUnique({ where: { id } })
      : await prisma.pad.findUnique({ where: { id } });

  const catalogItems = await prisma.productCatalogItem.findMany({
    where: { productId: id },
    include: { item: true },
  });

  return {
    ...product,
    catalogItems,
    ...(product.type === "MATTRESS"
      ? { mattress: extra as Mattress }
      : product.type === "PILLOW"
      ? { pillow: extra as Pillow }
      : product.type === "QUILT"
      ? { quilt: extra as Quilt }
      : { pad: extra as Pad }),
  } as SingleProduct;
}

export async function getAllProduct(type?: ProductType) {
  try {
    const products = await prisma.product.findMany({
      where: type ? { type: type } : {}, // Filtering by ProductType if provided
      select: {
        id: true,
        titleEn: true,
        titleKa: true,
        type: true,
        createdAt: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { data: products };
  } catch (error) {
    console.error("Error fetching products", error);
    return { data: [] };
  }
}


export async function getFilteredProducts(filters: any) {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        titleEn: true,
        titleKa: true,
        type: true,
        images: true,
        createdAt: true,
        mattress: {
          select: {
            height: true, // ✅ height დაემატა
            firmnessLevel: true,
            breathable: true,
            springTech: true,
            doubleSided: true,
            orthopaedic: true,
            superSoftFoam: true,
            visconFabric: true,
            graphiteViscoFoam: true,
            carbonYarnTechnologyPillowTopMattress: true,
            middleComfortLayer: true,
            visconFabricSoftComfortLayer: true,
            copperViscoLayer: true,
            cncFoamTechnology: true,
            softComfortLayer: true,
            firmComfortLayer: true,
            aloeveraFabric: true,
            knitte: true,
            wool: true,
            visco: true,
            dns: true,
            latex: true,
            washable: true,
            coconutLayer: true,
          },
        },
        pad: {
          select: {
            height: true, // ✅ height დაემატა
            breathable: true,
            springTech: true,
            doubleSided: true,
            orthopaedic: true,
            knitte: true,
            wool: true,
            visco: true,
            dns: true,
            latex: true,
            washable: true,
            coconutLayer: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const filteredProducts = products.filter((product) => {
      const mattress = product.mattress;
      const pad = product.pad;

      if (filters.breathable === undefined) return true;

      return (
        (mattress && mattress.breathable === filters.breathable) ||
        (pad && pad.breathable === filters.breathable)
      );
    });

    return filteredProducts;
  } catch (error) {
    console.error("Error filtering products", error);
    return [];
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!(await isAdminAuthenticated())) {
      return { success: false, message: "Unauthorized" };
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("Product not found");

    // წაშლა ტიპის მიხედვით
    if (product.type === "MATTRESS") {
      await prisma.mattress.delete({ where: { id: id } });
    } else if (product.type === "PILLOW") {
      await prisma.pillow.delete({ where: { id: id } });
    } else if (product.type === "PAD") {
      await prisma.pad.delete({ where: { id: id } });
    } else if (product.type === "QUILT") {
      await prisma.quilt.delete({ where: { id: id } });
    }

    // ბოლოს ვშლით მთავარ პროდუქტს
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    if (!(await isAdminAuthenticated())) {
      return { success: false, message: "Unauthorized" };
    }

    const product = updateProductSchema.parse(data);

    const productExists = await prisma.product.findUnique({
      where: { id: product.id },
    });

    if (!productExists) throw new Error("Product not found");

    // Update shared fields from Product model
    await prisma.product.update({
      where: { id: product.id },
      data: {
        titleEn: product.titleEn,
        titleKa: product.titleKa,
        categoryEn: product.categoryEn,
        categoryKa: product.categoryKa,
        secondtext: product.secondtext,
        secondtextEn: product.secondtextEn,
        images: product.images,
        type: product.type,
      },
    });

    // Update type-specific data
    if (product.type === "MATTRESS") {
      await prisma.mattress.update({
        where: { id: product.id },
        data: {
          height: product.height,
          firmnessLevel: product.firmnessLevel,
          descriptionEn: product.descriptionEn,
          descriptionKa: product.descriptionKa,
          springTech: product.springTech,
          orthopaedic: product.orthopaedic,
          superSoftFoam: product.superSoftFoam,
          visconFabric: product.visconFabric,
          graphiteViscoFoam: product.graphiteViscoFoam,
          carbonYarnTechnologyPillowTopMattress: product.carbonYarnTechnologyPillowTopMattress,
          middleComfortLayer: product.middleComfortLayer,
          visconFabricSoftComfortLayer: product.visconFabricSoftComfortLayer,
          copperViscoLayer: product.copperViscoLayer,
          cncFoamTechnology: product.cncFoamTechnology,
          softComfortLayer: product.softComfortLayer,
          firmComfortLayer: product.firmComfortLayer,
          aloeveraFabric: product.aloeveraFabric,
          breathable: product.breathable,
          doubleSided: product.doubleSided,
          knitte: product.knitte,
          wool: product.wool,
          visco: product.visco,
          dns: product.dns,
          minitext:product.minitext,
          minitextEn:product.minitextEn,
          latex: product.latex,
          washable: product.washable,
          coconutLayer: product.coconutLayer,
        },
      });
    } else if (product.type === "PAD") {
      await prisma.pad.update({
        where: { id: product.id },
        data: {
          firmness: product.firmness,
          firmnessEn: product.firmnessEn,
          height: product.height,
          descriptionEn: product.descriptionEn,
          descriptionKa: product.descriptionKa,
          springTech: product.springTech,
          orthopaedic: product.orthopaedic,
          breathable: product.breathable,
          doubleSided: product.doubleSided,
          knitte: product.knitte,
          wool: product.wool,
          visco: product.visco,
          dns: product.dns,
          latex: product.latex,
          washable: product.washable,
          minitext:product.minitext,
          minitextEn:product.minitextEn,
          coconutLayer: product.coconutLayer,
        },
      });
    } else if (product.type === "PILLOW") {
      await prisma.pillow.update({
        where: { id: product.id },
        data: {
          size: product.size,
          weight: product.weight ?? null,
          outerFabric: product.outerFabric,
          outerFabricEn: product.outerFabricEn,
          filling: product.filling,
          fillingEn: product.fillingEn,
          packaging: product.packaging,
          packagingEn: product.packagingEn,
          care: product.care,
          careEn: product.careEn,
          minitext:product.minitext,
          minitextEn:product.minitextEn,
        },
      });
    } else if (product.type === "QUILT") {
      await prisma.quilt.update({
        where: { id: product.id },
        data: {
          dimensions: product.dimensions,
          fabric: product.fabric,
          fabricEn: product.fabricEn,
          filling: product.filling,
          fillingEn: product.fillingEn,
          weight: product.weight,
          minitext:product.minitext,
          minitextEn:product.minitextEn,
        },
      });
    }

    if (Array.isArray(product.featureIds)) {
      await syncProductCatalog(product.id, product.featureIds);
    }

    revalidatePath("/admin");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
