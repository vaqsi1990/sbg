-- AlterTable: replace dimensions with optional size1/size2
ALTER TABLE "Quilt" ADD COLUMN "size1" TEXT;
ALTER TABLE "Quilt" ADD COLUMN "size2" TEXT;

UPDATE "Quilt" SET "size1" = "dimensions" WHERE "dimensions" IS NOT NULL AND "dimensions" <> '';

ALTER TABLE "Quilt" DROP COLUMN "dimensions";
