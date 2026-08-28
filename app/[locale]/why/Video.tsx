/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'
import Image from 'next/image';
function Video() {
    const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="relative rounded-lg    w-full max-w-2xl mx-auto">
    {!isPlaying ? (
      <div
        className="relative rounded-lg cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
     
        <Image height={300} width={300} 
          src="/prod/408326498_360902273177384_5389513661708983494_n.jpg"
          alt="Video Thumbnail"
          className="w-full  rounded-lg shadow-lg"
        />


        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/95 text-brand flex items-center justify-center rounded-full shadow-xl transition-transform duration-200 hover:scale-110">
          <span className="ml-1 text-xl">▶</span>
        </div>
      </div>
    ) : (
      <iframe width="100%" height="450" src="https://www.youtube.com/embed/jfV1TpkrP7g?si=Q4WHYxYI240ARtt0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    )}
  </div>
  )
}

export default Video