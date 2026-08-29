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
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:grid-rows-2 lg:h-[min(72vh,680px)]">
      {HIGHLIGHTS.map((item, index) => {
        const copy = isGe ? item.ge : item.en;
        const isHero = index === 0;

        return (
          <article
            key={item.src}
            className={
              isHero
                ? "relative isolate min-h-[280px] overflow-hidden rounded-2xl sm:rounded-3xl lg:row-span-2 lg:min-h-0"
                : "relative isolate min-h-[220px] overflow-hidden rounded-2xl sm:rounded-3xl lg:min-h-0"
            }
          >
            <Image
              src={item.src}
              alt={copy.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 text-center sm:px-10 lg:px-12">
              <h3
                className={
                  isHero
                    ? "max-w-md text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[28px]"
                    : "max-w-sm text-lg font-semibold leading-snug text-white sm:text-xl"
                }
              >
                {copy.title}
              </h3>
              <p
                className={
                  isHero
                    ? "mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base"
                    : "mt-2 max-w-sm text-sm leading-relaxed text-white/90"
                }
              >
                {copy.text}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
