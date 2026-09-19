document.addEventListener("DOMContentLoaded", function() {
    // Verificar que el elemento #map exista en la página actual antes de ejecutar
    var mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Inicializar el mapa centrado en Traslasierra
    var map = L.map('map').setView([-31.9500, -65.0167], 10);

    // Cargar las baldosas de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Forzar el recálculo del tamaño por el diseño en grilla (dashboard-grid)
    setTimeout(function() {
        map.invalidateSize();
    }, 250);

    // Pines de ejemplo de los socios de TRASLAEA
    var profesionales = [
        {
            nombre: "Esteban Colombo",
            oficio: "Técnico en Electrónica / Matriculado",
            lat: -31.9350,
            lng: -65.0250,
            detalle: "Instalaciones fotovoltaicas, redes, CCTV y Electrosith.",
            whatsapp: "5493544314637"
        },
        {
            nombre: "Ricardo Balmaceda",
            oficio: "Electricista Matriculado Cat. 1",
            lat: -31.9443,
            lng: -65.1878,
            detalle: "Proyectos eléctricos, normativas ERSeP y certificaciones.",
            whatsapp: "5493544000000"
        },
        {
            nombre: "Marcelo Flores",
            oficio: "Electricista Matriculado",
            lat: -32.0167,
            lng: -65.0167,
            detalle: "Instalaciones en bioconstrucción y tableros solares.",
            whatsapp: "5493544000000"
        }
    ];

    // Agregar los marcadores al mapa
    profesionales.forEach(pro => {
        var popupContent = `
            <div style="font-family: Arial; font-size: 0.9rem; line-height: 1.3;">
                <h4 style="margin: 0 0 4px 0; color: #0b2545;">${pro.nombre}</h4>
                <p style="margin: 0 0 4px 0; color: #0077b6; font-weight: bold;">${pro.oficio}</p>
                <p style="margin: 0 0 8px 0; color: #333;">${pro.detalle}</p>
                <a href="https://wa.me/${pro.whatsapp}?text=Hola,%20vi%20tu%20contacto%20en%20el%20mapa%20de%20TRASLAEA" target="_blank" style="background: #25d366; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 0.85rem;">
                    <i class="fa-brands fa-whatsapp"></i> WhatsApp
                </a>
            </div>
        `;
        L.marker([pro.lat, pro.lng]).addTo(map).bindPopup(popupContent);
    });
});
