import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Estas son tus llaves nuevas del proyecto de Supabase
const SUPABASE_URL = 'https://otpsokpojwiebfkrjrtx.supabase.co'; 
const SUPABASE_KEY = 'TU_KEY_ANON_AQUÍ'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
