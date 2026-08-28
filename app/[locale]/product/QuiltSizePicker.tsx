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
      <div className="elevated-card flex items-center justify-between gap-4 px-4 py-3">
        <span className="text-sm text-muted-foreground">{isGe ? "ზომა" : "Size"}</span>
        <span className="text-sm font-medium text-foreground">{sizes[0]}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {isGe ? "ზომა" : "Size"}
      </label>
      <Select defaultValue={sizes[0]}>
        <SelectTrigger className="w-full max-w-xs rounded-xl border-border bg-card">
          <SelectValue placeholder={isGe ? "აირჩიე ზომა" : "Choose size"} />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {sizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
