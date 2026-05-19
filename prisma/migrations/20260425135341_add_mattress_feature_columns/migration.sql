-- AlterTable
ALTER TABLE "Mattress" ADD COLUMN     "carbonYarnTechnologyPillowTopMattress" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cncFoamTechnology" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "copperViscoLayer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "graphiteViscoFoam" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "middleComfortLayer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "superSoftFoam" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visconFabric" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visconFabricSoftComfortLayer" BOOLEAN NOT NULL DEFAULT false;
