"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Cards from "../Cards/Cards";
import { ProductType } from "@/lib/ProductType";

export default function ProductSlice({ products }: { products: ProductType[] }) {
  const t = useTranslations("slice");

  return (
    <section className="page-section bg-muted/50">
      <div className="container px-4 lg:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <h2 className="section-heading">{t("ourProducts")}</h2>
          <Link
            href="/all"
            className="inline-flex items-center gap-2 text-sm lg:text-base font-medium text-brand hover:text-brand-dark transition-colors group shrink-0"
          >
            <span>{t("viewAll")}</span>
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <Cards products={products} />
      </div>
    </section>
  );
}
