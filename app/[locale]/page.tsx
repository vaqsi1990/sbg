import Contact from "@/components/Contact/Contact";

import Info from "@/components/Info/Info";
import Products from "@/components/Products/Products";
import Video from "./why/Video";

import Hero from "@/components/Hero/Hero";
import Text from "@/components/WaweText/Text";
import NewProduct from "@/components/New/newProduct";

export default function Home() {
  return (
    <div className="w-full bg-background">
      <Hero />

      <section className="page-section pt-12 lg:pt-16 pb-8 lg:pb-12">
        <NewProduct />
      </section>

      <section className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14">
        <div className="brand-panel">
          <Info />
        </div>
      </section>

      <Products />

      <section className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-20">
        <div className="brand-panel">
          <Video />
        </div>
      </section>

      <Contact />
      <Text />
    </div>
  );
}
