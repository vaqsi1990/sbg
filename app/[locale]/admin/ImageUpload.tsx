/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

type ImageUploadProps = {
  onChange: (urls: string[]) => void;
  value: string[];
  maxFiles?: number;
};

const ImageUpload = ({ onChange, value, maxFiles }: ImageUploadProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>(value || []);

  useEffect(() => {
    setImageUrls(value || []);
  }, [value]);

  const handleUploadComplete = (res: any[]) => {
    const urls = res.map((file) => file.url);
    const merged = maxFiles === 1 ? urls.slice(0, 1) : [...imageUrls, ...urls];
    const newUrls = maxFiles ? merged.slice(0, maxFiles) : merged;
    setImageUrls(newUrls);
    onChange(newUrls);
  };

  const removeImage = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    onChange(newUrls);
  };

  const canUploadMore = !maxFiles || imageUrls.length < maxFiles;

  return (
    <div className="space-y-4">
      {canUploadMore ? (
        <UploadDropzone
          endpoint="imageUploader"
          config={{ mode: "auto" }}
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            alert(`შეცდომა: ${error.message}`);
          }}
          className="min-h-[200px] w-full cursor-pointer rounded-xl border-2 border-dashed border-brand-chrome/40 bg-brand-chrome/5 px-6 py-10 transition-colors hover:border-brand-chrome hover:bg-brand-chrome/10 dark:border-brand/40 dark:bg-brand/10 dark:hover:border-brand dark:hover:bg-brand/15"
          appearance={{
            container: "w-full border-none bg-transparent p-0 shadow-none",
            uploadIcon: "h-14 w-14 text-brand-chrome dark:text-brand",
            label: "mt-3 text-base font-semibold text-brand-chrome cursor-pointer hover:text-brand-chrome/80 dark:text-brand dark:hover:text-brand/80",
            allowedContent: "mt-1 text-sm text-muted-foreground",
            button: "hidden",
          }}
          content={{
            uploadIcon: () => (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-chrome/10 dark:bg-brand/15">
                <ImagePlus className="h-8 w-8 text-brand-chrome dark:text-brand" strokeWidth={1.75} />
              </span>
            ),
            label: ({ isUploading, uploadProgress }) =>
              isUploading
                ? `ატვირთვა... ${Math.round(uploadProgress)}%`
                : "დააჭირე ან გადაიტანე სურათები აქ",
            allowedContent: "PNG, JPG ან WEBP · მაქს. 16MB",
          }}
        />
      ) : null}

      {imageUrls.length > 0 ? (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">
            ატვირთული სურათები ({imageUrls.length}
            {maxFiles ? ` / ${maxFiles}` : ""})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {imageUrls.map((url, index) => (
              <div key={`${url}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                <Image
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
                  aria-label="სურათის წაშლა"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : !canUploadMore ? (
        <p className="text-center text-sm text-muted-foreground">სურათი ჯერ არ არის ატვირთული</p>
      ) : null}
    </div>
  );
};

export default ImageUpload;
