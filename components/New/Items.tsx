import React from 'react'
import { ProductType } from "@/lib/ProductType";
import Cards from '../Cards/Cards';
import { useTranslations } from 'next-intl';
function Items({ products }: { products: ProductType[] }) {
    const t = useTranslations("new");
  return (
    <div className="mt-10 lg:mt-32 flex flex-col  paddings mx-auto">
    <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center mb-6 lg:mb-0">
     <h2 className="text-xl lg:text-[25px] leading-tight text-center mb-4 font-semibold">
       {t("ourProducts")} 
     </h2>
    
   </div>
 <Cards products={products} />
</div>
  )
}

export default Items