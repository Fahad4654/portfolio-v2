
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: This file should not be used in the browser. It's a server-side file.
// Using service_role key on the client would be a huge security risk.

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ message: 'Missing Supabase credentials.' }, { status: 500 });
    }

    // Initialize Supabase client with service_role key for admin privileges
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file found.' }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('project-images')
      .upload(fileName, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      // The original error might contain sensitive info, so we log it but return a generic message.
      console.error('Storage upload failed:', uploadError);
      return NextResponse.json({ message: `Storage upload failed: ${uploadError.message}` }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('project-images')
      .getPublicUrl(fileName);

    if (!urlData.publicUrl) {
      return NextResponse.json({ message: 'Could not get public URL for uploaded image.' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: urlData.publicUrl }, { status: 200 });

  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json({ message: error.message || 'An internal server error occurred.' }, { status: 500 });
  }
}
