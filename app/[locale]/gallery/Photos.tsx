/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { useTranslations } from "next-intl";
import Image from "next/image";
const images = Array.from({ length: 12 }, (_, i) => `/gallery/${i + 1}.jpg`);
import bg from '@/public/prod/breadcumb.jpg'
import { FiX } from "react-icons/fi";
export default function GalleryPage() {
  const [data, setData] = useState({ img: "", i: 0 });

  const viewImage = (img: string, i: number) => {
    setData({ img, i });
  };

  const closeImage = () => {
    setData({ img: "", i: 0 });
  };

  const nextImage = () => {
    if (data.i + 1 < images.length) {
      setData({ img: images[data.i + 1], i: data.i + 1 });
    }
  };

  const prevImage = () => {
    if (data.i > 0) {
      setData({ img: images[data.i - 1], i: data.i - 1 });
    }
  };
  const t = useTranslations("navitems");
  return (
    <section className="w-full mx-auto">
      {/* Header */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-40 lg:pt-48 pb-12">
   <Image
     src={bg}
     alt="Background"
     fill
     priority={false}
     quality={80}
     className="object-cover z-0"
   />
   <div className="absolute inset-0 bg-black/60 z-10" />
   <div className="text-center z-20 px-4">
     <h2 className="text-white text-[25px] md:text-[50px] font-normal">
       {t("gallery")}
     </h2>
  
   </div>
 </div>

      {/* Fullscreen Image Viewer */}
      {data.img && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex justify-center items-center"
          style={{ overflow: "hidden" }}
        >
          <button
            className="absolute cursor-pointer top-6 right-6 text-white text-3xl font-bold hover:text-gray-500"
            onClick={closeImage}
          >
           <FiX className="text-white mr-4" size={24} />
          </button>

          {data.i > 0 && (
            <button
              className="absolute cursor-pointer left-6 text-white text-4xl font-bold hover:text-gray-400"
              onClick={prevImage}
            >
              ‹
            </button>
          )}

          <Image  
            alt="fullscreen"
            src={data.img}
            width={350} height={350}
            className="max-w-[75%] max-h-[90%] object-contain"
          />

          {data.i + 1 < images.length && (
            <button
              className="absolute cursor-pointer right-6 text-white text-4xl font-bold hover:text-gray-400"
              onClick={nextImage}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* Masonry Gallery */}
      <div className="allcontainer">
        <div className="container pt-12 pb-12 lg:pt-16 lg:!pb-16 mx-auto">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="10px">
              {images.map((image, i) => (
                <Image  
                  key={i} width={300} height={300}
                  src={image}
                  onClick={() => viewImage(image, i)}
                  style={{ width: "100%", display: "block", cursor: "pointer", borderRadius: "10px" }}
                  alt={`gallery-image-${i + 1}`}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </section>
  );
}
