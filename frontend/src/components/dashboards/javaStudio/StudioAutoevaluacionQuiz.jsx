import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconCheckCircle, IconXCircle, IconRefresh, IconCheckSquare } from './StudioIcons.jsx';
import { getTheoryTargetForQuiz } from '../../../data/javaStudio/quizTheoryMapping.js';

export default function StudioAutoevaluacionQuiz({
  quizzes = [],
  title = 'Autoevaluación Técnica del Tema',
  subtitle = 'Preguntas oficiales del cuestionario vinculadas a los conceptos de esta lección.',
  accentColor = '#6d28d9',
  quizBaseUrl = '/java/studio/quiz'
}) {
  const [userAnswers, setUserAnswers] = useState({}); // { [quizId]: optionIndex }

  if (!quizzes || quizzes.length === 0) return null;

  const totalAnswered = Object.keys(userAnswers).length;
  const correctCount = quizzes.filter(
    (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] === q.correcta
  ).length;

  const handleSelectOption = (quizId, optIdx) => {
    // Si ya respondió, permitir cambiar la respuesta para practicar
    setUserAnswers((prev) => ({
      ...prev,
      [quizId]: optIdx
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
  };

  return (
    <div
      style={{
        marginTop: '2.25rem',
        paddingTop: '1.75rem',
        borderTop: '1px solid #e2e8f0',
        marginBottom: '1rem'
      }}
    >
      {/* HEADER DE AUTOEVALUACIÓN */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `rgba(${accentColor === '#ea580c' ? '234, 88, 12' : '109, 40, 217'}, 0.1)`,
              color: accentColor
            }}
          >
            <IconCheckSquare size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              {title}
            </h4>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {quizzes.length} pregunta{quizzes.length > 1 ? 's' : ''} oficial{quizzes.length > 1 ? 'es' : ''} de evaluación
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {totalAnswered > 0 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.65rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: correctCount === totalAnswered ? 'rgba(16, 185, 129, 0.12)' : 'rgba(234, 88, 12, 0.1)',
                color: correctCount === totalAnswered ? '#059669' : '#c2410c'
              }}
            >
              <span>Aciertos: {correctCount}/{totalAnswered}</span>
              <button
                type="button"
                onClick={handleReset}
                title="Reiniciar respuestas"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'inline-flex',
                  color: 'inherit'
                }}
              >
                <IconRefresh size={13} />
              </button>
            </div>
          )}

          <Link
            to={quizBaseUrl}
            className="studio-btn-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '0.35rem 0.75rem',
              borderColor: accentColor,
              color: accentColor,
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Abrir Simulador ↗
          </Link>
        </div>
      </div>

      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.86rem', color: '#475569', lineHeight: 1.55 }}>
        {subtitle}
      </p>

      {/* LISTADO DE PREGUNTAS INTERACTIVAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {quizzes.map((quiz, qIdx) => {
          const selectedAns = userAnswers[quiz.id];
          const hasAnswered = selectedAns !== undefined;
          const isCorrect = hasAnswered && selectedAns === quiz.correcta;

          return (
            <div
              key={quiz.id}
              style={{
                background: '#f8fafc',
                border: hasAnswered
                  ? (isCorrect ? '1.5px solid #10b981' : '1.5px solid #ef4444')
                  : '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1.15rem 1.35rem',
                transition: 'all 0.15s ease'
              }}
            >
              {/* HEADER DE PREGUNTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      background: accentColor,
                      color: '#ffffff'
                    }}
                  >
                    Pregunta #{qIdx + 1} (ID {quiz.id})
                  </span>
                  {quiz.capaNombre && (
                    <span className="studio-badge studio-badge-blue" style={{ fontSize: '0.7rem' }}>
                      {quiz.capaNombre}
                    </span>
                  )}
                  {quiz.faseNombre && (
                    <span className="studio-badge studio-badge-amber" style={{ fontSize: '0.7rem' }}>
                      {quiz.faseNombre}
                    </span>
                  )}
                </div>

                {hasAnswered && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: isCorrect ? '#059669' : '#dc2626'
                    }}
                  >
                    {isCorrect ? <IconCheckCircle size={15} /> : <IconXCircle size={15} />}
                    <span>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</span>
                  </div>
                )}
              </div>

              {/* ENUNCIADO */}
              <div
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  lineHeight: 1.45,
                  marginBottom: '0.85rem'
                }}
              >
                {quiz.pregunta}
              </div>

              {/* OPCIONES */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {quiz.opciones.map((opt, oIdx) => {
                  let optBg = '#ffffff';
                  let optBorder = '#e2e8f0';
                  let optColor = '#334155';
                  let badgeBg = '#f1f5f9';
                  let badgeColor = '#64748b';

                  if (hasAnswered) {
                    if (oIdx === quiz.correcta) {
                      optBg = 'rgba(16, 185, 129, 0.12)';
                      optBorder = '#10b981';
                      optColor = '#065f46';
                      badgeBg = '#10b981';
                      badgeColor = '#ffffff';
                    } else if (oIdx === selectedAns) {
                      optBg = 'rgba(239, 68, 68, 0.12)';
                      optBorder = '#ef4444';
                      optColor = '#991b1b';
                      badgeBg = '#ef4444';
                      badgeColor = '#ffffff';
                    }
                  } else if (selectedAns === oIdx) {
                    optBg = 'rgba(109, 40, 217, 0.08)';
                    optBorder = accentColor;
                    optColor = accentColor;
                  }

                  const letter = String.fromCharCode(65 + oIdx);

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(quiz.id, oIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '6px',
                        border: `1px solid ${optBorder}`,
                        background: optBg,
                        color: optColor,
                        fontSize: '0.85rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        lineHeight: 1.45,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: badgeBg,
                          color: badgeColor,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          flexShrink: 0,
                          marginTop: '0.1rem'
                        }}
                      >
                        {letter}
                      </span>
                      <span style={{ flex: 1 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* EXPLICACIÓN TRAS RESPONDER */}
              {hasAnswered && quiz.explicacion && (
                <div
                  style={{
                    marginTop: '0.8rem',
                    padding: '0.75rem 0.95rem',
                    background: '#ffffff',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${accentColor}`,
                    border: '1px solid #e2e8f0',
                    fontSize: '0.84rem',
                    color: '#334155',
                    lineHeight: 1.55
                  }}
                >
                  <strong style={{ color: accentColor, display: 'block', marginBottom: '0.2rem', fontSize: '0.82rem' }}>
                    💡 Explicación de Arquitectura:
                  </strong>
                  {quiz.explicacion}
                </div>
              )}

              {/* ENLACES DIRECTOS A LA TEORÍA PARA REPASAR CONTENIDOS */}
              {(() => {
                const theory = getTheoryTargetForQuiz(quiz.id);
                if (!theory) return null;

                return (
                  <div
                    style={{
                      marginTop: '0.85rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#475569' }}>
                      <span style={{ fontSize: '0.95rem' }}>📖</span>
                      <span>
                        <strong style={{ color: '#6d28d9' }}>Repasar Teoría:</strong>{' '}
                        {theory.topic || theory.label}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <Link
                        to={theory.primaryUrl}
                        style={{
                          fontSize: '0.74rem',
                          padding: '0.28rem 0.65rem',
                          borderRadius: '6px',
                          background: '#6d28d9',
                          color: '#ffffff',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <span>{theory.label} ↗</span>
                      </Link>

                      {theory.secondaryUrl && (
                        <Link
                          to={theory.secondaryUrl}
                          style={{
                            fontSize: '0.74rem',
                            padding: '0.28rem 0.65rem',
                            borderRadius: '6px',
                            background: '#ffffff',
                            border: '1px solid #c4b5fd',
                            color: '#6d28d9',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <span>{theory.secondaryLabel} ↗</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
