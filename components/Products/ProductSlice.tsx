'use client';

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { useTranslations} from "next-intl";

import Cards from "../Cards/Cards";
import { ProductType } from "@/lib/ProductType";
import "./single.css";


export default function ProductSlice({ products }: { products: ProductType[] }) {
  const t = useTranslations("slice"); // გამოიყენე შენი namespace თუ გაქვს


  return (
    <section className="mt-5 pt-16">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center mb-6 lg:mb-0">
          <h2 className="text-xl lg:text-[25px] leading-tight text-center mb-4 font-semibold">
            {t("ourProducts")} 
          </h2>
          <div className="flex items-center gap-2 group">
            <Link
              href={`/all`}
              className="flex text-[16px] lg:text-[18px] gap-2 items-center hover:text-primary font-medium transition-all border-primary"
            >
              <span>{t("viewAll")}</span> {/* მაგალითად: დაათვალიერე */}
              <span className="transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300">
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>

        <Cards products={products} />
      </div>
    </section>
  );
}
