#!/bin/sh
set -e

echo "⏳ Waiting for database at ${DATABASE_URL} ..."
# quick wait loop
until node -e "
  const { Client } = require('pg');
  const url = process.env.DATABASE_URL || '';
  (async () => {
    try {
      const c = new Client({ connectionString: url });
      await c.connect();
      await c.end();
      process.exit(0);
    } catch (e) { process.exit(1); }
  })();
"; do
  sleep 1
done
echo "✅ DB reachable."

# Generate client, sync schema in dev
npx prisma generate
# Prefer migrate if you use migrations; db push if you don't
if [ -d prisma/migrations ]; then
  npx prisma migrate dev --name "init" --skip-seed || true
else
  npx prisma db push || true
fi

echo "🚀 Starting SvelteKit dev server..."
exec npm run dev -- --host 0.0.0.0
