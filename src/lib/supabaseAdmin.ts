'use server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase URL or Service Role Key for admin client.');
}

// Important: this client is for server-side use only, with service_role privileges.
// It should NEVER be exposed to the client.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    // Prevent the client from auto-refreshing the token
    autoRefreshToken: false,
    // Prevent the client from storing the session in localStorage
    persistSession: false,
  }
});
