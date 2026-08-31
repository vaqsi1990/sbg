"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/validators";
import { updateProduct } from "@/lib/actions/actions";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import type { CatalogItemDTO } from "@/lib/actions/catalog";
import ProductFormFields, {
  type ProductFormData,
  type ProductFormValues,
} from "../../ProductFormFields";

export default function AdminProductUpdateForm({
  initialData,
  catalogItems = [],
}: {
  initialData: ProductFormData & { id: string };
  catalogItems?: CatalogItemDTO[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const { id, ...formDefaults } = initialData;

  const form = useForm<ProductFormValues, unknown, ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      featureIds: [],
      infoSections: [],
      sizes: [""],
      ...formDefaults,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setPending(true);
    setStatus("");
    const res = await updateProduct({ ...data, id });
    setPending(false);
    setStatus(res.message);
    alert(res.message);
    if (res.success) {
      router.push("/admin");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-28">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-foreground">პროდუქტის რედაქტირება</h1>
        <Link href="/admin" className="text-base text-brand hover:underline">
          ← უკან დაბრუნება
        </Link>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <ProductFormFields form={form} catalogItems={catalogItems} lockType />

          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
              <p className="truncate text-base text-muted-foreground">{status || "შეინახე ცვლილებები"}</p>
              <Button
                type="submit"
                disabled={pending}
                className="h-11 cursor-pointer bg-brand-chrome px-6 text-base text-white hover:bg-brand-chrome/90"
              >
                {pending ? "ინახება..." : "განაახლე პროდუქტი"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
