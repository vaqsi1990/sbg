import React from "react";
import { ProductType } from "@/lib/ProductType";
import Cards from "../Cards/Cards";
import { useTranslations } from "next-intl";

function Items({ products }: { products: ProductType[] }) {
  const t = useTranslations("new");

  return (
    <div className="container mx-auto px-4 lg:px-6">
      <h2 className="section-heading-center">{t("ourProducts")}</h2>
      <Cards products={products} />
    </div>
  );
}

export default Items;
