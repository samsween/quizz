import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash("password", 12);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash: passwordHash,
      confirmed: true
    },
  });

//   await prisma.quiz.upsert({
//     where: { slug: 'sample-quiz' },
//     update: {},
//     create: {
//       slug: 'sample-quiz',
//       title: 'Sample Quiz',
//       description: 'A demo quiz to get you started',
//     },
//   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
