import { supabase } from './base-de-datos.js';

export async function obtenerSocios() {
    const { data, error } = await supabase
        .from('asociados')
        .select('*')
        .order('apellido', { ascending: true });
    
    if (error) throw error;
    return data;
}

export async function registrarSocio(socio) {
    const { data, error } = await supabase
        .from('asociados')
        .insert([socio]);
    
    if (error) throw error;
    return data;
}

export async function registrarPago(pago) {
    const { data, error } = await supabase
        .from('pagos')
        .insert([pago]);
    
    if (error) throw error;
    return data;
}
