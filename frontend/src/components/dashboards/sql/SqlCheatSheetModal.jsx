import React from 'react';

/**
 * SqlCheatSheetModal
 * Hoja de trucos (Cheat Sheet) de repaso exprés y examen en 1 clic.
 * Optimizada para pantalla e impresión directa / PDF (window.print).
 */
export default function SqlCheatSheetModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sql-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sql-modal-window sql-cheatsheet-window" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera modal no imprimible en papel */}
        <div className="sql-modal-header no-print">
          <div className="sql-modal-header-left">
            <span className="sql-modal-icon">📄</span>
            <div>
              <h2 className="sql-modal-title">Chuleta Definitiva de Examen SQL (Cheat Sheet)</h2>
              <p className="sql-modal-subtitle">
                Resumen condensado con el orden de ejecución, restricciones, JOINs y funciones clave
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button type="button" className="sql-btn-gold" onClick={handlePrint}>
              🖨️ Imprimir / Guardar en PDF
            </button>
            <button type="button" className="sql-modal-close-btn" onClick={onClose} aria-label="Cerrar Chuleta">
              ✕
            </button>
          </div>
        </div>

        {/* Contenido imprimible */}
        <div className="sql-cheatsheet-content">
          <div className="sql-cs-banner">
            <div>
              <h1 className="sql-cs-main-title">MiCampus • Chuleta Maestra de SQL & Bases de Datos</h1>
              <p className="sql-cs-tagline">Guía rápida de sintaxis, reglas de ejecución y buenas prácticas relacionales</p>
            </div>
            <div className="sql-cs-badge-box">
              <span>DAM / DAW</span>
              <strong>MySQL 8.x</strong>
            </div>
          </div>

          <div className="sql-cs-grid">
            {/* BLOQUE 1: Orden de Ejecución */}
            <div className="sql-cs-card">
              <h3 className="sql-cs-card-title">1. El Orden Mágico de Ejecución</h3>
              <p className="sql-cs-desc">SQL no se ejecuta en el orden en que se escribe:</p>
              <ol className="sql-cs-exec-list">
                <li><strong>1. FROM & JOIN:</strong> Carga tablas y cruza datos.</li>
                <li><strong>2. WHERE:</strong> Filtra filas individuales (no admite agregadas).</li>
                <li><strong>3. GROUP BY:</strong> Agrupa los datos en montones.</li>
                <li><strong>4. HAVING:</strong> Filtra grupos creados por GROUP BY (admite agregadas).</li>
                <li><strong>5. SELECT:</strong> Proyecta y computa columnas.</li>
                <li><strong>6. DISTINCT:</strong> Elimina duplicados de la proyección.</li>
                <li><strong>7. ORDER BY:</strong> Ordena el resultado final (ya conoce los alias).</li>
                <li><strong>8. LIMIT / OFFSET:</strong> Recorta el número de filas devueltas.</li>
              </ol>
            </div>

            {/* BLOQUE 2: Restricciones (Constraints) */}
            <div className="sql-cs-card">
              <h3 className="sql-cs-card-title">2. Restricciones (Constraints)</h3>
              <table className="sql-cs-table">
                <thead>
                  <tr>
                    <th>Restricción</th>
                    <th>NULL</th>
                    <th>Duplicados</th>
                    <th>Propósito</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>PRIMARY KEY</code></td>
                    <td>❌ No</td>
                    <td>❌ No</td>
                    <td>Identificador único maestro de la fila.</td>
                  </tr>
                  <tr>
                    <td><code>NOT NULL</code></td>
                    <td>❌ No</td>
                    <td>✔️ Sí</td>
                    <td>Obliga a contener siempre un dato.</td>
                  </tr>
                  <tr>
                    <td><code>UNIQUE</code></td>
                    <td>✔️ Sí</td>
                    <td>❌ No</td>
                    <td>Evita duplicados en campos secundarios.</td>
                  </tr>
                  <tr>
                    <td><code>FOREIGN KEY</code></td>
                    <td>✔️ Sí</td>
                    <td>✔️ Sí</td>
                    <td>Asegura integridad referencial con el padre.</td>
                  </tr>
                  <tr>
                    <td><code>CHECK</code></td>
                    <td>-</td>
                    <td>-</td>
                    <td>Valida una condición lógica o matemática.</td>
                  </tr>
                  <tr>
                    <td><code>DEFAULT</code></td>
                    <td>-</td>
                    <td>-</td>
                    <td>Asigna un valor automático si viene vacío.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BLOQUE 3: Visualizador de JOINs */}
            <div className="sql-cs-card">
              <h3 className="sql-cs-card-title">3. Chuleta Rápida de JOINs</h3>
              <div className="sql-cs-joins-list">
                <div className="sql-cs-join-item">
                  <span className="sql-join-badge inner">INNER JOIN</span>
                  <span>Solo filas que coinciden en ambas tablas (intersección exacta).</span>
                </div>
                <div className="sql-cs-join-item">
                  <span className="sql-join-badge left">LEFT JOIN</span>
                  <span>Todas las filas de la izquierda; si no hay en la derecha, rellena con NULL.</span>
                </div>
                <div className="sql-cs-join-item">
                  <span className="sql-join-badge right">RIGHT JOIN</span>
                  <span>Todas las filas de la derecha; si no hay en la izquierda, rellena con NULL.</span>
                </div>
                <div className="sql-cs-join-item">
                  <span className="sql-join-badge anti">ANTI-JOIN</span>
                  <span><code>LEFT JOIN ... WHERE B.id IS NULL</code> (solo los no emparejados).</span>
                </div>
                <div className="sql-cs-join-item">
                  <span className="sql-join-badge cross">CROSS JOIN</span>
                  <span>Producto cartesiano (combina cada fila de A con todas las de B).</span>
                </div>
              </div>
            </div>

            {/* BLOQUE 4: Funciones de Agregación vs Ventana */}
            <div className="sql-cs-card">
              <h3 className="sql-cs-card-title">4. Agregación vs Funciones de Ventana</h3>
              <div className="sql-cs-code-sample">
                <strong>Agregación (Colapsa filas):</strong>
                <code>SELECT depto, AVG(salario), COUNT(*) FROM emp GROUP BY depto;</code>
              </div>
              <div className="sql-cs-code-sample" style={{ marginTop: '0.5rem' }}>
                <strong>Ventana OVER (Mantiene cada fila individual):</strong>
                <code>SELECT nombre, salario, RANK() OVER(PARTITION BY depto ORDER BY salario DESC) FROM emp;</code>
              </div>
              <ul className="sql-cs-bullet-list">
                <li><code>ROW_NUMBER()</code>: Consecutivo estricto (1, 2, 3, 4...).</li>
                <li><code>RANK()</code>: Con empates y saltos posteriores (1, 2, 2, 4...).</li>
                <li><code>DENSE_RANK()</code>: Con empates sin saltos (1, 2, 2, 3...).</li>
                <li><code>LEAD() / LAG()</code>: Fila siguiente / anterior en el particionado.</li>
              </ul>
            </div>
          </div>

          <div className="sql-cs-footer">
            <span>💡 <em>Consejo de Examen:</em> Si te piden "los 3 mejores de cada categoría", la solución canónica es una Window Function (DENSE_RANK) dentro de una CTE o subconsulta.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

