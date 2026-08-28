"use client";

import { useState } from "react";
import Image from "next/image";
import { CatalogKind } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "../ImageUpload";
import {
  createCatalogItem,
  deleteCatalogItem,
  type CatalogItemDTO,
} from "@/lib/actions/catalog";
import { useRouter } from "@/i18n/navigation";

export default function FeatureManager({ items }: { items: CatalogItemDTO[] }) {
  const router = useRouter();
  const [kind, setKind] = useState<CatalogKind>("FEATURE");
  const [labelKa, setLabelKa] = useState("");
  const [labelEn, setLabelEn] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const result = await createCatalogItem({
      kind,
      labelKa,
      labelEn,
      image,
      slug: kind === "HEIGHT" ? slug : undefined,
    });
    setPending(false);
    setMessage(result.message);
    if (result.success) {
      setLabelKa("");
      setLabelEn("");
      setSlug("");
      setImage("");
      router.refresh();
    }
  }

  async function onDelete(id: string) {
    if (!confirm("წავშალოთ ეს მახასიათებელი?")) return;
    await deleteCatalogItem(id);
    router.refresh();
  }

  const heights = items.filter((item) => item.kind === "HEIGHT");
  const features = items.filter((item) => item.kind === "FEATURE");

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6">
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">ახალი ზომა ან მახასიათებელი</h1>
        <p className="text-sm text-gray-500">
          დაამატე სურათი და სახელი. შემდეგ ეს გამოჩნდება პროდუქტის ფორმაში და საიტზე.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2 text-sm font-medium">
            ტიპი
            <Select value={kind} onValueChange={(value) => setKind(value as CatalogKind)}>
              <SelectTrigger className="text-black border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectItem value="FEATURE">მახასიათებელი</SelectItem>
                <SelectItem value="HEIGHT">სიმაღლე / ზომა</SelectItem>
              </SelectContent>
            </Select>
          </label>

          {kind === "HEIGHT" ? (
            <label className="space-y-2 text-sm font-medium">
              სიმაღლე (სმ)
              <Input
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="მაგ. 35"
                className="text-black border-gray-300"
                required
              />
            </label>
          ) : (
            <div />
          )}

          <label className="space-y-2 text-sm font-medium">
            სახელი (KA)
            <Input
              value={labelKa}
              onChange={(event) => setLabelKa(event.target.value)}
              placeholder="მაგ. რბილი კომფორტის ფენა"
              className="text-black border-gray-300"
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            სახელი (EN)
            <Input
              value={labelEn}
              onChange={(event) => setLabelEn(event.target.value)}
              placeholder="e.g. Soft Comfort Layer"
              className="text-black border-gray-300"
              required
            />
          </label>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">სურათი</p>
          <ImageUpload
            key={image || "empty"}
            value={image ? [image] : []}
            maxFiles={1}
            onChange={(urls) => setImage(urls[0] ?? "")}
          />
        </div>

        {message ? <p className="text-sm text-[#203e72]">{message}</p> : null}

        <Button
          type="submit"
          disabled={pending}
          className="bg-[#203e72] text-white hover:bg-[#203e72]/90"
        >
          {pending ? "ინახება..." : "დამატება"}
        </Button>
      </form>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">სიმაღლეები</h2>
        <ItemList items={heights} onDelete={onDelete} />
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">მახასიათებლები</h2>
        <ItemList items={features} onDelete={onDelete} />
      </section>
    </div>
  );
}

function ItemList({
  items,
  onDelete,
}: {
  items: CatalogItemDTO[];
  onDelete: (id: string) => void;
}) {
  if (!items.length) {
    return <p className="text-sm text-gray-500">ჯერ არ არის დამატებული</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={item.image}
              alt={item.labelEn}
              fill
              className="object-contain"
              unoptimized={item.image.startsWith("http")}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{item.labelKa}</p>
            <p className="truncate text-sm text-gray-500">{item.labelEn}</p>
          </div>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="text-sm text-red-600 hover:underline"
          >
            წაშლა
          </button>
        </div>
      ))}
    </div>
  );
}
