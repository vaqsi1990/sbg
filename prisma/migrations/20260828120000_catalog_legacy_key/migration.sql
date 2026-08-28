-- AlterTable
ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "href" TEXT,
ADD COLUMN IF NOT EXISTS "legacyKey" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "CatalogItem_legacyKey_key" ON "CatalogItem"("legacyKey");
