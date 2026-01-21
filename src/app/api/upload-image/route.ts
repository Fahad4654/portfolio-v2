
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file provided.' }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${randomUUID()}.${fileExtension}`;
    
    const { error: uploadError } = await supabaseAdmin.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError.message);
      
      // If any upload error occurs, it's highly likely due to an authentication issue
      // with the service role key. Return a helpful, specific error message.
      return NextResponse.json({ 
        message: 'Image upload failed. This is likely due to an authentication error on the server. Please ensure the `SUPABASE_SERVICE_ROLE_KEY` is correctly set in your .env file and that the server has been restarted.'
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
