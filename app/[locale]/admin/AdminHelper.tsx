import React from "react";

import logo from "@/public/about/axali.jpg";

import Image from "next/image";
import { getAllProduct } from "@/lib/actions/actions";
import AdminSwitch from "./AdminSwitch";
import { Link } from "@/i18n/navigation";

async function AdminHelper() {
  const productsData = await getAllProduct();

  return (
    <main className="mt-7 space-y-6 items-center">
        <div className="ml-10">
          <Link className="w-[200px] cursor-pointer" href="/">
            <div className="border w-[70px] border-gray-500 rounded-full">
              <Image src={logo} height={70}  width={70} alt="logo" className="rounded-full" />
            </div>
          </Link>
      
        </div>
      <div className="flex flex-col   justify-center ">
        <div className="space-y-6 flex flex-col items-center">
   
        <div className="w-full ">
    <AdminSwitch products={productsData.data} />
  </div>
        </div>

      </div>
    </main>
  );
}

export default AdminHelper;
