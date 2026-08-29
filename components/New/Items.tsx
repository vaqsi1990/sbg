import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductType } from "@/lib/ProductType";
import Cards from "../Cards/Cards";
import { useTranslations } from "next-intl";

function Items({ products }: { products: ProductType[] }) {
  const t = useTranslations("new");

  return (
    <div className="container mx-auto px-4 lg:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <h2 className="section-heading">{t("ourProducts")}</h2>
        <Link
          href="/matrass"
          className="inline-flex items-center gap-2 rounded-full bg-brand-chrome px-5 py-2.5 md:text-[18px] text-[16px] font-semibold uppercase tracking-wide text-white shadow-md transition-all hover:bg-brand-chrome/90 hover:shadow-lg shrink-0"
        >
          <span>{t("viewAll")}</span>
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
        </Link>
      </div>
      <Cards products={products} />
    </div>
  );
}

export default Items;
