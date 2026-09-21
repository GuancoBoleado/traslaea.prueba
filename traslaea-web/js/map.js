document.addEventListener("DOMContentLoaded", function() {
    var mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Si ya existe una instancia previa del mapa, la removemos limpiamente para evitar el error
    if (window.traslaeaMapInstance) {
        window.traslaeaMapInstance.remove();
        window.traslaeaMapInstance = null;
    }

    // Inicializar el mapa centrado en Traslasierra y guardarlo globalmente
    var map = L.map('map').setView([-31.9500, -65.0167], 10);
    window.traslaeaMapInstance = map;

    // Cargar las baldosas de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Forzar el recálculo del tamaño por el diseño en grilla
    setTimeout(function() {
        map.invalidateSize();
    }, 250);

    // Base de datos de profesionales y socios de TRASLAEA ampliada
    var profesionales = [
        {
            nombre: "Esteban Colombo",
            oficio: "Técnico en Electrónica / Matriculado",
            localidad: "Luyaba",
            lat: -31.9350,
            lng: -65.0250,
            detalle: "Instalaciones fotovoltaicas, redes, WiFi, cámaras CCTV y electrónica para el hogar.",
            whatsapp: "5493544314637"
        },
        {
            nombre: "Marcelo Flores",
            oficio: "Electricista Matriculado",
            localidad: "San Javier",
            lat: -32.0167,
            lng: -65.0167,
            detalle: "Instalaciones en bioconstrucción, tableros solares y electricidad general.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "David Lungu",
            oficio: "Técnico Matriculado",
            localidad: "La Paz",
            lat: -32.0667,
            lng: -65.0333,
            detalle: "Automatizaciones, bombeo solar y asistencia técnica.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Taller Eléctrico Las Rabonas",
            oficio: "Servicios y Mantenimiento",
            localidad: "Las Rabonas",
            lat: -31.8167,
            lng: -65.0167,
            detalle: "Iluminación exterior, cámaras CCTV y complejos turísticos.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Servicios Eléctricos Traslasierra",
            oficio: "Oficio / Marca Comercial",
            localidad: "Villa Dolores",
            lat: -31.9443,
            lng: -65.1878,
            detalle: "Montajes comerciales, planos, electricidad y armado de sitio web.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Electromecánica Las Rosas",
            oficio: "Electricista y Soporte Técnico",
            localidad: "Villa de Las Rosas",
            lat: -31.9167,
            lng: -65.0167,
            detalle: "Electricidad domiciliaria, redes WiFi y cámaras de seguridad CCTV.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Conexiones Travesía",
            oficio: "Técnico en Redes",
            localidad: "Travesía",
            lat: -31.9700,
            lng: -65.0300,
            detalle: "Conectividad rural, internet, WiFi y cámaras CCTV.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Servicios La Población",
            oficio: "Electricista Matriculado",
            localidad: "Población",
            lat: -32.1167,
            lng: -65.0500,
            detalle: "Instalaciones eléctricas y electrónica para tu hogar.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Gustavo Peralta",
            oficio: "Instalador Energías Renovables",
            localidad: "Los Hornillos",
            lat: -31.8833,
            lng: -65.0167,
            detalle: "Sistemas solares fotovoltaicos y mantenimiento integral.",
            whatsapp: "5493544000000"
        }
    ];

    // Grupo de capas para los marcadores
    var markersLayer = L.layerGroup().addTo(map);

    // Función inteligente para renderizar y filtrar pines
    function renderizarPines(filtro = "") {
        markersLayer.clearLayers();
        
        var palabrasFiltro = filtro.toLowerCase().trim().split(/\s+/);

        profesionales.forEach(pro => {
            var textoCompleto = `${pro.nombre} ${pro.oficio} ${pro.localidad} ${pro.detalle}`.toLowerCase();
            var coincideTodas = palabrasFiltro.every(palabra => textoCompleto.includes(palabra));

            if (coincideTodas || filtro.trim() === "") {
                var popupContent = `
                    <div style="font-family: Arial; font-size: 0.9rem; line-height: 1.3;">
                        <h4 style="margin: 0 0 4px 0; color: #0b2545;">${pro.nombre}</h4>
                        <p style="margin: 0 0 2px 0; color: #0077b6; font-weight: bold;">${pro.oficio}</p>
                        <p style="margin: 0 0 4px 0; color: #555; font-size: 0.85rem;">📍 Localidad: <b>${pro.localidad}</b></p>
                        <p style="margin: 0 0 8px 0; color: #333;">${pro.detalle}</p>
                        <a href="https://wa.me/${pro.whatsapp}?text=Hola,%20vi%20tu%20contacto%20en%20el%20mapa%20de%20TRASLAEA" target="_blank" style="background: #25d366; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 0.85rem;">
                            <i class="fa-brands fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                `;

                var marker = L.marker([pro.lat, pro.lng]).bindPopup(popupContent);
                markersLayer.addLayer(marker);
            }
        });
    }

    // Cargar todos inicialmente
    renderizarPines();

    // Inyectar el encabezado comercial, buscador y los mini botones interactivos
    var mapCard = document.querySelector('.map-card');
    if (mapCard) {
        var marketingDiv = document.createElement('div');
        marketingDiv.style.marginBottom = "15px";
        marketingDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #0b2545 0%, #134074 100%); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 12px; text-align: center;">
                <h4 style="margin: 0 0 5px 0; font-size: 1.1rem;"><i class="fa-solid fa-bolt" style="color: #38bdf8;"></i> Encontrá instaladores y tiendas de confianza en tu zona</h4>
                <p style="margin: 0; font-size: 0.85rem; color: #cbd5e1;">Buscá por localidad u oficio, o hacé clic en los accesos rápidos:</p>
            </div>
            
            <!-- Barra de búsqueda -->
            <input type="text" id="buscador-mapa" placeholder="🔍 Escribí localidad, oficio o servicio (ej: Luyaba, cámaras)..." style="width: 100%; padding: 12px 16px; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; outline: none; box-sizing: border-box; margin-bottom: 12px; transition: border-color 0.3s;" onfocus="this.style.borderColor='#0077b6'" onblur="this.style.borderColor='#cbd5e1'">
            
            <!-- Mini botones / Chips de acceso rápido -->
            <div id="quick-filters" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 5px;">
                <button class="chip-btn" data-filter="" style="background: #0b2545; color: white; border: none; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; font-weight: bold;">Ver Todos</button>
                <button class="chip-btn" data-filter="villa dolores" style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer;">Villa Dolores</button>
                <button class="chip-btn" data-filter="las rosas" style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer;">Las Rosas</button>
                <button class="chip-btn" data-filter="la paz" style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer;">La Paz</button>
                <button class="chip-btn" data-filter="luyaba" style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer;">Luyaba</button>
                <button class="chip-btn" data-filter="población" style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer;">Población</button>
                <button class="chip-btn" data-filter="travesía" style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer;">Travesía</button>
                <button class="chip-btn" data-filter="san javier" style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer;">San Javier</button>
                <button class="chip-btn" data-filter="electricista" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; font-weight: bold;">Electricistas</button>
                <button class="chip-btn" data-filter="wifi" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; font-weight: bold;">WiFi & Cámaras CCTV</button>
                <button class="chip-btn" data-filter="sitio web" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; font-weight: bold;">Sitio Web</button>
                <button class="chip-btn" data-filter="hogar" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; font-weight: bold;">Electrónica para tu hogar</button>
            </div>
        `;
        
        mapCard.insertBefore(marketingDiv, mapElement);

        var inputBuscador = document.getElementById('buscador-mapa');

        // Escuchar eventos de escritura en tiempo real en el input
        inputBuscador.addEventListener('input', function(e) {
            renderizarPines(e.target.value);
        });

        // Manejar los clics en los mini botones / chips
        var botonesChip = document.querySelectorAll('.chip-btn');
        botonesChip.forEach(btn => {
            btn.addEventListener('click', function() {
                var valorFiltro = this.getAttribute('data-filter');
                inputBuscador.value = valorFils... // (Mantiene el valor en el input)
                inputBuscador.value = valorFiltro;
                renderizarPines(valorFiltro);
            });
        });
    }
});
