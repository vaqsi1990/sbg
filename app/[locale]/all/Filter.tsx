"use client";
import { ProductType } from "@prisma/client";
import React from "react";
import { useTranslations } from "next-intl";

const filterBtn =
  "outline-none rounded-full cursor-pointer transition-all duration-200 px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide focus:outline-none border";

function Filter({ selectedCategory, setSelectedCategory }: FilterProps) {
  const t = useTranslations("products");
  const categories: ProductType[] = ["MATTRESS", "PILLOW", "QUILT", "PAD"];

  const btnClass = (active: boolean) =>
    `${filterBtn} ${
      active
        ? "bg-brand text-white border-brand shadow-md shadow-brand/20"
        : "border-border text-foreground hover:bg-brand hover:text-white hover:border-brand"
    }`;

  return (
    <div className="pt-[70px] pb-12">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button className={btnClass(selectedCategory === undefined)} onClick={() => setSelectedCategory(undefined)}>
          {t("all")}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={btnClass(selectedCategory === category)}
            onClick={() => setSelectedCategory(category)}
          >
            {t(category)}
          </button>
        ))}
      </div>
    </div>
  );
}

type FilterProps = {
  selectedCategory: ProductType | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
};

export default Filter;
