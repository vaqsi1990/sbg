import type { ReactNode } from "react";
import { Box, Droplets, Feather, Layers, Scale } from "lucide-react";

export type QuiltSpecCard = {
  key: string;
  label: string;
  value: string;
};

const ICONS: Record<string, typeof Layers> = {
  fabric: Layers,
  filling: Feather,
  weight: Scale,
  packaging: Box,
  care: Droplets,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => {
        const Icon = ICONS[item.key] ?? Layers;
        return (
          <div
            key={item.key}
            className="flex min-h-[88px] items-center gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-foreground">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-0.5 text-sm sm:text-base font-semibold text-foreground leading-snug break-words">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
      {children}
    </div>
  );
}
