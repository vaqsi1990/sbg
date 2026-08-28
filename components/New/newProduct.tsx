import { getAllProduct } from "@/lib/actions/actions";
import React from "react";

import Items from "./Items";

async function NewProduct() {
  const { data } = await getAllProduct("MATTRESS");
  const items = data.slice(0, 4);

  return <Items products={items} />;
}

export default NewProduct;
