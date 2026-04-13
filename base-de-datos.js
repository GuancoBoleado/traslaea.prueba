// base-de-datos.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "TU_URL_DE_SUPABASE";
const SUPABASE_KEY = "TU_LLAVE_ANON";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
