-- AlterTable
ALTER TABLE "Furniture" ADD COLUMN IF NOT EXISTS "sizes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

UPDATE "Furniture" AS furniture
SET sizes = source.vals
FROM (
  SELECT
    id,
    ARRAY(
      SELECT value
      FROM unnest(ARRAY[size1, size2, size3, size4]) AS value
      WHERE value IS NOT NULL AND btrim(value) <> ''
    ) AS vals
  FROM "Furniture"
) AS source
WHERE furniture.id = source.id
  AND cardinality(furniture.sizes) = 0;
