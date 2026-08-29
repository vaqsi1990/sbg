import type { ReactNode } from "react";

export type QuiltSpecCard = {
  key: string;
  label: string;
  value: string;
};

export default function QuiltSpecs({
  items,
  children,
}: {
  items: QuiltSpecCard[];
  children?: ReactNode;
}) {
  if (items.length === 0 && !children) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex min-h-[88px] items-center gap-3 rounded-xl border border-border bg-card p-4"
        >
          <div className="min-w-0">
            
            <p className="mt-0.5 text-sm sm:text-base font-semibold text-foreground leading-snug break-words">
              {item.value}
            </p>
          </div>
        </div>
      ))}
      {children}
    </div>
  );
}
