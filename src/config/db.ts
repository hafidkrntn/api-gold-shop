import { PrismaClient } from '@prisma/client';

export const prisma: PrismaClient = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log('🟢 Prisma connected to database');
  } catch (error) {
    console.error('🔴 Prisma failed to connect:', error);
    process.exit(1);
  }
})();
