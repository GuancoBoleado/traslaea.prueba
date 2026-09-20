document.addEventListener("DOMContentLoaded", () => {
    // Función global de filtrado
    window.filtrarRed = function(categoria, btnElement) {
        // Remover la clase active de todos los botones
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        // Agregar la clase active al botón presionado
        btnElement.classList.add('active');

        // Recorrer todas las tarjetas de socios
        const cards = document.querySelectorAll('.bubble-card');
        cards.forEach(card => {
            const tags = card.getAttribute('data-tags') || '';
            
            // Lógica inteligente de sinónimos / coincidencias
            let match = false;
            if (categoria === 'todos') {
                match = true;
            } else if (categoria === 'camaras') {
                // Si buscan cámaras, acepta tanto 'camaras' como 'cctv'
                match = tags.includes('camaras') || tags.includes('cctv');
            } else if (categoria === 'refrigeracion') {
                // Si a futuro sumas sinónimos de refrigeración, los pones acá
                match = tags.includes('refrigeracion') || tags.includes('aire');
            } else {
                // Búsqueda estándar por coincidencia de etiqueta
                match = tags.includes(categoria);
            }

            // Mostrar u ocultar la tarjeta según corresponda
            if (match) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };
});
