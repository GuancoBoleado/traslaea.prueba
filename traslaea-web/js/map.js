document.addEventListener("DOMContentLoaded", function() {
    var mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Inicializar el mapa centrado en Traslasierra
    var map = L.map('map').setView([-31.9500, -65.0167], 10);

    // Cargar las baldosas de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Forzar el recálculo del tamaño por el diseño en grilla
    setTimeout(function() {
        map.invalidateSize();
    }, 250);

    // Base de datos de profesionales y socios de TRASLAEA
    var profesionales = [
        {
            nombre: "Esteban Colombo",
            oficio: "Técnico en Electrónica / Matriculado",
            localidad: "Luyaba",
            lat: -31.9350,
            lng: -65.0250,
            detalle: "Instalaciones fotovoltaicas, redes, CCTV y Electrosith.",
            whatsapp: "5493544314637"
        },
        {
            nombre: "Marcelo Flores",
            oficio: "Electricista Matriculado",
            localidad: "San Javier",
            lat: -32.0167,
            lng: -65.0167,
            detalle: "Instalaciones en bioconstrucción y tableros solares.",
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
            detalle: "Iluminación exterior y complejos turísticos.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Servicios Eléctricos Traslasierra",
            oficio: "Oficio / Marca Comercial",
            localidad: "Los Hornillos",
            lat: -31.8833,
            lng: -65.0167,
            detalle: "Montajes comerciales, planos y asesoramiento.",
            whatsapp: "5493544000000"
        }
    ];

    // Grupo de capas para los marcadores
    var markersLayer = L.layerGroup().addTo(map);

    // Función para renderizar los pines en el mapa con opción de filtro
    function renderizarPines(filtro = "") {
        markersLayer.clearLayers();
        var textoFiltro = filtro.toLowerCase().trim();

        profesionales.forEach(pro => {
            // Filtrar por nombre, oficio o localidad
            var coincide = pro.nombre.toLowerCase().includes(textoFiltro) ||
                           pro.oficio.toLowerCase().includes(textoFiltro) ||
                           pro.localidad.toLowerCase().includes(textoFiltro);

            if (coincide) {
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

    // Inyectar un encabezado comercial y buscador dinámicamente arriba del mapa
    var mapCard = document.querySelector('.map-card');
    if (mapCard) {
        var marketingDiv = document.createElement('div');
        marketingDiv.style.marginBottom = "15px";
        marketingDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #0b2545 0%, #134074 100%); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 12px; text-align: center;">
                <h4 style="margin: 0 0 5px 0; font-size: 1.1rem;"><i class="fa-solid fa-bolt" style="color: #38bdf8;"></i> Encontrá instaladores y tiendas de confianza en tu zona</h4>
                <p style="margin: 0; font-size: 0.85rem; color: #cbd5e1;">Buscá por localidad (ej: Luyaba, San Javier) o servicio eléctrico.</p>
            </div>
            <input type="text" id="buscador-mapa" placeholder="🔍 Escribí una localidad o especialidad..." style="width: 100%; padding: 12px 16px; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; outline: none; box-sizing: border-box; transition: border-color 0.3s;" onfocus="this.style.borderColor='#0077b6'" onblur="this.style.borderColor='#cbd5e1'">
        `;
        
        // Insertar antes del contenedor del mapa (#map)
        mapCard.insertBefore(marketingDiv, mapElement);

        // Escuchar eventos de escritura en el buscador
        document.getElementById('buscador-mapa').addEventListener('input', function(e) {
            renderizarPines(e.target.value);
        });
    }
});
