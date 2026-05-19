"use client"
import dynamic from "next/dynamic";

const GalleryPage = dynamic(() => import("./Photos"), {
  ssr: false, 
});

function page() {
  return (
<GalleryPage />
  )
}

export default page