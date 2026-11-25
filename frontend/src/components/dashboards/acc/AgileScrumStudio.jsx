import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AGILE_SCRUM_THEORY, AGILE_SCRUM_QUESTIONS, SALA_ESTUDIO_FILES, GIT_AGILE_GUIDE } from '../../../data/acc/agileScrumData.js';
import './AgileScrumStudio.css';

export default function AgileScrumStudio({ isEmbedded = false, initialTab = null, hideNav = false }) {
  const location = useLocation();
  const { tab: urlTab } = useParams();

  // Resolver pestaña activa
  const resolvedTab = useMemo(() => {
    const raw = initialTab || urlTab || 'marco';
    const clean = String(raw).toLowerCase().trim();
    if (clean.includes('rol') || clean === 'marco') return 'marco';
    if (clean.includes('ceremonia') || clean.includes('evento') || clean === 'daily' || clean === 'sprint') return 'ceremonias';
    if (clean.includes('artefact') || clean === 'dod') return 'artefactos';
    if (clean.includes('simula') || clean.includes('quiz') || clean.includes('test') || clean.includes('pregunt')) return 'simulador';
    if (clean.includes('repaso') || clean.includes('chuleta') || clean.includes('cascada')) return 'repaso';
    if (clean.includes('git') || clean.includes('github') || clean.includes('backup') || clean.includes('version')) return 'git';
    if (clean.includes('video') || clean.includes('multimedia') || clean.includes('recurso')) return 'multimedia';
    return 'marco';
  }, [initialTab, urlTab]);

  const [activeTab, setActiveTab] = useState(resolvedTab);

  useEffect(() => {
    setActiveTab(resolvedTab);
  }, [resolvedTab]);
  
  // Estado del Quiz Interactivo
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: optionIndex }
  const [quizFilter, setQuizFilter] = useState('all'); // 'all' | 'Roles' | 'Ceremonias' | 'Artefactos'

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
  };

  const totalQuestions = AGILE_SCRUM_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = useMemo(() => {
    return Object.entries(userAnswers).reduce((acc, [qId, optIdx]) => {
      const q = AGILE_SCRUM_QUESTIONS.find(item => item.id === Number(qId));
      if (q && q.opciones[optIdx] && q.opciones[optIdx].correct) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [userAnswers]);

  const filteredQuestions = useMemo(() => {
    if (quizFilter === 'all') return AGILE_SCRUM_QUESTIONS;
    return AGILE_SCRUM_QUESTIONS.filter(q => q.tema.toLowerCase().includes(quizFilter.toLowerCase()));
  }, [quizFilter]);

  return (
    <div className={`agile-studio-container ${isEmbedded ? 'embedded' : ''}`}>
      {/* CABECERA (solo si no está embebido en JavaStudio) */}
      {!isEmbedded && (
        <header className="agile-studio-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div className="agile-header-badge" style={{ margin: 0 }}>
              <span>🏃</span>
              <span>Sala de Estudio · Metodologías Ágiles</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                to="/java/studio"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.25)'
                }}
              >
                ← Java Studio
              </Link>
              <Link
                to="/java/studio/agile"
                style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.35)'
                }}
              >
                ☕ Abrir en Java Studio
              </Link>
            </div>
          </div>
          <h1 className="agile-studio-title">Metodologías Ágiles & Marco Scrum</h1>
          <p className="agile-studio-subtitle">
            Guía completa de preparación técnica para evaluaciones y proyectos de software: roles clave, ciclo de vida del Sprint, artefactos, definición de terminado (DoD) y simulador oficial de examen.
          </p>

          <div className="agile-kpi-bar">
            <div className="agile-kpi-pill">
              <span>👥</span>
              <span><strong>3 Roles</strong> (PO, SM, Developers)</span>
            </div>
            <div className="agile-kpi-pill">
              <span>⏱️</span>
              <span><strong>5 Eventos</strong> (Sprint, Daily 15m...)</span>
            </div>
            <div className="agile-kpi-pill">
              <span>📦</span>
              <span><strong>3 Artefactos</strong> + Compromisos</span>
            </div>
            <div className="agile-kpi-pill">
              <span>📝</span>
              <span><strong>10 Preguntas</strong> Oficiales</span>
            </div>
            <div className="agile-kpi-pill">
              <span>🎥</span>
              <span><strong>1 Vídeo</strong> Sala de Estudio</span>
            </div>
          </div>
        </header>
      )}

      {/* BARRA DE NAVEGACIÓN POR PESTAÑAS (Oculta si se usa menú lateral StudioItemListMenu) */}
      {!hideNav && (
        <nav className="agile-nav-bar" aria-label="Navegación de Metodologías Ágiles">
        <button
          type="button"
          onClick={() => setActiveTab('marco')}
          className={`agile-nav-btn ${activeTab === 'marco' ? 'active' : ''}`}
        >
          <span>🏃</span>
          <span>1. Marco & Roles</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ceremonias')}
          className={`agile-nav-btn ${activeTab === 'ceremonias' ? 'active' : ''}`}
        >
          <span>⏱️</span>
          <span>2. 5 Ceremonias</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('artefactos')}
          className={`agile-nav-btn ${activeTab === 'artefactos' ? 'active' : ''}`}
        >
          <span>📦</span>
          <span>3. Artefactos & DoD</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('simulador')}
          className={`agile-nav-btn ${activeTab === 'simulador' ? 'active' : ''}`}
        >
          <span>📝</span>
          <span>4. Simulador Examen ({correctCount}/{totalQuestions})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('repaso')}
          className={`agile-nav-btn ${activeTab === 'repaso' ? 'active' : ''}`}
        >
          <span>📋</span>
          <span>5. Hoja Resumen & Chuleta</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('git')}
          className={`agile-nav-btn ${activeTab === 'git' ? 'active' : ''}`}
        >
          <span>🐙</span>
          <span>6. Git & GitHub Ágil</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('multimedia')}
          className={`agile-nav-btn ${activeTab === 'multimedia' ? 'active' : ''}`}
        >
          <span>🎥</span>
          <span>7. Sala Multimedia & Recursos</span>
        </button>
        </nav>
      )}

      {/* PESTAÑA 1: MARCO & ROLES */}
      {activeTab === 'marco' && (
        <section>
          {/* Fundamentos & Empirismo */}
          <div className="agile-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🧠</span>
              <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
                Empirismo: Los Tres Pilares de Scrum
              </h2>
            </div>
            <p style={{ margin: '0 0 1.2rem 0', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {AGILE_SCRUM_THEORY.fundamentos.definicion}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {AGILE_SCRUM_THEORY.fundamentos.pilares.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.1rem',
                    borderRadius: '12px',
                    background: 'var(--bg-subtle, #f8fafc)',
                    border: '1px solid var(--border-subtle, #e2e8f0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{p.icon}</span>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--text-title)' }}>{p.nombre}</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 5 Valores Scrum */}
            <div style={{ marginTop: '1.4rem', borderTop: '1px solid var(--border-subtle, #e2e8f0)', paddingTop: '1.1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 750, margin: '0 0 0.75rem 0', color: 'var(--text-title)' }}>
                ⭐ Los 5 Valores Fundamentales de Scrum:
              </h3>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {AGILE_SCRUM_THEORY.fundamentos.valores.map((v, idx) => (
                  <span
                    key={idx}
                    title={v.desc}
                    style={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: '#4f46e5',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700
                    }}
                  >
                    {v.nombre}: <span style={{ fontWeight: 500, color: 'var(--text-title)' }}>{v.desc}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Los 3 Roles del Scrum Team */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: 'var(--text-title)' }}>
              👥 El Scrum Team: Tres Roles, Cero Jerarquías
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Dentro de Scrum no existen subequipos ni jefes de proyecto tradicionales. El equipo es transversal, multifuncional y responsable único del valor entregado.
            </p>
          </div>

          <div className="agile-roles-grid">
            {AGILE_SCRUM_THEORY.roles.map((role) => (
              <div
                key={role.id}
                className="agile-role-box"
                style={{
                  background: role.bgGradient,
                  border: `1.5px solid ${role.borderColor}`
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>{role.icon}</span>
                    <span
                      style={{
                        background: role.tagColor,
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {role.badge}
                    </span>
                  </div>
                  <h3 style={{ margin: '0.2rem 0 0.4rem 0', fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-title)' }}>
                    {role.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>
                    {role.mision}
                  </p>
                </div>

                {/* Responsabilidades */}
                <div style={{ background: 'var(--bg-card, #ffffff)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-title)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ✅ Responsabilidades Clave:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-title)', lineHeight: 1.55 }}>
                    {role.responsabilidades.map((r, idx) => (
                      <li key={idx} style={{ marginBottom: '0.35rem' }}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Lo que NO hace (Anti-patrones de examen) */}
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#dc2626', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🚫 Lo que NUNCA debe hacer:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#991b1b', lineHeight: 1.55 }}>
                    {role.queNoHace.map((no, idx) => (
                      <li key={idx} style={{ marginBottom: '0.35rem' }}>{no}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PESTAÑA 2: 5 CEREMONIAS */}
      {activeTab === 'ceremonias' && (
        <section>
          <div className="agile-card" style={{ marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              ⏱️ Los 5 Eventos Formales de Scrum
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Cada evento en Scrum tiene un propósito específico y está <strong>acotado en el tiempo (Timebox)</strong> para evitar reuniones interminables y maximizar la sincronización de valor.
            </p>
          </div>

          <div className="agile-ceremonies-list">
            {AGILE_SCRUM_THEORY.eventos.map((ev) => (
              <div key={ev.id} className="agile-ceremony-card" style={{ borderLeft: `5px solid ${ev.tagColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.6rem' }}>{ev.icon}</span>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      {ev.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(0,0,0,0.06)', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)' }}>
                      ⏱️ Timebox: {ev.timebox}
                    </span>
                    <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#4338ca', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      👥 {ev.participantes}
                    </span>
                  </div>
                </div>

                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {ev.proposito}
                </p>

                {/* Preguntas clave (si es Planning) */}
                {ev.preguntasClave && (
                  <div style={{ background: 'var(--bg-subtle, #f8fafc)', padding: '1rem', borderRadius: '10px', marginTop: '0.4rem' }}>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-title)', display: 'block', marginBottom: '0.4rem' }}>
                      Las 3 Preguntas Fundamentales del Sprint Planning:
                    </strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {ev.preguntasClave.map((pq, idx) => (
                        <div key={idx} style={{ fontSize: '0.85rem' }}>
                          <span style={{ fontWeight: 750, color: '#2563eb' }}>{pq.q}</span> → <span style={{ color: 'var(--text-title)' }}>{pq.a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reglas de oro */}
                {ev.reglas && (
                  <div style={{ marginTop: '0.4rem' }}>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--text-title)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Reglas Oficiales:
                    </strong>
                    <ul style={{ margin: '0.3rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-title)', lineHeight: 1.55 }}>
                      {ev.reglas.map((r, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem' }}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PESTAÑA 3: ARTEFACTOS & DEFINITION OF DONE */}
      {activeTab === 'artefactos' && (
        <section>
          <div className="agile-card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              📦 Los 3 Artefactos de Scrum y sus Compromisos
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Cada artefacto contiene un <strong>compromiso explícito</strong> para garantizar la transparencia y el enfoque en el resultado final utilizable.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {AGILE_SCRUM_THEORY.artefactos.map((art) => (
              <div
                key={art.id}
                className="agile-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                  borderTop: '4px solid #6366f1'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>{art.icon}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>
                      Compromiso Formal:
                    </span>
                    <div style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.88rem' }}>
                      🎯 {art.compromiso}
                    </div>
                  </div>
                </div>

                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-title)' }}>
                  {art.nombre}
                </h3>

                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {art.desc}
                </p>

                <div style={{ background: 'var(--bg-subtle, #f8fafc)', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.84rem', color: 'var(--text-title)', lineHeight: 1.5, border: '1px solid var(--border-subtle, #e2e8f0)', marginTop: 'auto' }}>
                  <strong>Detalle Operativo:</strong> {art.detalles}
                </div>
              </div>
            ))}
          </div>

          {/* Deep dive Definition of Done (DoD) */}
          <div className="agile-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.02) 100%)', border: '1.5px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem' }}>✅</span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 850, color: '#047857' }}>
                Definition of Done (DoD): El Contrato Innegociable de Calidad
              </h3>
            </div>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-title)', lineHeight: 1.55 }}>
              La <strong>Definition of Done</strong> es una descripción formal del estado del Incremento cuando cumple con las medidas de calidad requeridas para el producto. En el momento en que un elemento del Product Backlog cumple la Definición de Hecho, nace formalmente un <strong>Incremento</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
              {[
                { t: 'Código Limpio & Estilo', d: 'Respeta convenciones del equipo, sin código muerto ni warnings críticos.' },
                { t: 'Tests Unitarios & Cobertura', d: 'Tests con Mockito y JUnit aprobados (ej. mínimo 80% cobertura).' },
                { t: 'Revisión por Pares (Pull Request)', d: 'Al menos un compañero ha validado el merge a la rama principal.' },
                { t: 'Documentación OpenAPI', d: 'Endpoints REST descritos con @Operation y esquemas DTO claros.' },
                { t: 'Cero Regresiones', d: 'Compila en Jenkins / GitHub Actions y corre en Docker sin fallos.' }
              ].map((c, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card, #ffffff)', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <strong style={{ fontSize: '0.86rem', color: '#065f46', display: 'block', marginBottom: '0.2rem' }}>
                    ✓ {c.t}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 4: SIMULADOR EXAMEN (10 PREGUNTAS INTERACTIVAS) */}
      {activeTab === 'simulador' && (
        <section>
          {/* HUD de Puntuación */}
          <div className="agile-quiz-score-bar">
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#065f46', letterSpacing: '0.5px' }}>
                🎯 Progreso del Simulador
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 850, color: '#047857' }}>
                {correctCount} de {totalQuestions} Acertadas ({answeredCount}/{totalQuestions} respondidas)
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Filtro por tema */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {['all', 'Roles', 'Ceremonias', 'Artefactos'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setQuizFilter(f)}
                    style={{
                      background: quizFilter === f ? '#047857' : 'rgba(4, 120, 87, 0.1)',
                      color: quizFilter === f ? '#ffffff' : '#047857',
                      border: '1px solid rgba(4, 120, 87, 0.3)',
                      borderRadius: '8px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {f === 'all' ? 'Todas (10)' : f}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleResetQuiz}
                style={{
                  background: '#ffffff',
                  color: '#dc2626',
                  border: '1.5px solid #f87171',
                  borderRadius: '8px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.82rem',
                  fontWeight: 750,
                  cursor: 'pointer'
                }}
              >
                🔄 Reiniciar
              </button>
            </div>
          </div>

          {/* Listado de Preguntas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredQuestions.map((q) => {
              const selectedOptIdx = userAnswers[q.id];
              const isAnswered = selectedOptIdx !== undefined;
              const isCorrect = isAnswered && q.opciones[selectedOptIdx]?.correct;

              return (
                <article key={q.id} className="agile-quiz-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          background: '#4338ca',
                          color: '#ffffff',
                          fontWeight: 850,
                          fontSize: '0.78rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px'
                        }}
                      >
                        Q{q.id}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {q.tema} · {q.difficulty}
                      </span>
                    </div>

                    {isAnswered && (
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: isCorrect ? '#059669' : '#dc2626'
                        }}
                      >
                        {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                      </span>
                    )}
                  </div>

                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: 1.45 }}>
                    {q.pregunta}
                  </h3>

                  {/* Opciones de respuesta */}
                  <div>
                    {q.opciones.map((opt, optIdx) => {
                      const isSelected = selectedOptIdx === optIdx;
                      let btnClass = 'agile-option-btn';
                      if (isAnswered) {
                        if (opt.correct) {
                          btnClass += ' selected-correct';
                        } else if (isSelected && !opt.correct) {
                          btnClass += ' selected-incorrect';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          className={btnClass}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                        >
                          <span style={{ fontWeight: 800, minWidth: '20px' }}>
                            {String.fromCharCode(65 + optIdx)})
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explicación Técnica tras responder */}
                  {isAnswered && (
                    <div className="agile-explanation-box">
                      <strong style={{ display: 'block', color: '#4338ca', marginBottom: '0.25rem', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        💡 Justificación de la Guía Oficial Scrum:
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-title)', lineHeight: 1.55 }}>
                        {q.explicacion}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* PESTAÑA 5: HOJA RESUMEN & CHULETA */}
      {activeTab === 'repaso' && (
        <section>
          {/* Comparativa Cascada vs Ágil */}
          <div className="agile-card">
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              ⚖️ Cascada (Waterfall) vs Metodologías Ágiles (Scrum)
            </h2>
            <p style={{ margin: '0 0 1.2rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Comparativa fundamental sobre gestión de riesgos, cambio de requisitos y ciclos de entrega.
            </p>

            <div className="agile-table-wrap">
              <table className="agile-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Aspecto de Ingeniería</th>
                    <th style={{ width: '39%' }}>Modelo Cascada Tradicional</th>
                    <th style={{ width: '39%', color: '#4338ca' }}>Marco Ágil / Scrum</th>
                  </tr>
                </thead>
                <tbody>
                  {AGILE_SCRUM_THEORY.comparativaCascadaVsAgil.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 750 }}>{row.aspecto}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{row.cascada}</td>
                      <td style={{ color: '#312e81', fontWeight: 600, background: 'rgba(99, 102, 241, 0.03)' }}>
                        {row.agil}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 8 Trucos y Anti-patrones que caen en Exámenes */}
          <div className="agile-card" style={{ borderTop: '4px solid #ea580c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🚨</span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 850, color: '#c2410c' }}>
                8 Preguntas Trampa Frecuentes en Certificaciones y Exámenes
              </h3>
            </div>
            <p style={{ margin: '0 0 1.1rem 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Memoriza estas distinciones para no fallar preguntas capciosas de opción múltiple:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '0.85rem' }}>
              {[
                { t: '¿Quién manda en Scrum?', desc: 'Nadie. No hay jerarquías. El PO gestiona el qué/valor, el SM el proceso, y los Developers son 100% autogestionados.' },
                { t: '¿El Product Owner puede asignar tareas a los Devs?', desc: 'FALSO. Los Developers seleccionan y desglosan su propio trabajo de manera autónoma.' },
                { t: '¿La Daily Scrum dura 30 minutos si hay problemas?', desc: 'FALSO. El timebox es estrictamente 15 minutos. Si hay problemas técnicos se debaten fuera con los afectados.' },
                { t: '¿La Daily es para reportarle al jefe o al PO?', desc: 'FALSO. Es una sincronización exclusiva para los Developers hacia el Sprint Goal.' },
                { t: '¿El Scrum Master es un Project Manager?', desc: 'FALSO. Es un "Servant Leader" (líder servicial). Facilita y remueve bloqueos; no impone directrices.' },
                { t: '¿Un incremento inacabado se muestra en la Review?', desc: 'FALSO. Solo se presenta software funcional que cumple al 100% la Definition of Done.' },
                { t: '¿El Product Backlog se cierra al empezar el proyecto?', desc: 'FALSO. Es un artefacto dinámico y vivo (living artifact) que evoluciona continuamente.' },
                { t: '¿Cuándo termina un Sprint si no da tiempo?', desc: 'Termina exactamente en la fecha fijada. El timebox nunca se extiende; se renegocia el alcance.' }
              ].map((trap, idx) => (
                <div key={idx} style={{ background: 'var(--bg-subtle, #f8fafc)', padding: '0.9rem', borderRadius: '10px', border: '1px solid var(--border-subtle, #e2e8f0)' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#c2410c', display: 'block', marginBottom: '0.3rem' }}>
                    ⚠️ {trap.t}
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-title)', lineHeight: 1.5 }}>
                    {trap.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 6: GIT & GITHUB EN EQUIPOS ÁGILES */}
      {activeTab === 'git' && (
        <section>
          {/* Cabecera de Git & GitHub */}
          <div className="agile-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.03) 0%, rgba(15, 23, 42, 0.08) 100%)', borderLeft: '4px solid #0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.74rem', background: 'rgba(15, 23, 42, 0.1)', color: '#0f172a', padding: '0.2rem 0.55rem', borderRadius: '999px', fontWeight: 800, textTransform: 'uppercase' }}>
                  Control de Versiones & DevOps Ágil
                </span>
                <h2 style={{ margin: '0.35rem 0 0.35rem 0', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  🐙 {GIT_AGILE_GUIDE.title}
                </h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {GIT_AGILE_GUIDE.subtitle}
                </p>
              </div>

              {/* Botón de Descarga / Apertura del PDF */}
              <a
                href={GIT_AGILE_GUIDE.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="theme-btn"
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  padding: '0.55rem 1.1rem',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.25)'
                }}
              >
                <span>📄 Abrir PDF de Backup y Problemas (273 KB) ↗</span>
              </a>
            </div>
          </div>

          {/* Tarjeta de Destacado del Documento Oficial */}
          <div className="agile-card" style={{ border: '2px solid #e2e8f0', background: '#f8fafc', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>
                🛡️
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Documento Oficial: Guía de Backup y Resolución de Problemas en GitHub
                </h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                  Manual técnico que cubre la sincronización de ramas de feature, qué hacer ante errores de autenticación o rechazos en <code>git push</code>, descarte seguro de cambios y respaldo ante incidencias.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={GIT_AGILE_GUIDE.pdfPath}
                  download={GIT_AGILE_GUIDE.pdfName}
                  className="theme-btn"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  ⬇️ Descargar PDF
                </a>
              </div>
            </div>
          </div>

          {/* 4 Principios de Git en Scrum */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.8rem 0', color: 'var(--text-title)' }}>
              🏗️ Los 4 Pilares de Git en Equipos Scrum
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {GIT_AGILE_GUIDE.principios.map((p, idx) => (
                <div
                  key={idx}
                  className="agile-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    margin: 0
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{p.icon}</span>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)' }}>
                      {p.titulo}
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Comandos Esenciales de Contingencia */}
          <div className="agile-card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.8rem 0', color: 'var(--text-title)' }}>
              ⚡ Comandos Ágiles Frecuentes & Resolución de Conflictos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {GIT_AGILE_GUIDE.comandosFrecuentes.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <code style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0969da', background: '#eef2ff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {c.cmd}
                  </code>
                  <span style={{ fontSize: '0.82rem', color: '#475569', flex: 1, minWidth: '220px', marginLeft: '0.5rem' }}>
                    {c.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 7: SALA MULTIMEDIA & RECURSOS */}
      {activeTab === 'multimedia' && (
        <section>
          <div className="agile-card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
              🎥 Sala de Estudio Multimedia: Vídeo y Recursos
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Archivos consolidados ubicados en <code>public/acc/sala-estudio/</code> para repasar en local.
            </p>
          </div>

          {/* Reproductor de Vídeo Local */}
          <div className="agile-card" style={{ background: '#0b1120', color: '#ffffff', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', background: 'rgba(99, 102, 241, 0.25)', color: '#a5b4fc', padding: '0.2rem 0.55rem', borderRadius: '999px', fontWeight: 800, textTransform: 'uppercase' }}>
                  Vídeo Local · MP4 (45 MB)
                </span>
                <h3 style={{ margin: '0.3rem 0 0 0', fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
                  🎬 Introducción a Spring Boot & API REST
                </h3>
              </div>

              <a
                href="/acc/sala-estudio/Spring_Boot_API_REST_introduccion.mp4"
                download="Spring_Boot_API_REST_introduccion.mp4"
                className="theme-btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 650
                }}
              >
                📥 Descargar Vídeo (45 MB)
              </a>
            </div>

            <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000000', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
              <video
                controls
                preload="metadata"
                style={{ width: '100%', maxHeight: '520px', display: 'block', outline: 'none' }}
                src="/acc/sala-estudio/Spring_Boot_API_REST_introduccion.mp4"
              >
                Tu navegador no soporta el tag de vídeo HTML5.
              </video>
            </div>
            
            <div style={{ marginTop: '0.8rem', fontSize: '0.82rem', color: '#94a3b8' }}>
              📁 Ruta en disco: <code>public/acc/sala-estudio/Spring_Boot_API_REST_introduccion.mp4</code>
            </div>
          </div>

          {/* Tarjetas de Recursos Markdown */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.8rem 0', color: 'var(--text-title)' }}>
              📑 Documentos Markdown Disponibles en Sala de Estudio
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {SALA_ESTUDIO_FILES.map((file) => (
                <div
                  key={file.id}
                  className="agile-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                    margin: 0
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>{file.type === 'video' ? '🎬' : '📝'}</span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(99, 102, 241, 0.1)', color: '#4338ca', padding: '0.2rem 0.55rem', borderRadius: '999px', fontWeight: 750 }}>
                      {file.badge}
                    </span>
                  </div>

                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                    {file.title}
                  </h4>

                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {file.desc}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={file.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-btn"
                      style={{
                        background: 'var(--bg-subtle, #f8fafc)',
                        border: '1px solid var(--border-subtle, #cbd5e1)',
                        color: 'var(--text-title)',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 650,
                        textDecoration: 'none'
                      }}
                    >
                      Abrir Archivo ↗
                    </a>
                    {file.id === 'cuestionario-agile' && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('simulador')}
                        className="theme-btn"
                        style={{
                          background: '#4338ca',
                          color: '#ffffff',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: 'none'
                        }}
                      >
                        Hacer Test Interactivo ➔
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
