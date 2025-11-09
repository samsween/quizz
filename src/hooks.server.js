import { prisma } from '$lib/server/prisma';

export const handle = async ({ event, resolve }) => {
  event.locals.db = prisma;
  return resolve(event);
};
