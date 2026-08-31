/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/validators";
import { createProduct } from "@/lib/actions/actions";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { CatalogItemDTO } from "@/lib/actions/catalog";
import ProductFormFields, {
  type ProductFormData,
  type ProductFormValues,
} from "./ProductFormFields";

export default function AdminForm({ catalogItems = [] }: { catalogItems?: CatalogItemDTO[] }) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  const form = useForm<ProductFormValues, unknown, ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      titleEn: "",
      titleKa: "",
      categoryEn: "Mattress",
      categoryKa: "მატრასი",
      images: [],
      type: "MATTRESS",
      height: "",
      size1: "",
      size2: "",
      size3: "",
      size4: "",
      sizes: [""],
      firmnessLevel: 0,
      secondtextEn: "",
      secondtext: "",
      descriptionEn: "",
      descriptionKa: "",
      minitext: "",
      minitextEn: "",
      springTech: false,
      orthopaedic: false,
      superSoftFoam: false,
      visconFabric: false,
      graphiteViscoFoam: false,
      carbonYarnTechnologyPillowTopMattress: false,
      middleComfortLayer: false,
      visconFabricSoftComfortLayer: false,
      copperViscoLayer: false,
      cncFoamTechnology: false,
      softComfortLayer: false,
      firmComfortLayer: false,
      aloeveraFabric: false,
      breathable: false,
      doubleSided: false,
      knitte: false,
      wool: false,
      visco: false,
      dns: false,
      latex: false,
      washable: false,
      coconutLayer: false,
      featureIds: [],
      infoSections: [],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setPending(true);
    setStatus("");
    const res = await createProduct(data);
    setPending(false);
    setStatus(res.message);
    alert(res.message);
    if (res.success) {
      form.reset();
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-28">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <ProductFormFields form={form} catalogItems={catalogItems} />

          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
              <p className="truncate text-base text-muted-foreground">{status || "შეავსე სექციები და დააჭირე შექმნას"}</p>
              <Button
                type="submit"
                disabled={pending}
                className="h-11 cursor-pointer bg-brand-chrome px-6 text-base text-white hover:bg-brand-chrome/90"
              >
                {pending ? "ინახება..." : "შექმენი პროდუქტი"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
