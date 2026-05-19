import React from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative w-full h-[850px] text-white flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          preload="none"
          playsInline
        >
          <source src="/hero/sleep-and-bed-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="container mx-auto flex flex-col relative z-10 items-center justify-center h-full">
        <h1 className="text-white text-center text-[25px] md:text-[50px] font-normal">
          Sleep & Bed Georgia
        </h1>
        <p className="max-w-[672px] mb-7 text-white text-bold text-center mx-auto lg:text-xl">
          {t("heroheader")}
        </p>
        <Link
          href="/all"
          className="outline-none rounded-lg cursor-pointer transition-all duration-150 ease-in-out 
                 border border-solid border-black px-4 py-2 sm:px-6 sm:py-3 
                 text-[14px] sm:text-[18px] uppercase focus:outline-none 
                 bg-[#203e72] hover:text-white"
        >
          {t("herolink")}
        </Link>
      </div>
    </section>
  );
}

export default Hero;
