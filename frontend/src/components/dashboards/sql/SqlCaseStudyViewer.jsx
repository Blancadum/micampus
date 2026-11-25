import React, { useState } from 'react';
import { REAL_WORLD_CASES, executeCaseSql } from './sqlCasesData';

/**
 * SqlCaseStudyViewer
 * Vista pormenorizada de Casos de Estudio del Mundo Real y Espacio de Prácticas.
 * Para cada caso desglosa:
 * 1. Situación real de negocio.
 * 2. Organización exhaustiva de las tablas (campos, tipos, descripciones, PK y FK).
 * 3. Mapa de relaciones y cardinalidades explicadas.
 * 4. Espacio interactivo de prácticas (Playground) con consola SQL y ejecución en vivo.
 * Diseño: "Azul clásico con líneas rectas" (#1a5490, #ffd700).
 */
export default function SqlCaseStudyViewer({ initialCaseId = 'case-techstore', onClose, isModal = false }) {
  const [activeCaseId, setActiveCaseId] = useState(initialCaseId);
  const currentCase = REAL_WORLD_CASES.find((c) => c.id === activeCaseId) || REAL_WORLD_CASES[0];

  // Estado del reto de prácticas seleccionado
  const [activeChallengeId, setActiveChallengeId] = useState(currentCase.challenges[0]?.id);
  const activeChallenge = currentCase.challenges.find((ch) => ch.id === activeChallengeId) || currentCase.challenges[0];

  // Estado del editor SQL
  const [sqlText, setSqlText] = useState(activeChallenge?.initialSql || '');
  const [queryResult, setQueryResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [expandedTableData, setExpandedTableData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  // Cambiar de caso de estudio
  const handleSelectCase = (caseId) => {
    setActiveCaseId(caseId);
    const newCase = REAL_WORLD_CASES.find((c) => c.id === caseId) || REAL_WORLD_CASES[0];
    const firstChallenge = newCase.challenges[0];
    setActiveChallengeId(firstChallenge?.id);
    setSqlText(firstChallenge?.initialSql || '');
    setQueryResult(null);
    setShowHint(false);
    setShowExplanation(false);
    setExpandedTableData(null);
  };

  // Cambiar de reto dentro del mismo caso
  const handleSelectChallenge = (challenge) => {
    setActiveChallengeId(challenge.id);
    setSqlText(challenge.initialSql);
    setQueryResult(null);
    setShowHint(false);
    setShowExplanation(false);
  };

  // Ejecutar consulta SQL
  const handleRunQuery = () => {
    const res = executeCaseSql(currentCase.id, sqlText);
    setQueryResult(res);
  };

  const handleCopySql = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(sqlText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const containerContent = (
    <div className="sql-case-viewer-container">
      {/* 1. CABECERA & NAVEGADOR DE PÁGINAS DE CASOS */}
      <div className="sql-case-top-nav">
        <div className="sql-case-top-title-wrap">
          <span className="sql-case-badge-pill">🏢 Taller del Mundo Real</span>
          <h2 className="sql-case-main-heading">Casos de Estudio Pormenorizados & Playground en Vivo</h2>
          <p className="sql-case-main-subheading">
            Selecciona una empresa para estudiar su situación operativa, el diseño de sus tablas y cómo se relacionan entre sí antes de practicar.
          </p>
        </div>

        {isModal && onClose && (
          <button type="button" className="sql-modal-close-btn" onClick={onClose} aria-label="Cerrar Taller">
            ✕
          </button>
        )}
      </div>

      {/* Pestañas de selección de caso */}
      <div className="sql-case-selector-bar">
        {REAL_WORLD_CASES.map((cs) => {
          const isSelected = cs.id === activeCaseId;
          return (
            <button
              key={cs.id}
              type="button"
              className={`sql-case-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => handleSelectCase(cs.id)}
            >
              <span className="sql-case-tab-icon">{cs.icon}</span>
              <div className="sql-case-tab-info">
                <strong>{cs.name}</strong>
                <small>{cs.industry}</small>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. FICHA DEL CASO SELECCIONADO */}
      <div className="sql-case-body">
        {/* BLOQUE A: SITUACIÓN REAL & NARRATIVA */}
        <section className="sql-case-section">
          <div className="sql-case-section-header">
            <span className="sql-case-step-num">1</span>
            <h3 className="sql-case-section-title">Contexto y Situación Real de la Empresa</h3>
          </div>
          <div className="sql-case-narrative-card">
            <div className="sql-narrative-meta">
              <span className="sql-narrative-tag">{currentCase.industry}</span>
              <span className="sql-narrative-schema-tag">{currentCase.tables.length} Tablas Relacionadas</span>
            </div>
            <p className="sql-narrative-text">{currentCase.situation}</p>
          </div>
        </section>

        {/* BLOQUE B: ORGANIZACIÓN DETALLADA DE LAS TABLAS */}
        <section className="sql-case-section">
          <div className="sql-case-section-header">
            <span className="sql-case-step-num">2</span>
            <h3 className="sql-case-section-title">Organización y Diccionario de las Tablas</h3>
            <span className="sql-case-header-hint">Estructura física, claves primarias (PK) y foráneas (FK)</span>
          </div>

          <div className="sql-case-tables-grid">
            {currentCase.tables.map((table) => {
              const isSampleOpen = expandedTableData === table.name;
              return (
                <div key={table.name} className="sql-table-detail-card">
                  <div className="sql-table-detail-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="sql-table-icon">{table.icon}</span>
                      <div>
                        <strong className="sql-table-name">Tabla: `{table.name}`</strong>
                        <span className="sql-table-subname">{table.label}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="sql-sample-toggle-btn"
                      onClick={() => setExpandedTableData(isSampleOpen ? null : table.name)}
                    >
                      {isSampleOpen ? 'Ocultar datos' : '👁️ Ver datos reales'}
                    </button>
                  </div>

                  <p className="sql-table-desc">{table.description}</p>

                  {/* Diccionario de columnas */}
                  <div className="sql-table-cols-list">
                    <table className="sql-cols-table">
                      <thead>
                        <tr>
                          <th>Columna</th>
                          <th>Tipo</th>
                          <th>Clave</th>
                          <th>Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.columns.map((col) => (
                          <tr key={col.name}>
                            <td><code>{col.name}</code></td>
                            <td><span className="sql-type-chip">{col.type}</span></td>
                            <td>
                              {col.key === 'PK' && <span className="sql-key-badge pk">PK</span>}
                              {col.key === 'FK' && <span className="sql-key-badge fk">FK</span>}
                              {col.key === 'UNIQUE' && <span className="sql-key-badge uq">UNIQUE</span>}
                            </td>
                            <td className="sql-col-desc">{col.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Vista previa de datos reales en memoria */}
                  {isSampleOpen && (
                    <div className="sql-table-sample-preview">
                      <span className="sql-sample-title">📄 Primeros registros reales en memoria:</span>
                      <div className="sql-sample-table-wrap">
                        <table className="sql-sample-data-table">
                          <thead>
                            <tr>
                              {table.columns.map((c) => (
                                <th key={c.name}>{c.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.sampleData.slice(0, 5).map((row, rIdx) => (
                              <tr key={rIdx}>
                                {table.columns.map((c) => (
                                  <td key={c.name}>{String(row[c.name] !== undefined ? row[c.name] : '')}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BLOQUE C: CÓMO SE RELACIONAN ENTRE SÍ (DIAGRAMA ER & CARDINALIDAD) */}
        <section className="sql-case-section">
          <div className="sql-case-section-header">
            <span className="sql-case-step-num">3</span>
            <h3 className="sql-case-section-title">Cómo se Relacionan entre Sí las Tablas</h3>
            <span className="sql-case-header-hint">Integridad referencial y reglas de cardinalidad</span>
          </div>

          <div className="sql-relationships-list">
            {currentCase.relationships.map((rel, idx) => (
              <div key={idx} className="sql-relationship-card">
                <div className="sql-rel-diagram-bar">
                  <div className="sql-rel-entity parent">
                    <span className="sql-rel-entity-title">{rel.parent}</span>
                    <span className="sql-rel-entity-sub">Tabla Padre (PK: {rel.referenceKey})</span>
                  </div>

                  <div className="sql-rel-connector-box">
                    <span className="sql-rel-badge-cardinality">{rel.cardinality}</span>
                    <span className="sql-rel-arrow-line">────────────────➔</span>
                    <span className="sql-rel-fk-info">Enlace: <code>{rel.foreignKey}</code></span>
                  </div>

                  <div className="sql-rel-entity child">
                    <span className="sql-rel-entity-title">{rel.child}</span>
                    <span className="sql-rel-entity-sub">Tabla Hija (FK: {rel.foreignKey})</span>
                  </div>
                </div>

                <div className="sql-rel-rules-box">
                  <p><strong>Regla Relacional:</strong> {rel.rule}</p>
                  <p className="sql-rel-practical">
                    💡 <strong>Implicación en SQL:</strong> {rel.practicalImplication}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOQUE D: ESPACIO DE PRÁCTICAS INTERACTIVO (PLAYGROUND DEL CASO) */}
        <section className="sql-case-section sql-playground-section">
          <div className="sql-case-section-header">
            <span className="sql-case-step-num">4</span>
            <h3 className="sql-case-section-title">Espacio de Prácticas en Vivo: {currentCase.name}</h3>
            <span className="sql-case-header-hint">Resuelve las necesidades del negocio ejecutando consultas reales</span>
          </div>

          {/* Selector de retos del caso */}
          <div className="sql-challenges-tabs-bar">
            <span className="sql-challenges-bar-label">🎯 Retos del Caso:</span>
            <div className="sql-challenges-tabs">
              {currentCase.challenges.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`sql-challenge-tab-btn ${activeChallengeId === ch.id ? 'active' : ''}`}
                  onClick={() => handleSelectChallenge(ch)}
                >
                  <span className="sql-challenge-tab-num">{idx + 1}</span>
                  <span>{ch.title}</span>
                  <span className="sql-challenge-tab-badge">{ch.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ficha del reto activo */}
          {activeChallenge && (
            <div className="sql-challenge-workbench">
              <div className="sql-challenge-brief-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span className="sql-level-badge basic">{activeChallenge.badge}</span>
                  <strong className="sql-challenge-brief-title">{activeChallenge.title}</strong>
                </div>
                <p className="sql-challenge-problem-text">{activeChallenge.problem}</p>
              </div>

              {/* Consola de Código SQL */}
              <div className="sql-editor-toolbar" style={{ marginTop: '1rem' }}>
                <span className="sql-editor-label">💻 Consola SQL de {currentCase.name}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="sql-tool-btn"
                    onClick={handleCopySql}
                  >
                    {isCopied ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                  <button
                    type="button"
                    className="sql-tool-btn"
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? 'Ocultar Pista' : '💡 Pista'}
                  </button>
                  <button
                    type="button"
                    className="sql-tool-btn"
                    onClick={() => setShowExplanation(!showExplanation)}
                  >
                    {showExplanation ? 'Ocultar Solución' : '👁️ Ver Solución'}
                  </button>
                  <button
                    type="button"
                    className="sql-run-query-btn"
                    onClick={handleRunQuery}
                  >
                    ▶️ Ejecutar Consulta en Vivo
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="sql-challenge-hint-box" style={{ margin: '0.6rem 0' }}>
                  <strong>💡 Pista Didáctica:</strong> {activeChallenge.hint}
                </div>
              )}

              {showExplanation && (
                <div className="sql-challenge-solution-box" style={{ margin: '0.6rem 0' }}>
                  <div className="sql-solution-code-title">
                    <span>✨ Solución Canónica Comentada:</span>
                  </div>
                  <pre className="code-block">
                    <code>{activeChallenge.initialSql}</code>
                  </pre>
                  <div className="sql-solution-explanation">
                    <strong>🧠 Análisis del Motor SQL:</strong>
                    <p>{activeChallenge.explanation}</p>
                  </div>
                </div>
              )}

              <textarea
                className="sql-sandbox-textarea"
                value={sqlText}
                onChange={(e) => setSqlText(e.target.value)}
                rows={5}
                spellCheck="false"
                placeholder="Escribe o ajusta la consulta SELECT aquí..."
              />

              {/* Panel de resultados devueltos */}
              {queryResult && (
                <div className="sql-results-panel" style={{ marginTop: '0.8rem' }}>
                  <div className="sql-results-header">
                    <span className="sql-results-title">📊 Resultado de la Consulta en {currentCase.name}</span>
                    {queryResult.success && (
                      <span className="sql-results-badge">
                        ✓ {queryResult.rowCount} {queryResult.rowCount === 1 ? 'fila' : 'filas'} en {queryResult.executionTimeMs} ms
                      </span>
                    )}
                  </div>

                  {!queryResult.success ? (
                    <div className="sql-sandbox-error">
                      <strong>⚠️ Error SQL:</strong> {queryResult.error}
                    </div>
                  ) : (
                    <div className="sql-results-table-wrap">
                      {queryResult.rows.length === 0 ? (
                        <div className="sql-results-empty">
                          La consulta no devolvió filas coincidentes con el criterio indicado.
                        </div>
                      ) : (
                        <table className="sql-results-table">
                          <thead>
                            <tr>
                              {queryResult.columns.map((c, idx) => (
                                <th key={idx}>{c}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {queryResult.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {queryResult.columns.map((col, cIdx) => (
                                  <td key={cIdx}>{String(row[col] !== undefined ? row[col] : '')}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="sql-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="sql-modal-window sql-case-viewer-window" onClick={(e) => e.stopPropagation()}>
          {containerContent}
        </div>
      </div>
    );
  }

  return containerContent;
}

