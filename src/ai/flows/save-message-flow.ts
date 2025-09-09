
'use server';
/**
 * @fileOverview A flow for saving a contact message to Firestore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been already.
if (!admin.apps.length) {
  try {
    admin.initializeApp();
  } catch (e) {
    console.error('Firebase admin initialization error', e);
  }
}

const db = admin.firestore();

export const SaveMessageInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type SaveMessageInput = z.infer<typeof SaveMessageInputSchema>;

export const saveMessageFlow = ai.defineFlow(
  {
    name: 'saveMessageFlow',
    inputSchema: SaveMessageInputSchema,
    outputSchema: z.object({ success: z.boolean(), message: z.string().optional() }),
  },
  async (input) => {
    try {
      await db.collection('messages').add({
        ...input,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error('Failed to save message:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      // Do not expose detailed internal errors to the client.
      return { success: false, message: 'Failed to save message.' };
    }
  }
);

export async function saveMessage(input: SaveMessageInput): Promise<{ success: boolean, message?: string }> {
    return saveMessageFlow(input);
}
