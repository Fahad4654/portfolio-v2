
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ 
        message: 'Database is not configured. Please ensure DATABASE_URL is set in your .env file and that the server has been restarted.'
    }, { status: 500 });
  }
    
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const sql = getDb();
    const users = await sql`SELECT password FROM users WHERE email = ${email} LIMIT 1`;

    if (users.length === 0) {
      return NextResponse.json({ 
          message: 'Invalid credentials. The user was not found.'
      }, { status: 401 });
    }

    const passwordIsValid = await bcrypt.compare(password, users[0].password);

    if (!passwordIsValid) {
      return NextResponse.json({ message: 'Invalid credentials. The password is incorrect.' }, { status: 401 });
    }
    
    return NextResponse.json({ message: 'Login Successful' }, { status: 200 });

  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ message: `An internal server error occurred: ${err.message}` }, { status: 500 });
  }
}
