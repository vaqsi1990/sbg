import { Link } from "@/i18n/navigation";
import React from "react";
import { useLocale } from "next-intl";
import { ProductType } from "@/lib/ProductType";
import Image from "next/image";

interface CardsProps {
  products: ProductType[];
}

function Cards({ products }: CardsProps) {
  const locale = useLocale();
  const isGe = locale === "ge";

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 py-2">
      {products.map((product) => {
        const title = isGe ? product.titleKa : product.titleEn;
        const category = isGe ? product.categoryKa : product.categoryEn;
        const primaryImage: string = product.images?.[0] ?? "/default-image.jpg";
        const secondaryImage: string = product.images?.[1] ?? primaryImage;

        return (
          <article
            key={product.id}
            className="group elevated-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Link href={`/product/${product.id}`} className="block">
              <div className="aspect-[3/4] overflow-hidden relative bg-neutral-50 dark:bg-[#ececec]">
                <Image
                  height={480}
                  width={384}
                  quality={75}
                  loading="lazy"
                  src={primaryImage}
                  alt={title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-0"
                />
                <Image
                  height={480}
                  width={384}
                  quality={75}
                  loading="lazy"
                  src={secondaryImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4 lg:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-brand mb-2">
                  {category}
                </p>
                <h2 className="text-foreground font-semibold text-base lg:text-lg leading-snug line-clamp-2">
                  {title}
                </h2>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default Cards;
