-- Estructura de la tabla de socios (Maestro)
CREATE TABLE asociados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    direccion VARCHAR(255),
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_socio ENUM('activo', 'moroso', 'baja') DEFAULT 'activo'
) ENGINE=InnoDB;
