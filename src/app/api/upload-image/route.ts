
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  // Proactive check for environment variables
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ 
      message: 'Image upload failed due to a server authentication error. Please ensure SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL are correctly set in your .env file and that the server has been restarted.'
    }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file provided.' }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${randomUUID()}.${fileExtension}`;
    
    // Convert the file to a buffer to ensure compatibility in a Node.js environment
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: uploadError } = await supabaseAdmin.storage
      .from('project-images')
      .upload(fileName, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError.message);
      // This is the most likely cause of an upload error
      return NextResponse.json({ 
        message: 'Image upload failed due to a server authentication error. Please ensure SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL are correctly set in your .env file and that the server has been restarted.'
      }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('project-images')
      .getPublicUrl(fileName);

    if (!urlData.publicUrl) {
      return NextResponse.json({ message: 'Could not get public URL for uploaded image.' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: urlData.publicUrl }, { status: 200 });

  } catch (err: any) {
    console.error('Upload API error:', err);
    return NextResponse.json({ message: `An internal server error occurred: ${err.message}` }, { status: 500 });
  }
}
