import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
import { seedQuiz } from './seed-quiz.js';
import { listQuizzes } from './quizes/index.js';
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password", 12);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: passwordHash,
      confirmed: true,
      role: "ADMIN"
    },
  });
  try {
    for (const q of listQuizzes()) {
         await seedQuiz(prisma, q.title, q.slug, q.questions)
    }

  } catch(err) {
    console.warn(err)
  }

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
