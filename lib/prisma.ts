import { PrismaClient } from '@prisma/client';

declare global {
     // Disable eslint rule for this line
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma; 