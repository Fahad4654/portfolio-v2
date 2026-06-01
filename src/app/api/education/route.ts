import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM education ORDER BY display_order ASC`;
    return NextResponse.json(rows, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/education error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { degree, institution, link, period, display_order } = body;

    if (!degree || !institution || !period) {
      return NextResponse.json({ message: 'Degree, institution, and period are required.' }, { status: 400 });
    }

    const sql = getDb();

    if (!display_order) {
      const maxResult = await sql`SELECT COALESCE(MAX(display_order), 0) AS max_order FROM education`;
      const newOrder = maxResult[0].max_order + 1;

      const result = await sql`
        INSERT INTO education (degree, institution, link, period, display_order)
        VALUES (${degree}, ${institution}, ${link || null}, ${period}, ${newOrder})
        RETURNING id
      `;
      return NextResponse.json({ id: result[0].id, message: 'Education entry added.' }, { status: 201 });
    } else {
      const result = await sql`
        INSERT INTO education (degree, institution, link, period, display_order)
        VALUES (${degree}, ${institution}, ${link || null}, ${period}, 9999)
        RETURNING id
      `;
      const newId = result[0].id;

      const allEntries = await sql`SELECT id, display_order FROM education ORDER BY display_order ASC`;
      const others = allEntries.filter((e: any) => e.id !== newId);
      const insertionIndex = Math.min(Math.max(0, display_order - 1), others.length);
      others.splice(insertionIndex, 0, { id: newId });

      for (let i = 0; i < others.length; i++) {
        await sql`UPDATE education SET display_order = ${i + 1} WHERE id = ${others[i].id}`;
      }

      return NextResponse.json({ id: newId, message: 'Education entry added.' }, { status: 201 });
    }
  } catch (err: any) {
    console.error('POST /api/education error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, degree, institution, link, period } = body;

    if (!id) {
      return NextResponse.json({ message: 'Education ID is required.' }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      UPDATE education
      SET degree = ${degree},
          institution = ${institution},
          link = ${link || null},
          period = ${period}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Education updated successfully.' }, { status: 200 });
  } catch (err: any) {
    console.error('PUT /api/education error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Education ID is required.' }, { status: 400 });
    }

    const sql = getDb();
    await sql`DELETE FROM education WHERE id = ${id}`;

    const remaining = await sql`SELECT id FROM education ORDER BY display_order ASC`;
    for (let i = 0; i < remaining.length; i++) {
      await sql`UPDATE education SET display_order = ${i + 1} WHERE id = ${remaining[i].id}`;
    }

    return NextResponse.json({ message: 'Education entry deleted.' }, { status: 200 });
  } catch (err: any) {
    console.error('DELETE /api/education error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}
