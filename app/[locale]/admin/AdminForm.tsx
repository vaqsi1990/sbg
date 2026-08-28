/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@/lib/validators';
import { createProduct } from '@/lib/actions/actions';
import { z } from 'zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from './ImageUpload';
import { Controller } from "react-hook-form";

const BooleanSchema = z.object({
  type: z.enum(["MATTRESS", "PILLOW", "QUILT", "PAD"]),
  titleEn: z.string(),
  titleKa: z.string(),
  categoryEn: z.string(),
  categoryKa: z.string(),
  minitext:z.string().optional(),
  minitextEn:z.string().optional(),
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

const mattressCheckboxOptions: { name: keyof z.infer<typeof BooleanSchema>; label: string }[] = [
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

const padCheckboxOptions: { name: keyof z.infer<typeof BooleanSchema>; label: string }[] = [
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

const heightOptions = [
  { text: '6 სმ', value: '6' },
  { text: '7 სმ', value: '7' },
  { text: '24 სმ', value: '24' },
  { text: '25 სმ', value: '25' },
  { text: '26 სმ', value: '26' },
  { text: '27 სმ', value: '27' },
  { text: '28 სმ', value: '28' },
  { text: '29 სმ', value: '29' },
  { text: '30 სმ', value: '30' },
  { text: '31 სმ', value: '31' },
  { text: '32 სმ', value: '32' },
  { text: '33 სმ', value: '33' },
  { text: '34 სმ', value: '34' },
];

const typeToCategory = {
  MATTRESS: { en: "Mattress", ka: "მატრასი" },
  PILLOW: { en: "Pillow", ka: "ბალიში" },
  QUILT: { en: "Quilt", ka: "საბანი" },
  PAD: { en: "Pad  ", ka: " პადი" },
} as const;

const inputClass =
  "text-black placeholder-gray-400 border border-gray-300 focus:ring-0 focus:outline-none";

const textareaClass =
  "w-full min-h-28 resize-y rounded-xl border border-gray-300 focus:border-[#203e72] focus:ring-2 focus:ring-[#203e72]/20 bg-white p-3 text-sm placeholder-gray-400";

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
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-start gap-3 border-b border-gray-100 pb-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#203e72] text-xs font-semibold text-white">
          {step}
        </span>
        <div>
          <h2 className="text-base font-semibold text-black">{title}</h2>
          {hint ? <p className="text-sm text-gray-500">{hint}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function FeatureGrid({
  options,
  control,
}: {
  options: { name: keyof z.infer<typeof BooleanSchema>; label: string }[];
  control: ReturnType<typeof useForm<z.infer<typeof ProductSchema>>>["control"];
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((option) => option.label.toLowerCase().includes(q));
  }, [options, query]);

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
            defaultValue={false}
            render={({ field }) => (
              <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:border-[#203e72]">
                <Checkbox
                  checked={Boolean(field.value)}
                  className="mt-0.5 border-black"
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

export default function AdminForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      titleEn: "",
      titleKa: "",
      categoryEn: "Mattress",
      categoryKa: "მატრასი",
      images: [],
      type: "MATTRESS",
      height: "",
      firmnessLevel: 0,
      secondtextEn: "",
      secondtext: "",
      descriptionEn: "",
      descriptionKa: "",
      minitext: "",
      minitextEn: "",
      springTech:false,
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
    },
  });

  const productType = form.watch('type');

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
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
          <FormSection step={1} title="პროდუქტის ტიპი" hint="ჯერ აირჩიე ტიპი — ფორმა ამის მიხედვით შეიცვლება">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="max-w-sm">
                  <FormLabel className="text-black">ტიპი</FormLabel>
                  <Select
                    value={field.value}
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
                    <SelectContent className="bg-black border border-gray-700 text-white">
                      <SelectItem value="MATTRESS">მატრასი</SelectItem>
                      <SelectItem value="PILLOW">ბალიში</SelectItem>
                      <SelectItem value="PAD">ტოპერი</SelectItem>
                      <SelectItem value="QUILT">საბანი</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection step={2} title="სახელი და მოკლე ტექსტი" hint="ქართული და ინგლისური გვერდიგვერდ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="titleKa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">სათაური (KA)</FormLabel>
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
                    <FormLabel className="text-black">სათაური (EN)</FormLabel>
                    <FormControl>
                      <Input placeholder="Title in English" {...field} className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondtext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">მოკლე ტექსტი (KA)</FormLabel>
                    <FormControl>
                      <Input placeholder="მოკლე აღწერა ქართულად" {...field} className={inputClass} />
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
                    <FormLabel className="text-black">მოკლე ტექსტი (EN)</FormLabel>
                    <FormControl>
                      <Input placeholder="Short text in English" {...field} className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          <FormSection step={3} title="სურათები" hint="შეგიძლია რამდენიმე სურათის ატვირთვა">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="w-full text-black">
                  <FormControl>
                    <ImageUpload value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {productType === "MATTRESS" && (
            <>
              <FormSection step={4} title="აღწერები" hint="მარცხნივ ქართული, მარჯვნივ ინგლისური">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="space-y-2 text-sm font-medium">
                    სრული აღწერა (KA)
                    <textarea {...form.register("descriptionKa")} placeholder="აღწერა ქართულად" className={textareaClass} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    სრული აღწერა (EN)
                    <textarea {...form.register("descriptionEn")} placeholder="Description in English" className={textareaClass} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    დამატებითი ტექსტი (KA)
                    <textarea {...form.register("minitext")} placeholder="დამატებითი ტექსტი ქართულად" className={textareaClass} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    დამატებითი ტექსტი (EN)
                    <textarea {...form.register("minitextEn")} placeholder="Extra text in English" className={textareaClass} />
                  </label>
                </div>
              </FormSection>

              <FormSection step={5} title="ზომა და მახასიათებლები">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">სიმაღლე</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className={inputClass}>
                              <SelectValue placeholder="აირჩიე სიმაღლე" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black border border-gray-700 text-white">
                            {heightOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
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
                        <FormLabel className="text-black">სიმაგრის დონე (0–5)</FormLabel>
                        <Select
                          value={field.value !== undefined ? String(field.value) : undefined}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <FormControl>
                            <SelectTrigger className={inputClass}>
                              <SelectValue placeholder="აირჩიე სიმაგრის დონე" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black border border-gray-700 text-white">
                            <SelectItem value="0">0</SelectItem>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <SelectItem key={n} value={String(n)}>
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
                <FeatureGrid options={mattressCheckboxOptions} control={form.control} />
              </FormSection>
            </>
          )}

          {productType === "PILLOW" && (
            <FormSection step={4} title="ბალიშის დეტალები">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input {...form.register("size")} placeholder="ზომა" className={inputClass} />
                <Input type="number" {...form.register("weight", { valueAsNumber: true })} placeholder="წონა" className={inputClass} />
                <Input {...form.register("outerFabric")} placeholder="გარე ქსოვილი (KA)" className={inputClass} />
                <Input {...form.register("outerFabricEn")} placeholder="Outer fabric (EN)" className={inputClass} />
                <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
                <Input {...form.register("fillingEn")} placeholder="Filling (EN)" className={inputClass} />
                <Input {...form.register("packaging")} placeholder="შეფუთვა (KA)" className={inputClass} />
                <Input {...form.register("packagingEn")} placeholder="Packaging (EN)" className={inputClass} />
                <textarea {...form.register("minitext")} placeholder="დამატებითი ტექსტი (KA)" className={textareaClass} />
                <textarea {...form.register("minitextEn")} placeholder="Extra text (EN)" className={textareaClass} />
              </div>
            </FormSection>
          )}

          {productType === "PAD" && (
            <>
              <FormSection step={4} title="ტოპერის მახასიათებლები">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input {...form.register("firmness")} placeholder="სიმაგრე (KA)" className={inputClass} />
                  <Input {...form.register("firmnessEn")} placeholder="Firmness (EN)" className={inputClass} />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">სიმაღლე</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className={inputClass}>
                              <SelectValue placeholder="აირჩიე სიმაღლე" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black border rounded-2xl border-gray-700 text-white">
                            {heightOptions.map((option) => (
                              <SelectItem key={option.value} className="rounded-2xl" value={option.value}>
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
                <FeatureGrid options={padCheckboxOptions} control={form.control} />
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
            <FormSection step={4} title="საბნის დეტალები">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input {...form.register("dimensions")} placeholder="ზომები" className={inputClass} />
                <Input type="text" {...form.register("weight")} placeholder="წონა" className={inputClass} />
                <Input {...form.register("fabric")} placeholder="ქსოვილი (KA)" className={inputClass} />
                <Input {...form.register("fabricEn")} placeholder="Fabric (EN)" className={inputClass} />
                <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
                <Input {...form.register("fillingEn")} placeholder="Filling (EN)" className={inputClass} />
                <textarea {...form.register("minitext")} placeholder="დამატებითი ტექსტი (KA)" className={textareaClass} />
                <textarea {...form.register("minitextEn")} placeholder="Extra text (EN)" className={textareaClass} />
              </div>
            </FormSection>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
              <p className="text-sm text-gray-500 truncate">{status || "შეავსე სექციები და დააჭირე შექმნას"}</p>
              <Button
                type="submit"
                disabled={pending}
                className="cursor-pointer bg-[#203e72] px-6 text-white hover:bg-[#203e72]/90"
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
