// --- KIRI-BOT: Interfaz y Control de Mantenimiento ---

// Aseguramos que los estilos se inyecten de inmediato en el <head>
const kiriStyle = document.createElement('style');
kiriStyle.innerHTML = `
    .kiri-chatbot-container {
        position: fixed;
        bottom: 25px;
        right: 25px;
        z-index: 9999;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .kiri-chatbot-btn {
        width: 65px;
        height: 65px;
        background: #0b0f19;
        border: 2px solid #00a8e8;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 168, 232, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    }
    .kiri-chatbot-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 25px rgba(0, 168, 232, 0.7);
    }
    .kiri-chatbot-btn img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .kiri-online-dot {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 14px;
        height: 14px;
        background-color: #22c55e;
        border: 2px solid #0b0f19;
        border-radius: 50%;
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }
    .kiri-chatbot-window {
        display: none;
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 360px;
        height: 500px;
        background: #0b0f19;
        border: 1px solid rgba(0, 168, 232, 0.4);
        border-radius: 16px;
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5);
        flex-direction: column;
        overflow: hidden;
    }
    .kiri-chatbot-header {
        background: #134074;
        color: white;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 168, 232, 0.3);
    }
    .kiri-chatbot-title {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .kiri-chatbot-title img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid #00a8e8;
        object-fit: cover;
    }
    .kiri-chatbot-title h4 {
        margin: 0;
        font-size: 0.95rem;
        color: #38bdf8;
        letter-spacing: 0.5px;
    }
    .kiri-chatbot-title span {
        font-size: 0.75rem;
        color: #4ade80;
    }
    .kiri-chatbot-close {
        background: none;
        border: none;
        color: #cbd5e1;
        font-size: 1.25rem;
        cursor: pointer;
        transition: color 0.2s;
    }
    .kiri-chatbot-close:hover {
        color: white;
    }
    .kiri-chatbot-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        background: #0b0f19;
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: 0.85rem;
    }
    .kiri-msg {
        padding: 10px 14px;
        border-radius: 12px;
        max-width: 88%;
        line-height: 1.4;
        word-break: break-word;
    }
    .kiri-msg.bot {
        background: #1e293b;
        color: #e2e8f0;
        border-top-left-radius: 2px;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .kiri-msg.user {
        background: #0284c7;
        color: white;
        align-self: flex-end;
        border-top-right-radius: 2px;
    }
    .kiri-chatbot-input-area {
        display: flex;
        padding: 10px;
        background: #134074;
        border-top: 1px solid rgba(0, 168, 232, 0.3);
    }
    .kiri-chatbot-input-area input {
        flex: 1;
        padding: 10px 12px;
        background: #0b0f19;
        border: 1px solid #334155;
        border-radius: 8px;
        color: white;
        outline: none;
        font-size: 0.85rem;
    }
    .kiri-chatbot-input-area input:focus {
        border-color: #00a8e8;
    }
    .kiri-chatbot-input-area button {
        background: #00a8e8;
        color: white;
        border: none;
        padding: 0 14px;
        margin-left: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .kiri-chatbot-input-area button:hover {
        background: #0284c7;
    }
`;
document.head.appendChild(kiriStyle);

// Inyectar el HTML del chat apenas cargue el DOM o el script
document.addEventListener("DOMContentLoaded", crearEstructuraKiri);
window.addEventListener("load", crearEstructuraKiri); // Refuerzo por si el DOM ya pasó

function crearEstructuraKiri() {
    if (document.getElementById('kiriChatWindow')) return; // Evita duplicados

    const chatContainer = document.createElement('div');
    chatContainer.className = 'kiri-chatbot-container';
    chatContainer.innerHTML = `
        <button class="kiri-chatbot-btn" onclick="toggleKiriChat()" title="Abrir KIRI-BOT">
            <img src="Kiri CHAT.jpeg" alt="KIRI Bot" onerror="this.src='traslaea-web/assets/img/noticia1.jpg'">
            <span class="kiri-online-dot"></span>
        </button>

        <div class="kiri-chatbot-window" id="kiriChatWindow">
            <div class="kiri-chatbot-header">
                <div class="kiri-chatbot-title">
                    <img src="Kiri CHAT.jpeg" alt="KIRI" onerror="this.src='traslaea-web/assets/img/noticia1.jpg'">
                    <div>
                        <h4>KIRI BOT</h4>
                        <span>● Mantenimiento</span>
                    </div>
                </div>
                <button class="kiri-chatbot-close" onclick="toggleKiriChat()">&times;</button>
            </div>
            <div class="kiri-chatbot-messages" id="kiriMessages">
                <div class="kiri-msg bot">⚡ ¡Hola, colega! Soy <strong>KIRI-BOT</strong>. Actualmente estoy en desarrollo y optimización.</div>
            </div>
            <div class="kiri-chatbot-input-area">
                <input type="text" id="kiriInput" placeholder="Escribe tu mensaje..." onkeypress="handleKiriKeypress(event)">
                <button onclick="sendKiriMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);
}

// Control de apertura/cierre
function toggleKiriChat() {
    const chatWindow = document.getElementById('kiriChatWindow');
    if (!chatWindow) return;
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
        const input = document.getElementById('kiriInput');
        if (input) input.focus();
    }
}

function handleKiriKeypress(event) {
    if (event.key === 'Enter') {
        sendKiriMessage();
    }
}

// Contador y lógica de respuestas de mantenimiento con link
let contadorInteracciones = 0;

function sendKiriMessage() {
    const input = document.getElementById('kiriInput');
    if (!input) return;
    const text = input.value.trim();
    if (text === '') return;

    const messagesContainer = document.getElementById('kiriMessages');

    // Mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'kiri-msg user';
    userMsg.textContent = text;
    messagesContainer.appendChild(userMsg);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Burbuja temporal
    const botMsg = document.createElement('div');
    botMsg.className = 'kiri-msg bot';
    botMsg.innerHTML = '🔍 <em>Procesando...</em>';
    messagesContainer.appendChild(botMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    contadorInteracciones++;
    const linkRegistro = "https://docs.google.com/forms/d/e/1FAIpQLScnwecXqJ7BsWqdhW-g0EeD4YkG8QWFwVjPhSTbZ6ZE6jBd6A/alreadyresponded";

    setTimeout(() => {
        if (contadorInteracciones === 1) {
            botMsg.innerHTML = `🚧 <strong>KIRI-BOT</strong> se encuentra en mantenimiento y estará disponible próximamente. <br><br>¡Gracias por ayudarme a aprender a comunicarme y entender cómo responde una IA! Mientras tanto, te invitamos a sumarte a la red completando tu registro acá: <br><br><a href="${linkRegistro}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: bold;">📝 ¡Registrate en TRASLAEA acá!</a>`;
        } else {
            botMsg.innerHTML = `💡 ¡Hola de nuevo! Tomé nota de tu mensaje. Sigo calibrando mis circuitos junto a Esteban, pero ya falta poquito para operar al 100%. <br><br>Si todavía no lo hiciste, recordá sumarte a la organización desde este enlace: <br><br><a href="${linkRegistro}" target="_blank" style="color: #38bdf8; text-decoration: underline; font-weight: bold;">📝 Formulario de Suscripción</a>`;
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 800);
}
