
"use client";
import React from "react";

import "./car.css";
import { useTranslations } from 'next-intl';
import Image from "next/image";

function Carousel() {
   const t = useTranslations('sertificats');
   const items = [
    {
      id: 1,
      title: 'BSCI',
      src: '/about/logo1.jpg',
      alt: 'First Image',
      description: t('BSCI'),
    },
    {
      id: 2,
      title: 'RCS',
      src: '/about/logo2.jpg',
      alt: 'Second Image',
      description: t('RCS'),
    },
    {
      id: 3,
      title: 'CERTİPUR',
      src: '/about/logo3.jpg',
      alt: 'Third Image',
      description: t('Sertipur'),
    },
    {
      id: 4,
      title: 'ISO9001',
      src: '/about/logo4.jpg',
      alt: 'Fourth Image',
      description: t('ISO9001'),
    },
    {
      id: 5,
      title: 'ISO14001',
      src: '/about/logo5.jpg',
      alt: 'Fifth Image',
      description: t('ISO14001'),
    },
    {
      id: 6,
      title: 'ISO45000',
      src: '/about/logo6.jpg',
      alt: 'Sixth Image',
      description: t('ISO45000'),
    },
    {
      id: 7,
      title: 'GRS Nedir',
      src: '/about/logo7.jpg',
      alt: 'Seventh Image',
      description: t('GRS'),
    },
    {
      id: 8,
      title: 'OEKOTEX',
      src: '/about/logo8.jpg',
      alt: 'Eighth Image',
      description: t('OEKOTEX'),
    },
  ];
  return (
    <section className="mb-10 mt-5">
      {/* Header Section */}
      <div className="flex flex-col text-center items-center">
        <h2 className="mt-5 text-xl lg:text-[25px] leading-tight text-center mb-4 font-semibold">
        {t('serf')}
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
        {t('serfText')}
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 place-items-center">
        {items.map((i) => (
          <div key={i.id} className="flex cursor-pointer flex-col items-center">
            <div className="imageeffect">
              <div className="box">
                <div className="imgBox">
                  <Image width={300} height={300}
                    src={i.src}
                 
                    alt={i.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="content text-center p-4">
                  <h2 className="font-semibold text-lg">{i.title}</h2>
                  <p className="text-[16px] lg:text-[18px]">{i.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
