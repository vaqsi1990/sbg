"use client";

import React from "react";
import first from "@/public/prod/new.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Info() {
  const t = useTranslations("infopage");

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      <div className="w-full lg:w-1/2">
        <Image
          alt="Sleep & Bed showroom"
          className="w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
          src={first}
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
        <h3 className="text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
          {t("Infoheading")}
        </h3>
        <p className="text-base lg:text-lg leading-relaxed text-white/85">
          {t("Infoparagraph")}
        </p>
      </div>
    </div>
  );
}

export default Info;
