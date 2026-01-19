
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon key. Please check your .env file.')
}

if (supabaseAnonKey.startsWith('sb_')) {
    throw new Error('Invalid Supabase key provided. Please ensure you are using the "anon" (public) key from your Supabase project settings, not a "service_role" or other type of key.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
