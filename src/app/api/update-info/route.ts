import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  // Proactive check for environment variables
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ 
      message: 'Server is not configured for database updates. Please ensure SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL are correctly set in your .env file and that the server has been restarted.'
    }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
        return NextResponse.json({ message: 'Info ID is required for an update.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('info')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error.message);
      return NextResponse.json({ 
        message: `Database update failed. Supabase error: ${error.message}`
      }, { status: 500 });
    }

    return NextResponse.json({ message: 'Information updated successfully.' }, { status: 200 });

  } catch (err: any) {
    console.error('Update Info API error:', err);
    return NextResponse.json({ message: `An internal server error occurred: ${err.message}` }, { status: 500 });
  }
}
