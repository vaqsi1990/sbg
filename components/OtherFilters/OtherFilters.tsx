"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getCatalogItems, type CatalogItemDTO } from "@/lib/actions/catalog";
import SlugLinks from "./Sluglinks";

const OtherFilters = () => {
  const params = useParams();
  const locale = params?.locale as string;
  const isGe = locale === "ge";
  const [catalogItems, setCatalogItems] = useState<CatalogItemDTO[]>([]);

  useEffect(() => {
    getCatalogItems().then(setCatalogItems).catch(() => setCatalogItems([]));
  }, []);

  const extraLinks = catalogItems.map((item) => ({
    key: item.slug,
    label: item.labelKa,
    labelEn: item.labelEn,
    href: item.href || `/feature/${item.slug}`,
    logo: item.image,
  }));
  const links = extraLinks.length ? extraLinks : SlugLinks;

  const filterLinkClass =
    "group flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50";

  return (
    <div className="w-full">
      <div className="mb-8 lg:mb-10 w-full">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-center text-foreground">
          {isGe ? "ფილტრები" : "Browse by Feature"}
        </h2>
      </div>

      <Swiper
        key={links.length}
        spaceBetween={16}
        slidesPerView={2}
        grabCursor
        breakpoints={{
          480: { slidesPerView: 2.5, spaceBetween: 14 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 16 },
        }}
        className="!pb-1"
      >
        {links.map((item, index) => (
          <SwiperSlide key={`${item.key}-${index}`} className="!h-auto">
            <Link href={item.href} className={filterLinkClass}>
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={item.logo}
                  alt={isGe ? item.label : item.labelEn}
                  fill
                  className="object-contain"
                  unoptimized={item.logo.startsWith("http")}
                />
              </div>
              <span className="text-[13px] sm:text-sm text-center font-medium text-foreground leading-snug line-clamp-2">
                {isGe ? item.label : item.labelEn}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OtherFilters;
