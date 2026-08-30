import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
  prismaRev?: number;
};

const PRISMA_REV = 3;

export const prisma =
  globalForPrisma.prismaRev === PRISMA_REV && globalForPrisma.prisma
    ? globalForPrisma.prisma
    : new PrismaClient({
        log: ["query"],
      });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaRev = PRISMA_REV;
}
