export function normalizeFurnitureSizes(input: {
  sizes?: unknown;
  size1?: string | null;
  size2?: string | null;
  size3?: string | null;
  size4?: string | null;
}): string[] {
  if (Array.isArray(input.sizes)) {
    const list = input.sizes
      .map((value) => (typeof value === "string" ? value.trim() : ""))
      .filter(Boolean);
    if (list.length > 0) return list;
  }

  return [input.size1, input.size2, input.size3, input.size4]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);
}

export function sizesForForm(input: {
  sizes?: unknown;
  size1?: string | null;
  size2?: string | null;
  size3?: string | null;
  size4?: string | null;
}): string[] {
  const list = normalizeFurnitureSizes(input);
  return list.length > 0 ? list : [""];
}
