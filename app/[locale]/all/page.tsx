/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchComponent from "./SearchComponent";
import PaginationComponent from "./PaginationComponent";
import Filter from "./Filter";
import Cards from "@/components/Cards/Cards";
import OtherFilters from "@/components/OtherFilters/OtherFilters";
import PageHeader from "@/components/PageHeader";
import { getAllProduct } from "@/lib/actions/actions";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ProductType } from "@prisma/client";

const ITEMS_PER_PAGE = 8;

type Product = {
  id: string;
  type: ProductType;
  images: string[];
  titleEn: string;
  titleKa: string;
  categoryEn: string;
  categoryKa: string;
};

async function fetchProducts(type?: ProductType) {
  const { data } = await getAllProduct(type);
  return data.map((product: any) => ({
    ...product,
  }));
}

const Loader = dynamic(() => import("./Loader"), { ssr: false });

function PageContentWrapper() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductType | undefined>(undefined);
  const t = useTranslations("about");
  const tProducts = useTranslations("products");
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    fetchProducts(selectedCategory).then((data) => {
      setProducts(data);
    });
  }, [selectedCategory]);

  useEffect(() => {
    let updated = [...products];

    if (query) {
      updated = updated.filter((product) =>
        product.titleEn.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      updated = updated.filter((product) => product.type === selectedCategory);
    }

    setFilteredProducts(updated);
  }, [products, query, selectedCategory]);

  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPageProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full bg-background">
      <PageHeader title={t("products")} subtitle={t("sleep")} />

      <div className="container mx-auto px-4 lg:px-6 py-10 lg:py-14">
        <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <SearchComponent />

        {products.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">{tProducts("noProducts")}</p>
        ) : (
          <Cards products={currentPageProducts} />
        )}

        <PaginationComponent pageCount={pageCount} />

        <div className="mt-16 lg:mt-20 border-t border-border pt-12 lg:pt-16">
          <OtherFilters />
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center pt-40 lg:pt-48 text-muted-foreground">
          Loading...
        </div>
      }
    >
      <PageContentWrapper />
    </Suspense>
  );
}
