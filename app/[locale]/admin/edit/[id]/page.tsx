/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleProduct } from "@/lib/actions/actions";
import AdminProductUpdateForm from "./AdminProductUpdateForm";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { getCatalogItems } from "@/lib/actions/catalog";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { ProductFormData } from "../../ProductFormFields";

const DetailPage = async (props: {
  params: Promise<{ id: string; locale: string }>;
}) => {
  const { id, locale } = await props.params;
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    redirect({ href: "/admin", locale });
  }

  const [product, catalogItems] = await Promise.all([
    getSingleProduct(id),
    getCatalogItems(),
  ]);

  if (!product) return notFound();

  const flattenedProduct = {
    ...product,
    ...(product.type === "MATTRESS" && product.mattress ? product.mattress : {}),
    ...(product.type === "PAD" && product.pad ? product.pad : {}),
    ...(product.type === "PILLOW" && product.pillow ? product.pillow : {}),
    ...(product.type === "QUILT" && product.quilt ? product.quilt : {}),
    featureIds: product.catalogItems?.map((row) => row.itemId) ?? [],
  };

  delete (flattenedProduct as any).mattress;
  delete (flattenedProduct as any).pad;
  delete (flattenedProduct as any).pillow;
  delete (flattenedProduct as any).quilt;
  delete (flattenedProduct as any).catalogItems;
  delete (flattenedProduct as any).createdAt;
  delete (flattenedProduct as any).updatedAt;

  return (
    <main className="mt-24">
      <AdminProductUpdateForm
        initialData={flattenedProduct as ProductFormData & { id: string }}
        catalogItems={catalogItems}
      />
    </main>
  );
};

export default DetailPage;
