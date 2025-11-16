
import { prisma } from '$lib/server/prisma';
import { fail, redirect, type Cookies } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const load = async ({ locals }: {locals: any}) => {
  // Already logged in? send to homes
  if (locals.user) throw redirect(303, '/');
  return {};
};

export const actions = {
  default: async ({ request, cookies }: {request: any, cookies: Cookies}) => {
    const form = await request.formData();
    const username = String(form.get('username') ?? '').trim();
    const password = String(form.get('password') ?? '');

    if (!username || !password) {
      return fail(400, { error: 'username and password required', username });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return fail(400, { error: 'Invalid username or password', username });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return fail(400, { error: 'Invalid username or password', username });
    }

    const now = new Date();
    const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 days

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
      secure: true, // set false only in local dev if needed
      maxAge: 60 * 60 * 24 * 7
    });

    throw redirect(303, '/');
  }
};
