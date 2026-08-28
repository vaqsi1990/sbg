import React from 'react';
import './banner.css';
import { Link } from "@/i18n/navigation";
console.log("Banner");
function Banner() {
  return (
    <>
      <div className="background-2 py-[100px]  !bg-gray-100 ">
        <div className="hero-overlay"></div>
        <div className="text-overlay">
          <h1 className=''>კომფორტული ძილი ყველასთვის</h1>
        
          <div className="col-span-full flex justify-center mt-6">
          <Link
            className="productLink rounded-2xl text-lg font-semibold "
            href="/all"
          >
            დაათვალიერე
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
