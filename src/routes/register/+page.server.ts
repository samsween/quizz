// src/routes/register/+page.server.ts

import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const load: any = async ({ locals }: {locals: any}) => {
  if (locals.user) throw redirect(303, '/');
  return { form: null };
};

export const actions = {
  default: async ({ request, cookies }: any) => {
    const data = await request.formData();
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '');
    const confirm = String(data.get('confirm') ?? '');

    if (!email || !password) {
      return fail(400, { error: 'All fields are required', email });
    }

    if (password.length < 6) {
      return fail(400, { error: 'Password must be at least 6 characters', email });
    }

    if (password !== confirm) {
      return fail(400, { error: 'Passwords do not match', email });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return fail(400, { error: 'Email already in use', email });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    });

    // Create a session immediately
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
