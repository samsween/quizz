// src/hooks.server.ts
import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

const PUBLIC_ROUTES = ['/login', '/register', '/health'];

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('session');

  // Default: no user
  event.locals.user = null;

  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true }
    });

    if (session && session.expiresAt > new Date()) {
      event.locals.user = session.user;
    } else if (session) {
      // expired
      await prisma.session.delete({ where: { id: sessionId } });
      event.cookies.delete('session', { path: '/' });
    }
  }

  const path = event.url.pathname;
  const isPublic = PUBLIC_ROUTES.some((p) =>
    path === p || path.startsWith(`${p}/`)
  );

  if (!event.locals.user && !isPublic) {
    throw redirect(303, '/login');
  }

  return resolve(event);
};
