"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FurnitureInfoRow, FurnitureInfoSection } from "@/lib/furniture-info";

const inputClass =
  "h-11 w-full bg-background text-base text-foreground placeholder:text-muted-foreground border-border md:text-base";

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

type Props = {
  form: UseFormReturn<any>;
};

export default function FurnitureInfoFields({ form }: Props) {
  const sections =
    ((form.watch() as { infoSections?: FurnitureInfoSection[] }).infoSections ?? []) as FurnitureInfoSection[];

  const setSections = (next: FurnitureInfoSection[]) => {
    form.setValue("infoSections" as never, next as never, { shouldDirty: true });
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

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3 rounded-xl border border-border p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-semibold text-foreground">სექცია {sectionIndex + 1}</p>
            <Button
              type="button"
              variant="outline"
              className="h-9 text-sm"
              onClick={() => setSections(sections.filter((_, i) => i !== sectionIndex))}
            >
              წაშლა
            </Button>
          </div>
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
      ))}
      <Button type="button" className="h-11 bg-brand-chrome text-white hover:bg-brand-chrome/90" onClick={() => setSections([...sections, emptySection()])}>
        + დაამატე ინფორმაციის სექცია
      </Button>
    </div>
  );
}
