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
      <p className="mt-4 text-[15px] text-text-secondary">
        <span className="font-semibold text-gray-900">{isGe ? "ზომა" : "Size"}:</span> {sizes[0]}
      </p>
    );
  }

  return (
    <div className="mt-4">
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        {isGe ? "ზომა" : "Size"}
      </label>
      <Select defaultValue={sizes[0]}>
        <SelectTrigger className="w-full max-w-xs rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-brand/20">
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
