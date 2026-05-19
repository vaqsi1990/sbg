import Contact from "@/components/Contact/Contact";

import Info from "@/components/Info/Info";
import Products from "@/components/Products/Products";
import Video from "./why/Video";

import Hero from "@/components/Hero/Hero";
import Text from "@/components/WaweText/Text";
import NewProduct from "@/components/New/newProduct";

export default function Home() {
  return (
    <>
      #203e72
      <div className="w-full   bg-[#EBEBEB]">
        <Hero />
        <div className="mt-10 lg:mt-14">
          <NewProduct />
        </div>
        <div className="flex rounded-lg text-white container bg-[#203e72] mt-10 lg:mt-14   py-10">
          <Info />
        </div>
        <Products />
        <div className="flex rounded-lg container bg-[#203e72] mt-14   py-10">
          <Video />
        </div>
        <Contact />

        <Text />
      </div>
    </>
  );
}
