import { error } from '@sveltejs/kit';
import { getQuiz } from '$lib/quizzes';
import { splitArrayIntoChunks } from '$lib/helpers/splitArray';



export function load({ params }) {
  const quiz = getQuiz(params.slug);
  if (!quiz) throw error(404, 'Quiz not found');

  const chunks = splitArrayIntoChunks(quiz.questions, 20);
  const totalPages = chunks.length;

  const pageNum = Number(params.page);
  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    throw error(404, 'Section not found');
  }

  const chunkQuestions = chunks[pageNum - 1];

  return {
    quiz,
    page: pageNum,
    totalPages,
    questions: chunkQuestions
  };
}
