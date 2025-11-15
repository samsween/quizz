import { error } from '@sveltejs/kit';
import { getQuiz } from '$lib/quizzes';
import { splitArrayIntoChunks } from '$lib/helpers/splitArray';


export function load({ params }) {
  const quiz = getQuiz(params.slug);
  if (!quiz) throw error(404, 'Quiz not found');

  const chunks = splitArrayIntoChunks(quiz.questions, 20);
  return {
    quiz: { ...quiz, chunksCount: chunks.length }
  };
}
