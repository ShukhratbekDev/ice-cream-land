import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not found on .env.development');
}

export default defineConfig({
  schema: './db/schema',
  dialect: 'postgresql',
  out: './db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  casing: 'snake_case',
});
