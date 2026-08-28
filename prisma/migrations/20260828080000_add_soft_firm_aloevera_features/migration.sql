-- AlterTable
ALTER TABLE "Mattress" ADD COLUMN     "aloeveraFabric" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firmComfortLayer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "softComfortLayer" BOOLEAN NOT NULL DEFAULT false;
