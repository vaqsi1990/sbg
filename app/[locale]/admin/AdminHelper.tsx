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
        <div className="ml-10 pt-10 flex justify-center mt-10 justify-between pr-10">
            <form action={logoutAdmin}>
            <button
              type="submit"
              className="cursor-pointer rounded-md border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:border-brand-chrome hover:bg-brand-chrome hover:text-white"
            >
              გასვლა
            </button>
          </form>
          
      
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
