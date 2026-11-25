import React from 'react';

/**
 * QuizSurveyView
 * Vista interactiva de autoevaluación 1-5 estrellas por cada tema troncal de las tutorías.
 */
export default function QuizSurveyView({
  data = [],
  surveyRatings = {},
  onRateTutoria,
  onResetTutoriaRating,
  onResetAllRatings,
  onLaunchTutoriaQuiz
}) {
  const hasAnyRating = Object.values(surveyRatings).some(r => r > 0);

  return (
    <div>
      <div className="quiz-active-card survey-hero-card">
        <div className="survey-hero-info">
          <h2 className="survey-hero-title">📊 Encuesta de Autoevaluación por Bloques</h2>
          <p className="survey-hero-desc">
            Puntúa tu nivel de confianza y soltura práctica (de 1 a 5 estrellas) en cada uno de los temas troncales de las tutorías. Te indicará qué temas tienes consolidados y cuáles requieren un repaso en código.
          </p>
        </div>
        {hasAnyRating && (
          <button
            type="button"
            onClick={onResetAllRatings}
            className="survey-reset-all-btn"
            title="Restablecer todas las valoraciones a 0 estrellas"
          >
            <span>🔄</span>
            <span>Restablecer todas</span>
          </button>
        )}
      </div>

      <div className="survey-grid">
        {data.map(item => {
          const currentRating = surveyRatings[item.meta.id] || 0;
          return (
            <div key={item.meta.id} className="survey-card">
              <div>
                <div className="survey-card-header">
                  <span className="survey-card-icon">{item.meta.icon}</span>
                  <h3 className="survey-card-title">
                    {item.meta.title}
                  </h3>
                </div>
                <p className="survey-card-topic">
                  {item.meta.topic}
                </p>
                <div className="survey-card-qcount">
                  {item.questions.length} preguntas en el banco
                </div>
              </div>

              <div>
                <div className="survey-card-controls-row">
                  <div className="survey-rating-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`survey-star ${star <= currentRating ? 'active' : ''}`}
                        onClick={() => onRateTutoria(item.meta.id, star)}
                        title={star === currentRating ? 'Clic para quitar valoración (Reset)' : `${star} estrellas`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  {currentRating > 0 && (
                    <button
                      type="button"
                      onClick={() => onResetTutoriaRating(item.meta.id)}
                      className="survey-reset-btn"
                      title="Restablecer valoración de esta tutoría"
                    >
                      <span>🔄</span>
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                <div className="survey-card-footer">
                  <span className="survey-card-status-label">
                    {currentRating === 0
                      ? 'Sin calificar'
                      : `${currentRating}/5 ${currentRating >= 4 ? '🟢 Dominado' : currentRating >= 3 ? '🟡 Regular' : '🔴 Reforzar'}`}
                  </span>
                  <button
                    onClick={() => onLaunchTutoriaQuiz(item.meta.id)}
                    className="survey-card-quiz-link"
                  >
                    Hacer Quiz →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
