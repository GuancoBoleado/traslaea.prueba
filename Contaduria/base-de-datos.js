import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de conexión con tu proyecto de Supabase
const SUPABASE_URL = 'https://otpsokpojwiebfkrjrtx.supabase.co'; 

// 1. Buscá en Supabase (Settings -> API) la que dice "anon" "public"
// 2. Copiá ese código largo que empieza con eyJ...
// 3. Pegalo acá adentro de las comillas:
const SUPABASE_KEY = 'PEGÁ_ACÁ_TU_LLAVE_ANON_PÚBLICA'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
