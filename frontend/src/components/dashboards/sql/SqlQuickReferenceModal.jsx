import React, { useState, useMemo } from 'react';

/**
 * SqlQuickReferenceModal
 * Glosario y buscador alfabético instantáneo de palabras clave, cláusulas y funciones SQL.
 * Permite saltar directamente al módulo que lo explica.
 */
export default function SqlQuickReferenceModal({ isOpen, onClose, onSelectModule }) {
  const [filter, setFilter] = useState('');

  const terms = [
    { name: 'ALTER TABLE', cat: 'DDL', desc: 'Modifica la estructura de una tabla existente (añadir columnas, cambiar tipos).', modId: '3-1-ddl', syntax: 'ALTER TABLE t ADD col INT;' },
    { name: 'AUTO_INCREMENT', cat: 'MySQL', desc: 'Genera valores enteros secuenciales únicos automáticamente al insertar registros.', modId: '1-2-conceptos', syntax: 'id INT AUTO_INCREMENT PRIMARY KEY' },
    { name: 'AVG()', cat: 'Agregación', desc: 'Calcula el valor numérico medio o promedio de un conjunto de valores.', modId: '4-1-select-basico', syntax: 'AVG(salario)' },
    { name: 'CASCADE', cat: 'Claves Foráneas', desc: 'Propaga automáticamente la eliminación o actualización del registro padre a las tablas hijas.', modId: '2-2-claves', syntax: 'ON DELETE CASCADE' },
    { name: 'CHECK', cat: 'Restricción', desc: 'Valida que los valores de una columna cumplan una condición lógica antes de guardarse.', modId: '2-2-claves', syntax: 'CHECK (edad >= 18)' },
    { name: 'COALESCE()', cat: 'Funciones', desc: 'Devuelve el primer argumento no nulo de una lista dada (ideal para reemplazar NULLs).', modId: '4-1-select-basico', syntax: 'COALESCE(telefono, "Sin teléfono")' },
    { name: 'COUNT()', cat: 'Agregación', desc: 'Devuelve el número total de filas o valores no nulos que coinciden con el criterio.', modId: '5-1-problema-where', syntax: 'COUNT(*)' },
    { name: 'CTE (WITH)', cat: 'Modern SQL', desc: 'Expresión de tabla común que crea un conjunto de resultados temporal con nombre.', modId: '6-1-ctes-intro', syntax: 'WITH resumen AS (SELECT ...) SELECT * FROM resumen;' },
    { name: 'DEFAULT', cat: 'Restricción', desc: 'Establece un valor por defecto que se almacena si no se especifica uno explícitamente.', modId: '2-2-claves', syntax: 'estado VARCHAR(20) DEFAULT "Activo"' },
    { name: 'DENSE_RANK()', cat: 'Ventana', desc: 'Calcula el puesto o ranking de una fila sin saltarse números tras empates.', modId: '7-2-window-ranking', syntax: 'DENSE_RANK() OVER(ORDER BY nota DESC)' },
    { name: 'EXPLAIN', cat: 'Rendimiento', desc: 'Muestra el plan de ejecución interno del motor y qué índices se utilizan.', modId: '10-1-rendimiento-indices', syntax: 'EXPLAIN SELECT * FROM usuarios WHERE id = 5;' },
    { name: 'FOREIGN KEY', cat: 'Restricción', desc: 'Columna que referencia la clave primaria de otra tabla, garantizando integridad referencial.', modId: '2-2-claves', syntax: 'FOREIGN KEY (fk_id) REFERENCES tabla(id)' },
    { name: 'GROUP BY', cat: 'Cláusula', desc: 'Agrupa filas con valores idénticos en columnas resumen para aplicar funciones agregadas.', modId: '5-2-orden-magico', syntax: 'GROUP BY departamento' },
    { name: 'HAVING', cat: 'Cláusula', desc: 'Filtra los grupos devueltos por GROUP BY después de haber calculado las agregaciones.', modId: '5-6-tabla-comparativa', syntax: 'HAVING COUNT(*) > 5' },
    { name: 'INDEX (B-Tree)', cat: 'Rendimiento', desc: 'Estructura auxiliar que acelera drásticamente la búsqueda de filas en columnas clave.', modId: '10-1-rendimiento-indices', syntax: 'CREATE INDEX idx_email ON clientes(email);' },
    { name: 'INNER JOIN', cat: 'Relaciones', desc: 'Cruza tablas y devuelve solo las filas con valores coincidentes en ambas tablas.', modId: '8-1-joins-visual', syntax: 'FROM A INNER JOIN B ON A.id = B.a_id' },
    { name: 'JSON_EXTRACT', cat: 'MySQL 8', desc: 'Extrae datos estructurados desde una columna con tipo JSON nativo.', modId: '11-2-motores-cheatsheet', syntax: 'JSON_EXTRACT(datos, "$.perfil.ciudad")' },
    { name: 'LEFT JOIN', cat: 'Relaciones', desc: 'Devuelve todas las filas de la tabla izquierda y las coincidentes de la derecha (o NULL).', modId: '8-1-joins-visual', syntax: 'FROM A LEFT JOIN B ON A.id = B.a_id' },
    { name: 'LIMIT & OFFSET', cat: 'Cláusula', desc: 'Restringe el número máximo de filas devueltas y permite paginar resultados.', modId: '4-1-select-basico', syntax: 'LIMIT 10 OFFSET 20' },
    { name: 'NOT NULL', cat: 'Restricción', desc: 'Obliga a que una columna nunca pueda contener un valor vacío o nulo.', modId: '2-2-claves', syntax: 'nombre VARCHAR(100) NOT NULL' },
    { name: 'PRIMARY KEY', cat: 'Restricción', desc: 'Identifica de forma unívoca cada fila en la tabla. No puede ser nula ni repetirse.', modId: '2-2-claves', syntax: 'id INT PRIMARY KEY' },
    { name: 'RANK()', cat: 'Ventana', desc: 'Calcula el puesto de honor con saltos numéricos posteriores ante empates.', modId: '7-2-window-ranking', syntax: 'RANK() OVER(ORDER BY puntos DESC)' },
    { name: 'ROW_NUMBER()', cat: 'Ventana', desc: 'Asigna un número secuencial único y estricto (1, 2, 3...) a cada fila de una partición.', modId: '7-2-window-ranking', syntax: 'ROW_NUMBER() OVER(PARTITION BY depto ORDER BY fecha)' },
    { name: 'TRIGGER', cat: 'Automatización', desc: 'Procedimiento que se dispara automáticamente ante eventos INSERT, UPDATE o DELETE.', modId: '9-2-triggers-udf', syntax: 'CREATE TRIGGER tr_auditoria BEFORE INSERT ON...' },
    { name: 'UNIQUE', cat: 'Restricción', desc: 'Garantiza que todos los valores de una columna sean distintos entre sí.', modId: '2-2-claves', syntax: 'email VARCHAR(120) UNIQUE' },
    { name: 'WHERE', cat: 'Cláusula', desc: 'Filtra registros individuales antes de cualquier operación de agrupamiento.', modId: '5-2-orden-magico', syntax: 'WHERE activo = 1 AND precio > 50' }
  ];

  const filteredTerms = useMemo(() => {
    if (!filter.trim()) return terms;
    const q = filter.toLowerCase();
    return terms.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.cat.toLowerCase().includes(q)
    );
  }, [filter, terms]);

  if (!isOpen) return null;

  return (
    <div className="sql-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sql-modal-window sql-quickref-window" onClick={(e) => e.stopPropagation()}>
        <div className="sql-modal-header">
          <div className="sql-modal-header-left">
            <span className="sql-modal-icon">🔍</span>
            <div>
              <h2 className="sql-modal-title">Índice Rápido de Palabras Clave & Sintaxis SQL</h2>
              <p className="sql-modal-subtitle">
                Glosario alfabético interactivo: localiza cualquier comando y salta a su explicación
              </p>
            </div>
          </div>
          <button type="button" className="sql-modal-close-btn" onClick={onClose} aria-label="Cerrar Glosario">
            ✕
          </button>
        </div>

        <div className="sql-quickref-search-bar">
          <input
            type="text"
            className="sql-quickref-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por palabra clave (ej: HAVING, CASCADE, DENSE_RANK, PRIMARY KEY...)"
            autoFocus
          />
          <span className="sql-quickref-count">{filteredTerms.length} términos</span>
        </div>

        <div className="sql-quickref-body">
          <div className="sql-quickref-grid">
            {filteredTerms.map((term, idx) => (
              <div key={idx} className="sql-quickref-card">
                <div className="sql-quickref-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong className="sql-quickref-name">{term.name}</strong>
                    <span className="sql-quickref-cat">{term.cat}</span>
                  </div>
                  <button
                    type="button"
                    className="sql-quickref-jump-btn"
                    onClick={() => {
                      onSelectModule(term.modId);
                      onClose();
                    }}
                    title={`Ir al módulo explicativo de ${term.name}`}
                  >
                    Ver tema ➔
                  </button>
                </div>
                <p className="sql-quickref-desc">{term.desc}</p>
                <code className="sql-quickref-syntax">{term.syntax}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

