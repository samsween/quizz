// import { QuestionType } from '@prisma/client';

export async function seedQuiz(prisma, title, slug, questions) {
  const perSection = 20; // number of questions per section

  // Compute chunk count
  const chunkCount = Math.ceil(questions.length / perSection);

  // Upsert quiz
  const quiz = await prisma.quiz.upsert({
    where: { slug },
    update: { title, chunkCount },
    create: {
      slug,
      title,
      description: `${title} question bank`,
      chunkCount,
    },
  });

  console.log(`🧠 Seeding quiz: ${quiz.title} (${questions.length} questions)`);

  // Delete old questions + matchPairs
  await prisma.matchPair.deleteMany({
    where: { question: { quizId: quiz.id } },
  });
  await prisma.question.deleteMany({
    where: { quizId: quiz.id },
  });

  // Insert questions
  for (let index = 0; index < questions.length; index++) {
    const raw = questions[index];

    const section = Math.floor(index / perSection) + 1; // 1-based
    const order = index % perSection; // 0-based within section

    // --- MCQ ---
    if (raw.type === 'mcq') {
      await prisma.question.create({
        data: {
          quizId: quiz.id,
          section,
          order,
          type: "MCQ",
          question: raw.question?.trim() ?? '',
          answers: raw.answers ?? [],
          correct: raw.correct ?? [],
          img: raw.img ?? null,
        },
      });
    }

    // --- MATCH ---
    else if (raw.type === 'match') {
      const q = await prisma.question.create({
        data: {
          quizId: quiz.id,
          section,
          order,
          type: "MATCH",
          prompt: raw.prompt?.trim() ?? '',
          img: raw.img ?? null,
        },
      });

      if (Array.isArray(raw.pairs)) {
        await prisma.matchPair.createMany({
          data: raw.pairs.map((p, i) => ({
            questionId: q.id,
            term: p.term?.trim() ?? '',
            desc: p.desc?.trim() ?? '',
            order: i,
          })),
        });
      }
    }

    // --- UNKNOWN ---
    else {
      console.warn(`⚠ Unknown question type at index ${index}:`, raw.type);
    }
  }

  console.log(`✅ Seeded ${questions.length} questions for quiz "${quiz.title}"`);
}
