
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// We initialize with empty strings if the vars are not set.
// This prevents a server startup crash.
// The API routes will perform checks and return a user-friendly error.
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
