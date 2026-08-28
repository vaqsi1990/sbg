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
      <p className="mt-4 text-[15px]">
        <strong>{isGe ? "ზომა" : "Size"}:</strong> {sizes[0]}
      </p>
    );
  }

  return (
    <div className="mt-4">
      <label className="mb-2 block text-sm font-semibold">
        {isGe ? "ზომა" : "Size"}
      </label>
      <Select defaultValue={sizes[0]}>
        <SelectTrigger className="w-full max-w-xs rounded-xl border border-gray-300 bg-white">
          <SelectValue placeholder={isGe ? "აირჩიე ზომა" : "Choose size"} />
        </SelectTrigger>
        <SelectContent>
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
