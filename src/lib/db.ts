import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('DATABASE_URL is not set. Database queries will fail.');
}

/**
 * Returns a Neon SQL tagged-template function bound to the DATABASE_URL.
 * Usage:
 *   const sql = getDb();
 *   const rows = await sql`SELECT * FROM info LIMIT 1`;
 */
export function getDb() {
  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is not configured. Please set it in your .env file and restart the server.'
    );
  }
  return neon(databaseUrl);
}
