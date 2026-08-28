'use client';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from "@/i18n/navigation";
import Image from 'next/image';

type SimplifiedProduct = {
    id: string;
    titleEn: string;
    titleKa: string;
    images: string[];
  };
  
  type Props = {
    products: SimplifiedProduct[];
    locale: string;
  };

const ProductCarousel = ({ products, locale }: Props) => {
  const isGe = locale === 'ge';

  return (
    <div className="w-full overflow-y-hidden mt-10">
      <h2 className="text-xl lg:text-[25px] font-semibold mb-[50px] text-center text-foreground">
        {isGe ? 'მსგავსი პროდუქტები' : 'Similar Products'}
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
     
        
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
              <div key={product.id} className="max-w-sm w-full rounded-2xl shadow-xl  lg:mb-9 relative group">
            <div className="w-full h-96 cursor-pointer overflow-hidden relative rounded-lg">
              <Link href={`/product/${product.id}`}>
                <Image height={384} width={384} 
                  className="w-full h-full object-cover group-hover:scale-110 duration-500 rounded-lg"
                  src={product.images?.[0] ?? '/default-image.jpg'} 
                 alt="product"
                />
              </Link>
            </div>

 
            <div className="border border-border bg-card rounded-b-2xl flex flex-col justify-between leading-normal">
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h2 className="relative text-foreground font-bold text-xl after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full">
                  {isGe ? product.titleKa : product.titleEn}
                  </h2>
                </Link>
             
              </div>
            </div>
          </div>
           
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
