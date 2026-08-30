"use client";

import React, { useMemo, useState } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ProductSchema } from "@/lib/validators";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/navigation";
import ImageUpload from "./ImageUpload";
import FurnitureInfoFields from "./FurnitureInfoFields";
import type { CatalogItemDTO } from "@/lib/actions/catalog";

export type ProductFormValues = z.input<typeof ProductSchema>;
export type ProductFormData = z.output<typeof ProductSchema>;

const BooleanSchema = z.object({
  type: z.enum(["MATTRESS", "PILLOW", "QUILT", "PAD", "FURNITURE"]),
  titleEn: z.string(),
  titleKa: z.string(),
  categoryEn: z.string(),
  categoryKa: z.string(),
  minitext: z.string().optional(),
  minitextEn: z.string().optional(),
  secondtext: z.string().optional(),
  secondtextEn: z.string().optional(),
  images: z.array(z.string()),
  springTech: z.boolean().optional(),
  orthopaedic: z.boolean().optional(),
  superSoftFoam: z.boolean().optional(),
  visconFabric: z.boolean().optional(),
  graphiteViscoFoam: z.boolean().optional(),
  carbonYarnTechnologyPillowTopMattress: z.boolean().optional(),
  middleComfortLayer: z.boolean().optional(),
  visconFabricSoftComfortLayer: z.boolean().optional(),
  copperViscoLayer: z.boolean().optional(),
  cncFoamTechnology: z.boolean().optional(),
  softComfortLayer: z.boolean().optional(),
  firmComfortLayer: z.boolean().optional(),
  aloeveraFabric: z.boolean().optional(),
  breathable: z.boolean().optional(),
  doubleSided: z.boolean().optional(),
  knitte: z.boolean().optional(),
  wool: z.boolean().optional(),
  visco: z.boolean().optional(),
  dns: z.boolean().optional(),
  latex: z.boolean().optional(),
  washable: z.boolean().optional(),
  coconutLayer: z.boolean().optional(),
});

export const mattressCheckboxOptions: {
  name: keyof z.infer<typeof BooleanSchema>;
  label: string;
}[] = [
  { name: "springTech", label: "7 Zone Pocket Spring System" },
  { name: "orthopaedic", label: "Orthopaedic" },
  { name: "superSoftFoam", label: "Super Soft Foam" },
  { name: "visconFabric", label: "Viscon Fabric" },
  { name: "graphiteViscoFoam", label: "Graphite Visco Foam" },
  { name: "carbonYarnTechnologyPillowTopMattress", label: "Carbon Yarn Technology Pillow Top Mattress" },
  { name: "middleComfortLayer", label: "Middle Comfort Layer" },
  { name: "visconFabricSoftComfortLayer", label: "Viscon Fabric Soft Comfort Layer" },
  { name: "copperViscoLayer", label: "Copper Visco Layer" },
  { name: "cncFoamTechnology", label: "CNC Foam Technology" },
  { name: "softComfortLayer", label: "Soft Comfort Layer" },
  { name: "firmComfortLayer", label: "Firm Comfort Layer" },
  { name: "aloeveraFabric", label: "Aloevera Fabric" },
  { name: "breathable", label: "Breathable" },
  { name: "doubleSided", label: "Double Sided" },
  { name: "knitte", label: "Knitte" },
  { name: "wool", label: "Wool" },
  { name: "visco", label: "Visco" },
  { name: "dns", label: "High Dns Air Ducted Support Sponge" },
  { name: "latex", label: "Latex" },
  { name: "washable", label: "Washable Zipped Case" },
  { name: "coconutLayer", label: "Coconut Layer" },
];

export const padCheckboxOptions: { name: keyof z.infer<typeof BooleanSchema>; label: string }[] = [
  { name: "springTech", label: "7 Zone Pocket Spring System" },
  { name: "orthopaedic", label: "Orthopaedic" },
  { name: "breathable", label: "Breathable" },
  { name: "doubleSided", label: "Double Sided" },
  { name: "knitte", label: "Knitte" },
  { name: "wool", label: "Wool" },
  { name: "visco", label: "Visco" },
  { name: "dns", label: "High Dns Air Ducted Support Sponge" },
  { name: "latex", label: "Latex" },
  { name: "washable", label: "Washable Zipped Case" },
  { name: "coconutLayer", label: "Coconut Layer" },
];

export const heightOptions = [
  { text: "6 სმ", value: "6" },
  { text: "7 სმ", value: "7" },
  { text: "24 სმ", value: "24" },
  { text: "25 სმ", value: "25" },
  { text: "26 სმ", value: "26" },
  { text: "27 სმ", value: "27" },
  { text: "28 სმ", value: "28" },
  { text: "29 სმ", value: "29" },
  { text: "30 სმ", value: "30" },
  { text: "31 სმ", value: "31" },
  { text: "32 სმ", value: "32" },
  { text: "33 სმ", value: "33" },
  { text: "34 სმ", value: "34" },
];

export const typeToCategory = {
  MATTRESS: { en: "Mattress", ka: "მატრასი" },
  PILLOW: { en: "Pillow", ka: "ბალიში" },
  QUILT: { en: "Quilt", ka: "საბანი" },
  PAD: { en: "Pad  ", ka: " პადი" },
  FURNITURE: { en: "Furniture", ka: "ავეჯი" },
} as const;

export const inputClass =
  "h-11 w-full bg-background text-base text-foreground placeholder:text-muted-foreground border-border md:text-base";

export const textareaClass =
  "w-full min-h-32 resize-y rounded-xl border border-border bg-background p-4 text-base text-foreground placeholder:text-muted-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const featureChipClass =
  "flex cursor-pointer items-start gap-2 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-base text-foreground transition hover:border-brand-chrome hover:bg-muted/50";

function FormSection({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm dark:bg-muted/50 dark:shadow-none">
      <div className="flex items-start gap-3 border-b border-border pb-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-chrome text-sm font-semibold text-white">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {hint ? <p className="text-base text-muted-foreground">{hint}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function FeatureGrid({
  options,
  control,
  catalogItems = [],
}: {
  options: { name: keyof z.infer<typeof BooleanSchema>; label: string }[];
  control: UseFormReturn<ProductFormValues, unknown, ProductFormData>["control"];
  catalogItems?: CatalogItemDTO[];
}) {
  const [query, setQuery] = useState("");
  const labeled = options.map((option) => {
    const catalog = catalogItems.find((item) => item.legacyKey === option.name);
    return {
      ...option,
      label: catalog?.labelEn || option.label,
    };
  });
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return labeled;
    return labeled.filter((option) => option.label.toLowerCase().includes(q));
  }, [labeled, query]);

  return (
    <div className="space-y-3">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="მოძებნე მახასიათებელი..."
        className={inputClass}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filtered.map(({ name, label }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <label className={featureChipClass}>
                <Checkbox
                  checked={Boolean(field.value)}
                  className="mt-0.5"
                  onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                />
                <span>{label}</span>
              </label>
            )}
          />
        ))}
      </div>
    </div>
  );
}

type ProductFormFieldsProps = {
  form: UseFormReturn<ProductFormValues, unknown, ProductFormData>;
  catalogItems: CatalogItemDTO[];
  lockType?: boolean;
};

export default function ProductFormFields({
  form,
  catalogItems,
  lockType = false,
}: ProductFormFieldsProps) {
  const productType = form.watch("type");
  const featureIds = form.watch("featureIds") ?? [];

  const extraHeights = catalogItems.filter((item) => item.kind === "HEIGHT");
  const mergedHeights = [
    ...heightOptions.map((option) => {
      const catalog = extraHeights.find((item) => item.slug === option.value);
      return catalog ? { text: catalog.labelKa, value: option.value } : option;
    }),
    ...extraHeights
      .filter((item) => !heightOptions.some((option) => option.value === item.slug))
      .map((item) => ({ text: item.labelKa || `${item.slug} სმ`, value: item.slug })),
  ];
  const extraFeatures = catalogItems.filter(
    (item) =>
      item.kind === "FEATURE" &&
      !item.legacyKey &&
      (productType === "PAD"
        ? item.forPad
        : productType === "QUILT" || productType === "FURNITURE"
        ? true
        : item.forMattress)
  );

  const toggleFeature = (id: string, checked: boolean) => {
    const next = checked ? [...featureIds, id] : featureIds.filter((itemId) => itemId !== id);
    form.setValue("featureIds", next, { shouldDirty: true });
  };

  return (
    <>
      <FormSection step={1} title="პროდუქტის ტიპი" hint="ჯერ აირჩიე ტიპი — ფორმა ამის მიხედვით შეიცვლება">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="max-w-sm">
              <FormLabel className="text-base">ტიპი</FormLabel>
              <Select
                value={field.value}
                disabled={lockType}
                onValueChange={(value) => {
                  field.onChange(value);
                  const category = typeToCategory[value as keyof typeof typeToCategory];
                  if (category) {
                    form.setValue("categoryEn", category.en);
                    form.setValue("categoryKa", category.ka);
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="აირჩიე პროდუქტის ტიპი" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem className="text-base" value="MATTRESS">მატრასი</SelectItem>
                  <SelectItem className="text-base" value="PILLOW">ბალიში</SelectItem>
                  <SelectItem className="text-base" value="PAD">ტოპერი</SelectItem>
                  <SelectItem className="text-base" value="QUILT">საბანი</SelectItem>
                  <SelectItem className="text-base" value="FURNITURE">ავეჯი</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection
        step={2}
        title={productType === "FURNITURE" ? "სახელი" : "სახელი და მოკლე ტექსტი"}
        hint="ქართული და ინგლისური გვერდიგვერდ"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="titleKa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">სათაური (KA)</FormLabel>
                <FormControl>
                  <Input placeholder="სათაური ქართულად" {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">სათაური (EN)</FormLabel>
                <FormControl>
                  <Input placeholder="Title in English" {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {productType !== "FURNITURE" && (
            <>
              <FormField
                control={form.control}
                name="secondtext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">მოკლე ტექსტი (KA)</FormLabel>
                    <FormControl>
                      <textarea placeholder="მოკლე აღწერა ქართულად" {...field} className={textareaClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondtextEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">მოკლე ტექსტი (EN)</FormLabel>
                    <FormControl>
                      <textarea placeholder="Short text in English" {...field} className={textareaClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </FormSection>

      <FormSection step={3} title="სურათები" hint="დააჭირე ლურჯ ზონაზე ან გადაიტანე სურათები. აირჩიე, რომელი იქნება მთავარი სურათი.">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <ImageUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      {productType === "FURNITURE" && (
        <>
          <FormSection step={4} title="ზომა" hint="არასავალდებულო — შეგიძლია 4 ზომამდე, როგორც მატრასზე">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...form.register("size1")}
                placeholder="ზომა 1 (მაგ. 160X200)"
                className={inputClass}
              />
              <Input
                {...form.register("size2")}
                placeholder="ზომა 2 (არასავალდებულო)"
                className={inputClass}
              />
              <Input
                {...form.register("size3")}
                placeholder="ზომა 3 (არასავალდებულო)"
                className={inputClass}
              />
              <Input
                {...form.register("size4")}
                placeholder="ზომა 4 (არასავალდებულო)"
                className={inputClass}
              />
            </div>
          </FormSection>
          <FormSection step={5} title="აღწერა" hint="არასავალდებულო — მარცხნივ ქართული, მარჯვნივ ინგლისური">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-base font-medium text-foreground">
                აღწერა (KA)
                <textarea
                  {...form.register("descriptionKa")}
                  placeholder="აღწერა ქართულად (არასავალდებულო)"
                  className={textareaClass}
                />
              </label>
              <label className="space-y-2 text-base font-medium text-foreground">
                აღწერა (EN)
                <textarea
                  {...form.register("descriptionEn")}
                  placeholder="Description in English (optional)"
                  className={textareaClass}
                />
              </label>
            </div>
          </FormSection>
          <FormSection
            step={6}
            title="ინფორმაცია"
            hint="მარცხნივ ქართული, მარჯვნივ ინგლისური. ყოველი სათაური ახალ სექციას ქმნის."
          >
            <FurnitureInfoFields form={form} />
          </FormSection>
        </>
      )}

      {productType === "MATTRESS" && (
        <>
          <FormSection step={4} title="აღწერები" hint="მარცხნივ ქართული, მარჯვნივ ინგლისური">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-base font-medium text-foreground">
                სრული აღწერა (KA)
                <textarea {...form.register("descriptionKa")} placeholder="აღწერა ქართულად" className={textareaClass} />
              </label>
              <label className="space-y-2 text-base font-medium text-foreground">
                სრული აღწერა (EN)
                <textarea {...form.register("descriptionEn")} placeholder="Description in English" className={textareaClass} />
              </label>
              <label className="space-y-2 text-base font-medium text-foreground">
                დამატებითი ტექსტი (KA)
                <textarea {...form.register("minitext")} placeholder="დამატებითი ტექსტი ქართულად" className={textareaClass} />
              </label>
              <label className="space-y-2 text-base font-medium text-foreground">
                დამატებითი ტექსტი (EN)
                <textarea {...form.register("minitextEn")} placeholder="Extra text in English" className={textareaClass} />
              </label>
            </div>
          </FormSection>

          <FormSection step={5} title="ზომა და მახასიათებლები">
            <Link
              href="/admin/features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-chrome px-4 py-3 text-base font-medium text-white transition hover:bg-brand-chrome/90 sm:w-auto"
            >
              + დაამატე ახალი ზომა ან მახასიათებელი
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...form.register("size1")}
                placeholder="ზომა 1 (მაგ. 160X200)"
                className={inputClass}
              />
              <Input
                {...form.register("size2")}
                placeholder="ზომა 2 (არასავალდებულო)"
                className={inputClass}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">სიმაღლე</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="აირჩიე სიმაღლე" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mergedHeights.map((option) => (
                          <SelectItem key={option.value} className="text-base" value={option.value}>
                            {option.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firmnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">სიმაგრის დონე (0–5)</FormLabel>
                    <Select
                      value={field.value !== undefined ? String(field.value) : undefined}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="აირჩიე სიმაგრის დონე" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className="text-base" value="0">0</SelectItem>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <SelectItem key={n} className="text-base" value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FeatureGrid options={mattressCheckboxOptions} control={form.control} catalogItems={catalogItems} />
            {extraFeatures.length > 0 ? (
              <div className="space-y-2">
                <p className="text-base font-medium text-foreground">დამატებული მახასიათებლები</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {extraFeatures.map((item) => (
                    <label
                      key={item.id}
                      className={featureChipClass}
                    >
                      <Checkbox
                        checked={featureIds.includes(item.id)}
                        onCheckedChange={(checked) => toggleFeature(item.id, Boolean(checked))}
                      />
                      <span>{item.labelEn}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </FormSection>
        </>
      )}

      {productType === "PILLOW" && (
        <FormSection step={4} title="ბალიშის დეტალები">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input {...form.register("size")} placeholder="ზომა" className={inputClass} />
            <Input
              type="number"
              {...form.register("weight", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" || Number.isNaN(Number(v)) ? undefined : Number(v)),
              })}
              placeholder="წონა"
              className={inputClass}
            />
            <Input {...form.register("outerFabric")} placeholder="გარე ქსოვილი (KA)" className={inputClass} />
            <Input {...form.register("outerFabricEn")} placeholder="Outer fabric (EN)" className={inputClass} />
            <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
            <Input {...form.register("fillingEn")} placeholder="Filling (EN)" className={inputClass} />
            <Input {...form.register("packaging")} placeholder="შეფუთვა (KA)" className={inputClass} />
            <Input {...form.register("packagingEn")} placeholder="Packaging (EN)" className={inputClass} />
            <Input {...form.register("care")} placeholder="მოვლა (KA)" className={inputClass} />
            <Input {...form.register("careEn")} placeholder="Care (EN)" className={inputClass} />
            <textarea {...form.register("minitext")} placeholder="დამატებითი ტექსტი (KA)" className={textareaClass} />
            <textarea {...form.register("minitextEn")} placeholder="Extra text (EN)" className={textareaClass} />
          </div>
        </FormSection>
      )}

      {productType === "PAD" && (
        <>
          <FormSection step={4} title="ტოპერის მახასიათებლები">
            <Link
              href="/admin/features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-chrome px-4 py-3 text-base font-medium text-white transition hover:bg-brand-chrome/90 sm:w-auto"
            >
              + დაამატე ახალი ზომა ან მახასიათებელი
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input {...form.register("firmness")} placeholder="სიმაგრე (KA)" className={inputClass} />
              <Input {...form.register("firmnessEn")} placeholder="Firmness (EN)" className={inputClass} />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">სიმაღლე</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="აირჩიე სიმაღლე" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mergedHeights.map((option) => (
                          <SelectItem key={option.value} className="rounded-2xl text-base" value={option.value}>
                            {option.text}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FeatureGrid options={padCheckboxOptions} control={form.control} catalogItems={catalogItems} />
            {extraFeatures.length > 0 ? (
              <div className="space-y-2">
                <p className="text-base font-medium text-foreground">დამატებული მახასიათებლები</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {extraFeatures.map((item) => (
                    <label
                      key={item.id}
                      className={featureChipClass}
                    >
                      <Checkbox
                        checked={featureIds.includes(item.id)}
                        onCheckedChange={(checked) => toggleFeature(item.id, Boolean(checked))}
                      />
                      <span>{item.labelEn}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </FormSection>
          <FormSection step={5} title="აღწერები">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea {...form.register("descriptionKa")} placeholder="აღწერა (KA)" className={textareaClass} />
              <textarea {...form.register("descriptionEn")} placeholder="Description (EN)" className={textareaClass} />
              <textarea {...form.register("minitext")} placeholder="დამატებითი ტექსტი (KA)" className={textareaClass} />
              <textarea {...form.register("minitextEn")} placeholder="Extra text (EN)" className={textareaClass} />
            </div>
          </FormSection>
        </>
      )}

      {productType === "QUILT" && (
        <>
          <FormSection step={4} title="აღწერები" hint="მარცხნივ ქართული, მარჯვნივ ინგლისური">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-base font-medium text-foreground">
                სრული აღწერა (KA)
                <textarea {...form.register("descriptionKa")} placeholder="აღწერა ქართულად" className={textareaClass} />
              </label>
              <label className="space-y-2 text-base font-medium text-foreground">
                სრული აღწერა (EN)
                <textarea {...form.register("descriptionEn")} placeholder="Description in English" className={textareaClass} />
              </label>
              <label className="space-y-2 text-base font-medium text-foreground">
                დამატებითი ტექსტი (KA)
                <textarea {...form.register("minitext")} placeholder="დამატებითი ტექსტი ქართულად" className={textareaClass} />
              </label>
              <label className="space-y-2 text-base font-medium text-foreground">
                დამატებითი ტექსტი (EN)
                <textarea {...form.register("minitextEn")} placeholder="Extra text in English" className={textareaClass} />
              </label>
            </div>
          </FormSection>

          <FormSection step={5} title="ზომა და მახასიათებლები">
            <Link
              href="/admin/features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-chrome px-4 py-3 text-base font-medium text-white transition hover:bg-brand-chrome/90 sm:w-auto"
            >
              + დაამატე ახალი ზომა ან მახასიათებელი
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...form.register("size1")}
                placeholder="ზომა 1 (მაგ. 160X200)"
                className={inputClass}
              />
              <Input
                {...form.register("size2")}
                placeholder="ზომა 2 (არასავალდებულო)"
                className={inputClass}
              />
              <Input {...form.register("weight")} placeholder="წონა (არასავალდებულო)" className={inputClass} />
              <Input {...form.register("fabric")} placeholder="ქსოვილი (KA)" className={inputClass} />
              <Input {...form.register("fabricEn")} placeholder="Fabric (EN)" className={inputClass} />
              <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
              <Input {...form.register("fillingEn")} placeholder="Filling (EN)" className={inputClass} />
              <Input {...form.register("packaging")} placeholder="შეფუთვა (KA)" className={inputClass} />
              <Input {...form.register("packagingEn")} placeholder="Packaging (EN)" className={inputClass} />
              <Input {...form.register("care")} placeholder="მოვლა (KA)" className={inputClass} />
              <Input {...form.register("careEn")} placeholder="Care (EN)" className={inputClass} />
            </div>
            {extraFeatures.length > 0 ? (
              <div className="space-y-2">
                <p className="text-base font-medium text-foreground">დამატებული მახასიათებლები</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {extraFeatures.map((item) => (
                    <label key={item.id} className={featureChipClass}>
                      <Checkbox
                        checked={featureIds.includes(item.id)}
                        onCheckedChange={(checked) => toggleFeature(item.id, Boolean(checked))}
                      />
                      <span>{item.labelEn}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </FormSection>
        </>
      )}
    </>
  );
}
