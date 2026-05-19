import { Link } from "@/i18n/navigation";
import React from "react";
import { useLocale } from 'next-intl';
import { ProductType } from "@/lib/ProductType";

import Image from "next/image";

interface CardsProps {
  products: ProductType[];
}

function Cards({ products }: CardsProps) {
  const locale = useLocale();
  const isGe = locale === 'ge';

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
      {products.map((product) => {
        const title = isGe ? product.titleKa : product.titleEn;
        const category = isGe ? product.categoryKa : product.categoryEn;
        const primaryImage: string = product.images?.[0] ?? '/default-image.jpg';
        const secondaryImage: string = product.images?.[1] ?? primaryImage;

        return (
          <div key={product.id} className="max-w-sm w-full rounded-2xl shadow-xl mb-9 relative group">
            <div className="w-full h-96 cursor-pointer overflow-hidden relative rounded-lg">
              <Link href={`/product/${product.id}`}>
                <Image
                  height={384}
                  width={384}
                  quality={70}
                  loading="lazy"
                  src={primaryImage}
                  alt={title}
                  className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                />
                <Image
                  height={384}
                  width={384}
                  quality={70}
                  loading="lazy"
                  src={secondaryImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                />
              </Link>
            </div>

            <div className="border border-gray-100 bg-white rounded-b-2xl flex flex-col justify-between leading-normal">
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h2 className="relative text-gray-800 font-bold text-xl after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                    {title}
                  </h2>
                </Link>
                <p className="text-[16px] lg:text-[18px] mb-5 text-gray-600 font-normal">
                  {category}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
