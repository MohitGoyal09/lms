import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('Database URL is not defined');
}

export const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL);
