import { supabase } from './base-de-datos.js';

/**
 * Protege las páginas privadas. 
 * Si no hay un usuario logueado, lo redirige al login.
 */
export async function verificarSesion() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
        console.log("Acceso no autorizado. Redirigiendo...");
        window.location.href = 'login.html';
        return null;
    }
    
    return session.user;
}

/**
 * Cierra la sesión de Supabase y saca al usuario del panel.
 */
export async function salir() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error al salir:", error.message);
    }
    window.location.href = 'login.html';
}

/**
 * Obtiene los datos del usuario actual (por ejemplo, para mostrar el mail en el menú).
 */
export async function obtenerUsuarioActual() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}
