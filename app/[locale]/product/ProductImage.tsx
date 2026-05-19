"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useCallback, useState } from "react";

const MAIN_SIZE = 450;
const THUMB_SIZE = 80;

// Minimal blur placeholder (tiny gray) for instant feedback while image loads
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
      <div className="flex mt-[170px] lg:mt-[200px] flex-col space-y-4 w-[450px] h-[450px] rounded-md bg-muted animate-pulse" />
    );
  }

  return (
    <div className="flex mt-[170px] lg:mt-[200px] flex-col space-y-4">
      <Image
        src={mainSrc}
        alt={`Product image ${currentIndex + 1} of ${safeImages.length}`}
        width={MAIN_SIZE}
        height={MAIN_SIZE}
        sizes="(max-width: 768px) 100vw, 450px"
        priority
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="w-[450px] h-[450px] object-cover rounded-md"
      />

      <div className="flex gap-2" role="tablist" aria-label="Product image thumbnails">
        {safeImages.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrentIndex(index)}
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`View image ${index + 1}`}
            className={cn(
              "p-1 cursor-pointer rounded-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentIndex === index && "ring-2 ring-primary ring-offset-2"
            )}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={THUMB_SIZE}
              height={THUMB_SIZE}
              sizes="80px"
              className="w-[80px] h-[80px] object-cover rounded-md pointer-events-none"
            />
          </button>
        ))}
      </div>
    </div>
  );
}, propsEqual);

export default ProductImages;
