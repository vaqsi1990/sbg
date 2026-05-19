
import React from "react";


import "./single.css";

import { getAllProduct } from "@/lib/actions/actions";
import ProductSlice from "./ProductSlice";



async function Products() {
  const { data } = await getAllProduct();
  const items = data.slice(0, 4)

  
  return (


 <ProductSlice products={items} />
  
  );
}

export default Products;
