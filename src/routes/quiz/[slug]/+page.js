import { error } from '@sveltejs/kit';
import { getQuiz } from '$lib/quizzes';

export function load({ params }) {
  const quiz = getQuiz(params.slug);
  if (!quiz) throw error(404, 'Quiz not found');
  return { quiz };
}
