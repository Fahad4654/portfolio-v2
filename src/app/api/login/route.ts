
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  // Proactive check for environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ 
        message: 'Supabase credentials are not configured. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env file and that the server has been restarted.'
    }, { status: 500 });
  }
    
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('password')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      // Check for common .env configuration errors.
      if (error.message.toLowerCase().includes('failed to fetch') || error.message.includes('jwt')) {
          return NextResponse.json({ 
              message: `Supabase connection error: ${error.message}. This is likely due to incorrect or missing Supabase credentials. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly in your .env file and that the server has been restarted.`
          }, { status: 500 });
      }
      return NextResponse.json({ message: `Database query failed: ${error.message}` }, { status: 500 });
    }

    if (!user) {
      // Guide the user on the two most common reasons for this: RLS or wrong email.
      return NextResponse.json({ 
          message: 'Invalid credentials. The user was not found. This can be due to an incorrect email, or a missing Row Level Security (RLS) policy on your `users` table in Supabase.'
      }, { status: 401 });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return NextResponse.json({ message: 'Invalid credentials. The password is incorrect.' }, { status: 401 });
    }
    
    return NextResponse.json({ message: 'Login Successful' }, { status: 200 });

  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ message: `An internal server error occurred: ${err.message}` }, { status: 500 });
  }
}
