'use client';

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Cards from "../Cards/Cards";
import { ProductType } from "@/lib/ProductType";

export default function ProductSlice({ products }: { products: ProductType[] }) {
  const t = useTranslations("slice");

  return (
    <section className="py-16 bg-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="section-heading text-center md:text-left">
            {t("ourProducts")}
          </h2>
          <Link
            href="/all"
            className="flex items-center gap-2 text-[15px] lg:text-base font-medium text-brand hover:text-brand-dark transition-colors group"
          >
            <span>{t("viewAll")}</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <Cards products={products} />
      </div>
    </section>
  );
}
