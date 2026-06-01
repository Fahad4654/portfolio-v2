
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
        return NextResponse.json({ message: 'Info ID is required for an update.' }, { status: 400 });
    }

    const sql = getDb();

    // Fetch current info to merge
    const current = await sql`SELECT * FROM info WHERE id = ${id}`;
    if (current.length === 0) {
      return NextResponse.json({ message: 'Info not found.' }, { status: 404 });
    }
    const c = current[0];

    const name = updateData.name !== undefined ? updateData.name : c.name;
    const profile_pic_url = updateData.profile_pic_url !== undefined ? updateData.profile_pic_url : c.profile_pic_url;
    const facebook_url = updateData.facebook_url !== undefined ? updateData.facebook_url : c.facebook_url;
    const instagram_url = updateData.instagram_url !== undefined ? updateData.instagram_url : c.instagram_url;
    const linkedin_url = updateData.linkedin_url !== undefined ? updateData.linkedin_url : c.linkedin_url;
    const github_url = updateData.github_url !== undefined ? updateData.github_url : c.github_url;
    const profession = updateData.profession !== undefined ? updateData.profession : c.profession;
    const email = updateData.email !== undefined ? updateData.email : c.email;

    await sql`
      UPDATE info
      SET name = ${name},
          profile_pic_url = ${profile_pic_url},
          facebook_url = ${facebook_url},
          instagram_url = ${instagram_url},
          linkedin_url = ${linkedin_url},
          github_url = ${github_url},
          profession = ${profession},
          email = ${email}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Information updated successfully.' }, { status: 200 });

  } catch (err: any) {
    console.error('Update Info API error:', err);
    return NextResponse.json({ message: `An internal server error occurred: ${err.message}` }, { status: 500 });
  }
}
