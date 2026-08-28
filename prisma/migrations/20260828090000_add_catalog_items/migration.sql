-- CreateEnum
CREATE TYPE "CatalogKind" AS ENUM ('FEATURE', 'HEIGHT');

-- CreateTable
CREATE TABLE "CatalogItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "kind" "CatalogKind" NOT NULL,
    "slug" TEXT NOT NULL,
    "labelKa" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "forMattress" BOOLEAN NOT NULL DEFAULT true,
    "forPad" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCatalogItem" (
    "productId" UUID NOT NULL,
    "itemId" UUID NOT NULL,

    CONSTRAINT "ProductCatalogItem_pkey" PRIMARY KEY ("productId","itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogItem_slug_key" ON "CatalogItem"("slug");

-- AddForeignKey
ALTER TABLE "ProductCatalogItem" ADD CONSTRAINT "ProductCatalogItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCatalogItem" ADD CONSTRAINT "ProductCatalogItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "CatalogItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
