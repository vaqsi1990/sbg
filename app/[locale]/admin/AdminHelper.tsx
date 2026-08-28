import React from "react";

import logo from "@/public/about/axali.jpg";

import Image from "next/image";
import { getAllProduct } from "@/lib/actions/actions";
import AdminSwitch from "./AdminSwitch";
import { Link } from "@/i18n/navigation";
import { logoutAdmin } from "@/lib/actions/admin-auth";
import { getCatalogItems } from "@/lib/actions/catalog";

async function AdminHelper() {
  const productsData = await getAllProduct();
  const catalogItems = await getCatalogItems();

  return (
    <main className="mt-24 space-y-6 items-center">
        <div className="ml-10 flex items-center justify-between pr-10">
          <Link className="w-[200px] cursor-pointer" href="/">
            <div className="border w-[70px] border-gray-500 rounded-full">
              <Image src={logo} height={70}  width={70} alt="logo" className="rounded-full" />
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/features"
              className="cursor-pointer rounded-md border border-[#203e72] px-4 py-2 text-sm text-black hover:bg-[#203e72] hover:text-white"
            >
              ზომა და მახასიათებლები
            </Link>
            <form action={logoutAdmin}>
            <button
              type="submit"
              className="cursor-pointer rounded-md border border-[#203e72] px-4 py-2 text-sm text-black hover:bg-[#203e72] hover:text-white"
            >
              გასვლა
            </button>
          </form>
          </div>
      
        </div>
      <div className="flex flex-col   justify-center ">
        <div className="space-y-6 flex flex-col items-center">
   
        <div className="w-full ">
    <AdminSwitch products={productsData.data} catalogItems={catalogItems} />
  </div>
        </div>

      </div>
    </main>
  );
}

export default AdminHelper;
