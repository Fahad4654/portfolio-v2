import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { z } from "zod";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// Initialize Firebase Admin once
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ Firebase Admin initialized");
  } catch (error) {
    console.error("❌ Firebase Admin initialization failed:", error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = formSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input.", errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    const db = admin.firestore();
    await db.collection("messages").add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, message: "Message saved successfully." });
  } catch (error) {
    console.error("❌ Failed to save message:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
    return NextResponse.json(
      { success: false, message: "Failed to save message.", error: errorMessage },
      { status: 500 }
    );
  }
}
