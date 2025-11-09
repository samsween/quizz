import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const users = await locals.db.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return { users };
};

export const actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData();
    const name  = String(form.get('name')  || '').trim();
    const email = String(form.get('email') || '').trim();

    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Valid email is required';
    if (Object.keys(errors).length) return fail(400, { values: { name, email }, errors });

    const exists = await locals.db.user.findUnique({ where: { email } });
    if (exists) return fail(400, { values: { name, email }, errors: { email: 'Email already exists' } });

    await locals.db.user.create({ data: { name, email } });
    return { success: true };
  },

  update: async ({ request, locals }) => {
    const form = await request.formData();
    const id    = String(form.get('id')    || '').trim();
    const name  = String(form.get('name')  || '').trim();
    const email = String(form.get('email') || '').trim();

    if (!id) return fail(400, { errors: { id: 'Missing id' }, values: { name, email } });
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Valid email is required';
    if (Object.keys(errors).length) return fail(400, { values: { id, name, email }, errors });

    try {
      await locals.db.user.update({
        where: { id },
        data: { name, email }
      });
      // Redirect to avoid re-submitting on refresh
      throw redirect(303, '/users');
    } catch (e) {
      return fail(400, { values: { id, name, email }, errors: { form: 'Update failed' } });
    }
  },

  delete: async ({ request, locals }) => {
    const form = await request.formData();
    const id = String(form.get('id') || '').trim();
    if (!id) return fail(400, { errors: { id: 'Missing id' } });

    try {
      await locals.db.user.delete({ where: { id } });
      throw redirect(303, '/users');
    } catch (e) {
      return fail(400, { errors: { form: 'Delete failed' } });
    }
  }
};
