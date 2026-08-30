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

const GEORGIAN = /[\u10A0-\u10FF]/;

function hasGeorgian(value: string): boolean {
  return GEORGIAN.test(value);
}

function asOptional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function bilingualParts(text: string): { ka?: string; en?: string } {
  const trimmed = text.trim();
  if (!trimmed) return {};
  const parts = trimmed.split(/\s+\/\s+/).map((part) => part.trim()).filter(Boolean);
  if (parts.length === 2 && hasGeorgian(parts[0]) !== hasGeorgian(parts[1])) {
    return hasGeorgian(parts[0])
      ? { ka: parts[0], en: parts[1] }
      : { ka: parts[1], en: parts[0] };
  }
  return hasGeorgian(trimmed) ? { ka: trimmed } : { en: trimmed };
}

function stripBullet(line: string): string {
  return line.replace(/^[-•*]\s+/, "").replace(/^\d+[.)]\s+/, "").trim();
}

function cellsOf(line: string): string[] {
  const text = stripBullet(line);
  if (!text) return [];
  if (/^[\s|:.-]+$/.test(text)) return [];

  if (text.includes("\t")) {
    const cells = text.split("\t").map((cell) => cell.trim());
    while (cells.length > 0 && cells[cells.length - 1] === "") cells.pop();
    return cells;
  }

  if (text.includes("|")) {
    const cells = text.split("|").map((cell) => cell.trim());
    while (cells.length > 0 && cells[0] === "") cells.shift();
    while (cells.length > 0 && cells[cells.length - 1] === "") cells.pop();
    if (cells.length >= 2) return cells;
  }

  const colon = text.match(/^(.+?)\s*[:：]\s*(.+)$/);
  if (colon) return [colon[1].trim(), colon[2].trim()];
  return [text];
}

function parsePastedLine(line: string): FurnitureInfoRow {
  const cells = cellsOf(line);
  if (cells.length === 0) return {};

  if (cells.length >= 4) {
    return {
      labelKa: asOptional(cells[0]),
      labelEn: asOptional(cells[1]),
      valueKa: asOptional(cells[2]),
      valueEn: asOptional(cells[3]),
    };
  }

  if (cells.length === 3) {
    return {
      labelKa: asOptional(cells[0]),
      labelEn: asOptional(cells[1]),
      valueKa: asOptional(cells[2]),
      valueEn: asOptional(hasGeorgian(cells[2]) ? undefined : cells[2]),
    };
  }

  if (cells.length === 1) {
    const one = bilingualParts(cells[0]);
    return { labelKa: one.ka, labelEn: one.en };
  }

  const label = bilingualParts(cells[0]);
  const value = bilingualParts(cells[1]);
  const labelIsBoth = Boolean(label.ka && label.en);
  const singleValue = value.ka || value.en || cells[1];

  if (labelIsBoth) {
    return {
      labelKa: label.ka,
      labelEn: label.en,
      valueKa: value.ka || singleValue,
      valueEn: value.en || singleValue,
    };
  }

  if (label.ka && !label.en) {
    return {
      labelKa: label.ka,
      valueKa: value.ka || value.en || cells[1],
      valueEn: value.ka && value.en ? value.en : undefined,
    };
  }

  return {
    labelEn: label.en,
    valueEn: value.en || value.ka || cells[1],
    valueKa: value.ka && value.en ? value.ka : undefined,
  };
}

function isHeaderRow(row: FurnitureInfoRow): boolean {
  const text = [row.labelKa, row.labelEn, row.valueKa, row.valueEn]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return /^(label|value|title|ველი|მნიშვნელობა|სათაური)(\s|$)/.test(text);
}

function rowIsTitle(row: FurnitureInfoRow): boolean {
  return Boolean((row.labelKa || row.labelEn) && !row.valueKa && !row.valueEn);
}

function parsePastedBlock(lines: string[]): FurnitureInfoSection | null {
  const rows = lines.map(parsePastedLine).filter((row) => !isHeaderRow(row));
  const usable = rows.filter((row) => row.labelKa || row.labelEn || row.valueKa || row.valueEn);
  if (usable.length === 0) return null;

  let titleKa: string | undefined;
  let titleEn: string | undefined;
  let dataRows = usable;

  if (usable.length > 1 && rowIsTitle(usable[0])) {
    titleKa = usable[0].labelKa;
    titleEn = usable[0].labelEn;
    dataRows = usable.slice(1);
  }

  return { titleKa, titleEn, rows: dataRows };
}

function sectionLang(section: FurnitureInfoSection): "ka" | "en" | "both" {
  const hasKa = Boolean(section.titleKa || section.rows?.some((row) => row.labelKa));
  const hasEn = Boolean(section.titleEn || section.rows?.some((row) => row.labelEn));
  if (hasKa && hasEn) return "both";
  if (hasKa) return "ka";
  return "en";
}

function mergeLangSections(ka: FurnitureInfoSection, en: FurnitureInfoSection): FurnitureInfoSection {
  const count = Math.max(ka.rows?.length ?? 0, en.rows?.length ?? 0);
  const rows: FurnitureInfoRow[] = [];
  for (let i = 0; i < count; i++) {
    const left = ka.rows?.[i];
    const right = en.rows?.[i];
    rows.push({
      labelKa: left?.labelKa || left?.labelEn,
      labelEn: right?.labelEn || right?.labelKa,
      valueKa: left?.valueKa || left?.valueEn,
      valueEn: right?.valueEn || right?.valueKa,
    });
  }
  return {
    titleKa: ka.titleKa || ka.titleEn,
    titleEn: en.titleEn || en.titleKa,
    rows,
  };
}

function zipLangSections(ka: FurnitureInfoSection[], en: FurnitureInfoSection[]): FurnitureInfoSection[] {
  const count = Math.max(ka.length, en.length);
  const merged: FurnitureInfoSection[] = [];
  for (let i = 0; i < count; i++) {
    if (ka[i] && en[i]) merged.push(mergeLangSections(ka[i], en[i]));
    else merged.push(ka[i] || en[i]);
  }
  return merged;
}

function pairLanguageSections(sections: FurnitureInfoSection[]): FurnitureInfoSection[] {
  const langs = sections.map(sectionLang);
  if (langs.every((lang) => lang === "both" || lang === "ka") || langs.every((lang) => lang === "both" || lang === "en")) {
    return sections;
  }

  const result: FurnitureInfoSection[] = [];
  let kaQueue: FurnitureInfoSection[] = [];
  let enQueue: FurnitureInfoSection[] = [];

  const flush = () => {
    if (kaQueue.length || enQueue.length) {
      result.push(...zipLangSections(kaQueue, enQueue));
      kaQueue = [];
      enQueue = [];
    }
  };

  sections.forEach((section, index) => {
    const lang = langs[index];
    if (lang === "both") {
      flush();
      result.push(section);
      return;
    }
    if (lang === "ka") kaQueue.push(section);
    else enQueue.push(section);
  });
  flush();
  return result;
}

function forceSectionLang(section: FurnitureInfoSection, lang: "ka" | "en"): FurnitureInfoSection {
  if (lang === "ka") {
    return {
      titleKa: section.titleKa || section.titleEn,
      rows: (section.rows ?? []).map((row) => ({
        labelKa: row.labelKa || row.labelEn,
        valueKa: row.valueKa || row.valueEn,
      })),
    };
  }
  return {
    titleEn: section.titleEn || section.titleKa,
    rows: (section.rows ?? []).map((row) => ({
      labelEn: row.labelEn || row.labelKa,
      valueEn: row.valueEn || row.valueKa,
    })),
  };
}

export function parseFurnitureInfoText(raw: string, lang?: "ka" | "en"): FurnitureInfoSection[] {
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  if (text.startsWith("[") || text.startsWith("{")) {
    try {
      const json = JSON.parse(text) as unknown;
      const parsed = parseFurnitureInfo(Array.isArray(json) ? json : [json]);
      if (parsed.length > 0) {
        if (lang === "ka" || lang === "en") {
          return parsed.map((section) => forceSectionLang(section, lang));
        }
        return parsed;
      }
    } catch {
      // Fall through to plain-text parsing.
    }
  }

  const blocks: string[][] = [];
  let current: string[] = [];
  for (const line of text.split("\n")) {
    if (line.trim() === "") {
      if (current.length > 0) {
        blocks.push(current);
        current = [];
      }
      continue;
    }
    current.push(line.trim());
  }
  if (current.length > 0) blocks.push(current);

  const sections = blocks
    .map(parsePastedBlock)
    .filter((section): section is FurnitureInfoSection => Boolean(section));

  const paired = pairLanguageSections(sections);
  if (lang === "ka" || lang === "en") {
    return paired.map((section) => forceSectionLang(section, lang));
  }
  return paired;
}

export function overlayFurnitureInfoLang(
  existing: FurnitureInfoSection[],
  incoming: FurnitureInfoSection[],
  lang: "ka" | "en"
): FurnitureInfoSection[] {
  const count = Math.max(existing.length, incoming.length);
  const result: FurnitureInfoSection[] = [];

  for (let i = 0; i < count; i++) {
    const base = existing[i] ?? { rows: [] };
    const add = incoming[i];
    if (!add) {
      result.push(base);
      continue;
    }

    const rowCount = Math.max(base.rows?.length ?? 0, add.rows?.length ?? 0);
    const rows: FurnitureInfoRow[] = [];
    for (let r = 0; r < rowCount; r++) {
      const left = base.rows?.[r] ?? {};
      const right = add.rows?.[r] ?? {};
      if (lang === "ka") {
        rows.push({
          labelKa: right.labelKa || right.labelEn || left.labelKa,
          labelEn: left.labelEn,
          valueKa: right.valueKa || right.valueEn || left.valueKa,
          valueEn: left.valueEn,
        });
      } else {
        rows.push({
          labelKa: left.labelKa,
          labelEn: right.labelEn || right.labelKa || left.labelEn,
          valueKa: left.valueKa,
          valueEn: right.valueEn || right.valueKa || left.valueEn,
        });
      }
    }

    result.push({
      titleKa: lang === "ka" ? add.titleKa || add.titleEn || base.titleKa : base.titleKa,
      titleEn: lang === "en" ? add.titleEn || add.titleKa || base.titleEn : base.titleEn,
      rows,
    });
  }

  return result;
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
