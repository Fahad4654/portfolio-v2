import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, display_order } = body;

    if (!title) {
      return NextResponse.json({ message: 'Title is required.' }, { status: 400 });
    }

    const sql = getDb();

    if (!display_order) {
      const maxResult = await sql`SELECT COALESCE(MAX(display_order), 0) AS max_order FROM skill_groups`;
      const newOrder = maxResult[0].max_order + 1;

      const result = await sql`
        INSERT INTO skill_groups (title, display_order)
        VALUES (${title}, ${newOrder})
        RETURNING id
      `;
      return NextResponse.json({ id: result[0].id, message: 'Skill group added.' }, { status: 201 });
    } else {
      const result = await sql`
        INSERT INTO skill_groups (title, display_order)
        VALUES (${title}, 9999)
        RETURNING id
      `;
      const newId = result[0].id;

      const allGroups = await sql`SELECT id, display_order FROM skill_groups ORDER BY display_order ASC`;
      const others = allGroups.filter((g: any) => g.id !== newId);
      const insertionIndex = Math.min(Math.max(0, display_order - 1), others.length);
      others.splice(insertionIndex, 0, { id: newId });

      for (let i = 0; i < others.length; i++) {
        await sql`UPDATE skill_groups SET display_order = ${i + 1} WHERE id = ${others[i].id}`;
      }

      return NextResponse.json({ id: newId, message: 'Skill group added.' }, { status: 201 });
    }
  } catch (err: any) {
    console.error('POST /api/skill-groups error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Skill group ID is required.' }, { status: 400 });
    }

    const sql = getDb();

    // Delete associated skills first
    await sql`DELETE FROM skills WHERE group_id = ${id}`;

    // Delete the group
    await sql`DELETE FROM skill_groups WHERE id = ${id}`;

    // Resequence remaining groups
    const remaining = await sql`SELECT id FROM skill_groups ORDER BY display_order ASC`;
    for (let i = 0; i < remaining.length; i++) {
      await sql`UPDATE skill_groups SET display_order = ${i + 1} WHERE id = ${remaining[i].id}`;
    }

    return NextResponse.json({ message: 'Skill group deleted.' }, { status: 200 });
  } catch (err: any) {
    console.error('DELETE /api/skill-groups error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}
