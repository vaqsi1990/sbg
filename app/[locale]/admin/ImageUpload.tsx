/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import Image from "next/image";
type ImageUploadProps = {
  onChange: (urls: string[]) => void;
  value: string[];
};

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>(value || []);

  const handleUploadComplete = (res: any[]) => {
    const urls = res.map((file) => file.url);
    const newUrls = [...imageUrls, ...urls];
    setImageUrls(newUrls);
    onChange(newUrls); // ეს ატვირთული URL-ები გადავა form-ში
    alert("Files uploaded successfully!");
  };

  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
      <UploadButton
        className="ut-button:bg-[#203e72] ut-button:text-white ut-allowed-content:text-gray-500"
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrls.length > 0 ? (
        <div className="mt-4 space-y-2">
          <h2 className="text-sm font-semibold text-black">ატვირთული სურათები</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                className="rounded border border-gray-200 object-cover"
                width={200}
                height={200}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">სურათი ჯერ არ არის ატვირთული</p>
      )}
    </div>
  );
};

export default ImageUpload;
