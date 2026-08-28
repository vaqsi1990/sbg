import { Link } from "@/i18n/navigation";
import React from "react";
import { useLocale } from "next-intl";
import { ProductType } from "@/lib/ProductType";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CardsProps {
  products: ProductType[];
}

function Cards({ products }: CardsProps) {
  const locale = useLocale();
  const isGe = locale === "ge";

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:gap-x-6 lg:gap-y-12">
      {products.map((product) => {
        const title = isGe ? product.titleKa : product.titleEn;
        const category = isGe ? product.categoryKa : product.categoryEn;
        const primaryImage: string = product.images?.[0] ?? "/default-image.jpg";
        const secondaryImage: string = product.images?.[1] ?? primaryImage;
        const hasSecondImage = secondaryImage !== primaryImage;

        return (
          <article key={product.id} className="group">
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/60 mb-3 sm:mb-4">
                <Image
                  height={500}
                  width={400}
                  quality={80}
                  loading="lazy"
                  src={primaryImage}
                  alt={title}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                    hasSecondImage ? "group-hover:opacity-0 duration-500" : ""
                  }`}
                />
                {hasSecondImage && (
                  <Image
                    height={500}
                    width={400}
                    quality={80}
                    loading="lazy"
                    src={secondaryImage}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 dark:bg-white/15 dark:text-white dark:backdrop-blur-md dark:border dark:border-white/25">
                  <ArrowUpRight className="h-4 w-4 text-neutral-900 dark:text-white" strokeWidth={2.25} />
                </span>
              </div>

              <div className="space-y-1 px-0.5">
                {category ? (
                  <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">{category}</p>
                ) : null}
                <h2 className="text-[16px] md:text-[18px] font-medium text-foreground leading-snug line-clamp-2 tracking-tight">
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
