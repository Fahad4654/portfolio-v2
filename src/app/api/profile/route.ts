import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM profile LIMIT 1`;

    if (rows.length === 0) {
      return NextResponse.json({ message: 'No profile found.' }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (err: any) {
    console.error('GET /api/profile error:', err);
    return NextResponse.json(
      { message: `Database error: ${err.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, headline, bio1, bio2, location, phone, email, resume_url } = body;

    if (!id) {
      return NextResponse.json({ message: 'Profile ID is required.' }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      UPDATE profile
      SET headline = ${headline},
          bio1 = ${bio1},
          bio2 = ${bio2},
          location = ${location},
          phone = ${phone},
          email = ${email},
          resume_url = ${resume_url}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Profile updated successfully.' }, { status: 200 });
  } catch (err: any) {
    console.error('PUT /api/profile error:', err);
    return NextResponse.json(
      { message: `Database error: ${err.message}` },
      { status: 500 }
    );
  }
}
