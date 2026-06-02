import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM info LIMIT 1`;

    if (rows.length === 0) {
      return NextResponse.json({ message: 'No info found.' }, { status: 404 });
    }

    return NextResponse.json(rows[0], {
      status: 200,
      headers: { 'Cache-Control': 'no-store, must-revalidate' },
    });
  } catch (err: any) {
    console.error('GET /api/info error:', err);
    return NextResponse.json(
      { message: `Database error: ${err.message}` },
      { status: 500 }
    );
  }
}
