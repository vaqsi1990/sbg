export type FurnitureInfoRow = {
  labelKa?: string;
  labelEn?: string;
  valueKa?: string;
  valueEn?: string;
};

export type FurnitureInfoSection = {
  titleKa?: string;
  titleEn?: string;
  rows?: FurnitureInfoRow[];
};

function asTrimmed(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function parseFurnitureInfo(value: unknown): FurnitureInfoSection[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((section) => {
      if (!section || typeof section !== "object") return null;
      const item = section as Record<string, unknown>;
      const rows = Array.isArray(item.rows)
        ? item.rows
            .map((row) => {
              if (!row || typeof row !== "object") return null;
              const entry = row as Record<string, unknown>;
              const parsed: FurnitureInfoRow = {
                labelKa: asTrimmed(entry.labelKa),
                labelEn: asTrimmed(entry.labelEn),
                valueKa: asTrimmed(entry.valueKa),
                valueEn: asTrimmed(entry.valueEn),
              };
              if (!parsed.labelKa && !parsed.labelEn && !parsed.valueKa && !parsed.valueEn) {
                return null;
              }
              return parsed;
            })
            .filter((row): row is FurnitureInfoRow => Boolean(row))
        : [];

      const parsed: FurnitureInfoSection = {
        titleKa: asTrimmed(item.titleKa),
        titleEn: asTrimmed(item.titleEn),
        rows,
      };

      if (!parsed.titleKa && !parsed.titleEn && rows.length === 0) return null;
      return parsed;
    })
    .filter((section): section is FurnitureInfoSection => Boolean(section));
}

export function normalizeFurnitureInfo(value: unknown): FurnitureInfoSection[] {
  return parseFurnitureInfo(value);
}

export type FurnitureInfoDisplayRow = {
  label: string;
  value: string;
};

export type FurnitureInfoDisplaySection = {
  title: string;
  rows: FurnitureInfoDisplayRow[];
};

export function toFurnitureInfoDisplay(
  sections: FurnitureInfoSection[],
  isGe: boolean
): FurnitureInfoDisplaySection[] {
  return sections
    .map((section) => {
      const title = (isGe ? section.titleKa : section.titleEn) || section.titleKa || section.titleEn || "";
      const rows = (section.rows ?? [])
        .map((row) => {
          const label = (isGe ? row.labelKa : row.labelEn) || row.labelKa || row.labelEn || "";
          const value = (isGe ? row.valueKa : row.valueEn) || row.valueKa || row.valueEn || "";
          if (!label && !value) return null;
          return { label, value };
        })
        .filter((row): row is FurnitureInfoDisplayRow => Boolean(row));

      if (!title && rows.length === 0) return null;
      return { title, rows };
    })
    .filter((section): section is FurnitureInfoDisplaySection => Boolean(section));
}
