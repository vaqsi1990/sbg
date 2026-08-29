import Image from "next/image";

const HIGHLIGHTS = [
  {
    src: "/furniture/1.webp",
    en: {
      title: "Crafted from 100% Solid Oak Wood",
      text: "Our bedside tables are made entirely from natural solid oak, offering superior durability and a refined aesthetic for any space.",
    },
    ge: {
      title: "100% მასიური მუხის ხისგან",
      text: "ჩვენი საწოლის მაგიდები დამზადებულია ბუნებრივი მასიური მუხისგან — გამძლე და დახვეწილი ესთეტიკა ნებისმიერ სივრცეში.",
    },
  },
  {
    src: "/furniture/2.webp",
    en: {
      title: "Fully Assembled Delivery",
      text: "All models are delivered fully assembled and ready to use—no tools or installation required.",
    },
    ge: {
      title: "სრულად აწყობილი მიწოდება",
      text: "ყველა მოდელი მოგეწოდებათ სრულად აწყობილი და გამოსაყენებლად მზად — ხელსაწყოები და მონტაჟი არ არის საჭირო.",
    },
  },
  {
    src: "/furniture/3.webp",
    en: {
      title: "Naturally Aging Surface Texture",
      text: "The solid wood surface matures beautifully over time, gaining richer tones and a timeless character with continued use.",
    },
    ge: {
      title: "ბუნებრივად დაძველებული ზედაპირი",
      text: "მასიური ხის ზედაპირი დროთა განმავლობაში უფრო მდიდარ ტონებს და უდროო ხასიათს იძენს.",
    },
  },
] as const;

export default function FurnitureHighlights({ isGe }: { isGe: boolean }) {
  return (
    <div className="mt-6 space-y-4">
      {HIGHLIGHTS.map((item) => {
        const copy = isGe ? item.ge : item.en;
        return (
          <div
            key={item.src}
            className="relative overflow-hidden rounded-2xl bg-muted/60 aspect-[16/10]"
          >
            <Image
              src={item.src}
              alt={copy.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                {copy.title}
              </h3>
              <p className="mt-1.5 text-sm sm:text-[15px] text-white/90 leading-relaxed">
                {copy.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
