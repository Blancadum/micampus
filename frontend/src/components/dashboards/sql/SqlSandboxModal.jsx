import React, { useState } from 'react';
import { SAMPLE_DATABASE, PRESET_QUERIES, executeSql } from './sqlSandboxEngine';

/**
 * SqlSandboxModal
 * Entorno interactivo para ejecutar sentencias SQL en el navegador con resultados reales en tabla.
 * Estilo: Azul marino clásico con líneas rectas (#1a5490, #ffd700).
 */
export default function SqlSandboxModal({ isOpen, onClose }) {
  const [activePresetId, setActivePresetId] = useState(PRESET_QUERIES[0].id);
  const [sqlText, setSqlText] = useState(PRESET_QUERIES[0].sql);
  const [activeSchemaTable, setActiveSchemaTable] = useState('estudiantes');
  const [queryResult, setQueryResult] = useState(() => executeSql(PRESET_QUERIES[0].sql));
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setSqlText(preset.sql);
    setQueryResult(executeSql(preset.sql));
  };

  const handleRunQuery = () => {
    const res = executeSql(sqlText);
    setQueryResult(res);
  };

  const handleCopySql = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(sqlText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="sql-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sql-modal-window sql-sandbox-window" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del modal */}
        <div className="sql-modal-header">
          <div className="sql-modal-header-left">
            <span className="sql-modal-icon">🧪</span>
            <div>
              <h2 className="sql-modal-title">Playground SQL en Vivo (Sandbox)</h2>
              <p className="sql-modal-subtitle">
                Escribe y ejecuta consultas reales contra el conjunto de datos de prueba precargado
              </p>
            </div>
          </div>
          <button type="button" className="sql-modal-close-btn" onClick={onClose} aria-label="Cerrar Playground">
            ✕
          </button>
        </div>

        {/* Selector de consultas de ejemplo (Chips) */}
        <div className="sql-sandbox-presets-bar">
          <span className="sql-sandbox-presets-label">⚡ Consultas Preparadas:</span>
          <div className="sql-sandbox-presets-list">
            {PRESET_QUERIES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`sql-preset-chip ${activePresetId === p.id ? 'active' : ''}`}
                onClick={() => handleSelectPreset(p)}
                title={p.desc}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Cuerpo principal en 2 columnas: Editor y Esquema */}
        <div className="sql-sandbox-body">
          {/* Columna Izquierda: Editor de Consulta y Resultados */}
          <div className="sql-sandbox-editor-col">
            <div className="sql-editor-toolbar">
              <span className="sql-editor-label">💻 Consola de Sentencias SQL</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="sql-tool-btn"
                  onClick={handleCopySql}
                  title="Copiar código al portapapeles"
                >
                  {isCopied ? '✓ Copiado' : '📋 Copiar'}
                </button>
                <button
                  type="button"
                  className="sql-run-query-btn"
                  onClick={handleRunQuery}
                  title="Ejecutar consulta (Ctrl+Enter)"
                >
                  ▶️ Ejecutar Query
                </button>
              </div>
            </div>

            <textarea
              className="sql-sandbox-textarea"
              value={sqlText}
              onChange={(e) => setSqlText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleRunQuery();
                }
              }}
              placeholder="Escribe tu consulta SELECT aquí..."
              spellCheck="false"
              rows={6}
            />

            {/* Panel de Resultados */}
            <div className="sql-results-panel">
              <div className="sql-results-header">
                <span className="sql-results-title">📊 Resultado de la Consulta</span>
                {queryResult && queryResult.success && (
                  <span className="sql-results-badge">
                    ✓ {queryResult.rowCount} {queryResult.rowCount === 1 ? 'fila' : 'filas'} en {queryResult.executionTimeMs} ms
                  </span>
                )}
              </div>

              {queryResult && !queryResult.success && (
                <div className="sql-sandbox-error">
                  <strong>⚠️ Error de Ejecución:</strong> {queryResult.error}
                </div>
              )}

              {queryResult && queryResult.success && (
                <div className="sql-results-table-wrap">
                  {queryResult.rows.length === 0 ? (
                    <div className="sql-results-empty">
                      La consulta se ejecutó con éxito pero no devolvió ninguna fila coincidente.
                    </div>
                  ) : (
                    <table className="sql-results-table">
                      <thead>
                        <tr>
                          {queryResult.columns.map((col, idx) => (
                            <th key={idx}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {queryResult.columns.map((col, cIdx) => (
                              <td key={cIdx}>
                                {row[col] === null || row[col] === undefined ? (
                                  <span className="sql-val-null">NULL</span>
                                ) : (
                                  String(row[col])
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Explorador de Esquema de Datos */}
          <div className="sql-sandbox-schema-col">
            <div className="sql-schema-header">
              <span>🗄️ Tablas en Memoria</span>
            </div>

            <div className="sql-schema-tabs">
              {Object.keys(SAMPLE_DATABASE).map((table) => (
                <button
                  key={table}
                  type="button"
                  className={`sql-schema-tab-btn ${activeSchemaTable === table ? 'active' : ''}`}
                  onClick={() => setActiveSchemaTable(table)}
                >
                  {table} <span className="sql-schema-count">({SAMPLE_DATABASE[table].length})</span>
                </button>
              ))}
            </div>

            <div className="sql-schema-data-preview">
              <div className="sql-schema-meta">
                <strong>Esquema de `{activeSchemaTable}`:</strong>
                <p>
                  Columnas: {Object.keys(SAMPLE_DATABASE[activeSchemaTable][0] || {}).join(', ')}
                </p>
              </div>

              <div className="sql-schema-mini-table">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(SAMPLE_DATABASE[activeSchemaTable][0] || {}).map((k) => (
                        <th key={k}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_DATABASE[activeSchemaTable].slice(0, 5).map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val, vIdx) => (
                          <td key={vIdx}>{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <small className="sql-schema-footnote">Mostrando primeras 5 filas para referencia rápida.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

