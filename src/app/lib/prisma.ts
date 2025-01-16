import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient({
        log: ['error'],
      })
    : globalForPrisma.prisma ||
      new PrismaClient({
        log: ['query', 'info', 'warn', 'error'], 
      });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;