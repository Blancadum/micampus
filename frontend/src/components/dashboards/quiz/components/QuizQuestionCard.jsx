import React from 'react';
import { Link } from 'react-router-dom';

/**
 * QuizQuestionCard
 * Tarjeta interactiva de la pregunta activa (enunciado, opciones con feedback,
 * explicación pedagógica y navegación).
 */
export default function QuizQuestionCard({
  currentQ,
  currentIndex,
  totalCount,
  tutoriaIcon = '🌱',
  isAnswered,
  selectedOption,
  onOptionSelect,
  onPrevQuestion,
  onNextQuestion
}) {
  if (!currentQ) return null;

  return (
    <div className="quiz-active-card">
      {/* Card Top: Tags, Progress & Counter */}
      <div className="quiz-card-top">
        <div className="quiz-card-topic-row">
          <span className="quiz-question-tag">
            {tutoriaIcon} {currentQ.tutoriaTitle}
          </span>
          <span className="quiz-card-topic-subtitle">
            {currentQ.tutoriaTopic}
          </span>
        </div>
        <div className="quiz-card-meta">
          <span>Pregunta {currentIndex + 1} de {totalCount}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress-track">
        <div
          className="quiz-progress-fill"
          style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
        />
      </div>

      {/* Question Title & Prompt */}
      <div className="quiz-prompt-title">
        {currentQ.question}
      </div>

      {/* Options List */}
      <div className="quiz-options-list">
        {currentQ.options.map(opt => {
          let statusClass = '';
          if (isAnswered) {
            if (opt.key === currentQ.correctAnswer) {
              statusClass = 'correct';
            } else if (opt.key === selectedOption) {
              statusClass = 'incorrect';
            } else {
              statusClass = 'dimmed';
            }
          }

          return (
            <button
              key={opt.key}
              className={`quiz-option-btn ${statusClass}`}
              onClick={() => onOptionSelect(opt.key)}
              disabled={isAnswered}
            >
              <span className="quiz-option-key">{opt.key}</span>
              <span className="quiz-option-text">{opt.text}</span>
              {isAnswered && opt.key === currentQ.correctAnswer && (
                <span className="quiz-option-feedback-correct">✓ Correcta</span>
              )}
              {isAnswered && opt.key === selectedOption && opt.key !== currentQ.correctAnswer && (
                <span className="quiz-option-feedback-wrong">✗ Tu respuesta</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Official Explanation Box (Revealed on answer) */}
      {isAnswered && (
        <div className="quiz-explanation-box">
          <div className="quiz-explanation-header">
            <span className="quiz-explanation-badge">
              💡 Explicación del Tutor (Israel):
            </span>
            <span className="quiz-explanation-source-code">
              Archivo fuente: <code>{currentQ.tutoriaKey}/Preguntas.java</code>
            </span>
          </div>
          <p className="quiz-explanation-text">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="quiz-controls-row">
        <button
          className="quiz-action-btn secondary"
          onClick={onPrevQuestion}
          disabled={currentIndex === 0}
        >
          ← Anterior
        </button>

        <div className="quiz-action-group">
          <Link
            to="/java/studio/tutorias"
            className="quiz-action-btn secondary"
          >
            📂 Código Tutorías
          </Link>
          <Link
            to="/java/studio/libro"
            className="quiz-action-btn secondary"
          >
            📖 Repasar Teoría
          </Link>
          {isAnswered && (
            <button
              className="quiz-action-btn primary"
              onClick={onNextQuestion}
            >
              {currentIndex < totalCount - 1 ? 'Siguiente Pregunta →' : 'Finalizar Bloque 🏁'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
