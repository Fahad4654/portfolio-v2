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

    if (error || !user) {
      // Generic message to avoid telling attackers if an email exists or not
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }
    
    return NextResponse.json({ message: 'Login Successful' }, { status: 200 });

  } catch (err) {
    console.error('Login API error:', err);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
