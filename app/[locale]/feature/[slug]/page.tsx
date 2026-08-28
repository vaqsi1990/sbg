import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import CatalogCardsWrapper from "./CatalogCardsWrapper";
import { getProductsByCatalogSlug } from "@/lib/actions/catalog";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const { item, products } = await getProductsByCatalogSlug(slug);
  if (!item) notFound();

  const title = locale === "ge" ? item.labelKa : item.labelEn;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogCardsWrapper products={products} title={title} />
    </Suspense>
  );
}
