import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = getDb();

    // Fetch all skill groups and all skills, then assemble them
    const groups = await sql`SELECT * FROM skill_groups ORDER BY display_order ASC`;
    const skills = await sql`SELECT * FROM skills ORDER BY display_order ASC`;

    // Attach skills to their groups
    const result = groups.map((group: any) => ({
      ...group,
      skills: skills.filter((s: any) => s.group_id === group.id),
    }));

    return NextResponse.json(result, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  } catch (err: any) {
    console.error('GET /api/skills error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, group_id, display_order } = body;

    if (!name || !group_id) {
      return NextResponse.json({ message: 'Skill name and group_id are required.' }, { status: 400 });
    }

    const sql = getDb();

    if (!display_order) {
      const maxResult = await sql`SELECT COALESCE(MAX(display_order), 0) AS max_order FROM skills WHERE group_id = ${group_id}`;
      const newOrder = maxResult[0].max_order + 1;

      const result = await sql`
        INSERT INTO skills (name, group_id, display_order)
        VALUES (${name}, ${group_id}, ${newOrder})
        RETURNING id
      `;
      return NextResponse.json({ id: result[0].id, message: 'Skill added.' }, { status: 201 });
    } else {
      const result = await sql`
        INSERT INTO skills (name, group_id, display_order)
        VALUES (${name}, ${group_id}, 9999)
        RETURNING id
      `;
      const newId = result[0].id;

      const allSkills = await sql`SELECT id, display_order FROM skills WHERE group_id = ${group_id} ORDER BY display_order ASC`;
      const others = allSkills.filter((s: any) => s.id !== newId);
      const insertionIndex = Math.min(Math.max(0, display_order - 1), others.length);
      others.splice(insertionIndex, 0, { id: newId });

      for (let i = 0; i < others.length; i++) {
        await sql`UPDATE skills SET display_order = ${i + 1} WHERE id = ${others[i].id}`;
      }

      return NextResponse.json({ id: newId, message: 'Skill added.' }, { status: 201 });
    }
  } catch (err: any) {
    console.error('POST /api/skills error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const group_id = searchParams.get('group_id');

    if (!id) {
      return NextResponse.json({ message: 'Skill ID is required.' }, { status: 400 });
    }

    const sql = getDb();

    // Get group_id if not provided
    let effectiveGroupId = group_id;
    if (!effectiveGroupId) {
      const skill = await sql`SELECT group_id FROM skills WHERE id = ${id}`;
      if (skill.length > 0) {
        effectiveGroupId = skill[0].group_id;
      }
    }

    await sql`DELETE FROM skills WHERE id = ${id}`;

    // Resequence remaining skills in the group
    if (effectiveGroupId) {
      const remaining = await sql`SELECT id FROM skills WHERE group_id = ${effectiveGroupId} ORDER BY display_order ASC`;
      for (let i = 0; i < remaining.length; i++) {
        await sql`UPDATE skills SET display_order = ${i + 1} WHERE id = ${remaining[i].id}`;
      }
    }

    return NextResponse.json({ message: 'Skill deleted.' }, { status: 200 });
  } catch (err: any) {
    console.error('DELETE /api/skills error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}
