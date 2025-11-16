// src/routes/quiz/[slug]/[page]/+page.server.ts
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

const PER_SECTION = 20;

export async function load({ params, locals }) {
  const { slug, page } = params;
  const user = locals.user;


  if (!slug) throw error(404, 'Quiz not found');

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 1) {
    throw error(404, 'Section not found');
  }

  // 1) Get quiz + total question count
  const quiz = await prisma.quiz.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      chunkCount: true,
      _count: { select: { questions: true } }
    }
  });

  if (!quiz) throw error(404, 'Quiz not found');

  const totalQuestions = quiz._count.questions;
  const totalPages =
    quiz.chunkCount ?? Math.max(1, Math.ceil(totalQuestions / PER_SECTION));

  if (pageNum > totalPages) {
    throw error(404, 'Section not found');
  }

  // 2) Fetch questions for this section
  // if you seeded with `section` field, use it:
  const dbQuestions = await prisma.question.findMany({
    where: {
      quizId: quiz.id,
      section: pageNum
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    include: { pairs: true }
  });

  // Fallback if you *didn't* use `section` when seeding:
  // const dbQuestions = await prisma.question.findMany({
  //   where: { quizId: quiz.id },
  //   orderBy: [{ createdAt: 'asc' }],
  //   skip: (pageNum - 1) * PER_SECTION,
  //   take: PER_SECTION,
  //   include: { pairs: true }
  // });

  // 3) Map DB → QuizRunner format
  const questions = dbQuestions.map((q) => {
    if (q.type === 'MCQ') {
      return {
        type: 'mcq',
        question: q.question,
        answers: q.answers,
        correct: q.correct,
        img: q.img
      };
    }

    if (q.type === 'MATCH') {
      return {
        type: 'match',
        prompt: q.prompt,
        img: q.img,
        pairs: q.pairs.map((p) => ({
          id: p.id,        // use DB id as pair id
          term: p.term,
          desc: p.desc
        }))
      };
    }

    // Safety fallback: treat unknown as MCQ
    return {
      type: 'mcq',
      question: q.question ?? '',
      answers: q.answers ?? [],
      correct: q.correct ?? [],
      img: q.img
    };
  });
  let attempts = [];
  if (locals.user) {
    attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: locals.user.id,
        quizId: quiz.id,
        section: pageNum
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  return {
    user,
    quiz: {
      id: quiz.id,
      slug: quiz.slug,
      title: quiz.title
      // (you can add more fields here if you need them in the UI)
    },
    page: pageNum,
    totalPages,
    questions,
    attempts
  };
}


