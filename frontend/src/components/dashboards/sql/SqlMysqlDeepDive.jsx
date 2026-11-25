import React, { useState } from 'react';

/**
 * SqlMysqlDeepDive
 * Tarjeta interactiva sobre aspectos específicos del motor MySQL 8.x:
 * Comparativa InnoDB vs MyISAM, tipos JSON y optimizaciones reales.
 */
export default function SqlMysqlDeepDive() {
  const [activeTab, setActiveTab] = useState('innodb');

  return (
    <div className="sql-deepdive-container">
      <div className="sql-deepdive-header">
        <span className="sql-deepdive-badge">⚙️ Especialización Técnica</span>
        <h3 className="sql-deepdive-title">Profundidad Técnica en MySQL 8.x: Motores, JSON y Configuración</h3>
        <p className="sql-deepdive-desc">
          Conceptos clave de arquitectura interna que diferencian a MySQL de otros motores y son indispensables en entornos profesionales.
        </p>
      </div>

      <div className="sql-deepdive-tabs">
        <button
          type="button"
          className={`sql-deepdive-tab-btn ${activeTab === 'innodb' ? 'active' : ''}`}
          onClick={() => setActiveTab('innodb')}
        >
          1. Motores de Almacenamiento: InnoDB vs MyISAM
        </button>
        <button
          type="button"
          className={`sql-deepdive-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          2. Tipo de Dato JSON Nativo (MySQL 8)
        </button>
        <button
          type="button"
          className={`sql-deepdive-tab-btn ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          3. Buenas Prácticas: utf8mb4 & AUTO_INCREMENT
        </button>
      </div>

      <div className="sql-deepdive-pane">
        {activeTab === 'innodb' && (
          <div>
            <div className="sql-deepdive-intro">
              <p>
                En MySQL, cada tabla puede tener su propio <strong>motor de almacenamiento (Storage Engine)</strong>. Aunque antiguamente se usaba MyISAM por velocidad de lectura, desde MySQL 5.5 y en todo MySQL 8.x el motor por defecto y obligatorio en producción es <strong>InnoDB</strong>.
              </p>
            </div>

            <table className="sql-deepdive-table">
              <thead>
                <tr>
                  <th>Característica</th>
                  <th>InnoDB (Motor Estándar)</th>
                  <th>MyISAM (Obsoleto)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Transacciones (ACID)</strong></td>
                  <td><span className="sql-tag-yes">✔️ Sí (COMMIT y ROLLBACK)</span></td>
                  <td><span className="sql-tag-no">❌ No soportado</span></td>
                </tr>
                <tr>
                  <td><strong>Claves Foráneas (FK)</strong></td>
                  <td><span className="sql-tag-yes">✔️ Sí (Integridad referencial estricta)</span></td>
                  <td><span className="sql-tag-no">❌ Las ignora sintácticamente</span></td>
                </tr>
                <tr>
                  <td><strong>Nivel de Bloqueo (Locks)</strong></td>
                  <td><strong>Fila (Row-Level Locking):</strong> Permite miles de escrituras concurrentes.</td>
                  <td><strong>Tabla completa (Table-Level):</strong> Un UPDATE congela toda la tabla.</td>
                </tr>
                <tr>
                  <td><strong>Recuperación ante fallos</strong></td>
                  <td>Automática vía <em>Redo Log</em> y <em>Undo Log</em>.</td>
                  <td>Propensa a corrupción de datos (exige REPAIR TABLE).</td>
                </tr>
                <tr>
                  <td><strong>Uso recomendado</strong></td>
                  <td>El 100% de proyectos web, APIs, DAM, DAW y SEPE.</td>
                  <td>Solo lectura pura en sistemas heredados (legacy).</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'json' && (
          <div>
            <div className="sql-deepdive-intro">
              <p>
                MySQL 8.x incluye soporte de primera clase para el tipo de datos <strong>JSON nativo</strong>, permitiendo combinar el rigor relacional con la flexibilidad de bases de datos documentales tipo MongoDB.
              </p>
            </div>

            <pre className="code-block">
              <code>{`-- 1. Creación de tabla con columna JSON validada
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    atributos JSON, -- Valida sintaxis JSON automáticamente al insertar
    precio DECIMAL(10,2) NOT NULL
);

-- 2. Inserción de documentos JSON
INSERT INTO Productos (nombre, atributos, precio) 
VALUES ('Portátil Gaming', '{"ram": "32GB", "cpu": "i7-13700", "colores": ["negro", "gris"]}', 1299.99);

-- 3. Consulta con el operador flecha (-> extrae con comillas, ->> extrae texto limpio)
SELECT nombre, 
       atributos->>'$.ram' AS memoria_ram,
       atributos->>'$.colores[0]' AS color_principal
FROM Productos
WHERE atributos->>'$.ram' = '32GB';`}</code>
            </pre>
          </div>
        )}

        {activeTab === 'config' && (
          <div>
            <div className="sql-deepdive-intro">
              <p>
                Errores habituales de configuración en MySQL que todo desarrollador debe prevenir antes de pasar a producción:
              </p>
            </div>

            <div className="sql-deepdive-checklist">
              <div className="sql-deepdive-item">
                <span className="sql-deepdive-num">1</span>
                <div>
                  <strong>Juego de Caracteres: Usa SIEMPRE <code>utf8mb4</code></strong>
                  <p>
                    El antiguo <code>utf8</code> de MySQL solo admitía 3 bytes y provocaba fallos críticos al guardar emojis o caracteres internacionales complejos. El estándar actual es <code>CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci</code>.
                  </p>
                </div>
              </div>

              <div className="sql-deepdive-item">
                <span className="sql-deepdive-num">2</span>
                <div>
                  <strong>El peligro de AUTO_INCREMENT y los huecos</strong>
                  <p>
                    Si ejecutas un <code>INSERT</code> que falla por una restricción o se cancela con <code>ROLLBACK</code>, el valor de <code>AUTO_INCREMENT</code> ya se habrá incrementado y no se reutiliza. Por tanto, nunca asumas que los IDs serán 100% consecutivos en producción.
                  </p>
                </div>
              </div>

              <div className="sql-deepdive-item">
                <span className="sql-deepdive-num">3</span>
                <div>
                  <strong>Diagnóstico profundo: <code>EXPLAIN ANALYZE</code></strong>
                  <p>
                    Introducido en MySQL 8.0.18, <code>EXPLAIN ANALYZE SELECT ...</code> ejecuta realmente la consulta midiendo tiempos reales por nodo, estimación de filas frente a filas reales y coste en milisegundos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

