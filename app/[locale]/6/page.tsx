
import React, { Suspense } from 'react';
import CardsWrapper from "./CardsWrapper";

import { getFilteredProducts } from '@/lib/actions/actions';


export default async function Page() {
  const products = await getFilteredProducts({});

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardsWrapper products={products} />
    </Suspense>
  );
}