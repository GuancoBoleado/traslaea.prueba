// --- ELECTROSITH: Asistente Virtual Técnico ---
document.addEventListener("DOMContentLoaded", function() {
    // Inyectar los estilos CSS del chatbot automáticamente en el documento
    const style = document.createElement('style');
    style.innerHTML = `
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
    document.head.appendChild(style);

    // Inyectar el HTML flotante al final del body
    const chatContainer = document.createElement('div');
    chatContainer.className = 'kiri-chatbot-container';
    chatContainer.innerHTML = `
        <button class="kiri-chatbot-btn" onclick="toggleKiriChat()" title="Abrir Asistente Electrosith">
            <img src="Electrosith.JPG" alt="Electrosith Bot" onerror="this.src='traslaea-web/assets/img/noticia1.jpg'">
            <span class="kiri-online-dot"></span>
        </button>

        <div class="kiri-chatbot-window" id="kiriChatWindow">
            <div class="kiri-chatbot-header">
                <div class="kiri-chatbot-title">
                    <img src="Electrosith.JPG" alt="Electrosith" onerror="this.src='traslaea-web/assets/img/noticia1.jpg'">
                    <div>
                        <h4>ELECTROSITH AI</h4>
                        <span>● Asistente Técnico</span>
                    </div>
                </div>
                <button class="kiri-chatbot-close" onclick="toggleKiriChat()">&times;</button>
            </div>
            <div class="kiri-chatbot-messages" id="kiriMessages">
                <div class="kiri-msg bot">⚡ ¡Hola, colega! Soy <strong>Electrosith</strong>, tu asistente técnico virtual. Consultame sobre normativas, instalaciones solares, redes o CCTV. ¡Siempre con referencia a manuales y respaldo técnico!</div>
            </div>
            <div class="kiri-chatbot-input-area">
                <input type="text" id="kiriInput" placeholder="Escribe tu consulta técnica..." onkeypress="handleKiriKeypress(event)">
                <button onclick="sendKiriMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);
});

// Funciones de control de la interfaz
function toggleKiriChat() {
    const chatWindow = document.getElementById('kiriChatWindow');
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
        document.getElementById('kiriInput').focus();
    }
}

function handleKiriKeypress(event) {
    if (event.key === 'Enter') {
        sendKiriMessage();
    }
}

function sendKiriMessage() {
    const input = document.getElementById('kiriInput');
    const text = input.value.trim();
    if (text === '') return;

    const messagesContainer = document.getElementById('kiriMessages');

    // Agregar mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'kiri-msg user';
    userMsg.textContent = text;
    messagesContainer.appendChild(userMsg);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulación de respuesta técnica con citación de fuentes y responsabilidad profesional
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'kiri-msg bot';
        
        const lowerText = text.toLowerCase();
        if (lowerText.includes('curso') || lowerText.includes('capacitacion') || lowerText.includes('inscripci')) {
            botMsg.innerHTML = '📚 Según el <strong>Programa de Capacitaciones 2026</strong>, tenemos activas formaciones en Energías Solares y Redes. Podés inscribirte desde la sección superior <a href="https://docs.google.com/forms/d/1RWIEOR222SI9JUQzYv1U4ibDfIlcWqgxsxrJcfGkkKY/alreadyresponded?edit_requested=true" target="_blank" style="color: #38bdf8; text-decoration: underline;">Cursos</a>.';
        } else if (lowerText.includes('norma') || lowerText.includes('ersep') || lowerText.includes('aea') || lowerText.includes('proteccion') || lowerText.includes('cable')) {
            botMsg.innerHTML = '📖 <em>[Fuente Interna: Manual de Normativas ERSeP / AEA 2026, Punto 4.2 - Criterios de Protección]</em><br>Para instalaciones de esta categoría, se deben aplicar las directrices vigentes de seguridad eléctrica.<br><br><small style="color: #94a3b8;">⚠️ <em>Nota técnica: La validación final, cálculo y ejecución en obra queda bajo la exclusiva responsabilidad del electricista o técnico matriculado actuante.</em></small>';
        } else if (lowerText.includes('solar') || lowerText.includes('fotovoltaica') || lowerText.includes('inversor')) {
            botMsg.innerHTML = '☀️ <em>[Fuente: Repositorio Técnico - Guía de Sistemas Solares, Sección 3.1]</em><br>El dimensionado de arreglos fotovoltaicos y protecciones DC debe cumplir con las normativas de desconexión rápida.<br><br><small style="color: #94a3b8;">⚠️ <em>Nota técnica: Responsabilidad exclusiva del técnico matriculado a cargo de la certificación.</em></small>';
        } else {
            botMsg.innerHTML = '🔍 Analizando manuales técnicos y base de datos...<br>Para consultas específicas sobre cotizaciones o soporte de infraestructura, podés comunicarte directamente a través de los canales oficiales de Electrosith.<br><br><small style="color: #94a3b8;">⚠️ <em>Responsabilidad técnica sujeta a criterio del profesional instalador.</em></small>';
        }

        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}
