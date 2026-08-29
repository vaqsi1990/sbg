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
  updateCatalogItem,
  type CatalogItemDTO,
} from "@/lib/actions/catalog";
import { useRouter } from "@/i18n/navigation";

export default function FeatureManager({ items }: { items: CatalogItemDTO[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [kind, setKind] = useState<CatalogKind>("FEATURE");
  const [labelKa, setLabelKa] = useState("");
  const [labelEn, setLabelEn] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  function resetForm() {
    setEditingId(null);
    setKind("FEATURE");
    setLabelKa("");
    setLabelEn("");
    setSlug("");
    setImage("");
    setMessage("");
  }

  function startEdit(item: CatalogItemDTO) {
    setEditingId(item.id);
    setKind(item.kind);
    setLabelKa(item.labelKa);
    setLabelEn(item.labelEn);
    setSlug(item.slug);
    setImage(item.image);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const result = editingId
      ? await updateCatalogItem({
          id: editingId,
          labelKa,
          labelEn,
          image,
          slug: kind === "HEIGHT" ? slug : undefined,
        })
      : await createCatalogItem({
          kind,
          labelKa,
          labelEn,
          image,
          slug: kind === "HEIGHT" ? slug : undefined,
        });

    setPending(false);
    setMessage(result.message);
    if (result.success) {
      resetForm();
      setMessage(result.message);
      router.refresh();
    }
  }

  async function onDelete(id: string) {
    if (!confirm("წავშალოთ ეს მახასიათებელი?")) return;
    if (editingId === id) resetForm();
    await deleteCatalogItem(id);
    router.refresh();
  }

  const heights = items.filter((item) => item.kind === "HEIGHT");
  const features = items.filter((item) => item.kind === "FEATURE");

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6">
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm dark:bg-muted/50 dark:shadow-none"
      >
        <h1 className="text-xl font-semibold text-foreground">
          {editingId ? "მახასიათებლის რედაქტირება" : "ახალი ზომა ან მახასიათებელი"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {editingId
            ? "შეცვალე სახელი ან სურათი და დააჭირე შენახვას. ძველი მახასიათებლების სახელი/სურათი საიტზეც განახლდება."
            : "ძველი მახასიათებლებიც აქ ჩანს. დააჭირე რედაქტირებას სახელის ან სურათის შესაცვლელად, ან დაამატე ახალი."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2 text-sm font-medium text-foreground">
            ტიპი
            <Select
              value={kind}
              onValueChange={(value) => setKind(value as CatalogKind)}
              disabled={Boolean(editingId)}
            >
              <SelectTrigger className="w-full border-border bg-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FEATURE">მახასიათებელი</SelectItem>
                <SelectItem value="HEIGHT">სიმაღლე / ზომა</SelectItem>
              </SelectContent>
            </Select>
          </label>

          {kind === "HEIGHT" ? (
            <label className="space-y-2 text-sm font-medium text-foreground">
              სიმაღლე (სმ)
              <Input
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="მაგ. 35"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                required
              />
            </label>
          ) : (
            <div />
          )}

          <label className="space-y-2 text-sm font-medium text-foreground">
            სახელი (KA)
            <Input
              value={labelKa}
              onChange={(event) => setLabelKa(event.target.value)}
              placeholder="მაგ. რბილი კომფორტის ფენა"
              className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-foreground">
            სახელი (EN)
            <Input
              value={labelEn}
              onChange={(event) => setLabelEn(event.target.value)}
              placeholder="e.g. Soft Comfort Layer"
              className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              required
            />
          </label>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">სურათი</p>
          <ImageUpload
            key={`${editingId ?? "new"}-${image || "empty"}`}
            value={image ? [image] : []}
            maxFiles={1}
            onChange={(urls) => setImage(urls[0] ?? "")}
          />
        </div>

        {message ? <p className="text-sm text-brand">{message}</p> : null}

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            disabled={pending}
            className="cursor-pointer bg-brand-chrome text-white hover:bg-brand-chrome/90"
          >
            {pending ? "ინახება..." : editingId ? "შენახვა" : "დამატება"}
          </Button>
          {editingId ? (
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="cursor-pointer border-border text-foreground"
            >
              გაუქმება
            </Button>
          ) : null}
        </div>
      </form>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">სიმაღლეები</h2>
        <ItemList items={heights} editingId={editingId} onEdit={startEdit} onDelete={onDelete} />
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">მახასიათებლები</h2>
        <ItemList items={features} editingId={editingId} onEdit={startEdit} onDelete={onDelete} />
      </section>
    </div>
  );
}

function ItemList({
  items,
  editingId,
  onEdit,
  onDelete,
}: {
  items: CatalogItemDTO[];
  editingId: string | null;
  onEdit: (item: CatalogItemDTO) => void;
  onDelete: (id: string) => void;
}) {
  if (!items.length) {
    return <p className="text-sm text-muted-foreground">ჯერ არ არის დამატებული</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 rounded-xl border p-3 ${
            editingId === item.id
              ? "border-brand-chrome bg-brand-chrome/10"
              : "border-border bg-card dark:bg-muted/50"
          }`}
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
            <Image
              src={item.image}
              alt={item.labelEn}
              fill
              className="object-contain"
              unoptimized={item.image.startsWith("http")}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">{item.labelKa}</p>
            <p className="truncate text-sm text-muted-foreground">{item.labelEn}</p>
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="text-sm text-brand hover:underline"
            >
              რედაქტირება
            </button>
            {item.legacyKey ? null : (
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="text-sm text-destructive hover:underline"
            >
              წაშლა
            </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
