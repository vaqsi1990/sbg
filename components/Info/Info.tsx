"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const IMAGES = [
  { src: "/carousel/new.jpg", alt: "Sleep & Bed showroom" },
  { src: "/carousel/why.jpg", alt: "Sleep & Bed interiors" },
  { src: "/carousel/SleepBed-Sosyal-35.png", alt: "Sleep & Bed collection" },
  { src: "/carousel/SleepBed-Sosyal-43.png", alt: "Sleep & Bed bedding" },
  { src: "/carousel/SleepBed-Sosyal-46.png", alt: "Sleep & Bed products" },
  {
    src: "/carousel/408326498_360902273177384_5389513661708983494_n.jpg",
    alt: "Sleep & Bed gallery",
  },
  {
    src: `/carousel/${encodeURIComponent("SleepBed-Sosyal-41 kopyas\u00C4\u00B1.png")}`,
    alt: "Sleep & Bed lifestyle",
  },
];

const INTERVAL_MS = 5000;

function Info() {
  const t = useTranslations("infopage");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, index]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      <div className="w-full lg:w-1/2">
        <div
          className="relative h-[250px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={IMAGES[index].src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
              >
                <Image
                  src={IMAGES[index].src}
                  alt={IMAGES[index].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {IMAGES.map((image, i) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/45 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
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
