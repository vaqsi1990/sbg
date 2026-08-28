"use server";

import { revalidatePath } from "next/cache";
import { CatalogKind } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { BUILTIN_CATALOG, PAD_KEYS } from "@/lib/catalog-builtin";

export type CatalogItemDTO = {
  id: string;
  kind: CatalogKind;
  slug: string;
  labelKa: string;
  labelEn: string;
  image: string;
  href: string | null;
  legacyKey: string | null;
  forMattress: boolean;
  forPad: boolean;
  sortOrder: number;
};

async function ensureBuiltInCatalogItems() {
  const existing = await prisma.catalogItem.findMany({
    select: { id: true, slug: true, legacyKey: true },
  });
  const bySlug = new Map(existing.map((item) => [item.slug, item]));
  const byLegacy = new Map(
    existing
      .filter((item) => item.legacyKey)
      .map((item) => [item.legacyKey as string, item])
  );

  const missing: Array<{
    kind: (typeof BUILTIN_CATALOG)[number]["kind"];
    slug: string;
    labelKa: string;
    labelEn: string;
    image: string;
    href: string;
    legacyKey: string | null;
    forMattress: boolean;
    forPad: boolean;
    sortOrder: number;
  }> = [];
  for (const item of BUILTIN_CATALOG) {
    const found =
      (item.legacyKey ? byLegacy.get(item.legacyKey) : undefined) ||
      bySlug.get(item.slug);
    if (found) {
      if (!found.legacyKey && item.legacyKey) {
        await prisma.catalogItem.update({
          where: { id: found.id },
          data: { legacyKey: item.legacyKey, href: item.href },
        });
      }
      continue;
    }
    missing.push({
      kind: item.kind,
      slug: item.slug,
      labelKa: item.labelKa,
      labelEn: item.labelEn,
      image: item.image,
      href: item.href,
      legacyKey: item.legacyKey ?? null,
      forMattress: item.forMattress,
      forPad: item.forPad,
      sortOrder: item.sortOrder,
    });
  }

  if (missing.length) {
    await prisma.catalogItem.createMany({ data: missing, skipDuplicates: true });
  }
}

function toSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `item-${Date.now()}`;
}

export async function getCatalogItems(kind?: CatalogKind): Promise<CatalogItemDTO[]> {
  try {
    await ensureBuiltInCatalogItems();
    const items = await prisma.catalogItem.findMany({
      where: kind ? { kind } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return items.map((item) => ({
      id: item.id,
      kind: item.kind,
      slug: item.slug,
      labelKa: item.labelKa,
      labelEn: item.labelEn,
      image: item.image,
      href: item.href ?? null,
      legacyKey: item.legacyKey ?? null,
      forMattress: item.forMattress,
      forPad: item.forPad,
      sortOrder: item.sortOrder,
    }));
  } catch {
    return [];
  }
}

export async function getCatalogItemBySlug(slug: string) {
  return prisma.catalogItem.findUnique({ where: { slug } });
}

export async function createCatalogItem(input: {
  kind: CatalogKind;
  labelKa: string;
  labelEn: string;
  image: string;
  slug?: string;
  forMattress?: boolean;
  forPad?: boolean;
}) {
  if (!(await isAdminAuthenticated())) {
    return { success: false, message: "Unauthorized" };
  }

  const labelKa = input.labelKa.trim();
  const labelEn = input.labelEn.trim();
  const image = input.image.trim();
  if (!labelKa || !labelEn || !image) {
    return { success: false, message: "შეავსე სახელები და ატვირთე სურათი" };
  }

  const slug =
    input.kind === "HEIGHT"
      ? toSlug(input.slug || labelEn)
      : toSlug(input.slug || input.labelEn);

  if (input.kind === "HEIGHT" && !/^\d+$/.test(slug)) {
    return { success: false, message: "სიმაღლე უნდა იყოს რიცხვი, მაგ. 35" };
  }

  try {
    const count = await prisma.catalogItem.count({ where: { kind: input.kind } });
    await prisma.catalogItem.create({
      data: {
        kind: input.kind,
        slug,
        labelKa,
        labelEn,
        image,
        forMattress: input.forMattress ?? true,
        forPad: input.forPad ?? true,
        sortOrder: count + 1,
        href: `/feature/${slug}`,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/features");
    revalidatePath("/all");
    revalidatePath(`/feature/${slug}`);
    return { success: true, message: "დაემატა" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save";
    if (message.includes("Unique") || message.includes("slug")) {
      return { success: false, message: "ეს ზომა/მახასიათებელი უკვე არსებობს" };
    }
    return { success: false, message };
  }
}

export async function updateCatalogItem(input: {
  id: string;
  labelKa: string;
  labelEn: string;
  image: string;
  slug?: string;
}) {
  if (!(await isAdminAuthenticated())) {
    return { success: false, message: "Unauthorized" };
  }

  const existing = await prisma.catalogItem.findUnique({ where: { id: input.id } });
  if (!existing) {
    return { success: false, message: "ვერ მოიძებნა" };
  }

  const labelKa = input.labelKa.trim();
  const labelEn = input.labelEn.trim();
  const image = input.image.trim();
  if (!labelKa || !labelEn || !image) {
    return { success: false, message: "შეავსე სახელები და ატვირთე სურათი" };
  }

  const slug =
    existing.kind === "HEIGHT"
      ? toSlug(input.slug || existing.slug)
      : existing.slug;

  if (existing.kind === "HEIGHT" && !/^\d+$/.test(slug)) {
    return { success: false, message: "სიმაღლე უნდა იყოს რიცხვი, მაგ. 35" };
  }

  try {
    if (existing.kind === "HEIGHT" && slug !== existing.slug) {
      await prisma.mattress.updateMany({
        where: { height: existing.slug },
        data: { height: slug },
      });
      await prisma.pad.updateMany({
        where: { height: existing.slug },
        data: { height: slug },
      });
    }

    await prisma.catalogItem.update({
      where: { id: input.id },
      data: { labelKa, labelEn, image, slug },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/features");
    revalidatePath("/all");
    revalidatePath(`/feature/${existing.slug}`);
    revalidatePath(`/feature/${slug}`);
    if (existing.href) revalidatePath(existing.href);
    return { success: true, message: "განახლდა" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save";
    if (message.includes("Unique") || message.includes("slug")) {
      return { success: false, message: "ეს ზომა/მახასიათებელი უკვე არსებობს" };
    }
    return { success: false, message };
  }
}

export async function deleteCatalogItem(id: string) {
  if (!(await isAdminAuthenticated())) {
    return { success: false, message: "Unauthorized" };
  }
  await prisma.catalogItem.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/admin/features");
  revalidatePath("/all");
  return { success: true, message: "წაიშალა" };
}

export async function syncProductCatalog(productId: string, featureIds: string[] = []) {
  await prisma.productCatalogItem.deleteMany({ where: { productId } });
  const uniqueIds = [...new Set(featureIds.filter(Boolean))];
  if (!uniqueIds.length) return;
  await prisma.productCatalogItem.createMany({
    data: uniqueIds.map((itemId) => ({ productId, itemId })),
  });
}

export async function getProductsByCatalogSlug(slug: string) {
  const item = await prisma.catalogItem.findUnique({ where: { slug } });
  if (!item) return { item: null, products: [] };

  const productSelect = {
    id: true,
    titleEn: true,
    titleKa: true,
    type: true,
    images: true,
    createdAt: true,
  } as const;

  if (item.kind === "HEIGHT") {
    const products = await prisma.product.findMany({
      where: {
        OR: [{ mattress: { height: item.slug } }, { pad: { height: item.slug } }],
      },
      select: productSelect,
      orderBy: { createdAt: "desc" },
    });
    return { item, products };
  }

  const legacyFilters: Array<{ mattress: Record<string, boolean> } | { pad: Record<string, boolean> }> = [];
  if (item.legacyKey) {
    legacyFilters.push({ mattress: { [item.legacyKey]: true } });
    if (PAD_KEYS.has(item.legacyKey)) {
      legacyFilters.push({ pad: { [item.legacyKey]: true } });
    }
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [{ catalogItems: { some: { itemId: item.id } } }, ...legacyFilters],
    },
    select: productSelect,
    orderBy: { createdAt: "desc" },
  });
  return { item, products };
}
