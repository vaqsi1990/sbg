import React from "react";
import { Link } from "@/i18n/navigation";

function Banner() {
  return (
    <div
      className="relative flex items-center justify-center py-24 mb-24 bg-cover bg-center bg-fixed text-white overflow-hidden"
      style={{ backgroundImage: "url('/Sleep-Bed.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-5 max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg">
          კომფორტული ძილი ყველასთვის
        </h1>
        <Link href="/all" className="productLink mt-6">
          დაათვალიერე
        </Link>
      </div>
    </div>
  );
}

export default Banner;
