"use client";
import { ProductType } from "@prisma/client";
import React from "react";
import { useTranslations } from "next-intl"; 

function Filter({ selectedCategory, setSelectedCategory }: FilterProps) {
  const t = useTranslations("products"); 
  const categories: ProductType[] = ["MATTRESS", "PILLOW", "QUILT", "PAD"];
  
  const handleCategoryChange = (category: ProductType) => {
    setSelectedCategory(category);
  };

  const handleReset = () => {
    setSelectedCategory(undefined); 
  };

  return (
    <div className="pt-[70px] pb-[70px]">
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">

          {/* All button */}
          <button
            className={`outline-none rounded-lg cursor-pointer transition-all duration-150 ease-in-out 
            border border-solid border-black px-4 py-2 sm:px-6 sm:py-3 
            text-[14px] sm:text-[18px] uppercase focus:outline-none 
            hover:bg-[#203e72] hover:text-white
            ${selectedCategory === undefined ? " bg-[#203e72] text-white" : "text-black"}`}  
            onClick={handleReset}
          >
            {t("all")} 
          </button>

          {/* Categories */}
          {categories.map((category, i) => (
            <div key={i}>
              <button
                onClick={() => handleCategoryChange(category)}
                className={`outline-none rounded-lg cursor-pointer transition-all duration-150 ease-in-out 
                border border-solid border-black px-4 py-2 sm:px-6 sm:py-3 
                text-[14px] sm:text-[18px] uppercase focus:outline-none 
                hover:bg-[#203e72] hover:text-white
                ${selectedCategory === category ? " bg-[#203e72] text-white" : "text-black"}
              `}
              >
                {t(category)} {/* Translate category text */}
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

type FilterProps = {
  selectedCategory: ProductType | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
};

export default Filter;
