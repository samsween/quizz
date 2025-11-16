
import { prisma } from '$lib/server/prisma';

export const load = async () => {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { questions: true }
      }
    }
  });
  const shaped = quizzes.map((q) => ({
    id: q.id,
    slug: q.slug,
    title: q.title,
    description: q.description,
    image: q.image ?? null,
    createdAt: q.createdAt ? q.createdAt.getTime() : null,
    updatedAt: q.updatedAt ? q.updatedAt.getTime() : null,
    questions: {
      length: q._count.questions
    }
  }));

  return {
    quizzes: shaped
  };
};
