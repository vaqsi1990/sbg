"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Cards from "../Cards/Cards";
import { ProductType } from "@/lib/ProductType";

export default function ProductSlice({ products }: { products: ProductType[] }) {
  const t = useTranslations("slice");

  return (
    <section className="page-section bg-muted/50 dark:bg-transparent">
      <div className="container px-4 lg:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <h2 className="section-heading">{t("ourProducts")}</h2>
          <Link
            href="/all"
            className="inline-flex items-center gap-2 rounded-full bg-brand-chrome px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-all hover:bg-brand-chrome/90 hover:shadow-lg shrink-0"
          >
            <span>{t("viewAll")}</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
        <Cards products={products} />
      </div>
    </section>
  );
}
