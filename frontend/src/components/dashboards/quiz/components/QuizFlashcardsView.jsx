import React from 'react';

export default function QuizFlashcardsView({
  currentQ,
  currentIndex,
  totalCount,
  masteredCards = [],
  isCardFlipped,
  setIsCardFlipped,
  onToggleMastered,
  onPrevQuestion,
  onNextQuestion,
  tutoriaIcon = '🌱'
}) {
  if (!currentQ) return null;

  return (
    <div className="flashcard-section-wrapper">
      <div className="flashcard-top-bar">
        <span className="flashcard-index-indicator">
          🃏 Tarjeta <strong>{currentIndex + 1}</strong> de <strong>{totalCount}</strong>
        </span>
        {masteredCards.includes(currentQ.id) && (
          <span className="flashcard-mastered-badge">
            ✓ Dominada
          </span>
        )}
      </div>

      <div className="flashcard-accordion-card">
        {/* Cabecera de la tarjeta */}
        <div className="flashcard-accordion-header">
          <span className="quiz-question-tag">
            {tutoriaIcon} {currentQ.tutoriaTitle}
          </span>
          <span className="flashcard-id-tag">
            Pregunta #{currentQ.id}
          </span>
        </div>

        <h3 className="flashcard-question-title">
          {currentQ.question}
        </h3>

        {/* Opciones disponibles */}
        <div className="flashcard-options-box">
          <div className="flashcard-options-title">
            Opciones de respuesta:
          </div>
          <div className="flashcard-options-list">
            {currentQ.options.map((o) => {
              const isCorrect = isCardFlipped && o.key.toLowerCase() === currentQ.correctAnswer.toLowerCase();
              return (
                <div
                  key={o.key}
                  className={`flashcard-option-item ${isCorrect ? 'is-correct' : ''}`}
                >
                  <strong className="flashcard-option-key">
                    {o.key.toUpperCase()}
                  </strong>
                  <span className="flashcard-option-text">{o.text}</span>
                  {isCorrect && (
                    <span className="flashcard-option-check">✓</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botón Desplegable para ver / ocultar la Respuesta */}
        <div className="flashcard-toggle-wrapper">
          <button
            type="button"
            className={`flashcard-toggle-answer-btn ${isCardFlipped ? 'open' : ''}`}
            onClick={() => setIsCardFlipped(!isCardFlipped)}
          >
            <span>
              {isCardFlipped
                ? '🙈 Ocultar Respuesta y Explicación'
                : '💡 Desplegar Respuesta Oficial y Explicación'}
            </span>
            <span className="flashcard-chevron">{isCardFlipped ? '▲' : '▼'}</span>
          </button>

          {/* Panel Desplegable (Accordion) */}
          {isCardFlipped && (
            <div className="flashcard-answer-panel">
              <div className="flashcard-answer-badge-row">
                <span className="flashcard-correct-badge">
                  ✓ RESPUESTA CORRECTA: OPCIÓN {currentQ.correctAnswer.toUpperCase()}
                </span>
              </div>

              <p className="flashcard-explanation-text">
                {currentQ.explanation}
              </p>

              <div className="flashcard-source-row">
                <span>📁 Código de referencia de Israel:</span>
                <code>{currentQ.tutoriaKey}/Preguntas.java</code>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flashcard Controls */}
      <div className="flashcard-controls-row">
        <button
          className="quiz-action-btn secondary"
          onClick={onPrevQuestion}
          disabled={currentIndex === 0}
        >
          ← Anterior
        </button>
        <button
          className={`quiz-action-btn ${masteredCards.includes(currentQ.id) ? 'secondary' : 'primary'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleMastered(currentQ.id);
          }}
        >
          {masteredCards.includes(currentQ.id) ? '✓ Marcada como Dominada' : '⭐ Marcar como Dominada'}
        </button>
        <button
          className="quiz-action-btn secondary"
          onClick={onNextQuestion}
          disabled={currentIndex === totalCount - 1}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
