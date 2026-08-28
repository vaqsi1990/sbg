import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative w-full min-h-[70vh] md:h-[85vh] max-h-[900px] text-white flex items-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60 z-10" />
      <div className="container mx-auto flex flex-col relative z-10 items-center justify-center h-full px-4 py-24 text-center">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
          Sleep &amp; Bed Georgia
        </h1>
        <p className="max-w-2xl mb-10 text-white/85 text-base md:text-xl leading-relaxed">
          {t("heroheader")}
        </p>
        <Link
          href="/all"
          className="inline-flex items-center gap-2 rounded-full bg-brand-chrome px-8 py-3.5 text-sm sm:text-base font-semibold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-brand-chrome/90 hover:shadow-xl"
        >
          <span>{t("herolink")}</span>
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
        </Link>
      </div>
    </section>
  );
}

export default Hero;
