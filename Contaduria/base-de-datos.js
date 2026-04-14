import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de conexión con tu proyecto de Supabase
const SUPABASE_URL = 'https://otpsokpojwiebfkrjrtx.supabase.co'; 

// Tu llave pública actualizada (Publishable key)
const SUPABASE_KEY = 'sb_publishable_ewz7_msS7Ch1DCWGLOYCeg_wvVcTGCT'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
