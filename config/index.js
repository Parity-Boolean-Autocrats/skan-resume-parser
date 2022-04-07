import { createClient } from "@supabase/supabase-js";

// SUPABASE CONFIG

const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const supabaseServer = createClient(SUPABASE_URL, SUPABASE_KEY, {
    fetch: fetch,
});
export const SUPABASE_STORAGE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

export const NEXT_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
export const NEXT_API_KEY = process.env.NEXT_PUBLIC_NEXT_API_KEY;
// FLASK API
export const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL;
export const FLASK_TOKEN = process.env.NEXT_PUBLIC_FLASK_API_TOKEN;
export const FLASK_DEMO_TOKEN = process.env.NEXT_PUBLIC_FLASK_DEMO_TOKEN;
