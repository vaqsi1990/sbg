"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

const YOUTUBE_ID = "jfV1TpkrP7g";
const THUMBNAIL =
  "/carousel/408326498_360902273177384_5389513661708983494_n.jpg";

function Video() {
  const t = useTranslations("infopage");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/25 shadow-2xl ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-white/70">
        {isPlaying ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
            title={t("videoTitle")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 cursor-pointer focus-visible:outline-none"
            aria-label={t("videoWatch")}
          >
            <Image
              src={THUMBNAIL}
              alt={t("videoThumbnailAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 transition-colors duration-300 group-hover:from-black/70" />

            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="relative flex h-16 w-16 items-center justify-center lg:h-20 lg:w-20">
                <span className="absolute -inset-2 rounded-full bg-white/15 ring-1 ring-white/25" />
                <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-brand shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play
                    className="ml-0.5 h-7 w-7 fill-current lg:h-8 lg:w-8"
                    strokeWidth={1.5}
                  />
                </span>
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium tracking-wide text-white backdrop-blur-md ring-1 ring-white/20 transition-colors duration-300 group-hover:bg-white/25">
                {t("videoWatch")}
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Video;
