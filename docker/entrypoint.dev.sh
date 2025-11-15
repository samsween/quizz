#!/bin/sh
set -e

npx prisma generate

if [ -d prisma/migrations ] && [ "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "📦 Applying migrations..."
  npx prisma migrate dev --skip-seed || true
else
  echo "🧭 No migrations found; syncing schema..."
  npx prisma db push || true
fi

echo "🌱 Seeding database (if configured)..."
npx prisma db seed || true

exec npm run dev -- --host 0.0.0.0 --port 5173
