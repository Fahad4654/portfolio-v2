import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
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
      // Be more specific about the error for debugging
      return NextResponse.json({ message: `Database query failed: ${error.message}` }, { status: 500 });
    }

    if (!user) {
      // This is the most likely branch if RLS is enabled and not configured
      return NextResponse.json({ message: 'Invalid credentials. The user was not found in the database.' }, { status: 401 });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      // The user was found, but the password was wrong.
      return NextResponse.json({ message: 'Invalid credentials. The password is incorrect.' }, { status: 401 });
    }
    
    return NextResponse.json({ message: 'Login Successful' }, { status: 200 });

  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ message: `An internal server error occurred: ${err.message}` }, { status: 500 });
  }
}
