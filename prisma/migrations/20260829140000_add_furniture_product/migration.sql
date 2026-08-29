-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'FURNITURE';

-- CreateTable
CREATE TABLE "Furniture" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "descriptionKa" TEXT,
    "descriptionEn" TEXT,

    CONSTRAINT "Furniture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Furniture" ADD CONSTRAINT "Furniture_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
