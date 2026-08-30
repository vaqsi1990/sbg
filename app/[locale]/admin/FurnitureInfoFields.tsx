"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FurnitureInfoRow, FurnitureInfoSection } from "@/lib/furniture-info";
import { overlayFurnitureInfoLang, parseFurnitureInfoText } from "@/lib/furniture-info";

const inputClass =
  "h-11 w-full bg-background text-base text-foreground placeholder:text-muted-foreground border-border md:text-base";

const textareaClass =
  "w-full min-h-40 resize-y rounded-xl border border-border bg-background p-4 text-base text-foreground placeholder:text-muted-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const PASTE_PLACEHOLDER_KA = `საზომი ინფორმაცია
ბრენდი: Sleeper
სიგანე: 45 სმ
სიმაღლე: 55 სმ

პროდუქტის დეტალები
ფერი: ბეჟი`;

const PASTE_PLACEHOLDER_EN = `Measurement information
Brand: Sleeper
Width: 45 cm
Height: 55 cm

Product details
Color: Beige`;

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
  const [pasteKa, setPasteKa] = useState("");
  const [pasteEn, setPasteEn] = useState("");
  const [pasteMessage, setPasteMessage] = useState("");

  const setSections = (next: FurnitureInfoSection[]) => {
    form.setValue("infoSections" as never, next as never, { shouldDirty: true });
  };

  const applyLang = (raw: string, lang: "ka" | "en", current?: FurnitureInfoSection[], silent = false) => {
    const base =
      current ??
      ((form.getValues() as { infoSections?: FurnitureInfoSection[] }).infoSections ?? []);
    const parsed = parseFurnitureInfoText(raw, lang);
    if (parsed.length === 0) {
      if (!silent) {
        setPasteMessage(
          lang === "ka"
            ? "ქართული ტექსტი ვერ წავიკითხე. ჩასვი სათაური და სტრიქონები სახელი: მნიშვნელობა."
            : "Could not read the English text. Paste a title and lines like Label: Value."
        );
      }
      return base;
    }
    const usableBase = base.filter(
      (section) =>
        section.titleKa ||
        section.titleEn ||
        (section.rows ?? []).some((row) => row.labelKa || row.labelEn || row.valueKa || row.valueEn)
    );
    const next = overlayFurnitureInfoLang(usableBase, parsed, lang);
    setSections(next);
    if (!silent) {
      const rowCount = next.reduce((sum, section) => sum + (section.rows?.length ?? 0), 0);
      setPasteMessage(
        lang === "ka"
          ? `ქართული შეივსო (${next.length} სექცია, ${rowCount} სტრიქონი). ახლა ჩასვი ინგლისური მარჯვნივ.`
          : `English filled (${next.length} sections, ${rowCount} rows). Georgian on the left is kept.`
      );
    }
    return next;
  };

  const applyBoth = (kaText = pasteKa, enText = pasteEn) => {
    if (!kaText.trim() && !enText.trim()) {
      setPasteMessage("ჩასვი ქართული მარცხნივ და ინგლისური მარჯვნივ.");
      return;
    }
    let next =
      ((form.getValues() as { infoSections?: FurnitureInfoSection[] }).infoSections ?? []) as FurnitureInfoSection[];
    if (kaText.trim() && enText.trim()) next = [];
    if (kaText.trim()) next = applyLang(kaText, "ka", next, true);
    if (enText.trim()) next = applyLang(enText, "en", next, true);
    const rowCount = next.reduce((sum, section) => sum + (section.rows?.length ?? 0), 0);
    setPasteMessage(`შეივსო ${next.length} სექცია, ${rowCount} სტრიქონი — ქართული და ინგლისური.`);
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
      <div className="space-y-3 rounded-xl border border-dashed border-brand-chrome/40 bg-brand-chrome/5 p-4">
        <div>
          <p className="text-base font-semibold text-foreground">ჩასვი ქართული და ინგლისური ცალ-ცალკე</p>
          <p className="text-sm text-muted-foreground">
            მარცხნივ ჩასვი ქართული სია, მარჯვნივ ინგლისური. ყოველი კატეგორიის სათაური ცალ ხაზზე უნდა იყოს — იმდენი სექცია შეიქმნება.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="space-y-2 text-base font-medium text-foreground">
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
                  applyLang(target.value, "ka");
                }, 0);
              }}
              placeholder={PASTE_PLACEHOLDER_KA}
              className={textareaClass}
            />
          </label>
          <label className="space-y-2 text-base font-medium text-foreground">
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
                  applyLang(target.value, "en");
                }, 0);
              }}
              placeholder={PASTE_PLACEHOLDER_EN}
              className={textareaClass}
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            className="h-10 bg-brand-chrome text-white hover:bg-brand-chrome/90"
            onClick={() => applyBoth()}
          >
            შევსება
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 text-sm"
            onClick={() => {
              setPasteKa("");
              setPasteEn("");
              setPasteMessage("");
            }}
          >
            გასუფთავება
          </Button>
          {pasteMessage ? <p className="text-sm text-muted-foreground">{pasteMessage}</p> : null}
        </div>
      </div>

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
