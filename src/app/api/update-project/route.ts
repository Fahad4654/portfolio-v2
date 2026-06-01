
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ 
      message: 'Server is not configured for database updates. Please ensure DATABASE_URL is set in your .env file and that the server has been restarted.'
    }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
        return NextResponse.json({ message: 'Project ID is required for an update.' }, { status: 400 });
    }

    const sql = getDb();

    // Fetch current project to merge
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
    console.error('Update Project API error:', err);
    return NextResponse.json({ message: `An internal server error occurred: ${err.message}` }, { status: 500 });
  }
}
