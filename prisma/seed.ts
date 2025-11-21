import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial admin user
  // const adminUser = await prisma.user.upsert({
  //   where: { email: 'admin@example.com' },
  //   update: {},
  //   create: {
  //     email: 'admin@example.com',
  //   },
  // });
  // console.log({ adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
