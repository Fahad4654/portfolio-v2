import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM experiences ORDER BY display_order ASC`;
    return NextResponse.json(rows, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/experiences error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, company, company_link, period, description, display_order } = body;

    if (!title || !company || !period) {
      return NextResponse.json({ message: 'Title, company, and period are required.' }, { status: 400 });
    }

    const sql = getDb();

    if (!display_order) {
      const maxResult = await sql`SELECT COALESCE(MAX(display_order), 0) AS max_order FROM experiences`;
      const newOrder = maxResult[0].max_order + 1;

      const result = await sql`
        INSERT INTO experiences (title, company, company_link, period, description, display_order)
        VALUES (${title}, ${company}, ${company_link || null}, ${period}, ${JSON.stringify(description || [])}, ${newOrder})
        RETURNING id
      `;
      return NextResponse.json({ id: result[0].id, message: 'Experience added.' }, { status: 201 });
    } else {
      const result = await sql`
        INSERT INTO experiences (title, company, company_link, period, description, display_order)
        VALUES (${title}, ${company}, ${company_link || null}, ${period}, ${JSON.stringify(description || [])}, 9999)
        RETURNING id
      `;
      const newId = result[0].id;

      const allEntries = await sql`SELECT id, display_order FROM experiences ORDER BY display_order ASC`;
      const others = allEntries.filter((e: any) => e.id !== newId);
      const insertionIndex = Math.min(Math.max(0, display_order - 1), others.length);
      others.splice(insertionIndex, 0, { id: newId });

      for (let i = 0; i < others.length; i++) {
        await sql`UPDATE experiences SET display_order = ${i + 1} WHERE id = ${others[i].id}`;
      }

      return NextResponse.json({ id: newId, message: 'Experience added.' }, { status: 201 });
    }
  } catch (err: any) {
    console.error('POST /api/experiences error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, company, company_link, period, description } = body;

    if (!id) {
      return NextResponse.json({ message: 'Experience ID is required.' }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      UPDATE experiences
      SET title = ${title},
          company = ${company},
          company_link = ${company_link || null},
          period = ${period},
          description = ${JSON.stringify(description || [])}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Experience updated successfully.' }, { status: 200 });
  } catch (err: any) {
    console.error('PUT /api/experiences error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Experience ID is required.' }, { status: 400 });
    }

    const sql = getDb();
    await sql`DELETE FROM experiences WHERE id = ${id}`;

    const remaining = await sql`SELECT id FROM experiences ORDER BY display_order ASC`;
    for (let i = 0; i < remaining.length; i++) {
      await sql`UPDATE experiences SET display_order = ${i + 1} WHERE id = ${remaining[i].id}`;
    }

    return NextResponse.json({ message: 'Experience deleted.' }, { status: 200 });
  } catch (err: any) {
    console.error('DELETE /api/experiences error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}
