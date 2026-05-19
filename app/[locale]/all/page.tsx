/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./product.css";
import SearchComponent from "./SearchComponent";
import PaginationComponent from "./PaginationComponent";
import Filter from "./Filter";
import Cards from "@/components/Cards/Cards";
import OtherFilters from "@/components/OtherFilters/OtherFilters";
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
      updated = updated.filter((product) => product.type === selectedCategory); // Filter by ProductType
    }

    setFilteredProducts(updated);
  }, [products, query, selectedCategory]);

  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPageProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full mx-auto">
      <div className="flex h-[50vh] items-center flex-wrap bg-overlay sm:p-6 before:bg-title before:bg-opacity-70"
           style={{ backgroundImage: "url('/prod/breadcumb.jpg')" }}>
        <div className="text-center z-50 w-full">
          <h2 className="text-white sm:pt-10 pt-[50px] lg:mt-0 text-[25px] md:text-[50px] font-normal text-center">
            {t("products")}
          </h2>
          <p className="max-w-[672px] text-white mx-auto lg:text-xl">
            {t("sleep")}
          </p>
        </div>
      </div>

      <div className="allcontainer">
        <div className="container pt-12 lg:pt-16 lg:!pb-16 mx-auto">
        <Filter
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
          <SearchComponent />
          {products.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          ) : (
            <Cards products={currentPageProducts} />
          )}

          <div className="col-span-full mb-6 flex justify-center items-center ">
            <PaginationComponent pageCount={pageCount} />
          </div>

          <div className="container items-center lg:ml-[170px] mt-[80px] text-center">
            <OtherFilters />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContentWrapper />
    </Suspense>
  );
}
