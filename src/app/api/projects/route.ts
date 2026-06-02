import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM projects ORDER BY display_order ASC`;
    return NextResponse.json(rows, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  } catch (err: any) {
    console.error('GET /api/projects error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image, hint, link, tags, status_text, display_order } = body;

    if (!title || !description) {
      return NextResponse.json({ message: 'Title and description are required.' }, { status: 400 });
    }

    const sql = getDb();

    if (!display_order) {
      // Add to the end
      const maxResult = await sql`SELECT COALESCE(MAX(display_order), 0) AS max_order FROM projects`;
      const newOrder = maxResult[0].max_order + 1;

      const result = await sql`
        INSERT INTO projects (title, description, image, hint, link, tags, status_text, display_order)
        VALUES (${title}, ${description}, ${image || null}, ${hint || ''}, ${link || null}, ${JSON.stringify(tags || [])}, ${status_text || 'View Live Site'}, ${newOrder})
        RETURNING id
      `;
      return NextResponse.json({ id: result[0].id, message: 'Project added.' }, { status: 201 });
    } else {
      // Insert with specific order: insert at temp position, then resequence
      const result = await sql`
        INSERT INTO projects (title, description, image, hint, link, tags, status_text, display_order)
        VALUES (${title}, ${description}, ${image || null}, ${hint || ''}, ${link || null}, ${JSON.stringify(tags || [])}, ${status_text || 'View Live Site'}, 9999)
        RETURNING id
      `;
      const newId = result[0].id;

      // Get all projects in order
      const allProjects = await sql`SELECT id, display_order FROM projects ORDER BY display_order ASC`;

      // Remove the new entry from the list and insert at the right position
      const others = allProjects.filter((p: any) => p.id !== newId);
      const insertionIndex = Math.min(Math.max(0, display_order - 1), others.length);
      others.splice(insertionIndex, 0, { id: newId });

      // Resequence
      for (let i = 0; i < others.length; i++) {
        await sql`UPDATE projects SET display_order = ${i + 1} WHERE id = ${others[i].id}`;
      }

      return NextResponse.json({ id: newId, message: 'Project added.' }, { status: 201 });
    }
  } catch (err: any) {
    console.error('POST /api/projects error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required.' }, { status: 400 });
    }

    const sql = getDb();

    // Fetch current project to merge with incoming data
    const current = await sql`SELECT * FROM projects WHERE id = ${id}`;
    if (current.length === 0) {
      return NextResponse.json({ message: 'Project not found.' }, { status: 404 });
    }
    const p = current[0];

    const title = updateData.title !== undefined ? updateData.title : p.title;
    const description = updateData.description !== undefined ? updateData.description : p.description;
    const image = updateData.image !== undefined ? updateData.image : p.image;
    const hint = updateData.hint !== undefined ? updateData.hint : p.hint;
    const link = updateData.link !== undefined ? updateData.link : p.link;
    const tags = updateData.tags !== undefined ? JSON.stringify(updateData.tags) : JSON.stringify(p.tags);
    const status_text = updateData.status_text !== undefined ? updateData.status_text : p.status_text;
    const display_order = updateData.display_order !== undefined ? updateData.display_order : p.display_order;

    await sql`
      UPDATE projects
      SET title = ${title},
          description = ${description},
          image = ${image},
          hint = ${hint},
          link = ${link},
          tags = ${tags},
          status_text = ${status_text},
          display_order = ${display_order}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Project updated successfully.' }, { status: 200 });
  } catch (err: any) {
    console.error('PUT /api/projects error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required.' }, { status: 400 });
    }

    const sql = getDb();

    await sql`DELETE FROM projects WHERE id = ${id}`;

    // Resequence remaining
    const remaining = await sql`SELECT id FROM projects ORDER BY display_order ASC`;
    for (let i = 0; i < remaining.length; i++) {
      await sql`UPDATE projects SET display_order = ${i + 1} WHERE id = ${remaining[i].id}`;
    }

    return NextResponse.json({ message: 'Project deleted.' }, { status: 200 });
  } catch (err: any) {
    console.error('DELETE /api/projects error:', err);
    return NextResponse.json({ message: `Database error: ${err.message}` }, { status: 500 });
  }
}
