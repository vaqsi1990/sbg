/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleProduct } from "@/lib/actions/actions";
import AdminProductUpdateForm from "./AdminProductUpdateForm";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { z } from "zod";
import { ProductSchema } from "@/lib/validators";


const DetailPage = async(props: {
  params:Promise< {id:string} >
}) =>  {
  const { id} = await props.params;
  const product = await getSingleProduct(id);

  if (!product) return notFound();

  const flattenedProduct = {
    ...product,
    ...(product.type === "MATTRESS" && product.mattress ? product.mattress : {}),
    ...(product.type === "PAD" && product.pad ? product.pad : {}),
    ...(product.type === "PILLOW" && product.pillow ? product.pillow : {}),
    ...(product.type === "QUILT" && product.quilt ? product.quilt : {}),
  };

  delete (flattenedProduct as any).mattress;
  delete (flattenedProduct as any).pad;
  delete (flattenedProduct as any).pillow;
  delete (flattenedProduct as any).quilt;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">პროდუქტის რედაქტირება</h1>
       <Link href='/admin'> უკან დაბრუნება </Link>
       <AdminProductUpdateForm initialData={flattenedProduct as z.infer<typeof ProductSchema> & { id: string }} />

    </div>
  );
}
export default DetailPage;