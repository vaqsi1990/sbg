"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FurnitureInfoDisplaySection } from "@/lib/furniture-info";

type FurnitureInfoAccordionProps = {
  sections: FurnitureInfoDisplaySection[];
  isGe: boolean;
};

export default function FurnitureInfoAccordion({ sections, isGe }: FurnitureInfoAccordionProps) {
  const ids = useMemo(() => sections.map((_, index) => String(index)), [sections]);
  const [open, setOpen] = useState<Set<string>>(() => new Set(ids.slice(0, 1)));

  if (sections.length === 0) return null;

  const allOpen = open.size === sections.length;

  const toggle = (id: string) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          onClick={() => setOpen(allOpen ? new Set() : new Set(ids))}
        >
          {allOpen
            ? isGe
              ? "ყველას დახურვა"
              : "Close all"
            : isGe
              ? "ყველას გახსნა"
              : "Open all"}
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {sections.map((section, index) => {
          const id = String(index);
          const isOpen = open.has(id);
          return (
            <div key={`${section.title}-${index}`} className="border-b border-border last:border-b-0">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                aria-expanded={isOpen}
                onClick={() => toggle(id)}
              >
                <span className="text-sm sm:text-base font-semibold uppercase tracking-wide text-foreground">
                  {section.title}
                </span>
                {isOpen ? (
                  <Minus className="h-5 w-5 shrink-0 text-foreground" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-foreground" />
                )}
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-200", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="space-y-2 px-4 pb-4">
                    {section.rows.map((row, rowIndex) => (
                      <p key={`${row.label}-${row.value}-${rowIndex}`} className="text-sm sm:text-base text-foreground">
                        {row.label && row.value ? (
                          <>
                            <span className="font-medium">{row.label}</span>
                            <span> : {row.value}</span>
                          </>
                        ) : (
                          <span className="font-medium">{row.label || row.value}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
