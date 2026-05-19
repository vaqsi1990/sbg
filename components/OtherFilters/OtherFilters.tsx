'use client';

import React from 'react';
import { Link } from "@/i18n/navigation";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css/grid';
import SlugLinks from './Sluglinks';
import { Button } from "@/components/ui/button";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
const OtherFilters = () => {
  const params = useParams();
  const locale = params?.locale as string;
  const isGe = locale === 'ge';

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
          {SlugLinks.map((item, index) => (
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
                  />
                </div>
                <span className="text-sm text-center font-medium text-gray-800 group-hover:text-black transition">
                  {isGe ? item.label : item.labelEn}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
  
  
        <Button
  className="swiper-button-prev absolute left-[0.5px] top-1/2 transform -translate-y-12 bg-gray-100 text-2xl text-gray-500 cursor-pointer z-10"
  aria-label="Previous"
>
  <FaArrowLeft />
</Button>

<Button
  className="swiper-button-next absolute right-[0.5px] top-1/2 transform -translate-y-12 bg-gray-100 text-2xl text-gray-500 cursor-pointer z-10"
  aria-label="Next"
>
  <FaArrowRight />
</Button>


        
      </div>
    </div>
  
    {/* დიდ ეკრანზე grid */}
    <div className="hidden lg:grid grid-cols-4 xl:grid-cols-5 gap-6">
      {SlugLinks.map((item, index) => (
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
            />
          </div>
          <span className="text-sm text-center font-medium text-gray-800 group-hover:text-black transition">
            {isGe ? item.label : item.labelEn}
          </span>
        </Link>
      ))}
    </div>
  </div>
  
  );
};

export default OtherFilters;
