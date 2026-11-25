import React, { useState, useMemo } from 'react';
import { ECOMMERCE_DB, REAL_WORLD_MISSIONS, executeEcommerceSql } from './sqlEcommerceData';

/**
 * SqlQueryBuilderModal
 * Generador Visual de Consultas SQL + Taller Práctico del Mundo Real (E-Commerce "TechStore").
 * Permite a los estudiantes construir consultas sin escribir código, ver el SQL generado
 * en tiempo real y resolver misiones de negocio reales con ejecución inmediata.
 * Estilo: Azul marino clásico con líneas rectas (#1a5490, #ffd700).
 */
export default function SqlQueryBuilderModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('missions'); // 'missions' | 'builder' | 'schema'
  
  // Estado del Generador Visual
  const [selectedTable, setSelectedTable] = useState('productos');
  const [selectedCols, setSelectedCols] = useState(['id', 'nombre', 'precio', 'stock']);
  const [whereCol, setWhereCol] = useState('stock');
  const [whereOp, setWhereOp] = useState('<');
  const [whereVal, setWhereVal] = useState('10');
  const [orderByCol, setOrderByCol] = useState('stock');
  const [orderDir, setOrderDir] = useState('ASC');
  const [limitVal, setLimitVal] = useState('10');
  const [useWhere, setUseWhere] = useState(true);
  const [useOrderBy, setUseOrderBy] = useState(true);
  const [useLimit, setUseLimit] = useState(true);

  // Misión activa seleccionada
  const [activeMissionId, setActiveMissionId] = useState(REAL_WORLD_MISSIONS[0].id);
  const [revealedExplanations, setRevealedExplanations] = useState({});

  // Resultados de ejecución
  const [queryOutput, setQueryOutput] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Columnas disponibles según tabla
  const availableCols = useMemo(() => {
    return Object.keys(ECOMMERCE_DB[selectedTable]?.[0] || {});
  }, [selectedTable]);

  // Construcción reactiva de la consulta SQL generada
  const generatedSql = useMemo(() => {
    const cols = selectedCols.length > 0 ? selectedCols.join(',\n       ') : '*';
    let query = `SELECT ${cols}\nFROM ${selectedTable}`;

    if (useWhere && whereCol && whereVal.trim()) {
      const isNum = !isNaN(whereVal) && whereVal.trim() !== '';
      const formattedVal = isNum ? whereVal : `'${whereVal}'`;
      query += `\nWHERE ${whereCol} ${whereOp} ${formattedVal}`;
    }

    if (useOrderBy && orderByCol) {
      query += `\nORDER BY ${orderByCol} ${orderDir}`;
    }

    if (useLimit && limitVal && parseInt(limitVal, 10) > 0) {
      query += `\nLIMIT ${limitVal};`;
    } else {
      query += ';';
    }

    return query;
  }, [selectedTable, selectedCols, useWhere, whereCol, whereOp, whereVal, useOrderBy, orderByCol, orderDir, useLimit, limitVal]);

  if (!isOpen) return null;

  const handleTableChange = (table) => {
    setSelectedTable(table);
    const cols = Object.keys(ECOMMERCE_DB[table]?.[0] || {});
    setSelectedCols(cols.slice(0, 4));
    setWhereCol(cols[1] || cols[0]);
    setOrderByCol(cols[0]);
  };

  const handleToggleCol = (col) => {
    setSelectedCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const handleRunBuilderSql = () => {
    const res = executeEcommerceSql(generatedSql);
    setQueryOutput(res);
  };

  const handleRunMissionSql = (sql) => {
    const res = executeEcommerceSql(sql);
    setQueryOutput(res);
  };

  const handleLoadMissionInBuilder = (mission) => {
    if (mission.builderConfig?.table) {
      setSelectedTable(mission.builderConfig.table);
      if (mission.builderConfig.columns) setSelectedCols(mission.builderConfig.columns);
      if (mission.builderConfig.whereCol) {
        setUseWhere(true);
        setWhereCol(mission.builderConfig.whereCol);
        setWhereOp(mission.builderConfig.whereOp || '=');
        setWhereVal(mission.builderConfig.whereVal || '');
      }
      if (mission.builderConfig.orderByCol) {
        setUseOrderBy(true);
        setOrderByCol(mission.builderConfig.orderByCol);
        setOrderDir(mission.builderConfig.orderDir || 'ASC');
      }
      if (mission.builderConfig.limit) {
        setUseLimit(true);
        setLimitVal(mission.builderConfig.limit);
      }
    }
    setActiveTab('builder');
  };

  const handleCopy = (text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  const toggleMissionExplanation = (id) => {
    setRevealedExplanations((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="sql-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sql-modal-window sql-builder-window" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del modal */}
        <div className="sql-modal-header">
          <div className="sql-modal-header-left">
            <span className="sql-modal-icon">🛒</span>
            <div>
              <h2 className="sql-modal-title">Generador Visual SQL & Taller Real: TechStore</h2>
              <p className="sql-modal-subtitle">
                Aprende SQL resolviendo casos de negocio reales en una tienda de comercio electrónico y logística
              </p>
            </div>
          </div>
          <button type="button" className="sql-modal-close-btn" onClick={onClose} aria-label="Cerrar Taller">
            ✕
          </button>
        </div>

        {/* Selector de pestañas superiores */}
        <div className="sql-backend-tabs-bar">
          <button
            type="button"
            className={`sql-backend-tab-btn ${activeTab === 'missions' ? 'active' : ''}`}
            onClick={() => setActiveTab('missions')}
          >
            🎯 Misiones de Negocio Reales ({REAL_WORLD_MISSIONS.length})
          </button>
          <button
            type="button"
            className={`sql-backend-tab-btn ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            🛠️ Generador Visual Asistido (Query Builder)
          </button>
          <button
            type="button"
            className={`sql-backend-tab-btn ${activeTab === 'schema' ? 'active' : ''}`}
            onClick={() => setActiveTab('schema')}
          >
            🗄️ Esquema de Datos TechStore
          </button>
        </div>

        <div className="sql-builder-content">
          {/* ===================================================================
              PESTAÑA 1: MISIONES DEL MUNDO REAL
              =================================================================== */}
          {activeTab === 'missions' && (
            <div className="sql-missions-pane">
              <div className="sql-missions-intro">
                <span className="sql-missions-intro-badge">🏢 Escenario de Producción</span>
                <p>
                  Bienvenido al equipo de ingeniería de <strong>TechStore</strong>. Aquí no practicarás con sentencias abstractas: cada consulta responde a una necesidad crítica de los departamentos de <strong>Logística, Finanzas, Marketing y Dirección</strong>.
                </p>
              </div>

              <div className="sql-missions-grid">
                {REAL_WORLD_MISSIONS.map((m) => {
                  const isExplOpen = !!revealedExplanations[m.id];

                  return (
                    <div key={m.id} className="sql-mission-card">
                      <div className="sql-mission-card-header">
                        <span className="sql-mission-area">{m.area}</span>
                        <h4 className="sql-mission-title">{m.title}</h4>
                      </div>

                      <div className="sql-mission-context">
                        <p><strong>Contexto:</strong> {m.context}</p>
                        <p className="sql-mission-goal"><strong>Objetivo SQL:</strong> {m.goal}</p>
                      </div>

                      <div className="sql-mission-actions">
                        <button
                          type="button"
                          className="sql-tool-btn"
                          onClick={() => handleLoadMissionInBuilder(m)}
                          title="Cargar los parámetros de esta misión en el Generador Visual"
                        >
                          🛠️ Resolver con Generador Visual
                        </button>
                        <button
                          type="button"
                          className="sql-run-query-btn"
                          onClick={() => handleRunMissionSql(m.canonicalSql)}
                          title="Ejecutar la consulta real en memoria"
                        >
                          ▶️ Ejecutar Solución en Vivo
                        </button>
                        <button
                          type="button"
                          className={`sql-challenge-hint-btn ${isExplOpen ? 'active' : ''}`}
                          onClick={() => toggleMissionExplanation(m.id)}
                        >
                          {isExplOpen ? '🙈 Ocultar SQL' : '👁️ Ver SQL y Análisis'}
                        </button>
                      </div>

                      {isExplOpen && (
                        <div className="sql-mission-solution-pane">
                          <pre className="code-block">
                            <code>{m.canonicalSql}</code>
                          </pre>
                          <div className="sql-solution-explanation">
                            <strong>🧠 Lógica de Negocio:</strong>
                            <p>{m.explanation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              PESTAÑA 2: GENERADOR VISUAL DE CONSULTAS (QUERY BUILDER)
              =================================================================== */}
          {activeTab === 'builder' && (
            <div className="sql-builder-pane">
              <div className="sql-builder-columns-wrap">
                {/* Panel de Controles Visuales (Izquierda) */}
                <div className="sql-builder-controls-col">
                  <div className="sql-builder-group">
                    <label className="sql-builder-label">1. Seleccionar Tabla Origen (FROM):</label>
                    <div className="sql-builder-table-selector">
                      {['productos', 'pedidos', 'clientes'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`sql-builder-table-btn ${selectedTable === t ? 'active' : ''}`}
                          onClick={() => handleTableChange(t)}
                        >
                          {t === 'productos' && '📦 '}
                          {t === 'pedidos' && '📑 '}
                          {t === 'clientes' && '👥 '}
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sql-builder-group">
                    <label className="sql-builder-label">2. Columnas a Proyectar (SELECT):</label>
                    <div className="sql-builder-checkbox-grid">
                      {availableCols.map((col) => (
                        <label key={col} className="sql-builder-col-item">
                          <input
                            type="checkbox"
                            checked={selectedCols.includes(col)}
                            onChange={() => handleToggleCol(col)}
                          />
                          <span>{col}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="sql-builder-group">
                    <div className="sql-builder-toggle-title">
                      <label className="sql-builder-label">
                        <input
                          type="checkbox"
                          checked={useWhere}
                          onChange={(e) => setUseWhere(e.target.checked)}
                        />
                        {' '}3. Filtrar Filas (WHERE):
                      </label>
                    </div>
                    {useWhere && (
                      <div className="sql-builder-inline-row">
                        <select
                          className="sql-builder-select"
                          value={whereCol}
                          onChange={(e) => setWhereCol(e.target.value)}
                        >
                          {availableCols.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <select
                          className="sql-builder-select op"
                          value={whereOp}
                          onChange={(e) => setWhereOp(e.target.value)}
                        >
                          <option value="=">=</option>
                          <option value="!=">!=</option>
                          <option value=">">&gt;</option>
                          <option value="<">&lt;</option>
                          <option value=">=">&gt;=</option>
                          <option value="<=">&lt;=</option>
                          <option value="LIKE">LIKE</option>
                        </select>
                        <input
                          type="text"
                          className="sql-builder-input"
                          value={whereVal}
                          onChange={(e) => setWhereVal(e.target.value)}
                          placeholder="Valor de filtro..."
                        />
                      </div>
                    )}
                  </div>

                  <div className="sql-builder-group">
                    <div className="sql-builder-toggle-title">
                      <label className="sql-builder-label">
                        <input
                          type="checkbox"
                          checked={useOrderBy}
                          onChange={(e) => setUseOrderBy(e.target.checked)}
                        />
                        {' '}4. Ordenar Resultados (ORDER BY):
                      </label>
                    </div>
                    {useOrderBy && (
                      <div className="sql-builder-inline-row">
                        <select
                          className="sql-builder-select"
                          value={orderByCol}
                          onChange={(e) => setOrderByCol(e.target.value)}
                        >
                          {availableCols.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <select
                          className="sql-builder-select"
                          value={orderDir}
                          onChange={(e) => setOrderDir(e.target.value)}
                        >
                          <option value="ASC">ASC (Menor a mayor / A-Z)</option>
                          <option value="DESC">DESC (Mayor a menor / Z-A)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="sql-builder-group">
                    <div className="sql-builder-toggle-title">
                      <label className="sql-builder-label">
                        <input
                          type="checkbox"
                          checked={useLimit}
                          onChange={(e) => setUseLimit(e.target.checked)}
                        />
                        {' '}5. Límite de Filas (LIMIT):
                      </label>
                    </div>
                    {useLimit && (
                      <input
                        type="number"
                        className="sql-builder-input"
                        value={limitVal}
                        onChange={(e) => setLimitVal(e.target.value)}
                        min="1"
                        max="100"
                        style={{ maxWidth: '120px' }}
                      />
                    )}
                  </div>
                </div>

                {/* Visor de Código SQL Generado (Derecha) */}
                <div className="sql-builder-code-col">
                  <div className="sql-editor-toolbar">
                    <span className="sql-editor-label">✨ Código SQL Generado en Tiempo Real</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="sql-tool-btn"
                        onClick={() => handleCopy(generatedSql)}
                      >
                        {copiedSql ? '✓ Copiado' : '📋 Copiar'}
                      </button>
                      <button
                        type="button"
                        className="sql-run-query-btn"
                        onClick={handleRunBuilderSql}
                      >
                        ▶️ Ejecutar Query
                      </button>
                    </div>
                  </div>

                  <pre className="code-block sql-builder-preview-box">
                    <code>{generatedSql}</code>
                  </pre>

                  <div className="sql-builder-tip-box">
                    💡 <strong>Aprendizaje activo:</strong> Modifica cualquier casilla, orden o condición a la izquierda y observa cómo la sintaxis SQL se reorganiza de manera inmediata.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              PESTAÑA 3: ESQUEMA DE DATOS TECHSTORE
              =================================================================== */}
          {activeTab === 'schema' && (
            <div className="sql-schema-explorer-pane">
              <div className="sql-schema-info-card">
                <h3>🗄️ Diccionario de Datos de TechStore</h3>
                <p>Esta base de datos simula el backend real de una tienda con 3 tablas vinculadas:</p>
              </div>

              <div className="sql-schema-tables-grid">
                <div className="sql-schema-box">
                  <h4>👥 Tabla: clientes (8 registros)</h4>
                  <table className="sql-cs-table">
                    <thead>
                      <tr><th>Campo</th><th>Tipo</th><th>Descripción</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><code>id</code></td><td>INT (PK)</td><td>Identificador único del usuario</td></tr>
                      <tr><td><code>nombre</code></td><td>VARCHAR</td><td>Nombre completo del cliente</td></tr>
                      <tr><td><code>email</code></td><td>VARCHAR (UNIQUE)</td><td>Correo electrónico</td></tr>
                      <tr><td><code>ciudad</code></td><td>VARCHAR</td><td>Población de envío</td></tr>
                      <tr><td><code>nivel</code></td><td>ENUM</td><td>'Estándar' o 'VIP'</td></tr>
                      <tr><td><code>saldo_puntos</code></td><td>INT</td><td>Puntos de fidelización acumulados</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="sql-schema-box">
                  <h4>📦 Tabla: productos (8 registros)</h4>
                  <table className="sql-cs-table">
                    <thead>
                      <tr><th>Campo</th><th>Tipo</th><th>Descripción</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><code>id</code></td><td>INT (PK)</td><td>Identificador del artículo</td></tr>
                      <tr><td><code>nombre</code></td><td>VARCHAR</td><td>Nombre comercial del producto</td></tr>
                      <tr><td><code>categoria</code></td><td>VARCHAR</td><td>Familia (Portátiles, Audio, etc.)</td></tr>
                      <tr><td><code>precio</code></td><td>DECIMAL(10,2)</td><td>PVP en euros</td></tr>
                      <tr><td><code>stock</code></td><td>INT</td><td>Unidades físicas en almacén</td></tr>
                      <tr><td><code>proveedor</code></td><td>VARCHAR</td><td>Marca distribuidora</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="sql-schema-box">
                  <h4>📑 Tabla: pedidos (10 registros)</h4>
                  <table className="sql-cs-table">
                    <thead>
                      <tr><th>Campo</th><th>Tipo</th><th>Descripción</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><code>id</code></td><td>INT (PK)</td><td>Número de factura/pedido</td></tr>
                      <tr><td><code>cliente_id</code></td><td>INT (FK)</td><td>Enlaza con clientes(id)</td></tr>
                      <tr><td><code>fecha</code></td><td>DATE</td><td>Fecha de emisión</td></tr>
                      <tr><td><code>total</code></td><td>DECIMAL(10,2)</td><td>Importe total del pedido</td></tr>
                      <tr><td><code>estado</code></td><td>VARCHAR</td><td>'Entregado', 'En tránsito', 'Cancelado'</td></tr>
                      <tr><td><code>metodo_pago</code></td><td>VARCHAR</td><td>'Tarjeta', 'Bizum', 'PayPal'</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              PANEL INFERIOR DE RESULTADOS DE EJECUCIÓN
              =================================================================== */}
          {queryOutput && (
            <div className="sql-builder-results-section">
              <div className="sql-results-header">
                <span className="sql-results-title">📊 Resultado de la Consulta en TechStore</span>
                <span className="sql-results-badge">
                  ✓ {queryOutput.rowCount} {queryOutput.rowCount === 1 ? 'fila' : 'filas'} devueltas en {queryOutput.executionTimeMs} ms
                </span>
              </div>

              <div className="sql-results-table-wrap">
                <table className="sql-results-table">
                  <thead>
                    <tr>
                      {queryOutput.columns.map((c, idx) => (
                        <th key={idx}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryOutput.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {queryOutput.columns.map((col, cIdx) => (
                          <td key={cIdx}>{String(row[col] !== undefined ? row[col] : '')}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

