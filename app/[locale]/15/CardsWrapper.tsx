"use client";
import React, { useMemo } from "react";
import Cards from "@/components/Cards/Cards";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "../all/PaginationComponent";
import { useTranslations } from "next-intl";
import { ProductTypes } from "@/lib/ProductType";

import Image from "next/image";

import bg from '@/public/prod/breadcumb.jpg'
interface Props {
  products: ProductTypes[];
}

export default function CardsWrapper({ products }: Props) {
  const ITEMS_PER_PAGE = 8;
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const t = useTranslations("about");
  
  const filteredProducts = useMemo(() => {
    return (products ?? []).filter(
      (product) =>
        (product.mattress && Number(product.mattress.height) === 15) ||
      (product.pad && Number(product.pad.height) === 15)
    );
  }, [products]);


  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  return (
    <section className="w-full mx-auto">
    <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
  <Image
    src={bg}
    alt="Background"
    fill
    priority={false}
    quality={80}
    className="object-cover z-0"
  />
  <div className="absolute inset-0 bg-black/60 z-10" />
  <div className="text-center z-20 px-4">
    <h2 className="text-white text-[25px] sm:pt-10 pt-[50px] md:text-[50px] font-normal">
      {t("about.products")}
    </h2>
    <p className="max-w-[672px] text-white mx-auto lg:text-xl">
      {t("about.sleep")}
    </p>
  </div>
</div>
      <div className="allcontainer">
        <div className="container pt-12 lg:pt-16 lg:!pb-16 mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">{t("wait")}</p>
            </div>
          ) : (
            <>
              <Cards products={paginatedProducts} />
              <div className="col-span-full flex justify-center items-center mt-3">
                <PaginationComponent pageCount={pageCount} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
