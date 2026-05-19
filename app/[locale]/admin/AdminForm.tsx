/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React  from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import ImageUpload from './ImageUpload';
import { cn } from '@/lib/utils';
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
  // ⬇️⬇️⬇️⬇️ ამ ველების დამატება საჭიროა
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

const categoryOptions = [
  { en: "Mattress", ka: "მატრასი" },
  { en: "Pillow", ka: "ბალიში" },
  { en: "Quilt", ka: "საბანი" },
  { en: "Pad  ", ka: " პადი" },
];


const inputClass =
  " text-black placeholder-gray-400 border border-gray-700 focus:ring-0 focus:outline-none";

export default function AdminForm() {
 
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      titleEn: "",
      titleKa: "",
      categoryEn: "",
      categoryKa: "",
      images: [],
      type: "MATTRESS", 
      height: "",
      firmnessLevel: 0,
      secondtextEn: "",
      secondtext: "",
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

  const res = await createProduct(data);
  alert(res.message);
  form.reset();
};

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      
          <FormField
            control={form.control}
            name="titleEn"
            
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">სათაური (EN)</FormLabel>
                <FormControl>
                  <Input placeholder="სათაური ინგლისურად" {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
  name="categoryEn"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-black">კატეგორია (EN)</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="bg-black border border-gray-700 text-white">
          {categoryOptions.map((option) => (
            <SelectItem key={option.en} value={option.en}>
              {option.en}
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
  name="categoryKa"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-black">კატეგორია (KA)</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="აირჩიე კატეგორია" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="bg-black border border-gray-700 text-white">
          {categoryOptions.map((option) => (
            <SelectItem key={option.ka} value={option.ka}>
              {option.ka}
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
            name="secondtext"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">პატარა ტექსტი (GE)</FormLabel>
                <FormControl>
                  <Input placeholder="სათაური ქართულად" {...field} className={inputClass} />
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
                <FormLabel className="text-black">პატარა ინგლისურად (En)</FormLabel>
                <FormControl>
                  <Input placeholder="სათაური ინგლისურად" {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
<FormField
  control={form.control}
  name="images"
  render={({ field }) => (
    <FormItem className="w-full text-black">
      <FormLabel className="text-black">სურათები</FormLabel>
      <Card className="text-black">
        <CardContent className="space-y-2 text-black mt-2 min-h-48">
          <div className="flex text-black flex-wrap gap-2 items-center">
            <ImageUpload value={field.value} onChange={field.onChange} />
          </div>
        </CardContent>
      </Card>
      <FormMessage />
    </FormItem>
  )}
/>


     
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">პროდუქტის ტიპი</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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



{productType === "MATTRESS" && (
  <>
    <FormField
  control={form.control}
  name="height"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-black">სიმაღლე</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <FormLabel className="text-black">Firmness Level (0-5)</FormLabel>
          <Select
            onValueChange={(v) => field.onChange(Number(v))}
            defaultValue={field.value ? String(field.value) : undefined}
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
    <div className="grid grid-cols-2 gap-2">
    {mattressCheckboxOptions.map(({ name, label }) => (
  <Controller
    key={name}
    name={name}
    control={form.control}
    defaultValue={false}
    render={({ field }) => (
      <label className="flex items-center gap-2">
       <Checkbox
  checked={Boolean(field.value)} className='border-black shadow-2xl'
  onCheckedChange={(checked) => field.onChange(Boolean(checked))}
/>
        <span>{label}</span>
      </label>
    )}
  />
))}
  
</div>


<div className="flex gap-y-5 flex-col">

    <textarea {...form.register("descriptionEn")} placeholder="აღწერა (EN)" 
  className="w-full h-32 resize-none rounded-2xl border border-black focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
    <textarea {...form.register("descriptionKa")} placeholder="აღწერა (KA)" 
  className="w-full h-32 resize-none rounded-2xl border border-black focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
</div>

<div className="flex gap-y-5 flex-col">

<textarea {...form.register("minitext")} placeholder="აღწერის ტექსტი ქართულად (EN)" 
className="w-full h-32 resize-none rounded-2xl border border-black focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
<textarea {...form.register("minitextEn")} placeholder="აღწერის ტექსტი ინგლისურად" 
className="w-full h-32 resize-none rounded-2xl border border-black focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
</div>
  </>
)}

{productType === "PILLOW" && (
  <>
    <Input {...form.register("size")} placeholder="ზომა" className={inputClass} />
    <Input type="number" {...form.register("weight", { valueAsNumber: true })} placeholder="წონა" className={inputClass} />
    <Input {...form.register("outerFabric")} placeholder="გარე ქსოვილი (KA)" className={inputClass} />
    <Input {...form.register("outerFabricEn")} placeholder="გარე ქსოვილი (EN)" className={inputClass} />
    <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
    <Input {...form.register("fillingEn")} placeholder="შევსება (EN)" className={inputClass} />
    <Input {...form.register("packaging")} placeholder="შეფუთვა (KA)" className={inputClass} />
    <Input {...form.register("packagingEn")} placeholder="შეფუთვა (EN)" className={inputClass} />
    <div className="flex gap-y-5 flex-col">

<textarea {...form.register("minitext")} placeholder="აღწერის ტექსტი ქართულად (EN)" 
className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
<textarea {...form.register("minitextEn")} placeholder="აღწერის ტექსტი ინგლისურად" 
className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
</div>
  </>
)}



{productType === "PAD" && (
  <>
    <Input {...form.register("firmness")} placeholder="სიმაგრე (KA)" className={inputClass} />
    <Input {...form.register("firmnessEn")} placeholder="სიმაგრე (EN)" className={inputClass} />
    <FormField
  control={form.control}
  name="height"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-black">სიმაღლე</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="აირჩიე სიმაღლე" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="bg-black border rounded-2xl border-gray-700 text-white">
          {heightOptions.map((option) => (
            <SelectItem key={option.value} className='rounded-2xl' value={option.value}>
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
    <div className="grid grid-cols-2 gap-2">
    {padCheckboxOptions.map(({ name, label }) => (
  <Controller
    key={name}
    name={name}
    control={form.control}
    defaultValue={false}
    render={({ field }) => (
      <label className="flex items-center gap-2">
       <Checkbox
  checked={Boolean(field.value)} className='border-black'
  onCheckedChange={(checked) => field.onChange(Boolean(checked))}
/>
        <span>{label}</span>
      </label>
    )}
  />
))}
  
</div>
   
  
<div className="flex gap-y-5 flex-col">

    <textarea {...form.register("descriptionEn")} placeholder="აღწერა (EN)" 
  className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
    <textarea {...form.register("descriptionKa")} placeholder="აღწერა (KA)" 
  className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
    </div>

    <div className="flex gap-y-5 flex-col">

<textarea {...form.register("minitext")} placeholder="აღწერის ტექსტი ქართულად " 
className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
<textarea {...form.register("minitextEn")} placeholder="აღწერის ტექსტი ინგლისურად" 
className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
</div>
  </>
)}

{productType === "QUILT" && (
  <>
    <Input {...form.register("dimensions")} placeholder="ზომები" className={inputClass} />
    <Input {...form.register("fabric")} placeholder="ქსოვილი (KA)" className={inputClass} />
    <Input {...form.register("fabricEn")} placeholder="ქსოვილი (EN)" className={inputClass} />
    <Input {...form.register("filling")} placeholder="შევსება (KA)" className={inputClass} />
    <Input {...form.register("fillingEn")} placeholder="შევსება (EN)" className={inputClass} />
    <Input type="text" {...form.register("weight")} placeholder="წონა" className={inputClass} />

    <div className="flex gap-y-5 flex-col">

<textarea {...form.register("minitext")} placeholder="აღწერის ტექსტი ინგლისურად" 
className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
<textarea {...form.register("minitextEn")} placeholder="აღწერის ტექსტი ინგლისურად" 
className="w-full h-32 resize-none rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-white p-4 text-sm placeholder-gray-400 shadow-sm transition-all duration-200" />
</div>
  </>
)}

          <Button type="submit" className="mx-auto w-[200px] cursor-pointer border border-black bg-white text-black hover:bg-white">
            შექმენი პროდუქტი
          </Button>
        </form>
      </Form>
    </div>
  );
}
