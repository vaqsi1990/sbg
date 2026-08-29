"use client";
import React, { useMemo } from "react";
import Cards from "@/components/Cards/Cards";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "../all/PaginationComponent";
import { useTranslations } from "next-intl";
import { ProductTypes } from "@/lib/ProductType";

import Image from "next/image";

interface Props {
  products: ProductTypes[];
}

export default function CardsWrapper({ products }: Props) {
  const ITEMS_PER_PAGE = 8;
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const t = useTranslations("about");

  // სწორად გაფილტრე პროდუქტები - breathable მეშვეობით
  const filteredProducts = useMemo(() => {
    return (products ?? []).filter(
      (product) =>
        product.mattress?.breathable === true ||
        product.pad?.breathable === true
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
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-40 lg:pt-48 pb-12">
        <Image
          src="/prod/breadcumb.jpg"
          alt="Background"
          width={1920}
          height={500}

          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      <div className="text-center z-20 px-4">
    <h2 className="text-white text-[25px] md:text-[50px] font-normal">
      {t("products")}
    </h2>
    <p className="max-w-[672px] text-white mx-auto lg:text-xl">
      {t("sleep")}
    </p>
  </div>
      </div>

      <div className="allcontainer">
        <div className="container pt-12 lg:pt-16 lg:!pb-16 mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
       <p className="text-xl text-muted-foreground">{t("wait")}</p>
            </div>
          ) : (
            <>
              <Cards products={paginatedProducts} />
              <div className="col-span-full flex justify-center items-center ">
                <PaginationComponent pageCount={pageCount} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
