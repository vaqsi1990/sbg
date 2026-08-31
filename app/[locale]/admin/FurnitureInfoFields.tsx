"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { ProductSchema } from "@/lib/validators";
import type { FurnitureInfoRow, FurnitureInfoSection } from "@/lib/furniture-info";
import { overlayFurnitureInfoLang, parseFurnitureInfoText } from "@/lib/furniture-info";

type ProductFormValues = z.input<typeof ProductSchema>;
type ProductFormData = z.output<typeof ProductSchema>;
type FurnitureInfoForm = UseFormReturn<ProductFormValues, unknown, ProductFormData>;

const inputClass =
  "h-11 w-full bg-background text-base text-foreground placeholder:text-muted-foreground border-border md:text-base";

const sectionTextareaClass =
  "w-full min-h-40 resize-y rounded-xl border border-border bg-background p-3 text-base text-foreground placeholder:text-muted-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const SECTION_PLACEHOLDER_KA = `საზომი ინფორმაცია
ბრენდი: Sleeper
სიგანე: 45 სმ`;

const SECTION_PLACEHOLDER_EN = `Measurement information
Brand: Sleeper
Width: 45 cm`;

const emptyRow = (): FurnitureInfoRow => ({
  labelKa: "",
  labelEn: "",
  valueKa: "",
  valueEn: "",
});

const emptySection = (): FurnitureInfoSection => ({
  titleKa: "",
  titleEn: "",
  rows: [emptyRow()],
});

function firstParsedSection(raw: string, lang: "ka" | "en"): FurnitureInfoSection | null {
  const parsed = parseFurnitureInfoText(raw, lang, { singleSection: true });
  return parsed[0] ?? null;
}

function sectionLabel(section: FurnitureInfoSection, index: number) {
  const title = section.titleKa || section.titleEn || "";
  return title ? `სექცია ${index + 1} — ${title}` : `სექცია ${index + 1}`;
}

function sectionIsFilled(section: FurnitureInfoSection) {
  return Boolean(
    section.titleKa ||
      section.titleEn ||
      (section.rows ?? []).some((row) => row.labelKa || row.labelEn || row.valueKa || row.valueEn)
  );
}

function SectionPaste({
  onApply,
}: {
  onApply: (lang: "ka" | "en", incoming: FurnitureInfoSection) => void;
}) {
  const [pasteKa, setPasteKa] = useState("");
  const [pasteEn, setPasteEn] = useState("");
  const [message, setMessage] = useState("");

  const apply = (raw: string, lang: "ka" | "en") => {
    const incoming = firstParsedSection(raw, lang);
    if (!incoming) {
      setMessage(
        lang === "ka"
          ? "ქართული ტექსტი ვერ წავიკითხე."
          : "Could not read the English text."
      );
      return;
    }
    onApply(lang, incoming);
    const count = incoming.rows?.length ?? 0;
    setMessage(
      lang === "ka"
        ? `ქართული შეივსო ამ სექციაში (${count} სტრიქონი).`
        : `English filled in this section (${count} rows).`
    );
  };

  const applyBoth = () => {
    if (!pasteKa.trim() && !pasteEn.trim()) {
      setMessage("ჩასვი ამ სექციის ქართული და/ან ინგლისური.");
      return;
    }
    if (pasteKa.trim()) apply(pasteKa, "ka");
    if (pasteEn.trim()) apply(pasteEn, "en");
  };

  return (
    <div className="space-y-2 rounded-lg border border-dashed border-brand-chrome/30 bg-brand-chrome/5 p-3">
      <p className="text-sm text-muted-foreground">ჩასვი მხოლოდ ამ სექციის ტექსტი</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="space-y-1 text-sm font-medium text-foreground">
          ქართული
          <textarea
            value={pasteKa}
            onChange={(event) => setPasteKa(event.target.value)}
            onPaste={(event) => {
              const clipboard = event.clipboardData.getData("text");
              if (!clipboard.trim()) return;
              const target = event.currentTarget;
              window.setTimeout(() => {
                setPasteKa(target.value);
                apply(target.value, "ka");
              }, 0);
            }}
            placeholder={SECTION_PLACEHOLDER_KA}
            className={sectionTextareaClass}
          />
        </label>
        <label className="space-y-1 text-sm font-medium text-foreground">
          English
          <textarea
            value={pasteEn}
            onChange={(event) => setPasteEn(event.target.value)}
            onPaste={(event) => {
              const clipboard = event.clipboardData.getData("text");
              if (!clipboard.trim()) return;
              const target = event.currentTarget;
              window.setTimeout(() => {
                setPasteEn(target.value);
                apply(target.value, "en");
              }, 0);
            }}
            placeholder={SECTION_PLACEHOLDER_EN}
            className={sectionTextareaClass}
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" className="h-9 text-sm" onClick={applyBoth}>
          ამ სექციის შევსება
        </Button>
        {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      </div>
    </div>
  );
}

type Props = {
  form: FurnitureInfoForm;
};

export default function FurnitureInfoFields({ form }: Props) {
  const sections = (form.watch("infoSections") ?? []) as FurnitureInfoSection[];
  const [closed, setClosed] = useState<Set<number>>(new Set());

  const isOpen = (index: number) => !closed.has(index);

  const toggle = (index: number) => {
    setClosed((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const setOpenAll = (openAll: boolean) => {
    setClosed(openAll ? new Set() : new Set(sections.map((_, index) => index)));
  };

  const setSections = (next: FurnitureInfoSection[]) => {
    form.setValue("infoSections", next, { shouldDirty: true });
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
    setClosed((current) => {
      const next = new Set<number>();
      current.forEach((item) => {
        if (item === index) return;
        next.add(item > index ? item - 1 : item);
      });
      return next;
    });
  };

  const addSection = () => {
    setSections([...sections, emptySection()]);
    setClosed((current) => {
      const next = new Set(current);
      next.delete(sections.length);
      return next;
    });
  };

  const updateSection = (index: number, patch: Partial<FurnitureInfoSection>) => {
    setSections(sections.map((section, i) => (i === index ? { ...section, ...patch } : section)));
  };

  const updateRow = (sectionIndex: number, rowIndex: number, patch: Partial<FurnitureInfoRow>) => {
    const section = sections[sectionIndex];
    const rows = [...(section.rows ?? [])];
    rows[rowIndex] = { ...rows[rowIndex], ...patch };
    updateSection(sectionIndex, { rows });
  };

  const allOpen = sections.length > 0 && closed.size === 0;

  return (
    <div className="space-y-4">
      {sections.length > 1 ? (
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            onClick={() => setOpenAll(!allOpen)}
          >
            {allOpen ? "ყველას დახურვა" : "ყველას გახსნა"}
          </button>
        </div>
      ) : null}

      {sections.map((section, sectionIndex) => {
        const open = isOpen(sectionIndex);
        const filled = sectionIsFilled(section);
        const rowCount = (section.rows ?? []).filter(
          (row) => row.labelKa || row.labelEn || row.valueKa || row.valueEn
        ).length;
        return (
          <div key={sectionIndex} className="rounded-xl border border-border">
            <div className="flex items-center gap-2 p-4">
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
                onClick={() => toggle(sectionIndex)}
                aria-expanded={open}
              >
                <span className="min-w-0">
                  <span className="block truncate text-base font-semibold text-foreground">
                    {sectionLabel(section, sectionIndex)}
                  </span>
                  {filled && !open ? (
                    <span className="text-sm text-muted-foreground">{rowCount} სტრიქონი</span>
                  ) : null}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-foreground transition-transform",
                    open ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              <Button
                type="button"
                variant="outline"
                className="h-9 shrink-0 text-sm"
                onClick={() => removeSection(sectionIndex)}
              >
                წაშლა
              </Button>
            </div>
            {open ? (
              <div className="space-y-3 border-t border-border p-4 pt-3">
                <SectionPaste
                  key={sectionIndex}
                  onApply={(lang, incoming) => {
                    const current = (form.getValues("infoSections") ?? []) as FurnitureInfoSection[];
                    const base = current[sectionIndex] ?? emptySection();
                    const merged = overlayFurnitureInfoLang([base], [incoming], lang)[0] ?? incoming;
                    setSections(current.map((item, i) => (i === sectionIndex ? merged : item)));
                  }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={section.titleKa ?? ""}
                    onChange={(event) => updateSection(sectionIndex, { titleKa: event.target.value })}
                    placeholder="სათაური (KA) მაგ. საზომი ინფორმაცია"
                    className={inputClass}
                  />
                  <Input
                    value={section.titleEn ?? ""}
                    onChange={(event) => updateSection(sectionIndex, { titleEn: event.target.value })}
                    placeholder="Title (EN) e.g. Measurement information"
                    className={inputClass}
                  />
                </div>
                {(section.rows ?? []).map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
                    <Input
                      value={row.labelKa ?? ""}
                      onChange={(event) => updateRow(sectionIndex, rowIndex, { labelKa: event.target.value })}
                      placeholder="ველი (KA) მაგ. ბრენდი"
                      className={inputClass}
                    />
                    <Input
                      value={row.labelEn ?? ""}
                      onChange={(event) => updateRow(sectionIndex, rowIndex, { labelEn: event.target.value })}
                      placeholder="Label (EN) e.g. Brand"
                      className={inputClass}
                    />
                    <Input
                      value={row.valueKa ?? ""}
                      onChange={(event) => updateRow(sectionIndex, rowIndex, { valueKa: event.target.value })}
                      placeholder="მნიშვნელობა (KA)"
                      className={inputClass}
                    />
                    <Input
                      value={row.valueEn ?? ""}
                      onChange={(event) => updateRow(sectionIndex, rowIndex, { valueEn: event.target.value })}
                      placeholder="Value (EN)"
                      className={inputClass}
                    />
                    <div className="md:col-span-2 flex justify-end">
                      <button
                        type="button"
                        className="text-sm text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          updateSection(sectionIndex, {
                            rows: (section.rows ?? []).filter((_, i) => i !== rowIndex),
                          })
                        }
                      >
                        სტრიქონის წაშლა
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 text-sm"
                  onClick={() => updateSection(sectionIndex, { rows: [...(section.rows ?? []), emptyRow()] })}
                >
                  + დაამატე სტრიქონი
                </Button>
              </div>
            ) : null}
          </div>
        );
      })}
      <Button type="button" className="h-11 bg-brand-chrome text-white hover:bg-brand-chrome/90" onClick={addSection}>
        + დაამატე ინფორმაციის სექცია
      </Button>
    </div>
  );
}
