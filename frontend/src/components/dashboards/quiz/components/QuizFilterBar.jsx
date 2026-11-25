import React from 'react';
import { TUTORIA_MODULES } from '../data/quizModulesData';

export default function QuizFilterBar({
  activeMode,
  filteredCount,
  totalCount,
  selectedModuleId,
  selectedTutoriaId,
  onSelectModule,
  onSelectTutoria,
  onResetFilters,
  visibleTutorias = []
}) {
  if (activeMode !== 'quiz' && activeMode !== 'flashcards') {
    return null;
  }

  return (
    <div className="tutoria-filter-wrapper">
      <div className="tutoria-filter-header">
        <div className="tutoria-filter-title">
          <span className="tutoria-filter-icon">🎯</span>
          <span>Filtrar preguntas:</span>
        </div>
        <div className="tutoria-filter-meta">
          <span className="tutoria-filter-badge">
            {filteredCount} {filteredCount === 1 ? 'pregunta' : 'preguntas disponibles'}
          </span>
          {(selectedModuleId !== 'all' || selectedTutoriaId !== 'all') && (
            <button
              type="button"
              className="tutoria-filter-reset"
              onClick={onResetFilters}
              title="Restablecer filtros y ver todas las preguntas"
            >
              ✕ Ver todas ({totalCount})
            </button>
          )}
        </div>
      </div>

      <div className="tutoria-dropdowns-grid">
        {/* Dropdown 1: Módulo Temático */}
        <div className="tutoria-select-group">
          <label htmlFor="quiz-filter-module" className="tutoria-select-label">
            Módulo / Bloque Temático:
          </label>
          <div className="tutoria-select-container">
            <select
              id="quiz-filter-module"
              className="tutoria-select-control"
              value={selectedModuleId}
              onChange={(e) => onSelectModule(e.target.value)}
            >
              {TUTORIA_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
            <div className="tutoria-select-arrow" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropdown 2: Tutoría Específica */}
        <div className="tutoria-select-group">
          <label htmlFor="quiz-filter-tutoria" className="tutoria-select-label">
            Tutoría / Tema Específico:
          </label>
          <div className="tutoria-select-container">
            <select
              id="quiz-filter-tutoria"
              className="tutoria-select-control"
              value={selectedTutoriaId}
              onChange={(e) => onSelectTutoria(e.target.value)}
            >
              <option value="all">
                {selectedModuleId === 'all'
                  ? `🌐 Todas las tutorías (${totalCount} preguntas)`
                  : `📋 Todas las de este bloque`}
              </option>
              {visibleTutorias.map((item) => (
                <option key={item.meta.id} value={String(item.meta.id)}>
                  {item.meta.icon} Tutoría {item.meta.id < 10 ? `0${item.meta.id}` : item.meta.id}: {item.meta.topic} ({item.questions.length} preg.)
                </option>
              ))}
            </select>
            <div className="tutoria-select-arrow" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
