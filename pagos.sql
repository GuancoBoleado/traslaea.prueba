-- Estructura de la tabla de cuotas (Historial)
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asociado_id INT NOT NULL,      -- Referencia al ID del asociado
    mes_abonado INT NOT NULL,      -- Mes que se está pagando (1-12)
    anio_abonado INT NOT NULL,     -- Año que se está pagando (ej: 2026)
    monto_pagado DECIMAL(10, 2),   -- Valor de la cuota
    fecha_operacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pago VARCHAR(50),       -- Transferencia, Efectivo, etc.
    
    -- Relación con la tabla de asociados
    CONSTRAINT fk_asociado_pago 
    FOREIGN KEY (asociado_id) 
    REFERENCES asociados(id) 
    ON DELETE CASCADE
) ENGINE=InnoDB;
