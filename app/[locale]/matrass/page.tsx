// ❌ არ უნდა იყოს `"use client"` მთელ ფაილზე
import React, { Suspense } from 'react';
import CardsWrapper from './CardsWrapper';

import { getAllProduct } from '@/lib/actions/actions';


export default async function Page() {
  const { data: products } = await getAllProduct();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardsWrapper products={products} />
    </Suspense>
  );
}
