import React from 'react';

/**
 * QuizChallengeHud
 * Barra de estado del modo Desafío Contrarreloj (Vidas, Cronómetro y Puntuación con combos).
 */
export default function QuizChallengeHud({
  challengeLives,
  challengeTimeLeft,
  streak,
  challengePoints
}) {
  return (
    <div className="quiz-challenge-hud">
      <div className="quiz-lives">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={`quiz-challenge-life ${i < challengeLives ? 'active' : 'dimmed'}`}>
            ❤️
          </span>
        ))}
      </div>
      <div className={`quiz-timer-pill ${challengeTimeLeft <= 10 ? 'urgent' : ''}`}>
        ⏱️ {challengeTimeLeft}s
      </div>
      <div className="quiz-challenge-points-group">
        {streak > 1 && (
          <span className="quiz-combo-badge">🔥 x{Math.min(streak, 3)}</span>
        )}
        <span className="quiz-challenge-points-text">
          {challengePoints} pts
        </span>
      </div>
    </div>
  );
}
