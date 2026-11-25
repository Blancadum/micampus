import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QUIZZES } from '../../../../data/javaStudio/studioData.js';
import { getTheoryTargetForQuiz } from '../../../../data/javaStudio/quizTheoryMapping.js';
import { IconCheckCircle, IconXCircle, IconRefresh } from '../StudioIcons.jsx';

const QUIZ_CAPAS_OPTIONS = [
  { value: 'all', label: 'Todas las Capas' },
  { value: 'patrones', label: 'Patrones GoF & SOLID' },
  { value: 'web', label: 'Capa Web (Controller)' },
  { value: 'service', label: 'Capa de Negocio (Service)' },
  { value: 'repository', label: 'Capa de Persistencia & JPA' },
  { value: 'dto', label: 'Capa de DTOs & Mappers' },
  { value: 'security', label: 'Capa de Seguridad' },
  { value: 'testing', label: 'Capa de Testing & Calidad (Mockito, JaCoCo, Sonar)' },
  { value: 'docker', label: 'Capa de Infraestructura (Docker)' }
];

const QUIZ_FASES_OPTIONS = [
  { value: 'all', label: 'Todas las Fases' },
  { value: 'certificacion-ifcd', label: '🎓 Certificación Java POO & Patrones (30)' },
  { value: 'fase-1', label: 'Fase 1: Petición HTTP' },
  { value: 'fase-2', label: 'Fase 2: Filtro Security & JWT' },
  { value: 'fase-3', label: 'Fase 3: @RestController' },
  { value: 'fase-4', label: 'Fase 4: @Service & Transacciones' },
  { value: 'fase-5', label: 'Fase 5: @Repository & JPA' },
  { value: 'fase-6', label: 'Fase 6: Mapper & DTO' },
  { value: 'fase-7', label: 'Fase 7: ResponseEntity & Status' }
];

export default function StudioQuizTab({ initialSlug = null, onSelectFilter = null }) {
  const location = useLocation();
  const basePath = '/java/studio';
  const [userFilterMode, setUserFilterMode] = useState(null);
  const [userSelectedFilter, setUserSelectedFilter] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // { [quizId]: optionIndex }

  const derivedFilter = useMemo(() => {
    if (!initialSlug) return null;
    const clean = String(initialSlug).toLowerCase().trim();
    if (clean === 'fases' || clean === 'ciclo') {
      return { mode: 'fases', filter: 'all' };
    }
    if (clean === 'ifcd' || clean === 'certificacion') {
      return { mode: 'fases', filter: 'certificacion-ifcd' };
    }
    if (clean === 'patrones' || clean === 'solid') {
      return { mode: 'capas', filter: 'patrones' };
    }
    if (clean.startsWith('fase-')) {
      return { mode: 'fases', filter: clean };
    }
    if (clean === 'jpa') {
      return { mode: 'capas', filter: 'repository' };
    }
    if (clean === 'seguridad') {
      return { mode: 'capas', filter: 'security' };
    }
    if (QUIZ_CAPAS_OPTIONS.some(o => o.value === clean)) {
      return { mode: 'capas', filter: clean };
    }
    return { mode: 'capas', filter: 'all' };
  }, [initialSlug]);

  const filterMode = userFilterMode !== null ? userFilterMode : (derivedFilter?.mode || 'capas');
  const selectedFilter = userSelectedFilter !== null ? userSelectedFilter : (derivedFilter?.filter || 'all');

  const setFilterMode = (m) => {
    setUserFilterMode(m);
  };

  const setSelectedFilter = (f) => {
    setUserSelectedFilter(f);
    if (onSelectFilter) onSelectFilter(f);
  };

  // Filtrado de preguntas
  const filteredQuizzes = useMemo(() => {
    return QUIZZES.filter(q => {
      if (filterMode === 'capas') {
        return selectedFilter === 'all' || q.capa === selectedFilter;
      } else {
        return selectedFilter === 'all' || q.fase === selectedFilter;
      }
    });
  }, [filterMode, selectedFilter]);

  // Estadísticas
  const answeredCount = useMemo(() => {
    return filteredQuizzes.filter(q => userAnswers[q.id] !== undefined).length;
  }, [filteredQuizzes, userAnswers]);

  const correctCount = useMemo(() => {
    return filteredQuizzes.filter(q => userAnswers[q.id] === q.correcta).length;
  }, [filteredQuizzes, userAnswers]);

  const handleSelectOption = (quizId, optionIndex) => {
    // Si ya respondió, permitir cambiar o mantener
    setUserAnswers(prev => ({
      ...prev,
      [quizId]: optionIndex
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
  };

  const optionsList = filterMode === 'capas' ? QUIZ_CAPAS_OPTIONS : QUIZ_FASES_OPTIONS;

  return (
    <div className="studio-quiz-container">
      {/* CABECERA COMPACTA DE QUIZ */}
      <div className="studio-card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.25rem', borderLeft: '5px solid #6d28d9', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', letterSpacing: '0.5px' }}>
              Simulador de Examen & Evaluación
            </span>
            <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              Quiz de Arquitectura & Ciclo de Vida Spring Boot
            </h2>
          </div>

          {/* MARCADOR DE PUNTUACIÓN */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginRight: '0.4rem' }}>
                Aciertos:
              </span>
              <strong style={{ fontSize: '0.92rem', color: correctCount > 0 ? '#059669' : '#0f172a' }}>
                {correctCount} / {answeredCount}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleResetQuiz}
              className="studio-btn-secondary"
              title="Reiniciar respuestas del quiz"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            >
              <IconRefresh size={14} /> Reiniciar
            </button>
          </div>
        </div>

        {/* MODO TOGGLE (CAPAS VS FASES) + BARRA DE APARTADOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              type="button"
              onClick={() => { setFilterMode('capas'); setSelectedFilter('all'); }}
              style={{
                fontSize: '0.78rem',
                padding: '0.28rem 0.65rem',
                borderRadius: '6px',
                border: filterMode === 'capas' ? '1px solid #6d28d9' : '1px solid #e2e8f0',
                background: filterMode === 'capas' ? '#6d28d9' : '#ffffff',
                color: filterMode === 'capas' ? '#ffffff' : '#475569',
                fontWeight: filterMode === 'capas' ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              Por Capas (Arquitectura)
            </button>
            <button
              type="button"
              onClick={() => { setFilterMode('fases'); setSelectedFilter('all'); }}
              style={{
                fontSize: '0.78rem',
                padding: '0.28rem 0.65rem',
                borderRadius: '6px',
                border: filterMode === 'fases' ? '1px solid #6d28d9' : '1px solid #e2e8f0',
                background: filterMode === 'fases' ? '#6d28d9' : '#ffffff',
                color: filterMode === 'fases' ? '#ffffff' : '#475569',
                fontWeight: filterMode === 'fases' ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              Por Fases (Ciclo HTTP)
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              overflowX: 'auto',
              padding: '0.45rem 0.65rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }}
          >
            {(filterMode === 'capas' ? QUIZ_CAPAS_OPTIONS : QUIZ_FASES_OPTIONS).map((opt) => {
              const isSelected = selectedFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedFilter(opt.value)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.28rem 0.6rem',
                    borderRadius: '6px',
                    border: isSelected ? '1px solid #6d28d9' : '1px solid #e2e8f0',
                    background: isSelected ? '#6d28d9' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#475569',
                    fontSize: '0.77rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: isSelected ? '0 1px 4px rgba(109, 40, 217, 0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
                    transition: 'all 0.12s ease'
                  }}
                >
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TÍTULO PRINCIPAL FUERA DE LA CAJA */}
      <h1 style={{ margin: '1.25rem 0 1rem 0', fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
        Preguntas de Evaluación Técnica ({filteredQuizzes.length})
      </h1>

      {/* BANCO DE PREGUNTAS A ANCHO COMPLETO */}
      <div style={{ width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredQuizzes.map((quiz, qIdx) => {
          const selectedAns = userAnswers[quiz.id];
          const hasAnswered = selectedAns !== undefined;
          const isCorrect = hasAnswered && selectedAns === quiz.correcta;

          return (
            <div
              key={quiz.id}
              className="studio-card"
              style={{
                borderLeft: hasAnswered
                  ? (isCorrect ? '5px solid #10b981' : '5px solid #ef4444')
                  : '5px solid #cbd5e1',
                padding: '1.25rem 1.4rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span className="studio-badge studio-badge-purple" style={{ fontWeight: 800 }}>
                    Pregunta #{qIdx + 1}
                  </span>
                  <span className="studio-badge studio-badge-blue" style={{ fontSize: '0.72rem' }}>
                    {quiz.capaNombre}
                  </span>
                  <span className="studio-badge studio-badge-amber" style={{ fontSize: '0.72rem' }}>
                    {quiz.faseNombre}
                  </span>
                </div>

                {hasAnswered && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 700, color: isCorrect ? '#059669' : '#dc2626' }}>
                    {isCorrect ? <IconCheckCircle /> : <IconXCircle />}
                    <span>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</span>
                  </div>
                )}
              </div>

              <h3 style={{ margin: '0.3rem 0 0.85rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.45 }}>
                {quiz.pregunta}
              </h3>

              {/* OPCIONES DE RESPUESTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {quiz.opciones.map((opt, oIdx) => {
                  let btnBg = '#ffffff';
                  let btnBorder = '#e2e8f0';
                  let btnColor = '#334155';
                  let prefixBadgeBg = '#f1f5f9';
                  let prefixBadgeColor = '#64748b';

                  if (hasAnswered) {
                    if (oIdx === quiz.correcta) {
                      btnBg = 'rgba(16, 185, 129, 0.1)';
                      btnBorder = '#10b981';
                      btnColor = '#065f46';
                      prefixBadgeBg = '#10b981';
                      prefixBadgeColor = '#ffffff';
                    } else if (oIdx === selectedAns) {
                      btnBg = 'rgba(239, 68, 68, 0.1)';
                      btnBorder = '#ef4444';
                      btnColor = '#991b1b';
                      prefixBadgeBg = '#ef4444';
                      prefixBadgeColor = '#ffffff';
                    }
                  } else if (selectedAns === oIdx) {
                    btnBg = 'rgba(109, 40, 217, 0.08)';
                    btnBorder = '#6d28d9';
                    btnColor = '#6d28d9';
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
                        gap: '0.75rem',
                        padding: '0.7rem 0.9rem',
                        borderRadius: '8px',
                        border: `1px solid ${btnBorder}`,
                        background: btnBg,
                        color: btnColor,
                        fontSize: '0.88rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        lineHeight: 1.5,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          borderRadius: '4px',
                          background: prefixBadgeBg,
                          color: prefixBadgeColor,
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          flexShrink: 0,
                          marginTop: '0.1rem'
                        }}
                      >
                        {letter}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* EXPLICACIÓN DETALLADA TRAS RESPONDER */}
              {hasAnswered && quiz.explicacion && (
                <div style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #6d28d9', fontSize: '0.86rem', color: '#475569', lineHeight: 1.6 }}>
                  <strong style={{ color: '#6d28d9', display: 'block', marginBottom: '0.25rem' }}>
                    💡 Explicación de Arquitectura:
                  </strong>
                  {quiz.explicacion}
                </div>
              )}

              {/* VINCULACIÓN BIDIRECCIONAL CON LA TEORÍA Y POO */}
              {(() => {
                const theoryTarget = getTheoryTargetForQuiz(quiz.id);
                if (!theoryTarget) return null;
                const primaryHref = theoryTarget.type === 'book'
                  ? `${basePath}/libro/${theoryTarget.targetId}`
                  : `${basePath}/poo/${theoryTarget.targetId}`;
                const secondaryHref = theoryTarget.secondaryUrl
                  ? (theoryTarget.type === 'book' ? `${basePath}/poo/${theoryTarget.pooTargetId}` : `${basePath}/libro/${theoryTarget.bookTargetId}`)
                  : null;

                return (
                  <div
                    style={{
                      marginTop: '0.9rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      <span style={{ fontWeight: 600 }}>Fundamento Teórico:</span>{' '}
                      <span style={{ color: '#0f172a', fontWeight: 700 }}>{theoryTarget.topic || theoryTarget.label}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <Link
                        to={primaryHref}
                        className="studio-btn-secondary"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.65rem',
                          borderColor: '#6d28d9',
                          color: '#6d28d9',
                          fontWeight: 700,
                          textDecoration: 'none',
                          background: 'rgba(109, 40, 217, 0.05)'
                        }}
                      >
                        📖 {theoryTarget.type === 'book' ? 'Estudiar Capítulo' : 'Estudiar Lección POO'} →
                      </Link>

                      {secondaryHref && (
                        <Link
                          to={secondaryHref}
                          className="studio-btn-secondary"
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.3rem 0.65rem',
                            borderColor: '#0284c7',
                            color: '#0284c7',
                            fontWeight: 600,
                            textDecoration: 'none',
                            background: 'rgba(2, 132, 199, 0.05)'
                          }}
                        >
                          {theoryTarget.type === 'book' ? '🔍 Ver en Lección POO' : '📗 Ver en Libro'} →
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
