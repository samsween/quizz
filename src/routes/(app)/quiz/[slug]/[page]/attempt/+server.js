import { prisma } from "$lib/server/prisma";

export async function POST({ request, params, locals }) {
  const user = locals.user;

  if (!user) {
    return new Response(
      JSON.stringify({ message: 'Not authenticated' }),
      { status: 401 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ message: 'Invalid JSON body' }),
      { status: 400 }
    );
  }

  const score = Number(body.score);
  const total = Number(body.total);

  if (!Number.isFinite(score) || !Number.isFinite(total)) {
    return new Response(
      JSON.stringify({ message: 'Invalid score/total' }),
      { status: 400 }
    );
  }

  const quiz = await prisma.quiz.findUnique({
    where: { slug: params.slug }
  });

  if (!quiz) {
    return new Response(
      JSON.stringify({ message: 'Quiz not found' }),
      { status: 404 }
    );
  }

  const section = Number(params.page);
  if (!Number.isFinite(section)) {
    return new Response(
      JSON.stringify({ message: 'Invalid section' }),
      { status: 400 }
    );
  }

  await prisma.quizAttempt.create({
    data: {
      userId: user.id,
      quizId: quiz.id,
      section,
      score,
      totalQuestions: total
    }
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
