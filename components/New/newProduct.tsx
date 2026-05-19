import { getAllProduct } from "@/lib/actions/actions";
import React from "react";

import Items from "./Items";


async function NewProduct() {
  const { data } = await getAllProduct();
 
  const items = data
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);
  return (
 <Items products={items} />
  );
}

export default NewProduct;
