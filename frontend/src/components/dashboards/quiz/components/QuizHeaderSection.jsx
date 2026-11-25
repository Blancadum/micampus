import React from 'react';

/**
 * QuizHeaderSection
 * Cabecera del juego de preguntas: badge oficial, control de sonido, título descriptivo,
 * barra de estadísticas globales (banco, tutorías, puntuación, racha) y selector de modo.
 */
export default function QuizHeaderSection({
  embeddedInPetete,
  soundEnabled,
  onToggleSound,
  totalQuestionsCount,
  userScore,
  streak,
  wrongCount,
  activeMode,
  onChangeMode
}) {
  return (
    <>
      {/* Hero Header */}
      <section className={`quiz-hero ${embeddedInPetete ? 'is-embedded' : ''}`}>
        <div className="quiz-hero-top-row">
          <div className={`quiz-hero-badge ${embeddedInPetete ? 'is-embedded' : ''}`}>
            {embeddedInPetete ? '📖 PETETE · ARENA OFICIAL DE QUIZ & JUEGOS' : '🎮 ARENA INTERACTIVA · SPRING BOOT & TUTORÍAS'}
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            className="quiz-sound-btn"
            title={soundEnabled ? 'Efectos de sonido activados (clic para silenciar)' : 'Efectos de sonido silenciados (clic para activar)'}
          >
            <span>{soundEnabled ? '🔊 Sonido: ON' : '🔇 Sonido: OFF'}</span>
          </button>
        </div>

        <h1>
          Consolidación de Código & Conceptos
        </h1>
        <p>
          Pon a prueba tus conocimientos sobre las <strong>14 tutorías en código de Israel</strong> (HTTP, REST, JSON, Maven, Spring Core, Capas SOLID, JPA, DTOs, Validaciones, Logs y Testing con JUnit 5 & Mockito).
        </p>

        {/* Global Stats Pill Bar */}
        <div className="quiz-stats-bar">
          <div className="quiz-stat-pill">
            <span>📚 Banco Total:</span>
            <strong>{totalQuestionsCount} Preguntas</strong>
          </div>
          <div className="quiz-stat-pill">
            <span>🏛️ Temas:</span>
            <strong>14 Tutorías</strong>
          </div>
          <div className="quiz-stat-pill">
            <span>⭐ Puntos:</span>
            <strong>{userScore} pts</strong>
          </div>
          <div className="quiz-stat-pill">
            <span>🔥 Racha:</span>
            <strong>{streak} {streak > 1 ? `(x${Math.min(streak, 3)} Combo!)` : ''}</strong>
          </div>
          {wrongCount > 0 && (
            <div className="quiz-stat-pill pill-review">
              <span>⚠️ Para repasar:</span>
              <strong>{wrongCount}</strong>
            </div>
          )}
        </div>
      </section>

      {/* Selector de Modo de Estudio (Desplegable) */}
      <div className="quiz-mode-selector-card">
        <div className="quiz-mode-selector-inner">
          <label htmlFor="quiz-active-mode-select" className="quiz-mode-selector-label">
            <span className="quiz-mode-selector-icon">🎮</span>
            <span>Modo de Estudio / Actividad:</span>
          </label>
          <div className="quiz-mode-select-container">
            <select
              id="quiz-active-mode-select"
              className="quiz-mode-select-control"
              value={activeMode}
              onChange={(e) => onChangeMode(e.target.value)}
            >
              <option value="quiz">🎯 Quiz por Tutoría (Preguntas interactivas con feedback)</option>
              <option value="challenge">⚡ Modo Desafío (Speed Run contrarreloj - 15 preguntas)</option>
              <option value="flashcards">🃏 Flashcards de Repaso (Girar tarjeta y memorizar)</option>
              <option value="survey">📊 Encuesta Autoevaluación (Puntúa tu soltura por tutoría)</option>
              {wrongCount > 0 && (
                <option value="review">🔄 Repasar Fallos ({wrongCount} preguntas pendientes)</option>
              )}
            </select>
            <div className="tutoria-select-arrow" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
