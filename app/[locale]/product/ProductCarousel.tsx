"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type SimplifiedProduct = {
  id: string;
  titleEn: string;
  titleKa: string;
  images: string[];
};

type Props = {
  products: SimplifiedProduct[];
  locale: string;
};

const ProductCarousel = ({ products, locale }: Props) => {
  const isGe = locale === "ge";

  return (
    <div className="w-full overflow-hidden mt-10">
      <h2 className="section-heading-center mb-8 lg:mb-10">
        {isGe ? "მსგავსი პროდუქტები" : "Similar Products"}
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {products.map((product) => {
          const title = isGe ? product.titleKa : product.titleEn;
          const image = product.images?.[0] ?? "/default-image.jpg";

          return (
            <SwiperSlide key={product.id}>
              <article className="group pb-2">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/60 mb-3">
                    <Image
                      height={500}
                      width={400}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      src={image}
                      alt={title}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 dark:bg-white/15 dark:text-white dark:backdrop-blur-md dark:border dark:border-white/25">
                      <ArrowUpRight className="h-4 w-4 text-neutral-900 dark:text-white" strokeWidth={2.25} />
                    </span>
                  </div>
                  <h2 className="text-[16px] md:text-[18px] font-medium text-foreground leading-snug line-clamp-2 tracking-tight px-0.5">
                    {title}
                  </h2>
                </Link>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
