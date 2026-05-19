import { Link } from "@/i18n/navigation";
import React from 'react'

import { useTranslations } from "next-intl";
import {  FaFacebook, FaInstagram,  FaTiktok } from 'react-icons/fa'

function Footer() {
    const t = useTranslations("navitems");
  return (
    <footer className="relative  bg-[#203e72] text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
      <nav className="flex flex-wrap justify-center -mx-5 -my-2">
 
            <div className="px-5 py-2">
                <Link href="/about"  className="text-base text-[16px] lg:text-[18px] leading-6 text-white">
                {t('aboutUs')}
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link href="/all"  className="text-base text-[16px] lg:text-[18px] leading-6 text-white">
                {t('products')}
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link href="/why"  className="text-base text-[16px] lg:text-[18px] leading-6 text-white">
                {t('whySleepAndBed')}
                </Link>
            </div>
            <div className="px-5 py-2">
                <Link href="/catalogue"  className="text-base text-[16px] lg:text-[18px] leading-6 text-white">
                {t('catalogue')}
                </Link>
            </div>
           
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
            <a href="https://www.facebook.com/SleepandBed.Georgia" target='_blank' className="text-white text-2xl ">
                <FaFacebook />
            </a>
            <a href="https://www.instagram.com/sleepandbed_geo?igsh=Zm1jcjV3eGhwZWRj&utm_source=qr" className="text-white text-2xl">
                <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@sleepandbed_geo?_t=ZS-8v5HPyIrTJx&_r=1" className="text-white text-2xl">
               <FaTiktok />
            </a>
           
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
