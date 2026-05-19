import React, { Suspense } from "react";
import FeatureCardsWrapper from "../feature-filter/FeatureCardsWrapper";
import { getFilteredProducts } from "@/lib/actions/actions";

export default async function Page() {
  const products = await getFilteredProducts({});

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeatureCardsWrapper products={products} featureKey="superSoftFoam" />
    </Suspense>
  );
}
