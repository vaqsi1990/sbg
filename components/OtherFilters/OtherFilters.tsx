'use client';

import React, { useEffect, useState } from 'react';
import { Link } from "@/i18n/navigation";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Grid, Navigation } from 'swiper/modules';

import SlugLinks from './Sluglinks';
import { Button } from "@/components/ui/button";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import { getCatalogItems, type CatalogItemDTO } from '@/lib/actions/catalog';

const OtherFilters = () => {
  const params = useParams();
  const locale = params?.locale as string;
  const isGe = locale === 'ge';
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

  return (
    <div className="w-full relative">
    <div className="block lg:hidden">
      <div className="relative">
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          grid={{
            rows: 2,
            fill: 'row',
          }}
          modules={[Grid, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              grid: {
                rows: 2,
              },
            },
          }}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
        >
          {links.map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                href={item.href}
                className="group rounded-2xl p-4 transition duration-300 flex flex-col items-center justify-center"
              >
                <div className="w-[60px] h-[60px] relative mb-2">
                  <Image
                    src={item.logo}
                    alt={isGe ? item.label : item.labelEn}
                    fill
                    className="object-contain"
                    unoptimized={item.logo.startsWith("http")}
                  />
                </div>
                <span className="text-[16px] md:text-[18px] text-center font-medium text-foreground  transition">
                  {isGe ? item.label : item.labelEn}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
  
  
        <Button
  className="swiper-button-prev absolute left-[0.5px] top-1/2 transform -translate-y-12 bg-muted text-2xl text-muted-foreground cursor-pointer z-10"
  aria-label="Previous"
>
  <FaArrowLeft />
</Button>

<Button
  className="swiper-button-next absolute right-[0.5px] top-1/2 transform -translate-y-12 bg-muted text-2xl text-muted-foreground cursor-pointer z-10"
  aria-label="Next"
>
  <FaArrowRight />
</Button>


        
      </div>
    </div>
  
    {/* დიდ ეკრანზე grid */}
    <div className="hidden lg:grid grid-cols-4 xl:grid-cols-5 gap-6">
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="group rounded-2xl p-4 transition duration-300 flex flex-col items-center justify-center"
        >
          <div className="w-[60px] h-[60px] relative mb-2">
            <Image
              src={item.logo}
              alt={isGe ? item.label : item.labelEn}
              fill
              className="object-contain"
              unoptimized={item.logo.startsWith("http")}
            />
          </div>
          <span className="text-sm text-center font-medium text-foreground transition">
            {isGe ? item.label : item.labelEn}
          </span>
        </Link>
      ))}
    </div>
  </div>
  
  );
};

export default OtherFilters;
