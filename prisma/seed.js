const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const productTypes = [
    { name: 'Engine' },
    { name: 'Paint' },
    { name: 'Tire' },
    { name: 'Suspension' },
    { name: 'Break' }
  ];

  for (const type of productTypes) {
    await prisma.productType.upsert({
      where: { name: type.name },
      update: {},
      create: type,
    });
  }

  console.log('Seeded Product Types');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });