// src/routes/register/+page.server.ts
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Actions, PageServerLoad } from './$types';

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;           // max 5 registrations per IP per 10 minutes

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, '/');
  return { form: null };
};

export const actions: Actions = {
  default: async ({ request, cookies, getClientAddress }) => {
    const ip = getClientAddress?.() ?? 'unknown';

    // 1) RATE LIMIT CHECK
    const since = new Date(Date.now() - WINDOW_MS);

    const recentAttempts = await prisma.registerAttempt.count({
      where: {
        ip,
        createdAt: { gt: since }
      }
    });

    if (recentAttempts >= MAX_ATTEMPTS) {
      // Too many attempts from this IP in the last X minutes
      return fail(429, {
        error: 'Too many registration attempts. Please try again later.'
      });
    }

    // 2) RECORD THIS ATTEMPT (even if validation fails later)
    await prisma.registerAttempt.create({
      data: { ip }
    });

    // 3) NORMAL REGISTER FLOW
    const data = await request.formData();
    const username = String(data.get('username') ?? '').trim();
    const password = String(data.get('password') ?? '');
    const confirm = String(data.get('confirm') ?? '');

    if (!username || !password) {
      return fail(400, { error: 'All fields are required', username });
    }

    if (password.length < 6) {
      return fail(400, {
        error: 'Password must be at least 6 characters',
        username
      });
    }

    if (password !== confirm) {
      return fail(400, { error: 'Passwords do not match', username });
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return fail(400, { error: 'username already in use', username });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        confirmed: false // still unconfirmed
      }
    });

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: expires
      }
    });

    cookies.set('session', session.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });

    throw redirect(303, '/');
  }
};
