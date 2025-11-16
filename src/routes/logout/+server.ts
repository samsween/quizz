// src/routes/logout/+server.ts
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  const sessionId = cookies.get('session');
  if (sessionId) {
    await prisma.session.deleteMany({ where: { id: sessionId } });
    cookies.delete('session', { path: '/' });
  }

  throw redirect(303, '/login');
};
