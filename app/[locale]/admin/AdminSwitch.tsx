'use client';

import { useState } from 'react';
import All from './All';
import AdminForm from './AdminForm';
import { ProductType } from '@/lib/ProductType';

export default function AdminSwitch({ products }: { products: ProductType[] }) {
  const [activeComponent, setActiveComponent] = useState<"all" | "form">("all");
 
  return (
    <>
  <div className="flex flex-wrap justify-center gap-6 ">
    <button
      onClick={() => setActiveComponent("all")}
      className="inline-flex cursor-pointer px-5 py-3 text-black  hover:bg-[#203e72] hover:text-white border border-[#203e72] rounded-md"
    >
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
      პროდუქტები
    </button>

    <button
      onClick={() => setActiveComponent("form")}
      className="inline-flex cursor-pointer px-5 py-3 text-white  bg-[#203e72]  rounded-md"
    >
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      დაამატე პროდუქტის
    </button>
  </div>

  {/* Section */}
  <section className=" mt-6">
    {activeComponent === "all" && <All products={products} />}
    {activeComponent === "form" && <AdminForm />}
  </section>
    </>
  );
}
