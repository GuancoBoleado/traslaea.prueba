// base-de-datos.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// --- REEMPLAZA ESTOS DATOS CON LOS TUYOS ---
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co"; 
const SUPABASE_KEY = "TU_CLAVE_ANON_LARGA_AQUÍ"; 
// -------------------------------------------

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
