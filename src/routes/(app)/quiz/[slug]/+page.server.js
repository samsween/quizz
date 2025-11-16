// src/routes/quiz/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

const PER_SECTION = 20;

export async function load({ params }) {
  const { slug } = params;

  if (!slug) {
    throw error(404, 'Quiz not found');
  }

  // 1) Get quiz + question count
  const dbQuiz = await prisma.quiz.findUnique({
    where: { slug },
    include: {
      _count: { select: { questions: true } }
    }
  });

  if (!dbQuiz) {
    throw error(404, 'Quiz not found');
  }

  const totalQuestions = dbQuiz._count.questions;
  // Prefer the stored chunkCount, otherwise derive from question count
  const chunksCount =
    dbQuiz.chunkCount ?? Math.max(1, Math.ceil(totalQuestions / PER_SECTION));

  // 2) Shape it like your old `getQuiz` output, plus chunksCount
  const quiz = {
    id: dbQuiz.id,
    slug: dbQuiz.slug,
    title: dbQuiz.title,
    description: dbQuiz.description,
    image: dbQuiz.image,
    chunksCount,
    totalQuestions
    // you can add more fields here if your layout needs them
  };

  return { quiz };
}
