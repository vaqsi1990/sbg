-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('MATTRESS', 'PILLOW', 'QUILT', 'PAD');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'NO_NAME',
    "email" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "ProductType" NOT NULL,
    "images" TEXT[],
    "titleEn" TEXT NOT NULL,
    "titleKa" TEXT NOT NULL,
    "secondtext" TEXT NOT NULL,
    "secondtextEn" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "categoryKa" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mattress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "height" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionKa" TEXT NOT NULL,
    "minitext" TEXT NOT NULL,
    "minitextEn" TEXT NOT NULL,
    "springTech" BOOLEAN NOT NULL,
    "breathable" BOOLEAN NOT NULL,
    "doubleSided" BOOLEAN NOT NULL,
    "orthopaedic" BOOLEAN NOT NULL,
    "knitte" BOOLEAN NOT NULL,
    "wool" BOOLEAN NOT NULL,
    "visco" BOOLEAN NOT NULL,
    "dns" BOOLEAN NOT NULL,
    "latex" BOOLEAN NOT NULL,
    "washable" BOOLEAN NOT NULL,

    CONSTRAINT "Mattress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pad" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firmness" TEXT NOT NULL,
    "firmnessEn" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionKa" TEXT NOT NULL,
    "minitext" TEXT NOT NULL,
    "minitextEn" TEXT NOT NULL,
    "springTech" BOOLEAN NOT NULL,
    "breathable" BOOLEAN NOT NULL,
    "doubleSided" BOOLEAN NOT NULL,
    "orthopaedic" BOOLEAN NOT NULL,
    "knitte" BOOLEAN NOT NULL,
    "wool" BOOLEAN NOT NULL,
    "visco" BOOLEAN NOT NULL,
    "dns" BOOLEAN NOT NULL,
    "latex" BOOLEAN NOT NULL,
    "washable" BOOLEAN NOT NULL,

    CONSTRAINT "Pad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pillow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "size" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "minitext" TEXT NOT NULL,
    "minitextEn" TEXT NOT NULL,
    "outerFabric" TEXT NOT NULL,
    "filling" TEXT NOT NULL,
    "packaging" TEXT NOT NULL,
    "outerFabricEn" TEXT NOT NULL,
    "fillingEn" TEXT NOT NULL,
    "packagingEn" TEXT NOT NULL,

    CONSTRAINT "Pillow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quilt" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dimensions" TEXT NOT NULL,
    "fabric" TEXT NOT NULL,
    "filling" TEXT NOT NULL,
    "fabricEn" TEXT NOT NULL,
    "fillingEn" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "minitext" TEXT NOT NULL,
    "minitextEn" TEXT NOT NULL,

    CONSTRAINT "Quilt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Mattress" ADD CONSTRAINT "Mattress_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pad" ADD CONSTRAINT "Pad_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pillow" ADD CONSTRAINT "Pillow_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quilt" ADD CONSTRAINT "Quilt_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
