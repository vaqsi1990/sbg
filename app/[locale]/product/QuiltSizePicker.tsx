"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type QuiltSizePickerProps = {
  sizes: string[];
  isGe: boolean;
};

export default function QuiltSizePicker({ sizes, isGe }: QuiltSizePickerProps) {
  if (sizes.length === 0) return null;

  if (sizes.length === 1) {
    return (
      <div className="inline-flex items-center gap-3">
        <span className="shrink-0 text-base font-medium text-foreground">
          {isGe ? "ზომა" : "Size"}
        </span>
        <span className="rounded-xl border border-border bg-card px-4 py-2.5 text-base font-semibold text-foreground">
          {sizes[0]}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      <label className="shrink-0 text-base font-medium text-foreground">
        {isGe ? "ზომა" : "Size"}
      </label>
      <Select defaultValue={sizes[0]}>
        <SelectTrigger className="h-11 w-[11.5rem] rounded-xl border-border bg-background text-base font-medium text-foreground">
          <SelectValue placeholder={isGe ? "აირჩიე ზომა" : "Choose size"} />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {sizes.map((size, index) => (
            <SelectItem key={`${size}-${index}`} value={size} className="text-base">
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
