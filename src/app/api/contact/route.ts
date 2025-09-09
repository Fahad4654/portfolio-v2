
import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

// Initialize Firebase Admin SDK only if it hasn't been already.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
  } catch (e) {
    console.error('Firebase admin initialization error', e);
  }
}

const db = admin.firestore();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = formSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input.', errors: validation.error.format() }, { status: 400 });
    }
    
    const { name, email, message } = validation.data;

    await db.collection('messages').add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, message: 'Message saved successfully.' });

  } catch (error) {
    console.error('Failed to save message:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown internal error occurred.';
    return NextResponse.json({ success: false, message: 'Failed to save message.', error: errorMessage }, { status: 500 });
  }
}
