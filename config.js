// config.js - Base de datos de TRASLAEA
const socios = [
    { 
        p: [-31.9493, -65.1712], 
        t: "SEDE CENTRAL TRASLAEA", 
        s: "Asociación Civil", 
        l: "Villa Dolores", 
        tel: "3544649941" 
    },
    { 
        p: [-31.9492249, -65.1719497], 
        t: "RICARDO BALMACEDA", 
        s: "Presidente - Electricista Cat II", 
        l: "Villa Dolores", 
        tel: "3544307583" 
    },
    { 
        p: [-32.1047, -65.1090], 
        t: "ESTEBAN COLOMBO", 
        s: "Secretario - Electricista Cat II<br>(Adm. de Redes & Infraestructura)",
        l: "Luyaba", 
        tel: "3544314637",
        tags: "paginas web camaras de seguridad alarmas paneles solares energia solar"
    },
    { 
        p: [-32.1865, -65.0544], 
        t: "MARCELO FLORES", 
        s: "Tesorero - Electricista Cat III", 
        l: "Corralito", 
        tel: "3544654321" 
    }
];

const obrasGuardadas = [
    {
        id: "reparacion-patricia-2026",
        fecha: "30/03/2026",
        titulo: "Reparación Solidaria - Patricia Garay",
        ubicacion: "Luyaba, Córdoba",
        descripcion: "Intervención técnica integral en vivienda siniestrada. Se realizó el relevamiento de daños por incendio, reemplazo de acometida y circuitos principales.",
        fotos: ["quemado1.jpg", "quemado2.jpg", "avance1.jpg", "final1.jpg"],
        categoria: "OBRA SOLIDARIA"
    },
    {
        id: "presentacion-traslaea-2025",
        fecha: "Gestión 2025",
        titulo: "Presentación de Traslasierra Electricistas Asociados",
        ubicacion: "Región Traslasierra, Córdoba",
        descripcion: "Lanzamiento oficial por invitación de la Fundación Relevando Peligros y la Municipalidad. En este acto, el Secretario Esteban Colombo presentó los lineamientos estratégicos de la asociación...",
        fotos: ["asamblea2025_1.jpg", "asamblea2025_2.jpg", "logo_original.jpg"], 
        categoria: "HITOS INSTITUCIONALES"
    }
];
