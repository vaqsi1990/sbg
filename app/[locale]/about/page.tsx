
"use client";
import React, { useState } from "react";
import image from "@/public/about/sleepandbed.svg";
import Image from "next/image";
import bg2 from "@/public/about/Sleep-Bed.jpg";
import Carousel from "./Carousel";
import PageHeader from "@/components/PageHeader";
import { useTranslations } from "next-intl";

const pStyles: React.CSSProperties = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

function Page() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("about");

  return (
    <section className="w-full bg-background">
      <PageHeader title={t("products")} subtitle={t("comf")} />

      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-14 lg:mb-20">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <Image
              src={image}
              alt="About Us"
              className="w-[220px] lg:max-w-[320px] h-auto rounded-xl"
            />
            <p className="mt-6 text-xl lg:text-2xl font-bold tracking-tight text-foreground">
              {t("sleep")}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-base lg:text-lg text-center md:text-left leading-relaxed text-muted-foreground">
              {t("our")}
            </p>
          </div>
        </div>

        <div className="brand-panel mb-14 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Image
              src={bg2}
              alt="Sleep & Bed"
              className="w-full rounded-2xl object-cover ring-1 ring-white/10"
            />
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">{t("story")}</h2>
              <p
                style={open ? {} : pStyles}
                className="text-base lg:text-lg leading-relaxed text-white/85"
              >
                {t("sb")}
              </p>
              <button
                onClick={() => setOpen(!open)}
                className="mt-6 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/20"
              >
                {open ? t("less") : t("more")}
              </button>
            </div>
          </div>
        </div>

        <Carousel />
      </div>
    </section>
  );
}

export default Page;
