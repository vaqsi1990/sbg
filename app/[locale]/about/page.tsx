
"use client"
import React from "react";
import "./about.css";
import image from "@/public/about/sleepandbed.svg";
import Image from "next/image";
import bg2 from "@/public/about/Sleep-Bed.jpg";
import Carousel from "./Carousel";
import {  useState } from "react";
import { useTranslations } from 'next-intl';
const pStyles: React.CSSProperties = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
};


function Page() {
  const [open, setOpen] = useState(false)
    const t = useTranslations("about");
  return (
    <>
      <section className="w-full mx-auto ">
        <div className="">
          <div className="flex h-[50vh] items-center flex-wrap bg-overlay sm:p-6 before:bg-title before:bg-opacity-70 aboutbg">
            <div className="text-center z-50 w-full">
              <h2 className="text-white sm:pt-10 pt-[50px] text-[25px] md:text-[50px] font-normal text-center">
              {t('products')}
              </h2>
              <p className="max-w-[672px] text-white mx-auto lg:text-xl">
              {t('comf')}
              </p>
            </div>
          </div>
        </div>

        <div className=" allcontainer">
          <div className="container pt-12 lg:pt-16 lg:!pb-16 mx-auto">
            <div className="py-10 px-4">
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                <div className="w-full md:w-1/2 flex justify-center mx-auto flex-col items-center md:items-start text-center md:text-left">
                  <Image
                    src={image} 
             
                    alt="About Us"
                    className="w-[250px] lg:max-w-[350px] h-auto object-cover rounded-lg"
                  />
                  <p className="mt-5 text-xl lg:text-[25px] leading-tight text-center mb-4 font-semibold">
                  {t('sleep')}
                  </p>
                </div>

                <div className="w-full md:w-1/2">
                  <p className="text-lg text-center leading-relaxed ">
                  {t('our')}
                  </p>
                </div>
              </div>
            </div>

            <section className="py-14 rounded-lg bg-[#203e72] text-white lg:py-24 relative">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
                  <div className="img-box">
                    <Image src={bg2} alt="About Us tailwind page" className="max-lg:mx-auto rounded-lg object-cover" />
                  </div>
                  <div className=" flex items-center">
                    <div className="data w-full">
                      <h2 className="text-xl lg:text-[25px] leading-tight text-center mb-4 font-semibold">
                      {t('story')}
                      </h2>
                      <p 
                      style={ open ? {} : pStyles }
                      className="text-lg leading-8  text-center max-w-2xl mx-auto">
                      {t('sb')}
                      </p>
                      <div className="flex justify-center">
  <button
    onClick={() => setOpen(!open)}
    className="outline-none text-[16px] lg:text-[18px] mb-6 mt-6 rounded-lg cursor-pointer transition-all duration-150 ease-in-out border border-solid border-black px-4 py-2 sm:px-6 sm:py-3  sm:text-base uppercase focus:outline-none bg-black text-white"
  >
    {open ?  t('less') : t('more')}
  </button>
</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mx-auto">
              <Carousel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
