import React from 'react';

/**
 * QuizChallengeOverModal
 * Tarjeta de resumen al terminar la partida del modo Desafío (Victoria o Derrota).
 */
export default function QuizChallengeOverModal({
  challengeLives,
  challengePoints,
  maxStreak,
  onRestartChallenge,
  onGoToQuiz
}) {
  return (
    <div className="quiz-active-card quiz-challenge-over-card">
      <div className="quiz-challenge-over-icon">
        {challengeLives > 0 ? '🏆' : '💥'}
      </div>
      <h2 className="quiz-challenge-over-title">
        {challengeLives > 0 ? '¡Desafío Completado con Éxito!' : '¡Fin de la Partida! Te has quedado sin vidas'}
      </h2>
      <p className="quiz-challenge-over-desc">
        Has obtenido <strong>{challengePoints} puntos</strong> con una racha máxima de <strong>{maxStreak} aciertos seguidos</strong>.
      </p>
      <div className="quiz-challenge-buttons-row">
        <button className="quiz-action-btn primary" onClick={onRestartChallenge}>
          ⚡ Jugar Otra Partida
        </button>
        <button className="quiz-action-btn secondary" onClick={onGoToQuiz}>
          🎯 Ir a Modo Quiz Tranquilo
        </button>
      </div>
    </div>
  );
}
