// src/routes/leaderboard/+page.server.ts
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  // If you only want confirmed users seeing leaderboard:
  if (!locals.user) throw redirect(303, '/login');
  if (!locals.user.confirmed) throw redirect(303, '/unconfirmed');

  // 1) Get best score per user+quiz+section
  const bestAttempts = await prisma.quizAttempt.groupBy({
    by: ['userId', 'quizId', 'section'],
    _max: {
      score: true,
      totalQuestions: true,
      createdAt: true
    }
  });

  if (bestAttempts.length === 0) {
    return { attempts: [] };
  }

  // 2) Fetch user + quiz info for those IDs
  const userIds = [...new Set(bestAttempts.map((a) => a.userId))];
  const quizIds = [...new Set(bestAttempts.map((a) => a.quizId))];

  const [users, quizzes] = await Promise.all([
    prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true }
    }),
    prisma.quiz.findMany({
      where: { id: { in: quizIds } },
      select: { id: true, title: true, slug: true }
    })
  ]);

  const userById = new Map(users.map((u) => [u.id, u]));
  const quizById = new Map(quizzes.map((q) => [q.id, q]));

  // 3) Shape data for the page
  const rows = bestAttempts.map((a) => {
    const user = userById.get(a.userId);
    const quiz = quizById.get(a.quizId);

    const score = a._max.score ?? 0;
    const total = a._max.totalQuestions ?? 0;
    const pct = total > 0 ? Math.round((score / total) * 100) : null;

    return {
      userId: a.userId,
      username: user?.username ?? 'Unknown',

      quizId: a.quizId,
      quizTitle: quiz?.title ?? 'Unknown quiz',
      quizSlug: quiz?.slug ?? '',
      section: a.section,

      score,
      totalQuestions: total,
      percentage: pct,
      createdAt: a._max.createdAt // used on the client
    };
  });

  // Sort by quiz title then percentage then username
  rows.sort((a, b) => {
    if (a.quizTitle === b.quizTitle) {
      if ((b.percentage ?? 0) === (a.percentage ?? 0)) {
        return (a.username ?? '').localeCompare(b.username ?? '');
      }
      return (b.percentage ?? 0) - (a.percentage ?? 0);
    }
    return a.quizTitle.localeCompare(b.quizTitle);
  });

  return { attempts: rows };
};
