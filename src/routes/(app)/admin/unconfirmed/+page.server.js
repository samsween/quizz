// src/routes/admin/unconfirmed/+page.server.ts

import { prisma } from '$lib/server/prisma';
import { redirect, fail } from '@sveltejs/kit';

function ensureAdmin(locals) {
  const user = locals.user;
  if (!user || user.role !== 'ADMIN') {
    throw redirect(303, '/'); // or /login, or /unconfirmed, up to you
  }
  return user;
}

export const load = async ({ locals }) => {
  ensureAdmin(locals);

  const unconfirmedUsers = await prisma.user.findMany({
    where: { confirmed: false },
    orderBy: { username: 'asc' },
    select: {
      id: true,
      username: true,
      confirmed: true
    }
  });

  return {
    unconfirmedUsers
  };
};

export const actions = {
  confirm: async ({ request, locals }) => {
    ensureAdmin(locals);

    const form = await request.formData();
    const userId = form.get('userId');

    if (!userId || typeof userId !== 'string') {
      return fail(400, { message: 'Missing user id' });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { confirmed: true }
    });

    return { success: true };
  }
};
