"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useCallback, useState } from "react";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQAD8B2n/9k=";

type Props = { images: string[] };

function propsEqual(prev: Props, next: Props): boolean {
  const a = prev.images;
  const b = next.images;
  if (a === b) return true;
  if (!a?.length && !b?.length) return true;
  if (!a || !b || a.length !== b.length) return false;
  return a.every((url, i) => url === b[i]);
}

const ProductImages = memo(function ProductImages({ images }: Props) {
  const [current, setCurrent] = useState(0);

  const safeImages = images?.length ? images : [];
  const currentIndex = Math.min(current, Math.max(0, safeImages.length - 1));
  const mainSrc = safeImages[currentIndex];

  const setCurrentIndex = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  if (safeImages.length === 0) {
    return (
      <div className="aspect-square w-full max-w-xl mx-auto rounded-2xl bg-muted animate-pulse" />
    );
  }

  return (
    <div className="flex w-full max-w-xl mx-auto flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/60">
        <Image
          src={mainSrc}
          alt={`Product image ${currentIndex + 1} of ${safeImages.length}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product image thumbnails">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "shrink-0 overflow-hidden rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                currentIndex === index
                  ? "border-brand shadow-sm"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={72}
                height={72}
                sizes="72px"
                className="h-[72px] w-[72px] object-cover pointer-events-none"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}, propsEqual);

export default ProductImages;
