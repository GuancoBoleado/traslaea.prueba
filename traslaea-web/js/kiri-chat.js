// Variable para llevar la cuenta de cuántas veces le escriben en esta sesión
let contadorInteracciones = 0;

async function sendKiriMessage() {
    const input = document.getElementById('kiriInput');
    const text = input.value.trim();
    if (text === '') return;

    const messagesContainer = document.getElementById('kiriMessages');

    // Agregar mensaje del usuario a la interfaz
    const userMsg = document.createElement('div');
    userMsg.className = 'kiri-msg user';
    userMsg.textContent = text;
    messagesContainer.appendChild(userMsg);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Crear burbuja temporal de "Procesando..."
    const botMsg = document.createElement('div');
    botMsg.className = 'kiri-msg bot';
    botMsg.innerHTML = '🔍 <em>Procesando consulta...</em>';
    messagesContainer.appendChild(botMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Incrementamos el contador cada vez que el usuario interactúa
    contadorInteracciones++;

    // Link oficial de suscripción/registro de Traslaea
    const linkRegistro = "https://docs.google.com/forms/d/e/1FAIpQLScnwecXqJ7BsWqdhW-g0EeD4YkG8QWFwVjPhSTbZ6ZE6jBd6A/alreadyresponded";

    // Simulamos un pequeño retraso natural de respuesta (1 segundo)
    setTimeout(() => {
        if (contadorInteracciones === 1) {
            // Primer mensaje: Mantenimiento, agradecimiento por el entrenamiento y invitación a registrarse
            botMsg.innerHTML = `🚧 <strong>KIRI-BOT</strong> se encuentra en mantenimiento y estará disponible próximamente. <br><br>¡Gracias por ayudarme a aprender a comunicarme y entender cómo responde una IA! Mientras tanto, te invitamos a sumarte a la red completando tu registro acá: <br><br><a href="${linkRegistro}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: bold;">📝 ¡Registrate en TRASLAEA acá!</a>`;
        } else {
            // Segundo mensaje: Respuesta si vuelven a escribir o saludar
            botMsg.innerHTML = `💡 ¡Hola de nuevo! Tomé nota de tu mensaje. Sigo calibrando mis circuitos junto a Esteban, pero ya falta poquito para operar al 100%. <br><br>Si todavía no lo hiciste, recordá sumarte a la organización desde este enlace: <br><br><a href="${linkRegistro}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: bold;">📝 Formulario de Suscripción</a>`;
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}
