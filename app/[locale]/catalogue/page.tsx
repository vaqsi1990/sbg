import React from "react";
import "./cat.css";
import image from "@/public/about/sleepandbed.svg";
import Image from "next/image";
import first from "@/public/catalog/1.jpg";
import sec from "@/public/catalog/2.jpg"
import Link from "next/link";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("cataloge");
  const pdfUrl = "/catalog/1.pdf";
  const pdfUrl2 = "/catalog/2.pdf";
  return (
    <section className="w-full mx-auto ">
      <div>
        <div
          className="flex min-h-[50vh] items-center flex-wrap bg-overlay pt-40 lg:pt-48 pb-12 sm:px-6 before:bg-title before:bg-opacity-70"
          style={{ backgroundImage: "url('/prod/why.jpg')" }}
        >
          <div className="text-center z-50 w-full">
            <h2 className="text-white text-[25px] md:text-[50px] font-normal text-center">
              {t("whyUsTitle")}
            </h2>
            <p className="max-w-[672px] text-white mx-auto lg:text-xl">
              {t("sleep")}
            </p>
          </div>
        </div>
      </div>

      <div className="allcontainer">
        <div className="container pt-12 lg:pt-16 lg:!pb-16 mx-auto">
          <div className="py-10 px-4">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="w-full md:ml-6 md:w-1/2 flex justify-center mx-auto flex-col items-center md:items-start text-center md:text-left">
                <Image
       
                  src={image}
                  alt="About Us"
                  className="w-[250px] lg:max-w-[350px] h-auto object-cover rounded-lg"
                />
                <p className="mt-5 text-xl max-w-[672px] lg:text-[25px] leading-tight text-center mb-4 font-semibold">
                  {t("bestSleepForEveryone")}
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <p className="text-lg text-center leading-relaxed">
                  {t("header")}
                </p>
              </div>
            </div>
          </div>

          {/* First Content Block */}
          <section className="lg:py-[40px]">
            <section className="py-[20px] ">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row lg:flex-row lg:gap-x-[100px]">
                  <div className="flex-1 order-1 lg:-order-1">
                    <Image
              
                      alt="..."
                      className="max-w-full rounded-lg shadow-lg"
                      src={first}
                    />
                  </div>

                  <div className="flex-1 mt-10 lg:mt-0 flex flex-col gap-y-4 justify-center order-1 lg:-order-1">
                    <h3 className="text-xl lg:text-[25px] leading-tight text-center font-semibold">
                      {t("collection")}
                    </h3>
                    <div className="font-normal text-lg max-lg:text-center max-w-2xl mx-auto lg:mb-9">
                      <p className="text-[16px] text-center lg:text-[18px] leading-relaxed">
                        {t("first")}
                      </p>
                    </div>
                    <Link
                      className="outline-none mb-6 mx-auto rounded-lg cursor-pointer transition-all duration-150 ease-in-out border border-solid border-black px-4 py-2 sm:px-6 sm:py-3 text-[14px] sm:text-base uppercase focus:outline-none  bg-[#203e72] text-white"
                      target="_blank"
                      href={pdfUrl}
                    >
                      {t("button")}
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </section>

          {/* Second Content Block */}
          <section className="py-[20px] lg:py-[30px]">
            <div className="container mx-auto">
              <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row lg:gap-x-[100px]">
                <div className="flex-1 mt-10 lg:mt-0 flex flex-col gap-y-4 justify-center order-1 lg:-order-1">
                  <h3 className="text-xl lg:text-[25px] leading-tight text-center font-semibold">
                    {t("collection")}
                  </h3>
                  <div className="font-normal text-lg max-lg:text-center max-w-2xl mx-auto lg:mb-9">
                    <p className="text-[16px] text-center lg:text-[18px] leading-relaxed">
                      {t("second")}
                    </p>
                  </div>
                  <Link
                    className="outline-none mb-6 mx-auto rounded-lg cursor-pointer transition-all duration-150 ease-in-out border border-solid border-black px-4 py-2 sm:px-6 sm:py-3 text-[14px] sm:text-base uppercase focus:outline-none  bg-[#203e72] text-white"
                    target="_blank"
                    href={pdfUrl2}
                  >
                    {t("button")}
                  </Link>
                </div>
                <div className="flex-1 flex flex-col">
                  <Image
          
                    alt="..."
                    className="max-w-full h-[30vh] mb-5 lg:h-[50vh] rounded-lg shadow-lg"
                    src={sec}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Page;
